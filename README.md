# AulaDex · La Liga Invertida

Experiencia opcional para **Diseño de Curso de Clase Invertida**, tutor Nicolás Espinoza. Cuatro gimnasios con preparación narrativa, fuentes académicas, combate por turnos, capturas y una bitácora de transferencia a la práctica docente.

## Ejecutar

Sitio estático: HTML, CSS y JavaScript nativo, sin compilación ni servicios externos. Para revisar localmente:

```sh
python -m http.server 8765
```

Abre `http://localhost:8765/`. GitHub Pages está configurado para publicar la carpeta `docs/` de `main`. Esa carpeta contiene la versión canónica del sitio; la entrada de la raíz solo dirige allí al revisar localmente. Todas las rutas de recursos son relativas, por lo que el sitio funciona al renombrar el repositorio. La URL de Pages cambiará con el nuevo nombre.

## Contenido y funcionamiento

- Prólogo inicial y creación de personaje: alias, cuatro avatares, sello de aventura y lema opcional. El personaje aparece en pasaporte y batallas; puede editarse después.
- Semana 1: comprender el modelo · El Observatorio · Folira.
- Semana 2: preparación previa · El Archivo Azul · Noxira.
- Semana 3: aplicación durante la clase · La Forja Viva · Ignar.
- Semana 4: evaluación y mejora · El Faro Estelar · Asterion.
- Cada gimnasio tiene tres escenas, cuatro casos y una bioforma. Las cuatro capturas completan la Liga; no existe un quinto combate obligatorio.
- Los gimnasios se abren con claves independientes compartidas desde Canvas. No dependen del reloj del dispositivo ni de fechas fijas. Los previos permanecen abiertos.
- Cuatro aciertos rompen los cuatro sellos del entrenador. Cada error resta 25 de concentración. Una pista y una recuperación de 30 puntos por batalla. Un reintento conserva capturas, insignias y reflexiones.
- La captura se confirma con un botón y se registra una sola vez. Los gimnasios pueden repetirse.
- Participación opcional, sin efecto en calificaciones. No se envían respuestas, nombres o reflexiones a Canvas ni al tutor.

## Partida

`localStorage`, clave estable `auladex-liga-invertida-v1`. Se conserva al cambiar la ruta del repositorio dentro del mismo dominio y navegador. Copia JSON con importación validada y confirmación antes de sustituir la partida; alias de entrenador/a. Las partidas anteriores completan el perfil conservando claves, capturas y bitácora. La bitácora puede imprimirse o guardarse como PDF desde el navegador.

El navegador puede impedir el almacenamiento, especialmente dentro de ciertos iframes o modos privados. La interfaz avisa si el guardado falla; abrir el enlace directamente y descargar una copia permite conservar el progreso. Las claves son una forma de organizar el acceso semanal, no un mecanismo de seguridad: forman parte de un cliente estático público.

## Editar

- `docs/content.js`: textos, casos, respuestas, citas, códigos, criaturas e insignias.
- `docs/profile.js` y `docs/profile.css`: prólogo y creador de personaje.
- `docs/assets/avatars.png`: atlas original de cuatro retratos.
- `docs/app.js`: interfaz y navegación.
- `docs/core.js`: normalización de partidas y lógica de turnos.
- `docs/styles.css`: responsive, ilustraciones, animación y estilos de impresión.
- `docs/assets/arenas.png`: atlas 2×2 de escenarios y entrenadores.
- `docs/assets/creatures-v2.png`: atlas 2×2 con transparencia de las cuatro bioformas.

Fuentes verificadas el 20 de octubre de 2026: Abeysekera y Dawson (2015), van Alten et al. (2019), Brame (2016), Freeman et al. (2014), Nicol y Macfarlane-Dick (2006). Citas y enlaces se presentan en las escenas y en la biblioteca. La narrativa, los casos y las aplicaciones son creación de esta experiencia. Las evidencias STEM y las propuestas teóricas se presentan con su alcance explícito.

## Arte

Tres atlas originales creados con la herramienta integrada de generación de imágenes. Se conservan como recursos locales, sin dependencias de enlaces temporales. Las especificaciones de producción están en `ARTE.md`.

La actividad anterior del repositorio permanece disponible en el historial de Git.
