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

export function nextWeek(){
    return {
        type : "NEXT_WEEK"
    }
}
export function previousWeek(){
    return {
        type : "PREVIOUS_WEEK"
    }
}

export function nextDay(){
    return {
        type : "NEXT_DAY"
    }
}
export function previousDay(){
    return {
        type : "PREVIOUS_DAY"
    }
}