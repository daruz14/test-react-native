# Portfolio Investment App 📊

Una aplicación React Native desarrollada con Expo que muestra un portafolio de inversión con datos en tiempo real.


## Características

- [X] **Dashboard de Portafolios**: Valor total, P&L y cambio intradía
- [X] **Lista de posiciones**: Tickers, cantidades, precio promedio y actuales, P&L y peso en portafolio
- [X] **Gráfico de Rendimiento**: Visualización de valor del portafolio con diferentes temporalidades (Hoy, 1W, 1M y 2M)
- [X] **Filtros y búsqueda**: Filtrar por ticker y rango de P&L
- [X] **Ordenar por**: P&L, %, peso en portafolio o peso.
- [X] **Datos en tiempo Real**: Conexión WebSocket para precios actualizados

## Aspectos Técnicos

### Arquitectura Modular
- **Custom Hooks**: Separación de lógica de negocio en hooks reutilizables
  - `usePortfolioHistory`: Gestión de datos históricos y cálculos de rendimiento
  - `useTimeRange`: Manejo de rangos temporales para gráficos
  - `usePortfolioFilters`: Lógica de filtrado y ordenamiento de posiciones
- **Context API**: Gestión centralizada del estado del portafolio
- **Componentes Reutilizables**

### Gestión de Estado
- **Portfolio Context**: Estado global con reducer para actualizaciones eficientes
- **WebSocket Integration**: Conexión persistente para datos en tiempo real
- **Error Handling**: Manejo robusto de errores de conexión y estados de carga

### Funcionalidades Avanzadas
- **Filtrado Dinámico**: Búsqueda por ticker y filtros de rango de P&L
- **Ordenamiento Múltiple**: Por P&L, peso en portafolio, valor de mercado y ticker
- **Cálculos Financieros**: Utilidades para P&L, pesos y valores de mercado
- **Gráficos Interactivos**: Visualización de rendimiento con múltiples temporalidades

### Datos Mock

La aplicación utiliza datos simulados para demostrar funcionalidades:

#### Posiciones del Portafolio
- **AAPL**: 100 acciones @ $150.00 promedio
- **GOOGL**: 50 acciones @ $2,800.00 promedio 
- **MSFT**: 75 acciones @ $300.00 promedio
- **TSLA**: 30 acciones @ $800.00 promedio
- **AMZN**: 25 acciones @ $3,200.00 promedio

#### Simulación de Precios
- **Variación Aleatoria**: Los precios fluctúan ±2% cada 2-5 segundos
- **Datos Históricos**: Generación automática de historial de precios
- **Rangos Temporales**: Datos para 1 día, 1 semana, 1 mes y 2 meses

## Requisitos previos

Es necesario tener instalado lo siguiente:
- Node.js
- npm
- Expo CLI

## Instalación y configuración

- Backend:
  1. Vamos a la carpeta del backend
  ```bash
  cd backend
  ```

  2. Instalamos las dependencias
  ```bash
  npm install
  ```

  3. Iniciamos el servidor WebSocket:
  ```bash
    node ws-mock.js
  ```

- Expo app - Mini Zetsy
  1. Vamos a la carpeta del backend
  ```bash
  cd mini-zetsy
  ```

  2. Instalamos las dependencias
  ```bash
  npm install
  ```

  La aplicación a sido desarollada principalmente usando IOS, por lo mismo para reproducir esto, es necesario levantar el simulador de IOS antes de iniciar la aplicación

  3. Iniciamos la app Expo:
  ```bash
    npx expo start
    i #Este comando iniciara la aplicación en IOS
  ```
