import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Screen, Wallpaper } from '../../../../../library/components';
import { Get_History_CC } from '../../../../../library/networking';
import { ViewHistory } from './components/viewHistory';
import { onGetListHistory, ResetState } from './redux/action';
import { HistoryNotaryState } from './redux/reducer';
import { styles } from './style';
export const HistoryNotarized = ({ navigation }, props: any) => {
    const dispatch = useDispatch();
    const { loading,
        refresh,
        loadMore,
        isLoadEnd,
        error,
        codeRefresh,
        codeLoadMore,
        listHistory }: HistoryNotaryState = useSelector((x: any) => x.HistoryNotary)
    const goBack = () => {
        navigation.goBack();
    };
    const dataDetailUser = useSelector(state => state.AppReducer.profile.user);
    useEffect(() => {
        dispatch(onGetListHistory(Get_History_CC, {
            ui: dataDetailUser.userid
        }));
        return () => {
            dispatch(ResetState())
        };
    }, []);
    return (
        <>
            <Screen>
                <Wallpaper useWrap={true} />
                <Header
                    isBack={true}
                    rightIcon={'filter'}
                    headerTx={'main:user:tvHistory'}
                />
                <View style={styles.wrapContent}>
                    {!loading && <ViewHistory datas={listHistory} />}
                </View>
            </Screen>
        </>
    );
};
