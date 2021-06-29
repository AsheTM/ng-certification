import { TTemperature, TZipcode } from "../shared";


export type TForecast = Pick<TZipcode, 'condition' | 'weather'> & {
    temperature:    TTemperature;
    date?:          Date;
};

export type TForecasts = TForecast[];

export type TZipForecast = [string, TForecast];

export type TMapForecast = Record<string, TForecast>;
