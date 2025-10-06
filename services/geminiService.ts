
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const buildPrompt = (need: string, tools: string): string => {
  return `
### **Instrucción Principal:**

**Actúa como un Consultor Experto en Ingeniería de Software y Arquitectura de Agentes de IA, especializado en la implementación segura y escalable del Protocolo de Contexto de Modelo (MCP).**

Tu tarea es analizar la necesidad del usuario y las herramientas existentes para diseñar un flujo de valor completo basado en MCP. El objetivo es generar tres artefactos esenciales: 1) El mapeo y flujo MCP, 2) Los requisitos estructurados, y 3) Un manual de implementación paso a paso.

### **Entrada del Usuario:**

Necesidad/Caso de Uso: "${need}"

Herramientas/Sistemas Existentes: "${tools}"

### **Requisitos de Salida (Artefactos a Generar):**

Genera la respuesta estrictamente en formato de tres secciones numeradas, utilizando las primitivas y la metodología de desarrollo de *software* de calidad descritas a continuación:

---

### **1. Mapeo y Flujo MCP Propuesto**

Utilizando el Protocolo de Contexto de Modelo (MCP) (un estándar abierto que permite a los LLMs acceder a datos y ejecutar acciones externas de forma segura y estandarizada), define la arquitectura y el flujo de orquestación.

1.1. **Mapeo de Herramientas Existentes a Primitivas MCP:**
*   Identifica y justifica qué elementos del listado del usuario deben exponerse como **Herramientas (*Tools*)** (acciones ejecutables que cambian el estado en el mundo real, como enviar un mensaje o actualizar una base de datos).
*   Identifica qué elementos son **Recursos (*Resources*)** (datos estáticos para dar contexto, como el contenido de un *log* o de un archivo).
*   Propón un **Prompt** inicial si la tarea es repetitiva, sirviendo como una plantilla de solicitud guiada.
1.2. **Arquitectura Esencial:** Describe cómo se construirán el **Servidor MCP** (el puente ligero que expone las funcionalidades de los sistemas del usuario de forma segura) y el **Cliente MCP** (el agente de IA que consume el servicio).
1.3. **Flujo de Orquestación (Plan/Act):** Describe la secuencia lógica de interacciones (el flujo) que el LLM (Cliente MCP) debe seguir para satisfacer la "Necesidad" del usuario, especificando qué Herramientas y Recursos invoca y en qué orden (Siguiendo un flujo de trabajo Plan/Act).

### **2. Requisitos Estructurados (Fase de Diseño)**

Genera los requisitos de *software* necesarios para la implementación del flujo definido:

2.1. **Historia de Usuario (HU):** Redacta la Historia de Usuario principal que encapsule la necesidad del proyecto, siguiendo el formato estándar: *Como [Rol], quiero [Acción] para [Beneficio]*.
2.2. **Criterios de Aceptación:** Genera los criterios de aceptación detallados para la HU, utilizando la estructura estandarizada **estilo Gherkin**.

### **3. Manual de Implementación Paso a Paso (Guía Estructurada)**

Genera un borrador de un manual de implementación enfocado en las mejores prácticas de calidad, seguridad y desarrollo (*software* de calidad). Este manual debe detallar las fases de desarrollo y prueba:

3.1. **Fase I: Definición y Contexto:**
*   **Levantamiento de Información:** Documentación del Alcance, Metodología, y Plan de actividades.
*   **Estandarización del Código/Agente:** Recomienda la creación de un archivo de contexto (\`agents.md\`) que incluya reglas de programación (ej. nomenclatura de variables, uso de JSDoc) para guiar al modelo LLM y garantizar la consistencia en la generación de código.

3.2. **Fase II: Desarrollo del Servidor MCP y Seguridad:**
*   **Implementación del Servidor:** Detalla la necesidad de codificar funciones *wrapper* para exponer las Herramientas y Recursos identificados en la sección 1.1.
*   **Seguridad y Autenticación:** Especifica la implementación obligatoria de mecanismos de autenticación (como **OAuth**) y el establecimiento de **permisos granulares** o de **mínimo privilegio** para el agente de IA, asegurando que solo acceda a los datos necesarios y no exponga credenciales.

3.3. **Fase III: Aseguramiento de la Calidad (QA) y Monitoreo:**
*   **Plan de Pruebas:** Establece que se deben planificar y ejecutar pruebas que incluyan:
    *   **Pruebas de Seguridad** (*PenTest* o evaluación de vulnerabilidades).
    *   **Pruebas de Mantenibilidad** (para asegurar la facilidad de conservar y modificar el código).
*   **Métricas y Auditoría:** Define los **Indicadores Clave** (KPI/KRI) necesarios para monitorear el flujo, incluyendo:
    *   **Trazabilidad** de las peticiones (para cumplimiento regulatorio y auditoría, dado que cada petición queda registrada en un formato JSON-RPC).
    *   **Tiempo Medio de Respuesta** del Servidor MCP.
*   **Entrega:** Concluye con la necesidad de generar un **Informe Final** con los resultados de las pruebas y las recomendaciones.
`;
};


export const generateMcpPlan = async (need: string, tools: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }

  const prompt = buildPrompt(need, tools);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate MCP plan from Gemini API.");
  }
};
