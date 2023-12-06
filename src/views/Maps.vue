<template>
  <LayoutPage id="maps-page" justify="flex-start">
    <!-- <template #pageContent>
      <section
        id="background-placeholder"
        :style="{
          width: `${appDimesions.width}px`,
          height: `${appDimesions.height}px`,
        }"
      />
    </template> -->
  </LayoutPage>
</template>

<script lang="ts" setup>
import { LayoutPage } from "../layout";

// const appDimesions = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };
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
  background-color: var(--theme-grey);
}
</style>
