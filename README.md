# Fiesta Viva · Sitio web con cotizador de eventos

Proyecto del Laboratorio 13 de Desarrollo de aplicaciones web I. Empresa ficticia creada con fines académicos.

## Cómo ejecutarlo
1. Abre la carpeta `fiesta-viva` en Visual Studio Code.
2. Clic derecho en `index.html` → **Open with Live Server**.
3. Abre el cotizador desde el menú o el botón principal.
4. Ejecuta las pruebas con Node.js 18 o superior: `node pruebas/cotizador.test.js`.

No requiere instalación de dependencias, servidor PHP ni conexión a internet.

## Estructura
- `index.html`: página principal y contenido semántico.
- `css/estilos.css`: estilos mobile-first y responsive.
- `js/cotizador.js`: tarifas, validación y cálculo, independiente del DOM.
- `js/app.js`: menú, formulario y resumen seguro.
- `img/`: 26 recursos gráficos JPG, WebP y PNG.
- `pruebas/cotizador.test.js`: diez pruebas automáticas con Node.js.
- `.github/copilot-instructions.md`: reglas del proyecto para asistentes de IA.

## Reglas de cotización
- Paquetes por invitado: Esencial S/ 45, Clásico S/ 70 y Premium S/ 110 (sin IGV).
- Adicionales: DJ y sonido S/ 900; fotografía y video S/ 1 200; hora loca S/ 650; animación infantil S/ 500; mesa de postres S/ 750.
- Entre 20 y 500 invitados, en números enteros.
- Anticipación mínima: 15 días.
- Recargo de 10 % los sábados sobre paquete y adicionales.
- IGV: 18 % sobre el subtotal.

## Uso de inteligencia artificial
- Se utilizó un asistente de IA para apoyar la estructura HTML, los estilos, las funciones JavaScript, los textos y las ilustraciones del sitio.
- El código fue revisado y probado; las reglas del cotizador se mantienen separadas del DOM para facilitar las pruebas.
- La propuesta insegura que insertaba el nombre del usuario mediante `innerHTML` se evitó: el resumen final crea nodos con `createElement`, asigna contenido con `textContent` y usa `replaceChildren`, previniendo XSS.
- Las fechas se interpretan en hora local y se rechazan fechas inexistentes como el 30 de febrero.
- Las imágenes son ilustraciones de referencia y no representan eventos reales. Los textos y resultados son referenciales.

## Prueba de cotización de referencia
Boda, sábado 19/12/2026, 120 invitados, Premium, DJ y fotografía:
- Paquete: S/ 13 200,00
- Adicionales: S/ 2 100,00
- Recargo sábado (10 %): S/ 1 530,00
- Subtotal: S/ 16 830,00
- IGV (18 %): S/ 3 029,40
- **Total: S/ 19 859,40**

## Control de versiones
```bash
git init
git add .
git commit -m "feat: landing de Fiesta Viva con cotizador (asistido por IA y revisado)"
```
