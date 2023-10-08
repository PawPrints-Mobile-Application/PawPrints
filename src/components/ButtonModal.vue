<template>
  <Button :id="id" :expand="expand" :color="color" :onClick="onClick" :text="text">
    <span v-show="text" v-if="text">{{ text }}</span>
    <slot name="buttonContent" v-else="text"/>
  </Button>
  <Modal :trigger="id" :allow-buttons="allowModalButtons">
    <slot name="modalContent" />
  </Modal>
</template>

<script setup lang="ts">
import Button from "./Button.vue";
import Modal from "./Modal.vue";
</script>
<script lang="ts">
export default {
  name: "ButtonModal",
  props: ["id", "allowModalButtons", "expand", "color", 'text', "onClick"],
};
</script>
<style></style>
