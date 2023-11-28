<template>
  <LayoutPage justify="flex-start">
    <template #header>
      <TextHeading class="title"> DOGGOS </TextHeading>
    </template>
    <section class="search-box">
      <IonIcon :icon="icon" />
      <InputDynamic v-model="search" @input="Reload" />
    </section>
    <section v-show="!!dogs" class="collection card-collection">
      <CardDog
        v-for="dog in filteredDogs"
        :dog="dog"
        @click="Navigate(dog.pid)"
      />
    </section>
    <ModalAddDog
      :isOpen="modalOpen"
      @submit="SubmitModalDog"
      @discard="CloseModalDog"
    />
  </LayoutPage>
</template>

<script lang="ts" setup>
import { LayoutPage } from "../layout";
import { search as icon } from "ionicons/icons";
import { IonIcon } from "@ionic/vue";
import { CardDog } from "../components/Cards";
import { TextHeading } from "../components/Texts";
import { CustomEvent } from "../utils";
import {
  onIonViewDidEnter,
  onIonViewWillEnter,
  useIonRouter,
} from "@ionic/vue";
import { ref, Ref } from "vue";
import { ModalAddDog } from "../components/Modals";
import { GetAll, Props } from "../server/models/Dogs";
import { InputDynamic } from "../components/Forms";
const ionRouter = useIonRouter();
const Navigate = (pid: string) =>
  ionRouter.navigate(`/dogs/${pid}/profile`, "forward", "push");

const dogs: Ref<Props[] | undefined> = ref();
const filteredDogs = ref(new Array<Props>());
const search = ref("");

const Reload = () => {
  const temp = new Array<Props>();
  dogs.value?.forEach((dog) => {
    if (dog.name.includes(search.value)) temp.push(dog);
  });
  filteredDogs.value = temp;
};

// Light Functions, preferrably async functions only
onIonViewWillEnter(async () => {
  dogs.value = await GetAll();
  filteredDogs.value = dogs.value;
});

const modalOpen = ref(false);
const OpenModalDog = () => {
  modalOpen.value = true;
};
const CloseModalDog = () => {
  modalOpen.value = false;
};
const SubmitModalDog = (pid: string) => {
  CustomEvent.EventDispatcher("reload", "dogs");
  ionRouter.navigate(`/dogs/${pid}/profile`, "forward", "push");
};

// Heavy Functions
onIonViewDidEnter(() => {
  CustomEvent.EventListener("modal-dog-open", OpenModalDog);
});
</script>

<script lang="ts">
export default {
  name: "Dogs",
};
</script>

<style scoped>
.search-box {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;

  > ion-icon {
    font-size: 30px;
    color: var(--theme-text);
  }

  > .input-box {
    flex: 1 0 0;
  }
}

.collection {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
