/**************INICIO DEL PROYECTO INTEGRADOR********************/
/*SIMULADOR DE OPERACION DE DESCUENTO DE CHEQUE DE PAGO DIFERIDO*/
/****************************************************************/

/*El programa consiste en calcular la operacion de credito sobre
la venta de cheques de pago diferido a plazo, donde aplicando
los descuentos de intereses e impuestos se consiga la liquidacion
neta final del credito al cliente*/

//PUNTO DE PARTIDA DEL LOGIN

let nombre = document.getElementById("nombre");
let boton_nomb = document.getElementById("btn_nombre");
let desconectar = document.getElementById("desconectar");
let ingreso = document.getElementById("ingreso");

boton_nomb.onclick = () => { 
    sessionStorage.setItem("nomb_usu", nombre.value);
    let buscar_usu = JSON.parse(localStorage.getItem(nombre.value));
    if (!buscar_usu) {
        let cantidad_op = [];
        cantidad_op.push({cant_op: 0});
        localStorage.setItem(sessionStorage.getItem("nomb_usu"), JSON.stringify(cantidad_op));
    }
    nombre.value = "";
    desconectar.className = "";
    ingreso.className = "d-none";
    logueo_html();
    tiempo_inactivo(9000);
}

