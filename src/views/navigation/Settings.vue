<template>
  <LayoutPage>
    <header>
      <ButtonMode />
      <ButtonTheme
        :name="color"
        v-for="color of ObjectToMap(Enums.Theme).keys()"
      />
    </header>
    <main>
      <CardUser />
      <section class="links">
        <CardSettings
          v-for="detail in data"
          :name="detail.name"
          :icon="detail.icon"
          :target="detail.target"
        />
      </section>
    </main>
    <footer>
      <ButtonSignout :db="db" />
    </footer>
  </LayoutPage>
</template>
<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from "vue";
import {
  ButtonMode,
  ButtonTheme,
  CardUser,
  CardSettings,
  ButtonSignout,
} from "../../components";
import { LayoutPage } from "../../layout";
import { Enums } from "../../server/models/Information";
import { DatabaseMounter, ObjectToMap } from "../../utils";
import {
  person as profileIcon,
  pricetags as subscriptionIcon,
  // helpCircle as faqsIcon,
  alertCircle as aboutIcon,
} from "ionicons/icons";

const data = [
  { name: "Profile", icon: profileIcon, target: "profile" },
  { name: "Subscriptions", icon: subscriptionIcon, target: "subscription" },
  // { name: "Frequently Asked Questions", icon: faqsIcon, target: "faqs" },
  { name: "About Us", icon: aboutIcon, target: "about" },
];

const db = ref();
const UpdateDB = (value: any) => {
  if (!value) return;
  db.value = value;
};

onBeforeMount(() => {
  DatabaseMounter.Mount(UpdateDB);
});

onMounted(() => {
  DatabaseMounter.Request();
});

onBeforeUnmount(() => {
  DatabaseMounter.Unmount(UpdateDB);
});
</script>
<style scoped>
header {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding-block: 20px 10px;
}

main {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-block: 20px;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

footer {
  width: 100%;
}

.button-signout {
  width: 100%;
}
</style>
