import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { withNavigation } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Screen, Text, Wallpaper } from '../../../../../library/components';
import { LOAD_THONG_BAO } from '../../../../../library/networking/api';
import { onLoadThongBao } from '../redux/action';
import { StatisticalState } from './../redux/reducer';
import { ThongBao } from './components';
import { styles } from './style';

const _Statistical = (props: any) => {
  const dispatch = useDispatch();
  const tabView = useRef(null)
  const [indexTab, setIndexTab] = useState(0)
  const { statisticalRes }: StatisticalState = useSelector((state: any) => state.StatisticalReducer);

  useEffect(() => {
    dispatch(onLoadThongBao(LOAD_THONG_BAO, { maTinh: 1, maHuyen: 1, maXa: 1, typeId: 1 }))
  }, [])

  useMemo(() => {
  }, [statisticalRes])

  useMemo(() => {
    dispatch(onLoadThongBao(LOAD_THONG_BAO, { maTinh: 1, maHuyen: 1, maXa: 1, typeId: indexTab + 1 }))
  }, [indexTab])

  const submitAndNextTab = (name, _obj, isSubmit) => {
    console.log(name, _obj, isSubmit)
  }

  return (
    <>
      <Screen>
        <Wallpaper useWrap={true} />
        <Header
          isMenu={true}
          rightIconStyle={styles.rightIconStyle}
          rightIcon={'tab_notify'}
          headerTx={'Thông báo, Cảnh cáo'}
        />
        <View style={styles.wrapContent}>
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
            {
              ["DS ĐT đăng ký lần đầu",
                "DS ĐT y/c cấp lại giấy XNKT",
                "DS ĐT cập nhật thông tin phiếu 1,2",
                "DS ĐT cập nhật nhu cầu hỗ trợ",
                "CB về phân loại đối tượng",
                "CB thời hạn duyệt tiếp nhận thông tin"].map((item) => (
                  <View tabLabel={item} style={{ flex: 1 }}>
                    <ThongBao data={statisticalRes.data} />
                  </View>
                ))
            }

          </ScrollableTabView>
        </View>
      </Screen>
    </>
  );
};
export let Statistical = withNavigation(_Statistical)