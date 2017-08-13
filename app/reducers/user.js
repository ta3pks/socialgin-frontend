import Language from "../language/index";
import cookier from "../../public/js/cookier";

export default function reducer(state={
    user_name : "",
    name : "",
    surname : "",
    avatar : "",
    list : {},
    email : "",
    language : Language[cookier.parse("lang") || "eng"]
}, action){
    switch(action.type){
        case "FETCH_ACCOUNT":{
            var data = {}
            for(var i=0; i<action.payload.length; i++){
                var account = action.payload[i];
                account.selected = false;
                data[account.id] = account;
            }
            state = {...state, list : data}
            break;
        }
        case "SELECT_ACCOUNT": {
            var accounts = Object.assign({}, state.list);
            accounts[action.payload].selected = !accounts[action.payload].selected;
            state = {...state, list : accounts}
            break;
        }
        case "UNSELECT_ALL": {
            var accounts = Object.assign({}, state.list);
            for (var key in accounts) {
                if (accounts.hasOwnProperty(key)) {
                    accounts[key].selected = false;
                } 
            }
            state = {...state, list : accounts}
            break;
        }
        case "ADD_ACCOUNT":{
            var accounts = Object.assign({}, state.list);
            var account = action.payload;
            account.selected = false;
            accounts[account.id] = account;
            state = {...state, list : accounts}
            break;
        }
        case "REMOVE_ACCOUNT":{
            var accounts = Object.assign({}, state.list);
            delete accounts[action.payload];
            state = {...state, list : accounts}
            break;
        }
        case "USER_NAME":{
            state = {...state, user_name : action.payload}
            break;
        }
        case "AVATAR":{
            state = {...state, avatar : action.payload}
            break;
        }
        case "SET_MAIL":{
            state = {...state, email : action.payload}
            break;
        }
        case "SET_NAME_SURNAME":{
            state = {...state, name : action.payload.name, surname: action.payload.surname}
            break;
        }
    }
    return state;
}