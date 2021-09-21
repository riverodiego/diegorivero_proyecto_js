function control_tipeo_fechas(ev, etiqueta, valor) {
//wich 8 es el valor de la keycode de la tecla backspace
const dia1= /[^0-3]/g;
const dia2= /[^0-9]/g;
const dia2_30_o_31= /[^0-1]/g;
const mes3= /[^0-1]/g;
const mes4_star_0_dia_31= /[^1|^3|^5|^7|^8]/g;
const mes4_star_0_dia_sin_2= /[^0-1|^3-9]/g
const mes4_star_0_dia_todos= /[^1-9]/g;
const mes4_star_1_dia_31= /[^0|^2]/g;
const mes4_star_1_dia_todos= /[^0-2]/g;
const anio5=/[^2]/g;
const anio6=/[^0]/g;
const anio7=/[^2]/g;
const anio8=/[^1-9]/g;
const anio8_29_feb=/[^4|^8]/g;
let dia_completo, mes_completo, out;
console.log("ev");
console.log(ev);
if (ev.which !== 8) {
    let input = valor;
    input = input.replace(/[/]/g, '');
    let largo = input.length;
    let posicion_final = input.charAt(largo-1);
    let posicion_anterior = input.charAt(largo-2);
    switch (largo) {
        case 1: 
            posicion_final = posicion_final.replace(dia1, '');
            break;
        case 2:
            if (posicion_anterior == 3){
                posicion_final = posicion_final.replace(dia2_30_o_31, '');
            } else {
                posicion_final = posicion_final.replace(dia2, '');
            }
            break;
        case 3:
            posicion_final = posicion_final.replace(mes3, '');
            break;
        case 4:
            dia_completo = input.substring(0,2);
            if (posicion_anterior == 0){
                if (dia_completo < 30){
                    posicion_final = posicion_final.replace(mes4_star_0_dia_todos, '');
                }else if (dia_completo == 30) {
                    posicion_final = posicion_final.replace(mes4_star_0_dia_sin_2, '');
                }else if (dia_completo == 31) {
                    posicion_final = posicion_final.replace(mes4_star_0_dia_31, '');
                }
            }else {
                if (dia_completo == 31) {
                    posicion_final = posicion_final.replace(mes4_star_1_dia_31, '');
                }else{
                    posicion_final = posicion_final.replace(mes4_star_1_dia_todos, '');
                }
            }
            break;
        case 5:
            posicion_final = posicion_final.replace(anio5, '');
            break;
        case 6:
            posicion_final = posicion_final.replace(anio6, '');
            break;
        case 7:
            posicion_final = posicion_final.replace(anio7, '');
            break;
        case 8:
            dia_completo = input.substring(0,2);
            mes_completo = parseInt(input.substring(2,4));
            //control de 29 Feb figura año 2024 y 2028
            if (dia_completo == 29 && mes_completo == 2){
                posicion_final = posicion_final.replace(anio8_29_feb, '');
            }else{
                posicion_final = posicion_final.replace(anio8, '');
            }
            break;
    }
    out = input.substring(0,largo-1) + posicion_final;
    console.log("out");
    console.log(out);
    let len = out.length;
    if (len > 1 && len < 4) {
        out = out.substring(0, 2) + '/' + out.substring(2, 3);
        } else if (len >= 4) {
            out = out.substring(0, 2) + '/' + out.substring(2, 4) + '/' + out.substring(4, len);
            out = out.substring(0, 10)
        }
    valor = out;
    }
    return valor;
};