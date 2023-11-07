<template>
  <section class="input-photo" :data-shape="shape">
    <InputLabel :value="label" v-show="!!label" />
    <section class="wrapper">
      <div @click="() => {
        if (!!hasChangeButton) showPhoto = true;
      }">
        <img :src="value" />
        <input
          v-show="!hasChangeButton"
          type="file"
          :name="name"
          @change="OnChange"
          accept=".jpg, .png, .jpeg, .gif"
        />
      </div>
    </section>
    <InputButtonPhoto
      :name="name"
      v-model:value="_value"
      :default="default"
      v-show="!!hasChangeButton"
    />
    <Popup v-model:value="showPhoto">
      <template #content>
        <PhotoCard :value="value" />
      </template>
    </Popup>
  </section>
</template>
<script setup lang="ts">
import { PawPrints } from "../../assets/images";
import { PhotoCard } from "../Cards";
import { onMounted, ref, computed, WritableComputedRef } from "vue";
import { InputButtonPhoto, InputLabel } from ".";
import Popup from "../Modals/Popup.vue";

const props = defineProps({
  label: String,
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  shape: {
    type: String,
    default: "circle",
    validator: (value: string) => ["square", "circle"].includes(value),
  },
  default: String,
  hasChangeButton: Boolean,
});

const defaultPhoto = ref(!!props.default ? props.default : PawPrints);
const _value: WritableComputedRef<string | ArrayBuffer> = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit("update:value", value);
  },
});

const OnChange = (e: any) => {
  const file = e.target.files[0];
  SetValue(file);
};

const SetValue = (file: Blob | undefined | null = null) => {
  if (!file) {
    // undefined when cancelled, null when cannot find
    if (file === undefined) {
      _value.value = defaultPhoto.value;
    }
    return;
  }

  const reader = new FileReader();
  reader.addEventListener(
    "load",
    (e) => (_value.value = e.target?.result!.toString()!)
  );
  reader.addEventListener("error", () => (_value.value = defaultPhoto.value));
  reader.readAsDataURL(file);
};

const showPhoto = ref(false);

onMounted(() => {
  if (!props.value || props.value === "") {
    _value.value = defaultPhoto.value;
  }
});

const emit = defineEmits(["update:value"]);
</script>
<style scoped>
[data-shape="square"] {
  > .wrapper {
    --border-radius: 5px;
  }

  > .input-button-photo {
    transform: translate(
      calc((var(--size) / 2) - 8px),
      calc((var(--size) / 2) - 8px)
    );
  }
}

[data-shape="circle"] {
  > .wrapper {
    --border-radius: 100%;
  }

  > .input-button-photo {
    transform: translate(
      calc((var(--size) / 3) + 2px),
      calc((var(--size) / 3) + 2px)
    );
  }
}

.input-photo {
  min-width: 50px;
  --size: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .wrapper {
    border-radius: var(--border-radius);
    width: var(--size);
    aspect-ratio: 1;
    overflow: hidden;
    background-color: var(--ion-color-tertiary);
    outline: 2px solid black;

    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      > * {
        height: var(--size);
      }

      > input {
        border-radius: var(--border-radius);
        width: var(--size);
        aspect-ratio: 1;
        opacity: 0;
        position: absolute;
      }

      > img {
        width: max-content;
      }
    }
  }

  > .input-button-photo {
    position: absolute;
  }
}
</style>
