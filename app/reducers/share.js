export default function reducer(state={
    text : "",
    images : [],
    link : "",
    date : new Date()
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
    }
    return state;
}