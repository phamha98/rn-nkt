//import liraries
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '../button/button'
import { Text } from '../text/text'

// create a component
const ButtonNext = (props) => {
    return (
        <Button
            {...props}
            style={{
                backgroundColor: 'rgba(0,190,212,1)',
                borderRadius: 50,
                marginTop: 20,
                top: 0,
                width: '100%',
                height: 50
            }}
        >
            <Text
                style={{
                    fontWeight: 'bold'
                }}
            >
                {
                    props.children
                }
            </Text>
        </Button>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default ButtonNext;
