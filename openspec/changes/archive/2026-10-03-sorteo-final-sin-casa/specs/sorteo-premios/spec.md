## MODIFIED Requirements

### Requirement: Sorteo de un premio
El sistema SHALL sortear de a un premio por acción del anfitrión, eligiendo al azar entre los invitados elegibles de la tanda en curso, y SHALL mostrar el nombre del ganador en grande. En las tandas de casa el ganador se muestra con el color de su casa; en el sorteo final se muestra con un estilo neutro, sin el color de ninguna casa.

#### Scenario: Sortear un premio de casa
- **WHEN** el anfitrión toca "Sortear" durante la tanda de Slytherin
- **THEN** sale un invitado de Slytherin al azar y su nombre se muestra como ganador de ese premio, con el color de Slytherin

#### Scenario: Sortear el premio final
- **WHEN** el anfitrión toca "Sortear" durante el sorteo final
- **THEN** sale un invitado al azar entre los de todas las casas que todavía no ganaron, y su nombre se muestra sin el color de su casa

### Requirement: Listado de ganadores
El sistema SHALL mostrar en la etapa Premios los ganadores ya sorteados agrupados por tanda, en el orden en que salieron, y SHALL conservarlos al volver a la etapa desde otra o al recargar la página. Los ganadores de las tandas de casa se marcan con el color de su casa; el ganador del sorteo final se muestra sin color de casa.

#### Scenario: Volver a Premios desde Resultados
- **WHEN** el anfitrión sorteó premios, vuelve a Resultados con el stepper y después avanza a Premios
- **THEN** los ganadores ya sorteados siguen mostrándose y el sorteo continúa desde la tanda en curso

#### Scenario: Ganador del sorteo final en el listado
- **WHEN** ya se sorteó el premio final
- **THEN** su fila en el listado aparece bajo "Sorteo final" sin la franja de color de la casa del invitado
