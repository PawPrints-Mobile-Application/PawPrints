<template>
  <button class="dog-preview-card" @click="Redirect">
    <PetAvatar :background-color="data.color" />
    <h4>{{ data.name }}</h4>
    <h5>{{ data.age }}</h5>
  </button>
</template>

<script setup lang="ts">
import { Default as PetAvatar } from "../../components/Avatars/Pets";
import { useIonRouter } from "@ionic/vue";
import { Age } from "../../utils";

const ionRouter = useIonRouter();
const Redirect = () => ionRouter.push(`/dogs/${data.pid}/profile`);

const props = defineProps({
  icon: String,
  dog: {
    type: Object,
    required: true,
  },
});

const data = {
  name: props.dog.name,
  age: new Age(new Date(props.dog.birthday)).toString(),
  color: props.dog.color,
  pid: props.dog.pid,
};
</script>

<style scoped>
.dog-preview-card {
  background-color: var(--ion-color-secondary);
  border-radius: 10px;
  border: none;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  flex: 1 0 120px;

  > h4,
  h5,
  .pet-avatar {
    font-size: var(--fs4);
    margin: 0;
    width: 90px;
  }

  > h4 {
    font-size: var(--fs2);
    font-family: Poppins;
    font-weight: 700;
  }
}

.dog-card:active {
  background-color: var(--ion-color-secondary-shade);
}
</style>
