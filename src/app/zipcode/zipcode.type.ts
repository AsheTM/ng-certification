import { TTemperature, MZipcode } from "../shared";


export type TWeather = MZipcode & {
    location:       string;
    temperature:    TWeatherTemperature;
};

export type TWeatherTemperature = TTemperature & {
    current:    number;
};
