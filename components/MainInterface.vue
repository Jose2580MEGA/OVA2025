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
        <p>Pasado.</p>
        <ul>
          <li>Verbos regulares</li>
          <li>verbos irregulares</li>
          <li>Did, Was y Were</li>
        </ul>
      </div>

      <div v-else-if="currentMainSection === 'activities'" class="section-container">
        <h3>Selecciona una Actividad</h3>
        <br><br>
        <div class="activity-buttons">
          <button @click="$emit('select-activity', 'FillInTheBlanks')">Fill In The Blanks</button>
          <button @click="$emit('select-activity', 'Matching')">Matching</button>
          <button @click="$emit('select-activity', 'Crossword')">Crossword</button>
        </div>
        <br><br><br><br><br><br>
      </div>

      <div v-else-if="currentMainSection === 'exam-confirm'" class="section-container">
        <h3>Confirmar Inicio de Examen</h3>
        <p>¿Estás seguro de que quieres iniciar el examen?</p>
        <button @click="$emit('start-exam')">Sí, Iniciar Examen</button>
        <br><br><br><br><br><br>
      </div>
    </main>
  </div>
  
  <div class="internal-footer">
      <p>Proyecto de Cuarto Semestre de Licenciatura en Informatica en la Universidad de Cordoba</p>
      <img src="" alt="Logo de la Universidad" class="university-logo-internal" />
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
  flex-grow: 1; /* ¡Este es el que debe crecer y empujar el contenido hacia abajo! */
  box-sizing: border-box;
  width: 100%;
}

.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: black;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.header-bar h2 {
  margin: 0;
}

.navigation-bar button {
  background-color: magenta;
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
  color: black;
}

.content-area {
  flex-grow: 1;
  padding: 30px;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.section-container {
  background-color: rgb(0, 145, 255);
  padding: 5vh;
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

button {
  background-color: rgb(0, 145, 255);
  color: #333;
  padding: 15px 25px;
  margin: 0 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1em;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: magenta;
}

.internal-footer {
  width: 100%;
  padding: 15px 0; /* Un poco menos de padding que el footer global */
  background-color: #444; /* Un color ligeramente diferente para diferenciar */
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  height: 40px;
  flex-shrink: 0;
  margin-top: 10vh;
}

.university-logo-internal {
  height: 35px; /* Ajusta tamaño */
  object-fit: contain;
}
</style>