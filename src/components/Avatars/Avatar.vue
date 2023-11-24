<template>
  <section :class="[`avatar-${type}`, 'avatar']">
    <IonSkeletonText v-if="!!lazyLoad && !src " />
    <img :src="GetAvatar()" v-else />
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { IonSkeletonText } from "@ionic/vue";
import { PawPrints } from "../../assets/images";
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value: string) => ["dog", "user"].includes(value),
  },
  src: String,
  lazyLoad: Boolean,
});

const GetAvatar = () => {
  if (props.type === "dog") {
    switch (props.src) {
      default:
        return PawPrints;
    }
  } else {
    switch (props.src) {
      default:
        return PawPrints;
    }
  }
};

const image = computed(() => !!props.src ? props.src : PawPrints);
</script>

<style scoped>
.avatar {
  --image-scale: 120%;
  width: var(--size);
  height: var(--size);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  > * {
    width: 100%;
    height: 100%;
  }

  > img {
    transform: scale(var(--image-scale));
  }
}

.avatar-dog {
  border-radius: 15px;
}

.avatar-user {
  border-radius: 100%;
}
</style>
