<template>
  <LayoutPage justify="flex-start" disableHeaderOnScroll addMarginBotton>
    <template #header>
      <header>
        <Avatar type="user" />
        <TextHeading>{{ authGreetings }}</TextHeading>
      </header>
    </template>
    <IonRefresher slot="fixed" @ionRefresh="Refresher($event)"
      ><IonRefresherContent
    /></IonRefresher>
    <section class="content">
      <TextHeading class="date">{{ dateText }}</TextHeading>
      <CardTrivia />
      <TextSubheading>Today’s Schedules</TextSubheading>
      <section class="daily-logs">
        <section class="wrapper">
          <div class="dog-logs" v-for="log of logs">
            <Avatar
              type="dog"
              :color="dogs.get(log[0])?.color"
              :src="dogs.get(log[0])?.breed"
            />
            <aside>
              <CardEachLog v-for="eachLog in log[1]" :log="eachLog" />
            </aside>
          </div>
        </section>
      </section>
    </section>
  </LayoutPage>
</template>

<script lang="ts" setup>
import { LayoutPage } from "../layout";
import { Avatar } from "../components/Avatars";
import {
  onIonViewDidEnter,
  onIonViewWillEnter,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";
import { Props as PropsLog, Get as GetLog } from "../server/models/Logs";
import { Get as GetLAT } from "../server/models/LogAddressingTable";
import { Get as GetDog, Props as PropsDog } from "../server/models/Dogs";
import { onMounted, ref } from "vue";
import { Calendar, CustomEvent } from "../utils";
import { TextHeading, TextSubheading } from "../components/Texts";
import { CardEachLog, CardTrivia } from "../components/Cards";

const dateText = `${
  Calendar.monthsShort[new Date().getMonth()]
} ${new Date().getDate()}`;

const authGreetings = `Henlo, ${
  localStorage.getItem("authUsername") === "Guest"
    ? "Hooman"
    : localStorage.getItem("authUsername")
}`;

const logs = ref(new Map<string, PropsLog[]>());
const dogs = ref(new Map<string, PropsDog>());

const Refresher = (event: any) => ReloadLogs().then(event!.target!.complete());

const ReloadLogs = async () => {
  logs.value = new Map<string, PropsLog[]>();
  dogs.value = new Map<string, PropsDog>();
  const date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  const props = await GetLAT(date);
  if (!!props) {
    for (let lid of props.logs) {
      const propsLog = await GetLog(lid, date);
      let prev = logs.value.get(propsLog.pid);
      if (!!prev) {
        prev.push(propsLog);
        logs.value.set(propsLog.pid, prev);
        continue;
      }
      logs.value.set(propsLog.pid, [propsLog]);
    }
  }
  logs.value.forEach((propsLog, pid) =>
    GetDog(pid).then((dog) => {
      dogs.value.set(pid, dog);
      propsLog.sort((a, b) => {
        const TStart = a.TStart.value - b.TStart.value;
        if (TStart !== 0) return TStart;
        return a.TEnd.value - b.TEnd.value;
      });
      logs.value.set(pid, propsLog);
    })
  );
  console.log(logs.value);
  console.log(dogs.value);
};

// Light Functions, preferrably async functions only
onIonViewWillEnter(async () => {});

// Heavy Functions
onIonViewDidEnter(() => {});

onMounted(async () => {
  CustomEvent.EventListener("reload-logs", ReloadLogs);
  await ReloadLogs();
});
</script>

<script lang="ts">
export default {
  name: "Home",
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  width: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  width: 100%;
}

.date {
  font-size: 40px;
  margin-block: 20px;
}

.daily-logs,
.wrapper {
  width: 100%;
}

.text-subheading {
  font-weight: 700;
  text-align: left;
  width: 100%;
}

.wrapper {
  background-color: var(--theme-secondary-dark-background);
  padding: 10px;
  border-radius: 10px;
  width: 100;
}

.dog-logs {
  width: 100%;
  display: flex;
  gap: 10px;
}

aside {
  flex: 1 0 0;
}

.avatar {
  --size: 60px;
}
</style>
