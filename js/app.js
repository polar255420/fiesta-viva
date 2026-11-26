/* Fiesta Viva · interacción de la página */
const botonMenu = document.querySelector(".menu-boton");
const menu = document.getElementById("menu-principal");
botonMenu.addEventListener("click", () => {
  const abierto = menu.classList.toggle("abierto");
  botonMenu.setAttribute("aria-expanded", String(abierto));
  botonMenu.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
});
menu.addEventListener("click", (evento) => {
  if (evento.target.closest("a")) {
    menu.classList.remove("abierto");
    botonMenu.setAttribute("aria-expanded", "false");
    botonMenu.setAttribute("aria-label", "Abrir menú");
  }
});
const formulario = document.getElementById("form-cotizacion");
const resultado = document.getElementById("resultado");
const CAMPOS = ["nombre", "correo", "tipo", "fecha", "invitados"];
function leerFormulario() {
  const datos = new FormData(formulario);
  return { nombre: datos.get("nombre"), correo: datos.get("correo"), tipo: datos.get("tipo"), fecha: datos.get("fecha"), invitados: datos.get("invitados"), paquete: datos.get("paquete"), extras: datos.getAll("extras") };
}
function mostrarErrores(errores) {
  for (const campo of CAMPOS) {
    const entrada = document.getElementById(campo);
    const mensaje = document.getElementById("error-" + campo);
    const texto = errores[campo] || "";
    mensaje.textContent = texto;
    if (texto) entrada.setAttribute("aria-invalid", "true");
    else entrada.removeAttribute("aria-invalid");
  }
  const primero = CAMPOS.find((campo) => errores[campo]);
  if (primero) document.getElementById(primero).focus();
}
function crear(etiqueta, clase, texto) {
  const nodo = document.createElement(etiqueta);
  if (clase) nodo.className = clase;
  if (texto !== undefined) nodo.textContent = texto;
  return nodo;
}
function mostrarResumen(datos, cotizacion) {
  const saludo = crear("p", "resumen__saludo", `Hola, ${datos.nombre.trim()}. Esta es tu cotización para: ${cotizacion.tipo}.`);
  const tabla = crear("table", "resumen__tabla");
  const cuerpo = document.createElement("tbody");
  const filas = [...cotizacion.detalle.map((d) => [d.concepto, d.monto]), ["Subtotal", cotizacion.subtotal], ["IGV (18 %)", cotizacion.igv]];
  for (const [concepto, monto] of filas) {
    const fila = document.createElement("tr");
    fila.append(crear("td", "", concepto), crear("td", "", formatearSoles(monto)));
    cuerpo.append(fila);
  }
  tabla.append(cuerpo);
  const total = crear("p", "resumen__total", "Total: " + formatearSoles(cotizacion.total));
  const nota = crear("p", "resumen__nota", "Precio referencial. Te enviaremos la propuesta final a " + datos.correo.trim() + ".");
  resultado.replaceChildren(saludo, tabla, total, nota);
}
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const datos = leerFormulario();
  const errores = validarDatos(datos);
  mostrarErrores(errores);
  if (Object.keys(errores).length) return;
  mostrarResumen(datos, calcularCotizacion(datos));
});
const minima = new Date();
minima.setHours(12, 0, 0, 0);
minima.setDate(minima.getDate() + TARIFAS.diasAnticipacion);
const dosDigitos = (n) => String(n).padStart(2, "0");
document.getElementById("fecha").min = `${minima.getFullYear()}-${dosDigitos(minima.getMonth() + 1)}-${dosDigitos(minima.getDate())}`;
document.getElementById("anio").textContent = new Date().getFullYear();
