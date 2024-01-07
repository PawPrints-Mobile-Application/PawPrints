<template>
  <section class="card card-dog">
    <header>
      <Avatar :value="dog?.breed" type="dog" :color="dog?.color" />
      <aside>
        <div v-for="detail in details">
          <TextParagraph class="bold" :value="detail[0] + ':'" />
          <TextParagraph :value="detail[1]" />
        </div>
      </aside>
    </header>
    <footer>
      <TextSmall v-for="detail in age" :value="detail.toString()" />
    </footer>
  </section>
</template>
<script setup lang="ts">
import { Props } from "../../server/models/Dogs";
import { PropType, ref } from "vue";
import { Avatar, TextParagraph, TextSmall } from "..";
import { LocalDate, Age } from "../../utils";

const props = defineProps({
  dog: Object as PropType<Props>,
});

const details = [
  ["Name", props.dog?.name],
  [
    "Date of Birth",
    new LocalDate(props.dog?.birthday).toLocaleDateString("MM/DD/YYYY", "-"),
  ],
  ["Dog Breed", props.dog?.breed],
];

const computedAge = ref(new Age(props.dog?.birthday!));
const age = [
  "Age:",
  "Year/s: " + computedAge.value.years,
  "Month/s: " + computedAge.value.months,
  "Day/s: " + computedAge.value.days,
];
</script>
<style scoped>
.card-dog {
  width: 100%;
  background-color: var(--theme-secondary-dark-background);
  padding: 10px;
  border-radius: 10px;
  outline: 3px solid var(--theme-primary-text);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  max-width: 80px;
  max-height: 80px;
  outline: 6px double var(--theme-secondary-text);
}

aside {
  display: flex;
  flex-direction: column;
  gap: 3px;

  > div {
    display: flex;
    flex-direction: column;
  }
}

footer {
  display: flex;
  width: 100%;
  justify-content: space-around;

  > .text-small:nth-child(1) {
    font-weight: 700;
  }
}
</style>
