<template>
  <LayoutPage id="fact-page" justify="flex-start">
    <template #pageHeader>
      <h2 id="label">Doin' me educate</h2>
    </template>
    <template #pageContent>
      <main class="facts-content">
        <!-- <component :is="pageContent" /> -->
      </main>
    </template>
  </LayoutPage>
</template>

<script lang="ts" setup>
import { LayoutPage } from "../layout";
</script>

<script lang="ts">
export default {
  name: "Forums",
};
</script>

<style scoped>
.facts-content {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

#label {
  font-family: Poppins;
  font-weight: 700;
  font-size: var(--fs4);
  margin: 0;
}
</style>

<style>
.facts-content > * {
  width: 100%;
  text-align: justify;
  text-justify: inter-word;
}

.facts-title {
  font-weight: 700;
  font-size: var(--fs2);
  align-self: flex-start;
  margin: 0 0 3px;
}

.facts-text {
  font-size: var(--fs1);
  align-self: flex-start;
  text-align: justify;
  text-justify: inter-word;
  margin: 0;
  line-height: 17px;
}

.facts-image {
  background-color: var(--theme-grey);
  border-radius: 10px;
  width: 98%;
  max-width: 98%;
  min-height: 150px;
}
</style>
