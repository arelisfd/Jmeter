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
        data: {"result": {"minY": 1.0, "minX": 100.0, "maxY": 2.0, "series": [{"data": [[2100.0, 1.0], [2800.0, 1.0]], "isOverall": false, "label": "18.3 Clic Guardar", "isController": true}, {"data": [[500.0, 2.0]], "isOverall": false, "label": "18.3.2 Clic Guardar-88", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "2.1 Ingresar usuario y contrase\u00F1a-3-1", "isController": false}, {"data": [[100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "2.1 Ingresar usuario y contrase\u00F1a-3-0", "isController": false}, {"data": [[1100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "15.4.4 Buscar ID Participante de Poliza-60", "isController": false}, {"data": [[6000.0, 1.0], [5900.0, 1.0]], "isOverall": false, "label": "25-Comisiones Siguiente", "isController": true}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "1.2 Index-2-1", "isController": false}, {"data": [[700.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "12.5 Clic en Ok-40", "isController": false}, {"data": [[400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "15.5.4 Ingresar y seleccionar nombre participante-64", "isController": false}, {"data": [[6300.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "23.1 Documentos por Poliza Siguiente-105", "isController": false}, {"data": [[400.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "11.4.1 Ingresar nombre de Agente-25", "isController": false}, {"data": [[2800.0, 1.0], [2900.0, 1.0]], "isOverall": false, "label": "11.6 Clic en ok", "isController": true}, {"data": [[2700.0, 1.0], [3100.0, 1.0]], "isOverall": false, "label": "29-Calculo de Prima Clic Boton Guardar", "isController": true}, {"data": [[400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "11.5.3 Clic en Buscar-28", "isController": false}, {"data": [[1200.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "13.2 Cotizacion Relacionada a Historia Siguiente-44", "isController": false}, {"data": [[5400.0, 1.0], [5500.0, 1.0]], "isOverall": false, "label": "22.1 Clic en Siguiente-103", "isController": false}, {"data": [[200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "15.4.3 Buscar ID Participante de Poliza-59", "isController": false}, {"data": [[4100.0, 1.0], [5000.0, 1.0]], "isOverall": false, "label": "26.1 Impuestos Siguiente-111", "isController": false}, {"data": [[700.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "11.5.2 Clic en Buscar-27", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "1.2 Index-2-0", "isController": false}, {"data": [[1300.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "17.6.2 Seleccionar trayecto hasta-79", "isController": false}, {"data": [[3100.0, 1.0], [3400.0, 1.0]], "isOverall": false, "label": "14.7.1 Guardar Facturacion-51", "isController": false}, {"data": [[600.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "22.2 Clic en Siguiente-104", "isController": false}, {"data": [[5700.0, 1.0], [6700.0, 1.0]], "isOverall": false, "label": "10.1 Clic en Siguiente 3-16", "isController": false}, {"data": [[300.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "6.1 Ingresar Cedula del Cliente-9", "isController": false}, {"data": [[2700.0, 1.0], [3000.0, 1.0]], "isOverall": false, "label": "17.8 Cerrar Objeto", "isController": true}, {"data": [[1100.0, 2.0]], "isOverall": false, "label": "17.3 Anadir Objeto de Cobertura-74", "isController": false}, {"data": [[2100.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "23.2 Documentos por Poliza Siguiente-106", "isController": false}, {"data": [[900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "11.3.1 Clic en Buscar id de agente-21", "isController": false}, {"data": [[5600.0, 1.0], [5900.0, 1.0]], "isOverall": false, "label": "28-Informacion dle Cliente Siguiente", "isController": true}, {"data": [[900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "11.7.3 Clic en guardar-34", "isController": false}, {"data": [[2100.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "21.8.1 Seleccionar min de franquicia-101", "isController": false}, {"data": [[2200.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "15.6 Buscar ID Participante de Poliza ok", "isController": true}, {"data": [[500.0, 2.0]], "isOverall": false, "label": "16.2 Cotizacion General Siguiente-71", "isController": false}, {"data": [[1100.0, 2.0]], "isOverall": false, "label": "7.2 Seleccionar cliente-11", "isController": false}, {"data": [[1300.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "1.1 Index-1", "isController": false}, {"data": [[900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "11.7.2 Clic en guardar-33", "isController": false}, {"data": [[5200.0, 1.0], [5700.0, 1.0]], "isOverall": false, "label": "11.7 Modificar y guardar agente", "isController": true}, {"data": [[600.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "21.8.1 Guardar deducible-102", "isController": false}, {"data": [[1400.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "32.1 Clic Boton Cotizacion a Cliente-123", "isController": false}, {"data": [[900.0, 2.0]], "isOverall": false, "label": "11.6.1 Clic en ok-29", "isController": false}, {"data": [[8700.0, 1.0], [7200.0, 1.0]], "isOverall": false, "label": "18- Editar Objeto de Cobertura", "isController": true}, {"data": [[7000.0, 1.0], [7600.0, 1.0]], "isOverall": false, "label": "24-Documentos por Objeto Siguiente", "isController": true}, {"data": [[22900.0, 1.0], [26300.0, 1.0]], "isOverall": false, "label": "30.1 Calculo de Prima Clic Boton Premium-119", "isController": false}, {"data": [[1200.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "15.3 Clic Crear Participante de Poliza", "isController": true}, {"data": [[700.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "15.8.2 Guardar Participante de la Poliza-69", "isController": false}, {"data": [[1400.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "28.2 Informacion dle Cliente Siguiente-116", "isController": false}, {"data": [[700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "14.6 Seleccionar numero dia y modo de pago-50", "isController": false}, {"data": [[600.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "15.5.3 Ingresar y seleccionar nombre participante-63", "isController": false}, {"data": [[200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "4.1 Clic Menu Control de Polizas-6", "isController": false}, {"data": [[1100.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "10.2 Clic en Siguiente 3-17", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0]], "isOverall": false, "label": "12.6.2 Guardar cotizacion-42", "isController": false}, {"data": [[3300.0, 1.0], [3600.0, 1.0]], "isOverall": false, "label": "11.7.1 Seleccionar funcion de agente e ingresar distribucion-32", "isController": false}, {"data": [[5500.0, 1.0], [6800.0, 1.0]], "isOverall": false, "label": "27-Clausulas Siguiente", "isController": true}, {"data": [[600.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "11.3.3 Clic en Buscar id de agente-23", "isController": false}, {"data": [[17500.0, 1.0], [18700.0, 1.0]], "isOverall": false, "label": "11-Clic Crear Agente", "isController": true}, {"data": [[5300.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "33.1 Clic Boton Cotizacion Aceptada-125", "isController": false}, {"data": [[200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "34.2 Clic Boton Proceder Cotizacion Aceptada-129", "isController": false}, {"data": [[600.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "14.1 Clic en el icono editar-45", "isController": false}, {"data": [[3300.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "15.8 Guardar Participante de la Poliza", "isController": true}, {"data": [[12900.0, 1.0], [13400.0, 1.0]], "isOverall": false, "label": "15-Participante de Poliza", "isController": true}, {"data": [[300.0, 1.0], [600.0, 1.0]], "isOverall": false, "label": "12.3 Clic en Boton cotizacion nueva-38", "isController": false}, {"data": [[8400.0, 1.0], [8800.0, 1.0]], "isOverall": false, "label": "10-Clic en Siguiente 3", "isController": true}, {"data": [[600.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "15.3.1 Clic Crear Participante de Poliza-55", "isController": false}, {"data": [[500.0, 2.0]], "isOverall": false, "label": "15.4.2 Buscar ID Participante de Poliza-58", "isController": false}, {"data": [[400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "11.6.3 Clic en ok-31", "isController": false}, {"data": [[4100.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": "14.7 Guardar Facturacion", "isController": true}, {"data": [[4300.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "18.4 Clic en Premium", "isController": true}, {"data": [[1100.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "32.2 Clic Boton Cotizacion a Cliente-124", "isController": false}, {"data": [[300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "15.2 Clic Carpeta Participante de Poliza-54", "isController": false}, {"data": [[4800.0, 1.0], [5900.0, 1.0]], "isOverall": false, "label": "27.1 Clausulas Siguiente-113", "isController": false}, {"data": [[7400.0, 1.0], [7900.0, 1.0]], "isOverall": false, "label": "2.2 Presionar aceptar-4", "isController": false}, {"data": [[3000.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "11.3 Clic en Buscar id de agente", "isController": true}, {"data": [[4700.0, 1.0], [5900.0, 1.0]], "isOverall": false, "label": "19.1 Cobertura Siguiente-90", "isController": false}, {"data": [[300.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "18.2.1 Ingresar valor asegurado-86", "isController": false}, {"data": [[300.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "18.2 Ingresar valor asegurado", "isController": true}, {"data": [[600.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "30.3 Clic Menu Cotizacion Relacionada a Historia-122", "isController": false}, {"data": [[5400.0, 1.0], [6400.0, 1.0]], "isOverall": false, "label": "12.6-Guardar cotizacion", "isController": true}, {"data": [[200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "4-Clic Menu Control de Polizas", "isController": true}, {"data": [[4800.0, 1.0], [5100.0, 1.0]], "isOverall": false, "label": "13.1 Cotizacion Relacionada a Historia Siguiente-43", "isController": false}, {"data": [[1100.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "21.6 Seleccionar valor de franquicia-99", "isController": false}, {"data": [[1300.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "17.8.2 Cerrar Objeto-83", "isController": false}, {"data": [[10100.0, 1.0], [10200.0, 1.0]], "isOverall": false, "label": "21-Crear Deducible", "isController": true}, {"data": [[300.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "34.1 Clic Boton Proceder Cotizacion Aceptada-128", "isController": false}, {"data": [[600.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "2.1 Ingresar usuario y contrase\u00F1a-3", "isController": false}, {"data": [[1200.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "11.2 Clic Crear Agente-20", "isController": false}, {"data": [[600.0, 2.0]], "isOverall": false, "label": "17.7.2  Grabar objeto-81", "isController": false}, {"data": [[2600.0, 1.0], [2800.0, 1.0]], "isOverall": false, "label": "21.8 Seleccionar min de franquicia y guardar", "isController": true}, {"data": [[8900.0, 1.0], [7300.0, 1.0]], "isOverall": false, "label": "9-Clic en Siguiente 2", "isController": true}, {"data": [[2800.0, 1.0], [3000.0, 1.0]], "isOverall": false, "label": "17.7 Ingresar descripcion y grabar objeto", "isController": true}, {"data": [[7500.0, 1.0], [7700.0, 1.0]], "isOverall": false, "label": "30.1 Clic Menu Cotizacion Relacionada a Historia-120", "isController": false}, {"data": [[300.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "12.4 Seleccionar nombre de producto-39", "isController": false}, {"data": [[700.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "15.6.1 Buscar ID Participante de Poliza ok-65", "isController": false}, {"data": [[2400.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "7.1 Clic en Buscar-10", "isController": false}, {"data": [[600.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "15.6.3 Buscar ID Participante de Poliza ok-66", "isController": false}, {"data": [[600.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "15.6.2 Buscar ID Participante de Poliza ok-66", "isController": false}, {"data": [[800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "11.3.4 Clic en Buscar id de agente-24", "isController": false}, {"data": [[1300.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "11.6.2 Clic en ok-30", "isController": false}, {"data": [[2100.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "29.1 Calculo de Prima Clic Boton Guardar-117", "isController": false}, {"data": [[600.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "15.4.1 Buscar ID Participante de Poliza-57", "isController": false}, {"data": [[700.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "19.2 Cobertura Siguiente-91", "isController": false}, {"data": [[2900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "21.1 Clic Crear Deducible-94", "isController": false}, {"data": [[1100.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "15.5.2 Ingresar y seleccionar nombre participante-62", "isController": false}, {"data": [[7500.0, 1.0], [7900.0, 1.0]], "isOverall": false, "label": "14-Editar Facturacion", "isController": true}, {"data": [[2600.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "15.4 Buscar ID Participante de Poliza", "isController": true}, {"data": [[2500.0, 1.0], [2700.0, 1.0]], "isOverall": false, "label": "15.8.1 Guardar Participante de la Poliza-68", "isController": false}, {"data": [[2400.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "17.6 Seleccionar embalaje y trayecto", "isController": true}, {"data": [[2600.0, 1.0], [2800.0, 1.0]], "isOverall": false, "label": "32-Clic Boton Cotizacion a Cliente", "isController": true}, {"data": [[14800.0, 1.0], [15000.0, 1.0]], "isOverall": false, "label": "17-Anadir Objeto de Cobertura", "isController": true}, {"data": [[400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "33.3 Clic Boton Cotizacion Aceptada-127", "isController": false}, {"data": [[700.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "27.2 Clausulas Siguiente-114", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "17.4 Anadir Objeto de Cobertura-75", "isController": false}, {"data": [[400.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "14.4 Seleccionar numero dia y modo de pago-48", "isController": false}, {"data": [[2500.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "17.5 Clic en anadir objeto", "isController": true}, {"data": [[8600.0, 2.0]], "isOverall": false, "label": "8-Clic en Siguiente", "isController": true}, {"data": [[5900.0, 1.0], [6100.0, 1.0]], "isOverall": false, "label": "22-Deducible Siguiente", "isController": true}, {"data": [[9500.0, 1.0], [9400.0, 1.0]], "isOverall": false, "label": "31-Clic Menu Cotizacion Relacionada a Historia", "isController": true}, {"data": [[7700.0, 1.0], [7800.0, 1.0]], "isOverall": false, "label": "8.1 Clic en siguiente-12", "isController": false}, {"data": [[5600.0, 1.0], [6600.0, 1.0]], "isOverall": false, "label": "19-Cobertura Siguiente", "isController": true}, {"data": [[1500.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "11.3.2 Clic en Buscar id de agente-22", "isController": false}, {"data": [[600.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "34-Clic Boton Proceder Cotizacion Aceptada", "isController": true}, {"data": [[700.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "17.8.1 Cerrar Objeto-82", "isController": false}, {"data": [[5700.0, 1.0], [6300.0, 1.0]], "isOverall": false, "label": "13-Cotizacion Relacionada a Historia Siguiente", "isController": true}, {"data": [[600.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "15.1 Clic Carpeta Participante de Poliza-53", "isController": false}, {"data": [[239400.0, 1.0], [240500.0, 1.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1700.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "9.2 Clic en Siguiente 2-15", "isController": false}, {"data": [[1600.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "12.1 Clic en Boton cotizacion nueva-35", "isController": false}, {"data": [[600.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "15.3.2 Clic Crear Participante de Poliza-56", "isController": false}, {"data": [[400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "15.7.1 Seleccionar participante estado e idioma-67", "isController": false}, {"data": [[300.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "6-Ingresar Cedula del Cliente", "isController": true}, {"data": [[1400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "17.5.1 Seleccionar tipo de mercancia-76", "isController": false}, {"data": [[600.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "12.2 Clic en Boton cotizacion nueva-36", "isController": false}, {"data": [[1300.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "21.5 Seleccionar el reclamo de franquicia-98", "isController": false}, {"data": [[3600.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "5.1 Clic MenuCrear Cotizacion-7", "isController": false}, {"data": [[4800.0, 1.0], [5100.0, 1.0]], "isOverall": false, "label": "16-Cotizacion General Siguiente", "isController": true}, {"data": [[600.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "3-Clic Menu Operaciones del Sistema", "isController": true}, {"data": [[1500.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "1-Index ", "isController": true}, {"data": [[400.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "11.4 Ingresar nombre de Agente", "isController": true}, {"data": [[2100.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "11.1 Clic Crear Agente-19", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "2.2 Presionar aceptar-4-0", "isController": false}, {"data": [[7300.0, 1.0], [7800.0, 1.0]], "isOverall": false, "label": "2.2 Presionar aceptar-4-1", "isController": false}, {"data": [[800.0, 2.0]], "isOverall": false, "label": "8.2 Clic en siguiente-13", "isController": false}, {"data": [[2700.0, 1.0], [3100.0, 1.0]], "isOverall": false, "label": "15.5 Ingresar y seleccionar nombre participante", "isController": true}, {"data": [[700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "17.8.3 Cerrar Objeto-84", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "20.2 Descuentos Siguiente-93", "isController": false}, {"data": [[6200.0, 1.0], [7200.0, 1.0]], "isOverall": false, "label": "9.1 Clic en Siguiente 2-14", "isController": false}, {"data": [[800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "15.5.1 Ingresar y seleccionar nombre participante-61", "isController": false}, {"data": [[2200.0, 1.0], [2400.0, 1.0]], "isOverall": false, "label": "17.7.1  Ingresar descripcion-80", "isController": false}, {"data": [[4800.0, 1.0], [5000.0, 1.0]], "isOverall": false, "label": "25.1 Comisiones Siguiente-109", "isController": false}, {"data": [[1100.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "17.5.2 Seleccionar id traslado-77", "isController": false}, {"data": [[900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "21.4 Seleccionar tipo de franquicia-97", "isController": false}, {"data": [[4300.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "18.4.1 Clic en Premium-89", "isController": false}, {"data": [[700.0, 2.0]], "isOverall": false, "label": "26.2 Impuestos Siguiente-112", "isController": false}, {"data": [[300.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "14.2 Clic en el icono editar-46", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "17.2 Anadir Objeto de Cobertura-73", "isController": false}, {"data": [[1400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "17.6.1 Seleccionar embalaje y trayecto desde-78", "isController": false}, {"data": [[8200.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "2-Login", "isController": true}, {"data": [[1200.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "25.2 Comisiones Siguiente-110", "isController": false}, {"data": [[6600.0, 1.0], [3400.0, 1.0]], "isOverall": false, "label": "33-Clic Boton Cotizacion Aceptada", "isController": true}, {"data": [[600.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "3.1 Clic Menu Operaciones del Sistema-5", "isController": false}, {"data": [[1100.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "10.3 Clic en Siguiente 3-18", "isController": false}, {"data": [[5800.0, 1.0], [6200.0, 1.0]], "isOverall": false, "label": "24.1 Documentos por Objeto Siguiente-107", "isController": false}, {"data": [[3200.0, 1.0], [3600.0, 1.0]], "isOverall": false, "label": "7-Buscar Cedula del Cliente", "isController": true}, {"data": [[800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "29.2 Calculo de Prima Clic Boton Guardar-118", "isController": false}, {"data": [[700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "14.3 Seleccionar numero dia y modo de pago-47", "isController": false}, {"data": [[1100.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "21.3 Seleccionar nombre de cobertura-96", "isController": false}, {"data": [[600.0, 2.0]], "isOverall": false, "label": "14.5 Seleccionar numero dia y modo de pago-49", "isController": false}, {"data": [[1100.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "18.1 Clic en icono de editar-85", "isController": false}, {"data": [[2300.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "18.3.1 Clic Guardar-87", "isController": false}, {"data": [[1200.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "11.5.1 Clic en Buscar-26", "isController": false}, {"data": [[4100.0, 1.0], [4900.0, 1.0]], "isOverall": false, "label": "20-Descuentos Siguiente", "isController": true}, {"data": [[200.0, 2.0]], "isOverall": false, "label": "1.2 Index-2", "isController": false}, {"data": [[9700.0, 1.0], [10400.0, 1.0]], "isOverall": false, "label": "12-Crear Cotizacion Nueva", "isController": true}, {"data": [[4100.0, 1.0], [3400.0, 1.0]], "isOverall": false, "label": "20.1 Descuentos Siguiente-92", "isController": false}, {"data": [[4900.0, 1.0], [5700.0, 1.0]], "isOverall": false, "label": "26-Impuestos Siguiente", "isController": true}, {"data": [[10300.0, 1.0], [7800.0, 1.0]], "isOverall": false, "label": "23- Documentos por Poliza Siguiente", "isController": true}, {"data": [[800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "33.2 Clic Boton Cotizacion Aceptada-126", "isController": false}, {"data": [[700.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "5.2 Clic MenuCrear Cotizacion -8", "isController": false}, {"data": [[2200.0, 1.0], [2500.0, 1.0]], "isOverall": false, "label": "11.5 Clic en Buscar", "isController": true}, {"data": [[1100.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "30.2 Clic Menu Cotizacion Relacionada a Historia-121", "isController": false}, {"data": [[2300.0, 1.0], [2700.0, 1.0]], "isOverall": false, "label": "17.1 Anadir Objeto de Cobertura-72", "isController": false}, {"data": [[700.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "21.2 Seleccionar objeto asegurado-95", "isController": false}, {"data": [[1300.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "21.7 Seleccionar dimension de franquicia-100", "isController": false}, {"data": [[4200.0, 1.0], [5300.0, 1.0]], "isOverall": false, "label": "12.6.1 Guardar cotizacion-41", "isController": false}, {"data": [[4500.0, 1.0], [4600.0, 1.0]], "isOverall": false, "label": "5-Clic MenuCrear Cotizacion", "isController": true}, {"data": [[400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "15.7 Seleccionar participante estado e idioma", "isController": true}, {"data": [[1100.0, 1.0], [1300.0, 1.0]], "isOverall": false, "label": "24.2 Documentos por Objeto Siguiente-108", "isController": false}, {"data": [[4200.0, 1.0], [4500.0, 1.0]], "isOverall": false, "label": "16.1 Cotizacion General Siguiente-70", "isController": false}, {"data": [[4200.0, 1.0], [5000.0, 1.0]], "isOverall": false, "label": "28.1 Informacion dle Cliente Siguiente-115", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "14.7.2 Guardar Facturacion-52", "isController": false}, {"data": [[22900.0, 1.0], [26300.0, 1.0]], "isOverall": false, "label": "30-Calculo de Prima Clic Boton Premium", "isController": true}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 240500.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 44.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 150.0, "series": [{"data": [[0.0, 44.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 150.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 76.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 1.7647058823529411, "minX": 1.59594972E12, "maxY": 2.0, "series": [{"data": [[1.59594996E12, 1.7647058823529411], [1.59594978E12, 2.0], [1.5959499E12, 2.0], [1.59594972E12, 2.0], [1.59594984E12, 2.0]], "isOverall": false, "label": "2- Thread Group_Cotizacion", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59594996E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 103.0, "minX": 5.0, "maxY": 240568.0, "series": [{"data": [[6.0, 2500.0]], "isOverall": false, "label": "18.3 Clic Guardar", "isController": true}, {"data": [[6.0, 2500.0]], "isOverall": false, "label": "18.3 Clic Guardar-Aggregated", "isController": true}, {"data": [[6.0, 571.0]], "isOverall": false, "label": "18.3.2 Clic Guardar-88", "isController": false}, {"data": [[6.0, 571.0]], "isOverall": false, "label": "18.3.2 Clic Guardar-88-Aggregated", "isController": false}, {"data": [[10.0, 105.0]], "isOverall": false, "label": "2.1 Ingresar usuario y contrase\u00F1a-3-1", "isController": false}, {"data": [[10.0, 105.0]], "isOverall": false, "label": "2.1 Ingresar usuario y contrase\u00F1a-3-1-Aggregated", "isController": false}, {"data": [[10.0, 354.5]], "isOverall": false, "label": "2.1 Ingresar usuario y contrase\u00F1a-3-0", "isController": false}, {"data": [[10.0, 354.5]], "isOverall": false, "label": "2.1 Ingresar usuario y contrase\u00F1a-3-0-Aggregated", "isController": false}, {"data": [[6.0, 690.0]], "isOverall": false, "label": "15.4.4 Buscar ID Participante de Poliza-60", "isController": false}, {"data": [[6.0, 690.0]], "isOverall": false, "label": "15.4.4 Buscar ID Participante de Poliza-60-Aggregated", "isController": false}, {"data": [[6.0, 5995.5]], "isOverall": false, "label": "25-Comisiones Siguiente", "isController": true}, {"data": [[6.0, 5995.5]], "isOverall": false, "label": "25-Comisiones Siguiente-Aggregated", "isController": true}, {"data": [[10.0, 113.0]], "isOverall": false, "label": "1.2 Index-2-1", "isController": false}, {"data": [[10.0, 113.0]], "isOverall": false, "label": "1.2 Index-2-1-Aggregated", "isController": false}, {"data": [[8.0, 511.0]], "isOverall": false, "label": "12.5 Clic en Ok-40", "isController": false}, {"data": [[8.0, 511.0]], "isOverall": false, "label": "12.5 Clic en Ok-40-Aggregated", "isController": false}, {"data": [[6.0, 485.0]], "isOverall": false, "label": "15.5.4 Ingresar y seleccionar nombre participante-64", "isController": false}, {"data": [[6.0, 485.0]], "isOverall": false, "label": "15.5.4 Ingresar y seleccionar nombre participante-64-Aggregated", "isController": false}, {"data": [[6.0, 7263.0]], "isOverall": false, "label": "23.1 Documentos por Poliza Siguiente-105", "isController": false}, {"data": [[6.0, 7263.0]], "isOverall": false, "label": "23.1 Documentos por Poliza Siguiente-105-Aggregated", "isController": false}, {"data": [[8.0, 784.5]], "isOverall": false, "label": "11.4.1 Ingresar nombre de Agente-25", "isController": false}, {"data": [[8.0, 784.5]], "isOverall": false, "label": "11.4.1 Ingresar nombre de Agente-25-Aggregated", "isController": false}, {"data": [[8.0, 2934.0]], "isOverall": false, "label": "11.6 Clic en ok", "isController": true}, {"data": [[8.0, 2934.0]], "isOverall": false, "label": "11.6 Clic en ok-Aggregated", "isController": true}, {"data": [[6.0, 2955.5]], "isOverall": false, "label": "29-Calculo de Prima Clic Boton Guardar", "isController": true}, {"data": [[6.0, 2955.5]], "isOverall": false, "label": "29-Calculo de Prima Clic Boton Guardar-Aggregated", "isController": true}, {"data": [[8.0, 468.5]], "isOverall": false, "label": "11.5.3 Clic en Buscar-28", "isController": false}, {"data": [[8.0, 468.5]], "isOverall": false, "label": "11.5.3 Clic en Buscar-28-Aggregated", "isController": false}, {"data": [[6.0, 1083.5]], "isOverall": false, "label": "13.2 Cotizacion Relacionada a Historia Siguiente-44", "isController": false}, {"data": [[6.0, 1083.5]], "isOverall": false, "label": "13.2 Cotizacion Relacionada a Historia Siguiente-44-Aggregated", "isController": false}, {"data": [[6.0, 5492.5]], "isOverall": false, "label": "22.1 Clic en Siguiente-103", "isController": false}, {"data": [[6.0, 5492.5]], "isOverall": false, "label": "22.1 Clic en Siguiente-103-Aggregated", "isController": false}, {"data": [[6.0, 247.0]], "isOverall": false, "label": "15.4.3 Buscar ID Participante de Poliza-59", "isController": false}, {"data": [[6.0, 247.0]], "isOverall": false, "label": "15.4.3 Buscar ID Participante de Poliza-59-Aggregated", "isController": false}, {"data": [[6.0, 4606.5]], "isOverall": false, "label": "26.1 Impuestos Siguiente-111", "isController": false}, {"data": [[6.0, 4606.5]], "isOverall": false, "label": "26.1 Impuestos Siguiente-111-Aggregated", "isController": false}, {"data": [[8.0, 827.0]], "isOverall": false, "label": "11.5.2 Clic en Buscar-27", "isController": false}, {"data": [[8.0, 827.0]], "isOverall": false, "label": "11.5.2 Clic en Buscar-27-Aggregated", "isController": false}, {"data": [[10.0, 103.0]], "isOverall": false, "label": "1.2 Index-2-0", "isController": false}, {"data": [[10.0, 103.0]], "isOverall": false, "label": "1.2 Index-2-0-Aggregated", "isController": false}, {"data": [[6.0, 1130.0]], "isOverall": false, "label": "17.6.2 Seleccionar trayecto hasta-79", "isController": false}, {"data": [[6.0, 1130.0]], "isOverall": false, "label": "17.6.2 Seleccionar trayecto hasta-79-Aggregated", "isController": false}, {"data": [[6.0, 3313.0]], "isOverall": false, "label": "14.7.1 Guardar Facturacion-51", "isController": false}, {"data": [[6.0, 3313.0]], "isOverall": false, "label": "14.7.1 Guardar Facturacion-51-Aggregated", "isController": false}, {"data": [[6.0, 584.5]], "isOverall": false, "label": "22.2 Clic en Siguiente-104", "isController": false}, {"data": [[6.0, 584.5]], "isOverall": false, "label": "22.2 Clic en Siguiente-104-Aggregated", "isController": false}, {"data": [[10.0, 6243.5]], "isOverall": false, "label": "10.1 Clic en Siguiente 3-16", "isController": false}, {"data": [[10.0, 6243.5]], "isOverall": false, "label": "10.1 Clic en Siguiente 3-16-Aggregated", "isController": false}, {"data": [[10.0, 423.5]], "isOverall": false, "label": "6.1 Ingresar Cedula del Cliente-9", "isController": false}, {"data": [[10.0, 423.5]], "isOverall": false, "label": "6.1 Ingresar Cedula del Cliente-9-Aggregated", "isController": false}, {"data": [[6.0, 2948.0]], "isOverall": false, "label": "17.8 Cerrar Objeto", "isController": true}, {"data": [[6.0, 2948.0]], "isOverall": false, "label": "17.8 Cerrar Objeto-Aggregated", "isController": true}, {"data": [[6.0, 1163.0]], "isOverall": false, "label": "17.3 Anadir Objeto de Cobertura-74", "isController": false}, {"data": [[6.0, 1163.0]], "isOverall": false, "label": "17.3 Anadir Objeto de Cobertura-74-Aggregated", "isController": false}, {"data": [[6.0, 1833.5]], "isOverall": false, "label": "23.2 Documentos por Poliza Siguiente-106", "isController": false}, {"data": [[6.0, 1833.5]], "isOverall": false, "label": "23.2 Documentos por Poliza Siguiente-106-Aggregated", "isController": false}, {"data": [[8.0, 952.0], [9.0, 1080.0]], "isOverall": false, "label": "11.3.1 Clic en Buscar id de agente-21", "isController": false}, {"data": [[8.5, 1016.0]], "isOverall": false, "label": "11.3.1 Clic en Buscar id de agente-21-Aggregated", "isController": false}, {"data": [[6.0, 5797.5]], "isOverall": false, "label": "28-Informacion dle Cliente Siguiente", "isController": true}, {"data": [[6.0, 5797.5]], "isOverall": false, "label": "28-Informacion dle Cliente Siguiente-Aggregated", "isController": true}, {"data": [[8.0, 1030.0]], "isOverall": false, "label": "11.7.3 Clic en guardar-34", "isController": false}, {"data": [[8.0, 1030.0]], "isOverall": false, "label": "11.7.3 Clic en guardar-34-Aggregated", "isController": false}, {"data": [[6.0, 2010.5]], "isOverall": false, "label": "21.8.1 Seleccionar min de franquicia-101", "isController": false}, {"data": [[6.0, 2010.5]], "isOverall": false, "label": "21.8.1 Seleccionar min de franquicia-101-Aggregated", "isController": false}, {"data": [[6.0, 2159.5]], "isOverall": false, "label": "15.6 Buscar ID Participante de Poliza ok", "isController": true}, {"data": [[6.0, 2159.5]], "isOverall": false, "label": "15.6 Buscar ID Participante de Poliza ok-Aggregated", "isController": true}, {"data": [[6.0, 584.5]], "isOverall": false, "label": "16.2 Cotizacion General Siguiente-71", "isController": false}, {"data": [[6.0, 584.5]], "isOverall": false, "label": "16.2 Cotizacion General Siguiente-71-Aggregated", "isController": false}, {"data": [[10.0, 1140.0]], "isOverall": false, "label": "7.2 Seleccionar cliente-11", "isController": false}, {"data": [[10.0, 1140.0]], "isOverall": false, "label": "7.2 Seleccionar cliente-11-Aggregated", "isController": false}, {"data": [[10.0, 1061.0]], "isOverall": false, "label": "1.1 Index-1", "isController": false}, {"data": [[10.0, 1061.0]], "isOverall": false, "label": "1.1 Index-1-Aggregated", "isController": false}, {"data": [[8.0, 1003.0]], "isOverall": false, "label": "11.7.2 Clic en guardar-33", "isController": false}, {"data": [[8.0, 1003.0]], "isOverall": false, "label": "11.7.2 Clic en guardar-33-Aggregated", "isController": false}, {"data": [[8.0, 5499.5]], "isOverall": false, "label": "11.7 Modificar y guardar agente", "isController": true}, {"data": [[8.0, 5499.5]], "isOverall": false, "label": "11.7 Modificar y guardar agente-Aggregated", "isController": true}, {"data": [[6.0, 702.5]], "isOverall": false, "label": "21.8.1 Guardar deducible-102", "isController": false}, {"data": [[6.0, 702.5]], "isOverall": false, "label": "21.8.1 Guardar deducible-102-Aggregated", "isController": false}, {"data": [[6.0, 1699.5]], "isOverall": false, "label": "32.1 Clic Boton Cotizacion a Cliente-123", "isController": false}, {"data": [[6.0, 1699.5]], "isOverall": false, "label": "32.1 Clic Boton Cotizacion a Cliente-123-Aggregated", "isController": false}, {"data": [[8.0, 975.0]], "isOverall": false, "label": "11.6.1 Clic en ok-29", "isController": false}, {"data": [[8.0, 975.0]], "isOverall": false, "label": "11.6.1 Clic en ok-29-Aggregated", "isController": false}, {"data": [[6.0, 8017.0]], "isOverall": false, "label": "18- Editar Objeto de Cobertura", "isController": true}, {"data": [[6.0, 8017.0]], "isOverall": false, "label": "18- Editar Objeto de Cobertura-Aggregated", "isController": true}, {"data": [[6.0, 7349.5]], "isOverall": false, "label": "24-Documentos por Objeto Siguiente", "isController": true}, {"data": [[6.0, 7349.5]], "isOverall": false, "label": "24-Documentos por Objeto Siguiente-Aggregated", "isController": true}, {"data": [[6.0, 24672.5]], "isOverall": false, "label": "30.1 Calculo de Prima Clic Boton Premium-119", "isController": false}, {"data": [[6.0, 24672.5]], "isOverall": false, "label": "30.1 Calculo de Prima Clic Boton Premium-119-Aggregated", "isController": false}, {"data": [[6.0, 855.5]], "isOverall": false, "label": "15.3 Clic Crear Participante de Poliza", "isController": true}, {"data": [[6.0, 855.5]], "isOverall": false, "label": "15.3 Clic Crear Participante de Poliza-Aggregated", "isController": true}, {"data": [[6.0, 809.5]], "isOverall": false, "label": "15.8.2 Guardar Participante de la Poliza-69", "isController": false}, {"data": [[6.0, 809.5]], "isOverall": false, "label": "15.8.2 Guardar Participante de la Poliza-69-Aggregated", "isController": false}, {"data": [[6.0, 1125.0]], "isOverall": false, "label": "28.2 Informacion dle Cliente Siguiente-116", "isController": false}, {"data": [[6.0, 1125.0]], "isOverall": false, "label": "28.2 Informacion dle Cliente Siguiente-116-Aggregated", "isController": false}, {"data": [[6.0, 669.5]], "isOverall": false, "label": "14.6 Seleccionar numero dia y modo de pago-50", "isController": false}, {"data": [[6.0, 669.5]], "isOverall": false, "label": "14.6 Seleccionar numero dia y modo de pago-50-Aggregated", "isController": false}, {"data": [[6.0, 605.5]], "isOverall": false, "label": "15.5.3 Ingresar y seleccionar nombre participante-63", "isController": false}, {"data": [[6.0, 605.5]], "isOverall": false, "label": "15.5.3 Ingresar y seleccionar nombre participante-63-Aggregated", "isController": false}, {"data": [[10.0, 186.5]], "isOverall": false, "label": "4.1 Clic Menu Control de Polizas-6", "isController": false}, {"data": [[10.0, 186.5]], "isOverall": false, "label": "4.1 Clic Menu Control de Polizas-6-Aggregated", "isController": false}, {"data": [[10.0, 1080.5]], "isOverall": false, "label": "10.2 Clic en Siguiente 3-17", "isController": false}, {"data": [[10.0, 1080.5]], "isOverall": false, "label": "10.2 Clic en Siguiente 3-17-Aggregated", "isController": false}, {"data": [[8.0, 1169.0]], "isOverall": false, "label": "12.6.2 Guardar cotizacion-42", "isController": false}, {"data": [[8.0, 1169.0]], "isOverall": false, "label": "12.6.2 Guardar cotizacion-42-Aggregated", "isController": false}, {"data": [[8.0, 3466.5]], "isOverall": false, "label": "11.7.1 Seleccionar funcion de agente e ingresar distribucion-32", "isController": false}, {"data": [[8.0, 3466.5]], "isOverall": false, "label": "11.7.1 Seleccionar funcion de agente e ingresar distribucion-32-Aggregated", "isController": false}, {"data": [[6.0, 6242.0]], "isOverall": false, "label": "27-Clausulas Siguiente", "isController": true}, {"data": [[6.0, 6242.0]], "isOverall": false, "label": "27-Clausulas Siguiente-Aggregated", "isController": true}, {"data": [[8.0, 416.5]], "isOverall": false, "label": "11.3.3 Clic en Buscar id de agente-23", "isController": false}, {"data": [[8.0, 416.5]], "isOverall": false, "label": "11.3.3 Clic en Buscar id de agente-23-Aggregated", "isController": false}, {"data": [[8.0, 18165.0]], "isOverall": false, "label": "11-Clic Crear Agente", "isController": true}, {"data": [[8.0, 18165.0]], "isOverall": false, "label": "11-Clic Crear Agente-Aggregated", "isController": true}, {"data": [[5.0, 5302.0], [6.0, 1997.0]], "isOverall": false, "label": "33.1 Clic Boton Cotizacion Aceptada-125", "isController": false}, {"data": [[5.5, 3649.5]], "isOverall": false, "label": "33.1 Clic Boton Cotizacion Aceptada-125-Aggregated", "isController": false}, {"data": [[5.0, 293.0], [6.0, 509.0]], "isOverall": false, "label": "34.2 Clic Boton Proceder Cotizacion Aceptada-129", "isController": false}, {"data": [[5.5, 401.0]], "isOverall": false, "label": "34.2 Clic Boton Proceder Cotizacion Aceptada-129-Aggregated", "isController": false}, {"data": [[6.0, 745.5]], "isOverall": false, "label": "14.1 Clic en el icono editar-45", "isController": false}, {"data": [[6.0, 745.5]], "isOverall": false, "label": "14.1 Clic en el icono editar-45-Aggregated", "isController": false}, {"data": [[6.0, 3450.0]], "isOverall": false, "label": "15.8 Guardar Participante de la Poliza", "isController": true}, {"data": [[6.0, 3450.0]], "isOverall": false, "label": "15.8 Guardar Participante de la Poliza-Aggregated", "isController": true}, {"data": [[6.0, 13179.0]], "isOverall": false, "label": "15-Participante de Poliza", "isController": true}, {"data": [[6.0, 13179.0]], "isOverall": false, "label": "15-Participante de Poliza-Aggregated", "isController": true}, {"data": [[8.0, 501.0]], "isOverall": false, "label": "12.3 Clic en Boton cotizacion nueva-38", "isController": false}, {"data": [[8.0, 501.0]], "isOverall": false, "label": "12.3 Clic en Boton cotizacion nueva-38-Aggregated", "isController": false}, {"data": [[10.0, 8661.5]], "isOverall": false, "label": "10-Clic en Siguiente 3", "isController": true}, {"data": [[10.0, 8661.5]], "isOverall": false, "label": "10-Clic en Siguiente 3-Aggregated", "isController": true}, {"data": [[6.0, 476.5]], "isOverall": false, "label": "15.3.1 Clic Crear Participante de Poliza-55", "isController": false}, {"data": [[6.0, 476.5]], "isOverall": false, "label": "15.3.1 Clic Crear Participante de Poliza-55-Aggregated", "isController": false}, {"data": [[6.0, 532.5]], "isOverall": false, "label": "15.4.2 Buscar ID Participante de Poliza-58", "isController": false}, {"data": [[6.0, 532.5]], "isOverall": false, "label": "15.4.2 Buscar ID Participante de Poliza-58-Aggregated", "isController": false}, {"data": [[8.0, 502.0]], "isOverall": false, "label": "11.6.3 Clic en ok-31", "isController": false}, {"data": [[8.0, 502.0]], "isOverall": false, "label": "11.6.3 Clic en ok-31-Aggregated", "isController": false}, {"data": [[6.0, 4025.5]], "isOverall": false, "label": "14.7 Guardar Facturacion", "isController": true}, {"data": [[6.0, 4025.5]], "isOverall": false, "label": "14.7 Guardar Facturacion-Aggregated", "isController": true}, {"data": [[6.0, 4119.5]], "isOverall": false, "label": "18.4 Clic en Premium", "isController": true}, {"data": [[6.0, 4119.5]], "isOverall": false, "label": "18.4 Clic en Premium-Aggregated", "isController": true}, {"data": [[6.0, 1070.0]], "isOverall": false, "label": "32.2 Clic Boton Cotizacion a Cliente-124", "isController": false}, {"data": [[6.0, 1070.0]], "isOverall": false, "label": "32.2 Clic Boton Cotizacion a Cliente-124-Aggregated", "isController": false}, {"data": [[6.0, 304.5]], "isOverall": false, "label": "15.2 Clic Carpeta Participante de Poliza-54", "isController": false}, {"data": [[6.0, 304.5]], "isOverall": false, "label": "15.2 Clic Carpeta Participante de Poliza-54-Aggregated", "isController": false}, {"data": [[6.0, 5416.0]], "isOverall": false, "label": "27.1 Clausulas Siguiente-113", "isController": false}, {"data": [[6.0, 5416.0]], "isOverall": false, "label": "27.1 Clausulas Siguiente-113-Aggregated", "isController": false}, {"data": [[10.0, 7714.0]], "isOverall": false, "label": "2.2 Presionar aceptar-4", "isController": false}, {"data": [[10.0, 7714.0]], "isOverall": false, "label": "2.2 Presionar aceptar-4-Aggregated", "isController": false}, {"data": [[8.0, 3311.5]], "isOverall": false, "label": "11.3 Clic en Buscar id de agente", "isController": true}, {"data": [[8.0, 3311.5]], "isOverall": false, "label": "11.3 Clic en Buscar id de agente-Aggregated", "isController": true}, {"data": [[6.0, 5355.0]], "isOverall": false, "label": "19.1 Cobertura Siguiente-90", "isController": false}, {"data": [[6.0, 5355.0]], "isOverall": false, "label": "19.1 Cobertura Siguiente-90-Aggregated", "isController": false}, {"data": [[6.0, 386.0]], "isOverall": false, "label": "18.2.1 Ingresar valor asegurado-86", "isController": false}, {"data": [[6.0, 386.0]], "isOverall": false, "label": "18.2.1 Ingresar valor asegurado-86-Aggregated", "isController": false}, {"data": [[6.0, 386.0]], "isOverall": false, "label": "18.2 Ingresar valor asegurado", "isController": true}, {"data": [[6.0, 386.0]], "isOverall": false, "label": "18.2 Ingresar valor asegurado-Aggregated", "isController": true}, {"data": [[6.0, 851.0]], "isOverall": false, "label": "30.3 Clic Menu Cotizacion Relacionada a Historia-122", "isController": false}, {"data": [[6.0, 851.0]], "isOverall": false, "label": "30.3 Clic Menu Cotizacion Relacionada a Historia-122-Aggregated", "isController": false}, {"data": [[8.0, 5963.5]], "isOverall": false, "label": "12.6-Guardar cotizacion", "isController": true}, {"data": [[8.0, 5963.5]], "isOverall": false, "label": "12.6-Guardar cotizacion-Aggregated", "isController": true}, {"data": [[10.0, 186.5]], "isOverall": false, "label": "4-Clic Menu Control de Polizas", "isController": true}, {"data": [[10.0, 186.5]], "isOverall": false, "label": "4-Clic Menu Control de Polizas-Aggregated", "isController": true}, {"data": [[6.0, 4960.5]], "isOverall": false, "label": "13.1 Cotizacion Relacionada a Historia Siguiente-43", "isController": false}, {"data": [[6.0, 4960.5]], "isOverall": false, "label": "13.1 Cotizacion Relacionada a Historia Siguiente-43-Aggregated", "isController": false}, {"data": [[6.0, 945.0]], "isOverall": false, "label": "21.6 Seleccionar valor de franquicia-99", "isController": false}, {"data": [[6.0, 945.0]], "isOverall": false, "label": "21.6 Seleccionar valor de franquicia-99-Aggregated", "isController": false}, {"data": [[6.0, 1505.5]], "isOverall": false, "label": "17.8.2 Cerrar Objeto-83", "isController": false}, {"data": [[6.0, 1505.5]], "isOverall": false, "label": "17.8.2 Cerrar Objeto-83-Aggregated", "isController": false}, {"data": [[6.0, 10231.0]], "isOverall": false, "label": "21-Crear Deducible", "isController": true}, {"data": [[6.0, 10231.0]], "isOverall": false, "label": "21-Crear Deducible-Aggregated", "isController": true}, {"data": [[5.0, 391.0], [6.0, 440.0]], "isOverall": false, "label": "34.1 Clic Boton Proceder Cotizacion Aceptada-128", "isController": false}, {"data": [[5.5, 415.5]], "isOverall": false, "label": "34.1 Clic Boton Proceder Cotizacion Aceptada-128-Aggregated", "isController": false}, {"data": [[10.0, 460.0]], "isOverall": false, "label": "2.1 Ingresar usuario y contrase\u00F1a-3", "isController": false}, {"data": [[10.0, 460.0]], "isOverall": false, "label": "2.1 Ingresar usuario y contrase\u00F1a-3-Aggregated", "isController": false}, {"data": [[9.0, 978.0], [10.0, 1225.0]], "isOverall": false, "label": "11.2 Clic Crear Agente-20", "isController": false}, {"data": [[9.5, 1101.5]], "isOverall": false, "label": "11.2 Clic Crear Agente-20-Aggregated", "isController": false}, {"data": [[6.0, 621.0]], "isOverall": false, "label": "17.7.2  Grabar objeto-81", "isController": false}, {"data": [[6.0, 621.0]], "isOverall": false, "label": "17.7.2  Grabar objeto-81-Aggregated", "isController": false}, {"data": [[6.0, 2713.0]], "isOverall": false, "label": "21.8 Seleccionar min de franquicia y guardar", "isController": true}, {"data": [[6.0, 2713.0]], "isOverall": false, "label": "21.8 Seleccionar min de franquicia y guardar-Aggregated", "isController": true}, {"data": [[10.0, 8134.5]], "isOverall": false, "label": "9-Clic en Siguiente 2", "isController": true}, {"data": [[10.0, 8134.5]], "isOverall": false, "label": "9-Clic en Siguiente 2-Aggregated", "isController": true}, {"data": [[6.0, 2953.0]], "isOverall": false, "label": "17.7 Ingresar descripcion y grabar objeto", "isController": true}, {"data": [[6.0, 2953.0]], "isOverall": false, "label": "17.7 Ingresar descripcion y grabar objeto-Aggregated", "isController": true}, {"data": [[6.0, 7665.5]], "isOverall": false, "label": "30.1 Clic Menu Cotizacion Relacionada a Historia-120", "isController": false}, {"data": [[6.0, 7665.5]], "isOverall": false, "label": "30.1 Clic Menu Cotizacion Relacionada a Historia-120-Aggregated", "isController": false}, {"data": [[8.0, 619.0]], "isOverall": false, "label": "12.4 Seleccionar nombre de producto-39", "isController": false}, {"data": [[8.0, 619.0]], "isOverall": false, "label": "12.4 Seleccionar nombre de producto-39-Aggregated", "isController": false}, {"data": [[6.0, 802.5]], "isOverall": false, "label": "15.6.1 Buscar ID Participante de Poliza ok-65", "isController": false}, {"data": [[6.0, 802.5]], "isOverall": false, "label": "15.6.1 Buscar ID Participante de Poliza ok-65-Aggregated", "isController": false}, {"data": [[10.0, 2287.5]], "isOverall": false, "label": "7.1 Clic en Buscar-10", "isController": false}, {"data": [[10.0, 2287.5]], "isOverall": false, "label": "7.1 Clic en Buscar-10-Aggregated", "isController": false}, {"data": [[6.0, 739.0]], "isOverall": false, "label": "15.6.3 Buscar ID Participante de Poliza ok-66", "isController": false}, {"data": [[6.0, 739.0]], "isOverall": false, "label": "15.6.3 Buscar ID Participante de Poliza ok-66-Aggregated", "isController": false}, {"data": [[6.0, 618.0]], "isOverall": false, "label": "15.6.2 Buscar ID Participante de Poliza ok-66", "isController": false}, {"data": [[6.0, 618.0]], "isOverall": false, "label": "15.6.2 Buscar ID Participante de Poliza ok-66-Aggregated", "isController": false}, {"data": [[8.0, 675.0]], "isOverall": false, "label": "11.3.4 Clic en Buscar id de agente-24", "isController": false}, {"data": [[8.0, 675.0]], "isOverall": false, "label": "11.3.4 Clic en Buscar id de agente-24-Aggregated", "isController": false}, {"data": [[8.0, 1457.0]], "isOverall": false, "label": "11.6.2 Clic en ok-30", "isController": false}, {"data": [[8.0, 1457.0]], "isOverall": false, "label": "11.6.2 Clic en ok-30-Aggregated", "isController": false}, {"data": [[6.0, 2055.5]], "isOverall": false, "label": "29.1 Calculo de Prima Clic Boton Guardar-117", "isController": false}, {"data": [[6.0, 2055.5]], "isOverall": false, "label": "29.1 Calculo de Prima Clic Boton Guardar-117-Aggregated", "isController": false}, {"data": [[6.0, 882.5]], "isOverall": false, "label": "15.4.1 Buscar ID Participante de Poliza-57", "isController": false}, {"data": [[6.0, 882.5]], "isOverall": false, "label": "15.4.1 Buscar ID Participante de Poliza-57-Aggregated", "isController": false}, {"data": [[6.0, 797.5]], "isOverall": false, "label": "19.2 Cobertura Siguiente-91", "isController": false}, {"data": [[6.0, 797.5]], "isOverall": false, "label": "19.2 Cobertura Siguiente-91-Aggregated", "isController": false}, {"data": [[6.0, 2003.5]], "isOverall": false, "label": "21.1 Clic Crear Deducible-94", "isController": false}, {"data": [[6.0, 2003.5]], "isOverall": false, "label": "21.1 Clic Crear Deducible-94-Aggregated", "isController": false}, {"data": [[6.0, 1125.0]], "isOverall": false, "label": "15.5.2 Ingresar y seleccionar nombre participante-62", "isController": false}, {"data": [[6.0, 1125.0]], "isOverall": false, "label": "15.5.2 Ingresar y seleccionar nombre participante-62-Aggregated", "isController": false}, {"data": [[6.0, 7714.0]], "isOverall": false, "label": "14-Editar Facturacion", "isController": true}, {"data": [[6.0, 7714.0]], "isOverall": false, "label": "14-Editar Facturacion-Aggregated", "isController": true}, {"data": [[6.0, 2352.0]], "isOverall": false, "label": "15.4 Buscar ID Participante de Poliza", "isController": true}, {"data": [[6.0, 2352.0]], "isOverall": false, "label": "15.4 Buscar ID Participante de Poliza-Aggregated", "isController": true}, {"data": [[6.0, 2640.5]], "isOverall": false, "label": "15.8.1 Guardar Participante de la Poliza-68", "isController": false}, {"data": [[6.0, 2640.5]], "isOverall": false, "label": "15.8.1 Guardar Participante de la Poliza-68-Aggregated", "isController": false}, {"data": [[6.0, 2167.0]], "isOverall": false, "label": "17.6 Seleccionar embalaje y trayecto", "isController": true}, {"data": [[6.0, 2167.0]], "isOverall": false, "label": "17.6 Seleccionar embalaje y trayecto-Aggregated", "isController": true}, {"data": [[6.0, 2769.5]], "isOverall": false, "label": "32-Clic Boton Cotizacion a Cliente", "isController": true}, {"data": [[6.0, 2769.5]], "isOverall": false, "label": "32-Clic Boton Cotizacion a Cliente-Aggregated", "isController": true}, {"data": [[6.0, 14952.0]], "isOverall": false, "label": "17-Anadir Objeto de Cobertura", "isController": true}, {"data": [[6.0, 14952.0]], "isOverall": false, "label": "17-Anadir Objeto de Cobertura-Aggregated", "isController": true}, {"data": [[5.0, 481.0], [6.0, 575.0]], "isOverall": false, "label": "33.3 Clic Boton Cotizacion Aceptada-127", "isController": false}, {"data": [[5.5, 528.0]], "isOverall": false, "label": "33.3 Clic Boton Cotizacion Aceptada-127-Aggregated", "isController": false}, {"data": [[6.0, 826.0]], "isOverall": false, "label": "27.2 Clausulas Siguiente-114", "isController": false}, {"data": [[6.0, 826.0]], "isOverall": false, "label": "27.2 Clausulas Siguiente-114-Aggregated", "isController": false}, {"data": [[6.0, 116.5]], "isOverall": false, "label": "17.4 Anadir Objeto de Cobertura-75", "isController": false}, {"data": [[6.0, 116.5]], "isOverall": false, "label": "17.4 Anadir Objeto de Cobertura-75-Aggregated", "isController": false}, {"data": [[6.0, 699.5]], "isOverall": false, "label": "14.4 Seleccionar numero dia y modo de pago-48", "isController": false}, {"data": [[6.0, 699.5]], "isOverall": false, "label": "14.4 Seleccionar numero dia y modo de pago-48-Aggregated", "isController": false}, {"data": [[6.0, 2301.5]], "isOverall": false, "label": "17.5 Clic en anadir objeto", "isController": true}, {"data": [[6.0, 2301.5]], "isOverall": false, "label": "17.5 Clic en anadir objeto-Aggregated", "isController": true}, {"data": [[10.0, 8650.5]], "isOverall": false, "label": "8-Clic en Siguiente", "isController": true}, {"data": [[10.0, 8650.5]], "isOverall": false, "label": "8-Clic en Siguiente-Aggregated", "isController": true}, {"data": [[6.0, 6077.0]], "isOverall": false, "label": "22-Deducible Siguiente", "isController": true}, {"data": [[6.0, 6077.0]], "isOverall": false, "label": "22-Deducible Siguiente-Aggregated", "isController": true}, {"data": [[6.0, 9502.0]], "isOverall": false, "label": "31-Clic Menu Cotizacion Relacionada a Historia", "isController": true}, {"data": [[6.0, 9502.0]], "isOverall": false, "label": "31-Clic Menu Cotizacion Relacionada a Historia-Aggregated", "isController": true}, {"data": [[10.0, 7828.5]], "isOverall": false, "label": "8.1 Clic en siguiente-12", "isController": false}, {"data": [[10.0, 7828.5]], "isOverall": false, "label": "8.1 Clic en siguiente-12-Aggregated", "isController": false}, {"data": [[6.0, 6152.5]], "isOverall": false, "label": "19-Cobertura Siguiente", "isController": true}, {"data": [[6.0, 6152.5]], "isOverall": false, "label": "19-Cobertura Siguiente-Aggregated", "isController": true}, {"data": [[8.0, 1204.0]], "isOverall": false, "label": "11.3.2 Clic en Buscar id de agente-22", "isController": false}, {"data": [[8.0, 1204.0]], "isOverall": false, "label": "11.3.2 Clic en Buscar id de agente-22-Aggregated", "isController": false}, {"data": [[5.0, 684.0], [6.0, 949.0]], "isOverall": false, "label": "34-Clic Boton Proceder Cotizacion Aceptada", "isController": true}, {"data": [[5.5, 816.5]], "isOverall": false, "label": "34-Clic Boton Proceder Cotizacion Aceptada-Aggregated", "isController": true}, {"data": [[6.0, 793.5]], "isOverall": false, "label": "17.8.1 Cerrar Objeto-82", "isController": false}, {"data": [[6.0, 793.5]], "isOverall": false, "label": "17.8.1 Cerrar Objeto-82-Aggregated", "isController": false}, {"data": [[6.0, 6044.0]], "isOverall": false, "label": "13-Cotizacion Relacionada a Historia Siguiente", "isController": true}, {"data": [[6.0, 6044.0]], "isOverall": false, "label": "13-Cotizacion Relacionada a Historia Siguiente-Aggregated", "isController": true}, {"data": [[6.0, 608.5]], "isOverall": false, "label": "15.1 Clic Carpeta Participante de Poliza-53", "isController": false}, {"data": [[6.0, 608.5]], "isOverall": false, "label": "15.1 Clic Carpeta Participante de Poliza-53-Aggregated", "isController": false}, {"data": [[5.0, 240568.0], [6.0, 239414.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[5.5, 239991.0]], "isOverall": false, "label": "Transaction Controller-Aggregated", "isController": true}, {"data": [[10.0, 1393.5]], "isOverall": false, "label": "9.2 Clic en Siguiente 2-15", "isController": false}, {"data": [[10.0, 1393.5]], "isOverall": false, "label": "9.2 Clic en Siguiente 2-15-Aggregated", "isController": false}, {"data": [[8.0, 1694.5]], "isOverall": false, "label": "12.1 Clic en Boton cotizacion nueva-35", "isController": false}, {"data": [[8.0, 1694.5]], "isOverall": false, "label": "12.1 Clic en Boton cotizacion nueva-35-Aggregated", "isController": false}, {"data": [[6.0, 379.0]], "isOverall": false, "label": "15.3.2 Clic Crear Participante de Poliza-56", "isController": false}, {"data": [[6.0, 379.0]], "isOverall": false, "label": "15.3.2 Clic Crear Participante de Poliza-56-Aggregated", "isController": false}, {"data": [[6.0, 495.0]], "isOverall": false, "label": "15.7.1 Seleccionar participante estado e idioma-67", "isController": false}, {"data": [[6.0, 495.0]], "isOverall": false, "label": "15.7.1 Seleccionar participante estado e idioma-67-Aggregated", "isController": false}, {"data": [[10.0, 423.5]], "isOverall": false, "label": "6-Ingresar Cedula del Cliente", "isController": true}, {"data": [[10.0, 423.5]], "isOverall": false, "label": "6-Ingresar Cedula del Cliente-Aggregated", "isController": true}, {"data": [[6.0, 972.0]], "isOverall": false, "label": "17.5.1 Seleccionar tipo de mercancia-76", "isController": false}, {"data": [[6.0, 972.0]], "isOverall": false, "label": "17.5.1 Seleccionar tipo de mercancia-76-Aggregated", "isController": false}, {"data": [[8.0, 809.0]], "isOverall": false, "label": "12.2 Clic en Boton cotizacion nueva-36", "isController": false}, {"data": [[8.0, 809.0]], "isOverall": false, "label": "12.2 Clic en Boton cotizacion nueva-36-Aggregated", "isController": false}, {"data": [[6.0, 1073.5]], "isOverall": false, "label": "21.5 Seleccionar el reclamo de franquicia-98", "isController": false}, {"data": [[6.0, 1073.5]], "isOverall": false, "label": "21.5 Seleccionar el reclamo de franquicia-98-Aggregated", "isController": false}, {"data": [[10.0, 3754.5]], "isOverall": false, "label": "5.1 Clic MenuCrear Cotizacion-7", "isController": false}, {"data": [[10.0, 3754.5]], "isOverall": false, "label": "5.1 Clic MenuCrear Cotizacion-7-Aggregated", "isController": false}, {"data": [[6.0, 4981.5]], "isOverall": false, "label": "16-Cotizacion General Siguiente", "isController": true}, {"data": [[6.0, 4981.5]], "isOverall": false, "label": "16-Cotizacion General Siguiente-Aggregated", "isController": true}, {"data": [[10.0, 738.5]], "isOverall": false, "label": "3-Clic Menu Operaciones del Sistema", "isController": true}, {"data": [[10.0, 738.5]], "isOverall": false, "label": "3-Clic Menu Operaciones del Sistema-Aggregated", "isController": true}, {"data": [[10.0, 1278.5]], "isOverall": false, "label": "1-Index ", "isController": true}, {"data": [[10.0, 1278.5]], "isOverall": false, "label": "1-Index -Aggregated", "isController": true}, {"data": [[8.0, 784.5]], "isOverall": false, "label": "11.4 Ingresar nombre de Agente", "isController": true}, {"data": [[8.0, 784.5]], "isOverall": false, "label": "11.4 Ingresar nombre de Agente-Aggregated", "isController": true}, {"data": [[10.0, 2112.0]], "isOverall": false, "label": "11.1 Clic Crear Agente-19", "isController": false}, {"data": [[10.0, 2112.0]], "isOverall": false, "label": "11.1 Clic Crear Agente-19-Aggregated", "isController": false}, {"data": [[10.0, 144.0]], "isOverall": false, "label": "2.2 Presionar aceptar-4-0", "isController": false}, {"data": [[10.0, 144.0]], "isOverall": false, "label": "2.2 Presionar aceptar-4-0-Aggregated", "isController": false}, {"data": [[10.0, 7570.0]], "isOverall": false, "label": "2.2 Presionar aceptar-4-1", "isController": false}, {"data": [[10.0, 7570.0]], "isOverall": false, "label": "2.2 Presionar aceptar-4-1-Aggregated", "isController": false}, {"data": [[10.0, 822.0]], "isOverall": false, "label": "8.2 Clic en siguiente-13", "isController": false}, {"data": [[10.0, 822.0]], "isOverall": false, "label": "8.2 Clic en siguiente-13-Aggregated", "isController": false}, {"data": [[6.0, 2954.0]], "isOverall": false, "label": "15.5 Ingresar y seleccionar nombre participante", "isController": true}, {"data": [[6.0, 2954.0]], "isOverall": false, "label": "15.5 Ingresar y seleccionar nombre participante-Aggregated", "isController": true}, {"data": [[6.0, 649.0]], "isOverall": false, "label": "17.8.3 Cerrar Objeto-84", "isController": false}, {"data": [[6.0, 649.0]], "isOverall": false, "label": "17.8.3 Cerrar Objeto-84-Aggregated", "isController": false}, {"data": [[6.0, 698.0]], "isOverall": false, "label": "20.2 Descuentos Siguiente-93", "isController": false}, {"data": [[6.0, 698.0]], "isOverall": false, "label": "20.2 Descuentos Siguiente-93-Aggregated", "isController": false}, {"data": [[10.0, 6741.0]], "isOverall": false, "label": "9.1 Clic en Siguiente 2-14", "isController": false}, {"data": [[10.0, 6741.0]], "isOverall": false, "label": "9.1 Clic en Siguiente 2-14-Aggregated", "isController": false}, {"data": [[6.0, 738.5]], "isOverall": false, "label": "15.5.1 Ingresar y seleccionar nombre participante-61", "isController": false}, {"data": [[6.0, 738.5]], "isOverall": false, "label": "15.5.1 Ingresar y seleccionar nombre participante-61-Aggregated", "isController": false}, {"data": [[6.0, 2332.0]], "isOverall": false, "label": "17.7.1  Ingresar descripcion-80", "isController": false}, {"data": [[6.0, 2332.0]], "isOverall": false, "label": "17.7.1  Ingresar descripcion-80-Aggregated", "isController": false}, {"data": [[6.0, 4905.0]], "isOverall": false, "label": "25.1 Comisiones Siguiente-109", "isController": false}, {"data": [[6.0, 4905.0]], "isOverall": false, "label": "25.1 Comisiones Siguiente-109-Aggregated", "isController": false}, {"data": [[6.0, 1329.5]], "isOverall": false, "label": "17.5.2 Seleccionar id traslado-77", "isController": false}, {"data": [[6.0, 1329.5]], "isOverall": false, "label": "17.5.2 Seleccionar id traslado-77-Aggregated", "isController": false}, {"data": [[6.0, 742.0]], "isOverall": false, "label": "21.4 Seleccionar tipo de franquicia-97", "isController": false}, {"data": [[6.0, 742.0]], "isOverall": false, "label": "21.4 Seleccionar tipo de franquicia-97-Aggregated", "isController": false}, {"data": [[6.0, 4119.5]], "isOverall": false, "label": "18.4.1 Clic en Premium-89", "isController": false}, {"data": [[6.0, 4119.5]], "isOverall": false, "label": "18.4.1 Clic en Premium-89-Aggregated", "isController": false}, {"data": [[6.0, 747.0]], "isOverall": false, "label": "26.2 Impuestos Siguiente-112", "isController": false}, {"data": [[6.0, 747.0]], "isOverall": false, "label": "26.2 Impuestos Siguiente-112-Aggregated", "isController": false}, {"data": [[6.0, 258.0]], "isOverall": false, "label": "14.2 Clic en el icono editar-46", "isController": false}, {"data": [[6.0, 258.0]], "isOverall": false, "label": "14.2 Clic en el icono editar-46-Aggregated", "isController": false}, {"data": [[6.0, 736.0]], "isOverall": false, "label": "17.2 Anadir Objeto de Cobertura-73", "isController": false}, {"data": [[6.0, 736.0]], "isOverall": false, "label": "17.2 Anadir Objeto de Cobertura-73-Aggregated", "isController": false}, {"data": [[6.0, 1037.0]], "isOverall": false, "label": "17.6.1 Seleccionar embalaje y trayecto desde-78", "isController": false}, {"data": [[6.0, 1037.0]], "isOverall": false, "label": "17.6.1 Seleccionar embalaje y trayecto desde-78-Aggregated", "isController": false}, {"data": [[10.0, 8174.0]], "isOverall": false, "label": "2-Login", "isController": true}, {"data": [[10.0, 8174.0]], "isOverall": false, "label": "2-Login-Aggregated", "isController": true}, {"data": [[6.0, 1090.5]], "isOverall": false, "label": "25.2 Comisiones Siguiente-110", "isController": false}, {"data": [[6.0, 1090.5]], "isOverall": false, "label": "25.2 Comisiones Siguiente-110-Aggregated", "isController": false}, {"data": [[5.0, 6617.0], [6.0, 3480.0]], "isOverall": false, "label": "33-Clic Boton Cotizacion Aceptada", "isController": true}, {"data": [[5.5, 5048.5]], "isOverall": false, "label": "33-Clic Boton Cotizacion Aceptada-Aggregated", "isController": true}, {"data": [[10.0, 738.5]], "isOverall": false, "label": "3.1 Clic Menu Operaciones del Sistema-5", "isController": false}, {"data": [[10.0, 738.5]], "isOverall": false, "label": "3.1 Clic Menu Operaciones del Sistema-5-Aggregated", "isController": false}, {"data": [[10.0, 1337.5]], "isOverall": false, "label": "10.3 Clic en Siguiente 3-18", "isController": false}, {"data": [[10.0, 1337.5]], "isOverall": false, "label": "10.3 Clic en Siguiente 3-18-Aggregated", "isController": false}, {"data": [[6.0, 6056.0]], "isOverall": false, "label": "24.1 Documentos por Objeto Siguiente-107", "isController": false}, {"data": [[6.0, 6056.0]], "isOverall": false, "label": "24.1 Documentos por Objeto Siguiente-107-Aggregated", "isController": false}, {"data": [[10.0, 3427.5]], "isOverall": false, "label": "7-Buscar Cedula del Cliente", "isController": true}, {"data": [[10.0, 3427.5]], "isOverall": false, "label": "7-Buscar Cedula del Cliente-Aggregated", "isController": true}, {"data": [[6.0, 900.0]], "isOverall": false, "label": "29.2 Calculo de Prima Clic Boton Guardar-118", "isController": false}, {"data": [[6.0, 900.0]], "isOverall": false, "label": "29.2 Calculo de Prima Clic Boton Guardar-118-Aggregated", "isController": false}, {"data": [[6.0, 661.5]], "isOverall": false, "label": "14.3 Seleccionar numero dia y modo de pago-47", "isController": false}, {"data": [[6.0, 661.5]], "isOverall": false, "label": "14.3 Seleccionar numero dia y modo de pago-47-Aggregated", "isController": false}, {"data": [[6.0, 819.0]], "isOverall": false, "label": "21.3 Seleccionar nombre de cobertura-96", "isController": false}, {"data": [[6.0, 819.0]], "isOverall": false, "label": "21.3 Seleccionar nombre de cobertura-96-Aggregated", "isController": false}, {"data": [[6.0, 654.5]], "isOverall": false, "label": "14.5 Seleccionar numero dia y modo de pago-49", "isController": false}, {"data": [[6.0, 654.5]], "isOverall": false, "label": "14.5 Seleccionar numero dia y modo de pago-49-Aggregated", "isController": false}, {"data": [[6.0, 1011.5]], "isOverall": false, "label": "18.1 Clic en icono de editar-85", "isController": false}, {"data": [[6.0, 1011.5]], "isOverall": false, "label": "18.1 Clic en icono de editar-85-Aggregated", "isController": false}, {"data": [[6.0, 1929.0]], "isOverall": false, "label": "18.3.1 Clic Guardar-87", "isController": false}, {"data": [[6.0, 1929.0]], "isOverall": false, "label": "18.3.1 Clic Guardar-87-Aggregated", "isController": false}, {"data": [[8.0, 1126.5]], "isOverall": false, "label": "11.5.1 Clic en Buscar-26", "isController": false}, {"data": [[8.0, 1126.5]], "isOverall": false, "label": "11.5.1 Clic en Buscar-26-Aggregated", "isController": false}, {"data": [[6.0, 4511.5]], "isOverall": false, "label": "20-Descuentos Siguiente", "isController": true}, {"data": [[6.0, 4511.5]], "isOverall": false, "label": "20-Descuentos Siguiente-Aggregated", "isController": true}, {"data": [[10.0, 217.5]], "isOverall": false, "label": "1.2 Index-2", "isController": false}, {"data": [[10.0, 217.5]], "isOverall": false, "label": "1.2 Index-2-Aggregated", "isController": false}, {"data": [[8.0, 10098.0]], "isOverall": false, "label": "12-Crear Cotizacion Nueva", "isController": true}, {"data": [[8.0, 10098.0]], "isOverall": false, "label": "12-Crear Cotizacion Nueva-Aggregated", "isController": true}, {"data": [[6.0, 3813.5]], "isOverall": false, "label": "20.1 Descuentos Siguiente-92", "isController": false}, {"data": [[6.0, 3813.5]], "isOverall": false, "label": "20.1 Descuentos Siguiente-92-Aggregated", "isController": false}, {"data": [[6.0, 5353.5]], "isOverall": false, "label": "26-Impuestos Siguiente", "isController": true}, {"data": [[6.0, 5353.5]], "isOverall": false, "label": "26-Impuestos Siguiente-Aggregated", "isController": true}, {"data": [[6.0, 9096.5]], "isOverall": false, "label": "23- Documentos por Poliza Siguiente", "isController": true}, {"data": [[6.0, 9096.5]], "isOverall": false, "label": "23- Documentos por Poliza Siguiente-Aggregated", "isController": true}, {"data": [[5.0, 834.0], [6.0, 908.0]], "isOverall": false, "label": "33.2 Clic Boton Cotizacion Aceptada-126", "isController": false}, {"data": [[5.5, 871.0]], "isOverall": false, "label": "33.2 Clic Boton Cotizacion Aceptada-126-Aggregated", "isController": false}, {"data": [[10.0, 840.0]], "isOverall": false, "label": "5.2 Clic MenuCrear Cotizacion -8", "isController": false}, {"data": [[10.0, 840.0]], "isOverall": false, "label": "5.2 Clic MenuCrear Cotizacion -8-Aggregated", "isController": false}, {"data": [[8.0, 2422.0]], "isOverall": false, "label": "11.5 Clic en Buscar", "isController": true}, {"data": [[8.0, 2422.0]], "isOverall": false, "label": "11.5 Clic en Buscar-Aggregated", "isController": true}, {"data": [[6.0, 985.5]], "isOverall": false, "label": "30.2 Clic Menu Cotizacion Relacionada a Historia-121", "isController": false}, {"data": [[6.0, 985.5]], "isOverall": false, "label": "30.2 Clic Menu Cotizacion Relacionada a Historia-121-Aggregated", "isController": false}, {"data": [[6.0, 2567.0]], "isOverall": false, "label": "17.1 Anadir Objeto de Cobertura-72", "isController": false}, {"data": [[6.0, 2567.0]], "isOverall": false, "label": "17.1 Anadir Objeto de Cobertura-72-Aggregated", "isController": false}, {"data": [[6.0, 869.5]], "isOverall": false, "label": "21.2 Seleccionar objeto asegurado-95", "isController": false}, {"data": [[6.0, 869.5]], "isOverall": false, "label": "21.2 Seleccionar objeto asegurado-95-Aggregated", "isController": false}, {"data": [[6.0, 1065.5]], "isOverall": false, "label": "21.7 Seleccionar dimension de franquicia-100", "isController": false}, {"data": [[6.0, 1065.5]], "isOverall": false, "label": "21.7 Seleccionar dimension de franquicia-100-Aggregated", "isController": false}, {"data": [[8.0, 4794.5]], "isOverall": false, "label": "12.6.1 Guardar cotizacion-41", "isController": false}, {"data": [[8.0, 4794.5]], "isOverall": false, "label": "12.6.1 Guardar cotizacion-41-Aggregated", "isController": false}, {"data": [[10.0, 4594.5]], "isOverall": false, "label": "5-Clic MenuCrear Cotizacion", "isController": true}, {"data": [[10.0, 4594.5]], "isOverall": false, "label": "5-Clic MenuCrear Cotizacion-Aggregated", "isController": true}, {"data": [[6.0, 495.0]], "isOverall": false, "label": "15.7 Seleccionar participante estado e idioma", "isController": true}, {"data": [[6.0, 495.0]], "isOverall": false, "label": "15.7 Seleccionar participante estado e idioma-Aggregated", "isController": true}, {"data": [[6.0, 1293.5]], "isOverall": false, "label": "24.2 Documentos por Objeto Siguiente-108", "isController": false}, {"data": [[6.0, 1293.5]], "isOverall": false, "label": "24.2 Documentos por Objeto Siguiente-108-Aggregated", "isController": false}, {"data": [[6.0, 4397.0]], "isOverall": false, "label": "16.1 Cotizacion General Siguiente-70", "isController": false}, {"data": [[6.0, 4397.0]], "isOverall": false, "label": "16.1 Cotizacion General Siguiente-70-Aggregated", "isController": false}, {"data": [[6.0, 4672.5]], "isOverall": false, "label": "28.1 Informacion dle Cliente Siguiente-115", "isController": false}, {"data": [[6.0, 4672.5]], "isOverall": false, "label": "28.1 Informacion dle Cliente Siguiente-115-Aggregated", "isController": false}, {"data": [[6.0, 712.5]], "isOverall": false, "label": "14.7.2 Guardar Facturacion-52", "isController": false}, {"data": [[6.0, 712.5]], "isOverall": false, "label": "14.7.2 Guardar Facturacion-52-Aggregated", "isController": false}, {"data": [[6.0, 24672.5]], "isOverall": false, "label": "30-Calculo de Prima Clic Boton Premium", "isController": true}, {"data": [[6.0, 24672.5]], "isOverall": false, "label": "30-Calculo de Prima Clic Boton Premium-Aggregated", "isController": true}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 738.7833333333333, "minX": 1.59594972E12, "maxY": 62672.416666666664, "series": [{"data": [[1.59594996E12, 13479.0], [1.59594978E12, 48306.833333333336], [1.5959499E12, 33053.78333333333], [1.59594972E12, 18599.25], [1.59594984E12, 62672.416666666664]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.59594996E12, 738.7833333333333], [1.59594978E12, 4926.083333333333], [1.5959499E12, 747.65], [1.59594972E12, 973.8], [1.59594984E12, 2501.75]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59594996E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 103.0, "minX": 1.59594972E12, "maxY": 239991.0, "series": [{"data": [[1.59594984E12, 2500.0]], "isOverall": false, "label": "18.3 Clic Guardar", "isController": true}, {"data": [[1.59594984E12, 571.0]], "isOverall": false, "label": "18.3.2 Clic Guardar-88", "isController": false}, {"data": [[1.59594972E12, 105.0]], "isOverall": false, "label": "2.1 Ingresar usuario y contrase\u00F1a-3-1", "isController": false}, {"data": [[1.59594972E12, 354.5]], "isOverall": false, "label": "2.1 Ingresar usuario y contrase\u00F1a-3-0", "isController": false}, {"data": [[1.59594978E12, 690.0]], "isOverall": false, "label": "15.4.4 Buscar ID Participante de Poliza-60", "isController": false}, {"data": [[1.5959499E12, 5995.5]], "isOverall": false, "label": "25-Comisiones Siguiente", "isController": true}, {"data": [[1.59594972E12, 113.0]], "isOverall": false, "label": "1.2 Index-2-1", "isController": false}, {"data": [[1.59594978E12, 511.0]], "isOverall": false, "label": "12.5 Clic en Ok-40", "isController": false}, {"data": [[1.59594978E12, 485.0]], "isOverall": false, "label": "15.5.4 Ingresar y seleccionar nombre participante-64", "isController": false}, {"data": [[1.5959499E12, 8185.0], [1.59594984E12, 6341.0]], "isOverall": false, "label": "23.1 Documentos por Poliza Siguiente-105", "isController": false}, {"data": [[1.59594978E12, 784.5]], "isOverall": false, "label": "11.4.1 Ingresar nombre de Agente-25", "isController": false}, {"data": [[1.59594978E12, 2934.0]], "isOverall": false, "label": "11.6 Clic en ok", "isController": true}, {"data": [[1.5959499E12, 2955.5]], "isOverall": false, "label": "29-Calculo de Prima Clic Boton Guardar", "isController": true}, {"data": [[1.59594978E12, 468.5]], "isOverall": false, "label": "11.5.3 Clic en Buscar-28", "isController": false}, {"data": [[1.59594978E12, 1083.5]], "isOverall": false, "label": "13.2 Cotizacion Relacionada a Historia Siguiente-44", "isController": false}, {"data": [[1.59594984E12, 5492.5]], "isOverall": false, "label": "22.1 Clic en Siguiente-103", "isController": false}, {"data": [[1.59594978E12, 247.0]], "isOverall": false, "label": "15.4.3 Buscar ID Participante de Poliza-59", "isController": false}, {"data": [[1.5959499E12, 4606.5]], "isOverall": false, "label": "26.1 Impuestos Siguiente-111", "isController": false}, {"data": [[1.59594978E12, 827.0]], "isOverall": false, "label": "11.5.2 Clic en Buscar-27", "isController": false}, {"data": [[1.59594972E12, 103.0]], "isOverall": false, "label": "1.2 Index-2-0", "isController": false}, {"data": [[1.59594984E12, 1130.0]], "isOverall": false, "label": "17.6.2 Seleccionar trayecto hasta-79", "isController": false}, {"data": [[1.59594978E12, 3313.0]], "isOverall": false, "label": "14.7.1 Guardar Facturacion-51", "isController": false}, {"data": [[1.59594984E12, 584.5]], "isOverall": false, "label": "22.2 Clic en Siguiente-104", "isController": false}, {"data": [[1.59594978E12, 6243.5]], "isOverall": false, "label": "10.1 Clic en Siguiente 3-16", "isController": false}, {"data": [[1.59594972E12, 423.5]], "isOverall": false, "label": "6.1 Ingresar Cedula del Cliente-9", "isController": false}, {"data": [[1.59594984E12, 2948.0]], "isOverall": false, "label": "17.8 Cerrar Objeto", "isController": true}, {"data": [[1.59594984E12, 1163.0]], "isOverall": false, "label": "17.3 Anadir Objeto de Cobertura-74", "isController": false}, {"data": [[1.5959499E12, 1833.5]], "isOverall": false, "label": "23.2 Documentos por Poliza Siguiente-106", "isController": false}, {"data": [[1.59594978E12, 1016.0]], "isOverall": false, "label": "11.3.1 Clic en Buscar id de agente-21", "isController": false}, {"data": [[1.5959499E12, 5797.5]], "isOverall": false, "label": "28-Informacion dle Cliente Siguiente", "isController": true}, {"data": [[1.59594978E12, 1030.0]], "isOverall": false, "label": "11.7.3 Clic en guardar-34", "isController": false}, {"data": [[1.59594984E12, 2010.5]], "isOverall": false, "label": "21.8.1 Seleccionar min de franquicia-101", "isController": false}, {"data": [[1.59594978E12, 2159.5]], "isOverall": false, "label": "15.6 Buscar ID Participante de Poliza ok", "isController": true}, {"data": [[1.59594984E12, 584.5]], "isOverall": false, "label": "16.2 Cotizacion General Siguiente-71", "isController": false}, {"data": [[1.59594972E12, 1140.0]], "isOverall": false, "label": "7.2 Seleccionar cliente-11", "isController": false}, {"data": [[1.59594972E12, 1061.0]], "isOverall": false, "label": "1.1 Index-1", "isController": false}, {"data": [[1.59594978E12, 1003.0]], "isOverall": false, "label": "11.7.2 Clic en guardar-33", "isController": false}, {"data": [[1.59594978E12, 5499.5]], "isOverall": false, "label": "11.7 Modificar y guardar agente", "isController": true}, {"data": [[1.59594984E12, 702.5]], "isOverall": false, "label": "21.8.1 Guardar deducible-102", "isController": false}, {"data": [[1.59594996E12, 1699.5]], "isOverall": false, "label": "32.1 Clic Boton Cotizacion a Cliente-123", "isController": false}, {"data": [[1.59594978E12, 975.0]], "isOverall": false, "label": "11.6.1 Clic en ok-29", "isController": false}, {"data": [[1.59594984E12, 8017.0]], "isOverall": false, "label": "18- Editar Objeto de Cobertura", "isController": true}, {"data": [[1.5959499E12, 7349.5]], "isOverall": false, "label": "24-Documentos por Objeto Siguiente", "isController": true}, {"data": [[1.59594996E12, 24672.5]], "isOverall": false, "label": "30.1 Calculo de Prima Clic Boton Premium-119", "isController": false}, {"data": [[1.59594978E12, 855.5]], "isOverall": false, "label": "15.3 Clic Crear Participante de Poliza", "isController": true}, {"data": [[1.59594978E12, 809.5]], "isOverall": false, "label": "15.8.2 Guardar Participante de la Poliza-69", "isController": false}, {"data": [[1.5959499E12, 1125.0]], "isOverall": false, "label": "28.2 Informacion dle Cliente Siguiente-116", "isController": false}, {"data": [[1.59594978E12, 669.5]], "isOverall": false, "label": "14.6 Seleccionar numero dia y modo de pago-50", "isController": false}, {"data": [[1.59594978E12, 605.5]], "isOverall": false, "label": "15.5.3 Ingresar y seleccionar nombre participante-63", "isController": false}, {"data": [[1.59594972E12, 186.5]], "isOverall": false, "label": "4.1 Clic Menu Control de Polizas-6", "isController": false}, {"data": [[1.59594978E12, 1080.5]], "isOverall": false, "label": "10.2 Clic en Siguiente 3-17", "isController": false}, {"data": [[1.59594978E12, 1169.0]], "isOverall": false, "label": "12.6.2 Guardar cotizacion-42", "isController": false}, {"data": [[1.59594978E12, 3466.5]], "isOverall": false, "label": "11.7.1 Seleccionar funcion de agente e ingresar distribucion-32", "isController": false}, {"data": [[1.5959499E12, 6242.0]], "isOverall": false, "label": "27-Clausulas Siguiente", "isController": true}, {"data": [[1.59594978E12, 416.5]], "isOverall": false, "label": "11.3.3 Clic en Buscar id de agente-23", "isController": false}, {"data": [[1.59594978E12, 18165.0]], "isOverall": false, "label": "11-Clic Crear Agente", "isController": true}, {"data": [[1.59594996E12, 3649.5]], "isOverall": false, "label": "33.1 Clic Boton Cotizacion Aceptada-125", "isController": false}, {"data": [[1.59594996E12, 401.0]], "isOverall": false, "label": "34.2 Clic Boton Proceder Cotizacion Aceptada-129", "isController": false}, {"data": [[1.59594978E12, 745.5]], "isOverall": false, "label": "14.1 Clic en el icono editar-45", "isController": false}, {"data": [[1.59594978E12, 3450.0]], "isOverall": false, "label": "15.8 Guardar Participante de la Poliza", "isController": true}, {"data": [[1.59594978E12, 13179.0]], "isOverall": false, "label": "15-Participante de Poliza", "isController": true}, {"data": [[1.59594978E12, 501.0]], "isOverall": false, "label": "12.3 Clic en Boton cotizacion nueva-38", "isController": false}, {"data": [[1.59594978E12, 8661.5]], "isOverall": false, "label": "10-Clic en Siguiente 3", "isController": true}, {"data": [[1.59594978E12, 476.5]], "isOverall": false, "label": "15.3.1 Clic Crear Participante de Poliza-55", "isController": false}, {"data": [[1.59594978E12, 532.5]], "isOverall": false, "label": "15.4.2 Buscar ID Participante de Poliza-58", "isController": false}, {"data": [[1.59594978E12, 502.0]], "isOverall": false, "label": "11.6.3 Clic en ok-31", "isController": false}, {"data": [[1.59594978E12, 4025.5]], "isOverall": false, "label": "14.7 Guardar Facturacion", "isController": true}, {"data": [[1.59594984E12, 4119.5]], "isOverall": false, "label": "18.4 Clic en Premium", "isController": true}, {"data": [[1.59594996E12, 1070.0]], "isOverall": false, "label": "32.2 Clic Boton Cotizacion a Cliente-124", "isController": false}, {"data": [[1.59594978E12, 304.5]], "isOverall": false, "label": "15.2 Clic Carpeta Participante de Poliza-54", "isController": false}, {"data": [[1.5959499E12, 5416.0]], "isOverall": false, "label": "27.1 Clausulas Siguiente-113", "isController": false}, {"data": [[1.59594972E12, 7714.0]], "isOverall": false, "label": "2.2 Presionar aceptar-4", "isController": false}, {"data": [[1.59594978E12, 3311.5]], "isOverall": false, "label": "11.3 Clic en Buscar id de agente", "isController": true}, {"data": [[1.59594984E12, 5355.0]], "isOverall": false, "label": "19.1 Cobertura Siguiente-90", "isController": false}, {"data": [[1.59594984E12, 386.0]], "isOverall": false, "label": "18.2.1 Ingresar valor asegurado-86", "isController": false}, {"data": [[1.59594984E12, 386.0]], "isOverall": false, "label": "18.2 Ingresar valor asegurado", "isController": true}, {"data": [[1.59594996E12, 851.0]], "isOverall": false, "label": "30.3 Clic Menu Cotizacion Relacionada a Historia-122", "isController": false}, {"data": [[1.59594978E12, 5963.5]], "isOverall": false, "label": "12.6-Guardar cotizacion", "isController": true}, {"data": [[1.59594972E12, 186.5]], "isOverall": false, "label": "4-Clic Menu Control de Polizas", "isController": true}, {"data": [[1.59594978E12, 4960.5]], "isOverall": false, "label": "13.1 Cotizacion Relacionada a Historia Siguiente-43", "isController": false}, {"data": [[1.59594984E12, 945.0]], "isOverall": false, "label": "21.6 Seleccionar valor de franquicia-99", "isController": false}, {"data": [[1.59594984E12, 1505.5]], "isOverall": false, "label": "17.8.2 Cerrar Objeto-83", "isController": false}, {"data": [[1.59594984E12, 10231.0]], "isOverall": false, "label": "21-Crear Deducible", "isController": true}, {"data": [[1.59594996E12, 415.5]], "isOverall": false, "label": "34.1 Clic Boton Proceder Cotizacion Aceptada-128", "isController": false}, {"data": [[1.59594972E12, 460.0]], "isOverall": false, "label": "2.1 Ingresar usuario y contrase\u00F1a-3", "isController": false}, {"data": [[1.59594978E12, 1101.5]], "isOverall": false, "label": "11.2 Clic Crear Agente-20", "isController": false}, {"data": [[1.59594984E12, 621.0]], "isOverall": false, "label": "17.7.2  Grabar objeto-81", "isController": false}, {"data": [[1.59594984E12, 2713.0]], "isOverall": false, "label": "21.8 Seleccionar min de franquicia y guardar", "isController": true}, {"data": [[1.59594972E12, 8134.5]], "isOverall": false, "label": "9-Clic en Siguiente 2", "isController": true}, {"data": [[1.59594984E12, 2953.0]], "isOverall": false, "label": "17.7 Ingresar descripcion y grabar objeto", "isController": true}, {"data": [[1.59594996E12, 7665.5]], "isOverall": false, "label": "30.1 Clic Menu Cotizacion Relacionada a Historia-120", "isController": false}, {"data": [[1.59594978E12, 619.0]], "isOverall": false, "label": "12.4 Seleccionar nombre de producto-39", "isController": false}, {"data": [[1.59594978E12, 802.5]], "isOverall": false, "label": "15.6.1 Buscar ID Participante de Poliza ok-65", "isController": false}, {"data": [[1.59594972E12, 2287.5]], "isOverall": false, "label": "7.1 Clic en Buscar-10", "isController": false}, {"data": [[1.59594978E12, 739.0]], "isOverall": false, "label": "15.6.3 Buscar ID Participante de Poliza ok-66", "isController": false}, {"data": [[1.59594978E12, 618.0]], "isOverall": false, "label": "15.6.2 Buscar ID Participante de Poliza ok-66", "isController": false}, {"data": [[1.59594978E12, 675.0]], "isOverall": false, "label": "11.3.4 Clic en Buscar id de agente-24", "isController": false}, {"data": [[1.59594978E12, 1457.0]], "isOverall": false, "label": "11.6.2 Clic en ok-30", "isController": false}, {"data": [[1.5959499E12, 2055.5]], "isOverall": false, "label": "29.1 Calculo de Prima Clic Boton Guardar-117", "isController": false}, {"data": [[1.59594978E12, 882.5]], "isOverall": false, "label": "15.4.1 Buscar ID Participante de Poliza-57", "isController": false}, {"data": [[1.59594984E12, 797.5]], "isOverall": false, "label": "19.2 Cobertura Siguiente-91", "isController": false}, {"data": [[1.59594984E12, 2003.5]], "isOverall": false, "label": "21.1 Clic Crear Deducible-94", "isController": false}, {"data": [[1.59594978E12, 1125.0]], "isOverall": false, "label": "15.5.2 Ingresar y seleccionar nombre participante-62", "isController": false}, {"data": [[1.59594978E12, 7714.0]], "isOverall": false, "label": "14-Editar Facturacion", "isController": true}, {"data": [[1.59594978E12, 2352.0]], "isOverall": false, "label": "15.4 Buscar ID Participante de Poliza", "isController": true}, {"data": [[1.59594978E12, 2640.5]], "isOverall": false, "label": "15.8.1 Guardar Participante de la Poliza-68", "isController": false}, {"data": [[1.59594984E12, 2167.0]], "isOverall": false, "label": "17.6 Seleccionar embalaje y trayecto", "isController": true}, {"data": [[1.59594996E12, 2769.5]], "isOverall": false, "label": "32-Clic Boton Cotizacion a Cliente", "isController": true}, {"data": [[1.59594984E12, 14952.0]], "isOverall": false, "label": "17-Anadir Objeto de Cobertura", "isController": true}, {"data": [[1.59594996E12, 528.0]], "isOverall": false, "label": "33.3 Clic Boton Cotizacion Aceptada-127", "isController": false}, {"data": [[1.5959499E12, 826.0]], "isOverall": false, "label": "27.2 Clausulas Siguiente-114", "isController": false}, {"data": [[1.59594984E12, 116.5]], "isOverall": false, "label": "17.4 Anadir Objeto de Cobertura-75", "isController": false}, {"data": [[1.59594978E12, 699.5]], "isOverall": false, "label": "14.4 Seleccionar numero dia y modo de pago-48", "isController": false}, {"data": [[1.59594984E12, 2301.5]], "isOverall": false, "label": "17.5 Clic en anadir objeto", "isController": true}, {"data": [[1.59594972E12, 8650.5]], "isOverall": false, "label": "8-Clic en Siguiente", "isController": true}, {"data": [[1.59594984E12, 6077.0]], "isOverall": false, "label": "22-Deducible Siguiente", "isController": true}, {"data": [[1.59594996E12, 9502.0]], "isOverall": false, "label": "31-Clic Menu Cotizacion Relacionada a Historia", "isController": true}, {"data": [[1.59594972E12, 7828.5]], "isOverall": false, "label": "8.1 Clic en siguiente-12", "isController": false}, {"data": [[1.59594984E12, 6152.5]], "isOverall": false, "label": "19-Cobertura Siguiente", "isController": true}, {"data": [[1.59594978E12, 1204.0]], "isOverall": false, "label": "11.3.2 Clic en Buscar id de agente-22", "isController": false}, {"data": [[1.59594996E12, 816.5]], "isOverall": false, "label": "34-Clic Boton Proceder Cotizacion Aceptada", "isController": true}, {"data": [[1.59594984E12, 793.5]], "isOverall": false, "label": "17.8.1 Cerrar Objeto-82", "isController": false}, {"data": [[1.59594978E12, 6044.0]], "isOverall": false, "label": "13-Cotizacion Relacionada a Historia Siguiente", "isController": true}, {"data": [[1.59594978E12, 608.5]], "isOverall": false, "label": "15.1 Clic Carpeta Participante de Poliza-53", "isController": false}, {"data": [[1.59594996E12, 239991.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59594972E12, 1393.5]], "isOverall": false, "label": "9.2 Clic en Siguiente 2-15", "isController": false}, {"data": [[1.59594978E12, 1694.5]], "isOverall": false, "label": "12.1 Clic en Boton cotizacion nueva-35", "isController": false}, {"data": [[1.59594978E12, 379.0]], "isOverall": false, "label": "15.3.2 Clic Crear Participante de Poliza-56", "isController": false}, {"data": [[1.59594978E12, 495.0]], "isOverall": false, "label": "15.7.1 Seleccionar participante estado e idioma-67", "isController": false}, {"data": [[1.59594972E12, 423.5]], "isOverall": false, "label": "6-Ingresar Cedula del Cliente", "isController": true}, {"data": [[1.59594984E12, 972.0]], "isOverall": false, "label": "17.5.1 Seleccionar tipo de mercancia-76", "isController": false}, {"data": [[1.59594978E12, 809.0]], "isOverall": false, "label": "12.2 Clic en Boton cotizacion nueva-36", "isController": false}, {"data": [[1.59594984E12, 1073.5]], "isOverall": false, "label": "21.5 Seleccionar el reclamo de franquicia-98", "isController": false}, {"data": [[1.59594972E12, 3754.5]], "isOverall": false, "label": "5.1 Clic MenuCrear Cotizacion-7", "isController": false}, {"data": [[1.59594984E12, 4981.5]], "isOverall": false, "label": "16-Cotizacion General Siguiente", "isController": true}, {"data": [[1.59594972E12, 738.5]], "isOverall": false, "label": "3-Clic Menu Operaciones del Sistema", "isController": true}, {"data": [[1.59594972E12, 1278.5]], "isOverall": false, "label": "1-Index ", "isController": true}, {"data": [[1.59594978E12, 784.5]], "isOverall": false, "label": "11.4 Ingresar nombre de Agente", "isController": true}, {"data": [[1.59594978E12, 2112.0]], "isOverall": false, "label": "11.1 Clic Crear Agente-19", "isController": false}, {"data": [[1.59594972E12, 144.0]], "isOverall": false, "label": "2.2 Presionar aceptar-4-0", "isController": false}, {"data": [[1.59594972E12, 7570.0]], "isOverall": false, "label": "2.2 Presionar aceptar-4-1", "isController": false}, {"data": [[1.59594972E12, 822.0]], "isOverall": false, "label": "8.2 Clic en siguiente-13", "isController": false}, {"data": [[1.59594978E12, 2954.0]], "isOverall": false, "label": "15.5 Ingresar y seleccionar nombre participante", "isController": true}, {"data": [[1.59594984E12, 649.0]], "isOverall": false, "label": "17.8.3 Cerrar Objeto-84", "isController": false}, {"data": [[1.59594984E12, 698.0]], "isOverall": false, "label": "20.2 Descuentos Siguiente-93", "isController": false}, {"data": [[1.59594972E12, 6741.0]], "isOverall": false, "label": "9.1 Clic en Siguiente 2-14", "isController": false}, {"data": [[1.59594978E12, 738.5]], "isOverall": false, "label": "15.5.1 Ingresar y seleccionar nombre participante-61", "isController": false}, {"data": [[1.59594984E12, 2332.0]], "isOverall": false, "label": "17.7.1  Ingresar descripcion-80", "isController": false}, {"data": [[1.5959499E12, 4905.0]], "isOverall": false, "label": "25.1 Comisiones Siguiente-109", "isController": false}, {"data": [[1.59594984E12, 1329.5]], "isOverall": false, "label": "17.5.2 Seleccionar id traslado-77", "isController": false}, {"data": [[1.59594984E12, 742.0]], "isOverall": false, "label": "21.4 Seleccionar tipo de franquicia-97", "isController": false}, {"data": [[1.59594984E12, 4119.5]], "isOverall": false, "label": "18.4.1 Clic en Premium-89", "isController": false}, {"data": [[1.5959499E12, 747.0]], "isOverall": false, "label": "26.2 Impuestos Siguiente-112", "isController": false}, {"data": [[1.59594978E12, 258.0]], "isOverall": false, "label": "14.2 Clic en el icono editar-46", "isController": false}, {"data": [[1.59594984E12, 736.0]], "isOverall": false, "label": "17.2 Anadir Objeto de Cobertura-73", "isController": false}, {"data": [[1.59594984E12, 1037.0]], "isOverall": false, "label": "17.6.1 Seleccionar embalaje y trayecto desde-78", "isController": false}, {"data": [[1.59594972E12, 8174.0]], "isOverall": false, "label": "2-Login", "isController": true}, {"data": [[1.5959499E12, 1090.5]], "isOverall": false, "label": "25.2 Comisiones Siguiente-110", "isController": false}, {"data": [[1.59594996E12, 5048.5]], "isOverall": false, "label": "33-Clic Boton Cotizacion Aceptada", "isController": true}, {"data": [[1.59594972E12, 738.5]], "isOverall": false, "label": "3.1 Clic Menu Operaciones del Sistema-5", "isController": false}, {"data": [[1.59594978E12, 1337.5]], "isOverall": false, "label": "10.3 Clic en Siguiente 3-18", "isController": false}, {"data": [[1.5959499E12, 6056.0]], "isOverall": false, "label": "24.1 Documentos por Objeto Siguiente-107", "isController": false}, {"data": [[1.59594972E12, 3427.5]], "isOverall": false, "label": "7-Buscar Cedula del Cliente", "isController": true}, {"data": [[1.5959499E12, 900.0]], "isOverall": false, "label": "29.2 Calculo de Prima Clic Boton Guardar-118", "isController": false}, {"data": [[1.59594978E12, 661.5]], "isOverall": false, "label": "14.3 Seleccionar numero dia y modo de pago-47", "isController": false}, {"data": [[1.59594984E12, 819.0]], "isOverall": false, "label": "21.3 Seleccionar nombre de cobertura-96", "isController": false}, {"data": [[1.59594978E12, 654.5]], "isOverall": false, "label": "14.5 Seleccionar numero dia y modo de pago-49", "isController": false}, {"data": [[1.59594984E12, 1011.5]], "isOverall": false, "label": "18.1 Clic en icono de editar-85", "isController": false}, {"data": [[1.59594984E12, 1929.0]], "isOverall": false, "label": "18.3.1 Clic Guardar-87", "isController": false}, {"data": [[1.59594978E12, 1126.5]], "isOverall": false, "label": "11.5.1 Clic en Buscar-26", "isController": false}, {"data": [[1.59594984E12, 4511.5]], "isOverall": false, "label": "20-Descuentos Siguiente", "isController": true}, {"data": [[1.59594972E12, 217.5]], "isOverall": false, "label": "1.2 Index-2", "isController": false}, {"data": [[1.59594978E12, 10098.0]], "isOverall": false, "label": "12-Crear Cotizacion Nueva", "isController": true}, {"data": [[1.59594984E12, 3813.5]], "isOverall": false, "label": "20.1 Descuentos Siguiente-92", "isController": false}, {"data": [[1.5959499E12, 5353.5]], "isOverall": false, "label": "26-Impuestos Siguiente", "isController": true}, {"data": [[1.5959499E12, 9096.5]], "isOverall": false, "label": "23- Documentos por Poliza Siguiente", "isController": true}, {"data": [[1.59594996E12, 871.0]], "isOverall": false, "label": "33.2 Clic Boton Cotizacion Aceptada-126", "isController": false}, {"data": [[1.59594972E12, 840.0]], "isOverall": false, "label": "5.2 Clic MenuCrear Cotizacion -8", "isController": false}, {"data": [[1.59594978E12, 2422.0]], "isOverall": false, "label": "11.5 Clic en Buscar", "isController": true}, {"data": [[1.59594996E12, 985.5]], "isOverall": false, "label": "30.2 Clic Menu Cotizacion Relacionada a Historia-121", "isController": false}, {"data": [[1.59594984E12, 2567.0]], "isOverall": false, "label": "17.1 Anadir Objeto de Cobertura-72", "isController": false}, {"data": [[1.59594984E12, 869.5]], "isOverall": false, "label": "21.2 Seleccionar objeto asegurado-95", "isController": false}, {"data": [[1.59594984E12, 1065.5]], "isOverall": false, "label": "21.7 Seleccionar dimension de franquicia-100", "isController": false}, {"data": [[1.59594978E12, 4794.5]], "isOverall": false, "label": "12.6.1 Guardar cotizacion-41", "isController": false}, {"data": [[1.59594972E12, 4594.5]], "isOverall": false, "label": "5-Clic MenuCrear Cotizacion", "isController": true}, {"data": [[1.59594978E12, 495.0]], "isOverall": false, "label": "15.7 Seleccionar participante estado e idioma", "isController": true}, {"data": [[1.5959499E12, 1293.5]], "isOverall": false, "label": "24.2 Documentos por Objeto Siguiente-108", "isController": false}, {"data": [[1.59594984E12, 4397.0]], "isOverall": false, "label": "16.1 Cotizacion General Siguiente-70", "isController": false}, {"data": [[1.5959499E12, 4672.5]], "isOverall": false, "label": "28.1 Informacion dle Cliente Siguiente-115", "isController": false}, {"data": [[1.59594978E12, 712.5]], "isOverall": false, "label": "14.7.2 Guardar Facturacion-52", "isController": false}, {"data": [[1.59594996E12, 24672.5]], "isOverall": false, "label": "30-Calculo de Prima Clic Boton Premium", "isController": true}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59594996E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 103.0, "minX": 1.59594972E12, "maxY": 202384.5, "series": [{"data": [[1.59594984E12, 1985.0]], "isOverall": false, "label": "18.3 Clic Guardar", "isController": true}, {"data": [[1.59594984E12, 566.0]], "isOverall": false, "label": "18.3.2 Clic Guardar-88", "isController": false}, {"data": [[1.59594972E12, 105.0]], "isOverall": false, "label": "2.1 Ingresar usuario y contrase\u00F1a-3-1", "isController": false}, {"data": [[1.59594972E12, 354.5]], "isOverall": false, "label": "2.1 Ingresar usuario y contrase\u00F1a-3-0", "isController": false}, {"data": [[1.59594978E12, 685.5]], "isOverall": false, "label": "15.4.4 Buscar ID Participante de Poliza-60", "isController": false}, {"data": [[1.5959499E12, 5045.0]], "isOverall": false, "label": "25-Comisiones Siguiente", "isController": true}, {"data": [[1.59594972E12, 109.0]], "isOverall": false, "label": "1.2 Index-2-1", "isController": false}, {"data": [[1.59594978E12, 505.5]], "isOverall": false, "label": "12.5 Clic en Ok-40", "isController": false}, {"data": [[1.59594978E12, 468.5]], "isOverall": false, "label": "15.5.4 Ingresar y seleccionar nombre participante-64", "isController": false}, {"data": [[1.5959499E12, 5625.0], [1.59594984E12, 5698.0]], "isOverall": false, "label": "23.1 Documentos por Poliza Siguiente-105", "isController": false}, {"data": [[1.59594978E12, 780.5]], "isOverall": false, "label": "11.4.1 Ingresar nombre de Agente-25", "isController": false}, {"data": [[1.59594978E12, 2918.0]], "isOverall": false, "label": "11.6 Clic en ok", "isController": true}, {"data": [[1.5959499E12, 2519.5]], "isOverall": false, "label": "29-Calculo de Prima Clic Boton Guardar", "isController": true}, {"data": [[1.59594978E12, 452.5]], "isOverall": false, "label": "11.5.3 Clic en Buscar-28", "isController": false}, {"data": [[1.59594978E12, 866.0]], "isOverall": false, "label": "13.2 Cotizacion Relacionada a Historia Siguiente-44", "isController": false}, {"data": [[1.59594984E12, 4584.5]], "isOverall": false, "label": "22.1 Clic en Siguiente-103", "isController": false}, {"data": [[1.59594978E12, 169.5]], "isOverall": false, "label": "15.4.3 Buscar ID Participante de Poliza-59", "isController": false}, {"data": [[1.5959499E12, 4062.5]], "isOverall": false, "label": "26.1 Impuestos Siguiente-111", "isController": false}, {"data": [[1.59594978E12, 727.0]], "isOverall": false, "label": "11.5.2 Clic en Buscar-27", "isController": false}, {"data": [[1.59594972E12, 103.0]], "isOverall": false, "label": "1.2 Index-2-0", "isController": false}, {"data": [[1.59594984E12, 1124.0]], "isOverall": false, "label": "17.6.2 Seleccionar trayecto hasta-79", "isController": false}, {"data": [[1.59594978E12, 2842.5]], "isOverall": false, "label": "14.7.1 Guardar Facturacion-51", "isController": false}, {"data": [[1.59594984E12, 569.0]], "isOverall": false, "label": "22.2 Clic en Siguiente-104", "isController": false}, {"data": [[1.59594978E12, 5054.5]], "isOverall": false, "label": "10.1 Clic en Siguiente 3-16", "isController": false}, {"data": [[1.59594972E12, 415.5]], "isOverall": false, "label": "6.1 Ingresar Cedula del Cliente-9", "isController": false}, {"data": [[1.59594984E12, 2236.0]], "isOverall": false, "label": "17.8 Cerrar Objeto", "isController": true}, {"data": [[1.59594984E12, 550.0]], "isOverall": false, "label": "17.3 Anadir Objeto de Cobertura-74", "isController": false}, {"data": [[1.5959499E12, 734.5]], "isOverall": false, "label": "23.2 Documentos por Poliza Siguiente-106", "isController": false}, {"data": [[1.59594978E12, 995.0]], "isOverall": false, "label": "11.3.1 Clic en Buscar id de agente-21", "isController": false}, {"data": [[1.5959499E12, 5118.0]], "isOverall": false, "label": "28-Informacion dle Cliente Siguiente", "isController": true}, {"data": [[1.59594978E12, 1015.5]], "isOverall": false, "label": "11.7.3 Clic en guardar-34", "isController": false}, {"data": [[1.59594984E12, 1598.5]], "isOverall": false, "label": "21.8.1 Seleccionar min de franquicia-101", "isController": false}, {"data": [[1.59594978E12, 2123.5]], "isOverall": false, "label": "15.6 Buscar ID Participante de Poliza ok", "isController": true}, {"data": [[1.59594984E12, 573.0]], "isOverall": false, "label": "16.2 Cotizacion General Siguiente-71", "isController": false}, {"data": [[1.59594972E12, 939.0]], "isOverall": false, "label": "7.2 Seleccionar cliente-11", "isController": false}, {"data": [[1.59594972E12, 1059.0]], "isOverall": false, "label": "1.1 Index-1", "isController": false}, {"data": [[1.59594978E12, 840.0]], "isOverall": false, "label": "11.7.2 Clic en guardar-33", "isController": false}, {"data": [[1.59594978E12, 4421.5]], "isOverall": false, "label": "11.7 Modificar y guardar agente", "isController": true}, {"data": [[1.59594984E12, 680.5]], "isOverall": false, "label": "21.8.1 Guardar deducible-102", "isController": false}, {"data": [[1.59594996E12, 1511.0]], "isOverall": false, "label": "32.1 Clic Boton Cotizacion a Cliente-123", "isController": false}, {"data": [[1.59594978E12, 967.5]], "isOverall": false, "label": "11.6.1 Clic en ok-29", "isController": false}, {"data": [[1.59594984E12, 6207.5]], "isOverall": false, "label": "18- Editar Objeto de Cobertura", "isController": true}, {"data": [[1.5959499E12, 6253.0]], "isOverall": false, "label": "24-Documentos por Objeto Siguiente", "isController": true}, {"data": [[1.59594996E12, 24503.5]], "isOverall": false, "label": "30.1 Calculo de Prima Clic Boton Premium-119", "isController": false}, {"data": [[1.59594978E12, 769.0]], "isOverall": false, "label": "15.3 Clic Crear Participante de Poliza", "isController": true}, {"data": [[1.59594978E12, 639.5]], "isOverall": false, "label": "15.8.2 Guardar Participante de la Poliza-69", "isController": false}, {"data": [[1.5959499E12, 880.5]], "isOverall": false, "label": "28.2 Informacion dle Cliente Siguiente-116", "isController": false}, {"data": [[1.59594978E12, 656.5]], "isOverall": false, "label": "14.6 Seleccionar numero dia y modo de pago-50", "isController": false}, {"data": [[1.59594978E12, 511.0]], "isOverall": false, "label": "15.5.3 Ingresar y seleccionar nombre participante-63", "isController": false}, {"data": [[1.59594972E12, 178.0]], "isOverall": false, "label": "4.1 Clic Menu Control de Polizas-6", "isController": false}, {"data": [[1.59594978E12, 923.0]], "isOverall": false, "label": "10.2 Clic en Siguiente 3-17", "isController": false}, {"data": [[1.59594978E12, 794.5]], "isOverall": false, "label": "12.6.2 Guardar cotizacion-42", "isController": false}, {"data": [[1.59594978E12, 2566.0]], "isOverall": false, "label": "11.7.1 Seleccionar funcion de agente e ingresar distribucion-32", "isController": false}, {"data": [[1.5959499E12, 5313.0]], "isOverall": false, "label": "27-Clausulas Siguiente", "isController": true}, {"data": [[1.59594978E12, 399.5]], "isOverall": false, "label": "11.3.3 Clic en Buscar id de agente-23", "isController": false}, {"data": [[1.59594978E12, 16120.0]], "isOverall": false, "label": "11-Clic Crear Agente", "isController": true}, {"data": [[1.59594996E12, 3585.5]], "isOverall": false, "label": "33.1 Clic Boton Cotizacion Aceptada-125", "isController": false}, {"data": [[1.59594996E12, 393.0]], "isOverall": false, "label": "34.2 Clic Boton Proceder Cotizacion Aceptada-129", "isController": false}, {"data": [[1.59594978E12, 742.5]], "isOverall": false, "label": "14.1 Clic en el icono editar-45", "isController": false}, {"data": [[1.59594978E12, 2918.5]], "isOverall": false, "label": "15.8 Guardar Participante de la Poliza", "isController": true}, {"data": [[1.59594978E12, 11858.0]], "isOverall": false, "label": "15-Participante de Poliza", "isController": true}, {"data": [[1.59594978E12, 492.0]], "isOverall": false, "label": "12.3 Clic en Boton cotizacion nueva-38", "isController": false}, {"data": [[1.59594978E12, 7296.0]], "isOverall": false, "label": "10-Clic en Siguiente 3", "isController": true}, {"data": [[1.59594978E12, 475.5]], "isOverall": false, "label": "15.3.1 Clic Crear Participante de Poliza-55", "isController": false}, {"data": [[1.59594978E12, 375.0]], "isOverall": false, "label": "15.4.2 Buscar ID Participante de Poliza-58", "isController": false}, {"data": [[1.59594978E12, 499.5]], "isOverall": false, "label": "11.6.3 Clic en ok-31", "isController": false}, {"data": [[1.59594978E12, 3456.5]], "isOverall": false, "label": "14.7 Guardar Facturacion", "isController": true}, {"data": [[1.59594984E12, 3357.0]], "isOverall": false, "label": "18.4 Clic en Premium", "isController": true}, {"data": [[1.59594996E12, 754.0]], "isOverall": false, "label": "32.2 Clic Boton Cotizacion a Cliente-124", "isController": false}, {"data": [[1.59594978E12, 196.0]], "isOverall": false, "label": "15.2 Clic Carpeta Participante de Poliza-54", "isController": false}, {"data": [[1.5959499E12, 4635.0]], "isOverall": false, "label": "27.1 Clausulas Siguiente-113", "isController": false}, {"data": [[1.59594972E12, 144.0]], "isOverall": false, "label": "2.2 Presionar aceptar-4", "isController": false}, {"data": [[1.59594978E12, 3018.0]], "isOverall": false, "label": "11.3 Clic en Buscar id de agente", "isController": true}, {"data": [[1.59594984E12, 4518.0]], "isOverall": false, "label": "19.1 Cobertura Siguiente-90", "isController": false}, {"data": [[1.59594984E12, 379.0]], "isOverall": false, "label": "18.2.1 Ingresar valor asegurado-86", "isController": false}, {"data": [[1.59594984E12, 379.0]], "isOverall": false, "label": "18.2 Ingresar valor asegurado", "isController": true}, {"data": [[1.59594996E12, 750.5]], "isOverall": false, "label": "30.3 Clic Menu Cotizacion Relacionada a Historia-122", "isController": false}, {"data": [[1.59594978E12, 5066.5]], "isOverall": false, "label": "12.6-Guardar cotizacion", "isController": true}, {"data": [[1.59594972E12, 178.0]], "isOverall": false, "label": "4-Clic Menu Control de Polizas", "isController": true}, {"data": [[1.59594978E12, 4382.5]], "isOverall": false, "label": "13.1 Cotizacion Relacionada a Historia Siguiente-43", "isController": false}, {"data": [[1.59594984E12, 939.0]], "isOverall": false, "label": "21.6 Seleccionar valor de franquicia-99", "isController": false}, {"data": [[1.59594984E12, 808.0]], "isOverall": false, "label": "17.8.2 Cerrar Objeto-83", "isController": false}, {"data": [[1.59594984E12, 9557.0]], "isOverall": false, "label": "21-Crear Deducible", "isController": true}, {"data": [[1.59594996E12, 404.0]], "isOverall": false, "label": "34.1 Clic Boton Proceder Cotizacion Aceptada-128", "isController": false}, {"data": [[1.59594972E12, 354.5]], "isOverall": false, "label": "2.1 Ingresar usuario y contrase\u00F1a-3", "isController": false}, {"data": [[1.59594978E12, 789.5]], "isOverall": false, "label": "11.2 Clic Crear Agente-20", "isController": false}, {"data": [[1.59594984E12, 600.0]], "isOverall": false, "label": "17.7.2  Grabar objeto-81", "isController": false}, {"data": [[1.59594984E12, 2279.0]], "isOverall": false, "label": "21.8 Seleccionar min de franquicia y guardar", "isController": true}, {"data": [[1.59594972E12, 6337.5]], "isOverall": false, "label": "9-Clic en Siguiente 2", "isController": true}, {"data": [[1.59594984E12, 2684.0]], "isOverall": false, "label": "17.7 Ingresar descripcion y grabar objeto", "isController": true}, {"data": [[1.59594996E12, 6903.0]], "isOverall": false, "label": "30.1 Clic Menu Cotizacion Relacionada a Historia-120", "isController": false}, {"data": [[1.59594978E12, 617.0]], "isOverall": false, "label": "12.4 Seleccionar nombre de producto-39", "isController": false}, {"data": [[1.59594978E12, 792.0]], "isOverall": false, "label": "15.6.1 Buscar ID Participante de Poliza ok-65", "isController": false}, {"data": [[1.59594972E12, 2269.5]], "isOverall": false, "label": "7.1 Clic en Buscar-10", "isController": false}, {"data": [[1.59594978E12, 735.5]], "isOverall": false, "label": "15.6.3 Buscar ID Participante de Poliza ok-66", "isController": false}, {"data": [[1.59594978E12, 596.0]], "isOverall": false, "label": "15.6.2 Buscar ID Participante de Poliza ok-66", "isController": false}, {"data": [[1.59594978E12, 669.0]], "isOverall": false, "label": "11.3.4 Clic en Buscar id de agente-24", "isController": false}, {"data": [[1.59594978E12, 1451.0]], "isOverall": false, "label": "11.6.2 Clic en ok-30", "isController": false}, {"data": [[1.5959499E12, 1711.0]], "isOverall": false, "label": "29.1 Calculo de Prima Clic Boton Guardar-117", "isController": false}, {"data": [[1.59594978E12, 878.5]], "isOverall": false, "label": "15.4.1 Buscar ID Participante de Poliza-57", "isController": false}, {"data": [[1.59594984E12, 786.0]], "isOverall": false, "label": "19.2 Cobertura Siguiente-91", "isController": false}, {"data": [[1.59594984E12, 1870.0]], "isOverall": false, "label": "21.1 Clic Crear Deducible-94", "isController": false}, {"data": [[1.59594978E12, 1116.0]], "isOverall": false, "label": "15.5.2 Ingresar y seleccionar nombre participante-62", "isController": false}, {"data": [[1.59594978E12, 6807.5]], "isOverall": false, "label": "14-Editar Facturacion", "isController": true}, {"data": [[1.59594978E12, 2108.5]], "isOverall": false, "label": "15.4 Buscar ID Participante de Poliza", "isController": true}, {"data": [[1.59594978E12, 2279.0]], "isOverall": false, "label": "15.8.1 Guardar Participante de la Poliza-68", "isController": false}, {"data": [[1.59594984E12, 2154.5]], "isOverall": false, "label": "17.6 Seleccionar embalaje y trayecto", "isController": true}, {"data": [[1.59594996E12, 2265.0]], "isOverall": false, "label": "32-Clic Boton Cotizacion a Cliente", "isController": true}, {"data": [[1.59594984E12, 12984.5]], "isOverall": false, "label": "17-Anadir Objeto de Cobertura", "isController": true}, {"data": [[1.59594996E12, 518.5]], "isOverall": false, "label": "33.3 Clic Boton Cotizacion Aceptada-127", "isController": false}, {"data": [[1.5959499E12, 678.0]], "isOverall": false, "label": "27.2 Clausulas Siguiente-114", "isController": false}, {"data": [[1.59594984E12, 114.0]], "isOverall": false, "label": "17.4 Anadir Objeto de Cobertura-75", "isController": false}, {"data": [[1.59594978E12, 530.5]], "isOverall": false, "label": "14.4 Seleccionar numero dia y modo de pago-48", "isController": false}, {"data": [[1.59594984E12, 2286.0]], "isOverall": false, "label": "17.5 Clic en anadir objeto", "isController": true}, {"data": [[1.59594972E12, 7059.5]], "isOverall": false, "label": "8-Clic en Siguiente", "isController": true}, {"data": [[1.59594984E12, 5153.5]], "isOverall": false, "label": "22-Deducible Siguiente", "isController": true}, {"data": [[1.59594996E12, 8342.0]], "isOverall": false, "label": "31-Clic Menu Cotizacion Relacionada a Historia", "isController": true}, {"data": [[1.59594972E12, 6330.5]], "isOverall": false, "label": "8.1 Clic en siguiente-12", "isController": false}, {"data": [[1.59594984E12, 5304.0]], "isOverall": false, "label": "19-Cobertura Siguiente", "isController": true}, {"data": [[1.59594978E12, 954.5]], "isOverall": false, "label": "11.3.2 Clic en Buscar id de agente-22", "isController": false}, {"data": [[1.59594996E12, 797.0]], "isOverall": false, "label": "34-Clic Boton Proceder Cotizacion Aceptada", "isController": true}, {"data": [[1.59594984E12, 783.5]], "isOverall": false, "label": "17.8.1 Cerrar Objeto-82", "isController": false}, {"data": [[1.59594978E12, 5248.5]], "isOverall": false, "label": "13-Cotizacion Relacionada a Historia Siguiente", "isController": true}, {"data": [[1.59594978E12, 427.0]], "isOverall": false, "label": "15.1 Clic Carpeta Participante de Poliza-53", "isController": false}, {"data": [[1.59594996E12, 202384.5]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59594972E12, 1308.0]], "isOverall": false, "label": "9.2 Clic en Siguiente 2-15", "isController": false}, {"data": [[1.59594978E12, 1690.5]], "isOverall": false, "label": "12.1 Clic en Boton cotizacion nueva-35", "isController": false}, {"data": [[1.59594978E12, 293.5]], "isOverall": false, "label": "15.3.2 Clic Crear Participante de Poliza-56", "isController": false}, {"data": [[1.59594978E12, 489.5]], "isOverall": false, "label": "15.7.1 Seleccionar participante estado e idioma-67", "isController": false}, {"data": [[1.59594972E12, 415.5]], "isOverall": false, "label": "6-Ingresar Cedula del Cliente", "isController": true}, {"data": [[1.59594984E12, 963.5]], "isOverall": false, "label": "17.5.1 Seleccionar tipo de mercancia-76", "isController": false}, {"data": [[1.59594978E12, 706.5]], "isOverall": false, "label": "12.2 Clic en Boton cotizacion nueva-36", "isController": false}, {"data": [[1.59594984E12, 1068.0]], "isOverall": false, "label": "21.5 Seleccionar el reclamo de franquicia-98", "isController": false}, {"data": [[1.59594972E12, 1820.0]], "isOverall": false, "label": "5.1 Clic MenuCrear Cotizacion-7", "isController": false}, {"data": [[1.59594984E12, 4573.0]], "isOverall": false, "label": "16-Cotizacion General Siguiente", "isController": true}, {"data": [[1.59594972E12, 641.0]], "isOverall": false, "label": "3-Clic Menu Operaciones del Sistema", "isController": true}, {"data": [[1.59594972E12, 1162.0]], "isOverall": false, "label": "1-Index ", "isController": true}, {"data": [[1.59594978E12, 780.5]], "isOverall": false, "label": "11.4 Ingresar nombre de Agente", "isController": true}, {"data": [[1.59594978E12, 2103.5]], "isOverall": false, "label": "11.1 Clic Crear Agente-19", "isController": false}, {"data": [[1.59594972E12, 144.0]], "isOverall": false, "label": "2.2 Presionar aceptar-4-0", "isController": false}, {"data": [[1.59594972E12, 7372.0]], "isOverall": false, "label": "2.2 Presionar aceptar-4-1", "isController": false}, {"data": [[1.59594972E12, 729.0]], "isOverall": false, "label": "8.2 Clic en siguiente-13", "isController": false}, {"data": [[1.59594978E12, 2826.0]], "isOverall": false, "label": "15.5 Ingresar y seleccionar nombre participante", "isController": true}, {"data": [[1.59594984E12, 644.5]], "isOverall": false, "label": "17.8.3 Cerrar Objeto-84", "isController": false}, {"data": [[1.59594984E12, 689.5]], "isOverall": false, "label": "20.2 Descuentos Siguiente-93", "isController": false}, {"data": [[1.59594972E12, 5029.5]], "isOverall": false, "label": "9.1 Clic en Siguiente 2-14", "isController": false}, {"data": [[1.59594978E12, 730.5]], "isOverall": false, "label": "15.5.1 Ingresar y seleccionar nombre participante-61", "isController": false}, {"data": [[1.59594984E12, 2084.0]], "isOverall": false, "label": "17.7.1  Ingresar descripcion-80", "isController": false}, {"data": [[1.5959499E12, 4261.0]], "isOverall": false, "label": "25.1 Comisiones Siguiente-109", "isController": false}, {"data": [[1.59594984E12, 1322.5]], "isOverall": false, "label": "17.5.2 Seleccionar id traslado-77", "isController": false}, {"data": [[1.59594984E12, 731.0]], "isOverall": false, "label": "21.4 Seleccionar tipo de franquicia-97", "isController": false}, {"data": [[1.59594984E12, 3357.0]], "isOverall": false, "label": "18.4.1 Clic en Premium-89", "isController": false}, {"data": [[1.5959499E12, 594.5]], "isOverall": false, "label": "26.2 Impuestos Siguiente-112", "isController": false}, {"data": [[1.59594978E12, 139.5]], "isOverall": false, "label": "14.2 Clic en el icono editar-46", "isController": false}, {"data": [[1.59594984E12, 718.0]], "isOverall": false, "label": "17.2 Anadir Objeto de Cobertura-73", "isController": false}, {"data": [[1.59594984E12, 1030.5]], "isOverall": false, "label": "17.6.1 Seleccionar embalaje y trayecto desde-78", "isController": false}, {"data": [[1.59594972E12, 498.5]], "isOverall": false, "label": "2-Login", "isController": true}, {"data": [[1.5959499E12, 784.0]], "isOverall": false, "label": "25.2 Comisiones Siguiente-110", "isController": false}, {"data": [[1.59594996E12, 4816.0]], "isOverall": false, "label": "33-Clic Boton Cotizacion Aceptada", "isController": true}, {"data": [[1.59594972E12, 641.0]], "isOverall": false, "label": "3.1 Clic Menu Operaciones del Sistema-5", "isController": false}, {"data": [[1.59594978E12, 1318.5]], "isOverall": false, "label": "10.3 Clic en Siguiente 3-18", "isController": false}, {"data": [[1.5959499E12, 5520.5]], "isOverall": false, "label": "24.1 Documentos por Objeto Siguiente-107", "isController": false}, {"data": [[1.59594972E12, 3208.5]], "isOverall": false, "label": "7-Buscar Cedula del Cliente", "isController": true}, {"data": [[1.5959499E12, 808.5]], "isOverall": false, "label": "29.2 Calculo de Prima Clic Boton Guardar-118", "isController": false}, {"data": [[1.59594978E12, 639.0]], "isOverall": false, "label": "14.3 Seleccionar numero dia y modo de pago-47", "isController": false}, {"data": [[1.59594984E12, 819.0]], "isOverall": false, "label": "21.3 Seleccionar nombre de cobertura-96", "isController": false}, {"data": [[1.59594978E12, 643.0]], "isOverall": false, "label": "14.5 Seleccionar numero dia y modo de pago-49", "isController": false}, {"data": [[1.59594984E12, 486.5]], "isOverall": false, "label": "18.1 Clic en icono de editar-85", "isController": false}, {"data": [[1.59594984E12, 1419.0]], "isOverall": false, "label": "18.3.1 Clic Guardar-87", "isController": false}, {"data": [[1.59594978E12, 909.5]], "isOverall": false, "label": "11.5.1 Clic en Buscar-26", "isController": false}, {"data": [[1.59594984E12, 4149.5]], "isOverall": false, "label": "20-Descuentos Siguiente", "isController": true}, {"data": [[1.59594972E12, 103.0]], "isOverall": false, "label": "1.2 Index-2", "isController": false}, {"data": [[1.59594978E12, 9078.0]], "isOverall": false, "label": "12-Crear Cotizacion Nueva", "isController": true}, {"data": [[1.59594984E12, 3460.0]], "isOverall": false, "label": "20.1 Descuentos Siguiente-92", "isController": false}, {"data": [[1.5959499E12, 4657.0]], "isOverall": false, "label": "26-Impuestos Siguiente", "isController": true}, {"data": [[1.5959499E12, 6396.0]], "isOverall": false, "label": "23- Documentos por Poliza Siguiente", "isController": true}, {"data": [[1.59594996E12, 712.0]], "isOverall": false, "label": "33.2 Clic Boton Cotizacion Aceptada-126", "isController": false}, {"data": [[1.59594972E12, 702.0]], "isOverall": false, "label": "5.2 Clic MenuCrear Cotizacion -8", "isController": false}, {"data": [[1.59594978E12, 2089.0]], "isOverall": false, "label": "11.5 Clic en Buscar", "isController": true}, {"data": [[1.59594996E12, 688.5]], "isOverall": false, "label": "30.2 Clic Menu Cotizacion Relacionada a Historia-121", "isController": false}, {"data": [[1.59594984E12, 2242.0]], "isOverall": false, "label": "17.1 Anadir Objeto de Cobertura-72", "isController": false}, {"data": [[1.59594984E12, 869.5]], "isOverall": false, "label": "21.2 Seleccionar objeto asegurado-95", "isController": false}, {"data": [[1.59594984E12, 981.5]], "isOverall": false, "label": "21.7 Seleccionar dimension de franquicia-100", "isController": false}, {"data": [[1.59594978E12, 4272.0]], "isOverall": false, "label": "12.6.1 Guardar cotizacion-41", "isController": false}, {"data": [[1.59594972E12, 2522.0]], "isOverall": false, "label": "5-Clic MenuCrear Cotizacion", "isController": true}, {"data": [[1.59594978E12, 489.5]], "isOverall": false, "label": "15.7 Seleccionar participante estado e idioma", "isController": true}, {"data": [[1.5959499E12, 732.5]], "isOverall": false, "label": "24.2 Documentos por Objeto Siguiente-108", "isController": false}, {"data": [[1.59594984E12, 4000.0]], "isOverall": false, "label": "16.1 Cotizacion General Siguiente-70", "isController": false}, {"data": [[1.5959499E12, 4237.5]], "isOverall": false, "label": "28.1 Informacion dle Cliente Siguiente-115", "isController": false}, {"data": [[1.59594978E12, 614.0]], "isOverall": false, "label": "14.7.2 Guardar Facturacion-52", "isController": false}, {"data": [[1.59594996E12, 24503.5]], "isOverall": false, "label": "30-Calculo de Prima Clic Boton Premium", "isController": true}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59594996E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 102.0, "minX": 1.59594972E12, "maxY": 26397.0, "series": [{"data": [[1.59594996E12, 26397.0], [1.59594978E12, 6728.0], [1.5959499E12, 8185.0], [1.59594972E12, 7977.0], [1.59594984E12, 6341.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.59594996E12, 293.0], [1.59594978E12, 144.0], [1.5959499E12, 706.0], [1.59594972E12, 102.0], [1.59594984E12, 114.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.59594996E12, 18399.99999999999], [1.59594978E12, 2776.200000000004], [1.5959499E12, 6052.599999999999], [1.59594972E12, 7693.200000000001], [1.59594984E12, 4326.599999999999]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.59594996E12, 26397.0], [1.59594978E12, 6640.789999999996], [1.5959499E12, 8185.0], [1.59594972E12, 7977.0], [1.59594984E12, 6341.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.59594996E12, 25879.649999999994], [1.59594978E12, 4567.449999999999], [1.5959499E12, 7420.999999999996], [1.59594972E12, 7851.15], [1.59594984E12, 5480.5999999999985]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59594996E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 176.0, "minX": 1.0, "maxY": 1523.0, "series": [{"data": [[4.0, 603.5], [1.0, 1523.0], [2.0, 1080.5], [5.0, 683.5], [11.0, 176.0], [3.0, 764.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 11.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 168.0, "minX": 1.0, "maxY": 1375.5, "series": [{"data": [[4.0, 524.0], [1.0, 1375.5], [2.0, 962.5], [5.0, 526.5], [11.0, 168.0], [3.0, 676.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 11.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.3333333333333333, "minX": 1.59594972E12, "maxY": 1.8, "series": [{"data": [[1.59594996E12, 0.3333333333333333], [1.59594978E12, 1.8], [1.5959499E12, 0.45], [1.59594972E12, 0.7333333333333333], [1.59594984E12, 1.1833333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59594996E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.1, "minX": 1.59594972E12, "maxY": 1.8, "series": [{"data": [[1.59594996E12, 0.36666666666666664], [1.59594978E12, 1.8], [1.5959499E12, 0.45], [1.59594972E12, 0.6], [1.59594984E12, 1.1833333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.59594972E12, 0.1]], "isOverall": false, "label": "302", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59594996E12, "title": "Codes Per Second"}},
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
        },
