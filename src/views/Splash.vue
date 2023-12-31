<template>
  <section class="splash">
    <Avatar :class="{ show: state.logo }" />
  </section>
</template>
<script setup lang="ts">
import { Avatar } from "../components";
import { onMounted, reactive } from "vue";

const state = reactive({
  logo: false,
});

onMounted(() => {
  setTimeout(() => {
    state.logo = true;
  }, 1000);
});
</script>
<style scoped>
.splash {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.avatar {
    opacity: 1;
    --size: 0;
    transition: width 200ms ease-in, height 300ms ease-out;

    &.show {
        width: 200px;
        height: 200px;
    }
}
</style>

<style>
:root {
  background-color: var(--theme-tertiary-background);
}
</style>
