import { combineReducers } from "redux";

import User from "./user";
import Router from "./router";
import Modal from "./modal";
import Share from "./share";
import Calendar from "./calendar";
import Settings from "./settings";

export default combineReducers({
    User,
    Router,
    Modal,
    Share,
    Calendar,
    Settings
})