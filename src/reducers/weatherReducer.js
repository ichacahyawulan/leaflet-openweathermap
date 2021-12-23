import { ADD_WEATHER_LAYER } from "../actions";

const weatherReducer = (state = [], action) => {
    switch(action.type) {
        case ADD_WEATHER_LAYER:
            return state = action.value.slice(0)
        default:
            return state
    }
}

export default weatherReducer;