<template>
  <ion-page class="layout-modal">
    <LayoutWrapper :noDefaultMargin="noDefaultMargin">
      <template #header>
        <section class="header" :data-design="design">
          <section class="header-inner">
            <ButtonBack
              type="icon"
              v-show="design === 0 && !hideBack"
              :disabled="disableBack"
              @click="() => console.log(true)"
            />
            <slot name="header">
              <TextHeading>{{ title }}</TextHeading>
            </slot>
          </section>
          <PageCounter
            v-show="design === 1"
            :maxPages="maxPages"
            :currentPage="currentPage"
            design="stretched"
          />
        </section>
      </template>
      <template #content>
        <slot name="content"><slot /></slot>
      </template>
      <template #footer>
        <slot name="footer">
          <section class="footer" v-show="design === 0">
            <ButtonClear
              :type="buttonType"
              v-show="!hideClear && (!hideOnDisable || !disableClear)"
              :disabled="disableClear"
              @click="emit('clear')"
              state="danger"
            />
            <ButtonSubmit
              :type="buttonType"
              v-show="!hideSubmit && (!hideOnDisable || !disableSubmit)"
              :disabled="disableSubmit"
              @click="emit('submit')"
              state="success"
            />
          </section>
          <section class="footer" v-show="design === 1">
            <ButtonBack
              :type="buttonType"
              v-show="!hideClear && (!hideOnDisable || !disableClear)"
              :disabled="disableClear"
              @click="emit('clear')"
              :state="currentPage === 1 ? 'danger' : 'normal'"
            />
            <ButtonNext
              :type="buttonType"
              v-show="!hideSubmit && (!hideOnDisable || !disableSubmit)"
              :disabled="disableSubmit"
              @click="emit('submit')"
              :state="currentPage === maxPages ? 'success' : 'normal'"
            />
          </section>
        </slot>
      </template>
    </LayoutWrapper>
  </ion-page>
</template>
<script setup lang="ts">
import { IonPage } from "@ionic/vue";
import { LayoutWrapper } from ".";
import { ref } from "vue";
import {
  ButtonBack,
  ButtonClear,
  ButtonNext,
  ButtonSubmit,
} from "../components/Buttons";
import { TextHeading } from "../components/Texts";
import { PageCounter } from "../components/Others";

const props = defineProps({
  // Inherited from LayoutWrapper
  noDefaultMargin: Boolean,

  // Important Props
  title: String,
  maxPages: {
    type: Number,
    default: 1,
    validator: (value: number) => value > 0,
  },
  currentPage: {
    type: Number,
    default: 1,
    validator: (value: number) => value > 0,
  },

  // Optional Props
  buttonType: {
    type: String,
    default: "text",
    validator: (value: string) => ["text", "icon"].includes(value),
  },

  hideBack: Boolean,
  disableBack: Boolean,

  hideOnDisable: Boolean,
  hideClear: Boolean,
  disableClear: Boolean,
  hideSubmit: Boolean,
  disableSubmit: Boolean,
});

const design = ref(props.maxPages === 1 ? 0 : 1);

const emit = defineEmits(["clear", "submit"]);
</script>
<style scoped>
.layout-modal {
  --background-color: var(--background-color-primary);
  --default-margin: 20px;
  height: 100%;
  width: 100%;
}

.header {
  height: 60px;
  width: 100%;
  padding-block: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .header-inner {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;

    > .button-back {
      flex: 0 0 44px;
    }
  }
}

.header[data-design="1"] {
  padding-top: 10px;
  padding-bottom: 5px;
  justify-content: space-between;
  > .header-inner {
    justify-content: center;
  }
}

.footer {
  padding-block: 10px;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: stretch;
  gap: 30px;
}
</style>
