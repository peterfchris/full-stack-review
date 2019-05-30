const initialState = {
    username: '',
    firstname: '',
    lastname: '',
    balance: null,
    id: null
}

const UPDATE_USER = 'UPDATE_USER'
const CLEAR_USER = 'CLEAR_USER'

export function updateUser(user){
    return {
        type: UPDATE_USER, //why is it called type? What does type mean?
        payload: user //why payload?
    }
}

export function clearUser(){
    return {
        type: CLEAR_USER
    }
}

function reducer(state = initialState, action){
    switch(action.type){
        case UPDATE_USER:
            console.log(action.payload)
        default:
            return state
    }
}

export default reducer