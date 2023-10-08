<template>
    <ion-page>
        <ion-content>
            <section class="signin-content">
                <h1 class="content-title">SIGN IN</h1>
                <ion-list>
                    <ion-item>
                        <ion-input
                        type="text"
                        :value="username"
                        label="Username or Email"
                        label-placement="floating"
                        placeholder="Enter Username"
                        :clear-input="true"
                        fill="solid"
                        :helper-text="
                            username === '' ? 'Enter a valid email' : 'Valid Email'
                        "
                        error-text="Invalid email"
                        @IonInput=" username = $event.target.value; validate()"
                        :class="['ion-touched', usernameClass]"
                        />
                    </ion-item>
                    <ion-item>
                        <ion-input
                        label="Password"
                        label-placement="floating"
                        placeholder="Enter Password"
                        :clear-input="true"
                        :value="password"
                        fill="solid"
                        type="password"
                        />
                    </ion-item>
                </ion-list>
            </section>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonList, IonItem, IonInput } from '@ionic/vue';
import { Ref, ref } from "vue";
type Input = Ref<string | number | null | undefined>;
const username: Input = ref("");
const password: Input = ref("");
const usernameClass = ref("");

const validate = () => usernameClass.value = !username.value ? "" : (username.value.toString().trim() == "" || !EmailValidator(username) ? "ion-invalid"
      : "ion-valid");
const EmailValidator = (email: any) => email.value.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    ) !== null;
</script>

<script lang="ts">
export default {
    name: "SignInPage"
}
</script>
<style>
    
</style>