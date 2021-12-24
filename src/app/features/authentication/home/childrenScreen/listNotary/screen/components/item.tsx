import React, { useMemo } from 'react'
import { View, StyleSheet } from 'react-native'
import { Divider, ImageRemote, Icon, Text, Button } from '../../../../../../../library/components';
import { FONT_14, typography, FONT_12 } from '../../../../../../../themes';
import StarRating from 'react-native-star-rating';
const star = require('../../../../../../../assets/icon/source/star.png');
const star_full = require('./../../../../../../../assets/icon/source/star_full.png');

import { any, o } from 'ramda';
const styles = StyleSheet.create({
    wrap: {
        height: 105,
        paddingVertical: 3,
        paddingHorizontal: 3,
        backgroundColor: '#ffffff',
        borderRadius: 0,
    },
    wrapImage: {
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapInfo: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 5,
    },
    row: {
        flexDirection: 'row',
        flex: 1,
    },
    img: {
        resizeMode: 'cover',
        alignSelf: 'center',
        borderRadius: 45,
        width: 90,
        height: 90,
    },
    imgDefault: {
        resizeMode: 'cover',
        alignSelf: 'center',
        borderRadius: 45,
        width: 90,
        height: 90,
        borderWidth:0.5,
        borderColor:'#dcdcdc'
    },
    infoBottom: {
        paddingBottom: 8,
    },
    textName: {
        fontSize: FONT_14,
        paddingLeft: 4,
        paddingVertical: 3,
        fontFamily: typography.helveticaNeue_regular,
        color: '#3D3D3D',
        letterSpacing: 0.16,
    },
    viewStar: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        paddingVertical: 3,
    },
    viewAddress: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingBottom: 3,
        width: '100%'
    },
    starDisable: {
        tintColor: '#DCDCDC'
    },
    textAddress: {
        color: '#3D3D3D',
        flex: 1,
        fontFamily: typography.helveticaNeue_regular,
        fontSize: FONT_12,
        letterSpacing: 0.16,
        paddingLeft: 3,
    }
})

const ArrStar = Array(5).fill(0);
export interface ItemProps {
    id: number;
    guid: string;
    userID: string;
    vpccid: number;
    fullname: string;
    gender: number;
    address: string;
    isDel: string;
    image: string,
    rate: number;
    lat: number;
    lng: number;
}
function renderItem(item: ItemProps,onPress: () => void) {
    // const random = Math.floor(Math.random() * 5) + 1;
    // //console.log(item)
    return (
        <Button activeOpacity={0.7} style={styles.wrap} onPress={onPress}>
            <View style={styles.row}>
                <View style={styles.wrapImage}><ImageRemote sourceDefault={'default_ccv'} styleDefault={styles.imgDefault} style={styles.img} source={item.image} /></View>
                <View style={styles.wrapInfo}>
                    <Text numberOfLines={1} style={styles.textName} text={item.fullname && item.fullname} />
                    <View style={styles.viewAddress}>
                        <Icon icon={'location'} />
                        <Text numberOfLines={1} style={styles.textAddress} text={item.title_vpcc && item.title_vpcc} />
                    </View>
                    <View style={styles.infoBottom}>
                        <View style={styles.viewStar}>
                            {/*{ArrStar.map((item, index) => {*/}
                            {/*    return index <= (item.rate ? item.rate : -1) ? <Icon key={index} icon={'start_full'} /> : <Icon key={index} style={styles.starDisable} icon={'start_full'} />*/}
                            {/*})}*/}
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={item.rate ? Math.floor(item.rate) : 0}
                                emptyStar={star}
                                fullStar={star_full}
                                fullStarColor={'rgba(0,190,212,1)'}
                                // containerStyle={{width: 20,height: 20}}
                                starSize={16}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Button>
    )
}
export const Item = ({ item,onPress }: { item: ItemProps,onPress: () => void }) => {
    return useMemo(() => renderItem(item,onPress), [item])

}
