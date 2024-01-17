<template>
  <Popup
    trigger="popup-add-comment"
    @dismiss="() => (expanded = false)"
    @present="() => (expanded = true)"
  >
    <template #content="{ Hide }">
      <section class="add-comment">
        <header>
          <aside>
            <Avatar type="user" />
            <TextHeading :value="UserInfo.GetUsername()" />
          </aside>
          <IonIcon :icon="icon" @click="Hide" />
        </header>
        <section class="content">
          <InputLabel value="Comment" />
          <InputTextarea v-model="form.description" />
        </section>
        <footer>
          <ButtonSuccess value="Post" @click="AddComment(Hide)" />
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
import { Set } from "../../server/models/Comments";

const props = defineProps({
  fid: String,
});

const expanded = ref(false);

const form = reactive({
  description: "",
});

const Clear = () => {
  form.description = "";
};

const AddComment = (callback: () => void) => {
  const cid = SeedGenerator().toString();
  return Set({
    cid: cid,
    fid: props.fid!,
    uid: UserInfo.GetUID(true)!,
    content: form.description,
    DTPost: new Date(),
  })
    .then(callback)
    .then(Clear)
    .then(() => PawprintsEvent.EventDispatcher("reload-post"));
};
</script>
<style scoped>
.add-comment {
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
  --background: var(--theme-primary-background);
  --color: var(--theme-primary-text);
}

.button-success {
  width: 100%;
}
</style>
