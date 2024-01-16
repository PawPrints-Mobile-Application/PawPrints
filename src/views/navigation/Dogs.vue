<template>
  <LayoutPage>
    <LayoutHeader label="MY DOGGOS" />
    <section class="content">
      <Refresher @refresh="Refresh" />
      <InputText v-model="filter" placeholder="Search" />
      <section class="dogs">
        <CardDog
          v-for="dog in dogs"
          :dog="dog[1].props"
          @click="Navigate(dog[0])"
        />
      </section>
    </section>
    <ModalAddDog :db="db" @success="AddDog" />
  </LayoutPage>
</template>
<script setup lang="ts">
import { InputText, CardDog, ModalAddDog, Refresher } from "../../components";
import { onBeforeMount, onBeforeUnmount, onMounted, ref, Ref } from "vue";
import { Props as PropsDog } from "../../server/models/Dogs";
import { Props as PropsLAD } from "../../server/models/LogAddressingData";
import { PawprintsEvent, DatabaseMounter } from "../../utils";
import { LayoutHeader, LayoutPage } from "../../layout";
import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();
const Navigate = (pid: string) => ionRouter.navigate(`/dogs/${pid}`);

const Refresh = (event: any) => {
  PawprintsEvent.EventDispatcher("sync-data");
  setTimeout(() => event.target.complete(), 500);
};

const filter = ref("");

type DogData = {
  props: PropsDog;
  logs: Map<string, Map<string, PropsLAD>>;
};
const dogs: Ref<Map<string, DogData>> = ref(new Map());
const UpdateDogs = (values: Map<string, DogData>) => {
  if (values.size < 1) return;
  dogs.value = new Map();
  let i = 0;
  values.forEach((value, key) => {
    setTimeout(() => dogs.value.set(key, value), 10 * i);
    i++;
  });
};
const AddDog = (value: PropsDog) => {
  dogs.value.set(value.pid, {
    props: value,
    logs: new Map(),
  });
  PawprintsEvent.EventDispatcher("add-to-dogs", value);
};

const db = ref();
const UpdateDB = (value: any) => {
  if (!value) return;
  db.value = value;
  setTimeout(RequestDogs, 1);
};
const RequestDogs = () => PawprintsEvent.EventDispatcher("request-dogs");

onBeforeMount(() => {
  PawprintsEvent.AddEventListener("response-dogs", UpdateDogs);
  DatabaseMounter.Mount(UpdateDB, RequestDogs);
});

onMounted(() => {
  DatabaseMounter.Request();
});

onBeforeUnmount(() => {
  PawprintsEvent.RemoveEventListener("response-dogs", UpdateDogs);
  DatabaseMounter.Unmount(UpdateDB, RequestDogs);
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
