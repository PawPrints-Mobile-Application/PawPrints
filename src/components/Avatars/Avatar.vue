<template>
  <section :class="[`avatar-${type}`, 'avatar']">
    <IonSkeletonText v-if="!!lazyLoad && !src " />
    <img :src="GetAvatar()" v-else />
  </section>
</template>

<script setup lang="ts">
import { IonSkeletonText } from "@ionic/vue";
import { personCircleOutline as UserDefault } from 'ionicons/icons';
import { PawPrints as DogDefault } from "../../assets/images";
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
        return DogDefault;
    }
  } else {
    switch (props.src) {
      default:
        return UserDefault;
    }
  }
};
</script>

<style scoped>
.avatar {
  --image-scale: 120%;
  width: var(--size);
  height: var(--size);
  aspect-ratio: 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: none;

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
