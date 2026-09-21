# casas-sorteo

## Purpose

Sorteo de invitados entre las 4 casas de Hogwarts: cálculo de cupos a partir de la cantidad total de participantes y asignación al azar de cada invitado a una casa con cupo disponible.

## Requirements

### Requirement: Configuración de cantidad total y cupos por casa
El sistema SHALL calcular, a partir de la cantidad total de participantes esperados, un cupo por cada una de las 4 casas repartido parejo, sorteando al azar entre las casas cuáles reciben el resto cuando el total no es múltiplo de 4.

#### Scenario: Reparto exacto
- **WHEN** el anfitrión carga un total de participantes múltiplo de 4
- **THEN** las 4 casas quedan con el mismo cupo, sin resto

#### Scenario: Reparto con resto
- **WHEN** el anfitrión carga un total de participantes que no es múltiplo de 4
- **THEN** el resto de la división se sortea al azar entre las casas, cada una recibiendo como máximo un cupo extra

### Requirement: Editar la cantidad total en cualquier momento
El sistema SHALL permitir editar la cantidad total de participantes en cualquier momento, recalculando los cupos por casa.

#### Scenario: Cambiar el total ya cargado
- **WHEN** el anfitrión modifica la cantidad total de participantes después de haber sorteado invitados
- **THEN** los cupos por casa se recalculan a partir del nuevo total

### Requirement: Alta de invitado con sorteo aleatorio
El sistema SHALL, al cargar el nombre de un invitado que llega, asignarle al azar una de las casas que todavía no alcanzó su cupo.

#### Scenario: Sortear un invitado
- **WHEN** el anfitrión carga el nombre de un invitado y dispara el sorteo
- **THEN** el invitado queda asignado a una casa elegida al azar entre las que no llegaron a su cupo

#### Scenario: Casa sin cupo disponible
- **WHEN** todas las casas menos una ya alcanzaron su cupo
- **THEN** el próximo invitado sorteado queda asignado a la única casa con cupo disponible

### Requirement: Edición de un invitado ya sorteado
El sistema SHALL permitir editar el nombre o la casa de un invitado ya sorteado.

#### Scenario: Corregir el nombre de un invitado
- **WHEN** el anfitrión edita el nombre de un invitado ya sorteado
- **THEN** el invitado queda con el nuevo nombre y conserva su casa asignada

### Requirement: Eliminación de un invitado
El sistema SHALL permitir eliminar a un invitado ya sorteado.

#### Scenario: Eliminar un invitado
- **WHEN** el anfitrión elimina a un invitado ya sorteado
- **THEN** el invitado deja de aparecer en el roster y su cupo de casa vuelve a estar disponible
