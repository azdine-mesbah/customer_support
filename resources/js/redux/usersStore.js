import { createStore } from 'redux';

const LOAD_USERS = "loadUsers";

export function loadUsers(users){
    return {type:LOAD_USERS, payload:users}
}

function usersReducer(state = [], {type, payload}){
    switch(type){
        case LOAD_ISSUES: state = payload;break;
    }
    return state;
}

const usersStore = createStore(usersReducer);

export default usersStore;