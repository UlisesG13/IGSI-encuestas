const API_BASE_URL = '/api';

export const encuestasService = {
  /**
   * Obtiene una encuesta completa con secciones, preguntas y respuestas
   * @param {string} idEncuesta - ID de la encuesta
   * @returns {Promise<Object>} - Encuesta completa
   */
  async getEncuestaCompleta(idEncuesta) {
    try {
      const response = await fetch(`${API_BASE_URL}/encuestas/${idEncuesta}/completa`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Aquí puedes agregar headers de autenticación si es necesario
          // 'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener la encuesta completa:', error);
      
      // Datos mock para desarrollo cuando el backend no está disponible
      console.log('Usando datos mock para desarrollo...');
      return this.getMockEncuestaCompleta(idEncuesta);
    }
  },

  /**
   * Datos mock para desarrollo
   * @param {string} idEncuesta - ID de la encuesta
   * @returns {Object} - Encuesta mock
   */
  getMockEncuestaCompleta(idEncuesta) {
    return {
      "idEncuesta": parseInt(idEncuesta),
      "titulo": `Encuesta de Prueba ${idEncuesta}`,
      "descripcion": "Es una prueba de una encuesta",
      "idDepartamento": 1,
      "fechaInicio": "2025-08-01",
      "fechaFin": "2025-08-02",
      "estado": "activa",
      "deleted": false,
      "secciones": [
        {
          "idSeccion": 1,
          "titulo": "Infraestructura demo",
          "descripcion": "Opinión sobre instalaciones y equipamiento.",
          "orden": 1,
          "preguntas": [
            {
              "idPregunta": 1,
              "textoPregunta": "¿Cómo calificarías las instalaciones del departamento?",
              "idTipoPregunta": 1,
              "orden": 1,
              "ayuda": "Evalúa las instalaciones físicas y equipamiento disponible",
              "puntaje": 0,
              "respuestas": [
                {
                  "idRespuestaPosible": 1,
                  "idPregunta": 1,
                  "textoRespuesta": "Excelente",
                  "puntaje": 5,
                  "esCorrecta": false
                },
                {
                  "idRespuestaPosible": 2,
                  "idPregunta": 1,
                  "textoRespuesta": "Muy bueno",
                  "puntaje": 4,
                  "esCorrecta": false
                },
                {
                  "idRespuestaPosible": 3,
                  "idPregunta": 1,
                  "textoRespuesta": "Bueno",
                  "puntaje": 3,
                  "esCorrecta": false
                },
                {
                  "idRespuestaPosible": 4,
                  "idPregunta": 1,
                  "textoRespuesta": "Regular",
                  "puntaje": 2,
                  "esCorrecta": false
                },
                {
                  "idRespuestaPosible": 5,
                  "idPregunta": 1,
                  "textoRespuesta": "Malo",
                  "puntaje": 1,
                  "esCorrecta": false
                }
              ]
            },
            {
              "idPregunta": 2,
              "textoPregunta": "¿Qué aspectos de la infraestructura mejorarías?",
              "idTipoPregunta": 2,
              "orden": 2,
              "ayuda": "Selecciona todas las opciones que consideres necesarias",
              "puntaje": 0,
              "respuestas": [
                {
                  "idRespuestaPosible": 6,
                  "idPregunta": 2,
                  "textoRespuesta": "Equipos de cómputo",
                  "puntaje": 0,
                  "esCorrecta": false
                },
                {
                  "idRespuestaPosible": 7,
                  "idPregunta": 2,
                  "textoRespuesta": "Mobiliario",
                  "puntaje": 0,
                  "esCorrecta": false
                },
                {
                  "idRespuestaPosible": 8,
                  "idPregunta": 2,
                  "textoRespuesta": "Iluminación",
                  "puntaje": 0,
                  "esCorrecta": false
                },
                {
                  "idRespuestaPosible": 9,
                  "idPregunta": 2,
                  "textoRespuesta": "Aire acondicionado",
                  "puntaje": 0,
                  "esCorrecta": false
                }
              ]
            },
            {
              "idPregunta": 3,
              "textoPregunta": "¿Qué tan satisfecho estás con el equipamiento disponible?",
              "idTipoPregunta": 3,
              "orden": 3,
              "ayuda": "Evalúa tu satisfacción con el equipamiento",
              "puntaje": 0,
              "respuestas": [
                {
                  "idRespuestaPosible": 10,
                  "idPregunta": 3,
                  "textoRespuesta": "Muy insatisfecho",
                  "puntaje": 1,
                  "esCorrecta": false
                },
                {
                  "idRespuestaPosible": 11,
                  "idPregunta": 3,
                  "textoRespuesta": "Insatisfecho",
                  "puntaje": 2,
                  "esCorrecta": false
                },
                {
                  "idRespuestaPosible": 12,
                  "idPregunta": 3,
                  "textoRespuesta": "Neutral",
                  "puntaje": 3,
                  "esCorrecta": false
                },
                {
                  "idRespuestaPosible": 13,
                  "idPregunta": 3,
                  "textoRespuesta": "Satisfecho",
                  "puntaje": 4,
                  "esCorrecta": false
                },
                {
                  "idRespuestaPosible": 14,
                  "idPregunta": 3,
                  "textoRespuesta": "Muy satisfecho",
                  "puntaje": 5,
                  "esCorrecta": false
                }
              ]
            }
          ]
        },
        {
          "idSeccion": 2,
          "titulo": "Servicios Académicos",
          "descripcion": "Evaluación de los servicios académicos ofrecidos.",
          "orden": 2,
          "preguntas": [
            {
              "idPregunta": 4,
              "textoPregunta": "¿Qué servicios académicos utilizas con más frecuencia?",
              "idTipoPregunta": 2,
              "orden": 1,
              "ayuda": "Selecciona todos los servicios que utilizas",
              "puntaje": 0,
              "respuestas": [
                {
                  "idRespuestaPosible": 15,
                  "idPregunta": 4,
                  "textoRespuesta": "Biblioteca",
                  "puntaje": 0,
                  "esCorrecta": false
                },
                {
                  "idRespuestaPosible": 16,
                  "idPregunta": 4,
                  "textoRespuesta": "Laboratorios",
                  "puntaje": 0,
                  "esCorrecta": false
                },
                {
                  "idRespuestaPosible": 17,
                  "idPregunta": 4,
                  "textoRespuesta": "Tutorías",
                  "puntaje": 0,
                  "esCorrecta": false
                },
                {
                  "idRespuestaPosible": 18,
                  "idPregunta": 4,
                  "textoRespuesta": "Sala de estudio",
                  "puntaje": 0,
                  "esCorrecta": false
                }
              ]
            }
          ]
        }
      ]
    };
  },

  /**
   * Obtiene el ID de la encuesta desde la URL
   * @returns {string|null} - ID de la encuesta o null si no se encuentra
   */
  getEncuestaIdFromUrl() {
    const pathSegments = window.location.pathname.split('/');
    const idEncuesta = pathSegments[pathSegments.length - 1];
    
    // Verificar que el ID sea válido (no vacío y no sea una ruta)
    if (idEncuesta && idEncuesta !== 'questionnaire' && idEncuesta !== '') {
      return idEncuesta;
    }
    
    return null;
  }
};
