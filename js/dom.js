//SE RECORRE LOS ARRAY DE OBJETOS "Operaciones, Cheques y Totales"  y se construye HTML

function logueo_html(menu_nav){
    let usuario = document.getElementById("usuario");
    let nomb_usu = sessionStorage.getItem("nomb_usu");
    !nomb_usu ? usuario.innerHTML = `Ingresa para operar` : usuario.innerHTML = `Bienvenido ${nomb_usu}`;
    construir_menu_nav (menu_nav);
}

function construir_login(){
    $("#ingreso").append(`
        <article id="caja_ingreso" class="col-8 col-md-6 col-lg-3 text-center">
        <h3>Ingresa tu nombre para operar</h3> 
        <input id="nombre" type="text" value="diego" /> 
        <div><button type="button" id="btn_ingresar">Ingresar</button> </div>
        <div id="errorNombre" class="error"></div>  </article>`
        );
    const menu_nav = [{"id":"menu-inicio","estado":false,"ruta":"#","nombre":"Inicio","activo":""},
    {"id":"menu-nva_op","estado":false,"ruta":"#","nombre":"Nueva Operacion","activo":""},
    {"id":"menu-feriados","estado":false,"ruta":"#","nombre":"Feriados","activo":""},
    {"id":"menu-historico","estado":false,"ruta":"#","nombre":"Historico","activo":""},
    {"id":"menu-volver","estado":false,"ruta":"#","nombre":"Volver","activo":""}
    ];
    logueo_html(menu_nav);
    return(document.getElementById("btn_ingresar"))
    };

function construir_menu_nav (menu_nav){
    let html =`<a class="navbar-brand" href="#">Simulador Creditos®</a>
            <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">`;
    menu_nav.forEach(menu => {
        html += activo_inactivo(menu.id, menu.estado, menu.ruta, menu.nombre , menu.activo);
    });
    html +=`</ul> </div>`;
    $("#menu_naveg").html(html);
    function activo_inactivo(id, estado, ruta, nombre, activo) {
        let html;
        estado ? html = `<li id="${id}" class="nav-item ${activo}"> <a class="nav-link" href="${ruta}">${nombre}</a> </li>` : 
        html = `<li id="${id}" class="nav-item"> <a class="nav-link disabled" href="${ruta}" tabindex="-1" aria-disabled="true">${nombre}</a> </li>`;
        return html;
    }
}

function visualizar_tabla_feriados(feriados){
    $("#tabla_feriados").append(
    `
    <table class="table table-hover table-bordered">
    <thead>
        <tr>
            <th scope="col">Dias Feriados</th>
        </tr>
    </thead>
    <tbody id="lista"></tbody>
    </table>
    `);
    feriados.forEach(feriado => {
        $(`#lista`).append( 
        `
        <tr>    
            <td>${feriado} </td>
        </tr>
        `)});
}

function construir_operacion_HTML(){
    $("#formu_operacion").append(`
        <div id="caja_op" class="row justify-content-center">
        <label for="idop" class="col-8 text-center" >Id Op:</label>
        <input type="text" id="op_id" class="col-8 text-center" name="idop" value="" disabled=""/>
        <label for="fechaliq class="col-12 text_center">Fecha Liquidacion:</label>
        <input type="text" id="op_fliq" class="col-8 text-center" name="fechaliq" placeholder="DD/MM/AAAA" maxlength="10" value="" />
        <label for="tasa" class="col-8 text-center">TNA (%): </label>
        <input type="text" id="op_tna" class="col-8 text-center" name="tasa" maxlength="3" value="" />
        <label for="gastos" class="col-8 text-center">GASTOS (%): </label>
        <input type="text" id="op_gastosporc" class="col-8 text-center" name="gastos" maxlength="2" value="" />
        <label for="ivapercep" class="col-8 text-center">IVA PERCEP: </label>
        <select name="ivapercep" id="op_ivap" class="col-8 text-center">
        <option value="seleccion" class="col-6">Seleccione una opcion</option>
        <option value="S" selected>Si</option>
        <option value="N">No</option>
        </select>
        <button type="button" id="btn_cargar_ch" class="mt-3">Cargar Cheques</button>
        </div>
    `);
    $(`#btn_cargar_ch`).click( (e) => {
        e.preventDefault();
        validar_operacion();
    });
    $(`#op_fliq`).keyup( (e) => {
        e.preventDefault();
        let etiqueta = `#op_fliq`;
        let valor = $(etiqueta).val();
        $(etiqueta).val(control_tipeo_fechas(e, etiqueta, valor));
    });
    $(`#op_fliq`).blur( (e) => {
        e.preventDefault();
        let etiqueta = `#op_fliq`;
        let fecha = $(etiqueta).val();
        if (fecha.length < 10 && fecha.length > 0) {
            setTimeout(function() {
                $(etiqueta).focus();
                $(etiqueta).select();
            }, 10);
        }
    });
}

function construir_cheques_HTML(contador_op, cont) {
    let contador = "op"+ contador_op + "ch" + cont;
    $("#op_id").prop("value", contador_op);
    $("#formu_cheques").css({'display':'flex'});
    $("#formu_cheques").append(`
    <div id="caja_ch${contador}" class="row justify-content-between">
        <div id="caja_idch${contador}" class="col-12 col-md-6  col-lg-3 text-center"> 
            <label for="idch" class="d-block">Id Ch: </label>
            <input type="text" id="ch_id${contador}" class="idcheque" name="idch" value="${contador}" disabled=""/>
        </div>
        <div id="caja_chnro${contador}" class="col-12 col-md-6 col-lg-3 text-center">
            <label for="chnro" class="d-block">Nro Ch:</label>
            <input type="text" id="ch_nro${contador}" class="chequenro" name="chnro" value=""/>
        </div>
        <div id="caja_chfvto${contador}" class="col-12 col-md-6 col-lg-3 text-center">
            <label for="chfvto" class="d-block">F Vto: </label>
            <input type="text" id="ch_f_vto${contador}" class="fecha tipeo_fechas" placeholder="DD/MM/AAAA" name="chfvto" maxlength="10" value=""/>
        </div>
        <div id="caja_impch${contador}" class="col-12 col-md-6 col-lg-3 text-center">
            <label for="impch" class="d-block">Importe: </label>
            <input type="text" id="imp_ch${contador}" class="importe" name="impch" value=""/>
        </div>
    </div>
    <div id="caja_botones_ch${contador}" class="text-center mt-2">
        <button type="button" id="mas_ch${contador}" value="${contador}">Agregar Ch</button>
    </div>
    <div id="caja_confirmar_op${contador}" class="text-center mt-2">
        <button type="button" id="confirmar_op${contador}" value="${contador_op}">Confirmar Op</button>
        <button type="button" id="cancelar_op${contador}" value="${contador_op}">Cancelar Op</button>
    </div>
    `);
    $('html, body').animate({ scrollTop: $("#formu_cheques").offset().top}, 1000);
    $(`#ch_f_vto${contador}`).keyup( (e) => {
        e.preventDefault();
        let etiqueta = `#ch_f_vto${contador}`;
        let valor = $(etiqueta).val();
        $(etiqueta).val(control_tipeo_fechas(e, etiqueta, valor));
    });
    $(`#ch_f_vto${contador}`).blur( (e) => {
        e.preventDefault();
        let etiqueta = `#ch_f_vto${contador}`;
        let fecha = $(etiqueta).val();
        if (fecha.length < 10 && fecha.length > 0) {
            setTimeout(function() {
                $(etiqueta).focus();
                $(etiqueta).select();
            }, 10);
        }
    });
    $(`#confirmar_op${contador}`).click((e) => {
        e.preventDefault();
        if (cont > 1){
            totalizar_cheques(e.target.value);
            efecto_desaparecer("formu_operacion","");
            efecto_desaparecer("formu_cheques","");
            setTimeout(function () {location.href = "simulacion.html"},2000);
        }else {
            alerta("DEBE INGRESAR 1 CHEQUE PARA CONFIRMAR", 300);
        }
    });
    $(`#cancelar_op${contador}`).click((e) => {
        e.preventDefault();
        eliminar_op_formulario(e.target.value);
        efecto_desaparecer("formu_operacion","");
        efecto_desaparecer("formu_cheques","");
        setTimeout(function () {location.href = "index.html"},2000);
    });
    $(`#mas_ch${contador}`).click((e) => {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $("#formu_cheques").offset().top}, 1000);
        si_agrega = true;
        if (validar_cheque(e.target.value,si_agrega)==true){
            let contador = e.target.value;
            $(`#mas_ch${contador}`).remove();
            $(`#confirmar_op${contador}`).remove();
            $(`#cancelar_op${contador}`).remove();
            $(`#caja_confirmar_op${contador}`).remove();
            $(`#ch_nro${contador}`).prop('disabled',true).css({"color": "grey", "border-color": "grey"});
            $(`#ch_f_vto${contador}`).prop('disabled',true).css({"color": "grey", "border-color": "grey"});
            $(`#imp_ch${contador}`).prop('disabled',true).css({"color": "grey", "border-color": "grey"});
            $(`#caja_botones_ch${contador}`).append(`
            <button type="button" id="eliminar_ch${contador}"  value="${contador}">Eliminar Ch</button>
            <button type="button" id="editar_ch${contador}"  value="${contador}">Editar Ch</button>
            <button type="button" id="confirmar_ch${contador}"  value="${contador}">Confirmar Ch</button>
            `);
            $(`#eliminar_ch${contador}`).click((e) => {
                e.preventDefault();
                eliminar_cheque(e.target.value);
            });
            $(`#confirmar_ch${contador}`).css('display', 'none');
            $(`#editar_ch${contador}`).click((e) => {
                e.preventDefault();
                $(`#ch_nro${contador}`).prop('disabled',false).css("color", "black");
                $(`#ch_f_vto${contador}`).prop('disabled',false).css("color", "black");
                $(`#imp_ch${contador}`).prop('disabled',false).css("color", "black");
                $(`#eliminar_ch${contador}`).prop('disabled',true).css({"color": "grey", "border-color": "grey"});
                $(`#editar_ch${contador}`).css('display', 'none');
                $(`#confirmar_ch${contador}`).css('display', '');
                $(`#confirmar_ch${contador}`).click((e) => {
                    e.preventDefault();
                    $(`#ch_f_vto${contador}`).keyup( (e) => {
                        e.preventDefault();
                        let etiqueta = `#ch_f_vto${contador}`;
                        let valor = $(etiqueta).val();
                        $(etiqueta).val(control_tipeo_fechas(e, etiqueta, valor));
                    });
                    $(`#ch_f_vto${contador}`).blur( (e) => {
                        e.preventDefault();
                        let etiqueta = `#ch_f_vto${contador}`;
                        let fecha = $(etiqueta).val();
                        if (fecha.length < 10 && fecha.length > 0) {
                            setTimeout(function() {
                                $(etiqueta).focus();
                                $(etiqueta).select();
                            }, 10);
                        }
                    });
                    si_agrega = false;
                    if (validar_cheque(e.target.value, si_agrega)==true){
                        $(`#eliminar_ch${contador}`).prop('disabled',false).css({"color": "rgb(63, 63, 245)", "border-color": "rgb(63, 63, 245)"});
                        $(`#ch_nro${contador}`).prop('disabled',true).css({"color": "grey", "border-color": "grey"});
                        $(`#ch_f_vto${contador}`).prop('disabled',true).css({"color": "grey", "border-color": "grey"});
                        $(`#imp_ch${contador}`).prop('disabled',true).css({"color": "grey", "border-color": "grey"});
                        $(`#confirmar_ch${contador}`).css('display', 'none');
                        $(`#editar_ch${contador}`).css('display', '');
                    };
                });
            });
        construir_cheques_HTML(contador_op, parseInt(cont)+1);
        };
    });
};

function construir_resultado_HTML(operac, cheques, total){
    $("#resultado").append(
    `
    <table id="tabla_op${operac.op_id}" class="table table-hover table-bordered mt-3 w-75">
        <thead class="thead-dark">
            <tr>
                <th scope="col">Id Op</th>
                <th scope="col">F Creacion</th>
                <th scope="col">F Liq</th>
                <th scope="col">TNA</th>
                <th scope="col">Gatos</th>
                <th scope="col">IVA Percep</th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr>    
                <th scope="row">${operac.op_id} </th>
                <td>${operac.op_f_creacion} </td>
                <td>${operac.op_f_liq} </td>
                <td> ${operac.op_tna}%</td>
                <td> ${operac.op_gastos_porc}%</td>
                <td> ${operac.op_iva_percep} </td>
                <td><button type="button" id="mostrar_op${operac.op_id}" value="${operac.op_id}">Mostrar</button></td>
                <td><button type="button" id="eliminar_op_historica${operac.op_id}" value="${operac.op_id}">Eliminar</button></td>
            </tr>
        </tbody>
    </table>
    <table id="tabla_detalle${operac.op_id}" class="table table-hover table-bordered d-none">
        <thead class="thead-dark">
            <tr>
                <th scope="col">Id Ch</th>
                <th scope="col">Nro Ch</th>
                <th scope="col">F Vto</th>
                <th scope="col">Importe</th>
                <th scope="col">Dias Int</th>
                <th scope="col">Intereses</th>
                <th scope="col">IVA 10,5%</th>
                <th scope="col">IVA 1,5%</th>
                <th scope="col">Gastos</th>
                <th scope="col">IVA 21% S/Gts</th>
                <th scope="col">NETO</th>
            </tr>
        </thead>
        <tbody id="lista${operac.op_id}"></tbody>
        </table>        
    `);
    cheques.forEach(cheq => {
        $(`#lista${operac.op_id}`).append( 
        `
        <tr>    
            <th scope="row">${cheq.ch_id} </th>
            <td>${cheq.ch_nro} </td>
            <td>${cheq.ch_f_vto} </td>
            <td>${cheq.ch_importe} </td>
            <td> ${cheq.ch_dias_int} </td>
            <td> ${cheq.ch_imp_int} </td>
            <td> ${cheq.ch_iva_10_5} </td>
            <td> ${cheq.ch_iva_1_5} </td>
            <td> ${cheq.ch_gastos_imp} </td>
            <td> ${cheq.ch_iva_21} </td>
            <td> ${cheq.ch_neto} </td>
        </tr>
        `)});
        $(`#lista${operac.op_id}`).append( 
        `
        <tr>
            <th scope="row">TOTALES</th>
            <td> </td>
            <td> </td>
            <td> ${total.total_ch_imp} </td>
            <td> </td>
            <td> ${total.total_imp_int} </td>
            <td> ${total.total_iva_10_5} </td>
            <td> ${total.total_iva_1_5} </td>
            <td> ${total.total_gastos_imp} </td>
            <td> ${total.total_iva_21} </td>
            <td> ${total.total_neto} </td>
        </tr>
    `).slideDown(9000);
    $(`#mostrar_op${operac.op_id}`).click( (e) => {
        let tabla_detalle = $(`#tabla_detalle${operac.op_id}`);
        if (tabla_detalle.hasClass(`d-none`)) {
            tabla_detalle.removeClass("d-none");
            $('html, body').animate({ scrollTop: tabla_detalle.offset().top}, 100);
            $(`#mostrar_op${operac.op_id}`).html("Ocultar");
        } else{
            tabla_detalle.addClass("d-none");
            $(`#mostrar_op${operac.op_id}`).html("Mostrar");
        }});
    $(`#eliminar_op_historica${operac.op_id}`).click( (e) => {
        eliminar_op_historica(e.target.value);
    });
}