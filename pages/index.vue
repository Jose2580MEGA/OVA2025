<template>
  <div>
    <WelcomeScreen v-if="!showMainInterface" @enter="showMainInterface = true" />
    <MainInterface v-else
      @show-contents="currentSection = 'contents'"
      @show-activities="currentSection = 'activities'"
      @show-evaluation="currentSection = 'evaluation'"
    />
    <ContentsSection v-if="currentSection === 'contents'" />
    <ActivitiesSection v-if="currentSection === 'activities'" />
    <EvaluationSection v-if="currentSection === 'evaluation'" />
  </div>
</template>

<script>
import WelcomeScreen from '~/components/WelcomeScreen.vue';
import MainInterface from '~/components/MainInterface.vue';
import ContentsSection from '~/components/ContentsSection.vue';
import ActivitiesSection from '~/components/ActivitiesSection.vue';
import EvaluationSection from '~/components/EvaluationSection.vue';

export default {
  components: {
    WelcomeScreen,
    MainInterface,
    ContentsSection,
    ActivitiesSection,
    EvaluationSection,
  },
  data() {
    return {
      showMainInterface: false,
      currentSection: null,
    };
  },
};
</script>