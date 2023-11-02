<template>
  <div class="input-dropdown">
    <InputText
      ref="input"
      type="text"
      :label="label"
      :id="id"
      :placeholder="placeholder"
      v-model:modelValue="value"
      hideHelper
      :required="required"
      :icon="icon"
      @click="
        () => {
          if (!!noIcon) Expand();
        }
      "
      @icon-click="Expand"
      :design="!noIcon ? 'classic' : 'input-only'"
    />
    <Popup v-model:model-value="state.expand" @click="Collapse">
      <template #content="{ reverseValue }">
        <InputScroll
          :id="`scroll-${id}`"
          v-model:model-value="value"
          :options="options"
          :default="default"
          @click="() => reverseValue()"
        />
      </template>
    </Popup>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import {
  chevronExpand as iconExpand,
  chevronCollapse as iconCollapse,
} from "ionicons/icons";
import Popup from "../Modals/Popup.vue";
import { InputScroll, InputText } from ".";

const input = ref();
const icon = ref(iconExpand);
const props = defineProps({
  label: String,
  id: {
    type: String,
    required: true,
  },
  required: Boolean,
  placeholder: String,
  modelValue: {
    type: String,
    required: true,
  },
  modelValid: Boolean,
  design: {
    type: String,
    default: "classic",
    validators: (value: string) => ["classic", "input-only", "label-inline"].includes(value),
  },
  default: Number,
  options: {
    type: Array<string>,
    required: true,
  },

  // Actions
  disabled: Boolean,
  noIcon: Boolean,
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("input", value);
    emit("update:modelValue", value);
  },
});

const state = reactive({
  expand: false,
});

const Expand = () => {
  state.expand = true;
  input.value.SetIcon(iconCollapse);
};

const Collapse = () => {
  state.expand = false;
  input.value.SetIcon(iconExpand);
};

onMounted(() => {
  if (!props.default) return;
  value.value = props.options[props.default];
});

const emit = defineEmits(["update:modelValue", "focus", "blur", "input"]);
</script>

<style scoped>
.input-dropdown, .input-text  {
  width: 100%;
}
</style>
