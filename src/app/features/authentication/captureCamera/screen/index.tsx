import CameraRoll from '@react-native-community/cameraroll'
import React, { useEffect, useRef, useState } from 'react'
import { CameraType, FlashMode, RNCamera } from 'react-native-camera'
import ImageResizer from 'react-native-image-resizer'
import Splash from 'react-native-splash-screen'
import { Header, Screen } from '../../../../library/components'
import DropDownHolder from '../../../../library/utils/dropDownHolder'
import { translate } from '../../../../library/utils/i18n/translate'
import ProgressHolder from '../../../../library/utils/progressHolder'
import { navigate } from '../../../../navigation/navigationService'
import { CREATE_SELECT_IMAGE_NOTARY } from '../../../../navigation/screenTypes'
import { FunctionBottom } from './components'
import { styles } from './style'
export const CaptureCamera = ({ navigation }) => {
    const selectedImg = navigation.getParam("LST_IMAGE_SELECTED", []);
    const _camera = useRef(null)
    const [imgSelected, setImgSelected] = useState(selectedImg)
    const [imgCaptured, setImgCaptured] = useState(null)
    const [firstUri, setFirstUri] = useState(null)
    const [flashMode, setFlashMode] = useState(0)
    const [camType, setCamType] = useState(true)
    const onGoBack = () => {
        navigation.goBack()
    }
    const onCapture = async () => {
        if (_camera) {
            const options = { quality: 0.5, base64: true, };
            const data = await _camera.current.takePictureAsync(options);
            if (data.uri) {
                CameraRoll.saveToCameraRoll(data.uri).then((val) => {
                    setImgSelected(imgSelected.concat({ node: { image: { ...data, uri: data.uri, filename: `${Math.random()}.jpg`, type: "image/jpeg" } } }));
                    setImgCaptured(data.uri);
                    ImageResizer.createResizedImage(val, 600, 800, 'JPEG', 100).then(newIMG => {
                        const upLoadIMG = {
                            node: {
                                image: {
                                    uri: newIMG.uri,
                                    filename: newIMG.name,
                                    type: 'image/jpeg',
                                    height: newIMG.height,
                                    width: newIMG.width,
                                    size: newIMG.size
                                }
                            }
                        }
                        setSelectedImage(imgSelected.push(upLoadIMG))
                        navigation.state.params.setSelectedImage && navigation.state.params.setSelectedImage(imgSelected);
                        navigation.goBack();

                    }).catch(error => {
                        DropDownHolder.showError(translate('dialog:error'), translate('error:saveAsyncFailed'))
                        navigation.goBack();
                        return;
                    })
                }).catch((error: any) => {
                    //console.log('take picture error: ', error)
                    DropDownHolder.showWarning(
                        translate('dialog:error'),
                        translate('error:cannotSaveImage'),
                    );
                })
            }
        }
    };
    const setSelectedImage = (data: any) => {
        setImgSelected(data)
    }
    const onViewLibrary = () => {
        //console.log("object", imgSelected)
        navigate(CREATE_SELECT_IMAGE_NOTARY, { 'LST_IMAGE_SELECTED': imgSelected, setSelectedImage: setSelectedImage, onUploadImg: onUploadImg })
    }

    //Xu ly anh sau khi chon anh tu Galery
    const onUploadImg = (upload: false, img: any) => {
        if (upload && img) {
            //console.log("TOTAL_IMAGE", img.length)
            let newL = [];
            if (img.length > 0) {
                ProgressHolder.visible('Đang upload 0 %');
            }
            var count = 0;
            img.forEach((element, index) => {
                //console.log("FFFF", newL)
                ImageResizer.createResizedImage(element.node.image.uri, 600, 800, 'JPEG', 100).then(newIMG => {
                    newL.push({
                        node: {
                            image: {
                                uri: newIMG.uri,
                                filename: newIMG.name,
                                type: 'image/jpeg',
                                height: newIMG.height,
                                width: newIMG.width,
                                size: newIMG.size
                            }
                        }
                    }
                    )

                    count++;
                    ProgressHolder.visible('Đang upload ' + Math.round((count * 99) / img.length) + '%');
                    //console.log("TOTAL_COUNT", count)
                    if (count === img.length) {
                        //console.log("object", newL)
                        ProgressHolder.hidden()
                        navigation.state.params.setSelectedImage && navigation.state.params.setSelectedImage(newL);
                        navigation.goBack();
                    }
                }).catch(error => {
                    count++;
                    //console.log("ERRORR", error)
                    ProgressHolder.hidden();
                    navigation.goBack();
                    return;
                })
            });
            return;
        }
        let newL = [];
        if (imgSelected.length > 0) {
            ProgressHolder.visible(translate('dialog:loading'))
        }
        imgSelected.forEach((element, index) => {
            //console.log("FFFF", newL)
            ImageResizer.createResizedImage(element.node.image.uri, 600, 800, 'JPEG', 100).then(newIMG => {
                newL.push({
                    node: {
                        image: {
                            uri: newIMG.uri,
                            filename: newIMG.name,
                            type: 'image/jpeg',
                            height: newIMG.height,
                            width: newIMG.width,
                            size: newIMG.size
                        }
                    }
                }
                )
                if (index === imgSelected.length - 1) {
                    //console.log("object", newL)
                    ProgressHolder.hidden()
                    navigation.state.params.setSelectedImage && navigation.state.params.setSelectedImage(newL);
                    navigation.goBack();
                }
            }).catch(error => {
                //console.log("ERRORR", error)
                ProgressHolder.hidden();
                navigation.goBack();
                return;
            })
        });
    }
    const renderFlashMode = (): keyof FlashMode => {
        switch (flashMode) {
            case 0:
                return 'off'
            case 1:
                return 'auto'
            case 2:
                return 'on'
            default:
                return 'off'
        }
    }
    const renderCamType = (): keyof CameraType => {
        switch (camType) {
            case true:
                return 'back'
            case false:
                return 'front'
            default:
                return 'back'
        }
    }
    const _getFirstPhoto = () => {
        const fetchParams: CameraRoll.GetPhotosParams = {
            first: 1,
            assetType: 'Photos',
        };

        CameraRoll.getPhotos(fetchParams)
            .then((r: CameraRoll.PhotoIdentifiersPage) => {
                // //console.log('Get first photo from data: ',r)
                if (Array.isArray(r.edges) && r.edges.length > 0) {
                    setFirstUri(r.edges[0].node.image.uri)
                }
            })
            .catch(err => {
                //console.log('Get first photo error: ', err);
                DropDownHolder.showWarning(
                    translate('dialog:warning'),
                    translate('error:canNotLoadImage'),
                );
            });
    };

    useEffect(() => {
        _getFirstPhoto();
    }, [imgCaptured])
    useEffect(() => {
        Splash.hide()
        _getFirstPhoto()
        return () => {

        };
    }, [])
    return (
        <>
            <Screen>
                <Header
                    isBack={true}
                />
                {/* {imgCaptured && <Animated.View style={[styles.wrapImageCaptured, { width: widthImg, height: heightImg }]}>
                    <Image style={styles.imgCaptured} source={{ uri: imgCaptured }} />
                </Animated.View>} */}
                <RNCamera
                    captureAudio={false}
                    ref={_camera}
                    style={styles.preview}
                    type={renderCamType()}
                    flashMode={renderFlashMode()}
                />
                <FunctionBottom uriFirstImage={firstUri} onSetCamType={setCamType} onSetFlashMode={setFlashMode} onCapture={onCapture} onViewLibrary={onViewLibrary} />
            </Screen>
        </>
    )
}
