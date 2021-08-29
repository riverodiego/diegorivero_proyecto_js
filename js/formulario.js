window.onload = function() {
    desconectar.className = "";
    const menu_nav = [{"id":"menu-inicio","estado":true,"ruta":"index.html","nombre":"Inicio","activo":""},
    {"id":"menu-nva_op","estado":true,"ruta":"#","nombre":"Nueva Operacion","activo":" active"},
    {"id":"menu-feriados","estado":false,"ruta":"#","nombre":"Feriados","activo":""},
    {"id":"menu-historico","estado":false,"ruta":"#","nombre":"Historico","activo":""},
    {"id":"menu-volver","estado":true,"ruta":"index.html","nombre":"Volver","activo":""}
    ];
    logueo_html(menu_nav);
    tiempo_inactivo(12000);
    $("btn_cargar_ch").prop('disabled', false);
}

let form_carga_op = document.getElementById("formu_operacion");
form_carga_op.addEventListener("submit", validarFormulario);

//let cheques = [];