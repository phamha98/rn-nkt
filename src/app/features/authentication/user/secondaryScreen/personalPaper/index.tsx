import React, { useEffect } from 'react'
import { View } from 'react-native'
import Splash from 'react-native-splash-screen'
import { useDispatch, useSelector } from 'react-redux'
import { onGetUserById } from '../../../../../features/authentication/home/childrenScreen/flowCreate/infoNotary/redux/action'
import { CreateNotaryState } from '../../../../../features/authentication/home/childrenScreen/flowCreate/infoNotary/redux/reducer'
import { ResetState as ResetStateProfile } from '../../../../../features/authentication/home/childrenScreen/flowCreate/profileNotary/redux/action'
import { Header, Screen, Wallpaper } from '../../../../../library/components'
import { DELETE_USER_PAPER, GET_LIST_PERSONAL_PAPERS, Info_User_By_Id_API } from '../../../../../library/networking'
import { translate } from '../../../../../library/utils/i18n/translate'
import ProgressHolder from '../../../../../library/utils/progressHolder'
import { ViewPersonalPaper } from './components/viewPersonalPaper'
import { onDeletePersonalPaper, onGetListPersonalPaper, ResetState } from './redux/action'
import { PersonalPaperState } from './redux/reducer'
import { styles } from './style'
export const PersonalPaper = ({ navigation }) => {
    const dispatch = useDispatch();
    const { customer }: CreateNotaryState = useSelector((state: any) => state.CreateNotary);
    const { profile } = useSelector((state: any) => state.AppReducer);
    const { loading,
        finishDelete,
        refresh,
        loadMore,
        isLoadEnd,
        error,
        codeRefresh,
        codeLoadMore,
        listPersonalPapers }: PersonalPaperState = useSelector((state: any) => state.PersonalPaperReducer);
    useEffect(() => {
        dispatch(onGetListPersonalPaper(GET_LIST_PERSONAL_PAPERS(customer.id), {
        }));
        return () => {
            dispatch(ResetState())
        };
    }, [customer]);
    useEffect(() => {
        Splash.hide();
        dispatch(onGetUserById(Info_User_By_Id_API + profile.id))
        return () => {
            dispatch(ResetStateProfile())
        };
    }, []);

    useEffect(() => {
        if (loading) {
            ProgressHolder.visible(translate('dialog:loading'));
        } else {
            ProgressHolder.hidden();
        }
    }, [loading]);

    // useEffect(() => {
    //     if (finishDelete) {
    //         dispatch(onGetListPersonalPaper(GET_LIST_PERSONAL_PAPERS(customer.id), {
    //         }));
    //         return () => {
    //             dispatch(ResetState())
    //         };
    //     }
    // }, [finishDelete]);


    const goBack = () => {
        navigation.goBack();
    }

    const onDeleteItem = (item: any) => {
        const index = listPersonalPapers.findIndex(itemChild => itemChild.id === item.id);
        if (index > -1) {
            listPersonalPapers.splice(index, 1);
        };
        setTimeout(() => {
            ProgressHolder.hidden();
        }, 3000);
        dispatch(onDeletePersonalPaper(DELETE_USER_PAPER(item.id), {}))
    }


    return (
        <>
            <Screen>
                <Wallpaper useWrap={true} />
                <Header
                    isBack={true}
                    headerTx={'main:user:tvPapers'} />
                <View style={styles.body}>
                    <View style={styles.wrapContent}>
                        <ViewPersonalPaper datas={listPersonalPapers} onDeleteItem={onDeleteItem} />
                    </View>
                </View>
            </Screen>
        </>
    )
}
