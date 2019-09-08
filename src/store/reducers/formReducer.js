const initState = {
    isFormSent:false,
    formSentError:null,
    loading: false,
};

const formReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SIGNUP_ERROR':
            return {
                ...state,
                authError: action.err.message
            };
        default:
            return state;
    }
};

export default formReducer;