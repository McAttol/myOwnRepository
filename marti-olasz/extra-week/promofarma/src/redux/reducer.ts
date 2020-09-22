import { Reducer } from 'react';
import types from './actionTypes';

function reducer(state: any, action: any): Reducer<any, any> {
	let result = null;
	switch (action.type) {
		case types.ADD_TO_CART:
			result = { ...state, cart: [...state.cart, action.payload] };
			break;
		case types.REMOVE_FROM_CART:
			const newCart = state.cart.filter(
				(element: any) => element !== action.payload
			);
			result = { ...state, cart: newCart };
			break;
		case types.CHANGE_PRODUCT_IN_CART:
			const newProducts = state.products.map((element: any) => {
				if (element.id === action.payload) element.inCart = !element.inCart;
				return element;
			});

			result = { ...state, products: newProducts };
			break;
		default:
			result = state;
	}

	return result;
}

export default reducer;