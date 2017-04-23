export default function reducer(state={
    page : "/dashboard"
}, action){
    switch(action.type){
        case "ROUTE":{
            state = {...state, page : action.payload}
            break;
        }
    }
    return state;
}