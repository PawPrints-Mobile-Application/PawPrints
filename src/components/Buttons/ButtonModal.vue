<template>
  <div class="button-modal" :id="id">
    <Button color="tertiary" :id="`button-${id}`" class="button-modal-button"
      ><span v-show="text">{{ text }}</span></Button
    >
    <Modal
      :id="`modal-${id}`"
      class="button-modal-modal"
      :trigger="id"
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
  </div>
</template>

<script setup lang="ts">
import Button from "./Button.vue";
import Modal from "../Modals/Modal.vue";
</script>
<script lang="ts">
export default {
  name: "ButtonModal",
  props: [
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
    "class"
  ],
};
</script>
<style scoped>
:root {
  --button-width: max-content;
  --button-min-width: 150px;
}

.button-modal-button {
  --width: var(--button-width);
  --min-width: var(--button-min-width);
}
</style>
