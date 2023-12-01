<template>
  <section class="input-segment">
    <ul>
      <li
        v-for="(option, key) in options"
        @click="SetValue(key)"
        :class="[
          { selected: option.label === modelValue?.label, reverse: key+1 > options?.length! / 2 && show === 'auto' },
          show,
        ]"
      >
        <IonIcon :icon="option.icon" v-show="show !== 'label'" />
        <TextSubheading
          v-show="
            !(
              (show === 'auto' && option.label !== modelValue?.label) ||
              show === 'icon'
            )
          "
          >{{ option.label }}</TextSubheading
        >
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
import { TextSubheading } from "../Texts";
import { SegmentOption } from "../../utils";
import { IonIcon } from "@ionic/vue";

const props = defineProps({
  options: Array<SegmentOption>,
  modelValue: SegmentOption,
  show: {
    type: String,
    default: "auto",
    validator: (value: string) =>
      ["auto", "label", "icon", "both"].includes(value),
  },
});

const SetValue = (key: number) => {
  emit("select", props.options![key]);
  emit("update:modelValue", props.options![key]);
};

const emit = defineEmits(["select", "update:modelValue"]);
</script>
<style scoped>
.input-segment {
  background-color: var(--theme-secondary-background);
  width: 100%;
  border-radius: 10px;
  overflow-x: scroll;
  padding: 5px;
}

ul {
  padding: 0;
  margin: 0;
  height: 30px;
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: stretch;
  min-width: 100%;
}

li {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
  border-radius: 6px;
  transition: all 200ms ease-out;
  flex: var(--flex);
  justify-content: center;
}

.selected {
  background-color: var(--theme-tertiary-background);

  > * {
    color: var(--theme-primary-background);
  }
}

.reverse {
  flex-direction: row-reverse;
}

ion-icon {
  font-size: 25px;
}
</style>
