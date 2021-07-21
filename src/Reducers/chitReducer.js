const initialState=[];
const chitReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'ADD_CHITS':
            return [...state,...action.payload];
        case 'ADD_SINGLE_CHIT':
            return [...state,action.payload];
        case 'UPDATE_MEMBERS':
            return {
                ...state,
                ChitMembers:state.map(
                    (chit)=>{
                        if(chit._id==action.payload.chit_id){
                            return action.payload.chit_members;
                        }
                        else{
                            return chit.ChitMembers
                        }
                    }
                )
                
            }
        default:
            return state;

    }
}
export default chitReducer;