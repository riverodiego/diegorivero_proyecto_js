/**************INICIO DEL PROYECTO INTEGRADOR********************/
/*SIMULADOR DE OPERACION DE DESCUENTO DE CHEQUE DE PAGO DIFERIDO*/
/****************************************************************/

/*El programa consiste en calcular la operacion de credito sobre
la venta de cheques de pago diferido a plazo, donde aplicando
los descuentos de intereses e impuestos se consiga la liquidacion
neta final del credito al cliente*/

//PUNTO DE PARTIDA DEL LOGIN

let btn_ingresar;

let desconectar = document.getElementById("desconectar");

sessionStorage.length == 2 ? inicializar() : btn_ingresar = construir_login();

function inicializar () {
    let ingreso = document.getElementById("ingreso");
    desconectar.className = "";
    ingreso.className = "d-none";
    const menu_nav = [{"id":"menu-inicio","estado":true,"ruta":"index.html","nombre":"Inicio","activo":" active"},
    {"id":"menu-nva_op","estado":true,"ruta":"formulario.html","nombre":"Nueva Operacion","activo":""},
    {"id":"menu-feriados","estado":true,"ruta":"feriados.html","nombre":"Feriados","activo":""},
    {"id":"menu-historico","estado":true,"ruta":"simulacion.html","nombre":"Historico","activo":""},
    {"id":"menu-volver","estado":false,"ruta":"#","nombre":"Volver","activo":""}
    ];
    logueo_html(menu_nav);
};

    if(btn_ingresar){
        btn_ingresar.onclick = () => {
            let nombre = document.getElementById("nombre");
            sessionStorage.setItem("nomb_usu", nombre.value);
            let buscar_usu = JSON.parse(localStorage.getItem(nombre.value));
            if (!buscar_usu) {
                let cantidad_op = [];
                cantidad_op.push({"contador_op": 0, "stock_op": 0});
                localStorage.setItem(sessionStorage.getItem("nomb_usu"), JSON.stringify(cantidad_op));
            }
            nombre.value = "";
            inicializar ();
            tiempo_inactivo(120000);
            depurar_ops_sin_totales();
        };
    }