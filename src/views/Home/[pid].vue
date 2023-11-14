<template>
  <PageLayout>
    {{ params }}
  </PageLayout>
</template>
<script setup lang="ts">
import { PageLayout } from '../../layout';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();
const params = ref(route.params);

</script>

<script lang="ts">
export default {
  name: "DogProfile",
};
</script>
<style scoped>
    
</style>