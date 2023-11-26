<template>
  <ButtonRippled class="button-add-log" @click="EventDispatch">
    <div class="icon">
      <IonIcon :icon="backIcon" />
      <IonIcon :icon="frontIcon" />
    </div>
    <TextSmall>Add Dog</TextSmall>
  </ButtonRippled>
</template>
<script setup lang="ts">
import { add as frontIcon, paw as backIcon } from "ionicons/icons";
import { ButtonRippled } from ".";
import { IonIcon } from "@ionic/vue";
import { TextSmall } from "../Texts";
import { CustomEvent } from "../../utils";
const EventDispatch = () => CustomEvent.EventDispatcher("add", "dog");
</script>
<style scoped>
.button-add-log {
  outline: 2px solid black;
  display: flex;
  flex-direction: column;
  border-radius: 100%;
  width: 60px;
  height: 60px;
  background-color: var(--theme-tertiary);
}

.icon {
  transform: translateY(-6px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 35px;
}

ion-icon:nth-child(1) {
  font-size: 35px;
  color: var(--theme-primary);
}

ion-icon:nth-child(2) {
  font-size: 18px;
  position: absolute;
  transform: translateY(6px);
  color: var(--theme-tertiary);
}

.text-small {
  position: relative;
  color: var(--theme-primary);
  transform: translateY(-7px);
  font-weight: bold;
}
</style>
