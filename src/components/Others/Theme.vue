<template>
    <section class="theme">
    <ButtonTheme
      v-for="(theme, key) in ObjectToMap(themes).keys()"
      :theme="ObjectToMap(themes).get(theme)"
      :name="theme"
      :label="`Theme ${key+1}`"
    />
    <ButtonMode />
    </section>
</template>
<script setup lang="ts">
import { ButtonMode, ButtonTheme } from '../Buttons';
import themes from '../../theme';
import { ObjectToMap } from '../../utils';
</script>
<style scoped>
section {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>