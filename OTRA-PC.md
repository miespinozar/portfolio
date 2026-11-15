# Seguir trabajando desde otra PC

Guía para dejar otra computadora (por ejemplo, la del trabajo) igual que el Fedora, con
todo lo que se hizo hasta el **domingo 15 de noviembre de 2026**.

Los comandos son para **Windows (PowerShell)**. En Linux son los mismos, cambiando las
rutas y usando `dnf` en vez de `winget`.

---

## 1. Qué hay y dónde está

| Proyecto | Dónde vive | Estado |
| --- | --- | --- |
| **portfolio** (el principal, hecho a mano) | https://github.com/miespinozar/portfolio | En curso. Rama abierta: `feature/contacto-footer` |
| portfolio-v2 (HTML) | https://github.com/miespinozar/portfolio-v2 | Solo como fuente de contenido |
| portfolio-v3 (Astro) | https://github.com/miespinozar/portfolio-v3 | Solo como fuente de contenido |
| **Nimbo / Nimbus** | https://gitlab.com/matias.espinoza.rojas/nimbo | v0.3.2 publicada, `main` al día |

> ⚠️ **portfolio-v2 y v3:** sus commits se reescribieron para usar el correo no-reply de
> GitHub, así que **no coinciden con las copias viejas de GitLab**. Si en la otra PC ya
> tienes carpetas viejas de v2/v3, no las uses: clona de nuevo desde GitHub.

---

## 2. Instalar las herramientas

Abre PowerShell y ejecuta:

```powershell
winget install Git.Git
winget install OpenJS.NodeJS.LTS
winget install GitHub.cli
```

Cierra y vuelve a abrir PowerShell para que reconozca los comandos nuevos.

Si PowerShell bloquea `npm` con un error de "scripts deshabilitados" (ya pasó antes):

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Inicia sesión en GitHub:

```powershell
gh auth login
```

Elige `GitHub.com` → `HTTPS` → `Yes` → `Login with a web browser`.

---

## 3. Clonar los proyectos

```powershell
mkdir $HOME\Proyectos
cd $HOME\Proyectos

gh repo clone miespinozar/portfolio
gh repo clone miespinozar/portfolio-v2
gh repo clone miespinozar/portfolio-v3
git clone https://gitlab.com/matias.espinoza.rojas/nimbo.git
```

### Correo de los commits

Para que tu Gmail **no quede público** en GitHub, configura el correo no-reply en cada
repo del portfolio:

```powershell
foreach ($repo in "portfolio", "portfolio-v2", "portfolio-v3") {
  git -C $repo config user.name "Matías Espinoza"
  git -C $repo config user.email "162128064+miespinozar@users.noreply.github.com"
}
```

En Nimbo usa el correo no-reply de GitLab, igual que en el Fedora.

---

## 4. Portfolio: dónde quedamos

```powershell
cd $HOME\Proyectos\portfolio
git switch feature/contacto-footer
npm install
npm run dev
```

Abre http://localhost:4321 y revisa:

- **Inicio:** íconos de LinkedIn, GitHub y GitLab, más el botón "Mi Curriculum".
- **/contact:** página nueva con "¿Trabajamos juntos?", el correo y las redes.
- **Footer:** aparece en las tres páginas.

Si todo está bien, abre el pull request y mergéalo:

```powershell
gh pr create --fill --base main
gh pr merge --merge --delete-branch
git switch main
git pull
```

### Lo que ya está hecho

- Primer commit y repos en GitHub.
- PR #1 `feature/contenido` (mergeado):
  - Educación.
  - "Cómo trabajo" (reemplaza a Servicios).
  - Etiquetas por trabajo.
  - Lion Consulting: **Sep 2023 – Mar 2025**.
  - Carrusel con 23 tecnologías y logos de Simple Icons.
- `feature/contacto-footer` (subida, falta probarla y mergearla): CV, redes, /contact y footer.

### Lo que falta

1. **`feature/navbar-movil`:** menú que se colapsa en el celular, más SEO básico (meta
   description y un título más completo).
2. **`/projects`:** el menú ya tiene el link, pero la página no existe. La idea es poner a
   Nimbo como proyecto destacado.
3. **Ajustes de diseño:** el espaciado y el ancho varían entre secciones, y `SectionTitle` se
   sale de la pantalla en el celular.
4. **Fotos:** `public/profile.png` (inicio) y `public/me.jpg` (/about) todavía no existen.

Decidido **no** traer de v3: las prácticas en Enel X y Puma.

---

## 5. Nimbo: dónde quedamos

Todo está en `main` de GitLab (v0.3.2 + README nuevo). La hoja de ruta original está
completa.

Para compilar en la otra PC sigue `docs/DESARROLLO.md` del repo (Rust, Visual Studio Build
Tools, WebView2). Además, crea el archivo **`.env`** en la raíz de `nimbo`, porque no está
en git. Lleva tu `NIMBO_CLIENT_ID`, que puedes copiar desde:

- el `.env` del Fedora (`~/Proyectos/nimbo/.env`, oculto porque empieza con punto),
- el portal de Microsoft Entra, o
- la variable CI/CD `NIMBO_CLIENT_ID` de GitLab.

Pendientes:

- Subir el `.msi` de Windows a la Release v0.3.2, si no está. Se compila en Windows con
  `npm run tauri build`. Solo se publica el `.msi`, nunca el `.exe`.
- Opcional: hacer que el job `package-linux` falle en los tags si falta `NIMBO_CLIENT_ID`.
- Probar Nimbus instalado desde el rpm en Fedora, con OneDrive real.

---

## 6. Contexto para Claude Code

Claude Code guarda su memoria en cada computadora. La del Fedora está en el repo **privado**
https://github.com/miespinozar/claude-memoria, y ese repo es la propia carpeta de memoria.

### Traer la memoria a la otra PC

1. Abre Claude Code una vez desde tu carpeta de usuario (`cd $HOME` y luego `claude`) y
   ciérralo. Así se crea `$HOME\.claude\projects\<carpeta>`, donde `<carpeta>` es tu ruta
   escrita con guiones, por ejemplo `C--Users-Matias`.
2. Clona el repo dentro, como carpeta `memory`:

   ```powershell
   cd $HOME\.claude\projects\C--Users-Matias
   gh repo clone miespinozar/claude-memoria memory
   ```

   Si `memory` ya existe, renómbrala antes, por ejemplo a `memory-vieja`.
3. Mantenla sincronizada:
   - Al empezar el día: `git -C memory pull`.
   - Al terminar: `git -C memory add -A`, luego
     `git -C memory commit -m "Memoria al día"` y `git -C memory push`.

   Haz lo mismo en el Fedora, desde `~/.claude/projects/-home-matias/memory`.

Si no puedes traer la memoria, al empezar dile a Claude: **"lee OTRA-PC.md del portfolio"**.
Esto es lo que necesita saber:

- **Estilo de código:**
  - Expandido y comentado. Las clases de Tailwind van en varias líneas, agrupadas por
    propósito, con comentarios que nombren cada bloque (`<!-- Icono -->`, `<!-- Grid -->`).
  - Nunca compactar el código.
  - Las props se pasan una por una, sin `{...obj}`.
- **Flujo de trabajo:**
  - Cada cambio va en una rama `feature/...` y entra con un PR/MR, nunca directo a `main`.
  - En Nimbo, cada cambio también se anota en `CHANGELOG.md`, bajo `## [Sin publicar]`.
- **Pruebas:** Matías prueba todo a mano (`npm run dev` / `npm run tauri dev`) antes del
  commit. No lances `tauri dev` en segundo plano, porque ocupa el puerto 1420.
- **Privacidad:**
  - El Gmail nunca va en commits públicos; se usa el correo no-reply.
  - Nimbo no lleva secretos en el repo: `.env` está en gitignore y los tokens se guardan en
    el llavero del sistema.
- **Portfolio:**
  - Astro 5 + Vue + Tailwind 4, multipágina (`/`, `/about`, `/contact`; falta `/projects`).
  - Los logos salen del paquete npm `simple-icons` y quedan dentro del sitio al compilar,
    sin CDN.
  - LinkedIn no está en Simple Icons, así que su path está escrito en
    `src/components/ui/SocialIcons.astro`.
