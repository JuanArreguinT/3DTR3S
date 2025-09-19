# 3DTR3S — Enlaces (Landing estática)

Pagina estatica de enlaces tipo "link in bio" para 3DTR3S. Mobile-first, iconos con Font Awesome, fondo CSS y soporte para intentar abrir apps nativas (Instagram, TikTok, etc.).

## Contenido del repositorio

- `index.html` — página principal con los botones de redes.
- `styles.css` — estilos y fondo CSS.
- `script.js` — lógica de apertura de apps / fallback y copia de label.
- `assets/` — logos, favicon y otros recursos estáticos.

## Requisitos

- Navegador moderno.
- (Opcional) `python3` para servir localmente rápido.

## Previsualizar localmente

1. Abrir una terminal en la carpeta del proyecto.
2. Ejecutar un servidor estático rápido:

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000 en tu navegador
```

Alternativa con Node (si tienes `http-server` instalado):

```bash
npx http-server -c-1 . 8080
# abre http://localhost:8080
```

## Inicializar un repositorio Git y subir a GitHub

```bash
git init
git add .
git commit -m "Initial site"
# crea el repo en GitHub y reemplaza la URL siguiente
git remote add origin git@github.com:TU_USUARIO/TU_REPO.git
git branch -M main
git push -u origin main
```

Consejo: añade un `.gitignore` si vas a incluir archivos temporales o credenciales.

## Despliegue rápido (opciones)

Opción A — GitHub Pages (gratis):

- En el repositorio de GitHub: Settings → Pages → Source = `main` / `root`.
- (Opcional) Añade un archivo `CNAME` en la raíz con `www.tudominio.com` si quieres usar dominio propio.
- En GoDaddy cambia los DNS: añade `A` records de GitHub Pages o un `CNAME` para `www` apuntando a `TU_USUARIO.github.io`.

Opción B — Netlify (fácil, HTTPS automático):

- Regístrate en netlify.com y crea un nuevo sitio.
- Arrastra la carpeta del proyecto al panel (drag & drop) o conecta tu repo de GitHub para despliegues automáticos.
- En Site → Domain management → Add custom domain y sigue las instrucciones DNS.

Opción C — Vercel (similar a Netlify):

- Conecta tu repo o sube el proyecto; añade el dominio en la sección Domains.

Opción D — Firebase Hosting (recomendado si usarás Firebase):

```bash
# instalar Firebase CLI (si no lo tienes)
npm install -g firebase-tools

# login y setup
firebase login
firebase init hosting
# sigue el asistente: elige el proyecto Firebase, carpeta pública = "." (o "public" si quieres mover archivos), no sobreescribir index.html

# deploy
firebase deploy --only hosting
```

Tras el deploy en Firebase, desde Hosting → Domains puedes conectar tu dominio de GoDaddy siguiendo las instrucciones que Firebase muestra (apunta `A` o verifica con registros TXT según el paso).

## Integración con Firebase (opcional)

- Si quieres registrar clics o usar Analytics, crea un proyecto en Firebase y copia la configuración (`firebaseConfig`) en `index.html` antes de `script.js`.
- Ejemplo (usa la versión `compat` si quieres el snippet clásico):

```html
<script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-firestore-compat.js"></script>
<script>
  const firebaseConfig = {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    // etc
  };
  firebase.initializeApp(firebaseConfig);
  window.db = firebase.firestore();
</script>
```

Nota de seguridad: no dejes reglas abiertas en Firestore en producción. Para pruebas temporales puedes relajar las reglas, pero posteriormente configura reglas que verifiquen los datos o añade autenticación.

## Personalizar contenido

- Edita los `a.btn` en `index.html` para cambiar `href` y `data-app` (esquemas). El usuario por defecto en el proyecto es `3dtr3s`.
- Los iconos usan Font Awesome via CDN; si prefieres, cambia por SVGs locales en `assets/`.

## Buenas prácticas antes de publicar

- Revisa que no haya credenciales en el repo.
- Añade `robots.txt` si quieres controlar indexación.
- Comprueba en móvil real que los esquemas abran las apps (Android/iOS).

## Contribuir / Licencia

Si quieres compartir este proyecto publica un `LICENSE` (por ejemplo MIT) y añade un `CONTRIBUTING.md` para normas de colaboración.

---

Si quieres, puedo:
- crear el repo en GitHub y subirlo (necesito que me indiques tu usuario o que ejecutes los comandos locales),
- añadir el snippet de Firebase si me pegas tu `firebaseConfig`,
- o generar un `CNAME` con tu dominio para incluirlo en el repo.

¿Qué prefieres que haga ahora?
