<template>
  <section class="page-counter" :data-design="design">
    <div
      v-if="!design.includes('text')"
      v-for="i in max"
      :key="i"
      :class="{ selected: i === page }"
    />
    <div v-else>
      <TextSmall>{{ page }} {{ design === "text-of" ? 'of' : '/' }} {{ max }}</TextSmall>
    </div>
  </section>
</template>
<script setup lang="ts">
import { TextSmall } from "../";

defineProps({
  max: {
    type: Number,
    required: true,
    validator: (value: number) => value > 0,
  },
  page: {
    type: Number,
    required: true,
    validator: (value: number) => value > 0,
  },
  design: {
    type: String,
    default: "text-of",
    valdator: (value: string) =>
      ["circle", "stretched", "text-slash", "text-of"].includes(value),
  },
});
</script>
<style scoped>
.page-counter {
  --color-default: lightgrey;
  --color-active: var(--theme-tertiary-background);

  width: 100%;
  height: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;

  > div {
    border-radius: 20px;
    transition: all 200ms ease-out;
  }
}

.page-counter[data-design="circle"] {
  > div {
    height: 10px;
    flex: 0 0 10px;
    background-color: var(--color-default);
  }

  > div.selected {
    flex: 0.05 0 10px;
    background-color: var(--color-active);
  }
}

.page-counter[data-design="stretched"] {
  align-items: stretch;
  gap: 5px;

  > div {
    height: 5px;
    max-width: 55%;
    flex: 1 0 10px;
    background-color: var(--color-default);
  }

  > div.selected {
    flex: 5 0 5px;
    background-color: var(--color-active);
  }
}
</style>
