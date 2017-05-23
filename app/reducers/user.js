export default function reducer(state={
    user_name : "",
    avatar : "",
    list : {}
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
            console.log(action.payload)
            delete accounts[action.payload];
            state = {...state, list : accounts}
        }
        case "USER_NAME":{
            state = {...state, user_name : action.payload}
        }
        case "AVATAR":{
            state = {...state, avatar : action.payload}
        }
    }
    return state;
}