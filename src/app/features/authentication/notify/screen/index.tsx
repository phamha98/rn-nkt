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
import { styles } from './style';

var dataSubmit: any = {};
var dataSaved: any = {};
export const HomeNotify = (props: any, navigation) => {
  const user = storeRedux.getState().AppReducer.profile.user;
  const refTabViewContainer = useRef(null);
  useEffect(() => {
    loadData();
  }, [])

  var master = {
    provinces: [],
    districts: [],
    wards: [],
    village: [],
    ethnics: []
  }

  const loadData = async () => {
    dataSubmit = {};
    toggleLoading(true);
    var resp = await RestAPI.API_Get_Info_GiayXacNhanKT(user.userID);
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
      isReady: true,
      dataSaved: resp,
      master,
      lockTab: resp.gxn.trangThai != 1,
      status: resp.status
    });
  }

  const onSubmit = async (data, payload) => {
    console.log(data, payload);
    dataSubmit = {
      ...data,
      GXN: {
        ...data.GXN,
        ...payload,
        ID: dataSaved.gxn.trangThai != null ? dataSaved.gxn.id : 0,
        NguoiTao: user.userID
      }
    }
    toggleLoading(true);
    // var response = await RestAPI[payload.trangThai && RestAPI.isConnected != false  == 1 ? 'API_Xac_Dinh_Muc_Do_Gui_Xa'  ?  payload.trangThai == 1 && RestAPI.isConnected == false : 'API_Xac_Dinh_Muc_Do_Gui_Xa' :  'API_Xac_Dinh_Muc_Do' ](dataSubmit)
    var response = await RestAPI[payload.trangThai == 1 ? 'API_Xac_Dinh_Muc_Do_Gui_Xa' : 'API_Xac_Dinh_Muc_Do'](dataSubmit)
    if (response.status == true) {
      loadData()
      toggleLoading(false);
      DropDownHolder.showSuccess((response.statustext));
      return;
    }
    else {
      DropDownHolder.showError((response.statustext));
    }
    toggleLoading(false)
  }
  return (
    <Screen
    >
      <Wallpaper useWrap={true} />
      <Header
        rightIconStyle={styles.rightIconStyle}
        isBack={true}
        titleStyle={styles.titleHeader}
        rightIcon={'tab_notify'}
        headerTx={'Xác định lại mức độ khuyết tật'}
      />
      <ViewCus.ComponentDynamic
        ref={refTabViewContainer}
        render={({ isReady = false, master, dataSaved, lockTab, status } = {}) => (
          isReady &&
          <>
            {(status || '') != '' &&
              <Button>{status}</Button>
            }
            <Form
              master={master}
              lockTab={lockTab}
              dataSaved={dataSaved}
              onSubmit={(data: object, payload: object) => onSubmit(data, payload)}
              onRefresh={() => loadData()}
              isRefresh={new Date().getTime()}
              submitLastView={(handleSubmit: Function) => {
                return (
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    {
                      dataSaved.gxn.trangThai == 0 && RestAPI.isConnected != false && (dataSaved.gxn.hoTen || '') == '' ?
                        <View style={{ flex: 1, padding: 5 }}>
                          <ButtonNextTab
                            onPress={() => handleSubmit({ trangThai: 0 })}
                          >
                            {'Lưu'}
                          </ButtonNextTab>
                        </View>
                        :
                        dataSaved.gxn.trangThai == 0 && RestAPI.isConnected == false && (dataSaved.gxn.hoTen || '') == '' ?
                          <View style={{ flex: 1, padding: 5 }}>
                            <ButtonNextTab
                              onPress={() => handleSubmit({ trangThai: 1 })}
                            >
                              {'Gửi đơn'}
                            </ButtonNextTab>
                          </View>
                          :
                          <View style={{ flex: 1, padding: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 0.5, padding: 5, }}>
                              <ButtonNextTab
                                onPress={() => handleSubmit({ trangThai: 0 })}
                              >
                                {'Lưu'}
                              </ButtonNextTab>
                            </View>
                            <View style={{ flex: 0.5, padding: 5 }}>
                              <ButtonNextTab
                                onPress={() => handleSubmit({ trangThai: 1 })}
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
        )}
      />
    </Screen>
  );
};

