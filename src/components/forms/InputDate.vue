<template>
  <section class="forms input-date" @click="Call">
    <div class="output font poppins paragraph">
      {{ GetOutput() }}
    </div>
    <div class="button-calendar icons theme color tertiary" v-show="!hideIcon">
      <div class="background" />
      <div class="line" />
      <div
        v-for="key in GetLocation()"
        class="dot"
        :style="{
          transform: expanded
            ? `translate(${key.x}px, ${key.y}px)`
            : 'translate(0,-6px)',
        }"
      />
    </div>
    <Popup
      :trigger="trigger"
      @dismiss="() => (expanded = false)"
      @present="() => (expanded = true)"
    >
      <template #content="{ Hide }">
        <section class="calendar">
          <InputCalendar v-model="value" />
          <ButtonSuccess
            value="Save"
            @click="
              () => {
                SetValue();
                Hide();
              }
            "
          />
        </section>
      </template>
    </Popup>
  </section>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Popup, InputCalendar, ButtonSuccess } from "..";
import { LocalDate, PawprintsEvent } from "../../utils";

const props = defineProps({
  modelValue: Date,
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
const Call = () => PawprintsEvent.EventDispatcher(props.trigger);
const GetLocation = () => {
  let temp = [];
  for (let i = 0; i < 5; i++) {
    const distance = 8;
    const x = [-distance, 0, distance][i % 3];
    const y = Math.floor(i / 3) * 8;
    temp.push({ x, y });
  }
  return temp;
};

const GetOutput = () => {
  if (props.display === "number")
    return new LocalDate(props.modelValue!).toLocaleDateString(
      "MM/DD/YYYY",
      "-"
    );
  else if (props.display === "text-short")
    return new LocalDate(props.modelValue!).toLocaleTextString("short");
  return new LocalDate(props.modelValue!).toLocaleTextString();
};

const value = ref(props.modelValue);
const SetValue = () => {
  emit("update:modelValue", value.value);
  emit("select", value.value);
};

const emit = defineEmits(["update:modelValue", "select"]);
</script>
<style scoped>
.input-date {
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

.calendar {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.button-calendar {
  position: relative;
  transform: translateY(-3px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  border-radius: 5px;
  overflow: hidden;

  > .background {
    width: 26px;
    aspect-ratio: 1;
    background-color: var(--icon);
  }

  > .line {
    position: absolute;
    width: 26px;
    height: 3px;
    background-color: var(--background);
    transform: translateY(-6px);
  }

  > .dot {
    position: absolute;
    width: 3px;
    aspect-ratio: 1;
    background-color: var(--background);
    transition: all 200ms ease-out;
  }
}

.button-success {
  height: 40px;
}
</style>
