<template>
    <ion-input
    type="text"
    :value="value"
    :label="label"
    label-placement="floating"
    :placeholder="placeholder"
    :clear-input="true"
    fill="solid"
    :helper-text="
        validate ? (value === '' ? helperTexts[0] : helperTexts[1]) : ''
    "
    :error-text="helperTexts[2]"
    @IonInput=" value = $event.target.value; validation(validator, validate)"
    :class="['ion-touched', valueClass]"
    />
</template>

<script setup lang="ts">
import { IonInput } from '@ionic/vue';
import { Ref, ref } from "vue";
type Input = Ref<string | number | null | undefined>;
const value: Input = ref("");
const valueClass = ref("");

const validation = (validator: Function, validate: boolean) => valueClass.value = !value.value || !validate ? "" : (value.value.toString().trim() == "" || !validator(value) ? "ion-invalid"
      : "ion-valid");
</script>

<script lang="ts">
export default {
    name: 'TextInput',
    props:{
        label: {
            type: String,
            default: "Value"
        },
        placeholder: {
            type: String,
            default: 'Enter a value'
        },
        helperTexts: {
            type: Array<string>,
            default: ['Enter a valid value', 'Valid', 'Invalid']
        },
        validator: {
            type: Function,
            default: () => true
        },
        validate: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style scoped>
ion-input {
    font-size: 1.25rem;   
    font-weight: 700;
}
</style>