<template>
  <LayoutPage>
    <LayoutHeader label="Post" returnTarget="/forums" />
    <Refresher @refresh="Refresh" />
    <main v-show="!!post">
      <CardPost :post="post" />
      <section class="comments">
        <CardComment
          v-for="comment of Array.from(comments.values())"
          :comment="comment"
        />
        <section class="write-comment">
          <header>
            <IonIcon :icon="commentContentIcon" />
            <Avatar type="user" :value="UserInfo.GetAvatar().toString()" />
            <TextParagraph class="username" :value="UserInfo.GetUsername()" />
          </header>
          <div class="button font poppins small" @click="CommentPopup">
            Write a comment...
          </div>
        </section>
      </section>
    </main>
    <PopupAddComment :fid="fid" />
  </LayoutPage>
</template>
<script setup lang="ts">
import { arrowUndo as commentContentIcon } from "ionicons/icons";
import { useRoute } from "vue-router";
import {
  Avatar,
  CardComment,
  CardPost,
  PopupAddComment,
  Refresher,
  TextParagraph,
} from "../../components";
import { LayoutHeader, LayoutPage } from "../../layout";
import { Ref, onBeforeMount, onMounted, onUnmounted, ref } from "vue";
import { Props as PropsPost, Get as GetPost } from "../../server/models/Posts";
import {
  Props as PropsComment,
  Get as GetComment,
} from "../../server/models/Comments";
import { PawprintsEvent, UserInfo } from "../../utils";
import { IonIcon } from "@ionic/vue";

const Refresh = async (event: any) => {
  await ReloadPost();
  setTimeout(() => event.target.complete(), 500);
};

const route = useRoute();
const params = ref(route.params);
const fid = ref(params.value.fid.toString());

const CommentPopup = () => PawprintsEvent.EventDispatcher("popup-add-comment");

const post: Ref<PropsPost | undefined> = ref();
const comments: Ref<Map<string, PropsComment>> = ref(new Map());

const ReloadPost = async () =>
  GetPost(fid.value).then((value: PropsPost) => {
    post.value = value;
    value.comments.forEach((cid) =>
      GetComment(cid).then((comment) =>
        comments.value.set(comment.cid, comment)
      )
    );
  });

onBeforeMount(() => {
  PawprintsEvent.AddEventListener("reload-post", ReloadPost);
});

onMounted(() => {
  ReloadPost();
});

onUnmounted(() => {
  PawprintsEvent.RemoveEventListener("reload-post", ReloadPost);
});
</script>
<style scoped>
.write-comment {
  color: var(--theme-primary-text);
  > header {
    display: flex;
    align-items: center;
    gap: 10px;

    > ion-icon {
      position: relative;
      transform: rotate(180deg);
      font-size: 20px;
    }

    > .avatar {
      --size: 40px;
    }
  }

  > .button {
    background-color: var(--theme-secondary-background);
    color: var(--theme-secondary-text);
    padding: 6px 10px;
    border-radius: 6px;
    margin-left: 80px;
  }
}
</style>
