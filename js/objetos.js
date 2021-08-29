class operacion {
    constructor(op_id, op_f_liq, op_tna, op_gastos_porc, op_iva_percep){
        this.op_f_creacion = new Date();
        this.op_f_creacion = this.op_f_creacion.toLocaleString();
        this.op_id = op_id;
        this.op_f_liq = new Date(op_f_liq);
        this.op_tna = parseFloat(op_tna);
        this.op_gastos_porc = parseFloat(op_gastos_porc);
        this.op_iva_percep = op_iva_percep.toUpperCase();
        }
}

class cheque{
    constructor(ch_id, ch_nro, ch_f_vto, ch_importe){
        this.ch_id = ch_id;
        this.ch_nro = ch_nro;
        this.ch_f_vto = ch_f_vto;
        this.ch_importe = ch_importe;
        this.ch_dias_int = 0;
        this.ch_imp_int = 0;
        this.ch_iva_10_5 = 0;
        this.ch_iva_1_5 = 0;
        this.ch_gastos_imp = 0;
        this.ch_gastos_min = 7.50;
        this.ch_iva_21 = 0;
        this.ch_neto = 0;
    }
    descontar(op_f_liq,op_tna,op_gastos_porc,op_iva_percep){
        this.ch_dias_int = calc_dias_int(op_f_liq,this.ch_f_vto)
        this.ch_imp_int = calc_imp_int(this.ch_importe, this.ch_dias_int, op_tna)
        this.ch_imp_int = parseFloat(this.ch_imp_int).toFixed(2)
        this.ch_iva_10_5 = calc_iva_10_5(this.ch_imp_int)
        this.ch_iva_10_5 = parseFloat(this.ch_iva_10_5).toFixed(2)
        this.ch_iva_1_5 = calc_iva_1_5(this.ch_imp_int, op_iva_percep)
        this.ch_iva_1_5 = parseFloat(this.ch_iva_1_5).toFixed(2)
        this.ch_gastos_imp = calc_gts_imp(this.ch_importe, op_gastos_porc, this.ch_gastos_min)
        this.ch_gastos_imp = parseFloat(this.ch_gastos_imp).toFixed(2)
        this.ch_iva_21 = calc_iva_21(this.ch_gastos_imp)
        this.ch_iva_21 = parseFloat(this.ch_iva_21).toFixed(2)
        let gastos = parseFloat(this.ch_imp_int) + parseFloat(this.ch_iva_10_5) + parseFloat(this.ch_iva_1_5) + parseFloat(this.ch_gastos_imp) + parseFloat(this.ch_iva_21);
        gastos = parseFloat(gastos).toFixed(2);
        this.ch_importe = parseFloat(this.ch_importe).toFixed(2);
        this.ch_neto = this.ch_importe - gastos;
        this.ch_neto = parseFloat(this.ch_neto).toFixed(2);
    }
}

class totalizar{
    constructor(id){
        this.total_id = id;
        this.total_ch_imp = 0;
        this.total_imp_int = 0;
        this.total_iva_10_5 = 0;
        this.total_iva_1_5 = 0;
        this.total_gastos_imp = 0;
        this.total_iva_21 = 0;
        this.total_neto = 0;
    }
    sumar(ch_importe, ch_imp_int, ch_iva_10_5, ch_iva_1_5, ch_gastos_imp, ch_iva_21, ch_neto){
        this.total_ch_imp = this.total_ch_imp + parseFloat(ch_importe);
        this.total_imp_int = this.total_imp_int + parseFloat(ch_imp_int);
        this.total_iva_10_5 = this.total_iva_10_5 + parseFloat(ch_iva_10_5);
        this.total_iva_1_5 = this.total_iva_1_5 + parseFloat(ch_iva_1_5);
        this.total_gastos_imp = this.total_gastos_imp + parseFloat(ch_gastos_imp);
        this.total_iva_21 = this.total_iva_21 + parseFloat(ch_iva_21);
        this.total_neto = this.total_neto + parseFloat(ch_neto);
    }
}