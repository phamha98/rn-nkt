import React, { useEffect } from 'react';
import WebView from 'react-native-webview';
import { Image, TouchableOpacity, View, Linking } from 'react-native';
import constants from '../../../../common/constants';
import { Header, Screen, Text as TextCus, Wallpaper } from '../../../../library/components';
import { navigate } from '../../../../navigation/navigationService';
import { DANHSACHNGUOIDUNGYEUCAUHOTRO, NOTIFICATION, TAB_CHAT, TAB_NOTIFY, HUONGDANSUDUNGNGUOIDUNG, CHATBOT } from '../../../../navigation/screenTypes';
import RestAPI from '../../../../RestAPI';
import ViewCus from '../../../../library/components/ViewCus/ViewCus';
import { store as storeRedux } from '../../../../store/store';
import { toggleLoading } from '../../../../../../App';
import RNFetchBlob from 'rn-fetch-blob'
const Text = props => <TextCus {...props} style={[{ color: 'black' }, props.style]} />
const _Home = (props: any) => {
  const user = storeRedux.getState().AppReducer.profile.user;

  const DKTTNKT = () => {
    navigate(TAB_CHAT);
  }
  const XDMucDo = () => {
    navigate(TAB_NOTIFY);
  }
  // const HuongDanSuDung = () => {
  //   navigate(HUONGDANSUDUNGNGUOIDUNG);  
  // } 
  const HuongDanSuDung = () => {
    navigate(HUONGDANSUDUNGNGUOIDUNG);
  }
  const CapNhatHoTro = () => {
    navigate(DANHSACHNGUOIDUNGYEUCAUHOTRO);
  }
  const ChatBot = () => {
    navigate(CHATBOT);
  }
  useEffect(() => {
    loadData();
  }, []);

  const AlerOffline = () => {
    ViewCus.Alert.Alert('Chức năng không được hỗ trợ khi Offline!');
  }

  const loadData = async () => {
    toggleLoading(true);
    var resp = await RestAPI.API_Get_Info_ThongTinChung(user.userID);
    var res = await RestAPI.API_Get_Info_GiayXacNhanKT(user.userID);
    var ethnics = (await RestAPI.Master_Ethnic()).data;
    var DetailNhuCauHoTro = await RestAPI.API_Get_Info_NhuCauHoTro(0);
    var listNhuCauHoTro = await RestAPI.API_Get_DanhSachNguoiDungNhuCauHoTro({
      start: 1,
      length: 10,
      userId: user.userID,
      search: '',
      maTinh: -1,
      maHuyen: -1,
      maXa: -1,
      trangThai: -1,
    });
    toggleLoading(false);
  }



  const itemWidth = constants.window.width * (constants.window.width < 400 ? .7 : constants.window.width > 800 ? .45 : .6);
  const scaleWidth = (itemWidth / 614.4);
  return (
    <>
      <Screen>
        <Wallpaper useWrap={true} />
        <Header
          isMenu={true}
          rightIcon={'tab_notify'}
          headerTx={'Trang chủ'}
          onRightPress={() => {
            navigate(NOTIFICATION);
          }}
        />
        <View
          style={{
            marginTop: itemWidth / 2.8,
            transform: [{ rotate: "-45deg" }],
            width: '100%',
            alignItems: 'center'
          }}
        >
          {
            [
              [
                {
                  source: require("../../../../assets/icon/iconHome2.png"),
                  title: 'Đăng ký, cập nhật thông tin người khuyết tật',
                  navigate: () => DKTTNKT(),
                },
                {
                  source: require("../../../../assets/icon/iconHome1.png"),
                  title: 'Cấp/cấp lại/xác định/xác định lại mức độ khuyết tật',
                  navigate: () => XDMucDo(),
                },
              ],
              [
                {
                  source: require("../../../../assets/icon/iconHome3.png"),
                  title: 'Hướng dẫn sử dụng',
                  navigate: () => HuongDanSuDung(),
                },
                // {
                //   source: require("../../../../assets/icon/iconHome3.png"),
                //   title: 'Hỗ trợ trực tuyến',
                //   navigate: () => RestAPI.isConnected ? ChatBot() : AlerOffline(),
                // },
                {
                  source: require("../../../../assets/icon/iconHome4.png"),
                  title: 'Cập nhật nhu cầu hỗ trợ',
                  navigate: () => CapNhatHoTro(),
                },
              ],
            ].map((row, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  width: itemWidth,
                }}
              >
                {row.map((e, index) => (
                  <View
                    key={index}
                    style={{
                      width: itemWidth / 2,
                      height: itemWidth / 2,
                      padding: 10 * scaleWidth,
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                    }}
                  >
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'white',
                        position: 'absolute',
                      }}
                    />
                    <TouchableOpacity
                      activeOpacity={.9}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                        transform: [{ rotate: "45deg" }],
                        padding: itemWidth / 2 * .05,
                        // backgroundColor: 'red'
                      }}
                      onPress={() => e.navigate()}
                    >
                      <Image
                        style={{
                          width: itemWidth / 2 * .25,
                          height: itemWidth / 2 * .25,
                        }}
                        source={e.source}
                        resizeMode='contain'
                      />

                      <Text
                        style={{
                          marginVertical: 10 * scaleWidth,
                          textAlign: 'center',
                          color: '#484848',
                          fontWeight: "500",
                          fontSize: 27 * scaleWidth
                        }}>
                        {e.title}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ))
          }
        </View>
      </Screen>
    </>
  );
};
// export let Home = withNavigation(_Home)
export let Home = _Home