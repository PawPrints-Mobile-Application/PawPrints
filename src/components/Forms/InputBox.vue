<template>
  <section class="input-box">
    <div class="input">
      <input
        :type="type"
        v-model="value"
        @input="emit('input', value)"
        @change="emit('change', value)"
        :disabled="!!disabled"
        v-if="!freeze"
      />
      <div v-else>{{ value }}</div>
    </div>
    <div class="icon" v-show="showIcon" @click="emit('icon:click')">
      <IonIcon v-if="!!icon" :icon="icon" />
      <slot />
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed, useSlots } from "vue";
import { IonIcon } from "@ionic/vue";
const slots = useSlots();
const showIcon = computed(
  () => (!!props.icon || !!slots.default) && !props.hideIcon
);

const props = defineProps({
  value: String,
  disabled: Boolean,
  type: {
    type: String,
    default: "text",
    validator: (value: string) =>
      ["text", "email", "password", "color"].includes(value),
  },
  icon: String,
  hideIcon: Boolean,
  freeze: Boolean,
});

const value = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit("update:value", value);
  },
});

const emit = defineEmits(["update:value", "input", "change", "icon:click"]);
</script>
<style scoped>
* {
  border-radius: var(--border-radius);
}

.input-box {
  --background-color: var(--ion-color-secondary);
  --border-radius: 5px;
  --size: 30px;

  background-color: var(--background-color);
  padding: 5px;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  > .input {
    flex: 1 0 0;

    * {
      height: var(--size);
      width: 100%;
      border: none;
      background: none;
      padding: 1px 2px;
    }

    > div {
      display: flex;
      align-items: center;
      opacity: 0.7;
    }

    > input:is(:active, :focus, :hover) {
      outline: none;
    }
  }

  > .icon {
    height: var(--size);
    aspect-ratio: 1;
    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;

    > ion-icon {
      outline: 2px solid black;
      font-size: var(--fs0);
    }
  }
}
</style>
