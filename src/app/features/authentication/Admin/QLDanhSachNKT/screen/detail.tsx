import React, { useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { Text } from 'react-native-svg';
import { Header, Screen, Wallpaper } from '../../../../../library/components';
import { styles } from '../../QLDanhSachNKT/style';
import { DieuKienSinhHoat, GiamHoKhaiThay, GiaoDucDayNghe, HoaNhapCongDong, ThongTinCaNhan, ThongTinHo, TinhTrang } from '../components';
export const DetailNKT = (props: any, navigation) => {
  const tabView = useRef(null)
  const [indexTab, setIndexTab] = useState(0)
  return (
    <>
      <Wallpaper useWrap={true} />
      <Screen>
        <Header
          isMenu={true}
          rightIconStyle={styles.rightIconStyle}
          rightIcon={'tab_notify'}
          headerTx={'Xác định lại mức độ khuyết tật'}
        />
        <ScrollableTabView
          renderTabBar={() => <DefaultTabBar />}
          ref={tabView}
          onChangeTab={page => setIndexTab(page.i)}
          tabBarBackgroundColor='#fff'
          tabBarUnderlineStyle={{
            height: 2,
            backgroundColor: 'rgba(0,190,212,1)',
          }}
          tabBarActiveTextColor='rgba(0,190,212,1)'
          renderTabBar={() => <ScrollableTabBar
            renderTab1={(name, page, isTabActive, onPressHandler, onLayoutHandler) => {
              return (
                <TouchableOpacity onLayout={onLayoutHandler}>
                  <Text>
                    {name}
                  </Text>
                </TouchableOpacity>
              )
            }}
          />}
        >
          <View tabLabel="Thông tin cá nhân" style={{ flex: 1 }}>
            <ThongTinCaNhan onSubmitNext={(name, obj, isSubmit) => submitAndNextTab(name, obj, isSubmit)} />
          </View>
          <View tabLabel="Thông tin hộ" style={{ flex: 1 }}>
            <ThongTinHo onSubmitNext={(name, obj, isSubmit) => submitAndNextTab(name, obj, isSubmit)} />
          </View>
          <View tabLabel="Tình trạng" style={{ flex: 1 }}>
            <TinhTrang onSubmitNext={(name, obj, isSubmit) => submitAndNextTab(name, obj, isSubmit)} />
          </View>
          <View tabLabel="Giáo dục dạy nghề" style={{ flex: 1 }}>
            <GiaoDucDayNghe onSubmitNext={(name, obj, isSubmit) => submitAndNextTab(name, obj, isSubmit)} />
          </View>
          <View tabLabel="Điều kiện sinh hoạt" style={{ flex: 1 }}>
            <DieuKienSinhHoat onSubmitNext={(name, obj, isSubmit) => submitAndNextTab(name, obj, isSubmit)} />
          </View>
          <View tabLabel="Hoà Nhập cộng đồng" style={{ flex: 1 }}>
            <HoaNhapCongDong onSubmitNext={(name, obj, isSubmit) => submitAndNextTab(name, obj, isSubmit)} />
          </View>
          <View tabLabel="Giám Hộ & khai thay" style={{ flex: 1 }}>
            <GiamHoKhaiThay onSubmitNext={(name, obj, isSubmit) => submitAndNextTab(name, obj, isSubmit)} />
          </View>
        </ScrollableTabView>
      </Screen>
    </>
  );
};
