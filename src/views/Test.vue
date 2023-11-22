<template>
  <LayoutPage>
    <InputRadio id="radio" v-model="value" hideIcon label="Text" required :options="options" />
  </LayoutPage>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { LayoutPage } from "../layout";
import { InputRadio } from "../components/Forms";
import InputDynamicWrapped from "../components/Forms/InputDynamicWrapped.vue";

const options = [1, 2, 3, 4, 5, 6];

const value = ref('hey');
const show = ref(true);

watch(value, () => console.log(value.value));
</script>
<script lang="ts">
export default {
  name: "Test",
};
</script>
<style scoped>
.this-section {
  width: 100%;
  height: 100%;
  padding: 10px;
}
</style>
