<template>
    <section class="signin-content">
        <h1 class="content-title">SIGN IN</h1>
        <TextInput
        type="email"
        label="Email"
        id="email"
        validate
        :validator="EmailValidator"
        placeholder="Enter Email"
        :value="(v: string) => email = v"
        />
        

        {{ email }}
    </section>
</template>

<script setup lang="ts">
import TextInput from '../components/Forms/TextInput.vue';
import { ref } from "vue";
import { VNodeRef } from 'vue';
const email = ref<VNodeRef>();
// const password = ref("");
const EmailValidator = (value: string) => value.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    ) !== null;
</script>

<script lang="ts">
export default {
    name: "SignInPage"
}
</script>
<style scoped>
    .signin-content {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .content-title {
        font-size: 3rem;
        font-weight: 600;
    }

    ion-list {
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }

    ion-item {
        background-color: inherit;
    }
</style>