import React from 'react'
import { View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import { GlobalStyle } from '../../../../../../themes';
import { FlatList } from 'react-native-gesture-handler';
import { Text, ButtonClose, Icon } from '../../../../../../library/components'
import Modal from 'react-native-modal'
import { FONT_14 } from '../../../../../../themes';
import Lightbox from 'react-native-lightbox';
import ViewPager from '@react-native-community/viewpager'
import ProgressHolder from '../../../../../../library/utils/progressHolder';
import { translate } from '../../../../../../library/utils/i18n/translate';


const windowWidth = Dimensions.get('window').width;


const styles = StyleSheet.create({
    contentStyle: {
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
    img: {
        resizeMode: 'cover',
        width: windowWidth / 3 - 5,
        height: windowWidth / 3 - 5,
    },
    modal: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        justifyContent: 'flex-end'
    },
})
interface listHistory {
    datas: Array<any>;
    onDeleteItem: any
}

export const ViewPersonalPaper = ({ datas, onDeleteItem }: listHistory) => {
    const { height, width } = Dimensions.get('window');
    const onDelete = (item: any) => {
        ProgressHolder.visible(translate('dialog:loading'));
        onDeleteItem && onDeleteItem(item)
    }
    const renderViewpagerImage = (album: any, currentPage: number) => (
        <ViewPager initialPage={currentPage} orientation={'horizontal'} style={{ width, height }} >
            {album.map(item => (
                <View key={'' + currentPage} style={{ width, height }}>
                    <Image source={{ uri: item.url }} style={{ flex: 1, resizeMode: 'contain' }} />
                </View>))}
        </ViewPager>
    );
    return (
        <View style={[GlobalStyle.fullScreen]}>
            <FlatList showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.viewNull}>
                        <Text style={styles.textName} numberOfLines={1} tx={'main:user:paperNull'} />
                    </View>
                }
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentStyle}
                renderItem={({ item, index }) => (
                    <Lightbox
                        renderHeader={(close: Function) => <ButtonClose onPress={close} />}
                        renderContent={() => {
                            return (
                                renderViewpagerImage(datas, index)
                                // <Image source={{ uri: item.url }} style={{ flex: 1, resizeMode: 'contain' }} />
                            )
                        }}
                    >
                        <View style={{ backgroundColor: '#f1f1f1', flex: 1, width: windowWidth / 3, height: windowWidth / 3, justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={styles.img} source={{ uri: item.url }} />
                            <TouchableOpacity
                                onPress={() => onDelete(item)}
                                style={{ width: 20, height: 20, position: 'absolute', top: 10, right: 10, zIndex: 1000 }}
                            >
                                <View style={{ backgroundColor: '#fff', borderRadius: 10 }}>
                                    <Icon style={{ width: 20, height: 20 }} icon={'close'} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Lightbox>
                )}
                numColumns={3}
                data={datas}
            />
        </View>
    )
}
