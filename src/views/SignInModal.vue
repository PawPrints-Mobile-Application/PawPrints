<template>
  <ion-button id="modal-SignIn" expand="block" color="tertiary"
    >Sign In</ion-button
  >
  <Modal class="modal-container" trigger="modal-SignIn" :allowButtons="false">
    <template #modalSlot="{ closeButton }">
      <section class="signin-content">
        <h1 class="content-title">SIGN IN</h1>

        <ion-list>
          <ion-item>
            <ion-input
              ref="input"
              label="Username or Email"
              label-placement="floating"
              placeholder="Enter Username"
              :clear-input="true"
              :value="username"
              fill="solid"
              :helper-text="username === '' ? 'Enter a valid email' : 'Valid Email'"
              error-text="Invalid email"
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

        <ion-button v-on:click="closeButton">Close</ion-button>
      </section>
    </template>
  </Modal>
</template>

<script lang="ts">
  import { IonButton, IonList, IonItem, IonInput } from "@ionic/vue";
  import Modal from "../components/Modal.vue";
  import { computed } from "vue";

  type Username = string;
  var username: Username = "";

  type Password = string;
  var password: Password = "";

  const usernameClass = computed(() => ({'ion-valid' : validateEmail(username), 'ion-invalid' : (!validateEmail(username) && username !== '')}));

  function validateEmail(email: Username) {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    ) !== null;
  };

  

  export default {
    name: "SignInModal",
    components: {IonButton, IonList, IonItem, IonInput, Modal},
    data() {
      return {
        username,
        password,
        usernameClass
      };
    },
    methods: {
      validateEmail,
    },
  };
  </script>

  <style scoped>
  #modal-SignIn {
    font-weight: bold;
    font-size: 1.5rem;
    width: 90%;
    min-width: 150px;
    --border-radius: 10px;
    margin-top: 10px;
  }

  .signin-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column wrap;
    height: 100%;
  }

  .content-title {
    font-size: 3rem;
    font-weight: bold;
  }

  ion-item {
    margin-top: 20px;
  }
</style>
