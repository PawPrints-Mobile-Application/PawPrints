<template>
  <section class="card card-post" @click="Navigate" v-show="!!props.post">
    <header>
      <Avatar type="user" :value="avatar" />
      <aside>
        <TextSubheading>
          {{ username }}
        </TextSubheading>
        <TextSmall>
          {{ post?.DTPost.toLocaleString() }}
        </TextSmall>
      </aside>
    </header>
    <div class="content">
      {{ post?.content }}
    </div>
    <footer>
      <div class="button-interaction">
        <IonIcon :icon="commentIcon" />
        <TextParagraph>
          {{ post?.comments.length }}
        </TextParagraph>
      </div>
      <div class="button-interaction">
        <IonIcon :icon="likeIcon" />
        <TextParagraph>
          {{ post?.likes.length }}
        </TextParagraph>
      </div>
    </footer>
  </section>
</template>
<script setup lang="ts">
import { Avatar } from "..";
import { TextSubheading, TextParagraph, TextSmall } from "..";
import { IonIcon } from "@ionic/vue";
import {
  chatbubbleEllipses as commentIcon,
  heartCircle as likeIcon,
} from "ionicons/icons";
import { useIonRouter } from "@ionic/vue";
import { Props as PropsPost } from "../../server/models/Posts";
import { PropType, onMounted, ref, watch } from "vue";
import { GetDocument } from "../../server/firebase";
const ionRouter = useIonRouter();
const Navigate = () => ionRouter.navigate(`/forums/${props.post?.fid}`);

const props = defineProps({
  post: Object as PropType<PropsPost>,
});

watch(
  () => props.post,
  () => {
    GetUsername();
    GetAvatar();
  }
);

const username = ref("");
const GetUsername = () =>
  GetDocument(`Users/${props.post?.uid}/Profile/Information`).then(
    (response) => (username.value = response!.data()!.username)
  );

const avatar = ref("");
const GetAvatar = () =>
  GetDocument(`Users/${props.post?.uid}/Profile/Information`).then(
    (response) => (avatar.value = response!.data()!.avatar.toString())
  );

onMounted(() => {
  if (!props.post) return;
  GetUsername();
  GetAvatar();
});
</script>
<style scoped>
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

header {
  display: flex;
  align-items: center;
  gap: 5px;
}

.avatar {
  --size: 40px;
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
</style>
