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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 10.0, "series": [{"data": [[600.0, 5.0], [700.0, 1.0], [900.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "T.42 - Crear Deducible", "isController": true}, {"data": [[600.0, 1.0], [400.0, 7.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "34.2 - Grabar Objeto", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 1.0], [600.0, 2.0], [1400.0, 1.0], [700.0, 1.0], [200.0, 4.0], [800.0, 2.0], [900.0, 3.0], [500.0, 5.0]], "isOverall": false, "label": "11.2 - Buscar Agente", "isController": false}, {"data": [[600.0, 2.0], [700.0, 4.0], [800.0, 1.0], [200.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "29.1 - Ingresar Identificacion", "isController": false}, {"data": [[600.0, 2.0], [700.0, 2.0], [800.0, 1.0], [400.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "13.3 - Seleccionar agente ok ", "isController": false}, {"data": [[600.0, 2.0], [800.0, 2.0], [400.0, 1.0], [900.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "23.3 - Seleccionar el Dia de pago", "isController": false}, {"data": [[1200.0, 1.0], [2600.0, 2.0], [1400.0, 1.0], [1500.0, 1.0], [900.0, 1.0], [1000.0, 4.0]], "isOverall": false, "label": "28.2 - Hacer clic en el \u00EDcono de Buscar", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [200.0, 1.0], [400.0, 4.0], [800.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "60.3 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial", "isController": false}, {"data": [[100.0, 5.0], [200.0, 4.0], [900.0, 1.0]], "isOverall": false, "label": "64.2 - Cerrar Insis", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "64.2 - Cerrar Insis-0", "isController": false}, {"data": [[300.0, 1.0], [100.0, 1.0], [200.0, 5.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "63.1 - Hacer clic en Proceder", "isController": false}, {"data": [[11100.0, 1.0], [5800.0, 1.0], [11700.0, 2.0], [5900.0, 1.0], [6000.0, 1.0], [11900.0, 1.0], [6300.0, 1.0], [6200.0, 1.0], [13900.0, 1.0]], "isOverall": false, "label": "55.1 - Impuestos Hacer clic en Siguiente", "isController": false}, {"data": [[700.0, 2.0], [400.0, 3.0], [200.0, 1.0], [900.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "26.2 - Hacer clic en la pesta\u00F1a Participantes de la poliza", "isController": false}, {"data": [[4600.0, 1.0], [4900.0, 2.0], [5100.0, 3.0], [5400.0, 1.0], [5600.0, 1.0], [5700.0, 1.0], [6100.0, 1.0]], "isOverall": false, "label": "T.39 - Hacer clic en Premium", "isController": true}, {"data": [[300.0, 2.0], [600.0, 4.0], [1200.0, 1.0], [200.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "28.3 - Hacer clic en el \u00EDcono de Buscar", "isController": false}, {"data": [[2300.0, 1.0], [2200.0, 2.0], [2400.0, 2.0], [2500.0, 2.0], [3000.0, 1.0], [3100.0, 1.0], [3400.0, 1.0]], "isOverall": false, "label": "33.1 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[600.0, 2.0], [700.0, 4.0], [800.0, 1.0], [900.0, 3.0]], "isOverall": false, "label": "60.2 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial", "isController": false}, {"data": [[600.0, 1.0], [300.0, 3.0], [700.0, 2.0], [200.0, 2.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "62.2 - Hacer clic en Cotizaci\u00F3n aceptada-414", "isController": false}, {"data": [[600.0, 2.0], [700.0, 1.0], [400.0, 4.0], [800.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "35.1 - Cerrar Objeto", "isController": false}, {"data": [[1200.0, 2.0], [1400.0, 1.0], [1500.0, 1.0], [900.0, 3.0], [1000.0, 3.0]], "isOverall": false, "label": "26.1 - Hacer clic en la pesta\u00F1a Participantes de la poliza", "isController": false}, {"data": [[0.0, 1.0], [100.0, 7.0], [200.0, 2.0]], "isOverall": false, "label": "1.2 - Index-0", "isController": false}, {"data": [[4300.0, 1.0], [2500.0, 2.0], [2800.0, 1.0], [3000.0, 1.0], [3300.0, 1.0], [3400.0, 1.0], [3500.0, 1.0], [3600.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "T.29 - Ingresar Identificacion Buscar", "isController": true}, {"data": [[8300.0, 1.0], [8700.0, 1.0], [8800.0, 2.0], [6300.0, 1.0], [6600.0, 1.0], [7000.0, 1.0], [7100.0, 1.0], [7500.0, 1.0], [7600.0, 1.0]], "isOverall": false, "label": "60.1 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial", "isController": false}, {"data": [[600.0, 1.0], [1400.0, 1.0], [700.0, 1.0], [900.0, 4.0], [1000.0, 3.0]], "isOverall": false, "label": "27.1 - Hacer clic en Crear", "isController": false}, {"data": [[300.0, 1.0], [200.0, 8.0], [100.0, 1.0]], "isOverall": false, "label": "1.2 - Index-1", "isController": false}, {"data": [[400.0, 6.0], [500.0, 4.0]], "isOverall": false, "label": "32.2 -  Hacer clic en Siguiente", "isController": false}, {"data": [[8400.0, 1.0], [9700.0, 1.0], [9300.0, 1.0], [10200.0, 1.0], [10000.0, 1.0], [6600.0, 1.0], [6500.0, 1.0], [7900.0, 1.0], [7700.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "T.40 - Hacer clic en Siguiente", "isController": true}, {"data": [[2100.0, 1.0], [1100.0, 2.0], [1400.0, 2.0], [1500.0, 2.0], [1600.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "T.22 - Seleccionar el Numero de pagos", "isController": true}, {"data": [[300.0, 3.0], [200.0, 6.0], [400.0, 1.0]], "isOverall": false, "label": "45.1 - Seleccionar el Tipo de franquicia", "isController": false}, {"data": [[8200.0, 1.0], [8800.0, 1.0], [8900.0, 1.0], [9900.0, 1.0], [10200.0, 1.0], [10300.0, 2.0], [7200.0, 1.0], [7800.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "T.60 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial", "isController": true}, {"data": [[700.0, 2.0], [1500.0, 1.0], [800.0, 4.0], [900.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "T.1 - Index", "isController": true}, {"data": [[0.0, 1.0], [100.0, 8.0], [800.0, 1.0]], "isOverall": false, "label": "64.2 - Cerrar Insis-1", "isController": false}, {"data": [[600.0, 2.0], [1500.0, 1.0], [800.0, 2.0], [400.0, 1.0], [900.0, 1.0], [500.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "28.4 - Hacer clic en el \u00EDcono de Buscar", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 1.0], [1400.0, 1.0], [700.0, 1.0], [1500.0, 2.0], [1600.0, 1.0], [400.0, 1.0], [1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "33.6 -Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[600.0, 6.0], [700.0, 1.0], [800.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "53.2 - Hacer clic en Siguiente", "isController": false}, {"data": [[18200.0, 1.0], [19400.0, 1.0], [18900.0, 1.0], [9700.0, 1.0], [20000.0, 1.0], [23100.0, 1.0], [13100.0, 1.0], [13400.0, 1.0], [14700.0, 1.0], [15300.0, 1.0]], "isOverall": false, "label": "T.7 - Crear Cotizacion Siguiente", "isController": true}, {"data": [[600.0, 3.0], [300.0, 2.0], [200.0, 1.0], [400.0, 1.0], [100.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "16.3 - Hacer clic en Cotizacion nueva", "isController": false}, {"data": [[2100.0, 2.0], [1700.0, 3.0], [1800.0, 2.0], [1900.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "T.61 - Hacer clic en Cotizacion a cliente", "isController": true}, {"data": [[300.0, 5.0], [200.0, 2.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "1.2 - Index", "isController": false}, {"data": [[1200.0, 1.0], [1300.0, 1.0], [1500.0, 1.0], [800.0, 1.0], [900.0, 2.0], [1000.0, 4.0]], "isOverall": false, "label": "T.12 - Hacer clic en buscar", "isController": true}, {"data": [[1200.0, 3.0], [1300.0, 3.0], [900.0, 1.0], [1000.0, 3.0]], "isOverall": false, "label": "61.1 - Hacer clic en Cotizacion a cliente", "isController": false}, {"data": [[8200.0, 1.0], [8800.0, 2.0], [8900.0, 1.0], [17700.0, 1.0], [17600.0, 1.0], [9600.0, 1.0], [19400.0, 1.0], [11700.0, 1.0], [12600.0, 1.0]], "isOverall": false, "label": "T.25 - Hacer clic en Guardar", "isController": true}, {"data": [[300.0, 8.0], [200.0, 2.0]], "isOverall": false, "label": "64.3 - Cerrar Insis", "isController": false}, {"data": [[300.0, 5.0], [400.0, 2.0], [200.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "44 - Seleccionar el Nombre de cobertura", "isController": true}, {"data": [[300.0, 5.0], [400.0, 5.0]], "isOverall": false, "label": "10.2 - Hacer clic en Agente Crear", "isController": false}, {"data": [[0.0, 1.0], [100.0, 9.0]], "isOverall": false, "label": "2.2 - Ingresar a INSIS-0", "isController": false}, {"data": [[2400.0, 1.0], [2700.0, 1.0], [2900.0, 1.0], [5700.0, 2.0], [6300.0, 2.0], [6200.0, 1.0], [3700.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "2.2 - Ingresar a INSIS-1", "isController": false}, {"data": [[8300.0, 1.0], [8500.0, 1.0], [4800.0, 1.0], [300.0, 2.0], [10500.0, 1.0], [11600.0, 1.0], [400.0, 1.0], [800.0, 1.0], [7000.0, 1.0]], "isOverall": false, "label": "T.15 - Hacer clic en Cotizacion nueva", "isController": true}, {"data": [[300.0, 1.0], [200.0, 4.0], [400.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "33.4 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[600.0, 7.0], [700.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "9.2 - Polizas relacionadas Hacer clic en Siguiente", "isController": false}, {"data": [[8300.0, 1.0], [8900.0, 1.0], [9100.0, 1.0], [9700.0, 2.0], [10000.0, 1.0], [6600.0, 1.0], [7000.0, 1.0], [7600.0, 1.0], [7700.0, 1.0]], "isOverall": false, "label": "T.5 - Hacer clic en Crear cotizacion", "isController": true}, {"data": [[8300.0, 1.0], [8500.0, 1.0], [4800.0, 1.0], [300.0, 2.0], [10500.0, 1.0], [11600.0, 1.0], [400.0, 1.0], [800.0, 1.0], [7000.0, 1.0]], "isOverall": false, "label": "15.1 - Hacer clic en Cotizacion nueva", "isController": false}, {"data": [[300.0, 2.0], [600.0, 3.0], [400.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "22.2 - Seleccionar el Numero de pagos", "isController": false}, {"data": [[2100.0, 3.0], [1300.0, 1.0], [1400.0, 4.0], [1500.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "T.26 - Hacer clic en la pesta\u00F1a Participantes de la poliza", "isController": true}, {"data": [[600.0, 2.0], [300.0, 1.0], [700.0, 1.0], [800.0, 2.0], [900.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "29.4 - Ingresar Identificacion Buscar", "isController": false}, {"data": [[4800.0, 1.0], [5300.0, 1.0], [5200.0, 2.0], [5500.0, 1.0], [6000.0, 2.0], [3900.0, 3.0]], "isOverall": false, "label": "38.1 - Hacer clic en Guardar", "isController": false}, {"data": [[8600.0, 1.0], [9100.0, 1.0], [8900.0, 1.0], [10100.0, 1.0], [11000.0, 1.0], [11400.0, 1.0], [5700.0, 1.0], [6500.0, 1.0], [7200.0, 1.0], [7900.0, 1.0]], "isOverall": false, "label": "T.14 - Hacer clic en Guardar", "isController": true}, {"data": [[2100.0, 1.0], [2500.0, 3.0], [2600.0, 1.0], [2800.0, 1.0], [2700.0, 1.0], [2900.0, 1.0], [3500.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "64.1 - Cerrar Insis", "isController": false}, {"data": [[8300.0, 1.0], [8200.0, 2.0], [8900.0, 1.0], [9000.0, 1.0], [13800.0, 1.0], [7300.0, 1.0], [7600.0, 1.0], [7700.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "31.1 - Hacer clic en Guardar", "isController": false}, {"data": [[9900.0, 1.0], [6100.0, 2.0], [11900.0, 1.0], [6600.0, 1.0], [6900.0, 1.0], [7100.0, 1.0], [7000.0, 1.0], [7200.0, 1.0], [7800.0, 1.0]], "isOverall": false, "label": "9.3 - Polizas relacionadas Hacer clic en Siguiente", "isController": false}, {"data": [[400.0, 7.0], [500.0, 3.0]], "isOverall": false, "label": "8.2 - En Historial Hacer clic en Siguiente", "isController": false}, {"data": [[600.0, 6.0], [700.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "35.3 - Cerrar Objeto-365", "isController": false}, {"data": [[300.0, 1.0], [600.0, 2.0], [200.0, 4.0], [400.0, 3.0]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-0", "isController": false}, {"data": [[9200.0, 1.0], [10500.0, 1.0], [5600.0, 1.0], [6000.0, 1.0], [6300.0, 1.0], [6800.0, 3.0], [6900.0, 1.0], [7500.0, 1.0]], "isOverall": false, "label": "6.2 - Ingresar identificacion y Buscar", "isController": false}, {"data": [[0.0, 4.0], [100.0, 4.0], [200.0, 2.0]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-1", "isController": false}, {"data": [[8400.0, 1.0], [9500.0, 1.0], [9900.0, 1.0], [11600.0, 2.0], [7600.0, 2.0], [7900.0, 1.0], [7800.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "18.1 - Hacer clic en Guardar", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 2.0], [1300.0, 1.0], [700.0, 4.0], [800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "20.1 - Hacer clic en el icono de editar Facturacion", "isController": false}, {"data": [[300.0, 4.0], [400.0, 3.0], [200.0, 3.0]], "isOverall": false, "label": "T.43 - Seleccionar el Objeto asegurado", "isController": true}, {"data": [[21300.0, 1.0], [21200.0, 1.0], [21100.0, 1.0], [22200.0, 1.0], [21900.0, 1.0], [22600.0, 1.0], [23000.0, 1.0], [22800.0, 1.0], [23700.0, 1.0], [23900.0, 1.0]], "isOverall": false, "label": "19.1 - Hacer clic en siguiente", "isController": false}, {"data": [[600.0, 2.0], [700.0, 1.0], [200.0, 1.0], [500.0, 6.0]], "isOverall": false, "label": "T.48 - Seleccionar la Dimensi\u00F3n de franquicia", "isController": true}, {"data": [[300.0, 2.0], [400.0, 1.0], [800.0, 2.0], [200.0, 1.0], [900.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "30.3 - Ingresar Identificacion Seleccionar y Ok", "isController": false}, {"data": [[347200.0, 1.0], [351200.0, 1.0], [355500.0, 1.0], [354300.0, 1.0], [361800.0, 1.0], [367000.0, 1.0], [367200.0, 1.0], [374200.0, 1.0], [370600.0, 1.0], [366900.0, 1.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [1300.0, 2.0], [1500.0, 1.0], [800.0, 1.0], [1600.0, 1.0], [900.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "62.1 - Hacer clic en Cotizaci\u00F3n aceptada", "isController": false}, {"data": [[300.0, 1.0], [1700.0, 4.0], [1800.0, 3.0], [1900.0, 2.0]], "isOverall": false, "label": "47.1 - Ingresar el Valor de franquicia", "isController": false}, {"data": [[300.0, 5.0], [400.0, 2.0], [200.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "44.1 - Seleccionar el Nombre de cobertura", "isController": false}, {"data": [[8500.0, 1.0], [8300.0, 2.0], [8700.0, 1.0], [6600.0, 1.0], [6800.0, 1.0], [7000.0, 1.0], [7600.0, 1.0], [7900.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "52.1 - 1400 Transporte Terrestre Anual Hacer clic en Siguiente", "isController": false}, {"data": [[400.0, 8.0], [500.0, 2.0]], "isOverall": false, "label": "38.2 - Hacer clic en Guardar", "isController": false}, {"data": [[2200.0, 1.0], [1500.0, 1.0], [1600.0, 2.0], [1800.0, 2.0], [2000.0, 4.0]], "isOverall": false, "label": "35.2 - Cerrar Objeto-363", "isController": false}, {"data": [[2400.0, 1.0], [1300.0, 1.0], [2600.0, 3.0], [2700.0, 1.0], [3100.0, 1.0], [3500.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "58.1 - Calculo de Prima Guardar", "isController": false}, {"data": [[600.0, 1.0], [400.0, 1.0], [500.0, 8.0]], "isOverall": false, "label": "6.3 - Ingresar identificacion y Buscar", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0], [400.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "64.4 - Cerrar Insis", "isController": false}, {"data": [[33600.0, 1.0], [26900.0, 1.0], [28000.0, 1.0], [28500.0, 1.0], [29200.0, 1.0], [28700.0, 1.0], [30000.0, 1.0], [30900.0, 1.0], [31400.0, 1.0], [32700.0, 1.0]], "isOverall": false, "label": "T.9 - Polizas relacionadas Hacer clic en Siguiente", "isController": true}, {"data": [[1100.0, 2.0], [1200.0, 2.0], [1300.0, 5.0], [1400.0, 1.0]], "isOverall": false, "label": "52.2 - 1400 Transporte Terrestre Anual Hacer clic en Siguiente", "isController": false}, {"data": [[16400.0, 1.0], [16700.0, 1.0], [9700.0, 1.0], [9600.0, 2.0], [10500.0, 1.0], [20800.0, 1.0], [21600.0, 1.0], [7100.0, 1.0], [14200.0, 1.0]], "isOverall": false, "label": "T.8 - En Historial Hacer clic en Siguiente", "isController": true}, {"data": [[5300.0, 1.0], [5500.0, 1.0], [5700.0, 1.0], [5900.0, 1.0], [6400.0, 1.0], [7100.0, 2.0], [7400.0, 1.0], [7300.0, 2.0]], "isOverall": false, "label": "53.1 - Hacer clic en Siguiente", "isController": false}, {"data": [[8300.0, 1.0], [4200.0, 1.0], [9700.0, 1.0], [10700.0, 1.0], [11200.0, 1.0], [11300.0, 1.0], [6100.0, 1.0], [11900.0, 1.0], [6200.0, 1.0], [6500.0, 1.0]], "isOverall": false, "label": "41.1 - Hacer clic en Siguiente", "isController": false}, {"data": [[1200.0, 1.0], [1300.0, 1.0], [1400.0, 2.0], [1500.0, 3.0], [1600.0, 2.0], [1900.0, 1.0]], "isOverall": false, "label": "T.36 - Hacer clic en el \u00EDcono de Editar", "isController": true}, {"data": [[600.0, 2.0], [400.0, 2.0], [500.0, 6.0]], "isOverall": false, "label": "33.2 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [300.0, 1.0], [1400.0, 2.0], [700.0, 1.0], [800.0, 1.0], [900.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "33.5 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[4200.0, 2.0], [2800.0, 1.0], [2900.0, 1.0], [3000.0, 2.0], [3100.0, 1.0], [3700.0, 1.0], [3800.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "50.1 - Hacer clic en Premium", "isController": false}, {"data": [[600.0, 1.0], [300.0, 2.0], [400.0, 3.0], [200.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "5.3 - Hacer clic en Crear cotizacion", "isController": false}, {"data": [[400.0, 9.0], [7400.0, 1.0]], "isOverall": false, "label": "41.2 - Hacer clic en Siguiente", "isController": false}, {"data": [[300.0, 2.0], [600.0, 1.0], [700.0, 1.0], [200.0, 4.0], [500.0, 2.0]], "isOverall": false, "label": "62.3 - Hacer clic en Cotizaci\u00F3n aceptada", "isController": false}, {"data": [[8400.0, 1.0], [8500.0, 1.0], [8800.0, 1.0], [8900.0, 1.0], [9100.0, 1.0], [9400.0, 1.0], [10600.0, 1.0], [11100.0, 1.0], [12500.0, 1.0], [12600.0, 1.0]], "isOverall": false, "label": "T.18- Hacer clic en Guardar", "isController": true}, {"data": [[600.0, 1.0], [300.0, 1.0], [800.0, 3.0], [400.0, 1.0], [900.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "13.4 - Seleccionar agente ok ", "isController": false}, {"data": [[300.0, 3.0], [200.0, 6.0], [400.0, 1.0]], "isOverall": false, "label": "T.45 - Seleccionar el Tipo de franquicia", "isController": true}, {"data": [[600.0, 2.0], [500.0, 8.0]], "isOverall": false, "label": "55.2 - Impuestos Hacer clic en Siguiente", "isController": false}, {"data": [[9300.0, 1.0], [9700.0, 2.0], [9400.0, 1.0], [9500.0, 1.0], [10300.0, 1.0], [6800.0, 1.0], [7000.0, 1.0], [7100.0, 1.0], [7200.0, 1.0]], "isOverall": false, "label": "51.1 - Hacer clic en Siguiente", "isController": false}, {"data": [[9200.0, 2.0], [9100.0, 1.0], [10000.0, 1.0], [20300.0, 1.0], [21100.0, 1.0], [6600.0, 1.0], [13800.0, 1.0], [15900.0, 1.0], [16300.0, 1.0]], "isOverall": false, "label": "8.1 - En Historial Hacer clic en Siguiente", "isController": false}, {"data": [[600.0, 5.0], [700.0, 1.0], [800.0, 1.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "13.2 - Seleccionar agente ok ", "isController": false}, {"data": [[1200.0, 1.0], [1300.0, 1.0], [1400.0, 2.0], [1500.0, 3.0], [1600.0, 2.0], [1900.0, 1.0]], "isOverall": false, "label": "36.1 - Hacer clic en el \u00EDcono de Editar", "isController": false}, {"data": [[4400.0, 1.0], [2200.0, 1.0], [2400.0, 1.0], [2600.0, 1.0], [1300.0, 1.0], [1700.0, 1.0], [3800.0, 1.0], [1900.0, 2.0], [4000.0, 1.0]], "isOverall": false, "label": "T.34 - Grabar Objeto", "isController": true}, {"data": [[1200.0, 1.0], [1300.0, 3.0], [1400.0, 5.0], [1500.0, 1.0]], "isOverall": false, "label": "51.2 - Hacer clic en Siguiente", "isController": false}, {"data": [[8200.0, 2.0], [16400.0, 1.0], [9200.0, 1.0], [9000.0, 1.0], [18400.0, 1.0], [10200.0, 1.0], [11000.0, 1.0], [7500.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "25.1 - Hacer clic en Guardar", "isController": false}, {"data": [[9200.0, 1.0], [8900.0, 1.0], [9700.0, 1.0], [9500.0, 1.0], [6100.0, 1.0], [6200.0, 1.0], [400.0, 8.0], [7300.0, 2.0], [7600.0, 1.0], [500.0, 2.0], [8000.0, 1.0]], "isOverall": false, "label": "40.1 - Hacer clic en Siguiente", "isController": false}, {"data": [[400.0, 7.0], [500.0, 3.0]], "isOverall": false, "label": "49.2 - Hacer clic en Guardar", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [1300.0, 1.0], [1400.0, 1.0], [700.0, 2.0], [400.0, 1.0], [900.0, 1.0], [1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "33.7 -Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[600.0, 5.0], [700.0, 1.0], [900.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "42.1 - Crear Deducible", "isController": false}, {"data": [[5500.0, 1.0], [6000.0, 2.0], [11900.0, 1.0], [12400.0, 1.0], [6600.0, 1.0], [7600.0, 2.0], [7700.0, 1.0], [7900.0, 1.0]], "isOverall": false, "label": "56.1 - Clausulas Hacer clic en Siguiente", "isController": false}, {"data": [[8400.0, 1.0], [8200.0, 1.0], [9500.0, 1.0], [5100.0, 1.0], [10400.0, 1.0], [10700.0, 1.0], [5700.0, 1.0], [6500.0, 1.0], [7200.0, 1.0], [7900.0, 1.0]], "isOverall": false, "label": "14 .1 - Hacer clic en Guardar", "isController": false}, {"data": [[300.0, 1.0], [600.0, 2.0], [700.0, 3.0], [900.0, 1.0], [500.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "T.4 - Hacer clic en Control de polizas", "isController": true}, {"data": [[8200.0, 2.0], [8400.0, 2.0], [8700.0, 1.0], [9600.0, 1.0], [6300.0, 1.0], [7600.0, 2.0], [7800.0, 1.0]], "isOverall": false, "label": "17.2 - Seleccionar el Nombre de producto ok", "isController": false}, {"data": [[600.0, 1.0], [500.0, 9.0]], "isOverall": false, "label": "54.2 - Comisiones Hacer clic en Siguiente", "isController": false}, {"data": [[2100.0, 2.0], [2200.0, 2.0], [2800.0, 2.0], [3300.0, 1.0], [3200.0, 1.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "T.30 - Ingresar Identificacion Seleccionar y Ok", "isController": true}, {"data": [[1200.0, 1.0], [400.0, 9.0]], "isOverall": false, "label": "1.1 - Index", "isController": false}, {"data": [[300.0, 4.0], [600.0, 1.0], [200.0, 3.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "4.1 - Hacer clic en Control de polizas", "isController": false}, {"data": [[8800.0, 1.0], [10100.0, 1.0], [11700.0, 1.0], [6500.0, 1.0], [6900.0, 1.0], [7000.0, 1.0], [7900.0, 1.0], [7700.0, 1.0], [7800.0, 2.0]], "isOverall": false, "label": "T.6 - Ingresar identificacion y Buscar", "isController": true}, {"data": [[4100.0, 2.0], [4600.0, 1.0], [4800.0, 3.0], [4700.0, 1.0], [3900.0, 3.0]], "isOverall": false, "label": "T.16 - Hacer clic en Cotizacion nueva", "isController": true}, {"data": [[5000.0, 1.0], [2900.0, 1.0], [3200.0, 1.0], [6800.0, 1.0], [6700.0, 1.0], [3500.0, 1.0], [7500.0, 2.0], [3900.0, 1.0], [7700.0, 1.0]], "isOverall": false, "label": "T.2 - Ingresar a INSIS", "isController": true}, {"data": [[700.0, 4.0], [800.0, 1.0], [900.0, 4.0], [1000.0, 1.0]], "isOverall": false, "label": "30.2 - Ingresar Identificacion Seleccionar y Ok", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [1400.0, 1.0], [700.0, 1.0], [1500.0, 1.0], [1000.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "22.1 - Seleccionar el Numero de pagos", "isController": false}, {"data": [[300.0, 3.0], [600.0, 1.0], [700.0, 1.0], [400.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "21.1 - Hacer clic en el icono de editar Facturacion", "isController": false}, {"data": [[300.0, 2.0], [100.0, 1.0], [200.0, 5.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "4.2 - Hacer clic en Control de polizas", "isController": false}, {"data": [[600.0, 2.0], [300.0, 1.0], [700.0, 1.0], [400.0, 3.0], [1900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "29.3 - Ingresar Identificacion Buscar", "isController": false}, {"data": [[1100.0, 3.0], [1200.0, 1.0], [800.0, 1.0], [900.0, 2.0], [1000.0, 3.0]], "isOverall": false, "label": "10.1 - Hacer clic en Agente Crear", "isController": false}, {"data": [[6200.0, 1.0], [6300.0, 1.0], [6600.0, 1.0], [6400.0, 1.0], [6900.0, 1.0], [7900.0, 1.0], [7700.0, 1.0], [7800.0, 1.0], [8100.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "T.53 - Hacer clic en Siguiente", "isController": true}, {"data": [[300.0, 2.0], [600.0, 1.0], [700.0, 2.0], [400.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "2.1 - Ingresar a INSIS", "isController": false}, {"data": [[8300.0, 1.0], [1100.0, 1.0], [600.0, 2.0], [400.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "27.2 - Hacer clic en Crear", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [800.0, 2.0], [400.0, 4.0], [500.0, 2.0]], "isOverall": false, "label": "T.63 - Hacer clic en Proceder", "isController": true}, {"data": [[11700.0, 1.0], [12200.0, 2.0], [12500.0, 1.0], [6500.0, 1.0], [6600.0, 1.0], [6400.0, 1.0], [6900.0, 2.0], [14400.0, 1.0]], "isOverall": false, "label": "T.55 - Impuestos Hacer clic en Siguiente", "isController": true}, {"data": [[1100.0, 2.0], [800.0, 1.0], [900.0, 6.0], [1000.0, 1.0]], "isOverall": false, "label": "18.2 - Hacer clic en Guardar", "isController": false}, {"data": [[22100.0, 1.0], [22000.0, 2.0], [23300.0, 2.0], [22800.0, 1.0], [24400.0, 1.0], [23900.0, 1.0], [23600.0, 1.0], [24700.0, 1.0]], "isOverall": false, "label": "T.19 - Hacer clic en siguiente", "isController": true}, {"data": [[300.0, 1.0], [200.0, 8.0], [100.0, 1.0]], "isOverall": false, "label": "63.2 - Hacer clic en Proceder", "isController": false}, {"data": [[1300.0, 7.0], [1600.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "16.2 - Hacer clic en Cotizacion nueva", "isController": false}, {"data": [[700.0, 2.0], [800.0, 2.0], [900.0, 3.0], [1000.0, 3.0]], "isOverall": false, "label": "17.3 - Seleccionar el Nombre de producto ok", "isController": false}, {"data": [[1100.0, 4.0], [1200.0, 3.0], [600.0, 1.0], [700.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "33.3 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[4700.0, 1.0], [5200.0, 1.0], [2900.0, 1.0], [3100.0, 2.0], [3200.0, 1.0], [3300.0, 1.0], [3500.0, 2.0], [3800.0, 1.0]], "isOverall": false, "label": "T.59 - Calculo de Prima Premium", "isController": true}, {"data": [[600.0, 2.0], [700.0, 2.0], [400.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "11.3 - Buscar Agente", "isController": false}, {"data": [[4200.0, 1.0], [4100.0, 1.0], [2500.0, 1.0], [2700.0, 1.0], [3000.0, 1.0], [3100.0, 1.0], [3400.0, 2.0], [3600.0, 2.0]], "isOverall": false, "label": "T.64 - Cerrar Insis", "isController": true}, {"data": [[2300.0, 2.0], [2200.0, 1.0], [2500.0, 1.0], [2700.0, 1.0], [2900.0, 1.0], [3000.0, 2.0], [3100.0, 1.0], [3200.0, 1.0]], "isOverall": false, "label": "T.13 - Seleccionar agente ok ", "isController": true}, {"data": [[2500.0, 1.0], [2600.0, 1.0], [2900.0, 1.0], [3000.0, 1.0], [3100.0, 2.0], [3200.0, 2.0], [3400.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "T.35 - Cerrar Objeto", "isController": true}, {"data": [[8600.0, 1.0], [8200.0, 1.0], [8800.0, 1.0], [8900.0, 1.0], [9400.0, 1.0], [9700.0, 1.0], [10100.0, 1.0], [5700.0, 1.0], [6000.0, 1.0], [7900.0, 1.0]], "isOverall": false, "label": "T.33 - Hacer clic en A\u00F1adir objeto", "isController": true}, {"data": [[1200.0, 1.0], [1300.0, 1.0], [1500.0, 1.0], [800.0, 1.0], [900.0, 2.0], [1000.0, 4.0]], "isOverall": false, "label": "12.1 - Hacer clic en buscar", "isController": false}, {"data": [[4200.0, 2.0], [2800.0, 1.0], [2900.0, 1.0], [3000.0, 2.0], [3100.0, 1.0], [3700.0, 1.0], [3800.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "T.50 - Hacer clic en Premium", "isController": true}, {"data": [[1200.0, 1.0], [700.0, 1.0], [800.0, 2.0], [400.0, 2.0], [900.0, 1.0], [1000.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "T.24 - Seleccionar el Modo de pago", "isController": true}, {"data": [[2600.0, 2.0], [1400.0, 1.0], [2900.0, 1.0], [3100.0, 3.0], [3200.0, 1.0], [3600.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "T.58 - Calculo de Prima Guardar", "isController": true}, {"data": [[4700.0, 1.0], [5200.0, 1.0], [2900.0, 1.0], [3100.0, 2.0], [3200.0, 1.0], [3300.0, 1.0], [3500.0, 2.0], [3800.0, 1.0]], "isOverall": false, "label": "59.1 - Calculo de Prima Premium", "isController": false}, {"data": [[1200.0, 1.0], [700.0, 1.0], [800.0, 2.0], [400.0, 2.0], [900.0, 1.0], [1000.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "24.1 - Seleccionar el Modo de pago", "isController": false}, {"data": [[8400.0, 1.0], [9000.0, 1.0], [9100.0, 1.0], [9200.0, 1.0], [9700.0, 1.0], [9600.0, 2.0], [10000.0, 1.0], [7900.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "T.52 - 1400 Transporte Terrestre Anual Hacer clic en Siguiente", "isController": true}, {"data": [[4600.0, 1.0], [4900.0, 2.0], [5100.0, 3.0], [5400.0, 1.0], [5600.0, 1.0], [5700.0, 1.0], [6100.0, 1.0]], "isOverall": false, "label": "39.1 - Hacer clic en Premium", "isController": false}, {"data": [[300.0, 1.0], [1700.0, 4.0], [1800.0, 3.0], [1900.0, 2.0]], "isOverall": false, "label": "T.47 - Ingresar el Valor de franquicia", "isController": true}, {"data": [[1100.0, 1.0], [600.0, 2.0], [700.0, 1.0], [900.0, 1.0], [1000.0, 5.0]], "isOverall": false, "label": "17.1 - Seleccionar el Nombre de producto ok", "isController": false}, {"data": [[600.0, 3.0], [700.0, 5.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "61.2 - Hacer clic en Cotizacion a cliente", "isController": false}, {"data": [[600.0, 1.0], [700.0, 2.0], [400.0, 2.0], [500.0, 5.0]], "isOverall": false, "label": "5.2 - Hacer clic en Crear cotizacion", "isController": false}, {"data": [[100.0, 9.0], [200.0, 1.0]], "isOverall": false, "label": "64.1 - Cerrar Insis-2", "isController": false}, {"data": [[100.0, 1.0], [400.0, 1.0], [500.0, 8.0]], "isOverall": false, "label": "58.2 - Calculo de Prima Guardar", "isController": false}, {"data": [[600.0, 2.0], [700.0, 2.0], [500.0, 6.0]], "isOverall": false, "label": "64.1 - Cerrar Insis-1", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 1.0], [1200.0, 1.0], [1300.0, 1.0], [700.0, 2.0], [800.0, 1.0], [900.0, 1.0], [1900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "30.1 - Ingresar Identificacion Seleccionar y Ok", "isController": false}, {"data": [[2100.0, 1.0], [1200.0, 1.0], [1400.0, 1.0], [2700.0, 1.0], [1500.0, 1.0], [1700.0, 2.0], [1800.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "64.1 - Cerrar Insis-0", "isController": false}, {"data": [[600.0, 5.0], [700.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "14.2 - Hacer clic en Guardar", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 1.0], [600.0, 2.0], [300.0, 1.0], [800.0, 2.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "33.8 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[300.0, 5.0], [200.0, 2.0], [400.0, 3.0]], "isOverall": false, "label": "3.1 - Hacer clic en Operaciones del sistema", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 2.0], [1300.0, 1.0], [700.0, 4.0], [800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "T.20 - Hacer clic en el icono de editar Facturacion", "isController": true}, {"data": [[4300.0, 2.0], [4400.0, 1.0], [5200.0, 1.0], [5600.0, 1.0], [5700.0, 2.0], [5900.0, 1.0], [6500.0, 2.0]], "isOverall": false, "label": "T.38 - Hacer clic en Guardar", "isController": true}, {"data": [[600.0, 2.0], [800.0, 2.0], [400.0, 1.0], [900.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "T.23 - Seleccionar el Dia de pago", "isController": true}, {"data": [[1100.0, 1.0], [600.0, 2.0], [700.0, 2.0], [200.0, 2.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "T.37 - Ingresar el valor asegurado", "isController": true}, {"data": [[8400.0, 1.0], [600.0, 4.0], [2400.0, 1.0], [1200.0, 1.0], [700.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "25.2 - Hacer clic en Guardar", "isController": false}, {"data": [[300.0, 3.0], [600.0, 1.0], [700.0, 1.0], [400.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "T.21 - Hacer clic en el icono de editar Facturacion", "isController": true}, {"data": [[600.0, 2.0], [1300.0, 1.0], [700.0, 2.0], [800.0, 2.0], [900.0, 1.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "13.1 - Seleccionar agente ok ", "isController": false}, {"data": [[100.0, 3.0], [200.0, 7.0]], "isOverall": false, "label": "64.3 - Cerrar Insis-1", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0], [100.0, 8.0]], "isOverall": false, "label": "64.3 - Cerrar Insis-0", "isController": false}, {"data": [[4300.0, 1.0], [4400.0, 1.0], [4600.0, 1.0], [5100.0, 1.0], [5200.0, 1.0], [5900.0, 1.0], [6000.0, 1.0], [3700.0, 1.0], [3900.0, 2.0]], "isOverall": false, "label": "T.49 - Hacer clic en Guardar", "isController": true}, {"data": [[4100.0, 1.0], [4200.0, 1.0], [4300.0, 1.0], [5700.0, 1.0], [6100.0, 1.0], [3300.0, 1.0], [3400.0, 1.0], [7200.0, 1.0], [3900.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "T.28 - Hacer clic en el \u00EDcono de Buscar", "isController": true}, {"data": [[2100.0, 3.0], [2200.0, 1.0], [2400.0, 2.0], [2600.0, 1.0], [1400.0, 2.0], [1800.0, 1.0]], "isOverall": false, "label": "T.62 - Hacer clic en Cotizaci\u00F3n aceptada", "isController": true}, {"data": [[600.0, 1.0], [700.0, 2.0], [800.0, 4.0], [900.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "19 .2- Hacer clic en siguiente", "isController": false}, {"data": [[19000.0, 1.0], [20900.0, 1.0], [21300.0, 1.0], [21000.0, 1.0], [22200.0, 2.0], [22300.0, 1.0], [22000.0, 1.0], [21800.0, 1.0], [23600.0, 1.0]], "isOverall": false, "label": "9.1 - Polizas relacionadas Hacer clic en Siguiente", "isController": false}, {"data": [[9100.0, 1.0], [9300.0, 1.0], [9700.0, 2.0], [5500.0, 1.0], [6000.0, 1.0], [6900.0, 2.0], [7500.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "57.1 - Informacion del cliente  Hacer clic en Siguiente", "isController": false}, {"data": [[700.0, 4.0], [800.0, 5.0], [900.0, 1.0]], "isOverall": false, "label": "31.2 - Hacer clic en Guardar", "isController": false}, {"data": [[8500.0, 1.0], [8600.0, 1.0], [9200.0, 1.0], [9100.0, 1.0], [9400.0, 1.0], [9300.0, 1.0], [6700.0, 1.0], [7100.0, 1.0], [7600.0, 1.0], [7700.0, 1.0]], "isOverall": false, "label": "T.54 - Comisiones Hacer clic en Siguiente", "isController": true}, {"data": [[9000.0, 1.0], [9200.0, 1.0], [19000.0, 1.0], [10200.0, 1.0], [10600.0, 1.0], [11300.0, 1.0], [24400.0, 1.0], [24000.0, 1.0], [24800.0, 1.0], [13000.0, 1.0]], "isOverall": false, "label": "32.1 - Hacer clic en Siguiente", "isController": false}, {"data": [[4600.0, 1.0], [4700.0, 1.0], [5400.0, 1.0], [5500.0, 1.0], [3200.0, 1.0], [3400.0, 1.0], [3500.0, 1.0], [3800.0, 1.0], [3900.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "49.1 - Hacer clic en Guardar", "isController": false}, {"data": [[8700.0, 1.0], [9700.0, 1.0], [9800.0, 1.0], [10300.0, 2.0], [6000.0, 1.0], [6500.0, 1.0], [7400.0, 2.0], [8000.0, 1.0]], "isOverall": false, "label": "T.57 - Informacion del cliente  Hacer clic en Siguiente", "isController": true}, {"data": [[2100.0, 1.0], [1200.0, 1.0], [9300.0, 1.0], [1300.0, 2.0], [1400.0, 1.0], [1500.0, 2.0], [1600.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "T.27 - Hacer clic en Crear", "isController": true}, {"data": [[2500.0, 1.0], [2800.0, 1.0], [5800.0, 2.0], [3000.0, 1.0], [6300.0, 1.0], [6500.0, 2.0], [3800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "2.2 - Ingresar a INSIS", "isController": false}, {"data": [[8300.0, 1.0], [8900.0, 2.0], [9100.0, 1.0], [5200.0, 1.0], [5900.0, 1.0], [6300.0, 1.0], [6800.0, 1.0], [7300.0, 1.0], [7900.0, 1.0]], "isOverall": false, "label": "5.1 - Hacer clic en Crear cotizacion", "isController": false}, {"data": [[18300.0, 1.0], [17700.0, 1.0], [9200.0, 1.0], [18900.0, 1.0], [19400.0, 1.0], [22600.0, 1.0], [12500.0, 1.0], [12900.0, 1.0], [14200.0, 1.0], [14800.0, 1.0]], "isOverall": false, "label": "7.1 - Crear Cotizacion Siguiente", "isController": false}, {"data": [[600.0, 1.0], [400.0, 9.0]], "isOverall": false, "label": "2.3 - Ingresar a INSIS", "isController": false}, {"data": [[9500.0, 1.0], [19400.0, 1.0], [9800.0, 1.0], [10700.0, 1.0], [11100.0, 1.0], [11900.0, 1.0], [24500.0, 1.0], [24900.0, 1.0], [25300.0, 1.0], [13600.0, 1.0]], "isOverall": false, "label": "T.32 - Hacer clic en Siguiente", "isController": true}, {"data": [[1100.0, 2.0], [1200.0, 1.0], [400.0, 1.0], [900.0, 4.0], [1000.0, 2.0]], "isOverall": false, "label": "16.4 - Hacer clic en Cotizacion nueva", "isController": false}, {"data": [[1100.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [1600.0, 2.0], [1700.0, 1.0], [1800.0, 3.0], [1900.0, 1.0]], "isOverall": false, "label": "16.1 - Hacer clic en Cotizacion nueva", "isController": false}, {"data": [[400.0, 2.0], [500.0, 8.0]], "isOverall": false, "label": "56.2 - Clausulas Hacer clic en Siguiente", "isController": false}, {"data": [[8600.0, 1.0], [8400.0, 1.0], [9100.0, 2.0], [9000.0, 2.0], [9700.0, 2.0], [14700.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "T.31 - Hacer clic en Guardar", "isController": true}, {"data": [[1100.0, 1.0], [600.0, 2.0], [700.0, 2.0], [200.0, 2.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "37- Ingresar el valor asegurado", "isController": false}, {"data": [[8700.0, 1.0], [4700.0, 1.0], [19400.0, 1.0], [10100.0, 1.0], [11200.0, 1.0], [11700.0, 1.0], [11800.0, 1.0], [6500.0, 1.0], [6700.0, 1.0], [7000.0, 1.0]], "isOverall": false, "label": "T.41 - Hacer clic en Siguiente", "isController": true}, {"data": [[600.0, 4.0], [300.0, 1.0], [700.0, 1.0], [400.0, 1.0], [200.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "11.1 - Buscar Agente", "isController": false}, {"data": [[8600.0, 1.0], [4700.0, 1.0], [10100.0, 1.0], [5200.0, 1.0], [700.0, 1.0], [11300.0, 1.0], [5800.0, 1.0], [11900.0, 1.0], [11800.0, 1.0], [6500.0, 1.0]], "isOverall": false, "label": "T.46 - Seleccionar el reclamo de franquicia", "isController": true}, {"data": [[8300.0, 1.0], [8500.0, 2.0], [8200.0, 1.0], [10700.0, 1.0], [11100.0, 2.0], [10900.0, 2.0], [11800.0, 1.0]], "isOverall": false, "label": "T.51 - Hacer clic en Siguiente", "isController": true}, {"data": [[8300.0, 1.0], [4200.0, 1.0], [4600.0, 1.0], [5100.0, 1.0], [9800.0, 1.0], [10700.0, 1.0], [11200.0, 2.0], [6200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "46.2 - Seleccionar el reclamo de franquicia", "isController": false}, {"data": [[600.0, 1.0], [300.0, 6.0], [200.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "6.1 - Ingresar identificacion y Buscar", "isController": false}, {"data": [[400.0, 2.0], [500.0, 8.0]], "isOverall": false, "label": "7.2 - Crear Cotizacion Siguiente", "isController": false}, {"data": [[2200.0, 1.0], [1100.0, 1.0], [1300.0, 1.0], [1400.0, 2.0], [2800.0, 1.0], [1500.0, 1.0], [1700.0, 1.0], [1800.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "28.1 - Hacer clic en el \u00EDcono de Buscar", "isController": false}, {"data": [[2100.0, 1.0], [1200.0, 1.0], [1300.0, 1.0], [1400.0, 2.0], [3300.0, 1.0], [1600.0, 1.0], [3500.0, 1.0], [1900.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": "34.1 - Grabar Objeto", "isController": false}, {"data": [[600.0, 3.0], [300.0, 1.0], [200.0, 2.0], [500.0, 4.0]], "isOverall": false, "label": "46.1 - Seleccionar el reclamo de franquicia", "isController": false}, {"data": [[2100.0, 1.0], [1100.0, 4.0], [600.0, 1.0], [1300.0, 1.0], [1400.0, 2.0], [800.0, 1.0]], "isOverall": false, "label": "29.2 - Ingresar Identificacion Buscar", "isController": false}, {"data": [[8200.0, 1.0], [8500.0, 1.0], [6000.0, 1.0], [12400.0, 1.0], [6500.0, 2.0], [13000.0, 1.0], [7000.0, 1.0], [8100.0, 2.0]], "isOverall": false, "label": "T.56 - Clausulas Hacer clic en Siguiente", "isController": true}, {"data": [[300.0, 5.0], [200.0, 2.0], [400.0, 3.0]], "isOverall": false, "label": "T.3 - Hacer clic en Operaciones del sistema", "isController": true}, {"data": [[300.0, 4.0], [400.0, 3.0], [200.0, 3.0]], "isOverall": false, "label": "43.1 - Seleccionar el Objeto asegurado", "isController": false}, {"data": [[600.0, 2.0], [700.0, 1.0], [200.0, 1.0], [500.0, 6.0]], "isOverall": false, "label": "48.1 - Seleccionar la Dimensi\u00F3n de franquicia", "isController": false}, {"data": [[600.0, 1.0], [500.0, 9.0]], "isOverall": false, "label": "57.2 - Informacion del cliente  Hacer clic en Siguiente", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[2200.0, 1.0], [2400.0, 2.0], [2500.0, 2.0], [2600.0, 1.0], [2700.0, 1.0], [3200.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "T.11 - Buscar Agente", "isController": true}, {"data": [[9400.0, 1.0], [9700.0, 2.0], [10200.0, 1.0], [10100.0, 1.0], [10400.0, 2.0], [10600.0, 1.0], [11100.0, 1.0], [7900.0, 1.0]], "isOverall": false, "label": "T.17 - Seleccionar el Nombre de producto ok", "isController": true}, {"data": [[1200.0, 3.0], [1400.0, 4.0], [1500.0, 1.0], [1600.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "T.10 - Hacer clic en Agente Crear", "isController": true}, {"data": [[8700.0, 1.0], [8600.0, 1.0], [8400.0, 1.0], [8900.0, 1.0], [6200.0, 1.0], [6500.0, 1.0], [7000.0, 1.0], [7100.0, 1.0], [8000.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "54.1 - Comisiones Hacer clic en Siguiente", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 374200.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 418.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 661.0, "series": [{"data": [[0.0, 431.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 661.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 418.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 7.030054644808745, "minX": 1.5963567E12, "maxY": 10.0, "series": [{"data": [[1.59635682E12, 10.0], [1.5963567E12, 8.21259842519685], [1.596357E12, 10.0], [1.59635706E12, 7.030054644808745], [1.59635688E12, 10.0], [1.59635694E12, 10.0], [1.59635676E12, 10.0]], "isOverall": false, "label": "2- Thread Group_Cotizacion", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59635706E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 5.0, "maxY": 374265.0, "series": [{"data": [[20.0, 674.2]], "isOverall": false, "label": "T.42 - Crear Deducible", "isController": true}, {"data": [[20.0, 674.2]], "isOverall": false, "label": "T.42 - Crear Deducible-Aggregated", "isController": true}, {"data": [[20.0, 399.5], [21.0, 610.0], [24.0, 491.5], [26.0, 501.0]], "isOverall": false, "label": "34.2 - Grabar Objeto", "isController": false}, {"data": [[22.3, 467.49999999999994]], "isOverall": false, "label": "34.2 - Grabar Objeto-Aggregated", "isController": false}, {"data": [[30.0, 666.4]], "isOverall": false, "label": "11.2 - Buscar Agente", "isController": false}, {"data": [[30.0, 666.4]], "isOverall": false, "label": "11.2 - Buscar Agente-Aggregated", "isController": false}, {"data": [[30.0, 688.6999999999999]], "isOverall": false, "label": "29.1 - Ingresar Identificacion", "isController": false}, {"data": [[30.0, 688.6999999999999]], "isOverall": false, "label": "29.1 - Ingresar Identificacion-Aggregated", "isController": false}, {"data": [[30.0, 646.3000000000001]], "isOverall": false, "label": "13.3 - Seleccionar agente ok ", "isController": false}, {"data": [[30.0, 646.3000000000001]], "isOverall": false, "label": "13.3 - Seleccionar agente ok -Aggregated", "isController": false}, {"data": [[30.0, 666.8]], "isOverall": false, "label": "23.3 - Seleccionar el Dia de pago", "isController": false}, {"data": [[30.0, 666.8]], "isOverall": false, "label": "23.3 - Seleccionar el Dia de pago-Aggregated", "isController": false}, {"data": [[30.0, 1464.9]], "isOverall": false, "label": "28.2 - Hacer clic en el \u00EDcono de Buscar", "isController": false}, {"data": [[30.0, 1464.9]], "isOverall": false, "label": "28.2 - Hacer clic en el \u00EDcono de Buscar-Aggregated", "isController": false}, {"data": [[18.0, 453.75], [20.0, 374.0], [15.0, 619.25]], "isOverall": false, "label": "60.3 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial", "isController": false}, {"data": [[17.2, 504.0]], "isOverall": false, "label": "60.3 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial-Aggregated", "isController": false}, {"data": [[16.0, 227.0], [17.0, 938.0], [18.0, 204.0], [19.0, 193.0], [20.0, 196.0], [12.0, 198.0], [14.0, 208.0], [15.0, 196.0]], "isOverall": false, "label": "64.2 - Cerrar Insis", "isController": false}, {"data": [[15.7, 276.6]], "isOverall": false, "label": "64.2 - Cerrar Insis-Aggregated", "isController": false}, {"data": [[16.0, 118.0], [17.0, 93.0], [18.0, 98.0], [19.0, 91.0], [20.0, 89.0], [12.0, 92.5], [14.0, 98.0], [15.0, 94.0]], "isOverall": false, "label": "64.2 - Cerrar Insis-0", "isController": false}, {"data": [[15.7, 96.39999999999999]], "isOverall": false, "label": "64.2 - Cerrar Insis-0-Aggregated", "isController": false}, {"data": [[16.0, 258.0], [18.0, 216.33333333333334], [20.0, 576.0], [14.0, 295.0]], "isOverall": false, "label": "63.1 - Hacer clic en Proceder", "isController": false}, {"data": [[16.6, 323.8999999999999]], "isOverall": false, "label": "63.1 - Hacer clic en Proceder-Aggregated", "isController": false}, {"data": [[20.0, 9096.6]], "isOverall": false, "label": "55.1 - Impuestos Hacer clic en Siguiente", "isController": false}, {"data": [[20.0, 9096.6]], "isOverall": false, "label": "55.1 - Impuestos Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[30.0, 574.1]], "isOverall": false, "label": "26.2 - Hacer clic en la pesta\u00F1a Participantes de la poliza", "isController": false}, {"data": [[30.0, 574.1]], "isOverall": false, "label": "26.2 - Hacer clic en la pesta\u00F1a Participantes de la poliza-Aggregated", "isController": false}, {"data": [[20.0, 5297.4]], "isOverall": false, "label": "T.39 - Hacer clic en Premium", "isController": true}, {"data": [[20.0, 5297.4]], "isOverall": false, "label": "T.39 - Hacer clic en Premium-Aggregated", "isController": true}, {"data": [[30.0, 603.5]], "isOverall": false, "label": "28.3 - Hacer clic en el \u00EDcono de Buscar", "isController": false}, {"data": [[30.0, 603.5]], "isOverall": false, "label": "28.3 - Hacer clic en el \u00EDcono de Buscar-Aggregated", "isController": false}, {"data": [[20.0, 2271.0], [23.0, 2500.0], [26.0, 2703.5]], "isOverall": false, "label": "33.1 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[25.1, 2639.8999999999996]], "isOverall": false, "label": "33.1 - Hacer clic en A\u00F1adir objeto-Aggregated", "isController": false}, {"data": [[18.0, 761.6666666666666], [19.0, 722.0], [20.0, 678.5], [15.0, 897.0]], "isOverall": false, "label": "60.2 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial", "isController": false}, {"data": [[17.3, 795.1999999999999]], "isOverall": false, "label": "60.2 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial-Aggregated", "isController": false}, {"data": [[16.0, 345.0], [18.0, 594.3333333333334], [20.0, 261.5], [14.0, 508.25]], "isOverall": false, "label": "62.2 - Hacer clic en Cotizaci\u00F3n aceptada-414", "isController": false}, {"data": [[16.6, 468.4]], "isOverall": false, "label": "62.2 - Hacer clic en Cotizaci\u00F3n aceptada-414-Aggregated", "isController": false}, {"data": [[20.0, 544.0], [22.0, 671.0], [23.0, 555.0], [24.0, 524.0], [25.0, 796.0]], "isOverall": false, "label": "35.1 - Cerrar Objeto", "isController": false}, {"data": [[21.8, 579.0]], "isOverall": false, "label": "35.1 - Cerrar Objeto-Aggregated", "isController": false}, {"data": [[30.0, 1149.7]], "isOverall": false, "label": "26.1 - Hacer clic en la pesta\u00F1a Participantes de la poliza", "isController": false}, {"data": [[30.0, 1149.7]], "isOverall": false, "label": "26.1 - Hacer clic en la pesta\u00F1a Participantes de la poliza-Aggregated", "isController": false}, {"data": [[16.0, 102.0], [19.0, 121.0], [10.0, 151.0], [22.0, 212.0], [6.0, 101.0], [13.0, 114.0], [26.0, 241.0], [7.0, 97.0], [29.0, 199.0], [30.0, 145.0]], "isOverall": false, "label": "1.2 - Index-0", "isController": false}, {"data": [[17.799999999999997, 148.29999999999998]], "isOverall": false, "label": "1.2 - Index-0-Aggregated", "isController": false}, {"data": [[30.0, 3332.6]], "isOverall": false, "label": "T.29 - Ingresar Identificacion Buscar", "isController": true}, {"data": [[30.0, 3332.6]], "isOverall": false, "label": "T.29 - Ingresar Identificacion Buscar-Aggregated", "isController": true}, {"data": [[16.0, 8602.5], [18.0, 7408.0], [19.0, 7285.0], [20.0, 6486.5], [15.0, 8787.5]], "isOverall": false, "label": "60.1 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial", "isController": false}, {"data": [[17.6, 7713.900000000001]], "isOverall": false, "label": "60.1 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial-Aggregated", "isController": false}, {"data": [[30.0, 968.4]], "isOverall": false, "label": "27.1 - Hacer clic en Crear", "isController": false}, {"data": [[30.0, 968.4]], "isOverall": false, "label": "27.1 - Hacer clic en Crear-Aggregated", "isController": false}, {"data": [[16.0, 194.0], [19.0, 218.0], [10.0, 234.0], [22.0, 220.0], [6.0, 211.0], [13.0, 219.0], [26.0, 263.0], [7.0, 201.0], [29.0, 342.0], [30.0, 247.0]], "isOverall": false, "label": "1.2 - Index-1", "isController": false}, {"data": [[17.799999999999997, 234.89999999999998]], "isOverall": false, "label": "1.2 - Index-1-Aggregated", "isController": false}, {"data": [[20.0, 418.0], [25.0, 483.0], [26.0, 509.125]], "isOverall": false, "label": "32.2 -  Hacer clic en Siguiente", "isController": false}, {"data": [[25.3, 497.4]], "isOverall": false, "label": "32.2 -  Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[20.0, 8495.0]], "isOverall": false, "label": "T.40 - Hacer clic en Siguiente", "isController": true}, {"data": [[20.0, 8495.0]], "isOverall": false, "label": "T.40 - Hacer clic en Siguiente-Aggregated", "isController": true}, {"data": [[30.0, 1595.3]], "isOverall": false, "label": "T.22 - Seleccionar el Numero de pagos", "isController": true}, {"data": [[30.0, 1595.3]], "isOverall": false, "label": "T.22 - Seleccionar el Numero de pagos-Aggregated", "isController": true}, {"data": [[20.0, 301.7]], "isOverall": false, "label": "45.1 - Seleccionar el Tipo de franquicia", "isController": false}, {"data": [[20.0, 301.7]], "isOverall": false, "label": "45.1 - Seleccionar el Tipo de franquicia-Aggregated", "isController": false}, {"data": [[18.0, 8552.0], [20.0, 7539.0], [15.0, 10211.25]], "isOverall": false, "label": "T.60 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial", "isController": true}, {"data": [[17.2, 9013.099999999999]], "isOverall": false, "label": "T.60 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial-Aggregated", "isController": true}, {"data": [[16.0, 706.0], [19.0, 831.0], [10.0, 882.0], [22.0, 916.0], [6.0, 1526.0], [13.0, 820.0], [26.0, 988.0], [7.0, 784.0], [29.0, 1040.0], [30.0, 864.0]], "isOverall": false, "label": "T.1 - Index", "isController": true}, {"data": [[17.799999999999997, 935.6999999999999]], "isOverall": false, "label": "T.1 - Index-Aggregated", "isController": true}, {"data": [[16.0, 109.0], [17.0, 844.0], [18.0, 105.0], [19.0, 102.0], [20.0, 107.0], [12.0, 105.5], [14.0, 109.0], [15.0, 102.0]], "isOverall": false, "label": "64.2 - Cerrar Insis-1", "isController": false}, {"data": [[15.7, 179.8]], "isOverall": false, "label": "64.2 - Cerrar Insis-1-Aggregated", "isController": false}, {"data": [[30.0, 849.5]], "isOverall": false, "label": "28.4 - Hacer clic en el \u00EDcono de Buscar", "isController": false}, {"data": [[30.0, 849.5]], "isOverall": false, "label": "28.4 - Hacer clic en el \u00EDcono de Buscar-Aggregated", "isController": false}, {"data": [[20.0, 518.0], [22.0, 699.0], [24.0, 1588.0], [26.0, 1251.0]], "isOverall": false, "label": "33.6 -Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[24.200000000000003, 1082.8999999999999]], "isOverall": false, "label": "33.6 -Hacer clic en A\u00F1adir objeto-Aggregated", "isController": false}, {"data": [[20.0, 677.5]], "isOverall": false, "label": "53.2 - Hacer clic en Siguiente", "isController": false}, {"data": [[20.0, 677.5]], "isOverall": false, "label": "53.2 - Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[30.0, 16635.100000000002]], "isOverall": false, "label": "T.7 - Crear Cotizacion Siguiente", "isController": true}, {"data": [[30.0, 16635.100000000002]], "isOverall": false, "label": "T.7 - Crear Cotizacion Siguiente-Aggregated", "isController": true}, {"data": [[30.0, 460.9]], "isOverall": false, "label": "16.3 - Hacer clic en Cotizacion nueva", "isController": false}, {"data": [[30.0, 460.9]], "isOverall": false, "label": "16.3 - Hacer clic en Cotizacion nueva-Aggregated", "isController": false}, {"data": [[16.0, 1794.0], [18.0, 1934.3333333333333], [20.0, 1890.5], [14.0, 1956.0], [15.0, 1925.5]], "isOverall": false, "label": "T.61 - Hacer clic en Cotizacion a cliente", "isController": true}, {"data": [[16.8, 1914.1]], "isOverall": false, "label": "T.61 - Hacer clic en Cotizacion a cliente-Aggregated", "isController": true}, {"data": [[16.0, 297.0], [19.0, 339.0], [10.0, 386.0], [22.0, 432.0], [6.0, 313.0], [13.0, 333.0], [26.0, 504.0], [7.0, 299.0], [29.0, 541.0], [30.0, 393.0]], "isOverall": false, "label": "1.2 - Index", "isController": false}, {"data": [[17.799999999999997, 383.70000000000005]], "isOverall": false, "label": "1.2 - Index-Aggregated", "isController": false}, {"data": [[30.0, 1131.1]], "isOverall": false, "label": "T.12 - Hacer clic en buscar", "isController": true}, {"data": [[30.0, 1131.1]], "isOverall": false, "label": "T.12 - Hacer clic en buscar-Aggregated", "isController": true}, {"data": [[17.0, 1065.0], [18.0, 1199.3333333333333], [20.0, 1288.5], [14.0, 1218.5], [15.0, 1148.0]], "isOverall": false, "label": "61.1 - Hacer clic en Cotizacion a cliente", "isController": false}, {"data": [[16.9, 1197.3]], "isOverall": false, "label": "61.1 - Hacer clic en Cotizacion a cliente-Aggregated", "isController": false}, {"data": [[30.0, 12377.699999999999]], "isOverall": false, "label": "T.25 - Hacer clic en Guardar", "isController": true}, {"data": [[30.0, 12377.699999999999]], "isOverall": false, "label": "T.25 - Hacer clic en Guardar-Aggregated", "isController": true}, {"data": [[16.0, 324.0], [17.0, 380.0], [18.0, 323.0], [19.0, 259.0], [20.0, 345.0], [11.0, 222.0], [12.0, 399.0], [14.0, 330.0], [15.0, 321.0]], "isOverall": false, "label": "64.3 - Cerrar Insis", "isController": false}, {"data": [[15.6, 323.3]], "isOverall": false, "label": "64.3 - Cerrar Insis-Aggregated", "isController": false}, {"data": [[20.0, 360.69999999999993]], "isOverall": false, "label": "44 - Seleccionar el Nombre de cobertura", "isController": true}, {"data": [[20.0, 360.69999999999993]], "isOverall": false, "label": "44 - Seleccionar el Nombre de cobertura-Aggregated", "isController": true}, {"data": [[30.0, 402.6]], "isOverall": false, "label": "10.2 - Hacer clic en Agente Crear", "isController": false}, {"data": [[30.0, 402.6]], "isOverall": false, "label": "10.2 - Hacer clic en Agente Crear-Aggregated", "isController": false}, {"data": [[16.0, 101.5], [18.0, 102.0], [24.0, 118.0], [29.0, 105.0], [30.0, 141.6]], "isOverall": false, "label": "2.2 - Ingresar a INSIS-0", "isController": false}, {"data": [[25.300000000000004, 123.6]], "isOverall": false, "label": "2.2 - Ingresar a INSIS-0-Aggregated", "isController": false}, {"data": [[16.0, 2565.0], [18.0, 1996.0], [24.0, 2909.0], [29.0, 3735.0], [30.0, 6101.6]], "isOverall": false, "label": "2.2 - Ingresar a INSIS-1", "isController": false}, {"data": [[25.300000000000004, 4427.8]], "isOverall": false, "label": "2.2 - Ingresar a INSIS-1-Aggregated", "isController": false}, {"data": [[30.0, 5312.4]], "isOverall": false, "label": "T.15 - Hacer clic en Cotizacion nueva", "isController": true}, {"data": [[30.0, 5312.4]], "isOverall": false, "label": "T.15 - Hacer clic en Cotizacion nueva-Aggregated", "isController": true}, {"data": [[20.0, 191.0], [21.0, 186.0], [24.0, 255.0], [26.0, 276.7142857142857]], "isOverall": false, "label": "33.4 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[24.7, 256.9]], "isOverall": false, "label": "33.4 - Hacer clic en A\u00F1adir objeto-Aggregated", "isController": false}, {"data": [[30.0, 628.9]], "isOverall": false, "label": "9.2 - Polizas relacionadas Hacer clic en Siguiente", "isController": false}, {"data": [[30.0, 628.9]], "isOverall": false, "label": "9.2 - Polizas relacionadas Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[30.0, 8518.5]], "isOverall": false, "label": "T.5 - Hacer clic en Crear cotizacion", "isController": true}, {"data": [[30.0, 8518.5]], "isOverall": false, "label": "T.5 - Hacer clic en Crear cotizacion-Aggregated", "isController": true}, {"data": [[30.0, 5312.4]], "isOverall": false, "label": "15.1 - Hacer clic en Cotizacion nueva", "isController": false}, {"data": [[30.0, 5312.4]], "isOverall": false, "label": "15.1 - Hacer clic en Cotizacion nueva-Aggregated", "isController": false}, {"data": [[30.0, 511.6]], "isOverall": false, "label": "22.2 - Seleccionar el Numero de pagos", "isController": false}, {"data": [[30.0, 511.6]], "isOverall": false, "label": "22.2 - Seleccionar el Numero de pagos-Aggregated", "isController": false}, {"data": [[30.0, 1723.8]], "isOverall": false, "label": "T.26 - Hacer clic en la pesta\u00F1a Participantes de la poliza", "isController": true}, {"data": [[30.0, 1723.8]], "isOverall": false, "label": "T.26 - Hacer clic en la pesta\u00F1a Participantes de la poliza-Aggregated", "isController": true}, {"data": [[30.0, 703.1]], "isOverall": false, "label": "29.4 - Ingresar Identificacion Buscar", "isController": false}, {"data": [[30.0, 703.1]], "isOverall": false, "label": "29.4 - Ingresar Identificacion Buscar-Aggregated", "isController": false}, {"data": [[20.0, 5011.9]], "isOverall": false, "label": "38.1 - Hacer clic en Guardar", "isController": false}, {"data": [[20.0, 5011.9]], "isOverall": false, "label": "38.1 - Hacer clic en Guardar-Aggregated", "isController": false}, {"data": [[30.0, 8687.100000000002]], "isOverall": false, "label": "T.14 - Hacer clic en Guardar", "isController": true}, {"data": [[30.0, 8687.100000000002]], "isOverall": false, "label": "T.14 - Hacer clic en Guardar-Aggregated", "isController": true}, {"data": [[16.0, 3532.0], [18.0, 2358.0], [19.0, 1970.0], [20.0, 2657.0], [12.0, 2639.0], [14.0, 2891.0], [15.0, 2530.0]], "isOverall": false, "label": "64.1 - Cerrar Insis", "isController": false}, {"data": [[15.799999999999999, 2646.5]], "isOverall": false, "label": "64.1 - Cerrar Insis-Aggregated", "isController": false}, {"data": [[26.0, 13845.0], [30.0, 8196.444444444445]], "isOverall": false, "label": "31.1 - Hacer clic en Guardar", "isController": false}, {"data": [[29.6, 8761.300000000001]], "isOverall": false, "label": "31.1 - Hacer clic en Guardar-Aggregated", "isController": false}, {"data": [[30.0, 7719.6]], "isOverall": false, "label": "9.3 - Polizas relacionadas Hacer clic en Siguiente", "isController": false}, {"data": [[30.0, 7719.6]], "isOverall": false, "label": "9.3 - Polizas relacionadas Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[30.0, 488.0]], "isOverall": false, "label": "8.2 - En Historial Hacer clic en Siguiente", "isController": false}, {"data": [[30.0, 488.0]], "isOverall": false, "label": "8.2 - En Historial Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[20.0, 606.5555555555555], [22.0, 739.0]], "isOverall": false, "label": "35.3 - Cerrar Objeto-365", "isController": false}, {"data": [[20.2, 619.8]], "isOverall": false, "label": "35.3 - Cerrar Objeto-365-Aggregated", "isController": false}, {"data": [[17.0, 433.0], [9.0, 212.0], [21.0, 485.0], [12.0, 244.0], [24.0, 261.0], [7.0, 213.0], [14.0, 306.0], [28.0, 663.0], [30.0, 526.5]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-0", "isController": false}, {"data": [[19.2, 387.0]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-0-Aggregated", "isController": false}, {"data": [[30.0, 7301.7]], "isOverall": false, "label": "6.2 - Ingresar identificacion y Buscar", "isController": false}, {"data": [[30.0, 7301.7]], "isOverall": false, "label": "6.2 - Ingresar identificacion y Buscar-Aggregated", "isController": false}, {"data": [[17.0, 98.0], [9.0, 102.0], [21.0, 100.0], [12.0, 194.0], [24.0, 202.0], [7.0, 91.0], [14.0, 94.0], [28.0, 99.0], [30.0, 177.5]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-1", "isController": false}, {"data": [[19.2, 133.49999999999997]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-1-Aggregated", "isController": false}, {"data": [[30.0, 9050.400000000001]], "isOverall": false, "label": "18.1 - Hacer clic en Guardar", "isController": false}, {"data": [[30.0, 9050.400000000001]], "isOverall": false, "label": "18.1 - Hacer clic en Guardar-Aggregated", "isController": false}, {"data": [[30.0, 863.9]], "isOverall": false, "label": "20.1 - Hacer clic en el icono de editar Facturacion", "isController": false}, {"data": [[30.0, 863.9]], "isOverall": false, "label": "20.1 - Hacer clic en el icono de editar Facturacion-Aggregated", "isController": false}, {"data": [[20.0, 349.3]], "isOverall": false, "label": "T.43 - Seleccionar el Objeto asegurado", "isController": true}, {"data": [[20.0, 349.3]], "isOverall": false, "label": "T.43 - Seleccionar el Objeto asegurado-Aggregated", "isController": true}, {"data": [[30.0, 22412.4]], "isOverall": false, "label": "19.1 - Hacer clic en siguiente", "isController": false}, {"data": [[30.0, 22412.4]], "isOverall": false, "label": "19.1 - Hacer clic en siguiente-Aggregated", "isController": false}, {"data": [[20.0, 569.6999999999999]], "isOverall": false, "label": "T.48 - Seleccionar la Dimensi\u00F3n de franquicia", "isController": true}, {"data": [[20.0, 569.6999999999999]], "isOverall": false, "label": "T.48 - Seleccionar la Dimensi\u00F3n de franquicia-Aggregated", "isController": true}, {"data": [[30.0, 634.4]], "isOverall": false, "label": "30.3 - Ingresar Identificacion Seleccionar y Ok", "isController": false}, {"data": [[30.0, 634.4]], "isOverall": false, "label": "30.3 - Ingresar Identificacion Seleccionar y Ok-Aggregated", "isController": false}, {"data": [[16.0, 361880.0], [17.0, 354390.0], [18.0, 355580.0], [19.0, 351217.0], [20.0, 347236.0], [11.0, 366918.0], [12.0, 370630.0], [13.0, 374265.0], [14.0, 367232.0], [15.0, 367066.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[15.5, 361641.4]], "isOverall": false, "label": "Transaction Controller-Aggregated", "isController": true}, {"data": [[16.0, 1032.0], [18.0, 1440.6666666666667], [20.0, 932.5], [14.0, 1240.25]], "isOverall": false, "label": "62.1 - Hacer clic en Cotizaci\u00F3n aceptada", "isController": false}, {"data": [[16.6, 1218.0]], "isOverall": false, "label": "62.1 - Hacer clic en Cotizaci\u00F3n aceptada-Aggregated", "isController": false}, {"data": [[20.0, 1691.1000000000001]], "isOverall": false, "label": "47.1 - Ingresar el Valor de franquicia", "isController": false}, {"data": [[20.0, 1691.1000000000001]], "isOverall": false, "label": "47.1 - Ingresar el Valor de franquicia-Aggregated", "isController": false}, {"data": [[20.0, 360.69999999999993]], "isOverall": false, "label": "44.1 - Seleccionar el Nombre de cobertura", "isController": false}, {"data": [[20.0, 360.69999999999993]], "isOverall": false, "label": "44.1 - Seleccionar el Nombre de cobertura-Aggregated", "isController": false}, {"data": [[20.0, 7822.400000000001]], "isOverall": false, "label": "52.1 - 1400 Transporte Terrestre Anual Hacer clic en Siguiente", "isController": false}, {"data": [[20.0, 7822.400000000001]], "isOverall": false, "label": "52.1 - 1400 Transporte Terrestre Anual Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[20.0, 463.2]], "isOverall": false, "label": "38.2 - Hacer clic en Guardar", "isController": false}, {"data": [[20.0, 463.2]], "isOverall": false, "label": "38.2 - Hacer clic en Guardar-Aggregated", "isController": false}, {"data": [[20.0, 1899.3333333333333], [24.0, 2036.0]], "isOverall": false, "label": "35.2 - Cerrar Objeto-363", "isController": false}, {"data": [[20.4, 1912.9999999999998]], "isOverall": false, "label": "35.2 - Cerrar Objeto-363-Aggregated", "isController": false}, {"data": [[18.0, 3330.5], [19.0, 2635.0], [20.0, 2215.1666666666665]], "isOverall": false, "label": "58.1 - Calculo de Prima Guardar", "isController": false}, {"data": [[19.400000000000002, 2522.2]], "isOverall": false, "label": "58.1 - Calculo de Prima Guardar-Aggregated", "isController": false}, {"data": [[30.0, 549.8]], "isOverall": false, "label": "6.3 - Ingresar identificacion y Buscar", "isController": false}, {"data": [[30.0, 549.8]], "isOverall": false, "label": "6.3 - Ingresar identificacion y Buscar-Aggregated", "isController": false}, {"data": [[16.0, 98.0], [17.0, 388.0], [18.0, 93.0], [19.0, 96.0], [20.0, 457.0], [11.0, 123.0], [12.0, 109.0], [13.0, 103.0], [14.0, 93.0], [15.0, 102.0]], "isOverall": false, "label": "64.4 - Cerrar Insis", "isController": false}, {"data": [[15.5, 166.2]], "isOverall": false, "label": "64.4 - Cerrar Insis-Aggregated", "isController": false}, {"data": [[30.0, 30036.399999999998]], "isOverall": false, "label": "T.9 - Polizas relacionadas Hacer clic en Siguiente", "isController": true}, {"data": [[30.0, 30036.399999999998]], "isOverall": false, "label": "T.9 - Polizas relacionadas Hacer clic en Siguiente-Aggregated", "isController": true}, {"data": [[20.0, 1295.4]], "isOverall": false, "label": "52.2 - 1400 Transporte Terrestre Anual Hacer clic en Siguiente", "isController": false}, {"data": [[20.0, 1295.4]], "isOverall": false, "label": "52.2 - 1400 Transporte Terrestre Anual Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[30.0, 13691.9]], "isOverall": false, "label": "T.8 - En Historial Hacer clic en Siguiente", "isController": true}, {"data": [[30.0, 13691.9]], "isOverall": false, "label": "T.8 - En Historial Hacer clic en Siguiente-Aggregated", "isController": true}, {"data": [[20.0, 6559.2]], "isOverall": false, "label": "53.1 - Hacer clic en Siguiente", "isController": false}, {"data": [[20.0, 6559.2]], "isOverall": false, "label": "53.1 - Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[20.0, 8658.1]], "isOverall": false, "label": "41.1 - Hacer clic en Siguiente", "isController": false}, {"data": [[20.0, 8658.1]], "isOverall": false, "label": "41.1 - Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[20.0, 1536.2]], "isOverall": false, "label": "T.36 - Hacer clic en el \u00EDcono de Editar", "isController": true}, {"data": [[20.0, 1536.2]], "isOverall": false, "label": "T.36 - Hacer clic en el \u00EDcono de Editar-Aggregated", "isController": true}, {"data": [[20.0, 468.0], [22.0, 437.0], [26.0, 576.0]], "isOverall": false, "label": "33.2 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[25.0, 551.3]], "isOverall": false, "label": "33.2 - Hacer clic en A\u00F1adir objeto-Aggregated", "isController": false}, {"data": [[20.0, 429.0], [24.0, 878.0], [26.0, 1149.4285714285713]], "isOverall": false, "label": "33.5 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[24.6, 978.1999999999999]], "isOverall": false, "label": "33.5 - Hacer clic en A\u00F1adir objeto-Aggregated", "isController": false}, {"data": [[20.0, 3514.6]], "isOverall": false, "label": "50.1 - Hacer clic en Premium", "isController": false}, {"data": [[20.0, 3514.6]], "isOverall": false, "label": "50.1 - Hacer clic en Premium-Aggregated", "isController": false}, {"data": [[30.0, 434.7]], "isOverall": false, "label": "5.3 - Hacer clic en Crear cotizacion", "isController": false}, {"data": [[30.0, 434.7]], "isOverall": false, "label": "5.3 - Hacer clic en Crear cotizacion-Aggregated", "isController": false}, {"data": [[20.0, 1157.8]], "isOverall": false, "label": "41.2 - Hacer clic en Siguiente", "isController": false}, {"data": [[20.0, 1157.8]], "isOverall": false, "label": "41.2 - Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[16.0, 513.0], [18.0, 406.33333333333337], [20.0, 244.5], [14.0, 465.75]], "isOverall": false, "label": "62.3 - Hacer clic en Cotizaci\u00F3n aceptada", "isController": false}, {"data": [[16.6, 408.40000000000003]], "isOverall": false, "label": "62.3 - Hacer clic en Cotizaci\u00F3n aceptada-Aggregated", "isController": false}, {"data": [[30.0, 10039.4]], "isOverall": false, "label": "T.18- Hacer clic en Guardar", "isController": true}, {"data": [[30.0, 10039.4]], "isOverall": false, "label": "T.18- Hacer clic en Guardar-Aggregated", "isController": true}, {"data": [[30.0, 653.1]], "isOverall": false, "label": "13.4 - Seleccionar agente ok ", "isController": false}, {"data": [[30.0, 653.1]], "isOverall": false, "label": "13.4 - Seleccionar agente ok -Aggregated", "isController": false}, {"data": [[20.0, 301.7]], "isOverall": false, "label": "T.45 - Seleccionar el Tipo de franquicia", "isController": true}, {"data": [[20.0, 301.7]], "isOverall": false, "label": "T.45 - Seleccionar el Tipo de franquicia-Aggregated", "isController": true}, {"data": [[20.0, 570.0999999999999]], "isOverall": false, "label": "55.2 - Impuestos Hacer clic en Siguiente", "isController": false}, {"data": [[20.0, 570.0999999999999]], "isOverall": false, "label": "55.2 - Impuestos Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[20.0, 8644.5]], "isOverall": false, "label": "51.1 - Hacer clic en Siguiente", "isController": false}, {"data": [[20.0, 8644.5]], "isOverall": false, "label": "51.1 - Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[30.0, 13203.900000000001]], "isOverall": false, "label": "8.1 - En Historial Hacer clic en Siguiente", "isController": false}, {"data": [[30.0, 13203.900000000001]], "isOverall": false, "label": "8.1 - En Historial Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[30.0, 642.6]], "isOverall": false, "label": "13.2 - Seleccionar agente ok ", "isController": false}, {"data": [[30.0, 642.6]], "isOverall": false, "label": "13.2 - Seleccionar agente ok -Aggregated", "isController": false}, {"data": [[20.0, 1536.2]], "isOverall": false, "label": "36.1 - Hacer clic en el \u00EDcono de Editar", "isController": false}, {"data": [[20.0, 1536.2]], "isOverall": false, "label": "36.1 - Hacer clic en el \u00EDcono de Editar-Aggregated", "isController": false}, {"data": [[20.0, 1755.0], [21.0, 2214.0], [24.0, 3699.75], [26.0, 2635.0]], "isOverall": false, "label": "T.34 - Grabar Objeto", "isController": true}, {"data": [[22.3, 2666.8]], "isOverall": false, "label": "T.34 - Grabar Objeto-Aggregated", "isController": true}, {"data": [[20.0, 1404.5]], "isOverall": false, "label": "51.2 - Hacer clic en Siguiente", "isController": false}, {"data": [[20.0, 1404.5]], "isOverall": false, "label": "51.2 - Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[30.0, 10668.3]], "isOverall": false, "label": "25.1 - Hacer clic en Guardar", "isController": false}, {"data": [[30.0, 10668.3]], "isOverall": false, "label": "25.1 - Hacer clic en Guardar-Aggregated", "isController": false}, {"data": [[20.0, 4247.500000000001]], "isOverall": false, "label": "40.1 - Hacer clic en Siguiente", "isController": false}, {"data": [[20.0, 4247.500000000001]], "isOverall": false, "label": "40.1 - Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[20.0, 472.69999999999993]], "isOverall": false, "label": "49.2 - Hacer clic en Guardar", "isController": false}, {"data": [[20.0, 472.69999999999993]], "isOverall": false, "label": "49.2 - Hacer clic en Guardar-Aggregated", "isController": false}, {"data": [[20.0, 777.0], [22.0, 428.0], [24.0, 931.5], [26.0, 1149.0]], "isOverall": false, "label": "33.7 -Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[24.0, 959.0]], "isOverall": false, "label": "33.7 -Hacer clic en A\u00F1adir objeto-Aggregated", "isController": false}, {"data": [[20.0, 674.2]], "isOverall": false, "label": "42.1 - Crear Deducible", "isController": false}, {"data": [[20.0, 674.2]], "isOverall": false, "label": "42.1 - Crear Deducible-Aggregated", "isController": false}, {"data": [[20.0, 7955.299999999999]], "isOverall": false, "label": "56.1 - Clausulas Hacer clic en Siguiente", "isController": false}, {"data": [[20.0, 7955.299999999999]], "isOverall": false, "label": "56.1 - Clausulas Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[30.0, 8010.4]], "isOverall": false, "label": "14 .1 - Hacer clic en Guardar", "isController": false}, {"data": [[30.0, 8010.4]], "isOverall": false, "label": "14 .1 - Hacer clic en Guardar-Aggregated", "isController": false}, {"data": [[19.0, 391.0], [21.0, 730.0], [22.0, 582.0], [27.0, 545.0], [30.0, 796.5]], "isOverall": false, "label": "T.4 - Hacer clic en Control de polizas", "isController": true}, {"data": [[26.900000000000002, 702.6999999999998]], "isOverall": false, "label": "T.4 - Hacer clic en Control de polizas-Aggregated", "isController": true}, {"data": [[30.0, 8131.9]], "isOverall": false, "label": "17.2 - Seleccionar el Nombre de producto ok", "isController": false}, {"data": [[30.0, 8131.9]], "isOverall": false, "label": "17.2 - Seleccionar el Nombre de producto ok-Aggregated", "isController": false}, {"data": [[20.0, 562.1999999999999]], "isOverall": false, "label": "54.2 - Comisiones Hacer clic en Siguiente", "isController": false}, {"data": [[20.0, 562.1999999999999]], "isOverall": false, "label": "54.2 - Comisiones Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[30.0, 2513.8999999999996]], "isOverall": false, "label": "T.30 - Ingresar Identificacion Seleccionar y Ok", "isController": true}, {"data": [[30.0, 2513.8999999999996]], "isOverall": false, "label": "T.30 - Ingresar Identificacion Seleccionar y Ok-Aggregated", "isController": true}, {"data": [[9.0, 496.0], [18.0, 492.0], [5.0, 1213.0], [21.0, 484.0], [6.0, 485.0], [12.0, 487.0], [24.0, 484.0], [27.0, 499.0], [15.0, 409.0], [30.0, 471.0]], "isOverall": false, "label": "1.1 - Index", "isController": false}, {"data": [[16.7, 552.0]], "isOverall": false, "label": "1.1 - Index-Aggregated", "isController": false}, {"data": [[19.0, 291.5], [21.0, 295.0], [27.0, 276.0], [30.0, 443.8333333333333]], "isOverall": false, "label": "4.1 - Hacer clic en Control de polizas", "isController": false}, {"data": [[26.599999999999998, 381.70000000000005]], "isOverall": false, "label": "4.1 - Hacer clic en Control de polizas-Aggregated", "isController": false}, {"data": [[30.0, 8279.7]], "isOverall": false, "label": "T.6 - Ingresar identificacion y Buscar", "isController": true}, {"data": [[30.0, 8279.7]], "isOverall": false, "label": "T.6 - Ingresar identificacion y Buscar-Aggregated", "isController": true}, {"data": [[30.0, 4405.0]], "isOverall": false, "label": "T.16 - Hacer clic en Cotizacion nueva", "isController": true}, {"data": [[30.0, 4405.0]], "isOverall": false, "label": "T.16 - Hacer clic en Cotizacion nueva-Aggregated", "isController": true}, {"data": [[17.0, 3423.0], [19.0, 2953.0], [25.0, 3903.0], [30.0, 6929.166666666666]], "isOverall": false, "label": "T.2 - Ingresar a INSIS", "isController": true}, {"data": [[25.799999999999997, 5527.7]], "isOverall": false, "label": "T.2 - Ingresar a INSIS-Aggregated", "isController": true}, {"data": [[30.0, 863.7]], "isOverall": false, "label": "30.2 - Ingresar Identificacion Seleccionar y Ok", "isController": false}, {"data": [[30.0, 863.7]], "isOverall": false, "label": "30.2 - Ingresar Identificacion Seleccionar y Ok-Aggregated", "isController": false}, {"data": [[30.0, 1083.7]], "isOverall": false, "label": "22.1 - Seleccionar el Numero de pagos", "isController": false}, {"data": [[30.0, 1083.7]], "isOverall": false, "label": "22.1 - Seleccionar el Numero de pagos-Aggregated", "isController": false}, {"data": [[30.0, 495.7]], "isOverall": false, "label": "21.1 - Hacer clic en el icono de editar Facturacion", "isController": false}, {"data": [[30.0, 495.7]], "isOverall": false, "label": "21.1 - Hacer clic en el icono de editar Facturacion-Aggregated", "isController": false}, {"data": [[19.0, 152.0], [21.0, 386.0], [22.0, 287.0], [27.0, 269.0], [30.0, 352.6666666666667]], "isOverall": false, "label": "4.2 - Hacer clic en Control de polizas", "isController": false}, {"data": [[26.900000000000002, 321.0]], "isOverall": false, "label": "4.2 - Hacer clic en Control de polizas-Aggregated", "isController": false}, {"data": [[30.0, 692.7999999999998]], "isOverall": false, "label": "29.3 - Ingresar Identificacion Buscar", "isController": false}, {"data": [[30.0, 692.7999999999998]], "isOverall": false, "label": "29.3 - Ingresar Identificacion Buscar-Aggregated", "isController": false}, {"data": [[30.0, 1055.5]], "isOverall": false, "label": "10.1 - Hacer clic en Agente Crear", "isController": false}, {"data": [[30.0, 1055.5]], "isOverall": false, "label": "10.1 - Hacer clic en Agente Crear-Aggregated", "isController": false}, {"data": [[20.0, 7236.7]], "isOverall": false, "label": "T.53 - Hacer clic en Siguiente", "isController": true}, {"data": [[20.0, 7236.7]], "isOverall": false, "label": "T.53 - Hacer clic en Siguiente-Aggregated", "isController": true}, {"data": [[17.0, 532.0], [9.0, 314.0], [21.0, 585.0], [12.0, 439.0], [24.0, 463.0], [7.0, 305.0], [14.0, 401.0], [28.0, 762.0], [30.0, 704.5]], "isOverall": false, "label": "2.1 - Ingresar a INSIS", "isController": false}, {"data": [[19.2, 521.0]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-Aggregated", "isController": false}, {"data": [[30.0, 1386.8000000000002]], "isOverall": false, "label": "27.2 - Hacer clic en Crear", "isController": false}, {"data": [[30.0, 1386.8000000000002]], "isOverall": false, "label": "27.2 - Hacer clic en Crear-Aggregated", "isController": false}, {"data": [[18.0, 443.6666666666667], [20.0, 845.5], [14.0, 530.25], [15.0, 507.0]], "isOverall": false, "label": "T.63 - Hacer clic en Proceder", "isController": true}, {"data": [[16.5, 564.9999999999999]], "isOverall": false, "label": "T.63 - Hacer clic en Proceder-Aggregated", "isController": true}, {"data": [[20.0, 9666.7]], "isOverall": false, "label": "T.55 - Impuestos Hacer clic en Siguiente", "isController": true}, {"data": [[20.0, 9666.7]], "isOverall": false, "label": "T.55 - Impuestos Hacer clic en Siguiente-Aggregated", "isController": true}, {"data": [[30.0, 989.0]], "isOverall": false, "label": "18.2 - Hacer clic en Guardar", "isController": false}, {"data": [[30.0, 989.0]], "isOverall": false, "label": "18.2 - Hacer clic en Guardar-Aggregated", "isController": false}, {"data": [[30.0, 23252.5]], "isOverall": false, "label": "T.19 - Hacer clic en siguiente", "isController": true}, {"data": [[30.0, 23252.5]], "isOverall": false, "label": "T.19 - Hacer clic en siguiente-Aggregated", "isController": true}, {"data": [[18.0, 227.33333333333334], [20.0, 269.5], [14.0, 235.25], [15.0, 249.0]], "isOverall": false, "label": "63.2 - Hacer clic en Proceder", "isController": false}, {"data": [[16.5, 241.1]], "isOverall": false, "label": "63.2 - Hacer clic en Proceder-Aggregated", "isController": false}, {"data": [[30.0, 1289.7999999999997]], "isOverall": false, "label": "16.2 - Hacer clic en Cotizacion nueva", "isController": false}, {"data": [[30.0, 1289.7999999999997]], "isOverall": false, "label": "16.2 - Hacer clic en Cotizacion nueva-Aggregated", "isController": false}, {"data": [[30.0, 931.2]], "isOverall": false, "label": "17.3 - Seleccionar el Nombre de producto ok", "isController": false}, {"data": [[30.0, 931.2]], "isOverall": false, "label": "17.3 - Seleccionar el Nombre de producto ok-Aggregated", "isController": false}, {"data": [[20.0, 754.0], [21.0, 669.0], [24.0, 1224.0], [26.0, 1164.857142857143]], "isOverall": false, "label": "33.3 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[24.7, 1080.1]], "isOverall": false, "label": "33.3 - Hacer clic en A\u00F1adir objeto-Aggregated", "isController": false}, {"data": [[18.0, 3391.0], [19.0, 3256.0], [20.0, 4003.0]], "isOverall": false, "label": "T.59 - Calculo de Prima Premium", "isController": true}, {"data": [[19.099999999999998, 3683.5]], "isOverall": false, "label": "T.59 - Calculo de Prima Premium-Aggregated", "isController": true}, {"data": [[30.0, 594.5]], "isOverall": false, "label": "11.3 - Buscar Agente", "isController": false}, {"data": [[30.0, 594.5]], "isOverall": false, "label": "11.3 - Buscar Agente-Aggregated", "isController": false}, {"data": [[16.0, 4181.0], [17.0, 4254.0], [18.0, 2788.0], [19.0, 2518.0], [20.0, 3655.0], [11.0, 3040.0], [12.0, 3487.0], [13.0, 3437.0], [14.0, 3617.0], [15.0, 3149.0]], "isOverall": false, "label": "T.64 - Cerrar Insis", "isController": true}, {"data": [[15.5, 3412.6]], "isOverall": false, "label": "T.64 - Cerrar Insis-Aggregated", "isController": true}, {"data": [[30.0, 2776.7000000000003]], "isOverall": false, "label": "T.13 - Seleccionar agente ok ", "isController": true}, {"data": [[30.0, 2776.7000000000003]], "isOverall": false, "label": "T.13 - Seleccionar agente ok -Aggregated", "isController": true}, {"data": [[20.0, 3060.7777777777783], [22.0, 3571.0]], "isOverall": false, "label": "T.35 - Cerrar Objeto", "isController": true}, {"data": [[20.2, 3111.8000000000006]], "isOverall": false, "label": "T.35 - Cerrar Objeto-Aggregated", "isController": true}, {"data": [[20.0, 5875.5], [21.0, 7925.0], [23.0, 8250.0], [24.0, 10190.0], [26.0, 9139.4]], "isOverall": false, "label": "T.33 - Hacer clic en A\u00F1adir objeto", "isController": true}, {"data": [[23.800000000000004, 8381.300000000001]], "isOverall": false, "label": "T.33 - Hacer clic en A\u00F1adir objeto-Aggregated", "isController": true}, {"data": [[30.0, 1131.1]], "isOverall": false, "label": "12.1 - Hacer clic en buscar", "isController": false}, {"data": [[30.0, 1131.1]], "isOverall": false, "label": "12.1 - Hacer clic en buscar-Aggregated", "isController": false}, {"data": [[20.0, 3514.6]], "isOverall": false, "label": "T.50 - Hacer clic en Premium", "isController": true}, {"data": [[20.0, 3514.6]], "isOverall": false, "label": "T.50 - Hacer clic en Premium-Aggregated", "isController": true}, {"data": [[30.0, 758.6]], "isOverall": false, "label": "T.24 - Seleccionar el Modo de pago", "isController": true}, {"data": [[30.0, 758.6]], "isOverall": false, "label": "T.24 - Seleccionar el Modo de pago-Aggregated", "isController": true}, {"data": [[18.0, 3875.0], [19.0, 3165.5], [20.0, 2675.5]], "isOverall": false, "label": "T.58 - Calculo de Prima Guardar", "isController": true}, {"data": [[19.400000000000002, 3013.4]], "isOverall": false, "label": "T.58 - Calculo de Prima Guardar-Aggregated", "isController": true}, {"data": [[18.0, 3391.0], [19.0, 3256.0], [20.0, 4003.0]], "isOverall": false, "label": "59.1 - Calculo de Prima Premium", "isController": false}, {"data": [[19.099999999999998, 3683.5]], "isOverall": false, "label": "59.1 - Calculo de Prima Premium-Aggregated", "isController": false}, {"data": [[30.0, 758.6]], "isOverall": false, "label": "24.1 - Seleccionar el Modo de pago", "isController": false}, {"data": [[30.0, 758.6]], "isOverall": false, "label": "24.1 - Seleccionar el Modo de pago-Aggregated", "isController": false}, {"data": [[20.0, 9117.8]], "isOverall": false, "label": "T.52 - 1400 Transporte Terrestre Anual Hacer clic en Siguiente", "isController": true}, {"data": [[20.0, 9117.8]], "isOverall": false, "label": "T.52 - 1400 Transporte Terrestre Anual Hacer clic en Siguiente-Aggregated", "isController": true}, {"data": [[20.0, 5297.4]], "isOverall": false, "label": "39.1 - Hacer clic en Premium", "isController": false}, {"data": [[20.0, 5297.4]], "isOverall": false, "label": "39.1 - Hacer clic en Premium-Aggregated", "isController": false}, {"data": [[20.0, 1691.1000000000001]], "isOverall": false, "label": "T.47 - Ingresar el Valor de franquicia", "isController": true}, {"data": [[20.0, 1691.1000000000001]], "isOverall": false, "label": "T.47 - Ingresar el Valor de franquicia-Aggregated", "isController": true}, {"data": [[30.0, 948.0]], "isOverall": false, "label": "17.1 - Seleccionar el Nombre de producto ok", "isController": false}, {"data": [[30.0, 948.0]], "isOverall": false, "label": "17.1 - Seleccionar el Nombre de producto ok-Aggregated", "isController": false}, {"data": [[16.0, 729.0], [18.0, 735.0], [20.0, 602.0], [14.0, 737.5], [15.0, 777.5]], "isOverall": false, "label": "61.2 - Hacer clic en Cotizacion a cliente", "isController": false}, {"data": [[16.8, 716.8]], "isOverall": false, "label": "61.2 - Hacer clic en Cotizacion a cliente-Aggregated", "isController": false}, {"data": [[30.0, 585.6]], "isOverall": false, "label": "5.2 - Hacer clic en Crear cotizacion", "isController": false}, {"data": [[30.0, 585.6]], "isOverall": false, "label": "5.2 - Hacer clic en Crear cotizacion-Aggregated", "isController": false}, {"data": [[16.0, 183.0], [18.0, 206.0], [19.0, 181.0], [20.0, 190.0], [12.0, 183.5], [14.0, 192.0], [15.0, 191.0]], "isOverall": false, "label": "64.1 - Cerrar Insis-2", "isController": false}, {"data": [[15.799999999999999, 190.8]], "isOverall": false, "label": "64.1 - Cerrar Insis-2-Aggregated", "isController": false}, {"data": [[18.0, 544.5], [19.0, 530.5], [20.0, 460.3333333333333]], "isOverall": false, "label": "58.2 - Calculo de Prima Guardar", "isController": false}, {"data": [[19.400000000000002, 491.2]], "isOverall": false, "label": "58.2 - Calculo de Prima Guardar-Aggregated", "isController": false}, {"data": [[16.0, 578.0], [18.0, 582.5], [19.0, 526.0], [20.0, 642.0], [12.0, 741.0], [14.0, 564.5], [15.0, 584.0]], "isOverall": false, "label": "64.1 - Cerrar Insis-1", "isController": false}, {"data": [[15.799999999999999, 610.6]], "isOverall": false, "label": "64.1 - Cerrar Insis-1-Aggregated", "isController": false}, {"data": [[30.0, 1015.8000000000001]], "isOverall": false, "label": "30.1 - Ingresar Identificacion Seleccionar y Ok", "isController": false}, {"data": [[30.0, 1015.8000000000001]], "isOverall": false, "label": "30.1 - Ingresar Identificacion Seleccionar y Ok-Aggregated", "isController": false}, {"data": [[16.0, 2771.0], [18.0, 1569.5], [19.0, 1262.0], [20.0, 1823.0], [12.0, 1713.5], [14.0, 2133.5], [15.0, 1754.0]], "isOverall": false, "label": "64.1 - Cerrar Insis-0", "isController": false}, {"data": [[15.799999999999999, 1844.3]], "isOverall": false, "label": "64.1 - Cerrar Insis-0-Aggregated", "isController": false}, {"data": [[30.0, 676.6999999999999]], "isOverall": false, "label": "14.2 - Hacer clic en Guardar", "isController": false}, {"data": [[30.0, 676.6999999999999]], "isOverall": false, "label": "14.2 - Hacer clic en Guardar-Aggregated", "isController": false}, {"data": [[20.0, 413.5], [21.0, 689.0], [23.0, 855.0], [24.0, 631.0], [26.0, 1065.6]], "isOverall": false, "label": "33.8 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[23.800000000000004, 833.0]], "isOverall": false, "label": "33.8 - Hacer clic en A\u00F1adir objeto-Aggregated", "isController": false}, {"data": [[18.0, 264.0], [20.0, 257.0], [26.0, 321.0], [30.0, 418.0]], "isOverall": false, "label": "3.1 - Hacer clic en Operaciones del sistema", "isController": false}, {"data": [[26.2, 361.4]], "isOverall": false, "label": "3.1 - Hacer clic en Operaciones del sistema-Aggregated", "isController": false}, {"data": [[30.0, 863.9]], "isOverall": false, "label": "T.20 - Hacer clic en el icono de editar Facturacion", "isController": true}, {"data": [[30.0, 863.9]], "isOverall": false, "label": "T.20 - Hacer clic en el icono de editar Facturacion-Aggregated", "isController": true}, {"data": [[20.0, 5475.1]], "isOverall": false, "label": "T.38 - Hacer clic en Guardar", "isController": true}, {"data": [[20.0, 5475.1]], "isOverall": false, "label": "T.38 - Hacer clic en Guardar-Aggregated", "isController": true}, {"data": [[30.0, 666.8]], "isOverall": false, "label": "T.23 - Seleccionar el Dia de pago", "isController": true}, {"data": [[30.0, 666.8]], "isOverall": false, "label": "T.23 - Seleccionar el Dia de pago-Aggregated", "isController": true}, {"data": [[20.0, 604.8000000000001]], "isOverall": false, "label": "T.37 - Ingresar el valor asegurado", "isController": true}, {"data": [[20.0, 604.8000000000001]], "isOverall": false, "label": "T.37 - Ingresar el valor asegurado-Aggregated", "isController": true}, {"data": [[30.0, 1709.4]], "isOverall": false, "label": "25.2 - Hacer clic en Guardar", "isController": false}, {"data": [[30.0, 1709.4]], "isOverall": false, "label": "25.2 - Hacer clic en Guardar-Aggregated", "isController": false}, {"data": [[30.0, 495.7]], "isOverall": false, "label": "T.21 - Hacer clic en el icono de editar Facturacion", "isController": true}, {"data": [[30.0, 495.7]], "isOverall": false, "label": "T.21 - Hacer clic en el icono de editar Facturacion-Aggregated", "isController": true}, {"data": [[30.0, 834.7]], "isOverall": false, "label": "13.1 - Seleccionar agente ok ", "isController": false}, {"data": [[30.0, 834.7]], "isOverall": false, "label": "13.1 - Seleccionar agente ok -Aggregated", "isController": false}, {"data": [[16.0, 208.0], [17.0, 224.0], [18.0, 204.0], [19.0, 129.0], [20.0, 113.0], [11.0, 116.0], [12.0, 272.0], [14.0, 219.0], [15.0, 210.0]], "isOverall": false, "label": "64.3 - Cerrar Insis-1", "isController": false}, {"data": [[15.6, 191.4]], "isOverall": false, "label": "64.3 - Cerrar Insis-1-Aggregated", "isController": false}, {"data": [[16.0, 115.0], [17.0, 156.0], [18.0, 119.0], [19.0, 130.0], [20.0, 232.0], [11.0, 106.0], [12.0, 127.0], [14.0, 111.0], [15.0, 111.0]], "isOverall": false, "label": "64.3 - Cerrar Insis-0", "isController": false}, {"data": [[15.6, 131.79999999999998]], "isOverall": false, "label": "64.3 - Cerrar Insis-0-Aggregated", "isController": false}, {"data": [[20.0, 4734.899999999999]], "isOverall": false, "label": "T.49 - Hacer clic en Guardar", "isController": true}, {"data": [[20.0, 4734.899999999999]], "isOverall": false, "label": "T.49 - Hacer clic en Guardar-Aggregated", "isController": true}, {"data": [[30.0, 4674.3]], "isOverall": false, "label": "T.28 - Hacer clic en el \u00EDcono de Buscar", "isController": true}, {"data": [[30.0, 4674.3]], "isOverall": false, "label": "T.28 - Hacer clic en el \u00EDcono de Buscar-Aggregated", "isController": true}, {"data": [[16.0, 1890.0], [18.0, 2441.3333333333335], [20.0, 1438.5], [14.0, 2214.25]], "isOverall": false, "label": "T.62 - Hacer clic en Cotizaci\u00F3n aceptada", "isController": true}, {"data": [[16.6, 2094.8]], "isOverall": false, "label": "T.62 - Hacer clic en Cotizaci\u00F3n aceptada-Aggregated", "isController": true}, {"data": [[30.0, 840.0999999999999]], "isOverall": false, "label": "19 .2- Hacer clic en siguiente", "isController": false}, {"data": [[30.0, 840.0999999999999]], "isOverall": false, "label": "19 .2- Hacer clic en siguiente-Aggregated", "isController": false}, {"data": [[30.0, 21687.9]], "isOverall": false, "label": "9.1 - Polizas relacionadas Hacer clic en Siguiente", "isController": false}, {"data": [[30.0, 21687.9]], "isOverall": false, "label": "9.1 - Polizas relacionadas Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[20.0, 7926.9]], "isOverall": false, "label": "57.1 - Informacion del cliente  Hacer clic en Siguiente", "isController": false}, {"data": [[20.0, 7926.9]], "isOverall": false, "label": "57.1 - Informacion del cliente  Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[26.0, 875.0], [29.0, 778.0], [30.0, 839.5]], "isOverall": false, "label": "31.2 - Hacer clic en Guardar", "isController": false}, {"data": [[29.5, 836.9]], "isOverall": false, "label": "31.2 - Hacer clic en Guardar-Aggregated", "isController": false}, {"data": [[20.0, 8360.7]], "isOverall": false, "label": "T.54 - Comisiones Hacer clic en Siguiente", "isController": true}, {"data": [[20.0, 8360.7]], "isOverall": false, "label": "T.54 - Comisiones Hacer clic en Siguiente-Aggregated", "isController": true}, {"data": [[20.0, 19005.0], [26.0, 15230.444444444445]], "isOverall": false, "label": "32.1 - Hacer clic en Siguiente", "isController": false}, {"data": [[25.4, 15607.900000000001]], "isOverall": false, "label": "32.1 - Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[20.0, 4262.2]], "isOverall": false, "label": "49.1 - Hacer clic en Guardar", "isController": false}, {"data": [[20.0, 4262.2]], "isOverall": false, "label": "49.1 - Hacer clic en Guardar-Aggregated", "isController": false}, {"data": [[20.0, 8462.0]], "isOverall": false, "label": "T.57 - Informacion del cliente  Hacer clic en Siguiente", "isController": true}, {"data": [[20.0, 8462.0]], "isOverall": false, "label": "T.57 - Informacion del cliente  Hacer clic en Siguiente-Aggregated", "isController": true}, {"data": [[30.0, 2355.2000000000003]], "isOverall": false, "label": "T.27 - Hacer clic en Crear", "isController": true}, {"data": [[30.0, 2355.2000000000003]], "isOverall": false, "label": "T.27 - Hacer clic en Crear-Aggregated", "isController": true}, {"data": [[16.0, 2666.5], [18.0, 2098.0], [24.0, 3027.0], [29.0, 3840.0], [30.0, 6243.4]], "isOverall": false, "label": "2.2 - Ingresar a INSIS", "isController": false}, {"data": [[25.300000000000004, 4551.5]], "isOverall": false, "label": "2.2 - Ingresar a INSIS-Aggregated", "isController": false}, {"data": [[30.0, 7498.2]], "isOverall": false, "label": "5.1 - Hacer clic en Crear cotizacion", "isController": false}, {"data": [[30.0, 7498.2]], "isOverall": false, "label": "5.1 - Hacer clic en Crear cotizacion-Aggregated", "isController": false}, {"data": [[30.0, 16106.299999999996]], "isOverall": false, "label": "7.1 - Crear Cotizacion Siguiente", "isController": false}, {"data": [[30.0, 16106.299999999996]], "isOverall": false, "label": "7.1 - Crear Cotizacion Siguiente-Aggregated", "isController": false}, {"data": [[17.0, 447.0], [19.0, 416.0], [25.0, 475.0], [30.0, 461.16666666666663]], "isOverall": false, "label": "2.3 - Ingresar a INSIS", "isController": false}, {"data": [[25.799999999999997, 455.20000000000005]], "isOverall": false, "label": "2.3 - Ingresar a INSIS-Aggregated", "isController": false}, {"data": [[20.0, 19423.0], [25.0, 24576.0], [26.0, 14631.75]], "isOverall": false, "label": "T.32 - Hacer clic en Siguiente", "isController": true}, {"data": [[25.3, 16105.3]], "isOverall": false, "label": "T.32 - Hacer clic en Siguiente-Aggregated", "isController": true}, {"data": [[30.0, 978.5]], "isOverall": false, "label": "16.4 - Hacer clic en Cotizacion nueva", "isController": false}, {"data": [[30.0, 978.5]], "isOverall": false, "label": "16.4 - Hacer clic en Cotizacion nueva-Aggregated", "isController": false}, {"data": [[30.0, 1675.8]], "isOverall": false, "label": "16.1 - Hacer clic en Cotizacion nueva", "isController": false}, {"data": [[30.0, 1675.8]], "isOverall": false, "label": "16.1 - Hacer clic en Cotizacion nueva-Aggregated", "isController": false}, {"data": [[20.0, 518.6999999999999]], "isOverall": false, "label": "56.2 - Clausulas Hacer clic en Siguiente", "isController": false}, {"data": [[20.0, 518.6999999999999]], "isOverall": false, "label": "56.2 - Clausulas Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[26.0, 14720.0], [29.0, 9790.0], [30.0, 8934.0]], "isOverall": false, "label": "T.31 - Hacer clic en Guardar", "isController": true}, {"data": [[29.5, 9598.2]], "isOverall": false, "label": "T.31 - Hacer clic en Guardar-Aggregated", "isController": true}, {"data": [[20.0, 604.8000000000001]], "isOverall": false, "label": "37- Ingresar el valor asegurado", "isController": false}, {"data": [[20.0, 604.8000000000001]], "isOverall": false, "label": "37- Ingresar el valor asegurado-Aggregated", "isController": false}, {"data": [[20.0, 9815.9]], "isOverall": false, "label": "T.41 - Hacer clic en Siguiente", "isController": true}, {"data": [[20.0, 9815.9]], "isOverall": false, "label": "T.41 - Hacer clic en Siguiente-Aggregated", "isController": true}, {"data": [[30.0, 552.7]], "isOverall": false, "label": "11.1 - Buscar Agente", "isController": false}, {"data": [[30.0, 552.7]], "isOverall": false, "label": "11.1 - Buscar Agente-Aggregated", "isController": false}, {"data": [[20.0, 7693.3]], "isOverall": false, "label": "T.46 - Seleccionar el reclamo de franquicia", "isController": true}, {"data": [[20.0, 7693.3]], "isOverall": false, "label": "T.46 - Seleccionar el reclamo de franquicia-Aggregated", "isController": true}, {"data": [[20.0, 10049.0]], "isOverall": false, "label": "T.51 - Hacer clic en Siguiente", "isController": true}, {"data": [[20.0, 10049.0]], "isOverall": false, "label": "T.51 - Hacer clic en Siguiente-Aggregated", "isController": true}, {"data": [[20.0, 7197.0]], "isOverall": false, "label": "46.2 - Seleccionar el reclamo de franquicia", "isController": false}, {"data": [[20.0, 7197.0]], "isOverall": false, "label": "46.2 - Seleccionar el reclamo de franquicia-Aggregated", "isController": false}, {"data": [[30.0, 428.2]], "isOverall": false, "label": "6.1 - Ingresar identificacion y Buscar", "isController": false}, {"data": [[30.0, 428.2]], "isOverall": false, "label": "6.1 - Ingresar identificacion y Buscar-Aggregated", "isController": false}, {"data": [[30.0, 528.8000000000001]], "isOverall": false, "label": "7.2 - Crear Cotizacion Siguiente", "isController": false}, {"data": [[30.0, 528.8000000000001]], "isOverall": false, "label": "7.2 - Crear Cotizacion Siguiente-Aggregated", "isController": false}, {"data": [[30.0, 1756.4]], "isOverall": false, "label": "28.1 - Hacer clic en el \u00EDcono de Buscar", "isController": false}, {"data": [[30.0, 1756.4]], "isOverall": false, "label": "28.1 - Hacer clic en el \u00EDcono de Buscar-Aggregated", "isController": false}, {"data": [[20.0, 1355.5], [22.0, 1604.0], [24.0, 3208.25], [26.0, 2134.0]], "isOverall": false, "label": "34.1 - Grabar Objeto", "isController": false}, {"data": [[22.400000000000002, 2199.3]], "isOverall": false, "label": "34.1 - Grabar Objeto-Aggregated", "isController": false}, {"data": [[20.0, 496.3]], "isOverall": false, "label": "46.1 - Seleccionar el reclamo de franquicia", "isController": false}, {"data": [[20.0, 496.3]], "isOverall": false, "label": "46.1 - Seleccionar el reclamo de franquicia-Aggregated", "isController": false}, {"data": [[30.0, 1248.0]], "isOverall": false, "label": "29.2 - Ingresar Identificacion Buscar", "isController": false}, {"data": [[30.0, 1248.0]], "isOverall": false, "label": "29.2 - Ingresar Identificacion Buscar-Aggregated", "isController": false}, {"data": [[20.0, 8474.0]], "isOverall": false, "label": "T.56 - Clausulas Hacer clic en Siguiente", "isController": true}, {"data": [[20.0, 8474.0]], "isOverall": false, "label": "T.56 - Clausulas Hacer clic en Siguiente-Aggregated", "isController": true}, {"data": [[18.0, 264.0], [20.0, 257.0], [26.0, 321.0], [30.0, 418.0]], "isOverall": false, "label": "T.3 - Hacer clic en Operaciones del sistema", "isController": true}, {"data": [[26.2, 361.4]], "isOverall": false, "label": "T.3 - Hacer clic en Operaciones del sistema-Aggregated", "isController": true}, {"data": [[20.0, 349.3]], "isOverall": false, "label": "43.1 - Seleccionar el Objeto asegurado", "isController": false}, {"data": [[20.0, 349.3]], "isOverall": false, "label": "43.1 - Seleccionar el Objeto asegurado-Aggregated", "isController": false}, {"data": [[20.0, 569.6999999999999]], "isOverall": false, "label": "48.1 - Seleccionar la Dimensi\u00F3n de franquicia", "isController": false}, {"data": [[20.0, 569.6999999999999]], "isOverall": false, "label": "48.1 - Seleccionar la Dimensi\u00F3n de franquicia-Aggregated", "isController": false}, {"data": [[20.0, 535.1]], "isOverall": false, "label": "57.2 - Informacion del cliente  Hacer clic en Siguiente", "isController": false}, {"data": [[20.0, 535.1]], "isOverall": false, "label": "57.2 - Informacion del cliente  Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[16.0, 1.0], [17.0, 0.0], [18.0, 0.0], [19.0, 0.0], [20.0, 1.0], [11.0, 1.0], [12.0, 0.0], [13.0, 0.0], [14.0, 0.0], [15.0, 1.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[15.5, 0.4]], "isOverall": false, "label": "Debug Sampler-Aggregated", "isController": false}, {"data": [[30.0, 2480.0]], "isOverall": false, "label": "T.11 - Buscar Agente", "isController": true}, {"data": [[30.0, 2480.0]], "isOverall": false, "label": "T.11 - Buscar Agente-Aggregated", "isController": true}, {"data": [[30.0, 10011.1]], "isOverall": false, "label": "T.17 - Seleccionar el Nombre de producto ok", "isController": true}, {"data": [[30.0, 10011.1]], "isOverall": false, "label": "T.17 - Seleccionar el Nombre de producto ok-Aggregated", "isController": true}, {"data": [[30.0, 1458.1]], "isOverall": false, "label": "T.10 - Hacer clic en Agente Crear", "isController": true}, {"data": [[30.0, 1458.1]], "isOverall": false, "label": "T.10 - Hacer clic en Agente Crear-Aggregated", "isController": true}, {"data": [[20.0, 7798.5]], "isOverall": false, "label": "54.1 - Comisiones Hacer clic en Siguiente", "isController": false}, {"data": [[20.0, 7798.5]], "isOverall": false, "label": "54.1 - Comisiones Hacer clic en Siguiente-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 30.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 4567.783333333334, "minX": 1.5963567E12, "maxY": 246090.8, "series": [{"data": [[1.59635682E12, 116448.36666666667], [1.5963567E12, 63656.21666666667], [1.596357E12, 210605.65], [1.59635706E12, 130684.4], [1.59635688E12, 150861.76666666666], [1.59635694E12, 246090.8], [1.59635676E12, 85905.45]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.59635682E12, 6856.666666666667], [1.5963567E12, 4567.783333333334], [1.596357E12, 4582.216666666666], [1.59635706E12, 7779.45], [1.59635688E12, 14195.95], [1.59635694E12, 11175.833333333334], [1.59635676E12, 5168.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59635706E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 0.4, "minX": 1.5963567E12, "maxY": 361641.4, "series": [{"data": [[1.59635694E12, 674.2]], "isOverall": false, "label": "T.42 - Crear Deducible", "isController": true}, {"data": [[1.59635694E12, 467.49999999999994]], "isOverall": false, "label": "34.2 - Grabar Objeto", "isController": false}, {"data": [[1.59635682E12, 643.25], [1.59635676E12, 681.8333333333334]], "isOverall": false, "label": "11.2 - Buscar Agente", "isController": false}, {"data": [[1.59635688E12, 688.6999999999999]], "isOverall": false, "label": "29.1 - Ingresar Identificacion", "isController": false}, {"data": [[1.59635682E12, 579.0], [1.59635676E12, 713.6]], "isOverall": false, "label": "13.3 - Seleccionar agente ok ", "isController": false}, {"data": [[1.59635688E12, 666.8]], "isOverall": false, "label": "23.3 - Seleccionar el Dia de pago", "isController": false}, {"data": [[1.59635688E12, 1464.9]], "isOverall": false, "label": "28.2 - Hacer clic en el \u00EDcono de Buscar", "isController": false}, {"data": [[1.59635706E12, 504.0]], "isOverall": false, "label": "60.3 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial", "isController": false}, {"data": [[1.59635706E12, 276.6]], "isOverall": false, "label": "64.2 - Cerrar Insis", "isController": false}, {"data": [[1.59635706E12, 96.39999999999999]], "isOverall": false, "label": "64.2 - Cerrar Insis-0", "isController": false}, {"data": [[1.59635706E12, 323.8999999999999]], "isOverall": false, "label": "63.1 - Hacer clic en Proceder", "isController": false}, {"data": [[1.596357E12, 9096.6]], "isOverall": false, "label": "55.1 - Impuestos Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635688E12, 574.1]], "isOverall": false, "label": "26.2 - Hacer clic en la pesta\u00F1a Participantes de la poliza", "isController": false}, {"data": [[1.59635694E12, 5297.4]], "isOverall": false, "label": "T.39 - Hacer clic en Premium", "isController": true}, {"data": [[1.59635688E12, 603.5]], "isOverall": false, "label": "28.3 - Hacer clic en el \u00EDcono de Buscar", "isController": false}, {"data": [[1.59635688E12, 2274.0], [1.59635694E12, 2731.375]], "isOverall": false, "label": "33.1 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[1.59635706E12, 795.1999999999999]], "isOverall": false, "label": "60.2 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial", "isController": false}, {"data": [[1.59635706E12, 468.4]], "isOverall": false, "label": "62.2 - Hacer clic en Cotizaci\u00F3n aceptada-414", "isController": false}, {"data": [[1.59635694E12, 579.0]], "isOverall": false, "label": "35.1 - Cerrar Objeto", "isController": false}, {"data": [[1.59635688E12, 1149.7]], "isOverall": false, "label": "26.1 - Hacer clic en la pesta\u00F1a Participantes de la poliza", "isController": false}, {"data": [[1.5963567E12, 148.29999999999998]], "isOverall": false, "label": "1.2 - Index-0", "isController": false}, {"data": [[1.59635688E12, 3332.6]], "isOverall": false, "label": "T.29 - Ingresar Identificacion Buscar", "isController": true}, {"data": [[1.59635706E12, 7713.900000000001]], "isOverall": false, "label": "60.1 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial", "isController": false}, {"data": [[1.59635688E12, 968.4]], "isOverall": false, "label": "27.1 - Hacer clic en Crear", "isController": false}, {"data": [[1.5963567E12, 234.89999999999998]], "isOverall": false, "label": "1.2 - Index-1", "isController": false}, {"data": [[1.59635688E12, 509.4], [1.59635694E12, 485.4]], "isOverall": false, "label": "32.2 -  Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635694E12, 8495.0]], "isOverall": false, "label": "T.40 - Hacer clic en Siguiente", "isController": true}, {"data": [[1.59635688E12, 1595.3]], "isOverall": false, "label": "T.22 - Seleccionar el Numero de pagos", "isController": true}, {"data": [[1.59635694E12, 301.7]], "isOverall": false, "label": "45.1 - Seleccionar el Tipo de franquicia", "isController": false}, {"data": [[1.59635706E12, 9013.099999999999]], "isOverall": false, "label": "T.60 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial", "isController": true}, {"data": [[1.5963567E12, 935.6999999999999]], "isOverall": false, "label": "T.1 - Index", "isController": true}, {"data": [[1.59635706E12, 179.8]], "isOverall": false, "label": "64.2 - Cerrar Insis-1", "isController": false}, {"data": [[1.59635688E12, 849.5]], "isOverall": false, "label": "28.4 - Hacer clic en el \u00EDcono de Buscar", "isController": false}, {"data": [[1.59635694E12, 1082.8999999999999]], "isOverall": false, "label": "33.6 -Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[1.596357E12, 677.5]], "isOverall": false, "label": "53.2 - Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635676E12, 16635.100000000002]], "isOverall": false, "label": "T.7 - Crear Cotizacion Siguiente", "isController": true}, {"data": [[1.59635682E12, 460.9]], "isOverall": false, "label": "16.3 - Hacer clic en Cotizacion nueva", "isController": false}, {"data": [[1.59635706E12, 1914.1]], "isOverall": false, "label": "T.61 - Hacer clic en Cotizacion a cliente", "isController": true}, {"data": [[1.5963567E12, 383.70000000000005]], "isOverall": false, "label": "1.2 - Index", "isController": false}, {"data": [[1.59635682E12, 1054.75], [1.59635676E12, 1182.0]], "isOverall": false, "label": "T.12 - Hacer clic en buscar", "isController": true}, {"data": [[1.59635706E12, 1197.3]], "isOverall": false, "label": "61.1 - Hacer clic en Cotizacion a cliente", "isController": false}, {"data": [[1.59635688E12, 12377.699999999999]], "isOverall": false, "label": "T.25 - Hacer clic en Guardar", "isController": true}, {"data": [[1.59635706E12, 323.3]], "isOverall": false, "label": "64.3 - Cerrar Insis", "isController": false}, {"data": [[1.59635694E12, 360.69999999999993]], "isOverall": false, "label": "44 - Seleccionar el Nombre de cobertura", "isController": true}, {"data": [[1.59635682E12, 369.25], [1.59635676E12, 424.8333333333333]], "isOverall": false, "label": "10.2 - Hacer clic en Agente Crear", "isController": false}, {"data": [[1.5963567E12, 123.6]], "isOverall": false, "label": "2.2 - Ingresar a INSIS-0", "isController": false}, {"data": [[1.5963567E12, 4427.8]], "isOverall": false, "label": "2.2 - Ingresar a INSIS-1", "isController": false}, {"data": [[1.59635682E12, 5312.4]], "isOverall": false, "label": "T.15 - Hacer clic en Cotizacion nueva", "isController": true}, {"data": [[1.59635694E12, 256.9]], "isOverall": false, "label": "33.4 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[1.59635676E12, 628.9]], "isOverall": false, "label": "9.2 - Polizas relacionadas Hacer clic en Siguiente", "isController": false}, {"data": [[1.5963567E12, 8518.5]], "isOverall": false, "label": "T.5 - Hacer clic en Crear cotizacion", "isController": true}, {"data": [[1.59635682E12, 5312.4]], "isOverall": false, "label": "15.1 - Hacer clic en Cotizacion nueva", "isController": false}, {"data": [[1.59635688E12, 511.6]], "isOverall": false, "label": "22.2 - Seleccionar el Numero de pagos", "isController": false}, {"data": [[1.59635688E12, 1723.8]], "isOverall": false, "label": "T.26 - Hacer clic en la pesta\u00F1a Participantes de la poliza", "isController": true}, {"data": [[1.59635688E12, 703.1]], "isOverall": false, "label": "29.4 - Ingresar Identificacion Buscar", "isController": false}, {"data": [[1.59635694E12, 5011.9]], "isOverall": false, "label": "38.1 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635682E12, 8687.100000000002]], "isOverall": false, "label": "T.14 - Hacer clic en Guardar", "isController": true}, {"data": [[1.59635706E12, 2646.5]], "isOverall": false, "label": "64.1 - Cerrar Insis", "isController": false}, {"data": [[1.59635688E12, 8761.300000000001]], "isOverall": false, "label": "31.1 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635682E12, 9060.5], [1.59635676E12, 6825.666666666667]], "isOverall": false, "label": "9.3 - Polizas relacionadas Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635676E12, 488.0]], "isOverall": false, "label": "8.2 - En Historial Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635694E12, 619.8]], "isOverall": false, "label": "35.3 - Cerrar Objeto-365", "isController": false}, {"data": [[1.5963567E12, 387.0]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-0", "isController": false}, {"data": [[1.5963567E12, 7103.125], [1.59635676E12, 8096.0]], "isOverall": false, "label": "6.2 - Ingresar identificacion y Buscar", "isController": false}, {"data": [[1.5963567E12, 133.49999999999997]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-1", "isController": false}, {"data": [[1.59635682E12, 9050.400000000001]], "isOverall": false, "label": "18.1 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635688E12, 863.9]], "isOverall": false, "label": "20.1 - Hacer clic en el icono de editar Facturacion", "isController": false}, {"data": [[1.59635694E12, 349.3]], "isOverall": false, "label": "T.43 - Seleccionar el Objeto asegurado", "isController": true}, {"data": [[1.59635688E12, 22412.4]], "isOverall": false, "label": "19.1 - Hacer clic en siguiente", "isController": false}, {"data": [[1.596357E12, 277.0], [1.59635694E12, 602.2222222222222]], "isOverall": false, "label": "T.48 - Seleccionar la Dimensi\u00F3n de franquicia", "isController": true}, {"data": [[1.59635688E12, 634.4]], "isOverall": false, "label": "30.3 - Ingresar Identificacion Seleccionar y Ok", "isController": false}, {"data": [[1.59635706E12, 361641.4]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59635706E12, 1218.0]], "isOverall": false, "label": "62.1 - Hacer clic en Cotizaci\u00F3n aceptada", "isController": false}, {"data": [[1.596357E12, 398.0], [1.59635694E12, 1834.7777777777778]], "isOverall": false, "label": "47.1 - Ingresar el Valor de franquicia", "isController": false}, {"data": [[1.59635694E12, 360.69999999999993]], "isOverall": false, "label": "44.1 - Seleccionar el Nombre de cobertura", "isController": false}, {"data": [[1.596357E12, 7822.400000000001]], "isOverall": false, "label": "52.1 - 1400 Transporte Terrestre Anual Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635694E12, 463.2]], "isOverall": false, "label": "38.2 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635694E12, 1912.9999999999998]], "isOverall": false, "label": "35.2 - Cerrar Objeto-363", "isController": false}, {"data": [[1.596357E12, 1316.0], [1.59635706E12, 2656.222222222222]], "isOverall": false, "label": "58.1 - Calculo de Prima Guardar", "isController": false}, {"data": [[1.5963567E12, 558.125], [1.59635676E12, 516.5]], "isOverall": false, "label": "6.3 - Ingresar identificacion y Buscar", "isController": false}, {"data": [[1.59635706E12, 166.2]], "isOverall": false, "label": "64.4 - Cerrar Insis", "isController": false}, {"data": [[1.59635682E12, 31194.75], [1.59635676E12, 29264.166666666664]], "isOverall": false, "label": "T.9 - Polizas relacionadas Hacer clic en Siguiente", "isController": true}, {"data": [[1.596357E12, 1295.4]], "isOverall": false, "label": "52.2 - 1400 Transporte Terrestre Anual Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635676E12, 13691.9]], "isOverall": false, "label": "T.8 - En Historial Hacer clic en Siguiente", "isController": true}, {"data": [[1.596357E12, 6559.2]], "isOverall": false, "label": "53.1 - Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635694E12, 8658.1]], "isOverall": false, "label": "41.1 - Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635694E12, 1536.2]], "isOverall": false, "label": "T.36 - Hacer clic en el \u00EDcono de Editar", "isController": true}, {"data": [[1.59635688E12, 588.0], [1.59635694E12, 547.2222222222222]], "isOverall": false, "label": "33.2 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[1.59635694E12, 978.1999999999999]], "isOverall": false, "label": "33.5 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[1.596357E12, 3514.6]], "isOverall": false, "label": "50.1 - Hacer clic en Premium", "isController": false}, {"data": [[1.5963567E12, 434.7]], "isOverall": false, "label": "5.3 - Hacer clic en Crear cotizacion", "isController": false}, {"data": [[1.59635694E12, 1157.8]], "isOverall": false, "label": "41.2 - Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635706E12, 408.40000000000003]], "isOverall": false, "label": "62.3 - Hacer clic en Cotizaci\u00F3n aceptada", "isController": false}, {"data": [[1.59635682E12, 10039.4]], "isOverall": false, "label": "T.18- Hacer clic en Guardar", "isController": true}, {"data": [[1.59635682E12, 522.4], [1.59635676E12, 783.8]], "isOverall": false, "label": "13.4 - Seleccionar agente ok ", "isController": false}, {"data": [[1.59635694E12, 301.7]], "isOverall": false, "label": "T.45 - Seleccionar el Tipo de franquicia", "isController": true}, {"data": [[1.596357E12, 570.0999999999999]], "isOverall": false, "label": "55.2 - Impuestos Hacer clic en Siguiente", "isController": false}, {"data": [[1.596357E12, 8644.5]], "isOverall": false, "label": "51.1 - Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635676E12, 13203.900000000001]], "isOverall": false, "label": "8.1 - En Historial Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635682E12, 576.6], [1.59635676E12, 708.6]], "isOverall": false, "label": "13.2 - Seleccionar agente ok ", "isController": false}, {"data": [[1.59635694E12, 1536.2]], "isOverall": false, "label": "36.1 - Hacer clic en el \u00EDcono de Editar", "isController": false}, {"data": [[1.59635694E12, 2666.8]], "isOverall": false, "label": "T.34 - Grabar Objeto", "isController": true}, {"data": [[1.596357E12, 1404.5]], "isOverall": false, "label": "51.2 - Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635688E12, 10668.3]], "isOverall": false, "label": "25.1 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635694E12, 4247.500000000001]], "isOverall": false, "label": "40.1 - Hacer clic en Siguiente", "isController": false}, {"data": [[1.596357E12, 472.69999999999993]], "isOverall": false, "label": "49.2 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635694E12, 959.0]], "isOverall": false, "label": "33.7 -Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[1.59635694E12, 674.2]], "isOverall": false, "label": "42.1 - Crear Deducible", "isController": false}, {"data": [[1.596357E12, 8394.4], [1.59635706E12, 7516.2]], "isOverall": false, "label": "56.1 - Clausulas Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635682E12, 8010.4]], "isOverall": false, "label": "14 .1 - Hacer clic en Guardar", "isController": false}, {"data": [[1.5963567E12, 702.6999999999998]], "isOverall": false, "label": "T.4 - Hacer clic en Control de polizas", "isController": true}, {"data": [[1.59635682E12, 8131.9]], "isOverall": false, "label": "17.2 - Seleccionar el Nombre de producto ok", "isController": false}, {"data": [[1.596357E12, 562.1999999999999]], "isOverall": false, "label": "54.2 - Comisiones Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635688E12, 2513.8999999999996]], "isOverall": false, "label": "T.30 - Ingresar Identificacion Seleccionar y Ok", "isController": true}, {"data": [[1.5963567E12, 552.0]], "isOverall": false, "label": "1.1 - Index", "isController": false}, {"data": [[1.5963567E12, 381.70000000000005]], "isOverall": false, "label": "4.1 - Hacer clic en Control de polizas", "isController": false}, {"data": [[1.5963567E12, 8101.000000000001], [1.59635676E12, 8994.5]], "isOverall": false, "label": "T.6 - Ingresar identificacion y Buscar", "isController": true}, {"data": [[1.59635682E12, 4405.0]], "isOverall": false, "label": "T.16 - Hacer clic en Cotizacion nueva", "isController": true}, {"data": [[1.5963567E12, 5527.7]], "isOverall": false, "label": "T.2 - Ingresar a INSIS", "isController": true}, {"data": [[1.59635688E12, 863.7]], "isOverall": false, "label": "30.2 - Ingresar Identificacion Seleccionar y Ok", "isController": false}, {"data": [[1.59635688E12, 1083.7]], "isOverall": false, "label": "22.1 - Seleccionar el Numero de pagos", "isController": false}, {"data": [[1.59635688E12, 495.7]], "isOverall": false, "label": "21.1 - Hacer clic en el icono de editar Facturacion", "isController": false}, {"data": [[1.5963567E12, 321.0]], "isOverall": false, "label": "4.2 - Hacer clic en Control de polizas", "isController": false}, {"data": [[1.59635688E12, 692.7999999999998]], "isOverall": false, "label": "29.3 - Ingresar Identificacion Buscar", "isController": false}, {"data": [[1.59635682E12, 1023.5], [1.59635676E12, 1076.8333333333333]], "isOverall": false, "label": "10.1 - Hacer clic en Agente Crear", "isController": false}, {"data": [[1.596357E12, 7236.7]], "isOverall": false, "label": "T.53 - Hacer clic en Siguiente", "isController": true}, {"data": [[1.5963567E12, 521.0]], "isOverall": false, "label": "2.1 - Ingresar a INSIS", "isController": false}, {"data": [[1.59635688E12, 1386.8000000000002]], "isOverall": false, "label": "27.2 - Hacer clic en Crear", "isController": false}, {"data": [[1.59635706E12, 564.9999999999999]], "isOverall": false, "label": "T.63 - Hacer clic en Proceder", "isController": true}, {"data": [[1.596357E12, 9666.7]], "isOverall": false, "label": "T.55 - Impuestos Hacer clic en Siguiente", "isController": true}, {"data": [[1.59635682E12, 989.0]], "isOverall": false, "label": "18.2 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635688E12, 23252.5]], "isOverall": false, "label": "T.19 - Hacer clic en siguiente", "isController": true}, {"data": [[1.59635706E12, 241.1]], "isOverall": false, "label": "63.2 - Hacer clic en Proceder", "isController": false}, {"data": [[1.59635682E12, 1289.7999999999997]], "isOverall": false, "label": "16.2 - Hacer clic en Cotizacion nueva", "isController": false}, {"data": [[1.59635682E12, 931.2]], "isOverall": false, "label": "17.3 - Seleccionar el Nombre de producto ok", "isController": false}, {"data": [[1.59635694E12, 1080.1]], "isOverall": false, "label": "33.3 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[1.59635706E12, 3683.5]], "isOverall": false, "label": "T.59 - Calculo de Prima Premium", "isController": true}, {"data": [[1.59635682E12, 546.0], [1.59635676E12, 626.8333333333334]], "isOverall": false, "label": "11.3 - Buscar Agente", "isController": false}, {"data": [[1.59635706E12, 3412.6]], "isOverall": false, "label": "T.64 - Cerrar Insis", "isController": true}, {"data": [[1.59635682E12, 2532.8], [1.59635676E12, 3020.6]], "isOverall": false, "label": "T.13 - Seleccionar agente ok ", "isController": true}, {"data": [[1.59635694E12, 3111.8000000000006]], "isOverall": false, "label": "T.35 - Cerrar Objeto", "isController": true}, {"data": [[1.59635694E12, 8381.300000000001]], "isOverall": false, "label": "T.33 - Hacer clic en A\u00F1adir objeto", "isController": true}, {"data": [[1.59635682E12, 1054.75], [1.59635676E12, 1182.0]], "isOverall": false, "label": "12.1 - Hacer clic en buscar", "isController": false}, {"data": [[1.596357E12, 3514.6]], "isOverall": false, "label": "T.50 - Hacer clic en Premium", "isController": true}, {"data": [[1.59635688E12, 758.6]], "isOverall": false, "label": "T.24 - Seleccionar el Modo de pago", "isController": true}, {"data": [[1.596357E12, 1470.0], [1.59635706E12, 3184.8888888888887]], "isOverall": false, "label": "T.58 - Calculo de Prima Guardar", "isController": true}, {"data": [[1.59635706E12, 3683.5]], "isOverall": false, "label": "59.1 - Calculo de Prima Premium", "isController": false}, {"data": [[1.59635688E12, 758.6]], "isOverall": false, "label": "24.1 - Seleccionar el Modo de pago", "isController": false}, {"data": [[1.596357E12, 9117.8]], "isOverall": false, "label": "T.52 - 1400 Transporte Terrestre Anual Hacer clic en Siguiente", "isController": true}, {"data": [[1.59635694E12, 5297.4]], "isOverall": false, "label": "39.1 - Hacer clic en Premium", "isController": false}, {"data": [[1.596357E12, 398.0], [1.59635694E12, 1834.7777777777778]], "isOverall": false, "label": "T.47 - Ingresar el Valor de franquicia", "isController": true}, {"data": [[1.59635682E12, 948.0]], "isOverall": false, "label": "17.1 - Seleccionar el Nombre de producto ok", "isController": false}, {"data": [[1.59635706E12, 716.8]], "isOverall": false, "label": "61.2 - Hacer clic en Cotizacion a cliente", "isController": false}, {"data": [[1.5963567E12, 585.6]], "isOverall": false, "label": "5.2 - Hacer clic en Crear cotizacion", "isController": false}, {"data": [[1.59635706E12, 190.8]], "isOverall": false, "label": "64.1 - Cerrar Insis-2", "isController": false}, {"data": [[1.596357E12, 154.0], [1.59635706E12, 528.6666666666667]], "isOverall": false, "label": "58.2 - Calculo de Prima Guardar", "isController": false}, {"data": [[1.59635706E12, 610.6]], "isOverall": false, "label": "64.1 - Cerrar Insis-1", "isController": false}, {"data": [[1.59635688E12, 1015.8000000000001]], "isOverall": false, "label": "30.1 - Ingresar Identificacion Seleccionar y Ok", "isController": false}, {"data": [[1.59635706E12, 1844.3]], "isOverall": false, "label": "64.1 - Cerrar Insis-0", "isController": false}, {"data": [[1.59635682E12, 676.6999999999999]], "isOverall": false, "label": "14.2 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635694E12, 833.0]], "isOverall": false, "label": "33.8 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[1.5963567E12, 361.4]], "isOverall": false, "label": "3.1 - Hacer clic en Operaciones del sistema", "isController": false}, {"data": [[1.59635688E12, 863.9]], "isOverall": false, "label": "T.20 - Hacer clic en el icono de editar Facturacion", "isController": true}, {"data": [[1.59635694E12, 5475.1]], "isOverall": false, "label": "T.38 - Hacer clic en Guardar", "isController": true}, {"data": [[1.59635688E12, 666.8]], "isOverall": false, "label": "T.23 - Seleccionar el Dia de pago", "isController": true}, {"data": [[1.59635694E12, 604.8000000000001]], "isOverall": false, "label": "T.37 - Ingresar el valor asegurado", "isController": true}, {"data": [[1.59635688E12, 1709.4]], "isOverall": false, "label": "25.2 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635688E12, 495.7]], "isOverall": false, "label": "T.21 - Hacer clic en el icono de editar Facturacion", "isController": true}, {"data": [[1.59635682E12, 854.8], [1.59635676E12, 814.6]], "isOverall": false, "label": "13.1 - Seleccionar agente ok ", "isController": false}, {"data": [[1.59635706E12, 191.4]], "isOverall": false, "label": "64.3 - Cerrar Insis-1", "isController": false}, {"data": [[1.59635706E12, 131.79999999999998]], "isOverall": false, "label": "64.3 - Cerrar Insis-0", "isController": false}, {"data": [[1.596357E12, 4734.899999999999]], "isOverall": false, "label": "T.49 - Hacer clic en Guardar", "isController": true}, {"data": [[1.59635688E12, 4674.3]], "isOverall": false, "label": "T.28 - Hacer clic en el \u00EDcono de Buscar", "isController": true}, {"data": [[1.59635706E12, 2094.8]], "isOverall": false, "label": "T.62 - Hacer clic en Cotizaci\u00F3n aceptada", "isController": true}, {"data": [[1.59635688E12, 840.0999999999999]], "isOverall": false, "label": "19 .2- Hacer clic en siguiente", "isController": false}, {"data": [[1.59635676E12, 21687.9]], "isOverall": false, "label": "9.1 - Polizas relacionadas Hacer clic en Siguiente", "isController": false}, {"data": [[1.596357E12, 5799.5], [1.59635706E12, 8458.75]], "isOverall": false, "label": "57.1 - Informacion del cliente  Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635688E12, 836.9]], "isOverall": false, "label": "31.2 - Hacer clic en Guardar", "isController": false}, {"data": [[1.596357E12, 8360.7]], "isOverall": false, "label": "T.54 - Comisiones Hacer clic en Siguiente", "isController": true}, {"data": [[1.59635688E12, 10614.833333333334], [1.59635694E12, 23097.5]], "isOverall": false, "label": "32.1 - Hacer clic en Siguiente", "isController": false}, {"data": [[1.596357E12, 4262.2]], "isOverall": false, "label": "49.1 - Hacer clic en Guardar", "isController": false}, {"data": [[1.596357E12, 6319.5], [1.59635706E12, 8997.625000000002]], "isOverall": false, "label": "T.57 - Informacion del cliente  Hacer clic en Siguiente", "isController": true}, {"data": [[1.59635688E12, 2355.2000000000003]], "isOverall": false, "label": "T.27 - Hacer clic en Crear", "isController": true}, {"data": [[1.5963567E12, 4551.5]], "isOverall": false, "label": "2.2 - Ingresar a INSIS", "isController": false}, {"data": [[1.5963567E12, 7498.2]], "isOverall": false, "label": "5.1 - Hacer clic en Crear cotizacion", "isController": false}, {"data": [[1.59635676E12, 16106.299999999996]], "isOverall": false, "label": "7.1 - Crear Cotizacion Siguiente", "isController": false}, {"data": [[1.5963567E12, 455.20000000000005]], "isOverall": false, "label": "2.3 - Ingresar a INSIS", "isController": false}, {"data": [[1.59635688E12, 11401.6], [1.59635694E12, 20809.0]], "isOverall": false, "label": "T.32 - Hacer clic en Siguiente", "isController": true}, {"data": [[1.59635682E12, 978.5]], "isOverall": false, "label": "16.4 - Hacer clic en Cotizacion nueva", "isController": false}, {"data": [[1.59635682E12, 1675.8]], "isOverall": false, "label": "16.1 - Hacer clic en Cotizacion nueva", "isController": false}, {"data": [[1.596357E12, 523.6], [1.59635706E12, 513.8]], "isOverall": false, "label": "56.2 - Clausulas Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635688E12, 9598.2]], "isOverall": false, "label": "T.31 - Hacer clic en Guardar", "isController": true}, {"data": [[1.59635694E12, 604.8000000000001]], "isOverall": false, "label": "37- Ingresar el valor asegurado", "isController": false}, {"data": [[1.59635694E12, 9815.9]], "isOverall": false, "label": "T.41 - Hacer clic en Siguiente", "isController": true}, {"data": [[1.59635682E12, 442.0], [1.59635676E12, 626.5]], "isOverall": false, "label": "11.1 - Buscar Agente", "isController": false}, {"data": [[1.596357E12, 700.0], [1.59635694E12, 8470.333333333334]], "isOverall": false, "label": "T.46 - Seleccionar el reclamo de franquicia", "isController": true}, {"data": [[1.596357E12, 10049.0]], "isOverall": false, "label": "T.51 - Hacer clic en Siguiente", "isController": true}, {"data": [[1.596357E12, 108.0], [1.59635694E12, 7984.666666666667]], "isOverall": false, "label": "46.2 - Seleccionar el reclamo de franquicia", "isController": false}, {"data": [[1.5963567E12, 428.2]], "isOverall": false, "label": "6.1 - Ingresar identificacion y Buscar", "isController": false}, {"data": [[1.59635676E12, 528.8000000000001]], "isOverall": false, "label": "7.2 - Crear Cotizacion Siguiente", "isController": false}, {"data": [[1.59635688E12, 1756.4]], "isOverall": false, "label": "28.1 - Hacer clic en el \u00EDcono de Buscar", "isController": false}, {"data": [[1.59635694E12, 2199.3]], "isOverall": false, "label": "34.1 - Grabar Objeto", "isController": false}, {"data": [[1.596357E12, 592.0], [1.59635694E12, 485.6666666666667]], "isOverall": false, "label": "46.1 - Seleccionar el reclamo de franquicia", "isController": false}, {"data": [[1.59635688E12, 1248.0]], "isOverall": false, "label": "29.2 - Ingresar Identificacion Buscar", "isController": false}, {"data": [[1.596357E12, 8918.0], [1.59635706E12, 8030.0]], "isOverall": false, "label": "T.56 - Clausulas Hacer clic en Siguiente", "isController": true}, {"data": [[1.5963567E12, 361.4]], "isOverall": false, "label": "T.3 - Hacer clic en Operaciones del sistema", "isController": true}, {"data": [[1.59635694E12, 349.3]], "isOverall": false, "label": "43.1 - Seleccionar el Objeto asegurado", "isController": false}, {"data": [[1.596357E12, 277.0], [1.59635694E12, 602.2222222222222]], "isOverall": false, "label": "48.1 - Seleccionar la Dimensi\u00F3n de franquicia", "isController": false}, {"data": [[1.596357E12, 520.0], [1.59635706E12, 538.875]], "isOverall": false, "label": "57.2 - Informacion del cliente  Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635706E12, 0.4]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59635682E12, 2274.5], [1.59635676E12, 2617.0]], "isOverall": false, "label": "T.11 - Buscar Agente", "isController": true}, {"data": [[1.59635682E12, 10011.1]], "isOverall": false, "label": "T.17 - Seleccionar el Nombre de producto ok", "isController": true}, {"data": [[1.59635682E12, 1392.75], [1.59635676E12, 1501.6666666666665]], "isOverall": false, "label": "T.10 - Hacer clic en Agente Crear", "isController": true}, {"data": [[1.596357E12, 7798.5]], "isOverall": false, "label": "54.1 - Comisiones Hacer clic en Siguiente", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59635706E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.5963567E12, "maxY": 309138.99999999994, "series": [{"data": [[1.59635694E12, 480.9]], "isOverall": false, "label": "T.42 - Crear Deducible", "isController": true}, {"data": [[1.59635694E12, 450.4]], "isOverall": false, "label": "34.2 - Grabar Objeto", "isController": false}, {"data": [[1.59635682E12, 523.125], [1.59635676E12, 576.0833333333334]], "isOverall": false, "label": "11.2 - Buscar Agente", "isController": false}, {"data": [[1.59635688E12, 668.0]], "isOverall": false, "label": "29.1 - Ingresar Identificacion", "isController": false}, {"data": [[1.59635682E12, 565.0], [1.59635676E12, 686.6]], "isOverall": false, "label": "13.3 - Seleccionar agente ok ", "isController": false}, {"data": [[1.59635688E12, 645.6]], "isOverall": false, "label": "23.3 - Seleccionar el Dia de pago", "isController": false}, {"data": [[1.59635688E12, 996.4999999999998]], "isOverall": false, "label": "28.2 - Hacer clic en el \u00EDcono de Buscar", "isController": false}, {"data": [[1.59635706E12, 349.7]], "isOverall": false, "label": "60.3 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial", "isController": false}, {"data": [[1.59635706E12, 96.39999999999999]], "isOverall": false, "label": "64.2 - Cerrar Insis", "isController": false}, {"data": [[1.59635706E12, 96.39999999999999]], "isOverall": false, "label": "64.2 - Cerrar Insis-0", "isController": false}, {"data": [[1.59635706E12, 318.8]], "isOverall": false, "label": "63.1 - Hacer clic en Proceder", "isController": false}, {"data": [[1.596357E12, 7696.5]], "isOverall": false, "label": "55.1 - Impuestos Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635688E12, 326.4]], "isOverall": false, "label": "26.2 - Hacer clic en la pesta\u00F1a Participantes de la poliza", "isController": false}, {"data": [[1.59635694E12, 4032.1]], "isOverall": false, "label": "T.39 - Hacer clic en Premium", "isController": true}, {"data": [[1.59635688E12, 538.5]], "isOverall": false, "label": "28.3 - Hacer clic en el \u00EDcono de Buscar", "isController": false}, {"data": [[1.59635688E12, 1671.5], [1.59635694E12, 2090.375]], "isOverall": false, "label": "33.1 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[1.59635706E12, 489.5999999999999]], "isOverall": false, "label": "60.2 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial", "isController": false}, {"data": [[1.59635706E12, 283.1]], "isOverall": false, "label": "62.2 - Hacer clic en Cotizaci\u00F3n aceptada-414", "isController": false}, {"data": [[1.59635694E12, 571.0]], "isOverall": false, "label": "35.1 - Cerrar Objeto", "isController": false}, {"data": [[1.59635688E12, 853.0]], "isOverall": false, "label": "26.1 - Hacer clic en la pesta\u00F1a Participantes de la poliza", "isController": false}, {"data": [[1.5963567E12, 148.2]], "isOverall": false, "label": "1.2 - Index-0", "isController": false}, {"data": [[1.59635688E12, 3084.3]], "isOverall": false, "label": "T.29 - Ingresar Identificacion Buscar", "isController": true}, {"data": [[1.59635706E12, 6694.699999999999]], "isOverall": false, "label": "60.1 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial", "isController": false}, {"data": [[1.59635688E12, 876.5000000000001]], "isOverall": false, "label": "27.1 - Hacer clic en Crear", "isController": false}, {"data": [[1.5963567E12, 137.3]], "isOverall": false, "label": "1.2 - Index-1", "isController": false}, {"data": [[1.59635688E12, 477.4], [1.59635694E12, 468.0]], "isOverall": false, "label": "32.2 -  Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635694E12, 7575.900000000001]], "isOverall": false, "label": "T.40 - Hacer clic en Siguiente", "isController": true}, {"data": [[1.59635688E12, 1302.2]], "isOverall": false, "label": "T.22 - Seleccionar el Numero de pagos", "isController": true}, {"data": [[1.59635694E12, 296.5]], "isOverall": false, "label": "45.1 - Seleccionar el Tipo de franquicia", "isController": false}, {"data": [[1.59635706E12, 7534.000000000001]], "isOverall": false, "label": "T.60 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial", "isController": true}, {"data": [[1.5963567E12, 626.0]], "isOverall": false, "label": "T.1 - Index", "isController": true}, {"data": [[1.59635706E12, 179.3]], "isOverall": false, "label": "64.2 - Cerrar Insis-1", "isController": false}, {"data": [[1.59635688E12, 823.3000000000001]], "isOverall": false, "label": "28.4 - Hacer clic en el \u00EDcono de Buscar", "isController": false}, {"data": [[1.59635694E12, 1067.0000000000002]], "isOverall": false, "label": "33.6 -Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[1.596357E12, 457.0]], "isOverall": false, "label": "53.2 - Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635676E12, 13668.699999999999]], "isOverall": false, "label": "T.7 - Crear Cotizacion Siguiente", "isController": true}, {"data": [[1.59635682E12, 425.2]], "isOverall": false, "label": "16.3 - Hacer clic en Cotizacion nueva", "isController": false}, {"data": [[1.59635706E12, 1502.2]], "isOverall": false, "label": "T.61 - Hacer clic en Cotizacion a cliente", "isController": true}, {"data": [[1.5963567E12, 148.2]], "isOverall": false, "label": "1.2 - Index", "isController": false}, {"data": [[1.59635682E12, 658.75], [1.59635676E12, 776.5]], "isOverall": false, "label": "T.12 - Hacer clic en buscar", "isController": true}, {"data": [[1.59635706E12, 1028.6]], "isOverall": false, "label": "61.1 - Hacer clic en Cotizacion a cliente", "isController": false}, {"data": [[1.59635688E12, 8847.7]], "isOverall": false, "label": "T.25 - Hacer clic en Guardar", "isController": true}, {"data": [[1.59635706E12, 131.79999999999998]], "isOverall": false, "label": "64.3 - Cerrar Insis", "isController": false}, {"data": [[1.59635694E12, 352.1]], "isOverall": false, "label": "44 - Seleccionar el Nombre de cobertura", "isController": true}, {"data": [[1.59635682E12, 205.5], [1.59635676E12, 233.83333333333334]], "isOverall": false, "label": "10.2 - Hacer clic en Agente Crear", "isController": false}, {"data": [[1.5963567E12, 122.1]], "isOverall": false, "label": "2.2 - Ingresar a INSIS-0", "isController": false}, {"data": [[1.5963567E12, 4043.2999999999997]], "isOverall": false, "label": "2.2 - Ingresar a INSIS-1", "isController": false}, {"data": [[1.59635682E12, 5236.400000000001]], "isOverall": false, "label": "T.15 - Hacer clic en Cotizacion nueva", "isController": true}, {"data": [[1.59635694E12, 223.39999999999998]], "isOverall": false, "label": "33.4 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[1.59635676E12, 526.0]], "isOverall": false, "label": "9.2 - Polizas relacionadas Hacer clic en Siguiente", "isController": false}, {"data": [[1.5963567E12, 3003.7]], "isOverall": false, "label": "T.5 - Hacer clic en Crear cotizacion", "isController": true}, {"data": [[1.59635682E12, 5236.400000000001]], "isOverall": false, "label": "15.1 - Hacer clic en Cotizacion nueva", "isController": false}, {"data": [[1.59635688E12, 302.1]], "isOverall": false, "label": "22.2 - Seleccionar el Numero de pagos", "isController": false}, {"data": [[1.59635688E12, 1179.4]], "isOverall": false, "label": "T.26 - Hacer clic en la pesta\u00F1a Participantes de la poliza", "isController": true}, {"data": [[1.59635688E12, 681.5]], "isOverall": false, "label": "29.4 - Ingresar Identificacion Buscar", "isController": false}, {"data": [[1.59635694E12, 3389.0]], "isOverall": false, "label": "38.1 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635682E12, 7330.9]], "isOverall": false, "label": "T.14 - Hacer clic en Guardar", "isController": true}, {"data": [[1.59635706E12, 1844.3]], "isOverall": false, "label": "64.1 - Cerrar Insis", "isController": false}, {"data": [[1.59635688E12, 7815.7]], "isOverall": false, "label": "31.1 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635682E12, 9047.0], [1.59635676E12, 6815.666666666667]], "isOverall": false, "label": "9.3 - Polizas relacionadas Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635676E12, 437.5]], "isOverall": false, "label": "8.2 - En Historial Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635694E12, 615.2]], "isOverall": false, "label": "35.3 - Cerrar Objeto-365", "isController": false}, {"data": [[1.5963567E12, 387.0]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-0", "isController": false}, {"data": [[1.5963567E12, 7028.875], [1.59635676E12, 8051.0]], "isOverall": false, "label": "6.2 - Ingresar identificacion y Buscar", "isController": false}, {"data": [[1.5963567E12, 124.1]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-1", "isController": false}, {"data": [[1.59635682E12, 7997.3]], "isOverall": false, "label": "18.1 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635688E12, 773.1]], "isOverall": false, "label": "20.1 - Hacer clic en el icono de editar Facturacion", "isController": false}, {"data": [[1.59635694E12, 341.1]], "isOverall": false, "label": "T.43 - Seleccionar el Objeto asegurado", "isController": true}, {"data": [[1.59635688E12, 21468.600000000002]], "isOverall": false, "label": "19.1 - Hacer clic en siguiente", "isController": false}, {"data": [[1.596357E12, 269.0], [1.59635694E12, 588.6666666666666]], "isOverall": false, "label": "T.48 - Seleccionar la Dimensi\u00F3n de franquicia", "isController": true}, {"data": [[1.59635688E12, 616.5]], "isOverall": false, "label": "30.3 - Ingresar Identificacion Seleccionar y Ok", "isController": false}, {"data": [[1.59635706E12, 309138.99999999994]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59635706E12, 986.5]], "isOverall": false, "label": "62.1 - Hacer clic en Cotizaci\u00F3n aceptada", "isController": false}, {"data": [[1.596357E12, 391.0], [1.59635694E12, 1823.7777777777778]], "isOverall": false, "label": "47.1 - Ingresar el Valor de franquicia", "isController": false}, {"data": [[1.59635694E12, 352.1]], "isOverall": false, "label": "44.1 - Seleccionar el Nombre de cobertura", "isController": false}, {"data": [[1.596357E12, 6987.3]], "isOverall": false, "label": "52.1 - 1400 Transporte Terrestre Anual Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635694E12, 449.40000000000003]], "isOverall": false, "label": "38.2 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635694E12, 700.0]], "isOverall": false, "label": "35.2 - Cerrar Objeto-363", "isController": false}, {"data": [[1.596357E12, 1047.0], [1.59635706E12, 2086.777777777778]], "isOverall": false, "label": "58.1 - Calculo de Prima Guardar", "isController": false}, {"data": [[1.5963567E12, 464.375], [1.59635676E12, 461.5]], "isOverall": false, "label": "6.3 - Ingresar identificacion y Buscar", "isController": false}, {"data": [[1.59635706E12, 164.79999999999998]], "isOverall": false, "label": "64.4 - Cerrar Insis", "isController": false}, {"data": [[1.59635682E12, 29820.25], [1.59635676E12, 27902.5]], "isOverall": false, "label": "T.9 - Polizas relacionadas Hacer clic en Siguiente", "isController": true}, {"data": [[1.596357E12, 460.20000000000005]], "isOverall": false, "label": "52.2 - 1400 Transporte Terrestre Anual Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635676E12, 12908.699999999999]], "isOverall": false, "label": "T.8 - En Historial Hacer clic en Siguiente", "isController": true}, {"data": [[1.596357E12, 6050.8]], "isOverall": false, "label": "53.1 - Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635694E12, 7921.299999999999]], "isOverall": false, "label": "41.1 - Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635694E12, 417.1]], "isOverall": false, "label": "T.36 - Hacer clic en el \u00EDcono de Editar", "isController": true}, {"data": [[1.59635688E12, 588.0], [1.59635694E12, 506.22222222222223]], "isOverall": false, "label": "33.2 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[1.59635694E12, 969.5]], "isOverall": false, "label": "33.5 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[1.596357E12, 3389.7000000000003]], "isOverall": false, "label": "50.1 - Hacer clic en Premium", "isController": false}, {"data": [[1.5963567E12, 400.59999999999997]], "isOverall": false, "label": "5.3 - Hacer clic en Crear cotizacion", "isController": false}, {"data": [[1.59635694E12, 1153.1]], "isOverall": false, "label": "41.2 - Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635706E12, 403.8]], "isOverall": false, "label": "62.3 - Hacer clic en Cotizaci\u00F3n aceptada", "isController": false}, {"data": [[1.59635682E12, 8557.0]], "isOverall": false, "label": "T.18- Hacer clic en Guardar", "isController": true}, {"data": [[1.59635682E12, 501.2], [1.59635676E12, 763.2]], "isOverall": false, "label": "13.4 - Seleccionar agente ok ", "isController": false}, {"data": [[1.59635694E12, 296.5]], "isOverall": false, "label": "T.45 - Seleccionar el Tipo de franquicia", "isController": true}, {"data": [[1.596357E12, 436.59999999999997]], "isOverall": false, "label": "55.2 - Impuestos Hacer clic en Siguiente", "isController": false}, {"data": [[1.596357E12, 7890.6]], "isOverall": false, "label": "51.1 - Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635676E12, 12471.2]], "isOverall": false, "label": "8.1 - En Historial Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635682E12, 564.6], [1.59635676E12, 694.8]], "isOverall": false, "label": "13.2 - Seleccionar agente ok ", "isController": false}, {"data": [[1.59635694E12, 417.1]], "isOverall": false, "label": "36.1 - Hacer clic en el \u00EDcono de Editar", "isController": false}, {"data": [[1.59635694E12, 2257.8]], "isOverall": false, "label": "T.34 - Grabar Objeto", "isController": true}, {"data": [[1.596357E12, 438.7]], "isOverall": false, "label": "51.2 - Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635688E12, 8263.5]], "isOverall": false, "label": "25.1 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635694E12, 3787.9499999999994]], "isOverall": false, "label": "40.1 - Hacer clic en Siguiente", "isController": false}, {"data": [[1.596357E12, 457.20000000000005]], "isOverall": false, "label": "49.2 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635694E12, 941.6999999999998]], "isOverall": false, "label": "33.7 -Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[1.59635694E12, 480.9]], "isOverall": false, "label": "42.1 - Crear Deducible", "isController": false}, {"data": [[1.596357E12, 7638.0], [1.59635706E12, 6850.2]], "isOverall": false, "label": "56.1 - Clausulas Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635682E12, 6831.4]], "isOverall": false, "label": "14 .1 - Hacer clic en Guardar", "isController": false}, {"data": [[1.5963567E12, 562.7]], "isOverall": false, "label": "T.4 - Hacer clic en Control de polizas", "isController": true}, {"data": [[1.59635682E12, 7594.3]], "isOverall": false, "label": "17.2 - Seleccionar el Nombre de producto ok", "isController": false}, {"data": [[1.596357E12, 433.0]], "isOverall": false, "label": "54.2 - Comisiones Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635688E12, 2428.3999999999996]], "isOverall": false, "label": "T.30 - Ingresar Identificacion Seleccionar y Ok", "isController": true}, {"data": [[1.5963567E12, 477.7999999999999]], "isOverall": false, "label": "1.1 - Index", "isController": false}, {"data": [[1.5963567E12, 256.4]], "isOverall": false, "label": "4.1 - Hacer clic en Control de polizas", "isController": false}, {"data": [[1.5963567E12, 7922.25], [1.59635676E12, 8883.0]], "isOverall": false, "label": "T.6 - Ingresar identificacion y Buscar", "isController": true}, {"data": [[1.59635682E12, 4116.1]], "isOverall": false, "label": "T.16 - Hacer clic en Cotizacion nueva", "isController": true}, {"data": [[1.5963567E12, 962.6]], "isOverall": false, "label": "T.2 - Ingresar a INSIS", "isController": true}, {"data": [[1.59635688E12, 825.6]], "isOverall": false, "label": "30.2 - Ingresar Identificacion Seleccionar y Ok", "isController": false}, {"data": [[1.59635688E12, 1000.1]], "isOverall": false, "label": "22.1 - Seleccionar el Numero de pagos", "isController": false}, {"data": [[1.59635688E12, 290.7]], "isOverall": false, "label": "21.1 - Hacer clic en el icono de editar Facturacion", "isController": false}, {"data": [[1.5963567E12, 306.3]], "isOverall": false, "label": "4.2 - Hacer clic en Control de polizas", "isController": false}, {"data": [[1.59635688E12, 575.2]], "isOverall": false, "label": "29.3 - Ingresar Identificacion Buscar", "isController": false}, {"data": [[1.59635682E12, 933.75], [1.59635676E12, 982.6666666666666]], "isOverall": false, "label": "10.1 - Hacer clic en Agente Crear", "isController": false}, {"data": [[1.596357E12, 6507.799999999999]], "isOverall": false, "label": "T.53 - Hacer clic en Siguiente", "isController": true}, {"data": [[1.5963567E12, 387.0]], "isOverall": false, "label": "2.1 - Ingresar a INSIS", "isController": false}, {"data": [[1.59635688E12, 1013.9000000000002]], "isOverall": false, "label": "27.2 - Hacer clic en Crear", "isController": false}, {"data": [[1.59635706E12, 553.4]], "isOverall": false, "label": "T.63 - Hacer clic en Proceder", "isController": true}, {"data": [[1.596357E12, 8133.1]], "isOverall": false, "label": "T.55 - Impuestos Hacer clic en Siguiente", "isController": true}, {"data": [[1.59635682E12, 559.7]], "isOverall": false, "label": "18.2 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635688E12, 22071.9]], "isOverall": false, "label": "T.19 - Hacer clic en siguiente", "isController": true}, {"data": [[1.59635706E12, 234.60000000000002]], "isOverall": false, "label": "63.2 - Hacer clic en Proceder", "isController": false}, {"data": [[1.59635682E12, 1087.6]], "isOverall": false, "label": "16.2 - Hacer clic en Cotizacion nueva", "isController": false}, {"data": [[1.59635682E12, 580.8000000000001]], "isOverall": false, "label": "17.3 - Seleccionar el Nombre de producto ok", "isController": false}, {"data": [[1.59635694E12, 461.0]], "isOverall": false, "label": "33.3 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[1.59635706E12, 3577.7]], "isOverall": false, "label": "T.59 - Calculo de Prima Premium", "isController": true}, {"data": [[1.59635682E12, 534.0], [1.59635676E12, 608.3333333333334]], "isOverall": false, "label": "11.3 - Buscar Agente", "isController": false}, {"data": [[1.59635706E12, 2237.3]], "isOverall": false, "label": "T.64 - Cerrar Insis", "isController": true}, {"data": [[1.59635682E12, 2464.8], [1.59635676E12, 2943.8]], "isOverall": false, "label": "T.13 - Seleccionar agente ok ", "isController": true}, {"data": [[1.59635694E12, 1886.2]], "isOverall": false, "label": "T.35 - Cerrar Objeto", "isController": true}, {"data": [[1.59635694E12, 7004.200000000001]], "isOverall": false, "label": "T.33 - Hacer clic en A\u00F1adir objeto", "isController": true}, {"data": [[1.59635682E12, 658.75], [1.59635676E12, 776.5]], "isOverall": false, "label": "12.1 - Hacer clic en buscar", "isController": false}, {"data": [[1.596357E12, 3389.7000000000003]], "isOverall": false, "label": "T.50 - Hacer clic en Premium", "isController": true}, {"data": [[1.59635688E12, 730.2]], "isOverall": false, "label": "T.24 - Seleccionar el Modo de pago", "isController": true}, {"data": [[1.596357E12, 1177.0], [1.59635706E12, 2517.0]], "isOverall": false, "label": "T.58 - Calculo de Prima Guardar", "isController": true}, {"data": [[1.59635706E12, 3577.7]], "isOverall": false, "label": "59.1 - Calculo de Prima Premium", "isController": false}, {"data": [[1.59635688E12, 730.2]], "isOverall": false, "label": "24.1 - Seleccionar el Modo de pago", "isController": false}, {"data": [[1.596357E12, 7447.5]], "isOverall": false, "label": "T.52 - 1400 Transporte Terrestre Anual Hacer clic en Siguiente", "isController": true}, {"data": [[1.59635694E12, 4032.1]], "isOverall": false, "label": "39.1 - Hacer clic en Premium", "isController": false}, {"data": [[1.596357E12, 391.0], [1.59635694E12, 1823.7777777777778]], "isOverall": false, "label": "T.47 - Ingresar el Valor de franquicia", "isController": true}, {"data": [[1.59635682E12, 930.6000000000001]], "isOverall": false, "label": "17.1 - Seleccionar el Nombre de producto ok", "isController": false}, {"data": [[1.59635706E12, 473.6]], "isOverall": false, "label": "61.2 - Hacer clic en Cotizacion a cliente", "isController": false}, {"data": [[1.5963567E12, 489.0]], "isOverall": false, "label": "5.2 - Hacer clic en Crear cotizacion", "isController": false}, {"data": [[1.59635706E12, 97.89999999999999]], "isOverall": false, "label": "64.1 - Cerrar Insis-2", "isController": false}, {"data": [[1.596357E12, 130.0], [1.59635706E12, 430.22222222222223]], "isOverall": false, "label": "58.2 - Calculo de Prima Guardar", "isController": false}, {"data": [[1.59635706E12, 610.6]], "isOverall": false, "label": "64.1 - Cerrar Insis-1", "isController": false}, {"data": [[1.59635688E12, 986.3]], "isOverall": false, "label": "30.1 - Ingresar Identificacion Seleccionar y Ok", "isController": false}, {"data": [[1.59635706E12, 1844.3]], "isOverall": false, "label": "64.1 - Cerrar Insis-0", "isController": false}, {"data": [[1.59635682E12, 499.5]], "isOverall": false, "label": "14.2 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635694E12, 820.5999999999999]], "isOverall": false, "label": "33.8 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[1.5963567E12, 253.0]], "isOverall": false, "label": "3.1 - Hacer clic en Operaciones del sistema", "isController": false}, {"data": [[1.59635688E12, 773.1]], "isOverall": false, "label": "T.20 - Hacer clic en el icono de editar Facturacion", "isController": true}, {"data": [[1.59635694E12, 3838.3999999999996]], "isOverall": false, "label": "T.38 - Hacer clic en Guardar", "isController": true}, {"data": [[1.59635688E12, 645.6]], "isOverall": false, "label": "T.23 - Seleccionar el Dia de pago", "isController": true}, {"data": [[1.59635694E12, 582.0]], "isOverall": false, "label": "T.37 - Ingresar el valor asegurado", "isController": true}, {"data": [[1.59635688E12, 584.1999999999999]], "isOverall": false, "label": "25.2 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635688E12, 290.7]], "isOverall": false, "label": "T.21 - Hacer clic en el icono de editar Facturacion", "isController": true}, {"data": [[1.59635682E12, 834.0], [1.59635676E12, 799.2]], "isOverall": false, "label": "13.1 - Seleccionar agente ok ", "isController": false}, {"data": [[1.59635706E12, 128.8]], "isOverall": false, "label": "64.3 - Cerrar Insis-1", "isController": false}, {"data": [[1.59635706E12, 131.79999999999998]], "isOverall": false, "label": "64.3 - Cerrar Insis-0", "isController": false}, {"data": [[1.596357E12, 3953.6000000000004]], "isOverall": false, "label": "T.49 - Hacer clic en Guardar", "isController": true}, {"data": [[1.59635688E12, 4076.7]], "isOverall": false, "label": "T.28 - Hacer clic en el \u00EDcono de Buscar", "isController": true}, {"data": [[1.59635706E12, 1673.4]], "isOverall": false, "label": "T.62 - Hacer clic en Cotizaci\u00F3n aceptada", "isController": true}, {"data": [[1.59635688E12, 603.2999999999998]], "isOverall": false, "label": "19 .2- Hacer clic en siguiente", "isController": false}, {"data": [[1.59635676E12, 20435.399999999998]], "isOverall": false, "label": "9.1 - Polizas relacionadas Hacer clic en Siguiente", "isController": false}, {"data": [[1.596357E12, 5097.0], [1.59635706E12, 7888.000000000001]], "isOverall": false, "label": "57.1 - Informacion del cliente  Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635688E12, 538.4]], "isOverall": false, "label": "31.2 - Hacer clic en Guardar", "isController": false}, {"data": [[1.596357E12, 7589.300000000001]], "isOverall": false, "label": "T.54 - Comisiones Hacer clic en Siguiente", "isController": true}, {"data": [[1.59635688E12, 9687.166666666668], [1.59635694E12, 22227.0]], "isOverall": false, "label": "32.1 - Hacer clic en Siguiente", "isController": false}, {"data": [[1.596357E12, 3496.3999999999996]], "isOverall": false, "label": "49.1 - Hacer clic en Guardar", "isController": false}, {"data": [[1.596357E12, 5518.0], [1.59635706E12, 8330.125]], "isOverall": false, "label": "T.57 - Informacion del cliente  Hacer clic en Siguiente", "isController": true}, {"data": [[1.59635688E12, 1890.3999999999999]], "isOverall": false, "label": "T.27 - Hacer clic en Crear", "isController": true}, {"data": [[1.5963567E12, 122.1]], "isOverall": false, "label": "2.2 - Ingresar a INSIS", "isController": false}, {"data": [[1.5963567E12, 2114.1]], "isOverall": false, "label": "5.1 - Hacer clic en Crear cotizacion", "isController": false}, {"data": [[1.59635676E12, 13242.100000000002]], "isOverall": false, "label": "7.1 - Crear Cotizacion Siguiente", "isController": false}, {"data": [[1.5963567E12, 453.5]], "isOverall": false, "label": "2.3 - Ingresar a INSIS", "isController": false}, {"data": [[1.59635688E12, 10427.6], [1.59635694E12, 19924.0]], "isOverall": false, "label": "T.32 - Hacer clic en Siguiente", "isController": true}, {"data": [[1.59635682E12, 956.4]], "isOverall": false, "label": "16.4 - Hacer clic en Cotizacion nueva", "isController": false}, {"data": [[1.59635682E12, 1646.9]], "isOverall": false, "label": "16.1 - Hacer clic en Cotizacion nueva", "isController": false}, {"data": [[1.596357E12, 432.8], [1.59635706E12, 443.2]], "isOverall": false, "label": "56.2 - Clausulas Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635688E12, 8354.1]], "isOverall": false, "label": "T.31 - Hacer clic en Guardar", "isController": true}, {"data": [[1.59635694E12, 582.0]], "isOverall": false, "label": "37- Ingresar el valor asegurado", "isController": false}, {"data": [[1.59635694E12, 9074.4]], "isOverall": false, "label": "T.41 - Hacer clic en Siguiente", "isController": true}, {"data": [[1.59635682E12, 432.75], [1.59635676E12, 607.1666666666667]], "isOverall": false, "label": "11.1 - Buscar Agente", "isController": false}, {"data": [[1.596357E12, 693.0], [1.59635694E12, 8468.444444444445]], "isOverall": false, "label": "T.46 - Seleccionar el reclamo de franquicia", "isController": true}, {"data": [[1.596357E12, 8329.3]], "isOverall": false, "label": "T.51 - Hacer clic en Siguiente", "isController": true}, {"data": [[1.596357E12, 108.0], [1.59635694E12, 7984.666666666667]], "isOverall": false, "label": "46.2 - Seleccionar el reclamo de franquicia", "isController": false}, {"data": [[1.5963567E12, 417.29999999999995]], "isOverall": false, "label": "6.1 - Ingresar identificacion y Buscar", "isController": false}, {"data": [[1.59635676E12, 426.6]], "isOverall": false, "label": "7.2 - Crear Cotizacion Siguiente", "isController": false}, {"data": [[1.59635688E12, 1718.4]], "isOverall": false, "label": "28.1 - Hacer clic en el \u00EDcono de Buscar", "isController": false}, {"data": [[1.59635694E12, 1807.4]], "isOverall": false, "label": "34.1 - Grabar Objeto", "isController": false}, {"data": [[1.596357E12, 585.0], [1.59635694E12, 483.7777777777777]], "isOverall": false, "label": "46.1 - Seleccionar el reclamo de franquicia", "isController": false}, {"data": [[1.59635688E12, 1159.6000000000004]], "isOverall": false, "label": "29.2 - Ingresar Identificacion Buscar", "isController": false}, {"data": [[1.596357E12, 8070.8], [1.59635706E12, 7293.4]], "isOverall": false, "label": "T.56 - Clausulas Hacer clic en Siguiente", "isController": true}, {"data": [[1.5963567E12, 253.0]], "isOverall": false, "label": "T.3 - Hacer clic en Operaciones del sistema", "isController": true}, {"data": [[1.59635694E12, 341.1]], "isOverall": false, "label": "43.1 - Seleccionar el Objeto asegurado", "isController": false}, {"data": [[1.596357E12, 269.0], [1.59635694E12, 588.6666666666666]], "isOverall": false, "label": "48.1 - Seleccionar la Dimensi\u00F3n de franquicia", "isController": false}, {"data": [[1.596357E12, 421.0], [1.59635706E12, 442.125]], "isOverall": false, "label": "57.2 - Informacion del cliente  Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635706E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59635682E12, 2013.0], [1.59635676E12, 2367.6666666666665]], "isOverall": false, "label": "T.11 - Buscar Agente", "isController": true}, {"data": [[1.59635682E12, 9105.7]], "isOverall": false, "label": "T.17 - Seleccionar el Nombre de producto ok", "isController": true}, {"data": [[1.59635682E12, 1139.25], [1.59635676E12, 1216.5]], "isOverall": false, "label": "T.10 - Hacer clic en Agente Crear", "isController": true}, {"data": [[1.596357E12, 7156.299999999999]], "isOverall": false, "label": "54.1 - Comisiones Hacer clic en Siguiente", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59635706E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.5963567E12, "maxY": 29675.3, "series": [{"data": [[1.59635694E12, 46.7]], "isOverall": false, "label": "T.42 - Crear Deducible", "isController": true}, {"data": [[1.59635694E12, 275.6]], "isOverall": false, "label": "34.2 - Grabar Objeto", "isController": false}, {"data": [[1.59635682E12, 144.25], [1.59635676E12, 143.16666666666666]], "isOverall": false, "label": "11.2 - Buscar Agente", "isController": false}, {"data": [[1.59635688E12, 85.7]], "isOverall": false, "label": "29.1 - Ingresar Identificacion", "isController": false}, {"data": [[1.59635682E12, 0.0], [1.59635676E12, 0.0]], "isOverall": false, "label": "13.3 - Seleccionar agente ok ", "isController": false}, {"data": [[1.59635688E12, 56.4]], "isOverall": false, "label": "23.3 - Seleccionar el Dia de pago", "isController": false}, {"data": [[1.59635688E12, 209.20000000000002]], "isOverall": false, "label": "28.2 - Hacer clic en el \u00EDcono de Buscar", "isController": false}, {"data": [[1.59635706E12, 0.0]], "isOverall": false, "label": "60.3 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial", "isController": false}, {"data": [[1.59635706E12, 0.0]], "isOverall": false, "label": "64.2 - Cerrar Insis", "isController": false}, {"data": [[1.59635706E12, 0.0]], "isOverall": false, "label": "64.2 - Cerrar Insis-0", "isController": false}, {"data": [[1.59635706E12, 60.50000000000001]], "isOverall": false, "label": "63.1 - Hacer clic en Proceder", "isController": false}, {"data": [[1.596357E12, 0.0]], "isOverall": false, "label": "55.1 - Impuestos Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635688E12, 87.7]], "isOverall": false, "label": "26.2 - Hacer clic en la pesta\u00F1a Participantes de la poliza", "isController": false}, {"data": [[1.59635694E12, 0.0]], "isOverall": false, "label": "T.39 - Hacer clic en Premium", "isController": true}, {"data": [[1.59635688E12, 173.20000000000002]], "isOverall": false, "label": "28.3 - Hacer clic en el \u00EDcono de Buscar", "isController": false}, {"data": [[1.59635688E12, 0.0], [1.59635694E12, 0.0]], "isOverall": false, "label": "33.1 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[1.59635706E12, 298.90000000000003]], "isOverall": false, "label": "60.2 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial", "isController": false}, {"data": [[1.59635706E12, 118.19999999999999]], "isOverall": false, "label": "62.2 - Hacer clic en Cotizaci\u00F3n aceptada-414", "isController": false}, {"data": [[1.59635694E12, 30.200000000000003]], "isOverall": false, "label": "35.1 - Cerrar Objeto", "isController": false}, {"data": [[1.59635688E12, 58.1]], "isOverall": false, "label": "26.1 - Hacer clic en la pesta\u00F1a Participantes de la poliza", "isController": false}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "1.2 - Index-0", "isController": false}, {"data": [[1.59635688E12, 379.9000000000001]], "isOverall": false, "label": "T.29 - Ingresar Identificacion Buscar", "isController": true}, {"data": [[1.59635706E12, 300.0]], "isOverall": false, "label": "60.1 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial", "isController": false}, {"data": [[1.59635688E12, 174.8]], "isOverall": false, "label": "27.1 - Hacer clic en Crear", "isController": false}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "1.2 - Index-1", "isController": false}, {"data": [[1.59635688E12, 308.0], [1.59635694E12, 317.8]], "isOverall": false, "label": "32.2 -  Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635694E12, 609.5]], "isOverall": false, "label": "T.40 - Hacer clic en Siguiente", "isController": true}, {"data": [[1.59635688E12, 263.90000000000003]], "isOverall": false, "label": "T.22 - Seleccionar el Numero de pagos", "isController": true}, {"data": [[1.59635694E12, 0.0]], "isOverall": false, "label": "45.1 - Seleccionar el Tipo de franquicia", "isController": false}, {"data": [[1.59635706E12, 598.9]], "isOverall": false, "label": "T.60 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial", "isController": true}, {"data": [[1.5963567E12, 362.29999999999995]], "isOverall": false, "label": "T.1 - Index", "isController": true}, {"data": [[1.59635706E12, 0.0]], "isOverall": false, "label": "64.2 - Cerrar Insis-1", "isController": false}, {"data": [[1.59635688E12, 29.7]], "isOverall": false, "label": "28.4 - Hacer clic en el \u00EDcono de Buscar", "isController": false}, {"data": [[1.59635694E12, 89.8]], "isOverall": false, "label": "33.6 -Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[1.596357E12, 289.79999999999995]], "isOverall": false, "label": "53.2 - Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635676E12, 288.3]], "isOverall": false, "label": "T.7 - Crear Cotizacion Siguiente", "isController": true}, {"data": [[1.59635682E12, 170.3]], "isOverall": false, "label": "16.3 - Hacer clic en Cotizacion nueva", "isController": false}, {"data": [[1.59635706E12, 294.8]], "isOverall": false, "label": "T.61 - Hacer clic en Cotizacion a cliente", "isController": true}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "1.2 - Index", "isController": false}, {"data": [[1.59635682E12, 0.0], [1.59635676E12, 49.83333333333333]], "isOverall": false, "label": "T.12 - Hacer clic en buscar", "isController": true}, {"data": [[1.59635706E12, 0.0]], "isOverall": false, "label": "61.1 - Hacer clic en Cotizacion a cliente", "isController": false}, {"data": [[1.59635688E12, 320.1]], "isOverall": false, "label": "T.25 - Hacer clic en Guardar", "isController": true}, {"data": [[1.59635706E12, 0.0]], "isOverall": false, "label": "64.3 - Cerrar Insis", "isController": false}, {"data": [[1.59635694E12, 0.0]], "isOverall": false, "label": "44 - Seleccionar el Nombre de cobertura", "isController": true}, {"data": [[1.59635682E12, 0.0], [1.59635676E12, 0.0]], "isOverall": false, "label": "10.2 - Hacer clic en Agente Crear", "isController": false}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "2.2 - Ingresar a INSIS-0", "isController": false}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "2.2 - Ingresar a INSIS-1", "isController": false}, {"data": [[1.59635682E12, 5147.599999999999]], "isOverall": false, "label": "T.15 - Hacer clic en Cotizacion nueva", "isController": true}, {"data": [[1.59635694E12, 0.0]], "isOverall": false, "label": "33.4 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[1.59635676E12, 304.90000000000003]], "isOverall": false, "label": "9.2 - Polizas relacionadas Hacer clic en Siguiente", "isController": false}, {"data": [[1.5963567E12, 320.0]], "isOverall": false, "label": "T.5 - Hacer clic en Crear cotizacion", "isController": true}, {"data": [[1.59635682E12, 5147.599999999999]], "isOverall": false, "label": "15.1 - Hacer clic en Cotizacion nueva", "isController": false}, {"data": [[1.59635688E12, 31.8]], "isOverall": false, "label": "22.2 - Seleccionar el Numero de pagos", "isController": false}, {"data": [[1.59635688E12, 145.8]], "isOverall": false, "label": "T.26 - Hacer clic en la pesta\u00F1a Participantes de la poliza", "isController": true}, {"data": [[1.59635688E12, 30.299999999999997]], "isOverall": false, "label": "29.4 - Ingresar Identificacion Buscar", "isController": false}, {"data": [[1.59635694E12, 85.6]], "isOverall": false, "label": "38.1 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635682E12, 439.4]], "isOverall": false, "label": "T.14 - Hacer clic en Guardar", "isController": true}, {"data": [[1.59635706E12, 0.0]], "isOverall": false, "label": "64.1 - Cerrar Insis", "isController": false}, {"data": [[1.59635688E12, 29.4]], "isOverall": false, "label": "31.1 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635682E12, 0.0], [1.59635676E12, 0.0]], "isOverall": false, "label": "9.3 - Polizas relacionadas Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635676E12, 288.09999999999997]], "isOverall": false, "label": "8.2 - En Historial Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635694E12, 306.90000000000003]], "isOverall": false, "label": "35.3 - Cerrar Objeto-365", "isController": false}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-0", "isController": false}, {"data": [[1.5963567E12, 0.0], [1.59635676E12, 0.0]], "isOverall": false, "label": "6.2 - Ingresar identificacion y Buscar", "isController": false}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-1", "isController": false}, {"data": [[1.59635682E12, 0.0]], "isOverall": false, "label": "18.1 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635688E12, 0.0]], "isOverall": false, "label": "20.1 - Hacer clic en el icono de editar Facturacion", "isController": false}, {"data": [[1.59635694E12, 0.0]], "isOverall": false, "label": "T.43 - Seleccionar el Objeto asegurado", "isController": true}, {"data": [[1.59635688E12, 0.0]], "isOverall": false, "label": "19.1 - Hacer clic en siguiente", "isController": false}, {"data": [[1.596357E12, 0.0], [1.59635694E12, 0.0]], "isOverall": false, "label": "T.48 - Seleccionar la Dimensi\u00F3n de franquicia", "isController": true}, {"data": [[1.59635688E12, 143.99999999999997]], "isOverall": false, "label": "30.3 - Ingresar Identificacion Seleccionar y Ok", "isController": false}, {"data": [[1.59635706E12, 29675.3]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59635706E12, 0.0]], "isOverall": false, "label": "62.1 - Hacer clic en Cotizaci\u00F3n aceptada", "isController": false}, {"data": [[1.596357E12, 0.0], [1.59635694E12, 1302.5555555555557]], "isOverall": false, "label": "47.1 - Ingresar el Valor de franquicia", "isController": false}, {"data": [[1.59635694E12, 0.0]], "isOverall": false, "label": "44.1 - Seleccionar el Nombre de cobertura", "isController": false}, {"data": [[1.596357E12, 0.0]], "isOverall": false, "label": "52.1 - 1400 Transporte Terrestre Anual Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635694E12, 297.7]], "isOverall": false, "label": "38.2 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635694E12, 0.0]], "isOverall": false, "label": "35.2 - Cerrar Objeto-363", "isController": false}, {"data": [[1.596357E12, 0.0], [1.59635706E12, 0.0]], "isOverall": false, "label": "58.1 - Calculo de Prima Guardar", "isController": false}, {"data": [[1.5963567E12, 290.24999999999994], [1.59635676E12, 287.5]], "isOverall": false, "label": "6.3 - Ingresar identificacion y Buscar", "isController": false}, {"data": [[1.59635706E12, 29.5]], "isOverall": false, "label": "64.4 - Cerrar Insis", "isController": false}, {"data": [[1.59635682E12, 291.75], [1.59635676E12, 313.6666666666667]], "isOverall": false, "label": "T.9 - Polizas relacionadas Hacer clic en Siguiente", "isController": true}, {"data": [[1.596357E12, 303.6]], "isOverall": false, "label": "52.2 - 1400 Transporte Terrestre Anual Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635676E12, 288.09999999999997]], "isOverall": false, "label": "T.8 - En Historial Hacer clic en Siguiente", "isController": true}, {"data": [[1.596357E12, 0.0]], "isOverall": false, "label": "53.1 - Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635694E12, 0.0]], "isOverall": false, "label": "41.1 - Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635694E12, 0.0]], "isOverall": false, "label": "T.36 - Hacer clic en el \u00EDcono de Editar", "isController": true}, {"data": [[1.59635688E12, 310.0], [1.59635694E12, 304.22222222222223]], "isOverall": false, "label": "33.2 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[1.59635694E12, 150.0]], "isOverall": false, "label": "33.5 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[1.596357E12, 0.0]], "isOverall": false, "label": "50.1 - Hacer clic en Premium", "isController": false}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "5.3 - Hacer clic en Crear cotizacion", "isController": false}, {"data": [[1.59635694E12, 303.0]], "isOverall": false, "label": "41.2 - Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635706E12, 115.59999999999998]], "isOverall": false, "label": "62.3 - Hacer clic en Cotizaci\u00F3n aceptada", "isController": false}, {"data": [[1.59635682E12, 292.5]], "isOverall": false, "label": "T.18- Hacer clic en Guardar", "isController": true}, {"data": [[1.59635682E12, 54.0], [1.59635676E12, 228.4]], "isOverall": false, "label": "13.4 - Seleccionar agente ok ", "isController": false}, {"data": [[1.59635694E12, 0.0]], "isOverall": false, "label": "T.45 - Seleccionar el Tipo de franquicia", "isController": true}, {"data": [[1.596357E12, 286.09999999999997]], "isOverall": false, "label": "55.2 - Impuestos Hacer clic en Siguiente", "isController": false}, {"data": [[1.596357E12, 292.40000000000003]], "isOverall": false, "label": "51.1 - Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635676E12, 0.0]], "isOverall": false, "label": "8.1 - En Historial Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635682E12, 0.0], [1.59635676E12, 55.6]], "isOverall": false, "label": "13.2 - Seleccionar agente ok ", "isController": false}, {"data": [[1.59635694E12, 0.0]], "isOverall": false, "label": "36.1 - Hacer clic en el \u00EDcono de Editar", "isController": false}, {"data": [[1.59635694E12, 337.4]], "isOverall": false, "label": "T.34 - Grabar Objeto", "isController": true}, {"data": [[1.596357E12, 295.79999999999995]], "isOverall": false, "label": "51.2 - Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635688E12, 28.8]], "isOverall": false, "label": "25.1 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635694E12, 304.75]], "isOverall": false, "label": "40.1 - Hacer clic en Siguiente", "isController": false}, {"data": [[1.596357E12, 291.4]], "isOverall": false, "label": "49.2 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635694E12, 185.3]], "isOverall": false, "label": "33.7 -Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[1.59635694E12, 46.7]], "isOverall": false, "label": "42.1 - Crear Deducible", "isController": false}, {"data": [[1.596357E12, 0.0], [1.59635706E12, 0.0]], "isOverall": false, "label": "56.1 - Clausulas Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635682E12, 146.9]], "isOverall": false, "label": "14 .1 - Hacer clic en Guardar", "isController": false}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "T.4 - Hacer clic en Control de polizas", "isController": true}, {"data": [[1.59635682E12, 209.29999999999998]], "isOverall": false, "label": "17.2 - Seleccionar el Nombre de producto ok", "isController": false}, {"data": [[1.596357E12, 294.5]], "isOverall": false, "label": "54.2 - Comisiones Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635688E12, 345.1]], "isOverall": false, "label": "T.30 - Ingresar Identificacion Seleccionar y Ok", "isController": true}, {"data": [[1.5963567E12, 362.29999999999995]], "isOverall": false, "label": "1.1 - Index", "isController": false}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "4.1 - Hacer clic en Control de polizas", "isController": false}, {"data": [[1.5963567E12, 290.24999999999994], [1.59635676E12, 287.5]], "isOverall": false, "label": "T.6 - Ingresar identificacion y Buscar", "isController": true}, {"data": [[1.59635682E12, 486.29999999999995]], "isOverall": false, "label": "T.16 - Hacer clic en Cotizacion nueva", "isController": true}, {"data": [[1.5963567E12, 294.5]], "isOverall": false, "label": "T.2 - Ingresar a INSIS", "isController": true}, {"data": [[1.59635688E12, 117.0]], "isOverall": false, "label": "30.2 - Ingresar Identificacion Seleccionar y Ok", "isController": false}, {"data": [[1.59635688E12, 232.10000000000002]], "isOverall": false, "label": "22.1 - Seleccionar el Numero de pagos", "isController": false}, {"data": [[1.59635688E12, 27.8]], "isOverall": false, "label": "21.1 - Hacer clic en el icono de editar Facturacion", "isController": false}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "4.2 - Hacer clic en Control de polizas", "isController": false}, {"data": [[1.59635688E12, 146.49999999999997]], "isOverall": false, "label": "29.3 - Ingresar Identificacion Buscar", "isController": false}, {"data": [[1.59635682E12, 288.0], [1.59635676E12, 286.5]], "isOverall": false, "label": "10.1 - Hacer clic en Agente Crear", "isController": false}, {"data": [[1.596357E12, 289.79999999999995]], "isOverall": false, "label": "T.53 - Hacer clic en Siguiente", "isController": true}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "2.1 - Ingresar a INSIS", "isController": false}, {"data": [[1.59635688E12, 29.0]], "isOverall": false, "label": "27.2 - Hacer clic en Crear", "isController": false}, {"data": [[1.59635706E12, 60.50000000000001]], "isOverall": false, "label": "T.63 - Hacer clic en Proceder", "isController": true}, {"data": [[1.596357E12, 286.09999999999997]], "isOverall": false, "label": "T.55 - Impuestos Hacer clic en Siguiente", "isController": true}, {"data": [[1.59635682E12, 292.5]], "isOverall": false, "label": "18.2 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635688E12, 288.5]], "isOverall": false, "label": "T.19 - Hacer clic en siguiente", "isController": true}, {"data": [[1.59635706E12, 0.0]], "isOverall": false, "label": "63.2 - Hacer clic en Proceder", "isController": false}, {"data": [[1.59635682E12, 115.80000000000001]], "isOverall": false, "label": "16.2 - Hacer clic en Cotizacion nueva", "isController": false}, {"data": [[1.59635682E12, 298.3999999999999]], "isOverall": false, "label": "17.3 - Seleccionar el Nombre de producto ok", "isController": false}, {"data": [[1.59635694E12, 0.0]], "isOverall": false, "label": "33.3 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[1.59635706E12, 29.0]], "isOverall": false, "label": "T.59 - Calculo de Prima Premium", "isController": true}, {"data": [[1.59635682E12, 0.0], [1.59635676E12, 0.0]], "isOverall": false, "label": "11.3 - Buscar Agente", "isController": false}, {"data": [[1.59635706E12, 29.5]], "isOverall": false, "label": "T.64 - Cerrar Insis", "isController": true}, {"data": [[1.59635682E12, 339.2], [1.59635676E12, 599.4]], "isOverall": false, "label": "T.13 - Seleccionar agente ok ", "isController": true}, {"data": [[1.59635694E12, 337.1]], "isOverall": false, "label": "T.35 - Cerrar Objeto", "isController": true}, {"data": [[1.59635694E12, 855.0]], "isOverall": false, "label": "T.33 - Hacer clic en A\u00F1adir objeto", "isController": true}, {"data": [[1.59635682E12, 0.0], [1.59635676E12, 49.83333333333333]], "isOverall": false, "label": "12.1 - Hacer clic en buscar", "isController": false}, {"data": [[1.596357E12, 0.0]], "isOverall": false, "label": "T.50 - Hacer clic en Premium", "isController": true}, {"data": [[1.59635688E12, 177.4]], "isOverall": false, "label": "T.24 - Seleccionar el Modo de pago", "isController": true}, {"data": [[1.596357E12, 0.0], [1.59635706E12, 291.0]], "isOverall": false, "label": "T.58 - Calculo de Prima Guardar", "isController": true}, {"data": [[1.59635706E12, 29.0]], "isOverall": false, "label": "59.1 - Calculo de Prima Premium", "isController": false}, {"data": [[1.59635688E12, 177.4]], "isOverall": false, "label": "24.1 - Seleccionar el Modo de pago", "isController": false}, {"data": [[1.596357E12, 303.6]], "isOverall": false, "label": "T.52 - 1400 Transporte Terrestre Anual Hacer clic en Siguiente", "isController": true}, {"data": [[1.59635694E12, 0.0]], "isOverall": false, "label": "39.1 - Hacer clic en Premium", "isController": false}, {"data": [[1.596357E12, 0.0], [1.59635694E12, 1302.5555555555557]], "isOverall": false, "label": "T.47 - Ingresar el Valor de franquicia", "isController": true}, {"data": [[1.59635682E12, 87.1]], "isOverall": false, "label": "17.1 - Seleccionar el Nombre de producto ok", "isController": false}, {"data": [[1.59635706E12, 294.8]], "isOverall": false, "label": "61.2 - Hacer clic en Cotizacion a cliente", "isController": false}, {"data": [[1.5963567E12, 287.9]], "isOverall": false, "label": "5.2 - Hacer clic en Crear cotizacion", "isController": false}, {"data": [[1.59635706E12, 0.0]], "isOverall": false, "label": "64.1 - Cerrar Insis-2", "isController": false}, {"data": [[1.596357E12, 0.0], [1.59635706E12, 291.0]], "isOverall": false, "label": "58.2 - Calculo de Prima Guardar", "isController": false}, {"data": [[1.59635706E12, 290.0]], "isOverall": false, "label": "64.1 - Cerrar Insis-1", "isController": false}, {"data": [[1.59635688E12, 84.1]], "isOverall": false, "label": "30.1 - Ingresar Identificacion Seleccionar y Ok", "isController": false}, {"data": [[1.59635706E12, 0.0]], "isOverall": false, "label": "64.1 - Cerrar Insis-0", "isController": false}, {"data": [[1.59635682E12, 292.49999999999994]], "isOverall": false, "label": "14.2 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635694E12, 125.10000000000002]], "isOverall": false, "label": "33.8 - Hacer clic en A\u00F1adir objeto", "isController": false}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "3.1 - Hacer clic en Operaciones del sistema", "isController": false}, {"data": [[1.59635688E12, 0.0]], "isOverall": false, "label": "T.20 - Hacer clic en el icono de editar Facturacion", "isController": true}, {"data": [[1.59635694E12, 383.3]], "isOverall": false, "label": "T.38 - Hacer clic en Guardar", "isController": true}, {"data": [[1.59635688E12, 56.4]], "isOverall": false, "label": "T.23 - Seleccionar el Dia de pago", "isController": true}, {"data": [[1.59635694E12, 262.70000000000005]], "isOverall": false, "label": "T.37 - Ingresar el valor asegurado", "isController": true}, {"data": [[1.59635688E12, 291.3]], "isOverall": false, "label": "25.2 - Hacer clic en Guardar", "isController": false}, {"data": [[1.59635688E12, 27.8]], "isOverall": false, "label": "T.21 - Hacer clic en el icono de editar Facturacion", "isController": true}, {"data": [[1.59635682E12, 285.2], [1.59635676E12, 315.4]], "isOverall": false, "label": "13.1 - Seleccionar agente ok ", "isController": false}, {"data": [[1.59635706E12, 0.0]], "isOverall": false, "label": "64.3 - Cerrar Insis-1", "isController": false}, {"data": [[1.59635706E12, 0.0]], "isOverall": false, "label": "64.3 - Cerrar Insis-0", "isController": false}, {"data": [[1.596357E12, 559.1999999999999]], "isOverall": false, "label": "T.49 - Hacer clic en Guardar", "isController": true}, {"data": [[1.59635688E12, 554.1]], "isOverall": false, "label": "T.28 - Hacer clic en el \u00EDcono de Buscar", "isController": true}, {"data": [[1.59635706E12, 233.8]], "isOverall": false, "label": "T.62 - Hacer clic en Cotizaci\u00F3n aceptada", "isController": true}, {"data": [[1.59635688E12, 288.5]], "isOverall": false, "label": "19 .2- Hacer clic en siguiente", "isController": false}, {"data": [[1.59635676E12, 0.0]], "isOverall": false, "label": "9.1 - Polizas relacionadas Hacer clic en Siguiente", "isController": false}, {"data": [[1.596357E12, 0.0], [1.59635706E12, 0.0]], "isOverall": false, "label": "57.1 - Informacion del cliente  Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635688E12, 303.8]], "isOverall": false, "label": "31.2 - Hacer clic en Guardar", "isController": false}, {"data": [[1.596357E12, 294.5]], "isOverall": false, "label": "T.54 - Comisiones Hacer clic en Siguiente", "isController": true}, {"data": [[1.59635688E12, 0.0], [1.59635694E12, 0.0]], "isOverall": false, "label": "32.1 - Hacer clic en Siguiente", "isController": false}, {"data": [[1.596357E12, 267.8]], "isOverall": false, "label": "49.1 - Hacer clic en Guardar", "isController": false}, {"data": [[1.596357E12, 291.0], [1.59635706E12, 293.125]], "isOverall": false, "label": "T.57 - Informacion del cliente  Hacer clic en Siguiente", "isController": true}, {"data": [[1.59635688E12, 203.8]], "isOverall": false, "label": "T.27 - Hacer clic en Crear", "isController": true}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "2.2 - Ingresar a INSIS", "isController": false}, {"data": [[1.5963567E12, 32.099999999999994]], "isOverall": false, "label": "5.1 - Hacer clic en Crear cotizacion", "isController": false}, {"data": [[1.59635676E12, 0.0]], "isOverall": false, "label": "7.1 - Crear Cotizacion Siguiente", "isController": false}, {"data": [[1.5963567E12, 294.5]], "isOverall": false, "label": "2.3 - Ingresar a INSIS", "isController": false}, {"data": [[1.59635688E12, 308.0], [1.59635694E12, 317.8]], "isOverall": false, "label": "T.32 - Hacer clic en Siguiente", "isController": true}, {"data": [[1.59635682E12, 30.299999999999997]], "isOverall": false, "label": "16.4 - Hacer clic en Cotizacion nueva", "isController": false}, {"data": [[1.59635682E12, 169.9]], "isOverall": false, "label": "16.1 - Hacer clic en Cotizacion nueva", "isController": false}, {"data": [[1.596357E12, 280.8], [1.59635706E12, 285.8]], "isOverall": false, "label": "56.2 - Clausulas Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635688E12, 333.20000000000005]], "isOverall": false, "label": "T.31 - Hacer clic en Guardar", "isController": true}, {"data": [[1.59635694E12, 262.70000000000005]], "isOverall": false, "label": "37- Ingresar el valor asegurado", "isController": false}, {"data": [[1.59635694E12, 303.0]], "isOverall": false, "label": "T.41 - Hacer clic en Siguiente", "isController": true}, {"data": [[1.59635682E12, 0.0], [1.59635676E12, 0.0]], "isOverall": false, "label": "11.1 - Buscar Agente", "isController": false}, {"data": [[1.596357E12, 367.0], [1.59635694E12, 8150.0]], "isOverall": false, "label": "T.46 - Seleccionar el reclamo de franquicia", "isController": true}, {"data": [[1.596357E12, 588.2]], "isOverall": false, "label": "T.51 - Hacer clic en Siguiente", "isController": true}, {"data": [[1.596357E12, 77.0], [1.59635694E12, 7946.0]], "isOverall": false, "label": "46.2 - Seleccionar el reclamo de franquicia", "isController": false}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "6.1 - Ingresar identificacion y Buscar", "isController": false}, {"data": [[1.59635676E12, 288.3]], "isOverall": false, "label": "7.2 - Crear Cotizacion Siguiente", "isController": false}, {"data": [[1.59635688E12, 142.0]], "isOverall": false, "label": "28.1 - Hacer clic en el \u00EDcono de Buscar", "isController": false}, {"data": [[1.59635694E12, 61.800000000000004]], "isOverall": false, "label": "34.1 - Grabar Objeto", "isController": false}, {"data": [[1.596357E12, 290.0], [1.59635694E12, 204.0]], "isOverall": false, "label": "46.1 - Seleccionar el reclamo de franquicia", "isController": false}, {"data": [[1.59635688E12, 117.4]], "isOverall": false, "label": "29.2 - Ingresar Identificacion Buscar", "isController": false}, {"data": [[1.596357E12, 280.8], [1.59635706E12, 285.8]], "isOverall": false, "label": "T.56 - Clausulas Hacer clic en Siguiente", "isController": true}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "T.3 - Hacer clic en Operaciones del sistema", "isController": true}, {"data": [[1.59635694E12, 0.0]], "isOverall": false, "label": "43.1 - Seleccionar el Objeto asegurado", "isController": false}, {"data": [[1.596357E12, 0.0], [1.59635694E12, 0.0]], "isOverall": false, "label": "48.1 - Seleccionar la Dimensi\u00F3n de franquicia", "isController": false}, {"data": [[1.596357E12, 291.0], [1.59635706E12, 293.125]], "isOverall": false, "label": "57.2 - Informacion del cliente  Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635706E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59635682E12, 288.5], [1.59635676E12, 286.3333333333333]], "isOverall": false, "label": "T.11 - Buscar Agente", "isController": true}, {"data": [[1.59635682E12, 594.8]], "isOverall": false, "label": "T.17 - Seleccionar el Nombre de producto ok", "isController": true}, {"data": [[1.59635682E12, 288.0], [1.59635676E12, 286.5]], "isOverall": false, "label": "T.10 - Hacer clic en Agente Crear", "isController": true}, {"data": [[1.596357E12, 0.0]], "isOverall": false, "label": "54.1 - Comisiones Hacer clic en Siguiente", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59635706E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.5963567E12, "maxY": 24857.0, "series": [{"data": [[1.59635682E12, 11959.0], [1.5963567E12, 10577.0], [1.596357E12, 13903.0], [1.59635706E12, 9789.0], [1.59635688E12, 23920.0], [1.59635694E12, 24857.0], [1.59635676E12, 23683.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.59635682E12, 180.0], [1.5963567E12, 91.0], [1.596357E12, 108.0], [1.59635706E12, 0.0], [1.59635688E12, 235.0], [1.59635694E12, 172.0], [1.59635676E12, 220.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.59635682E12, 8454.000000000002], [1.5963567E12, 6247.9000000000015], [1.596357E12, 8775.4], [1.59635706E12, 3574.5], [1.59635688E12, 8310.0], [1.59635694E12, 6108.4], [1.59635676E12, 19321.4]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.59635682E12, 11764.090000000002], [1.5963567E12, 9150.130000000001], [1.596357E12, 13166.560000000012], [1.59635706E12, 9460.75], [1.59635688E12, 23146.549999999985], [1.59635694E12, 23940.359999999848], [1.59635676E12, 23353.65999999999]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.59635682E12, 9969.7], [1.5963567E12, 6885.099999999999], [1.596357E12, 10693.549999999992], [1.59635706E12, 7620.5], [1.59635688E12, 12653.5], [1.59635694E12, 9515.39999999999], [1.59635676E12, 21931.5]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59635706E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 195.0, "minX": 1.0, "maxY": 1310.0, "series": [{"data": [[8.0, 752.0], [2.0, 1123.5], [9.0, 725.0], [10.0, 897.0], [11.0, 669.0], [12.0, 483.0], [3.0, 941.5], [13.0, 789.0], [14.0, 534.0], [15.0, 195.0], [4.0, 1158.5], [1.0, 1310.0], [16.0, 214.0], [18.0, 341.5], [5.0, 884.0], [6.0, 804.0], [7.0, 669.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 18.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 101.5, "minX": 1.0, "maxY": 841.0, "series": [{"data": [[8.0, 612.0], [2.0, 713.0], [9.0, 531.5], [10.0, 778.0], [11.0, 584.0], [12.0, 296.0], [3.0, 539.0], [13.0, 767.0], [14.0, 423.0], [15.0, 101.5], [4.0, 493.5], [1.0, 841.0], [16.0, 120.0], [18.0, 151.5], [5.0, 634.0], [6.0, 622.5], [7.0, 570.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 18.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 2.2, "minX": 1.5963567E12, "maxY": 5.05, "series": [{"data": [[1.59635682E12, 2.8666666666666667], [1.5963567E12, 3.433333333333333], [1.596357E12, 2.5], [1.59635706E12, 4.4], [1.59635688E12, 4.716666666666667], [1.59635694E12, 5.05], [1.59635676E12, 2.2]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59635706E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.5, "minX": 1.5963567E12, "maxY": 5.033333333333333, "series": [{"data": [[1.59635682E12, 2.8666666666666667], [1.5963567E12, 2.7666666666666666], [1.596357E12, 2.5], [1.59635706E12, 3.9], [1.59635688E12, 4.733333333333333], [1.59635694E12, 5.033333333333333], [1.59635676E12, 2.2]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.5963567E12, 0.5], [1.59635706E12, 0.6666666666666666]], "isOverall": false, "label": "302", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59635706E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.5963567E12, "maxY": 0.3333333333333333, "series": [{"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "38.2 - Hacer clic en Guardar-success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "2.3 - Ingresar a INSIS-success", "isController": false}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "21.1 - Hacer clic en el icono de editar Facturacion-success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "4.1 - Hacer clic en Control de polizas-success", "isController": false}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "41.1 - Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.596357E12, 0.16666666666666666]], "isOverall": false, "label": "55.2 - Impuestos Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "T.42 - Crear Deducible-success", "isController": true}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "T.28 - Hacer clic en el \u00EDcono de Buscar-success", "isController": true}, {"data": [[1.59635676E12, 0.16666666666666666]], "isOverall": false, "label": "8.2 - En Historial Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-0-success", "isController": false}, {"data": [[1.596357E12, 0.16666666666666666]], "isOverall": false, "label": "53.2 - Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635682E12, 0.06666666666666667], [1.59635676E12, 0.1]], "isOverall": false, "label": "11.1 - Buscar Agente-success", "isController": false}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "33.5 - Hacer clic en A\u00F1adir objeto-success", "isController": false}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "60.1 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial-success", "isController": false}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "30.1 - Ingresar Identificacion Seleccionar y Ok-success", "isController": false}, {"data": [[1.596357E12, 0.16666666666666666]], "isOverall": false, "label": "T.54 - Comisiones Hacer clic en Siguiente-success", "isController": true}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "T.59 - Calculo de Prima Premium-success", "isController": true}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "35.2 - Cerrar Objeto-363-success", "isController": false}, {"data": [[1.596357E12, 0.08333333333333333], [1.59635706E12, 0.08333333333333333]], "isOverall": false, "label": "56.2 - Clausulas Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635682E12, 0.06666666666666667], [1.59635676E12, 0.1]], "isOverall": false, "label": "T.9 - Polizas relacionadas Hacer clic en Siguiente-success", "isController": true}, {"data": [[1.59635682E12, 0.16666666666666666]], "isOverall": false, "label": "14.2 - Hacer clic en Guardar-success", "isController": false}, {"data": [[1.596357E12, 0.16666666666666666]], "isOverall": false, "label": "T.50 - Hacer clic en Premium-success", "isController": true}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "T.40 - Hacer clic en Siguiente-success", "isController": true}, {"data": [[1.59635676E12, 0.16666666666666666]], "isOverall": false, "label": "8.1 - En Historial Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635682E12, 0.16666666666666666]], "isOverall": false, "label": "16.1 - Hacer clic en Cotizacion nueva-success", "isController": false}, {"data": [[1.596357E12, 0.16666666666666666]], "isOverall": false, "label": "T.49 - Hacer clic en Guardar-success", "isController": true}, {"data": [[1.59635694E12, 0.3333333333333333]], "isOverall": false, "label": "40.1 - Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "64.2 - Cerrar Insis-1-success", "isController": false}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "19.1 - Hacer clic en siguiente-success", "isController": false}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "T.37 - Ingresar el valor asegurado-success", "isController": true}, {"data": [[1.596357E12, 0.016666666666666666], [1.59635694E12, 0.15]], "isOverall": false, "label": "46.1 - Seleccionar el reclamo de franquicia-success", "isController": false}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "29.1 - Ingresar Identificacion-success", "isController": false}, {"data": [[1.596357E12, 0.08333333333333333], [1.59635706E12, 0.08333333333333333]], "isOverall": false, "label": "56.1 - Clausulas Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "T.31 - Hacer clic en Guardar-success", "isController": true}, {"data": [[1.59635682E12, 0.06666666666666667], [1.59635676E12, 0.1]], "isOverall": false, "label": "T.12 - Hacer clic en buscar-success", "isController": true}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "24.1 - Seleccionar el Modo de pago-success", "isController": false}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "62.3 - Hacer clic en Cotizaci\u00F3n aceptada-success", "isController": false}, {"data": [[1.59635682E12, 0.16666666666666666]], "isOverall": false, "label": "18.2 - Hacer clic en Guardar-success", "isController": false}, {"data": [[1.596357E12, 0.16666666666666666]], "isOverall": false, "label": "T.55 - Impuestos Hacer clic en Siguiente-success", "isController": true}, {"data": [[1.596357E12, 0.016666666666666666], [1.59635694E12, 0.15]], "isOverall": false, "label": "47.1 - Ingresar el Valor de franquicia-success", "isController": false}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "T.60 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial-success", "isController": true}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "33.4 - Hacer clic en A\u00F1adir objeto-success", "isController": false}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "38.1 - Hacer clic en Guardar-success", "isController": false}, {"data": [[1.59635682E12, 0.16666666666666666]], "isOverall": false, "label": "T.17 - Seleccionar el Nombre de producto ok-success", "isController": true}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "28.4 - Hacer clic en el \u00EDcono de Buscar-success", "isController": false}, {"data": [[1.596357E12, 0.16666666666666666]], "isOverall": false, "label": "52.1 - 1400 Transporte Terrestre Anual Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "Transaction Controller-success", "isController": true}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "62.1 - Hacer clic en Cotizaci\u00F3n aceptada-success", "isController": false}, {"data": [[1.59635682E12, 0.16666666666666666]], "isOverall": false, "label": "18.1 - Hacer clic en Guardar-success", "isController": false}, {"data": [[1.59635682E12, 0.06666666666666667], [1.59635676E12, 0.1]], "isOverall": false, "label": "11.3 - Buscar Agente-success", "isController": false}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "63.2 - Hacer clic en Proceder-success", "isController": false}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "29.2 - Ingresar Identificacion Buscar-success", "isController": false}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "64.4 - Cerrar Insis-success", "isController": false}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "64.1 - Cerrar Insis-0-success", "isController": false}, {"data": [[1.59635676E12, 0.16666666666666666]], "isOverall": false, "label": "9.1 - Polizas relacionadas Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635682E12, 0.08333333333333333], [1.59635676E12, 0.08333333333333333]], "isOverall": false, "label": "T.13 - Seleccionar agente ok -success", "isController": true}, {"data": [[1.59635682E12, 0.06666666666666667], [1.59635676E12, 0.1]], "isOverall": false, "label": "T.10 - Hacer clic en Agente Crear-success", "isController": true}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "27.1 - Hacer clic en Crear-success", "isController": false}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "31.1 - Hacer clic en Guardar-success", "isController": false}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "64.3 - Cerrar Insis-0-success", "isController": false}, {"data": [[1.59635688E12, 0.08333333333333333], [1.59635694E12, 0.08333333333333333]], "isOverall": false, "label": "T.32 - Hacer clic en Siguiente-success", "isController": true}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "4.2 - Hacer clic en Control de polizas-success", "isController": false}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "64.3 - Cerrar Insis-success", "isController": false}, {"data": [[1.5963567E12, 0.13333333333333333], [1.59635676E12, 0.03333333333333333]], "isOverall": false, "label": "T.6 - Ingresar identificacion y Buscar-success", "isController": true}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "5.2 - Hacer clic en Crear cotizacion-success", "isController": false}, {"data": [[1.59635682E12, 0.16666666666666666]], "isOverall": false, "label": "16.2 - Hacer clic en Cotizacion nueva-success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "T.5 - Hacer clic en Crear cotizacion-success", "isController": true}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "31.2 - Hacer clic en Guardar-success", "isController": false}, {"data": [[1.59635682E12, 0.06666666666666667], [1.59635676E12, 0.1]], "isOverall": false, "label": "10.1 - Hacer clic en Agente Crear-success", "isController": false}, {"data": [[1.59635682E12, 0.16666666666666666]], "isOverall": false, "label": "T.14 - Hacer clic en Guardar-success", "isController": true}, {"data": [[1.59635688E12, 0.08333333333333333], [1.59635694E12, 0.08333333333333333]], "isOverall": false, "label": "32.2 -  Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "T.64 - Cerrar Insis-success", "isController": true}, {"data": [[1.596357E12, 0.03333333333333333], [1.59635706E12, 0.13333333333333333]], "isOverall": false, "label": "57.2 - Informacion del cliente  Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "T.45 - Seleccionar el Tipo de franquicia-success", "isController": true}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "19 .2- Hacer clic en siguiente-success", "isController": false}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "T.19 - Hacer clic en siguiente-success", "isController": true}, {"data": [[1.596357E12, 0.16666666666666666]], "isOverall": false, "label": "T.53 - Hacer clic en Siguiente-success", "isController": true}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "64.1 - Cerrar Insis-1-success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "2.2 - Ingresar a INSIS-1-success", "isController": false}, {"data": [[1.59635682E12, 0.06666666666666667], [1.59635676E12, 0.1]], "isOverall": false, "label": "10.2 - Hacer clic en Agente Crear-success", "isController": false}, {"data": [[1.59635682E12, 0.08333333333333333], [1.59635676E12, 0.08333333333333333]], "isOverall": false, "label": "13.4 - Seleccionar agente ok -success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "T.4 - Hacer clic en Control de polizas-success", "isController": true}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "T.34 - Grabar Objeto-success", "isController": true}, {"data": [[1.596357E12, 0.016666666666666666], [1.59635706E12, 0.15]], "isOverall": false, "label": "58.1 - Calculo de Prima Guardar-success", "isController": false}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "61.2 - Hacer clic en Cotizacion a cliente-success", "isController": false}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "64.1 - Cerrar Insis-success", "isController": false}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "T.41 - Hacer clic en Siguiente-success", "isController": true}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "62.2 - Hacer clic en Cotizaci\u00F3n aceptada-414-success", "isController": false}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "T.30 - Ingresar Identificacion Seleccionar y Ok-success", "isController": true}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "5.3 - Hacer clic en Crear cotizacion-success", "isController": false}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "34.1 - Grabar Objeto-success", "isController": false}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "26.1 - Hacer clic en la pesta\u00F1a Participantes de la poliza-success", "isController": false}, {"data": [[1.596357E12, 0.16666666666666666]], "isOverall": false, "label": "52.2 - 1400 Transporte Terrestre Anual Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "T.61 - Hacer clic en Cotizacion a cliente-success", "isController": true}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "T.33 - Hacer clic en A\u00F1adir objeto-success", "isController": true}, {"data": [[1.59635676E12, 0.16666666666666666]], "isOverall": false, "label": "7.1 - Crear Cotizacion Siguiente-success", "isController": false}, {"data": [[1.59635682E12, 0.06666666666666667], [1.59635676E12, 0.1]], "isOverall": false, "label": "9.3 - Polizas relacionadas Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "25.2 - Hacer clic en Guardar-success", "isController": false}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "23.3 - Seleccionar el Dia de pago-success", "isController": false}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "Debug Sampler-success", "isController": false}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "26.2 - Hacer clic en la pesta\u00F1a Participantes de la poliza-success", "isController": false}, {"data": [[1.59635676E12, 0.16666666666666666]], "isOverall": false, "label": "7.2 - Crear Cotizacion Siguiente-success", "isController": false}, {"data": [[1.596357E12, 0.16666666666666666]], "isOverall": false, "label": "54.2 - Comisiones Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635676E12, 0.16666666666666666]], "isOverall": false, "label": "9.2 - Polizas relacionadas Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635682E12, 0.08333333333333333], [1.59635676E12, 0.08333333333333333]], "isOverall": false, "label": "13.1 - Seleccionar agente ok -success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "6.1 - Ingresar identificacion y Buscar-success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "1.2 - Index-1-success", "isController": false}, {"data": [[1.596357E12, 0.016666666666666666], [1.59635694E12, 0.15]], "isOverall": false, "label": "T.46 - Seleccionar el reclamo de franquicia-success", "isController": true}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "T.43 - Seleccionar el Objeto asegurado-success", "isController": true}, {"data": [[1.596357E12, 0.16666666666666666]], "isOverall": false, "label": "51.2 - Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "29.3 - Ingresar Identificacion Buscar-success", "isController": false}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "T.35 - Cerrar Objeto-success", "isController": true}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "25.1 - Hacer clic en Guardar-success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "2.2 - Ingresar a INSIS-0-success", "isController": false}, {"data": [[1.59635682E12, 0.06666666666666667], [1.59635676E12, 0.1]], "isOverall": false, "label": "T.11 - Buscar Agente-success", "isController": true}, {"data": [[1.596357E12, 0.16666666666666666]], "isOverall": false, "label": "49.2 - Hacer clic en Guardar-success", "isController": false}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "37- Ingresar el valor asegurado-success", "isController": false}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "30.3 - Ingresar Identificacion Seleccionar y Ok-success", "isController": false}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "T.38 - Hacer clic en Guardar-success", "isController": true}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "39.1 - Hacer clic en Premium-success", "isController": false}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "43.1 - Seleccionar el Objeto asegurado-success", "isController": false}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "41.2 - Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635688E12, 0.03333333333333333], [1.59635694E12, 0.13333333333333333]], "isOverall": false, "label": "33.1 - Hacer clic en A\u00F1adir objeto-success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "T.3 - Hacer clic en Operaciones del sistema-success", "isController": true}, {"data": [[1.596357E12, 0.03333333333333333], [1.59635706E12, 0.13333333333333333]], "isOverall": false, "label": "57.1 - Informacion del cliente  Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635682E12, 0.16666666666666666]], "isOverall": false, "label": "16.4 - Hacer clic en Cotizacion nueva-success", "isController": false}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "T.20 - Hacer clic en el icono de editar Facturacion-success", "isController": true}, {"data": [[1.596357E12, 0.16666666666666666]], "isOverall": false, "label": "50.1 - Hacer clic en Premium-success", "isController": false}, {"data": [[1.5963567E12, 0.13333333333333333], [1.59635676E12, 0.03333333333333333]], "isOverall": false, "label": "6.2 - Ingresar identificacion y Buscar-success", "isController": false}, {"data": [[1.596357E12, 0.16666666666666666]], "isOverall": false, "label": "49.1 - Hacer clic en Guardar-success", "isController": false}, {"data": [[1.59635682E12, 0.13333333333333333], [1.59635676E12, 0.2]], "isOverall": false, "label": "11.2 - Buscar Agente-success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "1.2 - Index-success", "isController": false}, {"data": [[1.59635682E12, 0.16666666666666666]], "isOverall": false, "label": "T.16 - Hacer clic en Cotizacion nueva-success", "isController": true}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "63.1 - Hacer clic en Proceder-success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "1.2 - Index-0-success", "isController": false}, {"data": [[1.596357E12, 0.16666666666666666]], "isOverall": false, "label": "53.1 - Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "T.63 - Hacer clic en Proceder-success", "isController": true}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "27.2 - Hacer clic en Crear-success", "isController": false}, {"data": [[1.59635682E12, 0.16666666666666666]], "isOverall": false, "label": "17.3 - Seleccionar el Nombre de producto ok-success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "3.1 - Hacer clic en Operaciones del sistema-success", "isController": false}, {"data": [[1.59635682E12, 0.16666666666666666]], "isOverall": false, "label": "14 .1 - Hacer clic en Guardar-success", "isController": false}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "29.4 - Ingresar Identificacion Buscar-success", "isController": false}, {"data": [[1.59635676E12, 0.16666666666666666]], "isOverall": false, "label": "T.8 - En Historial Hacer clic en Siguiente-success", "isController": true}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "T.62 - Hacer clic en Cotizaci\u00F3n aceptada-success", "isController": true}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "64.3 - Cerrar Insis-1-success", "isController": false}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "35.1 - Cerrar Objeto-success", "isController": false}, {"data": [[1.59635682E12, 0.16666666666666666]], "isOverall": false, "label": "16.3 - Hacer clic en Cotizacion nueva-success", "isController": false}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "T.36 - Hacer clic en el \u00EDcono de Editar-success", "isController": true}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "T.39 - Hacer clic en Premium-success", "isController": true}, {"data": [[1.596357E12, 0.16666666666666666]], "isOverall": false, "label": "51.1 - Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "45.1 - Seleccionar el Tipo de franquicia-success", "isController": false}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "T.29 - Ingresar Identificacion Buscar-success", "isController": true}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "44.1 - Seleccionar el Nombre de cobertura-success", "isController": false}, {"data": [[1.596357E12, 0.016666666666666666], [1.59635694E12, 0.15]], "isOverall": false, "label": "T.48 - Seleccionar la Dimensi\u00F3n de franquicia-success", "isController": true}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "T.26 - Hacer clic en la pesta\u00F1a Participantes de la poliza-success", "isController": true}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "33.8 - Hacer clic en A\u00F1adir objeto-success", "isController": false}, {"data": [[1.59635682E12, 0.16666666666666666]], "isOverall": false, "label": "T.18- Hacer clic en Guardar-success", "isController": true}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "T.23 - Seleccionar el Dia de pago-success", "isController": true}, {"data": [[1.59635682E12, 0.16666666666666666]], "isOverall": false, "label": "17.1 - Seleccionar el Nombre de producto ok-success", "isController": false}, {"data": [[1.59635682E12, 0.08333333333333333], [1.59635676E12, 0.08333333333333333]], "isOverall": false, "label": "13.3 - Seleccionar agente ok -success", "isController": false}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "60.3 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial-success", "isController": false}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "59.1 - Calculo de Prima Premium-success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-1-success", "isController": false}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "64.2 - Cerrar Insis-0-success", "isController": false}, {"data": [[1.596357E12, 0.16666666666666666]], "isOverall": false, "label": "T.51 - Hacer clic en Siguiente-success", "isController": true}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "T.27 - Hacer clic en Crear-success", "isController": true}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "30.2 - Ingresar Identificacion Seleccionar y Ok-success", "isController": false}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "33.7 -Hacer clic en A\u00F1adir objeto-success", "isController": false}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "22.2 - Seleccionar el Numero de pagos-success", "isController": false}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "T.25 - Hacer clic en Guardar-success", "isController": true}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "T.22 - Seleccionar el Numero de pagos-success", "isController": true}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "33.3 - Hacer clic en A\u00F1adir objeto-success", "isController": false}, {"data": [[1.59635676E12, 0.16666666666666666]], "isOverall": false, "label": "T.7 - Crear Cotizacion Siguiente-success", "isController": true}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "44 - Seleccionar el Nombre de cobertura-success", "isController": true}, {"data": [[1.596357E12, 0.016666666666666666], [1.59635694E12, 0.15]], "isOverall": false, "label": "T.47 - Ingresar el Valor de franquicia-success", "isController": true}, {"data": [[1.5963567E12, 0.13333333333333333], [1.59635676E12, 0.03333333333333333]], "isOverall": false, "label": "6.3 - Ingresar identificacion y Buscar-success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "T.2 - Ingresar a INSIS-success", "isController": true}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "T.1 - Index-success", "isController": true}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "28.3 - Hacer clic en el \u00EDcono de Buscar-success", "isController": false}, {"data": [[1.59635682E12, 0.16666666666666666]], "isOverall": false, "label": "T.15 - Hacer clic en Cotizacion nueva-success", "isController": true}, {"data": [[1.59635688E12, 0.1], [1.59635694E12, 0.06666666666666667]], "isOverall": false, "label": "32.1 - Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "42.1 - Crear Deducible-success", "isController": false}, {"data": [[1.596357E12, 0.016666666666666666], [1.59635706E12, 0.15]], "isOverall": false, "label": "58.2 - Calculo de Prima Guardar-success", "isController": false}, {"data": [[1.59635682E12, 0.08333333333333333], [1.59635676E12, 0.08333333333333333]], "isOverall": false, "label": "13.2 - Seleccionar agente ok -success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "2.2 - Ingresar a INSIS-success", "isController": false}, {"data": [[1.596357E12, 0.16666666666666666]], "isOverall": false, "label": "T.52 - 1400 Transporte Terrestre Anual Hacer clic en Siguiente-success", "isController": true}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "28.1 - Hacer clic en el \u00EDcono de Buscar-success", "isController": false}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "64.2 - Cerrar Insis-success", "isController": false}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "35.3 - Cerrar Objeto-365-success", "isController": false}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "T.24 - Seleccionar el Modo de pago-success", "isController": true}, {"data": [[1.59635682E12, 0.16666666666666666]], "isOverall": false, "label": "17.2 - Seleccionar el Nombre de producto ok-success", "isController": false}, {"data": [[1.596357E12, 0.016666666666666666], [1.59635694E12, 0.15]], "isOverall": false, "label": "46.2 - Seleccionar el reclamo de franquicia-success", "isController": false}, {"data": [[1.596357E12, 0.08333333333333333], [1.59635706E12, 0.08333333333333333]], "isOverall": false, "label": "T.56 - Clausulas Hacer clic en Siguiente-success", "isController": true}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "22.1 - Seleccionar el Numero de pagos-success", "isController": false}, {"data": [[1.596357E12, 0.016666666666666666], [1.59635706E12, 0.15]], "isOverall": false, "label": "T.58 - Calculo de Prima Guardar-success", "isController": true}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "20.1 - Hacer clic en el icono de editar Facturacion-success", "isController": false}, {"data": [[1.59635688E12, 0.016666666666666666], [1.59635694E12, 0.15]], "isOverall": false, "label": "33.2 - Hacer clic en A\u00F1adir objeto-success", "isController": false}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "36.1 - Hacer clic en el \u00EDcono de Editar-success", "isController": false}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "33.6 -Hacer clic en A\u00F1adir objeto-success", "isController": false}, {"data": [[1.596357E12, 0.16666666666666666]], "isOverall": false, "label": "55.1 - Impuestos Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635682E12, 0.06666666666666667], [1.59635676E12, 0.1]], "isOverall": false, "label": "12.1 - Hacer clic en buscar-success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-success", "isController": false}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "60.2 - Hacer clic en la secci\u00F3n Cotizaciones relacionadas a historial-success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "5.1 - Hacer clic en Crear cotizacion-success", "isController": false}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "28.2 - Hacer clic en el \u00EDcono de Buscar-success", "isController": false}, {"data": [[1.59635682E12, 0.16666666666666666]], "isOverall": false, "label": "15.1 - Hacer clic en Cotizacion nueva-success", "isController": false}, {"data": [[1.59635694E12, 0.16666666666666666]], "isOverall": false, "label": "34.2 - Grabar Objeto-success", "isController": false}, {"data": [[1.596357E12, 0.16666666666666666]], "isOverall": false, "label": "54.1 - Comisiones Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "64.1 - Cerrar Insis-2-success", "isController": false}, {"data": [[1.596357E12, 0.016666666666666666], [1.59635694E12, 0.15]], "isOverall": false, "label": "48.1 - Seleccionar la Dimensi\u00F3n de franquicia-success", "isController": false}, {"data": [[1.59635688E12, 0.16666666666666666]], "isOverall": false, "label": "T.21 - Hacer clic en el icono de editar Facturacion-success", "isController": true}, {"data": [[1.596357E12, 0.03333333333333333], [1.59635706E12, 0.13333333333333333]], "isOverall": false, "label": "T.57 - Informacion del cliente  Hacer clic en Siguiente-success", "isController": true}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "1.1 - Index-success", "isController": false}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "61.1 - Hacer clic en Cotizacion a cliente-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59635706E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 3.05, "minX": 1.5963567E12, "maxY": 7.733333333333333, "series": [{"data": [[1.59635682E12, 4.05], [1.5963567E12, 4.233333333333333], [1.596357E12, 3.85], [1.59635706E12, 6.1], [1.59635688E12, 6.983333333333333], [1.59635694E12, 7.733333333333333], [1.59635676E12, 3.05]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59635706E12, "title": "Total Transactions Per Second"}},
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
