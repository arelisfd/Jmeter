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

    var data = {"OkPercent": 72.72727272727273, "KoPercent": 27.272727272727273};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6647727272727273, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "Home  21 07  2020  11 21 51-2"], "isController": false}, {"data": [1.0, 500, 1500, "Home  21 07  2020  11 21 51-1"], "isController": false}, {"data": [1.0, 500, 1500, "Home  21 07  2020  11 21 51-0"], "isController": false}, {"data": [0.875, 500, 1500, "Corona Virus-1"], "isController": false}, {"data": [1.0, 500, 1500, "Corona Virus-0"], "isController": false}, {"data": [1.0, 500, 1500, "Corona Virus-2"], "isController": false}, {"data": [1.0, 500, 1500, "Home  21 07  2020  11 21 51-3"], "isController": false}, {"data": [0.0, 500, 1500, "Open file CSV   \u201Cmessage\u201D"], "isController": false}, {"data": [1.0, 500, 1500, "Home  21 07  2020  11 21 48-3"], "isController": false}, {"data": [0.0, 500, 1500, "Home  21 07  2020  11 21 46"], "isController": false}, {"data": [0.0, 500, 1500, "Home  21 07  2020  11 21 48"], "isController": false}, {"data": [1.0, 500, 1500, "Home  21 07  2020  11 21 48-2"], "isController": false}, {"data": [1.0, 500, 1500, "Home  21 07  2020  11 21 46-3"], "isController": false}, {"data": [1.0, 500, 1500, "Home  21 07  2020  11 21 48-1"], "isController": false}, {"data": [1.0, 500, 1500, "Farandula    1-0"], "isController": false}, {"data": [1.0, 500, 1500, "Home  21 07  2020  11 21 46-2"], "isController": false}, {"data": [1.0, 500, 1500, "Home  21 07  2020  11 21 48-0"], "isController": false}, {"data": [1.0, 500, 1500, "Home  21 07  2020  11 21 44-3"], "isController": false}, {"data": [1.0, 500, 1500, "Farandula    1-1"], "isController": false}, {"data": [1.0, 500, 1500, "Home  21 07  2020  11 21 46-1"], "isController": false}, {"data": [1.0, 500, 1500, "Home  21 07  2020  11 21 44-2"], "isController": false}, {"data": [0.5, 500, 1500, "Farandula    1-2"], "isController": false}, {"data": [1.0, 500, 1500, "Home  21 07  2020  11 21 46-0"], "isController": false}, {"data": [1.0, 500, 1500, "Farandula    3-0"], "isController": false}, {"data": [1.0, 500, 1500, "Home  21 07  2020  11 21 44-1"], "isController": false}, {"data": [0.5, 500, 1500, "Farandula    3-1"], "isController": false}, {"data": [0.0, 500, 1500, "Home  21 07  2020  11 21 44"], "isController": false}, {"data": [1.0, 500, 1500, "Home  21 07  2020  11 21 44-0"], "isController": false}, {"data": [1.0, 500, 1500, "Farandula    3-2"], "isController": false}, {"data": [0.0, 500, 1500, "Deportivo 6"], "isController": false}, {"data": [0.0, 500, 1500, "Avion Rusia"], "isController": false}, {"data": [0.75, 500, 1500, "Avion Rusia-1"], "isController": false}, {"data": [0.0, 500, 1500, "Home  21 07  2020  11 21 51"], "isController": false}, {"data": [1.0, 500, 1500, "Avion Rusia-0"], "isController": false}, {"data": [1.0, 500, 1500, "Avion Rusia-2"], "isController": false}, {"data": [0.0, 500, 1500, "Farandula    4"], "isController": false}, {"data": [0.0, 500, 1500, "Farandula    2"], "isController": false}, {"data": [0.0, 500, 1500, "Farandula    3"], "isController": false}, {"data": [0.0, 500, 1500, "Corona Virus"], "isController": false}, {"data": [1.0, 500, 1500, "Deportivo 6-0"], "isController": false}, {"data": [0.75, 500, 1500, "Deportivo 6-2"], "isController": false}, {"data": [1.0, 500, 1500, "Farandula    2-0"], "isController": false}, {"data": [0.5, 500, 1500, "Deportivo 6-1"], "isController": false}, {"data": [1.0, 500, 1500, "Farandula    2-1"], "isController": false}, {"data": [0.0, 500, 1500, "Farandula    1"], "isController": false}, {"data": [1.0, 500, 1500, "Farandula    2-2"], "isController": false}, {"data": [1.0, 500, 1500, "Farandula    4-0"], "isController": false}, {"data": [1.0, 500, 1500, "Farandula    4-1"], "isController": false}, {"data": [1.0, 500, 1500, "Farandula    4-2"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 88, 24, 27.272727272727273, 504.909090909091, 62, 2675, 1083.2000000000005, 1282.8999999999999, 2675.0, 7.0080433224496295, 169.9744477681771, 1.830869982878076], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["Home  21 07  2020  11 21 51-2", 1, 0, 0.0, 69.0, 69, 69, 69.0, 69.0, 69.0, 14.492753623188406, 8.73245018115942, 1.8399003623188404], "isController": false}, {"data": ["Home  21 07  2020  11 21 51-1", 1, 0, 0.0, 323.0, 323, 323, 323.0, 323.0, 323.0, 3.0959752321981426, 2.2736068111455108, 0.3809500773993808], "isController": false}, {"data": ["Home  21 07  2020  11 21 51-0", 1, 0, 0.0, 279.0, 279, 279, 279.0, 279.0, 279.0, 3.5842293906810037, 2.2611447132616487, 0.45502912186379924], "isController": false}, {"data": ["Corona Virus-1", 4, 0, 0.0, 418.75, 328, 658, 658.0, 658.0, 658.0, 0.7756447547023463, 0.5491625460539074, 0.16209763428349816], "isController": false}, {"data": ["Corona Virus-0", 4, 0, 0.0, 300.75, 288, 315, 315.0, 315.0, 315.0, 0.7777561734396267, 0.6243316157884503, 0.16557699786117053], "isController": false}, {"data": ["Corona Virus-2", 4, 0, 0.0, 150.5, 92, 202, 202.0, 202.0, 202.0, 0.8587376556462001, 40.345365164770286, 0.1828171962215543], "isController": false}, {"data": ["Home  21 07  2020  11 21 51-3", 1, 0, 0.0, 263.0, 263, 263, 263.0, 263.0, 263.0, 3.802281368821293, 367.3842977661597, 0.4307271863117871], "isController": false}, {"data": ["Open file CSV   \u201Cmessage\u201D", 4, 4, 100.0, 838.25, 783, 983, 983.0, 983.0, 983.0, 0.48822165263029416, 0.4372063041620896, 0.08462826498230197], "isController": false}, {"data": ["Home  21 07  2020  11 21 48-3", 1, 0, 0.0, 301.0, 301, 301, 301.0, 301.0, 301.0, 3.3222591362126246, 321.00355585548175, 0.3763496677740864], "isController": false}, {"data": ["Home  21 07  2020  11 21 46", 1, 1, 100.0, 929.0, 929, 929, 929.0, 929.0, 929.0, 1.0764262648008611, 106.12469725511302, 0.5277011571582346], "isController": false}, {"data": ["Home  21 07  2020  11 21 48", 1, 1, 100.0, 1031.0, 1031, 1031, 1031.0, 1031.0, 1031.0, 0.9699321047526673, 95.6254546556741, 0.4754940591658584], "isController": false}, {"data": ["Home  21 07  2020  11 21 48-2", 1, 0, 0.0, 70.0, 70, 70, 70.0, 70.0, 70.0, 14.285714285714285, 8.607700892857142, 1.8136160714285712], "isController": false}, {"data": ["Home  21 07  2020  11 21 46-3", 1, 0, 0.0, 248.0, 248, 248, 248.0, 248.0, 248.0, 4.032258064516129, 389.60512222782256, 0.45677923387096775], "isController": false}, {"data": ["Home  21 07  2020  11 21 48-1", 1, 0, 0.0, 345.0, 345, 345, 345.0, 345.0, 345.0, 2.898550724637681, 2.1286231884057973, 0.3566576086956522], "isController": false}, {"data": ["Farandula    1-0", 1, 0, 0.0, 70.0, 70, 70, 70.0, 70.0, 70.0, 14.285714285714285, 10.379464285714285, 2.497209821428571], "isController": false}, {"data": ["Home  21 07  2020  11 21 46-2", 1, 0, 0.0, 68.0, 68, 68, 68.0, 68.0, 68.0, 14.705882352941176, 8.86086856617647, 1.866957720588235], "isController": false}, {"data": ["Home  21 07  2020  11 21 48-0", 1, 0, 0.0, 313.0, 313, 313, 313.0, 313.0, 313.0, 3.1948881789137378, 2.015525159744409, 0.4056010383386581], "isController": false}, {"data": ["Home  21 07  2020  11 21 44-3", 1, 0, 0.0, 280.0, 280, 280, 280.0, 280.0, 280.0, 3.571428571428571, 345.07882254464283, 0.4045758928571428], "isController": false}, {"data": ["Farandula    1-1", 1, 0, 0.0, 447.0, 447, 447, 447.0, 447.0, 447.0, 2.237136465324385, 1.509630173378076, 0.3823231263982103], "isController": false}, {"data": ["Home  21 07  2020  11 21 46-1", 1, 0, 0.0, 309.0, 309, 309, 309.0, 309.0, 309.0, 3.236245954692557, 2.376618122977346, 0.39820995145631066], "isController": false}, {"data": ["Home  21 07  2020  11 21 44-2", 1, 0, 0.0, 62.0, 62, 62, 62.0, 62.0, 62.0, 16.129032258064516, 9.718371975806452, 2.047631048387097], "isController": false}, {"data": ["Farandula    1-2", 1, 0, 0.0, 559.0, 559, 559, 559.0, 559.0, 559.0, 1.7889087656529516, 66.12847998658317, 0.3214445438282647], "isController": false}, {"data": ["Home  21 07  2020  11 21 46-0", 1, 0, 0.0, 304.0, 304, 304, 304.0, 304.0, 304.0, 3.289473684210526, 2.0751953125, 0.4176089638157895], "isController": false}, {"data": ["Farandula    3-0", 1, 0, 0.0, 71.0, 71, 71, 71.0, 71.0, 71.0, 14.084507042253522, 10.233274647887324, 2.4620378521126765], "isController": false}, {"data": ["Home  21 07  2020  11 21 44-1", 1, 0, 0.0, 392.0, 392, 392, 392.0, 392.0, 392.0, 2.5510204081632653, 1.8734056122448979, 0.31389508928571425], "isController": false}, {"data": ["Farandula    3-1", 1, 0, 0.0, 502.0, 502, 502, 502.0, 502.0, 502.0, 1.9920318725099602, 1.3442324452191234, 0.3404351344621514], "isController": false}, {"data": ["Home  21 07  2020  11 21 44", 1, 1, 100.0, 1139.0, 1139, 1139, 1139.0, 1139.0, 1139.0, 0.8779631255487269, 86.55824736611062, 0.4304077041264267], "isController": false}, {"data": ["Home  21 07  2020  11 21 44-0", 1, 0, 0.0, 402.0, 402, 402, 402.0, 402.0, 402.0, 2.487562189054726, 1.5693019278606963, 0.3158037935323383], "isController": false}, {"data": ["Farandula    3-2", 1, 0, 0.0, 86.0, 86, 86, 86.0, 86.0, 86.0, 11.627906976744185, 429.83511991279073, 2.089389534883721], "isController": false}, {"data": ["Deportivo 6", 4, 4, 100.0, 1800.25, 1177, 2675, 2675.0, 2675.0, 2675.0, 0.5312084993359893, 24.014359229747676, 0.31073622177954846], "isController": false}, {"data": ["Avion Rusia", 4, 4, 100.0, 717.25, 582, 920, 920.0, 920.0, 920.0, 0.7639419404125286, 27.266162146676855, 0.42151093391902217], "isController": false}, {"data": ["Avion Rusia-1", 4, 0, 0.0, 532.25, 416, 648, 648.0, 648.0, 648.0, 0.7874015748031495, 0.5367249015748031, 0.14225516732283464], "isController": false}, {"data": ["Home  21 07  2020  11 21 51", 1, 1, 100.0, 937.0, 937, 937, 937.0, 937.0, 937.0, 1.0672358591248667, 105.2186165955176, 0.523195704375667], "isController": false}, {"data": ["Avion Rusia-0", 4, 0, 0.0, 72.0, 70, 76, 76.0, 76.0, 76.0, 0.8845643520566122, 0.6599679345422379, 0.1632643188854489], "isController": false}, {"data": ["Avion Rusia-2", 4, 0, 0.0, 112.5, 79, 201, 201.0, 201.0, 201.0, 0.843348091924942, 28.896202298123548, 0.15730418511490615], "isController": false}, {"data": ["Farandula    4", 1, 1, 100.0, 606.0, 606, 606, 606.0, 606.0, 606.0, 1.6501650165016502, 63.31219059405941, 0.8669812293729373], "isController": false}, {"data": ["Farandula    2", 1, 1, 100.0, 618.0, 618, 618, 618.0, 618.0, 618.0, 1.6181229773462784, 62.08282766990291, 0.850146642394822], "isController": false}, {"data": ["Farandula    3", 1, 1, 100.0, 660.0, 660, 660, 660.0, 660.0, 660.0, 1.5151515151515151, 58.13210227272727, 0.7960464015151515], "isController": false}, {"data": ["Corona Virus", 4, 4, 100.0, 870.5, 748, 1175, 1175.0, 1175.0, 1175.0, 0.7103534008169065, 34.447110582045816, 0.4509079204404191], "isController": false}, {"data": ["Deportivo 6-0", 4, 0, 0.0, 131.25, 66, 304, 304.0, 304.0, 304.0, 0.6293266205160478, 0.48305734738829453, 0.1229153555695406], "isController": false}, {"data": ["Deportivo 6-2", 4, 0, 0.0, 804.75, 410, 1320, 1320.0, 1320.0, 1320.0, 0.6772773450728073, 29.62823823230613, 0.13426494243142567], "isController": false}, {"data": ["Farandula    2-0", 1, 0, 0.0, 72.0, 72, 72, 72.0, 72.0, 72.0, 13.888888888888888, 10.091145833333334, 2.4278428819444446], "isController": false}, {"data": ["Deportivo 6-1", 4, 0, 0.0, 863.0, 685, 1318, 1318.0, 1318.0, 1318.0, 0.5893620156180933, 0.40863967879770147, 0.1128075733019007], "isController": false}, {"data": ["Farandula    2-1", 1, 0, 0.0, 472.0, 472, 472, 472.0, 472.0, 472.0, 2.1186440677966103, 1.4296709480932204, 0.3620729608050848], "isController": false}, {"data": ["Farandula    1", 1, 1, 100.0, 1077.0, 1077, 1077, 1077.0, 1077.0, 1077.0, 0.9285051067780873, 35.6241295264624, 0.487827878365831], "isController": false}, {"data": ["Farandula    2-2", 1, 0, 0.0, 74.0, 74, 74, 74.0, 74.0, 74.0, 13.513513513513514, 499.5381123310811, 2.4282094594594597], "isController": false}, {"data": ["Farandula    4-0", 1, 0, 0.0, 73.0, 73, 73, 73.0, 73.0, 73.0, 13.698630136986301, 9.952910958904111, 2.3945847602739727], "isController": false}, {"data": ["Farandula    4-1", 1, 0, 0.0, 441.0, 441, 441, 441.0, 441.0, 441.0, 2.2675736961451247, 1.5301693594104309, 0.38752480158730157], "isController": false}, {"data": ["Farandula    4-2", 1, 0, 0.0, 92.0, 92, 92, 92.0, 92.0, 92.0, 10.869565217391305, 401.80239470108694, 1.953125], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Mensaje de ERROR TEST NULL1595348506263", 5, 20.833333333333332, 5.681818181818182], "isController": false}, {"data": ["Mensaje de ERROR TEST 100001595348511243", 1, 4.166666666666667, 1.1363636363636365], "isController": false}, {"data": ["Mensaje de ERROR TEST 100001595348508749", 1, 4.166666666666667, 1.1363636363636365], "isController": false}, {"data": ["Mensaje de ERROR TEST 100001595348504058", 1, 4.166666666666667, 1.1363636363636365], "isController": false}, {"data": ["Mensaje de ERROR TEST NULL1595348508749", 5, 20.833333333333332, 5.681818181818182], "isController": false}, {"data": ["Mensaje de ERROR TEST 100001595348506263", 1, 4.166666666666667, 1.1363636363636365], "isController": false}, {"data": ["Mensaje de ERROR TEST NULL1595348511243", 5, 20.833333333333332, 5.681818181818182], "isController": false}, {"data": ["Mensaje de ERROR TEST NULL1595348504058", 5, 20.833333333333332, 5.681818181818182], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 88, 24, "Mensaje de ERROR TEST NULL1595348506263", 5, "Mensaje de ERROR TEST NULL1595348508749", 5, "Mensaje de ERROR TEST NULL1595348511243", 5, "Mensaje de ERROR TEST NULL1595348504058", 5, "Mensaje de ERROR TEST 100001595348511243", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Open file CSV   \u201Cmessage\u201D", 4, 4, "Mensaje de ERROR TEST 100001595348511243", 1, "Mensaje de ERROR TEST 100001595348508749", 1, "Mensaje de ERROR TEST 100001595348504058", 1, "Mensaje de ERROR TEST 100001595348506263", 1, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["Home  21 07  2020  11 21 46", 1, 1, "Mensaje de ERROR TEST NULL1595348506263", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Home  21 07  2020  11 21 48", 1, 1, "Mensaje de ERROR TEST NULL1595348508749", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Home  21 07  2020  11 21 44", 1, 1, "Mensaje de ERROR TEST NULL1595348504058", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Deportivo 6", 4, 4, "Mensaje de ERROR TEST NULL1595348506263", 1, "Mensaje de ERROR TEST NULL1595348508749", 1, "Mensaje de ERROR TEST NULL1595348511243", 1, "Mensaje de ERROR TEST NULL1595348504058", 1, null, null], "isController": false}, {"data": ["Avion Rusia", 4, 4, "Mensaje de ERROR TEST NULL1595348506263", 1, "Mensaje de ERROR TEST NULL1595348508749", 1, "Mensaje de ERROR TEST NULL1595348511243", 1, "Mensaje de ERROR TEST NULL1595348504058", 1, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["Home  21 07  2020  11 21 51", 1, 1, "Mensaje de ERROR TEST NULL1595348511243", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Farandula    4", 1, 1, "Mensaje de ERROR TEST NULL1595348511243", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Farandula    2", 1, 1, "Mensaje de ERROR TEST NULL1595348506263", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Farandula    3", 1, 1, "Mensaje de ERROR TEST NULL1595348508749", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Corona Virus", 4, 4, "Mensaje de ERROR TEST NULL1595348506263", 1, "Mensaje de ERROR TEST NULL1595348508749", 1, "Mensaje de ERROR TEST NULL1595348511243", 1, "Mensaje de ERROR TEST NULL1595348504058", 1, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Farandula    1", 1, 1, "Mensaje de ERROR TEST NULL1595348504058", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
