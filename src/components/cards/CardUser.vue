<template>
  <section class="card card-user">
    <header>
      <Avatar :value="user.avatar.toString()" type="user" />
      <aside>
        <div v-for="detail in details">
          <TextParagraph class="bold" :value="detail[0] + ':'" />
          <TextSmall :value="detail[1].toString()" />
        </div>
      </aside>
    </header>
    <footer>
      <!-- <TextSmall v-for="detail in forum" :value="detail.toString()" /> -->
    </footer>
  </section>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";
import { Avatar, TextParagraph, TextSmall } from "..";
import { UserInfo } from "../../utils";

const user = reactive({
  avatar: 2,
  color: "#FFD80A",
  name: "",
  email: "",
  subscription: "",
  posts: 0,
  upvotes: 0,
  paws: 0,
});

const details = computed(() => [
  ["Name", user.name],
  ["Email", user.email],
  ["Subscription", user.subscription],
]);

// const forum = [
//   "Age:",
//   "Post/s: " + user.posts,
//   "Upvote/s: " + user.upvotes,
//   "Paw/s: " + user.paws,
// ];

onMounted(() => {
  user.name = UserInfo.GetUsername();
  user.email = UserInfo.GetEmail();
  user.subscription = UserInfo.GetSubscription();
  user.avatar = UserInfo.GetAvatar();
});
</script>
<style scoped>
.card-user {
  width: 100%;
  background-color: var(--theme-secondary-dark-background);
  padding: 10px;
  border-radius: 10px;
  outline: 3px solid var(--theme-primary-text);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  max-width: 80px;
  max-height: 80px;
  outline: 6px double var(--theme-secondary-text);
}

aside {
  display: flex;
  flex-direction: column;
  gap: 3px;

  > div {
    display: flex;
    flex-direction: column;
  }
}

footer {
  display: flex;
  width: 100%;
  justify-content: space-around;

  > .text-small:nth-child(1) {
    font-weight: 700;
  }
}

.text-small,
.text-paragraph {
  color: var(--theme-secondary-text);
}
</style>
