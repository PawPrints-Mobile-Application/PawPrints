<template>
  <section class="dog-card">
    <header>
      <TextHeading>PawPrints Dog Card</TextHeading>
    </header>
    <section class="content">
      <DogAvatar type="dog" :style="{ backgroundColor: dog?.color }" />
      <aside>
        <div>
          <InputLabel value="Name" />
          <span v-if="!props.dog"><IonSkeletonText /></span>
          <span v-else
            ><TextSubheading>{{ dog?.name }}</TextSubheading></span
          >
        </div>
        <div>
          <InputLabel value="Birthday" />
          <span v-if="!props.dog"><IonSkeletonText /></span>
          <span v-else
            ><TextParagraph
              >{{ dog?.birthday }} ({{ age }} years)</TextParagraph
            ></span
          >
        </div>
      </aside>
    </section>
    <footer>
      <aside>
        <div>
          <InputLabel value="Breed" />
          <span v-if="!props.dog"><IonSkeletonText /></span>
          <span v-else
            ><TextParagraph v-show="!!props.dog">{{
              dog?.breed
            }}</TextParagraph></span
          >
        </div>
        <div>
          <InputLabel value="Fixing" />
          <span v-if="!props.dog"><IonSkeletonText /></span>
          <span v-else
            ><TextParagraph v-show="!!props.dog">{{
              dog?.fixing
            }}</TextParagraph></span
          >
        </div>
      </aside>
      <aside>
        <div>
          <InputLabel value="Likes" />
          <span v-if="!props.dog"><IonSkeletonText /></span>
          <span v-else
            ><TextParagraph v-show="!!props.dog">{{
              dog?.inoutdoor
            }}</TextParagraph></span
          >
        </div>
      </aside>
    </footer>
  </section>
</template>
<script setup lang="ts">
import { Avatar as DogAvatar } from "../Avatars/Pets";
import { TextHeading, TextParagraph, TextSubheading } from "../Texts";
import { InputLabel } from "../Forms";
import { ref, watch } from "vue";
import { Age } from "../../utils";
import { IonSkeletonText } from "@ionic/vue";
const props = defineProps({
  dog: Object,
});

const age = ref(0);
watch(
  () => props.dog,
  () => {
    if (!props.dog) return;
    const _age = new Age(new Date(props.dog.birthday));
    age.value = Number((_age.years + _age.months / 12).toFixed(2));
  }
);
</script>
<style scoped>
.dog-card {
  background-color: var(--ion-color-secondary-shade);
  outline: 3px solid var(--ion-color-black);
  width: 100%;
  min-height: 200px;
  border-radius: 15px;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.content {
  margin-block: 0px 5px;
  display: flex;
  flex-direction: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;

  > aside {
    height: 100%;
  }
}

footer {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.avatar {
  outline: 2px solid var(--ion-color-white);
  --size: 80px;
  min-width: var(--size);
  max-width: var(--size);
  min-height: var(--size);
  max-height: var(--size);
  --image-scale: 100%;
  border-radius: 15px;
  background-color: var(--ion-color-primary);
}

aside {
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  gap: 2px;

  > div {
    flex: 1 0 0;
  }
}

.input-label {
  --font-size: 10px;
}
</style>
