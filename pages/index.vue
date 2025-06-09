<template>
  <div class="app-container">
    <transition name="fade" mode="out-in">
      <component
        :is="currentScreenComponent"
        @start="showMainInterface"
        @select-main-section="handleMainSectionSelection" 
        @select-activity="startActivity"
        @start-exam="startExam"
        @activity-completed="showResults"
        :currentMainSectionProp="currentMainSectionInMain" 
        :activityData="getCurrentActivityData" 
        :key="currentScreenComponent === 'MainInterface' ? currentMainSectionInMain : currentScreen"
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
    
    <div class="internal-footer">
      <p>Proyecto de Cuarto Semestre de Licenciatura en Informatica en la Universidad de Cordoba</p>
      <img src="https://www.unicordoba.edu.co/wp-content/uploads/2025/04/Escudo-unicordoba-2025.png" alt="Logo de la Universidad" class="university-logo-internal" />
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
      currentMainSectionInMain: 'contents', // Controla la sección interna de MainInterface
      showResultsScreen: false,
      results: {
        activityName: '',
        totalQuestions: 0,
        correctAnswers: 0,
      },
      showExamScreen: false,
      examQuestionsData: [
        { id: 1, question: "What is the past tense of 'go'?", answer: "went" },
        { id: 2, question: "What did you do last night?", answer: "slept" },
        { id: 3, question: "What did you do in class?", answer: "learned" },
        { id: 4, question: "Fill in the blank: 'I ___ videogames with a friend yesterday.'", answer: "played" },
        { id: 5, question: "When something breaks, now it's...", answer: "broken" },
        { id: 6, question: "What is the past tense of 'eat'?", answer: "ate" },
        { id: 7, question: "Fill in the blank: 'I was tired when i ___ home from the gym.'", answer: "came" },
        { id: 8, question: "What did you do at the bridge?", answer: "walked" },
        { id: 9, question: "Fill in the blank: 'I ___ at that amusement park last week.'", answer: "enjoyed" },
        { id: 10, question: "When something gets dirty it has to be...", answer: "washed" },
      ],
      examQuestions: [],
      examAnswers: [],
      currentQuestionIndex: 0,
      examResults: {
        totalQuestions: 0,
        correctAnswers: 0,
      },
      activitiesData: {
        FillInTheBlanks: [
          { id: 1, sentence: "I ___ (go) to the park yesterday.", answer: "went" },
          { id: 2, sentence: "She ___ (eat) dinner early.", answer: "ate" },
          { id: 3, sentence: "They ___ (study) for the exam.", answer: "studied" },
          { id: 4, sentence: "He ___ (have) to leave.", answer: "had" },
          { id: 5, sentence: "You ___ (do) have to see that.", answer: "didn't" },
        ],
        Matching: [
          { id: 1, word: "Slept", answerLetter: "a" },
          { id: 2, word: "Watched", answerLetter: "b" },
          { id: 3, word: "Thought", answerLetter: "c" },
          { id: 4, word: "Drank", answerLetter: "d" },
          { id: 5, word: "Folded", answerLetter: "e" }
        ],
        MatchingDefinitions: [ 
          { letter: "a", definition: "Past tense of 'Sleep'" },
          { letter: "b", definition: "Past tense of 'Watch'" },
          { letter: "c", definition: "Past tense of 'Think'" },
          { letter: "d", definition: "Past tense of 'Drink'" },
          { letter: "e", definition: "Past tense of 'Fold'" }
        ],
        Crossword: []
      }
    };
  },
  computed: {
    currentScreenComponent() {
      if (this.currentScreen === 'welcome') {
        return WelcomeScreen;
      } else if (this.currentScreen === 'activity' && this.currentActivity) {
        switch (this.currentActivity) {
          case 'FillInTheBlanks':
            return FillInTheBlanks;
          case 'Matching':
            return Matching;
          case 'Crossword':
            return Crossword;
          default:
            console.warn(`Actividad desconocida: ${this.currentActivity}. Volviendo a MainInterface.`);
            return MainInterface;
        }
      } else {
        return MainInterface;
      }
    },
    getCurrentActivityData() {
        if (this.currentActivity === 'Matching') {
            console.log('Index.vue: Pasando datos para Matching:', {
                words: this.activitiesData.Matching,
                definitions: this.activitiesData.MatchingDefinitions
            });
            return {
                words: this.activitiesData.Matching,
                definitions: this.activitiesData.MatchingDefinitions
            };
        } else if (this.currentActivity && this.activitiesData[this.currentActivity]) {
            console.log(`Index.vue: Pasando datos para ${this.currentActivity}:`, this.activitiesData[this.currentActivity]);
            return this.activitiesData[this.currentActivity];
        }
        console.log('Index.vue: No hay datos de actividad para pasar o actividad no reconocida.');
        return null;
    }
  },
  methods: {
    showMainInterface() {
      this.currentScreen = 'main';
      this.currentMainSectionInMain = 'contents';
    },
    handleMainSectionSelection(section) {
      this.currentMainSectionInMain = section;
      this.currentScreen = 'main';
    },
    startActivity(activityName) {
      this.currentActivity = activityName;
      console.log('Index.vue: Iniciando actividad:', activityName);
      this.currentScreen = 'activity';
    },
    showResults(activityResults) {
      this.results = activityResults;
      this.showResultsScreen = true;
      // Ajuste para el overlay del examen, que también usa showResults
      if (activityResults.activityName === 'Examen') {
        this.showExamScreen = false; // Cierra el overlay del examen
      }
    },
    hideResults() {
      this.showResultsScreen = false;
      this.currentActivity = null;
      this.currentScreen = 'main';
      this.currentMainSectionInMain = 'contents';
    },
    startExam() {
      this.examQuestions = this.examQuestionsData.sort(() => 0.5 - Math.random());
      this.examAnswers = Array(this.examQuestions.length).fill('');
      this.currentQuestionIndex = 0;
      this.examResults = { totalQuestions: this.examQuestions.length, correctAnswers: 0 };
      this.showExamScreen = true;
      this.currentScreen = 'exam';
    },
    nextQuestion() {
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

      // Usar showResults para mostrar el resultado del examen
      this.showResults({
        activityName: 'Examen',
        totalQuestions: this.examResults.totalQuestions,
        correctAnswers: this.examResults.correctAnswers,
      });

      // No se oculta el overlay aquí, lo hace showResults si activityName es 'Examen'
      this.currentQuestionIndex = 0;
      this.examAnswers = [];
    },
  },
};
</script>

<style>
/* ... (Tus estilos de Index.vue sin cambios adicionales) ... */
.app-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
  box-sizing: border-box;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

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
  color: rgb(255, 0, 255);
}

.results-card p, .exam-card p {
  font-size: 1.3em;
  margin-bottom: 15px;
  line-height: 1.5;
}

.results-card strong {
  color: rgb(0, 145, 255);
}

.results-card button, .exam-card button {
  margin-top: 30px;
  padding: 15px 30px;
  font-size: 1.2em;
  background-color: rgb(255, 216, 0);
  color: #333;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.results-card button:hover, .exam-card button:hover {
  background-color: rgb(200, 170, 0);
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

.internal-footer {
  width: 100%;
  padding: 15px 0;
  background-color: rgb(200, 200, 200);
  color: black;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  height: 40px;
  flex-shrink: 0;
  margin-top: auto;
}

.university-logo-internal {
  height: 35px;
  object-fit: contain;
}
</style>