<template>
  <div class="app-container">
    <transition name="fade" mode="out-in">
      <component
        :is="currentScreenComponent"
        @start="showMainInterface"
        @select-activity="startActivity"
        @start-exam="startExam"
        @activity-completed="showResults"
        :key="currentScreen"
      />
    </transition>

    <div v-if="showResultsScreen" class="results-overlay">
      <div class="results-card">
        <h3>Resultados de la Actividad</h3>
        <p>Actividad: <strong>{{ results.activityName }}</strong></p>
        <p>Preguntas Correctas: <strong>{{ results.correctAnswers }}</strong> / Total: <strong>{{ results.totalQuestions }}</strong></p>
        <button @click="hideResults">Volver al Menú Principal</button>
      </div>
    </div>

    <div v-if="showExamScreen" class="exam-overlay">
      <div class="exam-card">
        <h3>Examen de Inglés</h3>
        <p v-if="currentQuestionIndex < examQuestions.length">
          Pregunta {{ currentQuestionIndex + 1 }} de {{ examQuestions.length }}:
          <strong>{{ examQuestions[currentQuestionIndex].question }}</strong>
        </p>
        <input
          v-if="currentQuestionIndex < examQuestions.length"
          type="text"
          v-model="examAnswers[currentQuestionIndex]"
          placeholder="Tu respuesta aquí"
          class="exam-input"
        />
        <button
          v-if="currentQuestionIndex < examQuestions.length"
          @click="nextQuestion"
          class="exam-nav-button"
        >
          Siguiente Pregunta
        </button>
        <button
          v-else
          @click="finishExam"
          class="exam-nav-button"
        >
          Finalizar Examen
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import WelcomeScreen from '@/components/WelcomeScreen.vue';
import MainInterface from '@/components/MainInterface.vue';
import FillInTheBlanks from '@/components/activities/FillInTheBlanks.vue';
import Matching from '@/components/activities/Matching.vue';
import Crossword from '@/components/activities/Crossword.vue';

export default {
  components: {
    WelcomeScreen,
    MainInterface,
    FillInTheBlanks,
    Matching,
    Crossword,
  },
  data() {
    return {
      currentScreen: 'welcome', // 'welcome', 'main', 'activity', 'exam'
      currentActivity: null, // 'FillInTheBlanks', 'Matching', 'Crossword'
      showResultsScreen: false,
      results: {
        activityName: '',
        totalQuestions: 0,
        correctAnswers: 0,
      },
      showExamScreen: false,
      examQuestionsData: [ // Fácil de modificar
        { id: 1, question: "What is the past tense of 'go'?", answer: "went" },
        { id: 2, question: "Spell the word: 'knowledge'", answer: "knowledge" },
        { id: 3, question: "Translate 'casa' to English.", answer: "house" },
        { id: 4, question: "Fill in the blank: 'I ___ to the store yesterday.'", answer: "went" },
        { id: 5, question: "What is the plural of 'child'?", answer: "children" },
        // Agrega o quita preguntas aquí fácilmente
      ],
      examQuestions: [], // Preguntas seleccionadas para el examen
      examAnswers: [],
      currentQuestionIndex: 0,
      examResults: {
        totalQuestions: 0,
        correctAnswers: 0,
      },
    };
  },
  computed: {
    currentScreenComponent() {
      if (this.currentScreen === 'welcome') {
        return 'WelcomeScreen';
      } else if (this.currentScreen === 'main') {
        return 'MainInterface';
      } else if (this.currentScreen === 'activity' && this.currentActivity) {
        return this.currentActivity;
      } else if (this.currentScreen === 'exam') {
        // En un examen real, aquí renderizarías un componente de examen
        // Por ahora, lo manejamos con v-if para el overlay
        return 'MainInterface'; // Sigue mostrando MainInterface detrás del overlay
      }
      return null;
    },
  },
  methods: {
    showMainInterface() {
      this.currentScreen = 'main';
    },
    startActivity(activityName) {
      this.currentActivity = activityName;
      this.currentScreen = 'activity';
    },
    showResults(activityResults) {
      this.results = activityResults;
      this.showResultsScreen = true;
    },
    hideResults() {
      this.showResultsScreen = false;
      this.currentActivity = null; // Reinicia la actividad seleccionada
      this.currentScreen = 'main'; // Vuelve a la interfaz principal
    },
    startExam() {
      // Baraja las preguntas y selecciona un número si es necesario
      this.examQuestions = this.examQuestionsData.sort(() => 0.5 - Math.random());
      this.examAnswers = Array(this.examQuestions.length).fill('');
      this.currentQuestionIndex = 0;
      this.examResults = { totalQuestions: this.examQuestions.length, correctAnswers: 0 };
      this.showExamScreen = true;
      this.currentScreen = 'exam'; // Cambia el estado a 'exam' para el componente dinámico (aunque es un overlay)
    },
    nextQuestion() {
      // Valida la respuesta actual antes de avanzar (opcional)
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex >= this.examQuestions.length) {
        this.finishExam();
      }
    },
    finishExam() {
      let correctExamAnswers = 0;
      this.examQuestions.forEach((q, index) => {
        if (this.examAnswers[index].trim().toLowerCase() === q.answer.toLowerCase()) {
          correctExamAnswers++;
        }
      });
      this.examResults.correctAnswers = correctExamAnswers;

      // Muestra los resultados del examen en una pantalla de resultados separada o en el mismo overlay
      this.showResults({
        activityName: 'Examen',
        totalQuestions: this.examResults.totalQuestions,
        correctAnswers: this.examResults.correctAnswers,
      });

      this.showExamScreen = false;
      this.currentQuestionIndex = 0; // Reinicia para futuros exámenes
      this.examAnswers = []; // Limpia las respuestas
    },
  },
};
</script>

<style>
.app-container {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
  box-sizing: border-box;
}



/* Transiciones */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Overlay de resultados y examen */
.results-overlay, .exam-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.results-card, .exam-card {
  background-color: white;
  padding: 50px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 600px;
  width: 90%;
  animation: scaleIn 0.3s ease-out;
}

@keyframes scaleIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.results-card h3, .exam-card h3 {
  margin-bottom: 25px;
  font-size: 2em;
  color: rgb(255, 0, 255); /* Magenta */
}

.results-card p, .exam-card p {
  font-size: 1.3em;
  margin-bottom: 15px;
  line-height: 1.5;
}

.results-card strong {
  color: rgb(0, 145, 255); /* Azul */
}

.results-card button, .exam-card button {
  margin-top: 30px;
  padding: 15px 30px;
  font-size: 1.2em;
  background-color: rgb(255, 216, 0); /* Amarillo */
  color: #333;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.results-card button:hover, .exam-card button:hover {
  background-color: rgb(200, 170, 0); /* Amarillo más oscuro */
}

.exam-input {
  width: calc(100% - 40px);
  padding: 15px;
  font-size: 1.2em;
  border: 2px solid #ccc;
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.exam-input:focus {
  outline: none;
  border-color: rgb(0, 145, 255);
}

.exam-nav-button {
  display: block;
  width: fit-content;
  margin: 20px auto 0;
  padding: 12px 25px;
  font-size: 1.1em;
  background-color: rgb(0, 145, 255);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.exam-nav-button:hover {
  background-color: rgb(0, 100, 200);
}
</style>