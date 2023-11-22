<template>
  <section class="input-checkbox default-input">
    <InputLabel :value="label" v-show="!!label" />
    <div class="options">
      <div class="option" v-for="(option, key) in getOptions">
        <div class="option-input">
          <input
            :id="`${id}-${key}-${option}`"
            type="checkbox"
            :name="`input-check-${id}`"
            :value="option"
            @click="() => Toggle(key)"
          />
          <div class="custom-input" v-show="selected.includes(key)" />
        </div>
        <label class="option-label" :for="`${id}-${key}-${option}`">
          <span v-if="!addOthers || key !== getOptions.length - 1">{{
            option
          }}</span>
          <input
            v-else
            type="text"
            class="others-input"
            v-model="others"
            @click="() => Toggle(key)"
            @input="() => Toggle(key)"
          />
        </label>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, computed, Ref } from "vue";
import { InputLabel } from ".";

const props = defineProps({
  label: String,
  id: {
    type: String,
    required: true,
  },
  options: Array<String | Number>,
  addOthers: Boolean,
  modelValue: Array<String | Number>,
});

const Toggle = (key: number) => {
  if (selected.value.includes(key)) {
    selected.value.splice(selected.value.indexOf(key), 1);
  } else {
    selected.value.push(key);
  }
  const temp = selected.value.map((key) => getOptions.value[key]);
  emit("update:modelValue", temp);
};

const others = ref("");
const getOptions = computed(() => {
  if (!props.options) return [];
  if (!props.addOthers) return props.options;
  return props.options.concat([others.value]);
});

const selected: Ref<Array<number>> = ref(
  !!props.modelValue
    ? props.modelValue.map((v) => getOptions.value.indexOf(v))
    : []
);
const emit = defineEmits(["update:modelValue"]);
</script>
<style scoped>
.input-check {
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
  --border-radius: 2px;
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
