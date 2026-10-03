## Context

`ResultadosPage` renderiza `<h1>Resultados</h1>` seguido de `MarcadorCasas variante="destacada"`, que pinta las casas como etiquetas en fila ordenadas por `rankingCasas` (descendente). El `h1` global tiene `margin: 0`, por eso el marcador queda pegado al título. La variante `destacada` solo se usa en Resultados; el resto de las pantallas usa `compacta`.

Los puntajes totales pueden ser 0 o negativos: el Tabú resta 10 por error y una casa puede cerrar la partida por debajo de cero.

## Goals / Non-Goals

**Goals:**
- Podio legible a distancia (se proyecta), con colores de casa y altura según puntaje.
- Orden de izquierda a derecha de menor a mayor puntaje.
- Separación visible entre el título y el podio.

**Non-Goals:**
- Animaciones de entrada del podio o revelado progresivo.
- Desglose de puntaje por juego.
- Cambios en `domain/` o en el cálculo del ranking.

## Decisions

**Componente nuevo `PodioCasas` en lugar de una tercera variante de `MarcadorCasas`.** El podio tiene otra estructura (columnas alineadas abajo, alturas calculadas) y compartiría poco con el marcador más allá de leer el estado. Se quita la variante `destacada` de `MarcadorCasas`, que queda sin uso; así el marcador vuelve a ser solo el compacto de las pantallas de juego y desaparece la rama de ranking que tenía adentro.

**Orden ascendente invirtiendo `rankingCasas`.** `rankingCasas` ya ordena descendente y calcula `ganadora` contemplando empates. El podio usa `[...rankingCasas(...)].reverse()`. Entre casas empatadas el orden relativo no importa porque tienen la misma altura.

**Altura proporcional al puntaje sobre el máximo, con piso.** `altura = max(PISO, puntaje / puntajeMaximo)` como porcentaje de la altura del podio, con `PISO` del 20% para que entren nombre y puntaje. Si el puntaje es 0 o negativo, o si el máximo es 0 o negativo, la casa queda en el piso. Alternativa descartada: normalizar entre mínimo y máximo, porque fuerza al último a la altura mínima aunque haya quedado cerca del primero y exagera diferencias chicas. La altura se aplica como `style={{ minHeight: '<n>%' }}` sobre un contenedor de alto fijo. Se usa `min-height` y no `height` para que, si el porcentaje no alcanza para nombre y puntaje, el rectángulo crezca hasta contenerlos; `min-height: min-content` sobre un `height` en porcentaje no funciona en WebKit.

**Layout.** Un `<ol>` flex con `align-items: flex-end` y alto fijo (alrededor de 320px, menor en mobile), 4 columnas de igual ancho. Cada rectángulo usa `COLORES_CASA[casa]` para fondo y texto, con nombre y puntaje arriba dentro del rectángulo. La ganadora conserva `--halo` y el borde `--borde-fuerte` que hoy tiene la variante destacada. El puntaje usa números lining (EB Garamond con `lining-nums`), porque la fuente de títulos usa oldstyle y los números se leen mal.

**Separación del título.** `margin-top: var(--espacio-6)` en el podio, sin tocar el estilo global del `h1`.

## Risks / Trade-offs

- [Nombres largos ("Hufflepuff", "Gryffindor") en columnas angostas de mobile] → en mobile fuente `--tam-micro`, gap mínimo y sin padding horizontal en el rectángulo, con `overflow-wrap: anywhere` como respaldo.
- [Con todas las casas en 0 (partida sin jugar) el podio queda plano en el piso] → aceptable: refleja el estado real y todas quedan marcadas como ganadoras por empate, igual que hoy.
