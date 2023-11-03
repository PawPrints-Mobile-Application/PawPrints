<template>
  <section class="profile-card">
    <img :src="profilePicture" />
    <h1>{{ username }}</h1>
    <h2>{{ email }}</h2>
  </section>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { personCircleOutline } from "ionicons/icons";
const profilePicture = ref(personCircleOutline);
const username = localStorage.getItem("authUsername");
const email = localStorage.getItem("authEmail");
</script>
<style scoped>
.profile-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    width: 100px;
    aspect-ratio: 1;
  }

  > h1,
  h2 {
    margin: 0;
    font-family: Poppins;
    font-size: var(--fs3);
  }

  > h1 {
    font-size: var(--fs1);
    font-weight: 700;
  }
}
</style>
