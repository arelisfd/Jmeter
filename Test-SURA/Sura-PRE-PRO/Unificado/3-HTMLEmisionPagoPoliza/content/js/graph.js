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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 10.0, "series": [{"data": [[400.0, 2.0], [500.0, 8.0]], "isOverall": false, "label": "25.2 - Facultatives Hacer clic en Siguiente ", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 1.0], [2500.0, 1.0], [3100.0, 1.0], [3200.0, 2.0], [3400.0, 1.0], [1700.0, 1.0], [3700.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "39..2 - Ingresar la cantidad a pagar", "isController": false}, {"data": [[37400.0, 1.0], [42700.0, 1.0], [43000.0, 1.0], [45800.0, 1.0], [48000.0, 1.0], [47500.0, 1.0], [47200.0, 1.0], [49600.0, 1.0], [50500.0, 1.0], [51600.0, 1.0]], "isOverall": false, "label": "9.1 - En Poliza General Presionar Siguiente", "isController": false}, {"data": [[33200.0, 1.0], [40100.0, 1.0], [40900.0, 1.0], [43900.0, 1.0], [47100.0, 1.0], [22900.0, 1.0], [48000.0, 1.0], [27600.0, 1.0], [31400.0, 1.0], [32000.0, 1.0]], "isOverall": false, "label": "T.14 - Descuento Hacer clic en Siguiente ", "isController": true}, {"data": [[1100.0, 2.0], [1200.0, 1.0], [1300.0, 1.0], [1600.0, 1.0], [800.0, 1.0], [900.0, 2.0], [1000.0, 2.0]], "isOverall": false, "label": "6.2 - Buscar Id Cliente", "isController": false}, {"data": [[4200.0, 1.0], [4400.0, 1.0], [4600.0, 1.0], [11800.0, 1.0], [3300.0, 2.0], [3500.0, 1.0], [1900.0, 1.0], [3900.0, 2.0]], "isOverall": false, "label": "36.1 - Hacer clic en el \u00EDcono de Buscar de Descripcion", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 2.0], [2300.0, 1.0], [2400.0, 1.0], [19800.0, 1.0], [2700.0, 1.0], [1700.0, 1.0], [1900.0, 2.0]], "isOverall": false, "label": "T.11 - Grabar Objeto Asegurado", "isController": true}, {"data": [[600.0, 5.0], [1300.0, 1.0], [700.0, 2.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "37.1 -Hacer clic en Buscar", "isController": false}, {"data": [[600.0, 2.0], [400.0, 3.0], [1000.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "1.1 - Index", "isController": false}, {"data": [[8200.0, 1.0], [8400.0, 1.0], [4700.0, 2.0], [6300.0, 1.0], [7300.0, 1.0], [7600.0, 1.0], [7900.0, 1.0], [7800.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "T.34 - ingresar el numero de poliza Buscar", "isController": true}, {"data": [[300.0, 1.0], [400.0, 1.0], [200.0, 1.0], [100.0, 1.0], [500.0, 6.0]], "isOverall": false, "label": "6.3 - Buscar Id Cliente", "isController": false}, {"data": [[300.0, 1.0], [800.0, 3.0], [900.0, 2.0], [1000.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "6.8 - Buscar Id Cliente Ok", "isController": false}, {"data": [[21000.0, 1.0], [23000.0, 1.0], [23700.0, 1.0], [12100.0, 1.0], [24900.0, 1.0], [12700.0, 1.0], [12900.0, 1.0], [14400.0, 1.0], [14500.0, 1.0], [15500.0, 1.0]], "isOverall": false, "label": "T.15 - Deducible Hacer clic en Siguiente ", "isController": true}, {"data": [[300.0, 2.0], [400.0, 6.0], [200.0, 2.0]], "isOverall": false, "label": "5.3 - Seleccionar Actualizar Poliza", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 4.0], [1300.0, 2.0], [1400.0, 1.0], [1700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "17.2 - Documentos Hacer clic en Siguiente ", "isController": false}, {"data": [[8400.0, 1.0], [16900.0, 1.0], [16700.0, 2.0], [17800.0, 2.0], [19200.0, 1.0], [12400.0, 1.0], [13700.0, 1.0], [15800.0, 1.0]], "isOverall": false, "label": "T.19 - Comisiones Hacer clic en Siguiente ", "isController": true}, {"data": [[8600.0, 2.0], [8900.0, 1.0], [9700.0, 3.0], [9400.0, 1.0], [11600.0, 1.0], [12000.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "T.26 -  Ri PolizaHacer clic en Siguiente ", "isController": true}, {"data": [[600.0, 4.0], [500.0, 6.0]], "isOverall": false, "label": "32.2 - Hacer clic en Pagos", "isController": false}, {"data": [[9600.0, 1.0], [9400.0, 1.0], [4700.0, 1.0], [4900.0, 1.0], [5700.0, 1.0], [12200.0, 1.0], [11800.0, 1.0], [6200.0, 1.0], [7100.0, 1.0], [15500.0, 1.0]], "isOverall": false, "label": "7.1 - Presionar Buscar", "isController": false}, {"data": [[8300.0, 1.0], [2400.0, 1.0], [5000.0, 1.0], [5700.0, 1.0], [3200.0, 1.0], [3400.0, 1.0], [3500.0, 1.0], [7300.0, 2.0], [7800.0, 1.0]], "isOverall": false, "label": "T.2 - Ingresar a INSIS", "isController": true}, {"data": [[1200.0, 1.0], [1300.0, 2.0], [1400.0, 3.0], [1500.0, 1.0], [6000.0, 1.0], [1600.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "T.29 - Emitir Poliza Confirmacion Pre emision", "isController": true}, {"data": [[4300.0, 1.0], [4200.0, 1.0], [8200.0, 1.0], [10000.0, 1.0], [2800.0, 1.0], [2900.0, 1.0], [6200.0, 1.0], [6300.0, 1.0], [3200.0, 1.0], [3600.0, 1.0]], "isOverall": false, "label": "T. 40 - Hacer clic en OK", "isController": true}, {"data": [[2500.0, 1.0], [5500.0, 1.0], [3000.0, 1.0], [3500.0, 1.0], [3700.0, 2.0], [3800.0, 1.0], [3900.0, 2.0], [4000.0, 1.0]], "isOverall": false, "label": "34.2 - ingresar el numero de poliza Buscar", "isController": false}, {"data": [[0.0, 2.0], [100.0, 8.0]], "isOverall": false, "label": "1.2 - Index-0", "isController": false}, {"data": [[600.0, 2.0], [400.0, 8.0]], "isOverall": false, "label": "14.2 - Descuento Hacer clic en Siguiente ", "isController": false}, {"data": [[200.0, 3.0], [100.0, 7.0]], "isOverall": false, "label": "43.1 - Mensaje Operacion completada con exito", "isController": false}, {"data": [[300.0, 2.0], [100.0, 4.0], [200.0, 4.0]], "isOverall": false, "label": "1.2 - Index-1", "isController": false}, {"data": [[300.0, 6.0], [400.0, 4.0]], "isOverall": false, "label": "T.43 - Mensaje Operacion completada con exito", "isController": true}, {"data": [[600.0, 5.0], [700.0, 2.0], [400.0, 1.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "10.2 - En coberturas Hacer clic en Detalles", "isController": false}, {"data": [[1200.0, 1.0], [700.0, 1.0], [800.0, 2.0], [900.0, 4.0], [1000.0, 2.0]], "isOverall": false, "label": "T.1 - Index", "isController": true}, {"data": [[4600.0, 1.0], [4400.0, 1.0], [4800.0, 1.0], [5100.0, 1.0], [5200.0, 3.0], [5400.0, 1.0], [5600.0, 1.0], [49000.0, 1.0]], "isOverall": false, "label": "T.12 - Cerrar Objeto Asegurado", "isController": true}, {"data": [[4300.0, 1.0], [2700.0, 1.0], [3000.0, 1.0], [25300.0, 1.0], [3400.0, 1.0], [3500.0, 1.0], [3700.0, 1.0], [3800.0, 1.0], [3900.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "10.1 - En coberturas Hacer clic en Detalles", "isController": false}, {"data": [[4200.0, 1.0], [8600.0, 1.0], [4400.0, 1.0], [4900.0, 2.0], [10100.0, 1.0], [13400.0, 1.0], [3700.0, 2.0], [4000.0, 1.0]], "isOverall": false, "label": "38.1 - Hacer clic en Aceptar", "isController": false}, {"data": [[200.0, 7.0], [100.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "32.4 - Hacer clic en Pagos", "isController": false}, {"data": [[300.0, 2.0], [600.0, 3.0], [700.0, 1.0], [400.0, 1.0], [500.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "35 - ingresar el numero de poliza Buscar", "isController": false}, {"data": [[600.0, 3.0], [1400.0, 1.0], [700.0, 1.0], [800.0, 3.0], [400.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "6.4 - Buscar Id Cliente", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [700.0, 2.0], [400.0, 1.0], [100.0, 2.0], [200.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "6.10 - Buscar Id Cliente Ok", "isController": false}, {"data": [[1100.0, 2.0], [2400.0, 1.0], [1200.0, 3.0], [1300.0, 2.0], [1400.0, 2.0]], "isOverall": false, "label": "T.44 - Cerrar Insis", "isController": true}, {"data": [[300.0, 3.0], [700.0, 1.0], [400.0, 2.0], [200.0, 1.0], [500.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "2.1 - Ingresar a INSIS", "isController": false}, {"data": [[4100.0, 2.0], [2100.0, 1.0], [2700.0, 1.0], [3300.0, 1.0], [3400.0, 1.0], [3500.0, 1.0], [3700.0, 1.0], [3800.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": "27.1 - Emitir Poliza Calculo de Prima", "isController": false}, {"data": [[2600.0, 1.0], [5800.0, 1.0], [1500.0, 1.0], [3300.0, 2.0], [3400.0, 1.0], [900.0, 1.0], [1800.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "31.1 - Hacer clic en Facturaci\u00F3n y Cobranza", "isController": false}, {"data": [[300.0, 1.0], [600.0, 2.0], [200.0, 3.0], [500.0, 4.0]], "isOverall": false, "label": "31.2 - Hacer clic en Facturaci\u00F3n y Cobranza", "isController": false}, {"data": [[16700.0, 1.0], [9100.0, 1.0], [19700.0, 2.0], [19800.0, 1.0], [13000.0, 1.0], [13600.0, 1.0], [14700.0, 1.0], [7600.0, 1.0], [16300.0, 1.0]], "isOverall": false, "label": "T.23- Claculo prima Hacer clic en Siguiente ", "isController": true}, {"data": [[300.0, 1.0], [200.0, 3.0], [400.0, 1.0], [100.0, 2.0], [1900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "40.3- Hacer clic en OK", "isController": false}, {"data": [[300.0, 4.0], [200.0, 2.0], [400.0, 4.0]], "isOverall": false, "label": "3.1 - Seleccionar Operaciones del Sistema", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 3.0], [21500.0, 1.0], [700.0, 1.0], [800.0, 2.0], [1000.0, 2.0]], "isOverall": false, "label": "12.1 - Cerrar Objeto Asegurado", "isController": false}, {"data": [[16500.0, 1.0], [11600.0, 1.0], [11500.0, 1.0], [12100.0, 1.0], [12700.0, 1.0], [12300.0, 1.0], [13500.0, 1.0], [7100.0, 1.0], [14900.0, 1.0], [7700.0, 1.0]], "isOverall": false, "label": "22.1 - Informacion del cliente Hacer clic en Siguiente ", "isController": false}, {"data": [[600.0, 2.0], [400.0, 2.0], [800.0, 3.0], [500.0, 3.0]], "isOverall": false, "label": "11.2 - Grabar Objeto Asegurado", "isController": false}, {"data": [[600.0, 2.0], [800.0, 1.0], [500.0, 7.0]], "isOverall": false, "label": "19.2 - Comisiones Hacer clic en Siguiente ", "isController": false}, {"data": [[300.0, 1.0], [400.0, 1.0], [200.0, 4.0], [100.0, 4.0]], "isOverall": false, "label": "44.3 - Cerrar Insis-1", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "42.2 - Hacer clic en Actividades y Aplicar Pago-1", "isController": false}, {"data": [[4800.0, 1.0], [5300.0, 1.0], [10600.0, 1.0], [6300.0, 2.0], [6200.0, 1.0], [6900.0, 1.0], [6700.0, 1.0], [6800.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "T.39 - Ingresar la cantidad a pagar", "isController": true}, {"data": [[0.0, 4.0], [200.0, 1.0], [100.0, 3.0], [400.0, 1.0]], "isOverall": false, "label": "44.1 - Cerrar Insis-2", "isController": false}, {"data": [[300.0, 1.0], [100.0, 9.0]], "isOverall": false, "label": "44.3 - Cerrar Insis-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "42.2 - Hacer clic en Actividades y Aplicar Pago-0", "isController": false}, {"data": [[21000.0, 1.0], [23000.0, 1.0], [23700.0, 1.0], [12100.0, 1.0], [24900.0, 1.0], [12700.0, 1.0], [12900.0, 1.0], [14400.0, 1.0], [14500.0, 1.0], [15500.0, 1.0]], "isOverall": false, "label": "15.1 - Deducible Hacer clic en Siguiente ", "isController": false}, {"data": [[2100.0, 2.0], [1200.0, 1.0], [2600.0, 1.0], [3100.0, 1.0], [6400.0, 1.0], [1700.0, 1.0], [3900.0, 3.0]], "isOverall": false, "label": "T.31 - Hacer clic en Facturaci\u00F3n y Cobranza", "isController": true}, {"data": [[300.0, 4.0], [200.0, 3.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "1.2 - Index", "isController": false}, {"data": [[300.0, 4.0], [200.0, 2.0], [400.0, 4.0]], "isOverall": false, "label": "T.3 - Seleccionar Operaciones del Sistema", "isController": true}, {"data": [[1200.0, 1.0], [19000.0, 1.0], [1300.0, 1.0], [1400.0, 2.0], [1500.0, 1.0], [1600.0, 2.0], [1900.0, 2.0]], "isOverall": false, "label": "11.1 - Grabar Objeto Asegurado", "isController": false}, {"data": [[300.0, 4.0], [800.0, 1.0], [400.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "1.1 - Index-0", "isController": false}, {"data": [[0.0, 2.0], [100.0, 8.0]], "isOverall": false, "label": "1.1 - Index-1", "isController": false}, {"data": [[2700.0, 1.0], [2800.0, 1.0], [2900.0, 2.0], [3000.0, 1.0], [3200.0, 2.0], [3500.0, 2.0], [14200.0, 1.0]], "isOverall": false, "label": "12.2 - Cerrar Objeto Asegurado", "isController": false}, {"data": [[2100.0, 1.0], [2400.0, 1.0], [9900.0, 1.0], [2600.0, 1.0], [2800.0, 1.0], [1400.0, 1.0], [3200.0, 1.0], [200.0, 1.0], [1600.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "41.1 - Hacer clic en Grabar", "isController": false}, {"data": [[600.0, 2.0], [400.0, 1.0], [500.0, 7.0]], "isOverall": false, "label": "7.2 - Presionar Buscar", "isController": false}, {"data": [[17300.0, 1.0], [11000.0, 1.0], [11600.0, 2.0], [11800.0, 1.0], [12700.0, 1.0], [12400.0, 1.0], [24700.0, 1.0], [15800.0, 1.0], [16100.0, 1.0]], "isOverall": false, "label": "17.1 - Documentos Hacer clic en Siguiente ", "isController": false}, {"data": [[8800.0, 1.0], [9400.0, 1.0], [9700.0, 1.0], [10100.0, 1.0], [5000.0, 1.0], [10300.0, 1.0], [10500.0, 1.0], [11500.0, 1.0], [7700.0, 1.0], [7800.0, 1.0]], "isOverall": false, "label": "25.1 - Facultatives Hacer clic en Siguiente ", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [2400.0, 1.0], [4700.0, 1.0], [2500.0, 1.0], [2800.0, 1.0], [1500.0, 1.0], [1700.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "26.2 -  Ri PolizaHacer clic en Siguiente ", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "42 - Hacer clic en Grabar-0", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "42.3 - Hacer clic en Actividades y Aplicar Pago-0", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "42 - Hacer clic en Grabar-1", "isController": false}, {"data": [[300.0, 8.0], [400.0, 2.0]], "isOverall": false, "label": "34.3 - ingresar el numero de poliza Buscar", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [1300.0, 1.0], [10900.0, 1.0], [100.0, 1.0], [900.0, 1.0], [7500.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "42.2 - Hacer clic en Actividades y Aplicar Pago", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "42.3 - Hacer clic en Actividades y Aplicar Pago-1", "isController": false}, {"data": [[300.0, 7.0], [1300.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "37.3 -Hacer clic en Buscar", "isController": false}, {"data": [[600.0, 1.0], [700.0, 3.0], [800.0, 1.0], [400.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "24.2 - Plan de cuotas Hacer clic en Siguiente ", "isController": false}, {"data": [[17400.0, 1.0], [17100.0, 1.0], [18600.0, 1.0], [11500.0, 1.0], [13100.0, 1.0], [12900.0, 1.0], [12800.0, 1.0], [26400.0, 1.0], [13800.0, 1.0], [13900.0, 1.0]], "isOverall": false, "label": "T.17 - Documentos Hacer clic en Siguiente ", "isController": true}, {"data": [[17100.0, 1.0], [19700.0, 1.0], [20600.0, 1.0], [21100.0, 1.0], [20500.0, 1.0], [21700.0, 1.0], [5600.0, 1.0], [12500.0, 1.0], [14700.0, 1.0], [15400.0, 1.0]], "isOverall": false, "label": "24.1 - Plan de cuotas Hacer clic en Siguiente ", "isController": false}, {"data": [[600.0, 1.0], [1400.0, 1.0], [800.0, 4.0], [500.0, 2.0], [1000.0, 2.0]], "isOverall": false, "label": "6.1 - Buscar Id Cliente", "isController": false}, {"data": [[8400.0, 1.0], [19200.0, 1.0], [19300.0, 1.0], [19100.0, 1.0], [12400.0, 1.0], [13000.0, 1.0], [7000.0, 1.0], [14200.0, 1.0], [15800.0, 1.0], [16100.0, 1.0]], "isOverall": false, "label": "23.1 - Claculo prima Hacer clic en Siguiente", "isController": false}, {"data": [[300.0, 4.0], [400.0, 1.0], [200.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "44.3 - Cerrar Insis", "isController": false}, {"data": [[4900.0, 1.0], [5400.0, 1.0], [5800.0, 1.0], [5900.0, 1.0], [6300.0, 1.0], [6500.0, 1.0], [6600.0, 2.0], [6700.0, 1.0], [57800.0, 1.0]], "isOverall": false, "label": "T.10 - En coberturas Hacer clic en Detalles", "isController": true}, {"data": [[600.0, 3.0], [700.0, 1.0], [6900.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "42 - Hacer clic en Grabar", "isController": false}, {"data": [[18100.0, 1.0], [18200.0, 1.0], [17800.0, 1.0], [20500.0, 1.0], [13200.0, 1.0], [13900.0, 1.0], [15500.0, 1.0], [15400.0, 1.0], [15900.0, 1.0], [16200.0, 1.0]], "isOverall": false, "label": "T.21 - Clausulas Hacer clic en Siguiente ", "isController": true}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "42.4 - Hacer clic en Actividades y Aplicar Pago-0", "isController": false}, {"data": [[17700.0, 1.0], [18100.0, 1.0], [18500.0, 2.0], [19400.0, 1.0], [10400.0, 1.0], [13000.0, 1.0], [13200.0, 1.0], [13900.0, 1.0], [16300.0, 1.0]], "isOverall": false, "label": "T.20 - Impuestos Hacer clic en Siguiente ", "isController": true}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "42.4 - Hacer clic en Actividades y Aplicar Pago-1", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 5.0], [700.0, 1.0], [800.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "5.2 - Seleccionar Actualizar Poliza", "isController": false}, {"data": [[4200.0, 1.0], [8500.0, 1.0], [2400.0, 1.0], [3000.0, 1.0], [3100.0, 1.0], [3200.0, 2.0], [3300.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "39.1 - Ingresar la cantidad a pagar", "isController": false}, {"data": [[600.0, 3.0], [400.0, 2.0], [500.0, 5.0]], "isOverall": false, "label": "13.2 - En coberturas Hacer clic en Siguiente", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0], [100.0, 5.0]], "isOverall": false, "label": "43.4  - Cerrar Insis", "isController": false}, {"data": [[1200.0, 1.0], [1300.0, 2.0], [1400.0, 3.0], [1500.0, 1.0], [6000.0, 1.0], [1600.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "29.1 - Emitir Poliza Confirmacion Pre emision", "isController": false}, {"data": [[600.0, 3.0], [400.0, 1.0], [1900.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "20.2 - Impuestos Hacer clic en Siguiente ", "isController": false}, {"data": [[4200.0, 1.0], [4400.0, 1.0], [4600.0, 1.0], [11800.0, 1.0], [3300.0, 2.0], [3500.0, 1.0], [1900.0, 1.0], [3900.0, 2.0]], "isOverall": false, "label": "T.36 - Hacer clic en el \u00EDcono de Buscar de Descripcion", "isController": true}, {"data": [[1500.0, 1.0]], "isOverall": false, "label": "40.2 - Hacer clic en OK-1", "isController": false}, {"data": [[3100.0, 1.0]], "isOverall": false, "label": "40.2 - Hacer clic en OK-0", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "40.3- Hacer clic en OK-0", "isController": false}, {"data": [[38000.0, 1.0], [43200.0, 1.0], [43600.0, 1.0], [46500.0, 1.0], [48600.0, 1.0], [48100.0, 1.0], [47900.0, 1.0], [50300.0, 1.0], [51000.0, 1.0], [52200.0, 1.0]], "isOverall": false, "label": "T.9 - En Poliza General Presionar Siguiente", "isController": true}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "40.3- Hacer clic en OK-1", "isController": false}, {"data": [[16400.0, 1.0], [17200.0, 2.0], [18700.0, 1.0], [11600.0, 1.0], [13200.0, 1.0], [15100.0, 1.0], [7800.0, 1.0], [16200.0, 1.0], [16100.0, 1.0]], "isOverall": false, "label": "19.1 - Comisiones Hacer clic en Siguiente ", "isController": false}, {"data": [[300.0, 3.0], [600.0, 1.0], [100.0, 1.0], [200.0, 3.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-0", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [100.0, 5.0], [200.0, 1.0]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-1", "isController": false}, {"data": [[17500.0, 1.0], [19000.0, 1.0], [11100.0, 1.0], [11400.0, 1.0], [11900.0, 1.0], [12400.0, 1.0], [14200.0, 1.0], [14900.0, 1.0], [15800.0, 1.0], [16000.0, 1.0]], "isOverall": false, "label": "T.18 - Documentos Objeto Hacer clic en Siguiente ", "isController": true}, {"data": [[39200.0, 1.0], [40600.0, 1.0], [42500.0, 1.0], [43400.0, 1.0], [48200.0, 1.0], [48500.0, 1.0], [24900.0, 1.0], [49300.0, 1.0], [52100.0, 1.0], [56000.0, 1.0]], "isOverall": false, "label": "8.1 - Presionar Siguiente", "isController": false}, {"data": [[400.0, 4.0], [500.0, 6.0]], "isOverall": false, "label": "22.2 - Informacion del cliente Hacer clic en Siguiente", "isController": false}, {"data": [[16700.0, 1.0], [9500.0, 1.0], [1300.0, 1.0], [11400.0, 1.0], [12500.0, 1.0], [200.0, 1.0], [13800.0, 1.0], [900.0, 1.0], [15700.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "42.1 - Hacer clic en Actividades y Aplicar Pago", "isController": false}, {"data": [[17300.0, 1.0], [17400.0, 1.0], [16500.0, 1.0], [19200.0, 1.0], [18500.0, 1.0], [10200.0, 1.0], [21200.0, 1.0], [12900.0, 1.0], [15600.0, 1.0], [16300.0, 1.0]], "isOverall": false, "label": "T.5 - Seleccionar Actualizar Poliza", "isController": true}, {"data": [[300.0, 2.0], [700.0, 2.0], [400.0, 1.0], [200.0, 1.0], [800.0, 1.0], [1700.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "44.1 - Cerrar Insis", "isController": false}, {"data": [[9600.0, 1.0], [9700.0, 1.0], [5000.0, 1.0], [6000.0, 1.0], [6300.0, 1.0], [6900.0, 1.0], [6800.0, 1.0], [7000.0, 1.0], [7300.0, 2.0]], "isOverall": false, "label": "26.1 -  Ri PolizaHacer clic en Siguiente ", "isController": false}, {"data": [[436200.0, 1.0], [447700.0, 1.0], [449900.0, 1.0], [452400.0, 1.0], [464400.0, 1.0], [463900.0, 1.0], [482700.0, 1.0], [482000.0, 1.0], [485200.0, 1.0], [484700.0, 1.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[8400.0, 1.0], [9700.0, 1.0], [5600.0, 1.0], [5500.0, 1.0], [6000.0, 1.0], [7400.0, 1.0], [7600.0, 1.0], [7500.0, 1.0], [7800.0, 2.0]], "isOverall": false, "label": "T.6 - Buscar Id Cliente", "isController": true}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "41.1 - Hacer clic en Grabar-1", "isController": false}, {"data": [[600.0, 3.0], [700.0, 1.0], [500.0, 6.0]], "isOverall": false, "label": "9.2 - En Poliza General Presionar Siguiente", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "41.1 - Hacer clic en Grabar-0", "isController": false}, {"data": [[100.0, 8.0], [200.0, 2.0]], "isOverall": false, "label": "43.2 - Mensaje Operacion completada con exito", "isController": false}, {"data": [[39700.0, 1.0], [40400.0, 1.0], [43500.0, 1.0], [22400.0, 1.0], [46400.0, 1.0], [47500.0, 1.0], [27200.0, 1.0], [31500.0, 1.0], [30900.0, 1.0], [32500.0, 1.0]], "isOverall": false, "label": "14.1 - Descuento Hacer clic en Siguiente ", "isController": false}, {"data": [[17200.0, 1.0], [18300.0, 1.0], [22300.0, 1.0], [10900.0, 1.0], [3000.0, 1.0], [12400.0, 1.0], [12600.0, 1.0], [800.0, 1.0], [15000.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "T.42 - Hacer clic en Actividades y Aplicar Pago", "isController": true}, {"data": [[1400.0, 4.0], [1500.0, 2.0], [1600.0, 2.0], [400.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "T.16 - Deducible Hacer clic en Siguiente ", "isController": true}, {"data": [[8800.0, 1.0], [18100.0, 1.0], [17700.0, 1.0], [20200.0, 1.0], [11700.0, 1.0], [14800.0, 1.0], [14600.0, 1.0], [15400.0, 1.0], [16200.0, 1.0], [16300.0, 1.0]], "isOverall": false, "label": "5.1 - Seleccionar Actualizar Poliza", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "43.2 - Mensaje Operacion completada con exito-1", "isController": false}, {"data": [[17100.0, 1.0], [18500.0, 1.0], [10400.0, 1.0], [10900.0, 1.0], [11300.0, 1.0], [11900.0, 1.0], [13700.0, 1.0], [14400.0, 1.0], [15300.0, 1.0], [15600.0, 1.0]], "isOverall": false, "label": "18.1 - Documentos Objeto Hacer clic en Siguiente ", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "43.2 - Mensaje Operacion completada con exito-0", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 1.0], [700.0, 1.0], [800.0, 2.0], [13100.0, 1.0], [900.0, 2.0], [1000.0, 2.0]], "isOverall": false, "label": "12.3 - Cerrar Objeto Asegurado", "isController": false}, {"data": [[300.0, 1.0], [700.0, 4.0], [400.0, 1.0], [200.0, 1.0], [800.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "42.3 - Hacer clic en Actividades y Aplicar Pago", "isController": false}, {"data": [[600.0, 2.0], [200.0, 2.0], [800.0, 2.0], [1000.0, 1.0], [1100.0, 2.0], [300.0, 2.0], [1200.0, 1.0], [1300.0, 2.0], [1400.0, 2.0], [400.0, 1.0], [1800.0, 1.0], [31100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "10.3 - En coberturas Hacer clic en Detalles", "isController": false}, {"data": [[400.0, 3.0], [100.0, 7.0]], "isOverall": false, "label": "44.1 - Cerrar Insis-1", "isController": false}, {"data": [[300.0, 2.0], [100.0, 5.0], [200.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "44.1 - Cerrar Insis-0", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "42.1 - Hacer clic en Actividades y Aplicar Pago-1", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "42.1 - Hacer clic en Actividades y Aplicar Pago-0", "isController": false}, {"data": [[17300.0, 1.0], [17500.0, 1.0], [17600.0, 1.0], [19900.0, 1.0], [12700.0, 1.0], [13400.0, 1.0], [15000.0, 1.0], [14900.0, 1.0], [15400.0, 1.0], [15700.0, 1.0]], "isOverall": false, "label": "21.1 - Clausulas Hacer clic en Siguiente", "isController": false}, {"data": [[4100.0, 2.0], [2300.0, 1.0], [4800.0, 1.0], [4700.0, 1.0], [2600.0, 1.0], [5500.0, 1.0], [3600.0, 1.0], [3900.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "30.1 - Emitir Poliza ", "isController": false}, {"data": [[4200.0, 1.0], [4600.0, 1.0], [2500.0, 2.0], [2800.0, 1.0], [6300.0, 1.0], [6400.0, 1.0], [6500.0, 1.0], [1700.0, 1.0], [6900.0, 1.0]], "isOverall": false, "label": "2.2 - Ingresar a INSIS", "isController": false}, {"data": [[4100.0, 1.0], [4300.0, 1.0], [4500.0, 1.0], [4800.0, 1.0], [5000.0, 1.0], [5700.0, 1.0], [7200.0, 1.0], [3600.0, 1.0], [3800.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "33.1 - Hacer clic en Actividades Nuevo", "isController": false}, {"data": [[1200.0, 1.0], [600.0, 2.0], [700.0, 2.0], [400.0, 1.0], [800.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "T.4 - Seleccionar Control de Polizas", "isController": true}, {"data": [[300.0, 3.0], [200.0, 1.0], [400.0, 4.0], [500.0, 2.0]], "isOverall": false, "label": "4.1 - Seleccionar Control de Polizas", "isController": false}, {"data": [[1400.0, 4.0], [1500.0, 2.0], [1600.0, 2.0], [400.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "16.1 - Deducible Hacer clic en Siguiente -124", "isController": false}, {"data": [[0.0, 4.0], [100.0, 6.0]], "isOverall": false, "label": "44.2 - Cerrar Insis-1", "isController": false}, {"data": [[0.0, 4.0], [100.0, 5.0], [400.0, 1.0]], "isOverall": false, "label": "44.2 - Cerrar Insis-0", "isController": false}, {"data": [[35900.0, 1.0], [35500.0, 1.0], [24200.0, 1.0], [12700.0, 1.0], [27200.0, 1.0], [27500.0, 1.0], [28200.0, 1.0], [29200.0, 1.0], [29800.0, 1.0], [32000.0, 1.0]], "isOverall": false, "label": "T.13 - En coberturas Hacer clic en Siguiente", "isController": true}, {"data": [[8300.0, 2.0], [9400.0, 1.0], [9800.0, 1.0], [10200.0, 1.0], [10700.0, 1.0], [10800.0, 1.0], [11100.0, 1.0], [5500.0, 1.0], [12100.0, 1.0]], "isOverall": false, "label": "T.25 - Facultatives Hacer clic en Siguiente ", "isController": true}, {"data": [[1200.0, 2.0], [2500.0, 1.0], [1300.0, 3.0], [1400.0, 2.0], [1600.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "28.1 - Emitir Poliza Validacion", "isController": false}, {"data": [[200.0, 1.0], [100.0, 7.0], [400.0, 2.0]], "isOverall": false, "label": "42.4 - Hacer clic en Actividades y Aplicar Pago", "isController": false}, {"data": [[300.0, 3.0], [600.0, 1.0], [400.0, 5.0], [500.0, 1.0]], "isOverall": false, "label": "2.3 - Ingresar a INSIS", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [400.0, 2.0], [200.0, 2.0], [900.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "6.5 - Buscar Id Cliente", "isController": false}, {"data": [[8300.0, 1.0], [17000.0, 1.0], [12100.0, 1.0], [11900.0, 1.0], [12700.0, 1.0], [13200.0, 1.0], [12800.0, 1.0], [14100.0, 1.0], [15400.0, 1.0], [7700.0, 1.0]], "isOverall": false, "label": "T.22- Informacion del cliente Hacer clic en Siguiente ", "isController": true}, {"data": [[10200.0, 1.0], [9900.0, 1.0], [5200.0, 1.0], [5400.0, 1.0], [12700.0, 1.0], [12300.0, 1.0], [6300.0, 1.0], [6700.0, 1.0], [7700.0, 1.0], [16100.0, 1.0]], "isOverall": false, "label": "T.7 - Presionar Buscar", "isController": true}, {"data": [[600.0, 1.0], [400.0, 3.0], [500.0, 6.0]], "isOverall": false, "label": "21.2 - Clausulas Hacer clic en Siguiente", "isController": false}, {"data": [[300.0, 2.0], [600.0, 3.0], [700.0, 1.0], [400.0, 1.0], [500.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "T.35 - ingresar el numero de poliza Buscar", "isController": true}, {"data": [[41000.0, 1.0], [41500.0, 1.0], [44400.0, 1.0], [43400.0, 1.0], [48900.0, 1.0], [49400.0, 1.0], [50100.0, 1.0], [25600.0, 1.0], [52800.0, 1.0], [56800.0, 1.0]], "isOverall": false, "label": "T.8 - Presionar Siguiente", "isController": true}, {"data": [[600.0, 1.0], [700.0, 1.0], [500.0, 8.0]], "isOverall": false, "label": "23.2 - Claculo prima Hacer clic en Siguiente", "isController": false}, {"data": [[8500.0, 1.0], [2300.0, 1.0], [10500.0, 1.0], [2700.0, 1.0], [700.0, 1.0], [3100.0, 1.0], [3200.0, 1.0], [3400.0, 1.0], [1900.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "T.41 - Hacer clic en Grabar", "isController": true}, {"data": [[17700.0, 1.0], [20200.0, 1.0], [21300.0, 2.0], [21800.0, 1.0], [22400.0, 1.0], [6000.0, 1.0], [13000.0, 1.0], [15300.0, 1.0], [16000.0, 1.0]], "isOverall": false, "label": "T.24 - Plan de cuotas Hacer clic en Siguiente ", "isController": true}, {"data": [[300.0, 2.0], [5500.0, 1.0], [400.0, 1.0], [3500.0, 1.0], [3700.0, 1.0], [3600.0, 1.0], [3900.0, 2.0], [4000.0, 1.0]], "isOverall": false, "label": "34.1 - ingresar el numero de poliza Buscar", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "43.1 - Mensaje Operacion completada con exito-1", "isController": false}, {"data": [[600.0, 2.0], [400.0, 6.0], [500.0, 2.0]], "isOverall": false, "label": "33.2 - Hacer clic en Actividades Nuevo", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "43.1 - Mensaje Operacion completada con exito-0", "isController": false}, {"data": [[34800.0, 1.0], [35300.0, 1.0], [23700.0, 1.0], [12200.0, 1.0], [26600.0, 1.0], [27600.0, 1.0], [26900.0, 1.0], [28500.0, 1.0], [29400.0, 1.0], [31400.0, 1.0]], "isOverall": false, "label": "13.1 - En coberturas Hacer clic en Siguiente", "isController": false}, {"data": [[9300.0, 1.0], [5000.0, 1.0], [4900.0, 1.0], [10200.0, 1.0], [11000.0, 1.0], [6200.0, 2.0], [6300.0, 1.0], [6800.0, 1.0], [7000.0, 1.0]], "isOverall": false, "label": "32.1 - Hacer clic en Pagos", "isController": false}, {"data": [[200.0, 5.0], [100.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "44.2 - Cerrar Insis", "isController": false}, {"data": [[600.0, 1.0], [700.0, 4.0], [800.0, 2.0], [1700.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "8.2 - Presionar Siguiente", "isController": false}, {"data": [[1200.0, 2.0], [2500.0, 1.0], [1300.0, 3.0], [1400.0, 2.0], [1600.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "T.28 - Emitir Poliza Validacion", "isController": true}, {"data": [[4100.0, 1.0], [4300.0, 1.0], [4400.0, 1.0], [4600.0, 1.0], [4800.0, 1.0], [5000.0, 1.0], [5300.0, 1.0], [5600.0, 1.0], [6300.0, 1.0], [7800.0, 1.0]], "isOverall": false, "label": "T.33 - Hacer clic en Actividades Nuevo", "isController": true}, {"data": [[4200.0, 1.0], [4300.0, 1.0], [4500.0, 1.0], [4600.0, 1.0], [4800.0, 1.0], [5300.0, 2.0], [5500.0, 1.0], [5800.0, 1.0], [3300.0, 1.0]], "isOverall": false, "label": "T.37 -Hacer clic en Buscar", "isController": true}, {"data": [[1100.0, 1.0], [1200.0, 2.0], [1300.0, 1.0], [700.0, 1.0], [800.0, 3.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "6.6 - Buscar Id Cliente", "isController": false}, {"data": [[600.0, 2.0], [300.0, 1.0], [700.0, 2.0], [400.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "6.7 - Buscar Id Cliente", "isController": false}, {"data": [[300.0, 1.0], [1300.0, 1.0], [700.0, 1.0], [800.0, 1.0], [400.0, 1.0], [900.0, 1.0], [1000.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "6.9 - Buscar Id Cliente Ok", "isController": false}, {"data": [[600.0, 2.0], [400.0, 6.0], [500.0, 2.0]], "isOverall": false, "label": "18.2 - Documentos Objeto Hacer clic en Siguiente", "isController": false}, {"data": [[4200.0, 1.0], [8600.0, 1.0], [4400.0, 1.0], [4900.0, 2.0], [10100.0, 1.0], [13400.0, 1.0], [3700.0, 2.0], [4000.0, 1.0]], "isOverall": false, "label": "T.38 - Hacer clic en Aceptar", "isController": true}, {"data": [[600.0, 5.0], [4700.0, 1.0], [2500.0, 2.0], [7500.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "40.2 - Hacer clic en OK", "isController": false}, {"data": [[2100.0, 1.0], [2400.0, 1.0], [2800.0, 1.0], [3200.0, 3.0], [3400.0, 1.0], [1700.0, 1.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "40.1 - Hacer clic en OK", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[4200.0, 2.0], [4700.0, 1.0], [1300.0, 1.0], [3300.0, 2.0], [3500.0, 2.0], [3700.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "37.2 -Hacer clic en Buscar", "isController": false}, {"data": [[300.0, 2.0], [200.0, 7.0], [100.0, 1.0]], "isOverall": false, "label": "32 .3- Hacer clic en Pagos", "isController": false}, {"data": [[4100.0, 2.0], [2100.0, 1.0], [2700.0, 1.0], [3300.0, 1.0], [3400.0, 1.0], [3500.0, 1.0], [3700.0, 1.0], [3800.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": "T.27 - Emitir Poliza Calculo de Prima", "isController": true}, {"data": [[300.0, 3.0], [600.0, 1.0], [100.0, 3.0], [200.0, 3.0]], "isOverall": false, "label": "4.2 - Seleccionar Control de Polizas", "isController": false}, {"data": [[4100.0, 2.0], [2300.0, 1.0], [4800.0, 1.0], [4700.0, 1.0], [2600.0, 1.0], [5500.0, 1.0], [3600.0, 1.0], [3900.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "T.30 - Emitir Poliza ", "isController": true}, {"data": [[8200.0, 1.0], [8400.0, 1.0], [10300.0, 1.0], [5700.0, 1.0], [11400.0, 1.0], [6100.0, 1.0], [12100.0, 1.0], [7300.0, 2.0], [7400.0, 1.0]], "isOverall": false, "label": "T.32 - Hacer clic en Pagos", "isController": true}, {"data": [[17000.0, 1.0], [17900.0, 2.0], [18900.0, 1.0], [9800.0, 1.0], [12300.0, 1.0], [12600.0, 1.0], [13300.0, 1.0], [15700.0, 1.0], [16100.0, 1.0]], "isOverall": false, "label": "20.1 - Impuestos Hacer clic en Siguiente ", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 485200.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 369.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 404.0, "series": [{"data": [[0.0, 404.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 369.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 386.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 4.95528455284553, "minX": 1.5963567E12, "maxY": 10.0, "series": [{"data": [[1.59635682E12, 10.0], [1.59635712E12, 9.754569190600527], [1.5963567E12, 7.99230769230769], [1.59635718E12, 4.95528455284553], [1.596357E12, 10.0], [1.59635706E12, 10.0], [1.59635688E12, 10.0], [1.59635694E12, 10.0], [1.59635676E12, 10.0]], "isOverall": false, "label": "3- Thread Group_Emision_Pago_Poliza", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59635718E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 485210.0, "series": [{"data": [[16.0, 529.0], [10.0, 537.4], [12.0, 560.0], [14.0, 531.5]], "isOverall": false, "label": "25.2 - Facultatives Hacer clic en Siguiente ", "isController": false}, {"data": [[12.200000000000001, 536.8]], "isOverall": false, "label": "25.2 - Facultatives Hacer clic en Siguiente -Aggregated", "isController": false}, {"data": [[9.0, 2158.5], [10.0, 3214.25], [5.0, 1781.0], [6.0, 2878.0]], "isOverall": false, "label": "39..2 - Ingresar la cantidad a pagar", "isController": false}, {"data": [[8.100000000000001, 2758.9]], "isOverall": false, "label": "39..2 - Ingresar la cantidad a pagar-Aggregated", "isController": false}, {"data": [[30.0, 46383.6]], "isOverall": false, "label": "9.1 - En Poliza General Presionar Siguiente", "isController": false}, {"data": [[30.0, 46383.6]], "isOverall": false, "label": "9.1 - En Poliza General Presionar Siguiente-Aggregated", "isController": false}, {"data": [[20.0, 39201.8], [24.0, 37371.0], [26.0, 32338.0], [27.0, 32021.0]], "isOverall": false, "label": "T.14 - Descuento Hacer clic en Siguiente ", "isController": true}, {"data": [[22.7, 36744.8]], "isOverall": false, "label": "T.14 - Descuento Hacer clic en Siguiente -Aggregated", "isController": true}, {"data": [[30.0, 1126.4]], "isOverall": false, "label": "6.2 - Buscar Id Cliente", "isController": false}, {"data": [[30.0, 1126.4]], "isOverall": false, "label": "6.2 - Buscar Id Cliente-Aggregated", "isController": false}, {"data": [[8.0, 6903.5], [10.0, 3947.375]], "isOverall": false, "label": "36.1 - Hacer clic en el \u00EDcono de Buscar de Descripcion", "isController": false}, {"data": [[9.600000000000001, 4538.599999999999]], "isOverall": false, "label": "36.1 - Hacer clic en el \u00EDcono de Buscar de Descripcion-Aggregated", "isController": false}, {"data": [[30.0, 3969.1000000000004]], "isOverall": false, "label": "T.11 - Grabar Objeto Asegurado", "isController": true}, {"data": [[30.0, 3969.1000000000004]], "isOverall": false, "label": "T.11 - Grabar Objeto Asegurado-Aggregated", "isController": true}, {"data": [[8.0, 976.0], [10.0, 685.0]], "isOverall": false, "label": "37.1 -Hacer clic en Buscar", "isController": false}, {"data": [[9.600000000000001, 743.1999999999999]], "isOverall": false, "label": "37.1 -Hacer clic en Buscar-Aggregated", "isController": false}, {"data": [[16.0, 474.0], [19.0, 582.0], [10.0, 514.0], [22.0, 558.0], [6.0, 1000.0], [25.0, 489.0], [13.0, 618.0], [7.0, 524.0], [28.0, 489.0], [30.0, 646.0]], "isOverall": false, "label": "1.1 - Index", "isController": false}, {"data": [[17.599999999999998, 589.4]], "isOverall": false, "label": "1.1 - Index-Aggregated", "isController": false}, {"data": [[9.0, 7393.0], [10.0, 7093.625]], "isOverall": false, "label": "T.34 - ingresar el numero de poliza Buscar", "isController": true}, {"data": [[9.8, 7153.5]], "isOverall": false, "label": "T.34 - ingresar el numero de poliza Buscar-Aggregated", "isController": true}, {"data": [[30.0, 465.4]], "isOverall": false, "label": "6.3 - Buscar Id Cliente", "isController": false}, {"data": [[30.0, 465.4]], "isOverall": false, "label": "6.3 - Buscar Id Cliente-Aggregated", "isController": false}, {"data": [[30.0, 761.2]], "isOverall": false, "label": "6.8 - Buscar Id Cliente Ok", "isController": false}, {"data": [[30.0, 761.2]], "isOverall": false, "label": "6.8 - Buscar Id Cliente Ok-Aggregated", "isController": false}, {"data": [[20.0, 17522.7]], "isOverall": false, "label": "T.15 - Deducible Hacer clic en Siguiente ", "isController": true}, {"data": [[20.0, 17522.7]], "isOverall": false, "label": "T.15 - Deducible Hacer clic en Siguiente -Aggregated", "isController": true}, {"data": [[30.0, 410.1]], "isOverall": false, "label": "5.3 - Seleccionar Actualizar Poliza", "isController": false}, {"data": [[30.0, 410.1]], "isOverall": false, "label": "5.3 - Seleccionar Actualizar Poliza-Aggregated", "isController": false}, {"data": [[20.0, 1248.3]], "isOverall": false, "label": "17.2 - Documentos Hacer clic en Siguiente ", "isController": false}, {"data": [[20.0, 1248.3]], "isOverall": false, "label": "17.2 - Documentos Hacer clic en Siguiente -Aggregated", "isController": false}, {"data": [[20.0, 15578.3]], "isOverall": false, "label": "T.19 - Comisiones Hacer clic en Siguiente ", "isController": true}, {"data": [[20.0, 15578.3]], "isOverall": false, "label": "T.19 - Comisiones Hacer clic en Siguiente -Aggregated", "isController": true}, {"data": [[10.0, 9434.333333333334], [11.0, 11694.0]], "isOverall": false, "label": "T.26 -  Ri PolizaHacer clic en Siguiente ", "isController": true}, {"data": [[10.1, 9660.3]], "isOverall": false, "label": "T.26 -  Ri PolizaHacer clic en Siguiente -Aggregated", "isController": true}, {"data": [[10.0, 574.5]], "isOverall": false, "label": "32.2 - Hacer clic en Pagos", "isController": false}, {"data": [[10.0, 574.5]], "isOverall": false, "label": "32.2 - Hacer clic en Pagos-Aggregated", "isController": false}, {"data": [[30.0, 8765.4]], "isOverall": false, "label": "7.1 - Presionar Buscar", "isController": false}, {"data": [[30.0, 8765.4]], "isOverall": false, "label": "7.1 - Presionar Buscar-Aggregated", "isController": false}, {"data": [[17.0, 3477.0], [21.0, 3299.0], [25.0, 3586.0], [15.0, 2425.0], [30.0, 6952.166666666667]], "isOverall": false, "label": "T.2 - Ingresar a INSIS", "isController": true}, {"data": [[25.799999999999997, 5450.0]], "isOverall": false, "label": "T.2 - Ingresar a INSIS-Aggregated", "isController": true}, {"data": [[10.0, 1943.5]], "isOverall": false, "label": "T.29 - Emitir Poliza Confirmacion Pre emision", "isController": true}, {"data": [[10.0, 1943.5]], "isOverall": false, "label": "T.29 - Emitir Poliza Confirmacion Pre emision-Aggregated", "isController": true}, {"data": [[8.0, 6286.0], [4.0, 10010.0], [9.0, 3296.5], [10.0, 3969.0], [5.0, 2851.0], [6.0, 7297.5]], "isOverall": false, "label": "T. 40 - Hacer clic en OK", "isController": true}, {"data": [[7.699999999999998, 5224.2]], "isOverall": false, "label": "T. 40 - Hacer clic en OK-Aggregated", "isController": true}, {"data": [[9.0, 4053.0], [10.0, 3736.75]], "isOverall": false, "label": "34.2 - ingresar el numero de poliza Buscar", "isController": false}, {"data": [[9.8, 3800.0]], "isOverall": false, "label": "34.2 - ingresar el numero de poliza Buscar-Aggregated", "isController": false}, {"data": [[8.0, 95.0], [17.0, 107.0], [20.0, 117.0], [11.0, 111.0], [23.0, 172.0], [6.0, 97.0], [26.0, 172.0], [14.0, 103.0], [30.0, 158.0]], "isOverall": false, "label": "1.2 - Index-0", "isController": false}, {"data": [[18.5, 129.0]], "isOverall": false, "label": "1.2 - Index-0-Aggregated", "isController": false}, {"data": [[20.0, 453.4], [24.0, 529.0], [26.0, 558.5], [27.0, 486.0]], "isOverall": false, "label": "14.2 - Descuento Hacer clic en Siguiente ", "isController": false}, {"data": [[22.7, 492.8]], "isOverall": false, "label": "14.2 - Descuento Hacer clic en Siguiente -Aggregated", "isController": false}, {"data": [[8.0, 181.5], [4.0, 201.0], [1.0, 166.0], [9.0, 157.0], [10.0, 288.0], [5.0, 192.0], [6.0, 204.0], [3.0, 161.5]], "isOverall": false, "label": "43.1 - Mensaje Operacion completada con exito", "isController": false}, {"data": [[5.7, 189.4]], "isOverall": false, "label": "43.1 - Mensaje Operacion completada con exito-Aggregated", "isController": false}, {"data": [[8.0, 190.0], [17.0, 191.0], [20.0, 206.0], [11.0, 224.0], [23.0, 230.0], [6.0, 196.0], [26.0, 316.0], [14.0, 197.0], [30.0, 305.5]], "isOverall": false, "label": "1.2 - Index-1", "isController": false}, {"data": [[18.5, 236.10000000000002]], "isOverall": false, "label": "1.2 - Index-1-Aggregated", "isController": false}, {"data": [[8.0, 391.5], [4.0, 431.0], [1.0, 334.0], [9.0, 302.0], [10.0, 456.0], [5.0, 341.0], [6.0, 401.0], [3.0, 329.0]], "isOverall": false, "label": "T.43 - Mensaje Operacion completada con exito", "isController": true}, {"data": [[5.7, 370.6]], "isOverall": false, "label": "T.43 - Mensaje Operacion completada con exito-Aggregated", "isController": true}, {"data": [[30.0, 653.4]], "isOverall": false, "label": "10.2 - En coberturas Hacer clic en Detalles", "isController": false}, {"data": [[30.0, 653.4]], "isOverall": false, "label": "10.2 - En coberturas Hacer clic en Detalles-Aggregated", "isController": false}, {"data": [[8.0, 809.0], [17.0, 773.0], [20.0, 905.0], [11.0, 849.0], [23.0, 961.0], [6.0, 1294.0], [26.0, 978.0], [14.0, 918.0], [30.0, 1031.5]], "isOverall": false, "label": "T.1 - Index", "isController": true}, {"data": [[18.5, 955.0]], "isOverall": false, "label": "T.1 - Index-Aggregated", "isController": true}, {"data": [[20.0, 49010.0], [30.0, 5115.555555555556]], "isOverall": false, "label": "T.12 - Cerrar Objeto Asegurado", "isController": true}, {"data": [[29.0, 9505.0]], "isOverall": false, "label": "T.12 - Cerrar Objeto Asegurado-Aggregated", "isController": true}, {"data": [[30.0, 5805.599999999999]], "isOverall": false, "label": "10.1 - En coberturas Hacer clic en Detalles", "isController": false}, {"data": [[30.0, 5805.599999999999]], "isOverall": false, "label": "10.1 - En coberturas Hacer clic en Detalles-Aggregated", "isController": false}, {"data": [[8.0, 11832.0], [9.0, 4949.0], [10.0, 4068.6], [6.0, 6822.0]], "isOverall": false, "label": "38.1 - Hacer clic en Aceptar", "isController": false}, {"data": [[8.7, 6260.0]], "isOverall": false, "label": "38.1 - Hacer clic en Aceptar-Aggregated", "isController": false}, {"data": [[10.0, 309.5]], "isOverall": false, "label": "32.4 - Hacer clic en Pagos", "isController": false}, {"data": [[10.0, 309.5]], "isOverall": false, "label": "32.4 - Hacer clic en Pagos-Aggregated", "isController": false}, {"data": [[9.0, 681.0], [10.0, 570.0]], "isOverall": false, "label": "35 - ingresar el numero de poliza Buscar", "isController": false}, {"data": [[9.8, 592.2]], "isOverall": false, "label": "35 - ingresar el numero de poliza Buscar-Aggregated", "isController": false}, {"data": [[30.0, 799.6999999999999]], "isOverall": false, "label": "6.4 - Buscar Id Cliente", "isController": false}, {"data": [[30.0, 799.6999999999999]], "isOverall": false, "label": "6.4 - Buscar Id Cliente-Aggregated", "isController": false}, {"data": [[30.0, 470.8999999999999]], "isOverall": false, "label": "6.10 - Buscar Id Cliente Ok", "isController": false}, {"data": [[30.0, 470.8999999999999]], "isOverall": false, "label": "6.10 - Buscar Id Cliente Ok-Aggregated", "isController": false}, {"data": [[8.0, 1146.0], [4.0, 1282.0], [2.0, 1482.0], [1.0, 1370.0], [9.0, 1217.0], [10.0, 2475.0], [5.0, 1306.0], [6.0, 1208.0], [3.0, 1129.0], [7.0, 1432.0]], "isOverall": false, "label": "T.44 - Cerrar Insis", "isController": true}, {"data": [[5.5, 1404.7]], "isOverall": false, "label": "T.44 - Cerrar Insis-Aggregated", "isController": true}, {"data": [[8.0, 409.0], [9.0, 279.0], [18.0, 386.0], [21.0, 481.0], [12.0, 337.0], [25.0, 564.0], [28.0, 529.0], [15.0, 363.0], [30.0, 878.5]], "isOverall": false, "label": "2.1 - Ingresar a INSIS", "isController": false}, {"data": [[19.599999999999998, 510.5]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-Aggregated", "isController": false}, {"data": [[10.0, 3505.7]], "isOverall": false, "label": "27.1 - Emitir Poliza Calculo de Prima", "isController": false}, {"data": [[10.0, 3505.7]], "isOverall": false, "label": "27.1 - Emitir Poliza Calculo de Prima-Aggregated", "isController": false}, {"data": [[10.0, 2695.4]], "isOverall": false, "label": "31.1 - Hacer clic en Facturaci\u00F3n y Cobranza", "isController": false}, {"data": [[10.0, 2695.4]], "isOverall": false, "label": "31.1 - Hacer clic en Facturaci\u00F3n y Cobranza-Aggregated", "isController": false}, {"data": [[10.0, 457.8]], "isOverall": false, "label": "31.2 - Hacer clic en Facturaci\u00F3n y Cobranza", "isController": false}, {"data": [[10.0, 457.8]], "isOverall": false, "label": "31.2 - Hacer clic en Facturaci\u00F3n y Cobranza-Aggregated", "isController": false}, {"data": [[18.0, 19787.5], [20.0, 14538.0], [10.0, 14746.0], [12.0, 9192.0]], "isOverall": false, "label": "T.23- Claculo prima Hacer clic en Siguiente ", "isController": true}, {"data": [[17.8, 15074.099999999999]], "isOverall": false, "label": "T.23- Claculo prima Hacer clic en Siguiente -Aggregated", "isController": true}, {"data": [[8.0, 1962.0], [4.0, 595.0], [9.0, 173.5], [10.0, 276.3333333333333], [5.0, 243.0], [6.0, 410.5]], "isOverall": false, "label": "40.3- Hacer clic en OK", "isController": false}, {"data": [[7.699999999999998, 479.7]], "isOverall": false, "label": "40.3- Hacer clic en OK-Aggregated", "isController": false}, {"data": [[16.0, 238.0], [18.0, 289.0], [22.0, 314.0], [26.0, 389.0], [30.0, 417.6666666666667]], "isOverall": false, "label": "3.1 - Seleccionar Operaciones del Sistema", "isController": false}, {"data": [[26.2, 373.6]], "isOverall": false, "label": "3.1 - Seleccionar Operaciones del Sistema-Aggregated", "isController": false}, {"data": [[26.0, 21584.0], [30.0, 1054.888888888889]], "isOverall": false, "label": "12.1 - Cerrar Objeto Asegurado", "isController": false}, {"data": [[29.6, 3107.8]], "isOverall": false, "label": "12.1 - Cerrar Objeto Asegurado-Aggregated", "isController": false}, {"data": [[16.0, 16564.0], [20.0, 11550.624999999998], [15.0, 11531.0]], "isOverall": false, "label": "22.1 - Informacion del cliente Hacer clic en Siguiente ", "isController": false}, {"data": [[19.1, 12049.999999999998]], "isOverall": false, "label": "22.1 - Informacion del cliente Hacer clic en Siguiente -Aggregated", "isController": false}, {"data": [[30.0, 652.1]], "isOverall": false, "label": "11.2 - Grabar Objeto Asegurado", "isController": false}, {"data": [[30.0, 652.1]], "isOverall": false, "label": "11.2 - Grabar Objeto Asegurado-Aggregated", "isController": false}, {"data": [[20.0, 595.1999999999999]], "isOverall": false, "label": "19.2 - Comisiones Hacer clic en Siguiente ", "isController": false}, {"data": [[20.0, 595.1999999999999]], "isOverall": false, "label": "19.2 - Comisiones Hacer clic en Siguiente -Aggregated", "isController": false}, {"data": [[8.0, 225.0], [4.0, 188.0], [2.0, 234.0], [1.0, 217.0], [9.0, 469.0], [10.0, 314.0], [5.0, 115.0], [6.0, 201.0], [3.0, 171.0], [7.0, 187.0]], "isOverall": false, "label": "44.3 - Cerrar Insis-1", "isController": false}, {"data": [[5.5, 232.09999999999997]], "isOverall": false, "label": "44.3 - Cerrar Insis-1-Aggregated", "isController": false}, {"data": [[6.0, 100.0]], "isOverall": false, "label": "42.2 - Hacer clic en Actividades y Aplicar Pago-1", "isController": false}, {"data": [[6.0, 100.0]], "isOverall": false, "label": "42.2 - Hacer clic en Actividades y Aplicar Pago-1-Aggregated", "isController": false}, {"data": [[9.0, 5066.0], [10.0, 6742.5], [5.0, 3813.0], [6.0, 7762.333333333333]], "isOverall": false, "label": "T.39 - Ingresar la cantidad a pagar", "isController": true}, {"data": [[8.100000000000001, 6420.2]], "isOverall": false, "label": "T.39 - Ingresar la cantidad a pagar-Aggregated", "isController": true}, {"data": [[8.0, 97.0], [4.0, 104.0], [2.0, 191.0], [1.0, 488.0], [9.0, 92.0], [10.0, 220.0], [5.0, 187.0], [3.0, 93.0]], "isOverall": false, "label": "44.1 - Cerrar Insis-2", "isController": false}, {"data": [[5.555555555555555, 174.33333333333331]], "isOverall": false, "label": "44.1 - Cerrar Insis-2-Aggregated", "isController": false}, {"data": [[8.0, 156.0], [4.0, 390.0], [2.0, 109.0], [1.0, 100.0], [9.0, 106.0], [10.0, 116.0], [5.0, 105.0], [6.0, 141.0], [3.0, 106.0], [7.0, 104.0]], "isOverall": false, "label": "44.3 - Cerrar Insis-0", "isController": false}, {"data": [[5.5, 143.3]], "isOverall": false, "label": "44.3 - Cerrar Insis-0-Aggregated", "isController": false}, {"data": [[6.0, 99.0]], "isOverall": false, "label": "42.2 - Hacer clic en Actividades y Aplicar Pago-0", "isController": false}, {"data": [[6.0, 99.0]], "isOverall": false, "label": "42.2 - Hacer clic en Actividades y Aplicar Pago-0-Aggregated", "isController": false}, {"data": [[20.0, 17522.7]], "isOverall": false, "label": "15.1 - Deducible Hacer clic en Siguiente ", "isController": false}, {"data": [[20.0, 17522.7]], "isOverall": false, "label": "15.1 - Deducible Hacer clic en Siguiente -Aggregated", "isController": false}, {"data": [[10.0, 3153.2]], "isOverall": false, "label": "T.31 - Hacer clic en Facturaci\u00F3n y Cobranza", "isController": true}, {"data": [[10.0, 3153.2]], "isOverall": false, "label": "T.31 - Hacer clic en Facturaci\u00F3n y Cobranza-Aggregated", "isController": true}, {"data": [[8.0, 285.0], [17.0, 299.0], [20.0, 323.0], [11.0, 335.0], [23.0, 403.0], [6.0, 294.0], [26.0, 489.0], [14.0, 300.0], [30.0, 464.0]], "isOverall": false, "label": "1.2 - Index", "isController": false}, {"data": [[18.5, 365.6]], "isOverall": false, "label": "1.2 - Index-Aggregated", "isController": false}, {"data": [[16.0, 238.0], [18.0, 289.0], [22.0, 314.0], [26.0, 389.0], [30.0, 417.6666666666667]], "isOverall": false, "label": "T.3 - Seleccionar Operaciones del Sistema", "isController": true}, {"data": [[26.2, 373.6]], "isOverall": false, "label": "T.3 - Seleccionar Operaciones del Sistema-Aggregated", "isController": true}, {"data": [[30.0, 3317.0]], "isOverall": false, "label": "11.1 - Grabar Objeto Asegurado", "isController": false}, {"data": [[30.0, 3317.0]], "isOverall": false, "label": "11.1 - Grabar Objeto Asegurado-Aggregated", "isController": false}, {"data": [[16.0, 369.0], [19.0, 422.0], [10.0, 412.0], [22.0, 384.0], [6.0, 880.0], [25.0, 392.0], [13.0, 521.0], [7.0, 423.0], [28.0, 371.0], [30.0, 514.0]], "isOverall": false, "label": "1.1 - Index-0", "isController": false}, {"data": [[17.599999999999998, 468.8]], "isOverall": false, "label": "1.1 - Index-0-Aggregated", "isController": false}, {"data": [[16.0, 105.0], [19.0, 159.0], [10.0, 101.0], [22.0, 174.0], [6.0, 115.0], [25.0, 96.0], [13.0, 96.0], [7.0, 101.0], [28.0, 118.0], [30.0, 131.0]], "isOverall": false, "label": "1.1 - Index-1", "isController": false}, {"data": [[17.599999999999998, 119.6]], "isOverall": false, "label": "1.1 - Index-1-Aggregated", "isController": false}, {"data": [[25.0, 14276.0], [30.0, 3131.222222222222]], "isOverall": false, "label": "12.2 - Cerrar Objeto Asegurado", "isController": false}, {"data": [[29.5, 4245.7]], "isOverall": false, "label": "12.2 - Cerrar Objeto Asegurado-Aggregated", "isController": false}, {"data": [[8.0, 9970.0], [4.0, 1547.5], [9.0, 1974.0], [10.0, 2748.5], [6.0, 1969.6666666666667]], "isOverall": false, "label": "41.1 - Hacer clic en Grabar", "isController": false}, {"data": [[7.199999999999999, 2841.9]], "isOverall": false, "label": "41.1 - Hacer clic en Grabar-Aggregated", "isController": false}, {"data": [[30.0, 544.3]], "isOverall": false, "label": "7.2 - Presionar Buscar", "isController": false}, {"data": [[30.0, 544.3]], "isOverall": false, "label": "7.2 - Presionar Buscar-Aggregated", "isController": false}, {"data": [[20.0, 14554.0]], "isOverall": false, "label": "17.1 - Documentos Hacer clic en Siguiente ", "isController": false}, {"data": [[20.0, 14554.0]], "isOverall": false, "label": "17.1 - Documentos Hacer clic en Siguiente -Aggregated", "isController": false}, {"data": [[16.0, 9791.0], [10.0, 8791.4], [13.0, 10329.0], [14.0, 8795.5]], "isOverall": false, "label": "25.1 - Facultatives Hacer clic en Siguiente ", "isController": false}, {"data": [[12.3, 9145.9]], "isOverall": false, "label": "25.1 - Facultatives Hacer clic en Siguiente -Aggregated", "isController": false}, {"data": [[10.0, 2481.1111111111113], [11.0, 2042.0]], "isOverall": false, "label": "26.2 -  Ri PolizaHacer clic en Siguiente ", "isController": false}, {"data": [[10.1, 2437.2]], "isOverall": false, "label": "26.2 -  Ri PolizaHacer clic en Siguiente -Aggregated", "isController": false}, {"data": [[6.0, 399.0]], "isOverall": false, "label": "42 - Hacer clic en Grabar-0", "isController": false}, {"data": [[6.0, 399.0]], "isOverall": false, "label": "42 - Hacer clic en Grabar-0-Aggregated", "isController": false}, {"data": [[6.0, 103.0]], "isOverall": false, "label": "42.3 - Hacer clic en Actividades y Aplicar Pago-0", "isController": false}, {"data": [[6.0, 103.0]], "isOverall": false, "label": "42.3 - Hacer clic en Actividades y Aplicar Pago-0-Aggregated", "isController": false}, {"data": [[6.0, 105.0]], "isOverall": false, "label": "42 - Hacer clic en Grabar-1", "isController": false}, {"data": [[6.0, 105.0]], "isOverall": false, "label": "42 - Hacer clic en Grabar-1-Aggregated", "isController": false}, {"data": [[9.0, 380.5], [10.0, 390.75000000000006]], "isOverall": false, "label": "34.3 - ingresar el numero de poliza Buscar", "isController": false}, {"data": [[9.8, 388.70000000000005]], "isOverall": false, "label": "34.3 - ingresar el numero de poliza Buscar-Aggregated", "isController": false}, {"data": [[8.0, 6128.5], [4.0, 7538.0], [1.0, 544.0], [9.0, 527.0], [10.0, 960.0], [6.0, 435.0], [3.0, 457.0]], "isOverall": false, "label": "42.2 - Hacer clic en Actividades y Aplicar Pago", "isController": false}, {"data": [[5.8, 2361.0]], "isOverall": false, "label": "42.2 - Hacer clic en Actividades y Aplicar Pago-Aggregated", "isController": false}, {"data": [[6.0, 115.0]], "isOverall": false, "label": "42.3 - Hacer clic en Actividades y Aplicar Pago-1", "isController": false}, {"data": [[6.0, 115.0]], "isOverall": false, "label": "42.3 - Hacer clic en Actividades y Aplicar Pago-1-Aggregated", "isController": false}, {"data": [[8.0, 1384.0], [9.0, 396.0], [10.0, 390.85714285714283], [6.0, 385.0]], "isOverall": false, "label": "37.3 -Hacer clic en Buscar", "isController": false}, {"data": [[9.299999999999999, 490.1]], "isOverall": false, "label": "37.3 -Hacer clic en Buscar-Aggregated", "isController": false}, {"data": [[16.0, 577.0], [17.0, 660.0], [18.0, 636.5], [10.0, 579.0], [12.0, 889.0], [14.0, 707.0]], "isOverall": false, "label": "24.2 - Plan de cuotas Hacer clic en Siguiente ", "isController": false}, {"data": [[14.1, 641.9999999999999]], "isOverall": false, "label": "24.2 - Plan de cuotas Hacer clic en Siguiente -Aggregated", "isController": false}, {"data": [[20.0, 15802.300000000001]], "isOverall": false, "label": "T.17 - Documentos Hacer clic en Siguiente ", "isController": true}, {"data": [[20.0, 15802.300000000001]], "isOverall": false, "label": "T.17 - Documentos Hacer clic en Siguiente -Aggregated", "isController": true}, {"data": [[16.0, 15105.0], [18.0, 18424.0], [19.0, 20604.0], [10.0, 13288.333333333334], [14.0, 20840.0]], "isOverall": false, "label": "24.1 - Plan de cuotas Hacer clic en Siguiente ", "isController": false}, {"data": [[14.499999999999998, 16920.7]], "isOverall": false, "label": "24.1 - Plan de cuotas Hacer clic en Siguiente -Aggregated", "isController": false}, {"data": [[30.0, 877.8]], "isOverall": false, "label": "6.1 - Buscar Id Cliente", "isController": false}, {"data": [[30.0, 877.8]], "isOverall": false, "label": "6.1 - Buscar Id Cliente-Aggregated", "isController": false}, {"data": [[18.0, 19157.0], [19.0, 19318.0], [20.0, 13962.666666666666], [10.0, 14212.0], [12.0, 8434.0]], "isOverall": false, "label": "23.1 - Claculo prima Hacer clic en Siguiente", "isController": false}, {"data": [[17.900000000000002, 14489.699999999999]], "isOverall": false, "label": "23.1 - Claculo prima Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[8.0, 381.0], [4.0, 579.0], [2.0, 343.0], [1.0, 317.0], [9.0, 575.0], [10.0, 430.0], [5.0, 221.0], [6.0, 342.0], [3.0, 277.0], [7.0, 291.0]], "isOverall": false, "label": "44.3 - Cerrar Insis", "isController": false}, {"data": [[5.5, 375.59999999999997]], "isOverall": false, "label": "44.3 - Cerrar Insis-Aggregated", "isController": false}, {"data": [[30.0, 11299.5]], "isOverall": false, "label": "T.10 - En coberturas Hacer clic en Detalles", "isController": true}, {"data": [[30.0, 11299.5]], "isOverall": false, "label": "T.10 - En coberturas Hacer clic en Detalles-Aggregated", "isController": true}, {"data": [[8.0, 627.0], [4.0, 3739.5], [9.0, 560.5], [10.0, 589.0], [6.0, 642.6666666666666]], "isOverall": false, "label": "42 - Hacer clic en Grabar", "isController": false}, {"data": [[7.199999999999999, 1233.3]], "isOverall": false, "label": "42 - Hacer clic en Grabar-Aggregated", "isController": false}, {"data": [[18.0, 13208.0], [20.0, 16887.777777777777]], "isOverall": false, "label": "T.21 - Clausulas Hacer clic en Siguiente ", "isController": true}, {"data": [[19.8, 16519.8]], "isOverall": false, "label": "T.21 - Clausulas Hacer clic en Siguiente -Aggregated", "isController": true}, {"data": [[6.0, 94.0]], "isOverall": false, "label": "42.4 - Hacer clic en Actividades y Aplicar Pago-0", "isController": false}, {"data": [[6.0, 94.0]], "isOverall": false, "label": "42.4 - Hacer clic en Actividades y Aplicar Pago-0-Aggregated", "isController": false}, {"data": [[20.0, 15925.0]], "isOverall": false, "label": "T.20 - Impuestos Hacer clic en Siguiente ", "isController": true}, {"data": [[20.0, 15925.0]], "isOverall": false, "label": "T.20 - Impuestos Hacer clic en Siguiente -Aggregated", "isController": true}, {"data": [[6.0, 99.0]], "isOverall": false, "label": "42.4 - Hacer clic en Actividades y Aplicar Pago-1", "isController": false}, {"data": [[6.0, 99.0]], "isOverall": false, "label": "42.4 - Hacer clic en Actividades y Aplicar Pago-1-Aggregated", "isController": false}, {"data": [[30.0, 710.9]], "isOverall": false, "label": "5.2 - Seleccionar Actualizar Poliza", "isController": false}, {"data": [[30.0, 710.9]], "isOverall": false, "label": "5.2 - Seleccionar Actualizar Poliza-Aggregated", "isController": false}, {"data": [[8.0, 3075.5], [9.0, 3362.0], [10.0, 3313.2], [6.0, 5267.0]], "isOverall": false, "label": "39.1 - Ingresar la cantidad a pagar", "isController": false}, {"data": [[8.7, 3661.3]], "isOverall": false, "label": "39.1 - Ingresar la cantidad a pagar-Aggregated", "isController": false}, {"data": [[20.0, 543.0], [30.0, 572.3333333333334]], "isOverall": false, "label": "13.2 - En coberturas Hacer clic en Siguiente", "isController": false}, {"data": [[29.0, 569.4000000000001]], "isOverall": false, "label": "13.2 - En coberturas Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[8.0, 98.0], [4.0, 100.0], [2.0, 102.0], [1.0, 103.0], [9.0, 100.0], [10.0, 99.0], [5.0, 103.0], [6.0, 98.0], [3.0, 97.0], [7.0, 395.0]], "isOverall": false, "label": "43.4  - Cerrar Insis", "isController": false}, {"data": [[5.5, 129.5]], "isOverall": false, "label": "43.4  - Cerrar Insis-Aggregated", "isController": false}, {"data": [[10.0, 1943.5]], "isOverall": false, "label": "29.1 - Emitir Poliza Confirmacion Pre emision", "isController": false}, {"data": [[10.0, 1943.5]], "isOverall": false, "label": "29.1 - Emitir Poliza Confirmacion Pre emision-Aggregated", "isController": false}, {"data": [[20.0, 731.5]], "isOverall": false, "label": "20.2 - Impuestos Hacer clic en Siguiente ", "isController": false}, {"data": [[20.0, 731.5]], "isOverall": false, "label": "20.2 - Impuestos Hacer clic en Siguiente -Aggregated", "isController": false}, {"data": [[8.0, 6903.5], [10.0, 3947.375]], "isOverall": false, "label": "T.36 - Hacer clic en el \u00EDcono de Buscar de Descripcion", "isController": true}, {"data": [[9.600000000000001, 4538.599999999999]], "isOverall": false, "label": "T.36 - Hacer clic en el \u00EDcono de Buscar de Descripcion-Aggregated", "isController": true}, {"data": [[6.0, 1546.0]], "isOverall": false, "label": "40.2 - Hacer clic en OK-1", "isController": false}, {"data": [[6.0, 1546.0]], "isOverall": false, "label": "40.2 - Hacer clic en OK-1-Aggregated", "isController": false}, {"data": [[6.0, 3184.0]], "isOverall": false, "label": "40.2 - Hacer clic en OK-0", "isController": false}, {"data": [[6.0, 3184.0]], "isOverall": false, "label": "40.2 - Hacer clic en OK-0-Aggregated", "isController": false}, {"data": [[6.0, 196.0]], "isOverall": false, "label": "40.3- Hacer clic en OK-0", "isController": false}, {"data": [[6.0, 196.0]], "isOverall": false, "label": "40.3- Hacer clic en OK-0-Aggregated", "isController": false}, {"data": [[30.0, 46978.3]], "isOverall": false, "label": "T.9 - En Poliza General Presionar Siguiente", "isController": true}, {"data": [[30.0, 46978.3]], "isOverall": false, "label": "T.9 - En Poliza General Presionar Siguiente-Aggregated", "isController": true}, {"data": [[6.0, 125.0]], "isOverall": false, "label": "40.3- Hacer clic en OK-1", "isController": false}, {"data": [[6.0, 125.0]], "isOverall": false, "label": "40.3- Hacer clic en OK-1-Aggregated", "isController": false}, {"data": [[20.0, 14983.1]], "isOverall": false, "label": "19.1 - Comisiones Hacer clic en Siguiente ", "isController": false}, {"data": [[20.0, 14983.1]], "isOverall": false, "label": "19.1 - Comisiones Hacer clic en Siguiente -Aggregated", "isController": false}, {"data": [[8.0, 312.0], [9.0, 180.0], [18.0, 284.0], [21.0, 354.0], [12.0, 230.0], [25.0, 378.0], [28.0, 429.0], [15.0, 264.0], [30.0, 580.0]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-0", "isController": false}, {"data": [[19.599999999999998, 359.1]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-0-Aggregated", "isController": false}, {"data": [[8.0, 97.0], [9.0, 98.0], [18.0, 102.0], [21.0, 126.0], [12.0, 106.0], [25.0, 186.0], [28.0, 100.0], [15.0, 98.0], [30.0, 298.0]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-1", "isController": false}, {"data": [[19.599999999999998, 150.9]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-1-Aggregated", "isController": false}, {"data": [[20.0, 14472.800000000001]], "isOverall": false, "label": "T.18 - Documentos Objeto Hacer clic en Siguiente ", "isController": true}, {"data": [[20.0, 14472.800000000001]], "isOverall": false, "label": "T.18 - Documentos Objeto Hacer clic en Siguiente -Aggregated", "isController": true}, {"data": [[30.0, 44533.600000000006]], "isOverall": false, "label": "8.1 - Presionar Siguiente", "isController": false}, {"data": [[30.0, 44533.600000000006]], "isOverall": false, "label": "8.1 - Presionar Siguiente-Aggregated", "isController": false}, {"data": [[16.0, 464.0], [20.0, 533.8750000000001], [15.0, 450.0]], "isOverall": false, "label": "22.2 - Informacion del cliente Hacer clic en Siguiente", "isController": false}, {"data": [[19.1, 518.5000000000001]], "isOverall": false, "label": "22.2 - Informacion del cliente Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[8.0, 12569.0], [1.0, 9507.0], [9.0, 6262.5], [10.0, 1339.0], [5.0, 13813.0], [6.0, 8496.5], [3.0, 8369.5]], "isOverall": false, "label": "42.1 - Hacer clic en Actividades y Aplicar Pago", "isController": false}, {"data": [[6.0, 8348.5]], "isOverall": false, "label": "42.1 - Hacer clic en Actividades y Aplicar Pago-Aggregated", "isController": false}, {"data": [[30.0, 16554.5]], "isOverall": false, "label": "T.5 - Seleccionar Actualizar Poliza", "isController": true}, {"data": [[30.0, 16554.5]], "isOverall": false, "label": "T.5 - Seleccionar Actualizar Poliza-Aggregated", "isController": true}, {"data": [[8.0, 511.5], [4.0, 387.0], [2.0, 828.0], [1.0, 761.0], [9.0, 358.0], [10.0, 1723.0], [5.0, 777.0], [6.0, 259.0], [3.0, 545.0]], "isOverall": false, "label": "44.1 - Cerrar Insis", "isController": false}, {"data": [[5.6, 666.1]], "isOverall": false, "label": "44.1 - Cerrar Insis-Aggregated", "isController": false}, {"data": [[10.0, 6600.875], [14.0, 9712.0]], "isOverall": false, "label": "26.1 -  Ri PolizaHacer clic en Siguiente ", "isController": false}, {"data": [[10.8, 7223.1]], "isOverall": false, "label": "26.1 -  Ri PolizaHacer clic en Siguiente -Aggregated", "isController": false}, {"data": [[8.0, 449998.0], [4.0, 482783.0], [2.0, 485210.0], [1.0, 484767.0], [9.0, 447731.0], [10.0, 436251.0], [5.0, 463904.0], [6.0, 464421.0], [3.0, 482032.0], [7.0, 452464.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[5.5, 464956.1]], "isOverall": false, "label": "Transaction Controller-Aggregated", "isController": true}, {"data": [[30.0, 7374.5]], "isOverall": false, "label": "T.6 - Buscar Id Cliente", "isController": true}, {"data": [[30.0, 7374.5]], "isOverall": false, "label": "T.6 - Buscar Id Cliente-Aggregated", "isController": true}, {"data": [[6.0, 110.0]], "isOverall": false, "label": "41.1 - Hacer clic en Grabar-1", "isController": false}, {"data": [[6.0, 110.0]], "isOverall": false, "label": "41.1 - Hacer clic en Grabar-1-Aggregated", "isController": false}, {"data": [[30.0, 594.7]], "isOverall": false, "label": "9.2 - En Poliza General Presionar Siguiente", "isController": false}, {"data": [[30.0, 594.7]], "isOverall": false, "label": "9.2 - En Poliza General Presionar Siguiente-Aggregated", "isController": false}, {"data": [[6.0, 106.0]], "isOverall": false, "label": "41.1 - Hacer clic en Grabar-0", "isController": false}, {"data": [[6.0, 106.0]], "isOverall": false, "label": "41.1 - Hacer clic en Grabar-0-Aggregated", "isController": false}, {"data": [[8.0, 210.0], [4.0, 230.0], [1.0, 168.0], [9.0, 145.0], [10.0, 168.0], [5.0, 149.0], [6.0, 197.0], [3.0, 167.5]], "isOverall": false, "label": "43.2 - Mensaje Operacion completada con exito", "isController": false}, {"data": [[5.7, 181.2]], "isOverall": false, "label": "43.2 - Mensaje Operacion completada con exito-Aggregated", "isController": false}, {"data": [[20.0, 38748.4], [24.0, 27204.0], [25.0, 46480.0], [26.0, 31779.5], [27.0, 31535.0]], "isOverall": false, "label": "14.1 - Descuento Hacer clic en Siguiente ", "isController": false}, {"data": [[22.8, 36251.99999999999]], "isOverall": false, "label": "14.1 - Descuento Hacer clic en Siguiente -Aggregated", "isController": false}, {"data": [[8.0, 13851.0], [4.0, 22332.0], [1.0, 10914.0], [9.0, 12470.0], [10.0, 3035.0], [5.0, 18342.0], [6.0, 815.0], [3.0, 9598.5]], "isOverall": false, "label": "T.42 - Hacer clic en Actividades y Aplicar Pago", "isController": true}, {"data": [[5.7, 11480.699999999999]], "isOverall": false, "label": "T.42 - Hacer clic en Actividades y Aplicar Pago-Aggregated", "isController": true}, {"data": [[20.0, 1446.8999999999999]], "isOverall": false, "label": "T.16 - Deducible Hacer clic en Siguiente ", "isController": true}, {"data": [[20.0, 1446.8999999999999]], "isOverall": false, "label": "T.16 - Deducible Hacer clic en Siguiente -Aggregated", "isController": true}, {"data": [[30.0, 15433.5]], "isOverall": false, "label": "5.1 - Seleccionar Actualizar Poliza", "isController": false}, {"data": [[30.0, 15433.5]], "isOverall": false, "label": "5.1 - Seleccionar Actualizar Poliza-Aggregated", "isController": false}, {"data": [[6.0, 104.0]], "isOverall": false, "label": "43.2 - Mensaje Operacion completada con exito-1", "isController": false}, {"data": [[6.0, 104.0]], "isOverall": false, "label": "43.2 - Mensaje Operacion completada con exito-1-Aggregated", "isController": false}, {"data": [[20.0, 13964.7]], "isOverall": false, "label": "18.1 - Documentos Objeto Hacer clic en Siguiente ", "isController": false}, {"data": [[20.0, 13964.7]], "isOverall": false, "label": "18.1 - Documentos Objeto Hacer clic en Siguiente -Aggregated", "isController": false}, {"data": [[6.0, 93.0]], "isOverall": false, "label": "43.2 - Mensaje Operacion completada con exito-0", "isController": false}, {"data": [[6.0, 93.0]], "isOverall": false, "label": "43.2 - Mensaje Operacion completada con exito-0-Aggregated", "isController": false}, {"data": [[20.0, 13150.0], [30.0, 929.4444444444445]], "isOverall": false, "label": "12.3 - Cerrar Objeto Asegurado", "isController": false}, {"data": [[29.0, 2151.5]], "isOverall": false, "label": "12.3 - Cerrar Objeto Asegurado-Aggregated", "isController": false}, {"data": [[8.0, 611.0], [4.0, 839.0], [1.0, 739.0], [9.0, 370.0], [10.0, 514.0], [5.0, 758.0], [6.0, 218.0], [3.0, 457.0]], "isOverall": false, "label": "42.3 - Hacer clic en Actividades y Aplicar Pago", "isController": false}, {"data": [[5.7, 557.4]], "isOverall": false, "label": "42.3 - Hacer clic en Actividades y Aplicar Pago-Aggregated", "isController": false}, {"data": [[30.0, 2420.2499999999995]], "isOverall": false, "label": "10.3 - En coberturas Hacer clic en Detalles", "isController": false}, {"data": [[30.0, 2420.2499999999995]], "isOverall": false, "label": "10.3 - En coberturas Hacer clic en Detalles-Aggregated", "isController": false}, {"data": [[8.0, 126.0], [4.0, 115.0], [2.0, 403.0], [1.0, 112.0], [9.0, 112.0], [10.0, 422.0], [5.0, 425.0], [6.0, 109.0], [3.0, 121.0]], "isOverall": false, "label": "44.1 - Cerrar Insis-1", "isController": false}, {"data": [[5.6, 207.1]], "isOverall": false, "label": "44.1 - Cerrar Insis-1-Aggregated", "isController": false}, {"data": [[8.0, 288.0], [4.0, 168.0], [2.0, 234.0], [1.0, 161.0], [9.0, 153.0], [10.0, 1081.0], [5.0, 164.0], [6.0, 150.0], [3.0, 331.0]], "isOverall": false, "label": "44.1 - Cerrar Insis-0", "isController": false}, {"data": [[5.6, 301.8]], "isOverall": false, "label": "44.1 - Cerrar Insis-0-Aggregated", "isController": false}, {"data": [[6.0, 102.0]], "isOverall": false, "label": "42.1 - Hacer clic en Actividades y Aplicar Pago-1", "isController": false}, {"data": [[6.0, 102.0]], "isOverall": false, "label": "42.1 - Hacer clic en Actividades y Aplicar Pago-1-Aggregated", "isController": false}, {"data": [[6.0, 103.0]], "isOverall": false, "label": "42.1 - Hacer clic en Actividades y Aplicar Pago-0", "isController": false}, {"data": [[6.0, 103.0]], "isOverall": false, "label": "42.1 - Hacer clic en Actividades y Aplicar Pago-0-Aggregated", "isController": false}, {"data": [[18.0, 12726.0], [20.0, 16350.333333333334]], "isOverall": false, "label": "21.1 - Clausulas Hacer clic en Siguiente", "isController": false}, {"data": [[19.8, 15987.900000000001]], "isOverall": false, "label": "21.1 - Clausulas Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[10.0, 3992.7000000000003]], "isOverall": false, "label": "30.1 - Emitir Poliza ", "isController": false}, {"data": [[10.0, 3992.7000000000003]], "isOverall": false, "label": "30.1 - Emitir Poliza -Aggregated", "isController": false}, {"data": [[20.0, 2551.0], [24.0, 2820.0], [14.0, 1759.0], [15.0, 2543.0], [30.0, 5865.0]], "isOverall": false, "label": "2.2 - Ingresar a INSIS", "isController": false}, {"data": [[25.300000000000004, 4486.299999999999]], "isOverall": false, "label": "2.2 - Ingresar a INSIS-Aggregated", "isController": false}, {"data": [[10.0, 4754.1]], "isOverall": false, "label": "33.1 - Hacer clic en Actividades Nuevo", "isController": false}, {"data": [[10.0, 4754.1]], "isOverall": false, "label": "33.1 - Hacer clic en Actividades Nuevo-Aggregated", "isController": false}, {"data": [[18.0, 532.0], [19.0, 414.0], [24.0, 541.0], [28.0, 531.0], [30.0, 822.0]], "isOverall": false, "label": "T.4 - Seleccionar Control de Polizas", "isController": true}, {"data": [[26.900000000000002, 695.0]], "isOverall": false, "label": "T.4 - Seleccionar Control de Polizas-Aggregated", "isController": true}, {"data": [[17.0, 385.0], [18.0, 245.0], [23.0, 359.0], [27.0, 319.0], [30.0, 488.5]], "isOverall": false, "label": "4.1 - Seleccionar Control de Polizas", "isController": false}, {"data": [[26.5, 423.9]], "isOverall": false, "label": "4.1 - Seleccionar Control de Polizas-Aggregated", "isController": false}, {"data": [[20.0, 1446.8999999999999]], "isOverall": false, "label": "16.1 - Deducible Hacer clic en Siguiente -124", "isController": false}, {"data": [[20.0, 1446.8999999999999]], "isOverall": false, "label": "16.1 - Deducible Hacer clic en Siguiente -124-Aggregated", "isController": false}, {"data": [[8.0, 98.5], [4.0, 103.0], [2.0, 114.0], [1.0, 98.0], [9.0, 97.0], [10.0, 111.0], [5.0, 104.0], [6.0, 93.0], [3.0, 108.0]], "isOverall": false, "label": "44.2 - Cerrar Insis-1", "isController": false}, {"data": [[5.6, 102.5]], "isOverall": false, "label": "44.2 - Cerrar Insis-1-Aggregated", "isController": false}, {"data": [[8.0, 96.0], [4.0, 113.0], [2.0, 95.0], [1.0, 91.0], [9.0, 87.0], [10.0, 112.0], [5.0, 101.0], [6.0, 416.0], [3.0, 101.0]], "isOverall": false, "label": "44.2 - Cerrar Insis-0", "isController": false}, {"data": [[5.6, 130.8]], "isOverall": false, "label": "44.2 - Cerrar Insis-0-Aggregated", "isController": false}, {"data": [[20.0, 12764.0], [30.0, 29990.777777777777]], "isOverall": false, "label": "T.13 - En coberturas Hacer clic en Siguiente", "isController": true}, {"data": [[29.0, 28268.1]], "isOverall": false, "label": "T.13 - En coberturas Hacer clic en Siguiente-Aggregated", "isController": true}, {"data": [[16.0, 10320.0], [10.0, 9328.8], [12.0, 10889.0], [14.0, 9327.0]], "isOverall": false, "label": "T.25 - Facultatives Hacer clic en Siguiente ", "isController": true}, {"data": [[12.200000000000001, 9682.7]], "isOverall": false, "label": "T.25 - Facultatives Hacer clic en Siguiente -Aggregated", "isController": true}, {"data": [[10.0, 1544.0]], "isOverall": false, "label": "28.1 - Emitir Poliza Validacion", "isController": false}, {"data": [[10.0, 1544.0]], "isOverall": false, "label": "28.1 - Emitir Poliza Validacion-Aggregated", "isController": false}, {"data": [[8.0, 286.5], [4.0, 142.0], [1.0, 124.0], [9.0, 129.0], [10.0, 222.0], [5.0, 125.0], [6.0, 193.0], [3.0, 315.0]], "isOverall": false, "label": "42.4 - Hacer clic en Actividades y Aplicar Pago", "isController": false}, {"data": [[5.7, 213.79999999999998]], "isOverall": false, "label": "42.4 - Hacer clic en Actividades y Aplicar Pago-Aggregated", "isController": false}, {"data": [[17.0, 525.0], [21.0, 411.0], [25.0, 403.0], [15.0, 387.0], [30.0, 467.66666666666663]], "isOverall": false, "label": "2.3 - Ingresar a INSIS", "isController": false}, {"data": [[25.799999999999997, 453.19999999999993]], "isOverall": false, "label": "2.3 - Ingresar a INSIS-Aggregated", "isController": false}, {"data": [[30.0, 485.5]], "isOverall": false, "label": "6.5 - Buscar Id Cliente", "isController": false}, {"data": [[30.0, 485.5]], "isOverall": false, "label": "6.5 - Buscar Id Cliente-Aggregated", "isController": false}, {"data": [[16.0, 17028.0], [20.0, 12084.5], [15.0, 11981.0]], "isOverall": false, "label": "T.22- Informacion del cliente Hacer clic en Siguiente ", "isController": true}, {"data": [[19.1, 12568.5]], "isOverall": false, "label": "T.22- Informacion del cliente Hacer clic en Siguiente -Aggregated", "isController": true}, {"data": [[30.0, 9309.699999999999]], "isOverall": false, "label": "T.7 - Presionar Buscar", "isController": true}, {"data": [[30.0, 9309.699999999999]], "isOverall": false, "label": "T.7 - Presionar Buscar-Aggregated", "isController": true}, {"data": [[18.0, 482.0], [20.0, 537.4444444444445]], "isOverall": false, "label": "21.2 - Clausulas Hacer clic en Siguiente", "isController": false}, {"data": [[19.8, 531.9]], "isOverall": false, "label": "21.2 - Clausulas Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[9.0, 681.0], [10.0, 570.0]], "isOverall": false, "label": "T.35 - ingresar el numero de poliza Buscar", "isController": true}, {"data": [[9.8, 592.2]], "isOverall": false, "label": "T.35 - ingresar el numero de poliza Buscar-Aggregated", "isController": true}, {"data": [[30.0, 45434.3]], "isOverall": false, "label": "T.8 - Presionar Siguiente", "isController": true}, {"data": [[30.0, 45434.3]], "isOverall": false, "label": "T.8 - Presionar Siguiente-Aggregated", "isController": true}, {"data": [[18.0, 550.0], [20.0, 575.3333333333333], [10.0, 534.0], [12.0, 758.0]], "isOverall": false, "label": "23.2 - Claculo prima Hacer clic en Siguiente", "isController": false}, {"data": [[17.8, 584.4]], "isOverall": false, "label": "23.2 - Claculo prima Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[8.0, 10597.0], [4.0, 5287.0], [9.0, 2534.5], [10.0, 3337.5], [6.0, 2612.3333333333335]], "isOverall": false, "label": "T.41 - Hacer clic en Grabar", "isController": true}, {"data": [[7.199999999999999, 4075.1999999999994]], "isOverall": false, "label": "T.41 - Hacer clic en Grabar-Aggregated", "isController": true}, {"data": [[16.0, 15682.0], [17.0, 17767.0], [18.0, 20809.0], [10.0, 13867.333333333334], [12.0, 21396.0], [14.0, 21880.0]], "isOverall": false, "label": "T.24 - Plan de cuotas Hacer clic en Siguiente ", "isController": true}, {"data": [[14.1, 17562.7]], "isOverall": false, "label": "T.24 - Plan de cuotas Hacer clic en Siguiente -Aggregated", "isController": true}, {"data": [[9.0, 5525.0], [10.0, 2680.3333333333335]], "isOverall": false, "label": "34.1 - ingresar el numero de poliza Buscar", "isController": false}, {"data": [[9.9, 2964.8]], "isOverall": false, "label": "34.1 - ingresar el numero de poliza Buscar-Aggregated", "isController": false}, {"data": [[6.0, 102.0]], "isOverall": false, "label": "43.1 - Mensaje Operacion completada con exito-1", "isController": false}, {"data": [[6.0, 102.0]], "isOverall": false, "label": "43.1 - Mensaje Operacion completada con exito-1-Aggregated", "isController": false}, {"data": [[10.0, 520.9]], "isOverall": false, "label": "33.2 - Hacer clic en Actividades Nuevo", "isController": false}, {"data": [[10.0, 520.9]], "isOverall": false, "label": "33.2 - Hacer clic en Actividades Nuevo-Aggregated", "isController": false}, {"data": [[6.0, 102.0]], "isOverall": false, "label": "43.1 - Mensaje Operacion completada con exito-0", "isController": false}, {"data": [[6.0, 102.0]], "isOverall": false, "label": "43.1 - Mensaje Operacion completada con exito-0-Aggregated", "isController": false}, {"data": [[20.0, 12221.0], [30.0, 29418.444444444445]], "isOverall": false, "label": "13.1 - En coberturas Hacer clic en Siguiente", "isController": false}, {"data": [[29.0, 27698.7]], "isOverall": false, "label": "13.1 - En coberturas Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[10.0, 7331.4]], "isOverall": false, "label": "32.1 - Hacer clic en Pagos", "isController": false}, {"data": [[10.0, 7331.4]], "isOverall": false, "label": "32.1 - Hacer clic en Pagos-Aggregated", "isController": false}, {"data": [[8.0, 195.0], [4.0, 216.0], [2.0, 209.0], [1.0, 189.0], [9.0, 184.0], [10.0, 223.0], [5.0, 205.0], [6.0, 509.0], [3.0, 210.0]], "isOverall": false, "label": "44.2 - Cerrar Insis", "isController": false}, {"data": [[5.6, 233.5]], "isOverall": false, "label": "44.2 - Cerrar Insis-Aggregated", "isController": false}, {"data": [[30.0, 900.7]], "isOverall": false, "label": "8.2 - Presionar Siguiente", "isController": false}, {"data": [[30.0, 900.7]], "isOverall": false, "label": "8.2 - Presionar Siguiente-Aggregated", "isController": false}, {"data": [[10.0, 1544.0]], "isOverall": false, "label": "T.28 - Emitir Poliza Validacion", "isController": true}, {"data": [[10.0, 1544.0]], "isOverall": false, "label": "T.28 - Emitir Poliza Validacion-Aggregated", "isController": true}, {"data": [[10.0, 5275.0]], "isOverall": false, "label": "T.33 - Hacer clic en Actividades Nuevo", "isController": true}, {"data": [[10.0, 5275.0]], "isOverall": false, "label": "T.33 - Hacer clic en Actividades Nuevo-Aggregated", "isController": true}, {"data": [[8.0, 3385.0], [9.0, 5854.0], [10.0, 4773.285714285714], [6.0, 5570.0]], "isOverall": false, "label": "T.37 -Hacer clic en Buscar", "isController": true}, {"data": [[9.299999999999999, 4822.2]], "isOverall": false, "label": "T.37 -Hacer clic en Buscar-Aggregated", "isController": true}, {"data": [[30.0, 1031.3]], "isOverall": false, "label": "6.6 - Buscar Id Cliente", "isController": false}, {"data": [[30.0, 1031.3]], "isOverall": false, "label": "6.6 - Buscar Id Cliente-Aggregated", "isController": false}, {"data": [[30.0, 576.3000000000001]], "isOverall": false, "label": "6.7 - Buscar Id Cliente", "isController": false}, {"data": [[30.0, 576.3000000000001]], "isOverall": false, "label": "6.7 - Buscar Id Cliente-Aggregated", "isController": false}, {"data": [[30.0, 780.0]], "isOverall": false, "label": "6.9 - Buscar Id Cliente Ok", "isController": false}, {"data": [[30.0, 780.0]], "isOverall": false, "label": "6.9 - Buscar Id Cliente Ok-Aggregated", "isController": false}, {"data": [[20.0, 508.09999999999997]], "isOverall": false, "label": "18.2 - Documentos Objeto Hacer clic en Siguiente", "isController": false}, {"data": [[20.0, 508.09999999999997]], "isOverall": false, "label": "18.2 - Documentos Objeto Hacer clic en Siguiente-Aggregated", "isController": false}, {"data": [[8.0, 11832.0], [9.0, 4949.0], [10.0, 4068.6], [6.0, 6822.0]], "isOverall": false, "label": "T.38 - Hacer clic en Aceptar", "isController": true}, {"data": [[8.7, 6260.0]], "isOverall": false, "label": "T.38 - Hacer clic en Aceptar-Aggregated", "isController": true}, {"data": [[8.0, 2544.0], [4.0, 7579.0], [9.0, 623.0], [10.0, 633.3333333333334], [5.0, 601.0], [6.0, 3625.0]], "isOverall": false, "label": "40.2 - Hacer clic en OK", "isController": false}, {"data": [[7.699999999999998, 2112.0]], "isOverall": false, "label": "40.2 - Hacer clic en OK-Aggregated", "isController": false}, {"data": [[8.0, 1780.0], [9.0, 2500.0], [10.0, 3059.3333333333335], [5.0, 1921.5], [6.0, 3262.0]], "isOverall": false, "label": "40.1 - Hacer clic en OK", "isController": false}, {"data": [[7.799999999999998, 2632.5]], "isOverall": false, "label": "40.1 - Hacer clic en OK-Aggregated", "isController": false}, {"data": [[8.0, 0.0], [4.0, 0.0], [2.0, 0.0], [1.0, 0.0], [9.0, 0.0], [10.0, 0.0], [5.0, 0.0], [6.0, 0.0], [3.0, 0.0], [7.0, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[5.5, 0.0]], "isOverall": false, "label": "Debug Sampler-Aggregated", "isController": false}, {"data": [[8.0, 1396.0], [9.0, 4770.0], [10.0, 3697.857142857143], [6.0, 3838.0]], "isOverall": false, "label": "37.2 -Hacer clic en Buscar", "isController": false}, {"data": [[9.299999999999999, 3588.9]], "isOverall": false, "label": "37.2 -Hacer clic en Buscar-Aggregated", "isController": false}, {"data": [[10.0, 257.0]], "isOverall": false, "label": "32 .3- Hacer clic en Pagos", "isController": false}, {"data": [[10.0, 257.0]], "isOverall": false, "label": "32 .3- Hacer clic en Pagos-Aggregated", "isController": false}, {"data": [[10.0, 3505.7]], "isOverall": false, "label": "T.27 - Emitir Poliza Calculo de Prima", "isController": true}, {"data": [[10.0, 3505.7]], "isOverall": false, "label": "T.27 - Emitir Poliza Calculo de Prima-Aggregated", "isController": true}, {"data": [[18.0, 147.0], [19.0, 169.0], [24.0, 182.0], [28.0, 212.0], [30.0, 333.5]], "isOverall": false, "label": "4.2 - Seleccionar Control de Polizas", "isController": false}, {"data": [[26.900000000000002, 271.1]], "isOverall": false, "label": "4.2 - Seleccionar Control de Polizas-Aggregated", "isController": false}, {"data": [[10.0, 3992.7000000000003]], "isOverall": false, "label": "T.30 - Emitir Poliza ", "isController": true}, {"data": [[10.0, 3992.7000000000003]], "isOverall": false, "label": "T.30 - Emitir Poliza -Aggregated", "isController": true}, {"data": [[10.0, 8472.4]], "isOverall": false, "label": "T.32 - Hacer clic en Pagos", "isController": true}, {"data": [[10.0, 8472.4]], "isOverall": false, "label": "T.32 - Hacer clic en Pagos-Aggregated", "isController": true}, {"data": [[20.0, 15193.5]], "isOverall": false, "label": "20.1 - Impuestos Hacer clic en Siguiente ", "isController": false}, {"data": [[20.0, 15193.5]], "isOverall": false, "label": "20.1 - Impuestos Hacer clic en Siguiente -Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 30.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 1666.4, "minX": 1.5963567E12, "maxY": 189428.35, "series": [{"data": [[1.59635682E12, 108567.3], [1.59635712E12, 189428.35], [1.5963567E12, 56232.1], [1.59635718E12, 71056.0], [1.596357E12, 84080.71666666666], [1.59635706E12, 170680.8], [1.59635688E12, 49573.53333333333], [1.59635694E12, 124740.43333333333], [1.59635676E12, 36277.95]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.59635682E12, 2927.0666666666666], [1.59635712E12, 32072.116666666665], [1.5963567E12, 5641.466666666666], [1.59635718E12, 19376.0], [1.596357E12, 1907.55], [1.59635706E12, 3260.3166666666666], [1.59635688E12, 1666.4], [1.59635694E12, 2446.8], [1.59635676E12, 4071.25]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59635718E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.5963567E12, "maxY": 470697.375, "series": [{"data": [[1.59635712E12, 524.0], [1.59635706E12, 538.2222222222222]], "isOverall": false, "label": "25.2 - Facultatives Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 2862.333333333333], [1.59635718E12, 2603.75]], "isOverall": false, "label": "39..2 - Ingresar la cantidad a pagar", "isController": false}, {"data": [[1.59635682E12, 46383.6]], "isOverall": false, "label": "9.1 - En Poliza General Presionar Siguiente", "isController": false}, {"data": [[1.59635688E12, 31736.5], [1.59635694E12, 37996.875]], "isOverall": false, "label": "T.14 - Descuento Hacer clic en Siguiente ", "isController": true}, {"data": [[1.5963567E12, 1197.0], [1.59635676E12, 1020.5]], "isOverall": false, "label": "6.2 - Buscar Id Cliente", "isController": false}, {"data": [[1.59635712E12, 4538.599999999999]], "isOverall": false, "label": "36.1 - Hacer clic en el \u00EDcono de Buscar de Descripcion", "isController": false}, {"data": [[1.59635682E12, 2032.5000000000002], [1.59635688E12, 6874.0]], "isOverall": false, "label": "T.11 - Grabar Objeto Asegurado", "isController": true}, {"data": [[1.59635712E12, 676.1111111111111], [1.59635718E12, 1347.0]], "isOverall": false, "label": "37.1 -Hacer clic en Buscar", "isController": false}, {"data": [[1.5963567E12, 589.4]], "isOverall": false, "label": "1.1 - Index", "isController": false}, {"data": [[1.59635712E12, 7153.5]], "isOverall": false, "label": "T.34 - ingresar el numero de poliza Buscar", "isController": true}, {"data": [[1.5963567E12, 400.1666666666667], [1.59635676E12, 563.25]], "isOverall": false, "label": "6.3 - Buscar Id Cliente", "isController": false}, {"data": [[1.5963567E12, 958.25], [1.59635676E12, 629.8333333333334]], "isOverall": false, "label": "6.8 - Buscar Id Cliente Ok", "isController": false}, {"data": [[1.596357E12, 12131.0], [1.59635694E12, 18121.777777777777]], "isOverall": false, "label": "T.15 - Deducible Hacer clic en Siguiente ", "isController": true}, {"data": [[1.5963567E12, 433.57142857142856], [1.59635676E12, 355.3333333333333]], "isOverall": false, "label": "5.3 - Seleccionar Actualizar Poliza", "isController": false}, {"data": [[1.596357E12, 512.0], [1.59635694E12, 1330.111111111111]], "isOverall": false, "label": "17.2 - Documentos Hacer clic en Siguiente ", "isController": false}, {"data": [[1.596357E12, 16366.444444444445], [1.59635694E12, 8485.0]], "isOverall": false, "label": "T.19 - Comisiones Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635712E12, 9295.0], [1.59635706E12, 10025.6]], "isOverall": false, "label": "T.26 -  Ri PolizaHacer clic en Siguiente ", "isController": true}, {"data": [[1.59635712E12, 571.1111111111111], [1.59635706E12, 605.0]], "isOverall": false, "label": "32.2 - Hacer clic en Pagos", "isController": false}, {"data": [[1.59635676E12, 8765.4]], "isOverall": false, "label": "7.1 - Presionar Buscar", "isController": false}, {"data": [[1.5963567E12, 5450.0]], "isOverall": false, "label": "T.2 - Ingresar a INSIS", "isController": true}, {"data": [[1.59635712E12, 2360.8], [1.59635706E12, 1526.2]], "isOverall": false, "label": "T.29 - Emitir Poliza Confirmacion Pre emision", "isController": true}, {"data": [[1.59635712E12, 3700.0], [1.59635718E12, 6748.4]], "isOverall": false, "label": "T. 40 - Hacer clic en OK", "isController": true}, {"data": [[1.59635712E12, 3800.0]], "isOverall": false, "label": "34.2 - ingresar el numero de poliza Buscar", "isController": false}, {"data": [[1.5963567E12, 129.0]], "isOverall": false, "label": "1.2 - Index-0", "isController": false}, {"data": [[1.59635688E12, 486.5], [1.59635694E12, 494.375]], "isOverall": false, "label": "14.2 - Descuento Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 222.5], [1.59635718E12, 181.125]], "isOverall": false, "label": "43.1 - Mensaje Operacion completada con exito", "isController": false}, {"data": [[1.5963567E12, 236.10000000000002]], "isOverall": false, "label": "1.2 - Index-1", "isController": false}, {"data": [[1.59635712E12, 379.0], [1.59635718E12, 368.49999999999994]], "isOverall": false, "label": "T.43 - Mensaje Operacion completada con exito", "isController": true}, {"data": [[1.59635682E12, 616.875], [1.59635688E12, 799.5]], "isOverall": false, "label": "10.2 - En coberturas Hacer clic en Detalles", "isController": false}, {"data": [[1.5963567E12, 955.0]], "isOverall": false, "label": "T.1 - Index", "isController": true}, {"data": [[1.59635682E12, 5065.8], [1.59635688E12, 5177.75], [1.59635694E12, 49010.0]], "isOverall": false, "label": "T.12 - Cerrar Objeto Asegurado", "isController": true}, {"data": [[1.59635682E12, 6068.333333333333], [1.59635688E12, 3441.0]], "isOverall": false, "label": "10.1 - En coberturas Hacer clic en Detalles", "isController": false}, {"data": [[1.59635712E12, 6119.5], [1.59635718E12, 6822.0]], "isOverall": false, "label": "38.1 - Hacer clic en Aceptar", "isController": false}, {"data": [[1.59635712E12, 311.1111111111111], [1.59635706E12, 295.0]], "isOverall": false, "label": "32.4 - Hacer clic en Pagos", "isController": false}, {"data": [[1.59635712E12, 592.2]], "isOverall": false, "label": "35 - ingresar el numero de poliza Buscar", "isController": false}, {"data": [[1.5963567E12, 945.3333333333333], [1.59635676E12, 581.25]], "isOverall": false, "label": "6.4 - Buscar Id Cliente", "isController": false}, {"data": [[1.5963567E12, 722.3333333333334], [1.59635676E12, 363.1428571428571]], "isOverall": false, "label": "6.10 - Buscar Id Cliente Ok", "isController": false}, {"data": [[1.59635712E12, 1846.0], [1.59635718E12, 1294.375]], "isOverall": false, "label": "T.44 - Cerrar Insis", "isController": true}, {"data": [[1.5963567E12, 510.5]], "isOverall": false, "label": "2.1 - Ingresar a INSIS", "isController": false}, {"data": [[1.59635712E12, 3695.6], [1.59635706E12, 3315.8]], "isOverall": false, "label": "27.1 - Emitir Poliza Calculo de Prima", "isController": false}, {"data": [[1.59635712E12, 3441.833333333333], [1.59635706E12, 1575.75]], "isOverall": false, "label": "31.1 - Hacer clic en Facturaci\u00F3n y Cobranza", "isController": false}, {"data": [[1.59635712E12, 550.2857142857142], [1.59635706E12, 242.0]], "isOverall": false, "label": "31.2 - Hacer clic en Facturaci\u00F3n y Cobranza", "isController": false}, {"data": [[1.596357E12, 13023.0], [1.59635706E12, 15302.0]], "isOverall": false, "label": "T.23- Claculo prima Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635712E12, 235.2], [1.59635718E12, 724.2]], "isOverall": false, "label": "40.3- Hacer clic en OK", "isController": false}, {"data": [[1.5963567E12, 373.6]], "isOverall": false, "label": "3.1 - Seleccionar Operaciones del Sistema", "isController": false}, {"data": [[1.59635682E12, 1073.8], [1.59635688E12, 5141.8]], "isOverall": false, "label": "12.1 - Cerrar Objeto Asegurado", "isController": false}, {"data": [[1.596357E12, 12092.714285714284], [1.59635706E12, 11950.333333333334]], "isOverall": false, "label": "22.1 - Informacion del cliente Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635682E12, 558.3333333333334], [1.59635688E12, 792.75]], "isOverall": false, "label": "11.2 - Grabar Objeto Asegurado", "isController": false}, {"data": [[1.596357E12, 589.6666666666667], [1.59635694E12, 645.0]], "isOverall": false, "label": "19.2 - Comisiones Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 391.5], [1.59635718E12, 192.24999999999997]], "isOverall": false, "label": "44.3 - Cerrar Insis-1", "isController": false}, {"data": [[1.59635718E12, 100.0]], "isOverall": false, "label": "42.2 - Hacer clic en Actividades y Aplicar Pago-1", "isController": false}, {"data": [[1.59635712E12, 6183.666666666666], [1.59635718E12, 6775.0]], "isOverall": false, "label": "T.39 - Ingresar la cantidad a pagar", "isController": true}, {"data": [[1.59635712E12, 156.0], [1.59635718E12, 179.57142857142856]], "isOverall": false, "label": "44.1 - Cerrar Insis-2", "isController": false}, {"data": [[1.59635712E12, 111.0], [1.59635718E12, 151.375]], "isOverall": false, "label": "44.3 - Cerrar Insis-0", "isController": false}, {"data": [[1.59635718E12, 99.0]], "isOverall": false, "label": "42.2 - Hacer clic en Actividades y Aplicar Pago-0", "isController": false}, {"data": [[1.596357E12, 12131.0], [1.59635694E12, 18121.777777777777]], "isOverall": false, "label": "15.1 - Deducible Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 3767.285714285714], [1.59635706E12, 1720.3333333333333]], "isOverall": false, "label": "T.31 - Hacer clic en Facturaci\u00F3n y Cobranza", "isController": true}, {"data": [[1.5963567E12, 365.6]], "isOverall": false, "label": "1.2 - Index", "isController": false}, {"data": [[1.5963567E12, 373.6]], "isOverall": false, "label": "T.3 - Seleccionar Operaciones del Sistema", "isController": true}, {"data": [[1.59635682E12, 1474.1666666666667], [1.59635688E12, 6081.25]], "isOverall": false, "label": "11.1 - Grabar Objeto Asegurado", "isController": false}, {"data": [[1.5963567E12, 468.8]], "isOverall": false, "label": "1.1 - Index-0", "isController": false}, {"data": [[1.5963567E12, 119.6]], "isOverall": false, "label": "1.1 - Index-1", "isController": false}, {"data": [[1.59635682E12, 3036.0], [1.59635688E12, 3250.25], [1.59635694E12, 14276.0]], "isOverall": false, "label": "12.2 - Cerrar Objeto Asegurado", "isController": false}, {"data": [[1.59635712E12, 3883.0], [1.59635718E12, 1800.8]], "isOverall": false, "label": "41.1 - Hacer clic en Grabar", "isController": false}, {"data": [[1.59635676E12, 544.3]], "isOverall": false, "label": "7.2 - Presionar Buscar", "isController": false}, {"data": [[1.596357E12, 11070.0], [1.59635694E12, 14941.111111111111]], "isOverall": false, "label": "17.1 - Documentos Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 7851.0], [1.59635706E12, 9289.777777777777]], "isOverall": false, "label": "25.1 - Facultatives Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 2789.8], [1.59635706E12, 2084.6]], "isOverall": false, "label": "26.2 -  Ri PolizaHacer clic en Siguiente ", "isController": false}, {"data": [[1.59635718E12, 399.0]], "isOverall": false, "label": "42 - Hacer clic en Grabar-0", "isController": false}, {"data": [[1.59635718E12, 103.0]], "isOverall": false, "label": "42.3 - Hacer clic en Actividades y Aplicar Pago-0", "isController": false}, {"data": [[1.59635718E12, 105.0]], "isOverall": false, "label": "42 - Hacer clic en Grabar-1", "isController": false}, {"data": [[1.59635712E12, 388.70000000000005]], "isOverall": false, "label": "34.3 - ingresar el numero de poliza Buscar", "isController": false}, {"data": [[1.59635712E12, 743.5], [1.59635718E12, 2765.375]], "isOverall": false, "label": "42.2 - Hacer clic en Actividades y Aplicar Pago", "isController": false}, {"data": [[1.59635718E12, 115.0]], "isOverall": false, "label": "42.3 - Hacer clic en Actividades y Aplicar Pago-1", "isController": false}, {"data": [[1.59635712E12, 501.77777777777777], [1.59635718E12, 385.0]], "isOverall": false, "label": "37.3 -Hacer clic en Buscar", "isController": false}, {"data": [[1.59635706E12, 641.9999999999999]], "isOverall": false, "label": "24.2 - Plan de cuotas Hacer clic en Siguiente ", "isController": false}, {"data": [[1.596357E12, 11582.0], [1.59635694E12, 16271.222222222223]], "isOverall": false, "label": "T.17 - Documentos Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635706E12, 16920.7]], "isOverall": false, "label": "24.1 - Plan de cuotas Hacer clic en Siguiente ", "isController": false}, {"data": [[1.5963567E12, 942.6666666666666], [1.59635676E12, 780.5]], "isOverall": false, "label": "6.1 - Buscar Id Cliente", "isController": false}, {"data": [[1.596357E12, 12433.0], [1.59635706E12, 14718.222222222224]], "isOverall": false, "label": "23.1 - Claculo prima Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635712E12, 502.5], [1.59635718E12, 343.875]], "isOverall": false, "label": "44.3 - Cerrar Insis", "isController": false}, {"data": [[1.59635682E12, 5908.0], [1.59635688E12, 19386.75]], "isOverall": false, "label": "T.10 - En coberturas Hacer clic en Detalles", "isController": true}, {"data": [[1.59635712E12, 585.2], [1.59635718E12, 1881.4]], "isOverall": false, "label": "42 - Hacer clic en Grabar", "isController": false}, {"data": [[1.596357E12, 16763.0], [1.59635706E12, 15547.0]], "isOverall": false, "label": "T.21 - Clausulas Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635718E12, 94.0]], "isOverall": false, "label": "42.4 - Hacer clic en Actividades y Aplicar Pago-0", "isController": false}, {"data": [[1.596357E12, 15538.777777777777], [1.59635706E12, 19401.0]], "isOverall": false, "label": "T.20 - Impuestos Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635718E12, 99.0]], "isOverall": false, "label": "42.4 - Hacer clic en Actividades y Aplicar Pago-1", "isController": false}, {"data": [[1.5963567E12, 744.7142857142858], [1.59635676E12, 632.0]], "isOverall": false, "label": "5.2 - Seleccionar Actualizar Poliza", "isController": false}, {"data": [[1.59635712E12, 3321.333333333333], [1.59635718E12, 4171.25]], "isOverall": false, "label": "39.1 - Ingresar la cantidad a pagar", "isController": false}, {"data": [[1.59635688E12, 572.3333333333334], [1.59635694E12, 543.0]], "isOverall": false, "label": "13.2 - En coberturas Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635712E12, 99.5], [1.59635718E12, 137.0]], "isOverall": false, "label": "43.4  - Cerrar Insis", "isController": false}, {"data": [[1.59635712E12, 2360.8], [1.59635706E12, 1526.2]], "isOverall": false, "label": "29.1 - Emitir Poliza Confirmacion Pre emision", "isController": false}, {"data": [[1.596357E12, 759.5555555555555], [1.59635706E12, 479.0]], "isOverall": false, "label": "20.2 - Impuestos Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 4538.599999999999]], "isOverall": false, "label": "T.36 - Hacer clic en el \u00EDcono de Buscar de Descripcion", "isController": true}, {"data": [[1.59635718E12, 1546.0]], "isOverall": false, "label": "40.2 - Hacer clic en OK-1", "isController": false}, {"data": [[1.59635718E12, 3184.0]], "isOverall": false, "label": "40.2 - Hacer clic en OK-0", "isController": false}, {"data": [[1.59635718E12, 196.0]], "isOverall": false, "label": "40.3- Hacer clic en OK-0", "isController": false}, {"data": [[1.59635682E12, 46978.3]], "isOverall": false, "label": "T.9 - En Poliza General Presionar Siguiente", "isController": true}, {"data": [[1.59635718E12, 125.0]], "isOverall": false, "label": "40.3- Hacer clic en OK-1", "isController": false}, {"data": [[1.596357E12, 15776.777777777777], [1.59635694E12, 7840.0]], "isOverall": false, "label": "19.1 - Comisiones Hacer clic en Siguiente ", "isController": false}, {"data": [[1.5963567E12, 359.1]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-0", "isController": false}, {"data": [[1.5963567E12, 150.9]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-1", "isController": false}, {"data": [[1.596357E12, 15746.0], [1.59635694E12, 14154.5]], "isOverall": false, "label": "T.18 - Documentos Objeto Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635682E12, 51547.5], [1.59635676E12, 39857.666666666664]], "isOverall": false, "label": "8.1 - Presionar Siguiente", "isController": false}, {"data": [[1.596357E12, 528.1666666666667], [1.59635706E12, 504.0]], "isOverall": false, "label": "22.2 - Informacion del cliente Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635712E12, 6608.25], [1.59635718E12, 9508.666666666666]], "isOverall": false, "label": "42.1 - Hacer clic en Actividades y Aplicar Pago", "isController": false}, {"data": [[1.5963567E12, 15595.285714285714], [1.59635676E12, 18792.666666666668]], "isOverall": false, "label": "T.5 - Seleccionar Actualizar Poliza", "isController": true}, {"data": [[1.59635712E12, 1040.5], [1.59635718E12, 572.5]], "isOverall": false, "label": "44.1 - Cerrar Insis", "isController": false}, {"data": [[1.59635712E12, 6680.0], [1.59635706E12, 7358.875]], "isOverall": false, "label": "26.1 -  Ri PolizaHacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 441991.0], [1.59635718E12, 470697.375]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.5963567E12, 8678.0], [1.59635676E12, 6815.857142857143]], "isOverall": false, "label": "T.6 - Buscar Id Cliente", "isController": true}, {"data": [[1.59635718E12, 110.0]], "isOverall": false, "label": "41.1 - Hacer clic en Grabar-1", "isController": false}, {"data": [[1.59635682E12, 594.7]], "isOverall": false, "label": "9.2 - En Poliza General Presionar Siguiente", "isController": false}, {"data": [[1.59635718E12, 106.0]], "isOverall": false, "label": "41.1 - Hacer clic en Grabar-0", "isController": false}, {"data": [[1.59635712E12, 156.5], [1.59635718E12, 187.375]], "isOverall": false, "label": "43.2 - Mensaje Operacion completada con exito", "isController": false}, {"data": [[1.59635688E12, 31698.0], [1.59635694E12, 38203.71428571428]], "isOverall": false, "label": "14.1 - Descuento Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 7752.5], [1.59635718E12, 12412.75]], "isOverall": false, "label": "T.42 - Hacer clic en Actividades y Aplicar Pago", "isController": true}, {"data": [[1.596357E12, 450.0], [1.59635694E12, 1557.6666666666665]], "isOverall": false, "label": "T.16 - Deducible Hacer clic en Siguiente ", "isController": true}, {"data": [[1.5963567E12, 14417.0], [1.59635676E12, 17805.333333333332]], "isOverall": false, "label": "5.1 - Seleccionar Actualizar Poliza", "isController": false}, {"data": [[1.59635718E12, 104.0]], "isOverall": false, "label": "43.2 - Mensaje Operacion completada con exito-1", "isController": false}, {"data": [[1.596357E12, 15249.0], [1.59635694E12, 13643.625000000002]], "isOverall": false, "label": "18.1 - Documentos Objeto Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635718E12, 93.0]], "isOverall": false, "label": "43.2 - Mensaje Operacion completada con exito-0", "isController": false}, {"data": [[1.59635682E12, 956.0], [1.59635688E12, 896.25], [1.59635694E12, 13150.0]], "isOverall": false, "label": "12.3 - Cerrar Objeto Asegurado", "isController": false}, {"data": [[1.59635712E12, 442.0], [1.59635718E12, 586.25]], "isOverall": false, "label": "42.3 - Hacer clic en Actividades y Aplicar Pago", "isController": false}, {"data": [[1.59635682E12, 885.0], [1.59635688E12, 4723.125]], "isOverall": false, "label": "10.3 - En coberturas Hacer clic en Detalles", "isController": false}, {"data": [[1.59635712E12, 267.0], [1.59635718E12, 192.125]], "isOverall": false, "label": "44.1 - Cerrar Insis-1", "isController": false}, {"data": [[1.59635712E12, 617.0], [1.59635718E12, 223.0]], "isOverall": false, "label": "44.1 - Cerrar Insis-0", "isController": false}, {"data": [[1.59635718E12, 102.0]], "isOverall": false, "label": "42.1 - Hacer clic en Actividades y Aplicar Pago-1", "isController": false}, {"data": [[1.59635718E12, 103.0]], "isOverall": false, "label": "42.1 - Hacer clic en Actividades y Aplicar Pago-0", "isController": false}, {"data": [[1.596357E12, 16231.625], [1.59635706E12, 15013.0]], "isOverall": false, "label": "21.1 - Clausulas Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635712E12, 4660.6], [1.59635706E12, 3324.8]], "isOverall": false, "label": "30.1 - Emitir Poliza ", "isController": false}, {"data": [[1.5963567E12, 4486.299999999999]], "isOverall": false, "label": "2.2 - Ingresar a INSIS", "isController": false}, {"data": [[1.59635712E12, 4754.1]], "isOverall": false, "label": "33.1 - Hacer clic en Actividades Nuevo", "isController": false}, {"data": [[1.5963567E12, 695.0]], "isOverall": false, "label": "T.4 - Seleccionar Control de Polizas", "isController": true}, {"data": [[1.5963567E12, 423.9]], "isOverall": false, "label": "4.1 - Seleccionar Control de Polizas", "isController": false}, {"data": [[1.596357E12, 450.0], [1.59635694E12, 1557.6666666666665]], "isOverall": false, "label": "16.1 - Deducible Hacer clic en Siguiente -124", "isController": false}, {"data": [[1.59635712E12, 104.0], [1.59635718E12, 102.125]], "isOverall": false, "label": "44.2 - Cerrar Insis-1", "isController": false}, {"data": [[1.59635712E12, 99.5], [1.59635718E12, 138.625]], "isOverall": false, "label": "44.2 - Cerrar Insis-0", "isController": false}, {"data": [[1.59635688E12, 29990.777777777777], [1.59635694E12, 12764.0]], "isOverall": false, "label": "T.13 - En coberturas Hacer clic en Siguiente", "isController": true}, {"data": [[1.59635712E12, 8375.0], [1.59635706E12, 9828.0]], "isOverall": false, "label": "T.25 - Facultatives Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635712E12, 1588.6], [1.59635706E12, 1499.4]], "isOverall": false, "label": "28.1 - Emitir Poliza Validacion", "isController": false}, {"data": [[1.59635712E12, 175.5], [1.59635718E12, 223.375]], "isOverall": false, "label": "42.4 - Hacer clic en Actividades y Aplicar Pago", "isController": false}, {"data": [[1.5963567E12, 453.19999999999993]], "isOverall": false, "label": "2.3 - Ingresar a INSIS", "isController": false}, {"data": [[1.5963567E12, 513.8], [1.59635676E12, 457.2]], "isOverall": false, "label": "6.5 - Buscar Id Cliente", "isController": false}, {"data": [[1.596357E12, 13441.0], [1.59635706E12, 11259.75]], "isOverall": false, "label": "T.22- Informacion del cliente Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635676E12, 9309.699999999999]], "isOverall": false, "label": "T.7 - Presionar Buscar", "isController": true}, {"data": [[1.596357E12, 531.375], [1.59635706E12, 534.0]], "isOverall": false, "label": "21.2 - Clausulas Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635712E12, 592.2]], "isOverall": false, "label": "T.35 - ingresar el numero de poliza Buscar", "isController": true}, {"data": [[1.59635682E12, 51643.6], [1.59635676E12, 39225.0]], "isOverall": false, "label": "T.8 - Presionar Siguiente", "isController": true}, {"data": [[1.596357E12, 590.0], [1.59635706E12, 583.7777777777777]], "isOverall": false, "label": "23.2 - Claculo prima Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635712E12, 4468.2], [1.59635718E12, 3682.2]], "isOverall": false, "label": "T.41 - Hacer clic en Grabar", "isController": true}, {"data": [[1.59635706E12, 17562.7]], "isOverall": false, "label": "T.24 - Plan de cuotas Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635712E12, 2964.8]], "isOverall": false, "label": "34.1 - ingresar el numero de poliza Buscar", "isController": false}, {"data": [[1.59635718E12, 102.0]], "isOverall": false, "label": "43.1 - Mensaje Operacion completada con exito-1", "isController": false}, {"data": [[1.59635712E12, 520.9]], "isOverall": false, "label": "33.2 - Hacer clic en Actividades Nuevo", "isController": false}, {"data": [[1.59635718E12, 102.0]], "isOverall": false, "label": "43.1 - Mensaje Operacion completada con exito-0", "isController": false}, {"data": [[1.59635688E12, 29418.444444444445], [1.59635694E12, 12221.0]], "isOverall": false, "label": "13.1 - En coberturas Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635712E12, 7588.666666666667], [1.59635706E12, 5016.0]], "isOverall": false, "label": "32.1 - Hacer clic en Pagos", "isController": false}, {"data": [[1.59635712E12, 203.5], [1.59635718E12, 241.0]], "isOverall": false, "label": "44.2 - Cerrar Insis", "isController": false}, {"data": [[1.59635682E12, 761.0], [1.59635676E12, 1040.4]], "isOverall": false, "label": "8.2 - Presionar Siguiente", "isController": false}, {"data": [[1.59635712E12, 1588.6], [1.59635706E12, 1499.4]], "isOverall": false, "label": "T.28 - Emitir Poliza Validacion", "isController": true}, {"data": [[1.59635712E12, 5275.0]], "isOverall": false, "label": "T.33 - Hacer clic en Actividades Nuevo", "isController": true}, {"data": [[1.59635712E12, 4739.111111111111], [1.59635718E12, 5570.0]], "isOverall": false, "label": "T.37 -Hacer clic en Buscar", "isController": true}, {"data": [[1.5963567E12, 1033.2], [1.59635676E12, 1029.4]], "isOverall": false, "label": "6.6 - Buscar Id Cliente", "isController": false}, {"data": [[1.5963567E12, 614.25], [1.59635676E12, 551.0]], "isOverall": false, "label": "6.7 - Buscar Id Cliente", "isController": false}, {"data": [[1.5963567E12, 1082.0], [1.59635676E12, 578.6666666666667]], "isOverall": false, "label": "6.9 - Buscar Id Cliente Ok", "isController": false}, {"data": [[1.596357E12, 497.0], [1.59635694E12, 510.875]], "isOverall": false, "label": "18.2 - Documentos Objeto Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635712E12, 6119.5], [1.59635718E12, 6822.0]], "isOverall": false, "label": "T.38 - Hacer clic en Aceptar", "isController": true}, {"data": [[1.59635712E12, 948.3333333333334], [1.59635718E12, 3857.5]], "isOverall": false, "label": "40.2 - Hacer clic en OK", "isController": false}, {"data": [[1.59635712E12, 2659.6666666666665], [1.59635718E12, 2591.75]], "isOverall": false, "label": "40.1 - Hacer clic en OK", "isController": false}, {"data": [[1.59635712E12, 0.0], [1.59635718E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59635712E12, 3561.222222222222], [1.59635718E12, 3838.0]], "isOverall": false, "label": "37.2 -Hacer clic en Buscar", "isController": false}, {"data": [[1.59635712E12, 260.44444444444446], [1.59635706E12, 226.0]], "isOverall": false, "label": "32 .3- Hacer clic en Pagos", "isController": false}, {"data": [[1.59635712E12, 3695.6], [1.59635706E12, 3315.8]], "isOverall": false, "label": "T.27 - Emitir Poliza Calculo de Prima", "isController": true}, {"data": [[1.5963567E12, 271.1]], "isOverall": false, "label": "4.2 - Seleccionar Control de Polizas", "isController": false}, {"data": [[1.59635712E12, 4660.6], [1.59635706E12, 3324.8]], "isOverall": false, "label": "T.30 - Emitir Poliza ", "isController": true}, {"data": [[1.59635712E12, 8731.333333333334], [1.59635706E12, 6142.0]], "isOverall": false, "label": "T.32 - Hacer clic en Pagos", "isController": true}, {"data": [[1.596357E12, 14779.222222222223], [1.59635706E12, 18922.0]], "isOverall": false, "label": "20.1 - Impuestos Hacer clic en Siguiente ", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59635718E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.5963567E12, "maxY": 413750.75, "series": [{"data": [[1.59635712E12, 417.0], [1.59635706E12, 471.3333333333333]], "isOverall": false, "label": "25.2 - Facultatives Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 2856.6666666666665], [1.59635718E12, 2599.75]], "isOverall": false, "label": "39..2 - Ingresar la cantidad a pagar", "isController": false}, {"data": [[1.59635682E12, 44685.9]], "isOverall": false, "label": "9.1 - En Poliza General Presionar Siguiente", "isController": false}, {"data": [[1.59635688E12, 31004.0], [1.59635694E12, 36239.62500000001]], "isOverall": false, "label": "T.14 - Descuento Hacer clic en Siguiente ", "isController": true}, {"data": [[1.5963567E12, 992.0], [1.59635676E12, 837.5]], "isOverall": false, "label": "6.2 - Buscar Id Cliente", "isController": false}, {"data": [[1.59635712E12, 3117.1]], "isOverall": false, "label": "36.1 - Hacer clic en el \u00EDcono de Buscar de Descripcion", "isController": false}, {"data": [[1.59635682E12, 1587.8333333333333], [1.59635688E12, 6481.25]], "isOverall": false, "label": "T.11 - Grabar Objeto Asegurado", "isController": true}, {"data": [[1.59635712E12, 668.8888888888889], [1.59635718E12, 1343.0]], "isOverall": false, "label": "37.1 -Hacer clic en Buscar", "isController": false}, {"data": [[1.5963567E12, 468.3]], "isOverall": false, "label": "1.1 - Index", "isController": false}, {"data": [[1.59635712E12, 6503.2]], "isOverall": false, "label": "T.34 - ingresar el numero de poliza Buscar", "isController": true}, {"data": [[1.5963567E12, 361.5], [1.59635676E12, 514.0]], "isOverall": false, "label": "6.3 - Buscar Id Cliente", "isController": false}, {"data": [[1.5963567E12, 937.0], [1.59635676E12, 604.3333333333333]], "isOverall": false, "label": "6.8 - Buscar Id Cliente Ok", "isController": false}, {"data": [[1.596357E12, 11506.0], [1.59635694E12, 17341.88888888889]], "isOverall": false, "label": "T.15 - Deducible Hacer clic en Siguiente ", "isController": true}, {"data": [[1.5963567E12, 404.2857142857143], [1.59635676E12, 323.3333333333333]], "isOverall": false, "label": "5.3 - Seleccionar Actualizar Poliza", "isController": false}, {"data": [[1.596357E12, 497.0], [1.59635694E12, 479.3333333333333]], "isOverall": false, "label": "17.2 - Documentos Hacer clic en Siguiente ", "isController": false}, {"data": [[1.596357E12, 15560.888888888889], [1.59635694E12, 7563.0]], "isOverall": false, "label": "T.19 - Comisiones Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635712E12, 8834.4], [1.59635706E12, 9504.0]], "isOverall": false, "label": "T.26 -  Ri PolizaHacer clic en Siguiente ", "isController": true}, {"data": [[1.59635712E12, 473.1111111111111], [1.59635706E12, 499.0]], "isOverall": false, "label": "32.2 - Hacer clic en Pagos", "isController": false}, {"data": [[1.59635676E12, 1001.7]], "isOverall": false, "label": "7.1 - Presionar Buscar", "isController": false}, {"data": [[1.5963567E12, 4912.5]], "isOverall": false, "label": "T.2 - Ingresar a INSIS", "isController": true}, {"data": [[1.59635712E12, 2278.0], [1.59635706E12, 1382.8]], "isOverall": false, "label": "T.29 - Emitir Poliza Confirmacion Pre emision", "isController": true}, {"data": [[1.59635712E12, 2986.2], [1.59635718E12, 5744.8]], "isOverall": false, "label": "T. 40 - Hacer clic en OK", "isController": true}, {"data": [[1.59635712E12, 3335.6000000000004]], "isOverall": false, "label": "34.2 - ingresar el numero de poliza Buscar", "isController": false}, {"data": [[1.5963567E12, 128.9]], "isOverall": false, "label": "1.2 - Index-0", "isController": false}, {"data": [[1.59635688E12, 475.0], [1.59635694E12, 471.875]], "isOverall": false, "label": "14.2 - Descuento Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 221.5], [1.59635718E12, 166.125]], "isOverall": false, "label": "43.1 - Mensaje Operacion completada con exito", "isController": false}, {"data": [[1.5963567E12, 135.9]], "isOverall": false, "label": "1.2 - Index-1", "isController": false}, {"data": [[1.59635712E12, 376.5], [1.59635718E12, 337.25]], "isOverall": false, "label": "T.43 - Mensaje Operacion completada con exito", "isController": true}, {"data": [[1.59635682E12, 555.25], [1.59635688E12, 725.5]], "isOverall": false, "label": "10.2 - En coberturas Hacer clic en Detalles", "isController": false}, {"data": [[1.5963567E12, 597.2]], "isOverall": false, "label": "T.1 - Index", "isController": true}, {"data": [[1.59635682E12, 3532.0], [1.59635688E12, 3437.0], [1.59635694E12, 48991.0]], "isOverall": false, "label": "T.12 - Cerrar Objeto Asegurado", "isController": true}, {"data": [[1.59635682E12, 4727.888888888889], [1.59635688E12, 2220.0]], "isOverall": false, "label": "10.1 - En coberturas Hacer clic en Detalles", "isController": false}, {"data": [[1.59635712E12, 4024.7499999999995], [1.59635718E12, 6533.5]], "isOverall": false, "label": "38.1 - Hacer clic en Aceptar", "isController": false}, {"data": [[1.59635712E12, 295.8888888888889], [1.59635706E12, 228.0]], "isOverall": false, "label": "32.4 - Hacer clic en Pagos", "isController": false}, {"data": [[1.59635712E12, 575.8]], "isOverall": false, "label": "35 - ingresar el numero de poliza Buscar", "isController": false}, {"data": [[1.5963567E12, 923.6666666666667], [1.59635676E12, 573.0]], "isOverall": false, "label": "6.4 - Buscar Id Cliente", "isController": false}, {"data": [[1.5963567E12, 707.3333333333334], [1.59635676E12, 353.2857142857143]], "isOverall": false, "label": "6.10 - Buscar Id Cliente Ok", "isController": false}, {"data": [[1.59635712E12, 926.0], [1.59635718E12, 649.875]], "isOverall": false, "label": "T.44 - Cerrar Insis", "isController": true}, {"data": [[1.5963567E12, 358.6]], "isOverall": false, "label": "2.1 - Ingresar a INSIS", "isController": false}, {"data": [[1.59635712E12, 3543.8], [1.59635706E12, 3105.4]], "isOverall": false, "label": "27.1 - Emitir Poliza Calculo de Prima", "isController": false}, {"data": [[1.59635712E12, 3341.166666666667], [1.59635706E12, 1483.5]], "isOverall": false, "label": "31.1 - Hacer clic en Facturaci\u00F3n y Cobranza", "isController": false}, {"data": [[1.59635712E12, 476.57142857142856], [1.59635706E12, 211.66666666666666]], "isOverall": false, "label": "31.2 - Hacer clic en Facturaci\u00F3n y Cobranza", "isController": false}, {"data": [[1.596357E12, 11756.0], [1.59635706E12, 14546.11111111111]], "isOverall": false, "label": "T.23- Claculo prima Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635712E12, 231.0], [1.59635718E12, 694.4]], "isOverall": false, "label": "40.3- Hacer clic en OK", "isController": false}, {"data": [[1.5963567E12, 262.09999999999997]], "isOverall": false, "label": "3.1 - Seleccionar Operaciones del Sistema", "isController": false}, {"data": [[1.59635682E12, 1028.6], [1.59635688E12, 5114.0]], "isOverall": false, "label": "12.1 - Cerrar Objeto Asegurado", "isController": false}, {"data": [[1.596357E12, 11425.714285714284], [1.59635706E12, 11394.0]], "isOverall": false, "label": "22.1 - Informacion del cliente Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635682E12, 509.66666666666663], [1.59635688E12, 724.75]], "isOverall": false, "label": "11.2 - Grabar Objeto Asegurado", "isController": false}, {"data": [[1.596357E12, 462.77777777777777], [1.59635694E12, 507.0]], "isOverall": false, "label": "19.2 - Comisiones Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 290.0], [1.59635718E12, 124.25]], "isOverall": false, "label": "44.3 - Cerrar Insis-1", "isController": false}, {"data": [[1.59635718E12, 100.0]], "isOverall": false, "label": "42.2 - Hacer clic en Actividades y Aplicar Pago-1", "isController": false}, {"data": [[1.59635712E12, 6171.0], [1.59635718E12, 6767.0]], "isOverall": false, "label": "T.39 - Ingresar la cantidad a pagar", "isController": true}, {"data": [[1.59635712E12, 91.5], [1.59635718E12, 139.85714285714286]], "isOverall": false, "label": "44.1 - Cerrar Insis-2", "isController": false}, {"data": [[1.59635712E12, 111.0], [1.59635718E12, 151.375]], "isOverall": false, "label": "44.3 - Cerrar Insis-0", "isController": false}, {"data": [[1.59635718E12, 99.0]], "isOverall": false, "label": "42.2 - Hacer clic en Actividades y Aplicar Pago-0", "isController": false}, {"data": [[1.596357E12, 11506.0], [1.59635694E12, 17341.88888888889]], "isOverall": false, "label": "15.1 - Deducible Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 3593.714285714286], [1.59635706E12, 1598.6666666666667]], "isOverall": false, "label": "T.31 - Hacer clic en Facturaci\u00F3n y Cobranza", "isController": true}, {"data": [[1.5963567E12, 128.9]], "isOverall": false, "label": "1.2 - Index", "isController": false}, {"data": [[1.5963567E12, 262.09999999999997]], "isOverall": false, "label": "T.3 - Seleccionar Operaciones del Sistema", "isController": true}, {"data": [[1.59635682E12, 1078.1666666666667], [1.59635688E12, 5756.5]], "isOverall": false, "label": "11.1 - Grabar Objeto Asegurado", "isController": false}, {"data": [[1.5963567E12, 468.3]], "isOverall": false, "label": "1.1 - Index-0", "isController": false}, {"data": [[1.5963567E12, 116.2]], "isOverall": false, "label": "1.1 - Index-1", "isController": false}, {"data": [[1.59635682E12, 1571.4], [1.59635688E12, 1565.25], [1.59635694E12, 14260.0]], "isOverall": false, "label": "12.2 - Cerrar Objeto Asegurado", "isController": false}, {"data": [[1.59635712E12, 1128.0], [1.59635718E12, 807.8]], "isOverall": false, "label": "41.1 - Hacer clic en Grabar", "isController": false}, {"data": [[1.59635676E12, 452.0]], "isOverall": false, "label": "7.2 - Presionar Buscar", "isController": false}, {"data": [[1.596357E12, 10391.0], [1.59635694E12, 13359.111111111111]], "isOverall": false, "label": "17.1 - Documentos Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 7286.0], [1.59635706E12, 8520.555555555555]], "isOverall": false, "label": "25.1 - Facultatives Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 2774.0], [1.59635706E12, 2081.4]], "isOverall": false, "label": "26.2 -  Ri PolizaHacer clic en Siguiente ", "isController": false}, {"data": [[1.59635718E12, 399.0]], "isOverall": false, "label": "42 - Hacer clic en Grabar-0", "isController": false}, {"data": [[1.59635718E12, 103.0]], "isOverall": false, "label": "42.3 - Hacer clic en Actividades y Aplicar Pago-0", "isController": false}, {"data": [[1.59635718E12, 104.0]], "isOverall": false, "label": "42 - Hacer clic en Grabar-1", "isController": false}, {"data": [[1.59635712E12, 388.70000000000005]], "isOverall": false, "label": "34.3 - ingresar el numero de poliza Buscar", "isController": false}, {"data": [[1.59635712E12, 306.0], [1.59635718E12, 2404.375]], "isOverall": false, "label": "42.2 - Hacer clic en Actividades y Aplicar Pago", "isController": false}, {"data": [[1.59635718E12, 115.0]], "isOverall": false, "label": "42.3 - Hacer clic en Actividades y Aplicar Pago-1", "isController": false}, {"data": [[1.59635712E12, 501.77777777777777], [1.59635718E12, 385.0]], "isOverall": false, "label": "37.3 -Hacer clic en Buscar", "isController": false}, {"data": [[1.59635706E12, 521.7]], "isOverall": false, "label": "24.2 - Plan de cuotas Hacer clic en Siguiente ", "isController": false}, {"data": [[1.596357E12, 10888.0], [1.59635694E12, 13838.444444444445]], "isOverall": false, "label": "T.17 - Documentos Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635706E12, 14671.4]], "isOverall": false, "label": "24.1 - Plan de cuotas Hacer clic en Siguiente ", "isController": false}, {"data": [[1.5963567E12, 926.1666666666667], [1.59635676E12, 767.0]], "isOverall": false, "label": "6.1 - Buscar Id Cliente", "isController": false}, {"data": [[1.596357E12, 11257.0], [1.59635706E12, 14049.888888888889]], "isOverall": false, "label": "23.1 - Claculo prima Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635712E12, 111.0], [1.59635718E12, 151.375]], "isOverall": false, "label": "44.3 - Cerrar Insis", "isController": false}, {"data": [[1.59635682E12, 3740.666666666667], [1.59635688E12, 17793.0]], "isOverall": false, "label": "T.10 - En coberturas Hacer clic en Detalles", "isController": true}, {"data": [[1.59635712E12, 431.0], [1.59635718E12, 1734.8]], "isOverall": false, "label": "42 - Hacer clic en Grabar", "isController": false}, {"data": [[1.596357E12, 15882.625], [1.59635706E12, 14766.0]], "isOverall": false, "label": "T.21 - Clausulas Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635718E12, 94.0]], "isOverall": false, "label": "42.4 - Hacer clic en Actividades y Aplicar Pago-0", "isController": false}, {"data": [[1.596357E12, 14777.888888888889], [1.59635706E12, 18415.0]], "isOverall": false, "label": "T.20 - Impuestos Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635718E12, 98.0]], "isOverall": false, "label": "42.4 - Hacer clic en Actividades y Aplicar Pago-1", "isController": false}, {"data": [[1.5963567E12, 652.8571428571428], [1.59635676E12, 562.0]], "isOverall": false, "label": "5.2 - Seleccionar Actualizar Poliza", "isController": false}, {"data": [[1.59635712E12, 3314.333333333333], [1.59635718E12, 4167.25]], "isOverall": false, "label": "39.1 - Ingresar la cantidad a pagar", "isController": false}, {"data": [[1.59635688E12, 540.1111111111111], [1.59635694E12, 516.0]], "isOverall": false, "label": "13.2 - En coberturas Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635712E12, 99.0], [1.59635718E12, 137.0]], "isOverall": false, "label": "43.4  - Cerrar Insis", "isController": false}, {"data": [[1.59635712E12, 2278.0], [1.59635706E12, 1382.8]], "isOverall": false, "label": "29.1 - Emitir Poliza Confirmacion Pre emision", "isController": false}, {"data": [[1.596357E12, 612.3333333333334], [1.59635706E12, 440.0]], "isOverall": false, "label": "20.2 - Impuestos Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 3117.1]], "isOverall": false, "label": "T.36 - Hacer clic en el \u00EDcono de Buscar de Descripcion", "isController": true}, {"data": [[1.59635718E12, 1546.0]], "isOverall": false, "label": "40.2 - Hacer clic en OK-1", "isController": false}, {"data": [[1.59635718E12, 3184.0]], "isOverall": false, "label": "40.2 - Hacer clic en OK-0", "isController": false}, {"data": [[1.59635718E12, 195.0]], "isOverall": false, "label": "40.3- Hacer clic en OK-0", "isController": false}, {"data": [[1.59635682E12, 45228.7]], "isOverall": false, "label": "T.9 - En Poliza General Presionar Siguiente", "isController": true}, {"data": [[1.59635718E12, 125.0]], "isOverall": false, "label": "40.3- Hacer clic en OK-1", "isController": false}, {"data": [[1.596357E12, 15098.111111111111], [1.59635694E12, 7056.0]], "isOverall": false, "label": "19.1 - Comisiones Hacer clic en Siguiente ", "isController": false}, {"data": [[1.5963567E12, 358.6]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-0", "isController": false}, {"data": [[1.5963567E12, 150.0]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-1", "isController": false}, {"data": [[1.596357E12, 14994.5], [1.59635694E12, 13020.25]], "isOverall": false, "label": "T.18 - Documentos Objeto Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635682E12, 50627.75], [1.59635676E12, 39036.166666666664]], "isOverall": false, "label": "8.1 - Presionar Siguiente", "isController": false}, {"data": [[1.596357E12, 441.66666666666663], [1.59635706E12, 443.25]], "isOverall": false, "label": "22.2 - Informacion del cliente Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635712E12, 6172.5], [1.59635718E12, 9082.333333333332]], "isOverall": false, "label": "42.1 - Hacer clic en Actividades y Aplicar Pago", "isController": false}, {"data": [[1.5963567E12, 4083.8571428571427], [1.59635676E12, 3624.3333333333335]], "isOverall": false, "label": "T.5 - Seleccionar Actualizar Poliza", "isController": true}, {"data": [[1.59635712E12, 617.0], [1.59635718E12, 223.0]], "isOverall": false, "label": "44.1 - Cerrar Insis", "isController": false}, {"data": [[1.59635712E12, 6300.0], [1.59635706E12, 6851.875]], "isOverall": false, "label": "26.1 -  Ri PolizaHacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 390579.0], [1.59635718E12, 413750.75]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.5963567E12, 8089.666666666667], [1.59635676E12, 6314.142857142858]], "isOverall": false, "label": "T.6 - Buscar Id Cliente", "isController": true}, {"data": [[1.59635718E12, 110.0]], "isOverall": false, "label": "41.1 - Hacer clic en Grabar-1", "isController": false}, {"data": [[1.59635682E12, 542.8000000000001]], "isOverall": false, "label": "9.2 - En Poliza General Presionar Siguiente", "isController": false}, {"data": [[1.59635718E12, 106.0]], "isOverall": false, "label": "41.1 - Hacer clic en Grabar-0", "isController": false}, {"data": [[1.59635712E12, 155.0], [1.59635718E12, 171.125]], "isOverall": false, "label": "43.2 - Mensaje Operacion completada con exito", "isController": false}, {"data": [[1.59635688E12, 30957.333333333332], [1.59635694E12, 36332.57142857143]], "isOverall": false, "label": "14.1 - Descuento Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 7069.0], [1.59635718E12, 11186.875]], "isOverall": false, "label": "T.42 - Hacer clic en Actividades y Aplicar Pago", "isController": true}, {"data": [[1.596357E12, 442.0], [1.59635694E12, 484.77777777777777]], "isOverall": false, "label": "T.16 - Deducible Hacer clic en Siguiente ", "isController": true}, {"data": [[1.5963567E12, 3026.714285714286], [1.59635676E12, 2739.0]], "isOverall": false, "label": "5.1 - Seleccionar Actualizar Poliza", "isController": false}, {"data": [[1.59635718E12, 104.0]], "isOverall": false, "label": "43.2 - Mensaje Operacion completada con exito-1", "isController": false}, {"data": [[1.596357E12, 14519.0], [1.59635694E12, 12538.375]], "isOverall": false, "label": "18.1 - Documentos Objeto Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635718E12, 93.0]], "isOverall": false, "label": "43.2 - Mensaje Operacion completada con exito-0", "isController": false}, {"data": [[1.59635682E12, 932.0], [1.59635688E12, 875.25], [1.59635694E12, 13147.0]], "isOverall": false, "label": "12.3 - Cerrar Objeto Asegurado", "isController": false}, {"data": [[1.59635712E12, 347.5], [1.59635718E12, 245.375]], "isOverall": false, "label": "42.3 - Hacer clic en Actividades y Aplicar Pago", "isController": false}, {"data": [[1.59635682E12, 600.5000000000001], [1.59635688E12, 4468.25]], "isOverall": false, "label": "10.3 - En coberturas Hacer clic en Detalles", "isController": false}, {"data": [[1.59635712E12, 267.0], [1.59635718E12, 192.0]], "isOverall": false, "label": "44.1 - Cerrar Insis-1", "isController": false}, {"data": [[1.59635712E12, 617.0], [1.59635718E12, 223.0]], "isOverall": false, "label": "44.1 - Cerrar Insis-0", "isController": false}, {"data": [[1.59635718E12, 102.0]], "isOverall": false, "label": "42.1 - Hacer clic en Actividades y Aplicar Pago-1", "isController": false}, {"data": [[1.59635718E12, 103.0]], "isOverall": false, "label": "42.1 - Hacer clic en Actividades y Aplicar Pago-0", "isController": false}, {"data": [[1.596357E12, 15419.875], [1.59635706E12, 14277.0]], "isOverall": false, "label": "21.1 - Clausulas Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635712E12, 4442.0], [1.59635706E12, 3178.2]], "isOverall": false, "label": "30.1 - Emitir Poliza ", "isController": false}, {"data": [[1.5963567E12, 4101.200000000001]], "isOverall": false, "label": "2.2 - Ingresar a INSIS", "isController": false}, {"data": [[1.59635712E12, 4023.5]], "isOverall": false, "label": "33.1 - Hacer clic en Actividades Nuevo", "isController": false}, {"data": [[1.5963567E12, 536.0]], "isOverall": false, "label": "T.4 - Seleccionar Control de Polizas", "isController": true}, {"data": [[1.5963567E12, 295.8]], "isOverall": false, "label": "4.1 - Seleccionar Control de Polizas", "isController": false}, {"data": [[1.596357E12, 442.0], [1.59635694E12, 484.77777777777777]], "isOverall": false, "label": "16.1 - Deducible Hacer clic en Siguiente -124", "isController": false}, {"data": [[1.59635712E12, 103.0], [1.59635718E12, 102.0]], "isOverall": false, "label": "44.2 - Cerrar Insis-1", "isController": false}, {"data": [[1.59635712E12, 99.0], [1.59635718E12, 138.5]], "isOverall": false, "label": "44.2 - Cerrar Insis-0", "isController": false}, {"data": [[1.59635688E12, 28822.555555555555], [1.59635694E12, 11986.0]], "isOverall": false, "label": "T.13 - En coberturas Hacer clic en Siguiente", "isController": true}, {"data": [[1.59635712E12, 7703.0], [1.59635706E12, 8991.888888888889]], "isOverall": false, "label": "T.25 - Facultatives Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635712E12, 1585.4], [1.59635706E12, 1496.4]], "isOverall": false, "label": "28.1 - Emitir Poliza Validacion", "isController": false}, {"data": [[1.59635712E12, 160.0], [1.59635718E12, 203.0]], "isOverall": false, "label": "42.4 - Hacer clic en Actividades y Aplicar Pago", "isController": false}, {"data": [[1.5963567E12, 452.7]], "isOverall": false, "label": "2.3 - Ingresar a INSIS", "isController": false}, {"data": [[1.5963567E12, 497.2], [1.59635676E12, 444.4]], "isOverall": false, "label": "6.5 - Buscar Id Cliente", "isController": false}, {"data": [[1.596357E12, 12673.5], [1.59635706E12, 10636.0]], "isOverall": false, "label": "T.22- Informacion del cliente Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635676E12, 1453.7]], "isOverall": false, "label": "T.7 - Presionar Buscar", "isController": true}, {"data": [[1.596357E12, 462.75], [1.59635706E12, 489.0]], "isOverall": false, "label": "21.2 - Clausulas Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635712E12, 575.8]], "isOverall": false, "label": "T.35 - ingresar el numero de poliza Buscar", "isController": true}, {"data": [[1.59635682E12, 50476.8], [1.59635676E12, 38209.2]], "isOverall": false, "label": "T.8 - Presionar Siguiente", "isController": true}, {"data": [[1.596357E12, 499.0], [1.59635706E12, 496.2222222222222]], "isOverall": false, "label": "23.2 - Claculo prima Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635712E12, 1559.0], [1.59635718E12, 2542.6]], "isOverall": false, "label": "T.41 - Hacer clic en Grabar", "isController": true}, {"data": [[1.59635706E12, 15193.099999999999]], "isOverall": false, "label": "T.24 - Plan de cuotas Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635712E12, 2778.9]], "isOverall": false, "label": "34.1 - ingresar el numero de poliza Buscar", "isController": false}, {"data": [[1.59635718E12, 102.0]], "isOverall": false, "label": "43.1 - Mensaje Operacion completada con exito-1", "isController": false}, {"data": [[1.59635712E12, 491.29999999999995]], "isOverall": false, "label": "33.2 - Hacer clic en Actividades Nuevo", "isController": false}, {"data": [[1.59635718E12, 102.0]], "isOverall": false, "label": "43.1 - Mensaje Operacion completada con exito-0", "isController": false}, {"data": [[1.59635688E12, 28282.444444444445], [1.59635694E12, 11470.0]], "isOverall": false, "label": "13.1 - En coberturas Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635712E12, 6369.333333333333], [1.59635706E12, 3525.0]], "isOverall": false, "label": "32.1 - Hacer clic en Pagos", "isController": false}, {"data": [[1.59635712E12, 99.0], [1.59635718E12, 138.5]], "isOverall": false, "label": "44.2 - Cerrar Insis", "isController": false}, {"data": [[1.59635682E12, 514.2], [1.59635676E12, 826.2]], "isOverall": false, "label": "8.2 - Presionar Siguiente", "isController": false}, {"data": [[1.59635712E12, 1585.4], [1.59635706E12, 1496.4]], "isOverall": false, "label": "T.28 - Emitir Poliza Validacion", "isController": true}, {"data": [[1.59635712E12, 4514.8]], "isOverall": false, "label": "T.33 - Hacer clic en Actividades Nuevo", "isController": true}, {"data": [[1.59635712E12, 4427.111111111111], [1.59635718E12, 5383.0]], "isOverall": false, "label": "T.37 -Hacer clic en Buscar", "isController": true}, {"data": [[1.5963567E12, 922.0], [1.59635676E12, 939.6]], "isOverall": false, "label": "6.6 - Buscar Id Cliente", "isController": false}, {"data": [[1.5963567E12, 507.75], [1.59635676E12, 463.0]], "isOverall": false, "label": "6.7 - Buscar Id Cliente", "isController": false}, {"data": [[1.5963567E12, 1067.5], [1.59635676E12, 569.6666666666666]], "isOverall": false, "label": "6.9 - Buscar Id Cliente Ok", "isController": false}, {"data": [[1.596357E12, 475.5], [1.59635694E12, 481.87500000000006]], "isOverall": false, "label": "18.2 - Documentos Objeto Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635712E12, 4024.7499999999995], [1.59635718E12, 6533.5]], "isOverall": false, "label": "T.38 - Hacer clic en Aceptar", "isController": true}, {"data": [[1.59635712E12, 772.5], [1.59635718E12, 3322.75]], "isOverall": false, "label": "40.2 - Hacer clic en OK", "isController": false}, {"data": [[1.59635712E12, 2155.1666666666665], [1.59635718E12, 2042.75]], "isOverall": false, "label": "40.1 - Hacer clic en OK", "isController": false}, {"data": [[1.59635712E12, 0.0], [1.59635718E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59635712E12, 3256.444444444444], [1.59635718E12, 3655.0]], "isOverall": false, "label": "37.2 -Hacer clic en Buscar", "isController": false}, {"data": [[1.59635712E12, 255.0], [1.59635706E12, 224.0]], "isOverall": false, "label": "32 .3- Hacer clic en Pagos", "isController": false}, {"data": [[1.59635712E12, 3543.8], [1.59635706E12, 3105.4]], "isOverall": false, "label": "T.27 - Emitir Poliza Calculo de Prima", "isController": true}, {"data": [[1.5963567E12, 240.2]], "isOverall": false, "label": "4.2 - Seleccionar Control de Polizas", "isController": false}, {"data": [[1.59635712E12, 4442.0], [1.59635706E12, 3178.2]], "isOverall": false, "label": "T.30 - Emitir Poliza ", "isController": true}, {"data": [[1.59635712E12, 7393.333333333333], [1.59635706E12, 4476.0]], "isOverall": false, "label": "T.32 - Hacer clic en Pagos", "isController": true}, {"data": [[1.596357E12, 14165.555555555555], [1.59635706E12, 17975.0]], "isOverall": false, "label": "20.1 - Impuestos Hacer clic en Siguiente ", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59635718E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.5963567E12, "maxY": 16637.25, "series": [{"data": [[1.59635712E12, 283.0], [1.59635706E12, 291.8888888888889]], "isOverall": false, "label": "25.2 - Facultatives Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 293.5], [1.59635718E12, 330.25]], "isOverall": false, "label": "39..2 - Ingresar la cantidad a pagar", "isController": false}, {"data": [[1.59635682E12, 0.0]], "isOverall": false, "label": "9.1 - En Poliza General Presionar Siguiente", "isController": false}, {"data": [[1.59635688E12, 303.5], [1.59635694E12, 313.25]], "isOverall": false, "label": "T.14 - Descuento Hacer clic en Siguiente ", "isController": true}, {"data": [[1.5963567E12, 144.66666666666666], [1.59635676E12, 0.0]], "isOverall": false, "label": "6.2 - Buscar Id Cliente", "isController": false}, {"data": [[1.59635712E12, 0.0]], "isOverall": false, "label": "36.1 - Hacer clic en el \u00EDcono de Buscar de Descripcion", "isController": false}, {"data": [[1.59635682E12, 242.66666666666666], [1.59635688E12, 290.25]], "isOverall": false, "label": "T.11 - Grabar Objeto Asegurado", "isController": true}, {"data": [[1.59635712E12, 288.44444444444446], [1.59635718E12, 279.0]], "isOverall": false, "label": "37.1 -Hacer clic en Buscar", "isController": false}, {"data": [[1.5963567E12, 337.0]], "isOverall": false, "label": "1.1 - Index", "isController": false}, {"data": [[1.59635712E12, 489.3]], "isOverall": false, "label": "T.34 - ingresar el numero de poliza Buscar", "isController": true}, {"data": [[1.5963567E12, 135.83333333333334], [1.59635676E12, 286.5]], "isOverall": false, "label": "6.3 - Buscar Id Cliente", "isController": false}, {"data": [[1.5963567E12, 0.0], [1.59635676E12, 0.0]], "isOverall": false, "label": "6.8 - Buscar Id Cliente Ok", "isController": false}, {"data": [[1.596357E12, 0.0], [1.59635694E12, 0.0]], "isOverall": false, "label": "T.15 - Deducible Hacer clic en Siguiente ", "isController": true}, {"data": [[1.5963567E12, 0.0], [1.59635676E12, 0.0]], "isOverall": false, "label": "5.3 - Seleccionar Actualizar Poliza", "isController": false}, {"data": [[1.596357E12, 298.0], [1.59635694E12, 304.6666666666667]], "isOverall": false, "label": "17.2 - Documentos Hacer clic en Siguiente ", "isController": false}, {"data": [[1.596357E12, 294.1111111111111], [1.59635694E12, 283.0]], "isOverall": false, "label": "T.19 - Comisiones Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635712E12, 282.0], [1.59635706E12, 289.4]], "isOverall": false, "label": "T.26 -  Ri PolizaHacer clic en Siguiente ", "isController": true}, {"data": [[1.59635712E12, 288.44444444444446], [1.59635706E12, 281.0]], "isOverall": false, "label": "32.2 - Hacer clic en Pagos", "isController": false}, {"data": [[1.59635676E12, 28.299999999999997]], "isOverall": false, "label": "7.1 - Presionar Buscar", "isController": false}, {"data": [[1.5963567E12, 332.5]], "isOverall": false, "label": "T.2 - Ingresar a INSIS", "isController": true}, {"data": [[1.59635712E12, 54.6], [1.59635706E12, 0.0]], "isOverall": false, "label": "T.29 - Emitir Poliza Confirmacion Pre emision", "isController": true}, {"data": [[1.59635712E12, 570.0], [1.59635718E12, 3325.2]], "isOverall": false, "label": "T. 40 - Hacer clic en OK", "isController": true}, {"data": [[1.59635712E12, 202.0]], "isOverall": false, "label": "34.2 - ingresar el numero de poliza Buscar", "isController": false}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "1.2 - Index-0", "isController": false}, {"data": [[1.59635688E12, 303.5], [1.59635694E12, 313.25]], "isOverall": false, "label": "14.2 - Descuento Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 0.0], [1.59635718E12, 0.0]], "isOverall": false, "label": "43.1 - Mensaje Operacion completada con exito", "isController": false}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "1.2 - Index-1", "isController": false}, {"data": [[1.59635712E12, 0.0], [1.59635718E12, 0.0]], "isOverall": false, "label": "T.43 - Mensaje Operacion completada con exito", "isController": true}, {"data": [[1.59635682E12, 292.99999999999994], [1.59635688E12, 287.5]], "isOverall": false, "label": "10.2 - En coberturas Hacer clic en Detalles", "isController": false}, {"data": [[1.5963567E12, 337.0]], "isOverall": false, "label": "T.1 - Index", "isController": true}, {"data": [[1.59635682E12, 577.2], [1.59635688E12, 424.25], [1.59635694E12, 604.0]], "isOverall": false, "label": "T.12 - Cerrar Objeto Asegurado", "isController": true}, {"data": [[1.59635682E12, 0.0], [1.59635688E12, 0.0]], "isOverall": false, "label": "10.1 - En coberturas Hacer clic en Detalles", "isController": false}, {"data": [[1.59635712E12, 0.0], [1.59635718E12, 0.0]], "isOverall": false, "label": "38.1 - Hacer clic en Aceptar", "isController": false}, {"data": [[1.59635712E12, 0.0], [1.59635706E12, 0.0]], "isOverall": false, "label": "32.4 - Hacer clic en Pagos", "isController": false}, {"data": [[1.59635712E12, 0.0]], "isOverall": false, "label": "35 - ingresar el numero de poliza Buscar", "isController": false}, {"data": [[1.5963567E12, 62.166666666666664], [1.59635676E12, 0.0]], "isOverall": false, "label": "6.4 - Buscar Id Cliente", "isController": false}, {"data": [[1.5963567E12, 300.0], [1.59635676E12, 81.42857142857143]], "isOverall": false, "label": "6.10 - Buscar Id Cliente Ok", "isController": false}, {"data": [[1.59635712E12, 0.0], [1.59635718E12, 113.75]], "isOverall": false, "label": "T.44 - Cerrar Insis", "isController": true}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "2.1 - Ingresar a INSIS", "isController": false}, {"data": [[1.59635712E12, 284.8], [1.59635706E12, 178.8]], "isOverall": false, "label": "27.1 - Emitir Poliza Calculo de Prima", "isController": false}, {"data": [[1.59635712E12, 286.5], [1.59635706E12, 289.75]], "isOverall": false, "label": "31.1 - Hacer clic en Facturaci\u00F3n y Cobranza", "isController": false}, {"data": [[1.59635712E12, 238.71428571428572], [1.59635706E12, 0.0]], "isOverall": false, "label": "31.2 - Hacer clic en Facturaci\u00F3n y Cobranza", "isController": false}, {"data": [[1.596357E12, 282.0], [1.59635706E12, 291.8888888888889]], "isOverall": false, "label": "T.23- Claculo prima Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635712E12, 0.0], [1.59635718E12, 334.0]], "isOverall": false, "label": "40.3- Hacer clic en OK", "isController": false}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "3.1 - Seleccionar Operaciones del Sistema", "isController": false}, {"data": [[1.59635682E12, 172.4], [1.59635688E12, 112.6]], "isOverall": false, "label": "12.1 - Cerrar Objeto Asegurado", "isController": false}, {"data": [[1.596357E12, 0.0], [1.59635706E12, 0.0]], "isOverall": false, "label": "22.1 - Informacion del cliente Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635682E12, 0.0], [1.59635688E12, 220.25]], "isOverall": false, "label": "11.2 - Grabar Objeto Asegurado", "isController": false}, {"data": [[1.596357E12, 294.1111111111111], [1.59635694E12, 283.0]], "isOverall": false, "label": "19.2 - Comisiones Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 139.5], [1.59635718E12, 0.0]], "isOverall": false, "label": "44.3 - Cerrar Insis-1", "isController": false}, {"data": [[1.59635718E12, 0.0]], "isOverall": false, "label": "42.2 - Hacer clic en Actividades y Aplicar Pago-1", "isController": false}, {"data": [[1.59635712E12, 589.1666666666667], [1.59635718E12, 636.25]], "isOverall": false, "label": "T.39 - Ingresar la cantidad a pagar", "isController": true}, {"data": [[1.59635712E12, 0.0], [1.59635718E12, 41.42857142857143]], "isOverall": false, "label": "44.1 - Cerrar Insis-2", "isController": false}, {"data": [[1.59635712E12, 0.0], [1.59635718E12, 36.5]], "isOverall": false, "label": "44.3 - Cerrar Insis-0", "isController": false}, {"data": [[1.59635718E12, 0.0]], "isOverall": false, "label": "42.2 - Hacer clic en Actividades y Aplicar Pago-0", "isController": false}, {"data": [[1.596357E12, 0.0], [1.59635694E12, 0.0]], "isOverall": false, "label": "15.1 - Deducible Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 524.7142857142858], [1.59635706E12, 292.0]], "isOverall": false, "label": "T.31 - Hacer clic en Facturaci\u00F3n y Cobranza", "isController": true}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "1.2 - Index", "isController": false}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "T.3 - Seleccionar Operaciones del Sistema", "isController": true}, {"data": [[1.59635682E12, 242.66666666666666], [1.59635688E12, 70.0]], "isOverall": false, "label": "11.1 - Grabar Objeto Asegurado", "isController": false}, {"data": [[1.5963567E12, 337.0]], "isOverall": false, "label": "1.1 - Index-0", "isController": false}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "1.1 - Index-1", "isController": false}, {"data": [[1.59635682E12, 115.0], [1.59635688E12, 0.0], [1.59635694E12, 296.0]], "isOverall": false, "label": "12.2 - Cerrar Objeto Asegurado", "isController": false}, {"data": [[1.59635712E12, 0.0], [1.59635718E12, 0.0]], "isOverall": false, "label": "41.1 - Hacer clic en Grabar", "isController": false}, {"data": [[1.59635676E12, 288.09999999999997]], "isOverall": false, "label": "7.2 - Presionar Buscar", "isController": false}, {"data": [[1.596357E12, 0.0], [1.59635694E12, 0.0]], "isOverall": false, "label": "17.1 - Documentos Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 0.0], [1.59635706E12, 0.0]], "isOverall": false, "label": "25.1 - Facultatives Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 282.0], [1.59635706E12, 289.4]], "isOverall": false, "label": "26.2 -  Ri PolizaHacer clic en Siguiente ", "isController": false}, {"data": [[1.59635718E12, 296.0]], "isOverall": false, "label": "42 - Hacer clic en Grabar-0", "isController": false}, {"data": [[1.59635718E12, 0.0]], "isOverall": false, "label": "42.3 - Hacer clic en Actividades y Aplicar Pago-0", "isController": false}, {"data": [[1.59635718E12, 0.0]], "isOverall": false, "label": "42 - Hacer clic en Grabar-1", "isController": false}, {"data": [[1.59635712E12, 287.29999999999995]], "isOverall": false, "label": "34.3 - ingresar el numero de poliza Buscar", "isController": false}, {"data": [[1.59635712E12, 146.5], [1.59635718E12, 1148.375]], "isOverall": false, "label": "42.2 - Hacer clic en Actividades y Aplicar Pago", "isController": false}, {"data": [[1.59635718E12, 0.0]], "isOverall": false, "label": "42.3 - Hacer clic en Actividades y Aplicar Pago-1", "isController": false}, {"data": [[1.59635712E12, 400.3333333333333], [1.59635718E12, 282.0]], "isOverall": false, "label": "37.3 -Hacer clic en Buscar", "isController": false}, {"data": [[1.59635706E12, 285.5]], "isOverall": false, "label": "24.2 - Plan de cuotas Hacer clic en Siguiente ", "isController": false}, {"data": [[1.596357E12, 298.0], [1.59635694E12, 304.6666666666667]], "isOverall": false, "label": "T.17 - Documentos Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635706E12, 0.0]], "isOverall": false, "label": "24.1 - Plan de cuotas Hacer clic en Siguiente ", "isController": false}, {"data": [[1.5963567E12, 0.0], [1.59635676E12, 0.0]], "isOverall": false, "label": "6.1 - Buscar Id Cliente", "isController": false}, {"data": [[1.596357E12, 0.0], [1.59635706E12, 0.0]], "isOverall": false, "label": "23.1 - Claculo prima Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635712E12, 0.0], [1.59635718E12, 36.5]], "isOverall": false, "label": "44.3 - Cerrar Insis", "isController": false}, {"data": [[1.59635682E12, 342.66666666666663], [1.59635688E12, 514.75]], "isOverall": false, "label": "T.10 - En coberturas Hacer clic en Detalles", "isController": true}, {"data": [[1.59635712E12, 289.4], [1.59635718E12, 1574.8]], "isOverall": false, "label": "42 - Hacer clic en Grabar", "isController": false}, {"data": [[1.596357E12, 292.5], [1.59635706E12, 304.5]], "isOverall": false, "label": "T.21 - Clausulas Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635718E12, 0.0]], "isOverall": false, "label": "42.4 - Hacer clic en Actividades y Aplicar Pago-0", "isController": false}, {"data": [[1.596357E12, 451.66666666666674], [1.59635706E12, 294.0]], "isOverall": false, "label": "T.20 - Impuestos Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635718E12, 0.0]], "isOverall": false, "label": "42.4 - Hacer clic en Actividades y Aplicar Pago-1", "isController": false}, {"data": [[1.5963567E12, 354.2857142857143], [1.59635676E12, 287.6666666666667]], "isOverall": false, "label": "5.2 - Seleccionar Actualizar Poliza", "isController": false}, {"data": [[1.59635712E12, 295.66666666666663], [1.59635718E12, 306.0]], "isOverall": false, "label": "39.1 - Ingresar la cantidad a pagar", "isController": false}, {"data": [[1.59635688E12, 288.77777777777777], [1.59635694E12, 305.0]], "isOverall": false, "label": "13.2 - En coberturas Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635712E12, 0.0], [1.59635718E12, 37.125]], "isOverall": false, "label": "43.4  - Cerrar Insis", "isController": false}, {"data": [[1.59635712E12, 54.6], [1.59635706E12, 0.0]], "isOverall": false, "label": "29.1 - Emitir Poliza Confirmacion Pre emision", "isController": false}, {"data": [[1.596357E12, 451.66666666666674], [1.59635706E12, 294.0]], "isOverall": false, "label": "20.2 - Impuestos Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 0.0]], "isOverall": false, "label": "T.36 - Hacer clic en el \u00EDcono de Buscar de Descripcion", "isController": true}, {"data": [[1.59635718E12, 1414.0]], "isOverall": false, "label": "40.2 - Hacer clic en OK-1", "isController": false}, {"data": [[1.59635718E12, 2082.0]], "isOverall": false, "label": "40.2 - Hacer clic en OK-0", "isController": false}, {"data": [[1.59635718E12, 0.0]], "isOverall": false, "label": "40.3- Hacer clic en OK-0", "isController": false}, {"data": [[1.59635682E12, 291.9]], "isOverall": false, "label": "T.9 - En Poliza General Presionar Siguiente", "isController": true}, {"data": [[1.59635718E12, 0.0]], "isOverall": false, "label": "40.3- Hacer clic en OK-1", "isController": false}, {"data": [[1.596357E12, 0.0], [1.59635694E12, 0.0]], "isOverall": false, "label": "19.1 - Comisiones Hacer clic en Siguiente ", "isController": false}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-0", "isController": false}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-1", "isController": false}, {"data": [[1.596357E12, 293.0], [1.59635694E12, 310.99999999999994]], "isOverall": false, "label": "T.18 - Documentos Objeto Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635682E12, 0.0], [1.59635676E12, 0.0]], "isOverall": false, "label": "8.1 - Presionar Siguiente", "isController": false}, {"data": [[1.596357E12, 291.33333333333337], [1.59635706E12, 295.75]], "isOverall": false, "label": "22.2 - Informacion del cliente Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635712E12, 0.0], [1.59635718E12, 49.333333333333336]], "isOverall": false, "label": "42.1 - Hacer clic en Actividades y Aplicar Pago", "isController": false}, {"data": [[1.5963567E12, 400.7142857142857], [1.59635676E12, 287.6666666666667]], "isOverall": false, "label": "T.5 - Seleccionar Actualizar Poliza", "isController": true}, {"data": [[1.59635712E12, 0.0], [1.59635718E12, 0.0]], "isOverall": false, "label": "44.1 - Cerrar Insis", "isController": false}, {"data": [[1.59635712E12, 0.0], [1.59635706E12, 0.0]], "isOverall": false, "label": "26.1 -  Ri PolizaHacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 12811.5], [1.59635718E12, 16637.25]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.5963567E12, 986.0], [1.59635676E12, 747.0]], "isOverall": false, "label": "T.6 - Buscar Id Cliente", "isController": true}, {"data": [[1.59635718E12, 0.0]], "isOverall": false, "label": "41.1 - Hacer clic en Grabar-1", "isController": false}, {"data": [[1.59635682E12, 291.9]], "isOverall": false, "label": "9.2 - En Poliza General Presionar Siguiente", "isController": false}, {"data": [[1.59635718E12, 0.0]], "isOverall": false, "label": "41.1 - Hacer clic en Grabar-0", "isController": false}, {"data": [[1.59635712E12, 0.0], [1.59635718E12, 0.0]], "isOverall": false, "label": "43.2 - Mensaje Operacion completada con exito", "isController": false}, {"data": [[1.59635688E12, 0.0], [1.59635694E12, 0.0]], "isOverall": false, "label": "14.1 - Descuento Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635712E12, 302.0], [1.59635718E12, 1331.125]], "isOverall": false, "label": "T.42 - Hacer clic en Actividades y Aplicar Pago", "isController": true}, {"data": [[1.596357E12, 302.0], [1.59635694E12, 303.44444444444446]], "isOverall": false, "label": "T.16 - Deducible Hacer clic en Siguiente ", "isController": true}, {"data": [[1.5963567E12, 46.42857142857142], [1.59635676E12, 0.0]], "isOverall": false, "label": "5.1 - Seleccionar Actualizar Poliza", "isController": false}, {"data": [[1.59635718E12, 0.0]], "isOverall": false, "label": "43.2 - Mensaje Operacion completada con exito-1", "isController": false}, {"data": [[1.596357E12, 0.0], [1.59635694E12, 0.0]], "isOverall": false, "label": "18.1 - Documentos Objeto Hacer clic en Siguiente ", "isController": false}, {"data": [[1.59635718E12, 0.0]], "isOverall": false, "label": "43.2 - Mensaje Operacion completada con exito-0", "isController": false}, {"data": [[1.59635682E12, 289.8], [1.59635688E12, 283.5], [1.59635694E12, 308.0]], "isOverall": false, "label": "12.3 - Cerrar Objeto Asegurado", "isController": false}, {"data": [[1.59635712E12, 155.5], [1.59635718E12, 72.5]], "isOverall": false, "label": "42.3 - Hacer clic en Actividades y Aplicar Pago", "isController": false}, {"data": [[1.59635682E12, 24.5], [1.59635688E12, 112.75]], "isOverall": false, "label": "10.3 - En coberturas Hacer clic en Detalles", "isController": false}, {"data": [[1.59635712E12, 149.0], [1.59635718E12, 74.625]], "isOverall": false, "label": "44.1 - Cerrar Insis-1", "isController": false}, {"data": [[1.59635712E12, 0.0], [1.59635718E12, 0.0]], "isOverall": false, "label": "44.1 - Cerrar Insis-0", "isController": false}, {"data": [[1.59635718E12, 0.0]], "isOverall": false, "label": "42.1 - Hacer clic en Actividades y Aplicar Pago-1", "isController": false}, {"data": [[1.59635718E12, 0.0]], "isOverall": false, "label": "42.1 - Hacer clic en Actividades y Aplicar Pago-0", "isController": false}, {"data": [[1.596357E12, 0.0], [1.59635706E12, 0.0]], "isOverall": false, "label": "21.1 - Clausulas Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635712E12, 283.8], [1.59635706E12, 289.6]], "isOverall": false, "label": "30.1 - Emitir Poliza ", "isController": false}, {"data": [[1.5963567E12, 34.1]], "isOverall": false, "label": "2.2 - Ingresar a INSIS", "isController": false}, {"data": [[1.59635712E12, 0.0]], "isOverall": false, "label": "33.1 - Hacer clic en Actividades Nuevo", "isController": false}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "T.4 - Seleccionar Control de Polizas", "isController": true}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "4.1 - Seleccionar Control de Polizas", "isController": false}, {"data": [[1.596357E12, 302.0], [1.59635694E12, 303.44444444444446]], "isOverall": false, "label": "16.1 - Deducible Hacer clic en Siguiente -124", "isController": false}, {"data": [[1.59635712E12, 0.0], [1.59635718E12, 0.0]], "isOverall": false, "label": "44.2 - Cerrar Insis-1", "isController": false}, {"data": [[1.59635712E12, 0.0], [1.59635718E12, 40.125]], "isOverall": false, "label": "44.2 - Cerrar Insis-0", "isController": false}, {"data": [[1.59635688E12, 288.77777777777777], [1.59635694E12, 584.0]], "isOverall": false, "label": "T.13 - En coberturas Hacer clic en Siguiente", "isController": true}, {"data": [[1.59635712E12, 283.0], [1.59635706E12, 291.8888888888889]], "isOverall": false, "label": "T.25 - Facultatives Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635712E12, 300.4], [1.59635706E12, 286.2]], "isOverall": false, "label": "28.1 - Emitir Poliza Validacion", "isController": false}, {"data": [[1.59635712E12, 0.0], [1.59635718E12, 73.25]], "isOverall": false, "label": "42.4 - Hacer clic en Actividades y Aplicar Pago", "isController": false}, {"data": [[1.5963567E12, 298.4]], "isOverall": false, "label": "2.3 - Ingresar a INSIS", "isController": false}, {"data": [[1.5963567E12, 60.0], [1.59635676E12, 58.2]], "isOverall": false, "label": "6.5 - Buscar Id Cliente", "isController": false}, {"data": [[1.596357E12, 291.33333333333337], [1.59635706E12, 295.75]], "isOverall": false, "label": "T.22- Informacion del cliente Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635676E12, 316.4]], "isOverall": false, "label": "T.7 - Presionar Buscar", "isController": true}, {"data": [[1.596357E12, 292.5], [1.59635706E12, 304.5]], "isOverall": false, "label": "21.2 - Clausulas Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635712E12, 0.0]], "isOverall": false, "label": "T.35 - ingresar el numero de poliza Buscar", "isController": true}, {"data": [[1.59635682E12, 288.0], [1.59635676E12, 510.6]], "isOverall": false, "label": "T.8 - Presionar Siguiente", "isController": true}, {"data": [[1.596357E12, 282.0], [1.59635706E12, 291.8888888888889]], "isOverall": false, "label": "23.2 - Claculo prima Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635712E12, 289.4], [1.59635718E12, 1574.8]], "isOverall": false, "label": "T.41 - Hacer clic en Grabar", "isController": true}, {"data": [[1.59635706E12, 285.5]], "isOverall": false, "label": "T.24 - Plan de cuotas Hacer clic en Siguiente ", "isController": true}, {"data": [[1.59635712E12, 0.0]], "isOverall": false, "label": "34.1 - ingresar el numero de poliza Buscar", "isController": false}, {"data": [[1.59635718E12, 0.0]], "isOverall": false, "label": "43.1 - Mensaje Operacion completada con exito-1", "isController": false}, {"data": [[1.59635712E12, 296.1]], "isOverall": false, "label": "33.2 - Hacer clic en Actividades Nuevo", "isController": false}, {"data": [[1.59635718E12, 0.0]], "isOverall": false, "label": "43.1 - Mensaje Operacion completada con exito-0", "isController": false}, {"data": [[1.59635688E12, 0.0], [1.59635694E12, 279.0]], "isOverall": false, "label": "13.1 - En coberturas Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635712E12, 62.44444444444444], [1.59635706E12, 0.0]], "isOverall": false, "label": "32.1 - Hacer clic en Pagos", "isController": false}, {"data": [[1.59635712E12, 0.0], [1.59635718E12, 40.125]], "isOverall": false, "label": "44.2 - Cerrar Insis", "isController": false}, {"data": [[1.59635682E12, 288.0], [1.59635676E12, 510.6]], "isOverall": false, "label": "8.2 - Presionar Siguiente", "isController": false}, {"data": [[1.59635712E12, 300.4], [1.59635706E12, 286.2]], "isOverall": false, "label": "T.28 - Emitir Poliza Validacion", "isController": true}, {"data": [[1.59635712E12, 296.1]], "isOverall": false, "label": "T.33 - Hacer clic en Actividades Nuevo", "isController": true}, {"data": [[1.59635712E12, 688.7777777777778], [1.59635718E12, 561.0]], "isOverall": false, "label": "T.37 -Hacer clic en Buscar", "isController": true}, {"data": [[1.5963567E12, 0.0], [1.59635676E12, 0.0]], "isOverall": false, "label": "6.6 - Buscar Id Cliente", "isController": false}, {"data": [[1.5963567E12, 215.5], [1.59635676E12, 294.8333333333333]], "isOverall": false, "label": "6.7 - Buscar Id Cliente", "isController": false}, {"data": [[1.5963567E12, 73.25], [1.59635676E12, 0.0]], "isOverall": false, "label": "6.9 - Buscar Id Cliente Ok", "isController": false}, {"data": [[1.596357E12, 293.0], [1.59635694E12, 310.99999999999994]], "isOverall": false, "label": "18.2 - Documentos Objeto Hacer clic en Siguiente", "isController": false}, {"data": [[1.59635712E12, 0.0], [1.59635718E12, 0.0]], "isOverall": false, "label": "T.38 - Hacer clic en Aceptar", "isController": true}, {"data": [[1.59635712E12, 619.8333333333333], [1.59635718E12, 2939.0]], "isOverall": false, "label": "40.2 - Hacer clic en OK", "isController": false}, {"data": [[1.59635712E12, 239.16666666666666], [1.59635718E12, 224.0]], "isOverall": false, "label": "40.1 - Hacer clic en OK", "isController": false}, {"data": [[1.59635712E12, 0.0], [1.59635718E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59635712E12, 0.0], [1.59635718E12, 0.0]], "isOverall": false, "label": "37.2 -Hacer clic en Buscar", "isController": false}, {"data": [[1.59635712E12, 0.0], [1.59635706E12, 0.0]], "isOverall": false, "label": "32 .3- Hacer clic en Pagos", "isController": false}, {"data": [[1.59635712E12, 284.8], [1.59635706E12, 178.8]], "isOverall": false, "label": "T.27 - Emitir Poliza Calculo de Prima", "isController": true}, {"data": [[1.5963567E12, 0.0]], "isOverall": false, "label": "4.2 - Seleccionar Control de Polizas", "isController": false}, {"data": [[1.59635712E12, 283.8], [1.59635706E12, 289.6]], "isOverall": false, "label": "T.30 - Emitir Poliza ", "isController": true}, {"data": [[1.59635712E12, 350.8888888888889], [1.59635706E12, 281.0]], "isOverall": false, "label": "T.32 - Hacer clic en Pagos", "isController": true}, {"data": [[1.596357E12, 0.0], [1.59635706E12, 0.0]], "isOverall": false, "label": "20.1 - Impuestos Hacer clic en Siguiente ", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59635718E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.5963567E12, "maxY": 56083.0, "series": [{"data": [[1.59635682E12, 56083.0], [1.59635712E12, 13488.0], [1.5963567E12, 18190.0], [1.59635718E12, 16788.0], [1.596357E12, 19937.0], [1.59635706E12, 21712.0], [1.59635688E12, 35395.0], [1.59635694E12, 47583.0], [1.59635676E12, 48223.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.59635682E12, 288.0], [1.59635712E12, 0.0], [1.5963567E12, 95.0], [1.59635718E12, 0.0], [1.596357E12, 450.0], [1.59635706E12, 226.0], [1.59635688E12, 388.0], [1.59635694E12, 436.0], [1.59635676E12, 176.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.59635682E12, 47754.4], [1.59635712E12, 4944.7], [1.5963567E12, 1321.1000000000001], [1.59635718E12, 3148.000000000001], [1.596357E12, 17390.4], [1.59635706E12, 16889.800000000003], [1.59635688E12, 31262.8], [1.59635694E12, 24891.000000000004], [1.59635676E12, 15546.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.59635682E12, 56083.0], [1.59635712E12, 12126.74999999999], [1.5963567E12, 16336.13], [1.59635718E12, 15815.840000000011], [1.596357E12, 19937.0], [1.59635706E12, 21636.54], [1.59635688E12, 35395.0], [1.59635694E12, 47583.0], [1.59635676E12, 48223.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.59635682E12, 50264.3], [1.59635712E12, 7033.399999999998], [1.5963567E12, 6370.499999999999], [1.59635718E12, 7012.399999999997], [1.596357E12, 18058.600000000002], [1.59635706E12, 19444.899999999998], [1.59635688E12, 33048.99999999999], [1.59635694E12, 41343.49999999999], [1.59635676E12, 39832.39999999999]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59635718E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 139.5, "minX": 1.0, "maxY": 1724.0, "series": [{"data": [[2.0, 1523.5], [8.0, 577.0], [9.0, 383.0], [10.0, 585.0], [11.0, 191.0], [12.0, 321.0], [3.0, 1325.0], [13.0, 221.0], [15.0, 196.0], [16.0, 198.0], [4.0, 1093.5], [1.0, 1724.0], [18.0, 139.5], [5.0, 610.0], [6.0, 651.0], [7.0, 744.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 18.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 101.5, "minX": 1.0, "maxY": 1144.5, "series": [{"data": [[2.0, 1144.5], [8.0, 481.0], [9.0, 272.0], [10.0, 541.5], [11.0, 142.0], [12.0, 205.5], [3.0, 863.0], [13.0, 173.0], [15.0, 113.0], [16.0, 105.5], [4.0, 931.5], [1.0, 1131.0], [18.0, 101.5], [5.0, 570.5], [6.0, 551.5], [7.0, 686.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 18.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.9166666666666666, "minX": 1.5963567E12, "maxY": 4.3, "series": [{"data": [[1.59635682E12, 1.4166666666666667], [1.59635712E12, 4.3], [1.5963567E12, 3.6666666666666665], [1.59635718E12, 3.15], [1.596357E12, 1.25], [1.59635706E12, 1.8833333333333333], [1.59635688E12, 0.9166666666666666], [1.59635694E12, 1.2166666666666666], [1.59635676E12, 1.5166666666666666]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59635718E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.13333333333333333, "minX": 1.5963567E12, "maxY": 4.2, "series": [{"data": [[1.59635682E12, 1.4166666666666667], [1.59635712E12, 4.2], [1.5963567E12, 3.0], [1.59635718E12, 2.6], [1.596357E12, 1.25], [1.59635706E12, 1.8833333333333333], [1.59635688E12, 0.9166666666666666], [1.59635694E12, 1.2166666666666666], [1.59635676E12, 1.5166666666666666]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.59635712E12, 0.13333333333333333], [1.5963567E12, 0.5], [1.59635718E12, 0.6833333333333333]], "isOverall": false, "label": "302", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59635718E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.5963567E12, "maxY": 0.2, "series": [{"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "2.3 - Ingresar a INSIS-success", "isController": false}, {"data": [[1.5963567E12, 0.05], [1.59635676E12, 0.11666666666666667]], "isOverall": false, "label": "T.6 - Buscar Id Cliente-success", "isController": true}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "T.24 - Plan de cuotas Hacer clic en Siguiente -success", "isController": true}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "1.1 - Index-0-success", "isController": false}, {"data": [[1.59635712E12, 0.03333333333333333], [1.59635718E12, 0.11666666666666667]], "isOverall": false, "label": "44.1 - Cerrar Insis-2-success", "isController": false}, {"data": [[1.596357E12, 0.016666666666666666], [1.59635694E12, 0.15]], "isOverall": false, "label": "17.2 - Documentos Hacer clic en Siguiente -success", "isController": false}, {"data": [[1.596357E12, 0.15], [1.59635706E12, 0.016666666666666666]], "isOverall": false, "label": "20.1 - Impuestos Hacer clic en Siguiente -success", "isController": false}, {"data": [[1.59635682E12, 0.2], [1.59635688E12, 0.13333333333333333]], "isOverall": false, "label": "10.3 - En coberturas Hacer clic en Detalles-success", "isController": false}, {"data": [[1.59635712E12, 0.16666666666666666]], "isOverall": false, "label": "33.1 - Hacer clic en Actividades Nuevo-success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-0-success", "isController": false}, {"data": [[1.5963567E12, 0.05], [1.59635676E12, 0.11666666666666667]], "isOverall": false, "label": "6.10 - Buscar Id Cliente Ok-success", "isController": false}, {"data": [[1.596357E12, 0.016666666666666666], [1.59635694E12, 0.15]], "isOverall": false, "label": "T.17 - Documentos Hacer clic en Siguiente -success", "isController": true}, {"data": [[1.596357E12, 0.016666666666666666], [1.59635706E12, 0.15]], "isOverall": false, "label": "23.1 - Claculo prima Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.596357E12, 0.016666666666666666], [1.59635706E12, 0.15]], "isOverall": false, "label": "T.23- Claculo prima Hacer clic en Siguiente -success", "isController": true}, {"data": [[1.59635712E12, 0.06666666666666667], [1.59635718E12, 0.1]], "isOverall": false, "label": "42.1 - Hacer clic en Actividades y Aplicar Pago-success", "isController": false}, {"data": [[1.59635718E12, 0.016666666666666666]], "isOverall": false, "label": "43.1 - Mensaje Operacion completada con exito-1-success", "isController": false}, {"data": [[1.5963567E12, 0.1], [1.59635676E12, 0.06666666666666667]], "isOverall": false, "label": "6.3 - Buscar Id Cliente-success", "isController": false}, {"data": [[1.59635712E12, 0.08333333333333333], [1.59635706E12, 0.08333333333333333]], "isOverall": false, "label": "T.29 - Emitir Poliza Confirmacion Pre emision-success", "isController": true}, {"data": [[1.596357E12, 0.13333333333333333], [1.59635706E12, 0.03333333333333333]], "isOverall": false, "label": "21.1 - Clausulas Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635712E12, 0.08333333333333333], [1.59635706E12, 0.08333333333333333]], "isOverall": false, "label": "28.1 - Emitir Poliza Validacion-success", "isController": false}, {"data": [[1.59635682E12, 0.13333333333333333], [1.59635688E12, 0.03333333333333333]], "isOverall": false, "label": "10.2 - En coberturas Hacer clic en Detalles-success", "isController": false}, {"data": [[1.596357E12, 0.03333333333333333], [1.59635694E12, 0.13333333333333333]], "isOverall": false, "label": "T.18 - Documentos Objeto Hacer clic en Siguiente -success", "isController": true}, {"data": [[1.59635682E12, 0.1], [1.59635688E12, 0.06666666666666667]], "isOverall": false, "label": "11.2 - Grabar Objeto Asegurado-success", "isController": false}, {"data": [[1.5963567E12, 0.06666666666666667], [1.59635676E12, 0.1]], "isOverall": false, "label": "6.8 - Buscar Id Cliente Ok-success", "isController": false}, {"data": [[1.596357E12, 0.016666666666666666], [1.59635694E12, 0.15]], "isOverall": false, "label": "T.15 - Deducible Hacer clic en Siguiente -success", "isController": true}, {"data": [[1.596357E12, 0.1], [1.59635706E12, 0.06666666666666667]], "isOverall": false, "label": "22.2 - Informacion del cliente Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635676E12, 0.16666666666666666]], "isOverall": false, "label": "7.2 - Presionar Buscar-success", "isController": false}, {"data": [[1.59635712E12, 0.016666666666666666], [1.59635706E12, 0.15]], "isOverall": false, "label": "T.25 - Facultatives Hacer clic en Siguiente -success", "isController": true}, {"data": [[1.59635718E12, 0.016666666666666666]], "isOverall": false, "label": "42 - Hacer clic en Grabar-0-success", "isController": false}, {"data": [[1.59635682E12, 0.08333333333333333], [1.59635676E12, 0.08333333333333333]], "isOverall": false, "label": "8.2 - Presionar Siguiente-success", "isController": false}, {"data": [[1.596357E12, 0.15], [1.59635694E12, 0.016666666666666666]], "isOverall": false, "label": "19.2 - Comisiones Hacer clic en Siguiente -success", "isController": false}, {"data": [[1.59635712E12, 0.08333333333333333], [1.59635706E12, 0.08333333333333333]], "isOverall": false, "label": "T.30 - Emitir Poliza -success", "isController": true}, {"data": [[1.59635712E12, 0.08333333333333333], [1.59635706E12, 0.08333333333333333]], "isOverall": false, "label": "29.1 - Emitir Poliza Confirmacion Pre emision-success", "isController": false}, {"data": [[1.5963567E12, 0.06666666666666667], [1.59635676E12, 0.1]], "isOverall": false, "label": "6.7 - Buscar Id Cliente-success", "isController": false}, {"data": [[1.59635712E12, 0.03333333333333333], [1.59635718E12, 0.13333333333333333]], "isOverall": false, "label": "44.3 - Cerrar Insis-0-success", "isController": false}, {"data": [[1.59635718E12, 0.016666666666666666]], "isOverall": false, "label": "42.2 - Hacer clic en Actividades y Aplicar Pago-0-success", "isController": false}, {"data": [[1.59635712E12, 0.03333333333333333], [1.59635718E12, 0.13333333333333333]], "isOverall": false, "label": "42.3 - Hacer clic en Actividades y Aplicar Pago-success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "1.2 - Index-success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "T.3 - Seleccionar Operaciones del Sistema-success", "isController": true}, {"data": [[1.59635688E12, 0.15], [1.59635694E12, 0.016666666666666666]], "isOverall": false, "label": "13.2 - En coberturas Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635712E12, 0.16666666666666666]], "isOverall": false, "label": "T.33 - Hacer clic en Actividades Nuevo-success", "isController": true}, {"data": [[1.59635712E12, 0.1], [1.59635718E12, 0.06666666666666667]], "isOverall": false, "label": "40.1 - Hacer clic en OK-success", "isController": false}, {"data": [[1.59635712E12, 0.03333333333333333], [1.59635718E12, 0.13333333333333333]], "isOverall": false, "label": "43.4  - Cerrar Insis-success", "isController": false}, {"data": [[1.59635682E12, 0.1], [1.59635688E12, 0.06666666666666667]], "isOverall": false, "label": "11.1 - Grabar Objeto Asegurado-success", "isController": false}, {"data": [[1.596357E12, 0.016666666666666666], [1.59635694E12, 0.15]], "isOverall": false, "label": "17.1 - Documentos Hacer clic en Siguiente -success", "isController": false}, {"data": [[1.59635712E12, 0.08333333333333333], [1.59635718E12, 0.08333333333333333]], "isOverall": false, "label": "T.41 - Hacer clic en Grabar-success", "isController": true}, {"data": [[1.59635712E12, 0.03333333333333333], [1.59635718E12, 0.13333333333333333]], "isOverall": false, "label": "44.1 - Cerrar Insis-success", "isController": false}, {"data": [[1.59635682E12, 0.16666666666666666]], "isOverall": false, "label": "9.2 - En Poliza General Presionar Siguiente-success", "isController": false}, {"data": [[1.596357E12, 0.13333333333333333], [1.59635706E12, 0.03333333333333333]], "isOverall": false, "label": "T.21 - Clausulas Hacer clic en Siguiente -success", "isController": true}, {"data": [[1.596357E12, 0.13333333333333333], [1.59635706E12, 0.03333333333333333]], "isOverall": false, "label": "21.2 - Clausulas Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "1.2 - Index-0-success", "isController": false}, {"data": [[1.596357E12, 0.03333333333333333], [1.59635694E12, 0.13333333333333333]], "isOverall": false, "label": "18.2 - Documentos Objeto Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635718E12, 0.016666666666666666]], "isOverall": false, "label": "42.4 - Hacer clic en Actividades y Aplicar Pago-0-success", "isController": false}, {"data": [[1.596357E12, 0.03333333333333333], [1.59635694E12, 0.13333333333333333]], "isOverall": false, "label": "18.1 - Documentos Objeto Hacer clic en Siguiente -success", "isController": false}, {"data": [[1.59635712E12, 0.03333333333333333], [1.59635718E12, 0.13333333333333333]], "isOverall": false, "label": "T.42 - Hacer clic en Actividades y Aplicar Pago-success", "isController": true}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "1.1 - Index-1-success", "isController": false}, {"data": [[1.59635682E12, 0.16666666666666666]], "isOverall": false, "label": "T.9 - En Poliza General Presionar Siguiente-success", "isController": true}, {"data": [[1.59635712E12, 0.16666666666666666]], "isOverall": false, "label": "34.1 - ingresar el numero de poliza Buscar-success", "isController": false}, {"data": [[1.59635712E12, 0.08333333333333333], [1.59635706E12, 0.08333333333333333]], "isOverall": false, "label": "30.1 - Emitir Poliza -success", "isController": false}, {"data": [[1.59635712E12, 0.08333333333333333], [1.59635718E12, 0.08333333333333333]], "isOverall": false, "label": "40.3- Hacer clic en OK-success", "isController": false}, {"data": [[1.59635712E12, 0.15], [1.59635706E12, 0.016666666666666666]], "isOverall": false, "label": "32.4 - Hacer clic en Pagos-success", "isController": false}, {"data": [[1.59635712E12, 0.15], [1.59635718E12, 0.016666666666666666]], "isOverall": false, "label": "37.1 -Hacer clic en Buscar-success", "isController": false}, {"data": [[1.59635712E12, 0.08333333333333333], [1.59635718E12, 0.08333333333333333]], "isOverall": false, "label": "41.1 - Hacer clic en Grabar-success", "isController": false}, {"data": [[1.59635712E12, 0.03333333333333333], [1.59635718E12, 0.13333333333333333]], "isOverall": false, "label": "44.2 - Cerrar Insis-success", "isController": false}, {"data": [[1.59635688E12, 0.03333333333333333], [1.59635694E12, 0.13333333333333333]], "isOverall": false, "label": "14.2 - Descuento Hacer clic en Siguiente -success", "isController": false}, {"data": [[1.596357E12, 0.15], [1.59635706E12, 0.016666666666666666]], "isOverall": false, "label": "20.2 - Impuestos Hacer clic en Siguiente -success", "isController": false}, {"data": [[1.59635718E12, 0.016666666666666666]], "isOverall": false, "label": "40.2 - Hacer clic en OK-0-success", "isController": false}, {"data": [[1.59635718E12, 0.016666666666666666]], "isOverall": false, "label": "43.2 - Mensaje Operacion completada con exito-0-success", "isController": false}, {"data": [[1.5963567E12, 0.08333333333333333], [1.59635676E12, 0.08333333333333333]], "isOverall": false, "label": "6.6 - Buscar Id Cliente-success", "isController": false}, {"data": [[1.59635712E12, 0.08333333333333333], [1.59635706E12, 0.08333333333333333]], "isOverall": false, "label": "T.28 - Emitir Poliza Validacion-success", "isController": true}, {"data": [[1.5963567E12, 0.11666666666666667], [1.59635676E12, 0.05]], "isOverall": false, "label": "5.2 - Seleccionar Actualizar Poliza-success", "isController": false}, {"data": [[1.59635712E12, 0.03333333333333333], [1.59635718E12, 0.13333333333333333]], "isOverall": false, "label": "Transaction Controller-success", "isController": true}, {"data": [[1.59635712E12, 0.03333333333333333], [1.59635718E12, 0.13333333333333333]], "isOverall": false, "label": "42.4 - Hacer clic en Actividades y Aplicar Pago-success", "isController": false}, {"data": [[1.59635712E12, 0.11666666666666667], [1.59635706E12, 0.05]], "isOverall": false, "label": "31.2 - Hacer clic en Facturaci\u00F3n y Cobranza-success", "isController": false}, {"data": [[1.59635712E12, 0.16666666666666666]], "isOverall": false, "label": "35 - ingresar el numero de poliza Buscar-success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "4.2 - Seleccionar Control de Polizas-success", "isController": false}, {"data": [[1.59635712E12, 0.03333333333333333], [1.59635718E12, 0.13333333333333333]], "isOverall": false, "label": "44.3 - Cerrar Insis-success", "isController": false}, {"data": [[1.59635688E12, 0.05], [1.59635694E12, 0.11666666666666667]], "isOverall": false, "label": "14.1 - Descuento Hacer clic en Siguiente -success", "isController": false}, {"data": [[1.59635718E12, 0.016666666666666666]], "isOverall": false, "label": "42.1 - Hacer clic en Actividades y Aplicar Pago-0-success", "isController": false}, {"data": [[1.59635718E12, 0.016666666666666666]], "isOverall": false, "label": "42.2 - Hacer clic en Actividades y Aplicar Pago-1-success", "isController": false}, {"data": [[1.59635712E12, 0.03333333333333333], [1.59635718E12, 0.13333333333333333]], "isOverall": false, "label": "43.1 - Mensaje Operacion completada con exito-success", "isController": false}, {"data": [[1.59635712E12, 0.08333333333333333], [1.59635706E12, 0.08333333333333333]], "isOverall": false, "label": "27.1 - Emitir Poliza Calculo de Prima-success", "isController": false}, {"data": [[1.59635712E12, 0.16666666666666666]], "isOverall": false, "label": "T.34 - ingresar el numero de poliza Buscar-success", "isController": true}, {"data": [[1.59635718E12, 0.016666666666666666]], "isOverall": false, "label": "40.3- Hacer clic en OK-1-success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-1-success", "isController": false}, {"data": [[1.59635712E12, 0.016666666666666666], [1.59635706E12, 0.15]], "isOverall": false, "label": "25.1 - Facultatives Hacer clic en Siguiente -success", "isController": false}, {"data": [[1.59635682E12, 0.08333333333333333], [1.59635688E12, 0.06666666666666667], [1.59635694E12, 0.016666666666666666]], "isOverall": false, "label": "12.3 - Cerrar Objeto Asegurado-success", "isController": false}, {"data": [[1.59635712E12, 0.15], [1.59635718E12, 0.016666666666666666]], "isOverall": false, "label": "37.2 -Hacer clic en Buscar-success", "isController": false}, {"data": [[1.59635712E12, 0.08333333333333333], [1.59635718E12, 0.08333333333333333]], "isOverall": false, "label": "42 - Hacer clic en Grabar-success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "3.1 - Seleccionar Operaciones del Sistema-success", "isController": false}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "24.1 - Plan de cuotas Hacer clic en Siguiente -success", "isController": false}, {"data": [[1.59635718E12, 0.016666666666666666]], "isOverall": false, "label": "42 - Hacer clic en Grabar-1-success", "isController": false}, {"data": [[1.596357E12, 0.15], [1.59635706E12, 0.016666666666666666]], "isOverall": false, "label": "T.20 - Impuestos Hacer clic en Siguiente -success", "isController": true}, {"data": [[1.59635712E12, 0.13333333333333333], [1.59635718E12, 0.03333333333333333]], "isOverall": false, "label": "38.1 - Hacer clic en Aceptar-success", "isController": false}, {"data": [[1.59635712E12, 0.1], [1.59635718E12, 0.06666666666666667]], "isOverall": false, "label": "39.1 - Ingresar la cantidad a pagar-success", "isController": false}, {"data": [[1.5963567E12, 0.11666666666666667], [1.59635676E12, 0.05]], "isOverall": false, "label": "5.3 - Seleccionar Actualizar Poliza-success", "isController": false}, {"data": [[1.59635712E12, 0.08333333333333333], [1.59635706E12, 0.08333333333333333]], "isOverall": false, "label": "26.2 -  Ri PolizaHacer clic en Siguiente -success", "isController": false}, {"data": [[1.59635712E12, 0.16666666666666666]], "isOverall": false, "label": "34.2 - ingresar el numero de poliza Buscar-success", "isController": false}, {"data": [[1.5963567E12, 0.08333333333333333], [1.59635676E12, 0.08333333333333333]], "isOverall": false, "label": "6.5 - Buscar Id Cliente-success", "isController": false}, {"data": [[1.59635712E12, 0.16666666666666666]], "isOverall": false, "label": "33.2 - Hacer clic en Actividades Nuevo-success", "isController": false}, {"data": [[1.59635676E12, 0.16666666666666666]], "isOverall": false, "label": "7.1 - Presionar Buscar-success", "isController": false}, {"data": [[1.59635712E12, 0.08333333333333333], [1.59635706E12, 0.08333333333333333]], "isOverall": false, "label": "T.27 - Emitir Poliza Calculo de Prima-success", "isController": true}, {"data": [[1.59635712E12, 0.1], [1.59635706E12, 0.06666666666666667]], "isOverall": false, "label": "31.1 - Hacer clic en Facturaci\u00F3n y Cobranza-success", "isController": false}, {"data": [[1.59635712E12, 0.016666666666666666], [1.59635706E12, 0.15]], "isOverall": false, "label": "25.2 - Facultatives Hacer clic en Siguiente -success", "isController": false}, {"data": [[1.59635712E12, 0.1], [1.59635718E12, 0.06666666666666667]], "isOverall": false, "label": "40.2 - Hacer clic en OK-success", "isController": false}, {"data": [[1.59635712E12, 0.03333333333333333], [1.59635718E12, 0.13333333333333333]], "isOverall": false, "label": "43.2 - Mensaje Operacion completada con exito-success", "isController": false}, {"data": [[1.59635712E12, 0.03333333333333333], [1.59635718E12, 0.13333333333333333]], "isOverall": false, "label": "42.2 - Hacer clic en Actividades y Aplicar Pago-success", "isController": false}, {"data": [[1.59635712E12, 0.03333333333333333], [1.59635718E12, 0.13333333333333333]], "isOverall": false, "label": "44.2 - Cerrar Insis-1-success", "isController": false}, {"data": [[1.596357E12, 0.11666666666666667], [1.59635706E12, 0.05]], "isOverall": false, "label": "22.1 - Informacion del cliente Hacer clic en Siguiente -success", "isController": false}, {"data": [[1.59635682E12, 0.08333333333333333], [1.59635676E12, 0.08333333333333333]], "isOverall": false, "label": "T.8 - Presionar Siguiente-success", "isController": true}, {"data": [[1.59635712E12, 0.15], [1.59635706E12, 0.016666666666666666]], "isOverall": false, "label": "32.2 - Hacer clic en Pagos-success", "isController": false}, {"data": [[1.59635712E12, 0.03333333333333333], [1.59635718E12, 0.13333333333333333]], "isOverall": false, "label": "44.1 - Cerrar Insis-0-success", "isController": false}, {"data": [[1.59635718E12, 0.016666666666666666]], "isOverall": false, "label": "43.2 - Mensaje Operacion completada con exito-1-success", "isController": false}, {"data": [[1.59635712E12, 0.15], [1.59635718E12, 0.016666666666666666]], "isOverall": false, "label": "37.3 -Hacer clic en Buscar-success", "isController": false}, {"data": [[1.59635712E12, 0.16666666666666666]], "isOverall": false, "label": "T.36 - Hacer clic en el \u00EDcono de Buscar de Descripcion-success", "isController": true}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "T.2 - Ingresar a INSIS-success", "isController": true}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "T.1 - Index-success", "isController": true}, {"data": [[1.59635682E12, 0.08333333333333333], [1.59635688E12, 0.08333333333333333]], "isOverall": false, "label": "12.1 - Cerrar Objeto Asegurado-success", "isController": false}, {"data": [[1.59635718E12, 0.016666666666666666]], "isOverall": false, "label": "42.1 - Hacer clic en Actividades y Aplicar Pago-1-success", "isController": false}, {"data": [[1.59635712E12, 0.03333333333333333], [1.59635706E12, 0.13333333333333333]], "isOverall": false, "label": "26.1 -  Ri PolizaHacer clic en Siguiente -success", "isController": false}, {"data": [[1.59635682E12, 0.1], [1.59635688E12, 0.06666666666666667]], "isOverall": false, "label": "T.10 - En coberturas Hacer clic en Detalles-success", "isController": true}, {"data": [[1.59635718E12, 0.016666666666666666]], "isOverall": false, "label": "42.3 - Hacer clic en Actividades y Aplicar Pago-1-success", "isController": false}, {"data": [[1.59635682E12, 0.1], [1.59635688E12, 0.06666666666666667]], "isOverall": false, "label": "T.11 - Grabar Objeto Asegurado-success", "isController": true}, {"data": [[1.59635688E12, 0.15], [1.59635694E12, 0.016666666666666666]], "isOverall": false, "label": "T.13 - En coberturas Hacer clic en Siguiente-success", "isController": true}, {"data": [[1.59635712E12, 0.1], [1.59635718E12, 0.06666666666666667]], "isOverall": false, "label": "T.39 - Ingresar la cantidad a pagar-success", "isController": true}, {"data": [[1.59635712E12, 0.08333333333333333], [1.59635718E12, 0.08333333333333333]], "isOverall": false, "label": "T. 40 - Hacer clic en OK-success", "isController": true}, {"data": [[1.5963567E12, 0.06666666666666667], [1.59635676E12, 0.1]], "isOverall": false, "label": "6.9 - Buscar Id Cliente Ok-success", "isController": false}, {"data": [[1.59635706E12, 0.16666666666666666]], "isOverall": false, "label": "24.2 - Plan de cuotas Hacer clic en Siguiente -success", "isController": false}, {"data": [[1.59635718E12, 0.016666666666666666]], "isOverall": false, "label": "40.2 - Hacer clic en OK-1-success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "2.2 - Ingresar a INSIS-success", "isController": false}, {"data": [[1.59635712E12, 0.08333333333333333], [1.59635706E12, 0.08333333333333333]], "isOverall": false, "label": "T.26 -  Ri PolizaHacer clic en Siguiente -success", "isController": true}, {"data": [[1.59635688E12, 0.15], [1.59635694E12, 0.016666666666666666]], "isOverall": false, "label": "13.1 - En coberturas Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635712E12, 0.03333333333333333], [1.59635718E12, 0.13333333333333333]], "isOverall": false, "label": "T.43 - Mensaje Operacion completada con exito-success", "isController": true}, {"data": [[1.5963567E12, 0.11666666666666667], [1.59635676E12, 0.05]], "isOverall": false, "label": "T.5 - Seleccionar Actualizar Poliza-success", "isController": true}, {"data": [[1.596357E12, 0.15], [1.59635694E12, 0.016666666666666666]], "isOverall": false, "label": "T.19 - Comisiones Hacer clic en Siguiente -success", "isController": true}, {"data": [[1.59635712E12, 0.16666666666666666]], "isOverall": false, "label": "T.35 - ingresar el numero de poliza Buscar-success", "isController": true}, {"data": [[1.59635718E12, 0.016666666666666666]], "isOverall": false, "label": "40.3- Hacer clic en OK-0-success", "isController": false}, {"data": [[1.5963567E12, 0.1], [1.59635676E12, 0.06666666666666667]], "isOverall": false, "label": "6.1 - Buscar Id Cliente-success", "isController": false}, {"data": [[1.59635712E12, 0.16666666666666666]], "isOverall": false, "label": "36.1 - Hacer clic en el \u00EDcono de Buscar de Descripcion-success", "isController": false}, {"data": [[1.5963567E12, 0.1], [1.59635676E12, 0.06666666666666667]], "isOverall": false, "label": "6.4 - Buscar Id Cliente-success", "isController": false}, {"data": [[1.59635682E12, 0.16666666666666666]], "isOverall": false, "label": "9.1 - En Poliza General Presionar Siguiente-success", "isController": false}, {"data": [[1.59635718E12, 0.016666666666666666]], "isOverall": false, "label": "41.1 - Hacer clic en Grabar-1-success", "isController": false}, {"data": [[1.59635712E12, 0.15], [1.59635706E12, 0.016666666666666666]], "isOverall": false, "label": "32 .3- Hacer clic en Pagos-success", "isController": false}, {"data": [[1.5963567E12, 0.11666666666666667], [1.59635676E12, 0.05]], "isOverall": false, "label": "5.1 - Seleccionar Actualizar Poliza-success", "isController": false}, {"data": [[1.59635712E12, 0.15], [1.59635706E12, 0.016666666666666666]], "isOverall": false, "label": "32.1 - Hacer clic en Pagos-success", "isController": false}, {"data": [[1.596357E12, 0.016666666666666666], [1.59635694E12, 0.15]], "isOverall": false, "label": "16.1 - Deducible Hacer clic en Siguiente -124-success", "isController": false}, {"data": [[1.596357E12, 0.016666666666666666], [1.59635694E12, 0.15]], "isOverall": false, "label": "15.1 - Deducible Hacer clic en Siguiente -success", "isController": false}, {"data": [[1.596357E12, 0.1], [1.59635706E12, 0.06666666666666667]], "isOverall": false, "label": "T.22- Informacion del cliente Hacer clic en Siguiente -success", "isController": true}, {"data": [[1.59635712E12, 0.03333333333333333], [1.59635718E12, 0.13333333333333333]], "isOverall": false, "label": "T.44 - Cerrar Insis-success", "isController": true}, {"data": [[1.59635682E12, 0.08333333333333333], [1.59635688E12, 0.06666666666666667], [1.59635694E12, 0.016666666666666666]], "isOverall": false, "label": "12.2 - Cerrar Objeto Asegurado-success", "isController": false}, {"data": [[1.59635718E12, 0.016666666666666666]], "isOverall": false, "label": "43.1 - Mensaje Operacion completada con exito-0-success", "isController": false}, {"data": [[1.59635682E12, 0.08333333333333333], [1.59635688E12, 0.06666666666666667], [1.59635694E12, 0.016666666666666666]], "isOverall": false, "label": "T.12 - Cerrar Objeto Asegurado-success", "isController": true}, {"data": [[1.59635712E12, 0.03333333333333333], [1.59635718E12, 0.13333333333333333]], "isOverall": false, "label": "44.2 - Cerrar Insis-0-success", "isController": false}, {"data": [[1.59635712E12, 0.03333333333333333], [1.59635718E12, 0.13333333333333333]], "isOverall": false, "label": "44.1 - Cerrar Insis-1-success", "isController": false}, {"data": [[1.59635676E12, 0.16666666666666666]], "isOverall": false, "label": "T.7 - Presionar Buscar-success", "isController": true}, {"data": [[1.59635712E12, 0.16666666666666666]], "isOverall": false, "label": "34.3 - ingresar el numero de poliza Buscar-success", "isController": false}, {"data": [[1.59635712E12, 0.15], [1.59635706E12, 0.016666666666666666]], "isOverall": false, "label": "T.32 - Hacer clic en Pagos-success", "isController": true}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "T.4 - Seleccionar Control de Polizas-success", "isController": true}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "4.1 - Seleccionar Control de Polizas-success", "isController": false}, {"data": [[1.59635682E12, 0.15], [1.59635688E12, 0.016666666666666666]], "isOverall": false, "label": "10.1 - En coberturas Hacer clic en Detalles-success", "isController": false}, {"data": [[1.59635712E12, 0.1], [1.59635718E12, 0.06666666666666667]], "isOverall": false, "label": "39..2 - Ingresar la cantidad a pagar-success", "isController": false}, {"data": [[1.5963567E12, 0.1], [1.59635676E12, 0.06666666666666667]], "isOverall": false, "label": "6.2 - Buscar Id Cliente-success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "2.1 - Ingresar a INSIS-success", "isController": false}, {"data": [[1.596357E12, 0.016666666666666666], [1.59635694E12, 0.15]], "isOverall": false, "label": "T.16 - Deducible Hacer clic en Siguiente -success", "isController": true}, {"data": [[1.59635712E12, 0.13333333333333333], [1.59635718E12, 0.03333333333333333]], "isOverall": false, "label": "T.38 - Hacer clic en Aceptar-success", "isController": true}, {"data": [[1.59635718E12, 0.016666666666666666]], "isOverall": false, "label": "41.1 - Hacer clic en Grabar-0-success", "isController": false}, {"data": [[1.596357E12, 0.016666666666666666], [1.59635706E12, 0.15]], "isOverall": false, "label": "23.2 - Claculo prima Hacer clic en Siguiente-success", "isController": false}, {"data": [[1.59635712E12, 0.15], [1.59635718E12, 0.016666666666666666]], "isOverall": false, "label": "T.37 -Hacer clic en Buscar-success", "isController": true}, {"data": [[1.59635712E12, 0.03333333333333333], [1.59635718E12, 0.13333333333333333]], "isOverall": false, "label": "44.3 - Cerrar Insis-1-success", "isController": false}, {"data": [[1.59635712E12, 0.03333333333333333], [1.59635718E12, 0.13333333333333333]], "isOverall": false, "label": "Debug Sampler-success", "isController": false}, {"data": [[1.59635688E12, 0.03333333333333333], [1.59635694E12, 0.13333333333333333]], "isOverall": false, "label": "T.14 - Descuento Hacer clic en Siguiente -success", "isController": true}, {"data": [[1.59635712E12, 0.11666666666666667], [1.59635706E12, 0.05]], "isOverall": false, "label": "T.31 - Hacer clic en Facturaci\u00F3n y Cobranza-success", "isController": true}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "1.1 - Index-success", "isController": false}, {"data": [[1.596357E12, 0.15], [1.59635694E12, 0.016666666666666666]], "isOverall": false, "label": "19.1 - Comisiones Hacer clic en Siguiente -success", "isController": false}, {"data": [[1.59635718E12, 0.016666666666666666]], "isOverall": false, "label": "42.3 - Hacer clic en Actividades y Aplicar Pago-0-success", "isController": false}, {"data": [[1.59635718E12, 0.016666666666666666]], "isOverall": false, "label": "42.4 - Hacer clic en Actividades y Aplicar Pago-1-success", "isController": false}, {"data": [[1.5963567E12, 0.16666666666666666]], "isOverall": false, "label": "1.2 - Index-1-success", "isController": false}, {"data": [[1.59635682E12, 0.06666666666666667], [1.59635676E12, 0.1]], "isOverall": false, "label": "8.1 - Presionar Siguiente-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59635718E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 1.3, "minX": 1.5963567E12, "maxY": 6.383333333333334, "series": [{"data": [[1.59635682E12, 1.95], [1.59635712E12, 6.383333333333334], [1.5963567E12, 4.333333333333333], [1.59635718E12, 4.1], [1.596357E12, 1.8833333333333333], [1.59635706E12, 2.95], [1.59635688E12, 1.3], [1.59635694E12, 1.9833333333333334], [1.59635676E12, 1.9333333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59635718E12, "title": "Total Transactions Per Second"}},
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
