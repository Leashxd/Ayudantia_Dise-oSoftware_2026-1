import { Application, Router } from "@oak/oak";
import { oakCors } from "@tajpouria/cors";
import routeStaticFilesFrom from "./util/routeStaticFilesFrom.ts";
import data from "./data.json" with { type: "json" };

type SupportedCountry = {
    country: string;
    slug: string;
    capital: string;
    countryCode: string;
};

type GeocodingResponse = {
    results?: Array<{
        latitude: number;
        longitude: number;
    }>;
};

type ForecastResponse = {
    current?: {
        temperature_2m: number;
        relative_humidity_2m: number;
        wind_speed_10m: number;
        weather_code: number;
        time: string;
    };
};

export const app = new Application();
const router = new Router();
const supportedCountries = data as SupportedCountry[];

function weatherCodeToText(code: number): string {
    if (code === 0) return "Despejado";
    if (code === 1 || code === 2) return "Parcialmente nublado";
    if (code === 3) return "Nublado";
    if (code === 45 || code === 48) return "Niebla";
    if (code >= 51 && code <= 57) return "Llovizna";
    if (code >= 61 && code <= 67) return "Lluvia";
    if (code >= 71 && code <= 77) return "Nieve";
    if (code >= 80 && code <= 82) return "Chubascos";
    if (code >= 95 && code <= 99) return "Tormenta";
    return "Condicion desconocida";
}

router.get("/api/weather", (context) => {
    context.response.body = supportedCountries;
});

router.get("/api/weather/:country", async (context) => {
    if (!context?.params?.country) {
        context.response.status = 400;
        context.response.body = { message: "No country provided." };
        return;
    }

    const countryWeather = supportedCountries.find((item) =>
        item.slug.toLowerCase() === context.params.country.toLowerCase()
    );

    if (!countryWeather) {
        context.response.status = 404;
        context.response.body = { message: "Country is not supported." };
        return;
    }

    try {
        const geocodingUrl = new URL("https://geocoding-api.open-meteo.com/v1/search");
        geocodingUrl.searchParams.set("name", countryWeather.capital);
        geocodingUrl.searchParams.set("count", "1");
        geocodingUrl.searchParams.set("countryCode", countryWeather.countryCode);
        geocodingUrl.searchParams.set("language", "es");
        geocodingUrl.searchParams.set("format", "json");

        const geocodingRes = await fetch(geocodingUrl);
        if (!geocodingRes.ok) {
            context.response.status = 502;
            context.response.body = { message: "Geocoding API is unavailable." };
            return;
        }

        const geocodingData = await geocodingRes.json() as GeocodingResponse;
        const location = geocodingData.results?.[0];

        if (!location) {
            context.response.status = 404;
            context.response.body = { message: "Location not found in geocoding API." };
            return;
        }

        const forecastUrl = new URL("https://api.open-meteo.com/v1/forecast");
        forecastUrl.searchParams.set("latitude", `${location.latitude}`);
        forecastUrl.searchParams.set("longitude", `${location.longitude}`);
        forecastUrl.searchParams.set(
            "current",
            "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
        );
        forecastUrl.searchParams.set("timezone", "auto");

        const forecastRes = await fetch(forecastUrl);
        if (!forecastRes.ok) {
            context.response.status = 502;
            context.response.body = { message: "Forecast API is unavailable." };
            return;
        }

        const forecastData = await forecastRes.json() as ForecastResponse;
        const current = forecastData.current;

        if (!current) {
            context.response.status = 502;
            context.response.body = { message: "Invalid response from forecast API." };
            return;
        }

        context.response.body = {
            country: countryWeather.country,
            slug: countryWeather.slug,
            capital: countryWeather.capital,
            temperatureC: current.temperature_2m,
            humidity: current.relative_humidity_2m,
            windKph: current.wind_speed_10m,
            condition: weatherCodeToText(current.weather_code),
            updatedAt: current.time,
            source: "Open-Meteo",
        };
    } catch (_error) {
        context.response.status = 500;
        context.response.body = { message: "Failed to fetch weather from external API." };
    }
});

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(routeStaticFilesFrom([
    `${Deno.cwd()}/dist`,
    `${Deno.cwd()}/public`,
]));

if (import.meta.main) {
    console.log("Server listening on port http://localhost:8000");
    await app.listen({ port: 8000 });
}
