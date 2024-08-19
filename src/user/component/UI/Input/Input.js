import React from 'react';
import { Inputbut } from './input.styled';

function Input({SpanErr, ...rest}) {
    return (
        <>
        <Inputbut {...rest}

        />

        <SpanErr>
            
        </SpanErr>
        </>
    );
}

export default Input;