export default function reducer(state={
    list : {
        1 : {
            fullname : "Muhammed Furkan AYDIN",
            profile_image : "https://scontent-otp1-1.xx.fbcdn.net/v/t1.0-9/17952921_1821201181536646_1731148108127961338_n.jpg?oh=8832318f2e04196020bb8a842cc0adb1&oe=597811D0",
            account_type : "facebook"
        },
        2 : {
            fullname : "Ali deniz çılgınçocuk",
            profile_image : "https://scontent-otp1-1.xx.fbcdn.net/v/t1.0-9/15940919_10154523427363778_1386815373402401845_n.jpg?oh=8985ff1cc4b500271322ebb51f1e7636&oe=597816DC",
            account_type : "twitter"
        },
        3 : {
            fullname : "Nikos adisoyadıbilinmeyenoğlu",
            profile_image : "https://scontent-otp1-1.xx.fbcdn.net/v/t1.0-9/15284124_1175937995827923_2861304911399094622_n.jpg?oh=471a5f7267e512b218383455f5c4e717&oe=597A0DAE",
            account_type : "linkedin"
        },
        42 : {
            fullname : "Fikret Orhan",
            profile_image : "https://scontent-otp1-1.xx.fbcdn.net/v/t1.0-9/15284124_1175937995827923_2861304911399094622_n.jpg?oh=471a5f7267e512b218383455f5c4e717&oe=597A0DAE",
            account_type : "twitter"
        }
    }
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
    }
    return state;
}