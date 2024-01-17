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
const onLocationFound = (e: any) => {
  self.value = [e.latlng.lat, e.latlng.lng];
  setTimeout(
    () =>
      Leaflet.circle(self.value, {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 10 * zoom.value,
      })
        .addTo(map.value)
        .on("click", FocusOnMarker),
    1000
  );
};
const onLocationError = (e: any) => console.log(e.message);

const zoom = ref(0);
const SetZoom = (e: any) => (zoom.value = e.target._zoom);

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
  setTimeout(() => map.value.invalidateSize(), 1);
  Leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map.value);
  map.value.locate({ setView: true, maxZoom: 50 });
  map.value.on("locationfound", onLocationFound);
  map.value.on("locationerror", onLocationError);
  map.value.on("zoomend", SetZoom);
  SetMarkers();
  setTimeout(() => {
    map.value.flyTo(self.value, 15);
  }, 1000);
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
