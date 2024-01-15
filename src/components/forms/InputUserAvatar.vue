<template>
  <section class="input-user-avatar" @click="TogglePopup">
    <Avatar class="outer" type="user" :value="modelValue.toString()" />
    <Popup trigger="popup-change-profile">
      <section class="options">
        <TextSubheading value="Choose an avatar" />
        <Avatar
          class="option"
          v-for="(_, i) in UserIcons.entries"
          v-show="i > 1"
          type="user"
          :value="i.toString()"
          :class="{ active: selected === i }"
          @click="SelectAvatar(i)"
        />
        <ButtonSuccess value="Choose" @click="SetAvatar" />
      </section>
    </Popup>
  </section>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Avatar, ButtonSuccess, Popup, TextSubheading } from "..";
import { PawprintsEvent, UserIcons } from "../../utils";

const props = defineProps({
  modelValue: {
    type: Number,
    default: 2,
  },
  freeze: Boolean,
});

const selected = ref(props.modelValue);

const SelectAvatar = (i: number) => (selected.value = i);

const SetAvatar = () => {
  PawprintsEvent.EventDispatcher("user-avatar-changed");
  emit("update:modelValue", selected.value);
  TogglePopup();
};

const TogglePopup = () => {
  if (!props.freeze) PawprintsEvent.EventDispatcher("popup-change-profile");
};

const emit = defineEmits(["update:modelValue"]);
</script>
<style scoped>
.input-user-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.outer {
  outline: 2px solid var(--theme-primary-text);
}

.options {
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
  height: 400px;
  background-color: var(--theme-secondary-background);
  width: 300px;
  border-radius: 10px;
  padding: 20px;
  justify-content: space-between;
}

.text-subheading {
  width: 100%;
  text-align: center;
  font-weight: bold;
}

.option {
  --size: 60px;
  outline: 2px solid var(--theme-primary-text);
  transform: all 200ms ease-out;
}

.active {
  outline: 4px solid var(--theme-primary-text);
}

.button-success {
  width: 100%;
}
</style>
