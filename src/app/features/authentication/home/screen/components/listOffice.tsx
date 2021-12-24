import React from 'react'
import { View, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { ItemFlat } from './itemFlat';
import { HomeTabState } from '../../redux/reducer';
import { useSelector } from 'react-redux';
import {navigate} from "../../../../../navigation/navigationService";
import {OFFICE_DETAIL} from "../../../../../navigation/screenTypes";
const styles = StyleSheet.create({
    contentFlat: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        backgroundColor:'#ffffff'
    },
    space: {
        width: 10,
    },
})

export const ListOffice = () => {
    const {listNotaryOffice }:HomeTabState = useSelector((state: any) => state.HomeTab);
    const _onDetail = (item: any) => {
        navigate(OFFICE_DETAIL, { 'DETAIL_OFFICE': item})
    }
    const _renderItem = ({ item, index }) => {
        return <ItemFlat item={item} index={index} key={item.id} onPress={() => _onDetail(item)} />;
    }
    const _itemSeparatorComponent = () => {
        return <View style={styles.space} />;
    };
    const _keyExtractor = (item, index): string => item.id.toString();
    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            overScrollMode={'never'}
            ItemSeparatorComponent={_itemSeparatorComponent}
            contentContainerStyle={styles.contentFlat}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            data={listNotaryOffice}
            horizontal={true}
        />
    )
}
