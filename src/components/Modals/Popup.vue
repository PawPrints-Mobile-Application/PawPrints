<template>
  <section class="popup" v-if="props.modelValue === !props.reversed">
    <div id="backdrop" @click="reverseValue" />
    <div class="content">
      <slot name="content" :reverseValue="reverseValue" />
    </div>
  </section>
</template>
<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
  reversed: Boolean,
});

const reverseValue = () => emit("update:modelValue", !!props.reversed);
const emit = defineEmits(["update:modelValue"]);
</script>
<style scoped>
.popup {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

#backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ffffff80;
}

.content {
  z-index: 1;
}
</style>
