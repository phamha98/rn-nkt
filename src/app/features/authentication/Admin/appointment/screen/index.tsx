import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View, RefreshControl, Linking } from 'react-native';
import { toggleLoading } from '../../../../../../../App';
import { Button, Header, IoniconsFont, MaterialCommunityIconsFont, ModalOptions, Screen, Text as TextCus, Wallpaper } from '../../../../../library/components';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import { navigate } from '../../../../../navigation/navigationService';
import { APPOINTMENT_CREATE, APPOINTMENT_DETAIL, APPOINTMENT_EDIT } from '../../../../../navigation/screenTypes';
import RestAPI from '../../../../../RestAPI/index';
import { palette as appColors } from '../../../../../themes/palette';
import { translate } from '../../../../../library/utils/i18n/translate';
import DropDownHolder from '../../../../../library/utils/dropDownHolder';
import StylesCus from '../../../../../themes/StylesCus';
const Text = (props) => <TextCus {...props} style={[{ color: 'black' }, props.style]} />

const Appointment = (props: any) => {
  const disabilityId = props.navigation.state.params.APPOINTMENT.id
  const my_phone = props.navigation.state.params.APPOINTMENT.soDienThoai
  const refModalOptions = useRef();
  const [data, setData] = useState({
    start: 1,
    length: 20,
    giayCNKTId: disabilityId,
    list: [],
    isLoading: false,
    total: 0,
  })

  useEffect(() => {
    loadData()
  }, []);

  var loadData = async (page?: any) => {
    page = page == null ? 1 : page
    toggleLoading(true);
    var resp = await RestAPI.RenewXNKT_AppointmentList({
      start: page,
      length: data.length,
      giayCNKTId: data.giayCNKTId,
    });
    setData({
      ...data,
      start: page + 1,
      list: page == 1 ? resp.data : [...data.list, ...resp.data],
      total: resp.total,
      isLoading: false
    })
    toggleLoading()
  }
  var onDetail = (e) => {
    navigate(APPOINTMENT_DETAIL, { 'APPOINTMENT_DETAIL': e })
  }
  var onEdit = ({ e, index }) => {
    navigate(APPOINTMENT_EDIT, {
      'APPOINTMENT_EDIT': e, callback: (obj) => {
        var temp = [...data.list];
        temp[index] = {
          ...temp[index],
          ...Utils.mapDataWithCase({
            trangThai: temp[index].trangThai,
            noiDung: temp[index].noiDung,
            noiDungNoi: temp[index].noiDungNoi,
            ngayHen: temp[index].ngayHen,
          }, obj)
        };
        setData({
          ...data,
          list: temp
        })
      }
    })
  }
  const onCall = () => {
    if (my_phone != null) {
      Linking.canOpenURL(`tel:${my_phone}`).then((supported: boolean) => {
        if (supported) {
          Linking.openURL(`tel:${my_phone}`);
        } else {
          DropDownHolder.showWarning(
            translate('dialog:warning'),
            translate('error:notSupportCall'),
          );
        }
      });
    }
    else{
      DropDownHolder.showWarning(
        translate('dialog:warning'),
        translate('Kiểm tra lại số điện thoại'),
      );
    }
  };

  const renderItem = ({ item: e, index }: any) => {
    return (
      <ViewCus.Card
        styleContainer={{
          marginTop: index == 0 ? 0 : 20,
          marginHorizontal: 0,
        }}
        styleContent={{
          paddingVertical: 10,
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
              e.trangThai == 1 ? <ViewCus.Ionicons size={26} icon={IoniconsFont.checkmarkCircleOutline} color={appColors.materialGreen} />
                : <ViewCus.Ionicons size={26} icon={IoniconsFont.alertCircleOutline} color={appColors.metronicWarning} />
            }
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                flex: 1,
                paddingHorizontal: 5
              }}
            >
              {'#{0} {1}'.format(index + 1, new Date(e.ngayHen).format())}
            </Text>
            {
              __DEV__ && <Text>{e.trangThai}</Text>
            }
            <Button
              style={{
                backgroundColor: 'transparent'
              }}
              onPress={() => refModalOptions.current?.toggle(true, e,
                [
                  // {
                  //   label: 'Xem chi tiết',
                  //   onPress: (e, index) => onDetail(e),
                  // },
                  (e.trangThai != 2) &&
                  {
                    label: 'Chỉnh sửa',
                    onPress: (e) => onEdit({ e, index }),
                  },
                ].filter(e => e != null && e !== false)
              )}
            >
              <ViewCus.MaterialCommunityIcons icon={MaterialCommunityIconsFont.dotsHorizontal} />
            </Button>

          </ViewCus.ViewHorizontal>
        }
      >
        {
          [
            {
              title: 'Nội dung hẹn',
              value: e.noiDung,
            },
            {
              title: 'Nội dung xử lý',
              value: e.noiDungNoi,
            },
          ].filter(e => e.value != null && e.value != '').map((e, index) => (
            <View key={index}>
              <Text style={{ paddingVertical: 5, fontWeight: 'bold' }}>{e.title}</Text>
              <Text>{e.value}</Text>
            </View>
          ))
        }
      </ViewCus.Card>
    )
  }

  return (
    <>
      <ModalOptions ref={refModalOptions} />
      <Screen>
        <Wallpaper useWrap={true} />
        <Header
          isBack={true}
          headerTx={'Liên lạc với đôi tượng'}
          childrenRight={
            <Button
              style={{
                paddingVertical: 0,
                backgroundColor: appColors.transparent
              }}
              onPress={() => navigate(APPOINTMENT_CREATE, { 'APPOINTMENT_CREATE': disabilityId, callback: () => loadData() })}
            >
              <ViewCus.Ionicons color={appColors.white} icon={IoniconsFont.add} />
            </Button>

          }
        />
        <FlatList
          data={data.list}
          contentContainerStyle={{
            padding: 10
          }}
          renderItem={renderItem}
          refreshControl={<RefreshControl onRefresh={() => loadData()} refreshing={data.isLoading} />}
          keyExtractor={(item: any) => item.id.toString()}
          ListFooterComponent={() => (
            data.total > (data.list || []).length &&
            <Button
              onPress={() => loadData(data.start)}
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
        />
        <Button
          style={{
            backgroundColor: appColors.primary,
            width: 50,
            height: 50,
            position: 'absolute',
            right: 8,
            bottom: 8,
            borderRadius: 100,
            ...StylesCus.boxShadow
          }}
          onPress={onCall}
        >
          <ViewCus.Ionicons icon={IoniconsFont.callOutline} color='white' />
        </Button>
      </Screen>
    </>
  );
};
export {
  Appointment
};
