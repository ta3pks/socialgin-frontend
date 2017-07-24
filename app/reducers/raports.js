export default function reducer(state = {
    statistics_list: {
        "Line": {
            labels: [],
            datasets: []
        },
        "Bar": {
            labels: [],
            datasets: []
        },
        "Country" : {
            datasets: []
        }
    }
}, action) {
    switch (action.type) {
        case "SET_LINE_LABELS":
            {
                var statistics_list = Object.assign({}, state.statistics_list);
                statistics_list["Line"].labels = action.payload
                state = { ...state,
                    statistics_list: statistics_list
                }
                break;
            }
        case "SET_LINE_DATASET":
            {
                var statistics_list = Object.assign({}, state.statistics_list);
                statistics_list["Line"].datasets.push(action.payload)
                state = { ...state,
                    statistics_list: statistics_list
                }
                break;
            }
        case "REMOVE_LINE_DATASET":
            {
                var statistics_list = Object.assign({}, state.statistics_list);
                for (var i = 0; i < statistics_list["Line"].datasets.length; i++) {
                    if (statistics_list["Line"].datasets[i].user_id == action.payload) {
                        statistics_list["Line"].datasets.splice(i, 1)
                    }
                }
                state = { ...state,
                    statistics_list: statistics_list
                }
                break;
            }
        case "SET_BAR_LABELS":
            {
                var statistics_list = Object.assign({}, state.statistics_list);
                statistics_list["Bar"].labels = action.payload
                state = { ...state,
                    statistics_list: statistics_list
                }
                break;
            }
        case "SET_BAR_DATASET":
            {
                var statistics_list = Object.assign({}, state.statistics_list);
                statistics_list["Bar"].datasets.push(action.payload)
                state = { ...state,
                    statistics_list: statistics_list
                }
                break;
            }
        case "REMOVE_BAR_DATASET":
            {
                var statistics_list = Object.assign({}, state.statistics_list);
                var datasets= statistics_list["Bar"].datasets.filter(dataset=>{
                    return dataset.user_id != action.payload
                })
                statistics_list["Bar"].datasets = datasets;
                state = { ...state,
                    statistics_list: statistics_list
                }
                break;
            }
        case "SET_COUNTRY_DATASET":
            {
                var statistics_list = Object.assign({}, state.statistics_list);
                statistics_list["Country"].datasets.push(action.payload)
                state = { ...state,
                    statistics_list: statistics_list
                }
                break;
            }
        case "REMOVE_COUNTRY_DATASET":
            {
                var statistics_list = Object.assign({}, state.statistics_list);
                var datasets= statistics_list["Country"].datasets.filter(dataset=>{
                    return dataset.user_id != action.payload
                })
                statistics_list["Country"].datasets = datasets;
                state = { ...state,
                    statistics_list: statistics_list
                }
                break;
            }
    }
    return state;
}