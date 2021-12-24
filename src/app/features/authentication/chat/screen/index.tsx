import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { toggleLoading } from '../../../../../../App';
import { Button, Header, Screen, Wallpaper } from '../../../../library/components';
import ViewCus from '../../../../library/components/ViewCus/ViewCus';
import DropDownHolder from '../../../../library/utils/dropDownHolder';
import RestAPI from '../../../../RestAPI';
import { store as storeRedux } from '../../../../store/store';
import ButtonNextTab from './components/ButtonNextTab';
import Form from './components/form';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';
import { styles } from './style';
export const HomeChat = (props: any) => {
  const user = storeRedux.getState().AppReducer.profile.user;
  const refTabViewContainer = useRef(null);

  useEffect(() => {
    loadData();
  }, []);

  let dataSaved: any = null;
  var master = {
    provinces: [],
    districts: [],
    wards: [],
    village: [],
    ethnics: []
  }
  const loadData = async () => {
    toggleLoading(true);
    var resp = await RestAPI.API_Get_Info_ThongTinChung(user.userID);
    dataSaved = resp;
    var provinces = (await RestAPI.Master_Province()).data;
    var districts = (await RestAPI.Master_District()).data;
    var wards = (await RestAPI.Master_Ward()).data;
    var ethnics = (await RestAPI.Master_Ethnic()).data;

    master = {
      provinces,
      districts,
      wards,
      ethnics,
    }
    toggleLoading(false);
    refTabViewContainer.current?.setData({
      isReady: true, data: resp, lockTab: resp.ttc.trangThai != 1, status: resp.status
    });
  }

  var onSubmit = async (dataSubmit: any, payload: object) => {
    dataSubmit.TTC = { ...dataSubmit.TTC, ...payload }
    dataSubmit.TTC.Id = dataSaved.ttc.trangThai != null ? dataSaved.ttc.id : 0
    // Trường hợp có mạng push dữ liệu lên server
    toggleLoading(true);
    var response = await RestAPI[payload.trangthai == 1 ? 'API_Cap_Nhat_Thong_Tin_Gui_Xa' : 'API_Cap_Nhat_Thong_Tin'](dataSubmit)
    if (response.status == true) {
      loadData()
      toggleLoading(false);
      DropDownHolder.showSuccess("Cập nhật thông tin thành công!");
      return;
    }
    else {
      DropDownHolder.showError("Cập nhật thông tin thất bại");
    }
    toggleLoading(false)
  }

  return (
    <>
      <Screen>
        <Wallpaper useWrap={true} />
        <Header
          isBack={true}
          rightIcon={'tab_notify'}
          rightIconStyle={styles.rightIconStyle}
          headerTx={'Phiếu đăng ký, cập nhật thông tin'}
        />
        <ViewCus.ComponentDynamic
          ref={refTabViewContainer}
          render={({ lockTab, isReady = false, data, status } = {}) => {
            return (
              isReady == true &&
              <>
                {(status || '') != '' &&
                  <Button>{status}</Button>
                }
                <Form
                  master={master}
                  dataSaved={dataSaved}
                  onSubmit={(data: object, payload: object) => onSubmit(data, payload)}
                  onRefresh={() => loadData()}
                  isRefresh={new Date().getTime()}
                  lockTab={lockTab}
                  submitLastView={(handleSubmit: Function) => {
                    return (
                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        {
                          data.ttc.trangThai == 0 && RestAPI.isConnected != false && (data.ttc.a4_HoTen || '') == '' ?
                            <View style={{ flex: 1, padding: 5 }}>
                              <ButtonNextTab
                                onPress={() => handleSubmit({ trangThai: 0 })}
                              >
                                {'Lưu'}
                              </ButtonNextTab>
                            </View>
                            :
                            data.ttc.trangThai == 0 && RestAPI.isConnected == false && (data.ttc.a4_HoTen || '') == '' ?
                              <View style={{ flex: 1, padding: 5 }}>
                                <ButtonNextTab
                                  onPress={() => handleSubmit({ trangthai: 0 })}
                                >
                                  {'Gửi đơn'}
                                </ButtonNextTab>
                              </View>
                              :
                              <View style={{ flex: 1, padding: 5, flexDirection: 'row' }}>
                                <View style={{ flex: 0.5, padding: 5, }}>
                                  <ButtonNextTab
                                    onPress={() => handleSubmit({ trangthai: 0 })}
                                  >
                                    {'Lưu'}
                                  </ButtonNextTab>
                                </View>
                                <View style={{ flex: 0.5, padding: 5, }}>
                                  <ButtonNextTab
                                    onPress={() => handleSubmit({ trangthai: 1 })}
                                  >
                                    {'Gửi đơn'}
                                  </ButtonNextTab>
                                </View>
                              </View>
                        }
                      </View>
                    )
                  }}
                />
              </>
            )
          }}
        />
      </Screen>
    </>
  )
}
