export default function reducer(state={
    modal : false
}, action){
    switch(action.type){
        case "TOGGLE":{
            state = {...state, modal : !state.modal}
            break;
        }
    }
    return state;
}