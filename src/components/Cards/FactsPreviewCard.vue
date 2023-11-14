<template>
  <section class="facts-preview-card">
    <TextParagraph>
      <slot>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </slot>
    </TextParagraph>
  </section>
</template>

<script setup lang="ts">
import { TextParagraph } from "../Texts";
</script>

<style scoped>
.facts-preview-card {
  width: 100%;
  min-height: 70px;
  background-color: var(--ion-color-secondary);
  border-radius: 5px;
  padding: 10px;

  > .text-paragraph {
    text-align: justify;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    max-height: fit-content;
    overflow: hidden;
  }
}
</style>
