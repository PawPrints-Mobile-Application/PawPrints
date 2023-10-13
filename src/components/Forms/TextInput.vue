<template>
    <section class="text-input">
        <label v-show="!!label" id="text-input-label" :for="name">{{ label }}</label>
        <input id="text-input-input" :name="name" type="text" v-model="value" @input="emit('update', onUpdate)" :placeholder="placeholder"/>
        <div id="text-input-helper"></div>
    </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
defineProps({
    name: {
        type: String,
        required: true
    },
    label: String,
    placeholder: String,
    type: {
        type: String,
        default: 'text',
        validator: (value: string) => ['text', 'email', 'password'].includes(value)
    }
});
const input = ref("");
const value = computed({get() {return input.value;}, set(value) {input.value = value}})
const emit = defineEmits(['update', ]);
defineExpose({value});


// import { shieldCheckmark as validIcon, warning as invalidIcon } from "ionicons/icons";
// import { IonIcon } from "@ionic/vue";
// import { ref } from "vue";
// const focused = ref(false);

// const valid = ref(false);
// const allowValidation = ref(false);
// const AllowValidation = (validator: Function, type: string) => !(!validator || type === 'password' || input.value == "");
// const validation = (validator: Function, type: string, value: Function) => {
//     value(input.value);
//     allowValidation.value = AllowValidation(validator, type);
//     if (!allowValidation.value) return;
//     valid.value = validator(input.value);
// }
</script>

<!-- <script lang="ts">
export default {
    name: 'TextInput',
    props:{
        label: {
            type: String,
            default: "Value"
        },
        id: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            default: 'Enter a value'
        },
        errorText: {
            type: String,
            default: 'Invalid'
        },
        validator: {
            type: Function || null,
            default: null
        },
        type: {
            type: String,
            default: 'text'
        },
        value: {
            type: Function,
            required: true
        },
        val: {
            type: String,
            default: ''
        }
    }
}
</script> -->
<style scoped>
.text-input {
    font-family: Rubik;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    --padding: 20px;
    --icon-size: 30px;
}

.text-input-label {
    width: max-content;
    transform: translate(var(--padding),28px);
    position: relative;
    transition: all 250ms ease-in-out;
    align-self: start;
}

.text-input.focused .text-input-label  {
    transform: translate(0,0);
    font-weight: 600;
}

.text-input.has-value .text-input-label {
    transform: translate(0,0);
    font-weight: 600;
}

.text-input-input {
    border-radius: 5px ;
    border: none;
    background-color: var(--ion-color-quarter);
    height: 35px;
    padding: var(--padding);
    /* padding-right: calc(var(--padding) + var(--icon-size)) ; */
}

.text-input-input:active {
    background-color: var(--ion-color-quarter-shade);
}
.text-input-input:focus {
    background-color: var(--ion-color-quarter-shade);
}

.text-input-icon {
    position: absolute;
    left: 0;
    transform: translate(calc(100vw - 85px), 23px);
    font-size: var(--icon-size);
}

.text-input-error-text {
    padding: 5px var(--padding);
    color: var(--ion-color-danger);
    opacity: 0.7;
}
</style>