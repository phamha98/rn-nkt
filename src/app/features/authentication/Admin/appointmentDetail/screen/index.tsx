import React, { useEffect, useState } from 'react';
import { View, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { toggleLoading } from '../../../../../../../App';
import { Header, IoniconsFont, Screen, Text as TextCus, Wallpaper } from '../../../../../library/components';
import { palette as appColors } from '../../../../../themes/palette';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import RestAPI from '../../../../../RestAPI';
const Text = (props) => <TextCus {...props} style={[{ color: 'black' }, props.style]} />

const AppointmentDetail = (props: any) => {
  const id = props.navigation.state.params.APPOINTMENT_DETAIL.id

  const [data, setData] = useState({
    isRefresh: false,
    obj: null
  })

  useEffect(() => {
    loadData()
  }, []);

  const loadData = async () => {
    toggleLoading(true);
    var resp = await RestAPI.RenewXNKT_AppointmentDetails(id)
    setData({
      isRefresh: false,
      obj: resp
    })
    toggleLoading();
  }

  return (
    <Screen>
      <Wallpaper useWrap={true} />
      <Header
        isBack={true}
        headerTx={'Chi tiết lịch hẹn'}
      />
      <ScrollView
        refreshControl={<RefreshControl onRefresh={() => loadData()} refreshing={data.isRefresh} />}
        contentContainerStyle={{
          padding: 10
        }}
      >
        <ViewCus.ViewBoxShadown
          style={{
            padding: 20
          }}
        >
          {
            data.obj != null &&
            <>
              <ViewCus.Ionicons
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 10
                }}
                icon={IoniconsFont.checkmarkCircleOutline} color={data.obj.trangThai == 1 ? appColors.materialGreen : appColors.metronicWarning} size={40}
              />
              {
                [
                  {
                    title: 'Ngày hẹn',
                    value: new Date(data.obj.ngayHen).format()
                  },
                  {
                    title: 'Nội dung hẹn',
                    value: data.obj.noiDung
                  },
                  {
                    title: 'Nội dung xử lý',
                    value: data.obj.noiDungNoi
                  },
                ]
                  .map((e, index) => (
                    <View
                      key={index}
                    >
                      <Text style={{ paddingVertical: 5, fontWeight: 'bold' }}>
                        {e.title}
                      </Text>
                      <Text>
                        {e.value}
                      </Text>
                    </View>
                  ))
              }
            </>
          }
        </ViewCus.ViewBoxShadown>
      </ScrollView>
    </Screen>
  );
};
export {
  AppointmentDetail
};
