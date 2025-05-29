<template>
  <div class="main-interface-container">
    <header class="header-bar">
      <h2>OVA Inglés</h2>
      <nav class="navigation-bar">
        <button @click="selectOption('contents')">Contenidos</button>
        <button @click="selectOption('activities')">Actividades</button>
        <button @click="selectOption('exam-confirm')">Iniciar Examen</button>
      </nav>
    </header>

    <main class="content-area">
      <div v-if="currentMainSection === 'contents'" class="section-container">
        <h3>Contenidos del Curso</h3>
        <p>Aquí se mostrarán los contenidos del curso de inglés.</p>
        <ul>
          <li>Lección 1: Vocabulario básico</li>
          <li>Lección 2: Gramática esencial</li>
          <li>Lección 3: Conversación</li>
        </ul>
      </div>

      <div v-else-if="currentMainSection === 'activities'" class="section-container">
        <h3>Selecciona una Actividad</h3>
        <div class="activity-buttons">
          <button @click="$emit('select-activity', 'FillInTheBlanks')">Fill In The Blanks</button>
          <button @click="$emit('select-activity', 'Matching')">Matching</button>
          <button @click="$emit('select-activity', 'Crossword')">Crossword</button>
        </div>
      </div>

      <div v-else-if="currentMainSection === 'exam-confirm'" class="section-container">
        <h3>Confirmar Inicio de Examen</h3>
        <p>¿Estás seguro de que quieres iniciar el examen?</p>
        <button @click="$emit('start-exam')">Sí, Iniciar Examen</button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'MainInterface',
  data() {
    return {
      currentMainSection: 'contents', // 'contents', 'activities', 'exam-confirm'
    };
  },
  methods: {
    selectOption(option) {
      this.currentMainSection = option;
    },
  },
};
</script>

<style>
/* components/MainInterface.vue */
.main-interface-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px); /* Ajusta según el tamaño del footer */
  background-color: #f8f8ff; /* Color de fondo suave */
  box-sizing: border-box;
}

.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #007bff; /* Azul oscuro para la barra superior */
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.header-bar h2 {
  margin: 0;
  color: white; /* El h2 tiene su propio color en main.css, pero lo sobrescribimos aquí */
}

.navigation-bar button {
  background-color: transparent;
  color: white;
  border: 1px solid white;
  padding: 10px 20px;
  margin-left: 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.navigation-bar button:hover {
  background-color: white;
  color: #007bff;
}

.content-area {
  flex-grow: 1;
  padding: 30px;
  overflow-y: auto; /* Permite scroll si el contenido es largo */
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Alinea el contenido arriba */
}

.section-container {
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  max-width: 800px;
  width: 100%;
  text-align: center;
}

.section-container h3 {
  margin-bottom: 25px;
  font-size: 1.8em;
}

.section-container p {
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 1.1em;
}

.section-container ul {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.section-container li {
  background-color: #e9ecef;
  margin-bottom: 10px;
  padding: 12px;
  border-radius: 5px;
  font-size: 1.05em;
}

.activity-buttons button {
  background-color: rgb(255, 216, 0); /* Amarillo */
  color: #333;
  padding: 15px 25px;
  margin: 0 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1em;
  transition: background-color 0.3s ease;
}

.activity-buttons button:hover {
  background-color: rgb(200, 170, 0); /* Amarillo más oscuro al pasar el ratón */
}
</style>