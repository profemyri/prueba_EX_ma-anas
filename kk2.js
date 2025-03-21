document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("pedidoForm");
    const tipoPescado = document.getElementById("tipo_pescado");
    const cantidad = document.getElementById("cantidad");
    const acomp = document.querySelectorAll("input[name='acompanamiento']");
    const totalSpan = document.getElementById("total");
    const instrucciones = document.getElementById("instrucciones");
    const contador = document.getElementById("contador");
    const botonModoOscuro = document.getElementById("modoOscuro");
    const body = document.body;

    function calcularTotal() {
        let precioBase = {
            "calamares": 6,
            "adobo": 7,
            "boquerones": 8
        }[tipoPescado.value] || 0;

        let cantidadSeleccionada = parseInt(cantidad.value, 10);
        let precioAcomp = 0;
        acomp.forEach(el => { if (el.checked) precioAcomp += 4; });

        let total = (precioBase + precioAcomp) * cantidadSeleccionada;
        totalSpan.textContent = total + "€";
    }

    function validarFormulario(event) {
        let nombre = document.getElementById("nombre").value.trim();
        let email = document.getElementById("email").value.trim();
        let direccion = document.getElementById("direccion").value.trim();
        let telefono = document.getElementById("telefono").value.trim();
        
        if (!nombre || !email.includes("@") || direccion.length < 18 || !/^[0-9]{9}$/.test(telefono)) {
            alert("Algunos campos son incorrectos o están incompletos");
            event.preventDefault();
        } else {
            if (!confirm("¿Seguro que quieres confirmar y enviar tu pedido ahora?")) {
                event.preventDefault();
            } else {
                alert("¡Gracias por tu pedido, " + nombre + "!");
            }
        }
    }

    function actualizarContador() {
        contador.textContent = instrucciones.value.length + "/150 caracteres";
    }

    function toggleModoOscuro() {
        body.classList.toggle("dark-mode");
        botonModoOscuro.textContent = body.classList.contains("dark-mode") ? "Modo Claro" : "Modo Oscuro";
    }

    tipoPescado.addEventListener("change", calcularTotal);
    cantidad.addEventListener("change", calcularTotal);
    acomp.forEach(el => el.addEventListener("change", calcularTotal));
    instrucciones.addEventListener("input", actualizarContador);
    botonModoOscuro.addEventListener("click", toggleModoOscuro);
    form.addEventListener("submit", validarFormulario);
});
