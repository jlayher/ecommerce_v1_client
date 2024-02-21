import { createSlice } from '@reduxjs/toolkit';


//set initial state.  It is stored here, but accessed throughout the application.  This is a Redux Store.  Its like local state, but global :b.
const initialState = {
    isCartOpen: false,
    cart: [],
    items: [],
}

export const cartSlice = createSlice({

    name: "cart",
    // initial state above
    initialState,

    // actions/reducers
    reducers: {
        //we have a function "setItems".  Any time we use setItems, we can change the state of "items".  It will be equal to what we pass to the action/payload
        //action payload will be the new state.  
        //Normally you shouldn't mutate state like this, but Redux Toolkit allows you to due to a package called "immutable".  State is not actually mutated under the hood.  
        setItems: (state, action) => {
            state.items = action.payload;
        },

        // whatever item is passed to the action is added to the cart array
        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload.item]
        },

        // when we want to remove an item from our cart.  Return an array of all elements that pass the test.  The removed item will have an item.id that we check for and remove.
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        },

        //Increase the amount of an item in the cart.  
        increaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id) {
                    item.count++;
                }
                return item
            })
        },

        decreaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id && item.count > 1) {
                    item.count--;
                }
                return item
        })
        },

        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen;
        }
    }
});

// these act as our gloabl functions to manage state
export const {
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen
} = cartSlice.actions;

export default cartSlice.reducer;