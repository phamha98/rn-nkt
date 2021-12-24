import React, { useMemo, useState, useEffect, useRef } from 'react'
import { View, StyleSheet, RefreshControl } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useSafeArea } from 'react-native-safe-area-context'
import { Divider } from '../../../../../../../library/components'
import { Item } from './item'
import { SEVICE_AND_NOTARY } from "../../../../../../../navigation/screenTypes";
import { navigate } from "../../../../../../../navigation/navigationService";
import { useDispatch } from "react-redux";
import { saveStaffSelected } from "../../redux/action";
const styles = StyleSheet.create({
    wrap: {
        flex: 1
    },
    wrapBetween: {
        paddingVertical: 1.5,
    }
})
interface ListItemProps {
    data: Array<any>;
    onLoadMore: () => void;
    onRefresh: () => void;
    refresh: boolean;
    getListStaffAndAddress: () => void;
    itemToScroll: any
}

export const ListItem = ({ data, onLoadMore, onRefresh, refresh, getListStaffAndAddress, itemToScroll }: ListItemProps) => {
    const inset = useSafeArea();
    const dispatch = useDispatch();
    const [flatListRef, setFlatListRef] = useState()
    const [refreshing, setRefreshing] = useState(false)
    const _onRefresh = () => {
        setRefreshing(true)
        onRefresh && onRefresh();
    }


    useEffect(() => {
        if (itemToScroll && flatListRef) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].lat == itemToScroll.lat && data[i].lng == itemToScroll.lng) {
                    flatListRef.scrollToIndex({ animated: true, index: i });
                    break;
                }
            }

        }
    }, [itemToScroll])


    const _onDetail = (items: any) => {
        dispatch(saveStaffSelected(items));
        navigate(SEVICE_AND_NOTARY, { 'SERVICE_AND_NOTARY': items, getListStaffAndAddress: getListStaffAndAddress })
    }
    const _renderItem = ({ item, index }: { item: any, index: number }) => {
        return <Item item={item} key={item.id ? item.id : index} onPress={() => _onDetail(item)} />
    }
    const _keyExtractor = (item, index): string => item.id ? item.id.toString() : index.toString();
    const renderItemSeparatorComponent = () => {
        return <View style={styles.wrapBetween}>
            <Divider height={1} />
        </View>
    }
    return (
        <View style={styles.wrap}>
            <Divider color={'#DCDCDC'} height={1} />
            <FlatList
                ref={(ref: any) => {
                    setFlatListRef(ref)
                }}
                refreshControl={<RefreshControl refreshing={refresh} onRefresh={_onRefresh} />}
                ItemSeparatorComponent={renderItemSeparatorComponent}
                renderItem={_renderItem}
                keyExtractor={_keyExtractor}
                data={data}
                contentContainerStyle={{ paddingBottom: inset.bottom }}
                onEndReached={onLoadMore}
                onEndReachedThreshold={0.001} />
        </View>
    )
}

