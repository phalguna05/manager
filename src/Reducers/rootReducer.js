import {combineReducers} from 'redux';
import UserReducer from './userReducer';
import ChitReducer from './chitReducer';
import CustomerReducer from './customerReducer';
const rootReducer=combineReducers(
    {
        User:UserReducer,
        Chits:ChitReducer,
        Customers:CustomerReducer
    }    
)
export default rootReducer;