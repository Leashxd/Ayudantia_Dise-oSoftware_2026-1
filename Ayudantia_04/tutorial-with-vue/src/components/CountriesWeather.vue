<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            countries: [] as WeatherCountry[],
            loading: true,
            error: null as string | null,
        };
    },
    async mounted() {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        try {
            const res = await fetch("/api/weather", { signal: controller.signal });
            const body = await res.json();
            console.log("api/weather response: ", body);
            if (!res.ok) {
                this.error = body?.message ?? "No se pudo cargar el listado de paises.";
                return;
            }

            this.countries = body as WeatherCountry[];
        } catch (_error) {
            this.error = "No hay conexion con el servidor.";
        } finally {
            clearTimeout(timeoutId);
            this.loading = false;
        }
    },
});
</script>

<template>
    <p v-if="loading">Cargando listado de paises...</p>
    <p v-else-if="error">{{ error }}</p>
    <div v-else class="country-list">
        <RouterLink
            v-for="country in countries"
            :key="country.slug"
            :to="{ name: 'CountryWeather', params: { country: country.slug } }"
            class="btn btn-primary country-card"
        >
            <strong>{{ country.country }}</strong>
            <small>Capital: {{ country.capital }}</small>
            <small>Ver clima en vivo</small>
        </RouterLink>
    </div>
</template>
