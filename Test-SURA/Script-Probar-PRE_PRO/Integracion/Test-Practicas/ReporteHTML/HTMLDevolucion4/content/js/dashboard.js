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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.285, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.25, 500, 1500, "Login - -321"], "isController": false}, {"data": [0.0, 500, 1500, "No Claro a Pago - -388"], "isController": false}, {"data": [0.5, 500, 1500, "No Claro a Pago - -387"], "isController": false}, {"data": [0.0, 500, 1500, "Login - -323-1"], "isController": false}, {"data": [0.5, 500, 1500, "No Claro a Pago - -386"], "isController": false}, {"data": [1.0, 500, 1500, "Login - -323-0"], "isController": false}, {"data": [0.5, 500, 1500, "No Claro a Pago - -385"], "isController": false}, {"data": [1.0, 500, 1500, "Login - -321-1"], "isController": false}, {"data": [0.0, 500, 1500, "No Claro a Pago - -384"], "isController": false}, {"data": [0.5, 500, 1500, "Login - -321-0"], "isController": false}, {"data": [0.0, 500, 1500, "Revocar Pago - -409"], "isController": false}, {"data": [0.0, 500, 1500, "Revocar Pago - -407"], "isController": false}, {"data": [0.5, 500, 1500, "No Claro a Pago - -389"], "isController": false}, {"data": [0.0, 500, 1500, "Revocar Pago - -408"], "isController": false}, {"data": [1.0, 500, 1500, "Inicio - -310"], "isController": false}, {"data": [0.0, 500, 1500, "Revocar Pago - -406"], "isController": false}, {"data": [0.75, 500, 1500, "Revocar Pago - -400"], "isController": false}, {"data": [0.0, 500, 1500, "Transaction Controller"], "isController": true}, {"data": [0.0, 500, 1500, "Login - -323"], "isController": false}, {"data": [0.5, 500, 1500, "Compensar pago - -383"], "isController": false}, {"data": [0.0, 500, 1500, "Compensar pago - -382"], "isController": false}, {"data": [0.0, 500, 1500, "Pagos - -354"], "isController": false}, {"data": [0.5, 500, 1500, "Facturacion y Cobranza - -350"], "isController": false}, {"data": [0.5, 500, 1500, "Pagos - -355"], "isController": false}, {"data": [0.0, 500, 1500, "Revocar Pago - -412"], "isController": false}, {"data": [1.0, 500, 1500, "Debug Sampler"], "isController": false}, {"data": [0.0, 500, 1500, "Revocar Pago - -399"], "isController": false}, {"data": [0.0, 500, 1500, "Revocar Pago - -410"], "isController": false}, {"data": [0.0, 500, 1500, "Revocar Pago - -411"], "isController": false}, {"data": [0.5, 500, 1500, "Revocar Pago - -397"], "isController": false}, {"data": [0.5, 500, 1500, "No Claro a Pago - -390"], "isController": false}, {"data": [1.0, 500, 1500, "Inicio - -310-1"], "isController": false}, {"data": [1.0, 500, 1500, "Inicio - -310-0"], "isController": false}, {"data": [0.0, 500, 1500, "Buscar el pago - -375"], "isController": false}, {"data": [0.5, 500, 1500, "Inicio - -309"], "isController": false}, {"data": [0.5, 500, 1500, "Buscar el pago - -376"], "isController": false}, {"data": [0.0, 500, 1500, "Revocar Pago - -391"], "isController": false}, {"data": [0.0, 500, 1500, "Revocar Pago - -392"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 74, 0, 0.0, 3152.310810810811, 0, 18932, 9424.0, 11147.25, 18932.0, 0.7069568374190343, 22.094248422483137, 4.102991788791868], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["Login - -321", 4, 0, 0.0, 6735.75, 875, 12546, 12546.0, 12546.0, 12546.0, 0.3188267176789415, 11.790906339670014, 0.8023598158775705], "isController": false}, {"data": ["No Claro a Pago - -388", 4, 0, 0.0, 5407.75, 4406, 6469, 6469.0, 6469.0, 6469.0, 0.5997900734742839, 78.83842217723797, 10.582721828609987], "isController": false}, {"data": ["No Claro a Pago - -387", 2, 0, 0.0, 1266.0, 1264, 1268, 1268.0, 1268.0, 1268.0, 1.3614703880190604, 1.2929980003403676, 15.52328858917631], "isController": false}, {"data": ["Login - -323-1", 2, 0, 0.0, 11071.5, 11021, 11122, 11122.0, 11122.0, 11122.0, 0.17286084701815038, 9.54524430099395, 0.11580326274848747], "isController": false}, {"data": ["No Claro a Pago - -386", 2, 0, 0.0, 873.0, 821, 925, 925.0, 925.0, 925.0, 1.7714791851195748, 2.128715954384411, 19.94730541408326], "isController": false}, {"data": ["Login - -323-0", 2, 0, 0.0, 100.5, 100, 101, 101.0, 101.0, 101.0, 3.0816640986132513, 2.5851068952234204, 2.055445878274268], "isController": false}, {"data": ["No Claro a Pago - -385", 2, 0, 0.0, 1331.0, 1320, 1342, 1342.0, 1342.0, 1342.0, 1.2113870381586918, 7.179006094791036, 13.599120798001211], "isController": false}, {"data": ["Login - -321-1", 2, 0, 0.0, 299.5, 110, 489, 489.0, 489.0, 489.0, 3.0627871362940278, 25.270984877488512, 2.3419553981623276], "isController": false}, {"data": ["No Claro a Pago - -384", 4, 0, 0.0, 13096.75, 7996, 18238, 18238.0, 18238.0, 18238.0, 0.21932229411119641, 19.619814227163065, 8.783065406020397], "isController": false}, {"data": ["Login - -321-0", 2, 0, 0.0, 849.5, 765, 934, 934.0, 934.0, 934.0, 2.1413276231263385, 1.5035298447537473, 2.3201201150963597], "isController": false}, {"data": ["Revocar Pago - -409", 2, 0, 0.0, 2028.0, 1903, 2153, 2153.0, 2153.0, 2153.0, 0.8378718056137411, 4.9654541527021365, 9.85031223816506], "isController": false}, {"data": ["Revocar Pago - -407", 4, 0, 0.0, 13926.0, 8471, 19226, 19226.0, 19226.0, 19226.0, 0.2080515967960054, 28.244680462004577, 7.336510860943514], "isController": false}, {"data": ["No Claro a Pago - -389", 2, 0, 0.0, 998.5, 872, 1125, 1125.0, 1125.0, 1125.0, 1.6168148746968471, 28.73872650565885, 1.4139235549717055], "isController": false}, {"data": ["Revocar Pago - -408", 2, 0, 0.0, 2257.5, 2204, 2311, 2311.0, 2311.0, 2311.0, 0.744324525493115, 13.250648376442129, 0.6509205200967623], "isController": false}, {"data": ["Inicio - -310", 2, 0, 0.0, 384.0, 355, 413, 413.0, 413.0, 413.0, 4.739336492890995, 81.24676021919431, 6.289803021327015], "isController": false}, {"data": ["Revocar Pago - -406", 4, 0, 0.0, 3033.0, 2964, 3102, 3102.0, 3102.0, 3102.0, 1.0790396547073104, 3.854089391691395, 13.56966128270839], "isController": false}, {"data": ["Revocar Pago - -400", 2, 0, 0.0, 463.5, 398, 529, 529.0, 529.0, 529.0, 1.7730496453900708, 4.448207557624114, 0.997340425531915], "isController": false}, {"data": ["Transaction Controller", 2, 0, 0.0, 103931.0, 103470, 104392, 104392.0, 104392.0, 104392.0, 0.019143885442989513, 20.564215920294433, 4.024543881973161], "isController": true}, {"data": ["Login - -323", 2, 0, 0.0, 11172.5, 11122, 11223, 11223.0, 11223.0, 11223.0, 0.17136492160054836, 9.606392848727616, 0.22910017350698314], "isController": false}, {"data": ["Compensar pago - -383", 2, 0, 0.0, 1149.0, 1137, 1161, 1161.0, 1161.0, 1161.0, 1.6722408026755853, 2.558169157608696, 1.552211799749164], "isController": false}, {"data": ["Compensar pago - -382", 4, 0, 0.0, 9814.5, 9216, 10401, 10401.0, 10401.0, 10401.0, 0.384172109104879, 15.669176040866306, 4.401002899298885], "isController": false}, {"data": ["Pagos - -354", 4, 0, 0.0, 19211.25, 18565, 19856, 19856.0, 19856.0, 19856.0, 0.20145044319097502, 64.94175052565974, 0.37107997897360995], "isController": false}, {"data": ["Facturacion y Cobranza - -350", 4, 0, 0.0, 669.0, 613, 725, 725.0, 725.0, 725.0, 3.7629350893697087, 47.31780632643462, 4.411526928504234], "isController": false}, {"data": ["Pagos - -355", 2, 0, 0.0, 925.5, 924, 927, 927.0, 927.0, 927.0, 2.1164021164021167, 6.263434193121693, 2.7478091931216935], "isController": false}, {"data": ["Revocar Pago - -412", 2, 0, 0.0, 1663.0, 1595, 1731, 1731.0, 1731.0, 1731.0, 1.1554015020219526, 1.0972929303870596, 13.28429646880416], "isController": false}, {"data": ["Debug Sampler", 2, 0, 0.0, 1.0, 0, 2, 2.0, 2.0, 2.0, 35.08771929824561, 54.48190789473684, 0.0], "isController": false}, {"data": ["Revocar Pago - -399", 2, 0, 0.0, 3210.0, 3070, 3350, 3350.0, 3350.0, 3350.0, 0.49019607843137253, 6.1123717064950975, 6.12338196997549], "isController": false}, {"data": ["Revocar Pago - -410", 2, 0, 0.0, 1830.5, 1653, 2008, 2008.0, 2008.0, 2008.0, 0.9960159362549801, 0.9965022721613546, 11.574308235806773], "isController": false}, {"data": ["Revocar Pago - -411", 2, 0, 0.0, 2018.0, 1992, 2044, 2044.0, 2044.0, 2044.0, 0.945179584120983, 1.1357846467391304, 10.823875383979205], "isController": false}, {"data": ["Revocar Pago - -397", 2, 0, 0.0, 539.5, 537, 542, 542.0, 542.0, 542.0, 1.2919896640826873, 0.8276808785529716, 0.7254824773901809], "isController": false}, {"data": ["No Claro a Pago - -390", 2, 0, 0.0, 913.0, 888, 938, 938.0, 938.0, 938.0, 1.5337423312883436, 1.5329934336656441, 18.04319042369632], "isController": false}, {"data": ["Inicio - -310-1", 2, 0, 0.0, 218.0, 214, 222, 222.0, 222.0, 222.0, 8.968609865470851, 146.2260019618834, 5.587864349775785], "isController": false}, {"data": ["Inicio - -310-0", 2, 0, 0.0, 165.5, 133, 198, 198.0, 198.0, 198.0, 10.0, 8.388671875, 7.041015625], "isController": false}, {"data": ["Buscar el pago - -375", 4, 0, 0.0, 8437.5, 7814, 8990, 8990.0, 8990.0, 8990.0, 0.4448893337782227, 101.66709678428428, 5.176074512012012], "isController": false}, {"data": ["Inicio - -309", 4, 0, 0.0, 1075.5, 424, 1756, 1756.0, 1756.0, 1756.0, 2.2459292532285233, 38.330489366928695, 2.4378421532846715], "isController": false}, {"data": ["Buscar el pago - -376", 2, 0, 0.0, 1089.0, 1018, 1160, 1160.0, 1160.0, 1160.0, 1.7241379310344827, 31.7559603987069, 1.8293709590517242], "isController": false}, {"data": ["Revocar Pago - -391", 4, 0, 0.0, 17780.5, 2429, 32848, 32848.0, 32848.0, 32848.0, 0.12177301509985387, 12.757536845850584, 7.327221453741476], "isController": false}, {"data": ["Revocar Pago - -392", 4, 0, 0.0, 5701.0, 3376, 8229, 8229.0, 8229.0, 8229.0, 0.45284727725574553, 15.683485402751048, 8.401886922619722], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 74, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
