<template>
  <button :disabled="!!disabled" class="button" :class="`button-${type}`" @click="emit('click', onClick)" :style="[`${!['text', 'icon'].includes(state) && `flex-direction: ${state}`}`]">
    <p v-show="text && state !== 'icon'" id="button-text">{{ text }}</p>
    <img v-show="icon && state !== 'text'" id="button-icon" :src="icon" />
  </button>
</template>
<script setup lang="ts">
defineProps({
  text: String,
  type: {
    type: [String, Number],
    default: 1,
  },
  icon: String,
  state: {
    type: String,
    default: 'row',
    validator: (value: string) => ['row', 'row-reverse', 'column', 'column-reverse', 'text', 'icon'].includes(value)
  },
  disabled: Boolean
});
const emit = defineEmits(['click'])
</script>
<style scoped>
:root {
  --width: max-content;
  --height: max-content;
  --icon-size: 40px;
  --padding: 0;

}

.button {
  position: relative;
  width: var(--width);
  height: var(--height);
  min-width: 20px;
  min-height: 20px;
  padding: 10px;
  border-radius: 10px;
  background-color: var(--ion-color-tertiary);
  transition: all 10ms ease;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.button-0:enabled:active {
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  background-color: var(--ion-color-tertiary-shade);
}

.button-1:enabled:active {
  outline: 2px solid var(--ion-color-tertiary-tint);
  background-color: var(--ion-color-tertiary-shade);
}

.button-2:enabled:active {
  opacity: 0.7;
  background-color: var(--ion-color-tertiary-shade);
}

#button-text {
  color: var(--ion-color-black);
  text-align: center;
  font-family: Rubik;
  font-size: 16px;
  font-weight: 600;
  margin:0;
}

#button-icon {
  width: var(--icon-size);
  height: var(--icon-size);
}

.button:disabled {
  opacity: 0.4;
  outline: 2px var(--ion-color-grey) solid;
}
</style>
