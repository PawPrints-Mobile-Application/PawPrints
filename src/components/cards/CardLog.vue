<template>
  <section class="card card-log">{{ log }}</section>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { Props as PropsLAD } from "../../server/models/LogAddressingData";

defineProps({
  log: Object as PropType<[string, Map<string, PropsLAD>]>,
});
</script>
<style scoped>
.card-log {
}
</style>
