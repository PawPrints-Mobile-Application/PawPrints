<template>
  <section class="input-segment">
    <ul>
      <li
        v-for="(option, key) in options"
        @click="SetValue(key)"
        :class="{ select: option === modelValue }"
      >
        <TextSubheading>{{ option }}</TextSubheading>
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
import { TextSubheading } from "../Texts";

const props = defineProps({
  options: Array<String | Number>,
  modelValue: [String, Number],
});

const SetValue = (key: number) => {
  emit("select", props.options![key]);
  emit("update:modelValue", props.options![key]);
};

const emit = defineEmits(["select", "update:modelValue"]);
</script>
<style scoped>
.input-segment {
  background-color: var(--ion-color-primary-shade);
  width: 100%;
  border-radius: 10px;
  overflow-x: scroll;
  padding: 5px;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  min-width: 100%;
}

li {
  flex: var(--item-flex);
  text-align: center;
  vertical-align: center;
  padding: 2px 10px;
  border-radius: 6px;
  transition: all 100ms ease-out;

  &.select {
    background-color: var(--ion-color-tertiary);
  }
}
</style>
