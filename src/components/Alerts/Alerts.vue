<template>
    <section class="alert">
      <header>
        <!-- <slot #title><TextSubheading>Are you sure you want to proceed?</TextSubheading></slot> -->
        <TextSubheading>Are you sure you want to proceed?</TextSubheading>
      </header>
      <div class="content">
        <TextSmall>
          Heads up! Deleting this dog profile will unleash chaos in the digital
          doghouse since all associated data will be removed.</TextSmall
        >
      </div>
      <div class="buttons">
        <ButtonText label="Cancel" />
        <ButtonText label="Confirm" />
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { TextSubheading, TextSmall } from "../Texts";
  import { ButtonText } from "../Buttons";
  </script>
  
  <style scoped>
  .alert {
    width: 90%;
    background-color: var(--theme-secondary-dark-background);
    color: var(--theme-secondary-dark-text);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 25px 10px;
    gap: 13px;
    text-align: center;
    margin: 15px;
  }
  .buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  </style>