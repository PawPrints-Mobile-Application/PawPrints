<template>
  <section
    class="button-toggle-theme-light-and-dark"
    :style="{
      backgroundImage: `linear-gradient(to right, ${options[selected].backgroundColor[0]}, ${options[selected].backgroundColor[1]})`,
    }"
    @click="Click"
  >
    <div
      :class="[options[selected].name]"
      class="button"
      :style="{
        color: options[selected].color,
        backgroundColor: options[selected].button,
      }"
    >
      <IonIcon :icon="options[selected].icon" />
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { IonIcon } from "@ionic/vue";
import { sunny as light, moon as dark } from "ionicons/icons";
import SetRootStyle from "../../utils/SetRootStyle";

const options = [
  {
    name: "light",
    button: "var(--ion-color-tertiary)",
    color: "var(--ion-color-primary)",
    backgroundColor: ["var(--ion-color-black-tint)", "var(--ion-color-black)"],
    icon: light,
  },
  {
    name: "dark",
    button: "var(--ion-color-black-tint)",
    color: "var(--ion-color-primary)",
    backgroundColor: [
      "var(--ion-color-tertiary-shade)",
      "var(--ion-color-tertiary)",
    ],
    icon: dark,
  },
];
const selected = ref(0);

const Click = () => {
  selected.value = ++selected.value % options.length;
  if (selected.value === 0) SetRootStyle("yellow");
  else SetRootStyle("blue");
};
</script>
<style scoped>
.button-toggle-theme-light-and-dark {
  outline: 3px solid black;
  padding: 5px 6px;
  width: 77px;
  border-radius: 30px;
  transition: all 300ms ease-out;
}

.dark {
  transform: translateX(35px);
}

.button {
  position: relative;
  transition: all 300ms ease-out;
  outline: 2px solid black;
  height: 30px;
  width: 30px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
}
</style>
