import { createStore } from 'redux';

const LOAD_USER = "loadUser";

export function loadUser(user){
    return {type:LOAD_USER, payload:user}
}

function userReducer(state = {}, {type, payload}){
    switch(type){
        case LOAD_USER: state = payload;break;
    }
    return state;
}

const currentUserStore = createStore(userReducer);

export default currentUserStore;