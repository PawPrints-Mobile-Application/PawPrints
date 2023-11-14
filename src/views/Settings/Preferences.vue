<template>
  <SettingsLayout label="MY PREFERENCES" target="/settings">
    <InputRadio
      :label="form[0].name"
      :options="form[0].options"
      v-model:value="form[0].value.value"
      :id="form[0].name"
    />
    <InputLabel value="Systems of Measurement"/>
    <InputRadio
      v-for="(item, key) in form"
      v-show="key !== 0"
      :label="item.name"
      :options="item.options"
      v-model:value="item.value.value"
      :id="item.name"
    />
    <section class="buttons">
      <TextButton label="Reset" />
      <TextButton label="Save" />
    </section>
  </SettingsLayout>
</template>
<script setup lang="ts">
import { TextButton } from "../../components/Buttons";
import { SettingsLayout } from "../../layout";
import { InputRadio, InputLabel } from "../../components/Forms";
import { watch, ref } from "vue";

const form = [
  {
    name: "Theme",
    value: ref("Light Mode"),
    options: ["Light Mode", "Dark Mode"],
  },
  {
    name: "Length",
    value: ref("Meter"),
    options: ["Meter", "Feet"],
  },
  {
    name: "Weight",
    value: ref("Kilogram"),
    options: ["Kilogram", "Pound"],
  },
  {
    name: "Temperature",
    value: ref("Celsius"),
    options: ["Celsius", "Fahrenheit"],
  },
];

watch(
  () => form[0].value.value,
  () => console.log(form[0].value.value)
);
</script>

<script lang="ts">
export default {
  name: "Preferences",
};
</script>
<style scoped>

.buttons {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>
