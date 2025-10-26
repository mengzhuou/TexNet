import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Login.module.scss';
import { loginUser } from '../../../connector';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/actions/userActions';
import { loginSuccess } from '../../redux/reducers/authSlice';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateInput = () => {
        if (!formData.username.trim()) return "Please enter a username.";
        if (!formData.password.trim()) return "Please enter a password.";
        if (formData.password.length < 6) return "Password must be at least 6 characters.";
        return null;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        const validationError = validateInput();
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        try {
            console.log("formData: ", formData);
            const response = await loginUser(formData.username, formData.password);
            console.log("response: ", response);
            localStorage.setItem('authToken', response.token);

            dispatch(setUserInfo({
                username: response.user.username,
                role: response.user.role,
                balance: response.user.balance || 0,
                companyName: response.user.companyName || '',
                contactPerson: response.user.contactPerson || '',
                email: response.user.email || '',
                phone: response.user.phone || '',
                address: response.user.address || {
                    country: '',
                    provinceState: '',
                    unitNumber: '',
                    streetNumber: '',
                    street: '',
                    city: '',
                    postalCode: ''
                }
            }));

            dispatch(loginSuccess());

            navigate('/MainPage');
        } catch (error) {
            console.error(error);
            setErrorMessage(error.response?.data?.message || 'Login failed, please check your credentials.');
        }
    };

    return (
        <div className={styles["login-container"]}>
            <div className={styles["form-container"]}>
                <h1 className={styles["form-title"]}>Login</h1>
                {errorMessage && <div className={styles["error-message"]}>{errorMessage}</div>}

                <input
                    className={styles["login-input-field"]}
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                />
                <input
                    className={styles["login-input-field"]}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                />
                <button className={styles["login-submit-button"]} onClick={handleSubmit}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
