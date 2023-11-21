<template>
  <section class="button-expand" :class="{ expand: expand }" @click="Click">
    <ion-icon id="icon-up" :icon="chevronUp" />
    <ion-icon id="icon-down" :icon="chevronDown" />
  </section>
</template>
<script setup lang="ts">
import { chevronUp, chevronDown } from "ionicons/icons";
import { IonIcon } from "@ionic/vue";

const props = defineProps({
  expand: Boolean,
});

const Click = () => {
  const temp = !props.expand;
  emit("update:expand", temp);
  if (temp) emit("expand");
  else emit("collapse");
};

const emit = defineEmits(["update:expand", "expand", "collapse"]);
</script>
<style scoped>
.button-expand {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30px;
  --translateYUp: -8px;
  --translateYDown: 8px;

  > ion-icon {
    font-size: 35px;
    position: absolute;
    transition: all 100ms ease-out;
  }

  #icon-up {
    transform: translateY(var(--translateYUp));
  }

  #icon-down {
    transform: translateY(var(--translateYDown));
  }
}

.expand {
  --translateYUp: 8px;
  --translateYDown: -8px;
}
</style>
