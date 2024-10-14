import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { checkAuth } from '../../redux/slice/auth.slice';

function PrivateRoutes(props) {
    const [loading, setLoading] = useState(true);

    const { isAuthentication } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthState = async() => {
            try {
               await dispatch(checkAuth());
            } catch (error) {
                navigate("/authForm")
            } finally {
                setLoading(false);
            }
        }

        checkAuthState();
      }, [dispatch, navigate])

    if(loading){
        return <div>Loading...</div>;
    }

    return (
        isAuthentication ? <Outlet /> : <Navigate to={"/admin"} replace />
    );
}

export default PrivateRoutes;