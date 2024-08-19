import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetAlert } from '../../../redux/slice/alert.slice';

function Alert(props) {
    const { color, message } = useSelector((state) => state.alert);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    useEffect(() => {
        if (message != '') {
            enqueueSnackbar({
                variant: color, message: message,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                }
            });
        }
    }, [message]);

    const timeref = setTimeout(() => {
        dispatch(resetAlert())
    }, 2000)

    return() => {
        clearTimeout(timeref);
    }
    

    return (
        <div>

        </div>
    );
}

export default Alert;




