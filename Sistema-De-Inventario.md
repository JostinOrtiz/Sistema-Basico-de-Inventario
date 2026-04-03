# Sistema de Gestion de Inventario. v1.0

Aplicacion web sencilla para el control de **stock**, **precios**, **categorías** de productos, con persistencia de datos en localStorage.

## Tecnologias usadas
* **HTML 5** → Estructura semantica.
* **CSS** → Diseño y estados visuales.
* **JavaScript (ES6)** → Logica y Manipulación del DOM.
* **LocalStorage** → Persistencia de Datos.

## Caracteristicas Principales
* **CRUD** → Crear, Leer, Editar, Eliminar.
* **Gestión de Stock** → Contron dinamico de cantidades.
* **Validacion de Datos** → Asegura de precios Negativos o Nombres vacios.
* **Persistencia**→ Los datos no se borran al recargar la pagina.

## Aprendizaje aplicado sobre la aplicación
Este sistema es parte de un aprendizaje autonomo para mejorar mis habilidades en la logica de programación.

Evolucione de un **sistema de manejo de usuarios** a un **sistema de gestion de inventario** por la logica mas compleja y calculos matematicos.

### Almacenamiento del sistema
Estoy utilizando **localStorage** para no utilizar una base de datos externa.

Se utiliza `Date.now()` para los *IDs* por garantizar un identificador numerico.

## Como usar la aplicación
*Instrucciones breves*
1. Clona el repositorio en tu maquina local.
2. Abre el archivo `index.html` en cualquier navegador moderno.
3. Comienza a registrar productos en el panel principal.

### Estructura del Objeto Producto
```js
{
    id:171543210,
    nombre:"Mause Inalambrico",
    precio:69.99,
    stock:12,
    categoria:"Perifericos"
}

Organización del proyecto en una arquitectura por capas.

- Se añadió el directorio 'Arquitectura-en-Capas' para una mejor escalabilidad.
- Se separaron las responsabilidades en:
- models/ (lógica de negocio)
- services/ (persistencia/almacenamiento local)
- ui/ (manipulación del DOM)
- Se mantuvo el código en "Spaghetti-Code" para fines comparativos.