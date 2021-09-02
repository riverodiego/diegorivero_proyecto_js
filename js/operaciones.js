function guardar_local(clave, valor) { 
    localStorage.setItem(clave, valor) 
}

function caja_borde_color(id, color) {
    document.getElementById(id).style.border = "1px Solid " + color;
}

//DETECCION TIEMPO INACTIVO

desconectar.onclick = () => {
    tiempo_inactivo(15);
}

var tiempo_inactivo = function (corte) {
    var tiempo;
    window.onload = resetear_tiempo;
    // DOM Events
    document.onmousemove = resetear_tiempo;
    document.onkeypress = resetear_tiempo;
    document.onload = resetear_tiempo;
    document.onmousedown = resetear_tiempo;
    document.ontouchstart = resetear_tiempo;
    document.onclick = resetear_tiempo;
    document.onscroll = resetear_tiempo;
    document.onkeypress = resetear_tiempo;

    function deslogueo() {
        sessionStorage.clear();
        document.getElementById("desconectar").className = "d-none";
        usuario.innerHTML = '';
        alert("Tu session a expirado.");
        location.href="index.html";
    }

    function resetear_tiempo() {
        clearTimeout(tiempo);
        if (sessionStorage.length > 1 && corte != 0) {
            tiempo = setTimeout(deslogueo, corte);
        }
        // 1000 milliseconds = 1 second
    }
};

//FUNCIONES PARA VALIDAR DATOS OPERACION Y CARGAR LOS CHEQUES

function validarFormulario(e){
    e.preventDefault();
    let usuario = sessionStorage.getItem("nomb_usu");
    let operaciones = [];
    operaciones = JSON.parse(localStorage.getItem(usuario));
    localStorage.removeItem(usuario);
    operaciones[0].cant_op = parseInt(operaciones[0].cant_op) + 1;
    let agregar_op = new operacion(operaciones[0].cant_op, "", 0, 0, "","");
    let error = document.getElementById("error");
    let fecha = new Date(document.getElementById("op_fliq").value);
    let tna = document.getElementById("op_tna").value;
    let gastos_porc = document.getElementById("op_gastosporc").value;
    error.innerHTML= "";
    error.style.color = "red";
    if(fecha != "" && Date.parse(fecha)){
        agregar_op["op_f_liq"] = document.getElementById("op_fliq").value
        caja_borde_color("op_fliq","green")
    }else{
        error.innerHTML = "Debe seleccionar una Fecha Liq valida. </br>"
        caja_borde_color("op_fliq","red")
    }
    if( tna != "" && parseFloat(tna) ){
        agregar_op["op_tna"] = document.getElementById("op_tna").value
        caja_borde_color("op_tna","green")
    }else{
        error.innerHTML += "Debe seleccionar valor numerico en TNA. </br>"
        caja_borde_color("op_tna","red")
    }
    if( gastos_porc != "" && parseFloat(gastos_porc) ){
        agregar_op["op_gastos_porc"] = document.getElementById("op_gastosporc").value
        caja_borde_color("op_gastosporc","green")
    }else{
        error.innerHTML += "Debe seleccionar valor numerico en Gastos. </br>"
        caja_borde_color("op_gastosporc","red")
    }
    if(document.getElementById("op_ivap").value != "seleccion"){
        agregar_op["op_iva_percep"] = document.getElementById("op_ivap").value
        caja_borde_color("op_ivap","green")
    }else{
        error.innerHTML += "Debe seleccionar SI o NO en IVA Percep. </br>"
        caja_borde_color("op_ivap","red")
    }
    if(error.innerHTML == ""){
        operaciones.push(agregar_op);
        guardar_local(usuario, JSON.stringify(operaciones));
        $("#formu_operacion").children().prop('disabled', true).css({"color": "grey", "border-color": "grey"});
        construir_cheques_HTML(operaciones[0].cant_op, 1);
    }
}

function validar_cheque(e,si_agrega){
    let usuario = sessionStorage.getItem("nomb_usu");
    let operaciones = [];
    operaciones = JSON.parse(localStorage.getItem(usuario));
    let op_id = operaciones[0].cant_op;
    let op_actual = operaciones.find(elem => elem.op_id == op_id.toString());
    let ch_actual = operaciones.find(elem => elem.ch_id == e);
    let error = $("#error");
    let fecha = new Date($(`#ch_f_vto${e}`).val());
    let ch_nro = $(`#ch_nro${e}`).val();
    let imp_ch = $(`#imp_ch${e}`).val();
    let agregar_cheque = new cheque(e, 0, "", 0); 
    error.html = "";
    error.css("color","red");
if(fecha != "" && Date.parse(fecha)){
    agregar_cheque["ch_f_vto"] = $(`#ch_f_vto${e}`).val();
    caja_borde_color(`ch_f_vto${e}`,"green")
}else{
    error.html = "Debe seleccionar una Fecha Vto valida. </br>"
    $("#error").html(error.html)
    caja_borde_color(`ch_f_vto${e}`,"red")
}
if( ch_nro != "" && parseFloat(ch_nro) ){
    agregar_cheque["ch_nro"] = ch_nro;
    caja_borde_color(`ch_nro${e}`,"green")
}else{
    error.html += "Debe seleccionar valor numerico en Id Ch. </br>"
    $("#error").html(error.html)
    caja_borde_color(`ch_nro${e}`,"red")
}
if( imp_ch != "" && parseFloat(imp_ch) ){
    agregar_cheque["ch_importe"] = imp_ch;
    caja_borde_color(`imp_ch${e}`,"green")
}else{
    error.html += "Debe seleccionar valor numerico en Importe Cheque. </br>"
    $("#error").html(error.html)
    caja_borde_color(`imp_ch${e}`,"red")
}
if(error.html == ""){
    $("#error").html("");
    agregar_cheque.descontar(op_actual.op_f_liq, op_actual.op_tna, op_actual.op_gastos_porc, op_actual.op_iva_percep);
    if (si_agrega) {
        operaciones.push(agregar_cheque);
        localStorage.removeItem(usuario);
        guardar_local(usuario, JSON.stringify(operaciones));
    }else {
        editar_cheque(agregar_cheque, operaciones, ch_actual, usuario);
        }
    return true;
    }
}

function eliminar_cheque(e){
    $(`#caja_ch${e}`).fadeIn(4000,function(){$(`#caja_ch${e}`).css("background-color","white")});
    $(`#caja_ch${e}`).fadeOut(3000,function(){$(`#caja_ch${e}`).remove()});
    let usuario = sessionStorage.getItem("nomb_usu");
    let operaciones = [];
    operaciones = JSON.parse(localStorage.getItem(usuario));
    operaciones = operaciones.filter(elem => elem.ch_id != e);
    localStorage.removeItem(usuario);
    guardar_local(usuario, JSON.stringify(operaciones));
}

function editar_cheque(agregar_cheque, operaciones, ch_actual, usuario){
    let posicion = operaciones.indexOf(ch_actual);
    operaciones[posicion] = agregar_cheque;
    localStorage.removeItem(usuario);
    guardar_local(usuario, JSON.stringify(operaciones));
}

function totalizar_cheques(cant_op){
    let usuario = sessionStorage.getItem("nomb_usu");
    let op = [];
    op = JSON.parse(localStorage.getItem(usuario));
    let total = new totalizar(cant_op);
    const fin = op.length;
    let inicial = op.indexOf(op.find(e => e.op_id == cant_op)) + 1;
    for (let i = inicial; i < fin; i++ ){
        total.sumar(op[i].ch_importe, op[i].ch_imp_int, op[i].ch_iva_10_5, op[i].ch_iva_1_5, op[i].ch_gastos_imp, op[i].ch_iva_21, op[i].ch_neto);
    }
    op.push(total);
    localStorage.removeItem(usuario);
    guardar_local(usuario, JSON.stringify(op));
}

function eliminar_op_historica(e){
    $(`#tabla_op${e}`).fadeIn(4000,function(){$(`#tabla_op${e}`).css("background-color","white")});
    $(`#tabla_op${e}`).fadeOut(3000,function(){$(`#tabla_op${e}`).remove()});
    let usuario = sessionStorage.getItem("nomb_usu");
    let operaciones = [];
    let operaciones_aux = [];
    operaciones = JSON.parse(localStorage.getItem(usuario));
    //operaciones[0].cant_op = operaciones[0].cant_op - 1;
    console.log("operaciones0");
    console.log(operaciones);
    console.log(e);
    
    operaciones = operaciones.filter(elem => elem.op_id != e);
    operaciones = operaciones.filter(elem => elem.total_id != e);
    operaciones.forEach((elem) => {
        if(elem.ch_id) {
            let a = elem.ch_id;
            if (a.substring(0,3) != "op"+e) { operaciones_aux.push(elem);}
            } else {
                operaciones_aux.push(elem);
            }
        });
    console.log("operaciones");
    console.log(operaciones_aux);
    localStorage.removeItem(usuario);
    guardar_local(usuario, JSON.stringify(operaciones_aux));
}


//FUNCIONES DE CALCULOS aux_chequeIARES

function calc_dias_int(dia1, dia2){
    dia2 = new Date(dia2);
    dia1 = new Date(dia1);
    let diferencia= Math.abs(dia2-dia1);
    let resultado = diferencia/(1000 * 3600 * 24);
    return resultado.toFixed(0)
}
function calc_imp_int(monto, dias, tasa){
    let intereses = (parseFloat(monto) * parseFloat(tasa) / 36500) * parseInt(dias);
    return intereses.toFixed(2)
}        
function calc_iva_10_5(imp_int){
    let iva_10_5 = parseFloat(imp_int) * 0.105;
    iva_10_5 = parseFloat(iva_10_5).toFixed(2);
    return iva_10_5
}
function calc_iva_1_5(imp_int, iva_percep){
    let iva_1_5;
    if (iva_percep == "S") {
        iva_1_5 = parseFloat(imp_int) * 0.015;
        iva_1_5 = parseFloat(iva_1_5).toFixed(2);
    }else {
        iva_1_5 = 0;
    }
    return iva_1_5
}
function calc_gts_imp(ch_imp, gts_porc, gts_min){
    let gastos_imp = parseFloat(ch_imp) * parseFloat(gts_porc) /100;
    gastos_imp = parseFloat(gastos_imp).toFixed(2);
    gts_min = parseInt(gts_min);
    if (gastos_imp < gts_min){
        gastos_imp = gts_min
    }
    return gastos_imp
}
function calc_iva_21(gts_imp){
    let iva_21 = parseFloat(gts_imp) * 0.21;
    iva_21 = parseFloat(iva_21).toFixed(2);
    return iva_21
}