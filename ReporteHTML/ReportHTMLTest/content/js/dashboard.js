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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6944444444444444, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "Open file CSV   \u201Cmessage\u201D"], "isController": false}, {"data": [1.0, 500, 1500, "Home  16 07  2020  23 49 02-1"], "isController": false}, {"data": [1.0, 500, 1500, "Home  16 07  2020  23 49 02-0"], "isController": false}, {"data": [1.0, 500, 1500, "Home  16 07  2020  23 49 02-3"], "isController": false}, {"data": [1.0, 500, 1500, "Home  16 07  2020  23 49 02-2"], "isController": false}, {"data": [0.5, 500, 1500, "Home  16 07  2020  23 49 02"], "isController": false}, {"data": [0.5, 500, 1500, "Deportivo 6"], "isController": false}, {"data": [0.5, 500, 1500, "Corona Virus"], "isController": false}, {"data": [1.0, 500, 1500, "Deportivo 6-0"], "isController": false}, {"data": [0.5, 500, 1500, "Corona Virus-1"], "isController": false}, {"data": [1.0, 500, 1500, "Corona Virus-0"], "isController": false}, {"data": [0.5, 500, 1500, "Avion Rusia"], "isController": false}, {"data": [1.0, 500, 1500, "Farandula    1-0"], "isController": false}, {"data": [0.5, 500, 1500, "Avion Rusia-1"], "isController": false}, {"data": [0.5, 500, 1500, "Farandula    1-1"], "isController": false}, {"data": [0.5, 500, 1500, "Deportivo 6-1"], "isController": false}, {"data": [1.0, 500, 1500, "Avion Rusia-0"], "isController": false}, {"data": [0.5, 500, 1500, "Farandula    1"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 18, 0, 0.0, 645.9444444444445, 71, 1888, 1360.6000000000008, 1888.0, 1888.0, 2.6362038664323375, 83.55087164067076, 0.6119963294522553], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["Open file CSV   \u201Cmessage\u201D", 1, 0, 0.0, 1888.0, 1888, 1888, 1888.0, 1888.0, 1888.0, 0.5296610169491526, 0.47431557865466106, 0.08431127515889832], "isController": false}, {"data": ["Home  16 07  2020  23 49 02-1", 1, 0, 0.0, 437.0, 437, 437, 437.0, 437.0, 437.0, 2.288329519450801, 1.680491990846682, 0.28157179633867274], "isController": false}, {"data": ["Home  16 07  2020  23 49 02-0", 1, 0, 0.0, 474.0, 474, 474, 474.0, 474.0, 474.0, 2.109704641350211, 1.3309269514767934, 0.2678335970464135], "isController": false}, {"data": ["Home  16 07  2020  23 49 02-3", 1, 0, 0.0, 289.0, 289, 289, 289.0, 289.0, 289.0, 3.4602076124567476, 409.1188635380623, 0.39197664359861595], "isController": false}, {"data": ["Home  16 07  2020  23 49 02-2", 1, 0, 0.0, 71.0, 71, 71, 71.0, 71.0, 71.0, 14.084507042253522, 8.486465669014086, 1.7880721830985917], "isController": false}, {"data": ["Home  16 07  2020  23 49 02", 1, 0, 0.0, 1302.0, 1302, 1302, 1302.0, 1302.0, 1302.0, 0.7680491551459293, 92.32190860215053, 0.3765240975422427], "isController": false}, {"data": ["Deportivo 6", 1, 0, 0.0, 959.0, 959, 959, 959.0, 959.0, 959.0, 1.0427528675703859, 46.286414885297184, 0.40325208550573516], "isController": false}, {"data": ["Corona Virus", 1, 0, 0.0, 1286.0, 1286, 1286, 1286.0, 1286.0, 1286.0, 0.7776049766718507, 37.07444352643857, 0.328052099533437], "isController": false}, {"data": ["Deportivo 6-0", 1, 0, 0.0, 82.0, 82, 82, 82.0, 82.0, 82.0, 12.195121951219512, 9.360708841463413, 2.381859756097561], "isController": false}, {"data": ["Corona Virus-1", 1, 0, 0.0, 852.0, 852, 852, 852.0, 852.0, 852.0, 1.1737089201877935, 55.017605633802816, 0.2452868251173709], "isController": false}, {"data": ["Corona Virus-0", 1, 0, 0.0, 434.0, 434, 434, 434.0, 434.0, 434.0, 2.304147465437788, 1.849618375576037, 0.4905313940092166], "isController": false}, {"data": ["Avion Rusia", 1, 0, 0.0, 696.0, 696, 696, 696.0, 696.0, 696.0, 1.4367816091954022, 50.20036368534483, 0.524762033045977], "isController": false}, {"data": ["Farandula    1-0", 1, 0, 0.0, 77.0, 77, 77, 77.0, 77.0, 77.0, 12.987012987012989, 9.435876623376624, 2.2701907467532467], "isController": false}, {"data": ["Avion Rusia-1", 1, 0, 0.0, 613.0, 613, 613, 613.0, 613.0, 613.0, 1.6313213703099512, 55.78035787112561, 0.29472114600326266], "isController": false}, {"data": ["Farandula    1-1", 1, 0, 0.0, 565.0, 565, 565, 565.0, 565.0, 565.0, 1.7699115044247788, 65.23783185840709, 0.3024751106194691], "isController": false}, {"data": ["Deportivo 6-1", 1, 0, 0.0, 877.0, 877, 877, 877.0, 877.0, 877.0, 1.1402508551881414, 49.73898945267959, 0.21825114025085518], "isController": false}, {"data": ["Avion Rusia-0", 1, 0, 0.0, 83.0, 83, 83, 83.0, 83.0, 83.0, 12.048192771084338, 8.989081325301205, 2.223738704819277], "isController": false}, {"data": ["Farandula    1", 1, 0, 0.0, 642.0, 642, 642, 642.0, 642.0, 642.0, 1.557632398753894, 58.54507398753894, 0.5384783878504673], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 18, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
