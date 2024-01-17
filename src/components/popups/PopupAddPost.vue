<template>
  <Popup
    trigger="popup-add-post"
    @dismiss="() => (expanded = false)"
    @present="() => (expanded = true)"
  >
    <template #content="{ Hide }">
      <section class="add-post">
        <header>
          <aside>
            <Avatar type="user" />
            <TextHeading :value="UserInfo.GetUsername()" />
          </aside>
          <IonIcon :icon="icon" @click="Hide" />
        </header>
        <section class="content">
          <InputLabel value="Description" />
          <InputTextarea v-model="form.description" />
        </section>
        <footer>
          <ButtonSuccess value="Post" @click="AddPost(Hide)" />
        </footer>
      </section>
    </template>
  </Popup>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import {
  Avatar,
  ButtonSuccess,
  InputLabel,
  InputTextarea,
  Popup,
  TextHeading,
} from "..";
import { IonIcon } from "@ionic/vue";
import { close as icon } from "ionicons/icons";
import { PawprintsEvent, SeedGenerator, UserInfo } from "../../utils";
import { Set } from "../../server/models/Posts";

const expanded = ref(false);

const form = reactive({
  description: "",
});

const Clear = () => {
  form.description = "";
};

const AddPost = (callback: () => void) => {
  const fid = SeedGenerator().toString();
  return Set({
    fid: fid,
    uid: UserInfo.GetUID(true)!,
    content: form.description,
    DTPost: new Date(),
    lastInteraction: new Date(),
    comments: [],
    likes: [],
  })
    .then(callback)
    .then(Clear)
    .then(() => PawprintsEvent.EventDispatcher("reload-forums"));
};
</script>
<style scoped>
.add-post {
  width: 300px;
  border-radius: 10px;
  background-color: var(--theme-secondary-background);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  gap: 10px;

  > aside {
    display: flex;
    align-items: center;

    > .avatar {
      width: 60px;
    }

    > .text-heading {
      font-weight: 700;
      color: var(--theme-forum-post-text)
    }
  }

  ion-icon {
    font-size: 30px;
    background-color: var(--theme-tertiary-background);
    border-radius: 100%;
    color: var(--theme-secondary-background);
  }
}

.content {
  color: var(--theme-secondary-text);
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.input-label {
  color: var(--theme-secondary-text);
}

.input-textarea {
  width: 280px;
  height: 300px;
  --background: var(--theme-forum-post-background);
  --color: var(--theme-forum-post-text);
}

.button-success {
  width: 100%;
}
</style>
