<template>
  <section
    class="subscription-card"
    :class="{ selected: !!selected }"
    :data-design="design"
  >
    <div class="data">
      <img :src="icon" />
      <div class="info">
        <h3>{{ name }}</h3>
        <ul>
          <li v-for="item in info">{{ item }}</li>
        </ul>
      </div>
    </div>
    <ButtonText
      v-show="!hideButton || !buttonText"
      :value="buttonText!"
      :disabled="!!disableButton"
    />
  </section>
</template>
<script setup lang="ts">
import { ButtonText } from "../../components";

defineProps({
  icon: String,
  name: String,
  info: Array<String>,
  selected: Boolean,
  buttonText: String,
  disableButton: Boolean,
  hideButton: Boolean,
  design: {
    type: Number,
    default: 0,
    validator: (value: number) => value >= 0 && value <= 1,
  },
});
</script>
<style scoped>
.selected {
  outline: 2px solid black;
}

.subscription-card {
  background-color: var(--theme-secondary-dark-background);
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 20px;
  font-size: var(--fs4);
  gap: 10px;
  min-height: 135px;

  > .data {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 20px;
  }
}

.subscription-card[data-design="0"] {
  > .data {
    flex-direction: row;
    gap: 20px;

    > .info {
      flex: 1 0 0;
      text-align: left;

      > h3 {
        margin: 0;
        font-weight: 700;
        margin-bottom: 5px;
      }

      > ul {
        padding-left: 20px;
        margin: 0;
      }
    }
  }
}

.subscription-card[data-design="1"] {
  > .data {
    flex-direction: column;
    > .info {
      text-align: center;

      > h3 {
        margin: 0;
        font-weight: 700;
        margin-bottom: 5px;
      }

      > ul {
        padding-left: 0;
        margin: 0;
        list-style-type: none;
      }
    }
  }
}
</style>
