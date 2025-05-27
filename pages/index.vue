<template>
  <div>
    <WelcomeScreen v-if="!showMainInterface" @enter="showMainInterface = true" />

    <template v-else>
      <MainInterface
        v-if="!showResults"
        @show-contents="currentSection = 'contents'"
        @show-activities="currentSection = 'activities'"
        @show-evaluation="currentSection = 'evaluation'"
      />

      <ContentsSection v-if="currentSection === 'contents' && !showResults" />

      <ActivitiesSection
        v-if="currentSection === 'activities' && !showResults"
        @show-results="displayResults"
      />

      <EvaluationSection
        v-if="currentSection === 'evaluation' && !showResults"
        @show-results="displayResults"
      />

      <ResultsScreen
        v-if="showResults"
        :results="currentResults"
        @go-back="resetApplication"
      />
    </template>
  </div>
</template>

<script>
import WelcomeScreen from '~/components/WelcomeScreen.vue';
import MainInterface from '~/components/MainInterface.vue';
import ContentsSection from '~/components/ContentsSection.vue';
import ActivitiesSection from '~/components/ActivitiesSection.vue';
import EvaluationSection from '~/components/EvaluationSection.vue';
import ResultsScreen from '~/components/ResultsScreen.vue'; // Importar el nuevo componente

export default {
  components: {
    WelcomeScreen,
    MainInterface,
    ContentsSection,
    ActivitiesSection,
    EvaluationSection,
    ResultsScreen,
  },
  data() {
    return {
      showMainInterface: false,
      currentSection: null,
      showResults: false,
      currentResults: {},
    };
  },
  methods: {
    displayResults(results) {
      this.currentResults = results;
      this.showResults = true;
      this.currentSection = null; // Oculta la sección actual
    },
    resetApplication() {
      this.showResults = false;
      this.currentResults = {};
      this.currentSection = null;
      // Puedes optar por volver al menú principal o a la pantalla de bienvenida
      // this.showMainInterface = false; // Para volver a la pantalla de bienvenida
    },
  },
};
</script>

<style>
/* Aquí puedes importar tu CSS global si es necesario */
@import '~/assets/css/main.css';

/* Puedes añadir estilos generales de la página aquí */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
  color: #333;
}
</style>