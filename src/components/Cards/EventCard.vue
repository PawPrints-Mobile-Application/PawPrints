<template>
    <section class="event-card">
      <header>
        <IonIcon class="icon" :icon="vaccine" />
        <TextSubheading>{{ data?.title }}</TextSubheading>
      </header>
      <TextParagraph>{{ data?.details }}</TextParagraph>
    </section>
  </template>
  <script setup lang="ts">
  import { bandageOutline as vaccine } from "ionicons/icons";
  import { IonIcon } from "@ionic/vue";
  import { TextSubheading, TextParagraph } from "../Texts";
  import { Get, Props } from "../../server/models/Notes";
  import { ref, Ref, onMounted } from "vue";
  
  const props = defineProps({
    event: String,
  });
  
  const data: Ref<Props | undefined> = ref();
  
  onMounted(() => {
    Get(props.event!).then((value: Props) => {
      data.value = value;
      console.log(value);
    });
  });
  </script>
  <style scoped>
  .event-card {
    padding: 10px;
    border-radius: 10px;
    background-color: var(--ion-color-secondary);
  }
  
  header {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  
  .icon {
    font-size: var(--fs2);
  }
  </style>
  