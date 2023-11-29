<template>
  <LayoutPage
    justify="flex-start"
    @on-scroll-top="() => (state.hideCard = false)"
    @off-scroll-top="() => (state.hideCard = true)"
  >
    <template #header>
      <TextHeading class="title"> FORUMS </TextHeading>
    </template>
    <InputSegment
      class="forums-segment"
      :options="viewSegments"
      v-model="state.viewSegment"
      show="label"
    />
    <section class="add-post-wrapper">
      <Avatar type="user" />
      <ButtonText
        class="add-post"
        label="Write something..."
        @click="() => (modalOpen = true)"
      />
    </section>
    <section class="post-wrapper">
      <CardPost v-for="post in posts" :post="post" />
    </section>
    <ModalAddPost :isOpen="modalOpen" @discard="() => (modalOpen = false)" />
  </LayoutPage>
</template>

<script lang="ts" setup>
import { LayoutPage } from "../layout";
import { TextHeading } from "../components/Texts";
import { InputSegment } from "../components/Forms";
import { SegmentOption } from "../utils";
import { reactive, ref } from "vue";
import { ButtonText } from "../components/Buttons";
import { ModalAddPost } from "../components/Modals";
import { Avatar } from "../components/Avatars";
import { CardPost } from "../components/Cards";

const modalOpen = ref(false);

const posts = [
  {
    fid: 1111111,
    uid: "123",
    content: "hello",
    date: new Date(),
    tags: ["new", "post", "new", "post"],
    comments: [1, 2],
    likes: [1, 8, 9],
  },

  {
    fid: 11525,
    uid: "1230",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis justo sollicitudin, varius dui at, tincidunt erat. Quisque et erat sit amet mauris scelerisque scelerisque. Ut at mi non dolor imperdiet porttitor.",
    date: new Date(2023, 11, 27),
    tags: ["newsss", "postssss"],
    comments: [1, 12],
    likes: [1, 8, 1],
  },
];

const viewSegments = [
  new SegmentOption("Public Feed"),
  new SegmentOption("My Posts"),
];

const state = reactive({
  hideCard: false,
  viewSegment: viewSegments[0],
});
</script>

<script lang="ts">
export default {
  name: "Forums",
  components: { Avatar },
};
</script>

<style scoped>
.add-post-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
}
.avatar {
  --size: 40px;
}
.add-post {
  background-color: var(--theme-secondary-dark);
  flex: 1 0 0;
}
.input-segment {
  --flex: 1 0 0;
}

.post-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
