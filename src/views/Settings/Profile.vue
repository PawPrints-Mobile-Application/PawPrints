<template>
  <SettingsLayout label="MY PROFILE" target="/settings">
    <InputPhoto name="Photo" v-model:value="form.photo" has-change-button />
    <NoteWarning>
      Note: Please do not move or delete your chosen photo since cloud photo
      support in this current build is not yet supported.
    </NoteWarning>
  </SettingsLayout>
</template>
<script setup lang="ts">
import { SettingsLayout } from "../../layout";
import { InputPhoto } from "../../components/Forms";
import { reactive } from "vue";
import { NoteWarning } from '../../components/Texts/'
// import signup from "../../templates/auth/signup.vue";

const form = reactive({
  photo: "",
});
</script>

<script lang="ts">
export default {
  name: "Profile",
};
</script>
<style scoped>
</style>
