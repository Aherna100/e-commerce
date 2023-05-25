import { Link, Outlet } from 'react-router-dom';
import React from 'react';
import {
    useGetVerifyUserStatusQuery,
} from '../../api/apiSlice';

const ProtectedRoute = () => {

    const { data } = useGetVerifyUserStatusQuery('userStatus', {
        pollingInterval: 900000
    });

    if (!data) {
        return (
            <div className='container-sm mt-3 text-center'>
                <h1>Unauthorized :(</h1>
                <span>
                    <Link to='/login'>Login</Link> to access
                </span>
            </div>
        )
    }

    return <Outlet />

}
export default ProtectedRoute