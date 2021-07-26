const initialState = [];
const customerReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_CUSTOMER":
			return [...state, action.payload];
		case "ADD_ALL_CUSTOMERS":
			return [...state, ...action.payload];
		case "MAKE_PAYMENT":
			return [
				...state.filter((obj) => {
					if (obj._id === action.payload.customer_id) {
						obj.IsPaidInstallment = true;
						return true;
					} else {
						return true;
					}
				}),
			];

		default:
			return state;
	}
};
export default customerReducer;
