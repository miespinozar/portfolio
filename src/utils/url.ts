// Arma una ruta interna del sitio sumándole la base de la publicación.
// En GitHub Pages el sitio vive en /portfolio/, así que "/about" pasa a ser "/portfolio/about".
// La base se configura en astro.config.mjs (`base`).
export function url(ruta: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return base + ruta;
}

// Lo contrario: quita la base de una ruta, para comparar con "/about", "/projects"...
export function sinBase(ruta: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const limpia = ruta.startsWith(base) ? ruta.slice(base.length) : ruta;
  return limpia.replace(/\/$/, "") || "/";
}
