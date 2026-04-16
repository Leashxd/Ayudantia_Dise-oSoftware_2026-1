<script setup lang="ts">
import CountriesWeather from "./CountriesWeather.vue";
</script>
<template>
  <h1>Clima por Pais</h1>
  <p>Selecciona un pais para consultar clima en vivo usando Open-Meteo.</p>
  <Suspense>
    <template #default>
      <CountriesWeather />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
