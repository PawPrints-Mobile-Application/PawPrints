<template>
  <LayoutSettings label="FAQS">
    <InputRadio
      :label="form[0].name"
      :options="form[0].options"
      v-model="form[0].value.value"
      :id="form[0].name"
    />
    <InputLabel value="Systems of Measurement"/>
    <InputRadio
      v-for="(item, key) in form"
      v-show="key !== 0"
      :label="item.name"
      :options="item.options"
      v-model="item.value.value"
      :id="item.name"
    />
    <section class="buttons">
      <ButtonText label="Reset" />
      <ButtonText label="Save" />
    </section>
  </LayoutSettings>
</template>
<script setup lang="ts">
import { ButtonText } from "../../components/Buttons";
import { LayoutSettings } from "../../layout";
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
  name: "FAQs",
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
