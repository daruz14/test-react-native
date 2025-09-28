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

## Instalación y Ejecución

### Requisitos Previos
- Node.js (v16 o superior)
- npm o yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (Xcode) o dispositivo iOS

### Pasos de Instalación

1. **Backend WebSocket**
   ```bash
   cd backend
   npm install
   node ws-mock.js
   ```
   El servidor estará disponible en `ws://localhost:8081`

2. **Aplicación React Native**
   ```bash
   cd mini-zetsy
   npm install
   ```

3. **Ejecutar la aplicación**
   ```bash
   npx expo start
   # Presiona 'i' para iOS simulator
   # Presiona 'a' para Android emulator
   ```
  La aplicación está optimizada para iOS

## Decisiones Técnicas y Trade-offs

### Arquitectura Elegida
- **Context + Hooks**: Elegido sobre Redux para simplicidad en un proyecto de demostración
  - ✅ Menos boilerplate, setup más rápido
  - ❌ Menos herramientas de debugging comparado con Redux DevTools

- **WebSocket Mock**: Simulación local vs API real
  - ✅ Desarrollo independiente, datos controlados
  - ❌ No refleja latencias reales o problemas de red

### Estructura de Componentes
- **Modularización agresiva**: Separación en hooks y componentes pequeños
  - ✅ Reutilización, testabilidad, mantenibilidad
  - ❌ Mayor número de archivos, potencial over-engineering

- **TypeScript**: Tipado estricto
  - ✅ Detección temprana de errores, mejor DX
  - ❌ Tiempo adicional de desarrollo inicial

## Límites Conocidos

### Funcionalidades
- **Datos Mock**: Solo 5 posiciones simuladas
- **Temporalidades**: Limitado a 4 rangos de tiempo predefinidos
- **Autenticación**: No implementada (fuera del scope)
- **Persistencia**: Los datos se pierden al reiniciar la aplicación

### Técnicas
- **Performance**: Sin virtualización para listas grandes (React.memo implementado)
- **Offline**: No hay soporte para modo offline
- **Testing**: Tests unitarios no implementados (tiempo limitado)
- **Accesibilidad**: Implementación básica, podría mejorarse

### Compatibilidad
- **Plataformas**: Optimizado principalmente para iOS
- **Dispositivos**: Diseño responsive básico, mejor en tablets/teléfonos grandes

## Tiempo Invertido

-  Desarrollo Total: ~3-4 horas

### Balance IA vs Humano
  #### Contribución de GitHub Copilot
  - Autocompletado de código
  - Mejoras de typo
  - Mejoras en estructura final del ReadMe
  - Asistencia en búsqueda de bugs

- **IA (~20%)**
- **Humano (~80%)**
