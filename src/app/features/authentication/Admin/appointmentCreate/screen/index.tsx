import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toggleLoading } from '../../../../../../../App';
import { Header, Screen, Wallpaper } from '../../../../../library/components';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import RestAPI from '../../../../../RestAPI';
import { AppointmentEditForm } from '../../appointmentEdit/screen/components';
import { goBack } from '../../../../../navigation/navigationService';

const AppointmentCreate = (props: any) => {
  const disabilityId = props.navigation.state.params.APPOINTMENT_CREATE

  const refFormContent = useRef()
  const user = useSelector(state => state.AppReducer.profile.user);

  useEffect(() => {
    refFormContent.current?.setData({
      TrangThai: 0
    })
  }, []);

  const _onSubmit = async (obj) => {
    toggleLoading(true)
    var resp = await RestAPI.RenewXNKT_AppointmentUpdate({
      ...obj,
      UserId: user.userID,
      NguoiSua: user.userID,
      NgaySua: new Date(),
      NguoiTao: user.userID,
      NgayTao: new Date(),
      Id: 0,
      GiayCNKTId: disabilityId,
      MaTinh : user.maTinh,
      MaHuyen: user.maHuyen,
      MaXa: user.maXa
    })
    toggleLoading();
    ViewCus.Alert.Alert(resp.status == 1 ? 'Thành công.' : 'Có lỗi xẩy ra.', null, () => resp.status == 1 && goBack())
    if (resp.status == 1)
      props.navigation.state.params.callback(obj);
  }
  return (
    <>
      <Screen>
        <Wallpaper useWrap={true} />
        <Header
          isBack={true}
          headerTx={'Tạo lịch hẹn'}
        />
        <ViewCus.ComponentDynamic
          ref={refFormContent}
          render={(data) => (
            data != null && <AppointmentEditForm initData={data} onSubmit={_onSubmit} />
          )}
        />
      </Screen>
    </>
  );
};
export { AppointmentCreate };
