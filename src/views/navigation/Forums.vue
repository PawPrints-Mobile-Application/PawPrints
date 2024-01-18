<template>
  <LayoutPage>
    <LayoutHeader label="FORUMS" />
    <main
      v-if="
        UserInfo.GetSubscription().toLowerCase() !==
        Enums.Subscription.guest.toLowerCase()
      "
    >
      <Refresher @refresh="Refresh" />
      <section class="write-post">
        <Avatar type="user" :value="UserInfo.GetAvatar().toString()" />
        <div class="button font poppins small" @click="PostPopup">
          Write Something...
        </div>
      </section>
      <section class="posts">
        <CardPost v-for="post of Array.from(posts.values())" :post="post" />
      </section>
    </main>
    <article v-else>
      <Avatar />
      <TextTitle value="You Have discovered a Verified content!" />
    </article>
    <PopupAddPost />
  </LayoutPage>
</template>
<script setup lang="ts">
import { Ref, onBeforeMount, onMounted, onUnmounted, ref } from "vue";
import {
  Avatar,
  PopupAddPost,
  CardPost,
  Refresher,
  TextTitle,
} from "../../components";
import { LayoutHeader, LayoutPage } from "../../layout";
import { PawprintsEvent, UserInfo } from "../../utils";
import {
  GetAll as GetPosts,
  Props as PropsPost,
} from "../../server/models/Posts";
import { Enums } from "../../server/models/Information";

const Refresh = async (event: any) => {
  await ReloadForums();
  setTimeout(() => event.target.complete(), 500);
};

const PostPopup = () => PawprintsEvent.EventDispatcher("popup-add-post");

const posts: Ref<Map<string, PropsPost>> = ref(new Map());

const Get = () => {
  if (
    UserInfo.GetSubscription().toLowerCase() ===
    Enums.Subscription.guest.toLowerCase()
  )
    return;
  return GetPosts().then((propsPosts) =>
    propsPosts.forEach((post) => posts.value.set(post.fid, post))
  );
};

const ReloadForums = async () => {
  const temp = await GetPosts();
  temp.map((post) => posts.value.set(post.fid, post));
};

onBeforeMount(() => {
  PawprintsEvent.AddEventListener("reload-forums", ReloadForums);
});

onMounted(() => {
  Get();
});

onUnmounted(() => {
  PawprintsEvent.RemoveEventListener("reload-forums", ReloadForums);
});
</script>
<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.write-post {
  width: 100%;
  display: flex;
  gap: 3px;
  justify-content: center;
  align-items: center;

  > .button {
    background-color: var(--theme-secondary-dark-background);
    color: var(--theme-secondary-dark-text);
    display: flex;
    padding: 5px 10px;
    border-radius: 10px;
    height: min-content;
    flex: 1 0 0;
    margin-right: 10px;
  }
}

.avatar {
  height: 40px;
}

.input-segment {
  --flex: 1 0 0;
}

article {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 90%;
  > .avatar {
    height: 200px;
  }

  > .text-title {
    text-align: center;
  }
}
</style>
