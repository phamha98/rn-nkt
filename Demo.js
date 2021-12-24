import Slider from '@react-native-community/slider'
import React, { Component } from 'react'
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

export class Demo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: 50,
            date: '12345678'
        }
    }

    render() {
        return (
            <SafeAreaView
                style={{ backgroundColor: 'red' }}
                allowFontScaling={false}
                accessible={null}
                importantForAccessibility={'no-hide-descendants'}
            >
                <Text
                    accessible={false}
                    focusable={false}
                    allowFontScaling={false}
                > textInComponent </Text>
                {/* <Slider
                    value={this.state.value}
                    style={{ width: 200, height: 40 }}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    onValueChange={value => {
                        this.setState({ value })
                    }}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                />
                <TouchableOpacity
                    onPress={() => this.setState({ value: 80 })}
                >
                    <Text>{'dsadasd'}</Text>
                </TouchableOpacity>

                <TextInputMask
                    type={'datetime'}
                    options={{
                        format: 'YYYY/MM/DD'
                    }}
                    style={{
                        backgroundColor: 'blue'
                    }}
                    value={this.state.date}
                    onChangeText={text => {
                        this.setState({
                            date: text
                        })
                    }}
                    ref={(ref) => this.datetimeField = ref}
                />
                <TouchableOpacity
                    onPress={() => {
                        // const isValid = this.datetimeField.isValid()
                        // console.log(isValid)
                        this.setState({date: '87654321'})
                    }}
                >
                    <Text>{'Vaild'}</Text>
                </TouchableOpacity> */}
            </SafeAreaView>
        )
    }
}

export default Demo
