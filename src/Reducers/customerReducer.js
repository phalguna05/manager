const initialState = [];
const customerReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_CUSTOMER":
			return [...state, action.payload];
		case "ADD_ALL_CUSTOMERS":
			return [...state, ...action.payload];
		case "MAKE_PAYMENT":
			const cust = state.filter(
				(obj) => obj._id === action.payload.customer_id
			);
			var arr = cust[0].Chits.filter(
				(chit) => chit.ChitId !== action.payload.chit_id
			);
			var chit = cust[0].Chits.filter(
				(chit) => chit.ChitId === action.payload.chit_id
			);
			chit.IsPaidInstallment = true;
			arr.push(chit);
			return [
				...state.filter((obj) => {
					if (obj._id === action.payload.customer_id) {
						obj.Chits = arr;
						return true;
					} else {
						return true;
					}
				}),
			];
		case "ADD_CHIT_TO_CUSTOMER":
			return [
				...state.filter((obj) => {
					if (obj._id === action.payload.customer_id) {
						obj.Chits.push({
							ChitId: action.payload.chit_id,
							IsPaidInstallment: false,
						});
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
