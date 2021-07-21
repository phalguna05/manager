const initialState=[];
const customerReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'ADD_CUSTOMER':
            return [...state,action.payload];
        case 'ADD_ALL_CUSTOMERS':
            return [...state,...action.payload] 
        default:
            return state
    }
}
export default customerReducer;