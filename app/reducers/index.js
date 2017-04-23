import { combineReducers } from "redux";

import Accounts from "./accounts";
import Router from "./router";
import Modal from "./modal";

export default combineReducers({
    Accounts,
    Router,
    Modal,
})