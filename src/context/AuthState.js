import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import AxiosAuth from '../utils/AxiosAuth';
import { USER_LOADED, LOGIN, LOGOUT } from './Types';
import { createContext } from 'react';

export const authContext = createContext();

const AuthState = props => {
    const initialState = {
        user: JSON.parse(window.localStorage.getItem('user')),
        isAuthenticated: null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Load User
    const loadUser = () => {
        const token = window.localStorage.getItem('token');

        if (token) {
            dispatch({ type: USER_LOADED });
        }
    };

    // Login User
    const login = formData => {
        AxiosAuth()
            .post('/login', formData)
            .then(res => {
                dispatch({
                    type: LOGIN,
                    payload: res.data.token
                });
            })
            .catch(err => console.log(err));
    }


    // Logout
    const logout = () => dispatch({ type: LOGOUT });

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                login,
                logout,
                loadUser
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;