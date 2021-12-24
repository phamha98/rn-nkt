import React, { useEffect, useRef } from 'react';
import { withNavigation } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoading } from '../../../../../../../App';
import { Header, Screen, Wallpaper } from '../../../../../library/components';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import RestAPI from '../../../../../RestAPI';
import { AppointmentEditForm } from './components';

const _AppointmentEdit = (props: any) => {
  const dispatch = useDispatch();

  const id = props.navigation.state.params.APPOINTMENT_EDIT.id
  const user = useSelector(state => state.AppReducer.profile.user);

  const refFormContent = useRef();

  var objGet: any = null;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    toggleLoading(true)
    var resp = objGet = await RestAPI.RenewXNKT_AppointmentDetails(id)
    refFormContent.current?.setData(resp)
    toggleLoading();
  }

  const _onSubmit = async (obj) => {
    toggleLoading(true)
    var resp = await RestAPI.RenewXNKT_AppointmentUpdate({
      ...obj,
      NguoiSua: user.userID,
      UserId: user.userID,
      NgaySua: new Date(),
      Id: id,
      GiayCNKTId: objGet.giayCNKTId
    })
    toggleLoading();
    ViewCus.Alert.Alert(resp.status == 1 ? 'Thành công.' : 'Có lỗi xẩy ra.')
    if (resp.status == 1)
      props.navigation.state.params.callback(obj);
  }

  return (
    <>
      <Screen>
        <Wallpaper useWrap={true} />
        <Header
          isBack={true}
          headerTx={'Chỉnh sửa lịch hẹn'}
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
export let AppointmentEdit = withNavigation(_AppointmentEdit)