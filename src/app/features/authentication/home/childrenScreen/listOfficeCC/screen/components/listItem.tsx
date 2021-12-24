import React, { useMemo, useState, useEffect, useRef } from 'react'
import { View, StyleSheet, RefreshControl } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useSafeArea } from 'react-native-safe-area-context'
import { Divider } from '../../../../../../../library/components'
import { Item } from './item'
import { navigate } from "../../../../../../../navigation/navigationService";
import { OFFICE_DETAIL } from "../../../../../../../navigation/screenTypes";
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
    getListOfficeAndAddress: () => void;
    itemToScroll: any
}

export const ListItem = ({ data, onLoadMore, onRefresh, refresh, getListOfficeAndAddress, itemToScroll }: ListItemProps) => {
    // let flatListRef = useRef(null);
    const [flatListRef, setFlatListRef] = useState()
    const inset = useSafeArea();
    const [refreshing, setRefreshing] = useState(false)
    const _onRefresh = () => {
        setRefreshing(true)
        onRefresh && onRefresh();
    }
    const _renderItem = ({ item, index }: { item: any, index: number }) => {
        return <Item item={item} key={item.id ? item.id : index} onPress={() => _onDetail(item)} />
    }
    const renderItemSeparatorComponent = () => {
        return <View style={styles.wrapBetween}>
            <Divider height={1} />
        </View>
    }
    const _onDetail = (items: any) => {
        navigate(OFFICE_DETAIL, { 'DETAIL_OFFICE': items, getListOfficeAndAddress: getListOfficeAndAddress })
    }
    const _keyExtractor = (item: any, index: number): string => item.id ? item.id.toString() : index.toString();
    useEffect(() => {
        if (!refresh) {
            setRefreshing(false)
        }
    }, [refresh])


    useEffect(() => {

        if (itemToScroll && flatListRef) {
            for (let i = 0; i < data.length; i++) {
                if(data[i].id == itemToScroll.id){
                    flatListRef.scrollToIndex({ animated: true, index: i });
                    break;
                }
            }
            
        }
    }, [itemToScroll])


    return useMemo(() => {
        return <View style={styles.wrap}>
            <Divider color={'#DCDCDC'} height={1} />
            <FlatList
                ref={(ref: any) => {
                    setFlatListRef(ref)
                }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />}
                ItemSeparatorComponent={renderItemSeparatorComponent}
                renderItem={_renderItem}
                keyExtractor={_keyExtractor}
                data={data}
                contentContainerStyle={{ paddingBottom: inset.bottom }}
                onEndReached={onLoadMore}
                onEndReachedThreshold={0.001}
            />
        </View>
    }, [data, refreshing])
}

