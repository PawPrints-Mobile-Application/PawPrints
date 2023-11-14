<template>
  <PageLayout id="settings-layout">
    <template #pageHeader>
      <section class="header">
        <ButtonBack @click="Redirect" />
        <h2>{{ label }}</h2>
      </section>
    </template>
    <template #pageContent>
      <section class="body">
      <slot />
      </section>
    </template>
  </PageLayout>
</template>
<script setup lang="ts">
import { ButtonBack } from "../components/Buttons";
import { PageLayout } from ".";
import { useIonRouter } from "@ionic/vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  target:  {
    type: String,
    required: true,
  },
});

const ionRouter = useIonRouter();
const Redirect = () => {
  emit("back");
  ionRouter.navigate(props.target, "back", "pop");
};
const emit = defineEmits(['back'])
</script>
<style scoped>
.page-layout {
  --background-color: var(--ion-color-primary);
}

.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 10px;

  > h2 {
    margin: 0;
    flex: 1 0 0;
    font-weight: 700;
    font-family: Rubik;
    font-size: var(--fs1);
  }
}

.body {
  padding-top: 10px;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
}
</style>
