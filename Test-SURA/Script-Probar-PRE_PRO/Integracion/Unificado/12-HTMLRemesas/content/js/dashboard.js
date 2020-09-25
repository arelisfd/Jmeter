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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7166666666666667, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.5, 500, 1500, "T.1- Index"], "isController": true}, {"data": [1.0, 500, 1500, "2.1- Login-0"], "isController": false}, {"data": [0.5, 500, 1500, "7.2- Clic Boton Empezar Operacion"], "isController": false}, {"data": [1.0, 500, 1500, "2.1- Login-1"], "isController": false}, {"data": [1.0, 500, 1500, "T.5- Seleccionar un Cargador de la Lista"], "isController": true}, {"data": [0.5, 500, 1500, "4.1- Clic Menu Carga de Archivo"], "isController": false}, {"data": [1.0, 500, 1500, "1.2- Index"], "isController": false}, {"data": [0.5, 500, 1500, "T.3- Clic Menu Servicio"], "isController": true}, {"data": [1.0, 500, 1500, "T.6- Descripcion y Carga de Archivo"], "isController": true}, {"data": [1.0, 500, 1500, "7.3- Clic Boton Empezar Operacion"], "isController": false}, {"data": [1.0, 500, 1500, "6.1- Descripcion y Carga de Archivo"], "isController": false}, {"data": [1.0, 500, 1500, "4.2- Clic Menu Carga de Archivo"], "isController": false}, {"data": [0.5, 500, 1500, "T.4- Clic Menu Carga de Archivo"], "isController": true}, {"data": [0.5, 500, 1500, "3.1- Clic Menu Servicio"], "isController": false}, {"data": [1.0, 500, 1500, "1.2- Index-1"], "isController": false}, {"data": [0.0, 500, 1500, "T.7- Clic Boton Empezar Operacion"], "isController": true}, {"data": [1.0, 500, 1500, "1.2- Index-0"], "isController": false}, {"data": [0.0, 500, 1500, "T.2- Login"], "isController": true}, {"data": [0.0, 500, 1500, "7.1- Clic Boton Empezar Operacion"], "isController": false}, {"data": [0.0, 500, 1500, "2.2- Login-1"], "isController": false}, {"data": [1.0, 500, 1500, "2.2- Login-0"], "isController": false}, {"data": [1.0, 500, 1500, "7.4- Clic Boton Empezar Operacion"], "isController": false}, {"data": [1.0, 500, 1500, "T.8- Fin Operacion"], "isController": true}, {"data": [0.5, 500, 1500, "1.1- Index"], "isController": false}, {"data": [1.0, 500, 1500, "8.2- Fin Operacion"], "isController": false}, {"data": [1.0, 500, 1500, "2.1- Login"], "isController": false}, {"data": [0.0, 500, 1500, "2.2- Login"], "isController": false}, {"data": [1.0, 500, 1500, "8.1- Fin Operacion"], "isController": false}, {"data": [1.0, 500, 1500, "5.1- Seleccionar un Cargador de la Lista"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 22, 0, 0.0, 1117.4545454545455, 95, 11878, 3794.5, 10669.749999999982, 11878.0, 1.0806031730438628, 15.072226963505083, 3.0237510130654743], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["T.1- Index", 1, 0, 0.0, 999.0, 999, 999, 999.0, 999.0, 999.0, 1.001001001001001, 25.67704423173173, 1.7361111111111112], "isController": true}, {"data": ["2.1- Login-0", 1, 0, 0.0, 216.0, 216, 216, 216.0, 216.0, 216.0, 4.62962962962963, 3.2506872106481484, 5.032009548611112], "isController": false}, {"data": ["7.2- Clic Boton Empezar Operacion", 1, 0, 0.0, 512.0, 512, 512, 512.0, 512.0, 512.0, 1.953125, 12.63427734375, 1.743316650390625], "isController": false}, {"data": ["2.1- Login-1", 1, 0, 0.0, 101.0, 101, 101, 101.0, 101.0, 101.0, 9.900990099009901, 81.7025061881188, 7.599783415841584], "isController": false}, {"data": ["T.5- Seleccionar un Cargador de la Lista", 1, 0, 0.0, 143.0, 143, 143, 143.0, 143.0, 143.0, 6.993006993006993, 20.883413461538463, 10.44853583916084], "isController": true}, {"data": ["4.1- Clic Menu Carga de Archivo", 1, 0, 0.0, 731.0, 731, 731, 731.0, 731.0, 731.0, 1.3679890560875512, 87.73164970930233, 1.6351744186046513], "isController": false}, {"data": ["1.2- Index", 1, 0, 0.0, 231.0, 231, 231, 231.0, 231.0, 231.0, 4.329004329004329, 74.22720508658008, 5.791734307359307], "isController": false}, {"data": ["T.3- Clic Menu Servicio", 1, 0, 0.0, 519.0, 519, 519, 519.0, 519.0, 519.0, 1.9267822736030829, 23.11386078998073, 2.265474470134875], "isController": true}, {"data": ["T.6- Descripcion y Carga de Archivo", 1, 0, 0.0, 331.0, 331, 331, 331.0, 331.0, 331.0, 3.0211480362537766, 5.782666163141994, 58.90058534743202], "isController": true}, {"data": ["7.3- Clic Boton Empezar Operacion", 1, 0, 0.0, 130.0, 130, 130, 130.0, 130.0, 130.0, 7.6923076923076925, 7.451923076923077, 13.46905048076923], "isController": false}, {"data": ["6.1- Descripcion y Carga de Archivo", 1, 0, 0.0, 331.0, 331, 331, 331.0, 331.0, 331.0, 3.0211480362537766, 5.782666163141994, 58.90058534743202], "isController": false}, {"data": ["4.2- Clic Menu Carga de Archivo", 1, 0, 0.0, 251.0, 251, 251, 251.0, 251.0, 251.0, 3.9840637450199203, 11.030098356573705, 3.5560881474103585], "isController": false}, {"data": ["T.4- Clic Menu Carga de Archivo", 1, 0, 0.0, 982.0, 982, 982, 982.0, 982.0, 982.0, 1.0183299389002036, 68.12667069755601, 2.126161532586558], "isController": true}, {"data": ["3.1- Clic Menu Servicio", 1, 0, 0.0, 519.0, 519, 519, 519.0, 519.0, 519.0, 1.9267822736030829, 23.11386078998073, 2.265474470134875], "isController": false}, {"data": ["1.2- Index-1", 1, 0, 0.0, 124.0, 124, 124, 124.0, 124.0, 124.0, 8.064516129032258, 131.48941532258064, 5.056073588709677], "isController": false}, {"data": ["T.7- Clic Boton Empezar Operacion", 1, 0, 0.0, 12822.0, 12822, 12822, 12822.0, 12822.0, 12822.0, 0.07799095304944627, 3.7495826265403216, 1.943299967828732], "isController": true}, {"data": ["1.2- Index-0", 1, 0, 0.0, 106.0, 106, 106, 106.0, 106.0, 106.0, 9.433962264150942, 7.941479952830189, 6.706957547169812], "isController": false}, {"data": ["T.2- Login", 1, 0, 0.0, 4142.0, 4142, 4142, 4142.0, 4142.0, 4142.0, 0.24142926122646063, 15.696674311926603, 0.7723850193143408], "isController": true}, {"data": ["7.1- Clic Boton Empezar Operacion", 1, 0, 0.0, 11878.0, 11878, 11878, 11878.0, 11878.0, 11878.0, 0.08418925745074927, 1.8586587335830949, 1.6337155613318741], "isController": false}, {"data": ["2.2- Login-1", 1, 0, 0.0, 3728.0, 3728, 3728, 3728.0, 3728.0, 3728.0, 0.26824034334763946, 14.812158412687767, 0.18074788760729613], "isController": false}, {"data": ["2.2- Login-0", 1, 0, 0.0, 95.0, 95, 95, 95.0, 95.0, 95.0, 10.526315789473683, 8.861019736842104, 7.0620888157894735], "isController": false}, {"data": ["7.4- Clic Boton Empezar Operacion", 2, 0, 0.0, 151.0, 137, 165, 165.0, 165.0, 165.0, 6.41025641025641, 59.49519230769231, 9.192833533653847], "isController": false}, {"data": ["T.8- Fin Operacion", 1, 0, 0.0, 276.0, 276, 276, 276.0, 276.0, 276.0, 3.6231884057971016, 7.7983469202898545, 10.575888813405797], "isController": true}, {"data": ["1.1- Index", 1, 0, 0.0, 768.0, 768, 768, 768.0, 768.0, 768.0, 1.3020833333333333, 11.074066162109375, 0.5162556966145834], "isController": false}, {"data": ["8.2- Fin Operacion", 1, 0, 0.0, 145.0, 145, 145, 145.0, 145.0, 145.0, 6.896551724137931, 6.553071120689656, 10.553609913793105], "isController": false}, {"data": ["2.1- Login", 1, 0, 0.0, 319.0, 319, 319, 319.0, 319.0, 319.0, 3.134796238244514, 28.069283894984327, 5.81345513322884], "isController": false}, {"data": ["2.2- Login", 1, 0, 0.0, 3823.0, 3823, 3823, 3823.0, 3823.0, 3823.0, 0.2615746795710175, 14.664275029427152, 0.3517464196965734], "isController": false}, {"data": ["8.1- Fin Operacion", 1, 0, 0.0, 131.0, 131, 131, 131.0, 131.0, 131.0, 7.633587786259541, 9.176705629770993, 10.600548664122137], "isController": false}, {"data": ["5.1- Seleccionar un Cargador de la Lista", 1, 0, 0.0, 143.0, 143, 143, 143.0, 143.0, 143.0, 6.993006993006993, 20.883413461538463, 10.44853583916084], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 22, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
