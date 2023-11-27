<template>
  <section class="button-modal">
    <button style="width: 100%" @click="() => (isOpen = true)">
      <slot name="button"><ButtonText :label="buttonText" /></slot>
    </button>

    <LayoutModal
      ref="modal"
      :isOpen="isOpen"
      :title="title"
      :max="max"
      :page="page"
      @update:page="(value: number) => emit('update:page', value)"
      :justify="justify"
      :buttonType="buttonType"
      :hideHeader="hideHeader"
      :hideFooter="hideFooter"
      :hideBack="hideBack"
      :hideNext="hideNext"
      :hideOnDisable="hideOnDisable"
      :closeOnSubmit="closeOnSubmit"
      :hideClear="hideClear"
      :hideSubmit="hideSubmit"
      :disableBack="disableBack"
      :disableNext="disableNext"
      :disableClear="disableClear"
      :disableSubmit="disableSubmit"
      :buttonSubmitText="buttonSubmitText"
      :noHeaderAnimation="noHeaderAnimation"
      @clear="emit('clear')"
      @discard="
        () => {
          emit('discard');
          isOpen = false;
        }
      "
      @submit="emit('submit')"
      @back="emit('back')"
      @next="emit('next')"
      @dismiss="emit('dismiss')"
      @present="emit('present')"
    >
      <slot />
    </LayoutModal>
  </section>
</template>

<script setup lang="ts">
import { ButtonText } from ".";
import { LayoutModal } from "../../layout";
import { ref } from "vue";

const modal = ref();

defineProps({
  // Button - Modal Connection
  trigger: {
    type: String,
    required: true,
  },
  justify: {
    type: String,
    default: "center",
    validator: (value: string) =>
      [
        "center",
        "flex-start",
        "space-between",
        "space-around",
        "space-evenly",
      ].includes(value),
  },

  // Button Props
  buttonText: {
    type: String,
    default: "Modal",
  },

  // Modal Props
  title: {
    type: String,
    required: true,
  },
  max: {
    type: Number,
    default: 1,
    validator: (value: number) => value > 0,
  },
  page: {
    type: Number,
    default: 1,
    validator: (value: number) => value > 0,
  },
  buttonType: {
    type: String,
    default: "text",
    validator: (value: string) => ["text", "icon"].includes(value),
  },

  hideHeader: Boolean,
  hideFooter: Boolean,

  hideBack: Boolean,
  disableBack: Boolean,
  hideNext: Boolean,
  disableNext: Boolean,

  closeOnSubmit: Boolean,
  hideOnDisable: Boolean,
  hideClear: Boolean,
  disableClear: Boolean,
  hideSubmit: Boolean,
  disableSubmit: Boolean,
  noHeaderAnimation: Boolean,

  buttonSubmitText: String,
  canDismiss: {
    type: Boolean,
    default: true,
  },
});

const isOpen = ref(false);

const emit = defineEmits([
  "clear",
  "submit",
  "dismiss",
  "present",
  "discard",
  "back",
  "next",
  "update:page",
]);

const Clear = () => {
  emit("clear");
  modal.value.Clear();
};
const Discard = () => {
  emit("discard");
  modal.value.Discard();
  isOpen.value = false;
};
const Submit = () => {
  emit("submit");
  modal.value.Submit();
};
const Back = () => {
  emit("back");
  modal.value.Back();
};
const Next = () => {
  emit("next");
  modal.value.Next();
};

defineExpose({ Clear, Discard, Submit, Back, Next });
</script>
<style scoped>
button {
  background: none;
  border: none;
}
</style>
