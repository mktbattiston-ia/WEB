# Spec: MKT BATTISTON — Landing Page

## Objetivo
Landing page de una sola página para **MKT BATTISTON**, que vende 5 softwares de automatización de redes sociales (Instagram, Facebook, WhatsApp, TikTok, YouTube). El objetivo es que dueños de negocios, agencias de marketing y marcas personales entiendan las ventajas de cada herramienta, vean todas las automatizaciones que incluye, y elijan el software ideal para su negocio.

> **Actualización de marca y estilo (2026-07-17):** el nombre de marca pasó de "MKT SOFTWARE" a "MKT BATTISTON" y el diseño se rehizo para calzar con la referencia visual del cliente (proyecto en Readdy.ai): botones tipo píldora, tarjetas de software con banner en gradiente por plataforma + badge "Activo", tarjetas de ventajas con stat grande, y specs completas de cada software en un panel expandible por tarjeta.

**Usuario:** Dueños de negocios físicos/online, agencias de marketing, marcas personales — perfil no técnico, necesita entender rápido "qué hace" cada software.

**Éxito:** El visitante puede escanear las 5 herramientas, entender sus funciones clave en segundos, y contactar por WhatsApp para avanzar.

## Tech Stack
HTML5 + CSS3 + JavaScript vanilla. Sin build step, sin dependencias externas (para poder abrirse o desplegarse en cualquier hosting estático sin instalar nada).

## Comandos
- Ver localmente: `python3 -m http.server 8000` desde la carpeta del proyecto → abrir `http://localhost:8000`
- Deploy: subir la carpeta tal cual a Netlify/Vercel/GitHub Pages (no requiere build)

## Estructura del Proyecto
```
mkt-software-landing/
  index.html          → Toda la landing (una sola página, secciones por ancla)
  styles.css           → Estilos (paleta, layout, animaciones, responsive)
  script.js             → Scroll reveal, nav móvil, smooth scroll
  assets/images/        → Imágenes reales de cada software (provistas por el cliente)
  SPEC.md                → Este documento
  tasks/plan.md, todo.md → Plan y checklist de implementación
```

## Estilo Visual
- Tema oscuro casi negro (`#07070c`), acento principal naranja-rojizo (`#ff5a1f`) y cian (`#22d3ee`) de soporte — tomado de la referencia visual del cliente (proyecto MKT BATTISTON en Readdy.ai).
- Botones tipo píldora (`border-radius: 999px`) en toda la interfaz.
- Tarjetas de software con banner en gradiente de marca por plataforma (YouTube rojo, TikTok cian/negro, WhatsApp verde, Facebook azul, Instagram rosa/violeta) + badge "● Activo".
- Tarjetas de ventajas con ícono + stat grande (10x, 80%, N°1, 100%) + título + descripción.
- Tipografía sans-serif geométrica, jerarquía clara (h1 único, h2 por sección).
- Animaciones: scroll-reveal (fade/slide al entrar en viewport), fondo con patrón de red/nodos en el hero (CSS, sin librerías), badges con punto pulsante, panel de especificaciones expandible por tarjeta.
- Grid responsivo: mobile-first, breakpoints en 320px / 768px / 1024px / 1440px.

## Contenido (Secciones)
1. **Header/Nav** — Logo MKT SOFTWARE + navegación ancla a cada software + CTA WhatsApp
2. **Hero** — Propuesta de valor: automatización de redes sociales, todo en un solo lugar
3. **Por qué automatizar** — 3-4 ventajas generales (ahorro de tiempo, escala, consistencia, resultados)
4. **5 secciones de producto** (Instagram, Facebook, WhatsApp, TikTok, YouTube) — cada una con imagen real del producto + lista completa de automatizaciones (contenido extraído de las imágenes provistas por el cliente, sin inventar features)
5. **Comparador rápido** — tabla/resumen para elegir software según red social
6. **CTA final** — botón grande a WhatsApp
7. **Footer** — contacto, marca

## Testing Strategy
Sin framework de testing (sitio estático simple). Verificación manual:
- Servir localmente y revisar en navegador
- Validar HTML semántico (nav, main, section, footer)
- Probar navegación por teclado (Tab) y foco visible
- Revisar responsive en 320/768/1024/1440px
- Confirmar que no hay errores en consola

## Boundaries
- **Always:** usar solo features reales tomadas de las imágenes del cliente (no inventar automatizaciones); mantener accesibilidad básica (contraste, foco, alt text); mobile-first.
- **Ask first:** agregar precios visibles, agregar formularios que envíen datos a un backend, cambiar el CTA principal.
- **Never:** usar datos de clientes/testimonios falsos, prometer resultados/garantías no verificadas.

## Criterios de Éxito
- [ ] Las 5 herramientas están presentes con sus automatizaciones reales
- [ ] Diseño futurista, oscuro, con animaciones al hacer scroll
- [ ] Totalmente responsive (320–1440px+)
- [ ] CTA de WhatsApp visible en header, por sección y al final
- [ ] Sin errores de consola, navegable por teclado

## Supuestos (confirmar o corregir)
1. CTA principal = botón "Hablar por WhatsApp" (no formulario propio) — coherente con el mercado LATAM y con que uno de los productos es WhatsApp Pro. Número placeholder a reemplazar por el real.
2. Sin precios visibles — texto "Consultar planes" que lleva al WhatsApp.
3. Un solo idioma (español).
4. Paleta de marca inferida de las imágenes de producto (navy + naranja + cian), no hay guía de marca previa.
