<template>
  <LayoutPage>
    <LayoutHeader label="MY DOGGOS" />
    <section class="content">
      <Refresher @refresh="Refresh" />
      <InputText v-model="filter" placeholder="Search" />
      <section class="dogs">
        <CardDog v-for="dog in dogs" :dog="dog[1]" @click="Navigate(dog[0])" />
      </section>
    </section>
    <ModalAddDog :db="db" />
  </LayoutPage>
</template>
<script setup lang="ts">
import { InputText, CardDog, ModalAddDog, Refresher } from "../../components";
import { onBeforeMount, onBeforeUnmount, onMounted, ref, Ref } from "vue";
import { Props as PropsDog } from "../../server/models/Dogs";
import { PawprintsEvent, DatabaseMounter } from "../../utils";
import { LayoutHeader, LayoutPage } from "../../layout";
import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();
const Navigate = (pid: string) => ionRouter.navigate(`/dogs/${pid}`);

const Refresh = (event: any) => {
  PawprintsEvent.EventDispatcher("sync-dogs");
  setTimeout(() => event.target.complete(), 500);
};

const filter = ref("");
// -------------------------- DOGS --------------------------
const dogs: Ref<Map<string, PropsDog>> = ref(new Map());
const UpdateDogs = (values: Map<string, PropsDog>) => values.forEach(UpdateDog);
const UpdateDog = (value: PropsDog) => dogs.value.set(value.pid, value);
const SyncDogs = () => PawprintsEvent.EventDispatcher("request-dogs");

const db = ref();
const UpdateDB = (value: any) => {
  if (!value) return;
  db.value = value;
  setTimeout(SyncDogs, 10);
};

const ResetData = () => {
  dogs.value = new Map();
};

onBeforeMount(() => {
  DatabaseMounter.Mount(UpdateDB);
  PawprintsEvent.AddEventListener("update-dogs", UpdateDogs);
  PawprintsEvent.AddEventListener("update-dog", UpdateDog);

  PawprintsEvent.AddEventListener("reset-data", ResetData);
});

onMounted(() => {
  DatabaseMounter.Request();
});

onBeforeUnmount(() => {
  DatabaseMounter.Unmount(UpdateDB);
  PawprintsEvent.RemoveEventListener("update-dogs", UpdateDogs);
  PawprintsEvent.RemoveEventListener("update-dog", UpdateDog);

  PawprintsEvent.RemoveEventListener("reset-data", ResetData);
});
</script>
<style scoped>
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
</style>
