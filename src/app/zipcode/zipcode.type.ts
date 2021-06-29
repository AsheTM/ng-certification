import { TTemperature, TZipcode } from "../shared";


export type TWeather = TZipcode & {
    temperature:    TWeatherTemperature;
};

export type TWeatherTemperature = TTemperature & {
    current:    number;
};
