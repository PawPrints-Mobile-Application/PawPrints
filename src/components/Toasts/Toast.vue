<template>
  <section class="toast" :class="[anchor, { show: !!show }]">
    <section class="inside-wrapper">
      <slot>{{ content }}</slot>
    </section>
  </section>
</template>
<script setup lang="ts">
defineProps({
  content: String,
  anchor: {
    type: String,
    default: "top",
    validator: (value: string) => ["top", "bottom"].includes(value),
  },
  show: Boolean,
});
</script>
<style scoped>
.toast {
  --width: 90%;
  --background-color: #00000096;
  --color: var(--ion-color-white);

  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: all 200ms ease-out;
}

.top {
  top: -100px;
  --move-top: 20px;
  --move-bottom: none;
}

.bottom {
  bottom: -100px;
  --move-top: none;
  --move-bottom: 20px;
}

.show {
  top: var(--move-top);
  bottom: var(--move-bottom);
}

.inside-wrapper {
  min-width: var(--width);
  background-color: var(--background-color);
  color: var(--color);
  padding: 10px;
  border-radius: 20px;
  text-align: center;
  font-weight: 700;
  min-height: 20px;
}
</style>
