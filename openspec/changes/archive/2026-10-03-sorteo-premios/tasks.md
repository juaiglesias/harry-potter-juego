## 1. Dominio

- [x] 1.1 `state.ts`: agregar `{ tipo: 'premios' }` al final de `Etapa` y `ETAPAS_ORDEN`; tipos `Tanda` y `Ganador`, `ProgresoPremios { ganadores: Ganador[] }`, `partida.premios` en `Partida` e `initialState`
- [x] 1.2 `partida.ts`: `nombreEtapa` devuelve "Premios" para la etapa nueva
- [x] 1.3 Crear `src/domain/premios.ts` con `PREMIOS_POR_PUESTO`, `PREMIOS_FINAL`, `tandasPremios`, `elegiblesPremio` y `tandaEnCurso`, según design.md
- [x] 1.4 `actions.ts`: acciones `premios/sortear` y `premios/volver-a-sortear`, ambas con `azar: number`
- [x] 1.5 `reducer.ts`: implementar las dos acciones (sortear en la tanda en curso; reemplazar al último ganador por otro elegible de su tanda, sin efecto si no hay)
- [x] 1.6 `index.ts`: exportar lo nuevo de `premios.ts` y los tipos nuevos

## 2. Persistencia

- [x] 2.1 `local-storage-state-port.ts`: completar con `{ ganadores: [] }` el estado guardado sin `partida.premios`, sin descartarlo

## 3. Pantallas

- [x] 3.1 Crear `PremiosPage.tsx`: encabezado de tanda en curso (casa y puesto, o sorteo final) con "Premio N de M", tarjeta grande del último ganador con color de casa, botones "Sortear" y "Volver a sortear" con `Math.random()` en el handler, mensaje de sorteo terminado y listado de ganadores por tanda
- [x] 3.2 Crear `PremiosPage.css`: tarjeta del ganador legible a distancia, filas del listado con franja del color de casa
- [x] 3.3 `App.tsx`: resolver `PremiosPage` para la etapa `premios`
- [x] 3.4 `ResultadosPage.tsx`: botón "Sortear premios" que avanza a la etapa Premios

## 4. Verificación

- [x] 4.1 Typecheck, lint y build sin errores
- [x] 4.2 Probar en el navegador: orden de tandas de la 4.ª a la 1.ª y final, cantidades 2/3/4/5/1, nadie repite premio (incluido el final), re-sorteo devuelve al descartado al bombo y no repite el mismo nombre, casa con menos invitados que premios pasa a la siguiente tanda, ganadores conservados al volver con el stepper y al recargar, stepper con 8 etapas y vista mobile
