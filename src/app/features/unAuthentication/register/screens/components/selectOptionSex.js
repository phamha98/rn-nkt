import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, Picker, StyleSheet, Modal, TouchableHighlight, Button } from 'react-native';
export default class selectOptionSex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pickerSelection: '---Lựa chọn giới tính---',
            PickerDisplayed: false
        }
    }
    setPicketValue(newValue) {
        this.setState({
            pickerSelection: newValue
        });
        this.togglePicker();

    }

    togglePicker() {
        this.setState({
            PickerDisplayed: !this.state.PickerDisplayed
        });
    }
    render() {
        const pickerValues = [
            {
                title: 'Nam',
                value: 'Nam'
            },
            {
                title: 'Nữ',
                value: 'Nữ'
            },
        ]
        return (
            <View style={styles.container}>
                <Button onPress={() => this.togglePicker()} title={this.state.pickerSelection}></Button>
                <Modal onRequestClose={() => this.togglePicker()} visible={this.state.PickerDisplayed} animationType={"Slide"} transparent={true} onRequestClose={() => console.log('close')}>
                    <View style={{ backgroundColor: '#fff', padding: 20, bottom: 20, left: 20, right: 20, position: 'absolute', alignItems: 'center' ,borderRadius:5,borderWidth:1,borderColor:'#ccc'}}>
                        <ScrollView style={{ flex: 1 ,width:'100%',}}>
                            <Text style={{ fontWeight: 'bold', alignItems: 'center', marginBottom: 10 }}>Lựa chọn</Text>
                            {pickerValues.map((value, index) => {
                                return <TouchableHighlight key={index} onPress={() => this.setPicketValue(value.value)} style={{ paddingBottom: 4, paddingTop: 4, alignContent: 'center',borderBottomWidth:0.3,borderColor:'gray' }}>
                                    <Text style={{lineHeight:40,textAlign:'center',fontSize:18,color:'gray'}}>{value.title}</Text>
                                </TouchableHighlight>
                            })}
                            <TouchableHighlight onPress={() => this.togglePicker()} style={{ paddingBottom: 4, paddingTop: 4, }}>
                                <Text style={{ color: '#999' ,textAlign:'center',fontSize:22}}>Thoát</Text>
                            </TouchableHighlight>
                        </ScrollView>
                    </View>

                </Modal >
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'
    },
});
