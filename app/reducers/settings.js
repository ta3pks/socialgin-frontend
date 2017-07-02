export default function reducer(state={
    language: "eng",
    page_load : {
        topbar : false,
        sidebar : false
    }
}, action){
    switch(action.type){
        case "SET_LANGUAGE":{
            state = {...state, language : action.payload}
            break;
        }
        case "LOADED_TOPBAR":{
            state = {...state, page_load : {
                ...state.page_load,
                topbar : true
            }}
            break;
        }
        case "LOADED_SIDEBAR":{
            state = {...state, page_load : {
                ...state.page_load,
                sidebar : true
            }}
            break;
        }
    }
    return state;
}