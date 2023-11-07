<template>
  <section class="input-box">
    <div class="input" @click="emit('click')">
      <input
        :type="type"
        v-model="value"
        @input="emit('input', value)"
        @change="emit('change', value)"
        :disabled="!!disabled"
        :placeholder="placeholder"
        v-if="!freeze"
      />
      <div v-else>{{ value }}</div>
    </div>
    <div class="icon" v-show="showIcon" @click="emit('icon:click')">
      <ion-icon v-if="!!icon" :icon="icon" />
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
  placeholder: String,
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

const emit = defineEmits([
  "update:value",
  "input",
  "change",
  "icon:click",
  "click",
]);
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
      min-width: 10px;
      height: var(--size);
      flex: 1 0 10px;
      border: none;
      background: none;
      padding: 1px 2px;
    }

    > div {
      display: flex;
      align-items: center;
      opacity: 0.5;
    }

    > input:is(:active, :focus, :hover) {
      outline: none;
    }

    > input::-ms-reveal,
    input::-ms-clear {
      display: none;
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
      font-size: var(--fs0);
    }
  }
}
</style>
