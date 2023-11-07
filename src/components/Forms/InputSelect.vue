<template>
  <section class="input-select default-input" :style="{'--count': count}">
    <ul class="items">
      <li
        class="item"
        v-for="(element, key) in options"
        :class="{ selected: key === selected }"
        @click="SetValue(key)"
        :ref="(value) => {
            if (props.value !== options![Math.min(key + Math.floor(count / 2), options!.length - 1)] || !!input) return;
            input = value;
        }"
      >
        {{ element }}
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";

const props = defineProps({
  options: Array<String>,
  value: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 5
  }
});

const input = ref();
const count = Math.min(props.options!.length, props.count);

const selected = ref(props.options?.indexOf(props.value));

const SetValue = (key: number) => {
  const value = props.options![key];
  selected.value = key;
  emit("update:value", value);
  emit("click");
};

const emit = defineEmits(["update:value", 'click']);

onMounted(() => {
  input.value?.scrollIntoView({ behavior: "smooth" });
});
</script>
<style scoped>
.input-select {
  --outline-color: var(--ion-color-black);
  --background-color: var(--ion-color-secondary);
  --background-color-selected: var(--ion-color-secondary-shade);
  --border-radius: 5px;
  --item-height: 30px;
  --count: 5;

  outline: 2px solid var(--outline-color);
  min-width: 100px;
  width: max-content;
  border-radius: var(--border-radius);
  padding: 0;
  overflow: scroll;
  height: calc(var(--item-height) * var(--count));
  background-color: var(--background-color);

  > .items {
    padding: 0;
    margin: 0;
    width: 100%;
    list-style-type: none;

    > .item {
      padding-inline: 10px;
      height: var(--item-height);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.input-select::-webkit-scrollbar {
  display: none;
}

.selected {
  font-weight: 700;
  background-color: var(--background-color-selected);
}
</style>
