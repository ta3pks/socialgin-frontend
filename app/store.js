import {applyMiddleware, createStore} from "redux";

import reducers from "./reducers/index";

const error = (store) => (next) => (action) =>{
    try{
        next(action);
    }catch(e){
        console.log(e)
    }
}

const middleware = applyMiddleware(error);

export default createStore(reducers, middleware)