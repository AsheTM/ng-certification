import { EWeatherIcon } from "./weather.enum";

export type TZipcode = {
    condition:  string;
    name:       string;
    zipcode:    string;
    weather:    EWeatherIcon;
};
