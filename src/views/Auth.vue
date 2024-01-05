<template>
  <IonPage class="auth">
    <Avatar />
    <section class="sign" :class="{ show: state.show }">
      <TextTitle class="center" value="PawPrints" />
      <TextSubheading
        class="normal center"
        value="Your Ultimate Canine Companion Care App"
      />
      <ButtonText value="Guest" />
      <ButtonText value="Sign In" @click="ShowModal('modal-signin')" />
      <ButtonText value="Sign Up" @click="ShowModal('modal-signup')" />
    </section>
    <ModalSignin :db="db" />
    <ModalSignup :db="db" />
  </IonPage>
</template>
<script setup lang="ts">
import {
  Avatar,
  ButtonText,
  TextTitle,
  TextSubheading,
  ModalSignin,
  ModalSignup,
} from "../components";
import { IonPage } from "@ionic/vue";
import { onMounted, reactive, ref, onBeforeMount, onBeforeUnmount } from "vue";
import { PawprintsEvent } from "../utils";

const state = reactive({
  show: false,
  ready: false,
});

const ShowModal = (trigger: "modal-signin" | "modal-signup") => {
  PawprintsEvent.EventDispatcher(trigger, "show");
};

const db = ref();
onBeforeMount(() => {
  PawprintsEvent.AddEventListener("response-db", (value: any) => {
    db.value = value;
  });
});

onMounted(() => {
  setTimeout(() => (state.show = true), 100);
  PawprintsEvent.EventDispatcher("request-db");
});

onBeforeUnmount(() => {
  PawprintsEvent.RemoveEventListener(
    "response-db",
    (value: any) => (db.value = value)
  );
});
</script>
<style scoped>
.auth {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.avatar {
  transition: all 200ms ease-out;
  --size: 200px;
}

.sign {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
  overflow: hidden;
  height: 0;
  transition: all 200ms ease-out;

  &.show {
    height: 235px;
  }
}
</style>

<style>
:root {
  background-color: var(--theme-primary-background);
}
</style>
