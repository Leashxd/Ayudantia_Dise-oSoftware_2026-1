<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: { country: String },
    data(): ComponentData {
        return {
            countryWeatherDetails: null,
            loading: true,
            error: null,
        };
    },
    async mounted() {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        try {
            this.loading = true;
            this.error = null;
            const res = await fetch(`/api/weather/${this.country}`, {
                signal: controller.signal,
            });
            const body = await res.json();
            console.log(`LOG countries /api/weather/${this.country} response:`, body);

            if (!res.ok) {
                this.error = body.message ?? "No se pudo cargar el clima.";
                return;
            }

            this.countryWeatherDetails = body;
        } catch (_error) {
            this.error = "No hay conexion con el servidor o la API externa (timeout).";
        } finally {
            clearTimeout(timeoutId);
            this.loading = false;
        }
    }
});
</script>

<template>
    <p v-if="loading">Cargando clima en vivo...</p>
    <p v-else-if="error">{{ error }}</p>
    <div v-else-if="countryWeatherDetails">
        <h1>{{ countryWeatherDetails.country }}</h1>
        <p><strong>Capital:</strong> {{ countryWeatherDetails.capital }}</p>
        <p><strong>Temperatura:</strong> {{ countryWeatherDetails.temperatureC }} °C</p>
        <p><strong>Condicion:</strong> {{ countryWeatherDetails.condition }}</p>
        <p><strong>Humedad:</strong> {{ countryWeatherDetails.humidity }}%</p>
        <p><strong>Viento:</strong> {{ countryWeatherDetails.windKph }} km/h</p>
        <p><strong>Actualizado:</strong> {{ countryWeatherDetails.updatedAt }}</p>
        <p><strong>Fuente:</strong> {{ countryWeatherDetails.source }}</p>
    </div>
    <RouterLink to="/" class="btn btn-secondary">Volver a todos los paises</RouterLink>
</template>
