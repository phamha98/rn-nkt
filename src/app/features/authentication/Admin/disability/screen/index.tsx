import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Platform, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { toggleLoading } from '../../../../../../../App';
import { Button, FontAwesomeFont, Header, IoniconsFont, MaterialCommunityIconsFont, Screen, Text as TextCus, Wallpaper } from '../../../../../library/components';
import ModalOptions from '../../../../../library/components/modalOptions/ModalOptions';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import { navigate } from "../../../../../navigation/navigationService";
import { APPOINTMENT, DISABILITY_ACCEPT, DISABILITY_DETAIL } from '../../../../../navigation/screenTypes';
import RestAPI from '../../../../../RestAPI';
import { palette as appColors } from '../../../../../themes/palette';
import { ModalSearch } from './components/index';
import { defaultParams } from './components/ModalSearch';
const Text = (props) => <TextCus {...props} style={[{ color: 'black' }, props.style]} />

let currentParams = {
  ...defaultParams
}

const Disability = (props: any) => {

  const refModalSearch = useRef();
  const refModalOptions = useRef();
  const refPromptReject = useRef();

  const user = useSelector(state => state.AppReducer.profile.user);

  const [isSearch, setIsSearch] = useState(false)
  const [data, setData] = useState({
    start: 1,
    length: 20,
    list: [],
    isLoading: false,
    total: 0
  })

  useEffect(() => {
    currentParams = {
      ...defaultParams,
      maTinh: user.maTinh > 0 ? user.maTinh : 0,
      maHuyen: user.maHuyen > 0 ? user.maHuyen : 0,
      maXa: user.maXa > 0 ? user.maXa : 0,
    }
    loadData();
  }, []);

  const getParams = () => {
    var params = currentParams.isAdvanced ? { ...currentParams } : {
      search: currentParams.search,
      maTinh: currentParams.maTinh,
      maHuyen: currentParams.maHuyen,
      maXa: currentParams.maXa,
    }

    if (params.hasOwnProperty('thang')) {
      params.thang = params.thang != null && params.thang.constructor == Date ? params.thang.format('MMYYYY') : params.thang;
    }
    return {
      ...params,
      token: user.token,
    }
  }
  const loadData = async (page: any = 1) => {
    page = page == null ? 1 : page
    toggleLoading(true);

    var params = getParams();
    var resp = await RestAPI.RenewXNKT_List({
      start: page,
      length: data.length,
      ...params,
    });
    toggleLoading();
    setData({
      ...data,
      isLoading: false,
      page: page + 1,
      length: 20,
      total: resp.total,
      list: page == 1 ? resp.data : [...data.list, ...resp.data]
    })
  }

  const onDetail = function ({ e, index }) {
    navigate(DISABILITY_DETAIL, {
      'DISABILITY_DETAIL': e, callback: (obj) => {
        var dataTemp = { ...data };
        dataTemp.list[index] = {
          ...dataTemp.list[index],
          ...obj
        }
        setData(dataTemp);
      }
    })
  }

  var onAccept = async ({ e, index }) => {
    toggleLoading(true)
    const param = { Id: e.id, NguoiDuyet: user.userID }
    var resp = await RestAPI.RenewXNKT_AcceptRequest(param)
    toggleLoading()
    ViewCus.Alert.Alert(resp.messeger);
    if (resp.status) {
      var dataTemp = { ...data };
      dataTemp.list[index].trangThai = 2;
      setData(dataTemp);
    }
  }

  var onUpdate = (e) => {
    navigate(DISABILITY_ACCEPT, { 'DISABILITY_ACCEPT': e.id })
  }

  var onReject = async ({ e, index }) => {
    refPromptReject.current?.toggle(true, '', async (t) => {
      toggleLoading(true)
      var resp = await RestAPI.RenewXNKT_RejectRequest({
        LyDoKhongDuyet: t,
        Id: e.id,
        NguoiDuyet: user.userID,
        TrangThai: 0
      })
      toggleLoading();
      setTimeout(() => {
        ViewCus.Alert.Alert(resp.messeger);
      }, 300);
      if (resp.status) {
        var dataTemp = { ...data };
        dataTemp.list[index].trangThai = 0;
        setData(dataTemp);
      }
    });
  }


  const _onGoLichHen = (e) => {
    navigate(APPOINTMENT, { 'APPOINTMENT': e })
  };

  const onSubmitFilter = (params) => {
    setData({
      isLoading: false,
      index: 1,
      length: 20,
      total: 0,
      list: []
    })
    setIsSearch(true);
    currentParams = params;
    loadData();
  }

  const clickClearSearch = () => {
    // ViewCus.Alert.Confirm(() => {
    setIsSearch(false);
    setData({
      isLoading: false,
      index: 1,
      length: 20,
      total: 0,
      list: []
    })
    currentParams = {
      ...defaultParams,
      maTinh: user.maTinh > 0 ? user.maTinh : 0,
      maHuyen: user.maHuyen > 0 ? user.maHuyen : 0,
      maXa: user.maXa > 0 ? user.maXa : 0,
    }
    loadData();
    // }, null, 'Bạn muốn xóa kết quả tìm kiếm?')
  }

  const renderItem = ({ item, index }: any) => {
    return (
      <ViewCus.Card
        styleContainer={{
          marginTop: index == 0 ? 0 : 20,
          marginHorizontal: 0,
        }}
        styleContent={{
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}
        title={
          <ViewCus.ViewHorizontal
            style={{
              padding: 15,
              backgroundColor: '#cdf3f8',
              alignItems: 'center'
            }}
          >
            {
              item.trangThai == 2 ? <ViewCus.Ionicons size={26} icon={IoniconsFont.checkmarkCircleOutline} color={appColors.materialGreen} />
                : item.trangThai == 0 ? <ViewCus.Ionicons size={26} icon={IoniconsFont.alertCircleOutline} color={appColors.metronicWarning} />
                  : <ViewCus.Ionicons size={26} icon={IoniconsFont.closeCircleOutline} color={appColors.materialRed} />
            }
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                flex: 1,
                paddingHorizontal: 5
              }}
            >
              {'#{0} {1}'.format(index + 1, item.hoTen)}
            </Text>
            {
              __DEV__ && <Text>{item.trangThai}</Text>
            }
            <Button
              style={{
                backgroundColor: 'transparent'
              }}
              onPress={() => refModalOptions.current?.toggle(true, item,
                [
                  {
                    label: 'Xem chi tiết',
                    onPress: (e) => onDetail({ e, index }),
                  },
                  (item.trangThai != 2) &&
                  {
                    label: 'Tiếp nhận',
                    onPress: (e) => onAccept({ e, index }),
                  },
                  (item.trangThai != 2) &&
                  {
                    label: 'Từ chối tiếp nhận',
                    onPress: (e) => onReject({ e, index }),
                  },
                  // (item.trangThai != 2) &&
                  {
                    label: 'Cập nhật thông tin giấy XNKT',
                    onPress: (e, index) => onUpdate(e),
                  },
                  (user.role != 3 && user.role != 4 && user.role != 6) &&
                  {
                    label: 'Liên lạc với đối tượng',
                    onPress: (e, index) => _onGoLichHen(e),
                  },
                ].filter(e => e != null && e !== false)
              )}
            >
              <ViewCus.MaterialCommunityIcons icon={MaterialCommunityIconsFont.dotsHorizontal} />
            </Button>
          </ViewCus.ViewHorizontal>
        }
      >
        <ViewCus.ViewHorizontal
          style={{
            flexWrap: 'wrap'
          }}
        >
          {
            [
              {
                icon: <ViewCus.FontAwesome icon={FontAwesomeFont.birthdayCake} />,
                value: item.ngaySinh == null ? null : new Date(item.ngaySinh).format('DD/MM/YYYY')
              },
              {
                icon: <ViewCus.FontAwesome icon={FontAwesomeFont.male} />,
                value: item.gioITinh == 1 ? "Nam" : "Nữ"
              },
              {
                icon: <ViewCus.FontAwesome icon={FontAwesomeFont.phone} />,
                value: item.soDienThoai
              },
              {
                icon: <ViewCus.FontAwesome icon={FontAwesomeFont.user} />,
                value: item.username
              },
            ].map((e, index) => (
              <ViewCus.ViewIcon
                key={index}
                iconLeft={React.cloneElement(e.icon, {
                  size: 18,
                  style: {
                    width: 25,
                    // backgroundColor: 'red'
                  },
                })}
                styleContainer={{
                  width: '50%',
                  marginTop: 10
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    flexWrap: 'wrap',
                  }}
                >{e.value}</Text>
              </ViewCus.ViewIcon>
            ))
          }
        </ViewCus.ViewHorizontal>
      </ViewCus.Card>
    )
  }

  return (
    <>
      <ModalSearch
        ref={refModalSearch}
        onSubmit={onSubmitFilter}
      />
      <ModalOptions ref={refModalOptions} />
      <ViewCus.Prompt
        ref={refPromptReject}
        title='Lý do không duyệt'
        buttonText='Không duyệt'
        placeholder='Lý do không duyệt'
        multiline={true}
        numberOfLines={10}
        validate={{
          required: true,
        }}
        styleInput={[
          {
            maxHeight: 200,
          },
          Platform.OS == 'ios' && { height: 200 }
        ]}
      />
      <Screen>
        <Wallpaper useWrap={true} />
        <Header
          isBack={true}
          headerTx={'Danh sách yêu cầu cấp lại giấy XNKT'}
          childrenRight={
            <Button
              style={{
                paddingVertical: 0,
                backgroundColor: 'transparent'
              }}
              onPress={() => refModalSearch.current?.toggle(true, currentParams)}
            >
              <ViewCus.Ionicons icon={IoniconsFont.search} color={'white'} />
            </Button>
          }
        />
        {
          isSearch && (data.list || []).length > 0 &&
          <Button
            onPress={clickClearSearch}
            style={{
              // marginHorizontal: 10,
              // marginVertical: 5
            }}
          >
            {'Xóa tìm kiếm'}
          </Button>
        }
        <FlatList
          data={data.list}
          renderItem={renderItem}
          refreshControl={<RefreshControl onRefresh={() => loadData()} refreshing={data.isLoading} />}
          contentContainerStyle={{
            padding: 10
          }}
          ListFooterComponent={() => (
            data.total > (data.list || []).length &&
            <Button
              onPress={() => loadData(data.page)}
              style={{
                backgroundColor: appColors.metronicInfo,
                marginTop: 10,
                paddingVertical: 10,
              }}
              textStyle={{
                color: appColors.white
              }}
            >
              {'Xem thêm'}
            </Button>
          )}
          ListEmptyComponent={() => (
            <Text style={{
              textAlign: 'center',
              paddingVertical: 20,
              fontSize: 20
            }}>
              {'Không có kết quả'}
            </Text>
          )}
          keyExtractor={(item: any) => item.id.toString()}
        />
      </Screen>
    </>
  );
};

export {
  Disability
};

