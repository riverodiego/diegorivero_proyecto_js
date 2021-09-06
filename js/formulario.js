window.onload = function() {
    desconectar.className = "";
    const menu_nav = [{"id":"menu-inicio","estado":false,"ruta":"#","nombre":"Inicio","activo":""},
    {"id":"menu-nva_op","estado":true,"ruta":"#","nombre":"Nueva Operacion","activo":" active"},
    {"id":"menu-feriados","estado":false,"ruta":"#","nombre":"Feriados","activo":""},
    {"id":"menu-historico","estado":false,"ruta":"#","nombre":"Historico","activo":""},
    {"id":"menu-volver","estado":false,"ruta":"index.html","nombre":"Volver","activo":""}
    ];
    logueo_html(menu_nav);
    tiempo_inactivo(120000);
    depurar_ops_sin_totales();
}

construir_operacion_HTML();
