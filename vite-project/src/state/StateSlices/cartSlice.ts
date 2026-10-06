import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartStateType {
    CartItemsIdList: PayloadActionType[];
}

type PayloadActionType = {
    id: number;
    quantity: number;
    price: number;
}

const CartItemsId = localStorage.getItem("CartItemsId");

// Default value
const initialState: CartStateType = {
    CartItemsIdList: CartItemsId ? JSON.parse(CartItemsId).filter((item: PayloadActionType) => 
        item.id && item.price && item.quantity !== undefined
    ) : []
};

// State
const cartSlice = createSlice({
    name: "cart",
    initialState,
    // Reducers
    reducers: {
        addItemToCart: (state, action: PayloadAction<PayloadActionType>) => {
            const { id, quantity, price } = action.payload;
            const isId: boolean = state.CartItemsIdList.some(item => item.id === id);
            const item = state.CartItemsIdList.find(item => item.id === id);
            
            if (!isId) {
                state.CartItemsIdList.push({ id, quantity, price });
                localStorage.setItem("CartItemsId", JSON.stringify(state.CartItemsIdList));
            } else if (isId && item?.quantity !== quantity) {
                if (item) { item.quantity = quantity; }
                localStorage.setItem("CartItemsId", JSON.stringify(state.CartItemsIdList));
            }
        },
        removeItemFromCart: (state, action: PayloadAction<PayloadActionType>) => {
            const { id } = action.payload;
            if (state.CartItemsIdList.some(item => item.id === id) === true && state.CartItemsIdList.findIndex(item => item.id === id) !== -1) {
                const deleteIdIndex: number = state.CartItemsIdList.findIndex(item => item.id === id);
                state.CartItemsIdList.splice(deleteIdIndex, 1);
                localStorage.setItem("CartItemsId", JSON.stringify(state.CartItemsIdList));
            }
        },
        clearAllCartItems: (state) => {
            localStorage.removeItem("CartItemsId");
            state.CartItemsIdList = [];
        }
    }
});

export const { addItemToCart, removeItemFromCart, clearAllCartItems } = cartSlice.actions;
export default cartSlice.reducer;