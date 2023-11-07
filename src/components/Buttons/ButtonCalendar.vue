<template>
  <section class="button-calendar" :class="{ expand: expand }" @click="Click">
    <div class="background" />
    <div class="line" />
    <div
      v-for="key in GetLocation()"
      class="dot"
      :style="{ transform: expand ? `translate(${key.x}px, ${key.y}px)` : 'translate(0,-8px)' }"
    />
  </section>
</template>
<script setup lang="ts">
const props = defineProps({
  expand: Boolean,
});

const GetLocation = () => {
  let temp = [];
  for (let i = 0; i < 5; i++) {
    const distance = 10;
    const x = [-distance, 0, distance][i % 3];
    const y = Math.floor(i / 3) * 8;
    temp.push({ x, y });
  }
  return temp;
};

const Click = () => {
  const temp = !props.expand;
  emit("update:expand", temp);
  if (temp) emit("expand");
  else emit("collapse");
};

const emit = defineEmits(["update:expand", "expand", "collapse"]);
</script>
<style scoped>
.button-calendar {
  --color: var(--ion-color-black);
  --background-color: var(--ion-color-secondary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50px;
  --translateYUp: -8px;
  --translateYDown: 8px;

  > .background {
    border-radius: 5px;
    width: 30px;
    aspect-ratio: 1;
    background-color: var(--color);
  }

  > .line {
    position: absolute;
    width: 30px;
    height: 3px;
    background-color: var(--background-color);
    transform: translateY(-8px);
  }

  > .dot {
    position: absolute;
    width: 3px;
    aspect-ratio: 1;
    background-color: var(--background-color);
    transition: all 200ms ease-out;
  }
}

.expand {
  --translateYUp: 8px;
  --translateYDown: -8px;
}
</style>
