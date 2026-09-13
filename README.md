# ARSPORT — Sistema Integral de Evaluación Deportiva

Aplicación web independiente para registrar, calcular, guardar y comparar evaluaciones ARSPORT.

## Stack
Next.js 15 + React 19. Sin Tailwind, sin librerías externas de UI y sin macros.

## Fichas
01 Datos del deportista · 02 Antropometría y perfil nutricional · 03 Movilidad, flexibilidad y control · 04 Fuerza y potencia · 05 Velocidad 5/10/20 m · 06 Agilidad/cambio de dirección · 07 Resistencia · 08 Informe.

## Datos
En esta primera versión los datos se guardan en localStorage del navegador y pueden exportarse a JSON. La arquitectura queda lista para sustituir el almacenamiento por Supabase posteriormente.

## Vercel
No requiere variables de entorno para arrancar. El comando de producción es `npm run build` y el directorio raíz es el repositorio.
