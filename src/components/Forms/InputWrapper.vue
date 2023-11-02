<template>
  <section class="input-wrapper">
    <label v-show="labelShown()" :for="id" :class="{floating: design === 'label-inline'}">{{ label }}</label>
    <slot />
  </section>
</template>
<script setup lang="ts">
const props = defineProps({
  label: String,
  id: {
    type: String,
    required: true,
  },
  design: {
    type: String,
    default: "classic",
    validators: (value: string) => ["classic", "input-only", "label-inline"].includes(value),
  },
  hideLabel: Boolean
});

const labelShown = () => {
  switch (props.design) {
    case 'classic':
      return true;
    case 'input-only':
      return false;
    case 'label-inline':
      return props.hideLabel;
  }
}
</script>
<style scoped>
label {
  font-family: Rubik;
  font-size: var(--fs3);
  font-weight: 700;
}

.floating {
  transform: translate(7px, 8px);
  position: absolute;
}
</style>
