export function selectAccount(id){
    return {
        type : "SELECT_ACCOUNT",
        payload : id
    }
}

export function fetchAccounts(account_info){
    return {
        type : "FETCH_ACCOUNT",
        payload : account_info
    }
}

export function addAccount(account){
    return {
        type : "ADD_ACCOUNT",
        payload : account
    }
}
export function removeAccount(id){
    return {
        type : "REMOVE_ACCOUNT",
        payload : id
    }
}

export function userName(user_name){
    return {
        type : "USER_NAME",
        payload : user_name
    }
}

export function avatar(avatar){
    return {
        type : "AVATAR",
        payload : avatar
    }
}