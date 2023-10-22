<template>
    <section class="popup" v-if="modelValue">
      <div id="backdrop" @click="() => emit('update:modelValue', false)" />
        <div class="content">
            <slot />
        </div>
    </section>
</template>
<script setup lang="ts">
defineProps({
    modelValue: {
        type: Boolean,
        default: false,
        required: true
    }
});
const emit = defineEmits(['update:modelValue']);
</script>
<style scoped>
    .popup {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }

    #backdrop {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #ffffff80;
        z-index: 2;
    }

    .content {
        z-index: 3;
        width: 100%;
    }
</style>