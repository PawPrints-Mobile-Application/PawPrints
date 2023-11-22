<template>
  <button class="settings-card" @click="Redirect">
    <img :src="icon" />
    <h4>{{ label }}</h4>
  </button>
</template>
<script setup lang="ts">
import { useIonRouter } from "@ionic/vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

const ionRouter = useIonRouter();
const Redirect = () => {
  emit("click");
  ionRouter.navigate(`/settings/${props.label}`, "forward", "push");
};
const emit = defineEmits(["click"]);
</script>
<style scoped>
.settings-card {
  max-height: 150px;
  flex: 1 0 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 20px;
  background-color: var(--ion-color-secondary);

  > img {
    width: 80px;
    aspect-ratio: 1;
  }

  > h4 {
    margin: 0;
    font-size: var(--fs3);
  }
}

.settings-card:active {
  background-color: var(--ion-color-secondary-shade);
}
</style>
