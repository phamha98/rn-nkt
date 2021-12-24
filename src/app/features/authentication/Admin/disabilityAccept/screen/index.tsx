import React, { useEffect, useRef } from 'react';
import { toggleLoading } from '../../../../../../../App';
import { Header, Screen, Wallpaper } from '../../../../../library/components';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import { XacNhanKT } from '../../../../../library/networking/api';
import RestAPI from '../../../../../RestAPI';
import { onXacNhanKT } from '../redux/action';
import { ThongTinDoiTuong } from './components';


const DisabilityAccept = (props: any) => {

  const disabilityId = props.navigation.state.params.DISABILITY_ACCEPT

  const refContent = useRef()

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    toggleLoading(true);
    var resp = await RestAPI.RenewXNKT_GetInfo(disabilityId);
    refContent.current?.setData({
      isReady: true,
      data: resp
    })
    toggleLoading(false);
  }

  const _onUpdate = async (obj) => {
    toggleLoading(true);
    var resp = await RestAPI.RenewXNKT_UpdateInfo(obj);
    if (resp.status == true)
      ViewCus.Alert.Alert(resp.messeger)
    toggleLoading();
  }

  return (
    <>
      <Screen>
        <Wallpaper useWrap={true} />
        <Header
          isBack={true}
          headerTx={'Thông tin XNKT'}
        />
        <ViewCus.ComponentDynamic
          ref={refContent}
          render={({ isReady, data } = {}) => (
            isReady &&
            <ThongTinDoiTuong
              initData={data}
              isRefresh={new Date().getTime}
              onRefresh={() => loadData()}
              onUpdate={_onUpdate}
            />
          )}
        />

      </Screen>
    </>
  );
};
export { DisabilityAccept };
