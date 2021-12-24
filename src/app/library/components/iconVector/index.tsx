import React, { Component } from 'react'

import { default as AntDesignRN } from 'react-native-vector-icons/AntDesign';
import { default as EvilIconsRN } from 'react-native-vector-icons/EvilIcons';
import { default as FontAwesomeRN } from 'react-native-vector-icons/FontAwesome';
import { default as FontAwesome5RN } from 'react-native-vector-icons/FontAwesome5';
import { default as IoniconsRN } from 'react-native-vector-icons/Ionicons';
import { default as MaterialCommunityIconsRN } from 'react-native-vector-icons/MaterialCommunityIcons';
import { default as MaterialIconsRN } from 'react-native-vector-icons/MaterialIcons';

class Icon extends React.PureComponent {
    static Type = {
        Ionicons: IoniconsRN,
        AntDesign: AntDesignRN,
        EvilIcons: EvilIconsRN,
        MaterialIcons: MaterialIconsRN,
        MaterialCommunityIcons: MaterialCommunityIconsRN,
        FontAwesome: FontAwesomeRN,
        FontAwesome5: FontAwesome5RN,
    }
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        var { type, size, color, name, icon } = this.props;
        type = type == null || type == '' ? 'Ionicons' : type;
        size = size || 24;
        color = color || 'black';
        name = name || icon || '';

        var IconView = Icon.Type[type];
        return (
            <IconView size={size} color={color} name={name} />
        );
    }
}
Icon.defaultProps = {
    type: '',
    size: '',
    name: '',
    icon: '',
    color: ''
}

var Ionicons = (props) => {
    return <Icon {...props} type='Ionicons' />
}

var AntDesign = (props) => {
    return <Icon {...props} type='AntDesign' />
}

var EvilIcons = (props) => {
    return <Icon {...props} type='EvilIcons' />
}

var MaterialIcons = (props) => {
    return <Icon {...props} type='MaterialIcons' />
}

var MaterialCommunityIcons = (props) => {
    return <Icon {...props} type='MaterialCommunityIcons' />
}

var FontAwesome = (props) => {
    return <Icon {...props} type='FontAwesome' />
}

var FontAwesome5 = (props) => {
    return <Icon {...props} type='FontAwesome5' />
}

export { Ionicons };
export { AntDesign };
export { MaterialIcons };
export { EvilIcons };
export { MaterialCommunityIcons };
export { FontAwesome };
export { FontAwesome5 };
export default Icon
