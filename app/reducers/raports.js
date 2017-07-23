export default function reducer(state = {
    statistics_list: {
        "Line": {
            labels: [],
            datasets: []
        },
        "HorizontalBar": {
            labels: [],
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
    }
    return state;
}