<template>
  <header class="layout layout-header">
    <ButtonBack v-show="!!returnTarget" @click="Navigate" />
    <section>
      <slot><TextHeading v-show="!!label" :value="label" /></slot>
    </section>
  </header>
</template>
<script setup lang="ts">
import { useIonRouter } from "@ionic/vue";
import { ButtonBack, TextHeading } from "../components";
const ionRouter = useIonRouter();
const Navigate = () =>
  ionRouter.navigate(props.returnTarget, "forward", "replace");

const props = defineProps({
  returnTarget: String,
  label: String,
});
</script>
<style scoped>
.layout-header {
  --background: var(--theme-primary-background);
  --color: var(--theme-primary-color);
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  padding-block: 10px 6px;
  background-color: var(--background);
  color: var(--color);
}

.button-back {
  background-color: var(--background);
  position: absolute;
}

section {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-heading {
  font-weight: bold;
  color: var(--color);
}
</style>
