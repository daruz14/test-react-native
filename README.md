# Portfolio Investment App 📊

Una aplicación React Native desarrollada con Expo que muestra un portafolio de inversión con datos en tiempo real.


## Características

- [X] **Dashboard de Portafolios**: Valor total, P&L y cambio intradía
- [X] **Lista de posiciones**: Tickers, cantidades, precio promedio y actuales, P&L y peso en portafolio
- [ ] **Gráfico de Rendimiento**: Visualización de valor del portafolio con diferentes temporalidades (Hoy, 1W, 1M y 2M)
- [ ] **Filtros y búsqueda**: Filtrar por ticker y rango de P&L
- [ ] **Ordenar por**: P&L, %, peso en portafolio o peso.
- [X] **Datos en tiempo Real**: Conexión WebSocket para precios actualizados

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
