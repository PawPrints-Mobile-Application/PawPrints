<template>
  <button class="dog-card" @click="Redirect">
    <PetAvatar :background-color="data.color" />
    <h4>{{ data.name }}</h4>
    <h5>{{ data.age }}</h5>
  </button>
</template>

<script setup lang="ts">
import { Default as PetAvatar } from "../../components/Avatars/Pets";
import { useIonRouter } from '@ionic/vue';

const ionRouter = useIonRouter();
const Redirect = () => ionRouter.push(`/home/${data.name}`);

const props = defineProps({
  icon: String,
  dog: {
    type: Object,
    required: true,
  },
});

const GetAge = (date: string) => {
  const startDate = new Date(date);
  const currentDate = new Date();

  var yearsPassed = currentDate.getFullYear() - startDate.getFullYear();
  var monthsPassed = currentDate.getMonth() - startDate.getMonth();
  var daysPassed = currentDate.getDate() - startDate.getDate();

  // Adjust for negative months or days
  if (daysPassed < 0) {
    monthsPassed--;
    const lastMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    daysPassed += lastMonthDate.getDate();
  }
  if (monthsPassed < 0 && yearsPassed < 0) {
    yearsPassed--;
    monthsPassed += 12;
  }

  return {
    years: yearsPassed,
    months: monthsPassed,
    days: daysPassed,
  };
};

const StringFormatter = (value: number, label: string) => `${value} ${label}${value > 1 ? 's' : ''}`;
const AgeToSring = (date: string) => {
  const age = GetAge(date);
  let temp = [];
  if (age.years > 0) {
    temp.push(StringFormatter(age.years, 'year'));
  }
  if (age.months > 0) {
    temp.push(StringFormatter(age.months, 'month'));
  }
  if (age.days > 0) {
    temp.push(StringFormatter(age.days, 'day'));
  }

  if (temp.length === 2) {
    return temp.join(" and ");
  } else if (temp.length === 3) {
    return `${temp[0]}, ${temp[1]}, and ${temp[2]}`;
  }
  return temp[0];
};

const data = {
  name: props.dog.name,
  age: AgeToSring(props.dog.birthday),
  color: props.dog.color
}
</script>

<style scoped>
.dog-card {
  background-color: var(--ion-color-secondary);
  border-radius: 10px;
  border: none;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  flex: 1 0 120px;

  > h4,
  h5, .pet-avatar {
    font-size: var(--fs4);
    margin: 0;
    width: 90px;
  }

  > h4 {
    font-size: var(--fs2);
    font-family: Poppins;
    font-weight: 700;
  }
}

.dog-card:active {
  background-color: var(--ion-color-secondary-shade);
}
</style>
