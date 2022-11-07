# Proyecto #2

Este proyecto fue creado siguiendo los principios de Arquitectura Limpia™ de
Bob Martin.

```
src
├── domain
│   ├── common
│   │   ├── constants.js
│   │   ├── IllegalArgumentException.js
│   │   └── NonEmptyString.js
│   ├── PokemonId.js
│   ├── Pokemon.js
│   ├── PokemonService.js
│   ├── PokemonStat.js
│   └── PokemonType.js
├── index.js
└── infrastructure
    └── PokemonApiService.js
```

El dominio consiste de todas las entidades y _aggregates_, junto con los llamados _puertos_
que sirven para interactuar con servicios externos.

La idea es que el mismo dominio pueda utilizarse para implementar ya sea un aplicación web o
de consola haciendo uso de una arquitectura de plugins.
