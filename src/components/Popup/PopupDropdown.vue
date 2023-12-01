<template>
  <ButtonPopup
    class="popup-dropdown"
    v-model="state"
    @click-backdrop="emit('click-backdrop')"
  >
    <template #button>
      <ButtonDropdown v-model="state" @click="Trigger" v-show="!hideIcon" />
    </template>
    <InputDropdown
      v-model="value"
      :options="options"
      :count="count"
      :searchable="searchable"
      :hideInput="hideInput"
      @select="Trigger"
    />
  </ButtonPopup>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { ButtonPopup, ButtonDropdown } from "../Buttons";
import { InputDropdown } from "../Forms";
import { DropdownOption } from "../../utils";

const props = defineProps({
  modelValue: DropdownOption,
  options: Array<DropdownOption>,
  count: {
    type: Number,
    default: 5,
    validate: (value: number) => value <= 10 && value > 0,
  },
  searchable: Boolean,
  hideInput: Boolean,
  hideIcon: Boolean,
});

const state = ref(false);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
    emit("state", value);
  },
});

const Trigger = () => {
  state.value = !state.value;
};

const emit = defineEmits(["update:modelValue", "state", "click-backdrop"]);

defineExpose({ Trigger });
</script>
<style scoped>
.popup-dropdown {
  --background: var(--theme-secondary-background);
  --color: var(--theme-secondary-text);
}
</style>
