import React, { useMemo } from 'react'
import { View, StyleSheet } from 'react-native'
import { ImageRemote, Icon, Text, Button } from '../../../../../../../library/components';
import { FONT_14, typography, FONT_12 } from '../../../../../../../themes';
import StarRating from 'react-native-star-rating';
const star = require('../../../../../../../assets/icon/source/star.png');
const star_full = require('./../../../../../../../assets/icon/source/star_full.png');

const styles = StyleSheet.create({
    wrap: {
        minHeight: 105,
        paddingVertical: 3,
        paddingHorizontal: 3,
        backgroundColor: '#ffffff',
        borderRadius: 0,
    },
    wrapImage: {
        flex: 2,
        borderWidth: 2,
        borderColor: '#c7c7c7'
    },
    wrapInfo: {
        flex: 3,
        paddingLeft: 8,
    },
    row: {
        flexDirection: 'row',
        flex: 1,
    },
    img: {
        resizeMode: 'cover',
        flex: 1,
        width: '100%',
        height: '100%',
    },
    imgDefault: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    infoBottom: {
        flex: 1,
    },
    textName: {
        fontSize: FONT_14,
        fontFamily: typography.helveticaNeue_regular,
        color: '#3D3D3D',
        // flex: 1,
        marginBottom:0,
        letterSpacing: 0.16,
    },
    viewStar: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
    },
    viewAddress: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 3,
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
    title: string;
    ownerName: string;
    phone: string;
    email: string;
    address: string;
    dateEdited: string;
    userEdited: number,
    dateCreated: string;
    userCreated: string;
    isDel: boolean;
    lat: number;
    lng: number;
    rate: number;
    image: string;
}
function renderItem(item: ItemProps, onPress: () => void) {
    return (
        <Button activeOpacity={0.7} style={styles.wrap} onPress={onPress}>
            <View style={styles.row}>
                <View style={styles.wrapImage}><ImageRemote sourceDefault={'default_vpcc'} styleDefault={styles.imgDefault} style={styles.img} source={item.image} /></View>
                <View style={styles.wrapInfo}>
                    <Text numberOfLines={2} style={styles.textName} text={item.title && item.title} />
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
                        <View style={styles.viewAddress}>
                            <Icon containerStyle={{marginBottom:6}} icon={'location'} />
                            <Text numberOfLines={2} style={styles.textAddress} text={item.address && item.address} />
                        </View>
                    </View>
                </View>
            </View>
        </Button>
    )
}

export const Item = ({item,onPress}: {item: ItemProps; onPress: () => void}) => {
    return useMemo(() => renderItem(item,onPress), [item])

}
