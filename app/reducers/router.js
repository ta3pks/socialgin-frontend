export default function reducer(state = {
    page: {
        "Management": {
            url: "/management",
            active: true,
            main: true
        },
        "Calendar": {
            url: "/calendar",
            active: false,
            main: true
        },
        "Reports": {
            url: "/reports",
            active: false,
            main: true
        },
        "Profile": {
            url: "/profile",
            active: false,
            main: false
        },
        "Groups": {
            url: "/groups",
            active: false,
            main: false
        },
        "Notifications": {
            url: "/notifications",
            active: false,
            main: false
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