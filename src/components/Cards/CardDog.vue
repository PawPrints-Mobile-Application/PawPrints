<template>
  <section class="card card-dog">
    <header>
      <Avatar
        type="dog"
        :src="dog?.breed"
        :style="{
          backgroundColor: !!dog
            ? dog?.color
            : 'var(--theme-tertiary-background)',
        }"
        lazy-load
      />
      <aside>
        <TextCard label="Name:" :value="dog?.name" />
        <TextCard label="Date of Birth:" :value="dog?.birthday" />
        <TextCard label="Dog Breed:" :value="dog?.breed" />
      </aside>
    </header>
    <footer>
      <TextSmall class="text bold">Age:</TextSmall>
      <TextSmall>Year/s: {{ !dog ? 0 : age.years }}</TextSmall>
      <TextSmall>Month/s: {{ !dog ? 0 : age.months }}</TextSmall>
      <TextSmall>Day/s: {{ !dog ? 0 : age.days }}</TextSmall>
    </footer>
  </section>
</template>
<script setup lang="ts">
import { Avatar } from "../Avatars";
import { TextCard, TextSmall } from "../Texts";
import { ref, Ref } from "vue";
import { Age } from "../../utils";
const props = defineProps({
  dog: Object,
});

const age: Ref<Age> = ref(new Age(new Date(props.dog?.birthday)));
</script>
<style scoped>
.card-dog {
  background-color: var(--theme-secondary-background);
  outline: 3px solid var(--theme-card-highlight-color);
  color: var(--theme-secondary-text);
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

header {
  margin-block: 0px 5px;
  display: flex;
  flex-direction: row wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  min-height: 105px;
}

.avatar {
  outline: 2px solid var(--theme-primary-background);
  --size: 80px;
}

aside {
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  gap: 3px;

  > div {
    flex: 1 0 0;
  }
}

footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
