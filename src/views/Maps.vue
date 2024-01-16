<template>
  <LayoutPage id="maps-page" justify="flex-start">
    <template #pageHeader>
      <InputSearch
        v-model:value="searchLocation"
        keep-open
      />
    </template>
    <template #pageContent>
      <section
        id="background-placeholder"
        :style="{
          width: `${appDimesions.width}px`,
          height: `${appDimesions.height}px`,
        }"
      />
    </template>
  </LayoutPage>
</template>

<script lang="ts" setup>
import { LayoutPage } from "../layout";
import { ref } from "vue";

const searchLocation = ref("");
const appDimesions = {
  width: window.innerWidth,
  height: window.innerHeight,
};
</script>

<script lang="ts">
export default {
  name: "Maps",
};
</script>

<style scoped>
.input-search {
  transform: translateY(5px);

}

#background-placeholder {
  background-color: var(--ion-color-primary-shade);
}
</style>
