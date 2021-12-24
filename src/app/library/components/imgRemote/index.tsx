import React, { useState, useEffect } from 'react'
import { Image, ImageStyle, StyleSheet } from 'react-native'
import { ImageRemoteProps } from './imgRemote.props'
import { mergeAll, flatten } from 'ramda';
import { Img } from '../image/image';

const BASE: ImageStyle = {
    width: 24,
    height: 24,
    resizeMode: 'contain',
}
const BASE_DEFAULT: ImageStyle = {
    resizeMode: 'cover',
}
export function ImageRemote({ source, style: styleOverride, styleDefault, sourceDefault }: ImageRemoteProps) {
    const [url, setUrl] = useState('')
    const imageStyle = mergeAll(flatten([BASE, styleOverride]));
    const imgDefaultStyle = mergeAll(flatten([BASE_DEFAULT, styleDefault]));
    const checkUrlImage = () => {
        fetch(source)
            .then(res => {
                if (res.status === 200) {
                    setUrl(source);
                }
            })
            .catch(err => { setUrl('') })
    }

    useEffect(() => {
        checkUrlImage();
    }, [source])
    return url !== '' ? (
        <Image source={{ uri: url }} style={imageStyle} />
    ) : (<Img style={imgDefaultStyle} source={sourceDefault ? sourceDefault : 'default'} />)
}
