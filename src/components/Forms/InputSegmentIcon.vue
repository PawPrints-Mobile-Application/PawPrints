<template>
  <section class="input-segment-icon">
    <ul>
      <li
        v-for="(icon, key) in icons"
        @click="SetValue(key)"
        :class="{ select: icon === modelValue }"
      >
        <IonIcon :icon="icon" />
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
import { IonIcon } from "@ionic/vue";

const props = defineProps({
  icons: Array<string>,
  modelValue: String,
});

const SetValue = (key: number) => {
  emit("select", props.icons![key]);
  emit("update:modelValue", props.icons![key]);
};

const emit = defineEmits(["select", "update:modelValue"]);
</script>
<style scoped>
.input-segment-icon {
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
  flex: 1 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 10px;
  border-radius: 8px;
  transition: all 100ms ease-out;

  &.select {
    background-color: var(--ion-color-tertiary);
    color: var(--ion-color-primary);
  }
}

ion-icon {
  font-size: var(--fs1);
}
</style>
