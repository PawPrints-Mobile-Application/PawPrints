<template>
  <section class="forms input-textarea font poppins paragraph">
    <textarea :type="type" v-model="value" v-if="!freeze" />
    <div v-else>
      <TextParagraph :value="value" />
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { TextParagraph } from "..";

const props = defineProps({
  modelValue: String,
  type: {
    type: String,
    default: "text",
    validator: (value: string) => ["text", "email"].includes(value),
  },
  freeze: Boolean,
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
    emit("input", value);
  },
});

const emit = defineEmits(["update:modelValue", "input"]);
</script>
<style scoped>
.input-textarea {
  --background: var(--theme-secondary-background);
  --color: var(--theme-secondary-text);
  --outline: var(--theme-tertiary-background);
  --radius: 5px;
  --text-align: left;
  background-color: var(--background);
  color: var(--color);
  border-radius: var(--radius);
  padding: 5px 10px;
  width: 100%;
  height: 100px;
  text-align: var(--text-align);
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  align-items: center;

  &:is(:active, :hover, :focus) {
    outline: 2px solid var(--outline);
  }
}
textarea {
  border: none;
  outline: none;
  background-color: inherit;
  color: inherit;
  flex: 1 0 0;
  padding: 0;
  width: 100%;
  height: calc(100% - 6px);
}
</style>
