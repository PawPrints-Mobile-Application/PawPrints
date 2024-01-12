<template>
  <LayoutPage>
    <header>
      <ButtonMode />
      <ButtonTheme
        :name="color"
        v-for="color of ObjectToMap(Enums.Theme).keys()"
      />
    </header>
    <main>
      <CardUser />
    </main>
  </LayoutPage>
</template>
<script setup lang="ts">
import { ButtonMode, ButtonTheme, CardUser } from "../../components";
import { LayoutPage } from "../../layout";
import { Enums } from "../../server/models/Information";
import { ObjectToMap } from "../../utils";
</script>
<style scoped>
header {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding-block: 20px 10px;
}


</style>
