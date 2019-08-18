const initState = {
    authError: null,
    loading: false
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return {
              ...state,
              loading: true
            };
        case 'STOP_LOADING':
            return {
                ...state,
                loading: false
            };
        case 'LOGIN_ERROR':
            console.log('Login Error!', action.err);
            return {
                ...state,
                authError: action.err
            };
        case 'LOGIN_SUCCESS':
            console.log('Login Success!');
            return {
                ...state,
                authError: null
            };
        case 'SIGNOUT_SUCCESS':
            console.log('Sign Out Success!');
            return state;
        case 'SIGNUP_SUCCESS':
            console.log('Sign Up Success!');
            return {
                ...state,
                authError: null
            };
        case 'SIGNUP_ERROR':
            console.log('Sign Up Error');
            return {
                ...state,
                authError: action.err
            };
        default:
            return state;
    }
};

export default authReducer;