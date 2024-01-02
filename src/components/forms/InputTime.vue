<template>
  <section class="forms input-time" @click="expanded = !expanded">
    <div class="output font poppins paragraph">
      {{ GetOutput() }}
    </div>
    <IonIcon class="button-time" :icon="icon" v-show="!hideIcon" />
    <Popup v-model="expanded" :trigger="trigger">
      <template #content="{ Hide }">
        <section class="time">
          <InputTimeBox v-model="value" @change="Hide" />
        </section>
      </template>
    </Popup>
  </section>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { Popup, InputTimeBox } from "..";
import { LocalTime } from "../../utils";
import { IonIcon } from "@ionic/vue";
import { time as icon } from "ionicons/icons";

const props = defineProps({
  modelValue: LocalTime,
  hideIcon: Boolean,
  display: {
    type: String,
    default: "text",
    validator: (value: string) =>
      ["text", "number", "text-short"].includes(value),
  },
  trigger: {
    type: String,
    required: true,
  },
});

const expanded = ref(false);
const GetOutput = () => props.modelValue?.toString("12");

const value = computed({
  get() {
    return props.modelValue!;
  },
  set(value) {
    emit("update:modelValue", value);
    emit("select");
  },
});

const emit = defineEmits(["update:modelValue", "select"]);
</script>
<style scoped>
.input-time {
  --background: var(--theme-secondary-background);
  --color: var(--theme-secondary-text);
  --outline: var(--theme-tertiary-background);
  --radius: 5px;
  --icon: var(--theme-tertiary-background);
  --text-align: left;
  --font-weight: 400;
  background-color: var(--background);
  color: var(var(--color));
  width: 100%;
  height: 30px;
  border-radius: var(--radius);
  padding: 5px 10px;
  display: flex;
  gap: 5px;

  &:is(:active, :hover, :focus) {
    outline: 2px solid var(--outline);
  }
}

.output {
  flex: 1 0 0;
  text-align: var(--text-align);
  font-weight: var(--font-weight);
}

.time {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.button-time {
  position: relative;
  transform: translateY(-3px);
  width: 26px;
  height: 26px;
  color: var(--theme-tertiary-background);
}
</style>
