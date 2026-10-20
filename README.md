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

## Combate retro

Escenario arriba y diálogo abajo. Estados: presentación → decisión → efecto → retroalimentación → nueva decisión o cierre. La pista y la recuperación pasan por un diálogo de apoyo antes de volver a la decisión. Los efectos duran aproximadamente un segundo y bloquean nuevas respuestas. El texto se puede completar con un toque; Enter o Espacio permiten completar y continuar.

Los PNG independientes tienen poses de espera, habla, ataque, defensa, impacto y saludo; CSS compone el movimiento y los efectos. Cada gimnasio conserva su color. Los menús y el creador usan el mismo diseño retro. El sonido es opcional y el movimiento se puede reducir manualmente o mediante la preferencia del sistema.

Consultar la preparación permite retomar la batalla. Una recarga durante un efecto recupera la retroalimentación pendiente, sin volver a aplicar daño ni perder el acierto.

## Partida

`localStorage`, clave estable `auladex-liga-invertida-v1`. Se conserva al cambiar la ruta del repositorio dentro del mismo dominio y navegador. Copia JSON con importación validada y confirmación antes de sustituir la partida; alias de entrenador/a. Las partidas anteriores completan el perfil conservando claves, capturas y bitácora. La bitácora puede imprimirse o guardarse como PDF desde el navegador.

El navegador puede impedir el almacenamiento, especialmente dentro de ciertos iframes o modos privados. La interfaz avisa si el guardado falla; abrir el enlace directamente y descargar una copia permite conservar el progreso. Las claves son una forma de organizar el acceso semanal, no un mecanismo de seguridad: forman parte de un cliente estático público.

## Editar

- `docs/content.js`: textos, casos, respuestas, citas, códigos, criaturas e insignias.
- `docs/profile.js` y `docs/profile.css`: prólogo y creador de personaje.
- `docs/combat.js`: interfaz del combate, retratos de diálogo y texto progresivo.
- `docs/retro.css`: sistema visual retro, poses, efectos, móvil y movimiento reducido.
- `docs/assets/retro-players.png`: cuatro avatares con poses de espera y ataque; también genera los retratos mediante CSS.
- `docs/app.js`: interfaz y navegación.
- `docs/core.js`: normalización de partidas y lógica de turnos.
- `docs/styles.css`: responsive, ilustraciones, animación y estilos de impresión.
- `docs/assets/retro-backgrounds.png`: cuatro escenarios sin personajes integrados.
- `docs/assets/retro-trainers.png`: cuatro entrenadores, seis poses por entrenador.
- `docs/assets/pixelify-latin.woff2`: fuente Pixelify Sans local, licencia OFL incluida.
- Los atlas anteriores se conservan como antecedentes; la interfaz usa las versiones retro.
- `docs/assets/creatures-v2.png`: atlas 2×2 con transparencia de las cuatro bioformas.

Fuentes verificadas el 20 de octubre de 2026: Abeysekera y Dawson (2015), van Alten et al. (2019), Brame (2016), Freeman et al. (2014), Nicol y Macfarlane-Dick (2006). Citas y enlaces se presentan en las escenas y en la biblioteca. La narrativa, los casos y las aplicaciones son creación de esta experiencia. Las evidencias STEM y las propuestas teóricas se presentan con su alcance explícito.

## Verificar la lógica

```sh
node --test tests/core.test.mjs
```

Siete pruebas sin dependencias cubren migración, bloqueo de respuestas, recuperación de resultados pendientes, derrota y último sello. La revisión funcional y visual en Chromium está descrita en `VERIFICACION.md`.

## Arte

Atlas originales creados con la herramienta integrada de generación de imágenes. Se conservan como recursos locales, sin dependencias de enlaces temporales. Las especificaciones de producción están en `ARTE.md`.

La actividad anterior del repositorio permanece disponible en el historial de Git.
