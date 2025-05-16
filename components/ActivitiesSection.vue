<template>
  <div style="padding: 20px;">
    <h2>Actividades</h2>
    <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">
      <ActivityOption title="Actividad 1: Crucigrama" @click="currentActivity = 'crossword'" />
      <ActivityOption title="Actividad 2: Selección Múltiple" @click="currentActivity = 'multiple-choice'" />
      <ActivityOption title="Actividad 3: Emparejamiento" @click="currentActivity = 'matching'" />
    </div>

    <div v-if="currentActivity === 'crossword'" style="margin-top: 20px; border: 1px solid #ccc; padding: 15px;">
      <h3>Crucigrama</h3>
      <p>Aquí puedes describir la actividad del crucigrama.</p>
      <button @click="startActivity('crossword')">Iniciar Crucigrama</button>
      </div>

    <div v-if="currentActivity === 'multiple-choice'" style="margin-top: 20px; border: 1px solid #ccc; padding: 15px;">
      <h3>Selección Múltiple</h3>
      <p>Aquí puedes describir la actividad de selección múltiple.</p>
      <button @click="startActivity('multiple-choice')">Iniciar Selección Múltiple</button>
      </div>

    <div v-if="currentActivity === 'matching'" style="margin-top: 20px; border: 1px solid #ccc; padding: 15px;">
      <h3>Emparejamiento</h3>
      <p>Aquí puedes describir la actividad de emparejamiento.</p>
      <button @click="startActivity('matching')">Iniciar Emparejamiento</button>
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
      // Aquí podrías tener un array de actividades personalizables
      activities: [
        { id: 'crossword', title: 'Crucigrama', description: 'Resuelve el crucigrama con las definiciones.' },
        { id: 'multiple-choice', title: 'Selección Múltiple', description: 'Elige la respuesta correcta.' },
        { id: 'matching', title: 'Emparejamiento', description: 'Une los conceptos con sus definiciones.' },
      ],
    };
  },
  methods: {
    startActivity(activityId) {
      console.log(`Iniciando actividad: ${activityId}`);
      // Aquí podrías implementar la lógica para mostrar la actividad específica
    },
  },
};
</script>