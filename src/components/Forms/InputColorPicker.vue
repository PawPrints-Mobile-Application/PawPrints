<template>
  <section class="input-color-picker" :style="{ backgroundColor: value }" >
    <input type="color" v-model="value" />
  </section>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
});

const value = computed({
  get() {
    if (props.value === "") value.value = "#000000";
    return props.value;
  },
  set(value) {
    emit("update:value", value);
  },
});

const emit = defineEmits(["update:value"]);
</script>
<style scoped>
.input-color-picker {
  --size: 30px;
  width: var(--size);
  aspect-ratio: 1;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  > input {
    width: var(--size);
    aspect-ratio: 1;
    position: absolute;
    opacity: 0;
  }
}
</style>
