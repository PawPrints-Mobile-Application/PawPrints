<template>
  <section class="input-dropdown default-input">
    <InputBox v-model="filter" v-show="!!searchable" />
    <br />
    <InputSelect
      v-model="value"
      :options="GetOptions()"
      @click="emit('select', value)"
      :count="count"
      :allow-others="!hideInput"
    />
  </section>
</template>
<script setup lang="ts">
import { InputSelect, InputBox } from ".";
import { ref, computed } from "vue";
import { DropdownOption } from "../../utils";

const props = defineProps({
  label: String,
  hideInput: Boolean,
  placeholder: {
    type: String,
    default: "Select a value",
  },

  // For Input Select
  options: Array<DropdownOption>,
  modelValue: DropdownOption,
  count: {
    type: Number,
    default: 5,
    validate: (value: number) => value <= 10 && value > 0,
  },
  searchable: Boolean,
});

const filter = ref("");
const GetOptions = () => {
  if (!props.options || props.options.length === 0) return [];
  let temp: DropdownOption[] = [];
  props.options.forEach((option) => {
    if (
      filter.value === "" ||
      option.label.toLowerCase().includes(filter.value)
    )
      temp.push(option);
  });
  return temp;
};

const value = computed({
  get() {
    return props.modelValue!;
  },
  set(value) {
    emit("update:modelValue", value!);
    emit("change", value!);
  },
});

const emit = defineEmits(["update:modelValue", "change", "select"]);
</script>
<style scoped>
.input-dropdown {
  width: 100%;
  --dropdown-width: 100%;
}

.input-box {
  outline: 2px solid var(--theme-black);
}
</style>
