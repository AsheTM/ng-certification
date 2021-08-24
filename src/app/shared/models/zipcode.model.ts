import { EWeatherIcon } from "../enums";


export interface MZipcode {
    condition:  string;
    name:       string;
    zipcode:    string;
    weather:    EWeatherIcon;
};
