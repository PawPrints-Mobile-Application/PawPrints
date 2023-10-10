<template>
    <section class="text-input" :class="[`text-input-${type}`, {'focused' : focused, 'has-value' : input !== ''}, allowValidation() && (valid ? 'valid' : 'invalid')]">
        <label
        :for="id"
        class="text-input-label"
        >{{ label }}</label>

        <input class="text-input-input"
        :id="id"
        :name="id"
        :type="type"
        v-model.trim="input" 
        @input="validation(validator, value)"
        :placeholder="focused ? placeholder : '' "
        @focus="focused = true"
        @blur="focused = false"
        :style="[`outline: ${!allowValidation() ? 'none' : `2px solid var(--ion-color-${valid ? 'success' : 'danger'})`}`]"
        />

        <ion-icon
        v-show="allowValidation()"
        :id='`text-input-icon-${id}`'
        class="text-input-icon"
        :icon="valid ? validIcon : invalidIcon"
        :color="valid ? 'success' : 'danger'"
        />

        <div class="text-input-error-text" :class="{'opacity-0' : !(allowValidation() && !valid)}" >
            {{ errorText }}
        </div>
    </section>
</template>

<script setup lang="ts">
import { shieldCheckmark as validIcon, warning as invalidIcon } from "ionicons/icons";
import { IonIcon } from "@ionic/vue";
import { ref } from "vue";
const focused = ref(false);
</script>

<script lang="ts">
const priorityValidation = ref(false);
const PriorityValidation = (validator: Function | null, type: string) => !(!validator || type === 'password');

const input = ref("");
const valid = ref(false);
const allowValidation = () => !(!priorityValidation.value || input.value == "");
const validation = (validator: Function, value: Function) => {
    value(input.value);
    if (!allowValidation()) return;
    valid.value = validator(input.value);
}

export default {
    name: 'TextInput',
    props:{
        label: {
            type: String,
            default: "Value"
        },
        id: {
            type: String,
            default: "input",
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
        }
    },
    mounted() {
        priorityValidation.value = PriorityValidation(this.validator, this.type);
    }
}
</script>
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
    padding-right: calc(var(--padding) + var(--icon-size)) ;
}

.text-input-input:active {
    background-color: var(--ion-color-quarter-shade);
}
.text-input-input:focus {
    background-color: var(--ion-color-quarter-shade);
}

.text-input-icon {
    position: absolute;
    transform: translate(calc(100vw - 45px), 23px);
    font-size: var(--icon-size);
}

.text-input-error-text {
    padding: 5px var(--padding);
    color: var(--ion-color-danger);
}
</style>