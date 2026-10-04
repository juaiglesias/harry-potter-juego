# sorteo-animacion

## Purpose

Reproducción a pantalla completa del video de la casa sorteada al dar de alta un invitado, con un video por casa servido localmente desde `public/media/casas/`.

## Requirements

### Requirement: Video de casa al confirmar el sorteo
El sistema SHALL, al confirmar el sorteo de un invitado, mostrar a pantalla completa el video correspondiente a la casa que le fue asignada.

#### Scenario: Se reproduce el video de la casa correcta
- **WHEN** el anfitrión confirma el sorteo de un invitado
- **THEN** se muestra a pantalla completa el video de la casa que ya le fue asignada al invitado, con su audio incluido

### Requirement: Cierre automático al terminar el video
El sistema SHALL cerrar automáticamente la animación cuando el video termina de reproducirse, permitiendo cargar el próximo invitado.

#### Scenario: Cierre al terminar
- **WHEN** el video de la casa termina de reproducirse
- **THEN** la animación se cierra automáticamente y el anfitrión puede cargar el próximo invitado

### Requirement: Salir del video con Escape
El sistema SHALL permitir cerrar la animación antes de que termine el video presionando Escape, sin ofrecer otro control para saltearla. Cerrarla antes no cambia ni descarta la casa asignada al invitado.

#### Scenario: Escape durante el video
- **WHEN** el anfitrión presiona Escape mientras se reproduce el video de la casa
- **THEN** la animación se cierra, el invitado queda guardado con la casa sorteada y el anfitrión puede cargar el próximo invitado

#### Scenario: Sin otros controles de salto
- **WHEN** el video de la casa se está reproduciendo
- **THEN** la interfaz no muestra ningún botón para adelantar o cerrar el video

### Requirement: Continuidad ante falla del video
El sistema SHALL cerrar automáticamente la animación si el video no puede reproducirse, para no dejar la partida bloqueada.

#### Scenario: Falla el video de la casa
- **WHEN** el video de la casa no puede reproducirse
- **THEN** la animación se cierra automáticamente, igual que si el video hubiese terminado

### Requirement: Invitado asignado desde el inicio del sorteo
El sistema SHALL mantener la asignación aleatoria de casa del invitado, ya definida al disparar el sorteo, independientemente de la duración o el resultado de la animación.

#### Scenario: La casa no cambia durante la animación
- **WHEN** el video de la casa se está reproduciendo
- **THEN** la casa que se muestra es la misma que quedó asignada al invitado en el momento de disparar el sorteo
