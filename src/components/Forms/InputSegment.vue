<template>
  <section class="input-segment">
    <ul>
      <li
        v-for="option in options"
        @click="SetValue(option)"
        :class="{ select: option === value }"
      >
        <TextSubheading>{{ option }}</TextSubheading>
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
import { TextSubheading } from "../Texts";

defineProps({
  options: Array<string>,
  value: String,
});

const SetValue = (value: string) => {
  emit("select");
  emit("update:value", value);
};

const emit = defineEmits(["select", "update:value"]);
</script>
<style scoped>
.input-segment {
  background-color: var(--ion-color-primary-shade);
  width: 100%;
  border-radius: 10px;
  overflow-x: scroll;
  padding: 5px;
  --item-flex: none;
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
