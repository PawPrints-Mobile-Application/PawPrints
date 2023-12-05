<template>
  <LayoutPage class="layout-settings" justify="flex-start">
    <template #header>
      <header>
        <ButtonBack @click="Redirect" />
        <TextHeading>{{ label }}</TextHeading>
      </header>
    </template>
    <slot />
  </LayoutPage>
</template>
<script setup lang="ts">
import { ButtonBack } from "../components/Buttons";
import { LayoutPage } from ".";
import { useIonRouter } from "@ionic/vue";
import { TextHeading } from "../components/Texts";

defineProps({
  label: {
    type: String,
    required: true,
  },
});

const ionRouter = useIonRouter();
const Redirect = () => {
  emit("back");
  ionRouter.navigate("/settings", 'forward', 'replace');
};
const emit = defineEmits(["back"]);
</script>
<style scoped>
header {
  min-height: 50px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  transition: all 200ms ease-out;
}

.button-back {
  max-width: 40px;
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
