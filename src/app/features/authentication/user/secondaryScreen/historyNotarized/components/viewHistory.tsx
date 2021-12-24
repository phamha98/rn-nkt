import React from 'react'
import { View, StyleSheet } from 'react-native'
import { GlobalStyle } from '../../../../../../themes';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from '../../../../../../library/components'

import { ItemHistory } from './itemHistory'
import { FONT_14 } from '../../../../../../themes'
import { translate } from '../../../../../../library/utils/i18n/translate';
import moment from 'moment';

const styles = StyleSheet.create({
    contentStyle: {
        paddingVertical: 5,
        paddingBottom: 45,
    },
    textName: {
        fontSize: FONT_14,
        paddingVertical: 5,
        color: '#565656',
    },
    viewNull: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 400
    },
})
interface listHistory {
    datas: Array<any>;
}

export const ViewHistory = ({ datas }: listHistory) => {
    const _renderItem = ({ item, index }) => {
        var jsonData;
        try {
            var jsonStr = "";
            if (item.newJson) {
                jsonStr = item.newJson;
            } else {
                jsonStr = item.oldJson;
            }
            jsonData = JSON.parse(jsonStr);
        }
        catch (e) {
            console.log(e)
            return <ItemHistory textName={''} textMsg={''} txTime={""} />
        }
        var status = "";
        if (jsonData.statusid) {
            switch (jsonData.statusid) {
                case 2:
                    status = translate('main:profileCC:tvWait');
                    break;
                case 3:
                    status = translate('main:profileCC:tvNeedAdditional');
                    break;
                case 5:
                    status = translate('main:profileCC:tvInProcess');
                    break;
                case 6:
                    status = translate('main:profileCC:tvEnoughDoc');
                    break;
                case 7:
                    status = translate('main:profileCC:tvDone');
                    break;
                case 9:
                    status = translate('main:profileCC:tvCancel');
                    break;
                default:
                    break;
            }
        }
        return <ItemHistory textName={jsonData.service_title} textMsg={status} txTime={moment(jsonData.dateexpected ? jsonData.dateexpected : jsonData.dateend)
            .format('DD-MM-YYYY')} />
    }
    const _keyExtractor = (item, index): string => index.toString();
    return (
        <View style={[GlobalStyle.fullScreen]}>
            <FlatList showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.viewNull}>
                        <Text style={styles.textName} numberOfLines={1} tx={'main:user:txtNull'} />
                    </View>
                }
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentStyle}
                keyExtractor={_keyExtractor}
                renderItem={_renderItem}
                data={datas}
            />
        </View>
    )
}
