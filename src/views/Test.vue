<template>
  <page-layout>
    <!-- <AddPetButton id="test" /> -->

    <InputDate v-model:model-value="value" label="Date" id="date"/>
    
  </page-layout>
</template>
<script setup lang="ts">
import { PageLayout } from "../layout";
import { InputDate } from "../components/Forms";
import { ref, watch } from "vue";

const value = ref("2020-12-05");

// watch(value, () => console.log(value.value));

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
</script>
<script lang="ts">
export default {
  name: "Test",
};
</script>
<style scoped>
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
