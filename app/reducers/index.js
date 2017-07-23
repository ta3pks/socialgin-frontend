import { combineReducers } from "redux";

import User from "./user";
import Router from "./router";
import Modal from "./modal";
import Share from "./share";
import Calendar from "./calendar";
import Settings from "./settings";
import Report from "./raports";

export default combineReducers({
    User,
    Router,
    Modal,
    Share,
    Calendar,
    Settings,
    Report
})