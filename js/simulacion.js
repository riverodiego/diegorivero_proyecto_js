window.onload = function() {
    desconectar.className = "";
    const menu_nav = [{"id":"menu-inicio","estado":true,"ruta":"index.html","nombre":"Inicio","activo":""},
    {"id":"menu-nva_op","estado":true,"ruta":"formulario.html","nombre":"Nueva Operacion","activo":""},
    {"id":"menu-feriados","estado":true,"ruta":"feriados.html","nombre":"Feriados","activo":""},
    {"id":"menu-historico","estado":true,"ruta":"#","nombre":"Historico","activo":" active"},
    {"id":"menu-volver","estado":true,"ruta":"index.html","nombre":"Volver","activo":""}
    ];
    logueo_html(menu_nav);
    tiempo_inactivo(120000);
    depurar_ops_sin_totales();
}
let op = [];
let usuario = sessionStorage.getItem("nomb_usu");
op = JSON.parse(localStorage.getItem(usuario));
let contador_op = op[0].contador_op;
if (contador_op == 0){
    $("#resultado"). html(`
        <div class="alert alert-secondary text-center" role="alert">
        No Existen operaciones para mostrar
        </div>`).css("margin","200px 0");
}

//recorro las operaciones y construyo el resultado
for (let i = contador_op ; i >= 1 ; i--){
    let cheques_encontrados = [];
    let op_encontrada = op.find(e => e.op_id == i);
    if (typeof op_encontrada !== "undefined") {
        let ini = op.indexOf(op_encontrada);
        let total_encontrado = op.find(e => e.total_id == i);
        let fin = op.indexOf(total_encontrado);
        let tope = fin - ini;
        for (let j = 1; j < tope; j++){
            let indice = ini+j;
            cheques_encontrados.push(op[indice]);
            }
        construir_resultado_HTML(op_encontrada, cheques_encontrados, total_encontrado);
        }
    }