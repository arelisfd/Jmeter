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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.4473684210526316, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "12.2 - Cometer-253"], "isController": false}, {"data": [1.0, 500, 1500, "5.2 - Submenu INSIS - Endosos-167"], "isController": false}, {"data": [0.0, 500, 1500, "9.2 - Endoso general - Crear-238"], "isController": false}, {"data": [0.5, 500, 1500, "15.2 - Logout-259"], "isController": false}, {"data": [0.5, 500, 1500, "2.1 - Login-99"], "isController": false}, {"data": [0.0, 500, 1500, "8.1 - Seleccionar poliza - Siguiente-215"], "isController": false}, {"data": [1.0, 500, 1500, "1.2 - Index-69-1"], "isController": false}, {"data": [0.0, 500, 1500, "14 - Numero de apendice - Hacer cambios"], "isController": true}, {"data": [0.0, 500, 1500, "15 - Logout"], "isController": true}, {"data": [0.25, 500, 1500, "1 - Index"], "isController": true}, {"data": [0.0, 500, 1500, "Transaction Controller"], "isController": true}, {"data": [0.5, 500, 1500, "14.2 - Numero de apendice - Hacer cambios-256"], "isController": false}, {"data": [0.25, 500, 1500, "10.2 - Razon de apendice - Crear-244"], "isController": false}, {"data": [0.0, 500, 1500, "2.2 - Login-101-1"], "isController": false}, {"data": [1.0, 500, 1500, "7.1 - Buscar por numero de poliza-209"], "isController": false}, {"data": [1.0, 500, 1500, "2.2 - Login-101-0"], "isController": false}, {"data": [0.0, 500, 1500, "9 - Endoso general - Crear"], "isController": true}, {"data": [0.5, 500, 1500, "1.1 - Index-68"], "isController": false}, {"data": [0.0, 500, 1500, "6.1 - Modulo Cancelacion de poliza-171"], "isController": false}, {"data": [1.0, 500, 1500, "1.3 - Index-95"], "isController": false}, {"data": [1.0, 500, 1500, "6.3 - Modulo Cancelacion de poliza-192"], "isController": false}, {"data": [0.0, 500, 1500, "6 - Modulo Cancelacion de poliza"], "isController": true}, {"data": [0.0, 500, 1500, "12 - Cometer"], "isController": true}, {"data": [1.0, 500, 1500, "15.3 - Logout-261-1"], "isController": false}, {"data": [0.5, 500, 1500, "10.1 - Razon de apendice - Crear-243"], "isController": false}, {"data": [1.0, 500, 1500, "15.3 - Logout-261-0"], "isController": false}, {"data": [1.0, 500, 1500, "2.1 - Login-99-1"], "isController": false}, {"data": [0.5, 500, 1500, "3.1 - Menu INSIS - Operaciones del Sistema-164"], "isController": false}, {"data": [0.0, 500, 1500, "10 - Razon de apendice - Crear"], "isController": true}, {"data": [0.75, 500, 1500, "2.1 - Login-99-0"], "isController": false}, {"data": [0.0, 500, 1500, "14.1 - Numero de apendice - Hacer cambios-255"], "isController": false}, {"data": [1.0, 500, 1500, "4 - Submenu INSIS - Control de polizas"], "isController": true}, {"data": [1.0, 500, 1500, "1.2 - Index-69"], "isController": false}, {"data": [1.0, 500, 1500, "6.4 - Modulo Cancelacion de poliza-202"], "isController": false}, {"data": [0.0, 500, 1500, "13.1 - Calculo de Prima-254"], "isController": false}, {"data": [0.0, 500, 1500, "2 - Login"], "isController": true}, {"data": [0.5, 500, 1500, "6.2 - Modulo Cancelacion de poliza-187"], "isController": false}, {"data": [0.0, 500, 1500, "15.1 - Logout-258"], "isController": false}, {"data": [0.5, 500, 1500, "11 - Razon de apendice - Rellenar datos"], "isController": true}, {"data": [0.0, 500, 1500, "2.2 - Login-101"], "isController": false}, {"data": [1.0, 500, 1500, "4.1 - Submenu INSIS - Control de polizas-165"], "isController": false}, {"data": [1.0, 500, 1500, "5.1 - Submenu INSIS - Endosos-166"], "isController": false}, {"data": [0.25, 500, 1500, "8.2 - Seleccionar poliza - Siguiente-227"], "isController": false}, {"data": [1.0, 500, 1500, "1.2 - Index-69-0"], "isController": false}, {"data": [0.25, 500, 1500, "7.2 - Buscar por numero de poliza-210"], "isController": false}, {"data": [0.0, 500, 1500, "12.1 - Cometer-252"], "isController": false}, {"data": [0.0, 500, 1500, "7 - Buscar por numero de poliza"], "isController": true}, {"data": [0.0, 500, 1500, "8 - Seleccionar poliza - Siguiente"], "isController": true}, {"data": [0.5, 500, 1500, "3 - Menu INSIS - Operaciones del Sistema"], "isController": true}, {"data": [0.0, 500, 1500, "13 - Calculo de Prima"], "isController": true}, {"data": [0.0, 500, 1500, "9.1 - Endoso general - Crear-237"], "isController": false}, {"data": [0.5, 500, 1500, "11.1 - Razon de apendice - Rellenar datos-245"], "isController": false}, {"data": [1.0, 500, 1500, "5 - Submenu INSIS - Endosos"], "isController": true}, {"data": [0.5, 500, 1500, "7.3 - Buscar por numero de poliza-212"], "isController": false}, {"data": [0.5, 500, 1500, "15.2 - Logout-259-0"], "isController": false}, {"data": [0.75, 500, 1500, "15.3 - Logout-261"], "isController": false}, {"data": [1.0, 500, 1500, "15.2 - Logout-259-1"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 82, 0, 0.0, 1409.3536585365855, 97, 7858, 3174.5, 6333.599999999988, 7858.0, 1.6645352495787915, 43.12852698780018, 2.3128214570265717], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["12.2 - Cometer-253", 2, 0, 0.0, 2263.0, 2188, 2338, 2338.0, 2338.0, 2338.0, 0.380517503805175, 9.489155251141552, 0.4356999738394216], "isController": false}, {"data": ["5.2 - Submenu INSIS - Endosos-167", 2, 0, 0.0, 227.5, 201, 254, 254.0, 254.0, 254.0, 1.2217470983506415, 2.2722825671960902, 1.9286661957849724], "isController": false}, {"data": ["9.2 - Endoso general - Crear-238", 2, 0, 0.0, 1615.5, 1521, 1710, 1710.0, 1710.0, 1710.0, 0.5537098560354374, 11.178558450996677, 0.5685799937707641], "isController": false}, {"data": ["15.2 - Logout-259", 2, 0, 0.0, 1038.5, 833, 1244, 1244.0, 1244.0, 1244.0, 0.66203243958954, 6.140609483614697, 0.9077085402184707], "isController": false}, {"data": ["2.1 - Login-99", 2, 0, 0.0, 770.5, 579, 962, 962.0, 962.0, 962.0, 1.6207455429497568, 14.51232019854133, 3.147316906401945], "isController": false}, {"data": ["8.1 - Seleccionar poliza - Siguiente-215", 2, 0, 0.0, 4441.0, 4415, 4467, 4467.0, 4467.0, 4467.0, 0.3480682213713888, 37.95354240993734, 0.9828508418900104], "isController": false}, {"data": ["1.2 - Index-69-1", 2, 0, 0.0, 107.0, 103, 111, 111.0, 111.0, 111.0, 5.797101449275362, 94.63598278985508, 3.8920969202898554], "isController": false}, {"data": ["14 - Numero de apendice - Hacer cambios", 2, 0, 0.0, 2811.0, 2593, 3029, 3029.0, 3029.0, 3029.0, 0.3720238095238095, 9.713490804036457, 1.2217930385044642], "isController": true}, {"data": ["15 - Logout", 2, 0, 0.0, 4664.5, 4228, 5101, 5101.0, 5101.0, 5101.0, 0.30413625304136255, 67.43879851923663, 1.3798994449513382], "isController": true}, {"data": ["1 - Index", 2, 0, 0.0, 1343.5, 717, 1970, 1970.0, 1970.0, 1970.0, 1.0152284263959392, 26.534739847715738, 2.573266973350254], "isController": true}, {"data": ["Transaction Controller", 2, 0, 0.0, 47895.5, 46664, 49127, 49127.0, 49127.0, 49127.0, 0.0407108107557962, 38.820381994626175, 2.0104938475787244], "isController": true}, {"data": ["14.2 - Numero de apendice - Hacer cambios-256", 2, 0, 0.0, 1209.0, 1008, 1410, 1410.0, 1410.0, 1410.0, 0.5320563979781857, 13.268156424581006, 0.5463450219473265], "isController": false}, {"data": ["10.2 - Razon de apendice - Crear-244", 2, 0, 0.0, 1303.5, 947, 1660, 1660.0, 1660.0, 1660.0, 0.5685048322910744, 4.0505969300739055, 0.5310301485218875], "isController": false}, {"data": ["2.2 - Login-101-1", 2, 0, 0.0, 7147.0, 6663, 7631, 7631.0, 7631.0, 7631.0, 0.23781212841854935, 13.162924531807372, 0.17081134809750298], "isController": false}, {"data": ["7.1 - Buscar por numero de poliza-209", 2, 0, 0.0, 449.5, 441, 458, 458.0, 458.0, 458.0, 1.2658227848101267, 1.3084701344936709, 3.709083267405063], "isController": false}, {"data": ["2.2 - Login-101-0", 2, 0, 0.0, 166.5, 106, 227, 227.0, 227.0, 227.0, 2.2598870056497176, 1.9056762005649717, 1.6165695621468927], "isController": false}, {"data": ["9 - Endoso general - Crear", 2, 0, 0.0, 4694.0, 4411, 4977, 4977.0, 4977.0, 4977.0, 0.28300551860761286, 19.95700195450686, 0.7431658589217489], "isController": true}, {"data": ["1.1 - Index-68", 2, 0, 0.0, 1030.0, 416, 1644, 1644.0, 1644.0, 1644.0, 1.2165450121654502, 10.346572764598541, 0.535802539537713], "isController": false}, {"data": ["6.1 - Modulo Cancelacion de poliza-171", 2, 0, 0.0, 2821.0, 2598, 3044, 3044.0, 3044.0, 3044.0, 0.5027652086475616, 69.50066184326295, 0.6306659282302665], "isController": false}, {"data": ["1.3 - Index-95", 2, 0, 0.0, 103.0, 97, 109, 109.0, 109.0, 109.0, 5.434782608695652, 2.5210173233695654, 3.630264945652174], "isController": false}, {"data": ["6.3 - Modulo Cancelacion de poliza-192", 2, 0, 0.0, 249.0, 202, 296, 296.0, 296.0, 296.0, 1.5847860538827259, 4.902931854199683, 1.5112730289223455], "isController": false}, {"data": ["6 - Modulo Cancelacion de poliza", 2, 0, 0.0, 4092.0, 3963, 4221, 4221.0, 4221.0, 4221.0, 0.37418147801683815, 54.517949017773624, 2.148802911599626], "isController": true}, {"data": ["12 - Cometer", 2, 0, 0.0, 5432.5, 5345, 5520, 5520.0, 5520.0, 5520.0, 0.23677045104770925, 36.923357589972774, 0.7928573014087843], "isController": true}, {"data": ["15.3 - Logout-261-1", 2, 0, 0.0, 276.5, 249, 304, 304.0, 304.0, 304.0, 1.1554015020219526, 18.859898541305604, 0.775157062391681], "isController": false}, {"data": ["10.1 - Razon de apendice - Crear-243", 2, 0, 0.0, 1338.0, 1220, 1456, 1456.0, 1456.0, 1456.0, 0.6040471156750227, 5.321690482482634, 1.3228277899426155], "isController": false}, {"data": ["15.3 - Logout-261-0", 2, 0, 0.0, 281.5, 107, 456, 456.0, 456.0, 456.0, 1.0615711252653928, 0.8936272558386412, 0.7852930931528663], "isController": false}, {"data": ["2.1 - Login-99-1", 2, 0, 0.0, 101.5, 98, 105, 105.0, 105.0, 105.0, 2.631578947368421, 21.71566611842105, 2.1355879934210527], "isController": false}, {"data": ["3.1 - Menu INSIS - Operaciones del Sistema-164", 2, 0, 0.0, 883.5, 715, 1052, 1052.0, 1052.0, 1052.0, 0.8120178643930166, 11.191810672959805, 0.9900432653268372], "isController": false}, {"data": ["10 - Razon de apendice - Crear", 2, 0, 0.0, 2641.5, 2403, 2880, 2880.0, 2880.0, 2880.0, 0.40233353450010056, 6.41120844648964, 1.256899391470529], "isController": true}, {"data": ["2.1 - Login-99-0", 2, 0, 0.0, 668.5, 474, 863, 863.0, 863.0, 863.0, 1.762114537444934, 1.2372659691629957, 1.9918433370044053], "isController": false}, {"data": ["14.1 - Numero de apendice - Hacer cambios-255", 2, 0, 0.0, 1602.0, 1585, 1619, 1619.0, 1619.0, 1619.0, 0.45787545787545786, 0.536796374198718, 1.0335733602335164], "isController": false}, {"data": ["4 - Submenu INSIS - Control de polizas", 2, 0, 0.0, 149.0, 124, 174, 174.0, 174.0, 174.0, 1.3029315960912053, 24.9510128257329, 1.6153043566775245], "isController": true}, {"data": ["1.2 - Index-69", 2, 0, 0.0, 210.5, 204, 217, 217.0, 217.0, 217.0, 4.484304932735426, 76.98640695067265, 6.395827494394618], "isController": false}, {"data": ["6.4 - Modulo Cancelacion de poliza-202", 2, 0, 0.0, 404.0, 330, 478, 478.0, 478.0, 478.0, 1.3812154696132597, 2.568871935428177, 4.032366842196133], "isController": false}, {"data": ["13.1 - Calculo de Prima-254", 2, 0, 0.0, 2185.5, 2118, 2253, 2253.0, 2253.0, 2253.0, 0.3971405877680699, 0.4527945666203336, 0.9604674468824465], "isController": false}, {"data": ["2 - Login", 2, 0, 0.0, 8084.0, 7348, 8820, 8820.0, 8820.0, 8820.0, 0.21999780002199978, 14.332298083269169, 0.7425999958750413], "isController": true}, {"data": ["6.2 - Modulo Cancelacion de poliza-187", 2, 0, 0.0, 618.0, 551, 685, 685.0, 685.0, 685.0, 1.2414649286157666, 3.1145736343885786, 0.7637918994413407], "isController": false}, {"data": ["15.1 - Logout-258", 2, 0, 0.0, 3067.5, 2984, 3151, 3151.0, 3151.0, 3151.0, 0.37516413430876006, 73.26893259941849, 0.6585522767773401], "isController": false}, {"data": ["11 - Razon de apendice - Rellenar datos", 2, 0, 0.0, 1019.5, 754, 1285, 1285.0, 1285.0, 1285.0, 0.5186721991701245, 0.5883181243516598, 1.342520179590249], "isController": true}, {"data": ["2.2 - Login-101", 2, 0, 0.0, 7313.5, 6769, 7858, 7858.0, 7858.0, 7858.0, 0.23485204321277597, 13.197125264208548, 0.33668242132456555], "isController": false}, {"data": ["4.1 - Submenu INSIS - Control de polizas-165", 2, 0, 0.0, 149.0, 124, 174, 174.0, 174.0, 174.0, 1.303780964797914, 24.96727815352021, 1.61635735821382], "isController": false}, {"data": ["5.1 - Submenu INSIS - Endosos-166", 2, 0, 0.0, 183.0, 145, 221, 221.0, 221.0, 221.0, 1.2650221378874131, 27.829869346932323, 1.5707770003162556], "isController": false}, {"data": ["8.2 - Seleccionar poliza - Siguiente-227", 2, 0, 0.0, 1845.5, 1184, 2507, 2507.0, 2507.0, 2507.0, 0.5208333333333334, 1.7405192057291667, 0.5963643391927084], "isController": false}, {"data": ["1.2 - Index-69-0", 2, 0, 0.0, 103.0, 101, 105, 105.0, 105.0, 105.0, 5.9880239520958085, 5.049471369760479, 4.520256362275449], "isController": false}, {"data": ["7.2 - Buscar por numero de poliza-210", 2, 0, 0.0, 1585.0, 1498, 1672, 1672.0, 1672.0, 1672.0, 0.711490572749911, 30.82303617484881, 1.9020560965848452], "isController": false}, {"data": ["12.1 - Cometer-252", 2, 0, 0.0, 3169.5, 3157, 3182, 3182.0, 3182.0, 3182.0, 0.31959092361776925, 41.86906384827421, 0.7042548038510706], "isController": false}, {"data": ["7 - Buscar por numero de poliza", 2, 0, 0.0, 3198.0, 3117, 3279, 3279.0, 3279.0, 3279.0, 0.4547521600727603, 24.958965723055936, 2.9818685339927242], "isController": true}, {"data": ["8 - Seleccionar poliza - Siguiente", 2, 0, 0.0, 6286.5, 5599, 6974, 6974.0, 6974.0, 6974.0, 0.242306760358614, 27.23099690301672, 0.9616549551732494], "isController": true}, {"data": ["3 - Menu INSIS - Operaciones del Sistema", 2, 0, 0.0, 883.5, 715, 1052, 1052.0, 1052.0, 1052.0, 0.8123476848090982, 11.196356493704304, 0.9904453950040617], "isController": true}, {"data": ["13 - Calculo de Prima", 2, 0, 0.0, 2185.5, 2118, 2253, 2253.0, 2253.0, 2253.0, 0.3971405877680699, 0.4527945666203336, 0.9604674468824465], "isController": true}, {"data": ["9.1 - Endoso general - Crear-237", 2, 0, 0.0, 3078.5, 2701, 3456, 3456.0, 3456.0, 3456.0, 0.3733432891543775, 18.790214614056374, 0.5970211288967705], "isController": false}, {"data": ["11.1 - Razon de apendice - Rellenar datos-245", 2, 0, 0.0, 1019.5, 754, 1285, 1285.0, 1285.0, 1285.0, 0.5185377236193932, 0.588165591781177, 1.34217210591133], "isController": false}, {"data": ["5 - Submenu INSIS - Endosos", 2, 0, 0.0, 410.5, 399, 422, 422.0, 422.0, 422.0, 1.1217049915872126, 26.76318003365115, 3.1635586090858108], "isController": true}, {"data": ["7.3 - Buscar por numero de poliza-212", 2, 0, 0.0, 1163.5, 1149, 1178, 1178.0, 1178.0, 1178.0, 0.8136696501220504, 8.567369304312448, 0.775926184906428], "isController": false}, {"data": ["15.2 - Logout-259-0", 2, 0, 0.0, 930.5, 722, 1139, 1139.0, 1139.0, 1139.0, 0.6872852233676976, 0.5295586340206185, 0.5389551116838488], "isController": false}, {"data": ["15.3 - Logout-261", 2, 0, 0.0, 558.5, 411, 706, 706.0, 706.0, 706.0, 0.9140767824497258, 15.690163676873857, 1.2894374143053016], "isController": false}, {"data": ["15.2 - Logout-259-1", 2, 0, 0.0, 106.0, 102, 110, 110.0, 110.0, 110.0, 1.06439595529537, 9.05256286588611, 0.624708954230974], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 82, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
