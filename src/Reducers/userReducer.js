const initialState={};
const userReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'ADD_USER':
            return {...initialState,...action.payload};
        default:
            return state;
    }
}
export default userReducer;