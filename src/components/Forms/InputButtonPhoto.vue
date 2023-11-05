<template>
  <section class="input-button-photo" :data-shape="shape">
    <section class="wrapper">
      <div>
        <button class="change-button">
          <div id="button-line-1" class="button-line" />
          <div id="button-line-2" class="button-line" />
        </button>
        <input
          type="file"
          :name="name"
          @change="OnChange"
          accept=".jpg, .png, .jpeg, .gif"
        />
      </div>
    </section>
  </section>
</template>
<script setup lang="ts">
import { PawPrints } from "../../assets/images";
import { ref } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: [String, ArrayBuffer],
    required: true,
  },
  shape: {
    type: String,
    default: "square",
    validator: (value: string) => ["square", "circle"].includes(value),
  },
  default: String,
});

const defaultPhoto = ref(!!props.default ? props.default : PawPrints);

const OnChange = (e: any) => {
  const file = e.target.files[0];
  SetValue(file);
};

const SetValue = (file: Blob | undefined | null = null) => {
  if (!file) {
    // undefined when cancelled, null when cannot find
    if (file === undefined) {
      emit("update:value", defaultPhoto.value);
    }
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", (e) =>
    emit("update:value", e.target?.result!.toString()!)
  );
  reader.readAsDataURL(file);
};

const emit = defineEmits(["update:value"]);
</script>
<style scoped>
[data-shape="square"] {
  > .wrapper {
    border-radius: 5px;
  }

  > .change-button {
    transform: translate(
      calc((var(--width) / 2) - 8px),
      calc((var(--width) / 2) - 8px)
    );
  }
}

[data-shape="circle"] {
  > .wrapper {
    border-radius: 100%;
  }

  > .change-button {
    transform: translate(calc(var(--width) / 3), calc(var(--width) / 3));
  }
}

.input-button-photo {
  --width: 20px;
  width: var(--width);
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .wrapper {
    width: var(--width);
    aspect-ratio: 1;
    overflow: hidden;

    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 200%;

      > * {
        width: 100%;
        aspect-ratio: 1;
      }

      > input {
        opacity: 0;
        position: relative;
        transform: translateY(-100%);
      }

      > .change-button {
        background-color: var(--ion-color-black);
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;

        > .button-line {
          border-radius: 5px;
          position: absolute;
          width: 14px;
          height: 2px;
          background-color: var(--ion-color-white);
        }

        > #button-line-1 {
          transform: rotateZ(90deg);
        }
      }
    }
  }
}
</style>
