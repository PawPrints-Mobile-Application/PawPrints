<template>
  <section class="button-search" :class="{ expand: expand }" @click="Click">
    <div class="circle" />
    <div class="line" />
  </section>
</template>
<script setup lang="ts">
const props = defineProps({
  expand: Boolean,
});

const Click = () => {
  const temp = !props.expand;
  emit("update:expand", temp);
  if (temp) emit("expand");
  else emit("collapse");
  emit("click");
};

const emit = defineEmits(["update:expand", "expand", "collapse", "click"]);
</script>
<style scoped>
.button-search {
  --color: var(--ion-color-black);
  --thickness: 4px;
  background-color: var(--ion-color-secondary);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  aspect-ratio: 1;
  overflow: hidden;

  > * {
    position: absolute;
    transition: all 200ms ease-out;
  }

  > .circle {
    border-radius: 100%;
    width: 15px;
    outline: var(--thickness) solid var(--color);
    aspect-ratio: 1;
    transform: translate(-6px, -6px);
  }

  > .line {
    border-radius: 6px;
    width: 20px;
    height: var(--thickness);
    background-color: var(--color);
    transform: rotate(45deg) translate(12px, 0px);
  }
}

.button-search.expand {
  .circle {
    transform: translate(0, 0) scale(1.5) !important;
  }

  .line {
    transform: rotate(45deg) translate(32px, 0px) scale(1.5) !important;
    opacity: 0;
  }
}
</style>
