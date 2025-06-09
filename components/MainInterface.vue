<template>
  <div class="main-interface-container">
    <header class="header-bar">
      <h2>OVA English</h2>
      <nav class="navigation-bar">
        <button @click="selectOptionAndEmit('contents')">Contenidos</button>
        <button @click="selectOptionAndEmit('activities')">Actividades</button>
        <button @click="selectOptionAndEmit('exam-confirm')">Iniciar Examen</button>
      </nav>
    </header>

    <main class="content-area">
      <div v-if="currentMainSectionProp === 'contents'" class="section-container">
        <h3>Content</h3>
        <p>Past Tense (Tiempo Pasado)</p>
        <ul>
          <li>Regular Verbs:
            Theyget a D, an ED, or an IED when they're in past tense.<br>
            Examples:<br>
            1- Use -> Used // 
            2- Play -> Played // 
            3- Study -> Studied
          </li>
          <li>Irregular Verbs:
            They don't have a pattern and get small or big changes when they're in past tense.<br>
            Examples:<br>
            1- Eat -> Ate // 
            2- Read -> Read (Pronounced as Red) // 
            3- Buy -> Bought
          </li>
          <li>Did, Was and Were:
            They get the same treatment as Do, Does, and Verb to Be.<br>
            Examples:<br>
            1- I Did / Didn't wash the dishes // 
            2- He Was / Wasn't playing videogames // 
            3- They Were / Weren't outside
          </li>
        </ul>
      </div>

      <div v-else-if="currentMainSectionProp === 'activities'" class="section-container">
        <h3>Selecciona una Actividad</h3>
        <br><br>
        <div class="activity-buttons">
          <button @click="$emit('select-activity', 'FillInTheBlanks')">Fill In The Blanks</button>
          <button @click="$emit('select-activity', 'Matching')">Matching</button>
          <button @click="$emit('select-activity', 'Crossword')">Crossword</button>
        </div>
        <br><br><br><br><br><br><br>
      </div>

      <div v-else-if="currentMainSectionProp === 'exam-confirm'" class="section-container">
        <h3>Confirmar Inicio de Examen</h3>
        <p>¿Estás seguro de que quieres iniciar el examen?</p>
        <button @click="$emit('start-exam')">Sí, Iniciar Examen</button>
        <br><br><br><br><br><br><br>
      </div>
    </main>
  </div>
  </template>

<script>
export default {
  name: 'MainInterface',
  props: {
    // Recibe la sección principal a mostrar desde Index.vue
    currentMainSectionProp: {
      type: String,
      default: 'contents' // Valor por defecto
    }
  },
  // Elimina cualquier data local como `currentMainSection`
  // Elimina cualquier `watch` que intentara modificar `currentMainSection`
  methods: {
    // Emite un evento para que Index.vue sepa qué sección principal mostrar
    selectOptionAndEmit(option) {
      this.$emit('select-main-section', option);
    },
  },
};
</script>

<style>
/* Tus estilos de MainInterface.vue (sin el footer) */
.main-interface-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Permite que el MainInterface ocupe todo el espacio disponible */
  box-sizing: border-box;
  width: 100%;
}

.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: black;
  color: white; /* Asegúrate de que el texto del h2 sea blanco */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  flex-shrink: 0; /* Para que no se encoja */
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
  flex-grow: 1; /* Permite que el área de contenido crezca */
  padding: 20px;
  overflow-y: auto; /* Permite el scroll si el contenido es demasiado largo */
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.section-container {
  background-color: rgb(0, 145, 255);
  padding: 3vh;
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

button { /* Esto es un estilo global que afecta a todos los botones */
  background-color: rgb(0, 145, 255);
  color: #333; /* Asegúrate de que el color del texto sea visible */
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
</style>