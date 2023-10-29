<template>
  <section class="button-modal">
    <TextButton :id="`button-${id}`" :label="text" />
    <Modal
      :trigger="`button-${id}`"
      :title="title"
      :max-pages="maxPages"
      @submit="() => emit('submit')"
      :hideHeaderBack="hideHeaderBack"
      :hideHeader="hideHeader"
      :hideFooter="hideFooter"
      :hideFooterBack="hideFooterBack"
      :hideFooterSubmit="hideFooterSubmit"
      :style="{ '--main-height': !!height ? height : 'auto' }"
    >
      <template #modalSlot="{ page, closeModal }">
        <slot
          name="modalContent"
          id="modal-content"
          :page="page"
          :closeModal="closeModal"
          :max="maxPages"
        />
      </template>
    </Modal>
  </section>
</template>

<script setup lang="ts">
import {TextButton} from ".";
import { Modal } from "../Modals";
defineProps({
  title: String,
  id: String,
  maxPages: {
    type: Number,
    default: 1,
  },
  text: {
    type: String,
    required: true
  },
  height: String,
  hideHeaderBack: Boolean,
  hideHeader: Boolean,
  hideFooter: Boolean,
  hideFooterBack: Boolean,
  hideFooterSubmit: Boolean,
});

const emit = defineEmits(["submit"]);
</script>
<style scoped>
.text-button {
  width: var(--width);
  height: var(--height);
  font-weight: var(--font-weight);
}
</style>
