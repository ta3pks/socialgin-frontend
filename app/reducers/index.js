import { combineReducers } from "redux";

import User from "./user";
import Router from "./router";
import Modal from "./modal";

export default combineReducers({
    User,
    Router,
    Modal,
})