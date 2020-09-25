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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.14743589743589744, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "Clic Menu Pagos - -47"], "isController": false}, {"data": [1.0, 500, 1500, "Index - -9-1"], "isController": false}, {"data": [1.0, 500, 1500, "Index - -9-0"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Menu Pagos - -67"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Menu Pagos - -48"], "isController": false}, {"data": [1.0, 500, 1500, "Login - -25-1"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Boton Cerrar Compensacion de Pagos - -141"], "isController": false}, {"data": [1.0, 500, 1500, "Login - -27-0"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Boton Cerrar Compensacion de Pagos - -142"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Boton Buscar Razon de revertir - -162"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "Login - -25-0"], "isController": false}, {"data": [0.0, 500, 1500, "Login - -27-1"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Boton Cerrar Compensacion de Pagos - -143"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Boton Proceder (Revocar) - -168"], "isController": false}, {"data": [0.25, 500, 1500, "Login - -25"], "isController": false}, {"data": [0.0, 500, 1500, "Transaction Controller"], "isController": true}, {"data": [0.0, 500, 1500, "Login - -27"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Menu Compensacion de Pagos - -132"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Menu Compensacion de Pagos - -131"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Boton Proceder del No Claro - -137"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Boton Proceder (Revocar) - -169"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Boton Proceder del No Claro - -136"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Buscar Numero de Pago - -73"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Boton No Claro - -135"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Buscar Numero de Pago - -72"], "isController": false}, {"data": [0.0, 500, 1500, "Buscar Razon de revertir - -155"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Boton Aceptar Razon de revertir - -163"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Boton No Claro - -134"], "isController": false}, {"data": [0.08333333333333333, 500, 1500, "Buscar Razon de revertir - -154"], "isController": false}, {"data": [1.0, 500, 1500, "Index - -9"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Menu Revocar - -144"], "isController": false}, {"data": [0.5833333333333334, 500, 1500, "Index - -8"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Menu Facturacion y Cobranza - -46"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Boton Revocar - -164"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Boton Revocar - -165"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Boton Revocar - -166"], "isController": false}, {"data": [0.0, 500, 1500, "Clic Boton Revocar - -167"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 108, 0, 0.0, 15087.009259259255, 93, 60855, 39557.40000000002, 54828.149999999994, 60586.25999999999, 0.19390561823574615, 7.1255738478550095, 1.1644453878516334], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["Clic Menu Pagos - -47", 6, 0, 0.0, 73475.0, 51792, 96244, 96244.0, 96244.0, 96244.0, 0.06110352974723507, 19.7747193215726, 0.13032237203902478], "isController": false}, {"data": ["Index - -9-1", 3, 0, 0.0, 231.33333333333334, 147, 277, 277.0, 277.0, 277.0, 1.4278914802475011, 23.281789177772488, 0.8952210257020466], "isController": false}, {"data": ["Index - -9-0", 3, 0, 0.0, 114.66666666666667, 111, 120, 120.0, 120.0, 120.0, 1.5487867836861124, 1.3037638745482705, 1.1010906040268456], "isController": false}, {"data": ["Clic Menu Pagos - -67", 3, 0, 0.0, 7735.666666666667, 6058, 9909, 9909.0, 9909.0, 9909.0, 0.13890175016205206, 0.3484751915686638, 0.07881046566811742], "isController": false}, {"data": ["Clic Menu Pagos - -48", 3, 0, 0.0, 27972.333333333332, 22387, 33381, 33381.0, 33381.0, 33381.0, 0.08135813852579053, 0.24084339575310515, 0.1060145275126105], "isController": false}, {"data": ["Login - -25-1", 3, 0, 0.0, 183.0, 93, 251, 251.0, 251.0, 251.0, 1.4130946773433821, 11.660791038624586, 1.0860405381535563], "isController": false}, {"data": ["Clic Boton Cerrar Compensacion de Pagos - -141", 6, 0, 0.0, 24744.5, 7987, 56295, 56295.0, 56295.0, 56295.0, 0.07771618050878193, 0.6076383267058703, 1.3814481155445315], "isController": false}, {"data": ["Login - -27-0", 3, 0, 0.0, 107.0, 96, 128, 128.0, 128.0, 128.0, 1.525165226232842, 1.2838793213014743, 1.0232309672089477], "isController": false}, {"data": ["Clic Boton Cerrar Compensacion de Pagos - -142", 3, 0, 0.0, 15332.666666666666, 4625, 31940, 31940.0, 31940.0, 31940.0, 0.05301196303299111, 0.6687410818416356, 0.04660980213284798], "isController": false}, {"data": ["Clic Boton Buscar Razon de revertir - -162", 6, 0, 0.0, 29379.666666666668, 13399, 42418, 42418.0, 42418.0, 42418.0, 0.08736294937317084, 0.7561217766711804, 1.098833659124332], "isController": false}, {"data": ["Login - -25-0", 3, 0, 0.0, 406.3333333333333, 299, 528, 528.0, 528.0, 528.0, 1.3531799729364007, 0.9501332036535859, 1.472552294767704], "isController": false}, {"data": ["Login - -27-1", 3, 0, 0.0, 30040.0, 28746, 32371, 32371.0, 32371.0, 32371.0, 0.08769365682548962, 4.842448297281496, 0.059090452353113124], "isController": false}, {"data": ["Clic Boton Cerrar Compensacion de Pagos - -143", 3, 0, 0.0, 11346.333333333334, 9415, 12489, 12489.0, 12489.0, 12489.0, 0.050622658702035035, 0.05063913743208127, 0.5998916886031521], "isController": false}, {"data": ["Clic Boton Proceder (Revocar) - -168", 6, 0, 0.0, 17795.333333333332, 10023, 27085, 27085.0, 27085.0, 27085.0, 0.04233013270496603, 0.07101871873743325, 0.7356720768397734], "isController": false}, {"data": ["Login - -25", 6, 0, 0.0, 15662.833333333332, 550, 33065, 33065.0, 33065.0, 33065.0, 0.1719444046424989, 6.359368283421693, 0.43487045959306486], "isController": false}, {"data": ["Transaction Controller", 3, 0, 0.0, 512050.0, 440131, 556727, 556727.0, 556727.0, 556727.0, 0.005388637518927589, 6.685964280405837, 1.140496711134901], "isController": true}, {"data": ["Login - -27", 3, 0, 0.0, 30147.0, 28874, 32468, 32468.0, 32468.0, 32468.0, 0.08736676568233444, 4.897942421661133, 0.11748441049274856], "isController": false}, {"data": ["Clic Menu Compensacion de Pagos - -132", 3, 0, 0.0, 6774.333333333333, 5154, 8072, 8072.0, 8072.0, 8072.0, 0.11215791834903543, 0.1716687929938687, 0.10463691210557799], "isController": false}, {"data": ["Clic Menu Compensacion de Pagos - -131", 6, 0, 0.0, 51079.5, 8433, 111741, 111741.0, 111741.0, 111741.0, 0.04643244079863798, 0.6231424000735181, 2.1487700239900946], "isController": false}, {"data": ["Clic Boton Proceder del No Claro - -137", 3, 0, 0.0, 7386.0, 5412, 9024, 9024.0, 9024.0, 9024.0, 0.10022383322754151, 0.09526484147930378, 1.1513669591253801], "isController": false}, {"data": ["Clic Boton Proceder (Revocar) - -169", 3, 0, 0.0, 10794.0, 6431, 13651, 13651.0, 13651.0, 13651.0, 0.02363153707394308, 0.022462268312471938, 0.27452430454355686], "isController": false}, {"data": ["Clic Boton Proceder del No Claro - -136", 6, 0, 0.0, 12564.0, 8330, 17354, 17354.0, 17354.0, 17354.0, 0.15673162321717776, 0.2629540319210073, 2.67859548057834], "isController": false}, {"data": ["Clic Buscar Numero de Pago - -73", 3, 0, 0.0, 13234.333333333334, 10882, 15821, 15821.0, 15821.0, 15821.0, 0.09843165562044753, 1.3092499610374695, 0.10490404964236498], "isController": false}, {"data": ["Clic Boton No Claro - -135", 3, 0, 0.0, 8725.0, 7159, 10631, 10631.0, 10631.0, 10631.0, 0.09379103357719001, 0.5161865249640467, 1.0609805364065528], "isController": false}, {"data": ["Clic Buscar Numero de Pago - -72", 6, 0, 0.0, 58256.83333333333, 41721, 71150, 71150.0, 71150.0, 71150.0, 0.07243052705280185, 14.179442764039452, 0.8484651518626718], "isController": false}, {"data": ["Buscar Razon de revertir - -155", 3, 0, 0.0, 30796.666666666668, 29511, 31576, 31576.0, 31576.0, 31576.0, 0.04555531934278859, 0.8395109826282382, 0.5389971328620888], "isController": false}, {"data": ["Clic Boton Aceptar Razon de revertir - -163", 6, 0, 0.0, 32589.333333333336, 12428, 47224, 47224.0, 47224.0, 47224.0, 0.058534301100444865, 0.15940688899945368, 0.7411486685885429], "isController": false}, {"data": ["Clic Boton No Claro - -134", 6, 0, 0.0, 40087.0, 7886, 90652, 90652.0, 90652.0, 90652.0, 0.05412915215704671, 0.6578048739918445, 2.1835879705853163], "isController": false}, {"data": ["Buscar Razon de revertir - -154", 6, 0, 0.0, 47880.5, 763, 113954, 113954.0, 113954.0, 113954.0, 0.04067355405515334, 18.61645251616774, 0.7667799065016676], "isController": false}, {"data": ["Index - -9", 3, 0, 0.0, 346.0, 258, 397, 397.0, 397.0, 397.0, 1.3550135501355014, 23.23415975045167, 1.8128599254742548], "isController": false}, {"data": ["Clic Menu Revocar - -144", 6, 0, 0.0, 33688.333333333336, 25305, 39317, 39317.0, 39317.0, 39317.0, 0.08058667096462245, 0.5377166606226664, 0.9555239224890537], "isController": false}, {"data": ["Index - -8", 6, 0, 0.0, 662.0, 415, 930, 930.0, 930.0, 930.0, 2.1321961620469083, 36.41425961709311, 2.325842883795309], "isController": false}, {"data": ["Clic Menu Facturacion y Cobranza - -46", 6, 0, 0.0, 8463.0, 6922, 9979, 9979.0, 9979.0, 9979.0, 0.4299534217126478, 5.4068882121103545, 0.5060910068075959], "isController": false}, {"data": ["Clic Boton Revocar - -164", 6, 0, 0.0, 58003.0, 11840, 93513, 93513.0, 93513.0, 93513.0, 0.03502156744862044, 3.2106865577009507, 0.8415436412507369], "isController": false}, {"data": ["Clic Boton Revocar - -165", 3, 0, 0.0, 16275.666666666666, 12079, 23179, 23179.0, 23179.0, 23179.0, 0.020467616818922993, 0.25819712063272227, 0.01799577898043978], "isController": false}, {"data": ["Clic Boton Revocar - -166", 3, 0, 0.0, 8854.666666666666, 7114, 11973, 11973.0, 11973.0, 11973.0, 0.02135322504875653, 0.1272782890194599, 0.25358344929320825], "isController": false}, {"data": ["Clic Boton Revocar - -167", 3, 0, 0.0, 7647.666666666667, 5435, 11030, 11030.0, 11030.0, 11030.0, 0.022395580605427196, 0.022424741517673843, 0.262922075043858], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 108, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
