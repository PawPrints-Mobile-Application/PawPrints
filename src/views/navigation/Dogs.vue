<template>
  <LayoutPage>
    <Toast trigger="prohibit-add-dog" height="70px">
      <template #default="{ Toggle }">
        <ToastSmall
          type="danger"
          title="Dog Amount Exceeded!"
          content="Subscribe for more dog slots!"
          @close="Toggle"
        />
      </template>
    </Toast>
    <LayoutHeader label="MY DOGGOS" />
    <section class="content">
      <Refresher @refresh="Refresh" />
      <section class="dogs">
        <CardDog v-for="dog in dogs" :dog="dog[1]" @click="Navigate(dog[0])" />
      </section>
    </section>
    <ModalAddDog :db="db" />
  </LayoutPage>
</template>
<script setup lang="ts">
import { CardDog, ModalAddDog, Refresher, Toast } from "../../components";
import { ToastSmall } from "../../layout";
import {
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  ref,
  Ref,
  watch,
} from "vue";
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

// -------------------------- DOGS --------------------------
const dogs: Ref<Map<string, PropsDog>> = ref(new Map());

const UpdateDogs = (values: Map<string, PropsDog>) => values.forEach(UpdateDog);
const UpdateDog = (value: PropsDog) => dogs.value.set(value.pid, value);
const RequestDogs = () => PawprintsEvent.EventDispatcher("request-dogs");
const ResetDogs = () => dogs.value = new Map();

const db = ref();
const UpdateDB = (value: any) => {
  if (!value) return;
  db.value = value;
  update.value = true;
};

const update = ref(false);
watch(
  () => !!db.value && update.value,
  () => {
    console.log("request");
    RequestDogs();
    update.value = false;
  }
);

const ResetData = () => {
  dogs.value = new Map();
};

onBeforeMount(() => {
  DatabaseMounter.Mount(UpdateDB);
  PawprintsEvent.AddEventListener("update-dogs", UpdateDogs);
  PawprintsEvent.AddEventListener("create-dog", UpdateDog);

  PawprintsEvent.AddEventListener("reset-dogs", ResetDogs);
  PawprintsEvent.AddEventListener("reset-data", ResetData);
});

onMounted(() => {
  if (!db.value) DatabaseMounter.Request();
  else update.value = true;
});

onBeforeUnmount(() => {
  DatabaseMounter.Unmount(UpdateDB);
  PawprintsEvent.RemoveEventListener("update-dogs", UpdateDogs);
  PawprintsEvent.RemoveEventListener("create-dog", UpdateDog);

  PawprintsEvent.RemoveEventListener("reset-dogs", ResetDogs);
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
