<template>
  <section class="button-modal">
    <button :id="trigger">
      <slot name="button"><ButtonText :label="buttonText" /></slot>
    </button>

    <LayoutModal
      ref="modal"
      :trigger="trigger"
      :title="title"
      :max="max"
      :page="page"
      @update:page="(value: number) => emit('update:page', value)"
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
      @clear="emit('clear')"
      @close="emit('close')"
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

  buttonSubmitText: String,
});

const emit = defineEmits([
  "clear",
  "submit",
  "dismiss",
  "present",
  "close",
  "back",
  "next",
  "update:page",
]);

const Reset = () => modal.value.Reset();
const Close = () => modal.value.Close();
const Submit = () => modal.value.Submit();
const Back = () => modal.value.Back();
const Next = () => modal.value.Next();

defineExpose({ Reset, Close, Submit, Back, Next });
</script>
<style scoped>
button {
  background: none;
  border: none;
}
</style>
