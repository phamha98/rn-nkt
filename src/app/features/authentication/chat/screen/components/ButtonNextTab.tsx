import React from 'react';
import { Button } from '../../../../../library/components/button/button';
import { Text } from '../../../../../library/components/text/text';

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

export default ButtonNext;
