<template>
  <section class="text-card">
    <TextSmall v-show="!!label">{{ label }}</TextSmall>
    <IonSkeletonText v-if="!value" />
    <TextParagraph v-else>{{ value }}</TextParagraph>
  </section>
</template>
<script setup lang="ts">
import { IonSkeletonText } from "@ionic/vue";
import { TextParagraph, TextSmall } from ".";
defineProps({
  label: String,
  value: String,
});
</script>
<style scoped>
.text-card {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.text-small {
  font-weight: 700;
}

.text-subheading {
  font-weight: 400;
}
</style>
