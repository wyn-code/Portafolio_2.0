# Rediseño visual "terminal hacker" + hero Backend/DevOps

Mantengo la estructura actual de secciones (Sobre mí, Proyecto destacado, Otros proyectos, Skills, Certificaciones, Contacto) y todo el contenido real de proyectos, certificaciones y contacto. Cambia el envoltorio visual y el copy de presentación.

## 1. Sistema visual

- Paleta más oscura y sobria: fondo casi negro (#0a0a0a aprox.), texto blanco/gris claro, acento verde phosphor tipo #4ade80 (legible, no cansa la vista). Se ajustan los tokens en `src/styles.css`, sin tocar la estructura de temas (light mode se mantiene funcionando).
- Fondo: se atenúan los halos de color actuales para un negro más plano tipo terminal; la "command rain" del hero queda pero más sutil.
- Tipografía: Space Grotesk para títulos grandes + JetBrains Mono para badges, metadata y elementos tipo código. Se cargan por `<link>` en el root route.
- Nuevos estilos reutilizables: badge tipo terminal (fondo oscuro, borde verde, mono), píldora de nav, cursor de tipeo con blink.

## 2. Navbar

- Nav superior tipo píldora oscura flotante con blur, ítems: Inicio, Sobre mí, Proyectos, Skills, Contacto, cada uno con icono pequeño de lucide-react.
- Se mantiene el logo MB, el toggle de idioma y el de tema. Indicador de sección activa se conserva.
- En mobile: píldora compacta con solo iconos.

## 3. Hero (rediseño)

- Badge superior tipo output de terminal: `> disponible_para_freelance --status=active` con punto verde pulsante.
- Título grande en dos líneas: "Hola,\nsoy Bruno" (bold, blanco).
- Debajo, en monospace con efecto typing + cursor blink: "Backend & DevOps Developer_".
- Descripción de 2-3 líneas: construyo APIs y sistemas listos para producción, con foco en arquitectura, automatización e infraestructura, no solo features.
- Metadata con iconos: Basado en Argentina · Disponible ahora (punto verde).
- Botones: "Hire Me" (sólido verde, texto negro, ancla a contacto) y "Descargar CV" (outline verde).
- Separador fino, luego "Sígueme en:" con iconos outline de GitHub, LinkedIn y Email (usando los links reales ya existentes).
- Derecha: nueva ilustración flat de Tux DevOps frente a una notebook con terminal en verde (`$ docker-compose up`, `$ kubectl get pods`) y ventanas/iconos de terminal alrededor. Ya está generada en el mismo estilo del Tux actual.
- Responsive: en mobile el hero se apila (texto arriba, ilustración abajo, más chica).

## 4. Copy con ángulo Backend/DevOps

- Sobre mí: reescritura de los 3 párrafos (ES/EN) hacia arquitectura escalable, containerización con Docker, CI/CD, despliegues, bases de datos en producción y seguridad, mencionando la certificación en Ethical Hacking como diferencial.
- Descripciones de proyectos: se conservan los proyectos y links tal cual; solo se ajusta el texto para resaltar arquitectura, despliegue y buenas prácticas.
- Certificaciones y contacto: contenido intacto.

## 5. Skills

- La categoría "Cloud y DevOps" (Docker, Render, Vercel, Supabase, Cloudflare) pasa a tener protagonismo visual: card destacada a ancho completo, borde verde y badges tipo terminal (fondo oscuro, borde verde, monospace).
- El resto de las categorías mantiene su grid actual con el estilo nuevo aplicado.

## Detalles técnicos

- Archivos a tocar: `src/styles.css` (tokens + utilidades), `src/routes/__root.tsx` (fuentes), `src/components/layout/Navbar.tsx`, `src/data/navLinks.ts` (iconos + labels), `src/features/hero/Hero.tsx`, `src/features/hero/HeroIllustration.tsx`, `src/features/hero/CommandRain.tsx` (opacidad), `src/features/about/About.tsx`, `src/features/techs/Techs.tsx`, `src/data/projects.ts` y `src/data/featuredProyect.ts` (solo copy).
- Nueva imagen: `src/assets/images/tux-devops.png` (reemplaza el uso del Tux actual en el hero).
- Sin cambios de lógica, datos de negocio ni backend.
