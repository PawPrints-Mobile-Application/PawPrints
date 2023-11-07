<template>
  <page-layout>
    <InputSearch v-model:value="value"/>
  </page-layout>
</template>
<script setup lang="ts">
import { PageLayout } from "../layout";
import {InputSearch} from '../components/Forms'

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
