<template>
  <LayoutModal title="Titles" :max-pages="5" :current-page="5" button-type="icon">
    <template #content>
    <InputColor
      type="text"
      v-model:value="form.color"
      placeholder="Colour"
      label="Colour"
    />
    <InputColor
      type="text"
      v-model:value="form.color"
      placeholder="Colour"
      label="Colour"
    />
    <InputColor
      type="text"
      v-model:value="form.color"
      placeholder="Colour"
      label="Colour"
    />
    <InputColor
      type="text"
      v-model:value="form.color"
      placeholder="Colour"
      label="Colour"
    />
    <InputColor
      type="text"
      v-model:value="form.color"
      placeholder="Colour"
      label="Colour"
    />
    </template>
  </LayoutModal>
</template>
<script setup lang="ts">
import { LayoutModal } from "../layout";
import { InputColor } from "../components/Forms";
import { reactive } from "vue";

const form = reactive({
  color: "#FFD80A",
});
</script>
<script lang="ts">
export default {
  name: "Test",
};
</script>
<style scoped>
div {
  background-color: black;
  width: 90%;
  height: 200px;
}

section {
  background-color: white;
  height: 100px;
}
</style>
