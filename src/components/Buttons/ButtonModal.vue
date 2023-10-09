<template>
  <Button color="tertiary" :id="id"><span v-show="text">{{ text }}</span></Button>
  <Modal :trigger="id" :allow-buttons="allowModalButtons" :design="design ? design : 0" :title="title" :max-pages="maxPages" :onSubmit="onSubmit">
    <template #modalSlot="{page, closeModal}" >
      <slot name="modalContent" :page="page" :closeModal="closeModal" :max="maxPages" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Button from './Button.vue';
import Modal from '../Modals/Modal.vue';

</script>
<script lang="ts">
export default {
  name: "ButtonModal",
  props: ["id", "allowModalButtons", "expand", "color", 'text', "onClick", "maxPages", "onSubmit", 'design', 'title'],
};
</script>
<style scoped></style>
