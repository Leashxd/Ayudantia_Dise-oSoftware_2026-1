import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import CountryWeather from "../components/CountryWeather.vue";

export default createRouter({
    history: createWebHistory("/"),
    routes: [
        {
            path: "/",
            name: "Home",
            component: HomePage,
        },
        {
            path: "/:country",
            name: "CountryWeather",
            component: CountryWeather,
            props: true,
        },
    ],
});
