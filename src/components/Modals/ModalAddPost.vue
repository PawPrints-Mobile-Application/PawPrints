<template>
  <LayoutModal
    ref="modal"
    :isOpen="isOpen"
    title="Add a Post"
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
        v-model="form.description"
        label="Description"
        placeholder="What’s on your mind, hooman?"
      />
      <InputDynamicWrapped v-model="tags" label="Tags" hide-validator />
      <section class="tags" v-show="form.tags.length > 0">
        <IonChip v-for="(tag, key) in form.tags">
          <TextParagraph> #{{ tag }} </TextParagraph>
          <IonIcon :icon="closeIcon" @click="RemoveTag(key)" />
        </IonChip>
      </section>
    </section>
    <template #footer>
      <ButtonText label="Post" @click="Submit" :disabled="disabled" />
    </template>
  </LayoutModal>
</template>

<script setup lang="ts">
import { LayoutModal } from "../../layout";
import { reactive, computed, ref } from "vue";
import { Avatar } from "../../components/Avatars";
import { InputTextareaWrapped, InputDynamicWrapped } from "../Forms";
import { TextSubheading, TextParagraph } from "../Texts";
import { ButtonText } from "../../components/Buttons";
import { IonIcon, IonChip } from "@ionic/vue";
import { closeCircle as closeIcon } from "ionicons/icons";
import { Add } from "../../server/models/Forums";
import { CustomEvent, GetUID, SeedGenerator, GetUsername } from "../../utils";

const user = {
  username: localStorage.getItem("authUsername"),
};

const _tags = ref("");
const tags = computed({
  get() {
    return _tags.value;
  },
  set(value: string) {
    if (value[value.length - 1] === " " && value.trim() !== "") {
      form.tags.push(value.trim());
      _tags.value = "";
    } else {
      _tags.value = value.trim();
    }
  },
});

const form = reactive({
  description: "",
  tags: new Array<string>(),
});

const disabled = computed(() => form.description === "");

const RemoveTag = (key: number) => {
  form.tags.splice(key, 1);
};

const Submit = () => {
  const fid = SeedGenerator().toString();
  Add({
    fid: fid,
    uid: GetUID()!,
    username: GetUsername()!,
    content: form.description,
    DTPost: new Date(),
    tags: form.tags,
    comments: [],
    likes: [],
  }).then(() => {
    CustomEvent.EventDispatcher("reload-forums");
    emit("submit", fid);
    Discard();
  });
};

const Discard = () => {
  emit("discard");
  ClearForm();
};

const ClearForm = () => {
  form.description = "";
  form.tags = new Array<string>();
  _tags.value = "";
};

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
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
  height: 250px;
}
ion-chip {
  margin: 2px;
}
.button-text {
  width: 100%;
  margin-bottom: 10px;
}
</style>
