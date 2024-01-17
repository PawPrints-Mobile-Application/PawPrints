<template>
  <section class="forms input-select theme font background secondary">
    <div class="wrapper" :style="{ height: `${30 * count}px` }">
      <p
        class="text subheading poppins"
        v-for="(option, i) in options"
        @click="SetValue(i)"
        :class="{ selected: selected === i }"
        :ref="
          (value) => {
            if (selected === -1 && i === 0) {
              anchorRef = value;
            } else if (selected !== -1 && i === anchorRefIndex) {
              anchorRef = value;
            }
          }
        "
      >
        {{ option.toString() }}
      </p>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
const props = defineProps({
  modelValue: [Object, String, Number, Date],
  options: Array<Object | String | Number | Date>,
  count: {
    type: Number,
    default: 5,
    validator: (value: number) => value >= 2 && value <= 8,
  },
});

const selected = ref(props.options!.indexOf(props.modelValue!));
const anchorRefIndex = ref(Math.max(selected.value - 2, 0));
const anchorRef = ref();
const SetValue = (index: number, doEmit: boolean = true) => {
  selected.value = index;
  anchorRefIndex.value = Math.max(index - 2, 0);
  if (!doEmit) return;
  emit("update:modelIndex", index);
  emit("update:modelValue", props.options![index]);
  emit("select");
};

const emit = defineEmits(["update:modelValue", "update:modelIndex", "select"]);

const Initialize = () => setTimeout(ScrollIntoView, 10);

const ScrollIntoView = () =>
  anchorRef.value?.scrollIntoView({ behavior: "smooth" });

onMounted(Initialize);
</script>
<style scoped>
.input-select {
  outline: 2px solid black;
  width: min-content;
  height: min-content;
  padding: 0;
  min-width: 100px;
  border-radius: 6px;
  overflow: scroll;
  background-color: var(--theme-secondary-background);
  color: var(--theme-secondary-text);
}

.wrapper {
  display: flex;
  align-items: stretch;
  flex-direction: column;
}

p {
  margin: 0;
  flex: 1 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 30px;
  max-height: 30px;
}

.selected {
  background-color: var(--theme-tertiary-background);
  color: var(--theme-tertiary-text);
  font-weight: 700;
}
</style>
