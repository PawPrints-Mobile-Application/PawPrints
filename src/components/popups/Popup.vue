<template>
  <section class="popup" v-show="!!state">
    <IonModal :isOpen="!!state" :canDismiss="!state" :showBackdrop="false">
      <div class="wrapper">
        <ion-backdrop
          :visible="true"
          stopPropagation
          tappable
          @ionBackdropTap="StateToggler('hide')"
        />
        <div class="content">
          <slot name="content" :Hide="() => StateToggler('hide')"
            ><slot :Hide="() => StateToggler('hide')"
          /></slot>
        </div>
      </div>
    </IonModal>
  </section>
</template>
<script setup lang="ts">
import { IonModal, IonBackdrop } from "@ionic/vue";
import { onMounted, onUnmounted, ref } from "vue";
import { PawprintsEvent } from "../../utils";
const props = defineProps({
  default: Boolean,
  trigger: {
    type: String,
    required: true,
  },
});

const state = ref(!!props.default);

const StateToggler = (value: string) => {
  switch (value) {
    case "show":
      state.value = true;
      break;
    case "hide":
      state.value = false;
      break;
    default:
      state.value = !state.value;
  }
};

onMounted(() => {
  PawprintsEvent.AddEventListener(props.trigger, StateToggler);
});

onUnmounted(() => {
  PawprintsEvent.RemoveEventListener(props.trigger, StateToggler);
});

const emit = defineEmits(["dismiss", "present"]);
</script>
<style scoped>
.popup {
  position: absolute;
  --outline: 2px solid var(--theme-black);
  --border-radius: 6px;
  --background-color: var(--theme-primary-background);
}

ion-modal::part(content) {
  outline: var(--outline);
  border-radius: var(--border-radius);
  background-color: var(--background-color);
}

ion-backdrop {
  background: var(--theme-black);
  opacity: 0.7;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.content {
  z-index: 2;
  width: auto;
  height: auto;
}
</style>
