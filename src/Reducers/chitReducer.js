const initialState = [];
const chitReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_CHITS":
			return [...state, ...action.payload];
		case "ADD_SINGLE_CHIT":
			return [...state, action.payload];
		case "UPDATE_MEMBERS":
			return [
				...state.filter((obj) => {
					if (obj._id == action.payload.chit_id) {
						obj.ChitMembers = action.payload.chit_members;
						return true;
					} else {
						return true;
					}
				}),
			];
		case "REMOVE_MEMBER":
			let obj = state.filter((ob) => ob._id === action.payload.chit_id);
			var newObj = obj[0];
			let newMembers = newObj.ChitMembers.filter(
				(member) => member !== action.payload.member
			);
			return [
				...state.filter((obj) => {
					if (obj._id === action.payload.chit_id) {
						obj.ChitMembers = newMembers;
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
export default chitReducer;
