<template>
  <page-layout>
    <!-- <AddPetButton id="test" /> -->

    <Searchbox v-model:model-value="value"/>
    
  </page-layout>
</template>
<script setup lang="ts">
import { PageLayout } from "../layout";
import { Searchbox } from "../components/Forms";
import { ref, watch } from "vue";

const value = ref("");

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
