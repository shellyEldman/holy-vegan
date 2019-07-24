const initState = {
    canBuy: false,
    cartSum: 0,
    cartItems: []
};

const shopReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_ITEMS_TO_CART':
            return {
                ...state,
                cartItems: action.payload.cartItems,
                cartSum: action.payload.cartSum
            };
        case 'GET_CART_ITEMS_AND_SUM':
            return {
              ...state,
                cartItems: action.payload.cartItems,
                cartSum: action.payload.cartSum
            };
        case 'REMOVE_ITEM_FROM_CART':
            return {
                ...state,
                cartItems: action.payload.cartItems,
                cartSum: action.payload.cartSum
            };
        case 'HANDLE_MINUS':
            return {
                ...state,
                cartItems: action.payload.cartItems,
                cartSum: action.payload.cartSum
            };
        case 'HANDLE_PLUS':
            return {
                ...state,
                cartItems: action.payload.cartItems,
                cartSum: action.payload.cartSum
            };
        default:
            return state;
    }
};

export default shopReducer;