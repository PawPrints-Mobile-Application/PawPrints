<template>
  <section class="home-card">
    <TextHeading class="title">{{ title }}</TextHeading>
    <section class="details">
      <slot name="details"
        ><slot
          ><TextParagraph>{{ details }}</TextParagraph></slot
        ></slot
      >
    </section>
    <ButtonIcon :icon="icon" @click="Redirect" />
  </section>
</template>
<script setup lang="ts">
import { TextHeading, TextParagraph } from "../Texts";
import { ButtonIcon } from "../Buttons";
import { arrowUndo as icon } from "ionicons/icons";
import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();
const Redirect = () => ionRouter.navigate(props.target, "forward", "push");

const props = defineProps({
  title: String,
  details: String,
  target: {
    type: String,
    required: true,
    validator: (value: string) => value.startsWith("/"),
  },
});
</script>
<style scoped>
.home-card {
  width: 100%;
  min-height: 200px;
  outline: 2px solid black;
  border-radius: 20px;
  padding: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;

  background-color: var(--ion-color-secondary);
}

.details {
  margin-left: 10px;
  height: 100%;
  text-align: justify;
  text-indent: 30px;
}

.button-icon {
  min-height: 30px;
  transform: rotate(180deg);
  padding-inline: 0 5px;
  width: 70%;
  align-self: flex-end;
}
</style>
