export default function reducer(state={
    open : false
}, action){
    switch(action.type){
        case "OPEN_MODAL":{
            state = {...state, open : true}
            break;
        }
        case "CLOSE_MODAL":{
            state = {...state, open : false}
            break;
        }
    }
    return state;
}