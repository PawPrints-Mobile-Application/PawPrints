<template>
  <section class="card card-comment">
    <header>
      <div class="commentContentIcon">
        <IonIcon :icon="commentContentIcon" />
      </div>
      <Avatar type="user" :value="avatar" />
      <aside>
        <TextSmall>
          {{ username }}
        </TextSmall>
        <TextParagraph>
          {{ comment?.DTPost.toLocaleString() }}
        </TextParagraph>
      </aside>
    </header>
    <div class="card-comment-content">
      <TextParagraph>
        {{ comment?.content }}
      </TextParagraph>
    </div>
  </section>
</template>
<script setup lang="ts">
import { Avatar } from "..";
import { arrowUndo as commentContentIcon } from "ionicons/icons";
import { TextParagraph, TextSmall } from "..";
import { IonIcon } from "@ionic/vue";
import { Props as PropsComment } from "../../server/models/Comments";
import { PropType, onMounted, ref } from "vue";
import { GetDocument } from "../../server/firebase";

const props = defineProps({
  comment: Object as PropType<PropsComment>,
});

const username = ref("");
const GetUsername = () =>
  GetDocument(`Users/${props.comment?.uid}/Profile/Information`).then(
    (response) => (username.value = response!.data()!.username)
  );

const avatar = ref("");
const GetAvatar = () =>
  GetDocument(`Users/${props.comment?.uid}/Profile/Information`).then(
    (response) => (avatar.value = response!.data()!.avatar.toString())
  );

onMounted(() => {
  GetUsername();
  GetAvatar();
});
</script>
<style scoped>
.card-comment {
  width: 100%;
  min-height: 60px;
  background-color: var(--theme-secondary-background);
  outline: 2px solid var(--theme-card-highlight-color);
  color: var(--theme-secondary-text);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
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

.tags {
  width: 100%;
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
  transform: rotate(180deg);
}
</style>
