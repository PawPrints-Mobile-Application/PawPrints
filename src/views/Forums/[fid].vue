<template>
  <LayoutPage justify="flex-start">
    <template #header>
      <section class="header">
        <ButtonBack
          @click="() => ionRouter.navigate('/forums', 'forward', 'replace')"
        />
        <TextHeading>FORUM</TextHeading>
      </section>
    </template>
    <section class="wrapper" v-if="!!post">
      <IonRefresher slot="fixed" @ionRefresh="Refresher($event)"
        ><IonRefresherContent
      /></IonRefresher>
      <CardPost :post="post" />
      <CardComment v-for="comment in comments" :comment="comment" />
      <section class="card-comment">
        <header>
          <div class="commentContentIcon">
            <IonIcon :icon="commentContentIcon" />
          </div>
          <Avatar type="user" />
          <aside>
            <TextSmall>
              {{ placeholder.uid }}
            </TextSmall>
            <ButtonText
              class="add-post"
              label="Write a comment"
              @click="() => (modalOpen = true)"
            />
          </aside>
        </header>
      </section>
    </section>
    <ModalAddComment
      :isOpen="modalOpen"
      @discard="() => (modalOpen = false)"
      :post="post"
    />
  </LayoutPage>
</template>
<script setup lang="ts">
import { LayoutPage } from "../../layout";
import { Avatar } from "../../components/Avatars";
import { TextHeading, TextSmall } from "../../components/Texts";
import {
  IonIcon,
  useIonRouter,
  onIonViewWillEnter,
  onIonViewDidEnter,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";
import { arrowUndo as commentContentIcon } from "ionicons/icons";
import { ref, Ref } from "vue";
import { useRoute } from "vue-router";
import {
  Props as PropsPost,
  Sync as SyncPost,
} from "../../server/models/Forums";
import { ButtonText, ButtonBack } from "../../components/Buttons";
import { CardPost, CardComment } from "../../components/Cards";
import { ModalAddComment } from "../../components/Modals";
import { CustomEvent } from "../../utils";
import {
  Props as PropsComments,
  Sync as SyncComment,
} from "../../server/models/Comments";
const ionRouter = useIonRouter();

const modalOpen = ref(false);

const placeholder = {
  fid: "adada",
  uid: "123",
  content: "Hello",
  DTPost: new Date(),
  tags: ["Google", "Facebook", "Twitter"],
  comments: ["123", "456"],
  likes: ["789", "098"],
  commentcontent:
    "Aozi po Aozi po Aozi po Aozi po Aozi po Aozi po Aozi po Aozi po Aozi po",
};

const ReloadPost = async () => {
  comments.value = [];
  return SyncPost(fid.value).then(async (value: PropsPost) => {
    comments.value = [];
    post.value = value;
    for (let cid of post.value.comments) {
      const comment = await SyncComment(fid.value, cid);
      comments.value.push(comment);
      // console.log(comment);
    }
    return;
  });
};

const Refresher = (event: any) => ReloadPost().then(event!.target!.complete());

const route = useRoute();
const params = ref(route.params);
const fid = ref();
const post: Ref<PropsPost | undefined> = ref();
const comments: Ref<PropsComments[]> = ref(new Array());
onIonViewWillEnter(async () => {
  if (typeof params.value.fid === "string") fid.value = params.value.fid;
  else fid.value = params.value.fid.join("");
  CustomEvent.EventListener("reload-post", ReloadPost);
  await ReloadPost();
});

onIonViewDidEnter(() => {});
</script>

<script lang="ts">
export default {
  name: "Forum",
};
</script>
<style scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-block: 10px;
  min-height: 70;

  > .button-back {
    max-width: 40px;
  }

  > .text-heading {
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
  }
}
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
.card-post {
  width: 100%;
  min-height: 60px;
  background-color: var(--theme-secondary-background);
  outline: 2px solid var(--theme-card-highlight-color);
  color: var(--theme-secondary-text);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  gap: 5px;
}

.card-post header {
  display: flex;
  align-items: center;
  gap: 5px;
}

.avatar {
  --size: 40px;
}

.tags {
  width: 100%;
}

ion-chip {
  --background: var(--theme-quadratic-background);
  --color: var(--theme-quadratic-text);
  font-size: var(--fs4);
  height: 25px;
}

footer {
  display: flex;
  align-items: center;
  gap: 20px;
}
.button-interaction {
  display: flex;
  align-items: center;
  gap: 5px;
}

ion-icon {
  font-size: 20px;
}

.card-comment {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.card-comment header {
  display: flex;
  align-items: center;
}

.commentContentIcon {
  transform: rotateY(180deg) rotateX(180deg);
}

.card-comment-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 60px;
  font-style: italic;
}

aside {
  width: 100%;
}
.add-post {
  width: 100%;
  background-color: var(--theme-secondary-dark-background);
  color: var(--theme-secondary-dark-text);
  --padding: 5px 9px;
  --justify-content: flex-start;
}
</style>
