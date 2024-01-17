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

const CenterLatLng = (latlng: { lat: number; lng: number }) => [
  latlng.lat,
  latlng.lng,
];

const self = ref();
const position = ref();
const onLocationFound = (e: any) => {
  position.value = [e.latlng.lat, e.latlng.lng];
  setTimeout(() => map.value.flyTo(position.value, 15), 2);
};
const onLocationError = (e: any) => console.log(e.message);

const zoom = ref(0);
const SetZoom = (e: any) => {
  zoom.value = e.target._zoom;
  if (!position.value) return;
  if (!!self.value) map.value.removeLayer(self.value);
  self.value = Leaflet.circle(position.value, {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 100 * ((zoom.value - 1) / zoom.value),
  })
    .addTo(map.value)
    .on("click", FocusOnMarker);
};

const SetMarkers = () =>
  Array.from(ObjectToMap(Landmarks.entries).values()).map((landmark) => {
    Leaflet.marker([landmark.coords.x, landmark.coords.y])
      .addTo(map.value)
      .on("click", FocusOnMarker);
  });

const FocusOnMarker = (e: any) =>
  map.value.setView(CenterLatLng(e.target.getLatLng()), 15);

onMounted(() => {
  map.value = Leaflet.map(containerMap.value).fitWorld();
  Leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map.value);

  setTimeout(() => map.value.invalidateSize(), 1);
  map.value.on("locationfound", onLocationFound);
  map.value.on("locationerror", onLocationError);
  map.value.on("zoomend", SetZoom);
  map.value.locate({ setView: true, maxZoom: 50 });
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
