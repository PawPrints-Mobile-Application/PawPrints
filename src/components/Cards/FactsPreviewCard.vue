<template>
  <section class="facts-preview-card text font-rubik text-paragraph">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum.
    </p>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.facts-preview-card {
  width: 90%;
  min-height: 90px;
  background-color: var(--ion-color-secondary);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;

  text-align: justify;
  padding: 10px;

  > p {
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-height: fit-content;
  }
}
</style>
