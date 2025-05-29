<template>
  <div class="activity-container">
    <h3>Completa los Espacios en Blanco</h3>
    <div v-for="(question, index) in currentQuestions" :key="index" class="question-item">
      <p class="question-text">{{ question.text.replace('___', '______') }}</p>
      <input
        type="text"
        v-model="answers[index]"
        @input="checkAnswer(index)"
        :class="{ 'correct': isCorrect[index] === true, 'incorrect': isCorrect[index] === false }"
        placeholder="Tu respuesta aquí"
      />
    </div>
    <button @click="submitActivity">Terminar Actividad</button>
  </div>
</template>

<script>
export default {
  name: 'FillInTheBlanks',
  data() {
    return {
      questions: [
        { id: 1, text: "The capital of France is ___.", answer: "Paris" },
        { id: 2, text: "The sun rises in the ___.", answer: "east" },
        { id: 3, text: "An apple a day keeps the ___ away.", answer: "doctor" },
        // Puedes agregar más preguntas aquí
      ],
      currentQuestions: [], // Preguntas a mostrar
      answers: [],
      isCorrect: [], // true, false, or null for unchecked
    };
  },
  mounted() {
    this.loadQuestions();
  },
  methods: {
    loadQuestions() {
      // Barajar y seleccionar un número limitado de preguntas si lo deseas
      this.currentQuestions = this.questions.sort(() => 0.5 - Math.random()).slice(0, 3); // Muestra 3 preguntas
      this.answers = Array(this.currentQuestions.length).fill('');
      this.isCorrect = Array(this.currentQuestions.length).fill(null);
    },
    checkAnswer(index) {
      const userAnswer = this.answers[index].trim().toLowerCase();
      const correctAnswer = this.currentQuestions[index].answer.toLowerCase();
      this.isCorrect[index] = userAnswer === correctAnswer;
      // For immediate feedback
      this.$forceUpdate(); // For reactivity with array indices
    },
    submitActivity() {
      let correctCount = 0;
      this.currentQuestions.forEach((q, index) => {
        if (this.isCorrect[index] === true) {
          correctCount++;
        }
      });
      this.$emit('activity-completed', {
        activityName: 'Fill In The Blanks',
        totalQuestions: this.currentQuestions.length,
        correctAnswers: correctCount,
      });
    },
  },
};
</script>

<style>
/* components/activities/FillInTheBlanks.vue */
.activity-container {
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  max-width: 700px;
  margin: 30px auto;
  text-align: center;
}

.activity-container h3 {
  margin-bottom: 30px;
  font-size: 1.8em;
}

.question-item {
  margin-bottom: 25px;
  text-align: left;
}

.question-text {
  font-size: 1.2em;
  margin-bottom: 10px;
  font-weight: bold;
}

.question-item input {
  width: calc(100% - 20px);
  padding: 12px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 1.1em;
  transition: border-color 0.3s ease;
}

.question-item input.correct {
  border-color: #28a745; /* Verde para correcto */
}

.question-item input.incorrect {
  border-color: #dc3545; /* Rojo para incorrecto */
}

.question-item input:focus {
  outline: none;
  border-color: #007bff;
}

.activity-container button {
  margin-top: 30px;
  padding: 15px 30px;
  font-size: 1.2em;
  background-color: rgb(0, 145, 255); /* Azul */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.activity-container button:hover {
  background-color: rgb(0, 100, 200);
}
</style>