<template>
  <LayoutPage>
    <LayoutHeader label="DOGGO CLINICS" />
    <main>
      <div ref="containerMap" id="map" />
    </main>
    <section class="markerDetails" v-show="data.marked">
      <div class="header">
        <TextSubheading :value="data.name" />
        <IonIcon :icon="icon" class="close" @click="HideDetails" />
      </div>
      <div class="schedule detail">
        <ion-icon :icon="time" class="detailIcon" />
        <TextParagraph :value="data.schedule" />
      </div>
      <div class="address detail">
        <ion-icon :icon="location" class="detailIcon" />
        <TextParagraph :value="data.address" />
      </div>
      <div class="contact detail">
        <ion-icon :icon="call" class="detailIcon" />
        <TextParagraph :value="data.contact" />
      </div>
    </section>
  </LayoutPage>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { LayoutPage, LayoutHeader } from "../../layout";
import { Landmarks, ObjectToMap } from "../../utils";
import Leaflet from "leaflet";
import { IonIcon } from "@ionic/vue";
import { close as icon, time, location, call } from "ionicons/icons";
import { TextSubheading, TextParagraph } from "../../components";

const containerMap = ref();
const map = ref();

const data = reactive({
  marked: false,
  name: "",
  schedule: "",
  address: "",
  contact: "",
});

const HideDetails = () => (data.marked = false);

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
  Array.from(ObjectToMap(Landmarks.entries).values()).map((landmark: any) => {
    Leaflet.marker([landmark.coords.x, landmark.coords.y], {
      title: landmark.name,
    })
      .addTo(map.value)
      .on("click", FocusOnMarker);
  });

const FocusOnMarker = (e: any) => {
  map.value.setView(CenterLatLng(e.target.getLatLng()), 15);
  const temp = ObjectToMap(Landmarks.entries).get(e.target.options.title);
  if (!temp) return;
  data.marked = true;
  data.name = temp.name;
  data.address = temp.address;
  data.contact = temp.contact;
  data.schedule = temp.schedule;
};

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
  SetMarkers();
  map.value.locate({ setView: true, maxZoom: 50 });
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
  align-items: flex-end;
  z-index: 1;
}

#map {
  width: 100%;
  height: 100%;
}

.close {
  font-size: 25px;
  background-color: var(--theme-tertiary-background);
  border-radius: 100%;
  color: var(--theme-secondary-background);
  min-width: 25px;
}
.markerDetails {
  left: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  min-height: 60px;
  background-color: var(--theme-secondary-background);
  color: var(--theme-secondary-text);
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 5px;
  position: absolute;
}
.detail {
  display: flex;
  gap: 5px;
  align-items: center;
}
.header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.detailIcon {
  font-size: 20px;
  min-width: 20px;
}
</style>
