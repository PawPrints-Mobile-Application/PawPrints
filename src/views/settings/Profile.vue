<template>
  <LayoutPage>
    <LayoutHeader returnTarget="/settings" label="PROFILE" />
    <main>
      <InputUserAvatar v-model="form.avatar" />
      <InputWrapper label="Username">
        <InputText placeholder="Username" v-model="form.username" />
      </InputWrapper>
      <InputWrapper label="Email">
        <InputText placeholder="Email" v-model="form.email" freeze />
      </InputWrapper>
      <InputWrapper label="Password"> </InputWrapper>
      <ButtonDanger class="button-reset" value="Reset Password" />

      <div class="buttons">
        <ButtonDanger value="Clear" />
        <ButtonSuccess value="Save" />
      </div>
    </main>
  </LayoutPage>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import {
  ButtonDanger,
  ButtonSuccess,
  InputText,
  InputUserAvatar,
  InputWrapper,
} from "../../components";
import { LayoutHeader, LayoutPage } from "../../layout";
import { UserInfo } from "../../utils";

const defaultValues = {
  username: UserInfo.GetUsername(),
  email: UserInfo.GetEmail(),
  avatar: UserInfo.GetAvatar(),
};

const form = reactive({
  username: defaultValues.username,
  email: defaultValues.email,
  avatar: defaultValues.avatar,
});
</script>
<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.input-user-avatar {
  width: 150px;
}

.input-wrapper,
.button-reset {
  width: 100%;
}

.buttons {
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 10px;

  > .button {
    flex: 1 0 0;
  }
}
</style>
