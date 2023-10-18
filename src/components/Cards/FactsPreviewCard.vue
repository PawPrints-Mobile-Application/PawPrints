<template>
  <section class="facts-preview-card">
    <h3 class="facts-preview-card-title">Why do dogs have wet noses?</h3>
    <p class="facts-preview-card-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </section>
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default {
  name: "FactsPreviewCard",
  props: ["title", "info"],
};
</script>
<style scoped>
.facts-preview-card {
  width: 100%;
  background-color: var(--ion-color-secondary-tint);
  border-radius: 15px;
  padding: 15px 10px;
  display: flex;
  max-height: 150px;
  flex-flow: column nowrap;

  text-align: justify;
  font-family: Rubik;
}

.facts-preview-card-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 10px;
}

.facts-preview-card-info {
  font-size: 14px;
  font-weight: 400;
  margin: 0 10px;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: fit-content;
}
</style>
