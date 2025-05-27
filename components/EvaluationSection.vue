<template>
  <div class="evaluation-section">
    <h2 class="section-title">Evaluación</h2>
    <div v-for="(question, index) in questions" :key="index" class="question-item-container">
      <QuestionItem :question="question" @answer-selected="handleAnswer(index, $event)" />
    </div>
    <button class="submit-button" @click="submitQuiz">Enviar Evaluación</button>
  </div>
</template>

<script>
import QuestionItem from '~/components/QuestionItem.vue';

export default {
  components: {
    QuestionItem,
  },
  data() {
    return {
      questions: [
        {
          text: '¿Cuál es el concepto básico 1?',
          options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
          correctAnswer: 'Opción A',
          selectedAnswer: null, // Para guardar la respuesta del usuario
        },
        {
          text: '¿Qué significa el término clave 2?',
          options: ['Definición 1', 'Definición 2', 'Definición 3'],
          correctAnswer: 'Definición 2',
          selectedAnswer: null,
        },
        {
          text: 'Pregunta de verdadero o falso: El agua es un compuesto.',
          options: ['Verdadero', 'Falso'],
          correctAnswer: 'Verdadero',
          selectedAnswer: null,
        },
      ],
    };
  },
  methods: {
    handleAnswer(questionIndex, answer) {
      this.questions[questionIndex].selectedAnswer = answer;
    },
    submitQuiz() {
      let score = 0;
      this.questions.forEach(question => {
        if (question.selectedAnswer === question.correctAnswer) {
          score++;
        }
      });
      const totalQuestions = this.questions.length;
      const percentage = (score / totalQuestions) * 100;

      this.$emit('show-results', {
        type: 'evaluation',
        score: percentage.toFixed(2), // Porcentaje con 2 decimales
        totalQuestions: totalQuestions,
        correctAnswers: score,
      });
    },
  },
};
</script>

<style scoped>
.evaluation-section {
  padding: 30px;
  background-color: rgb(191, 191, 191);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  max-width: 900px;
}

.section-title {
  margin-bottom: 25px;
  text-align: center;
  font-size: 2.2em;
}

.question-item-container {
  margin-bottom: 25px;
  border: 1px solid rgb(191, 191, 191);
  border-radius: 8px;
  padding: 20px;
  background-color: rgb(154, 154, 154);
}

.submit-button {
  display: block;
  margin: 30px auto 0;
  padding: 12px 30px;
  font-size: 1.1em;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  background-color: rgb(0, 0, 0);
  color: white;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: magenta;
}
</style>