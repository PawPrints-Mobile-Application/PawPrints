<template>
  <LayoutPage>
    <header>
      <ButtonRippled v-show="page >= 2" @click="Move(-1)">
        <ButtonBack /> <TextSubheading>Back</TextSubheading>
      </ButtonRippled>
      <ButtonRippled v-show="page >= 2 && page < 5" @click="Navigate">
        <TextSubheading>Skip</TextSubheading><ButtonNext />
      </ButtonRippled>
    </header>
    <main>
      <section class="main-content">
        <section class="welcome-section" v-if="page === 1">
          <TextHeading>
            {{ data[page - 1].title }}
          </TextHeading>
          <Avatar />
          <section class="subheading">
            <TextSubheading>
              {{ data[page - 1].subheading1 }}
            </TextSubheading>
            <TextSubheading>
              {{ data[page - 1].subheading2 }}
            </TextSubheading>
          </section>
          <br /><ButtonText
            value="Get Started"
            @click="() => (page === max ? Navigate() : Move(1))"
          /><br />
        </section>
        <section class="next-section" v-else>
          <section class="picture">
            <img :src="data[page - 1].picture" />
          </section>
          <section class="subheading">
            <TextSubheading>
              {{ data[page - 1].subtitle }}
            </TextSubheading>
            <TextParagraph>
              {{ data[page - 1].description }}
            </TextParagraph>
          </section>
          <br /><ButtonText
            :value="data[page - 1].button"
            @click="() => (page === max ? Navigate() : Move(1))"
          /><br />
        </section>
        <PageCounter :max="max" :page="page" design="circle" />
      </section>
    </main>
  </LayoutPage>
</template>
<script setup lang="ts">
import { LayoutPage } from "../../layout";
import { Avatar } from "../../components";
import {
  ButtonText,
  ButtonRippled,
  ButtonBack,
  ButtonNext,
} from "../../components";
import { TextHeading, TextParagraph, TextSubheading } from "../../components";
import { PageCounter } from "../../components";
import {
  tutorialPage2,
  tutorialPage3,
  tutorialPage4,
  tutorialPage5,
} from "../../assets";
import { ref } from "vue";
import { useIonRouter } from "@ionic/vue";

const ionRouter = useIonRouter();

const Navigate = () => ionRouter.navigate("/Dogs", "forward", "replace");

const Move = (increment: number) => {
  page.value += increment;
};
const data = [
  {
    title: "Welcome to PawPrints",
    subheading1: "Your Ultimate Canine",
    subheading2: "Companion Care App",
    button: "Get Started",
  },
  {
    picture: tutorialPage2,
    subtitle: "Holistic Health Monitoring",
    description:
      "Record your dog's vaccinations, set medication reminders and schedule their activities effortlessly.",
    button: "Continue",
  },
  {
    picture: tutorialPage3,
    subtitle: "Join the Pawsome Community",
    description:
      "Connect with like-minded dog lovers, share tips, and seek advice in our vibrant community forum.",
    button: "Continue",
  },
  {
    picture: tutorialPage4,
    subtitle: "Locate Nearby Vet Clinics",
    description:
      "In times of need, finding a trustworthy vet is crucial. PawPrints makes this easier by locating nearby veterinary facilities.",
    button: "Continue",
  },
  {
    picture: tutorialPage5,
    description:
      "Embark on a journey of unparalleled canine care with PawPrints to keep your furry friend happy, healthy, and full of tail-wagging vitality!",
    button: "Get Started",
  },
];

const max = data.length;
const page = ref(1);
</script>
<style scoped></style>
<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 90%;
  gap: 20px;
}
.layout-page {
  --background-color: var(--theme-tertiary-background);
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 20px;
}
.button-rippled {
  background-color: var(--theme-primary-background);

  > .text-subheading {
    font-weight: 700;
  }
}
.main-content {
  width: 100%;
  gap: 10px;
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
}
.welcome-section {
  width: 100%;
  gap: 10px;
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
}

.next-section {
  width: 90%;
  gap: 10px;
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;

  .text-subheading {
    font-weight: 700;
    color: var(--theme-primary-text);
    text-align: left;
  }
  .text-paragraph {
    font-family: Poppins;
    color: var(--theme-primary-text);
    text-align: justify;
    padding-top: 20px;
  }
}

.next-section .picture img {
  transform: scale(1.2);
  padding-bottom: 20px;
}

.avatar {
  --size: 250px;
}
.logo {
  position: relative;
  align-items: center;
}
.text-heading {
  text-align: center;
  font-weight: bold;
  color: var(--theme-primary-text);
}
.text-subheading {
  font-family: Poppins;
  font-weight: 400;
  text-align: center;
  color: var(--theme-primary-text);
}
.button-text {
  background-color: var(--theme-tertiary-background);
  color: var(--theme-tertiary-text);
}
</style>
