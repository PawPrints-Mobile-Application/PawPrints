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
  </LayoutPage>
</template>

<script lang="ts" setup>
import { LayoutPage } from "../layout";
import { search as icon } from "ionicons/icons";
import { IonIcon } from "@ionic/vue";
import { CardDog } from "../components/Cards";
import { TextHeading } from "../components/Texts";
import {
  onIonViewDidEnter,
  onIonViewWillEnter,
  useIonRouter,
} from "@ionic/vue";
import { ref, Ref } from "vue";
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

// Heavy Functions
onIonViewDidEnter(() => {});
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
