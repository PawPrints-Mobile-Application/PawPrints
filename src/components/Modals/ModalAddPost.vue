<template>
  <LayoutModal
    ref="modal"
    :isOpen="isOpen"
    title="Add Post"
    @submit="Submit"
    @clear="ClearForm"
    @discard="Discard"
    :disable-submit="disabled"
    close-on-submit
    :canDismiss="!isOpen"
    :disable-footer="true"
  >
  </LayoutModal>
</template>

<script setup lang="ts">
import { LayoutModal } from "../../layout";
import { computed } from "vue";

const disabled = computed(() => true);

const Discard = () => {
  emit("discard");
};
const ClearForm = () => {};
const Submit = () => {};

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["submit", "discard"]);
</script>

<style scoped></style>
