<script setup lang="ts">
// Pestañas de experiencia: a la izquierda los cargos, a la derecha el detalle del elegido.
// El título de la sección lo pone Experience.astro.
// Los textos y las herramientas son los mismos del CV.
import { computed, ref } from "vue";
import {
  siSap,
  siJavascript,
  siJunit5,
  siSelenium,
  siPostman,
  siCypress,
  siZoho,
  siOpenjdk,
  siSpringboot,
  siSpring,
  siJsonwebtokens,
  siJira,
} from "simple-icons";
import {
  siApacheCamel,
  siServiceNow,
  siSqlServer,
  iconScrum,
  iconKanban,
  iconApi,
  iconSql,
  iconScript,
} from "@/data/extra-icons";

// Una herramienta: `icon` es el path SVG del logo y `viewBox` el tamaño en que está dibujado
// (24×24 si no se indica, como en Simple Icons). Los logos que no están en Simple Icons
// vienen de src/data/extra-icons.ts.
type Tool = { name: string; icon?: string; viewBox?: string };

const tabs: {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  items: string[];
  tools: Tool[];
}[] = [
  {
    id: "exp1",
    title: "Desarrollador SAP Fiori nivel 1",
    subtitle: "2023 Septiembre – 2025 Marzo · Lion Consulting SPA · Santiago",
    role: "Desarrollador SAP Fiori nivel 1",
    items: [
      "Desarrollo de aplicaciones SAP Fiori / SAPUI5 para Credinissan, enfocadas en interfaces modernas y usabilidad interna.",
      "Desarrollo de un mantenedor de cotizaciones para facilitar el trabajo de la mesa de ayuda.",
      "Desarrollo de interfaces SAP CPI para la integración con la bodega central de Embonor.",
      "Pruebas manuales y automatizadas con JUnit, Selenium WebDriver, Postman y Cypress.",
      "Soporte a clientes mediante sistema de tickets en Zoho Helpdesk.",
      "Trabajo bajo metodología Scrum, con planificación y entregas iterativas.",
    ],
    tools: [
      { name: "SAP Fiori", icon: siSap.path },
      { name: "SAPUI5", icon: siSap.path },
      { name: "SAP CPI", icon: siSap.path },
      { name: "JavaScript", icon: siJavascript.path },
      { name: "JUnit", icon: siJunit5.path },
      { name: "Selenium", icon: siSelenium.path },
      { name: "Postman", icon: siPostman.path },
      { name: "Cypress", icon: siCypress.path },
      { name: "Zoho Helpdesk", icon: siZoho.path },
      { name: "Scrum", icon: iconScrum.path },
    ],
  },
  {
    id: "exp2",
    title: "Back-end Trainee",
    subtitle: "2022 Mayo – 2023 Agosto · Socius Chile SPA · Santiago",
    role: "Desarrollador Back-end Trainee",
    items: [
      "Desarrollo de microservicios en Java con Spring Boot y Apache Camel para la integración entre sistemas mediante APIs REST.",
      "Persistencia de datos con JPA y autenticación de servicios mediante tokens JWT.",
      "Mantención, corrección y actualización de endpoints REST.",
      "Pruebas unitarias y funcionales con JUnit, Postman y Cypress.",
      "Trabajo bajo metodología Kanban, con gestión de tareas en Jira.",
    ],
    tools: [
      { name: "Java", icon: siOpenjdk.path },
      { name: "Spring Boot", icon: siSpringboot.path },
      { name: "Spring Data JPA", icon: siSpring.path },
      { name: "Apache Camel", icon: siApacheCamel.path, viewBox: siApacheCamel.viewBox },
      { name: "APIs REST", icon: iconApi.path },
      { name: "JWT", icon: siJsonwebtokens.path },
      { name: "JUnit", icon: siJunit5.path },
      { name: "Postman", icon: siPostman.path },
      { name: "Cypress", icon: siCypress.path },
      { name: "Jira", icon: siJira.path },
      { name: "Kanban", icon: iconKanban.path },
    ],
  },
  {
    id: "exp3",
    title: "Práctica en Enel X",
    subtitle: "2022 Enero – 2022 Abril · Enel X Chile SPA · Santiago",
    role: "Consultant Responsible Junior (práctica profesional)",
    items: [
      "Soporte a usuarios mediante gestión de incidentes en ServiceNow.",
      "Coordinación de reuniones diarias del equipo bajo metodología Kanban.",
    ],
    tools: [
      { name: "ServiceNow", icon: siServiceNow.path, viewBox: siServiceNow.viewBox },
      { name: "Kanban", icon: iconKanban.path },
    ],
  },
  {
    id: "exp4",
    title: "Práctica en Puma",
    subtitle: "2020 Enero – 2020 Marzo · Puma Chile S.A. · Santiago",
    role: "IT Trainee Helpdesk (práctica profesional)",
    items: [
      "Optimización de consultas SQL del e-commerce sobre SQL Server.",
      "Soporte técnico a usuarios y gestión de tickets de soporte.",
      "Automatización del envío de facturas mediante scripts.",
    ],
    tools: [
      { name: "SQL Server", icon: siSqlServer.path, viewBox: siSqlServer.viewBox },
      { name: "SQL", icon: iconSql.path },
      { name: "Scripts de automatización", icon: iconScript.path },
    ],
  },
  {
    id: "exp5",
    title: "Formación",
    subtitle: "Aprendizaje continuo",
    role: "Crecimiento profesional",
    items: [
      "Buenas prácticas de desarrollo y código limpio.",
      "Arquitectura frontend moderna y escalable.",
      "Aprendizaje continuo de tecnologías actuales.",
    ],
    tools: [],
  },
];

const activeId = ref(tabs[0].id);
const active = computed(() => tabs.find((t) => t.id === activeId.value)!);

// Carrusel de herramientas del cargo elegido.
// La lista se repite hasta tener al menos 10 tarjetas, para que un cargo con pocas
// herramientas igual llene el ancho. Luego va dos veces seguidas: cuando la primera
// mitad termina de pasar, la animación vuelve al inicio sin que se note el salto.
const toolsBase = computed(() => {
  const tools = active.value.tools;
  if (!tools.length) {
    return [];
  }

  const base: Tool[] = [];
  while (base.length < 10) {
    base.push(...tools);
  }
  return base;
});

const toolsLoop = computed(() => [...toolsBase.value, ...toolsBase.value]);

// Más tarjetas, más tiempo: así todas avanzan a la misma velocidad.
const toolsDuration = computed(() => `${toolsBase.value.length * 3}s`);
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
    <div class="md:col-span-2 min-w-0">
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
              class="text-gray-300 flex gap-2 leading-relaxed text-left md:text-justify"
            >
              <span class="text-purple-400 leading-relaxed">•</span>
              <span>{{ item }}</span>
            </li>
          </ul>

          <!-- Herramientas (carrusel) -->
          <div v-if="active.tools.length" class="pt-2">
            <!-- Título -->
            <p class="text-sm font-semibold text-gray-400 mb-3">
              Herramientas utilizadas
            </p>

            <!-- Carrusel: avanza solo y se pausa con el mouse encima -->
            <div class="tech-strip overflow-hidden py-2" aria-label="Herramientas utilizadas">
              <ul
                class="tech-track flex gap-5 w-max"
                :style="{ animationDuration: toolsDuration }"
              >
                <li
                  v-for="(tool, i) in toolsLoop"
                  :key="i"
                  :aria-hidden="i >= active.tools.length ? 'true' : undefined"
                >
                  <!-- Tarjeta (mismo estilo que TechCard) -->
                  <div
                    class="flex items-center gap-3 px-4 py-3
                           whitespace-nowrap
                           rounded-2xl
                           border border-white/10
                           bg-white/5 shadow-md
                           transition-all duration-300 ease-out
                           hover:bg-white/10
                           hover:border-purple-400/40"
                  >
                    <!-- Icono -->
                    <svg
                      v-if="tool.icon"
                      :viewBox="tool.viewBox ?? '0 0 24 24'"
                      class="w-5 h-5 shrink-0 fill-current text-purple-300"
                      aria-hidden="true"
                    >
                      <path :d="tool.icon" />
                    </svg>

                    <!-- Nombre -->
                    <span class="text-sm text-gray-200 font-medium">
                      {{ tool.name }}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
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
