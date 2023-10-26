<template>
  <section class="img-logo" :style="{ backgroundColor: backgroundColor }" @click="emit('click', onClick)">
    <img id="img-logo-icon" :src="Logo"/>
  </section>
</template>

<script setup lang="ts">
import { Logo } from "../../assets/images";
import { colors } from "../../theme";
import { ref } from "vue";
const props = defineProps({
  color: String,
});
const backgroundColor = ref(
  props.color && colors.includes(props.color)
    ? `var(--ion-color-${props.color})`
    : "none"
);

const emit = defineEmits(['click'])
</script>

<style scoped>
.img-logo {
  --background-color: none;
  --width: 200px;
  --height: var(--width);
  --icon-width: var(--width);
  --icon-height: var(--height);
  --min-width: 50px;
  --min-height: 50px;

  width: var(--width);
  height: var(--height);
  min-width: var(--min-width);
  min-height: var(--min-height);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: var(--background-color);
  overflow: hidden;
}

#img-logo-icon {
  width: var(--icon-width);
  height: var(--icon-height);
  min-width: var(--min-width);
  min-height: var(--min-height);
}

#img-logo-title {
  position: absolute;
  font-weight: bold;
  transform: translateY(calc(var(--height) / 2));
  z-index: 99;
}
</style>
