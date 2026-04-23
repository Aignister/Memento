## Introducción

Su objetivo principal es capturar y externalizar el estado interno de un objeto en un momento determinado, de manera que dicho estado pueda ser restaurado posteriormente sin violar los principios de encapsulamiento. Para lograrlo, el patrón define tres participantes clave: el **Originador**, que es el objeto cuyo estado se desea preservar; el **Memento**, que almacena una instantánea de ese estado y el **Cuidador**, responsable de custodiar y administrar los mementos sin acceder a su contenido interno.

Este patrón encuentra aplicación en múltiples como editores de texto con funcionalidad de deshacer/rehacer, sistemas de control de versiones, simuladores de estados y videojuegos con puntos de guardado. De este modo, es posible implementar dichas funcionalidades manteniendo el código organizado, protegiendo la estructura interna del objeto y evitando dependencias innecesarias entre los distintos componentes del sistema.

## Conclusión

El patrón Memento resulta útil en situaciones donde se necesita guardar y recuperar el estado de un objeto sin comprometer su encapsulamiento. Gracias a la división de responsabilidades entre el **Originador**, el **Memento** y el **Cuidador**, el sistema puede mantener un historial de estados de manera ordenada, sin que los demás componentes necesiten conocer los detalles internos del objeto.

Su aplicación tiene un costo: guardar múltiples instantáneas del estado puede volverse costoso en términos de memoria, sobre todo cuando el objeto maneja una gran cantidad de datos o cuando los cambios ocurren con mucha frecuencia. Por ello, antes de implementarlo conviene analizar si las necesidades del sistema justifican ese consumo adicional de recursos.

## Referencias

Shvets, A. (2021). *Dive into design patterns*. Refactoring.Guru. https://refactoring.guru/design-patterns/memento
