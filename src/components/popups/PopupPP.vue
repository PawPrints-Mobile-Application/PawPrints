<template>
    <Popup
      trigger="popup-pp"
      @dismiss="() => (expanded = false)"
      @present="() => (expanded = true)"
    >
      <template #content="{ Hide }">
        <section class="pp">
          <section class="data">
            dawdadawd dawd awd aw dawwwwa dawd awd wd wd a dawdadawd dawd awd aw
            dawwwwa dawd awd wd wd a dawdadawd dawd awd aw dawwwwa dawd awd wd wd
            a dawdadawd dawd awd aw dawwwwa dawd awd wd wd a dawdadawd dawd awd aw
            dawwwwa dawd awd wd wd a dawdadawd dawd awd aw dawwwwa dawd awd wd wd
            a dawdadawd dawd awd aw dawwwwa dawd awd wd wd a dawdadawd dawd awd aw
            dawwwwa dawd awd wd wd a dawdadawd dawd awd aw dawwwwa dawd awd wd wd
            a
          </section>
          <section class="buttons">
            <ButtonDanger value="Decline" @click="Hide" />
            <ButtonSuccess
              value="Accept"
              @click="
                () => {
                  Accept();
                  Hide();
                }
              "
            />
          </section>
        </section>
      </template>
    </Popup>
  </template>
  <script setup lang="ts">
  import { ref } from "vue";
  import { ButtonDanger, ButtonSuccess, Popup } from "..";
  
  const expanded = ref(false);
  
  const Accept = () => emit("accept");
  const emit = defineEmits(["accept"]);
  </script>
  <style scoped>
  .pp {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: var(--theme-secondary-background);
    border-radius: 20px;
    width: 90vw;
    height: 50vh;
    min-height: 300px;
    gap: 20px;
  }
  
  .data {
    flex: 1 0 0;
    overflow-y: scroll;
  }
  
  .buttons {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  </style>
  