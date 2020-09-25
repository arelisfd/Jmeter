/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 6;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "KO",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "OK",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.2537313432835821, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.5, 500, 1500, "Cerrar Detalle Objeto - -115"], "isController": false}, {"data": [0.0, 500, 1500, "Ingregar Poliza - -226"], "isController": false}, {"data": [0.0, 500, 1500, "Clausulas - -152"], "isController": false}, {"data": [0.25, 500, 1500, "Cerrar Detalle Objeto - -112"], "isController": false}, {"data": [0.0, 500, 1500, "Cerrar Detalle Objeto - -113"], "isController": false}, {"data": [0.5, 500, 1500, "Siguiente - -120"], "isController": false}, {"data": [0.5, 500, 1500, "Ri Policy - -191"], "isController": false}, {"data": [0.0, 500, 1500, "Usage Description - -230"], "isController": false}, {"data": [1.0, 500, 1500, "Aplicar Pago - -240"], "isController": false}, {"data": [0.0, 500, 1500, "Siguiente - -68"], "isController": false}, {"data": [0.5, 500, 1500, "Clausulas - -156"], "isController": false}, {"data": [0.3333333333333333, 500, 1500, "Login - -22"], "isController": false}, {"data": [0.0, 500, 1500, "Facturacion y Cobranza - -214"], "isController": false}, {"data": [0.0, 500, 1500, "Login - -24"], "isController": false}, {"data": [1.0, 500, 1500, "Actualizar Poliza - -52"], "isController": false}, {"data": [0.0, 500, 1500, "Transaction Controller"], "isController": true}, {"data": [1.0, 500, 1500, "Index - -7-1"], "isController": false}, {"data": [0.0, 500, 1500, "Documentos Poliza - -134"], "isController": false}, {"data": [1.0, 500, 1500, "Index - -7-0"], "isController": false}, {"data": [0.25, 500, 1500, "Usage Description - -229"], "isController": false}, {"data": [0.0, 500, 1500, "Usage Description - -228"], "isController": false}, {"data": [0.0, 500, 1500, "Usage Description - -227"], "isController": false}, {"data": [0.5, 500, 1500, "Siguiente - -93"], "isController": false}, {"data": [0.5, 500, 1500, "Aplicar Pago - -238"], "isController": false}, {"data": [0.0, 500, 1500, "Deducible - -126"], "isController": false}, {"data": [0.5, 500, 1500, "Aplicar Pago - -239"], "isController": false}, {"data": [0.0, 500, 1500, "Deducible - -129"], "isController": false}, {"data": [0.0, 500, 1500, "Facultatives - -183"], "isController": false}, {"data": [0.5, 500, 1500, "Informacion Cliente - -161"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Calculo de Prima - -199"], "isController": false}, {"data": [0.0, 500, 1500, "Aplicar Pago - -237"], "isController": false}, {"data": [0.5, 500, 1500, "Buscar Cliente - -60"], "isController": false}, {"data": [0.0, 500, 1500, "Ok Pago - -232"], "isController": false}, {"data": [0.0, 500, 1500, "Buscar Cliente - -61"], "isController": false}, {"data": [0.5, 500, 1500, "Ok Pago - -233"], "isController": false}, {"data": [0.0, 500, 1500, "Informacion Cliente - -157"], "isController": false}, {"data": [0.0, 500, 1500, "Comisiones - -142"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Emitir Poliza - -204"], "isController": false}, {"data": [0.0, 500, 1500, "Buscar Cliente - -64"], "isController": false}, {"data": [0.5, 500, 1500, "Comisiones - -145"], "isController": false}, {"data": [0.5, 500, 1500, "Buscar Cliente - -65"], "isController": false}, {"data": [0.5, 500, 1500, "Buscar Cliente - -62"], "isController": false}, {"data": [1.0, 500, 1500, "Ok Pago - -234"], "isController": false}, {"data": [0.0, 500, 1500, "Buscar Cliente - -63"], "isController": false}, {"data": [0.5, 500, 1500, "Operaciones - -39"], "isController": false}, {"data": [0.5, 500, 1500, "Documentos Poliza - -141"], "isController": false}, {"data": [0.0, 500, 1500, "Buscar Cliente - -66"], "isController": false}, {"data": [0.5, 500, 1500, "Buscar Cliente - -67"], "isController": false}, {"data": [0.0, 500, 1500, "Impuestos - -147"], "isController": false}, {"data": [0.6666666666666666, 500, 1500, "Login - -22-0"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "Login - -22-1"], "isController": false}, {"data": [1.0, 500, 1500, "Control Polizas - -40"], "isController": false}, {"data": [0.5, 500, 1500, "Editar Detalle Objeto - -101"], "isController": false}, {"data": [0.5, 500, 1500, "Grabar Detalle Objeto - -111"], "isController": false}, {"data": [0.0, 500, 1500, "Descuentos - -121"], "isController": false}, {"data": [1.0, 500, 1500, "Login - -24-0"], "isController": false}, {"data": [0.5, 500, 1500, "Grabar Pago - -236"], "isController": false}, {"data": [0.0, 500, 1500, "Login - -24-1"], "isController": false}, {"data": [0.5, 500, 1500, "Editar Detalle Objeto - -102"], "isController": false}, {"data": [0.0, 500, 1500, "Grabar Pago - -235"], "isController": false}, {"data": [0.5, 500, 1500, "Editar Detalle Objeto - -104"], "isController": false}, {"data": [0.6666666666666666, 500, 1500, "Descuentos - -125"], "isController": false}, {"data": [0.0, 500, 1500, "Siguiente - -89"], "isController": false}, {"data": [1.0, 500, 1500, "Fin Pago - -242"], "isController": false}, {"data": [0.0, 500, 1500, "Facultatives - -179"], "isController": false}, {"data": [0.0, 500, 1500, "Buscar Cliente - -53"], "isController": false}, {"data": [0.0, 500, 1500, "Buscar Cliente - -54"], "isController": false}, {"data": [0.0, 500, 1500, "Pagos - -215"], "isController": false}, {"data": [0.5, 500, 1500, "Impuestos - -151"], "isController": false}, {"data": [0.5, 500, 1500, "Pagos - -216"], "isController": false}, {"data": [0.0, 500, 1500, "Actividades_Nuevo - -224"], "isController": false}, {"data": [0.0, 500, 1500, "Editar Detalle Objeto - -99"], "isController": false}, {"data": [1.0, 500, 1500, "Actividades_Nuevo - -225"], "isController": false}, {"data": [0.5, 500, 1500, "Buscar Cliente - -55"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Confirmar Pre-Emision - -203"], "isController": false}, {"data": [0.0, 500, 1500, "Buscar Cliente - -59"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Validacion - -202"], "isController": false}, {"data": [1.0, 500, 1500, "Fin Pago - -241"], "isController": false}, {"data": [0.0, 500, 1500, "Plan Cuotas - -170"], "isController": false}, {"data": [0.08333333333333333, 500, 1500, "Grabar Detalle Objeto - -106"], "isController": false}, {"data": [0.5, 500, 1500, "Plan Cuotas - -174"], "isController": false}, {"data": [0.0, 500, 1500, "Siguiente - -70"], "isController": false}, {"data": [0.5833333333333334, 500, 1500, "Index - -2"], "isController": false}, {"data": [0.0, 500, 1500, "Ri Policy - -187"], "isController": false}, {"data": [1.0, 500, 1500, "Index - -7"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "Emitir Poliza - -195"], "isController": false}, {"data": [0.0, 500, 1500, "Siguiente - -116"], "isController": false}, {"data": [0.0, 500, 1500, "Emitir Poliza - -192"], "isController": false}, {"data": [0.0, 500, 1500, "Cantidad a Pagar - -231"], "isController": false}, {"data": [1.0, 500, 1500, "Debug Sampler"], "isController": false}, {"data": [0.0, 500, 1500, "Actualizar Poliza - -41"], "isController": false}, {"data": [0.5, 500, 1500, "Actualizar Poliza - -42"], "isController": false}, {"data": [0.5, 500, 1500, "Calculo Prima - -168"], "isController": false}, {"data": [0.0, 500, 1500, "Calculo Prima - -165"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 279, 0, 0.0, 5662.354838709677, 0, 88873, 14185.0, 16880.0, 85711.59999999999, 0.5381664149436661, 30.810128975487387, 1.7249614729990914], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["Cerrar Detalle Objeto - -115", 3, 0, 0.0, 1259.0, 1220, 1327, 1327.0, 1327.0, 1327.0, 1.1350737797956867, 1.2492462400681046, 1.82454242338252], "isController": false}, {"data": ["Ingregar Poliza - -226", 6, 0, 0.0, 14060.333333333332, 13550, 14326, 14326.0, 14326.0, 14326.0, 0.41516745087185164, 16.209234664752284, 5.27392402435649], "isController": false}, {"data": ["Clausulas - -152", 6, 0, 0.0, 15729.333333333334, 15034, 16405, 16405.0, 16405.0, 16405.0, 0.3524436090225564, 42.41054219410832, 0.732421875], "isController": false}, {"data": ["Cerrar Detalle Objeto - -112", 6, 0, 0.0, 3388.5, 1081, 6159, 6159.0, 6159.0, 6159.0, 0.9691487643353255, 83.52172634671297, 5.512980031497335], "isController": false}, {"data": ["Cerrar Detalle Objeto - -113", 3, 0, 0.0, 3119.3333333333335, 2405, 3487, 3487.0, 3487.0, 3487.0, 0.7978723404255319, 134.4996675531915, 2.901637300531915], "isController": false}, {"data": ["Siguiente - -120", 3, 0, 0.0, 557.6666666666666, 522, 616, 616.0, 616.0, 616.0, 3.5087719298245617, 5.368238304093567, 3.2209429824561404], "isController": false}, {"data": ["Ri Policy - -191", 3, 0, 0.0, 850.6666666666666, 678, 1048, 1048.0, 1048.0, 1048.0, 1.2448132780082988, 3.5346699948132776, 1.7906347251037342], "isController": false}, {"data": ["Usage Description - -230", 3, 0, 0.0, 3028.0, 2922, 3101, 3101.0, 3101.0, 3101.0, 0.8481764206955047, 35.89647167444162, 11.943218564461409], "isController": false}, {"data": ["Aplicar Pago - -240", 3, 0, 0.0, 131.0, 119, 140, 140.0, 140.0, 140.0, 0.5832037325038881, 1.266455761566874, 0.5752302439735614], "isController": false}, {"data": ["Siguiente - -68", 6, 0, 0.0, 41719.66666666667, 39529, 43964, 43964.0, 43964.0, 43964.0, 0.1349892008639309, 21.837623107338914, 0.5251044760169187], "isController": false}, {"data": ["Clausulas - -156", 3, 0, 0.0, 1056.0, 993, 1111, 1111.0, 1111.0, 1111.0, 1.6120365394948952, 24.507468263030628, 1.7474224207415368], "isController": false}, {"data": ["Login - -22", 6, 0, 0.0, 6383.333333333334, 427, 12777, 12777.0, 12777.0, 12777.0, 0.46941010796432486, 17.357248596659364, 1.1817002180801126], "isController": false}, {"data": ["Facturacion y Cobranza - -214", 6, 0, 0.0, 2674.6666666666665, 2597, 2750, 2750.0, 2750.0, 2750.0, 1.3360053440213762, 28.424905366288133, 1.4390760688042754], "isController": false}, {"data": ["Login - -24", 3, 0, 0.0, 10938.666666666666, 10439, 11339, 11339.0, 11339.0, 11339.0, 0.2519526329050139, 14.121239738179222, 0.3370030496766608], "isController": false}, {"data": ["Actualizar Poliza - -52", 3, 0, 0.0, 98.0, 93, 104, 104.0, 104.0, 104.0, 3.6496350364963503, 9.156164461678832, 2.0600479014598543], "isController": false}, {"data": ["Transaction Controller", 3, 0, 0.0, 514373.3333333333, 510854, 516904, 516904.0, 516904.0, 516904.0, 0.005792333267686889, 30.364118061146762, 1.7004514309235295], "isController": true}, {"data": ["Index - -7-1", 3, 0, 0.0, 191.33333333333334, 151, 216, 216.0, 216.0, 216.0, 2.806361085126286, 45.75866756314313, 1.7494080332086062], "isController": false}, {"data": ["Documentos Poliza - -134", 6, 0, 0.0, 17075.166666666668, 16471, 17560, 17560.0, 17560.0, 17560.0, 0.337609723160027, 125.37057942268738, 1.4252801105671844], "isController": false}, {"data": ["Index - -7-0", 3, 0, 0.0, 182.0, 160, 197, 197.0, 197.0, 197.0, 2.6833631484794274, 2.253605769230769, 1.905083016547406], "isController": false}, {"data": ["Usage Description - -229", 6, 0, 0.0, 2174.3333333333335, 502, 3870, 3870.0, 3870.0, 3870.0, 1.4851485148514851, 32.900729037747524, 32.12721418626238], "isController": false}, {"data": ["Usage Description - -228", 6, 0, 0.0, 3132.0, 2895, 3491, 3491.0, 3491.0, 3491.0, 1.5927794000530926, 41.58336375099549, 22.64733209450491], "isController": false}, {"data": ["Usage Description - -227", 6, 0, 0.0, 3713.3333333333335, 3593, 3923, 3923.0, 3923.0, 3923.0, 1.3354106387714222, 87.11467838860449, 16.234889689517026], "isController": false}, {"data": ["Siguiente - -93", 3, 0, 0.0, 699.6666666666666, 681, 734, 734.0, 734.0, 734.0, 2.054794520547945, 3.143728595890411, 2.0728542380136985], "isController": false}, {"data": ["Aplicar Pago - -238", 3, 0, 0.0, 607.0, 563, 686, 686.0, 686.0, 686.0, 0.5307855626326964, 9.435784622699929, 0.46443736730360935], "isController": false}, {"data": ["Deducible - -126", 6, 0, 0.0, 15826.666666666668, 14617, 17067, 17067.0, 17067.0, 17067.0, 0.34918233137403243, 66.75009002356981, 0.683360734446837], "isController": false}, {"data": ["Aplicar Pago - -239", 3, 0, 0.0, 549.3333333333334, 504, 609, 609.0, 609.0, 609.0, 0.5392773683264426, 54.06676927916592, 5.760367045658818], "isController": false}, {"data": ["Deducible - -129", 3, 0, 0.0, 1853.3333333333333, 1822, 1895, 1895.0, 1895.0, 1895.0, 1.3495276653171389, 189.43291722896987, 1.4602311066126856], "isController": false}, {"data": ["Facultatives - -183", 3, 0, 0.0, 2196.3333333333335, 2031, 2370, 2370.0, 2370.0, 2370.0, 0.533997864008544, 2.9164766153435386, 1.4293829543431826], "isController": false}, {"data": ["Informacion Cliente - -161", 3, 0, 0.0, 950.0, 902, 994, 994.0, 994.0, 994.0, 1.9880715705765406, 9.250486663353215, 2.471499130218688], "isController": false}, {"data": ["Clic Calculo de Prima - -199", 6, 0, 0.0, 6511.0, 5940, 6869, 6869.0, 6869.0, 6869.0, 0.8597220232124946, 35.11483110044419, 1.1006792699527153], "isController": false}, {"data": ["Aplicar Pago - -237", 6, 0, 0.0, 87601.66666666666, 85519, 90164, 90164.0, 90164.0, 90164.0, 0.06529190924424615, 11.87245803634583, 1.1333629754067143], "isController": false}, {"data": ["Buscar Cliente - -60", 3, 0, 0.0, 1235.0, 1032, 1445, 1445.0, 1445.0, 1445.0, 1.7341040462427746, 1.8086163294797688, 6.012915462427745], "isController": false}, {"data": ["Ok Pago - -232", 6, 0, 0.0, 3253.0, 2654, 3888, 3888.0, 3888.0, 3888.0, 1.2079726192872962, 149.60398788252468, 23.29063223525267], "isController": false}, {"data": ["Buscar Cliente - -61", 3, 0, 0.0, 2300.3333333333335, 2198, 2501, 2501.0, 2501.0, 2501.0, 1.0362694300518134, 18.19813255613126, 3.451532815198618], "isController": false}, {"data": ["Ok Pago - -233", 3, 0, 0.0, 614.3333333333334, 606, 628, 628.0, 628.0, 628.0, 1.5915119363395225, 28.298553547745357, 1.3925729442970822], "isController": false}, {"data": ["Informacion Cliente - -157", 6, 0, 0.0, 14919.333333333332, 13735, 15997, 15997.0, 15997.0, 15997.0, 0.37399488873652065, 51.19395920339089, 0.7547465210683788], "isController": false}, {"data": ["Comisiones - -142", 6, 0, 0.0, 12821.0, 11957, 13680, 13680.0, 13680.0, 13680.0, 0.4385964912280702, 50.40882846765351, 2.1345172012061404], "isController": false}, {"data": ["Clic Emitir Poliza - -204", 6, 0, 0.0, 13511.666666666668, 12858, 14577, 14577.0, 14577.0, 14577.0, 0.4089422028353326, 23.343517840103598, 0.5067848197246455], "isController": false}, {"data": ["Buscar Cliente - -64", 3, 0, 0.0, 2459.6666666666665, 2271, 2574, 2574.0, 2574.0, 2574.0, 1.1325028312570782, 1.5616152321630803, 4.241724471498679], "isController": false}, {"data": ["Comisiones - -145", 3, 0, 0.0, 719.3333333333334, 657, 751, 751.0, 751.0, 751.0, 2.3510971786833856, 5.146851733934169, 2.3809450920846396], "isController": false}, {"data": ["Buscar Cliente - -65", 3, 0, 0.0, 948.3333333333334, 887, 1028, 1028.0, 1028.0, 1028.0, 2.9182879377431905, 2.941087062256809, 9.915719236381323], "isController": false}, {"data": ["Buscar Cliente - -62", 3, 0, 0.0, 939.0, 774, 1142, 1142.0, 1142.0, 1142.0, 2.575107296137339, 8.583690987124463, 2.358838519313305], "isController": false}, {"data": ["Ok Pago - -234", 3, 0, 0.0, 375.0, 280, 423, 423.0, 423.0, 423.0, 1.7814726840855108, 1.7675549287410928, 22.35713424138955], "isController": false}, {"data": ["Buscar Cliente - -63", 3, 0, 0.0, 2145.6666666666665, 2018, 2384, 2384.0, 2384.0, 2384.0, 1.2489592006661117, 3.9843099500416317, 4.384367194004995], "isController": false}, {"data": ["Operaciones - -39", 6, 0, 0.0, 730.3333333333333, 588, 843, 843.0, 843.0, 843.0, 2.9197080291970803, 39.82093978102189, 3.424384124087591], "isController": false}, {"data": ["Documentos Poliza - -141", 3, 0, 0.0, 595.0, 564, 643, 643.0, 643.0, 643.0, 2.7573529411764706, 8.629294002757351, 3.2205020680147056], "isController": false}, {"data": ["Buscar Cliente - -66", 3, 0, 0.0, 6791.666666666667, 6765, 6824, 6824.0, 6824.0, 6824.0, 0.4396248534583822, 18.67661470545135, 1.4482433323563892], "isController": false}, {"data": ["Buscar Cliente - -67", 3, 0, 0.0, 998.6666666666666, 793, 1314, 1314.0, 1314.0, 1314.0, 2.28310502283105, 18.915138651065448, 2.0712935216894977], "isController": false}, {"data": ["Impuestos - -147", 6, 0, 0.0, 13761.0, 13050, 14449, 14449.0, 14449.0, 14449.0, 0.4017139796464917, 51.53459447810659, 0.7226144047937868], "isController": false}, {"data": ["Login - -22-0", 3, 0, 0.0, 628.0, 230, 880, 880.0, 880.0, 880.0, 2.7752081406105455, 1.948608059666975, 3.0082822617946348], "isController": false}, {"data": ["Login - -22-1", 3, 0, 0.0, 286.0, 103, 558, 558.0, 558.0, 558.0, 4.470938897168406, 36.88961205290611, 3.418696441877794], "isController": false}, {"data": ["Control Polizas - -40", 6, 0, 0.0, 356.66666666666663, 249, 423, 423.0, 423.0, 423.0, 3.6719706242350063, 69.69572368421053, 4.381980569155447], "isController": false}, {"data": ["Editar Detalle Objeto - -101", 3, 0, 0.0, 840.3333333333334, 688, 917, 917.0, 917.0, 917.0, 3.236245954692557, 4.951287756202804, 2.973933050161812], "isController": false}, {"data": ["Grabar Detalle Objeto - -111", 3, 0, 0.0, 861.0, 766, 981, 981.0, 981.0, 981.0, 2.6109660574412534, 3.994642080069626, 2.450330450391645], "isController": false}, {"data": ["Descuentos - -121", 6, 0, 0.0, 14594.333333333332, 14154, 15302, 15302.0, 15302.0, 15302.0, 0.38615008366585146, 45.409464900566356, 0.7200718601171322], "isController": false}, {"data": ["Login - -24-0", 3, 0, 0.0, 109.66666666666667, 99, 126, 126.0, 126.0, 126.0, 4.464285714285714, 3.749302455357143, 2.979096912202381], "isController": false}, {"data": ["Grabar Pago - -236", 3, 0, 0.0, 561.6666666666666, 524, 608, 608.0, 608.0, 608.0, 1.2820512820512822, 23.61862313034188, 1.665164262820513], "isController": false}, {"data": ["Login - -24-1", 3, 0, 0.0, 10828.666666666666, 10340, 11235, 11235.0, 11235.0, 11235.0, 0.2540650406504065, 14.026259342183266, 0.17028643186822492], "isController": false}, {"data": ["Editar Detalle Objeto - -102", 3, 0, 0.0, 1339.6666666666667, 1220, 1473, 1473.0, 1473.0, 1473.0, 2.0, 133.08203125, 3.20703125], "isController": false}, {"data": ["Grabar Pago - -235", 6, 0, 0.0, 2162.5, 1642, 2549, 2549.0, 2549.0, 2549.0, 1.5182186234817814, 474.7798780680668, 19.440315030364374], "isController": false}, {"data": ["Editar Detalle Objeto - -104", 3, 0, 0.0, 826.0, 734, 1005, 1005.0, 1005.0, 1005.0, 2.9069767441860463, 4.447523013565891, 2.7281295421511627], "isController": false}, {"data": ["Descuentos - -125", 3, 0, 0.0, 644.0, 500, 824, 824.0, 824.0, 824.0, 2.2189349112426036, 3.394854844674556, 2.039079835428994], "isController": false}, {"data": ["Siguiente - -89", 6, 0, 0.0, 19928.5, 18160, 21306, 21306.0, 21306.0, 21306.0, 0.2723064355087592, 61.72651498820006, 0.9709337699691386], "isController": false}, {"data": ["Fin Pago - -242", 3, 0, 0.0, 232.0, 176, 313, 313.0, 313.0, 313.0, 0.5690440060698028, 0.5407029471737481, 6.1033303893209405], "isController": false}, {"data": ["Facultatives - -179", 6, 0, 0.0, 46103.83333333333, 43088, 48930, 48930.0, 48930.0, 48930.0, 0.1226241569589209, 62.93820572757, 0.34194656269160023], "isController": false}, {"data": ["Buscar Cliente - -53", 6, 0, 0.0, 13892.5, 1765, 26202, 26202.0, 26202.0, 26202.0, 0.22550456646747094, 13.32547003608073, 4.0134968006539635], "isController": false}, {"data": ["Buscar Cliente - -54", 3, 0, 0.0, 2808.0, 2596, 2945, 2945.0, 2945.0, 2945.0, 0.91547146780592, 31.753926514342385, 2.488938053097345], "isController": false}, {"data": ["Pagos - -215", 6, 0, 0.0, 7920.666666666666, 6783, 9166, 9166.0, 9166.0, 9166.0, 0.6273525721455457, 207.48828615119197, 1.157293953889586], "isController": false}, {"data": ["Impuestos - -151", 3, 0, 0.0, 916.6666666666666, 791, 1116, 1116.0, 1116.0, 1116.0, 2.050580997949419, 29.474431818181817, 2.2508330485304167], "isController": false}, {"data": ["Pagos - -216", 3, 0, 0.0, 760.0, 571, 1131, 1131.0, 1131.0, 1131.0, 1.0795250089960418, 3.195000449802087, 1.402117443324937], "isController": false}, {"data": ["Actividades_Nuevo - -224", 6, 0, 0.0, 5755.5, 5004, 6908, 6908.0, 6908.0, 6908.0, 0.8419870895312939, 115.64892756279819, 9.737120228739826], "isController": false}, {"data": ["Editar Detalle Objeto - -99", 6, 0, 0.0, 7563.0, 5778, 9462, 9462.0, 9462.0, 9462.0, 0.6151953245155337, 148.81458749871834, 2.0594624730852047], "isController": false}, {"data": ["Actividades_Nuevo - -225", 3, 0, 0.0, 459.0, 451, 474, 474.0, 474.0, 474.0, 4.484304932735426, 9.737890041106128, 4.422996076233184], "isController": false}, {"data": ["Buscar Cliente - -55", 3, 0, 0.0, 1114.6666666666667, 851, 1328, 1328.0, 1328.0, 1328.0, 2.097902097902098, 3.209680944055944, 1.9852218094405596], "isController": false}, {"data": ["Clic Confirmar Pre-Emision - -203", 6, 0, 0.0, 4310.333333333334, 4252, 4369, 4369.0, 4369.0, 4369.0, 1.3658092419758707, 27.330856618483953, 1.7005925620305031], "isController": false}, {"data": ["Buscar Cliente - -59", 3, 0, 0.0, 2142.0, 2075, 2249, 2249.0, 2249.0, 2249.0, 1.25, 1.56005859375, 4.833984375], "isController": false}, {"data": ["Clic Validacion - -202", 6, 0, 0.0, 2976.333333333333, 2872, 3147, 3147.0, 3147.0, 3147.0, 1.89693329117926, 2.3415270312993997, 2.35449434871957], "isController": false}, {"data": ["Fin Pago - -241", 6, 0, 0.0, 306.0, 165, 478, 478.0, 478.0, 478.0, 1.0934937124111537, 1.8340580576817933, 17.676902508201202], "isController": false}, {"data": ["Plan Cuotas - -170", 6, 0, 0.0, 14108.166666666668, 13322, 14709, 14709.0, 14709.0, 14709.0, 0.4025494800402549, 60.36099725343845, 0.7180240481382086], "isController": false}, {"data": ["Grabar Detalle Objeto - -106", 6, 0, 0.0, 2017.5, 1496, 2477, 2477.0, 2477.0, 2477.0, 2.1621621621621623, 118.07713963963964, 8.136613175675675], "isController": false}, {"data": ["Plan Cuotas - -174", 3, 0, 0.0, 721.0, 691, 741, 741.0, 741.0, 741.0, 3.1446540880503147, 8.947728314989519, 3.688212460691824], "isController": false}, {"data": ["Siguiente - -70", 3, 0, 0.0, 1772.0, 1742, 1806, 1806.0, 1806.0, 1806.0, 0.6108735491753208, 7.721028049277134, 0.6132597739767869], "isController": false}, {"data": ["Index - -2", 6, 0, 0.0, 928.3333333333334, 410, 1803, 1803.0, 1803.0, 1803.0, 2.2189349112426036, 37.87213387573964, 2.3590629622781063], "isController": false}, {"data": ["Ri Policy - -187", 6, 0, 0.0, 12594.666666666668, 11504, 14098, 14098.0, 14098.0, 14098.0, 0.38319070123898324, 74.29240693655001, 0.8208289093434666], "isController": false}, {"data": ["Index - -7", 3, 0, 0.0, 375.3333333333333, 312, 417, 417.0, 417.0, 417.0, 2.3622047244094486, 40.50043061023622, 3.149606299212598], "isController": false}, {"data": ["Emitir Poliza - -195", 3, 0, 0.0, 495.6666666666667, 460, 552, 552.0, 552.0, 552.0, 1.9946808510638296, 0.5921708776595744, 2.0394832529920213], "isController": false}, {"data": ["Siguiente - -116", 6, 0, 0.0, 11175.833333333332, 10505, 12226, 12226.0, 12226.0, 12226.0, 0.48130916091769615, 63.57699191801701, 0.8263100633723729], "isController": false}, {"data": ["Emitir Poliza - -192", 6, 0, 0.0, 9790.166666666668, 9158, 10359, 10359.0, 10359.0, 10359.0, 0.5321035828307911, 51.19557023767293, 0.9844435914774743], "isController": false}, {"data": ["Cantidad a Pagar - -231", 6, 0, 0.0, 3543.0, 3202, 3777, 3777.0, 3777.0, 3777.0, 1.36986301369863, 2.6621361301369864, 16.985498715753426], "isController": false}, {"data": ["Debug Sampler", 3, 0, 0.0, 0.33333333333333337, 0, 1, 1.0, 1.0, 1.0, 0.5924170616113744, 0.8533351229265402, 0.0], "isController": false}, {"data": ["Actualizar Poliza - -41", 6, 0, 0.0, 9171.333333333334, 8434, 9874, 9874.0, 9874.0, 9874.0, 0.5659843410998963, 77.77135190665975, 1.093001986840864], "isController": false}, {"data": ["Actualizar Poliza - -42", 3, 0, 0.0, 938.6666666666666, 841, 1005, 1005.0, 1005.0, 1005.0, 1.7667844522968197, 3.9281047555948176, 1.6028737853356891], "isController": false}, {"data": ["Calculo Prima - -168", 3, 0, 0.0, 802.6666666666666, 707, 855, 855.0, 855.0, 855.0, 1.726121979286536, 4.936753811852705, 2.081797504315305], "isController": false}, {"data": ["Calculo Prima - -165", 6, 0, 0.0, 12874.333333333334, 12258, 13438, 13438.0, 13438.0, 13438.0, 0.4287551807917679, 47.79629327747606, 0.9389487235600972], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Percentile 1
            case 8:
            // Percentile 2
            case 9:
            // Percentile 3
            case 10:
            // Throughput
            case 11:
            // Kbytes/s
            case 12:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 279, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
