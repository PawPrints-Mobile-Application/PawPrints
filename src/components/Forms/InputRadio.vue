<template>
  <InputWrapper
    :label="label"
    :id="id"
    :design="design"
    class="input-radio"
    :hide-label="hideLabel"
  >
    <div class="options">
      <div class="option" v-for="(option, key) in getOptions">
        <div class="option-input">
          <input
            :id="`${id}-${key}-${option}`"
            type="radio"
            :name="`input-radio-${id}`"
            :value="option"
            @click="() => Select(key)"
          />
          <div class="custom-input" v-show="selected === key" />
        </div>
        <label class="option-label" :for="`${id}-${key}-${option}`">
          <span v-if="!enableOthers || key !== getOptions.length - 1">{{
            option
          }}</span>
          <input
            v-else
            type="text"
            class="others-input"
            v-model="others"
            @click="() => Select(key)"
            @input="() => Select(key)"
          />
        </label>
      </div>
    </div>
  </InputWrapper>
</template>
<script setup lang="ts">
import { InputWrapper } from ".";
import { ref, computed } from "vue";

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
  options: {
    type: Array<String>,
    required: true,
  },
  hideLabel: Boolean,
  enableOthers: Boolean,
  modelValue: String
});

const Select = (key: number) => {
  selected.value = key;
  emit("update:modelValue", getOptions.value[selected.value]);
};

const others = ref("");
const getOptions = computed(() => {
  if (!props.enableOthers) return props.options;
  return props.options.concat([others.value]);
});

const selected = ref(!!props.modelValue ? getOptions.value.indexOf(props.modelValue) : -1);
const emit = defineEmits(["update:modelValue"]);
</script>
<style scoped>
.input-radio {
  width: 100%;
}

.options {
  --gap: 5px;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  font-size: var(--fs3);
  gap: var(--gap);
}

.option {
  min-width: calc(50% - var(--gap));
  --size: 15px;
  --cover-size: calc(var(--size) * 0.6);
  --border-radius: 10px;
  height: 20px;
  flex: 1 0 0;
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

  > input {
    opacity: 0;
  }
}

.option-input > .custom-input {
  opacity: 0.7;
  background-color: var(--ion-color-black);
  border-radius: var(--border-radius);
  position: absolute;
  width: var(--cover-size);
  height: var(--cover-size);
}

.option-label {
  flex: 1 0 0;
  font-size: var(--fs4);

  > input {
    width: 100%;
    border-radius: 4px;
    border: none;
    border-bottom: 1px solid var(--ion-color-black);
  }

  > input:is(:focus, :hover, :active) {
    outline: none;
    border-bottom: 2px solid var(--ion-color-black);
  }
}
</style>
