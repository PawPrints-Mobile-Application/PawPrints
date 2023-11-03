<template>
  <button class="dog-card">
    <img class="icon" :src="!!icon ? icon : dogIcon" />
    <h4 class="text name">{{ name }}</h4>
    <h5 class="text age">{{ age }}</h5>
  </button>
</template>

<script setup lang="ts">
import { Logo as dogIcon } from "../../assets/images";
const props = defineProps({
  icon: String,
  dog: {
    type: Object,
    required: true,
  }
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
  if (monthsPassed < 0) {
    yearsPassed--;
    monthsPassed += 12;
  }

  return {
    years: yearsPassed,
    months: monthsPassed,
    days: daysPassed,
  };
};

const AgeToSring = (date: string) => {
  const age = GetAge(date);
  let temp = [];
  if (age.years > 0) {
    temp.push(`${age.years} years`);
  }
  if (age.months > 0) {
    temp.push(`${age.months} months`);
  }
  if (age.days > 0) {
    temp.push(`${age.days} days`);
  }

  if (temp.length === 2) {
    return temp.join(' and ');
  }
  else if (temp.length === 3) {
    return `${temp[0]}, ${temp[1]}, and ${temp[2]}`;
  }
  return temp[0];
}

const name = props.dog.name;
const age = AgeToSring(props.dog.birthday);
</script>

<script lang="ts">
export default {
  name: "DogCard",
};
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
  min-width: 120px;
  flex: 1 0 0;
}

.dog-card:active {
  background-color: var(--ion-color-secondary-shade);
}

.icon {
  width: 90px;
  background-color: var(--ion-color-primary);
  border-radius: 100%;
}

.text {
  font-size: var(--fs2);
  text-align: center;
  margin: 0;
  width: 90px;
}

.name {
  font-size: var(--fs3);
  font-family: Poppins;
  font-weight: 700;
}
</style>
