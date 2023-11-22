<template>
    <section class="event-card-preview">
      <TextSubheading class="main-label">Associated Events:</TextSubheading>
      <InputSegmentIcon :icons="icons" v-model="show" />
      <TextSubheading class="chosen-label">{{
        texts[icons.indexOf(show)]
      }}</TextSubheading>
      <EventCard v-for="event in events" :event="event" />
    </section>
  </template>
  <script setup lang="ts">
  import {
    layers as all,
    bandage as vaccine,
    eyedrop as medicine,
    fastFood as food,
    ellipsisHorizontal as others,
  } from "ionicons/icons";
  import { TextSubheading } from "../Texts";
  import { EventCard } from ".";
  import { InputSegmentIcon } from "../Forms";
  import { ref } from "vue";
  
  const icons = [all, vaccine, medicine, food, others];
  const texts = ["All", "Vaccines", "Medicines", "Foods", "Others"];
  
  const show = ref(icons[0]);
  
  defineProps({
    events: Array<string>,
    hideLabel: Boolean,
  });
  </script>
  <style scoped>
  .main-label {
    margin-bottom: 5px;
  }
  
  .chosen-label {
    margin-block: 6px;
    width: 100%;
    background-color: var(--ion-color-primary-shade);
    border-radius: 7px;
    padding: 5px 10px;
  }
  </style>
  