export const ADD_WEATHER_LAYER = 'ADD_WEATHER_LAYER'

export const addWeatherLayer = (value) => {
    return {
        type: ADD_WEATHER_LAYER,
        value
    }
}