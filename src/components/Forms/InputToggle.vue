<template>
  <section class="input-toggle default-input" @click="Toggle">
    <div class="option-input">
      <div class="custom-input" v-show="value" />
    </div>
    <label class="option-label" :for="`${id}-input`">
      <slot>{{ content }}</slot>
    </label>
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
    validators: (value: string) =>
      ["classic", "input-only", "label-inline"].includes(value),
  },
  hideLabel: Boolean,
  value: Boolean,
  content: String,
});

const Toggle = () => {
  emit("update:value", !props.value);
};

const emit = defineEmits(["update:value"]);
</script>
<style scoped>
.input-toggle {
  width: 100%;
  min-width: calc(50% - var(--gap));
  --size: 15px;
  --cover-size: calc(var(--size) * 0.6);
  --border-radius: 10px;
  height: max-content;
  display: flex;
  gap: 5px;
  align-items: center;
}

.option-input {
  background-color: var(--ion-color-secondary);
  width: var(--size);
  height: var(--size);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius);

  > .custom-input {
    opacity: 0.7;
    background-color: var(--ion-color-black);
    border-radius: var(--border-radius);
    position: relative;
    width: var(--cover-size);
    height: var(--cover-size);
  }
}

.option-label {
  font-size: var(--fs4);
  flex: 1 0 0;
}
</style>
