<template>
  <LayoutPage>
    <LayoutHeader :label="`Henlo, ${UserInfo.GetUsername()}`" />
    <main>
      <section class="date-container">
        <TextTitle :value="date" />
        <CardTrivia />
      </section>
      <section class="schedule">
        <Refresher @refresh="Refresh" />
        <TextSubheading value="Today's Schedule" class="bold" />
        <section class="dog-log" v-for="dog in dogs">
          <aside class="identity">
            <Avatar
              type="dog"
              :value="dog[1].props.breed"
              :color="dog[1].props.color"
            />
            <TextParagraph :value="dog[1].props.name" class="bold" />
          </aside>
          <aside class="logs">
            <CardLog
              v-for="log of GetLogs(dog[1])?.keys()"
              :log="GetLogs(dog[1])?.get(log)"
            />
          </aside>
        </section>
      </section>
    </main>
  </LayoutPage>
</template>
<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, onMounted, ref, Ref } from "vue";
import { LayoutPage, LayoutHeader } from "../../layout";
import {
  Calendar,
  DatabaseMounter,
  PawprintsEvent,
  SeedGenerator,
  UserInfo,
} from "../../utils";
import { Props as PropsDog } from "../../server/models/Dogs";
import { Props as PropsLAD } from "../../server/models/LogAddressingData";
import {
  TextTitle,
  CardTrivia,
  TextSubheading,
  Avatar,
  TextParagraph,
  CardLog,
  Refresher,
} from "../../components";

const Refresh = (event: any) => {
  PawprintsEvent.EventDispatcher("sync-data");
  setTimeout(() => event.target.complete(), 500);
};

const GetLogs = (dog: DogData) =>
  dog.logs.get(
    SeedGenerator(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        0,
        0,
        0
      )
    ).toString()
  );

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

const date = `${
  Calendar.monthsShort[new Date().getMonth()]
} ${new Date().getDate()}`;

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
main {
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.date-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.text-title {
  margin: auto;
}

.schedule {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.dog-log {
  display: flex;
  width: 100%;
  background-color: var(--theme-secondary-dark-background);
  border-radius: 10px;
}

.identity {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.avatar {
  width: 70px;
}
</style>
