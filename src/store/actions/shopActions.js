export const addItemsToCart = (items, totalSum) => {
    return (dispatch, getState) => {
        let cartItems = [...getState().shop.cartItems];
        const cartSum = getState().shop.cartSum += totalSum;
        console.log('items', items, totalSum);
        console.log('cart', cartItems, cartSum);
        let leftItems = [...items];

        if (cartItems.length > 0) {
            cartItems = cartItems.map(ing => {
                let itemReturn = null;
                items.forEach(item => {
                    if (item.id === ing.id) {
                        const numOfItems = ing.numOfItems + item.numOfItems;
                        itemReturn = {
                            ...ing,
                            numOfItems
                        };
                        leftItems = leftItems.filter(leftItem => leftItem.id !== ing.id);
                    }
                });
                if (itemReturn) {
                    return itemReturn;
                } else {
                    return {...ing};
                }
            });

            if (leftItems && leftItems.length > 0) {
                cartItems = [...cartItems, ...leftItems];
            }

        } else {
            cartItems = [...items];
        }

        try {
            localStorage.setItem("holyVeganCartItems", JSON.stringify(cartItems));
            localStorage.setItem("holyVeganCartSum", JSON.stringify(cartSum));

        } catch (e) {
            console.log('e', e);
        }
        dispatch({
            type: 'ADD_ITEMS_TO_CART', payload: {
                cartItems,
                cartSum
            }
        });
    };
};

export const getCartItemsAndSum = () => {
    return (dispatch, getState) => {
        let cartItems = [...getState().shop.cartItems];
        let cartSum = getState().shop.cartSum;
        if (cartItems.length === 0) {
            try {
                cartItems = JSON.parse(localStorage.getItem("holyVeganCartItems"));
                cartSum = JSON.parse(localStorage.getItem("holyVeganCartSum"));
                if (!cartItems || !cartSum) {
                    cartItems = [];
                    cartSum = 0;
                }
            } catch (e) {
                console.log('e', e);
            }
        }
        dispatch({
            type: 'GET_CART_ITEMS_AND_SUM', payload: {
                cartItems,
                cartSum
            }
        });
    }
};

export const removeItemFromCart = (itemId, sum) => {
    return (dispatch, getState) => {
        let cartItems = [...getState().shop.cartItems];
        const cartSum = getState().shop.cartSum - sum;
        cartItems = cartItems.filter(ing => ing.id !== itemId);
        try {
            localStorage.setItem("holyVeganCartItems", JSON.stringify(cartItems));
            localStorage.setItem("holyVeganCartSum", JSON.stringify(cartSum));

        } catch (e) {
            console.log('e', e);
        }
        dispatch({
            type: 'REMOVE_ITEM_FROM_CART', payload: {
                cartItems,
                cartSum
            }
        });
    }
};

export const handleMinus = (id, range, sum) => {
    return (dispatch, getState) => {
        let cartItems = [...getState().shop.cartItems];
        let cartSum = getState().shop.cartSum;

        cartItems = cartItems.map(ing => {
            let newItem = {...ing};
            if (ing.id === id) {
                if (ing.numOfItems > range) {
                    const numOfItems = ing.numOfItems - range;
                    newItem = {...newItem, numOfItems};
                    cartSum -= sum;
                }
            }
            return newItem;
        });

        try {
            localStorage.setItem("holyVeganCartItems", JSON.stringify(cartItems));
            localStorage.setItem("holyVeganCartSum", JSON.stringify(cartSum));

        } catch (e) {
            console.log('e', e);
        }

        dispatch({
            type: 'HANDLE_MINUS', payload: {
                cartItems,
                cartSum
            }
        });
    }
};

export const handlePlus = (id, range, sum) => {
    return (dispatch, getState) => {
        let cartItems = [...getState().shop.cartItems];
        let cartSum = getState().shop.cartSum;

        cartItems = cartItems.map(ing => {
            let newItem = {...ing};
            if (ing.id === id) {
                if (ing.numOfItems < 15) {
                    const numOfItems = ing.numOfItems + range;
                    newItem = {...newItem, numOfItems};
                    cartSum += sum;
                }
            }
            return newItem;
        });

        try {
            localStorage.setItem("holyVeganCartItems", JSON.stringify(cartItems));
            localStorage.setItem("holyVeganCartSum", JSON.stringify(cartSum));

        } catch (e) {
            console.log('e', e);
        }

        dispatch({
            type: 'HANDLE_PLUS', payload: {
                cartItems,
                cartSum
            }
        });
    }
};