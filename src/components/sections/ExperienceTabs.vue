<script setup lang="ts">
// Pestañas de experiencia: a la izquierda los cargos, a la derecha el detalle del elegido.
// El título de la sección lo pone Experience.astro.
import { computed, ref } from "vue";

const tabs = [
  {
    id: "exp1",
    title: "Consultor SAP N1",
    subtitle: "2023 Septiembre – 2025 Marzo · Lion Consulting SPA",
    role: "Desarrollador Nivel 1",
    items: [
      "Desarrollo de aplicaciones SAP Fiori / SAPUI5 para el cliente Credinissan, enfocadas en interfaces modernas y usabilidad interna.",
      "Mantenedor de cotizaciones para facilitar el uso a la mesa de ayuda.",
      "Ejecución de procesos de QA y testing mediante JUnit, Selenium WebDriver, Postman y Cypress.",
      "Desarrollo de interfaces SAP CPI para integración y comunicación con la bodega central de Embonor.",
      "Soporte técnico a usuarios y clientes mediante Zoho Helpdesk, gestionando requerimientos y tickets.",
      "Trabajo bajo metodología ágil Scrum, participando en planificación y entregas iterativas.",
    ],
    tags: ["SAP Fiori", "SAP CPI", "Selenium", "Cypress", "Scrum"],
  },
  {
    id: "exp2",
    title: "Backend Trainee",
    subtitle: "2022 Mayo – 2023 Agosto · Socius Chile SPA",
    role: "Desarrollador Backend Trainee",
    items: [
      "Implementación de microservicios para integración entre sistemas mediante APIs REST.",
      "Mantenimiento evolutivo y corrección de endpoints REST.",
      "Ejecución de pruebas QA: unitarias y funcionales con JUnit, Postman y Cypress.",
      "Desarrollo backend con Java, Spring Boot y Apache Camel.",
      "Trabajo bajo metodología ágil Kanban utilizando Jira para gestión de tareas.",
    ],
    tags: ["Java", "Spring Boot", "Apache Camel", "JUnit", "Kanban"],
  },
  {
    id: "exp3",
    title: "Formación",
    subtitle: "Aprendizaje continuo",
    role: "Crecimiento profesional",
    items: [
      "Buenas prácticas de desarrollo y código limpio.",
      "Arquitectura frontend moderna y escalable.",
      "Aprendizaje continuo de tecnologías actuales.",
    ],
    tags: [],
  },
];

const activeId = ref(tabs[0].id);
const active = computed(() => tabs.find((t) => t.id === activeId.value)!);
</script>

<template>
  <!-- Layout -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
    <!-- Tabs -->
    <div class="space-y-4">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeId = tab.id"
        class="w-full text-left px-4 py-3 rounded-xl transition-all duration-300"
        :class="
          activeId === tab.id
            ? 'bg-purple-500/10 text-white shadow-lg shadow-purple-500/20 border-l-4 border-purple-400'
            : 'text-gray-400 hover:text-white'
        "
      >
        {{ tab.title }}
      </button>
    </div>

    <!-- Contenido -->
    <div class="md:col-span-2">
      <transition name="fade-slide" mode="out-in">
        <div :key="activeId" class="space-y-6">
          <!-- Rol -->
          <h3 class="text-white text-2xl font-semibold">
            {{ active.role }}
          </h3>

          <!-- Subtitulo -->
          <p class="text-gray-400">
            {{ active.subtitle }}
          </p>

          <!-- Lista -->
          <ul class="space-y-1">
            <li
              v-for="(item, i) in active.items"
              :key="i"
              class="text-gray-300 flex gap-2 leading-relaxed text-justify"
            >
              <span class="text-purple-400 leading-relaxed">•</span>
              <span>{{ item }}</span>
            </li>
          </ul>

          <!-- Etiquetas -->
          <div
            v-if="active.tags.length"
            class="flex flex-wrap gap-2"
          >
            <span
              v-for="tag in active.tags"
              :key="tag"
              class="px-3 py-1
                     rounded-full
                     text-xs font-semibold
                     text-purple-300
                     bg-purple-500/15
                     border border-purple-500/35"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
/* Al cambiar de pestaña, el detalle sale hacia arriba y el nuevo entra desde abajo. */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.35s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
