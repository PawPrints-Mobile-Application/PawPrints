<template>
  <section class="toast-small">
    <aside>
      <IonIcon
        :icon="icon"
        :style="{ color: `var(--theme-${type}-background)` }"
        @click="emit('click')"
      />
    </aside>
    <div @click="emit('click')">
      <TextSubheading :value="title" />
      <TextParagraph :value="content" />
    </div>
    <IonIcon :icon="close" v-show="!hideIcon" @click="emit('close')" />
  </section>
</template>
<script setup lang="ts">
import { TextParagraph, TextSubheading } from "../components";
import { IonIcon } from "@ionic/vue";
import { close, alertCircle as danger, paw as success } from "ionicons/icons";
import { ref } from "vue";

const GetIcon = () => {
  if (["warning", "danger"].includes(props.type)) return danger;
  return success;
};
const icon = ref(GetIcon());

const props = defineProps({
  type: {
    type: String,
    default: "danger",
    validator: (value: string) =>
      ["success", "warning", "danger"].includes(value),
  },
  title: {
    type: String,
    default: "Oh no!",
  },
  content: {
    type: String,
    default: "Something happened!",
  },
  hideIcon: Boolean,
});

const emit = defineEmits(["click", "close"]);
</script>
<style scoped>
.toast-small {
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: var(--theme-secondary-dark-background);
  border-radius: 8px;
  padding: 6px;
  gap: 5px;

  > div {
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
  }
}
</style>
