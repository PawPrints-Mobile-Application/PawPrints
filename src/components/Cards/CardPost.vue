<template>
  <section class="card card-post">
    <header>
      <Avatar type="user" />
      <aside>
        <TextSubheading>
          {{ post!.uid }}
        </TextSubheading>
        <TextSubheading>
          {{ post!.date.toLocaleString() }}
        </TextSubheading>
      </aside>
    </header>
    <div class="content">
      {{ post!.content }} 
    </div>
    <div class="tags">
      <IonChip v-for="tag in post!.tags">
        # {{ tag }}
      </IonChip>
    </div>
    <footer>
      <div class="button-interaction">
        <IonIcon :icon="commentIcon"/>
        <TextParagraph>
          {{ post!.comments.length }} 
        </TextParagraph>
      </div>
      <div class="button-interaction">
        <IonIcon :icon="likeIcon"/>
        <TextParagraph>
          {{ post!.likes.length }} 
        </TextParagraph>
      </div>
    </footer>
  </section>
</template>
<script setup lang="ts">
import { Avatar } from "../Avatars";
import { TextSubheading, TextParagraph } from "../Texts";
import { IonIcon, IonChip } from "@ionic/vue";
import { chatbubbleEllipses as commentIcon, heartCircle as likeIcon } from "ionicons/icons";

defineProps({
  post: Object,
});
</script>
<style scoped>
.card-post {
  width: 100%;
  min-height: 60px;
  background-color: var(--theme-secondary);
  outline: 2px solid var(--theme-black);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  gap: 5px;
}

header{
  display: flex;
  align-items: center;
  gap: 5px;
}

.avatar {
  --size: 40px;
}

.tags{
  width: 100%;
}

ion-chip {
    --background: var(--theme-quadratic);
    --color: var(--theme-primary);
    font-size: var(--fs4);
    height: 25px;
}

footer{
  display: flex;
  align-items: center;
  gap: 20px;
}
.button-interaction{
  display: flex;
  align-items: center;
  gap: 5px;
}

ion-icon{
  font-size: 20px;
}
</style>
