<template>
    <ion-input
    :type="type"
    :value="value"
    :label="label"
    label-placement="floating"
    :placeholder="placeholder"
    :clear-input="true"
    fill="solid"
    :helper-text="helperText"
    :error-text="errorText"
    @IonInput=" value = $event.target.value; validation(validator, validate)"
    :class="['ion-touched', valueClass, 'input']"
    color="white"
    />
</template>

<script setup lang="ts">
import { IonInput } from '@ionic/vue';
import { Ref, ref } from "vue";
type Input = Ref<string | number | null | undefined>;
const value: Input = ref("");
const valueClass = ref("");

const validation = (validator: Function, validate: boolean) => {
    console.log(!value.value);
    valueClass.value = !value.value || value.value.toString().trim() == "" || !validate ? "" : (!validator(value) ? "ion-invalid"
      : "ion-valid");
      }
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
        helperText: {
            type: String,
            default: 'Valid'
        },
        errorText: {
            type: String,
            default: 'Invalid'
        },
        validator: {
            type: Function,
            default: () => true
        },
        validate: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'text'
        }
    }
}
</script>
<style scoped>
ion-input.input {
    position: relative;
    font-size: 1.25rem;   
    font-weight: 700;
    width: 90%;
    --border-radius: 20px;
    --background: var(--ion-color-quarter-tint);
}

ion-input.input.has-focus {
    --background: var(--ion-color-quarter-shade) !important;
}
</style>