## MODIFIED Requirements

### Requirement: Alta de invitado con sorteo aleatorio
El sistema SHALL, al cargar el nombre de un invitado que llega, pedir confirmación al anfitrión con la pregunta "¿Realizar sorteo de casa para X?" (X es el nombre cargado) y, solo al confirmar, asignarle al azar una de las casas que todavía no alcanzó su cupo.

#### Scenario: Sortear un invitado
- **WHEN** el anfitrión carga el nombre de un invitado, dispara el sorteo y confirma en el modal
- **THEN** el invitado queda asignado a una casa elegida al azar entre las que no llegaron a su cupo

#### Scenario: Pedido de confirmación antes de sortear
- **WHEN** el anfitrión carga el nombre "Luna" y dispara el sorteo
- **THEN** se abre un modal con la pregunta "¿Realizar sorteo de casa para Luna?" y todavía no se agregó ningún invitado ni empezó la animación

#### Scenario: Cancelar el sorteo
- **WHEN** el anfitrión cancela el modal de confirmación del sorteo
- **THEN** el modal se cierra, no se agrega ningún invitado y el nombre cargado sigue en el campo

#### Scenario: Nombre vacío
- **WHEN** el anfitrión dispara el sorteo con el campo de nombre vacío o con solo espacios
- **THEN** no se abre el modal de confirmación ni se agrega ningún invitado

#### Scenario: Casa sin cupo disponible
- **WHEN** todas las casas menos una ya alcanzaron su cupo
- **THEN** el próximo invitado sorteado queda asignado a la única casa con cupo disponible

### Requirement: Eliminación de un invitado
El sistema SHALL permitir eliminar a un invitado ya sorteado, previa confirmación del anfitrión en un modal que nombra al invitado.

#### Scenario: Eliminar un invitado
- **WHEN** el anfitrión toca "Eliminar" en un invitado ya sorteado y confirma en el modal
- **THEN** el invitado deja de aparecer en el roster y su cupo de casa vuelve a estar disponible

#### Scenario: Pedido de confirmación antes de eliminar
- **WHEN** el anfitrión toca "Eliminar" en el invitado "Neville"
- **THEN** se abre un modal que pide confirmar la eliminación de Neville y el invitado sigue en el roster

#### Scenario: Cancelar la eliminación
- **WHEN** el anfitrión cancela el modal de confirmación de eliminación
- **THEN** el modal se cierra y el invitado sigue en el roster con su nombre y su casa sin cambios
