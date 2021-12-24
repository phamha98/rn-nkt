import React, { useEffect, useRef } from 'react';
import { Platform, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { useSelector } from 'react-redux';
import { toggleLoading } from '../../../../../../../App';
import { Button, Header, Screen, Wallpaper } from '../../../../../library/components';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import RestAPI from '../../../../../RestAPI';
import { palette as appColors } from '../../../../../themes/palette';
import Form from '../../../notify/screen/components/form';

let disability: any;

const _DisabilityDetail = (props: any) => {

  const refPromptReject = useRef();
  const refTabViewContainer = useRef();

  disability = props.navigation.state.params.DISABILITY_DETAIL

  const user = useSelector(state => state.AppReducer.profile.user)


  useEffect(() => {
    loadData()
  }, []);

  const loadData = async () => {
    toggleLoading(true);
    var data = await RestAPI.RenewXNKT_Details(disability.id);
    var provinces = (await RestAPI.Master_Province()).data;
    var districts = (await RestAPI.Master_District()).data;
    var wards = (await RestAPI.Master_Ward()).data;
    var ethnics = (await RestAPI.Master_Ethnic()).data;
    var master = {
      provinces,
      districts,
      wards,
      ethnics,
    }
    const trangThai = disability.trangThai
    toggleLoading(false);
    refTabViewContainer.current?.setData({ isReady: true, dataSaved: data, master, trangThai });
  }

  const clickAccept = async () => {
    toggleLoading(true)
    const param = { Id: disability.id, NguoiDuyet: user.userID }
    var resp = await RestAPI.RenewXNKT_AcceptRequest(param)
    toggleLoading()
    ViewCus.Alert.Alert(resp.messeger);
    if (resp.status) {
      props.navigation.state.params.callback({
        trangThai: 2
      });
      disability = {
        ...disability,
        trangThai: 2
      }
      loadData();
    }
  }

  const clickReject = async () => {
    refPromptReject.current?.toggle(true, '', async (t) => {
      toggleLoading(true)
      var resp = await RestAPI.RenewXNKT_RejectRequest({
        LyDoKhongDuyet: t,
        Id: disability.id,
        NguoiDuyet: user.userID,
        TrangThai: 0
      })
      toggleLoading();
      setTimeout(() => {
        ViewCus.Alert.Alert(resp.messeger);
      }, 300);
      if (resp.status) {
        props.navigation.state.params.callback({
          trangThai: 0
        });
        disability = {
          ...disability,
          trangThai: 0
        }
        loadData();
      }
    });
  }

  return (
    <>
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
          headerTx={'Xác định lại mức độ khuyết tật'}
        />
        <ViewCus.ComponentDynamic
          ref={refTabViewContainer}
          render={({ isReady = false, master, dataSaved, trangThai = 0 } = {}) => (
            isReady &&
            <>
              <Form
                master={master}
                lockTab={false}
                dataSaved={dataSaved}
                // onSubmit={(data: object, payload: object) => onSubmit(data, payload)}
                onRefresh={() => loadData()}
                isRefresh={new Date().getTime()}
              // submitLastView={(handleSubmit: Function) => {
              //   return (
              //     <View style={{ flex: 1, flexDirection: 'row' }}>
              //       <View style={{ flex: 0.5, padding: 5 }}>
              //         <ButtonNextTab
              //           onPress={() => handleSubmit({ trangThai: 0 })}
              //         >
              //           {'Lưu'}
              //         </ButtonNextTab>
              //       </View>
              //       <View style={{ flex: 0.5, padding: 5 }}>
              //         <ButtonNextTab
              //           onPress={() => handleSubmit({ trangThai: 1 })}
              //         >
              //           {'Gửi đơn'}
              //         </ButtonNextTab>
              //       </View>
              //     </View>
              //   )
              // }}
              />
              {
                trangThai == 1 && (
                  <View style={{ flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                    <Button
                      style={{ width: 150, height: 40, margin: 5, backgroundColor: appColors.primary }}
                      onPress={clickAccept} >
                      {'Duyệt'}
                    </Button>
                    <Button
                      style={{ width: 150, height: 40, margin: 5, backgroundColor: appColors.metroRed }}
                      onPress={clickReject} >
                      {'Không duyệt'}
                    </Button>
                  </View>
                )
              }
            </>
          )}
        />

      </Screen>
    </>
  );
};
export let DisabilityDetail = withNavigation(_DisabilityDetail)