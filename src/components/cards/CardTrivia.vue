<template>
  <section class="card card-trivia font small poppins">
    <article class="trivia">{{ trivia }}</article>
    <article class="redirect">
      <span>Want to share or ask something?</span>
      <ButtonNext @click="Navigate" />
    </article>
  </section>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ButtonNext } from "..";
import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();

const Navigate = () => ionRouter.navigate("/forums", "forward", "replace");

const trivias = ["Lorem ipsum dolor sit amet, consectetur adipis"];

const trivia = ref(trivias[0]);
</script>
<style scoped>
.card-trivia {
  width: 100%;
  display: flex;
  gap: 20px;
}

article {
  background-color: var(--theme-quadratic-background);
  min-height: 120px;
  flex: 1 0 0;
  border-radius: 15px;
  color: var(--theme-quadratic-text);
  padding: 10px;
  text-align: justify;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.redirect {
  justify-content: space-around;
}

.button-next {
  background-color: var(--theme-tertiary-background);
  color: var(--theme-quadratic-background);
  margin: 0;
  align-self: flex-end;
  height: 30px;
  width: 30px;
}
</style>
