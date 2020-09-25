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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 4.0, "series": [{"data": [[5500.0, 1.0], [7200.0, 1.0]], "isOverall": false, "label": "Login - -40-1", "isController": false}, {"data": [[300.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "Login - -40-0", "isController": false}, {"data": [[2600.0, 4.0]], "isOverall": false, "label": "Ingresar Cantidad a Pagar - -290", "isController": false}, {"data": [[2200.0, 4.0]], "isOverall": false, "label": "Ingresar Cantidad a Pagar - -291", "isController": false}, {"data": [[5500.0, 1.0], [5800.0, 1.0], [6100.0, 1.0], [6700.0, 1.0]], "isOverall": false, "label": "Siguiente - -201", "isController": false}, {"data": [[800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Siguiente - -202", "isController": false}, {"data": [[400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "Clic en Menu Participante - -146", "isController": false}, {"data": [[4400.0, 1.0], [5000.0, 1.0], [5400.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "Siguiente - -203", "isController": false}, {"data": [[400.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Siguiente - -204", "isController": false}, {"data": [[11700.0, 2.0]], "isOverall": false, "label": "Seleccionar Agente - -110", "isController": false}, {"data": [[1100.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Seleccionar Agente - -111", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -180", "isController": false}, {"data": [[5300.0, 1.0], [5400.0, 1.0], [5900.0, 1.0], [6000.0, 1.0]], "isOverall": false, "label": "Siguiente - -174", "isController": false}, {"data": [[500.0, 2.0]], "isOverall": false, "label": "Siguiente - -175", "isController": false}, {"data": [[800.0, 2.0], [900.0, 2.0]], "isOverall": false, "label": "Clic Boton Crear Deducible - -208", "isController": false}, {"data": [[1500.0, 2.0], [1600.0, 2.0]], "isOverall": false, "label": "Clic Boton Confirmar Pre-Emision - -270", "isController": false}, {"data": [[800.0, 2.0]], "isOverall": false, "label": "Clic en Boton Grabar Participante - -171", "isController": false}, {"data": [[2100.0, 1.0], [2400.0, 1.0]], "isOverall": false, "label": "Ingresar Usage Description - -289", "isController": false}, {"data": [[600.0, 1.0], [1300.0, 1.0], [800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Clic en Menu Participante - -145", "isController": false}, {"data": [[700.0, 1.0], [2800.0, 1.0], [2900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Ingresar Usage Description - -288", "isController": false}, {"data": [[800.0, 4.0]], "isOverall": false, "label": "Editar Datos del Objeto - -197", "isController": false}, {"data": [[2500.0, 1.0], [2800.0, 1.0]], "isOverall": false, "label": "Ingresar Usage Description - -287", "isController": false}, {"data": [[2300.0, 1.0], [4900.0, 1.0], [2600.0, 1.0], [5500.0, 1.0]], "isOverall": false, "label": "Ingresar Usage Description - -286", "isController": false}, {"data": [[4100.0, 1.0], [2700.0, 1.0], [3300.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "Clic en Boton Grabar Participante - -170", "isController": false}, {"data": [[600.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Editar Datos del Objeto - -199", "isController": false}, {"data": [[10200.0, 2.0], [10400.0, 2.0]], "isOverall": false, "label": "Ingresar Poliza a Pagar - -285", "isController": false}, {"data": [[3200.0, 1.0], [3300.0, 1.0], [3700.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": "Editar Datos del Objeto - -198", "isController": false}, {"data": [[4500.0, 1.0], [5700.0, 1.0], [6500.0, 1.0], [3700.0, 1.0]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -176", "isController": false}, {"data": [[1100.0, 2.0]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -178", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -177", "isController": false}, {"data": [[6100.0, 1.0], [6800.0, 1.0], [7000.0, 1.0], [7800.0, 1.0]], "isOverall": false, "label": "Siguiente - -261", "isController": false}, {"data": [[600.0, 2.0]], "isOverall": false, "label": "Clic Menu Pagos - -278", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "Clic Boton Proceder - -302", "isController": false}, {"data": [[900.0, 2.0]], "isOverall": false, "label": "Siguiente - -262", "isController": false}, {"data": [[4500.0, 1.0], [5100.0, 1.0], [6000.0, 1.0], [6600.0, 1.0]], "isOverall": false, "label": "Clic Menu Pagos - -277", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -300", "isController": false}, {"data": [[6000.0, 2.0], [7400.0, 1.0], [7700.0, 1.0]], "isOverall": false, "label": "Siguiente - -263", "isController": false}, {"data": [[300.0, 2.0], [100.0, 2.0]], "isOverall": false, "label": "Clic Boton Proceder - -301", "isController": false}, {"data": [[1300.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "Siguiente - -265", "isController": false}, {"data": [[1800.0, 2.0], [1900.0, 2.0]], "isOverall": false, "label": "Seleciionar el Producto - -107", "isController": false}, {"data": [[8400.0, 2.0], [6300.0, 2.0]], "isOverall": false, "label": "Seleciionar el Producto - -108", "isController": false}, {"data": [[600.0, 2.0], [800.0, 2.0]], "isOverall": false, "label": "Clic Menu Operaciones del Sistema - -66", "isController": false}, {"data": [[5100.0, 2.0], [5300.0, 2.0]], "isOverall": false, "label": "Clic Boton Calculo de Prima - -266", "isController": false}, {"data": [[1800.0, 2.0], [1900.0, 2.0]], "isOverall": false, "label": "Clic Boton Validacion - -267", "isController": false}, {"data": [[5100.0, 1.0], [5700.0, 2.0], [6400.0, 1.0]], "isOverall": false, "label": "Clic Boton Grabar Datos del Objeto - -190", "isController": false}, {"data": [[2300.0, 1.0], [2500.0, 1.0], [1700.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Clic Boton Grabar Pago - -295", "isController": false}, {"data": [[1500.0, 4.0]], "isOverall": false, "label": "Clic Boton Editar Datos del Objeto - -196", "isController": false}, {"data": [[900.0, 2.0], [1000.0, 2.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -189", "isController": false}, {"data": [[1000.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -188", "isController": false}, {"data": [[1400.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -187", "isController": false}, {"data": [[1300.0, 1.0], [2800.0, 1.0], [1800.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -186", "isController": false}, {"data": [[600.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -185", "isController": false}, {"data": [[1200.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -182", "isController": false}, {"data": [[4700.0, 1.0], [1400.0, 1.0], [2900.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -181", "isController": false}, {"data": [[4500.0, 1.0], [5300.0, 1.0], [3500.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "Clic Boton Nuevo - -283", "isController": false}, {"data": [[600.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Clic Boton Grabar Pago - -296", "isController": false}, {"data": [[800.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Clic Boton Nuevo - -284", "isController": false}, {"data": [[2600.0, 1.0], [3300.0, 1.0], [15600.0, 1.0], [16200.0, 1.0]], "isOverall": false, "label": "Seleccionar Agente - -109", "isController": false}, {"data": [[300.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Editar Facturacion - -138", "isController": false}, {"data": [[2300.0, 1.0], [2500.0, 1.0], [3000.0, 1.0], [3200.0, 1.0]], "isOverall": false, "label": "Clic Boton Guardar de Deducible - -218", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 1.0]], "isOverall": false, "label": "Editar Facturacion - -139", "isController": false}, {"data": [[600.0, 2.0]], "isOverall": false, "label": "Clic Boton Guardar de Deducible - -219", "isController": false}, {"data": [[4700.0, 1.0], [700.0, 1.0], [3000.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Editar Facturacion - -137", "isController": false}, {"data": [[700.0, 2.0], [3300.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "Agregar Datos de Deducible - -209", "isController": false}, {"data": [[4100.0, 1.0], [4900.0, 1.0], [3300.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "Clic Menu Crear Poliza- -84", "isController": false}, {"data": [[1600.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Clic Boton Cerrar Datos del Objeto - -194", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "Clic Menu Crear Poliza- -85", "isController": false}, {"data": [[600.0, 2.0], [3400.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "Clic Boton Cerrar Datos del Objeto - -193", "isController": false}, {"data": [[10400.0, 2.0], [13900.0, 2.0]], "isOverall": false, "label": "Editar Datos del Objeto - -200", "isController": false}, {"data": [[1000.0, 2.0]], "isOverall": false, "label": "Clic Boton Cerrar Datos del Objeto - -195", "isController": false}, {"data": [[600.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -164", "isController": false}, {"data": [[1300.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -165", "isController": false}, {"data": [[1200.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -162", "isController": false}, {"data": [[1300.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -163", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "Editar Facturacion - -141", "isController": false}, {"data": [[1200.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Editar Facturacion - -142", "isController": false}, {"data": [[600.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Editar Facturacion - -140", "isController": false}, {"data": [[700.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Agregar Datos de Deducible - -214", "isController": false}, {"data": [[600.0, 2.0]], "isOverall": false, "label": "Clic Boton Grabar Datos del Objeto - -192", "isController": false}, {"data": [[1200.0, 1.0], [900.0, 1.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Agregar Datos de Deducible - -213", "isController": false}, {"data": [[700.0, 2.0], [800.0, 2.0]], "isOverall": false, "label": "Clic Menu Control de P - -74", "isController": false}, {"data": [[5300.0, 1.0], [6000.0, 1.0], [26400.0, 1.0], [6700.0, 1.0]], "isOverall": false, "label": "Siguiente - -250", "isController": false}, {"data": [[600.0, 2.0]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -299", "isController": false}, {"data": [[21100.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "Siguiente - -251", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "Clic Menu Crear Poliza- -97", "isController": false}, {"data": [[4600.0, 1.0], [5300.0, 1.0], [5500.0, 1.0], [6300.0, 1.0]], "isOverall": false, "label": "Siguiente - -253", "isController": false}, {"data": [[700.0, 2.0]], "isOverall": false, "label": "Siguiente - -254", "isController": false}, {"data": [[600.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "Login - -38-0", "isController": false}, {"data": [[34900.0, 1.0], [35800.0, 1.0], [30900.0, 1.0], [31700.0, 1.0]], "isOverall": false, "label": "Siguiente - -255", "isController": false}, {"data": [[200.0, 2.0]], "isOverall": false, "label": "Index - -23", "isController": false}, {"data": [[200.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -155", "isController": false}, {"data": [[700.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Siguiente - -256", "isController": false}, {"data": [[600.0, 1.0], [1500.0, 1.0], [400.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Index - -22", "isController": false}, {"data": [[2300.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -156", "isController": false}, {"data": [[100.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -153", "isController": false}, {"data": [[100.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Login - -38-1", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -151", "isController": false}, {"data": [[400.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -152", "isController": false}, {"data": [[1200.0, 2.0], [5800.0, 1.0], [6400.0, 1.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -161", "isController": false}, {"data": [[10500.0, 2.0], [29100.0, 2.0]], "isOverall": false, "label": "Clic Boton Calculo de Prima - -252", "isController": false}, {"data": [[2100.0, 1.0], [4200.0, 1.0], [2500.0, 1.0], [3700.0, 1.0]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -297", "isController": false}, {"data": [[700.0, 2.0]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -298", "isController": false}, {"data": [[1100.0, 2.0]], "isOverall": false, "label": "Agregar Datos de Deducible - -210", "isController": false}, {"data": [[2400.0, 2.0]], "isOverall": false, "label": "Buscar Cliente - -100", "isController": false}, {"data": [[800.0, 2.0]], "isOverall": false, "label": "Buscar Cliente - -101", "isController": false}, {"data": [[600.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Agregar Datos de Deducible - -212", "isController": false}, {"data": [[700.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Agregar Datos de Deducible - -211", "isController": false}, {"data": [[5400.0, 1.0], [5800.0, 1.0], [400.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -148", "isController": false}, {"data": [[500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -149", "isController": false}, {"data": [[4500.0, 1.0], [5300.0, 1.0], [5800.0, 1.0], [6500.0, 1.0]], "isOverall": false, "label": "Siguiente - -220", "isController": false}, {"data": [[9900.0, 1.0], [10300.0, 1.0], [10800.0, 1.0], [11200.0, 1.0]], "isOverall": false, "label": "Siguiente - -102", "isController": false}, {"data": [[700.0, 2.0]], "isOverall": false, "label": "Siguiente - -223", "isController": false}, {"data": [[900.0, 2.0]], "isOverall": false, "label": "Siguiente - -103", "isController": false}, {"data": [[9700.0, 1.0], [10000.0, 1.0], [7300.0, 1.0], [7800.0, 1.0]], "isOverall": false, "label": "Siguiente - -224", "isController": false}, {"data": [[2600.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "Siguiente - -227", "isController": false}, {"data": [[6800.0, 1.0], [6700.0, 1.0], [7900.0, 1.0], [7800.0, 1.0]], "isOverall": false, "label": "Siguiente - -228", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "Index - -23-0", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "Index - -23-1", "isController": false}, {"data": [[2200.0, 2.0], [3100.0, 1.0], [3200.0, 1.0]], "isOverall": false, "label": "Clic Boton Ok Pago - -292", "isController": false}, {"data": [[1300.0, 2.0], [1500.0, 2.0]], "isOverall": false, "label": "Clic Menu Facturacion y Cobranza - -276", "isController": false}, {"data": [[700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Clic Boton Ok Pago - -293", "isController": false}, {"data": [[300.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "Clic Boton Ok Pago - -294", "isController": false}, {"data": [[400.0, 1.0], [3700.0, 1.0], [3800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Buscar Cliente - -99", "isController": false}, {"data": [[5700.0, 2.0], [6800.0, 2.0]], "isOverall": false, "label": "Clic Boton Emitir Prima - -273", "isController": false}, {"data": [[800.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Grabar Edicion de Facturacion - -144", "isController": false}, {"data": [[4500.0, 1.0], [4800.0, 1.0], [3500.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "Grabar Edicion de Facturacion - -143", "isController": false}, {"data": [[5900.0, 1.0], [6400.0, 1.0], [6600.0, 1.0], [7200.0, 1.0]], "isOverall": false, "label": "Siguiente - -230", "isController": false}, {"data": [[700.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Siguiente - -231", "isController": false}, {"data": [[4700.0, 1.0], [5100.0, 1.0], [13700.0, 1.0], [14400.0, 1.0]], "isOverall": false, "label": "Siguiente - -232", "isController": false}, {"data": [[900.0, 2.0]], "isOverall": false, "label": "Siguiente - -233", "isController": false}, {"data": [[7000.0, 1.0], [7200.0, 1.0]], "isOverall": false, "label": "Siguiente - -234", "isController": false}, {"data": [[1000.0, 2.0]], "isOverall": false, "label": "Siguiente - -235", "isController": false}, {"data": [[5600.0, 1.0], [7500.0, 1.0]], "isOverall": false, "label": "Login - -40", "isController": false}, {"data": [[300.0, 2.0], [400.0, 2.0]], "isOverall": false, "label": "Clic Menu Control de Poliza - -80", "isController": false}, {"data": [[1100.0, 2.0]], "isOverall": false, "label": "Siguiente - -229", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[8700.0, 1.0], [1100.0, 1.0], [300.0, 1.0], [6000.0, 1.0]], "isOverall": false, "label": "Login - -38", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 35800.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 46.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 120.0, "series": [{"data": [[0.0, 46.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 120.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 108.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 2.0, "minX": 1.59594972E12, "maxY": 2.0, "series": [{"data": [[1.59594996E12, 2.0], [1.59594978E12, 2.0], [1.59595008E12, 2.0], [1.5959499E12, 2.0], [1.59594972E12, 2.0], [1.59595002E12, 2.0], [1.59594984E12, 2.0]], "isOverall": false, "label": "3- Thread Group_Creacion_Pago_Poliza", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59595008E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 1.0, "minX": 2.0, "maxY": 33386.5, "series": [{"data": [[10.0, 6440.0]], "isOverall": false, "label": "Login - -40-1", "isController": false}, {"data": [[10.0, 6440.0]], "isOverall": false, "label": "Login - -40-1-Aggregated", "isController": false}, {"data": [[10.0, 203.5]], "isOverall": false, "label": "Login - -40-0", "isController": false}, {"data": [[10.0, 203.5]], "isOverall": false, "label": "Login - -40-0-Aggregated", "isController": false}, {"data": [[2.0, 2607.0]], "isOverall": false, "label": "Ingresar Cantidad a Pagar - -290", "isController": false}, {"data": [[2.0, 2607.0]], "isOverall": false, "label": "Ingresar Cantidad a Pagar - -290-Aggregated", "isController": false}, {"data": [[2.0, 2223.5]], "isOverall": false, "label": "Ingresar Cantidad a Pagar - -291", "isController": false}, {"data": [[2.0, 2223.5]], "isOverall": false, "label": "Ingresar Cantidad a Pagar - -291-Aggregated", "isController": false}, {"data": [[6.0, 6079.5]], "isOverall": false, "label": "Siguiente - -201", "isController": false}, {"data": [[6.0, 6079.5]], "isOverall": false, "label": "Siguiente - -201-Aggregated", "isController": false}, {"data": [[6.0, 712.0]], "isOverall": false, "label": "Siguiente - -202", "isController": false}, {"data": [[6.0, 712.0]], "isOverall": false, "label": "Siguiente - -202-Aggregated", "isController": false}, {"data": [[8.0, 321.0]], "isOverall": false, "label": "Clic en Menu Participante - -146", "isController": false}, {"data": [[8.0, 321.0]], "isOverall": false, "label": "Clic en Menu Participante - -146-Aggregated", "isController": false}, {"data": [[6.0, 4633.25]], "isOverall": false, "label": "Siguiente - -203", "isController": false}, {"data": [[6.0, 4633.25]], "isOverall": false, "label": "Siguiente - -203-Aggregated", "isController": false}, {"data": [[6.0, 647.5]], "isOverall": false, "label": "Siguiente - -204", "isController": false}, {"data": [[6.0, 647.5]], "isOverall": false, "label": "Siguiente - -204-Aggregated", "isController": false}, {"data": [[8.0, 11780.0]], "isOverall": false, "label": "Seleccionar Agente - -110", "isController": false}, {"data": [[8.0, 11780.0]], "isOverall": false, "label": "Seleccionar Agente - -110-Aggregated", "isController": false}, {"data": [[8.0, 1121.0]], "isOverall": false, "label": "Seleccionar Agente - -111", "isController": false}, {"data": [[8.0, 1121.0]], "isOverall": false, "label": "Seleccionar Agente - -111-Aggregated", "isController": false}, {"data": [[6.0, 135.0]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -180", "isController": false}, {"data": [[6.0, 135.0]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -180-Aggregated", "isController": false}, {"data": [[6.0, 5684.0]], "isOverall": false, "label": "Siguiente - -174", "isController": false}, {"data": [[6.0, 5684.0]], "isOverall": false, "label": "Siguiente - -174-Aggregated", "isController": false}, {"data": [[6.0, 594.0]], "isOverall": false, "label": "Siguiente - -175", "isController": false}, {"data": [[6.0, 594.0]], "isOverall": false, "label": "Siguiente - -175-Aggregated", "isController": false}, {"data": [[6.0, 894.0]], "isOverall": false, "label": "Clic Boton Crear Deducible - -208", "isController": false}, {"data": [[6.0, 894.0]], "isOverall": false, "label": "Clic Boton Crear Deducible - -208-Aggregated", "isController": false}, {"data": [[4.0, 1564.5]], "isOverall": false, "label": "Clic Boton Confirmar Pre-Emision - -270", "isController": false}, {"data": [[4.0, 1564.5]], "isOverall": false, "label": "Clic Boton Confirmar Pre-Emision - -270-Aggregated", "isController": false}, {"data": [[6.0, 844.0]], "isOverall": false, "label": "Clic en Boton Grabar Participante - -171", "isController": false}, {"data": [[6.0, 844.0]], "isOverall": false, "label": "Clic en Boton Grabar Participante - -171-Aggregated", "isController": false}, {"data": [[2.0, 2266.0]], "isOverall": false, "label": "Ingresar Usage Description - -289", "isController": false}, {"data": [[2.0, 2266.0]], "isOverall": false, "label": "Ingresar Usage Description - -289-Aggregated", "isController": false}, {"data": [[8.0, 950.5]], "isOverall": false, "label": "Clic en Menu Participante - -145", "isController": false}, {"data": [[8.0, 950.5]], "isOverall": false, "label": "Clic en Menu Participante - -145-Aggregated", "isController": false}, {"data": [[2.0, 1771.0]], "isOverall": false, "label": "Ingresar Usage Description - -288", "isController": false}, {"data": [[2.0, 1771.0]], "isOverall": false, "label": "Ingresar Usage Description - -288-Aggregated", "isController": false}, {"data": [[6.0, 848.0]], "isOverall": false, "label": "Editar Datos del Objeto - -197", "isController": false}, {"data": [[6.0, 848.0]], "isOverall": false, "label": "Editar Datos del Objeto - -197-Aggregated", "isController": false}, {"data": [[2.0, 2719.0]], "isOverall": false, "label": "Ingresar Usage Description - -287", "isController": false}, {"data": [[2.0, 2719.0]], "isOverall": false, "label": "Ingresar Usage Description - -287-Aggregated", "isController": false}, {"data": [[2.0, 3856.0]], "isOverall": false, "label": "Ingresar Usage Description - -286", "isController": false}, {"data": [[2.0, 3856.0]], "isOverall": false, "label": "Ingresar Usage Description - -286-Aggregated", "isController": false}, {"data": [[6.0, 3427.5]], "isOverall": false, "label": "Clic en Boton Grabar Participante - -170", "isController": false}, {"data": [[6.0, 3427.5]], "isOverall": false, "label": "Clic en Boton Grabar Participante - -170-Aggregated", "isController": false}, {"data": [[6.0, 566.0]], "isOverall": false, "label": "Editar Datos del Objeto - -199", "isController": false}, {"data": [[6.0, 566.0]], "isOverall": false, "label": "Editar Datos del Objeto - -199-Aggregated", "isController": false}, {"data": [[2.0, 10330.5]], "isOverall": false, "label": "Ingresar Poliza a Pagar - -285", "isController": false}, {"data": [[2.0, 10330.5]], "isOverall": false, "label": "Ingresar Poliza a Pagar - -285-Aggregated", "isController": false}, {"data": [[6.0, 3534.5]], "isOverall": false, "label": "Editar Datos del Objeto - -198", "isController": false}, {"data": [[6.0, 3534.5]], "isOverall": false, "label": "Editar Datos del Objeto - -198-Aggregated", "isController": false}, {"data": [[6.0, 5154.25]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -176", "isController": false}, {"data": [[6.0, 5154.25]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -176-Aggregated", "isController": false}, {"data": [[6.0, 1166.5]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -178", "isController": false}, {"data": [[6.0, 1166.5]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -178-Aggregated", "isController": false}, {"data": [[6.0, 689.0]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -177", "isController": false}, {"data": [[6.0, 689.0]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -177-Aggregated", "isController": false}, {"data": [[4.0, 6983.0]], "isOverall": false, "label": "Siguiente - -261", "isController": false}, {"data": [[4.0, 6983.0]], "isOverall": false, "label": "Siguiente - -261-Aggregated", "isController": false}, {"data": [[4.0, 619.0]], "isOverall": false, "label": "Clic Menu Pagos - -278", "isController": false}, {"data": [[4.0, 619.0]], "isOverall": false, "label": "Clic Menu Pagos - -278-Aggregated", "isController": false}, {"data": [[2.0, 194.0]], "isOverall": false, "label": "Clic Boton Proceder - -302", "isController": false}, {"data": [[2.0, 194.0]], "isOverall": false, "label": "Clic Boton Proceder - -302-Aggregated", "isController": false}, {"data": [[4.0, 943.0]], "isOverall": false, "label": "Siguiente - -262", "isController": false}, {"data": [[4.0, 943.0]], "isOverall": false, "label": "Siguiente - -262-Aggregated", "isController": false}, {"data": [[4.0, 5612.5]], "isOverall": false, "label": "Clic Menu Pagos - -277", "isController": false}, {"data": [[4.0, 5612.5]], "isOverall": false, "label": "Clic Menu Pagos - -277-Aggregated", "isController": false}, {"data": [[2.0, 162.0]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -300", "isController": false}, {"data": [[2.0, 162.0]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -300-Aggregated", "isController": false}, {"data": [[4.0, 6828.5]], "isOverall": false, "label": "Siguiente - -263", "isController": false}, {"data": [[4.0, 6828.5]], "isOverall": false, "label": "Siguiente - -263-Aggregated", "isController": false}, {"data": [[2.0, 289.5]], "isOverall": false, "label": "Clic Boton Proceder - -301", "isController": false}, {"data": [[2.0, 289.5]], "isOverall": false, "label": "Clic Boton Proceder - -301-Aggregated", "isController": false}, {"data": [[4.0, 1527.0]], "isOverall": false, "label": "Siguiente - -265", "isController": false}, {"data": [[4.0, 1527.0]], "isOverall": false, "label": "Siguiente - -265-Aggregated", "isController": false}, {"data": [[10.0, 1917.5]], "isOverall": false, "label": "Seleciionar el Producto - -107", "isController": false}, {"data": [[10.0, 1917.5]], "isOverall": false, "label": "Seleciionar el Producto - -107-Aggregated", "isController": false}, {"data": [[10.0, 7377.0]], "isOverall": false, "label": "Seleciionar el Producto - -108", "isController": false}, {"data": [[10.0, 7377.0]], "isOverall": false, "label": "Seleciionar el Producto - -108-Aggregated", "isController": false}, {"data": [[10.0, 765.5]], "isOverall": false, "label": "Clic Menu Operaciones del Sistema - -66", "isController": false}, {"data": [[10.0, 765.5]], "isOverall": false, "label": "Clic Menu Operaciones del Sistema - -66-Aggregated", "isController": false}, {"data": [[4.0, 5232.5]], "isOverall": false, "label": "Clic Boton Calculo de Prima - -266", "isController": false}, {"data": [[4.0, 5232.5]], "isOverall": false, "label": "Clic Boton Calculo de Prima - -266-Aggregated", "isController": false}, {"data": [[4.0, 1915.0]], "isOverall": false, "label": "Clic Boton Validacion - -267", "isController": false}, {"data": [[4.0, 1915.0]], "isOverall": false, "label": "Clic Boton Validacion - -267-Aggregated", "isController": false}, {"data": [[6.0, 5799.0]], "isOverall": false, "label": "Clic Boton Grabar Datos del Objeto - -190", "isController": false}, {"data": [[6.0, 5799.0]], "isOverall": false, "label": "Clic Boton Grabar Datos del Objeto - -190-Aggregated", "isController": false}, {"data": [[2.0, 2179.0]], "isOverall": false, "label": "Clic Boton Grabar Pago - -295", "isController": false}, {"data": [[2.0, 2179.0]], "isOverall": false, "label": "Clic Boton Grabar Pago - -295-Aggregated", "isController": false}, {"data": [[6.0, 1519.5]], "isOverall": false, "label": "Clic Boton Editar Datos del Objeto - -196", "isController": false}, {"data": [[6.0, 1519.5]], "isOverall": false, "label": "Clic Boton Editar Datos del Objeto - -196-Aggregated", "isController": false}, {"data": [[6.0, 1000.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -189", "isController": false}, {"data": [[6.0, 1000.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -189-Aggregated", "isController": false}, {"data": [[6.0, 769.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -188", "isController": false}, {"data": [[6.0, 769.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -188-Aggregated", "isController": false}, {"data": [[6.0, 1096.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -187", "isController": false}, {"data": [[6.0, 1096.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -187-Aggregated", "isController": false}, {"data": [[6.0, 1777.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -186", "isController": false}, {"data": [[6.0, 1777.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -186-Aggregated", "isController": false}, {"data": [[6.0, 1349.5]], "isOverall": false, "label": "Agregar Datos del Objeto - -185", "isController": false}, {"data": [[6.0, 1349.5]], "isOverall": false, "label": "Agregar Datos del Objeto - -185-Aggregated", "isController": false}, {"data": [[6.0, 1535.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -182", "isController": false}, {"data": [[6.0, 1535.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -182-Aggregated", "isController": false}, {"data": [[6.0, 2406.25]], "isOverall": false, "label": "Agregar Datos del Objeto - -181", "isController": false}, {"data": [[6.0, 2406.25]], "isOverall": false, "label": "Agregar Datos del Objeto - -181-Aggregated", "isController": false}, {"data": [[4.0, 4362.25]], "isOverall": false, "label": "Clic Boton Nuevo - -283", "isController": false}, {"data": [[4.0, 4362.25]], "isOverall": false, "label": "Clic Boton Nuevo - -283-Aggregated", "isController": false}, {"data": [[2.0, 609.0]], "isOverall": false, "label": "Clic Boton Grabar Pago - -296", "isController": false}, {"data": [[2.0, 609.0]], "isOverall": false, "label": "Clic Boton Grabar Pago - -296-Aggregated", "isController": false}, {"data": [[4.0, 634.5]], "isOverall": false, "label": "Clic Boton Nuevo - -284", "isController": false}, {"data": [[4.0, 634.5]], "isOverall": false, "label": "Clic Boton Nuevo - -284-Aggregated", "isController": false}, {"data": [[8.0, 15939.5], [10.0, 3038.5]], "isOverall": false, "label": "Seleccionar Agente - -109", "isController": false}, {"data": [[9.0, 9489.0]], "isOverall": false, "label": "Seleccionar Agente - -109-Aggregated", "isController": false}, {"data": [[8.0, 360.0]], "isOverall": false, "label": "Editar Facturacion - -138", "isController": false}, {"data": [[8.0, 360.0]], "isOverall": false, "label": "Editar Facturacion - -138-Aggregated", "isController": false}, {"data": [[6.0, 2772.25]], "isOverall": false, "label": "Clic Boton Guardar de Deducible - -218", "isController": false}, {"data": [[6.0, 2772.25]], "isOverall": false, "label": "Clic Boton Guardar de Deducible - -218-Aggregated", "isController": false}, {"data": [[8.0, 874.5]], "isOverall": false, "label": "Editar Facturacion - -139", "isController": false}, {"data": [[8.0, 874.5]], "isOverall": false, "label": "Editar Facturacion - -139-Aggregated", "isController": false}, {"data": [[6.0, 688.5]], "isOverall": false, "label": "Clic Boton Guardar de Deducible - -219", "isController": false}, {"data": [[6.0, 688.5]], "isOverall": false, "label": "Clic Boton Guardar de Deducible - -219-Aggregated", "isController": false}, {"data": [[8.0, 2249.0]], "isOverall": false, "label": "Editar Facturacion - -137", "isController": false}, {"data": [[8.0, 2249.0]], "isOverall": false, "label": "Editar Facturacion - -137-Aggregated", "isController": false}, {"data": [[6.0, 2098.5]], "isOverall": false, "label": "Agregar Datos de Deducible - -209", "isController": false}, {"data": [[6.0, 2098.5]], "isOverall": false, "label": "Agregar Datos de Deducible - -209-Aggregated", "isController": false}, {"data": [[10.0, 4113.25]], "isOverall": false, "label": "Clic Menu Crear Poliza- -84", "isController": false}, {"data": [[10.0, 4113.25]], "isOverall": false, "label": "Clic Menu Crear Poliza- -84-Aggregated", "isController": false}, {"data": [[6.0, 1764.5]], "isOverall": false, "label": "Clic Boton Cerrar Datos del Objeto - -194", "isController": false}, {"data": [[6.0, 1764.5]], "isOverall": false, "label": "Clic Boton Cerrar Datos del Objeto - -194-Aggregated", "isController": false}, {"data": [[10.0, 721.5]], "isOverall": false, "label": "Clic Menu Crear Poliza- -85", "isController": false}, {"data": [[10.0, 721.5]], "isOverall": false, "label": "Clic Menu Crear Poliza- -85-Aggregated", "isController": false}, {"data": [[6.0, 2076.5]], "isOverall": false, "label": "Clic Boton Cerrar Datos del Objeto - -193", "isController": false}, {"data": [[6.0, 2076.5]], "isOverall": false, "label": "Clic Boton Cerrar Datos del Objeto - -193-Aggregated", "isController": false}, {"data": [[6.0, 12193.5]], "isOverall": false, "label": "Editar Datos del Objeto - -200", "isController": false}, {"data": [[6.0, 12193.5]], "isOverall": false, "label": "Editar Datos del Objeto - -200-Aggregated", "isController": false}, {"data": [[6.0, 1057.5]], "isOverall": false, "label": "Clic Boton Cerrar Datos del Objeto - -195", "isController": false}, {"data": [[6.0, 1057.5]], "isOverall": false, "label": "Clic Boton Cerrar Datos del Objeto - -195-Aggregated", "isController": false}, {"data": [[8.0, 685.0], [7.0, 847.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -164", "isController": false}, {"data": [[7.5, 766.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -164-Aggregated", "isController": false}, {"data": [[6.0, 1325.0], [7.0, 1721.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -165", "isController": false}, {"data": [[6.5, 1523.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -165-Aggregated", "isController": false}, {"data": [[8.0, 1045.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -162", "isController": false}, {"data": [[8.0, 1045.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -162-Aggregated", "isController": false}, {"data": [[8.0, 1544.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -163", "isController": false}, {"data": [[8.0, 1544.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -163-Aggregated", "isController": false}, {"data": [[8.0, 670.5]], "isOverall": false, "label": "Editar Facturacion - -141", "isController": false}, {"data": [[8.0, 670.5]], "isOverall": false, "label": "Editar Facturacion - -141-Aggregated", "isController": false}, {"data": [[8.0, 841.0]], "isOverall": false, "label": "Editar Facturacion - -142", "isController": false}, {"data": [[8.0, 841.0]], "isOverall": false, "label": "Editar Facturacion - -142-Aggregated", "isController": false}, {"data": [[8.0, 537.0]], "isOverall": false, "label": "Editar Facturacion - -140", "isController": false}, {"data": [[8.0, 537.0]], "isOverall": false, "label": "Editar Facturacion - -140-Aggregated", "isController": false}, {"data": [[6.0, 849.0]], "isOverall": false, "label": "Agregar Datos de Deducible - -214", "isController": false}, {"data": [[6.0, 849.0]], "isOverall": false, "label": "Agregar Datos de Deducible - -214-Aggregated", "isController": false}, {"data": [[6.0, 654.0]], "isOverall": false, "label": "Clic Boton Grabar Datos del Objeto - -192", "isController": false}, {"data": [[6.0, 654.0]], "isOverall": false, "label": "Clic Boton Grabar Datos del Objeto - -192-Aggregated", "isController": false}, {"data": [[6.0, 1529.5]], "isOverall": false, "label": "Agregar Datos de Deducible - -213", "isController": false}, {"data": [[6.0, 1529.5]], "isOverall": false, "label": "Agregar Datos de Deducible - -213-Aggregated", "isController": false}, {"data": [[10.0, 793.5]], "isOverall": false, "label": "Clic Menu Control de P - -74", "isController": false}, {"data": [[10.0, 793.5]], "isOverall": false, "label": "Clic Menu Control de P - -74-Aggregated", "isController": false}, {"data": [[6.0, 11153.5]], "isOverall": false, "label": "Siguiente - -250", "isController": false}, {"data": [[6.0, 11153.5]], "isOverall": false, "label": "Siguiente - -250-Aggregated", "isController": false}, {"data": [[2.0, 651.0]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -299", "isController": false}, {"data": [[2.0, 651.0]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -299-Aggregated", "isController": false}, {"data": [[6.0, 10947.0]], "isOverall": false, "label": "Siguiente - -251", "isController": false}, {"data": [[6.0, 10947.0]], "isOverall": false, "label": "Siguiente - -251-Aggregated", "isController": false}, {"data": [[10.0, 142.0]], "isOverall": false, "label": "Clic Menu Crear Poliza- -97", "isController": false}, {"data": [[10.0, 142.0]], "isOverall": false, "label": "Clic Menu Crear Poliza- -97-Aggregated", "isController": false}, {"data": [[6.0, 5493.0]], "isOverall": false, "label": "Siguiente - -253", "isController": false}, {"data": [[6.0, 5493.0]], "isOverall": false, "label": "Siguiente - -253-Aggregated", "isController": false}, {"data": [[6.0, 756.0]], "isOverall": false, "label": "Siguiente - -254", "isController": false}, {"data": [[6.0, 756.0]], "isOverall": false, "label": "Siguiente - -254-Aggregated", "isController": false}, {"data": [[10.0, 399.5]], "isOverall": false, "label": "Login - -38-0", "isController": false}, {"data": [[10.0, 399.5]], "isOverall": false, "label": "Login - -38-0-Aggregated", "isController": false}, {"data": [[4.0, 33386.5]], "isOverall": false, "label": "Siguiente - -255", "isController": false}, {"data": [[4.0, 33386.5]], "isOverall": false, "label": "Siguiente - -255-Aggregated", "isController": false}, {"data": [[10.0, 216.5]], "isOverall": false, "label": "Index - -23", "isController": false}, {"data": [[10.0, 216.5]], "isOverall": false, "label": "Index - -23-Aggregated", "isController": false}, {"data": [[8.0, 357.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -155", "isController": false}, {"data": [[8.0, 357.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -155-Aggregated", "isController": false}, {"data": [[4.0, 821.0]], "isOverall": false, "label": "Siguiente - -256", "isController": false}, {"data": [[4.0, 821.0]], "isOverall": false, "label": "Siguiente - -256-Aggregated", "isController": false}, {"data": [[10.0, 1120.25]], "isOverall": false, "label": "Index - -22", "isController": false}, {"data": [[10.0, 1120.25]], "isOverall": false, "label": "Index - -22-Aggregated", "isController": false}, {"data": [[8.0, 2139.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -156", "isController": false}, {"data": [[8.0, 2139.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -156-Aggregated", "isController": false}, {"data": [[8.0, 295.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -153", "isController": false}, {"data": [[8.0, 295.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -153-Aggregated", "isController": false}, {"data": [[10.0, 334.5]], "isOverall": false, "label": "Login - -38-1", "isController": false}, {"data": [[10.0, 334.5]], "isOverall": false, "label": "Login - -38-1-Aggregated", "isController": false}, {"data": [[8.0, 685.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -151", "isController": false}, {"data": [[8.0, 685.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -151-Aggregated", "isController": false}, {"data": [[8.0, 679.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -152", "isController": false}, {"data": [[8.0, 679.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -152-Aggregated", "isController": false}, {"data": [[8.0, 1254.0], [6.0, 6405.0], [7.0, 5860.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -161", "isController": false}, {"data": [[7.25, 3693.25]], "isOverall": false, "label": "Clic en Boton Crea Participante - -161-Aggregated", "isController": false}, {"data": [[6.0, 19805.5]], "isOverall": false, "label": "Clic Boton Calculo de Prima - -252", "isController": false}, {"data": [[6.0, 19805.5]], "isOverall": false, "label": "Clic Boton Calculo de Prima - -252-Aggregated", "isController": false}, {"data": [[2.0, 3180.5]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -297", "isController": false}, {"data": [[2.0, 3180.5]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -297-Aggregated", "isController": false}, {"data": [[2.0, 770.0]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -298", "isController": false}, {"data": [[2.0, 770.0]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -298-Aggregated", "isController": false}, {"data": [[6.0, 1159.0]], "isOverall": false, "label": "Agregar Datos de Deducible - -210", "isController": false}, {"data": [[6.0, 1159.0]], "isOverall": false, "label": "Agregar Datos de Deducible - -210-Aggregated", "isController": false}, {"data": [[10.0, 2423.5]], "isOverall": false, "label": "Buscar Cliente - -100", "isController": false}, {"data": [[10.0, 2423.5]], "isOverall": false, "label": "Buscar Cliente - -100-Aggregated", "isController": false}, {"data": [[10.0, 861.0]], "isOverall": false, "label": "Buscar Cliente - -101", "isController": false}, {"data": [[10.0, 861.0]], "isOverall": false, "label": "Buscar Cliente - -101-Aggregated", "isController": false}, {"data": [[6.0, 764.5]], "isOverall": false, "label": "Agregar Datos de Deducible - -212", "isController": false}, {"data": [[6.0, 764.5]], "isOverall": false, "label": "Agregar Datos de Deducible - -212-Aggregated", "isController": false}, {"data": [[6.0, 795.5]], "isOverall": false, "label": "Agregar Datos de Deducible - -211", "isController": false}, {"data": [[6.0, 795.5]], "isOverall": false, "label": "Agregar Datos de Deducible - -211-Aggregated", "isController": false}, {"data": [[8.0, 3152.25]], "isOverall": false, "label": "Clic en Boton Crea Participante - -148", "isController": false}, {"data": [[8.0, 3152.25]], "isOverall": false, "label": "Clic en Boton Crea Participante - -148-Aggregated", "isController": false}, {"data": [[8.0, 798.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -149", "isController": false}, {"data": [[8.0, 798.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -149-Aggregated", "isController": false}, {"data": [[6.0, 5568.75]], "isOverall": false, "label": "Siguiente - -220", "isController": false}, {"data": [[6.0, 5568.75]], "isOverall": false, "label": "Siguiente - -220-Aggregated", "isController": false}, {"data": [[10.0, 10600.5]], "isOverall": false, "label": "Siguiente - -102", "isController": false}, {"data": [[10.0, 10600.5]], "isOverall": false, "label": "Siguiente - -102-Aggregated", "isController": false}, {"data": [[6.0, 739.5]], "isOverall": false, "label": "Siguiente - -223", "isController": false}, {"data": [[6.0, 739.5]], "isOverall": false, "label": "Siguiente - -223-Aggregated", "isController": false}, {"data": [[10.0, 943.0]], "isOverall": false, "label": "Siguiente - -103", "isController": false}, {"data": [[10.0, 943.0]], "isOverall": false, "label": "Siguiente - -103-Aggregated", "isController": false}, {"data": [[6.0, 8710.25]], "isOverall": false, "label": "Siguiente - -224", "isController": false}, {"data": [[6.0, 8710.25]], "isOverall": false, "label": "Siguiente - -224-Aggregated", "isController": false}, {"data": [[6.0, 2299.5]], "isOverall": false, "label": "Siguiente - -227", "isController": false}, {"data": [[6.0, 2299.5]], "isOverall": false, "label": "Siguiente - -227-Aggregated", "isController": false}, {"data": [[6.0, 7353.25]], "isOverall": false, "label": "Siguiente - -228", "isController": false}, {"data": [[6.0, 7353.25]], "isOverall": false, "label": "Siguiente - -228-Aggregated", "isController": false}, {"data": [[10.0, 100.5]], "isOverall": false, "label": "Index - -23-0", "isController": false}, {"data": [[10.0, 100.5]], "isOverall": false, "label": "Index - -23-0-Aggregated", "isController": false}, {"data": [[10.0, 115.5]], "isOverall": false, "label": "Index - -23-1", "isController": false}, {"data": [[10.0, 115.5]], "isOverall": false, "label": "Index - -23-1-Aggregated", "isController": false}, {"data": [[2.0, 2725.75]], "isOverall": false, "label": "Clic Boton Ok Pago - -292", "isController": false}, {"data": [[2.0, 2725.75]], "isOverall": false, "label": "Clic Boton Ok Pago - -292-Aggregated", "isController": false}, {"data": [[4.0, 1440.5]], "isOverall": false, "label": "Clic Menu Facturacion y Cobranza - -276", "isController": false}, {"data": [[4.0, 1440.5]], "isOverall": false, "label": "Clic Menu Facturacion y Cobranza - -276-Aggregated", "isController": false}, {"data": [[2.0, 680.0]], "isOverall": false, "label": "Clic Boton Ok Pago - -293", "isController": false}, {"data": [[2.0, 680.0]], "isOverall": false, "label": "Clic Boton Ok Pago - -293-Aggregated", "isController": false}, {"data": [[2.0, 263.5]], "isOverall": false, "label": "Clic Boton Ok Pago - -294", "isController": false}, {"data": [[2.0, 263.5]], "isOverall": false, "label": "Clic Boton Ok Pago - -294-Aggregated", "isController": false}, {"data": [[10.0, 2162.75]], "isOverall": false, "label": "Buscar Cliente - -99", "isController": false}, {"data": [[10.0, 2162.75]], "isOverall": false, "label": "Buscar Cliente - -99-Aggregated", "isController": false}, {"data": [[4.0, 6264.0]], "isOverall": false, "label": "Clic Boton Emitir Prima - -273", "isController": false}, {"data": [[4.0, 6264.0]], "isOverall": false, "label": "Clic Boton Emitir Prima - -273-Aggregated", "isController": false}, {"data": [[8.0, 931.5]], "isOverall": false, "label": "Grabar Edicion de Facturacion - -144", "isController": false}, {"data": [[8.0, 931.5]], "isOverall": false, "label": "Grabar Edicion de Facturacion - -144-Aggregated", "isController": false}, {"data": [[8.0, 4270.75]], "isOverall": false, "label": "Grabar Edicion de Facturacion - -143", "isController": false}, {"data": [[8.0, 4270.75]], "isOverall": false, "label": "Grabar Edicion de Facturacion - -143-Aggregated", "isController": false}, {"data": [[6.0, 6589.5]], "isOverall": false, "label": "Siguiente - -230", "isController": false}, {"data": [[6.0, 6589.5]], "isOverall": false, "label": "Siguiente - -230-Aggregated", "isController": false}, {"data": [[6.0, 792.0]], "isOverall": false, "label": "Siguiente - -231", "isController": false}, {"data": [[6.0, 792.0]], "isOverall": false, "label": "Siguiente - -231-Aggregated", "isController": false}, {"data": [[6.0, 9528.25]], "isOverall": false, "label": "Siguiente - -232", "isController": false}, {"data": [[6.0, 9528.25]], "isOverall": false, "label": "Siguiente - -232-Aggregated", "isController": false}, {"data": [[6.0, 953.5]], "isOverall": false, "label": "Siguiente - -233", "isController": false}, {"data": [[6.0, 953.5]], "isOverall": false, "label": "Siguiente - -233-Aggregated", "isController": false}, {"data": [[6.0, 7135.5]], "isOverall": false, "label": "Siguiente - -234", "isController": false}, {"data": [[6.0, 7135.5]], "isOverall": false, "label": "Siguiente - -234-Aggregated", "isController": false}, {"data": [[6.0, 1027.5]], "isOverall": false, "label": "Siguiente - -235", "isController": false}, {"data": [[6.0, 1027.5]], "isOverall": false, "label": "Siguiente - -235-Aggregated", "isController": false}, {"data": [[10.0, 6644.0]], "isOverall": false, "label": "Login - -40", "isController": false}, {"data": [[10.0, 6644.0]], "isOverall": false, "label": "Login - -40-Aggregated", "isController": false}, {"data": [[10.0, 373.0]], "isOverall": false, "label": "Clic Menu Control de Poliza - -80", "isController": false}, {"data": [[10.0, 373.0]], "isOverall": false, "label": "Clic Menu Control de Poliza - -80-Aggregated", "isController": false}, {"data": [[6.0, 1137.5]], "isOverall": false, "label": "Siguiente - -229", "isController": false}, {"data": [[6.0, 1137.5]], "isOverall": false, "label": "Siguiente - -229-Aggregated", "isController": false}, {"data": [[2.0, 1.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[2.0, 1.0]], "isOverall": false, "label": "Debug Sampler-Aggregated", "isController": false}, {"data": [[10.0, 4056.0]], "isOverall": false, "label": "Login - -38", "isController": false}, {"data": [[10.0, 4056.0]], "isOverall": false, "label": "Login - -38-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 370.68333333333334, "minX": 1.59594972E12, "maxY": 49143.816666666666, "series": [{"data": [[1.59594996E12, 30325.783333333333], [1.59594978E12, 38114.86666666667], [1.59595008E12, 19361.283333333333], [1.5959499E12, 32531.15], [1.59594972E12, 30481.933333333334], [1.59595002E12, 34829.61666666667], [1.59594984E12, 49143.816666666666]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.59594996E12, 370.68333333333334], [1.59594978E12, 3625.116666666667], [1.59595008E12, 2001.4333333333334], [1.5959499E12, 665.2833333333333], [1.59594972E12, 982.8], [1.59595002E12, 4840.533333333334], [1.59594984E12, 1751.3]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59595008E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.59594972E12, "maxY": 33386.5, "series": [{"data": [[1.59594972E12, 6440.0]], "isOverall": false, "label": "Login - -40-1", "isController": false}, {"data": [[1.59594972E12, 203.5]], "isOverall": false, "label": "Login - -40-0", "isController": false}, {"data": [[1.59595002E12, 2607.0]], "isOverall": false, "label": "Ingresar Cantidad a Pagar - -290", "isController": false}, {"data": [[1.59595002E12, 2223.5]], "isOverall": false, "label": "Ingresar Cantidad a Pagar - -291", "isController": false}, {"data": [[1.59594984E12, 6079.5]], "isOverall": false, "label": "Siguiente - -201", "isController": false}, {"data": [[1.59594984E12, 712.0]], "isOverall": false, "label": "Siguiente - -202", "isController": false}, {"data": [[1.59594978E12, 321.0]], "isOverall": false, "label": "Clic en Menu Participante - -146", "isController": false}, {"data": [[1.59594984E12, 4633.25]], "isOverall": false, "label": "Siguiente - -203", "isController": false}, {"data": [[1.59594984E12, 647.5]], "isOverall": false, "label": "Siguiente - -204", "isController": false}, {"data": [[1.59594978E12, 11780.0]], "isOverall": false, "label": "Seleccionar Agente - -110", "isController": false}, {"data": [[1.59594978E12, 1121.0]], "isOverall": false, "label": "Seleccionar Agente - -111", "isController": false}, {"data": [[1.59594978E12, 135.0]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -180", "isController": false}, {"data": [[1.59594978E12, 5684.0]], "isOverall": false, "label": "Siguiente - -174", "isController": false}, {"data": [[1.59594978E12, 594.0]], "isOverall": false, "label": "Siguiente - -175", "isController": false}, {"data": [[1.59594984E12, 894.0]], "isOverall": false, "label": "Clic Boton Crear Deducible - -208", "isController": false}, {"data": [[1.59595002E12, 1564.5]], "isOverall": false, "label": "Clic Boton Confirmar Pre-Emision - -270", "isController": false}, {"data": [[1.59594978E12, 844.0]], "isOverall": false, "label": "Clic en Boton Grabar Participante - -171", "isController": false}, {"data": [[1.59595002E12, 2266.0]], "isOverall": false, "label": "Ingresar Usage Description - -289", "isController": false}, {"data": [[1.59594978E12, 950.5]], "isOverall": false, "label": "Clic en Menu Participante - -145", "isController": false}, {"data": [[1.59595002E12, 1771.0]], "isOverall": false, "label": "Ingresar Usage Description - -288", "isController": false}, {"data": [[1.59594984E12, 848.0]], "isOverall": false, "label": "Editar Datos del Objeto - -197", "isController": false}, {"data": [[1.59595002E12, 2719.0]], "isOverall": false, "label": "Ingresar Usage Description - -287", "isController": false}, {"data": [[1.59595002E12, 3856.0]], "isOverall": false, "label": "Ingresar Usage Description - -286", "isController": false}, {"data": [[1.59594978E12, 3427.5]], "isOverall": false, "label": "Clic en Boton Grabar Participante - -170", "isController": false}, {"data": [[1.59594984E12, 566.0]], "isOverall": false, "label": "Editar Datos del Objeto - -199", "isController": false}, {"data": [[1.59595002E12, 10330.5]], "isOverall": false, "label": "Ingresar Poliza a Pagar - -285", "isController": false}, {"data": [[1.59594984E12, 3534.5]], "isOverall": false, "label": "Editar Datos del Objeto - -198", "isController": false}, {"data": [[1.59594978E12, 5154.25]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -176", "isController": false}, {"data": [[1.59594978E12, 1166.5]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -178", "isController": false}, {"data": [[1.59594978E12, 689.0]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -177", "isController": false}, {"data": [[1.59594996E12, 6948.0], [1.59595002E12, 7088.0]], "isOverall": false, "label": "Siguiente - -261", "isController": false}, {"data": [[1.59595002E12, 619.0]], "isOverall": false, "label": "Clic Menu Pagos - -278", "isController": false}, {"data": [[1.59595008E12, 194.0]], "isOverall": false, "label": "Clic Boton Proceder - -302", "isController": false}, {"data": [[1.59594996E12, 926.0], [1.59595002E12, 960.0]], "isOverall": false, "label": "Siguiente - -262", "isController": false}, {"data": [[1.59595002E12, 5612.5]], "isOverall": false, "label": "Clic Menu Pagos - -277", "isController": false}, {"data": [[1.59595008E12, 162.0]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -300", "isController": false}, {"data": [[1.59595002E12, 6828.5]], "isOverall": false, "label": "Siguiente - -263", "isController": false}, {"data": [[1.59595008E12, 289.5]], "isOverall": false, "label": "Clic Boton Proceder - -301", "isController": false}, {"data": [[1.59595002E12, 1527.0]], "isOverall": false, "label": "Siguiente - -265", "isController": false}, {"data": [[1.59594972E12, 1917.5]], "isOverall": false, "label": "Seleciionar el Producto - -107", "isController": false}, {"data": [[1.59594972E12, 7377.0]], "isOverall": false, "label": "Seleciionar el Producto - -108", "isController": false}, {"data": [[1.59594972E12, 765.5]], "isOverall": false, "label": "Clic Menu Operaciones del Sistema - -66", "isController": false}, {"data": [[1.59595002E12, 5232.5]], "isOverall": false, "label": "Clic Boton Calculo de Prima - -266", "isController": false}, {"data": [[1.59595002E12, 1915.0]], "isOverall": false, "label": "Clic Boton Validacion - -267", "isController": false}, {"data": [[1.59594984E12, 5799.0]], "isOverall": false, "label": "Clic Boton Grabar Datos del Objeto - -190", "isController": false}, {"data": [[1.59595008E12, 2179.0]], "isOverall": false, "label": "Clic Boton Grabar Pago - -295", "isController": false}, {"data": [[1.59594984E12, 1519.5]], "isOverall": false, "label": "Clic Boton Editar Datos del Objeto - -196", "isController": false}, {"data": [[1.59594978E12, 911.0], [1.59594984E12, 1089.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -189", "isController": false}, {"data": [[1.59594978E12, 769.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -188", "isController": false}, {"data": [[1.59594978E12, 1096.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -187", "isController": false}, {"data": [[1.59594978E12, 1777.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -186", "isController": false}, {"data": [[1.59594978E12, 1349.5]], "isOverall": false, "label": "Agregar Datos del Objeto - -185", "isController": false}, {"data": [[1.59594978E12, 1535.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -182", "isController": false}, {"data": [[1.59594978E12, 2406.25]], "isOverall": false, "label": "Agregar Datos del Objeto - -181", "isController": false}, {"data": [[1.59595002E12, 4362.25]], "isOverall": false, "label": "Clic Boton Nuevo - -283", "isController": false}, {"data": [[1.59595008E12, 609.0]], "isOverall": false, "label": "Clic Boton Grabar Pago - -296", "isController": false}, {"data": [[1.59595002E12, 634.5]], "isOverall": false, "label": "Clic Boton Nuevo - -284", "isController": false}, {"data": [[1.59594978E12, 9489.0]], "isOverall": false, "label": "Seleccionar Agente - -109", "isController": false}, {"data": [[1.59594978E12, 360.0]], "isOverall": false, "label": "Editar Facturacion - -138", "isController": false}, {"data": [[1.59594984E12, 2772.25]], "isOverall": false, "label": "Clic Boton Guardar de Deducible - -218", "isController": false}, {"data": [[1.59594978E12, 874.5]], "isOverall": false, "label": "Editar Facturacion - -139", "isController": false}, {"data": [[1.59594984E12, 688.5]], "isOverall": false, "label": "Clic Boton Guardar de Deducible - -219", "isController": false}, {"data": [[1.59594978E12, 2249.0]], "isOverall": false, "label": "Editar Facturacion - -137", "isController": false}, {"data": [[1.59594984E12, 2098.5]], "isOverall": false, "label": "Agregar Datos de Deducible - -209", "isController": false}, {"data": [[1.59594972E12, 4113.25]], "isOverall": false, "label": "Clic Menu Crear Poliza- -84", "isController": false}, {"data": [[1.59594984E12, 1764.5]], "isOverall": false, "label": "Clic Boton Cerrar Datos del Objeto - -194", "isController": false}, {"data": [[1.59594972E12, 721.5]], "isOverall": false, "label": "Clic Menu Crear Poliza- -85", "isController": false}, {"data": [[1.59594984E12, 2076.5]], "isOverall": false, "label": "Clic Boton Cerrar Datos del Objeto - -193", "isController": false}, {"data": [[1.59594984E12, 12193.5]], "isOverall": false, "label": "Editar Datos del Objeto - -200", "isController": false}, {"data": [[1.59594984E12, 1057.5]], "isOverall": false, "label": "Clic Boton Cerrar Datos del Objeto - -195", "isController": false}, {"data": [[1.59594978E12, 766.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -164", "isController": false}, {"data": [[1.59594978E12, 1523.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -165", "isController": false}, {"data": [[1.59594978E12, 1045.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -162", "isController": false}, {"data": [[1.59594978E12, 1544.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -163", "isController": false}, {"data": [[1.59594978E12, 670.5]], "isOverall": false, "label": "Editar Facturacion - -141", "isController": false}, {"data": [[1.59594978E12, 841.0]], "isOverall": false, "label": "Editar Facturacion - -142", "isController": false}, {"data": [[1.59594978E12, 537.0]], "isOverall": false, "label": "Editar Facturacion - -140", "isController": false}, {"data": [[1.59594984E12, 849.0]], "isOverall": false, "label": "Agregar Datos de Deducible - -214", "isController": false}, {"data": [[1.59594984E12, 654.0]], "isOverall": false, "label": "Clic Boton Grabar Datos del Objeto - -192", "isController": false}, {"data": [[1.59594984E12, 1529.5]], "isOverall": false, "label": "Agregar Datos de Deducible - -213", "isController": false}, {"data": [[1.59594972E12, 793.5]], "isOverall": false, "label": "Clic Menu Control de P - -74", "isController": false}, {"data": [[1.59594996E12, 26466.0], [1.5959499E12, 6049.333333333333]], "isOverall": false, "label": "Siguiente - -250", "isController": false}, {"data": [[1.59595008E12, 651.0]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -299", "isController": false}, {"data": [[1.59594996E12, 21114.0], [1.5959499E12, 780.0]], "isOverall": false, "label": "Siguiente - -251", "isController": false}, {"data": [[1.59594972E12, 142.0]], "isOverall": false, "label": "Clic Menu Crear Poliza- -97", "isController": false}, {"data": [[1.59594996E12, 5493.0]], "isOverall": false, "label": "Siguiente - -253", "isController": false}, {"data": [[1.59594996E12, 756.0]], "isOverall": false, "label": "Siguiente - -254", "isController": false}, {"data": [[1.59594972E12, 399.5]], "isOverall": false, "label": "Login - -38-0", "isController": false}, {"data": [[1.59594996E12, 33386.5]], "isOverall": false, "label": "Siguiente - -255", "isController": false}, {"data": [[1.59594972E12, 216.5]], "isOverall": false, "label": "Index - -23", "isController": false}, {"data": [[1.59594978E12, 357.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -155", "isController": false}, {"data": [[1.59594996E12, 821.0]], "isOverall": false, "label": "Siguiente - -256", "isController": false}, {"data": [[1.59594972E12, 1120.25]], "isOverall": false, "label": "Index - -22", "isController": false}, {"data": [[1.59594978E12, 2139.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -156", "isController": false}, {"data": [[1.59594978E12, 295.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -153", "isController": false}, {"data": [[1.59594972E12, 334.5]], "isOverall": false, "label": "Login - -38-1", "isController": false}, {"data": [[1.59594978E12, 685.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -151", "isController": false}, {"data": [[1.59594978E12, 679.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -152", "isController": false}, {"data": [[1.59594978E12, 3693.25]], "isOverall": false, "label": "Clic en Boton Crea Participante - -161", "isController": false}, {"data": [[1.59594996E12, 19805.5]], "isOverall": false, "label": "Clic Boton Calculo de Prima - -252", "isController": false}, {"data": [[1.59595008E12, 3180.5]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -297", "isController": false}, {"data": [[1.59595008E12, 770.0]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -298", "isController": false}, {"data": [[1.59594984E12, 1159.0]], "isOverall": false, "label": "Agregar Datos de Deducible - -210", "isController": false}, {"data": [[1.59594972E12, 2423.5]], "isOverall": false, "label": "Buscar Cliente - -100", "isController": false}, {"data": [[1.59594972E12, 861.0]], "isOverall": false, "label": "Buscar Cliente - -101", "isController": false}, {"data": [[1.59594984E12, 764.5]], "isOverall": false, "label": "Agregar Datos de Deducible - -212", "isController": false}, {"data": [[1.59594984E12, 795.5]], "isOverall": false, "label": "Agregar Datos de Deducible - -211", "isController": false}, {"data": [[1.59594978E12, 3152.25]], "isOverall": false, "label": "Clic en Boton Crea Participante - -148", "isController": false}, {"data": [[1.59594978E12, 798.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -149", "isController": false}, {"data": [[1.59594984E12, 5568.75]], "isOverall": false, "label": "Siguiente - -220", "isController": false}, {"data": [[1.59594972E12, 10600.5]], "isOverall": false, "label": "Siguiente - -102", "isController": false}, {"data": [[1.59594984E12, 739.5]], "isOverall": false, "label": "Siguiente - -223", "isController": false}, {"data": [[1.59594972E12, 943.0]], "isOverall": false, "label": "Siguiente - -103", "isController": false}, {"data": [[1.5959499E12, 8710.25]], "isOverall": false, "label": "Siguiente - -224", "isController": false}, {"data": [[1.5959499E12, 2299.5]], "isOverall": false, "label": "Siguiente - -227", "isController": false}, {"data": [[1.5959499E12, 7353.25]], "isOverall": false, "label": "Siguiente - -228", "isController": false}, {"data": [[1.59594972E12, 100.5]], "isOverall": false, "label": "Index - -23-0", "isController": false}, {"data": [[1.59594972E12, 115.5]], "isOverall": false, "label": "Index - -23-1", "isController": false}, {"data": [[1.59595002E12, 2725.75]], "isOverall": false, "label": "Clic Boton Ok Pago - -292", "isController": false}, {"data": [[1.59595002E12, 1440.5]], "isOverall": false, "label": "Clic Menu Facturacion y Cobranza - -276", "isController": false}, {"data": [[1.59595002E12, 680.0]], "isOverall": false, "label": "Clic Boton Ok Pago - -293", "isController": false}, {"data": [[1.59595002E12, 263.5]], "isOverall": false, "label": "Clic Boton Ok Pago - -294", "isController": false}, {"data": [[1.59594972E12, 2162.75]], "isOverall": false, "label": "Buscar Cliente - -99", "isController": false}, {"data": [[1.59595002E12, 6264.0]], "isOverall": false, "label": "Clic Boton Emitir Prima - -273", "isController": false}, {"data": [[1.59594978E12, 931.5]], "isOverall": false, "label": "Grabar Edicion de Facturacion - -144", "isController": false}, {"data": [[1.59594978E12, 4270.75]], "isOverall": false, "label": "Grabar Edicion de Facturacion - -143", "isController": false}, {"data": [[1.5959499E12, 6589.5]], "isOverall": false, "label": "Siguiente - -230", "isController": false}, {"data": [[1.5959499E12, 792.0]], "isOverall": false, "label": "Siguiente - -231", "isController": false}, {"data": [[1.5959499E12, 9528.25]], "isOverall": false, "label": "Siguiente - -232", "isController": false}, {"data": [[1.5959499E12, 953.5]], "isOverall": false, "label": "Siguiente - -233", "isController": false}, {"data": [[1.5959499E12, 7135.5]], "isOverall": false, "label": "Siguiente - -234", "isController": false}, {"data": [[1.5959499E12, 1027.5]], "isOverall": false, "label": "Siguiente - -235", "isController": false}, {"data": [[1.59594972E12, 6644.0]], "isOverall": false, "label": "Login - -40", "isController": false}, {"data": [[1.59594972E12, 373.0]], "isOverall": false, "label": "Clic Menu Control de Poliza - -80", "isController": false}, {"data": [[1.5959499E12, 1137.5]], "isOverall": false, "label": "Siguiente - -229", "isController": false}, {"data": [[1.59595008E12, 1.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59594972E12, 4056.0]], "isOverall": false, "label": "Login - -38", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59595008E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.59594972E12, "maxY": 31404.0, "series": [{"data": [[1.59594972E12, 6233.0]], "isOverall": false, "label": "Login - -40-1", "isController": false}, {"data": [[1.59594972E12, 203.0]], "isOverall": false, "label": "Login - -40-0", "isController": false}, {"data": [[1.59595002E12, 2606.0]], "isOverall": false, "label": "Ingresar Cantidad a Pagar - -290", "isController": false}, {"data": [[1.59595002E12, 2221.5]], "isOverall": false, "label": "Ingresar Cantidad a Pagar - -291", "isController": false}, {"data": [[1.59594984E12, 5346.75]], "isOverall": false, "label": "Siguiente - -201", "isController": false}, {"data": [[1.59594984E12, 694.5]], "isOverall": false, "label": "Siguiente - -202", "isController": false}, {"data": [[1.59594978E12, 151.0]], "isOverall": false, "label": "Clic en Menu Participante - -146", "isController": false}, {"data": [[1.59594984E12, 4250.75]], "isOverall": false, "label": "Siguiente - -203", "isController": false}, {"data": [[1.59594984E12, 618.5]], "isOverall": false, "label": "Siguiente - -204", "isController": false}, {"data": [[1.59594978E12, 11172.5]], "isOverall": false, "label": "Seleccionar Agente - -110", "isController": false}, {"data": [[1.59594978E12, 892.0]], "isOverall": false, "label": "Seleccionar Agente - -111", "isController": false}, {"data": [[1.59594978E12, 126.0]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -180", "isController": false}, {"data": [[1.59594978E12, 5054.5]], "isOverall": false, "label": "Siguiente - -174", "isController": false}, {"data": [[1.59594978E12, 587.0]], "isOverall": false, "label": "Siguiente - -175", "isController": false}, {"data": [[1.59594984E12, 781.5]], "isOverall": false, "label": "Clic Boton Crear Deducible - -208", "isController": false}, {"data": [[1.59595002E12, 1475.5]], "isOverall": false, "label": "Clic Boton Confirmar Pre-Emision - -270", "isController": false}, {"data": [[1.59594978E12, 646.0]], "isOverall": false, "label": "Clic en Boton Grabar Participante - -171", "isController": false}, {"data": [[1.59595002E12, 1886.5]], "isOverall": false, "label": "Ingresar Usage Description - -289", "isController": false}, {"data": [[1.59594978E12, 706.0]], "isOverall": false, "label": "Clic en Menu Participante - -145", "isController": false}, {"data": [[1.59595002E12, 1578.75]], "isOverall": false, "label": "Ingresar Usage Description - -288", "isController": false}, {"data": [[1.59594984E12, 833.5]], "isOverall": false, "label": "Editar Datos del Objeto - -197", "isController": false}, {"data": [[1.59595002E12, 2246.5]], "isOverall": false, "label": "Ingresar Usage Description - -287", "isController": false}, {"data": [[1.59595002E12, 3121.75]], "isOverall": false, "label": "Ingresar Usage Description - -286", "isController": false}, {"data": [[1.59594978E12, 2963.0]], "isOverall": false, "label": "Clic en Boton Grabar Participante - -170", "isController": false}, {"data": [[1.59594984E12, 555.0]], "isOverall": false, "label": "Editar Datos del Objeto - -199", "isController": false}, {"data": [[1.59595002E12, 9814.5]], "isOverall": false, "label": "Ingresar Poliza a Pagar - -285", "isController": false}, {"data": [[1.59594984E12, 2869.5]], "isOverall": false, "label": "Editar Datos del Objeto - -198", "isController": false}, {"data": [[1.59594978E12, 4675.5]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -176", "isController": false}, {"data": [[1.59594978E12, 667.5]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -178", "isController": false}, {"data": [[1.59594978E12, 667.5]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -177", "isController": false}, {"data": [[1.59594996E12, 6312.0], [1.59595002E12, 6523.0]], "isOverall": false, "label": "Siguiente - -261", "isController": false}, {"data": [[1.59595002E12, 529.5]], "isOverall": false, "label": "Clic Menu Pagos - -278", "isController": false}, {"data": [[1.59595008E12, 192.5]], "isOverall": false, "label": "Clic Boton Proceder - -302", "isController": false}, {"data": [[1.59594996E12, 838.0], [1.59595002E12, 871.0]], "isOverall": false, "label": "Siguiente - -262", "isController": false}, {"data": [[1.59595002E12, 4506.75]], "isOverall": false, "label": "Clic Menu Pagos - -277", "isController": false}, {"data": [[1.59595008E12, 152.0]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -300", "isController": false}, {"data": [[1.59595002E12, 6511.25]], "isOverall": false, "label": "Siguiente - -263", "isController": false}, {"data": [[1.59595008E12, 286.75]], "isOverall": false, "label": "Clic Boton Proceder - -301", "isController": false}, {"data": [[1.59595002E12, 1524.5]], "isOverall": false, "label": "Siguiente - -265", "isController": false}, {"data": [[1.59594972E12, 1907.5]], "isOverall": false, "label": "Seleciionar el Producto - -107", "isController": false}, {"data": [[1.59594972E12, 5818.5]], "isOverall": false, "label": "Seleciionar el Producto - -108", "isController": false}, {"data": [[1.59594972E12, 702.0]], "isOverall": false, "label": "Clic Menu Operaciones del Sistema - -66", "isController": false}, {"data": [[1.59595002E12, 4975.0]], "isOverall": false, "label": "Clic Boton Calculo de Prima - -266", "isController": false}, {"data": [[1.59595002E12, 1912.0]], "isOverall": false, "label": "Clic Boton Validacion - -267", "isController": false}, {"data": [[1.59594984E12, 5435.5]], "isOverall": false, "label": "Clic Boton Grabar Datos del Objeto - -190", "isController": false}, {"data": [[1.59595008E12, 1107.75]], "isOverall": false, "label": "Clic Boton Grabar Pago - -295", "isController": false}, {"data": [[1.59594984E12, 777.0]], "isOverall": false, "label": "Clic Boton Editar Datos del Objeto - -196", "isController": false}, {"data": [[1.59594978E12, 866.0], [1.59594984E12, 1068.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -189", "isController": false}, {"data": [[1.59594978E12, 750.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -188", "isController": false}, {"data": [[1.59594978E12, 1084.5]], "isOverall": false, "label": "Agregar Datos del Objeto - -187", "isController": false}, {"data": [[1.59594978E12, 1758.75]], "isOverall": false, "label": "Agregar Datos del Objeto - -186", "isController": false}, {"data": [[1.59594978E12, 1339.5]], "isOverall": false, "label": "Agregar Datos del Objeto - -185", "isController": false}, {"data": [[1.59594978E12, 1524.5]], "isOverall": false, "label": "Agregar Datos del Objeto - -182", "isController": false}, {"data": [[1.59594978E12, 2383.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -181", "isController": false}, {"data": [[1.59595002E12, 3473.25]], "isOverall": false, "label": "Clic Boton Nuevo - -283", "isController": false}, {"data": [[1.59595008E12, 508.5]], "isOverall": false, "label": "Clic Boton Grabar Pago - -296", "isController": false}, {"data": [[1.59595002E12, 536.5]], "isOverall": false, "label": "Clic Boton Nuevo - -284", "isController": false}, {"data": [[1.59594978E12, 9044.75]], "isOverall": false, "label": "Seleccionar Agente - -109", "isController": false}, {"data": [[1.59594978E12, 207.0]], "isOverall": false, "label": "Editar Facturacion - -138", "isController": false}, {"data": [[1.59594984E12, 2312.0]], "isOverall": false, "label": "Clic Boton Guardar de Deducible - -218", "isController": false}, {"data": [[1.59594978E12, 868.5]], "isOverall": false, "label": "Editar Facturacion - -139", "isController": false}, {"data": [[1.59594984E12, 603.0]], "isOverall": false, "label": "Clic Boton Guardar de Deducible - -219", "isController": false}, {"data": [[1.59594978E12, 2057.5]], "isOverall": false, "label": "Editar Facturacion - -137", "isController": false}, {"data": [[1.59594984E12, 2093.0]], "isOverall": false, "label": "Agregar Datos de Deducible - -209", "isController": false}, {"data": [[1.59594972E12, 2189.75]], "isOverall": false, "label": "Clic Menu Crear Poliza- -84", "isController": false}, {"data": [[1.59594984E12, 820.5]], "isOverall": false, "label": "Clic Boton Cerrar Datos del Objeto - -194", "isController": false}, {"data": [[1.59594972E12, 648.5]], "isOverall": false, "label": "Clic Menu Crear Poliza- -85", "isController": false}, {"data": [[1.59594984E12, 1581.25]], "isOverall": false, "label": "Clic Boton Cerrar Datos del Objeto - -193", "isController": false}, {"data": [[1.59594984E12, 11036.0]], "isOverall": false, "label": "Editar Datos del Objeto - -200", "isController": false}, {"data": [[1.59594984E12, 1049.0]], "isOverall": false, "label": "Clic Boton Cerrar Datos del Objeto - -195", "isController": false}, {"data": [[1.59594978E12, 761.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -164", "isController": false}, {"data": [[1.59594978E12, 1514.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -165", "isController": false}, {"data": [[1.59594978E12, 1014.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -162", "isController": false}, {"data": [[1.59594978E12, 1510.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -163", "isController": false}, {"data": [[1.59594978E12, 658.5]], "isOverall": false, "label": "Editar Facturacion - -141", "isController": false}, {"data": [[1.59594978E12, 823.0]], "isOverall": false, "label": "Editar Facturacion - -142", "isController": false}, {"data": [[1.59594978E12, 348.0]], "isOverall": false, "label": "Editar Facturacion - -140", "isController": false}, {"data": [[1.59594984E12, 848.0]], "isOverall": false, "label": "Agregar Datos de Deducible - -214", "isController": false}, {"data": [[1.59594984E12, 639.0]], "isOverall": false, "label": "Clic Boton Grabar Datos del Objeto - -192", "isController": false}, {"data": [[1.59594984E12, 1526.0]], "isOverall": false, "label": "Agregar Datos de Deducible - -213", "isController": false}, {"data": [[1.59594972E12, 792.5]], "isOverall": false, "label": "Clic Menu Control de P - -74", "isController": false}, {"data": [[1.59594996E12, 25799.0], [1.5959499E12, 5522.0]], "isOverall": false, "label": "Siguiente - -250", "isController": false}, {"data": [[1.59595008E12, 266.0]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -299", "isController": false}, {"data": [[1.59594996E12, 20998.0], [1.5959499E12, 679.0]], "isOverall": false, "label": "Siguiente - -251", "isController": false}, {"data": [[1.59594972E12, 142.0]], "isOverall": false, "label": "Clic Menu Crear Poliza- -97", "isController": false}, {"data": [[1.59594996E12, 4906.5]], "isOverall": false, "label": "Siguiente - -253", "isController": false}, {"data": [[1.59594996E12, 663.0]], "isOverall": false, "label": "Siguiente - -254", "isController": false}, {"data": [[1.59594972E12, 399.5]], "isOverall": false, "label": "Login - -38-0", "isController": false}, {"data": [[1.59594996E12, 31404.0]], "isOverall": false, "label": "Siguiente - -255", "isController": false}, {"data": [[1.59594972E12, 100.5]], "isOverall": false, "label": "Index - -23", "isController": false}, {"data": [[1.59594978E12, 355.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -155", "isController": false}, {"data": [[1.59594996E12, 680.0]], "isOverall": false, "label": "Siguiente - -256", "isController": false}, {"data": [[1.59594972E12, 1061.75]], "isOverall": false, "label": "Index - -22", "isController": false}, {"data": [[1.59594978E12, 1830.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -156", "isController": false}, {"data": [[1.59594978E12, 289.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -153", "isController": false}, {"data": [[1.59594972E12, 334.0]], "isOverall": false, "label": "Login - -38-1", "isController": false}, {"data": [[1.59594978E12, 681.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -151", "isController": false}, {"data": [[1.59594978E12, 461.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -152", "isController": false}, {"data": [[1.59594978E12, 3651.25]], "isOverall": false, "label": "Clic en Boton Crea Participante - -161", "isController": false}, {"data": [[1.59594996E12, 19668.0]], "isOverall": false, "label": "Clic Boton Calculo de Prima - -252", "isController": false}, {"data": [[1.59595008E12, 2400.0]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -297", "isController": false}, {"data": [[1.59595008E12, 633.0]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -298", "isController": false}, {"data": [[1.59594984E12, 1157.5]], "isOverall": false, "label": "Agregar Datos de Deducible - -210", "isController": false}, {"data": [[1.59594972E12, 2412.5]], "isOverall": false, "label": "Buscar Cliente - -100", "isController": false}, {"data": [[1.59594972E12, 670.5]], "isOverall": false, "label": "Buscar Cliente - -101", "isController": false}, {"data": [[1.59594984E12, 759.0]], "isOverall": false, "label": "Agregar Datos de Deducible - -212", "isController": false}, {"data": [[1.59594984E12, 791.5]], "isOverall": false, "label": "Agregar Datos de Deducible - -211", "isController": false}, {"data": [[1.59594978E12, 2661.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -148", "isController": false}, {"data": [[1.59594978E12, 475.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -149", "isController": false}, {"data": [[1.59594984E12, 4766.25]], "isOverall": false, "label": "Siguiente - -220", "isController": false}, {"data": [[1.59594972E12, 9035.75]], "isOverall": false, "label": "Siguiente - -102", "isController": false}, {"data": [[1.59594984E12, 704.5]], "isOverall": false, "label": "Siguiente - -223", "isController": false}, {"data": [[1.59594972E12, 844.5]], "isOverall": false, "label": "Siguiente - -103", "isController": false}, {"data": [[1.5959499E12, 6138.0]], "isOverall": false, "label": "Siguiente - -224", "isController": false}, {"data": [[1.5959499E12, 798.0]], "isOverall": false, "label": "Siguiente - -227", "isController": false}, {"data": [[1.5959499E12, 6386.25]], "isOverall": false, "label": "Siguiente - -228", "isController": false}, {"data": [[1.59594972E12, 100.5]], "isOverall": false, "label": "Index - -23-0", "isController": false}, {"data": [[1.59594972E12, 112.5]], "isOverall": false, "label": "Index - -23-1", "isController": false}, {"data": [[1.59595002E12, 2281.75]], "isOverall": false, "label": "Clic Boton Ok Pago - -292", "isController": false}, {"data": [[1.59595002E12, 1348.0]], "isOverall": false, "label": "Clic Menu Facturacion y Cobranza - -276", "isController": false}, {"data": [[1.59595002E12, 451.5]], "isOverall": false, "label": "Clic Boton Ok Pago - -293", "isController": false}, {"data": [[1.59595002E12, 261.0]], "isOverall": false, "label": "Clic Boton Ok Pago - -294", "isController": false}, {"data": [[1.59594972E12, 2048.0]], "isOverall": false, "label": "Buscar Cliente - -99", "isController": false}, {"data": [[1.59595002E12, 5980.0]], "isOverall": false, "label": "Clic Boton Emitir Prima - -273", "isController": false}, {"data": [[1.59594978E12, 795.0]], "isOverall": false, "label": "Grabar Edicion de Facturacion - -144", "isController": false}, {"data": [[1.59594978E12, 3616.5]], "isOverall": false, "label": "Grabar Edicion de Facturacion - -143", "isController": false}, {"data": [[1.5959499E12, 6041.75]], "isOverall": false, "label": "Siguiente - -230", "isController": false}, {"data": [[1.5959499E12, 635.5]], "isOverall": false, "label": "Siguiente - -231", "isController": false}, {"data": [[1.5959499E12, 8518.0]], "isOverall": false, "label": "Siguiente - -232", "isController": false}, {"data": [[1.5959499E12, 712.0]], "isOverall": false, "label": "Siguiente - -233", "isController": false}, {"data": [[1.5959499E12, 6424.5]], "isOverall": false, "label": "Siguiente - -234", "isController": false}, {"data": [[1.5959499E12, 854.5]], "isOverall": false, "label": "Siguiente - -235", "isController": false}, {"data": [[1.59594972E12, 203.0]], "isOverall": false, "label": "Login - -40", "isController": false}, {"data": [[1.59594972E12, 283.0]], "isOverall": false, "label": "Clic Menu Control de Poliza - -80", "isController": false}, {"data": [[1.5959499E12, 688.5]], "isOverall": false, "label": "Siguiente - -229", "isController": false}, {"data": [[1.59595008E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59594972E12, 501.0]], "isOverall": false, "label": "Login - -38", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59595008E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.59594972E12, "maxY": 1134.5, "series": [{"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "Login - -40-1", "isController": false}, {"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "Login - -40-0", "isController": false}, {"data": [[1.59595002E12, 420.5]], "isOverall": false, "label": "Ingresar Cantidad a Pagar - -290", "isController": false}, {"data": [[1.59595002E12, 325.0]], "isOverall": false, "label": "Ingresar Cantidad a Pagar - -291", "isController": false}, {"data": [[1.59594984E12, 803.5]], "isOverall": false, "label": "Siguiente - -201", "isController": false}, {"data": [[1.59594984E12, 513.0]], "isOverall": false, "label": "Siguiente - -202", "isController": false}, {"data": [[1.59594978E12, 0.0]], "isOverall": false, "label": "Clic en Menu Participante - -146", "isController": false}, {"data": [[1.59594984E12, 220.0]], "isOverall": false, "label": "Siguiente - -203", "isController": false}, {"data": [[1.59594984E12, 440.0]], "isOverall": false, "label": "Siguiente - -204", "isController": false}, {"data": [[1.59594978E12, 536.0]], "isOverall": false, "label": "Seleccionar Agente - -110", "isController": false}, {"data": [[1.59594978E12, 446.5]], "isOverall": false, "label": "Seleccionar Agente - -111", "isController": false}, {"data": [[1.59594978E12, 0.0]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -180", "isController": false}, {"data": [[1.59594978E12, 224.25]], "isOverall": false, "label": "Siguiente - -174", "isController": false}, {"data": [[1.59594978E12, 448.5]], "isOverall": false, "label": "Siguiente - -175", "isController": false}, {"data": [[1.59594984E12, 0.0]], "isOverall": false, "label": "Clic Boton Crear Deducible - -208", "isController": false}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "Clic Boton Confirmar Pre-Emision - -270", "isController": false}, {"data": [[1.59594978E12, 428.0]], "isOverall": false, "label": "Clic en Boton Grabar Participante - -171", "isController": false}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "Ingresar Usage Description - -289", "isController": false}, {"data": [[1.59594978E12, 0.0]], "isOverall": false, "label": "Clic en Menu Participante - -145", "isController": false}, {"data": [[1.59595002E12, 451.5]], "isOverall": false, "label": "Ingresar Usage Description - -288", "isController": false}, {"data": [[1.59594984E12, 315.5]], "isOverall": false, "label": "Editar Datos del Objeto - -197", "isController": false}, {"data": [[1.59595002E12, 383.0]], "isOverall": false, "label": "Ingresar Usage Description - -287", "isController": false}, {"data": [[1.59595002E12, 550.5]], "isOverall": false, "label": "Ingresar Usage Description - -286", "isController": false}, {"data": [[1.59594978E12, 214.0]], "isOverall": false, "label": "Clic en Boton Grabar Participante - -170", "isController": false}, {"data": [[1.59594984E12, 367.0]], "isOverall": false, "label": "Editar Datos del Objeto - -199", "isController": false}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "Ingresar Poliza a Pagar - -285", "isController": false}, {"data": [[1.59594984E12, 183.5]], "isOverall": false, "label": "Editar Datos del Objeto - -198", "isController": false}, {"data": [[1.59594978E12, 186.5]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -176", "isController": false}, {"data": [[1.59594978E12, 0.0]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -178", "isController": false}, {"data": [[1.59594978E12, 373.0]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -177", "isController": false}, {"data": [[1.59594996E12, 173.33333333333331], [1.59595002E12, 516.0]], "isOverall": false, "label": "Siguiente - -261", "isController": false}, {"data": [[1.59595002E12, 393.5]], "isOverall": false, "label": "Clic Menu Pagos - -278", "isController": false}, {"data": [[1.59595008E12, 0.0]], "isOverall": false, "label": "Clic Boton Proceder - -302", "isController": false}, {"data": [[1.59594996E12, 520.0], [1.59595002E12, 516.0]], "isOverall": false, "label": "Siguiente - -262", "isController": false}, {"data": [[1.59595002E12, 196.75]], "isOverall": false, "label": "Clic Menu Pagos - -277", "isController": false}, {"data": [[1.59595008E12, 0.0]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -300", "isController": false}, {"data": [[1.59595002E12, 195.25]], "isOverall": false, "label": "Siguiente - -263", "isController": false}, {"data": [[1.59595008E12, 0.0]], "isOverall": false, "label": "Clic Boton Proceder - -301", "isController": false}, {"data": [[1.59595002E12, 390.5]], "isOverall": false, "label": "Siguiente - -265", "isController": false}, {"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "Seleciionar el Producto - -107", "isController": false}, {"data": [[1.59594972E12, 682.5]], "isOverall": false, "label": "Seleciionar el Producto - -108", "isController": false}, {"data": [[1.59594972E12, 511.0]], "isOverall": false, "label": "Clic Menu Operaciones del Sistema - -66", "isController": false}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "Clic Boton Calculo de Prima - -266", "isController": false}, {"data": [[1.59595002E12, 412.0]], "isOverall": false, "label": "Clic Boton Validacion - -267", "isController": false}, {"data": [[1.59594984E12, 238.25]], "isOverall": false, "label": "Clic Boton Grabar Datos del Objeto - -190", "isController": false}, {"data": [[1.59595008E12, 197.5]], "isOverall": false, "label": "Clic Boton Grabar Pago - -295", "isController": false}, {"data": [[1.59594984E12, 0.0]], "isOverall": false, "label": "Clic Boton Editar Datos del Objeto - -196", "isController": false}, {"data": [[1.59594978E12, 0.0], [1.59594984E12, 472.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -189", "isController": false}, {"data": [[1.59594978E12, 241.99999999999997]], "isOverall": false, "label": "Agregar Datos del Objeto - -188", "isController": false}, {"data": [[1.59594978E12, 0.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -187", "isController": false}, {"data": [[1.59594978E12, 616.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -186", "isController": false}, {"data": [[1.59594978E12, 251.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -185", "isController": false}, {"data": [[1.59594978E12, 187.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -182", "isController": false}, {"data": [[1.59594978E12, 399.0]], "isOverall": false, "label": "Agregar Datos del Objeto - -181", "isController": false}, {"data": [[1.59595002E12, 200.5]], "isOverall": false, "label": "Clic Boton Nuevo - -283", "isController": false}, {"data": [[1.59595008E12, 395.0]], "isOverall": false, "label": "Clic Boton Grabar Pago - -296", "isController": false}, {"data": [[1.59595002E12, 401.0]], "isOverall": false, "label": "Clic Boton Nuevo - -284", "isController": false}, {"data": [[1.59594978E12, 1029.75]], "isOverall": false, "label": "Seleccionar Agente - -109", "isController": false}, {"data": [[1.59594978E12, 0.0]], "isOverall": false, "label": "Editar Facturacion - -138", "isController": false}, {"data": [[1.59594984E12, 443.75]], "isOverall": false, "label": "Clic Boton Guardar de Deducible - -218", "isController": false}, {"data": [[1.59594978E12, 251.5]], "isOverall": false, "label": "Editar Facturacion - -139", "isController": false}, {"data": [[1.59594984E12, 393.5]], "isOverall": false, "label": "Clic Boton Guardar de Deducible - -219", "isController": false}, {"data": [[1.59594978E12, 340.5]], "isOverall": false, "label": "Editar Facturacion - -137", "isController": false}, {"data": [[1.59594984E12, 291.25]], "isOverall": false, "label": "Agregar Datos de Deducible - -209", "isController": false}, {"data": [[1.59594972E12, 435.75]], "isOverall": false, "label": "Clic Menu Crear Poliza- -84", "isController": false}, {"data": [[1.59594984E12, 0.0]], "isOverall": false, "label": "Clic Boton Cerrar Datos del Objeto - -194", "isController": false}, {"data": [[1.59594972E12, 444.5]], "isOverall": false, "label": "Clic Menu Crear Poliza- -85", "isController": false}, {"data": [[1.59594984E12, 261.75]], "isOverall": false, "label": "Clic Boton Cerrar Datos del Objeto - -193", "isController": false}, {"data": [[1.59594984E12, 0.0]], "isOverall": false, "label": "Editar Datos del Objeto - -200", "isController": false}, {"data": [[1.59594984E12, 523.5]], "isOverall": false, "label": "Clic Boton Cerrar Datos del Objeto - -195", "isController": false}, {"data": [[1.59594978E12, 0.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -164", "isController": false}, {"data": [[1.59594978E12, 497.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -165", "isController": false}, {"data": [[1.59594978E12, 0.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -162", "isController": false}, {"data": [[1.59594978E12, 621.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -163", "isController": false}, {"data": [[1.59594978E12, 0.0]], "isOverall": false, "label": "Editar Facturacion - -141", "isController": false}, {"data": [[1.59594978E12, 229.0]], "isOverall": false, "label": "Editar Facturacion - -142", "isController": false}, {"data": [[1.59594978E12, 200.5]], "isOverall": false, "label": "Editar Facturacion - -140", "isController": false}, {"data": [[1.59594984E12, 0.0]], "isOverall": false, "label": "Agregar Datos de Deducible - -214", "isController": false}, {"data": [[1.59594984E12, 476.5]], "isOverall": false, "label": "Clic Boton Grabar Datos del Objeto - -192", "isController": false}, {"data": [[1.59594984E12, 412.0]], "isOverall": false, "label": "Agregar Datos de Deducible - -213", "isController": false}, {"data": [[1.59594972E12, 126.0]], "isOverall": false, "label": "Clic Menu Control de P - -74", "isController": false}, {"data": [[1.59594996E12, 393.0], [1.5959499E12, 122.33333333333334]], "isOverall": false, "label": "Siguiente - -250", "isController": false}, {"data": [[1.59595008E12, 0.0]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -299", "isController": false}, {"data": [[1.59594996E12, 393.0], [1.5959499E12, 367.0]], "isOverall": false, "label": "Siguiente - -251", "isController": false}, {"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "Clic Menu Crear Poliza- -97", "isController": false}, {"data": [[1.59594996E12, 689.25]], "isOverall": false, "label": "Siguiente - -253", "isController": false}, {"data": [[1.59594996E12, 440.5]], "isOverall": false, "label": "Siguiente - -254", "isController": false}, {"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "Login - -38-0", "isController": false}, {"data": [[1.59594996E12, 234.5]], "isOverall": false, "label": "Siguiente - -255", "isController": false}, {"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "Index - -23", "isController": false}, {"data": [[1.59594978E12, 0.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -155", "isController": false}, {"data": [[1.59594996E12, 469.0]], "isOverall": false, "label": "Siguiente - -256", "isController": false}, {"data": [[1.59594972E12, 908.5]], "isOverall": false, "label": "Index - -22", "isController": false}, {"data": [[1.59594978E12, 0.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -156", "isController": false}, {"data": [[1.59594978E12, 162.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -153", "isController": false}, {"data": [[1.59594972E12, 196.5]], "isOverall": false, "label": "Login - -38-1", "isController": false}, {"data": [[1.59594978E12, 0.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -151", "isController": false}, {"data": [[1.59594978E12, 165.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -152", "isController": false}, {"data": [[1.59594978E12, 1134.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -161", "isController": false}, {"data": [[1.59594996E12, 375.0]], "isOverall": false, "label": "Clic Boton Calculo de Prima - -252", "isController": false}, {"data": [[1.59595008E12, 211.0]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -297", "isController": false}, {"data": [[1.59595008E12, 422.0]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -298", "isController": false}, {"data": [[1.59594984E12, 582.5]], "isOverall": false, "label": "Agregar Datos de Deducible - -210", "isController": false}, {"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "Buscar Cliente - -100", "isController": false}, {"data": [[1.59594972E12, 492.0]], "isOverall": false, "label": "Buscar Cliente - -101", "isController": false}, {"data": [[1.59594984E12, 0.0]], "isOverall": false, "label": "Agregar Datos de Deducible - -212", "isController": false}, {"data": [[1.59594984E12, 0.0]], "isOverall": false, "label": "Agregar Datos de Deducible - -211", "isController": false}, {"data": [[1.59594978E12, 510.0]], "isOverall": false, "label": "Clic en Boton Crea Participante - -148", "isController": false}, {"data": [[1.59594978E12, 320.5]], "isOverall": false, "label": "Clic en Boton Crea Participante - -149", "isController": false}, {"data": [[1.59594984E12, 265.5]], "isOverall": false, "label": "Siguiente - -220", "isController": false}, {"data": [[1.59594972E12, 301.25]], "isOverall": false, "label": "Siguiente - -102", "isController": false}, {"data": [[1.59594984E12, 531.0]], "isOverall": false, "label": "Siguiente - -223", "isController": false}, {"data": [[1.59594972E12, 602.5]], "isOverall": false, "label": "Siguiente - -103", "isController": false}, {"data": [[1.5959499E12, 278.0]], "isOverall": false, "label": "Siguiente - -224", "isController": false}, {"data": [[1.5959499E12, 556.0]], "isOverall": false, "label": "Siguiente - -227", "isController": false}, {"data": [[1.5959499E12, 648.75]], "isOverall": false, "label": "Siguiente - -228", "isController": false}, {"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "Index - -23-0", "isController": false}, {"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "Index - -23-1", "isController": false}, {"data": [[1.59595002E12, 562.5]], "isOverall": false, "label": "Clic Boton Ok Pago - -292", "isController": false}, {"data": [[1.59595002E12, 402.0]], "isOverall": false, "label": "Clic Menu Facturacion y Cobranza - -276", "isController": false}, {"data": [[1.59595002E12, 333.0]], "isOverall": false, "label": "Clic Boton Ok Pago - -293", "isController": false}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "Clic Boton Ok Pago - -294", "isController": false}, {"data": [[1.59594972E12, 246.0]], "isOverall": false, "label": "Buscar Cliente - -99", "isController": false}, {"data": [[1.59595002E12, 404.5]], "isOverall": false, "label": "Clic Boton Emitir Prima - -273", "isController": false}, {"data": [[1.59594978E12, 500.0]], "isOverall": false, "label": "Grabar Edicion de Facturacion - -144", "isController": false}, {"data": [[1.59594978E12, 250.0]], "isOverall": false, "label": "Grabar Edicion de Facturacion - -143", "isController": false}, {"data": [[1.5959499E12, 219.5]], "isOverall": false, "label": "Siguiente - -230", "isController": false}, {"data": [[1.5959499E12, 439.0]], "isOverall": false, "label": "Siguiente - -231", "isController": false}, {"data": [[1.5959499E12, 555.75]], "isOverall": false, "label": "Siguiente - -232", "isController": false}, {"data": [[1.5959499E12, 518.5]], "isOverall": false, "label": "Siguiente - -233", "isController": false}, {"data": [[1.5959499E12, 0.0]], "isOverall": false, "label": "Siguiente - -234", "isController": false}, {"data": [[1.5959499E12, 593.0]], "isOverall": false, "label": "Siguiente - -235", "isController": false}, {"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "Login - -40", "isController": false}, {"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "Clic Menu Control de Poliza - -80", "isController": false}, {"data": [[1.5959499E12, 489.5]], "isOverall": false, "label": "Siguiente - -229", "isController": false}, {"data": [[1.59595008E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "Login - -38", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59595008E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.59594972E12, "maxY": 34986.0, "series": [{"data": [[1.59594996E12, 34986.0], [1.59594978E12, 11787.0], [1.59595008E12, 2599.0], [1.5959499E12, 7800.0], [1.59594972E12, 10314.0], [1.59595002E12, 10453.0], [1.59594984E12, 13984.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.59594996E12, 735.0], [1.59594978E12, 118.0], [1.59595008E12, 1.0], [1.5959499E12, 748.0], [1.59594972E12, 93.0], [1.59595002E12, 179.0], [1.59594984E12, 472.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.59594996E12, 32976.0], [1.59594978E12, 3566.0], [1.59595008E12, 2221.0000000000005], [1.5959499E12, 7295.8], [1.59594972E12, 7384.500000000001], [1.59595002E12, 6070.6], [1.59594984E12, 5734.800000000001]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.59594996E12, 34986.0], [1.59594978E12, 11787.0], [1.59595008E12, 2599.0], [1.5959499E12, 7800.0], [1.59594972E12, 10314.0], [1.59595002E12, 10453.0], [1.59594984E12, 13984.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.59594996E12, 34986.0], [1.59594978E12, 5310.0], [1.59595008E12, 2599.0], [1.5959499E12, 7704.199999999999], [1.59594972E12, 9409.199999999997], [1.59595002E12, 9527.19999999999], [1.59594984E12, 7677.799999999994]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59595008E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 182.0, "minX": 1.0, "maxY": 1940.0, "series": [{"data": [[2.0, 1424.0], [1.0, 1940.0], [4.0, 627.5], [9.0, 189.0], [10.0, 182.0], [3.0, 737.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 10.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 112.5, "minX": 1.0, "maxY": 1862.0, "series": [{"data": [[2.0, 1251.5], [1.0, 1862.0], [4.0, 559.0], [9.0, 186.0], [10.0, 112.5], [3.0, 677.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 10.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.23333333333333334, "minX": 1.59594972E12, "maxY": 1.3166666666666667, "series": [{"data": [[1.59594996E12, 0.23333333333333334], [1.59594978E12, 1.3166666666666667], [1.59595008E12, 0.26666666666666666], [1.5959499E12, 0.38333333333333336], [1.59594972E12, 0.8], [1.59595002E12, 0.7166666666666667], [1.59594984E12, 0.85]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59595008E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.1, "minX": 1.59594972E12, "maxY": 1.3166666666666667, "series": [{"data": [[1.59594996E12, 0.23333333333333334], [1.59594978E12, 1.3166666666666667], [1.59595008E12, 0.3], [1.5959499E12, 0.38333333333333336], [1.59594972E12, 0.6666666666666666], [1.59595002E12, 0.7166666666666667], [1.59594984E12, 0.85]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.59594972E12, 0.1]], "isOverall": false, "label": "302", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59595008E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.59594972E12, "maxY": 0.06666666666666667, "series": [{"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "Clic Boton Cerrar Datos del Objeto - -195-success", "isController": false}, {"data": [[1.59594996E12, 0.06666666666666667]], "isOverall": false, "label": "Siguiente - -253-success", "isController": false}, {"data": [[1.59594978E12, 0.06666666666666667]], "isOverall": false, "label": "Agregar Datos del Objeto - -181-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "Clic Boton Ok Pago - -294-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "Siguiente - -103-success", "isController": false}, {"data": [[1.59594978E12, 0.06666666666666667]], "isOverall": false, "label": "Grabar Edicion de Facturacion - -143-success", "isController": false}, {"data": [[1.59594984E12, 0.06666666666666667]], "isOverall": false, "label": "Editar Datos del Objeto - -198-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "Agregar Datos de Deducible - -212-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Clic en Boton Crea Participante - -162-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "Ingresar Usage Description - -287-success", "isController": false}, {"data": [[1.59595002E12, 0.06666666666666667]], "isOverall": false, "label": "Ingresar Cantidad a Pagar - -290-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "Login - -38-1-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "Clic Menu Crear Poliza- -85-success", "isController": false}, {"data": [[1.59594978E12, 0.06666666666666667]], "isOverall": false, "label": "Editar Facturacion - -137-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -177-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Agregar Datos del Objeto - -185-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333], [1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "Agregar Datos del Objeto - -189-success", "isController": false}, {"data": [[1.5959499E12, 0.06666666666666667]], "isOverall": false, "label": "Siguiente - -230-success", "isController": false}, {"data": [[1.59594972E12, 0.06666666666666667]], "isOverall": false, "label": "Seleciionar el Producto - -107-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Clic en Menu Participante - -146-success", "isController": false}, {"data": [[1.59594972E12, 0.06666666666666667]], "isOverall": false, "label": "Login - -38-success", "isController": false}, {"data": [[1.59595008E12, 0.06666666666666667]], "isOverall": false, "label": "Clic Boton Grabar Pago - -295-success", "isController": false}, {"data": [[1.59594984E12, 0.06666666666666667]], "isOverall": false, "label": "Siguiente - -203-success", "isController": false}, {"data": [[1.59594972E12, 0.06666666666666667]], "isOverall": false, "label": "Index - -22-success", "isController": false}, {"data": [[1.5959499E12, 0.03333333333333333]], "isOverall": false, "label": "Siguiente - -234-success", "isController": false}, {"data": [[1.59595002E12, 0.06666666666666667]], "isOverall": false, "label": "Clic Menu Facturacion y Cobranza - -276-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "Buscar Cliente - -101-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Seleccionar Agente - -111-success", "isController": false}, {"data": [[1.59594984E12, 0.06666666666666667]], "isOverall": false, "label": "Clic Boton Editar Datos del Objeto - -196-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Clic en Boton Crea Participante - -156-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "Clic Boton Nuevo - -284-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Clic en Boton Grabar Participante - -171-success", "isController": false}, {"data": [[1.59595002E12, 0.06666666666666667]], "isOverall": false, "label": "Siguiente - -263-success", "isController": false}, {"data": [[1.5959499E12, 0.03333333333333333]], "isOverall": false, "label": "Siguiente - -229-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Editar Facturacion - -140-success", "isController": false}, {"data": [[1.59594972E12, 0.06666666666666667]], "isOverall": false, "label": "Clic Menu Crear Poliza- -84-success", "isController": false}, {"data": [[1.5959499E12, 0.06666666666666667]], "isOverall": false, "label": "Siguiente - -224-success", "isController": false}, {"data": [[1.59594972E12, 0.06666666666666667]], "isOverall": false, "label": "Siguiente - -102-success", "isController": false}, {"data": [[1.59594978E12, 0.06666666666666667]], "isOverall": false, "label": "Seleccionar Agente - -109-success", "isController": false}, {"data": [[1.59594984E12, 0.06666666666666667]], "isOverall": false, "label": "Editar Datos del Objeto - -197-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "Clic Menu Crear Poliza- -97-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Agregar Datos del Objeto - -182-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Clic en Boton Crea Participante - -152-success", "isController": false}, {"data": [[1.59594984E12, 0.06666666666666667]], "isOverall": false, "label": "Agregar Datos de Deducible - -213-success", "isController": false}, {"data": [[1.59594996E12, 0.016666666666666666], [1.5959499E12, 0.05]], "isOverall": false, "label": "Siguiente - -250-success", "isController": false}, {"data": [[1.59595008E12, 0.06666666666666667]], "isOverall": false, "label": "Clic Boton Proceder - -301-success", "isController": false}, {"data": [[1.59594972E12, 0.06666666666666667]], "isOverall": false, "label": "Buscar Cliente - -99-success", "isController": false}, {"data": [[1.59594984E12, 0.06666666666666667]], "isOverall": false, "label": "Siguiente - -220-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Editar Facturacion - -138-success", "isController": false}, {"data": [[1.59594978E12, 0.06666666666666667]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -176-success", "isController": false}, {"data": [[1.59595002E12, 0.06666666666666667]], "isOverall": false, "label": "Clic Menu Pagos - -277-success", "isController": false}, {"data": [[1.59595002E12, 0.06666666666666667]], "isOverall": false, "label": "Ingresar Usage Description - -288-success", "isController": false}, {"data": [[1.59594978E12, 0.06666666666666667]], "isOverall": false, "label": "Agregar Datos del Objeto - -186-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Clic en Boton Crea Participante - -163-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "Siguiente - -254-success", "isController": false}, {"data": [[1.59595002E12, 0.06666666666666667]], "isOverall": false, "label": "Clic Boton Confirmar Pre-Emision - -270-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "Index - -23-1-success", "isController": false}, {"data": [[1.59595002E12, 0.06666666666666667]], "isOverall": false, "label": "Ingresar Cantidad a Pagar - -291-success", "isController": false}, {"data": [[1.59595008E12, 0.03333333333333333]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -299-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "Index - -23-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Clic en Boton Crea Participante - -155-success", "isController": false}, {"data": [[1.59595002E12, 0.06666666666666667]], "isOverall": false, "label": "Clic Boton Nuevo - -283-success", "isController": false}, {"data": [[1.5959499E12, 0.06666666666666667]], "isOverall": false, "label": "Siguiente - -228-success", "isController": false}, {"data": [[1.5959499E12, 0.03333333333333333]], "isOverall": false, "label": "Siguiente - -233-success", "isController": false}, {"data": [[1.59594978E12, 0.06666666666666667]], "isOverall": false, "label": "Clic en Menu Participante - -145-success", "isController": false}, {"data": [[1.59594996E12, 0.016666666666666666], [1.59595002E12, 0.016666666666666666]], "isOverall": false, "label": "Siguiente - -262-success", "isController": false}, {"data": [[1.59594996E12, 0.06666666666666667]], "isOverall": false, "label": "Clic Boton Calculo de Prima - -252-success", "isController": false}, {"data": [[1.59594978E12, 0.06666666666666667]], "isOverall": false, "label": "Clic en Boton Grabar Participante - -170-success", "isController": false}, {"data": [[1.59595002E12, 0.06666666666666667]], "isOverall": false, "label": "Clic Boton Validacion - -267-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Seleccionar Agente - -110-success", "isController": false}, {"data": [[1.59594984E12, 0.06666666666666667]], "isOverall": false, "label": "Clic Boton Grabar Datos del Objeto - -190-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "Siguiente - -223-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Editar Facturacion - -141-success", "isController": false}, {"data": [[1.59595002E12, 0.06666666666666667]], "isOverall": false, "label": "Clic Boton Calculo de Prima - -266-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "Clic Menu Pagos - -278-success", "isController": false}, {"data": [[1.59594984E12, 0.06666666666666667]], "isOverall": false, "label": "Clic Boton Cerrar Datos del Objeto - -193-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Editar Facturacion - -139-success", "isController": false}, {"data": [[1.59594978E12, 0.06666666666666667]], "isOverall": false, "label": "Siguiente - -174-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Clic en Boton Crea Participante - -149-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Clic en Boton Crea Participante - -151-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "Clic Boton Guardar de Deducible - -219-success", "isController": false}, {"data": [[1.59594996E12, 0.016666666666666666], [1.5959499E12, 0.016666666666666666]], "isOverall": false, "label": "Siguiente - -251-success", "isController": false}, {"data": [[1.59594972E12, 0.06666666666666667]], "isOverall": false, "label": "Clic Menu Control de P - -74-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "Siguiente - -204-success", "isController": false}, {"data": [[1.59594984E12, 0.06666666666666667]], "isOverall": false, "label": "Editar Datos del Objeto - -200-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "Agregar Datos de Deducible - -214-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Clic en Boton Crea Participante - -164-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "Ingresar Usage Description - -289-success", "isController": false}, {"data": [[1.59594996E12, 0.06666666666666667]], "isOverall": false, "label": "Siguiente - -255-success", "isController": false}, {"data": [[1.59595008E12, 0.03333333333333333]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -298-success", "isController": false}, {"data": [[1.59594996E12, 0.05], [1.59595002E12, 0.016666666666666666]], "isOverall": false, "label": "Siguiente - -261-success", "isController": false}, {"data": [[1.59594984E12, 0.06666666666666667]], "isOverall": false, "label": "Siguiente - -201-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Agregar Datos del Objeto - -187-success", "isController": false}, {"data": [[1.59594972E12, 0.06666666666666667]], "isOverall": false, "label": "Clic Menu Operaciones del Sistema - -66-success", "isController": false}, {"data": [[1.59594984E12, 0.06666666666666667]], "isOverall": false, "label": "Agregar Datos de Deducible - -209-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "Siguiente - -265-success", "isController": false}, {"data": [[1.59595002E12, 0.06666666666666667]], "isOverall": false, "label": "Ingresar Poliza a Pagar - -285-success", "isController": false}, {"data": [[1.5959499E12, 0.03333333333333333]], "isOverall": false, "label": "Siguiente - -227-success", "isController": false}, {"data": [[1.5959499E12, 0.06666666666666667]], "isOverall": false, "label": "Siguiente - -232-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "Agregar Datos de Deducible - -210-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "Login - -40-1-success", "isController": false}, {"data": [[1.59595002E12, 0.06666666666666667]], "isOverall": false, "label": "Clic Boton Ok Pago - -292-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "Clic Boton Ok Pago - -293-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Grabar Edicion de Facturacion - -144-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "Clic Boton Cerrar Datos del Objeto - -194-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "Agregar Datos de Deducible - -211-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Siguiente - -175-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "Editar Datos del Objeto - -199-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Editar Facturacion - -142-success", "isController": false}, {"data": [[1.59594984E12, 0.06666666666666667]], "isOverall": false, "label": "Clic Boton Guardar de Deducible - -218-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "Siguiente - -256-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Clic en Boton Crea Participante - -165-success", "isController": false}, {"data": [[1.59594984E12, 0.06666666666666667]], "isOverall": false, "label": "Clic Boton Crear Deducible - -208-success", "isController": false}, {"data": [[1.59595002E12, 0.06666666666666667]], "isOverall": false, "label": "Ingresar Usage Description - -286-success", "isController": false}, {"data": [[1.59594978E12, 0.06666666666666667]], "isOverall": false, "label": "Clic en Boton Crea Participante - -148-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "Buscar Cliente - -100-success", "isController": false}, {"data": [[1.5959499E12, 0.03333333333333333]], "isOverall": false, "label": "Siguiente - -235-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "Login - -38-0-success", "isController": false}, {"data": [[1.59594978E12, 0.06666666666666667]], "isOverall": false, "label": "Clic en Boton Crea Participante - -161-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -180-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Clic Boton Anadir Objeto - -178-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "Index - -23-0-success", "isController": false}, {"data": [[1.59594972E12, 0.06666666666666667]], "isOverall": false, "label": "Seleciionar el Producto - -108-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "Clic Boton Grabar Datos del Objeto - -192-success", "isController": false}, {"data": [[1.59595008E12, 0.06666666666666667]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -297-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "Login - -40-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "Siguiente - -202-success", "isController": false}, {"data": [[1.59594978E12, 0.06666666666666667]], "isOverall": false, "label": "Agregar Datos del Objeto - -188-success", "isController": false}, {"data": [[1.59595008E12, 0.03333333333333333]], "isOverall": false, "label": "Debug Sampler-success", "isController": false}, {"data": [[1.59594972E12, 0.06666666666666667]], "isOverall": false, "label": "Clic Menu Control de Poliza - -80-success", "isController": false}, {"data": [[1.59595008E12, 0.03333333333333333]], "isOverall": false, "label": "Clic Boton Grabar Pago - -296-success", "isController": false}, {"data": [[1.59595008E12, 0.03333333333333333]], "isOverall": false, "label": "Clic Boton Aplicar Pago - -300-success", "isController": false}, {"data": [[1.59595002E12, 0.06666666666666667]], "isOverall": false, "label": "Clic Boton Emitir Prima - -273-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "Clic en Boton Crea Participante - -153-success", "isController": false}, {"data": [[1.59595008E12, 0.03333333333333333]], "isOverall": false, "label": "Clic Boton Proceder - -302-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "Login - -40-0-success", "isController": false}, {"data": [[1.5959499E12, 0.03333333333333333]], "isOverall": false, "label": "Siguiente - -231-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59595008E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.36666666666666664, "minX": 1.59594972E12, "maxY": 1.7333333333333334, "series": [{"data": [[1.59594996E12, 0.36666666666666664], [1.59594978E12, 1.7333333333333334], [1.59595008E12, 0.4], [1.5959499E12, 0.5333333333333333], [1.59594972E12, 1.1], [1.59595002E12, 1.2], [1.59594984E12, 1.3]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59595008E12, "title": "Total Transactions Per Second"}},
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
