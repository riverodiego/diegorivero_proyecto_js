/*Esta base de fechas de feriados sera utilizada en la version final del proyecto para calcular que 
la F VTO del cheque se corra a un dia habil de ser necesario*/

window.onload = function() {
    desconectar.className = "";
    logueo_html();
    tiempo_inactivo(12000);
}

const URLJSON = "https://raw.githubusercontent.com/riverodiego/json/main/feriados.json"
$("#tabla_feriados").append('<button id="btn1">MOSTRAR FERIADOS</button>');
$("#btn1").css("border-radius","6px");
$("#btn1").click(() => { 
    $.getJSON(URLJSON, function (respuesta, estado) {
        if(estado === "success"){
            visualizar_tabla_feriados(respuesta);
            $("#btn1").prop("disabled",true).css({"color": "grey", "border-color": "grey"});
          }else {
            alert("AH OCURRIDO UN ERROR AL INTENTAR OBTENER DATOS DE LA URL")
          }
    });
});