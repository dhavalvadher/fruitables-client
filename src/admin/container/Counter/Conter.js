import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../../redux/slice/counter.slice';
// import { decrement, increment } from '../../component/redux/slice/counter.slice';


function Conter(props) {

    const incdec = useSelector(state => state.counter_slice)
    console.log(incdec);

    const dispatch = useDispatch();

    const handleInc = () => {
        dispatch(increment())
    }
    const handleDec = () => {
        dispatch(decrement())
    }
    return (
        <div>
            <button onClick={handleInc}>+</button>
            {incdec.count}
            <button onClick={handleDec}>-</button>
        </div>
    );
}

export default Conter;