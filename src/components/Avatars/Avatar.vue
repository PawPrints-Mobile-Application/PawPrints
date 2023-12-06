<template>
  <section
    :class="[`avatar-${type}`, 'avatar']"
    :style="{ backgroundColor: !color ? 'none' : color }"
  >
    <IonSkeletonText v-if="!!lazyLoad && !src" />
    <img :src="img" v-else />
  </section>
</template>

<script setup lang="ts">
import { IonSkeletonText } from "@ionic/vue";
import { personCircleOutline as UserDefault } from "ionicons/icons";
import { PawPrints as DogDefault } from "../../assets/images";
import { ref, onMounted, watch } from "vue";
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value: string) => ["dog", "user"].includes(value),
  },
  src: String,
  root: String,
  lazyLoad: Boolean,
  color: String,
});

const img = ref(DogDefault);
const importer = (root: string, name: string) =>
  import(`${root}assets/images/dogs/${name}.svg`);

const GetAvatar = async () => {
  img.value = props.type === "dog" ? DogDefault : UserDefault;
  if (!props.src || !props.root) return;
  const path = `./src/assets/images/dogs/${props.src}.svg`;
  try {
    await importer(props.root, props.src);
    img.value = path;
  } catch (error) {}
};

watch(
  () => props.src,
  async () => GetAvatar()
);

onMounted(async () => {
  await GetAvatar();
});
</script>

<style scoped>
.avatar {
  --image-scale: 95%;
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
