# Para Arely 💛

Página web romántica e interactiva, instalable como **PWA**, hecha con
**Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion**.
Iconografía 100% de `lucide-react`.

## ✨ Características

- **Hero** con el nombre en tipografía display (Cormorant Garamond), animación de
  entrada (fade + scale + blur) y fondo de gradiente atardecer/noche con partículas.
- **Mensaje animado** que aparece línea por línea (fade secuencial).
- **Sección "Razones"**: 4 tarjetas con _flip 3D_ al pasar el cursor o tocar,
  cada una con su ícono de lucide.
- **Momento final interactivo**: la pregunta con botón **Sí** y un botón **No**
  que se escapa del cursor (y del dedo en móvil). Al decir "Sí" → lluvia de
  corazones + mensaje romántico.
- **Música opcional** con botón toggle.
- **PWA**: `manifest.json` + service worker → instalable y funciona offline.
- **Responsive** mobile-first y **accesible** (foco visible, `prefers-reduced-motion`).

## 🚀 Cómo correr

```bash
npm install
npm run dev
```

Abre http://localhost:3000

> Funciona sin pasos extra. El service worker se registra solo; la instalación
> PWA es más fiable en build de producción (`npm run build && npm run start`).

## 📝 Personalizar el contenido

**Todo** el texto editable está en un solo archivo:

```
config/content.ts
```

Ahí puedes cambiar:
- `name` y `tagline` (hero)
- `message` (líneas del mensaje animado)
- `reasons` (las 4 tarjetas: ícono, título y texto)
- `finalQuestion` (pregunta, etiquetas de botones y mensaje de éxito)
- `music.src` (ruta de la canción)

Íconos permitidos en las tarjetas: `Sparkles`, `Smile`, `Star`, `Heart`
(todos de lucide-react).

## 🎵 Música

Coloca tu archivo en `public/music/song.mp3`. Si no existe, el botón de música
simplemente no se muestra.

## 🎨 Paleta

Ciruela (`plum`), rosa (`rosa`) y dorado (`gold`), definidas en
`tailwind.config.ts`. Cálida y sofisticada, sin rojos neón.

## 📱 Iconos PWA

Se usan iconos **SVG** (`public/icons/icon.svg` y `icon-maskable.svg`), que los
navegadores modernos aceptan para instalar. Si quieres iconos PNG nativos
(recomendado para iOS), genera versiones 192/512 px desde el SVG (p. ej. con
[realfavicongenerator.net](https://realfavicongenerator.net) o `sharp`) y añade
las entradas en `public/manifest.json`.

## ☁️ Deploy en Vercel

1. Sube el proyecto a un repositorio de GitHub/GitLab/Bitbucket.
2. Entra en [vercel.com](https://vercel.com) → **Add New… → Project**.
3. Importa el repositorio. Vercel detecta Next.js automáticamente:
   - Framework Preset: **Next.js**
   - Build Command: `next build` (por defecto)
   - Output: gestionado por Vercel
4. Pulsa **Deploy**. En ~1 min tendrás una URL `https://tu-proyecto.vercel.app`.

Alternativa por CLI:

```bash
npm i -g vercel
vercel          # primer deploy (preview)
vercel --prod   # deploy a producción
```

Una vez desplegado en HTTPS, abre la URL en el móvil → menú del navegador →
**"Agregar a pantalla de inicio"** para instalarla como app. 💕
