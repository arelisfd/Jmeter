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

    var data = {"OkPercent": 99.6590909090909, "KoPercent": 0.3409090909090909};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.08416666666666667, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "12.2 - Cometer-253"], "isController": false}, {"data": [0.0, 500, 1500, "5.2 - Submenu INSIS - Endosos-167"], "isController": false}, {"data": [0.0, 500, 1500, "9.2 - Endoso general - Crear-238"], "isController": false}, {"data": [0.0, 500, 1500, "15.2 - Logout-259"], "isController": false}, {"data": [0.15, 500, 1500, "2.1 - Login-99"], "isController": false}, {"data": [0.0, 500, 1500, "8.1 - Seleccionar poliza - Siguiente-215"], "isController": false}, {"data": [0.7, 500, 1500, "1.2 - Index-69-1"], "isController": false}, {"data": [0.0, 500, 1500, "14 - Numero de apendice - Hacer cambios"], "isController": true}, {"data": [0.0, 500, 1500, "15 - Logout"], "isController": true}, {"data": [0.2, 500, 1500, "1 - Index"], "isController": true}, {"data": [0.0, 500, 1500, "Transaction Controller"], "isController": true}, {"data": [0.0, 500, 1500, "14.2 - Numero de apendice - Hacer cambios-256"], "isController": false}, {"data": [0.0, 500, 1500, "10.2 - Razon de apendice - Crear-244"], "isController": false}, {"data": [0.0, 500, 1500, "2.2 - Login-101-1"], "isController": false}, {"data": [0.0, 500, 1500, "7.1 - Buscar por numero de poliza-209"], "isController": false}, {"data": [0.725, 500, 1500, "2.2 - Login-101-0"], "isController": false}, {"data": [0.0, 500, 1500, "9 - Endoso general - Crear"], "isController": true}, {"data": [0.575, 500, 1500, "1.1 - Index-68"], "isController": false}, {"data": [0.0, 500, 1500, "6.1 - Modulo Cancelacion de poliza-171"], "isController": false}, {"data": [0.725, 500, 1500, "1.3 - Index-95"], "isController": false}, {"data": [0.0, 500, 1500, "6.3 - Modulo Cancelacion de poliza-192"], "isController": false}, {"data": [0.0, 500, 1500, "6 - Modulo Cancelacion de poliza"], "isController": true}, {"data": [0.0, 500, 1500, "12 - Cometer"], "isController": true}, {"data": [0.0, 500, 1500, "15.3 - Logout-261-1"], "isController": false}, {"data": [0.0, 500, 1500, "10.1 - Razon de apendice - Crear-243"], "isController": false}, {"data": [0.0, 500, 1500, "15.3 - Logout-261-0"], "isController": false}, {"data": [0.375, 500, 1500, "2.1 - Login-99-1"], "isController": false}, {"data": [0.0, 500, 1500, "3.1 - Menu INSIS - Operaciones del Sistema-164"], "isController": false}, {"data": [0.0, 500, 1500, "10 - Razon de apendice - Crear"], "isController": true}, {"data": [0.275, 500, 1500, "2.1 - Login-99-0"], "isController": false}, {"data": [0.0, 500, 1500, "14.1 - Numero de apendice - Hacer cambios-255"], "isController": false}, {"data": [0.0, 500, 1500, "4 - Submenu INSIS - Control de polizas"], "isController": true}, {"data": [0.0, 500, 1500, "15.1 - Logout-258-2"], "isController": false}, {"data": [0.0, 500, 1500, "15.1 - Logout-258-1"], "isController": false}, {"data": [0.0, 500, 1500, "15.1 - Logout-258-0"], "isController": false}, {"data": [0.5, 500, 1500, "1.2 - Index-69"], "isController": false}, {"data": [0.0, 500, 1500, "6.4 - Modulo Cancelacion de poliza-202"], "isController": false}, {"data": [0.0, 500, 1500, "13.1 - Calculo de Prima-254"], "isController": false}, {"data": [0.0, 500, 1500, "2 - Login"], "isController": true}, {"data": [0.0, 500, 1500, "6.2 - Modulo Cancelacion de poliza-187"], "isController": false}, {"data": [0.0, 500, 1500, "15.1 - Logout-258"], "isController": false}, {"data": [0.0, 500, 1500, "11 - Razon de apendice - Rellenar datos"], "isController": true}, {"data": [0.0, 500, 1500, "2.2 - Login-101"], "isController": false}, {"data": [0.0, 500, 1500, "4.1 - Submenu INSIS - Control de polizas-165"], "isController": false}, {"data": [0.0, 500, 1500, "5.1 - Submenu INSIS - Endosos-166"], "isController": false}, {"data": [0.0, 500, 1500, "8.2 - Seleccionar poliza - Siguiente-227"], "isController": false}, {"data": [0.825, 500, 1500, "1.2 - Index-69-0"], "isController": false}, {"data": [0.0, 500, 1500, "7.2 - Buscar por numero de poliza-210"], "isController": false}, {"data": [0.0, 500, 1500, "12.1 - Cometer-252"], "isController": false}, {"data": [0.0, 500, 1500, "7 - Buscar por numero de poliza"], "isController": true}, {"data": [0.0, 500, 1500, "8 - Seleccionar poliza - Siguiente"], "isController": true}, {"data": [0.0, 500, 1500, "3 - Menu INSIS - Operaciones del Sistema"], "isController": true}, {"data": [0.0, 500, 1500, "13 - Calculo de Prima"], "isController": true}, {"data": [0.0, 500, 1500, "9.1 - Endoso general - Crear-237"], "isController": false}, {"data": [0.0, 500, 1500, "11.1 - Razon de apendice - Rellenar datos-245"], "isController": false}, {"data": [0.0, 500, 1500, "5 - Submenu INSIS - Endosos"], "isController": true}, {"data": [0.0, 500, 1500, "7.3 - Buscar por numero de poliza-212"], "isController": false}, {"data": [0.0, 500, 1500, "15.2 - Logout-259-0"], "isController": false}, {"data": [0.0, 500, 1500, "15.3 - Logout-261"], "isController": false}, {"data": [0.0, 500, 1500, "15.2 - Logout-259-1"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 880, 3, 0.3409090909090909, 21739.9159090909, 89, 369438, 36338.399999999994, 44702.24999999999, 356707.2099999996, 0.953540887399824, 19.365978185991402, 1.3282230291501784], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["12.2 - Cometer-253", 20, 0, 0.0, 13567.05, 5084, 20709, 20162.800000000003, 20684.8, 20709.0, 0.08368586001866193, 2.889989837398374, 0.09584237532899004], "isController": false}, {"data": ["5.2 - Submenu INSIS - Endosos-167", 20, 1, 5.0, 15027.95, 2419, 33622, 33358.700000000004, 33611.2, 33622.0, 0.1705117056285914, 0.3188518940653401, 0.2557509069091343], "isController": false}, {"data": ["9.2 - Endoso general - Crear-238", 20, 0, 0.0, 15701.199999999999, 5139, 36816, 33952.70000000003, 36754.85, 36816.0, 0.11046733204823005, 3.27163459546863, 0.11346095359543548], "isController": false}, {"data": ["15.2 - Logout-259", 20, 0, 0.0, 20503.6, 9462, 36373, 30877.5, 36099.7, 36373.0, 0.03159402936033148, 0.2770339742445473, 0.04445995733226335], "isController": false}, {"data": ["2.1 - Login-99", 20, 0, 0.0, 4690.9, 589, 33711, 9412.300000000005, 32506.29999999998, 33711.0, 0.29866348092287015, 2.6742631411931606, 0.5800458961771074], "isController": false}, {"data": ["8.1 - Seleccionar poliza - Siguiente-215", 20, 0, 0.0, 46606.799999999996, 4660, 75240, 70236.3, 75006.05, 75240.0, 0.12697767732432638, 12.506817610057901, 0.3585817367213094], "isController": false}, {"data": ["1.2 - Index-69-1", 20, 0, 0.0, 1074.3999999999999, 126, 6700, 3687.0000000000027, 6556.0999999999985, 6700.0, 0.6808510638297872, 11.114394946808511, 0.4568816489361702], "isController": false}, {"data": ["14 - Numero de apendice - Hacer cambios", 20, 0, 0.0, 318746.8, 11076, 380153, 379938.4, 380151.25, 380153.0, 0.03347229916202099, 2.168905287932901, 0.1084728038615318], "isController": true}, {"data": ["15 - Logout", 20, 0, 0.0, 80029.8, 60666, 93583, 90526.40000000001, 93435.15, 93583.0, 0.029822748494323984, 1.0746761389307649, 0.1798378718896737], "isController": true}, {"data": ["1 - Index", 20, 0, 0.0, 3625.2999999999997, 839, 18238, 15203.90000000002, 18132.55, 18238.0, 0.5373743887366328, 14.044416092347788, 1.3618819774705786], "isController": true}, {"data": ["Transaction Controller", 20, 3, 15.0, 833254.4000000001, 303833, 918833, 914873.9, 918678.2, 918833.0, 0.021672581475360983, 16.802142876493374, 1.0935563436323246], "isController": true}, {"data": ["14.2 - Numero de apendice - Hacer cambios-256", 20, 0, 0.0, 10423.400000000001, 2114, 13649, 13498.300000000001, 13642.1, 13649.0, 0.033982050680830385, 1.0176097641475772, 0.03490295098004234], "isController": false}, {"data": ["10.2 - Razon de apendice - Crear-244", 20, 0, 0.0, 12185.950000000004, 4469, 19338, 17777.2, 19262.199999999997, 19338.0, 0.10265096106962301, 0.6945781045500038, 0.09590947949547052], "isController": false}, {"data": ["2.2 - Login-101-1", 20, 0, 0.0, 34762.30000000001, 27088, 58157, 39413.200000000004, 57231.14999999999, 58157.0, 0.14882724133825456, 8.237536939386386, 0.1068460414744315], "isController": false}, {"data": ["7.1 - Buscar por numero de poliza-209", 20, 0, 0.0, 12835.400000000001, 3861, 21861, 19656.200000000004, 21758.199999999997, 21861.0, 0.1488881775342629, 0.15311200718013235, 0.4363048815780658], "isController": false}, {"data": ["2.2 - Login-101-0", 20, 0, 0.0, 2142.5000000000005, 94, 10763, 9763.700000000008, 10730.25, 10763.0, 0.2614925997594268, 0.2202385670532399, 0.18696465518932065], "isController": false}, {"data": ["9 - Endoso general - Crear", 20, 0, 0.0, 38243.2, 9676, 66205, 55559.500000000015, 65700.75, 66205.0, 0.10776791102681266, 8.083750990117682, 0.2830486295963014], "isController": true}, {"data": ["1.1 - Index-68", 20, 0, 0.0, 933.65, 394, 2861, 2101.5000000000005, 2824.1499999999996, 2861.0, 0.9161284412074573, 7.7915650336677205, 0.40349016307086255], "isController": false}, {"data": ["6.1 - Modulo Cancelacion de poliza-171", 20, 2, 10.0, 36877.65, 18571, 58615, 51276.4, 58253.2, 58615.0, 0.12300955169168885, 15.329338614159015, 0.1388962833432766], "isController": false}, {"data": ["1.3 - Index-95", 20, 0, 0.0, 1013.9000000000001, 89, 7213, 4673.600000000006, 7101.249999999998, 7213.0, 0.5485463521667581, 0.2544526535929786, 0.3664118211738892], "isController": false}, {"data": ["6.3 - Modulo Cancelacion de poliza-192", 20, 0, 0.0, 10533.050000000001, 5225, 27101, 15525.700000000003, 26528.799999999992, 27101.0, 0.13450080027976166, 0.39514864019690915, 0.12829458659497772], "isController": false}, {"data": ["6 - Modulo Cancelacion de poliza", 20, 2, 10.0, 72875.0, 57919, 92729, 86878.6, 92444.34999999999, 92729.0, 0.11066843736166446, 14.600030866118859, 0.6217264189768703], "isController": true}, {"data": ["12 - Cometer", 20, 0, 0.0, 37930.99999999999, 11032, 51026, 50687.700000000004, 51016.3, 51026.0, 0.08149095857814576, 10.832472160651276, 0.26933796363262247], "isController": true}, {"data": ["15.3 - Logout-261-1", 20, 0, 0.0, 10451.750000000004, 4156, 20292, 16854.8, 20120.949999999997, 20292.0, 0.032447463500659496, 0.5296969199042476, 0.021776874307449453], "isController": false}, {"data": ["10.1 - Razon de apendice - Crear-243", 20, 0, 0.0, 17697.500000000004, 8105, 23770, 23081.500000000004, 23744.05, 23770.0, 0.10249262053132174, 0.8227184742307929, 0.21996878138836504], "isController": false}, {"data": ["15.3 - Logout-261-0", 20, 0, 0.0, 10839.249999999998, 5559, 25740, 24408.300000000017, 25709.5, 25740.0, 0.03227935848002957, 0.02719630520375538, 0.02386749636050233], "isController": false}, {"data": ["2.1 - Login-99-1", 20, 0, 0.0, 1865.5, 90, 11680, 4250.7, 11308.949999999993, 11680.0, 0.30090572623597023, 2.4830599479433095, 0.24419204931844854], "isController": false}, {"data": ["3.1 - Menu INSIS - Operaciones del Sistema-164", 20, 0, 0.0, 9056.25, 3835, 19443, 14979.7, 19222.199999999997, 19443.0, 0.17317216776919614, 2.3868248855981364, 0.21118041455252312], "isController": false}, {"data": ["10 - Razon de apendice - Crear", 20, 0, 0.0, 29883.45, 12574, 41073, 39168.200000000004, 40980.9, 41073.0, 0.09661229004941718, 1.4292344789336902, 0.29761585776014066], "isController": true}, {"data": ["2.1 - Login-99-0", 20, 0, 0.0, 2825.25, 499, 22031, 5227.100000000004, 21201.44999999999, 22031.0, 0.36176177986795693, 0.25401046848150494, 0.40901337953332734], "isController": false}, {"data": ["14.1 - Numero de apendice - Hacer cambios-255", 20, 0, 0.0, 308323.4000000001, 8962, 369438, 367572.3, 369359.35, 369438.0, 0.034101120051288084, 1.1884756516937174, 0.07548536017602998], "isController": false}, {"data": ["4 - Submenu INSIS - Control de polizas", 20, 0, 0.0, 10788.95, 3645, 16667, 15660.9, 16617.7, 16667.0, 0.16796842193667588, 3.2166198848366507, 0.20827920288485766], "isController": true}, {"data": ["15.1 - Logout-258-2", 20, 0, 0.0, 11386.100000000002, 3772, 23030, 21427.600000000006, 22963.399999999998, 23030.0, 0.03248034533103156, 0.27624153074995494, 0.020585687617030744], "isController": false}, {"data": ["15.1 - Logout-258-1", 20, 0, 0.0, 13785.699999999999, 5159, 23433, 20452.7, 23284.85, 23433.0, 0.03265204834462278, 0.025158658343659542, 0.027008090769429192], "isController": false}, {"data": ["15.1 - Logout-258-0", 20, 0, 0.0, 13062.35, 5498, 28517, 17710.000000000004, 27982.09999999999, 28517.0, 0.032644480389644515, 0.02690619282115232, 0.05717725371371771], "isController": false}, {"data": ["1.2 - Index-69", 20, 0, 0.0, 1677.75, 244, 9027, 7652.100000000011, 8983.849999999999, 9027.0, 0.6781270131895704, 11.641070020852407, 0.9669601155358899], "isController": false}, {"data": ["6.4 - Modulo Cancelacion de poliza-202", 20, 0, 0.0, 13802.800000000001, 4188, 24590, 24389.9, 24580.45, 24590.0, 0.13848593329132594, 0.2575987123404815, 0.40433429595482584], "isController": false}, {"data": ["13.1 - Calculo de Prima-254", 20, 0, 0.0, 40007.299999999996, 3308, 62800, 54447.4, 62388.2, 62800.0, 0.07283453813798503, 0.1394916547551849, 0.17296068983411933], "isController": false}, {"data": ["2 - Login", 20, 0, 0.0, 41595.950000000004, 27933, 101975, 59015.30000000002, 99877.19999999997, 101975.0, 0.14789508322795808, 9.634772514253388, 0.4991531273339693], "isController": true}, {"data": ["6.2 - Modulo Cancelacion de poliza-187", 20, 0, 0.0, 11661.5, 2697, 29710, 26543.700000000026, 29611.199999999997, 29710.0, 0.13506121649637698, 0.3388401027140552, 0.0830943031178882], "isController": false}, {"data": ["15.1 - Logout-258", 20, 0, 0.0, 38234.95, 20146, 52730, 50056.000000000015, 52626.65, 52730.0, 0.03175732323873886, 0.3207365595068723, 0.10201885025389981], "isController": false}, {"data": ["11 - Razon de apendice - Rellenar datos", 20, 0, 0.0, 16169.2, 2610, 22225, 19627.6, 22095.55, 22225.0, 0.09742125926719729, 0.23118997176001246, 0.2479009524145859], "isController": true}, {"data": ["2.2 - Login-101", 20, 0, 0.0, 36905.049999999996, 27344, 68264, 49603.000000000015, 67370.9, 68264.0, 0.14854426619132502, 8.34698373904486, 0.21285058767825313], "isController": false}, {"data": ["4.1 - Submenu INSIS - Control de polizas-165", 20, 0, 0.0, 10788.95, 3645, 16667, 15660.9, 16617.7, 16667.0, 0.1679670112789848, 3.216592870535227, 0.20827745368309664], "isController": false}, {"data": ["5.1 - Submenu INSIS - Endosos-166", 20, 0, 0.0, 9213.5, 3907, 16389, 14627.500000000004, 16310.699999999999, 16389.0, 0.17543705756967043, 3.8595724352198664, 0.21788288863694177], "isController": false}, {"data": ["8.2 - Seleccionar poliza - Siguiente-227", 20, 0, 0.0, 21372.75, 6250, 33111, 32273.600000000002, 33071.15, 33111.0, 0.12330228170872302, 2.3638877671806315, 0.14121362390029776], "isController": false}, {"data": ["1.2 - Index-69-0", 20, 0, 0.0, 603.0500000000001, 112, 4342, 2150.600000000004, 4241.199999999999, 4342.0, 0.7790892446729772, 0.6561772647150481, 0.5881210802072377], "isController": false}, {"data": ["7.2 - Buscar por numero de poliza-210", 20, 0, 0.0, 20179.75, 5745, 34877, 31320.500000000007, 34711.649999999994, 34877.0, 0.14728191230834942, 5.757306045830449, 0.3937705619357261], "isController": false}, {"data": ["12.1 - Cometer-252", 20, 0, 0.0, 24363.950000000004, 5948, 35230, 34756.70000000001, 35230.0, 35230.0, 0.08709739230407443, 8.569924100066194, 0.18811845953019668], "isController": false}, {"data": ["7 - Buscar por numero de poliza", 20, 0, 0.0, 42081.2, 26274, 60617, 54177.1, 60295.95, 60617.0, 0.11492535598129015, 5.716470258036155, 0.7536645476107018], "isController": true}, {"data": ["8 - Seleccionar poliza - Siguiente", 20, 0, 0.0, 67979.55, 10910, 104009, 97631.20000000003, 103741.7, 104009.0, 0.11663167716351762, 13.723778374300212, 0.46293891780382557], "isController": true}, {"data": ["3 - Menu INSIS - Operaciones del Sistema", 20, 0, 0.0, 9056.25, 3835, 19443, 14979.7, 19222.199999999997, 19443.0, 0.1731736672121637, 2.386845552359058, 0.2111822430968647], "isController": true}, {"data": ["13 - Calculo de Prima", 20, 0, 0.0, 40007.299999999996, 3308, 62800, 54447.4, 62388.2, 62800.0, 0.07283480338244827, 0.1394921627475473, 0.1729613197120112], "isController": true}, {"data": ["9.1 - Endoso general - Crear-237", 20, 0, 0.0, 22542.0, 4537, 36557, 33838.200000000004, 36429.95, 36557.0, 0.11685724135110342, 5.304668282461481, 0.18689740920192346], "isController": false}, {"data": ["11.1 - Razon de apendice - Rellenar datos-245", 20, 0, 0.0, 16169.2, 2610, 22225, 19627.6, 22095.55, 22225.0, 0.09742125926719729, 0.23118997176001246, 0.2479009524145859], "isController": false}, {"data": ["5 - Submenu INSIS - Endosos", 20, 1, 5.0, 24241.449999999997, 8712, 49795, 43035.90000000001, 49471.45, 49795.0, 0.16472022270174108, 3.9318266752046647, 0.45163743483256186], "isController": true}, {"data": ["7.3 - Buscar por numero de poliza-212", 20, 0, 0.0, 9066.05, 3775, 23505, 16045.000000000004, 23139.849999999995, 23505.0, 0.14411506146507372, 1.3866711807707275, 0.13746522098243238], "isController": false}, {"data": ["15.2 - Logout-259-0", 20, 0, 0.0, 10479.150000000001, 4449, 24664, 20224.4, 24442.649999999998, 24664.0, 0.032193469876570235, 0.016631196840532866, 0.02373639624688528], "isController": false}, {"data": ["15.3 - Logout-261", 20, 0, 0.0, 21291.25, 14455, 35978, 33430.80000000001, 35881.049999999996, 35978.0, 0.03197784574846547, 0.5489727966464834, 0.04510625038973], "isController": false}, {"data": ["15.2 - Logout-259-1", 20, 0, 0.0, 10024.6, 3865, 26161, 17233.800000000014, 25744.899999999994, 26161.0, 0.03195801994500025, 0.2637160825539571, 0.02140937664284196], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: gen.pa.sura.uat.ctplc.ltd:9074 failed to respond", 3, 100.0, 0.3409090909090909], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 880, 3, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: gen.pa.sura.uat.ctplc.ltd:9074 failed to respond", 3, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["5.2 - Submenu INSIS - Endosos-167", 20, 1, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: gen.pa.sura.uat.ctplc.ltd:9074 failed to respond", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["6.1 - Modulo Cancelacion de poliza-171", 20, 2, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: gen.pa.sura.uat.ctplc.ltd:9074 failed to respond", 2, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
