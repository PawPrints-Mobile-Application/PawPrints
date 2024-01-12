<template>
  <IonModal
    class="modal"
    @didDismiss="emit('dismiss')"
    @didPresent="emit('present')"
    :isOpen="!!state"
    :canDismiss="!state"
  >
    <IonContent>
      <main>
        <header>
          <ButtonBack @click="() => (state = false)" :disabled="disableBack" />
          <section>
            <slot name="header" />
          </section>
        </header>
        <footer>
          <slot name="content"><slot /></slot>
        </footer>
      </main>
    </IonContent>
  </IonModal>
</template>

<script setup lang="ts">
import { IonModal, IonContent } from "@ionic/vue";
import { onMounted, onUnmounted, ref } from "vue";
import { PawprintsEvent } from "../../utils";
import { ButtonBack } from "..";

const props = defineProps({
  default: Boolean,
  trigger: {
    type: String,
    required: true,
  },
  disableBack: Boolean,
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
.modal {
  --justify-content: flex-start;
  --align-items: center;
}

main {
  width: 100%;
  height: 100%;
  padding-inline: 10px;
  background-color: var(--theme-primary-background);
}

header {
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;

  > .button-back {
    position: absolute;
  }

  > section {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

footer {
  width: 100%;
  min-height: min-content;
  display: flex;
  flex-direction: column;
  justify-content: var(--justify-content);
  align-items: var(--align-items);
  gap: var(--gap);
}
</style>
