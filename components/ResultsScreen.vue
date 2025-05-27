<template>
  <div class="results-screen">
    <h2 class="results-title">Resultados</h2>

    <div v-if="results.type === 'activity'" class="result-box">
      <p class="result-type">Resultados de Actividad</p>
      <p>Actividad: <strong>{{ results.activityId }}</strong></p>
      <p>Puntaje: <strong>{{ results.score }}%</strong></p>
      <p v-if="results.score >= 70" class="success-message">¡Felicidades, has completado la actividad con éxito!</p>
      <p v-else class="fail-message">Puedes intentar esta actividad de nuevo para mejorar tu puntaje.</p>
    </div>

    <div v-else-if="results.type === 'evaluation'" class="result-box">
      <p class="result-type">Resultados de Evaluación</p>
      <p>Puntaje: <strong>{{ results.score }}%</strong></p>
      <p>Respuestas Correctas: <strong>{{ results.correctAnswers }}</strong> de <strong>{{ results.totalQuestions }}</strong></p>
      <p v-if="results.score >= 70" class="success-message">¡Excelente trabajo en tu evaluación!</p>
      <p v-else class="fail-message">Sigue estudiando, puedes mejorar tus resultados en la próxima evaluación.</p>
    </div>

    <p v-else class="no-results-message">No hay resultados para mostrar.</p>

    <button class="back-button" @click="$emit('go-back')">Volver al Menú Principal</button>
  </div>
</template>

<script>
export default {
  props: {
    results: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['go-back'],
};
</script>

<style scoped>
.results-screen {
  padding: 40px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  margin: 30px auto;
  max-width: 600px;
  text-align: center;
}

.results-title {
  margin-bottom: 30px;
  font-size: 2.8em;
  border-bottom: 2px solid rgb(255, 232, 0);
  padding-bottom: 10px;
  display: inline-block;
}

.result-box {
  background-color: rgb(191, 191, 191);
  border: 1px solid rgb(154, 154, 154);
  border-left: 5px solid rgb(255, 232, 0);
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 30px;
  text-align: left;
}

.result-type {
  font-size: 1.5em;
  margin-bottom: 15px;
  font-weight: bold;
}

.result-box p {
  font-size: 1.1em;
  margin-bottom: 10px;
  color: #000000;
}

.result-box strong {
  color: magenta;
}

.success-message {
  color: rgb(0, 180, 0);
  font-weight: bold;
  margin-top: 20px;
  font-size: 1.2em;
}

.fail-message {
  color: red;
  font-weight: bold;
  margin-top: 20px;
  font-size: 1.2em;
}

.no-results-message {
  color: #777;
  font-size: 1.2em;
  margin-bottom: 30px;
}

.back-button {
  padding: 15px 30px;
  font-size: 1.2em;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background-color: #000000;
  color: white;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: magenta;
}
</style>