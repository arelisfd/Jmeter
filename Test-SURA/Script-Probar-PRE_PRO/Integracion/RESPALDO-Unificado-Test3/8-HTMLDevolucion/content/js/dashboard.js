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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.3125, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "Clic Menu Pagos - -47"], "isController": false}, {"data": [1.0, 500, 1500, "Index - -9-1"], "isController": false}, {"data": [1.0, 500, 1500, "Index - -9-0"], "isController": false}, {"data": [1.0, 500, 1500, "Clic Menu Pagos - -67"], "isController": false}, {"data": [0.5, 500, 1500, "Clic Menu Pagos - -48"], "isController": false}, {"data": [0.75, 500, 1500, "Login - -25-1"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Boton Cerrar Compensacion de Pagos - -141"], "isController": false}, {"data": [1.0, 500, 1500, "Login - -27-0"], "isController": false}, {"data": [0.5, 500, 1500, "Clic Boton Cerrar Compensacion de Pagos - -142"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Boton Buscar Razon de revertir - -162"], "isController": false}, {"data": [0.75, 500, 1500, "Login - -25-0"], "isController": false}, {"data": [0.0, 500, 1500, "Login - -27-1"], "isController": false}, {"data": [0.5, 500, 1500, "Clic Boton Cerrar Compensacion de Pagos - -143"], "isController": false}, {"data": [0.25, 500, 1500, "Clic Boton Proceder (Revocar) - -168"], "isController": false}, {"data": [0.375, 500, 1500, "Login - -25"], "isController": false}, {"data": [0.0, 500, 1500, "Transaction Controller"], "isController": true}, {"data": [0.0, 500, 1500, "Login - -27"], "isController": false}, {"data": [0.5, 500, 1500, "Clic Menu Compensacion de Pagos - -132"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Menu Compensacion de Pagos - -131"], "isController": false}, {"data": [0.25, 500, 1500, "Clic Boton Proceder del No Claro - -137"], "isController": false}, {"data": [0.5, 500, 1500, "Clic Boton Proceder (Revocar) - -169"], "isController": false}, {"data": [0.25, 500, 1500, "Clic Boton Proceder del No Claro - -136"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Buscar Numero de Pago - -73"], "isController": false}, {"data": [0.5, 500, 1500, "Clic Boton No Claro - -135"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Buscar Numero de Pago - -72"], "isController": false}, {"data": [0.0, 500, 1500, "Buscar Razon de revertir - -155"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Boton Aceptar Razon de revertir - -163"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Boton No Claro - -134"], "isController": false}, {"data": [0.25, 500, 1500, "Buscar Razon de revertir - -154"], "isController": false}, {"data": [1.0, 500, 1500, "Index - -9"], "isController": false}, {"data": [0.25, 500, 1500, "Clic Menu Revocar - -144"], "isController": false}, {"data": [0.5, 500, 1500, "Index - -8"], "isController": false}, {"data": [0.5, 500, 1500, "Clic Menu Facturacion y Cobranza - -46"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Boton Revocar - -164"], "isController": false}, {"data": [0.5, 500, 1500, "Clic Boton Revocar - -165"], "isController": false}, {"data": [0.75, 500, 1500, "Clic Boton Revocar - -166"], "isController": false}, {"data": [0.5, 500, 1500, "Clic Boton Revocar - -167"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 72, 0, 0.0, 2308.916666666668, 91, 11397, 5960.500000000001, 7443.199999999999, 11397.0, 0.9360617800774851, 41.52390268695233, 5.581913328154657], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["Clic Menu Pagos - -47", 4, 0, 0.0, 11423.0, 10286, 12464, 12464.0, 12464.0, 12464.0, 0.25429116338207247, 82.29541232914812, 0.5424174547043865], "isController": false}, {"data": ["Index - -9-1", 2, 0, 0.0, 110.0, 106, 114, 114.0, 114.0, 114.0, 11.235955056179774, 183.20422226123597, 7.044417134831461], "isController": false}, {"data": ["Index - -9-0", 2, 0, 0.0, 100.0, 98, 102, 102.0, 102.0, 102.0, 12.048192771084338, 10.142131024096384, 8.56551204819277], "isController": false}, {"data": ["Clic Menu Pagos - -67", 2, 0, 0.0, 92.0, 91, 93, 93.0, 93.0, 93.0, 0.4666355576294914, 1.1706901831544565, 0.2647609951003267], "isController": false}, {"data": ["Clic Menu Pagos - -48", 2, 0, 0.0, 1071.0, 976, 1166, 1166.0, 1166.0, 1166.0, 0.3729951510630362, 1.1042332035621036, 0.48609573153674], "isController": false}, {"data": ["Login - -25-1", 2, 0, 0.0, 368.5, 147, 590, 590.0, 590.0, 590.0, 1.7889087656529516, 14.761991279069766, 1.3748742173524149], "isController": false}, {"data": ["Clic Boton Cerrar Compensacion de Pagos - -141", 4, 0, 0.0, 5227.25, 3747, 6852, 6852.0, 6852.0, 6852.0, 0.4953560371517028, 65.10642414860682, 8.736938854489164], "isController": false}, {"data": ["Login - -27-0", 2, 0, 0.0, 160.0, 109, 211, 211.0, 211.0, 211.0, 1.6920473773265652, 1.4243601945854485, 1.1351919416243654], "isController": false}, {"data": ["Clic Boton Cerrar Compensacion de Pagos - -142", 2, 0, 0.0, 930.5, 914, 947, 947.0, 947.0, 947.0, 0.8257638315441783, 14.65932403488852, 0.7261721975639966], "isController": false}, {"data": ["Clic Boton Buscar Razon de revertir - -162", 4, 0, 0.0, 5195.0, 4755, 5635, 5635.0, 5635.0, 5635.0, 0.6371455877668047, 7.945342366199427, 7.955297766008283], "isController": false}, {"data": ["Login - -25-0", 2, 0, 0.0, 409.5, 181, 638, 638.0, 638.0, 638.0, 2.824858757062147, 1.9834701624293787, 3.074516684322034], "isController": false}, {"data": ["Login - -27-1", 2, 0, 0.0, 6182.0, 4995, 7369, 7369.0, 7369.0, 7369.0, 0.23688262465948123, 13.080709426447946, 0.159618174819377], "isController": false}, {"data": ["Clic Boton Cerrar Compensacion de Pagos - -143", 2, 0, 0.0, 708.0, 580, 836, 836.0, 836.0, 836.0, 0.980872976949485, 0.9813519188327611, 11.533399491172142], "isController": false}, {"data": ["Clic Boton Proceder (Revocar) - -168", 4, 0, 0.0, 1610.0, 952, 2207, 2207.0, 2207.0, 2207.0, 1.3708019191226868, 2.300176169465387, 23.634619709561342], "isController": false}, {"data": ["Login - -25", 4, 0, 0.0, 3949.75, 328, 8810, 8810.0, 8810.0, 8810.0, 0.4503997297601622, 16.658082387963066, 1.1391946289832227], "isController": false}, {"data": ["Transaction Controller", 2, 0, 0.0, 75791.0, 75625, 75957, 75957.0, 75957.0, 75957.0, 0.026100120060552276, 39.536584212037376, 5.484555355907762], "isController": true}, {"data": ["Login - -27", 2, 0, 0.0, 6342.5, 5104, 7581, 7581.0, 7581.0, 7581.0, 0.23386342376052385, 13.110854003449486, 0.3144823579279701], "isController": false}, {"data": ["Clic Menu Compensacion de Pagos - -132", 2, 0, 0.0, 1174.5, 1158, 1191, 1191.0, 1191.0, 1191.0, 0.42753313381787084, 0.6544513547456178, 0.3989335052372809], "isController": false}, {"data": ["Clic Menu Compensacion de Pagos - -131", 4, 0, 0.0, 13881.5, 5574, 23342, 23342.0, 23342.0, 23342.0, 0.16291951775822744, 19.995984288449005, 7.48355849319811], "isController": false}, {"data": ["Clic Boton Proceder del No Claro - -137", 2, 0, 0.0, 1516.0, 1344, 1688, 1688.0, 1688.0, 1688.0, 0.4788125448886761, 0.4551992309073498, 5.45654589118985], "isController": false}, {"data": ["Clic Boton Proceder (Revocar) - -169", 2, 0, 0.0, 1012.0, 951, 1073, 1073.0, 1073.0, 1073.0, 1.2070006035003018, 1.1474756713940857, 13.910564084188293], "isController": false}, {"data": ["Clic Boton Proceder del No Claro - -136", 4, 0, 0.0, 1834.5, 984, 2857, 2857.0, 2857.0, 2857.0, 0.7751937984496124, 1.300758539244186, 13.141389595445736], "isController": false}, {"data": ["Clic Buscar Numero de Pago - -73", 2, 0, 0.0, 1656.0, 1585, 1727, 1727.0, 1727.0, 1727.0, 0.3466805338880222, 6.377533747183221, 0.36953301048708614], "isController": false}, {"data": ["Clic Boton No Claro - -135", 2, 0, 0.0, 1440.0, 1432, 1448, 1448.0, 1448.0, 1448.0, 0.5333333333333333, 3.1611979166666666, 5.984114583333334], "isController": false}, {"data": ["Clic Buscar Numero de Pago - -72", 4, 0, 0.0, 6439.0, 5607, 7342, 7342.0, 7342.0, 7342.0, 0.35137034434293746, 80.29232708735945, 4.090599333494378], "isController": false}, {"data": ["Buscar Razon de revertir - -155", 2, 0, 0.0, 3299.5, 3153, 3446, 3446.0, 3446.0, 3446.0, 0.4035512510088781, 10.825144080407586, 4.737589222659403], "isController": false}, {"data": ["Clic Boton Aceptar Razon de revertir - -163", 4, 0, 0.0, 3072.0, 2851, 3293, 3293.0, 3293.0, 3293.0, 1.1441647597254005, 4.087819114702517, 14.381949907036613], "isController": false}, {"data": ["Clic Boton No Claro - -134", 4, 0, 0.0, 9875.0, 4248, 16051, 16051.0, 16051.0, 16051.0, 0.23166917641607784, 20.722513719159043, 9.273328000115836], "isController": false}, {"data": ["Buscar Razon de revertir - -154", 4, 0, 0.0, 6569.25, 747, 13199, 13199.0, 13199.0, 13199.0, 0.29875270744641125, 138.6913493586153, 5.590891426730899], "isController": false}, {"data": ["Index - -9", 2, 0, 0.0, 211.0, 209, 213, 213.0, 213.0, 213.0, 7.117437722419928, 122.04251000889678, 9.522353202846974], "isController": false}, {"data": ["Clic Menu Revocar - -144", 4, 0, 0.0, 1516.5, 1173, 1860, 1860.0, 1860.0, 1860.0, 1.3008130081300813, 9.313389227642276, 15.30424288617886], "isController": false}, {"data": ["Index - -8", 4, 0, 0.0, 1060.5, 413, 1710, 1710.0, 1710.0, 1710.0, 2.3391812865497075, 39.94940149853801, 2.5516264619883042], "isController": false}, {"data": ["Clic Menu Facturacion y Cobranza - -46", 4, 0, 0.0, 733.0, 648, 818, 818.0, 818.0, 818.0, 0.9768009768009768, 12.283940018315018, 1.1499351343101343], "isController": false}, {"data": ["Clic Boton Revocar - -164", 4, 0, 0.0, 8127.5, 6531, 10127, 10127.0, 10127.0, 10127.0, 0.39498370692208945, 53.20023591019058, 9.418567782907079], "isController": false}, {"data": ["Clic Boton Revocar - -165", 2, 0, 0.0, 1305.0, 1257, 1353, 1353.0, 1353.0, 1353.0, 1.4104372355430184, 25.124101948166434, 1.2403307916078985], "isController": false}, {"data": ["Clic Boton Revocar - -166", 2, 0, 0.0, 575.0, 382, 768, 768.0, 768.0, 768.0, 2.1344717182497335, 12.65153915421558, 25.151956043223052], "isController": false}, {"data": ["Clic Boton Revocar - -167", 2, 0, 0.0, 1042.0, 880, 1204, 1204.0, 1204.0, 1204.0, 1.1273957158962795, 1.129047174464487, 13.131848048196167], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 72, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
