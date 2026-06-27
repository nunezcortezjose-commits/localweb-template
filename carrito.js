// =========================
// CARRITO LOCALWEB
// =========================

let pedido = [];

// Agregar un producto
function agregarProducto(id){

    const producto = negocio.productos.find(p => p.id === id);
  if(!producto) return;
    const existente = pedido.find(p => p.id === id);

    if(existente){

        existente.cantidad++;

    }else{

        pedido.push({

            id:id,

            nombre:producto.nombre,

            precio:Number(producto.precio.replace("$","")),

            cantidad:1

        });

    }

    actualizarCarrito();

}

function aumentarProducto(id){

    const producto = pedido.find(p => p.id === id);

    if(!producto) return;

    producto.cantidad++;

    actualizarCarrito();

    renderPedido();

}

function disminuirProducto(id){

    const producto = pedido.find(p => p.id === id);

    if(!producto) return;

    producto.cantidad--;

    if(producto.cantidad<=0){

        pedido = pedido.filter(p => p.id !== id);

    }

    actualizarCarrito();

    renderPedido();

}

// Calcular total
function calcularTotal(){

    return pedido.reduce((total,p)=>{

        return total + (p.precio*p.cantidad);

    },0);

}

// Cantidad total
function cantidadProductos(){

    return pedido.reduce((total,p)=>{

        return total+p.cantidad;

    },0);

}

// Actualizar botón
function actualizarCarrito(){

    const boton = document.getElementById("boton-carrito");

    if(!boton) return;

    if(pedido.length===0){

        boton.classList.add("oculto");

        return;

    }

    boton.classList.remove("oculto");

    boton.innerHTML=

    `🛒 ${cantidadProductos()} productos • $${calcularTotal()} · Ver pedido`;

}

function renderPedido(){

    const contenedor = document.getElementById("pedido-contenido");

    if(!contenedor) return;

    let html = "";

    pedido.forEach(item=>{

        html += `

        <div class="item-pedido">

            <div>

                <strong>${item.nombre}</strong>

                <div class="controles">

<button
onclick="disminuirProducto(${item.id})">

−

</button>

<span>

${item.cantidad}

</span>

<button
onclick="aumentarProducto(${item.id})">

+

</button>

</div>

            </div>

            <div class="subtotal">

                $${item.precio * item.cantidad}

            </div>

        </div>

        `;

    });

    html += `

    <div class="pedido-total">

        <span>Total</span>

        <strong>$${calcularTotal()}</strong>

    </div>

    `;

    contenedor.innerHTML = html;

}


function abrirPedido(){

    renderPedido();

    document
        .getElementById("pedido-modal")
        .classList.add("mostrar");

}

function cerrarPedido(){

    document
        .getElementById("pedido-modal")
        .classList.remove("mostrar");

}

function mostrarFormulario(){

    document
        .getElementById("pedido-contenido")
        .style.display="none";

    document
        .getElementById("pedido-formulario")
        .style.display="block";

}

function cambiarTipoServicio(){

    const tipo =
        document.getElementById("tipo-servicio").value;

    document
        .getElementById("cliente-direccion")
        .style.display =
            tipo==="Domicilio"
            ? "block"
            : "none";

}

function volverPedido(){

    document
        .getElementById("pedido-contenido")
        .style.display="block";

    document
        .getElementById("pedido-formulario")
        .style.display="none";

}
function accionPedido(){

    const formulario =
        document.getElementById("pedido-formulario");

    if(formulario.style.display==="none"){

        mostrarFormulario();

        document
            .getElementById("continuar-pedido")
            .innerHTML="Enviar por WhatsApp";

        return;

    }

    enviarPedido();

}

function generarNumeroPedido(){

    let numero =
        Number(localStorage.getItem("pedidoNumero")) || 0;

    numero++;

    localStorage.setItem("pedidoNumero", numero);

    return String(numero).padStart(3,"0");

}

function obtenerFechaHora(){

    const ahora = new Date();

    return ahora.toLocaleString("es-MX",{

        day:"2-digit",

        month:"2-digit",

        year:"numeric",

        hour:"2-digit",

        minute:"2-digit"

    });

}

function enviarPedido(){
  const numeroPedido = generarNumeroPedido();

const fechaHora = obtenerFechaHora();
    const nombre =
        document.getElementById("cliente-nombre").value.trim();

    if(nombre===""){

        alert("Escribe tu nombre.");

        return;

    }

    const tipo =
        document.getElementById("tipo-servicio").value;

    const direccion =
        document.getElementById("cliente-direccion").value.trim();

    const comentarios =
        document.getElementById("cliente-comentarios").value.trim();

    let mensaje =
`🔔 *NUEVO PEDIDO* #${numeroPedido}

🍔 ${negocio.nombre}

🕒 ${fechaHora}

━━━━━━━━━━━━━━

🍽 *PEDIDO*

`;

    pedido.forEach(item=>{

    mensaje +=
`🌮 ${item.nombre} ×${item.cantidad} — $${item.precio*item.cantidad}
`;

});

    mensaje +=

`
━━━━━━━━━━━━━━

💰 *TOTAL: $${calcularTotal()}*

`;

mensaje +=

`
👤 ${nombre}
🚚 ${tipo}
`;

    if(tipo==="Domicilio"){

        mensaje +=
`📍 Dirección:
${direccion}

`;

    }

    if(comentarios!==""){

        mensaje +=
`📝 Comentarios:
${comentarios}

`;

    }

    mensaje +=
`━━━━━━━━━━━━━━

¡Gracias! 😊`;

    const url =
`${negocio.whatsapp}?text=${encodeURIComponent(mensaje)}`;
window.location.href = url;
}