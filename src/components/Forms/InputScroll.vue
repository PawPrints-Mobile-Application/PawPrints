<template>
  <section class="input-scroll text text-paragraph font-rubik">
    <ul class="item-container">
      <li
        class="item"
        v-for="(item, key) in options"
        @click="() => SetValue(key)"
        :class="{ active: props.modelValue === item }"
        :ref="
          (value) => {
            if (props.modelValue !== options[Math.min(key + 5, options.length - 1)] || !!input) return;
            input = value;
          }
        "
      >
        {{ item }}
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const input = ref();
const props = defineProps({
  label: String,
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  default: {
    type: Number,
    default: 0,
  },
  options: {
    type: Array<string>,
    required: true,
  },

  // Actions
  disabled: Boolean,
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit("input", value);
    emit("update:modelValue", value);
  },
});

const SetValue = (key: number) => (value.value = props.options[key]);

onMounted(() => {
  if (value.value === "" || !props.options.includes(value.value))
    SetValue(props.default);
  input.value?.scrollIntoView({ behavior: "smooth" });
});

const emit = defineEmits(["update:modelValue", "input"]);
</script>
<style scoped>
.input-scroll {
  width: 100px;
  --item-height: 30px;
  --item-shown: 12;
  height: calc(var(--item-height) * var(--item-shown));
  border-radius: 6px;
  outline: 2px solid var(--ion-color-tertiary);
  overflow-y: scroll;
}
.input-scroll::-webkit-scrollbar {
  display: none;
}

.item-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.item {
  background-color: var(--ion-color-secondary);
  height: var(--item-height);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-inline: 10px;
}

.item.active {
  background-color: var(--ion-color-secondary-shade);
  font-weight: 700;
}
</style>
