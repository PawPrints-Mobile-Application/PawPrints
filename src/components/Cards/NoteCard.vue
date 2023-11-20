<template>
  <section class="note-card">
    <TextSubheading>{{ data?.title }}</TextSubheading>
    <TextParagraph>{{ data?.details }}</TextParagraph>
  </section>
</template>
<script setup lang="ts">
import { TextSubheading, TextParagraph } from "../Texts";
import { Get, Props } from "../../server/models/Notes";
import { ref, Ref, onMounted } from "vue";

const props = defineProps({
  note: String,
});

const data: Ref<Props | undefined> = ref();

onMounted(() => {
  Get(props.note!).then((value: Props) => {
    data.value = value;
    console.log(value);
  });
});
</script>
<style scoped>
.note-card {
  padding: 10px;
  border-radius: 10px;
  background-color: var(--ion-color-secondary);
}

.text-subheading {
  width: 100%;
  border-bottom: 2px solid rgba(0, 0, 0, 0.26);
  margin-bottom: 5px;
}

.text-paragraph {
  text-align: justify;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  max-height: fit-content;
  overflow: hidden;
  margin-left: 10px;
}
</style>
