<template>
  <img
    :src="GetImage()"
    :class="[`avatar-${type}`, 'avatar']"
    :style="{ backgroundColor: !color ? 'none' : color }"
  />
</template>

<script setup lang="ts">
import { personCircleOutline as UserDefault } from "ionicons/icons";
import { PawPrints as DogDefault } from "../../assets";
import { Breeds } from "../../utils";
import { onMounted } from "vue";
const props = defineProps({
  value: String,
  type: {
    type: String,
    default: "dog",
    validator: (value: string) => ["user", "dog"].includes(value),
  },
  color: String,
});

const GetImage = () => {
  if (!props.value) return props.type === "dog" ? DogDefault : UserDefault;
  const image =
    props.type === "dog"
      ? Breeds.map.get(props.value!)
      : Breeds.map.get(props.value!);
  if (!image) return props.type === "dog" ? DogDefault : UserDefault;
  return image;
};

onMounted(() => {});
</script>

<style scoped>
.avatar {
  width: var(--size);
  height: var(--size);
  padding: 5px;
}

.avatar-dog {
  border-radius: 15px;
}

.avatar-user {
  border-radius: 100%;
}
</style>
