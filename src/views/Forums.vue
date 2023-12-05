<template>
  <LayoutPage
    justify="flex-start"
    @on-scroll-top="() => (state.hideCard = false)"
    @off-scroll-top="() => (state.hideCard = true)"
  >
    <template #header>
      <TextHeading class="title"> FORUM </TextHeading>
    </template>
    <section v-if="UserTypeRestriction()">
      This is only available on Non-guest Users
    </section>
    <section class="content" v-else>
      <InputSegment
        class="forums-segment"
        :options="viewSegments"
        v-model="state.viewSegment"
        show="label"
      />
      <section class="add-post-wrapper">
        <Avatar type="user" />
        <ButtonText
          class="add-post"
          label="Write something..."
          @click="() => (modalOpen = true)"
        />
      </section>
      <section class="post-wrapper">
        <IonRefresher slot="fixed" @ionRefresh="Refresher($event)"
          ><IonRefresherContent
        /></IonRefresher>
        <CardPost
          v-for="post in isPublic() ? posts : filteredPosts"
          :post="post[1]"
        />
      </section>
      <ModalAddPost :isOpen="modalOpen" @discard="() => (modalOpen = false)" />
    </section>
  </LayoutPage>
</template>

<script lang="ts" setup>
import { LayoutPage } from "../layout";
import { TextHeading } from "../components/Texts";
import { InputSegment } from "../components/Forms";
import { CustomEvent, GetUID, SegmentOption } from "../utils";
import { reactive, ref, Ref } from "vue";
import { ButtonText } from "../components/Buttons";
import { ModalAddPost } from "../components/Modals";
import { Avatar } from "../components/Avatars";
import { CardPost } from "../components/Cards";
import { Props, SyncAll } from "../server/models/Forums";
import {
  onIonViewDidEnter,
  onIonViewWillEnter,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";

const UserTypeRestriction = () => !GetUID();

const modalOpen = ref(false);

const posts: Ref<Map<string, Props>> = ref(new Map());
const filteredPosts: Ref<Map<string, Props>> = ref(new Map());

const isPublic = () => state.viewSegment === viewSegments[0];

const viewSegments = [
  new SegmentOption("Public Feed"),
  new SegmentOption("My Posts"),
];

const state = reactive({
  hideCard: false,
  viewSegment: viewSegments[0],
});

const Refresher = (event: any) =>
  ReloadForums().then(event!.target!.complete());

const ReloadForums = () => {
  posts.value = new Map();
  return SyncAll((value, fid) => {
    posts.value.set(fid, value);
    if (value.uid === GetUID()) filteredPosts.value.set(fid, value);
  });
};

onIonViewWillEnter(async () => {});

onIonViewDidEnter(async () => {
  CustomEvent.EventListener("reload-forums", ReloadForums);
  if (sessionStorage.getItem("forumsInitialized") !== "true") {
    ReloadForums().then(() =>
      sessionStorage.setItem("forumsInitialized", "true")
    );
  }
});
</script>

<script lang="ts">
export default {
  name: "Forums",
  components: { Avatar },
};
</script>

<style scoped>
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
}

.add-post-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
}
.avatar {
  --size: 40px;
}
.add-post {
  background-color: var(--theme-secondary-dark-background);
  color: var(--theme-secondary-dark-text);
  flex: 1 0 0;
  --justify-content: flex-start;
  --padding: 5px 9px;
}
.input-segment {
  --flex: 1 0 0;
}

.post-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
