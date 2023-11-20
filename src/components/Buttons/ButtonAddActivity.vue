<template>
  <ButtonRippled class="button-add-activity">
    <section>
      <div v-for="i in 2" :key="i" />
    </section>
    <TextHeading>Add Activity</TextHeading>
  </ButtonRippled>
</template>
<script setup lang="ts">
import { ButtonRippled } from ".";
import { TextHeading } from "../Texts";
</script>
<style scoped>
.button-rippled {
  width: 100%;
}

section {
  --size: 45px;
  width: var(--size);
  height: var(--size);
  background-color: var(--ion-color-tertiary);
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
}

div {
  --line-size: calc(var(--size) * 0.7);
  position: absolute;
  width: var(--line-size);
  height: 4px;
  background-color: var(--ion-color-primary);
  border-radius: 30px;
}

div:nth-child(2) {
  transform: rotateZ(90deg);
}
</style>
