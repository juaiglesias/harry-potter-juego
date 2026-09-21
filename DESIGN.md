# Design System — "Gran Comedor"

Sistema visual para la web del juego. La referencia es el Gran Comedor de noche: techo abierto al cielo, velas suspendidas, mesas de roble, vajilla de peltre y oro, vitrales apagados al fondo.

**Un solo gesto memorable:** la luz de vela. Es la única fuente de luz de toda la interfaz y lo único que se mueve. Todo lo demás es madera, piedra y tinta, quieto y disciplinado.

---

## 1. Principios

1. **La luz viene de arriba y del centro.** Los fondos van de azul nocturno (arriba) a marrón madera (abajo). Ningún elemento se ilumina desde abajo ni desde los lados.
2. **Oro = accionable.** El oro se reserva para lo que se puede tocar (botón primario, foco, valores destacados). Si algo es oro y no responde, sobra.
3. **Superficies, no tarjetas.** El contenido se apoya sobre materiales distintos (madera, pergamino, metal), no flota en cajas idénticas con la misma sombra. Radio y borde según el material.
4. **Los colores de casa son identidad, no UI.** Viven en franjas de pertenencia. Nunca como color de estado: si el rojo de Gryffindor significa "error", la interfaz deja de comunicar.
5. **Legible a media luz.** Fondo oscuro con texto cálido, nunca por debajo de 4.5:1. El ambiente no se cobra en contraste.

---

## 2. Color

### Paleta base

| Token | Hex | Uso |
|---|---|---|
| `--noche` | `#0D1526` | Fondo superior, cielo del techo encantado |
| `--roble` | `#221A13` | Superficie principal, fondo inferior |
| `--piedra` | `#3A342C` | Bordes gruesos, superficies secundarias |
| `--vela` | `#E8B65A` | Acento primario: acciones, foco, énfasis |
| `--cera` | `#F1E3C6` | Texto principal sobre oscuro |
| `--vitral` | `#4A2230` | Fondo de estados negativos |

### Casas

Contrastes ya corregidos: los valores canónicos de bronce y plata no pasaban AA sobre sus fondos.

| Casa | Fondo | Texto | Nota |
|---|---|---|---|
| Gryffindor | `#740001` | `#D3A625` | Valores originales |
| Slytherin | `#1A472A` | `#C2C2C2` | Plata subida desde `#AAAAAA` |
| Ravenclaw | `#0E1A40` | `#C9A961` | Bronce subido desde `#946B2D` |
| Hufflepuff | `#ECB939` | `#372E29` | Única casa con fondo claro |

### Tokens

```css
:root{
  --noche:#0D1526; --roble:#221A13; --piedra:#3A342C;
  --vela:#E8B65A;  --cera:#F1E3C6;  --vitral:#4A2230;

  /* derivados — todo lo demás sale de opacidad, no de hex nuevos */
  --texto:var(--cera);
  --texto-suave:rgba(241,227,198,.66);
  --texto-tenue:rgba(241,227,198,.42);
  --borde:rgba(241,227,198,.14);
  --borde-fuerte:rgba(232,182,90,.38);
  --halo:0 0 32px rgba(232,182,90,.22);

  /* el ambiente: una sola capa, aplicada una vez en body */
  --salon:radial-gradient(120% 70% at 50% 0%, #16223A 0%, #0D1526 38%, #221A13 100%);

  --gryf:#740001; --gryf-t:#D3A625;
  --slyt:#1A472A; --slyt-t:#C2C2C2;
  --rave:#0E1A40; --rave-t:#C9A961;
  --huff:#ECB939; --huff-t:#372E29;
}
```

---

## 3. Tipografía

Tres familias, cada una con un trabajo distinto y sin superponerse.

| Familia | Rol | Origen |
|---|---|---|
| **Harry P** | Solo títulos grandes (h1) | Fan font, self-hosted. Licencia de uso personal |
| **IM Fell English** | Subtítulos (h2, h3) y fallback de Harry P | Google Fonts |
| **EB Garamond** | Cuerpo, UI, formularios, cifras | Google Fonts |

EB Garamond es la equivalente libre de Adobe Garamond, la tipografía real de las ediciones de los libros. No es una aproximación: es el mismo diseño de Claude Garamond.

### Harry P: reglas de uso

- Solo en h1. Un párrafo en esta fuente es ilegible.
- Set de glifos incompleto: **verificar acentos y ñ** antes de comprometer un título. Lo que falte cae al fallback y se nota.
- Declarar siempre la cadena completa. Si el archivo no carga, la página no se rompe:

```css
@font-face{
  font-family:"HarryP";
  src:url("harryp.woff2") format("woff2"),
      url("harryp.ttf") format("truetype");
  font-display:swap;
}
h1{font-family:"HarryP","IM Fell English",Georgia,serif}
```

### Escala

Base 18px, razón ≈1.25.

| Rol | Tamaño / interlineado | Familia |
|---|---|---|
| H1 | 76px / 1.04 (mobile 40–46px) | Harry P |
| H2 | 32px / 1.2 | IM Fell English |
| H3 | 24px / 1.3 | EB Garamond 600 |
| Cuerpo | 18px / 1.62 | EB Garamond 400 |
| Bajada | 21px / 1.5 | EB Garamond 400 |
| Secundario | 15px / 1.55 | EB Garamond 400 |
| Micro | 13px / 1.4 | EB Garamond 500 |

### Reglas

- Medida de línea 62–72 caracteres. Nunca párrafos a ancho completo.
- Sin mayúsculas sostenidas ni versalitas en etiquetas. El registro es de libro impreso, no de cartel.
- El énfasis se hace con cursiva de EB Garamond, no con color.
- Cifras vivas (puntos, contadores) con `font-variant-numeric: tabular-nums` en EB Garamond. No meter una cuarta familia para números.
- `font-display: swap` y fallback serif declarado en las tres.

---

## 4. Layout y espaciado

- Grilla de 12 columnas, gutter 24px, ancho máximo 1160px.
- Escala de espaciado: 4 → 8, 12, 16, 24, 40, 64, 104.
- Separación entre secciones: 104px desktop / 64px mobile.
- Alineación a la izquierda por defecto. Centrado solo en el bloque de apertura.
- El gradiente `--salon` se aplica **una vez** en `body`. Las secciones son transparentes o `rgba(0,0,0,.18)`; nunca repiten el gradiente.
- Breakpoint único en 760px: todo a una columna.

---

## 5. Componentes

**Botón primario** — Fondo `--vela`, texto `--roble`, radio 3px. Sin sombra difusa: un `--halo`. Al hover el halo crece, el color no cambia.

**Botón secundario** — Borde 1px `--borde-fuerte`, fondo transparente, texto `--cera`. Hover: `rgba(232,182,90,.07)`.

**Panel** — Fondo `rgba(241,227,198,.04)`, borde superior 1px `--borde`, radio 2px. Sin sombra: el papel apoyado sobre la mesa no flota.

**Destacado** — Borde 1px `--borde-fuerte` + `--halo`. Único componente autorizado a brillar.

**Franja de casa** — Fondo y texto del par de tokens de la casa, radio 2px, padding 36px 20px. Nombre en IM Fell English 26px.

**Divisor** — Filete 1px `--borde` con un rombo de 6px en `--vela` al centro. Reemplaza a la línea sola en cortes de sección.

**Cabecera de sección** — Filete vertical de 3px `--vela` a la izquierda del h2, a la altura completa del título.

**Campo de texto** — Fondo `--noche` al 60%, sin borde salvo el inferior de 1px `--borde`. Al foco el inferior pasa a 2px `--vela` (compensar el padding para que no salte).

**Error** — Fondo `--vitral`, borde izquierdo 2px `#C2566B`, texto `--cera`. Dice qué pasó y qué hacer. No se disculpa.

**Estado vacío** — Frase en cursiva que invita a actuar, con el botón debajo. Sin ilustración.

---

## 6. Movimiento

Un solo elemento animado en toda la página: el parpadeo de las velas.

```css
@keyframes llama{
  0%,100%{opacity:.92;transform:scale(1)}
  40%    {opacity:1;  transform:scale(1.15)}
  70%    {opacity:.86;transform:scale(.94)}
}
.vela{animation:llama 4.2s ease-in-out infinite}
.vela:nth-child(2){animation-delay:-1.4s}
.vela:nth-child(3){animation-delay:-2.9s}

@media (prefers-reduced-motion:reduce){
  .vela{animation:none}
  *{transition-duration:.01ms!important}
}
```

Transiciones de interacción: 160ms `ease-out`. Nada de fade-and-slide al hacer scroll en cada sección.

---

## 7. Piso de calidad

- Contraste mínimo 4.5:1 en texto, 3:1 en bordes de controles.
- Foco de teclado visible en todo elemento interactivo: `outline: 2px solid var(--vela)` con `outline-offset: 2px`. Nunca `outline:none` sin reemplazo.
- Las velas son decorativas: `aria-hidden="true"`.
- Responsive real hasta 360px.
- `prefers-reduced-motion` respetado.
