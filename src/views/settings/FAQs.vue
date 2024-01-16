<template>
  <LayoutPage>
    <LayoutHeader returnTarget="/settings" label="FAQS" />
    <section class="faq1">
      <TextSubheading>How do I delete a Dog Profile? </TextSubheading>
      <TextParagraph
        >In the Dogs Tab, select the dog you want to delete. Then click the Edit
        Profile button located at the upper right corner.
      </TextParagraph>
      <section class="screenshots">
        <img :src="dogTab" />
        <img :src="dogTroy" />
      </section>
      <TextParagraph> Click the Delete Dog button </TextParagraph>
        <img :src="deleteDog" />
    </section>
  </LayoutPage>
</template>
<script setup lang="ts">
import { LayoutHeader, LayoutPage } from "../../layout";
import { TextParagraph, TextSubheading } from "../../components";
import { dogTab, dogTroy, deleteDog } from "../../assets";
</script>
<style scoped>
.faq1 {
  background-color: var(--theme-secondary-background);
  color: var(--theme-secondary-text-background);
  padding: 10px 10px;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  gap: 10px;
  border-radius: 10px;
}
.screenshots {
  display: flex;
  height: 30%;
  width: 50%;
  align-items: center;
}
</style>
