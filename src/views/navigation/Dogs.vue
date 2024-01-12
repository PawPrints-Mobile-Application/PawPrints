<template>
  <LayoutPage>
    <header>
      <TextHeading value="MY DOGGOS" class="bold" />
    </header>
    <section class="content">
      <InputText v-model="filter" placeholder="Search" />
      <section class="dogs">
        <CardDog v-for="dog in dogs" :dog="dog" @click="Navigate(dog)" />
      </section>
    </section>
    <ModalAddDog :db="db" @success="AddToDogs" />
  </LayoutPage>
</template>
<script setup lang="ts">
import { TextHeading, InputText, CardDog, ModalAddDog } from "../../components";
import {
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  ref,
  Ref,
  watch,
} from "vue";
import { Props } from "../../server/models/Dogs";
import { PawprintsEvent, DatabaseMounter } from "../../utils";
import { LayoutPage } from "../../layout";
import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();
const Navigate = (dog: Props) => ionRouter.navigate(`/dogs/${dog.pid}`);

const filter = ref("");

const dogs: Ref<Props[]> = ref([]);
const UpdateDogs = (values: Props[]) => {
  dogs.value = [];
  values.forEach((value, key) => {
    setTimeout(() => dogs.value.push(value), 10 * key);
  });
};
const AddToDogs = (value: Props) => {
  dogs.value.push(value);
  PawprintsEvent.EventDispatcher("add-to-dogs", value);
};

const db = ref();
const UpdateDB = (value: any) => {
  if (!value) return;
  db.value = value;
};

onBeforeMount(() => {
  PawprintsEvent.AddEventListener("response-dogs", UpdateDogs);
  DatabaseMounter.Mount(UpdateDB);
});

onMounted(() => {
  DatabaseMounter.Request();
});

onBeforeUnmount(() => {
  PawprintsEvent.RemoveEventListener("response-dogs", UpdateDogs);
  DatabaseMounter.Unmount(UpdateDB);
});

watch(db, () =>
  setTimeout(() => PawprintsEvent.EventDispatcher("request-dogs"), 1)
);
</script>
<style scoped>
header {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dogs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.text-heading {
  color: var(--theme-primary-text);
}
</style>
