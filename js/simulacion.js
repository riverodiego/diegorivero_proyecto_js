window.onload = function() {
    desconectar.className = "";
    logueo_html();
    tiempo_inactivo(12000);
}
let op = [];
let usuario = sessionStorage.getItem("nomb_usu");
op = JSON.parse(localStorage.getItem(usuario));
let cant_op = op[0].cant_op;
//recorro las operaciones y construyo el resultado
for (let i = 1 ; i <= cant_op ; i++){
    let cheques_encontrados = [];
    let op_encontrada = op.find(e => e.op_id == i);
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