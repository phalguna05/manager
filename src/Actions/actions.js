export const addUser=(data)=>{
    return{
        type:'ADD_USER',
        payload:data
    }

}
export const addChits=(data)=>{
    return{
        type:'ADD_CHITS',
        payload:data
    }
}
export const addSingleChit=(data)=>{
    return{
        type:'ADD_SINGLE_CHIT',
        payload:data
    }
}
export const addCustomer=(data)=>{
    return{
        type:'ADD_CUSTOMER',
        payload:data
    }
}
export const addAllCustomers=(data)=>{
    return{
        type:'ADD_ALL_CUSTOMERS',
        payload:data
    }
}
export const updateMembers=(data)=>{
    return{
        type:'UPDATE_MEMBERS',
        payload:data
    }
}