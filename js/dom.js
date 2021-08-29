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
        <button type="button" id="btn_ingresar">Ingresar</button> 
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

function construir_cheques_HTML(cant_op, cont) {
    let contador = "op"+ cant_op + "ch" + cont;
    $("#formu_cheques").css('display', 'flex');
    $("#formu_cheques").append(`
    <div id="caja_ch${contador}">
    <span id="ch_id${contador}"> Id ${contador}</span>
    <label for="chnro">Id Cheque:</label>
    <input type="text" id="ch_nro${contador}" name="chnro" value="111"/>
    <label for="chfvto">F Vto (MM/DD/AAAA): </label>
    <input type="text" id="ch_f_vto${contador}" name="chfvto" value="10/30/2021"/>
    <label for="impch">Importe: </label>
    <input type="text" id="imp_ch${contador}" name="impch" value="250000"/>
    <button type="button" id="mas_ch${contador}" value="${contador}">Agregar Ch</button>
    <button type="button" id="procesar_ch${contador}" value="${contador}">Finalizar Carga</button>
    </div>
    `);
    $(`#procesar_ch${contador}`).click((e) => {
        e.preventDefault();
        totalizar_cheques(cant_op);
        location.href = "simulacion.html";
    });
    $(`#mas_ch${contador}`).click((e) => {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#formu_cheques").offset().top}, 2000);
        si_agrega = true;
        if (validar_cheque(e.target.value,si_agrega)==true){
            let contador = e.target.value;
            $(`#mas_ch${contador}`).remove();
            $(`#procesar_ch${contador}`).remove();
            $(`#ch_nro${contador}`).prop('disabled',true);
            $(`#ch_f_vto${contador}`).prop('disabled',true);
            $(`#imp_ch${contador}`).prop('disabled',true);
            $(`#caja_ch${contador}`).append(`
            <button type="button" id="eliminar_ch${contador}"  value="${contador}">Eliminar Ch</button>
            <button type="button" id="editar_ch${contador}"  value="${contador}">Editar Ch</button>
            <button type="button" id="confirmar_ch${contador}"  value="${contador}">Confirmar Ch</button>
            `);
            construir_cheques_HTML(cant_op, parseInt(cont)+1);
            $(`#eliminar_ch${contador}`).click((e) => {
                e.preventDefault();
                eliminar_cheque(e.target.value);
            });
            $(`#confirmar_ch${contador}`).css('display', 'none');
            $(`#editar_ch${contador}`).click((e) => {
                e.preventDefault();
                $(`#ch_nro${contador}`).prop('disabled',false);
                $(`#ch_f_vto${contador}`).prop('disabled',false);
                $(`#imp_ch${contador}`).prop('disabled',false);
                $(`#eliminar_ch${contador}`).prop('disabled',true);
                $(`#editar_ch${contador}`).css('display', 'none');
                $(`#confirmar_ch${contador}`).css('display', '');
                $(`#confirmar_ch${contador}`).click((e) => {
                    e.preventDefault();
                    si_agrega = false;
                    if (validar_cheque(e.target.value, si_agrega)==true){
                        $(`#eliminar_ch${contador}`).prop('disabled',false);
                        $(`#ch_nro${contador}`).prop('disabled',true);
                        $(`#ch_f_vto${contador}`).prop('disabled',true);
                        $(`#imp_ch${contador}`).prop('disabled',true);
                        $(`#confirmar_ch${contador}`).css('display', 'none');
                        $(`#editar_ch${contador}`).css('display', '');
                    };
                });
            });
        };
    });
};

function construir_resultado_HTML(operac, cheques, total){
    $("#resultado").append(
    `
    <section class="caja_op">
        <ul>
            <li class="d-inline flex"> F Creacion: ${operac.op_f_creacion} </li>
            <li class="d-inline flex"> Id Op: ${operac.op_id} </li>
            <li class="d-inline flex"> F Liq: ${operac.op_f_liq} </li>
            <li class="d-inline flex"> TNA: ${operac.op_tna} </li>
            <li class="d-inline flex"> Gastos: ${operac.op_gastos_porc} </li>
            <li class="d-inline flex"> IVA Percep: ${operac.op_iva_percep} </li>
        </ul>
    </section>
    <table id="tabla${operac.op_id}" class="table table-hover table-bordered">
        <thead>
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
    console.log("cheques");
    console.log(cheques);
    cheques.forEach(cheq => {
        $(`#lista${operac.op_id}`).append( 
        `
        <tr>    
            <th scope="row">${cheq.ch_id} </th>
            <td>${cheq.ch_nro} </td>
            <td>${cheq.ch_f_vto} </td>
            <td>$ ${cheq.ch_importe} </td>
            <td> ${cheq.ch_dias_int} </td>
            <td> $ ${cheq.ch_imp_int} </td>
            <td> $ ${cheq.ch_iva_10_5} </td>
            <td> $ ${cheq.ch_iva_1_5} </td>
            <td> $ ${cheq.ch_gastos_imp} </td>
            <td> $ ${cheq.ch_iva_21} </td>
            <td> $ ${cheq.ch_neto} </td>
        </tr>
        `)});
        $(`#lista${operac.op_id}`).append( 
        `
        <tr>
            <th scope="row">TOTALES</th>
            <td> </td>
            <td> </td>
            <td> $ ${total.total_ch_imp} </td>
            <td> </td>
            <td> $ ${total.total_imp_int} </td>
            <td> $ ${total.total_iva_10_5} </td>
            <td> $ ${total.total_iva_1_5} </td>
            <td> $ ${total.total_gastos_imp} </td>
            <td> $ ${total.total_iva_21} </td>
            <td> $ ${total.total_neto} </td>
        </tr>
    `).slideDown(9000);
}