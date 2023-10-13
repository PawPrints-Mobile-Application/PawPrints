<template>
  <section class="button-modal" :id="id">
    <Button color="tertiary" :id="`button-${id}`" class="button-modal-button" :text="text"
      />
    <Modal
      :id="`modal-${id}`"
      class="button-modal-modal"
      :trigger="`button-${id}`"
      :allow-buttons="allowModalButtons"
      :design="design ? design : 0"
      :title="title"
      :max-pages="maxPages"
      :onSubmit="onSubmit"
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
import Button from "./Button.vue";
import Modal from "../Modals/Modal.vue";
defineProps([
    "id",
    "allowModalButtons",
    "expand",
    "color",
    "text",
    "onClick",
    "maxPages",
    "onSubmit",
    "design",
    "title",
    "class",
  ]);
</script>
<style scoped>
.button-modal-button {
  --width: var(--button-width);
  min-width: var(--button-min-width);
}
</style>
