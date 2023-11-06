<template>
  <page-layout>
    <!-- <DogPreview /> -->
    <!-- <AddPetButton id="test" /> -->
    <!-- <InputToggle id="Radio" label="Radio" v-model:model-value="value" design="input-only">
    <span>yeah <a @click="() => console.log(true)">22</a> dwadwad</span>
  </InputToggle> -->
  <!-- <InputPhoto name="Photo" v-model:value="value" has-change-button/> -->
  <input type="color">
  </page-layout>
</template>
<script setup lang="ts">
import { PageLayout } from "../layout";
import InputPhoto from "../components/Forms/InputPhoto.vue";

import { ref } from "vue";
// import { DogPreview } from "../components/Cards";

const value = ref('');

// watch(value, () => console.log(value.value));

// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'dwadwada'];
</script>
<script lang="ts">
export default {
  name: "Test",
};
</script>
<style scoped>
a {
  color: black;
}

.page-layout {
  --padding-side: 10px;
}

.input-dropdown {
  --input-width: 80px;
}

.input-text {
  width: 100px;
}

.search-box {
  width: 90%;
}
</style>
