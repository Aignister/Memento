## Integrantes
- Luis Enrique Torres Murillo
- Kevin Omar Alvarez Hernandez
- Jose Angel Mojica Fajardo
- Gonzalo Cortez Huerta




## Introducción

El objetivo principal busca guardar una copia del estado de un objeto en un momento específico para poder recuperarlo más adelante, sin romper el encapsulamiento propio del objeto. Para lograrlo, el patrón define tres caracterisitcas: el **Originador**, que es el objeto cuyo estado se desea preservar; el **Memento**, que almacena una instantánea de ese estado y el **Cuidador**, responsable de custodiar y administrar los mementos sin acceder a su contenido interno.

Este patrón se encuentra aplicado en múltiples editores de texto con funcionalidad de deshacer/rehacer, sistemas de control de versiones, simuladores de estados y videojuegos con puntos de guardado. De este modo, es posible implementar dichas funcionalidades manteniendo el código organizado, protegiendo la estructura interna del objeto y evitando dependencias innecesarias entre los distintos componentes del sistema.

## Diagramas UML
<img width="1360" height="1604" alt="Diagrama en blanco (12)" src="https://github.com/user-attachments/assets/497f906f-650b-45b9-8ffc-e0b947479257" />


## Conclusión

El patrón Memento resulta útil en situaciones donde se necesita guardar y recuperar el estado de un objeto sin comprometer su encapsulamiento. Gracias a la división de responsabilidades entre el **Originador**, el **Memento** y el **Cuidador**, el sistema puede mantener un historial de estados de manera ordenada, sin que los demás componentes necesiten conocer los detalles internos del objeto.

Su aplicación tiene un costo: guardar múltiples instantáneas del estado puede volverse costoso en términos de memoria, sobre todo cuando el objeto maneja una gran cantidad de datos o cuando los cambios ocurren con mucha frecuencia. Por ello, antes de implementarlo conviene analizar si las necesidades del sistema justifican ese consumo adicional de recursos.

## Referencias

Shvets, A. (2021). *Dive into design patterns*. Refactoring.Guru. https://refactoring.guru/design-patterns/memento
