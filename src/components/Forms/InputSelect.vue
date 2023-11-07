<template>
    <InputBox
      v-model:value="value"
      @input="(value) => console.log(value)"
    >
      <ButtonExpand v-model:expand="state"/>
    </InputBox>
</template>
<script setup lang="ts">
import { InputBox } from '.';
import { ButtonExpand } from '../Buttons';
import { ref } from 'vue';

const state = ref(false);
const value = ref('');
</script>
<style scoped>
    
</style>