# Verificación de AulaDex

Revisión: 20 de octubre de 2026. Navegador Chromium, ejecución real del sitio estático.

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
