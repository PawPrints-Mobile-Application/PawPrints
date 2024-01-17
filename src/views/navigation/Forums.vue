<template>
  <LayoutPage>
    <LayoutHeader label="FORUMS" />
    <main>
      <InputSegment :options="options" v-model="segment" show="label" />
      <section class="write-post">
        <Avatar type="user" />
        <div class="button font poppins small" @click="AddPost">
          Write Something...
        </div>
      </section>
    </main>
    <PopupAddPost />
  </LayoutPage>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Avatar, InputSegment, PopupAddPost } from "../../components";
import { LayoutHeader, LayoutPage } from "../../layout";
import { PawprintsEvent, SegmentOption } from "../../utils";

const options = [
  new SegmentOption("Public Feed"),
  new SegmentOption("My Posts"),
];
const segment = ref(options[0]);

const AddPost = () => PawprintsEvent.EventDispatcher("popup-add-post");
</script>
<style scoped>
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
  height: 60px;
}

.input-segment {
  --flex: 1 0 0;
}
</style>
