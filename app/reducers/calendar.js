export default function reducer(state={
    date : new Date(),
    events : []
}, action){
    switch(action.type){
        case "NEXT_MONTH":{
            const nextMonth = new Date(state.date.getFullYear(), state.date.getMonth()+1);
            state = {...state, date : nextMonth}
            break;
        }
        case "PREVIOUS_MONTH":{
            const previousMonth = new Date(state.date.getFullYear(), state.date.getMonth() - 1);
            state = {...state, date : previousMonth}
            break;
        }
    }
    return state;
}