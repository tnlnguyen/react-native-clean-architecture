import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  product: null,
  productCategory: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setProductCategory: (state, action) => {
      state.productCategory = action.payload;
    },
  },
});

const { actions, reducer } = productSlice;

export const productReducer = reducer;
export const { setProduct, setProductCategory } = actions;
