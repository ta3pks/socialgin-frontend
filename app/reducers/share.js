let today = new Date();

export default function reducer(state={
    text : "",
    images : [],
    link : "",
    date : today,
    hour : today.getHours(),
    minute : today.getMinutes()
}, action){
    switch(action.type){
        case "SET_TEXT":{
            state = {...state, text : action.payload}
            break;
        }
        case "SET_LINK":{
            state = {...state, link : action.payload}
            break;
        }
        case "SET_DATE":{
            state = {...state, date : action.payload}
            break;
        }
        case "SET_HOUR":{
            state = {...state, hour : action.payload}
            break;
        }
        case "SET_MINUTE":{
            state = {...state, minute : action.payload}
            break;
        }
        case "ADD_IMAGE":{
            const images = state.images.slice();
            images.push(action.payload)
            state = {...state, images : images}
            break;
        }
        case "REMOVE_IMAGE":{
            const images = state.images.slice();
            images.splice(action.payload, 1);
            state = {...state, images : images}
            break;
        }
        case "CLEAN_FORM":{
            today = new Date();
            state = {...state, text : ""}
            state = {...state, images : []}
            state = {...state, link : ""}
            state = {...state, date : today}
            state = {...state, hour : today.getHours()}
            state = {...state,minute : today.getMinutes()}
            break;
        }
    }
    return state;
}