<template>
  <LayoutPage justify="flex-start">
    <template #header>
      <TextHeading class="title"> DOGGOS </TextHeading>
    </template>
    <DogPreview ref="dogPreview" />
  </LayoutPage>
</template>

<script lang="ts" setup>
import { LayoutPage } from "../layout";
import { TextHeading } from "../components/Texts";
import { DogPreview } from "../components/Cards";
import { onIonViewDidEnter, onIonViewWillEnter } from "@ionic/vue";
import { ref } from "vue";

const dogPreview = ref();

// Light Functions, preferrably async functions only
onIonViewWillEnter(async () => {
  await dogPreview.value.ReloadPage();
});

// Heavy Functions
onIonViewDidEnter(() => {});
</script>

<script lang="ts">
export default {
  name: "Dogs",
};
</script>

<style scoped>
.page-layout {
  --header-height: 50px;
}

.content {
  width: 100%;
}
</style>
