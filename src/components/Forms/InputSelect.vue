<template>
  <section class="input-select default-input" :style="{ '--count': count }">
    <ul class="items">
      <li
        class="item"
        v-for="(element, key) in props.options"
        :class="{ selected: key === selected }"
        @click="SetValue(key)"
        :ref="(value) => {
            if (props.options?.length! < 1 || props.modelValue!.value !== props.options![Math.min(key + Math.floor(count / 2), props.options!.length - 1)].value || !!input) return;
            input = value;
        }"
      >
        {{ element.label }}
      </li>
      <li
        class="item"
        v-show="!!allowOthers && selected === -1"
        :class="{ selected: selected === -1 }"
        :ref="(value) => {
            if (props.modelValue !== options![Math.min(options?.length! - 1 + Math.floor(count / 2), options!.length - 1)] || !!input) return;
            input = value;
        }"
      >
        Others
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { DropdownOption } from "../../utils";

const props = defineProps({
  options: Array<DropdownOption>,
  modelValue: DropdownOption,
  count: {
    type: Number,
    default: 5,
  },
  allowOthers: Boolean,
});

const input = ref();
const count = Math.min(props.options!.length, props.count);
const selected = ref(-1);

const FindIndex = () => {
  props.options?.forEach((option, key) => {
    if (option.label === props.modelValue?.label) selected.value = key;
  });
};

const SetValue = (key: number) => {
  selected.value = key;
  const value = props.options![key];
  emit("update:modelValue", value);
  emit("click");
};

const emit = defineEmits(["update:modelValue", "click"]);

onMounted(() => {
  FindIndex();
  setTimeout(() => {
    input.value?.scrollIntoView({ behavior: "smooth" });
  }, 10);
});
</script>
<style scoped>
.input-select {
  --default-background: var(--theme-secondary-background);
  --default-text: var(--theme-secondary-text);
  --active-background: var(--theme-tertiary-background);
  --active-text: var(--theme-tertiary-text);
  --outline: var(--theme-black);

  --item-height: 30px;
  --count: 5;
  outline: 2px solid var(--outline);
  min-width: 100px;
  width: max-content;
  border-radius: 5px;
  padding: 0;
  overflow: scroll;
  height: calc(var(--item-height) * var(--count));
  background-color: var(--default-background);
}

.items {
  padding: 0;
  margin: 0;
  width: 100%;
  list-style-type: none;
  background-color: var(--default-background);
}

.item {
  padding-inline: 10px;
  height: var(--item-height);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--default-text);
}

.input-select::-webkit-scrollbar {
  display: none;
}

.selected {
  font-weight: 700;
  background-color: var(--active-background);
  color: var(--active-text);
}
</style>
