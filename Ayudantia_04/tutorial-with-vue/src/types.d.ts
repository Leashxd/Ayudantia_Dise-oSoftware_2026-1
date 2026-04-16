type WeatherCountry = {
    country: string;
    slug: string;
    capital: string;
    countryCode: string;
};


type WeatherDetails = {
    country: string;
    slug: string;
    capital: string;
    temperatureC: number;
    condition: string;
    humidity: number;
    windKph: number;
    updatedAt: string;
    source: string;
};

type ComponentData = {
    countryWeatherDetails: null | WeatherDetails;
    loading: boolean;
    error: string | null;
}
