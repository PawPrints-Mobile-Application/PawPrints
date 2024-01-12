<template>
  <Modal
    trigger="modal-add-dog"
    :disableBack="state.processing"
    @dismiss="Clear"
  >
    <template #header
      ><TextHeading class="bold" value="DOGGO PROFILE" />
    </template>

    <section class="pseudo-card" :class="{ show: animation.showBackground }">
      <section class="header">
        <Avatar type="dog" :value="form.breed" :color="form.color" />
        <aside class="details" :class="{ show: animation.showAside }">
          <div v-for="detail in details">
            <TextParagraph class="bold" :value="detail[0] + ':'" />
            <TextParagraph :value="detail[1]" />
          </div>
        </aside>
      </section>
      <section class="footer" :class="{ show: animation.showFooter }">
        <TextSmall v-for="detail in age" :value="detail.toString()" />
      </section>
    </section>

    <section class="form" :class="{ hide: state.processing }">
      <InputWrapper label="Doggo Name">
        <InputText placeholder="Doggo Name" v-model="form.name" />
      </InputWrapper>
      <InputWrapper label="Date of Birth">
        <InputDate v-model="form.birthday" trigger="doggo-birthday" />
      </InputWrapper>
      <InputWrapper label="Doggo Breed">
        <InputDropdown
          placeholder="Doggo Breed"
          v-model="form.breed"
          trigger="doggo-breed"
          :options="Breeds.names"
          closeOnSelect
          searchable
        />
      </InputWrapper>
      <InputWrapper label="Background Color">
        <InputColor placeholder="Background Color" v-model="form.color" />
      </InputWrapper>
      <InputColorSample v-model="form.color" />

      <div class="buttons">
        <ButtonDanger value="Clear" @click="Clear" :disabled="disableClear" />
        <ButtonSuccess value="Save" @click="Process" :disabled="disableSave" />
      </div>
    </section>
  </Modal>
</template>
<script setup lang="ts">
import { computed, reactive } from "vue";
import {
  Avatar,
  Modal,
  TextHeading,
  InputWrapper,
  InputText,
  InputDate,
  InputDropdown,
  InputColor,
  InputColorSample,
  ButtonDanger,
  ButtonSuccess,
  TextParagraph,
  TextSmall,
} from "..";
import {
  Breeds,
  LocalDate,
  Age,
  SeedGenerator,
  UserInfo,
  PawprintsEvent,
} from "../../utils";
import { Add, Props } from "../../server/models/Dogs";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();
const Navigate = (pid: string) =>
  ionRouter.navigate(`/dogs/${pid}`, "forward", "replace");

const props = defineProps({
  db: SQLiteDBConnection,
});

const defaultValues = {
  name: "",
  birthday: new Date(),
  breed: "",
  color: "#FFD80A",
};

const form = reactive({
  name: defaultValues.name,
  birthday: defaultValues.birthday,
  breed: defaultValues.breed,
  color: defaultValues.color,
});

const Clear = () => {
  form.name = defaultValues.name;
  form.birthday = defaultValues.birthday;
  form.breed = defaultValues.breed;
  form.color = defaultValues.color;
};

const state = reactive({
  processingText: "",
  warningText: "",
  processing: false,
});

const animation = reactive({
  showBackground: false,
  showAside: false,
  showFooter: false,
});

const disableClear = computed(
  () =>
    form.name === defaultValues.name &&
    form.birthday === defaultValues.birthday &&
    form.breed === defaultValues.breed &&
    form.color === defaultValues.color
);
const disableSave = computed(() =>
  [form.name, form.breed, form.color].includes("")
);

const details = computed(() => [
  ["Name", form.name],
  [
    "Date of Birth",
    new LocalDate(form.birthday).toLocaleDateString("MM/DD/YYYY", "-"),
  ],
  ["Dog Breed", form.breed],
]);

const computedAge = computed(() => new Age(form.birthday));
const age = computed(() => [
  "Age:",
  "Year/s: " + computedAge.value.years,
  "Month/s: " + computedAge.value.months,
  "Day/s: " + computedAge.value.days,
]);

const Process = () => {
  state.processing = true;
  state.processingText = "Connecting to server...";
  setTimeout(() => {
    animation.showBackground = true;
    animation.showFooter = true;
  }, 500);
  setTimeout(() => {
    animation.showAside = true;
  }, 1000);
  const pid = SeedGenerator().toString();
  const data: Props = {
    pid: pid,
    name: form.name,
    birthday: form.birthday,
    breed: form.breed,
    color: form.color,
    logs: [],
  };
  setTimeout(
    () =>
      Add(props.db!, data, UserInfo.GetUID()).then(() => {
        state.processing = false;
        Navigate(pid);
        PawprintsEvent.EventDispatcher("modal-add-dog", "hide");
        emit("success", data);
      }),
    1500
  );
};

const emit = defineEmits(["success"]);
</script>
<style scoped>
.pseudo-card {
  margin-block: 20px;
  width: 100%;
  background-color: var(--theme-secondary-dark-background);
  padding: 10px;
  border-radius: 10px;
  outline: 3px solid var(--theme-primary-text);
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: background-color 800ms ease-out, outline 600ms ease-out,
    width 300ms ease-out 300ms, padding 400ms ease-out;
}

.header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  max-width: 80px;
  max-height: 80px;
  outline: 6px double var(--theme-secondary-text);
  transition: all 300ms ease-out;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 3px;
  overflow: hidden;
  opacity: 1;
  transition: opacity 300ms ease-out;

  > div {
    display: flex;
    flex-direction: column;
  }
}

.footer {
  display: flex;
  width: 100%;
  height: 14px;
  justify-content: space-around;
  overflow: hidden;
  transition: width 300ms ease-out, height 200ms ease-out 100ms;

  > .text-small:nth-child(1) {
    font-weight: 700;
  }
}

:not(.show) {
  &.pseudo-card {
    background-color: none;
    outline: none;
    padding: 0;
    width: 100px;

    > .header .avatar {
      max-width: 100px;
      max-height: 100px;
    }
  }

  &.details {
    height: 0;
    width: 0;
    opacity: 0;
  }

  &.footer {
    height: 0;
    width: 0;
  }
}

.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  height: 610px;
  transition: all 200ms ease-out;

  &.hide {
    height: 0;
  }
}

.input-wrapper {
  width: 100%;
}

.buttons {
  width: 100%;
  display: flex;
  gap: 10px;
  padding-block: 10px;
}

.button {
  flex: 1 0 0;
}
</style>
