const app = document.getElementById("app");

// Aplicar automáticamente el color del negocio
document.documentElement.style.setProperty(
    "--color-principal",
    negocio.color
);
// =========================
// ENCABEZADO
// =========================

function crearEncabezado() {

    return `

    <div class="container">

        <div class="header">

            <img
                class="logo"
                src="${negocio.logo}"
                alt="${negocio.nombre}"
            >

            <h1>${negocio.nombre}</h1>

            <p class="slogan">

                ${negocio.slogan}

            </p>

            <div class="mensaje">

                ${negocio.mensaje}

            </div>

<div class="hero-info">

    ${negocio.info}

</div>

<div class="hero-detalles">

    ${negocio.detalles}

</div>

<p class="hero-guia">

    👇 Explora nuestro menú y haz tu pedido por WhatsApp

</p>

            </div>

        </div>

    </div>

    `;

}

// =========================
// MENÚ
// =========================

function crearMenu() {

    let categorias = {};

    negocio.productos.forEach(producto => {

        if (!categorias[producto.categoria]) {
            categorias[producto.categoria] = [];
        }

        categorias[producto.categoria].push(producto);

    });

    let menuHTML = `
    <div class="container">
        <div class="card">
            <h2>🍽 Menú</h2>
    `;

    for (let categoria in categorias) {

        menuHTML += `<h3 class="categoria">

    ${categoria}

</h3>`;

        categorias[categoria].forEach(producto => {

            menuHTML += `

            <div class="producto">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                >

                <div class="info">

                    <h3>${producto.nombre}</h3>

                    <p class="descripcion">
                        ${producto.descripcion}
                    </p>

  

    <div class="footer-producto">

    <div class="precio">

        ${producto.precio}

    </div>

    <button
        class="agregar"
        onclick="agregarProducto(${producto.id})">

        Agregar

    </button>

</div>


                </div>

            </div>

            `;

        });

    }

    menuHTML += `
        </div>
    </div>
    `;

    return menuHTML;

}

function crearBotonCarrito(){

    return `

    <div
        id="boton-carrito"
        class="boton-carrito oculto"
        onclick="abrirPedido()">

        🛒 0 productos • $0

    </div>

    `;

}
// =========================
// HORARIO
// =========================

function crearHorario() {

    return `

    <div class="container">

        <div class="card">

            <h2>🕒 Horario</h2>

            <p>${negocio.horario[0]}</p>

            <p>${negocio.horario[1]}</p>

        </div>

    </div>

    `;

}

// =========================
// UBICACIÓN
// =========================

function crearUbicacion() {

    return `

    <div class="container">

        <div class="card">

            <h2>📍 Ubicación</h2>

            <p>

                ${negocio.direccion}

            </p>

            <a
                class="boton"
                href="${negocio.maps}"
                target="_blank"
                style="background:#4285F4;">

                🗺️ Abrir en Google Maps

            </a>

        </div>

    </div>

    `;

}

// =========================
// BOTÓN WHATSAPP
// =========================

function crearWhatsApp() {

    return `

    <a
        id="boton-whatsapp"
        class="whatsapp-fijo"
        href="${negocio.whatsapp}"
        target="_blank"
        style="background:${negocio.color};">

        📲 Pedir por WhatsApp

    </a>

    `;

}

function crearModalPedido(){

    return `

    <div id="pedido-modal" class="pedido-modal">

        <div class="pedido-sheet">

            <div class="pedido-header">

                <h2>🛒 Tu pedido</h2>

                <button
                    class="cerrar-modal"
                    onclick="cerrarPedido()">

                    ✕

                </button>

            </div>

            <div id="pedido-contenido">

                <!-- Aquí aparecerán los productos -->

            </div>
  <div id="pedido-formulario" style="display:none;">
<button
class="volver-pedido"
onclick="volverPedido()">

← Volver al pedido

</button>
<h3>Datos del pedido</h3>

<input
id="cliente-nombre"
class="input-pedido"
type="text"
placeholder="Nombre">

<select
id="tipo-servicio"
class="input-pedido"
onchange="cambiarTipoServicio()">

<option value="Comer aquí">
Comer aquí
</option>

<option value="Recoger">
Recoger
</option>

<option value="Domicilio">
Domicilio
</option>

</select>

<textarea
id="cliente-direccion"
class="input-pedido"
placeholder="Dirección"
style="display:none;"></textarea>

<textarea
id="cliente-comentarios"
class="input-pedido"
placeholder="Comentarios (opcional)"></textarea>

</div>
            <div class="pedido-footer">

                <button
                id="continuar-pedido"
               class="continuar"
                onclick="accionPedido()">

                  Continuar

                </button>

            </div>

        </div>

    </div>

    `;

}

function crearQR() {

    return `

    <div class="container">

        <div class="card qr-card">

            <h2>📱 Escanea el menú</h2>
          <div class="qr-badge">

✨ Comparte fácilmente

</div>
            <p class="qr-text">

                Escanea este código para abrir el menú desde cualquier celular.

            </p>

            <div id="qrcode"></div>

            <p class="qr-footer">

                📍 Ideal para mesas, mostrador o publicaciones en redes.

            </p>

        </div>

    </div>

    `;

}

function consultarWhatsApp(){

    const mensaje =
`Hola 👋

Vi su menú en LocalWeb y tengo una consulta.`;

    const url =
`${negocio.whatsapp}?text=${encodeURIComponent(mensaje)}`;

    window.location.href = url;

}
// =========================
// MOSTRAR LA PÁGINA
// =========================

app.innerHTML =

    crearEncabezado() +

    crearMenu() +

    crearHorario() +

    crearUbicacion() +
    
    crearQR() +
  
    crearModalPedido() +
  
    crearWhatsApp()+
    
    crearBotonCarrito();
    
    actualizarCarrito();
    
    new QRCode(document.getElementById("qrcode"),{

    text: negocio.url,

    width: 180,

    height: 180

});