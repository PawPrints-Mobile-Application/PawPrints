<template>
  <LayoutPage>
    <LayoutHeader label="MAP" />
    <main>
      <div ref="containerMap" id="map" />
    </main>
  </LayoutPage>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { LayoutPage, LayoutHeader } from "../../layout";
import Leaflet from "leaflet";

const coords = reactive({
  latitude: 0,
  longitude: 0,
});

const containerMap = ref();
const map = ref();

const GetLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      coords.latitude = position.coords.latitude;
      coords.longitude = position.coords.longitude;
    });
  }
};

onMounted(() => {
  map.value = Leaflet.map(containerMap.value).fitWorld();
  Leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map.value);
});
</script>
<style scoped>
main {
  width: 100%;
  height: calc(100% - 50px);
  border-radius: 5px;
  background-color: var(--theme-secondary-background);
  outline: 2px solid black;
  overflow: hidden;
}

#map {
  width: 100%;
  height: 100%;
}
</style>
