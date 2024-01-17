<template>
  <LayoutPage>
    <LayoutHeader label="MAP" />
    <main>
      <div ref="containerMap" id="map" />
    </main>
  </LayoutPage>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { LayoutPage, LayoutHeader } from "../../layout";
import { Landmarks, ObjectToMap } from "../../utils";
import Leaflet from "leaflet";

const containerMap = ref();
const map = ref();

// const coords = reactive({
//   latitude: 0,
//   longitude: 0,
// });

// const GetLocation = () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       coords.latitude = position.coords.latitude;
//       coords.longitude = position.coords.longitude;
//     });
//   }
// };

const onLocationFound = (e: any) => {
  var radius = e.accuracy;

  Leaflet.marker(e.latlng)
    .addTo(map.value)
    .bindPopup("You are within " + radius + " meters from this point")
    .openPopup();

  Leaflet.circle(e.latlng, radius).addTo(map.value);
};
const onLocationError = (e: any) => console.log(e.message);

const SetMarkers = () =>
  Array.from(ObjectToMap(Landmarks.entries).values()).map((landmark) => {
    Leaflet.marker([landmark.coords.x, landmark.coords.y]).addTo(map.value);
  });

onMounted(() => {
  map.value = Leaflet.map(containerMap.value).fitWorld();
  Leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map.value);
  map.value.locate({ setView: true, maxZoom: 50 });
  map.value.on("locationfound", onLocationFound);
  map.value.on("locationerror", onLocationError);
  SetMarkers();
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
  display: flex;
  justify-content: center;
  align-items: center;
}

#map {
  width: 100%;
  height: 100%;
}
</style>
