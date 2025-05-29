// plugins/eventBus.js
import { createApp } from 'vue';

// Crea una pequeña aplicación Vue para usarla como bus de eventos
const app = createApp({});
// Accede a los métodos globales de la instancia Vue para usarlos como bus de eventos
const emitter = app.config.globalProperties;

export default emitter;