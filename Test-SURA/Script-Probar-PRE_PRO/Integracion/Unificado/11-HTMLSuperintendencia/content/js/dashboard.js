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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7435897435897436, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.5, 500, 1500, "T.1- Index"], "isController": true}, {"data": [1.0, 500, 1500, "2.1- Login-0"], "isController": false}, {"data": [0.5, 500, 1500, "7.2- Clic Boton Empezar Operacion"], "isController": false}, {"data": [1.0, 500, 1500, "2.1- Login-1"], "isController": false}, {"data": [1.0, 500, 1500, "7.10- Clic Boton Empezar Operacion"], "isController": false}, {"data": [1.0, 500, 1500, "T.5- Seleccionar Cargador de la Lista"], "isController": true}, {"data": [0.5, 500, 1500, "4.1- Clic Menu Carga de Archivo"], "isController": false}, {"data": [1.0, 500, 1500, "1.2- Index"], "isController": false}, {"data": [1.0, 500, 1500, "7.13- Clic Boton Empezar Operacion"], "isController": false}, {"data": [1.0, 500, 1500, "5.1- Seleccionar Cargador de la Lista"], "isController": false}, {"data": [0.5, 500, 1500, "T.3- Clic Menu Servicio"], "isController": true}, {"data": [0.5, 500, 1500, "T.6- Descripcion y Carga de Archivo"], "isController": true}, {"data": [1.0, 500, 1500, "7.3- Clic Boton Empezar Operacion"], "isController": false}, {"data": [0.5, 500, 1500, "3.3- Clic Menu Servicio"], "isController": false}, {"data": [0.5, 500, 1500, "6.1- Descripcion y Carga de Archivo"], "isController": false}, {"data": [1.0, 500, 1500, "7.9- Clic Boton Empezar Operacion"], "isController": false}, {"data": [1.0, 500, 1500, "4.2- Clic Menu Carga de Archivo"], "isController": false}, {"data": [1.0, 500, 1500, "7.11- Clic Boton Empezar Operacion"], "isController": false}, {"data": [0.5, 500, 1500, "T.4- Clic Menu Carga de Archivo"], "isController": true}, {"data": [1.0, 500, 1500, "7.6- Clic Boton Empezar Operacion"], "isController": false}, {"data": [1.0, 500, 1500, "7.14- Clic Boton Empezar Operacion"], "isController": false}, {"data": [1.0, 500, 1500, "1.2- Index-1"], "isController": false}, {"data": [0.0, 500, 1500, "T.7- Clic Boton Empezar Operacion"], "isController": true}, {"data": [1.0, 500, 1500, "1.2- Index-0"], "isController": false}, {"data": [0.0, 500, 1500, "T.2- Login"], "isController": true}, {"data": [0.0, 500, 1500, "7.1- Clic Boton Empezar Operacion"], "isController": false}, {"data": [0.0, 500, 1500, "2.2- Login-1"], "isController": false}, {"data": [1.0, 500, 1500, "2.2- Login-0"], "isController": false}, {"data": [1.0, 500, 1500, "7.4- Clic Boton Empezar Operacion"], "isController": false}, {"data": [0.5, 500, 1500, "T.8- Fin Operacion"], "isController": true}, {"data": [0.5, 500, 1500, "1.1- Index"], "isController": false}, {"data": [1.0, 500, 1500, "8.2- Fin Operacion"], "isController": false}, {"data": [1.0, 500, 1500, "2.1- Login"], "isController": false}, {"data": [0.0, 500, 1500, "2.2- Login"], "isController": false}, {"data": [1.0, 500, 1500, "7.8- Clic Boton Empezar Operacion"], "isController": false}, {"data": [1.0, 500, 1500, "7.12- Clic Boton Empezar Operacion"], "isController": false}, {"data": [1.0, 500, 1500, "7.5- Clic Boton Empezar Operacion"], "isController": false}, {"data": [1.0, 500, 1500, "8.1- Fin Operacion"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 31, 0, 0.0, 964.5161290322582, 93, 14990, 3195.400000000002, 8310.799999999985, 14990.0, 1.2142101758646353, 13.945668990638833, 33.19157347929968], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["T.1- Index", 1, 0, 0.0, 998.0, 998, 998, 998.0, 998.0, 998.0, 1.002004008016032, 25.702772732965933, 1.7378507014028055], "isController": true}, {"data": ["2.1- Login-0", 1, 0, 0.0, 365.0, 365, 365, 365.0, 365.0, 365.0, 2.73972602739726, 1.9236943493150684, 2.983197773972603], "isController": false}, {"data": ["7.2- Clic Boton Empezar Operacion", 1, 0, 0.0, 502.0, 502, 502, 502.0, 502.0, 502.0, 1.9920318725099602, 62.72371451693227, 1.7819347609561753], "isController": false}, {"data": ["2.1- Login-1", 1, 0, 0.0, 93.0, 93, 93, 93.0, 93.0, 93.0, 10.752688172043012, 88.73067876344086, 8.274529569892474], "isController": false}, {"data": ["7.10- Clic Boton Empezar Operacion", 2, 0, 0.0, 119.0, 118, 120, 120.0, 120.0, 120.0, 8.130081300813009, 7.8680767276422765, 12.449186991869919], "isController": false}, {"data": ["T.5- Seleccionar Cargador de la Lista", 1, 0, 0.0, 216.0, 216, 216, 216.0, 216.0, 216.0, 4.62962962962963, 13.825593171296296, 6.926359953703704], "isController": true}, {"data": ["4.1- Clic Menu Carga de Archivo", 1, 0, 0.0, 941.0, 941, 941, 941.0, 941.0, 941.0, 1.0626992561105206, 68.15285434378322, 1.2723332890541976], "isController": false}, {"data": ["1.2- Index", 1, 0, 0.0, 230.0, 230, 230, 230.0, 230.0, 230.0, 4.3478260869565215, 74.54993206521739, 5.8169157608695645], "isController": false}, {"data": ["7.13- Clic Boton Empezar Operacion", 1, 0, 0.0, 122.0, 122, 122, 122.0, 122.0, 122.0, 8.196721311475411, 7.932569159836066, 12.551229508196721], "isController": false}, {"data": ["5.1- Seleccionar Cargador de la Lista", 1, 0, 0.0, 216.0, 216, 216, 216.0, 216.0, 216.0, 4.62962962962963, 13.825593171296296, 6.926359953703704], "isController": false}, {"data": ["T.3- Clic Menu Servicio", 1, 0, 0.0, 552.0, 552, 552, 552.0, 552.0, 552.0, 1.8115942028985508, 21.732053894927535, 2.1335767663043477], "isController": true}, {"data": ["T.6- Descripcion y Carga de Archivo", 1, 0, 0.0, 609.0, 609, 609, 609.0, 609.0, 609.0, 1.6420361247947455, 3.1429597701149428, 665.922619047619], "isController": true}, {"data": ["7.3- Clic Boton Empezar Operacion", 1, 0, 0.0, 131.0, 131, 131, 131.0, 131.0, 131.0, 7.633587786259541, 7.395038167938931, 13.50787213740458], "isController": false}, {"data": ["3.3- Clic Menu Servicio", 1, 0, 0.0, 552.0, 552, 552, 552.0, 552.0, 552.0, 1.8115942028985508, 21.732053894927535, 2.1335767663043477], "isController": false}, {"data": ["6.1- Descripcion y Carga de Archivo", 1, 0, 0.0, 609.0, 609, 609, 609.0, 609.0, 609.0, 1.6420361247947455, 3.1429597701149428, 665.922619047619], "isController": false}, {"data": ["7.9- Clic Boton Empezar Operacion", 1, 0, 0.0, 204.0, 204, 204, 204.0, 204.0, 204.0, 4.901960784313726, 4.74398743872549, 7.506127450980393], "isController": false}, {"data": ["4.2- Clic Menu Carga de Archivo", 1, 0, 0.0, 110.0, 110, 110, 110.0, 110.0, 110.0, 9.09090909090909, 25.168678977272727, 8.132102272727273], "isController": false}, {"data": ["7.11- Clic Boton Empezar Operacion", 1, 0, 0.0, 118.0, 118, 118, 118.0, 118.0, 118.0, 8.474576271186441, 8.201469809322035, 12.976694915254239], "isController": false}, {"data": ["T.4- Clic Menu Carga de Archivo", 1, 0, 0.0, 1051.0, 1051, 1051, 1051.0, 1051.0, 1051.0, 0.9514747859181732, 63.65403484776404, 1.9902919838249287], "isController": true}, {"data": ["7.6- Clic Boton Empezar Operacion", 1, 0, 0.0, 114.0, 114, 114, 114.0, 114.0, 114.0, 8.771929824561402, 8.489240679824562, 13.432017543859649], "isController": false}, {"data": ["7.14- Clic Boton Empezar Operacion", 1, 0, 0.0, 121.0, 121, 121, 121.0, 121.0, 121.0, 8.264462809917356, 44.89766270661157, 11.210291838842975], "isController": false}, {"data": ["1.2- Index-1", 1, 0, 0.0, 118.0, 118, 118, 118.0, 118.0, 118.0, 8.474576271186441, 138.1753177966102, 5.313162076271187], "isController": false}, {"data": ["T.7- Clic Boton Empezar Operacion", 1, 0, 0.0, 17026.0, 17026, 17026, 17026.0, 17026.0, 17026.0, 0.0587337013978621, 5.712942246417244, 24.944214455098084], "isController": true}, {"data": ["1.2- Index-0", 1, 0, 0.0, 112.0, 112, 112, 112.0, 112.0, 112.0, 8.928571428571429, 7.516043526785714, 6.34765625], "isController": false}, {"data": ["T.2- Login", 1, 0, 0.0, 4316.0, 4316, 4316, 4316.0, 4316.0, 4316.0, 0.23169601482854496, 15.063861214087119, 0.742151297497683], "isController": true}, {"data": ["7.1- Clic Boton Empezar Operacion", 1, 0, 0.0, 14990.0, 14990, 14990, 14990.0, 14990.0, 14990.0, 0.066711140760507, 3.3156870205136757, 27.042507505003336], "isController": false}, {"data": ["2.2- Login-1", 1, 0, 0.0, 3759.0, 3759, 3759, 3759.0, 3759.0, 3759.0, 0.26602819898909286, 14.690004406092045, 0.17925728252194734], "isController": false}, {"data": ["2.2- Login-0", 1, 0, 0.0, 99.0, 99, 99, 99.0, 99.0, 99.0, 10.101010101010102, 8.502998737373737, 6.776751893939394], "isController": false}, {"data": ["7.4- Clic Boton Empezar Operacion", 1, 0, 0.0, 122.0, 122, 122, 122.0, 122.0, 122.0, 8.196721311475411, 7.932569159836066, 12.551229508196721], "isController": false}, {"data": ["T.8- Fin Operacion", 1, 0, 0.0, 586.0, 586, 586, 586.0, 586.0, 586.0, 1.7064846416382253, 3.6729415529010243, 4.98780130119454], "isController": true}, {"data": ["1.1- Index", 1, 0, 0.0, 768.0, 768, 768, 768.0, 768.0, 768.0, 1.3020833333333333, 11.074066162109375, 0.5162556966145834], "isController": false}, {"data": ["8.2- Fin Operacion", 1, 0, 0.0, 120.0, 120, 120, 120.0, 120.0, 120.0, 8.333333333333334, 7.918294270833334, 12.7685546875], "isController": false}, {"data": ["2.1- Login", 1, 0, 0.0, 458.0, 458, 458, 458.0, 458.0, 458.0, 2.1834061135371177, 19.55044009279476, 4.057638509825328], "isController": false}, {"data": ["2.2- Login", 1, 0, 0.0, 3858.0, 3858, 3858, 3858.0, 3858.0, 3858.0, 0.2592016588906169, 14.5312398749352, 0.3485553557542768], "isController": false}, {"data": ["7.8- Clic Boton Empezar Operacion", 1, 0, 0.0, 123.0, 123, 123, 123.0, 123.0, 123.0, 8.130081300813009, 7.8680767276422765, 12.449186991869919], "isController": false}, {"data": ["7.12- Clic Boton Empezar Operacion", 1, 0, 0.0, 118.0, 118, 118, 118.0, 118.0, 118.0, 8.474576271186441, 8.201469809322035, 12.976694915254239], "isController": false}, {"data": ["7.5- Clic Boton Empezar Operacion", 1, 0, 0.0, 123.0, 123, 123, 123.0, 123.0, 123.0, 8.130081300813009, 7.8680767276422765, 12.449186991869919], "isController": false}, {"data": ["8.1- Fin Operacion", 1, 0, 0.0, 466.0, 466, 466, 466.0, 466.0, 466.0, 2.1459227467811157, 2.5797176770386265, 2.984173819742489], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 31, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
