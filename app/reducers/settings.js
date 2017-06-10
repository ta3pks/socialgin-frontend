export default function reducer(state={
    language: "eng"
}, action){
    switch(action.type){
        case "SET_LANGUAGE":{
            state = {...state, language : action.payload}
            break;
        }
    }
    return state;
}