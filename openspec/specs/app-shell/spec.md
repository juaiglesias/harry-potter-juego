# app-shell

## Purpose

Esqueleto base de la aplicación: funcionamiento offline, estado global persistido, cambio de pantalla sin router y sistema visual compartido. No incluye ninguna regla de negocio del juego.

## Requirements

### Requirement: Funcionamiento sin conexión
El sistema SHALL funcionar completamente sin conexión a internet, incluyendo todas las tipografías y assets visuales.

#### Scenario: Carga de la app sin red
- **WHEN** la app se abre en un navegador sin conexión a internet
- **THEN** todo el texto se renderiza con las tipografías previstas y ningún asset visual falla al cargar

#### Scenario: Sin pedidos a proveedores externos de tipografía
- **WHEN** la app termina de cargar
- **THEN** no se realiza ningún pedido de red a un CDN de tipografías externo

### Requirement: Estado global único
El sistema SHALL exponer un único store de estado global, construido con un reducer puro y accesible a todo el árbol de UI mediante un context de React.

#### Scenario: Una acción actualiza el estado
- **WHEN** un componente despacha una acción al store global
- **THEN** el store calcula el próximo estado a través del reducer y los componentes suscriptos se vuelven a renderizar con el nuevo valor

### Requirement: Persistencia del estado entre recargas
El sistema SHALL persistir el estado global a almacenamiento local ante cada cambio, y restaurarlo al iniciar la app.

#### Scenario: Recargar la app restaura el estado previo
- **WHEN** la app se cierra o se refresca después de haber cambiado su estado
- **THEN** al volver a abrirla, el estado restaurado coincide con el último guardado

#### Scenario: Primera carga sin estado guardado
- **WHEN** la app inicia y no hay ningún estado guardado previamente
- **THEN** la app arranca con un estado inicial por defecto, sin errores

### Requirement: Cambio de pantalla sin router
El sistema SHALL determinar qué pantalla se muestra a partir de un único valor de estado, sin utilizar una librería de routing por URL.

#### Scenario: Cambiar la pantalla activa
- **WHEN** el valor de pantalla activa en el estado global cambia
- **THEN** la app renderiza únicamente el componente de pantalla correspondiente a ese valor

### Requirement: Tokens de diseño compartidos
El sistema SHALL exponer los tokens de color, tipografía y espaciado de `DESIGN.md` como variables CSS globales, consumidas por todos los componentes de UI en lugar de valores hardcodeados.

#### Scenario: Un componente usa los tokens compartidos
- **WHEN** se renderiza un componente de `presentation/components`
- **THEN** sus colores y tipografía provienen de las variables CSS globales, no de valores fijos en el componente
