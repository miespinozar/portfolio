<script setup lang="ts">
// Pestañas de experiencia: a la izquierda los cargos, a la derecha el detalle del elegido.
// El título de la sección lo pone Experience.astro.
// Los textos y las herramientas son los mismos del CV.
import { onMounted, ref, watch } from "vue";
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
];

const activeId = ref(tabs[0].id);

// Carrusel de herramientas de cada cargo.
// La lista se repite hasta tener al menos 10 tarjetas, para que un cargo con pocas
// herramientas igual llene el ancho. Luego va dos veces seguidas: cuando la primera
// mitad termina de pasar, la animación vuelve al inicio sin que se note el salto.
// Más tarjetas, más tiempo: así todas avanzan a la misma velocidad.
const carousels = Object.fromEntries(
  tabs.map((tab) => {
    const base: Tool[] = [];
    while (tab.tools.length && base.length < 10) {
      base.push(...tab.tools);
    }
    return [tab.id, { loop: [...base, ...base], duration: `${base.length * 3}s` }];
  }),
);

// ---- Cargos ocultos, pero que se pueden encontrar ----
// Vue escribe `hidden` a secas en el HTML (oculto también sin JavaScript). Ya en el
// navegador se cambia a hidden="until-found": siguen ocultos, pero "Buscar en la página"
// los encuentra y abre su pestaña (evento beforematch). Donde until-found no existe,
// el navegador lo trata como un hidden normal.
const panels = ref<HTMLElement[]>([]);

function allowFindInPage() {
  panels.value.forEach((panel, i) => {
    if (panel && tabs[i].id !== activeId.value) {
      panel.setAttribute("hidden", "until-found");
    }
  });
}

onMounted(allowFindInPage);
// `post`: después de que Vue actualizó los paneles al cambiar de pestaña.
watch(activeId, allowFindInPage, { flush: "post" });

// ---- Teclado: como las pestañas de cualquier programa ----
// Solo la pestaña elegida entra con Tab; las flechas cambian de pestaña
// (arriba/abajo porque están una sobre otra; izquierda/derecha también sirven).
const tabButtons = ref<HTMLButtonElement[]>([]);

function select(index: number) {
  const i = (index + tabs.length) % tabs.length;
  activeId.value = tabs[i].id;
  tabButtons.value[i]?.focus();
}

function onKey(event: KeyboardEvent, index: number) {
  const keys: Record<string, number> = {
    ArrowDown: index + 1,
    ArrowRight: index + 1,
    ArrowUp: index - 1,
    ArrowLeft: index - 1,
    Home: 0,
    End: tabs.length - 1,
  };
  if (!(event.key in keys)) {
    return;
  }
  event.preventDefault();
  select(keys[event.key]);
}
</script>

<template>
  <!-- Layout -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
    <!-- Pestañas: una por cargo. La elegida se marca con el borde izquierdo (no solo
         con color) y con aria-selected, para que el lector de pantalla también lo diga. -->
    <div role="tablist" aria-label="Cargos" aria-orientation="vertical" class="space-y-4">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.id"
        :ref="(el) => (tabButtons[index] = el as HTMLButtonElement)"
        :id="`tab-${tab.id}`"
        type="button"
        role="tab"
        :aria-selected="activeId === tab.id ? 'true' : 'false'"
        :tabindex="activeId === tab.id ? 0 : -1"
        @click="activeId = tab.id"
        @keydown="onKey($event, index)"
        class="w-full text-left px-4 py-3 rounded-xl transition-all duration-300
               focus-visible:outline-2 focus-visible:outline-[#a78bfa]"
        :class="
          activeId === tab.id
            ? 'bg-purple-500/10 text-white shadow-lg shadow-purple-500/20 border-l-4 border-purple-400'
            : 'text-gray-400 hover:text-white'
        "
      >
        {{ tab.title }}
      </button>
    </div>

    <!-- Contenido: todos los cargos van en la página (así Google y "Buscar en la página"
         los encuentran), pero solo se ve el elegido. Los demás quedan ocultos con
         hidden="until-found": si buscas una palabra que está en otro cargo, el
         navegador abre esa pestaña solo (evento beforematch). -->
    <div class="md:col-span-2 min-w-0">
      <div
        v-for="(tab, index) in tabs"
        :key="tab.id"
        :id="`panel-${tab.id}`"
        role="tabpanel"
        :aria-labelledby="`tab-${tab.id}`"
        :ref="(el) => (panels[index] = el as HTMLElement)"
        :hidden="activeId !== tab.id"
        class="panel"
        @beforematch="activeId = tab.id"
      >
        <!-- Los espacios van en este div interno: un panel oculto con until-found
             igual dibuja su propio margen o relleno. -->
        <div class="space-y-6">
          <!-- Rol -->
          <h3 class="text-white text-2xl font-semibold">
            {{ tab.role }}
          </h3>

          <!-- Subtitulo -->
          <p class="text-gray-400">
            {{ tab.subtitle }}
          </p>

          <!-- Lista -->
          <ul class="space-y-1">
            <li
              v-for="(item, i) in tab.items"
              :key="i"
              class="text-gray-300 flex gap-2 leading-relaxed text-left md:text-justify"
            >
              <span class="text-purple-400 leading-relaxed" aria-hidden="true">•</span>
              <span>{{ item }}</span>
            </li>
          </ul>

          <!-- Herramientas (carrusel) -->
          <div v-if="tab.tools.length" class="pt-2">
            <!-- Título y botón para pausar -->
            <div class="flex items-center justify-between gap-4 mb-3">
              <p class="text-sm font-semibold text-gray-400">
                Herramientas utilizadas
              </p>

              <!-- Mismo HTML que PauseButton.astro (lo hace funcionar BaseLayout) -->
              <button
                type="button"
                data-pausar
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                       text-xs font-semibold text-gray-300 border border-white/10
                       hover:bg-white/10 hover:text-white
                       focus-visible:outline-2 focus-visible:outline-[#a78bfa]"
              >
                <span class="si-anda inline-flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M7 5h3v14H7zM14 5h3v14h-3z" />
                  </svg>
                  Pausar animación
                </span>
                <span class="si-pausada inline-flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Reanudar animación
                </span>
              </button>
            </div>

            <!-- Carrusel: avanza solo y se pausa con el mouse encima o con el botón -->
            <div class="tech-strip overflow-hidden py-2" role="region" :aria-label="`Herramientas: ${tab.role}`">
              <ul
                class="tech-track flex gap-5 w-max"
                :style="{ animationDuration: carousels[tab.id].duration }"
              >
                <li
                  v-for="(tool, i) in carousels[tab.id].loop"
                  :key="i"
                  :aria-hidden="i >= tab.tools.length ? 'true' : undefined"
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
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Al cambiar de pestaña, el detalle nuevo entra desde un poco más abajo. */
.panel:not([hidden]) {
  animation: panel-in 0.35s ease;
}

@keyframes panel-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
}

/* Quien pide menos movimiento ve el cambio de pestaña al instante. */
@media (prefers-reduced-motion: reduce) {
  .panel:not([hidden]) {
    animation: none;
  }
}
</style>
