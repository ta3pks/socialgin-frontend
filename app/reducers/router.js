export default function reducer(state = {
    page: {
        "Management": {
            url: "/management",
            active: true
        },
        "Calendar": {
            url: "/calendar",
            active: false
        },
        "Reports": {
            url: "/reports",
            active: false
        },
        "Logs": {
            url: "/logs",
            active: false
        }
    }
}, action) {
    switch (action.type) {
        case "ROUTE": {
            var list = Object.assign({}, state.page);
            for (let key in list) {
                if (list.hasOwnProperty(key)) {
                    if(list[key].active == true){
                        list[key].active = false;
                    }
                }
            }
            list[action.payload].active = true;
            state = {...state, page : list}
            break;
        }
    }
    return state;
}