window.onload = function() {
    desconectar.className = "";
    logueo_html();
    tiempo_inactivo(9000);
    $("btn_cargar_ch").prop('disabled', false);
    $("#menu-nva-op").html(`<a class="nav-link disabled" aria-current="page" href="formulario.html">Nueva Operacion</a>`);
}

let form_carga_op = document.getElementById("formu_operacion");
form_carga_op.addEventListener("submit", validarFormulario);

let cheques = [];