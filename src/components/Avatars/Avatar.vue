<template>
  <section :class="[`avatar-${type}`, 'avatar']">
    <img :src="image" />
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { PawPrints } from "../../assets/images";
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value: string) => ["dog", "user"].includes(value),
  },
  design: {
    type: String,
    default: "default",
    validator: (value: string) => ["default"].includes(value),
  },
});

const GetImage = () => {
  switch (props.design) {
    default:
      return PawPrints;
  }
};

const image = ref(GetImage());
</script>

<style scoped>
.avatar {
  background-color: var(--ion-color-secondary);
  border-radius: 100%;
  --image-scale: 120%;

  > * {
    width: 100%;
    height: 100%;
    transform: scale(var(--image-scale));
  }
}
</style>
