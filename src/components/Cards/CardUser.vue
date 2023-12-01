<template>
  <section class="card card-user">
    <header>
      <Avatar type="user" />
      <aside>
        <TextCard label="Username:" :value="user.username" />
        <TextCard label="Subscription:" :value="user.subscription" />
      </aside>
    </header>
    <!-- <TextCard :value="user.email" /> -->
    <footer>
      <TextSmall class="text bold">Forums:</TextSmall>
      <TextSmall>Post/s: {{ 0 }}</TextSmall>
      <TextSmall>Upvotes/s: {{ 0 }}</TextSmall>
      <TextSmall>Paws/s: {{ 0 }}</TextSmall>
    </footer>
  </section>
</template>
<script setup lang="ts">
import { Avatar } from "../Avatars";
import { TextCard, TextSmall } from "../Texts";
import { reactive, onMounted } from "vue";
import { CustomEvent } from "../../utils";

const user = reactive({
  username: localStorage.getItem("authUsername")!,
  email: localStorage.getItem("authEmail")!,
  subscription: localStorage.getItem("authType")!,
});

onMounted(() => {
  CustomEvent.EventListener(
    "reload-card-user",
    () => (user.username = localStorage.getItem("authUsername")!)
  );
});
</script>
<style scoped>
.card-user {
  background-color: var(--theme-secondary-background);
  outline: 3px solid var(--theme-secondary-text);
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

header {
  margin-block: 0px 5px;
  display: flex;
  flex-direction: row wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

.avatar {
  outline: 2px solid var(--theme-primary-background);
  background-color: var(--theme-primary-background);
  --size: 70px;
}

aside {
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70px;

  > div {
    flex: 1 0 0;
  }
}

footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
