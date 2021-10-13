import { createStore } from 'redux';

const LOAD_ISSUES = "loadIssues";

export function loadIssues(issues){
    return {type:LOAD_ISSUES, payload:issues}
}

function isuesReducer(state = [], {type, payload}){
    switch(type){
        case LOAD_ISSUES: state = payload;break;
    }
    return state;
}

const issuesStore = createStore(isuesReducer);

export default issuesStore;