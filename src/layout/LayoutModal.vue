<template>
  <ion-modal
    class="layout-modal"
    @didDismiss="emit('dismiss')"
    @didPresent="emit('present')"
  >
    <LayoutWrapper
      :inAntiNavigation="inAntiNavigation"
      :justify="justify"
      :noDefaultMargin="noDefaultMargin"
      :disable-header="hideHeader || disableHeader"
      :disable-footer="hideFooter || disableFooter"
      :hideScrollbar="hideScrollbar"
      :disableScroll="disableScroll"
      :disableHeaderOnScroll="disableHeaderOnScroll"
      :noHeaderAnimation="noHeaderAnimation"
      @off-scroll-top="emit('off-scroll-top')"
      @on-scroll-top="emit('on-scroll-top')"
      @scroll-end="emit('scroll-end')"
      @scroll-start="emit('scroll-start')"
      @scrolling="emit('scrolling')"
    >
      <template #header>
        <section class="header" :data-design="design">
          <section class="header-inner">
            <ButtonBack
              v-show="design === 0 && !hideBack"
              :disabled="disableBack"
              @click="Discard"
            />
            <slot name="header">
              <TextHeading>{{ title }}</TextHeading>
            </slot>
          </section>
          <PageCounter
            v-show="design === 1"
            :max="max"
            :page="page"
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
              :label="buttonSubmitText"
              :type="buttonType"
              v-show="!hideSubmit && (!hideOnDisable || !disableSubmit)"
              :disabled="disableSubmit"
              @click="emit('submit')"
              state="success"
            />
          </section>
          <section class="footer" v-show="design === 1">
            <ButtonText
              v-show="!hideBack && (!hideOnDisable || !disableBack)"
              :disabled="disableBack"
              :label="page === 1 ? 'Discard' : 'Back'"
              @click="page === 1 ? Discard() : Back()"
              :style="{
                backgroundColor:
                  page === 1
                    ? 'var(--theme-button-warning)'
                    : 'var(--theme-button-normal)',
              }"
            />
            <ButtonText
              v-show="!hideNext && (!hideOnDisable || !disableNext)"
              :disabled="disableNext"
              :label="page === max ? 'Create' : 'Next'"
              @click="page === max ? Submit() : Next()"
              :style="{
                backgroundColor:
                  page === 1
                    ? 'var(--theme-button-normal)'
                    : 'var(--theme-button-success)',
              }"
            />
          </section>
        </slot>
      </template>
    </LayoutWrapper>
  </ion-modal>
</template>
<script setup lang="ts">
import { IonModal } from "@ionic/vue";
import { LayoutWrapper } from ".";
import { ref } from "vue";
import {
  ButtonBack,
  ButtonClear,
  ButtonText,
  ButtonSubmit,
} from "../components/Buttons";
import { TextHeading } from "../components/Texts";
import { PageCounter } from "../components/Others";

const props = defineProps({
  // Inherited from LayoutWrapper
  inAntiNavigation: Boolean,
  justify: {
    type: String,
    default: "center",
    validator: (value: string) =>
      [
        "center",
        "flex-start",
        "space-between",
        "space-around",
        "space-evenly",
      ].includes(value),
  },
  noDefaultMargin: Boolean,
  disableHeader: Boolean,
  disableFooter: Boolean,
  hideScrollbar: Boolean,
  disableScroll: Boolean,
  disableHeaderOnScroll: Boolean,
  noHeaderAnimation: Boolean,

  // Important Props
  title: {
    type: String,
    required: true,
  },
  max: {
    type: Number,
    default: 1,
    validator: (value: number) => value > 0,
  },
  page: {
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

  hideHeader: Boolean,
  hideFooter: Boolean,

  hideBack: Boolean,
  disableBack: Boolean,
  hideNext: Boolean,
  disableNext: Boolean,

  closeOnSubmit: Boolean,
  hideOnDisable: Boolean,
  hideClear: Boolean,
  disableClear: Boolean,
  hideSubmit: Boolean,
  disableSubmit: Boolean,

  buttonSubmitText: String,
});

const design = ref(props.max === 1 ? 0 : 1);

const Add = (i: number) =>
  emit("update:page", Math.max(1, Math.min(props.max, i + props.page)));

const Clear = () => emit("update:page", 1);

const Discard = () => {
  emit("discard");
  setTimeout(Clear, 100);
};

const Submit = () => {
  emit("submit");
  if (!!props.closeOnSubmit) Discard();
};

const Back = () => {
  emit("back");
  Add(-1);
};

const Next = () => {
  emit("next");
  Add(1);
};

const emit = defineEmits([
  // Inherited from LayoutWrapper
  "scroll-start",
  "scroll-end",
  "scrolling",
  "on-scroll-top",
  "off-scroll-top",
  // Self
  "clear",
  "submit",
  "dismiss",
  "present",
  "discard",
  "back",
  "next",
  "update:page",
]);

defineExpose({ Clear, Discard, Submit, Back, Next });
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
  justify-content: space-between;
  align-items: center;

  > * {
    max-width: 48%;
  }
}

[data-color] {
  background-color: attr(data-color);
}
</style>
