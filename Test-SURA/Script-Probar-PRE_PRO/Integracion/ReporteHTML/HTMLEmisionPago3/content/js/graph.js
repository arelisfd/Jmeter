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
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 4.0, "series": [{"data": [[1200.0, 2.0], [1300.0, 1.0]], "isOverall": false, "label": "Cerrar Detalle Objeto - -115", "isController": false}, {"data": [[13500.0, 2.0], [14300.0, 4.0]], "isOverall": false, "label": "Ingregar Poliza - -226", "isController": false}, {"data": [[16400.0, 1.0], [15100.0, 1.0], [15000.0, 1.0], [15400.0, 1.0], [16000.0, 1.0], [16200.0, 1.0]], "isOverall": false, "label": "Clausulas - -152", "isController": false}, {"data": [[1100.0, 1.0], [4700.0, 1.0], [1300.0, 1.0], [5700.0, 1.0], [6100.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Cerrar Detalle Objeto - -112", "isController": false}, {"data": [[2400.0, 1.0], [3400.0, 2.0]], "isOverall": false, "label": "Cerrar Detalle Objeto - -113", "isController": false}, {"data": [[600.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Siguiente - -120", "isController": false}, {"data": [[600.0, 1.0], [800.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Ri Policy - -191", "isController": false}, {"data": [[2900.0, 1.0], [3000.0, 1.0], [3100.0, 1.0]], "isOverall": false, "label": "Usage Description - -230", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "Aplicar Pago - -240", "isController": false}, {"data": [[39500.0, 1.0], [40800.0, 1.0], [41200.0, 1.0], [42100.0, 1.0], [42500.0, 1.0], [43900.0, 1.0]], "isOverall": false, "label": "Siguiente - -68", "isController": false}, {"data": [[1100.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Clausulas - -156", "isController": false}, {"data": [[1400.0, 1.0], [11300.0, 1.0], [11400.0, 1.0], [12700.0, 1.0], [800.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Login - -22", "isController": false}, {"data": [[2500.0, 2.0], [2600.0, 2.0], [2700.0, 2.0]], "isOverall": false, "label": "Facturacion y Cobranza - -214", "isController": false}, {"data": [[10400.0, 1.0], [11000.0, 1.0], [11300.0, 1.0]], "isOverall": false, "label": "Login - -24", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "Actualizar Poliza - -52", "isController": false}, {"data": [[510800.0, 1.0], [515300.0, 1.0], [516900.0, 1.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "Index - -7-1", "isController": false}, {"data": [[16400.0, 1.0], [16900.0, 1.0], [16800.0, 1.0], [17100.0, 1.0], [17400.0, 1.0], [17500.0, 1.0]], "isOverall": false, "label": "Documentos Poliza - -134", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "Index - -7-0", "isController": false}, {"data": [[700.0, 2.0], [3400.0, 1.0], [3700.0, 1.0], [3800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Usage Description - -229", "isController": false}, {"data": [[2800.0, 2.0], [3000.0, 2.0], [3400.0, 2.0]], "isOverall": false, "label": "Usage Description - -228", "isController": false}, {"data": [[3500.0, 2.0], [3600.0, 2.0], [3900.0, 2.0]], "isOverall": false, "label": "Usage Description - -227", "isController": false}, {"data": [[600.0, 2.0], [700.0, 1.0]], "isOverall": false, "label": "Siguiente - -93", "isController": false}, {"data": [[600.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Aplicar Pago - -238", "isController": false}, {"data": [[16700.0, 1.0], [17000.0, 1.0], [16400.0, 1.0], [14800.0, 1.0], [14600.0, 1.0], [15200.0, 1.0]], "isOverall": false, "label": "Deducible - -126", "isController": false}, {"data": [[600.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Aplicar Pago - -239", "isController": false}, {"data": [[1800.0, 3.0]], "isOverall": false, "label": "Deducible - -129", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Facultatives - -183", "isController": false}, {"data": [[900.0, 3.0]], "isOverall": false, "label": "Informacion Cliente - -161", "isController": false}, {"data": [[5900.0, 2.0], [6700.0, 2.0], [6800.0, 2.0]], "isOverall": false, "label": "Clic Calculo de Prima - -199", "isController": false}, {"data": [[85500.0, 1.0], [86800.0, 1.0], [86400.0, 1.0], [87600.0, 1.0], [88800.0, 1.0], [90100.0, 1.0]], "isOverall": false, "label": "Aplicar Pago - -237", "isController": false}, {"data": [[1200.0, 1.0], [1400.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Buscar Cliente - -60", "isController": false}, {"data": [[2600.0, 1.0], [2800.0, 1.0], [2700.0, 1.0], [3500.0, 1.0], [3700.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "Ok Pago - -232", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [2500.0, 1.0]], "isOverall": false, "label": "Buscar Cliente - -61", "isController": false}, {"data": [[600.0, 3.0]], "isOverall": false, "label": "Ok Pago - -233", "isController": false}, {"data": [[13700.0, 1.0], [14500.0, 1.0], [14600.0, 1.0], [15000.0, 1.0], [15400.0, 1.0], [15900.0, 1.0]], "isOverall": false, "label": "Informacion Cliente - -157", "isController": false}, {"data": [[11900.0, 1.0], [12400.0, 1.0], [12600.0, 1.0], [12900.0, 1.0], [13200.0, 1.0], [13600.0, 1.0]], "isOverall": false, "label": "Comisiones - -142", "isController": false}, {"data": [[12800.0, 2.0], [13100.0, 2.0], [14500.0, 2.0]], "isOverall": false, "label": "Clic Emitir Poliza - -204", "isController": false}, {"data": [[2200.0, 1.0], [2500.0, 2.0]], "isOverall": false, "label": "Buscar Cliente - -64", "isController": false}, {"data": [[600.0, 1.0], [700.0, 2.0]], "isOverall": false, "label": "Comisiones - -145", "isController": false}, {"data": [[800.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Buscar Cliente - -65", "isController": false}, {"data": [[1100.0, 1.0], [700.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Buscar Cliente - -62", "isController": false}, {"data": [[200.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "Ok Pago - -234", "isController": false}, {"data": [[2300.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "Buscar Cliente - -63", "isController": false}, {"data": [[700.0, 2.0], [800.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "Operaciones - -39", "isController": false}, {"data": [[600.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Documentos Poliza - -141", "isController": false}, {"data": [[6700.0, 2.0], [6800.0, 1.0]], "isOverall": false, "label": "Buscar Cliente - -66", "isController": false}, {"data": [[1300.0, 1.0], [700.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Buscar Cliente - -67", "isController": false}, {"data": [[13000.0, 1.0], [13200.0, 1.0], [13600.0, 1.0], [13800.0, 1.0], [14300.0, 1.0], [14400.0, 1.0]], "isOverall": false, "label": "Impuestos - -147", "isController": false}, {"data": [[700.0, 1.0], [200.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Login - -22-0", "isController": false}, {"data": [[100.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Login - -22-1", "isController": false}, {"data": [[300.0, 2.0], [200.0, 2.0], [400.0, 2.0]], "isOverall": false, "label": "Control Polizas - -40", "isController": false}, {"data": [[600.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "Editar Detalle Objeto - -101", "isController": false}, {"data": [[700.0, 1.0], [800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Grabar Detalle Objeto - -111", "isController": false}, {"data": [[14100.0, 2.0], [14400.0, 1.0], [14700.0, 1.0], [14600.0, 1.0], [15300.0, 1.0]], "isOverall": false, "label": "Descuentos - -121", "isController": false}, {"data": [[0.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "Login - -24-0", "isController": false}, {"data": [[600.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Grabar Pago - -236", "isController": false}, {"data": [[10300.0, 1.0], [10900.0, 1.0], [11200.0, 1.0]], "isOverall": false, "label": "Login - -24-1", "isController": false}, {"data": [[1200.0, 1.0], [1300.0, 1.0], [1400.0, 1.0]], "isOverall": false, "label": "Editar Detalle Objeto - -102", "isController": false}, {"data": [[2200.0, 1.0], [2500.0, 2.0], [1600.0, 1.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Grabar Pago - -235", "isController": false}, {"data": [[700.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "Editar Detalle Objeto - -104", "isController": false}, {"data": [[600.0, 1.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Descuentos - -125", "isController": false}, {"data": [[18100.0, 1.0], [18800.0, 1.0], [20000.0, 1.0], [20500.0, 1.0], [21300.0, 1.0], [20600.0, 1.0]], "isOverall": false, "label": "Siguiente - -89", "isController": false}, {"data": [[300.0, 1.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "Fin Pago - -242", "isController": false}, {"data": [[43000.0, 1.0], [45100.0, 1.0], [45400.0, 1.0], [46700.0, 1.0], [47200.0, 1.0], [48900.0, 1.0]], "isOverall": false, "label": "Facultatives - -179", "isController": false}, {"data": [[25400.0, 1.0], [26200.0, 1.0], [25800.0, 1.0], [1700.0, 1.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Buscar Cliente - -53", "isController": false}, {"data": [[2500.0, 1.0], [2800.0, 1.0], [2900.0, 1.0]], "isOverall": false, "label": "Buscar Cliente - -54", "isController": false}, {"data": [[8500.0, 1.0], [9100.0, 1.0], [6700.0, 1.0], [7200.0, 1.0], [7900.0, 1.0], [7800.0, 1.0]], "isOverall": false, "label": "Pagos - -215", "isController": false}, {"data": [[1100.0, 1.0], [700.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Impuestos - -151", "isController": false}, {"data": [[1100.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Pagos - -216", "isController": false}, {"data": [[5100.0, 1.0], [5000.0, 1.0], [5500.0, 1.0], [5400.0, 1.0], [6400.0, 1.0], [6900.0, 1.0]], "isOverall": false, "label": "Actividades_Nuevo - -224", "isController": false}, {"data": [[8700.0, 1.0], [9000.0, 1.0], [9400.0, 1.0], [5700.0, 1.0], [5800.0, 1.0], [6500.0, 1.0]], "isOverall": false, "label": "Editar Detalle Objeto - -99", "isController": false}, {"data": [[400.0, 3.0]], "isOverall": false, "label": "Actividades_Nuevo - -225", "isController": false}, {"data": [[1100.0, 1.0], [1300.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Buscar Cliente - -55", "isController": false}, {"data": [[4200.0, 2.0], [4300.0, 4.0]], "isOverall": false, "label": "Clic Confirmar Pre-Emision - -203", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Buscar Cliente - -59", "isController": false}, {"data": [[2800.0, 2.0], [2900.0, 2.0], [3100.0, 2.0]], "isOverall": false, "label": "Clic Validacion - -202", "isController": false}, {"data": [[300.0, 1.0], [200.0, 1.0], [400.0, 2.0], [100.0, 2.0]], "isOverall": false, "label": "Fin Pago - -241", "isController": false}, {"data": [[13300.0, 1.0], [13900.0, 2.0], [14000.0, 1.0], [14600.0, 1.0], [14700.0, 1.0]], "isOverall": false, "label": "Plan Cuotas - -170", "isController": false}, {"data": [[2400.0, 3.0], [1400.0, 1.0], [1600.0, 2.0]], "isOverall": false, "label": "Grabar Detalle Objeto - -106", "isController": false}, {"data": [[600.0, 1.0], [700.0, 2.0]], "isOverall": false, "label": "Plan Cuotas - -174", "isController": false}, {"data": [[1700.0, 2.0], [1800.0, 1.0]], "isOverall": false, "label": "Siguiente - -70", "isController": false}, {"data": [[1300.0, 1.0], [700.0, 1.0], [400.0, 2.0], [800.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Index - -2", "isController": false}, {"data": [[11500.0, 1.0], [11700.0, 1.0], [12500.0, 1.0], [12400.0, 1.0], [13200.0, 1.0], [14000.0, 1.0]], "isOverall": false, "label": "Ri Policy - -187", "isController": false}, {"data": [[300.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "Index - -7", "isController": false}, {"data": [[400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Emitir Poliza - -195", "isController": false}, {"data": [[10500.0, 2.0], [11000.0, 2.0], [11600.0, 1.0], [12200.0, 1.0]], "isOverall": false, "label": "Siguiente - -116", "isController": false}, {"data": [[9100.0, 1.0], [9500.0, 1.0], [9700.0, 1.0], [9800.0, 1.0], [10000.0, 1.0], [10300.0, 1.0]], "isOverall": false, "label": "Emitir Poliza - -192", "isController": false}, {"data": [[3200.0, 2.0], [3600.0, 2.0], [3700.0, 2.0]], "isOverall": false, "label": "Cantidad a Pagar - -231", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[8700.0, 1.0], [8400.0, 1.0], [8800.0, 1.0], [9300.0, 1.0], [9800.0, 2.0]], "isOverall": false, "label": "Actualizar Poliza - -41", "isController": false}, {"data": [[800.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Actualizar Poliza - -42", "isController": false}, {"data": [[700.0, 1.0], [800.0, 2.0]], "isOverall": false, "label": "Calculo Prima - -168", "isController": false}, {"data": [[12200.0, 1.0], [12500.0, 2.0], [13100.0, 1.0], [13200.0, 1.0], [13400.0, 1.0]], "isOverall": false, "label": "Calculo Prima - -165", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 516900.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 45.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 137.0, "series": [{"data": [[0.0, 45.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 97.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 137.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 2.0000000000000013, "minX": 1.59499386E12, "maxY": 3.0, "series": [{"data": [[1.59499398E12, 3.0], [1.59499428E12, 3.0], [1.5949941E12, 3.0], [1.59499392E12, 3.0], [1.59499422E12, 3.0], [1.59499404E12, 3.0], [1.59499434E12, 2.0000000000000013], [1.59499386E12, 2.8888888888888884], [1.59499416E12, 3.0]], "isOverall": false, "label": "3- Thread Group_Emision y Pago de Poliza", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59499434E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 516904.0, "series": [{"data": [[9.0, 1259.0]], "isOverall": false, "label": "Cerrar Detalle Objeto - -115", "isController": false}, {"data": [[9.0, 1259.0]], "isOverall": false, "label": "Cerrar Detalle Objeto - -115-Aggregated", "isController": false}, {"data": [[3.0, 14060.333333333332]], "isOverall": false, "label": "Ingregar Poliza - -226", "isController": false}, {"data": [[3.0, 14060.333333333332]], "isOverall": false, "label": "Ingregar Poliza - -226-Aggregated", "isController": false}, {"data": [[9.0, 15729.333333333334]], "isOverall": false, "label": "Clausulas - -152", "isController": false}, {"data": [[9.0, 15729.333333333334]], "isOverall": false, "label": "Clausulas - -152-Aggregated", "isController": false}, {"data": [[9.0, 3388.5]], "isOverall": false, "label": "Cerrar Detalle Objeto - -112", "isController": false}, {"data": [[9.0, 3388.5]], "isOverall": false, "label": "Cerrar Detalle Objeto - -112-Aggregated", "isController": false}, {"data": [[9.0, 3119.3333333333335]], "isOverall": false, "label": "Cerrar Detalle Objeto - -113", "isController": false}, {"data": [[9.0, 3119.3333333333335]], "isOverall": false, "label": "Cerrar Detalle Objeto - -113-Aggregated", "isController": false}, {"data": [[9.0, 557.6666666666666]], "isOverall": false, "label": "Siguiente - -120", "isController": false}, {"data": [[9.0, 557.6666666666666]], "isOverall": false, "label": "Siguiente - -120-Aggregated", "isController": false}, {"data": [[6.0, 850.6666666666666]], "isOverall": false, "label": "Ri Policy - -191", "isController": false}, {"data": [[6.0, 850.6666666666666]], "isOverall": false, "label": "Ri Policy - -191-Aggregated", "isController": false}, {"data": [[3.0, 3028.0]], "isOverall": false, "label": "Usage Description - -230", "isController": false}, {"data": [[3.0, 3028.0]], "isOverall": false, "label": "Usage Description - -230-Aggregated", "isController": false}, {"data": [[2.0, 140.0], [1.0, 119.0], [3.0, 134.0]], "isOverall": false, "label": "Aplicar Pago - -240", "isController": false}, {"data": [[2.0, 131.0]], "isOverall": false, "label": "Aplicar Pago - -240-Aggregated", "isController": false}, {"data": [[11.0, 41719.66666666667]], "isOverall": false, "label": "Siguiente - -68", "isController": false}, {"data": [[11.0, 41719.66666666667]], "isOverall": false, "label": "Siguiente - -68-Aggregated", "isController": false}, {"data": [[9.0, 1056.0]], "isOverall": false, "label": "Clausulas - -156", "isController": false}, {"data": [[9.0, 1056.0]], "isOverall": false, "label": "Clausulas - -156-Aggregated", "isController": false}, {"data": [[11.0, 6383.333333333334]], "isOverall": false, "label": "Login - -22", "isController": false}, {"data": [[11.0, 6383.333333333334]], "isOverall": false, "label": "Login - -22-Aggregated", "isController": false}, {"data": [[6.0, 2674.6666666666665]], "isOverall": false, "label": "Facturacion y Cobranza - -214", "isController": false}, {"data": [[6.0, 2674.6666666666665]], "isOverall": false, "label": "Facturacion y Cobranza - -214-Aggregated", "isController": false}, {"data": [[11.0, 10938.666666666666]], "isOverall": false, "label": "Login - -24", "isController": false}, {"data": [[11.0, 10938.666666666666]], "isOverall": false, "label": "Login - -24-Aggregated", "isController": false}, {"data": [[11.0, 98.0]], "isOverall": false, "label": "Actualizar Poliza - -52", "isController": false}, {"data": [[11.0, 98.0]], "isOverall": false, "label": "Actualizar Poliza - -52-Aggregated", "isController": false}, {"data": [[2.0, 515362.0], [1.0, 516904.0], [3.0, 510854.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[2.0, 514373.3333333333]], "isOverall": false, "label": "Transaction Controller-Aggregated", "isController": true}, {"data": [[10.0, 211.5], [11.0, 151.0]], "isOverall": false, "label": "Index - -7-1", "isController": false}, {"data": [[10.333333333333334, 191.33333333333334]], "isOverall": false, "label": "Index - -7-1-Aggregated", "isController": false}, {"data": [[9.0, 17075.166666666668]], "isOverall": false, "label": "Documentos Poliza - -134", "isController": false}, {"data": [[9.0, 17075.166666666668]], "isOverall": false, "label": "Documentos Poliza - -134-Aggregated", "isController": false}, {"data": [[10.0, 193.0], [11.0, 160.0]], "isOverall": false, "label": "Index - -7-0", "isController": false}, {"data": [[10.333333333333334, 182.0]], "isOverall": false, "label": "Index - -7-0-Aggregated", "isController": false}, {"data": [[3.0, 2174.3333333333335]], "isOverall": false, "label": "Usage Description - -229", "isController": false}, {"data": [[3.0, 2174.3333333333335]], "isOverall": false, "label": "Usage Description - -229-Aggregated", "isController": false}, {"data": [[3.0, 3132.0]], "isOverall": false, "label": "Usage Description - -228", "isController": false}, {"data": [[3.0, 3132.0]], "isOverall": false, "label": "Usage Description - -228-Aggregated", "isController": false}, {"data": [[3.0, 3713.3333333333335]], "isOverall": false, "label": "Usage Description - -227", "isController": false}, {"data": [[3.0, 3713.3333333333335]], "isOverall": false, "label": "Usage Description - -227-Aggregated", "isController": false}, {"data": [[9.0, 699.6666666666666]], "isOverall": false, "label": "Siguiente - -93", "isController": false}, {"data": [[9.0, 699.6666666666666]], "isOverall": false, "label": "Siguiente - -93-Aggregated", "isController": false}, {"data": [[2.0, 572.0], [1.0, 563.0], [3.0, 686.0]], "isOverall": false, "label": "Aplicar Pago - -238", "isController": false}, {"data": [[2.0, 607.0]], "isOverall": false, "label": "Aplicar Pago - -238-Aggregated", "isController": false}, {"data": [[9.0, 15826.666666666668]], "isOverall": false, "label": "Deducible - -126", "isController": false}, {"data": [[9.0, 15826.666666666668]], "isOverall": false, "label": "Deducible - -126-Aggregated", "isController": false}, {"data": [[2.0, 504.0], [1.0, 609.0], [3.0, 535.0]], "isOverall": false, "label": "Aplicar Pago - -239", "isController": false}, {"data": [[2.0, 549.3333333333334]], "isOverall": false, "label": "Aplicar Pago - -239-Aggregated", "isController": false}, {"data": [[9.0, 1853.3333333333333]], "isOverall": false, "label": "Deducible - -129", "isController": false}, {"data": [[9.0, 1853.3333333333333]], "isOverall": false, "label": "Deducible - -129-Aggregated", "isController": false}, {"data": [[9.0, 2196.3333333333335]], "isOverall": false, "label": "Facultatives - -183", "isController": false}, {"data": [[9.0, 2196.3333333333335]], "isOverall": false, "label": "Facultatives - -183-Aggregated", "isController": false}, {"data": [[9.0, 950.0]], "isOverall": false, "label": "Informacion Cliente - -161", "isController": false}, {"data": [[9.0, 950.0]], "isOverall": false, "label": "Informacion Cliente - -161-Aggregated", "isController": false}, {"data": [[6.0, 6511.0]], "isOverall": false, "label": "Clic Calculo de Prima - -199", "isController": false}, {"data": [[6.0, 6511.0]], "isOverall": false, "label": "Clic Calculo de Prima - -199-Aggregated", "isController": false}, {"data": [[2.0, 87090.0], [1.0, 89518.5], [3.0, 86196.5]], "isOverall": false, "label": "Aplicar Pago - -237", "isController": false}, {"data": [[2.0, 87601.66666666666]], "isOverall": false, "label": "Aplicar Pago - -237-Aggregated", "isController": false}, {"data": [[11.0, 1235.0]], "isOverall": false, "label": "Buscar Cliente - -60", "isController": false}, {"data": [[11.0, 1235.0]], "isOverall": false, "label": "Buscar Cliente - -60-Aggregated", "isController": false}, {"data": [[3.0, 3253.0]], "isOverall": false, "label": "Ok Pago - -232", "isController": false}, {"data": [[3.0, 3253.0]], "isOverall": false, "label": "Ok Pago - -232-Aggregated", "isController": false}, {"data": [[11.0, 2300.3333333333335]], "isOverall": false, "label": "Buscar Cliente - -61", "isController": false}, {"data": [[11.0, 2300.3333333333335]], "isOverall": false, "label": "Buscar Cliente - -61-Aggregated", "isController": false}, {"data": [[3.0, 614.3333333333334]], "isOverall": false, "label": "Ok Pago - -233", "isController": false}, {"data": [[3.0, 614.3333333333334]], "isOverall": false, "label": "Ok Pago - -233-Aggregated", "isController": false}, {"data": [[9.0, 14919.333333333332]], "isOverall": false, "label": "Informacion Cliente - -157", "isController": false}, {"data": [[9.0, 14919.333333333332]], "isOverall": false, "label": "Informacion Cliente - -157-Aggregated", "isController": false}, {"data": [[9.0, 12821.0]], "isOverall": false, "label": "Comisiones - -142", "isController": false}, {"data": [[9.0, 12821.0]], "isOverall": false, "label": "Comisiones - -142-Aggregated", "isController": false}, {"data": [[6.0, 13511.666666666668]], "isOverall": false, "label": "Clic Emitir Poliza - -204", "isController": false}, {"data": [[6.0, 13511.666666666668]], "isOverall": false, "label": "Clic Emitir Poliza - -204-Aggregated", "isController": false}, {"data": [[11.0, 2459.6666666666665]], "isOverall": false, "label": "Buscar Cliente - -64", "isController": false}, {"data": [[11.0, 2459.6666666666665]], "isOverall": false, "label": "Buscar Cliente - -64-Aggregated", "isController": false}, {"data": [[9.0, 719.3333333333334]], "isOverall": false, "label": "Comisiones - -145", "isController": false}, {"data": [[9.0, 719.3333333333334]], "isOverall": false, "label": "Comisiones - -145-Aggregated", "isController": false}, {"data": [[11.0, 948.3333333333334]], "isOverall": false, "label": "Buscar Cliente - -65", "isController": false}, {"data": [[11.0, 948.3333333333334]], "isOverall": false, "label": "Buscar Cliente - -65-Aggregated", "isController": false}, {"data": [[11.0, 939.0]], "isOverall": false, "label": "Buscar Cliente - -62", "isController": false}, {"data": [[11.0, 939.0]], "isOverall": false, "label": "Buscar Cliente - -62-Aggregated", "isController": false}, {"data": [[3.0, 375.0]], "isOverall": false, "label": "Ok Pago - -234", "isController": false}, {"data": [[3.0, 375.0]], "isOverall": false, "label": "Ok Pago - -234-Aggregated", "isController": false}, {"data": [[11.0, 2145.6666666666665]], "isOverall": false, "label": "Buscar Cliente - -63", "isController": false}, {"data": [[11.0, 2145.6666666666665]], "isOverall": false, "label": "Buscar Cliente - -63-Aggregated", "isController": false}, {"data": [[11.0, 730.3333333333333]], "isOverall": false, "label": "Operaciones - -39", "isController": false}, {"data": [[11.0, 730.3333333333333]], "isOverall": false, "label": "Operaciones - -39-Aggregated", "isController": false}, {"data": [[9.0, 595.0]], "isOverall": false, "label": "Documentos Poliza - -141", "isController": false}, {"data": [[9.0, 595.0]], "isOverall": false, "label": "Documentos Poliza - -141-Aggregated", "isController": false}, {"data": [[11.0, 6791.666666666667]], "isOverall": false, "label": "Buscar Cliente - -66", "isController": false}, {"data": [[11.0, 6791.666666666667]], "isOverall": false, "label": "Buscar Cliente - -66-Aggregated", "isController": false}, {"data": [[11.0, 998.6666666666666]], "isOverall": false, "label": "Buscar Cliente - -67", "isController": false}, {"data": [[11.0, 998.6666666666666]], "isOverall": false, "label": "Buscar Cliente - -67-Aggregated", "isController": false}, {"data": [[9.0, 13761.0]], "isOverall": false, "label": "Impuestos - -147", "isController": false}, {"data": [[9.0, 13761.0]], "isOverall": false, "label": "Impuestos - -147-Aggregated", "isController": false}, {"data": [[11.0, 628.0]], "isOverall": false, "label": "Login - -22-0", "isController": false}, {"data": [[11.0, 628.0]], "isOverall": false, "label": "Login - -22-0-Aggregated", "isController": false}, {"data": [[11.0, 286.0]], "isOverall": false, "label": "Login - -22-1", "isController": false}, {"data": [[11.0, 286.0]], "isOverall": false, "label": "Login - -22-1-Aggregated", "isController": false}, {"data": [[11.0, 356.66666666666663]], "isOverall": false, "label": "Control Polizas - -40", "isController": false}, {"data": [[11.0, 356.66666666666663]], "isOverall": false, "label": "Control Polizas - -40-Aggregated", "isController": false}, {"data": [[9.0, 840.3333333333334]], "isOverall": false, "label": "Editar Detalle Objeto - -101", "isController": false}, {"data": [[9.0, 840.3333333333334]], "isOverall": false, "label": "Editar Detalle Objeto - -101-Aggregated", "isController": false}, {"data": [[9.0, 861.0]], "isOverall": false, "label": "Grabar Detalle Objeto - -111", "isController": false}, {"data": [[9.0, 861.0]], "isOverall": false, "label": "Grabar Detalle Objeto - -111-Aggregated", "isController": false}, {"data": [[9.0, 14594.333333333332]], "isOverall": false, "label": "Descuentos - -121", "isController": false}, {"data": [[9.0, 14594.333333333332]], "isOverall": false, "label": "Descuentos - -121-Aggregated", "isController": false}, {"data": [[11.0, 109.66666666666667]], "isOverall": false, "label": "Login - -24-0", "isController": false}, {"data": [[11.0, 109.66666666666667]], "isOverall": false, "label": "Login - -24-0-Aggregated", "isController": false}, {"data": [[3.0, 561.6666666666666]], "isOverall": false, "label": "Grabar Pago - -236", "isController": false}, {"data": [[3.0, 561.6666666666666]], "isOverall": false, "label": "Grabar Pago - -236-Aggregated", "isController": false}, {"data": [[11.0, 10828.666666666666]], "isOverall": false, "label": "Login - -24-1", "isController": false}, {"data": [[11.0, 10828.666666666666]], "isOverall": false, "label": "Login - -24-1-Aggregated", "isController": false}, {"data": [[9.0, 1339.6666666666667]], "isOverall": false, "label": "Editar Detalle Objeto - -102", "isController": false}, {"data": [[9.0, 1339.6666666666667]], "isOverall": false, "label": "Editar Detalle Objeto - -102-Aggregated", "isController": false}, {"data": [[3.0, 2162.5]], "isOverall": false, "label": "Grabar Pago - -235", "isController": false}, {"data": [[3.0, 2162.5]], "isOverall": false, "label": "Grabar Pago - -235-Aggregated", "isController": false}, {"data": [[9.0, 826.0]], "isOverall": false, "label": "Editar Detalle Objeto - -104", "isController": false}, {"data": [[9.0, 826.0]], "isOverall": false, "label": "Editar Detalle Objeto - -104-Aggregated", "isController": false}, {"data": [[9.0, 644.0]], "isOverall": false, "label": "Descuentos - -125", "isController": false}, {"data": [[9.0, 644.0]], "isOverall": false, "label": "Descuentos - -125-Aggregated", "isController": false}, {"data": [[9.0, 19928.5]], "isOverall": false, "label": "Siguiente - -89", "isController": false}, {"data": [[9.0, 19928.5]], "isOverall": false, "label": "Siguiente - -89-Aggregated", "isController": false}, {"data": [[2.0, 176.0], [1.0, 313.0], [3.0, 207.0]], "isOverall": false, "label": "Fin Pago - -242", "isController": false}, {"data": [[2.0, 232.0]], "isOverall": false, "label": "Fin Pago - -242-Aggregated", "isController": false}, {"data": [[9.0, 46103.83333333333]], "isOverall": false, "label": "Facultatives - -179", "isController": false}, {"data": [[9.0, 46103.83333333333]], "isOverall": false, "label": "Facultatives - -179-Aggregated", "isController": false}, {"data": [[11.0, 13892.5]], "isOverall": false, "label": "Buscar Cliente - -53", "isController": false}, {"data": [[11.0, 13892.5]], "isOverall": false, "label": "Buscar Cliente - -53-Aggregated", "isController": false}, {"data": [[11.0, 2808.0]], "isOverall": false, "label": "Buscar Cliente - -54", "isController": false}, {"data": [[11.0, 2808.0]], "isOverall": false, "label": "Buscar Cliente - -54-Aggregated", "isController": false}, {"data": [[6.0, 7920.666666666666]], "isOverall": false, "label": "Pagos - -215", "isController": false}, {"data": [[6.0, 7920.666666666666]], "isOverall": false, "label": "Pagos - -215-Aggregated", "isController": false}, {"data": [[9.0, 916.6666666666666]], "isOverall": false, "label": "Impuestos - -151", "isController": false}, {"data": [[9.0, 916.6666666666666]], "isOverall": false, "label": "Impuestos - -151-Aggregated", "isController": false}, {"data": [[6.0, 760.0]], "isOverall": false, "label": "Pagos - -216", "isController": false}, {"data": [[6.0, 760.0]], "isOverall": false, "label": "Pagos - -216-Aggregated", "isController": false}, {"data": [[4.0, 5526.0], [3.0, 5985.0]], "isOverall": false, "label": "Actividades_Nuevo - -224", "isController": false}, {"data": [[3.5, 5755.5]], "isOverall": false, "label": "Actividades_Nuevo - -224-Aggregated", "isController": false}, {"data": [[9.0, 7563.0]], "isOverall": false, "label": "Editar Detalle Objeto - -99", "isController": false}, {"data": [[9.0, 7563.0]], "isOverall": false, "label": "Editar Detalle Objeto - -99-Aggregated", "isController": false}, {"data": [[3.0, 459.0]], "isOverall": false, "label": "Actividades_Nuevo - -225", "isController": false}, {"data": [[3.0, 459.0]], "isOverall": false, "label": "Actividades_Nuevo - -225-Aggregated", "isController": false}, {"data": [[11.0, 1114.6666666666667]], "isOverall": false, "label": "Buscar Cliente - -55", "isController": false}, {"data": [[11.0, 1114.6666666666667]], "isOverall": false, "label": "Buscar Cliente - -55-Aggregated", "isController": false}, {"data": [[6.0, 4310.333333333334]], "isOverall": false, "label": "Clic Confirmar Pre-Emision - -203", "isController": false}, {"data": [[6.0, 4310.333333333334]], "isOverall": false, "label": "Clic Confirmar Pre-Emision - -203-Aggregated", "isController": false}, {"data": [[11.0, 2142.0]], "isOverall": false, "label": "Buscar Cliente - -59", "isController": false}, {"data": [[11.0, 2142.0]], "isOverall": false, "label": "Buscar Cliente - -59-Aggregated", "isController": false}, {"data": [[6.0, 2976.333333333333]], "isOverall": false, "label": "Clic Validacion - -202", "isController": false}, {"data": [[6.0, 2976.333333333333]], "isOverall": false, "label": "Clic Validacion - -202-Aggregated", "isController": false}, {"data": [[2.0, 283.0], [1.0, 321.5], [3.0, 313.5]], "isOverall": false, "label": "Fin Pago - -241", "isController": false}, {"data": [[2.0, 306.0]], "isOverall": false, "label": "Fin Pago - -241-Aggregated", "isController": false}, {"data": [[9.0, 14108.166666666668]], "isOverall": false, "label": "Plan Cuotas - -170", "isController": false}, {"data": [[9.0, 14108.166666666668]], "isOverall": false, "label": "Plan Cuotas - -170-Aggregated", "isController": false}, {"data": [[9.0, 2017.5]], "isOverall": false, "label": "Grabar Detalle Objeto - -106", "isController": false}, {"data": [[9.0, 2017.5]], "isOverall": false, "label": "Grabar Detalle Objeto - -106-Aggregated", "isController": false}, {"data": [[9.0, 721.0]], "isOverall": false, "label": "Plan Cuotas - -174", "isController": false}, {"data": [[9.0, 721.0]], "isOverall": false, "label": "Plan Cuotas - -174-Aggregated", "isController": false}, {"data": [[11.0, 1772.0]], "isOverall": false, "label": "Siguiente - -70", "isController": false}, {"data": [[11.0, 1772.0]], "isOverall": false, "label": "Siguiente - -70-Aggregated", "isController": false}, {"data": [[8.0, 906.0], [10.0, 1313.0], [11.0, 566.0]], "isOverall": false, "label": "Index - -2", "isController": false}, {"data": [[9.666666666666668, 928.3333333333334]], "isOverall": false, "label": "Index - -2-Aggregated", "isController": false}, {"data": [[6.0, 12594.666666666668]], "isOverall": false, "label": "Ri Policy - -187", "isController": false}, {"data": [[6.0, 12594.666666666668]], "isOverall": false, "label": "Ri Policy - -187-Aggregated", "isController": false}, {"data": [[10.0, 407.0], [11.0, 312.0]], "isOverall": false, "label": "Index - -7", "isController": false}, {"data": [[10.333333333333334, 375.3333333333333]], "isOverall": false, "label": "Index - -7-Aggregated", "isController": false}, {"data": [[6.0, 495.6666666666667]], "isOverall": false, "label": "Emitir Poliza - -195", "isController": false}, {"data": [[6.0, 495.6666666666667]], "isOverall": false, "label": "Emitir Poliza - -195-Aggregated", "isController": false}, {"data": [[9.0, 11175.833333333332]], "isOverall": false, "label": "Siguiente - -116", "isController": false}, {"data": [[9.0, 11175.833333333332]], "isOverall": false, "label": "Siguiente - -116-Aggregated", "isController": false}, {"data": [[6.0, 9790.166666666668]], "isOverall": false, "label": "Emitir Poliza - -192", "isController": false}, {"data": [[6.0, 9790.166666666668]], "isOverall": false, "label": "Emitir Poliza - -192-Aggregated", "isController": false}, {"data": [[3.0, 3543.0]], "isOverall": false, "label": "Cantidad a Pagar - -231", "isController": false}, {"data": [[3.0, 3543.0]], "isOverall": false, "label": "Cantidad a Pagar - -231-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [1.0, 0.0], [3.0, 1.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[2.0, 0.33333333333333337]], "isOverall": false, "label": "Debug Sampler-Aggregated", "isController": false}, {"data": [[11.0, 9171.333333333334]], "isOverall": false, "label": "Actualizar Poliza - -41", "isController": false}, {"data": [[11.0, 9171.333333333334]], "isOverall": false, "label": "Actualizar Poliza - -41-Aggregated", "isController": false}, {"data": [[11.0, 938.6666666666666]], "isOverall": false, "label": "Actualizar Poliza - -42", "isController": false}, {"data": [[11.0, 938.6666666666666]], "isOverall": false, "label": "Actualizar Poliza - -42-Aggregated", "isController": false}, {"data": [[9.0, 802.6666666666666]], "isOverall": false, "label": "Calculo Prima - -168", "isController": false}, {"data": [[9.0, 802.6666666666666]], "isOverall": false, "label": "Calculo Prima - -168-Aggregated", "isController": false}, {"data": [[9.0, 12874.333333333334]], "isOverall": false, "label": "Calculo Prima - -165", "isController": false}, {"data": [[9.0, 12874.333333333334]], "isOverall": false, "label": "Calculo Prima - -165-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 11.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 439.98333333333335, "minX": 1.59499386E12, "maxY": 50265.8, "series": [{"data": [[1.59499398E12, 50265.8], [1.59499428E12, 30298.416666666668], [1.5949941E12, 27208.766666666666], [1.59499392E12, 11205.666666666666], [1.59499422E12, 33292.5], [1.59499404E12, 45350.85], [1.59499434E12, 12571.266666666666], [1.59499386E12, 21062.516666666666], [1.59499416E12, 41346.71666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.59499398E12, 1340.9833333333333], [1.59499428E12, 5473.05], [1.5949941E12, 533.65], [1.59499392E12, 439.98333333333335], [1.59499422E12, 1724.3166666666666], [1.59499404E12, 769.25], [1.59499434E12, 2312.1], [1.59499386E12, 2207.5333333333333], [1.59499416E12, 461.28333333333336]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59499434E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 0.33333333333333337, "minX": 1.59499386E12, "maxY": 514373.3333333333, "series": [{"data": [[1.59499398E12, 1259.0]], "isOverall": false, "label": "Cerrar Detalle Objeto - -115", "isController": false}, {"data": [[1.59499422E12, 14060.333333333332]], "isOverall": false, "label": "Ingregar Poliza - -226", "isController": false}, {"data": [[1.5949941E12, 15729.333333333334]], "isOverall": false, "label": "Clausulas - -152", "isController": false}, {"data": [[1.59499398E12, 3388.5]], "isOverall": false, "label": "Cerrar Detalle Objeto - -112", "isController": false}, {"data": [[1.59499398E12, 3119.3333333333335]], "isOverall": false, "label": "Cerrar Detalle Objeto - -113", "isController": false}, {"data": [[1.59499398E12, 557.6666666666666]], "isOverall": false, "label": "Siguiente - -120", "isController": false}, {"data": [[1.59499416E12, 850.6666666666666]], "isOverall": false, "label": "Ri Policy - -191", "isController": false}, {"data": [[1.59499428E12, 3028.0]], "isOverall": false, "label": "Usage Description - -230", "isController": false}, {"data": [[1.59499434E12, 131.0]], "isOverall": false, "label": "Aplicar Pago - -240", "isController": false}, {"data": [[1.59499392E12, 41719.66666666667]], "isOverall": false, "label": "Siguiente - -68", "isController": false}, {"data": [[1.5949941E12, 1056.0]], "isOverall": false, "label": "Clausulas - -156", "isController": false}, {"data": [[1.59499386E12, 6383.333333333334]], "isOverall": false, "label": "Login - -22", "isController": false}, {"data": [[1.59499422E12, 2674.6666666666665]], "isOverall": false, "label": "Facturacion y Cobranza - -214", "isController": false}, {"data": [[1.59499386E12, 10938.666666666666]], "isOverall": false, "label": "Login - -24", "isController": false}, {"data": [[1.59499386E12, 98.0]], "isOverall": false, "label": "Actualizar Poliza - -52", "isController": false}, {"data": [[1.59499434E12, 514373.3333333333]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59499386E12, 191.33333333333334]], "isOverall": false, "label": "Index - -7-1", "isController": false}, {"data": [[1.59499404E12, 17075.166666666668]], "isOverall": false, "label": "Documentos Poliza - -134", "isController": false}, {"data": [[1.59499386E12, 182.0]], "isOverall": false, "label": "Index - -7-0", "isController": false}, {"data": [[1.59499428E12, 2174.3333333333335]], "isOverall": false, "label": "Usage Description - -229", "isController": false}, {"data": [[1.59499428E12, 3132.0]], "isOverall": false, "label": "Usage Description - -228", "isController": false}, {"data": [[1.59499428E12, 3713.3333333333335]], "isOverall": false, "label": "Usage Description - -227", "isController": false}, {"data": [[1.59499398E12, 699.6666666666666]], "isOverall": false, "label": "Siguiente - -93", "isController": false}, {"data": [[1.59499434E12, 607.0]], "isOverall": false, "label": "Aplicar Pago - -238", "isController": false}, {"data": [[1.59499404E12, 15826.666666666668]], "isOverall": false, "label": "Deducible - -126", "isController": false}, {"data": [[1.59499434E12, 549.3333333333334]], "isOverall": false, "label": "Aplicar Pago - -239", "isController": false}, {"data": [[1.59499404E12, 1853.3333333333333]], "isOverall": false, "label": "Deducible - -129", "isController": false}, {"data": [[1.59499416E12, 2196.3333333333335]], "isOverall": false, "label": "Facultatives - -183", "isController": false}, {"data": [[1.5949941E12, 950.0]], "isOverall": false, "label": "Informacion Cliente - -161", "isController": false}, {"data": [[1.59499422E12, 6511.0]], "isOverall": false, "label": "Clic Calculo de Prima - -199", "isController": false}, {"data": [[1.59499434E12, 87601.66666666666]], "isOverall": false, "label": "Aplicar Pago - -237", "isController": false}, {"data": [[1.59499386E12, 1235.0]], "isOverall": false, "label": "Buscar Cliente - -60", "isController": false}, {"data": [[1.59499428E12, 3253.0]], "isOverall": false, "label": "Ok Pago - -232", "isController": false}, {"data": [[1.59499386E12, 2300.3333333333335]], "isOverall": false, "label": "Buscar Cliente - -61", "isController": false}, {"data": [[1.59499428E12, 614.3333333333334]], "isOverall": false, "label": "Ok Pago - -233", "isController": false}, {"data": [[1.5949941E12, 14919.333333333332]], "isOverall": false, "label": "Informacion Cliente - -157", "isController": false}, {"data": [[1.59499404E12, 12821.0]], "isOverall": false, "label": "Comisiones - -142", "isController": false}, {"data": [[1.59499422E12, 13511.666666666668]], "isOverall": false, "label": "Clic Emitir Poliza - -204", "isController": false}, {"data": [[1.59499386E12, 2459.6666666666665]], "isOverall": false, "label": "Buscar Cliente - -64", "isController": false}, {"data": [[1.59499404E12, 719.3333333333334]], "isOverall": false, "label": "Comisiones - -145", "isController": false}, {"data": [[1.59499386E12, 948.3333333333334]], "isOverall": false, "label": "Buscar Cliente - -65", "isController": false}, {"data": [[1.59499386E12, 939.0]], "isOverall": false, "label": "Buscar Cliente - -62", "isController": false}, {"data": [[1.59499428E12, 375.0]], "isOverall": false, "label": "Ok Pago - -234", "isController": false}, {"data": [[1.59499386E12, 2145.6666666666665]], "isOverall": false, "label": "Buscar Cliente - -63", "isController": false}, {"data": [[1.59499386E12, 730.3333333333333]], "isOverall": false, "label": "Operaciones - -39", "isController": false}, {"data": [[1.59499404E12, 595.0]], "isOverall": false, "label": "Documentos Poliza - -141", "isController": false}, {"data": [[1.59499392E12, 6791.666666666667]], "isOverall": false, "label": "Buscar Cliente - -66", "isController": false}, {"data": [[1.59499392E12, 998.6666666666666]], "isOverall": false, "label": "Buscar Cliente - -67", "isController": false}, {"data": [[1.59499404E12, 13761.0]], "isOverall": false, "label": "Impuestos - -147", "isController": false}, {"data": [[1.59499386E12, 628.0]], "isOverall": false, "label": "Login - -22-0", "isController": false}, {"data": [[1.59499386E12, 286.0]], "isOverall": false, "label": "Login - -22-1", "isController": false}, {"data": [[1.59499386E12, 356.66666666666663]], "isOverall": false, "label": "Control Polizas - -40", "isController": false}, {"data": [[1.59499398E12, 840.3333333333334]], "isOverall": false, "label": "Editar Detalle Objeto - -101", "isController": false}, {"data": [[1.59499398E12, 861.0]], "isOverall": false, "label": "Grabar Detalle Objeto - -111", "isController": false}, {"data": [[1.59499398E12, 14594.333333333332]], "isOverall": false, "label": "Descuentos - -121", "isController": false}, {"data": [[1.59499386E12, 109.66666666666667]], "isOverall": false, "label": "Login - -24-0", "isController": false}, {"data": [[1.59499428E12, 561.6666666666666]], "isOverall": false, "label": "Grabar Pago - -236", "isController": false}, {"data": [[1.59499386E12, 10828.666666666666]], "isOverall": false, "label": "Login - -24-1", "isController": false}, {"data": [[1.59499398E12, 1339.6666666666667]], "isOverall": false, "label": "Editar Detalle Objeto - -102", "isController": false}, {"data": [[1.59499428E12, 2162.5]], "isOverall": false, "label": "Grabar Pago - -235", "isController": false}, {"data": [[1.59499398E12, 826.0]], "isOverall": false, "label": "Editar Detalle Objeto - -104", "isController": false}, {"data": [[1.59499398E12, 644.0]], "isOverall": false, "label": "Descuentos - -125", "isController": false}, {"data": [[1.59499398E12, 19928.5]], "isOverall": false, "label": "Siguiente - -89", "isController": false}, {"data": [[1.59499434E12, 232.0]], "isOverall": false, "label": "Fin Pago - -242", "isController": false}, {"data": [[1.59499416E12, 46103.83333333333]], "isOverall": false, "label": "Facultatives - -179", "isController": false}, {"data": [[1.59499392E12, 25834.0], [1.59499386E12, 1951.0]], "isOverall": false, "label": "Buscar Cliente - -53", "isController": false}, {"data": [[1.59499386E12, 2808.0]], "isOverall": false, "label": "Buscar Cliente - -54", "isController": false}, {"data": [[1.59499422E12, 7920.666666666666]], "isOverall": false, "label": "Pagos - -215", "isController": false}, {"data": [[1.59499404E12, 916.6666666666666]], "isOverall": false, "label": "Impuestos - -151", "isController": false}, {"data": [[1.59499422E12, 760.0]], "isOverall": false, "label": "Pagos - -216", "isController": false}, {"data": [[1.59499422E12, 5755.5]], "isOverall": false, "label": "Actividades_Nuevo - -224", "isController": false}, {"data": [[1.59499398E12, 7563.0]], "isOverall": false, "label": "Editar Detalle Objeto - -99", "isController": false}, {"data": [[1.59499422E12, 459.0]], "isOverall": false, "label": "Actividades_Nuevo - -225", "isController": false}, {"data": [[1.59499386E12, 1114.6666666666667]], "isOverall": false, "label": "Buscar Cliente - -55", "isController": false}, {"data": [[1.59499422E12, 4310.333333333334]], "isOverall": false, "label": "Clic Confirmar Pre-Emision - -203", "isController": false}, {"data": [[1.59499386E12, 2142.0]], "isOverall": false, "label": "Buscar Cliente - -59", "isController": false}, {"data": [[1.59499422E12, 2976.333333333333]], "isOverall": false, "label": "Clic Validacion - -202", "isController": false}, {"data": [[1.59499434E12, 306.0]], "isOverall": false, "label": "Fin Pago - -241", "isController": false}, {"data": [[1.5949941E12, 14108.166666666668]], "isOverall": false, "label": "Plan Cuotas - -170", "isController": false}, {"data": [[1.59499398E12, 2017.5]], "isOverall": false, "label": "Grabar Detalle Objeto - -106", "isController": false}, {"data": [[1.5949941E12, 721.0]], "isOverall": false, "label": "Plan Cuotas - -174", "isController": false}, {"data": [[1.59499392E12, 1772.0]], "isOverall": false, "label": "Siguiente - -70", "isController": false}, {"data": [[1.59499386E12, 928.3333333333334]], "isOverall": false, "label": "Index - -2", "isController": false}, {"data": [[1.59499416E12, 12594.666666666668]], "isOverall": false, "label": "Ri Policy - -187", "isController": false}, {"data": [[1.59499386E12, 375.3333333333333]], "isOverall": false, "label": "Index - -7", "isController": false}, {"data": [[1.59499422E12, 552.0], [1.59499416E12, 467.5]], "isOverall": false, "label": "Emitir Poliza - -195", "isController": false}, {"data": [[1.59499398E12, 11175.833333333332]], "isOverall": false, "label": "Siguiente - -116", "isController": false}, {"data": [[1.59499422E12, 9710.0], [1.59499416E12, 9806.2]], "isOverall": false, "label": "Emitir Poliza - -192", "isController": false}, {"data": [[1.59499428E12, 3543.0]], "isOverall": false, "label": "Cantidad a Pagar - -231", "isController": false}, {"data": [[1.59499434E12, 0.33333333333333337]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59499386E12, 9171.333333333334]], "isOverall": false, "label": "Actualizar Poliza - -41", "isController": false}, {"data": [[1.59499386E12, 938.6666666666666]], "isOverall": false, "label": "Actualizar Poliza - -42", "isController": false}, {"data": [[1.5949941E12, 802.6666666666666]], "isOverall": false, "label": "Calculo Prima - -168", "isController": false}, {"data": [[1.5949941E12, 12874.333333333334]], "isOverall": false, "label": "Calculo Prima - -165", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59499434E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.59499386E12, "maxY": 452234.0, "series": [{"data": [[1.59499398E12, 1243.3333333333333]], "isOverall": false, "label": "Cerrar Detalle Objeto - -115", "isController": false}, {"data": [[1.59499422E12, 13496.0]], "isOverall": false, "label": "Ingregar Poliza - -226", "isController": false}, {"data": [[1.5949941E12, 14471.166666666668]], "isOverall": false, "label": "Clausulas - -152", "isController": false}, {"data": [[1.59499398E12, 2669.833333333333]], "isOverall": false, "label": "Cerrar Detalle Objeto - -112", "isController": false}, {"data": [[1.59499398E12, 1771.0]], "isOverall": false, "label": "Cerrar Detalle Objeto - -113", "isController": false}, {"data": [[1.59499398E12, 534.0]], "isOverall": false, "label": "Siguiente - -120", "isController": false}, {"data": [[1.59499416E12, 719.3333333333334]], "isOverall": false, "label": "Ri Policy - -191", "isController": false}, {"data": [[1.59499428E12, 2411.3333333333335]], "isOverall": false, "label": "Usage Description - -230", "isController": false}, {"data": [[1.59499434E12, 121.66666666666667]], "isOverall": false, "label": "Aplicar Pago - -240", "isController": false}, {"data": [[1.59499392E12, 40203.0]], "isOverall": false, "label": "Siguiente - -68", "isController": false}, {"data": [[1.5949941E12, 815.0]], "isOverall": false, "label": "Clausulas - -156", "isController": false}, {"data": [[1.59499386E12, 682.6666666666666]], "isOverall": false, "label": "Login - -22", "isController": false}, {"data": [[1.59499422E12, 2477.0]], "isOverall": false, "label": "Facturacion y Cobranza - -214", "isController": false}, {"data": [[1.59499386E12, 109.33333333333333]], "isOverall": false, "label": "Login - -24", "isController": false}, {"data": [[1.59499386E12, 97.66666666666667]], "isOverall": false, "label": "Actualizar Poliza - -52", "isController": false}, {"data": [[1.59499434E12, 452234.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59499386E12, 185.66666666666666]], "isOverall": false, "label": "Index - -7-1", "isController": false}, {"data": [[1.59499404E12, 11779.166666666668]], "isOverall": false, "label": "Documentos Poliza - -134", "isController": false}, {"data": [[1.59499386E12, 182.0]], "isOverall": false, "label": "Index - -7-0", "isController": false}, {"data": [[1.59499428E12, 1859.3333333333333]], "isOverall": false, "label": "Usage Description - -229", "isController": false}, {"data": [[1.59499428E12, 2531.333333333333]], "isOverall": false, "label": "Usage Description - -228", "isController": false}, {"data": [[1.59499428E12, 2444.3333333333335]], "isOverall": false, "label": "Usage Description - -227", "isController": false}, {"data": [[1.59499398E12, 651.0]], "isOverall": false, "label": "Siguiente - -93", "isController": false}, {"data": [[1.59499434E12, 490.3333333333333]], "isOverall": false, "label": "Aplicar Pago - -238", "isController": false}, {"data": [[1.59499404E12, 13910.0]], "isOverall": false, "label": "Deducible - -126", "isController": false}, {"data": [[1.59499434E12, 306.6666666666667]], "isOverall": false, "label": "Aplicar Pago - -239", "isController": false}, {"data": [[1.59499404E12, 642.0]], "isOverall": false, "label": "Deducible - -129", "isController": false}, {"data": [[1.59499416E12, 1903.0]], "isOverall": false, "label": "Facultatives - -183", "isController": false}, {"data": [[1.5949941E12, 708.3333333333334]], "isOverall": false, "label": "Informacion Cliente - -161", "isController": false}, {"data": [[1.59499422E12, 6067.666666666666]], "isOverall": false, "label": "Clic Calculo de Prima - -199", "isController": false}, {"data": [[1.59499434E12, 87033.0]], "isOverall": false, "label": "Aplicar Pago - -237", "isController": false}, {"data": [[1.59499386E12, 1206.0]], "isOverall": false, "label": "Buscar Cliente - -60", "isController": false}, {"data": [[1.59499428E12, 2676.3333333333335]], "isOverall": false, "label": "Ok Pago - -232", "isController": false}, {"data": [[1.59499386E12, 2161.6666666666665]], "isOverall": false, "label": "Buscar Cliente - -61", "isController": false}, {"data": [[1.59499428E12, 453.6666666666667]], "isOverall": false, "label": "Ok Pago - -233", "isController": false}, {"data": [[1.5949941E12, 13528.166666666666]], "isOverall": false, "label": "Informacion Cliente - -157", "isController": false}, {"data": [[1.59499404E12, 11729.333333333334]], "isOverall": false, "label": "Comisiones - -142", "isController": false}, {"data": [[1.59499422E12, 12997.0]], "isOverall": false, "label": "Clic Emitir Poliza - -204", "isController": false}, {"data": [[1.59499386E12, 2434.6666666666665]], "isOverall": false, "label": "Buscar Cliente - -64", "isController": false}, {"data": [[1.59499404E12, 608.6666666666666]], "isOverall": false, "label": "Comisiones - -145", "isController": false}, {"data": [[1.59499386E12, 934.0]], "isOverall": false, "label": "Buscar Cliente - -65", "isController": false}, {"data": [[1.59499386E12, 740.0]], "isOverall": false, "label": "Buscar Cliente - -62", "isController": false}, {"data": [[1.59499428E12, 371.0]], "isOverall": false, "label": "Ok Pago - -234", "isController": false}, {"data": [[1.59499386E12, 2047.6666666666667]], "isOverall": false, "label": "Buscar Cliente - -63", "isController": false}, {"data": [[1.59499386E12, 665.0]], "isOverall": false, "label": "Operaciones - -39", "isController": false}, {"data": [[1.59499404E12, 539.6666666666666]], "isOverall": false, "label": "Documentos Poliza - -141", "isController": false}, {"data": [[1.59499392E12, 2261.3333333333335]], "isOverall": false, "label": "Buscar Cliente - -66", "isController": false}, {"data": [[1.59499392E12, 709.3333333333334]], "isOverall": false, "label": "Buscar Cliente - -67", "isController": false}, {"data": [[1.59499404E12, 12989.166666666666]], "isOverall": false, "label": "Impuestos - -147", "isController": false}, {"data": [[1.59499386E12, 628.0]], "isOverall": false, "label": "Login - -22-0", "isController": false}, {"data": [[1.59499386E12, 282.66666666666663]], "isOverall": false, "label": "Login - -22-1", "isController": false}, {"data": [[1.59499386E12, 320.3333333333333]], "isOverall": false, "label": "Control Polizas - -40", "isController": false}, {"data": [[1.59499398E12, 723.0]], "isOverall": false, "label": "Editar Detalle Objeto - -101", "isController": false}, {"data": [[1.59499398E12, 761.0]], "isOverall": false, "label": "Grabar Detalle Objeto - -111", "isController": false}, {"data": [[1.59499398E12, 13839.666666666666]], "isOverall": false, "label": "Descuentos - -121", "isController": false}, {"data": [[1.59499386E12, 109.33333333333333]], "isOverall": false, "label": "Login - -24-0", "isController": false}, {"data": [[1.59499428E12, 459.0]], "isOverall": false, "label": "Grabar Pago - -236", "isController": false}, {"data": [[1.59499386E12, 10633.333333333334]], "isOverall": false, "label": "Login - -24-1", "isController": false}, {"data": [[1.59499398E12, 918.3333333333334]], "isOverall": false, "label": "Editar Detalle Objeto - -102", "isController": false}, {"data": [[1.59499428E12, 1296.5]], "isOverall": false, "label": "Grabar Pago - -235", "isController": false}, {"data": [[1.59499398E12, 698.0]], "isOverall": false, "label": "Editar Detalle Objeto - -104", "isController": false}, {"data": [[1.59499398E12, 615.3333333333334]], "isOverall": false, "label": "Descuentos - -125", "isController": false}, {"data": [[1.59499398E12, 18100.833333333332]], "isOverall": false, "label": "Siguiente - -89", "isController": false}, {"data": [[1.59499434E12, 229.0]], "isOverall": false, "label": "Fin Pago - -242", "isController": false}, {"data": [[1.59499416E12, 43023.16666666667]], "isOverall": false, "label": "Facultatives - -179", "isController": false}, {"data": [[1.59499392E12, 19755.666666666668], [1.59499386E12, 1925.6666666666667]], "isOverall": false, "label": "Buscar Cliente - -53", "isController": false}, {"data": [[1.59499386E12, 2167.0]], "isOverall": false, "label": "Buscar Cliente - -54", "isController": false}, {"data": [[1.59499422E12, 6356.833333333334]], "isOverall": false, "label": "Pagos - -215", "isController": false}, {"data": [[1.59499404E12, 577.0]], "isOverall": false, "label": "Impuestos - -151", "isController": false}, {"data": [[1.59499422E12, 652.3333333333334]], "isOverall": false, "label": "Pagos - -216", "isController": false}, {"data": [[1.59499422E12, 4313.5]], "isOverall": false, "label": "Actividades_Nuevo - -224", "isController": false}, {"data": [[1.59499398E12, 5901.333333333333]], "isOverall": false, "label": "Editar Detalle Objeto - -99", "isController": false}, {"data": [[1.59499422E12, 445.0]], "isOverall": false, "label": "Actividades_Nuevo - -225", "isController": false}, {"data": [[1.59499386E12, 1064.0]], "isOverall": false, "label": "Buscar Cliente - -55", "isController": false}, {"data": [[1.59499422E12, 4190.0]], "isOverall": false, "label": "Clic Confirmar Pre-Emision - -203", "isController": false}, {"data": [[1.59499386E12, 2104.3333333333335]], "isOverall": false, "label": "Buscar Cliente - -59", "isController": false}, {"data": [[1.59499422E12, 2970.333333333333]], "isOverall": false, "label": "Clic Validacion - -202", "isController": false}, {"data": [[1.59499434E12, 302.83333333333337]], "isOverall": false, "label": "Fin Pago - -241", "isController": false}, {"data": [[1.5949941E12, 12667.833333333334]], "isOverall": false, "label": "Plan Cuotas - -170", "isController": false}, {"data": [[1.59499398E12, 1447.1666666666665]], "isOverall": false, "label": "Grabar Detalle Objeto - -106", "isController": false}, {"data": [[1.5949941E12, 601.0]], "isOverall": false, "label": "Plan Cuotas - -174", "isController": false}, {"data": [[1.59499392E12, 1242.6666666666667]], "isOverall": false, "label": "Siguiente - -70", "isController": false}, {"data": [[1.59499386E12, 827.6666666666667]], "isOverall": false, "label": "Index - -2", "isController": false}, {"data": [[1.59499416E12, 11704.333333333334]], "isOverall": false, "label": "Ri Policy - -187", "isController": false}, {"data": [[1.59499386E12, 182.0]], "isOverall": false, "label": "Index - -7", "isController": false}, {"data": [[1.59499422E12, 552.0], [1.59499416E12, 467.5]], "isOverall": false, "label": "Emitir Poliza - -195", "isController": false}, {"data": [[1.59499398E12, 10217.0]], "isOverall": false, "label": "Siguiente - -116", "isController": false}, {"data": [[1.59499422E12, 9300.0], [1.59499416E12, 9280.2]], "isOverall": false, "label": "Emitir Poliza - -192", "isController": false}, {"data": [[1.59499428E12, 3539.3333333333335]], "isOverall": false, "label": "Cantidad a Pagar - -231", "isController": false}, {"data": [[1.59499434E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59499386E12, 3753.666666666667]], "isOverall": false, "label": "Actualizar Poliza - -41", "isController": false}, {"data": [[1.59499386E12, 841.6666666666666]], "isOverall": false, "label": "Actualizar Poliza - -42", "isController": false}, {"data": [[1.5949941E12, 609.3333333333334]], "isOverall": false, "label": "Calculo Prima - -168", "isController": false}, {"data": [[1.5949941E12, 11939.333333333332]], "isOverall": false, "label": "Calculo Prima - -165", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59499434E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.59499386E12, "maxY": 17327.666666666668, "series": [{"data": [[1.59499398E12, 405.0]], "isOverall": false, "label": "Cerrar Detalle Objeto - -115", "isController": false}, {"data": [[1.59499422E12, 0.0]], "isOverall": false, "label": "Ingregar Poliza - -226", "isController": false}, {"data": [[1.5949941E12, 309.0]], "isOverall": false, "label": "Clausulas - -152", "isController": false}, {"data": [[1.59499398E12, 344.0]], "isOverall": false, "label": "Cerrar Detalle Objeto - -112", "isController": false}, {"data": [[1.59499398E12, 283.0]], "isOverall": false, "label": "Cerrar Detalle Objeto - -113", "isController": false}, {"data": [[1.59499398E12, 318.0]], "isOverall": false, "label": "Siguiente - -120", "isController": false}, {"data": [[1.59499416E12, 487.0]], "isOverall": false, "label": "Ri Policy - -191", "isController": false}, {"data": [[1.59499428E12, 0.0]], "isOverall": false, "label": "Usage Description - -230", "isController": false}, {"data": [[1.59499434E12, 0.0]], "isOverall": false, "label": "Aplicar Pago - -240", "isController": false}, {"data": [[1.59499392E12, 209.5]], "isOverall": false, "label": "Siguiente - -68", "isController": false}, {"data": [[1.5949941E12, 618.0]], "isOverall": false, "label": "Clausulas - -156", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "Login - -22", "isController": false}, {"data": [[1.59499422E12, 363.66666666666663]], "isOverall": false, "label": "Facturacion y Cobranza - -214", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "Login - -24", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "Actualizar Poliza - -52", "isController": false}, {"data": [[1.59499434E12, 17327.666666666668]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "Index - -7-1", "isController": false}, {"data": [[1.59499404E12, 160.5]], "isOverall": false, "label": "Documentos Poliza - -134", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "Index - -7-0", "isController": false}, {"data": [[1.59499428E12, 321.6666666666667]], "isOverall": false, "label": "Usage Description - -229", "isController": false}, {"data": [[1.59499428E12, 391.6666666666667]], "isOverall": false, "label": "Usage Description - -228", "isController": false}, {"data": [[1.59499428E12, 419.0]], "isOverall": false, "label": "Usage Description - -227", "isController": false}, {"data": [[1.59499398E12, 319.6666666666667]], "isOverall": false, "label": "Siguiente - -93", "isController": false}, {"data": [[1.59499434E12, 335.0]], "isOverall": false, "label": "Aplicar Pago - -238", "isController": false}, {"data": [[1.59499404E12, 173.16666666666669]], "isOverall": false, "label": "Deducible - -126", "isController": false}, {"data": [[1.59499434E12, 0.0]], "isOverall": false, "label": "Aplicar Pago - -239", "isController": false}, {"data": [[1.59499404E12, 346.3333333333333]], "isOverall": false, "label": "Deducible - -129", "isController": false}, {"data": [[1.59499416E12, 343.0]], "isOverall": false, "label": "Facultatives - -183", "isController": false}, {"data": [[1.5949941E12, 407.3333333333333]], "isOverall": false, "label": "Informacion Cliente - -161", "isController": false}, {"data": [[1.59499422E12, 0.0]], "isOverall": false, "label": "Clic Calculo de Prima - -199", "isController": false}, {"data": [[1.59499434E12, 167.5]], "isOverall": false, "label": "Aplicar Pago - -237", "isController": false}, {"data": [[1.59499386E12, 344.6666666666667]], "isOverall": false, "label": "Buscar Cliente - -60", "isController": false}, {"data": [[1.59499428E12, 573.5]], "isOverall": false, "label": "Ok Pago - -232", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "Buscar Cliente - -61", "isController": false}, {"data": [[1.59499428E12, 310.3333333333333]], "isOverall": false, "label": "Ok Pago - -233", "isController": false}, {"data": [[1.5949941E12, 203.66666666666669]], "isOverall": false, "label": "Informacion Cliente - -157", "isController": false}, {"data": [[1.59499404E12, 170.0]], "isOverall": false, "label": "Comisiones - -142", "isController": false}, {"data": [[1.59499422E12, 350.33333333333337]], "isOverall": false, "label": "Clic Emitir Poliza - -204", "isController": false}, {"data": [[1.59499386E12, 411.0]], "isOverall": false, "label": "Buscar Cliente - -64", "isController": false}, {"data": [[1.59499404E12, 340.0]], "isOverall": false, "label": "Comisiones - -145", "isController": false}, {"data": [[1.59499386E12, 361.3333333333333]], "isOverall": false, "label": "Buscar Cliente - -65", "isController": false}, {"data": [[1.59499386E12, 365.6666666666667]], "isOverall": false, "label": "Buscar Cliente - -62", "isController": false}, {"data": [[1.59499428E12, 0.0]], "isOverall": false, "label": "Ok Pago - -234", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "Buscar Cliente - -63", "isController": false}, {"data": [[1.59499386E12, 342.6666666666667]], "isOverall": false, "label": "Operaciones - -39", "isController": false}, {"data": [[1.59499404E12, 321.0]], "isOverall": false, "label": "Documentos Poliza - -141", "isController": false}, {"data": [[1.59499392E12, 0.0]], "isOverall": false, "label": "Buscar Cliente - -66", "isController": false}, {"data": [[1.59499392E12, 452.6666666666667]], "isOverall": false, "label": "Buscar Cliente - -67", "isController": false}, {"data": [[1.59499404E12, 182.0]], "isOverall": false, "label": "Impuestos - -147", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "Login - -22-0", "isController": false}, {"data": [[1.59499386E12, 152.66666666666666]], "isOverall": false, "label": "Login - -22-1", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "Control Polizas - -40", "isController": false}, {"data": [[1.59499398E12, 488.0]], "isOverall": false, "label": "Editar Detalle Objeto - -101", "isController": false}, {"data": [[1.59499398E12, 344.6666666666667]], "isOverall": false, "label": "Grabar Detalle Objeto - -111", "isController": false}, {"data": [[1.59499398E12, 187.83333333333331]], "isOverall": false, "label": "Descuentos - -121", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "Login - -24-0", "isController": false}, {"data": [[1.59499428E12, 319.0]], "isOverall": false, "label": "Grabar Pago - -236", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "Login - -24-1", "isController": false}, {"data": [[1.59499398E12, 0.0]], "isOverall": false, "label": "Editar Detalle Objeto - -102", "isController": false}, {"data": [[1.59499428E12, 159.5]], "isOverall": false, "label": "Grabar Pago - -235", "isController": false}, {"data": [[1.59499398E12, 446.0]], "isOverall": false, "label": "Editar Detalle Objeto - -104", "isController": false}, {"data": [[1.59499398E12, 375.6666666666667]], "isOverall": false, "label": "Descuentos - -125", "isController": false}, {"data": [[1.59499398E12, 159.83333333333334]], "isOverall": false, "label": "Siguiente - -89", "isController": false}, {"data": [[1.59499434E12, 0.0]], "isOverall": false, "label": "Fin Pago - -242", "isController": false}, {"data": [[1.59499416E12, 171.5]], "isOverall": false, "label": "Facultatives - -179", "isController": false}, {"data": [[1.59499392E12, 2687.6666666666665], [1.59499386E12, 0.0]], "isOverall": false, "label": "Buscar Cliente - -53", "isController": false}, {"data": [[1.59499386E12, 361.6666666666667]], "isOverall": false, "label": "Buscar Cliente - -54", "isController": false}, {"data": [[1.59499422E12, 570.1666666666666]], "isOverall": false, "label": "Pagos - -215", "isController": false}, {"data": [[1.59499404E12, 364.0]], "isOverall": false, "label": "Impuestos - -151", "isController": false}, {"data": [[1.59499422E12, 320.3333333333333]], "isOverall": false, "label": "Pagos - -216", "isController": false}, {"data": [[1.59499422E12, 151.5]], "isOverall": false, "label": "Actividades_Nuevo - -224", "isController": false}, {"data": [[1.59499398E12, 467.0]], "isOverall": false, "label": "Editar Detalle Objeto - -99", "isController": false}, {"data": [[1.59499422E12, 303.0]], "isOverall": false, "label": "Actividades_Nuevo - -225", "isController": false}, {"data": [[1.59499386E12, 390.6666666666667]], "isOverall": false, "label": "Buscar Cliente - -55", "isController": false}, {"data": [[1.59499422E12, 308.33333333333337]], "isOverall": false, "label": "Clic Confirmar Pre-Emision - -203", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "Buscar Cliente - -59", "isController": false}, {"data": [[1.59499422E12, 358.6666666666667]], "isOverall": false, "label": "Clic Validacion - -202", "isController": false}, {"data": [[1.59499434E12, 0.0]], "isOverall": false, "label": "Fin Pago - -241", "isController": false}, {"data": [[1.5949941E12, 178.5]], "isOverall": false, "label": "Plan Cuotas - -170", "isController": false}, {"data": [[1.59499398E12, 172.33333333333331]], "isOverall": false, "label": "Grabar Detalle Objeto - -106", "isController": false}, {"data": [[1.5949941E12, 357.0]], "isOverall": false, "label": "Plan Cuotas - -174", "isController": false}, {"data": [[1.59499392E12, 419.0]], "isOverall": false, "label": "Siguiente - -70", "isController": false}, {"data": [[1.59499386E12, 625.3333333333334]], "isOverall": false, "label": "Index - -2", "isController": false}, {"data": [[1.59499416E12, 562.5]], "isOverall": false, "label": "Ri Policy - -187", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "Index - -7", "isController": false}, {"data": [[1.59499422E12, 393.0], [1.59499416E12, 332.0]], "isOverall": false, "label": "Emitir Poliza - -195", "isController": false}, {"data": [[1.59499398E12, 159.0]], "isOverall": false, "label": "Siguiente - -116", "isController": false}, {"data": [[1.59499422E12, 393.0], [1.59499416E12, 132.8]], "isOverall": false, "label": "Emitir Poliza - -192", "isController": false}, {"data": [[1.59499428E12, 373.0]], "isOverall": false, "label": "Cantidad a Pagar - -231", "isController": false}, {"data": [[1.59499434E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59499386E12, 185.16666666666669]], "isOverall": false, "label": "Actualizar Poliza - -41", "isController": false}, {"data": [[1.59499386E12, 370.3333333333333]], "isOverall": false, "label": "Actualizar Poliza - -42", "isController": false}, {"data": [[1.5949941E12, 345.3333333333333]], "isOverall": false, "label": "Calculo Prima - -168", "isController": false}, {"data": [[1.5949941E12, 172.66666666666669]], "isOverall": false, "label": "Calculo Prima - -165", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59499434E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.59499386E12, "maxY": 88873.0, "series": [{"data": [[1.59499398E12, 20572.0], [1.59499428E12, 3923.0], [1.5949941E12, 15412.0], [1.59499392E12, 42158.0], [1.59499422E12, 14577.0], [1.59499404E12, 16982.0], [1.59499434E12, 88873.0], [1.59499386E12, 11339.0], [1.59499416E12, 46742.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.59499398E12, 500.0], [1.59499428E12, 280.0], [1.5949941E12, 691.0], [1.59499392E12, 793.0], [1.59499422E12, 451.0], [1.59499404E12, 564.0], [1.59499434E12, 0.0], [1.59499386E12, 93.0], [1.59499416E12, 460.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.59499398E12, 14302.199999999999], [1.59499428E12, 3647.4], [1.5949941E12, 15096.0], [1.59499392E12, 41754.8], [1.59499422E12, 14154.0], [1.59499404E12, 16675.5], [1.59499434E12, 86289.4], [1.59499386E12, 8753.6], [1.59499416E12, 45498.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.59499398E12, 20572.0], [1.59499428E12, 3923.0], [1.5949941E12, 15412.0], [1.59499392E12, 42158.0], [1.59499422E12, 14577.0], [1.59499404E12, 16982.0], [1.59499434E12, 88873.0], [1.59499386E12, 11339.0], [1.59499416E12, 46742.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.59499398E12, 19450.799999999992], [1.59499428E12, 3842.7], [1.5949941E12, 15348.5], [1.59499392E12, 42158.0], [1.59499422E12, 14426.4], [1.59499404E12, 16956.5], [1.59499434E12, 88633.9], [1.59499386E12, 10936.4], [1.59499416E12, 46742.0]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59499434E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 271.0, "minX": 1.0, "maxY": 10911.0, "series": [{"data": [[8.0, 306.5], [2.0, 6404.5], [1.0, 2405.0], [4.0, 908.5], [10.0, 271.0], [5.0, 709.0], [6.0, 463.0], [3.0, 1366.0], [7.0, 10911.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 10.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 195.0, "minX": 1.0, "maxY": 3543.0, "series": [{"data": [[8.0, 198.0], [2.0, 3543.0], [1.0, 1963.0], [4.0, 897.5], [10.0, 195.0], [5.0, 665.5], [6.0, 452.5], [3.0, 1106.0], [7.0, 670.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 10.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.2, "minX": 1.59499386E12, "maxY": 1.3, "series": [{"data": [[1.59499398E12, 0.75], [1.59499428E12, 0.5], [1.5949941E12, 0.4], [1.59499392E12, 0.2], [1.59499422E12, 0.5166666666666667], [1.59499404E12, 0.4], [1.59499434E12, 0.3], [1.59499386E12, 1.3], [1.59499416E12, 0.2833333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59499434E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.15, "minX": 1.59499386E12, "maxY": 1.1, "series": [{"data": [[1.59499398E12, 0.75], [1.59499428E12, 0.5], [1.5949941E12, 0.4], [1.59499392E12, 0.2], [1.59499422E12, 0.5166666666666667], [1.59499404E12, 0.4], [1.59499434E12, 0.35], [1.59499386E12, 1.1], [1.59499416E12, 0.2833333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.59499386E12, 0.15]], "isOverall": false, "label": "302", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59499434E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.59499386E12, "maxY": 0.1, "series": [{"data": [[1.59499392E12, 0.1]], "isOverall": false, "label": "Siguiente - -68-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Buscar Cliente - -55-success", "isController": false}, {"data": [[1.59499434E12, 0.05]], "isOverall": false, "label": "Fin Pago - -242-success", "isController": false}, {"data": [[1.59499398E12, 0.1]], "isOverall": false, "label": "Siguiente - -116-success", "isController": false}, {"data": [[1.5949941E12, 0.05]], "isOverall": false, "label": "Calculo Prima - -168-success", "isController": false}, {"data": [[1.59499386E12, 0.1]], "isOverall": false, "label": "Index - -2-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Login - -24-0-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Descuentos - -125-success", "isController": false}, {"data": [[1.5949941E12, 0.05]], "isOverall": false, "label": "Clausulas - -156-success", "isController": false}, {"data": [[1.59499392E12, 0.05], [1.59499386E12, 0.05]], "isOverall": false, "label": "Buscar Cliente - -53-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Buscar Cliente - -59-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Login - -22-1-success", "isController": false}, {"data": [[1.59499422E12, 0.1]], "isOverall": false, "label": "Facturacion y Cobranza - -214-success", "isController": false}, {"data": [[1.59499434E12, 0.05]], "isOverall": false, "label": "Aplicar Pago - -238-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Cerrar Detalle Objeto - -113-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Siguiente - -120-success", "isController": false}, {"data": [[1.59499392E12, 0.05]], "isOverall": false, "label": "Buscar Cliente - -66-success", "isController": false}, {"data": [[1.59499422E12, 0.05]], "isOverall": false, "label": "Actividades_Nuevo - -225-success", "isController": false}, {"data": [[1.59499428E12, 0.1]], "isOverall": false, "label": "Grabar Pago - -235-success", "isController": false}, {"data": [[1.59499428E12, 0.1]], "isOverall": false, "label": "Usage Description - -228-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Buscar Cliente - -64-success", "isController": false}, {"data": [[1.59499428E12, 0.05]], "isOverall": false, "label": "Usage Description - -230-success", "isController": false}, {"data": [[1.59499392E12, 0.05]], "isOverall": false, "label": "Siguiente - -70-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Cerrar Detalle Objeto - -115-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Actualizar Poliza - -52-success", "isController": false}, {"data": [[1.59499404E12, 0.05]], "isOverall": false, "label": "Deducible - -129-success", "isController": false}, {"data": [[1.59499422E12, 0.05]], "isOverall": false, "label": "Pagos - -216-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Buscar Cliente - -62-success", "isController": false}, {"data": [[1.5949941E12, 0.05]], "isOverall": false, "label": "Informacion Cliente - -161-success", "isController": false}, {"data": [[1.59499422E12, 0.1]], "isOverall": false, "label": "Clic Emitir Poliza - -204-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Login - -24-success", "isController": false}, {"data": [[1.59499386E12, 0.1]], "isOverall": false, "label": "Login - -22-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Index - -7-0-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Editar Detalle Objeto - -104-success", "isController": false}, {"data": [[1.59499434E12, 0.05]], "isOverall": false, "label": "Aplicar Pago - -240-success", "isController": false}, {"data": [[1.59499398E12, 0.1]], "isOverall": false, "label": "Grabar Detalle Objeto - -106-success", "isController": false}, {"data": [[1.59499422E12, 0.1]], "isOverall": false, "label": "Clic Validacion - -202-success", "isController": false}, {"data": [[1.5949941E12, 0.1]], "isOverall": false, "label": "Plan Cuotas - -170-success", "isController": false}, {"data": [[1.59499428E12, 0.1]], "isOverall": false, "label": "Ok Pago - -232-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Editar Detalle Objeto - -102-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Actualizar Poliza - -42-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Buscar Cliente - -60-success", "isController": false}, {"data": [[1.59499404E12, 0.1]], "isOverall": false, "label": "Comisiones - -142-success", "isController": false}, {"data": [[1.5949941E12, 0.1]], "isOverall": false, "label": "Clausulas - -152-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Siguiente - -93-success", "isController": false}, {"data": [[1.59499428E12, 0.05]], "isOverall": false, "label": "Ok Pago - -234-success", "isController": false}, {"data": [[1.59499404E12, 0.05]], "isOverall": false, "label": "Impuestos - -151-success", "isController": false}, {"data": [[1.5949941E12, 0.05]], "isOverall": false, "label": "Plan Cuotas - -174-success", "isController": false}, {"data": [[1.59499434E12, 0.1]], "isOverall": false, "label": "Fin Pago - -241-success", "isController": false}, {"data": [[1.59499404E12, 0.05]], "isOverall": false, "label": "Comisiones - -145-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Login - -24-1-success", "isController": false}, {"data": [[1.59499428E12, 0.1]], "isOverall": false, "label": "Usage Description - -229-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Buscar Cliente - -54-success", "isController": false}, {"data": [[1.59499434E12, 0.1]], "isOverall": false, "label": "Aplicar Pago - -237-success", "isController": false}, {"data": [[1.5949941E12, 0.1]], "isOverall": false, "label": "Calculo Prima - -165-success", "isController": false}, {"data": [[1.59499416E12, 0.1]], "isOverall": false, "label": "Ri Policy - -187-success", "isController": false}, {"data": [[1.59499422E12, 0.1]], "isOverall": false, "label": "Clic Confirmar Pre-Emision - -203-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Index - -7-success", "isController": false}, {"data": [[1.59499392E12, 0.05]], "isOverall": false, "label": "Buscar Cliente - -67-success", "isController": false}, {"data": [[1.59499404E12, 0.05]], "isOverall": false, "label": "Documentos Poliza - -141-success", "isController": false}, {"data": [[1.59499428E12, 0.05]], "isOverall": false, "label": "Grabar Pago - -236-success", "isController": false}, {"data": [[1.59499386E12, 0.1]], "isOverall": false, "label": "Operaciones - -39-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Login - -22-0-success", "isController": false}, {"data": [[1.59499422E12, 0.016666666666666666], [1.59499416E12, 0.03333333333333333]], "isOverall": false, "label": "Emitir Poliza - -195-success", "isController": false}, {"data": [[1.59499416E12, 0.1]], "isOverall": false, "label": "Facultatives - -179-success", "isController": false}, {"data": [[1.59499434E12, 0.05]], "isOverall": false, "label": "Aplicar Pago - -239-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Buscar Cliente - -65-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Grabar Detalle Objeto - -111-success", "isController": false}, {"data": [[1.59499422E12, 0.1]], "isOverall": false, "label": "Actividades_Nuevo - -224-success", "isController": false}, {"data": [[1.59499428E12, 0.1]], "isOverall": false, "label": "Usage Description - -227-success", "isController": false}, {"data": [[1.59499386E12, 0.1]], "isOverall": false, "label": "Control Polizas - -40-success", "isController": false}, {"data": [[1.59499434E12, 0.05]], "isOverall": false, "label": "Transaction Controller-success", "isController": true}, {"data": [[1.59499416E12, 0.05]], "isOverall": false, "label": "Ri Policy - -191-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Buscar Cliente - -63-success", "isController": false}, {"data": [[1.59499428E12, 0.1]], "isOverall": false, "label": "Cantidad a Pagar - -231-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Buscar Cliente - -61-success", "isController": false}, {"data": [[1.59499416E12, 0.05]], "isOverall": false, "label": "Facultatives - -183-success", "isController": false}, {"data": [[1.59499404E12, 0.1]], "isOverall": false, "label": "Deducible - -126-success", "isController": false}, {"data": [[1.59499422E12, 0.1]], "isOverall": false, "label": "Pagos - -215-success", "isController": false}, {"data": [[1.59499422E12, 0.1]], "isOverall": false, "label": "Ingregar Poliza - -226-success", "isController": false}, {"data": [[1.59499434E12, 0.05]], "isOverall": false, "label": "Debug Sampler-success", "isController": false}, {"data": [[1.59499398E12, 0.1]], "isOverall": false, "label": "Cerrar Detalle Objeto - -112-success", "isController": false}, {"data": [[1.59499386E12, 0.1]], "isOverall": false, "label": "Actualizar Poliza - -41-success", "isController": false}, {"data": [[1.59499404E12, 0.1]], "isOverall": false, "label": "Documentos Poliza - -134-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Index - -7-1-success", "isController": false}, {"data": [[1.59499398E12, 0.1]], "isOverall": false, "label": "Descuentos - -121-success", "isController": false}, {"data": [[1.59499404E12, 0.1]], "isOverall": false, "label": "Impuestos - -147-success", "isController": false}, {"data": [[1.59499398E12, 0.1]], "isOverall": false, "label": "Siguiente - -89-success", "isController": false}, {"data": [[1.59499422E12, 0.016666666666666666], [1.59499416E12, 0.08333333333333333]], "isOverall": false, "label": "Emitir Poliza - -192-success", "isController": false}, {"data": [[1.59499428E12, 0.05]], "isOverall": false, "label": "Ok Pago - -233-success", "isController": false}, {"data": [[1.59499398E12, 0.1]], "isOverall": false, "label": "Editar Detalle Objeto - -99-success", "isController": false}, {"data": [[1.5949941E12, 0.1]], "isOverall": false, "label": "Informacion Cliente - -157-success", "isController": false}, {"data": [[1.59499422E12, 0.1]], "isOverall": false, "label": "Clic Calculo de Prima - -199-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Editar Detalle Objeto - -101-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59499434E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.3, "minX": 1.59499386E12, "maxY": 1.5, "series": [{"data": [[1.59499398E12, 1.05], [1.59499428E12, 0.8], [1.5949941E12, 0.6], [1.59499392E12, 0.3], [1.59499422E12, 0.9333333333333333], [1.59499404E12, 0.6], [1.59499434E12, 0.5], [1.59499386E12, 1.5], [1.59499416E12, 0.4166666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59499434E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
