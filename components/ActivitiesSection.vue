<template>
  <div class="activities-section">
    <h2 class="section-title">Actividades</h2>
    <div class="activity-options-container" v-if="!currentActivityComponent">
      <ActivityOption
        v-for="activity in activities"
        :key="activity.id"
        :title="activity.title"
        @click="selectActivity(activity.id)"
      />
    </div>

    <div v-if="selectedActivityData && !currentActivityComponent" class="current-activity-box">
      <h3 class="activity-title">{{ selectedActivityData.title }}</h3>
      <p class="activity-description">{{ selectedActivityData.description }}</p>
      <button class="start-activity-button" @click="startActivityComponent(selectedActivityData.id)">
        Iniciar {{ selectedActivityData.title }}
      </button>
      <button class="back-button" @click="selectedActivityData = null">Volver</button>
    </div>

    <component
      :is="currentActivityComponent"
      v-if="currentActivityComponent"
      :activity-data="currentActivityComponentData"
      @activity-completed="handleActivityCompletion"
      @go-back="cancelActivity"
    />
  </div>
</template>

<script>
import ActivityOption from '~/components/ActivityOption.vue';
// Importa los nuevos componentes de actividad
import CrosswordActivity from '~/components/activities/CrosswordActivity.vue';
import MatchingActivity from '~/components/activities/MatchingActivity.vue';
import FillInTheBlanksActivity from '~/components/activities/FillInTheBlanksActivity.vue';

export default {
  components: {
    ActivityOption,
    CrosswordActivity, // Asegúrate de registrarlos
    MatchingActivity,
    FillInTheBlanksActivity,
  },
  data() {
    return {
      selectedActivityData: null, // Guarda los datos de la actividad seleccionada para mostrar su descripción
      currentActivityComponent: null, // Nombre del componente de actividad a cargar
      currentActivityComponentData: null, // Datos específicos para el componente de actividad
      activities: [
        { id: 'crossword', title: 'Actividad 1: Crucigrama', description: 'Resuelve el crucigrama con las definiciones.' },
        { id: 'matching', title: 'Actividad 2: Conectar Palabras', description: 'Une los conceptos con sus definiciones correctas.' },
        { id: 'fill-in-the-blanks', title: 'Actividad 3: Rellenar Espacios', description: 'Completa el texto con las palabras o respuestas correctas.' },
      ],
    };
  },
  methods: {
    selectActivity(activityId) {
      this.selectedActivityData = this.activities.find(activity => activity.id === activityId);
    },
    startActivityComponent(activityId) {
      switch (activityId) {
        case 'crossword':
          this.currentActivityComponent = 'CrosswordActivity';
          this.currentActivityComponentData = this.getCrosswordData(); // Obtener datos del crucigrama
          break;
        case 'matching':
          this.currentActivityComponent = 'MatchingActivity';
          this.currentActivityComponentData = this.getMatchingData(); // Obtener datos de emparejamiento
          break;
        case 'fill-in-the-blanks':
          this.currentActivityComponent = 'FillInTheBlanksActivity';
          this.currentActivityComponentData = this.getFillInTheBlanksData(); // Obtener datos para rellenar espacios
          break;
        default:
          this.currentActivityComponent = null;
          this.currentActivityComponentData = null;
      }
      this.selectedActivityData = null; // Oculta la descripción una vez que se inicia la actividad
    },
    handleActivityCompletion(results) {
      // Cuando una actividad individual emite 'activity-completed', pasamos los resultados a `index.vue`
      this.$emit('show-results', {
        type: 'activity',
        activityId: results.activityId,
        score: results.score,
        details: results.details || {} // Para detalles adicionales si los hay
      });
      this.currentActivityComponent = null; // Oculta el componente de actividad
      this.currentActivityComponentData = null;
    },
    cancelActivity() {
      // Método para volver a la lista de actividades
      this.currentActivityComponent = null;
      this.currentActivityComponentData = null;
      this.selectedActivityData = null; // Vuelve a mostrar las opciones de actividad
    },
    // --- Datos de actividades de ejemplo (en una app real, estos podrían venir de una API) ---
    getCrosswordData() {
      return {
        title: 'Crucigrama de Términos Web',
        definitions: [
          { clue: 'Lenguaje de marcado para la web.', answer: 'HTML', orientation: 'across', row: 0, col: 0 },
          { clue: 'Estiliza los documentos web.', answer: 'CSS', orientation: 'down', row: 0, col: 0 },
          { clue: 'Añade interactividad a las páginas.', answer: 'JAVASCRIPT', orientation: 'across', row: 2, col: 2 },
          { clue: 'Marco de trabajo de JS muy popular.', answer: 'VUE', orientation: 'down', row: 0, col: 5 },
        ],
        gridSize: { rows: 8, cols: 12 }
      };
    },
    getMatchingData() {
      return {
        title: 'Conectar Conceptos de Programación',
        pairs: [
          { left: 'Variable', right: 'Espacio de memoria para almacenar datos.' },
          { left: 'Función', right: 'Bloque de código reusable.' },
          { left: 'Array', right: 'Colección ordenada de elementos.' },
          { left: 'Bucle', right: 'Repetir un bloque de código.' },
          { left: 'Condicional', right: 'Ejecutar código según una condición.' },
        ]
      };
    },
    getFillInTheBlanksData() {
      return {
        title: 'Rellenar Espacios: Historia de la Computación',
        type: 'drag-and-drop', // Puede ser 'drag-and-drop', 'select', o 'text-input'
        text: 'La primera computadora electrónica digital fue la [ENIAC], construida en [1945]. Ada Lovelace es considerada la primera [programadora].',
        blanks: [
          { id: 'blank1', correct: 'ENIAC', options: ['ENIAC', 'UNIVAC', 'ABC'] },
          { id: 'blank2', correct: '1945', options: ['1930', '1945', '1955'] },
          { id: 'blank3', correct: 'programadora', options: ['ingeniera', 'programadora', 'matemática'] },
        ],
        // Opciones adicionales para 'drag-and-drop'
        wordBank: ['ENIAC', 'programadora', '1945', 'máquina', 'código'],
      };
    }
  },
};
</script>

<style scoped>
/* Estilos existentes de ActivitiesSection.vue */
.activities-section {
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

.activity-options-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
  align-items: center;
}

.current-activity-box {
  margin-top: 30px;
  border: 1px solid rgb(154, 154, 154);
  border-radius: 8px;
  padding: 20px;
  background-color: rgb(154, 154, 154);
  text-align: center;
}

.activity-title {
  margin-bottom: 15px;
  font-size: 1.8em;
  color: #333; /* Ajustado para mejor contraste */
}

.activity-description {
  margin-bottom: 20px;
  color: rgb(0, 0, 0);
  font-size: 1.1em;
  font-family: "Eras ITC", sans-serif;
}

.start-activity-button {
  padding: 12px 25px;
  font-size: 1.1em;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  background-color: rgb(0, 0, 0);
  color: white;
  transition: background-color 0.3s ease;
  margin-right: 10px; /* Espacio entre botones */
}

.start-activity-button:hover {
  background-color: magenta;
}

.back-button {
  padding: 12px 25px;
  font-size: 1.1em;
  cursor: pointer;
  border: 1px solid #333; /* Borde oscuro */
  border-radius: 6px;
  background-color: transparent; /* Fondo transparente */
  color: #333; /* Texto oscuro */
  transition: all 0.3s ease;
}

.back-button:hover {
  background-color: #333;
  color: white;
}
</style>