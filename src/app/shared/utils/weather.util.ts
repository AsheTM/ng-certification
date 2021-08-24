import { EWeatherIcon } from "../enums";


export function getWeatherIcon(weather: string): EWeatherIcon {
    switch(weather) {
        case 'Clear': 
            return EWeatherIcon.sun;
        case 'Ash': 
        case 'Clouds': 
        case 'Dust': 
        case 'Fog': 
        case 'Haze': 
        case 'Mist': 
        case 'Sand': 
        case 'Smoke': 
        case 'Squall': 
        case 'Tornado': 
            return EWeatherIcon.clouds;
        case 'Drizzle': 
        case 'Rain': 
        case 'Thunderstorm': 
            return EWeatherIcon.rain;
        case 'Snow': 
            return EWeatherIcon.snow;
        default: 
            return null;
    }
}
