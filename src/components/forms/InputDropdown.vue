<template>
  <section class="forms input-dropdown" @click="expanded = !expanded">
    <div>
      <aside class="output font poppins paragraph">
        {{ props.modelValue }}
      </aside>
      <aside
        class="icons theme color tertiary"
        :class="{ expanded: expanded }"
        v-show="!hideIcon"
      >
        <ion-icon id="icon-up" :icon="chevronUp" />
        <ion-icon id="icon-down" :icon="chevronDown" />
      </aside>
    </div>
    <Popup v-model="expanded" :trigger="trigger">
      <section class="dropdown">
        <InputText
          v-model="searchValue"
          @input="Filter"
          v-show="!!searchable"
        />
        <InputSelect
          v-model="value"
          @update:model-index="UpdateIndex"
          :options="filteredOptions"
          @select="() => (expanded = false)"
        />
      </section>
    </Popup>
  </section>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { IonIcon } from "@ionic/vue";
import { chevronUp, chevronDown } from "ionicons/icons";
import { Popup, InputText, InputSelect } from "..";

const props = defineProps({
  modelValue: [Object, String, Number, Date],
  options: Array<Object | String | Number | Date>,
  show: Boolean,
  searchable: Boolean,
  hideIcon: Boolean,
  trigger: {
    type: String,
    required: true,
  },
});

const filteredOptions = ref(props.options);
const searchValue = ref("");
const Filter = (value: string) => {
  filteredOptions.value =
    value.trim() === ""
      ? props.options
      : props.options?.filter((element) => element.toString().includes(value));
};

const expanded = ref(false);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
    emit("select", value);
  },
});

const UpdateIndex = (value: number) => emit("update:modelIndex", value);

const emit = defineEmits(["update:modelValue", "select", "update:modelIndex"]);
</script>
<style scoped>
.input-dropdown {
  --background: var(--theme-secondary-background);
  --color: var(--theme-secondary-text);
  --outline: var(--theme-tertiary-background);
  --radius: 5px;
  --icon: var(--theme-tertiary-background);
  --text-align: left;
  --font-weight: 400;
  background-color: var(--background);
  color: var(var(--color));
  width: 100%;
  height: 30px;
  border-radius: var(--radius);
  padding: 5px 10px;
  display: flex;
  gap: 5px;

  &:is(:active, :hover, :focus) {
    outline: 2px solid var(--outline);
  }

  > div {
    width: 100%;
    display: flex;
  }
}

.output {
  flex: 1 0 0;
  text-align: var(--text-align);
  font-weight: var(--font-weight);
  min-height: 21px;
}

.icons {
  height: 100%;
  width: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: scroll;
  --translateYUp: -7px;
  --translateYDown: 7px;

  &.expanded {
    --translateYUp: 7px;
    --translateYDown: -7px;
  }
}

ion-icon {
  font-size: 35px;
  position: absolute;
  transition: all 100ms ease-out;
  color: var(--theme-tertiary-background);
}

#icon-up {
  transform: translateY(var(--translateYUp));
}

#icon-down {
  transform: translateY(var(--translateYDown));
}

.dropdown {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-select {
  width: 100%;
}
</style>
