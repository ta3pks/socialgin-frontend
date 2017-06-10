export function nextMonth(){
    return {
        type : "NEXT_MONTH"
    }
}

export function previousMonth(){
    return {
        type : "PREVIOUS_MONTH"
    }
}

export function setCalendarType(type){
    return {
        type : "SET_CALENDAR_TYPE",
        payload : type
    }
}