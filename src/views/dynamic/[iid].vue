<template>
  <LayoutPage>
    <LayoutHeader
      :returnTarget="'/dogs/' + dog?.pid!"
      label="Dog Information"
    />
    <main>
      <CardDog :dog="dog" />
      <ButtonDanger value="Delete Dog" @click="Delete" />
    </main>
  </LayoutPage>
</template>
<script setup lang="ts">
import {
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  Ref,
} from "vue";
import { useRoute } from "vue-router";
import { LayoutHeader, LayoutPage } from "../../layout";
import { DatabaseMounter, PawprintsEvent, UserInfo } from "../../utils";
import { Props as PropsDog, Remove } from "../../server/models/Dogs";
import { CardDog, ButtonDanger } from "../../components";
import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();
const Navigate = () => ionRouter.navigate(`/dogs`);

const Delete = () =>
  Remove(db.value, pid.value, UserInfo.GetUID())
    .then(Navigate)
    .then(() => PawprintsEvent.EventDispatcher("reset-dogs"));

const route = useRoute();
const params = ref(route.params);
const pid = ref(params.value.pid.toString());

const dog: Ref<PropsDog> = ref({
  pid: "",
  name: "",
  birthday: new Date(),
  breed: "",
  color: "",
  latids: [],
});
const UpdateDog = (value: PropsDog) => (dog.value = value);
const RequestDog = () =>
  PawprintsEvent.EventDispatcher("request-dog", pid.value);

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
    RequestDog();
    update.value = false;
  }
);

onBeforeMount(() => {
  DatabaseMounter.Mount(UpdateDB);
  PawprintsEvent.AddEventListener("set-dog", UpdateDog);
});

onMounted(() => {
  if (!db.value) DatabaseMounter.Request();
  else update.value = true;
});

onBeforeUnmount(() => {
  DatabaseMounter.Unmount(UpdateDB);
  PawprintsEvent.RemoveEventListener("set-dog", UpdateDog);
});
</script>
<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-block: 30px;
}

.button-danger {
  width: 100%;
  margin-block: 30px;
}
</style>
