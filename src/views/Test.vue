<template>
  <section>
    <InputTextarea v-model="value" />
    <InputValidator :validators="SignupValidator.password" :value="value" />
  </section>
</template>
<script setup lang="ts">
import InputTextarea from "../components/Forms/InputTextarea.vue";
import { InputValidator } from "../components/Forms";
import { SignupValidator } from "../server/rulesets";
import { ref, watch } from "vue";

const value = ref("");
watch(value, () => console.log(value.value));
const options = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
</script>
<script lang="ts">
export default {
  name: "Test",
};
</script>
<style scoped>
section {
  width: 100%;
  height: 100%;
  padding: 10px;
}
</style>
