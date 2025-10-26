import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { setUserInfo } from '../redux/actions/userActions';

const TokenVerification = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const decoded = jwtDecode(token);

                if (decoded.exp * 1000 > Date.now()) {
                    const { username, role } = decoded;

                    dispatch(setUserInfo({
                        username,
                        role
                    }));
                } else {
                    localStorage.removeItem('authToken');
                }
            } catch (error) {
                console.error('Token verification failed:', error);
                localStorage.removeItem('authToken');
            }
        }
    }, [dispatch]);

    return null;
};

export default TokenVerification;
