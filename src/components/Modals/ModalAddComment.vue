<template>
  <LayoutModal
    ref="modal"
    :isOpen="isOpen"
    title="Add a Comment"
    @submit="Submit"
    @discard="Discard"
    :canDismiss="!isOpen"
    justify="flex-start"
  >
    <section class="body">
      <header>
        <Avatar type="user" />
        <TextSubheading>{{ user.username }} </TextSubheading>
      </header>
      <InputTextareaWrapped
        v-model="content"
        label="Comment"
        placeholder="What’s on your mind, hooman?"
      />
    </section>
    <template #footer>
      <ButtonText label="Comment" @click="Submit" :disabled="disabled" />
    </template>
  </LayoutModal>
</template>

<script setup lang="ts">
import { LayoutModal } from "../../layout";
import { ref, computed, PropType } from "vue";
import { Avatar } from "../../components/Avatars";
// import { InputTextareaWrapped } from "../Forms";
import { TextSubheading } from "../Texts";
import { ButtonText } from "../../components/Buttons";
import { Add as AddComment } from "../../server/models/Comments";
import { CustomEvent, GetUID, SeedGenerator, GetUsername } from "../../utils";
import {
  Props as PropsPost,
  Add as EditPost,
} from "../../server/models/Forums";

const user = {
  username: localStorage.getItem("authUsername"),
};

const content = ref("");

const disabled = computed(() => content.value === "");

const Submit = () => {
  const cid = SeedGenerator().toString();
  props.post?.comments.push(cid);
  console.log(GetUsername());
  AddComment({
    cid: cid,
    uid: GetUID()!,
    username: GetUsername()!,
    fid: props.post?.fid!,
    content: content.value,
    DTPost: new Date(),
  })
    .then(() => EditPost(props.post!))
    .then(() => {
      CustomEvent.EventDispatcher("reload-post");
      emit("submit", props.post?.fid!);
      Discard();
    });
};

const Discard = () => {
  emit("discard");
  ClearForm();
};

const ClearForm = () => {
  content.value = "";
};

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  post: Object as PropType<PropsPost>,
});

const emit = defineEmits(["submit", "discard"]);
</script>

<script lang="ts">
export default {
  name: "Forums",
  components: { Avatar },
};
</script>

<style scoped>
.body {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}

header {
  width: 95%;
  display: flex;
  align-items: center;
  gap: 5px;
}
.avatar {
  --size: 40px;
}

.input-textarea-wrapped {
  height: 350px;
}

.button-text {
  width: 100%;
  margin-bottom: 10px;
}
</style>
