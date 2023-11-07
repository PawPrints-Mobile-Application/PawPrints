<template>
  <ul class="input-helper" v-show="!!helpers && helpers!.length > 0">
    <li
      v-for="(helper, key) in helpers"
      :data-color="!validated || !validated![key] ? helper.intensity : 'success'"
    >
      {{ helper.text }}
    </li>
  </ul>
</template>
<script setup lang="ts">
import { HelperConstructor, InputValidator } from ".";
import { computed } from "vue";

const props = defineProps({
  elements: Array<HelperConstructor>,
  validators: Array<InputValidator>,
  validated: Array<Boolean>,
});

const helpers = computed(() => {
  if (!!props.elements) return props.elements;
  return props.validators?.map((validator) => validator.helper);
});
</script>
<style scoped>
.input-helper {
  margin-top: 5px;
  padding-left: 25px;
  font-size: var(--fs4);
}
</style>
