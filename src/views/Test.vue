<template>
  <LayoutPage>
    <InputDynamic type="date" v-model="value" saveOnChange />
    <!-- <Popup v-model="show">
    </Popup> -->
    <!-- <InputBox v-model="value" type="date" /> -->
  </LayoutPage>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { LayoutPage } from "../layout";
import { InputDynamic } from "../components/Forms";
import { LocalDate } from "../utils";

const options = [1, 2, 3, 4, 5, 6];

const value = ref(
  new LocalDate(new Date()).toLocaleDateString("YYYY/MM/DD", "-")
);
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
