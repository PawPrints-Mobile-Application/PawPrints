<template>
  <section class="toast" :style="{ height: height }" :class="{ show: state }">
    <slot :Toggle="StateToggler" />
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { PawprintsEvent } from "../../utils";

const props = defineProps({
  default: Boolean,
  trigger: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    default: 2000,
  },
});

const state = ref(!!props.default);
const interval = ref(-1);
const intervalFunction = ref();

const StateToggler = (value: string) => {
  switch (value) {
    case "show":
      state.value = true;
      break;
    case "hide":
      state.value = false;
      break;
    default:
      state.value = !state.value;
  }
  interval.value = state.value ? 0 : -1;
  emit(state.value ? "present" : "dismiss");
};

onMounted(() => {
  PawprintsEvent.AddEventListener(props.trigger, StateToggler);
  intervalFunction.value = setInterval(() => {
    interval.value += 100;
    if (interval.value >= props.time) StateToggler("hide");
  }, 100);
});

onUnmounted(() => {
  PawprintsEvent.RemoveEventListener(props.trigger, StateToggler);
  clearInterval(intervalFunction.value);
});

const emit = defineEmits(["dismiss", "present"]);
</script>

<style scoped>
.toast {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  transform: translateY(-100%);
  transition: all 200ms ease-out;
}

.show {
  transform: translateY(0);
}
</style>
