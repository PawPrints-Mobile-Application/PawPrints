<template>
  <LayoutPage>
    <header>
      <TextHeading value="MY DOGGOS" class="bold" />
    </header>
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
import {
  TextHeading,
  InputText,
  CardDog,
  ModalAddDog,
  Refresher,
} from "../../components";
import {
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  ref,
  Ref,
  watch,
} from "vue";
import { Props as PropsDog } from "../../server/models/Dogs";
import { Props as PropsLAD } from "../../server/models/LogAddressingData";
import { PawprintsEvent, DatabaseMounter } from "../../utils";
import { LayoutPage } from "../../layout";
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
