<template>
  <div class="activities-section">
    <h2 class="section-title">Actividades</h2>
    <div class="activity-options-container">
      <ActivityOption
        v-for="activity in activities"
        :key="activity.id"
        :title="activity.title"
        @click="currentActivity = activity.id"
      />
    </div>

    <div v-if="currentActivity" class="current-activity-box">
      <h3 class="activity-title">{{ currentActivityData.title }}</h3>
      <p class="activity-description">{{ currentActivityData.description }}</p>
      <button class="start-activity-button" @click="startActivity(currentActivity)">
        Iniciar {{ currentActivityData.title }}
      </button>
    </div>
  </div>
</template>

<script>
import ActivityOption from '~/components/ActivityOption.vue';

export default {
  components: {
    ActivityOption,
  },
  data() {
    return {
      currentActivity: null,
      activities: [
        { id: 'crossword', title: 'Actividad 1: Crucigrama', description: 'Resuelve el crucigrama con las definiciones.' },
        { id: 'multiple-choice', title: 'Actividad 2: Selección Múltiple', description: 'Elige la respuesta correcta.' },
        { id: 'matching', title: 'Actividad 3: Emparejamiento', description: 'Une los conceptos con sus definiciones.' },
      ],
    };
  },
  computed: {
    currentActivityData() {
      return this.activities.find(activity => activity.id === this.currentActivity);
    }
  },
  methods: {
    startActivity(activityId) {
      console.log(`Iniciando actividad: ${activityId}`);
      // Aquí podrías implementar la lógica para mostrar la actividad específica
      // O navegar a una ruta de actividad individual
      // Por ahora, enviaremos los resultados a la pantalla de resultados
      this.$emit('show-results', {
        type: 'activity',
        activityId: activityId,
        score: Math.floor(Math.random() * 100) // Ejemplo de score aleatorio
      });
    },
  },
};
</script>

<style scoped>
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
}

.start-activity-button:hover {
  background-color: magenta;
}
</style>