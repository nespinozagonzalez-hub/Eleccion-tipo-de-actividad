# Verificación de AulaDex

Revisión: 20 de octubre de 2026. Navegador Chromium, ejecución real del sitio estático.

## Lectura y siguiente gimnasio

- Letra clara por defecto en partidas nuevas y anteriores; Pixelify se conserva como opción retro desde «Aa» en prólogo, personaje y pantallas del juego.
- Se comprobó el cambio de tipografía durante una batalla, sin cambiar sellos, concentración ni pregunta. Al cerrar la ventana, el foco vuelve al botón «Aa».
- La elección persiste al recargar, exportar/importar una copia y reiniciar la aventura.
- Tras capturar la primera bioforma, el centro de la ruta apunta al gimnasio 2, muestra su escenario y recuerda la clave de la Semana 2. La entrada sigue exigiendo la clave correcta.
- Una captura pendiente tiene prioridad; después se ofrece retomar una batalla en curso. Las cuatro capturas llevan al plan de clase.
- Se revisaron nueve pantallas con ambas tipografías a 320, 390, 768, 1440 y 1920 píxeles: sin desbordamiento horizontal, carta y globos narrativos completos dentro del escenario. No se registraron errores JavaScript ni recursos fallidos.
- Pasan las once pruebas de regresión del núcleo, incluidas migración de tipografía y elección del siguiente destino.

## Contraste sobre imágenes

Se reforzó el degradado oscuro del prólogo y se añadió un fondo negro difuminado detrás de la carta. Las coordenadas, nombres de combatientes, turno y números de escena tienen superficies oscuras para conservar contraste sobre zonas claras. Se comprobó que la carta permanece completa a 320, 390, 768 y 1440 píxeles y se generó una captura limpia de bienvenida. No se registraron errores JavaScript ni recursos fallidos en esta revisión visual.

## Reinicio y revisión del banco de preguntas

- Se comprobó que el botón de reinicio está disponible en barra lateral, guía y ventana de partida. La confirmación describe qué se borra y permite descargar un respaldo.
- Abrir la confirmación o cancelarla conserva exactamente la partida. Confirmar vuelve al prólogo y permite crear otro personaje con los cuatro gimnasios cerrados.
- Solo se sustituye la clave de AulaDex: se verificó que otra clave del navegador permanece intacta. Se conservan las preferencias de sonido, movimiento y tipografía.
- Se descargó una copia antes de reiniciar y se restauraron el personaje, las cuatro capturas y las reflexiones desde esa copia.
- Se simuló un fallo de almacenamiento: el reinicio no modifica la aventura y muestra un aviso. También se reinició durante un efecto de combate, comprobando que el temporizador no recupera el estado anterior.
- La confirmación se revisó a 320 y 390 píxeles, sin desbordamiento.
- Se revisaron manualmente los 16 casos, sus pistas y explicaciones. Las alternativas representan acciones docentes plausibles y tienen entre 0 y 2 palabras de diferencia dentro de cada pregunta. La respuesta correcta no es sistemáticamente la más larga; sus posiciones siguen equilibradas en A: 5, B: 6, C: 5.

## Rediseño retro completo

- Fondos independientes para los cuatro gimnasios, cuatro avatares PNG y seis poses por entrenador. Fuente Pixelify Sans servida desde el propio sitio.
- Presentación, decisión, animación y retroalimentación en cajas RPG; completar texto con un toque y avanzar con botón o teclado. Se verificó Enter en el diálogo inicial.
- Acierto, contraataque, defensa, impacto, pista y recuperación; las respuestas quedan bloqueadas durante el efecto. La cantidad recuperada respeta el máximo de 100.
- Se recargó durante un ataque correcto: el sello permanece roto y la explicación queda pendiente, sin aplicar el resultado dos veces. También se recuperó una derrota para volver a prepararse.
- Recorrer los cuatro gimnasios, registrar las cuatro capturas y repetir un gimnasio conserva la colección sin duplicados.
- Consultar la preparación permite retomar la misma batalla; las pistas permanecen visibles mientras corresponde la decisión.
- Se verificaron movimiento reducido manual y preferencia del sistema, con texto completo y sin animaciones.
- Se revisaron introducción, personaje, ruta, BioDex, bitácora, guía, gimnasio, preparación y combate a 320, 390, 768, 1440 y 1920 píxeles. Se ajustaron títulos, contador y tarjetas para impedir desbordamientos o recortes.
- La prueba del personaje validó alias, cuatro avatares, rasgo, lema, foco al escribir, guardado, edición, escape de HTML y migración real de una partida anterior.
- La prueba completa no registró errores JavaScript ni recursos fallidos.
- Las once pruebas de regresión de `tests/core.test.mjs` pasan con Node y no requieren dependencias adicionales.

## Verificación de funciones conservadas

Ampliación con prólogo y personajes: se comprobó la entrada previa a los gimnasios, la validación del alias, los cuatro avatares, sello y lema, la edición posterior, el traslado del perfil en copias JSON y la migración de partidas anteriores sin perder capturas, claves ni reflexiones. Se revisaron las pantallas de inicio y personaje entre 320 y 1440 píxeles, incluida la escritura con una altura de ventana reducida para simular el teclado móvil. La pantalla no se reconstruye mientras se escribe y mantiene el foco del campo.

- Los cuatro gimnasios permanecen cerrados hasta ingresar su clave. Una clave incorrecta muestra un aviso y no habilita el acceso.
- Se recorren las 12 escenas y las 16 decisiones; las ventanas de fuentes permiten acceder a las referencias y sus enlaces de lectura.
- Se probaron respuestas correctas e incorrectas, bloqueo de doble respuesta, pistas, recuperación y reinicio tras una derrota.
- Se completaron las cuatro batallas y las capturas, incluido el cierre de la Liga. Una repetición del gimnasio no duplica una captura.
- Persisten capturas y reflexiones tras recargar. El nombre se presenta como texto, incluso si contiene caracteres HTML.
- Se descargó una copia JSON, se rechazó un archivo inválido y se importó una copia válida con confirmación antes de reemplazar la partida.
- Se generó la bitácora en PDF mediante impresión del navegador.
- Se comprobaron páginas principales, fichas de gimnasio y preparación a 320, 390, 768, 1440 y 1920 píxeles, sin desbordamiento horizontal.
- Se inspeccionaron visualmente ruta, preparación, combate y BioDex en escritorio y las vistas principales en móvil.
- Durante la prueba completa no se registraron errores JavaScript ni recursos locales fallidos.

Alcance: verificación en navegador de escritorio con tamaños móviles simulados. No sustituye una prueba en dispositivos iOS/Android físicos ni garantiza disponibilidad permanente de sitios académicos externos. El almacenamiento dentro de iframes depende de las políticas del navegador; la partida se puede trasladar mediante copia JSON.
