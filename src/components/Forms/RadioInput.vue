<template>
  <section class="radio-input" :class="{ focused: state.focused }">
    <label class="label" :for="id">{{ label }}</label>
    <div class="options-wrapper">
      <div
        class="option"
        v-for="key in options.length + (!allowOthers ? 0 : 1)"
        :class="{ selected: key === selectedKey + 1 }"
      >
        <div class="input-wrapper">
          <input
            class="input-box"
            type="radio"
            :id="`${id}-${key}`"
            :name="id"
            :value="options[key - 1]"
            @input="() => SetValue(key - 1)"
            :checked="key === selectedKey + 1"
          />
          <label class="input-custom" :for="`${id}-${key}`" />
        </div>
        <label
          v-if="!allowOthers || key !== options.length + 1"
          class="input-label"
          :for="`${id}-${key}`"
          >{{ options[key - 1] }}</label
        >
        <input
          v-else
          class="input-label input-label-custom"
          type="text"
          v-model="optionsOthers"
          placeholder="Others"
          @click="
            () => {
              selectedKey = options.length;
              console.log(options.length);
            }
          "
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  required: Boolean,
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Array<string>,
    required: true,
  },
  default: {
    type: Number,
    default: -1,
    validator: (value: number) => value >= -1,
  },
  allowOthers: {
    type: Boolean,
    default: false,
  },

  // Actions
  disallowInput: Boolean,
});

const selectedKey = ref(-1);
const _others = ref("");
const optionsOthers = computed({
  get() {
    return _others.value;
  },
  set(value: string) {
    _others.value = value;
    if (selectedKey.value === props.options.length) SetValue(selectedKey.value);
  },
});

const SetValue = (key: number) => {
  selectedKey.value = key;
  const temp =
    !props.allowOthers || key !== props.options.length
      ? props.options[key]
      : optionsOthers.value;
  emit("update:modelValue", temp);
  emit("input");
};

const emit = defineEmits(["update:modelValue", "input"]);

const state = reactive({
  focused: false,
  touched: false,
  select: -1,
  collapsed: true,
});
</script>

<style scoped>
.radio-input {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;

  font-family: Rubik;
}

.label {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
}

.options-wrapper {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  --gap: 10px;
  gap: var(--gap);
}

.option {
  --input-size: 20px;
  width: calc(50% - var(--gap));
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.input-wrapper {
  background-color: var(--ion-color-secondary);
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  overflow: hidden;
}

.input-box {
  border: none;
  background: none;
  opacity: 0;
  width: var(--input-size);
  height: var(--input-size);
}

.input-custom {
  position: absolute;
  opacity: 0;
  width: calc(var(--input-size) * 0.5);
  height: calc(var(--input-size) * 0.5);
  background-color: var(--ion-color-black);
  border-radius: 25px;
}

.selected .input-custom {
  opacity: 0.7;
}

.input-label {
  width: 100%;
  font-size: 10px;
  font-weight: 400;
}

.input-label-custom {
  border: none;
  outline: none;
}

.input-label-custom:hover {
  background-color: var(--ion-color-secondary);
  padding: 4px 2px;
  border-radius: 3px;
}
</style>
