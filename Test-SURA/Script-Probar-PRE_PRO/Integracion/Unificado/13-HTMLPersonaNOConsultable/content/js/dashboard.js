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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6935483870967742, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.5, 500, 1500, "T.1- Index"], "isController": true}, {"data": [1.0, 500, 1500, "2.1- Login-0"], "isController": false}, {"data": [1.0, 500, 1500, "2.1- Login-1"], "isController": false}, {"data": [1.0, 500, 1500, "T.5- Seleccionar un Cargador de la Lista"], "isController": true}, {"data": [0.5, 500, 1500, "4.1- Clic Menu Carga de Archivo"], "isController": false}, {"data": [0.5, 500, 1500, "1.2- Index"], "isController": false}, {"data": [1.0, 500, 1500, "1.3- Index"], "isController": false}, {"data": [0.0, 500, 1500, "T.7- Clic en Boton Empezar Operacion"], "isController": true}, {"data": [0.5, 500, 1500, "T.3- Clic Menu Servicio"], "isController": true}, {"data": [0.5, 500, 1500, "T.6- Descripcion y Carga de Archivo"], "isController": true}, {"data": [1.0, 500, 1500, "1.3- Index-0"], "isController": false}, {"data": [0.5, 500, 1500, "6.1- Descripcion y Carga de Archivo"], "isController": false}, {"data": [1.0, 500, 1500, "1.3- Index-1"], "isController": false}, {"data": [1.0, 500, 1500, "4.2- Clic Menu Carga de Archivo"], "isController": false}, {"data": [0.5, 500, 1500, "T.4- Clic Menu Carga de Archivo"], "isController": true}, {"data": [0.5, 500, 1500, "7.2- Clic en Boton Empezar Operacion"], "isController": false}, {"data": [1.0, 500, 1500, "7.3- Clic en Boton Empezar Operacion"], "isController": false}, {"data": [0.0, 500, 1500, "7.1- Clic en Boton Empezar Operacion"], "isController": false}, {"data": [1.0, 500, 1500, "7.4- Clic en Boton Empezar Operacion"], "isController": false}, {"data": [1.0, 500, 1500, "7.5- Clic en Boton Empezar Operacion"], "isController": false}, {"data": [0.5, 500, 1500, "3.1- Clic Menu Servicio"], "isController": false}, {"data": [0.0, 500, 1500, "T.2- Login"], "isController": true}, {"data": [0.0, 500, 1500, "2.2- Login-1"], "isController": false}, {"data": [1.0, 500, 1500, "2.2- Login-0"], "isController": false}, {"data": [1.0, 500, 1500, "T.8- Fin Operacion"], "isController": true}, {"data": [1.0, 500, 1500, "8.2- Fin Operacion"], "isController": false}, {"data": [1.0, 500, 1500, "Debug Sampler"], "isController": false}, {"data": [1.0, 500, 1500, "2.1- Login"], "isController": false}, {"data": [0.0, 500, 1500, "2.2- Login"], "isController": false}, {"data": [1.0, 500, 1500, "8.1- Fin Operacion"], "isController": false}, {"data": [1.0, 500, 1500, "5.1- Seleccionar un Cargador de la Lista"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 23, 0, 0.0, 1032.5652173913045, 0, 10374, 3836.8, 9074.799999999981, 10374.0, 0.2311325494925133, 2.973937528263491, 0.6262718570997889], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["T.1- Index", 1, 0, 0.0, 996.0, 996, 996, 996.0, 996.0, 996.0, 1.004016064257028, 25.754384726405622, 1.7668329568273093], "isController": true}, {"data": ["2.1- Login-0", 1, 0, 0.0, 384.0, 384, 384, 384.0, 384.0, 384.0, 2.6041666666666665, 1.8285115559895833, 2.83050537109375], "isController": false}, {"data": ["2.1- Login-1", 1, 0, 0.0, 97.0, 97, 97, 97.0, 97.0, 97.0, 10.309278350515465, 85.07168170103093, 7.913176546391752], "isController": false}, {"data": ["T.5- Seleccionar un Cargador de la Lista", 1, 0, 0.0, 163.0, 163, 163, 163.0, 163.0, 163.0, 6.134969325153374, 18.32103144171779, 9.16650690184049], "isController": true}, {"data": ["4.1- Clic Menu Carga de Archivo", 1, 0, 0.0, 833.0, 833, 833, 833.0, 833.0, 833.0, 1.2004801920768307, 76.9889987244898, 1.4349489795918369], "isController": false}, {"data": ["1.2- Index", 1, 0, 0.0, 768.0, 768, 768, 768.0, 768.0, 768.0, 1.3020833333333333, 11.074066162109375, 0.54931640625], "isController": false}, {"data": ["1.3- Index", 1, 0, 0.0, 228.0, 228, 228, 228.0, 228.0, 228.0, 4.385964912280701, 75.2038788377193, 5.867941337719298], "isController": false}, {"data": ["T.7- Clic en Boton Empezar Operacion", 1, 0, 0.0, 11249.0, 11249, 11249, 11249.0, 11249.0, 11249.0, 0.08889679082585118, 3.2343152724686637, 2.2526307894035025], "isController": true}, {"data": ["T.3- Clic Menu Servicio", 1, 0, 0.0, 541.0, 541, 541, 541.0, 541.0, 541.0, 1.8484288354898337, 22.17392560073937, 2.1733479667282807], "isController": true}, {"data": ["T.6- Descripcion y Carga de Archivo", 1, 0, 0.0, 617.0, 617, 617, 617.0, 617.0, 617.0, 1.6207455429497568, 3.102208265802269, 32.103107273095624], "isController": true}, {"data": ["1.3- Index-0", 1, 0, 0.0, 110.0, 110, 110, 110.0, 110.0, 110.0, 9.09090909090909, 7.652698863636363, 6.463068181818182], "isController": false}, {"data": ["6.1- Descripcion y Carga de Archivo", 1, 0, 0.0, 617.0, 617, 617, 617.0, 617.0, 617.0, 1.6207455429497568, 3.102208265802269, 32.103107273095624], "isController": false}, {"data": ["1.3- Index-1", 1, 0, 0.0, 118.0, 118, 118, 118.0, 118.0, 118.0, 8.474576271186441, 138.1753177966102, 5.313162076271187], "isController": false}, {"data": ["4.2- Clic Menu Carga de Archivo", 1, 0, 0.0, 115.0, 115, 115, 115.0, 115.0, 115.0, 8.695652173913043, 24.07438858695652, 7.761548913043478], "isController": false}, {"data": ["T.4- Clic Menu Carga de Archivo", 1, 0, 0.0, 948.0, 948, 948, 948.0, 948.0, 948.0, 1.0548523206751055, 70.57003230485232, 2.2024162710970465], "isController": true}, {"data": ["7.2- Clic en Boton Empezar Operacion", 1, 0, 0.0, 511.0, 511, 511, 511.0, 511.0, 511.0, 1.9569471624266144, 13.58205418297456, 1.7467282289628179], "isController": false}, {"data": ["7.3- Clic en Boton Empezar Operacion", 1, 0, 0.0, 124.0, 124, 124, 124.0, 124.0, 124.0, 8.064516129032258, 7.8125, 14.845325100806452], "isController": false}, {"data": ["7.1- Clic en Boton Empezar Operacion", 1, 0, 0.0, 10374.0, 10374, 10374, 10374.0, 10374.0, 10374.0, 0.0963948332369385, 2.127746499662618, 1.9018211092635433], "isController": false}, {"data": ["7.4- Clic en Boton Empezar Operacion", 1, 0, 0.0, 120.0, 120, 120, 120.0, 120.0, 120.0, 8.333333333333334, 8.064778645833334, 12.687174479166668], "isController": false}, {"data": ["7.5- Clic en Boton Empezar Operacion", 1, 0, 0.0, 120.0, 120, 120, 120.0, 120.0, 120.0, 8.333333333333334, 45.271809895833336, 11.287434895833334], "isController": false}, {"data": ["3.1- Clic Menu Servicio", 1, 0, 0.0, 541.0, 541, 541, 541.0, 541.0, 541.0, 1.8484288354898337, 22.17392560073937, 2.1733479667282807], "isController": false}, {"data": ["T.2- Login", 1, 0, 0.0, 4360.0, 4360, 4360, 4360.0, 4360.0, 4360.0, 0.22935779816513763, 14.911840596330274, 0.7337657683486238], "isController": true}, {"data": ["2.2- Login-1", 1, 0, 0.0, 3775.0, 3775, 3775, 3775.0, 3775.0, 3775.0, 0.26490066225165565, 14.62774213576159, 0.1784975165562914], "isController": false}, {"data": ["2.2- Login-0", 1, 0, 0.0, 103.0, 103, 103, 103.0, 103.0, 103.0, 9.70873786407767, 8.172785194174757, 6.513577063106797], "isController": false}, {"data": ["T.8- Fin Operacion", 1, 0, 0.0, 288.0, 288, 288, 288.0, 288.0, 288.0, 3.472222222222222, 7.473415798611112, 10.13522677951389], "isController": true}, {"data": ["8.2- Fin Operacion", 1, 0, 0.0, 127.0, 127, 127, 127.0, 127.0, 127.0, 7.874015748031496, 7.481852854330708, 12.04939714566929], "isController": false}, {"data": ["Debug Sampler", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["2.1- Login", 1, 0, 0.0, 482.0, 482, 482, 482.0, 482.0, 482.0, 2.074688796680498, 18.576974196058092, 3.8474941649377596], "isController": false}, {"data": ["2.2- Login", 1, 0, 0.0, 3878.0, 3878, 3878, 3878.0, 3878.0, 3878.0, 0.25786487880350695, 14.456297946750903, 0.34675775206291903], "isController": false}, {"data": ["8.1- Fin Operacion", 1, 0, 0.0, 161.0, 161, 161, 161.0, 161.0, 161.0, 6.211180124223602, 7.466760481366459, 8.625291149068323], "isController": false}, {"data": ["5.1- Seleccionar un Cargador de la Lista", 1, 0, 0.0, 163.0, 163, 163, 163.0, 163.0, 163.0, 6.134969325153374, 18.32103144171779, 9.16650690184049], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 23, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
