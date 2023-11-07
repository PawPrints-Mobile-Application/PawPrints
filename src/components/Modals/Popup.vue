<template>
  <section class="popup" v-if="props.value === !props.reversed">
    <div id="backdrop" @click="reverseValue" />
    <div class="content">
      <slot name="content" :reverseValue="reverseValue" />
    </div>
  </section>
</template>
<script setup lang="ts">
const props = defineProps({
  value: {
    type: Boolean,
    default: false,
    required: true,
  },
  reversed: Boolean,
});

const reverseValue = () => {
  emit("click");
  emit("update:value", !!props.reversed);
};
const emit = defineEmits(["update:value", "click"]);
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
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
