<template>
  <div style="padding: 20px;">
    <h2>Evaluación</h2>
    <div v-for="(question, index) in questions" :key="index" style="margin-bottom: 20px; border: 1px solid #eee; padding: 15px;">
      <QuestionItem :question="question" />
    </div>
    <button @click="submitQuiz" style="padding: 10px 15px; font-size: 16px; cursor: pointer;">Enviar Evaluación</button>
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
      // Este array de preguntas y respuestas es fácil de modificar
      questions: [
        {
          text: '¿Cuál es el concepto básico 1?',
          options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
          correctAnswer: 'Opción A',
        },
        {
          text: '¿Qué significa el término clave 2?',
          options: ['Definición 1', 'Definición 2', 'Definición 3'],
          correctAnswer: 'Definición 2',
        },
        {
          text: 'Pregunta de verdadero o falso: ...',
          options: ['Verdadero', 'Falso'],
          correctAnswer: 'Verdadero',
        },
      ],
    };
  },
  methods: {
    submitQuiz() {
      // Aquí puedes agregar la lógica para revisar las respuestas
      alert('Evaluación enviada. ¡Gracias!');
    },
  },
};
</script>