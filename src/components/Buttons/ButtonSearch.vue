<template>
  <section class="button-search" :class="{ expand: expand }" @click="Click">
    <div class="wrapper">
        <div class="cirle" />
        <div class="line" />
    </div>
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
};

const emit = defineEmits(["update:expand", "expand", "collapse"]);
</script>
<style scoped>
.button-search {
  --color: var(--ion-color-black);
  --background-color: var(--ion-color-secondary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50px;
  aspect-ratio: 1;
  --translateYUp: -8px;
  --translateYDown: 8px;

  > .wrapper {
    width: 35px;
    aspect-ratio: 1;
    border-radius: 5px;
    background-color: var(--background-color);
  }
}

.expand {
  --translateYUp: 8px;
  --translateYDown: -8px;
}

.circle {
    
}
</style>
