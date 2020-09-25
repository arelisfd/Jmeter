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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 3.0, "series": [{"data": [[2400.0, 1.0], [2600.0, 1.0], [2700.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar", "isController": true}, {"data": [[4600.0, 1.0], [4700.0, 1.0], [5500.0, 1.0]], "isOverall": false, "label": "19 - Grabar Persona", "isController": true}, {"data": [[2100.0, 1.0], [1500.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2", "isController": false}, {"data": [[300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1", "isController": false}, {"data": [[400.0, 1.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0", "isController": false}, {"data": [[2400.0, 1.0], [2900.0, 1.0], [3200.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[2300.0, 1.0], [1800.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[2800.0, 2.0], [2700.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[2300.0, 1.0], [2700.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[4400.0, 2.0], [4800.0, 1.0]], "isOverall": false, "label": "13 - Relacion Crear", "isController": true}, {"data": [[2900.0, 1.0], [3000.0, 1.0], [3300.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[1100.0, 1.0], [2500.0, 1.0], [1400.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160", "isController": false}, {"data": [[5200.0, 1.0], [6100.0, 1.0], [6000.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[4500.0, 1.0], [5400.0, 1.0], [6100.0, 1.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[1100.0, 2.0], [700.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20", "isController": false}, {"data": [[1100.0, 1.0], [1300.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21", "isController": false}, {"data": [[1300.0, 1.0], [1400.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22", "isController": false}, {"data": [[2200.0, 1.0], [2300.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23", "isController": false}, {"data": [[4600.0, 1.0], [5000.0, 2.0]], "isOverall": false, "label": "6 - Nuevo Cliente", "isController": true}, {"data": [[1900.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24", "isController": false}, {"data": [[1500.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25", "isController": false}, {"data": [[1400.0, 1.0], [1800.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26", "isController": false}, {"data": [[1400.0, 1.0], [800.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27", "isController": false}, {"data": [[1100.0, 1.0], [800.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28", "isController": false}, {"data": [[1400.0, 1.0], [1700.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar", "isController": true}, {"data": [[600.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29", "isController": false}, {"data": [[800.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "9 - Domicilio Crear-43", "isController": false}, {"data": [[1200.0, 1.0], [1500.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-76", "isController": false}, {"data": [[1300.0, 1.0], [1500.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-75", "isController": false}, {"data": [[2600.0, 2.0], [2700.0, 1.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "2 - Login-7-1", "isController": false}, {"data": [[300.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "2 - Login-7-0", "isController": false}, {"data": [[400.0, 1.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1", "isController": false}, {"data": [[2300.0, 1.0], [2400.0, 1.0], [3000.0, 1.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar", "isController": true}, {"data": [[400.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0", "isController": false}, {"data": [[700.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38", "isController": false}, {"data": [[11400.0, 1.0], [12000.0, 1.0], [12300.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37", "isController": false}, {"data": [[34700.0, 1.0], [2200.0, 1.0], [2300.0, 3.0], [35600.0, 1.0], [35000.0, 1.0], [2400.0, 1.0], [2500.0, 1.0], [2600.0, 2.0], [2800.0, 1.0], [3000.0, 1.0], [800.0, 1.0], [3200.0, 1.0], [900.0, 2.0], [1000.0, 3.0], [1100.0, 3.0], [1300.0, 2.0], [1400.0, 2.0], [1500.0, 2.0], [1600.0, 2.0], [1700.0, 2.0], [1900.0, 3.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[8300.0, 1.0], [8700.0, 1.0], [5800.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[400.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78", "isController": false}, {"data": [[700.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "3 - Operaciones del Sistema", "isController": true}, {"data": [[4300.0, 1.0], [700.0, 1.0], [400.0, 2.0], [3900.0, 2.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente", "isController": true}, {"data": [[1200.0, 1.0], [1300.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77", "isController": false}, {"data": [[1500.0, 1.0], [1600.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19", "isController": false}, {"data": [[1200.0, 1.0], [800.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-63", "isController": false}, {"data": [[1200.0, 1.0], [1400.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-62", "isController": false}, {"data": [[600.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-61", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-60", "isController": false}, {"data": [[1400.0, 1.0], [1500.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "11 - Contactos Crear-81", "isController": false}, {"data": [[700.0, 1.0], [1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[1600.0, 1.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[600.0, 1.0], [800.0, 2.0]], "isOverall": false, "label": "11 - Contactos Crear-80", "isController": false}, {"data": [[700.0, 3.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[800.0, 3.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39", "isController": false}, {"data": [[1700.0, 1.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[1200.0, 1.0], [1700.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -90", "isController": false}, {"data": [[2400.0, 1.0], [1600.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -91", "isController": false}, {"data": [[1100.0, 1.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -92", "isController": false}, {"data": [[1300.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "14 - Formulario Relacion -93", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [1400.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -94", "isController": false}, {"data": [[1100.0, 1.0], [1600.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -95", "isController": false}, {"data": [[1100.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "20 - Cerrar  Persona-175", "isController": false}, {"data": [[1100.0, 2.0], [800.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -96", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 2.0]], "isOverall": false, "label": "20 - Cerrar  Persona-176", "isController": false}, {"data": [[1500.0, 1.0], [1900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -97", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "4 - Mod de Personas", "isController": true}, {"data": [[1400.0, 1.0], [1500.0, 2.0]], "isOverall": false, "label": "14 - Formulario Relacion -98", "isController": false}, {"data": [[700.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40", "isController": false}, {"data": [[1200.0, 1.0], [1500.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -99", "isController": false}, {"data": [[700.0, 1.0], [800.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-59", "isController": false}, {"data": [[200.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "1 - Index-1", "isController": false}, {"data": [[600.0, 2.0], [1400.0, 1.0]], "isOverall": false, "label": "1 - Index", "isController": true}, {"data": [[600.0, 1.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-58", "isController": false}, {"data": [[700.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "20 - Cerrar  Persona-177", "isController": false}, {"data": [[217300.0, 1.0], [218700.0, 1.0], [221500.0, 1.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[300.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-57", "isController": false}, {"data": [[600.0, 1.0], [400.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "20 - Cerrar  Persona-178", "isController": false}, {"data": [[600.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-56", "isController": false}, {"data": [[900.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-55", "isController": false}, {"data": [[700.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-54", "isController": false}, {"data": [[1200.0, 1.0], [600.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-53", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-74", "isController": false}, {"data": [[1400.0, 2.0], [1500.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-73", "isController": false}, {"data": [[2300.0, 1.0], [3000.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-72", "isController": false}, {"data": [[1800.0, 1.0], [1900.0, 2.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[700.0, 1.0], [800.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-71", "isController": false}, {"data": [[2000.0, 3.0]], "isOverall": false, "label": "10 - Formulario Domicilio-70", "isController": false}, {"data": [[65900.0, 1.0], [68000.0, 1.0], [36100.0, 1.0], [36400.0, 1.0], [70000.0, 1.0], [9500.0, 1.0], [10000.0, 1.0], [40400.0, 1.0], [10600.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales", "isController": true}, {"data": [[200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183", "isController": false}, {"data": [[2600.0, 1.0], [5400.0, 1.0], [6000.0, 1.0], [6100.0, 1.0], [24400.0, 1.0], [24300.0, 1.0], [3100.0, 1.0], [26400.0, 1.0], [3200.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio", "isController": true}, {"data": [[800.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185", "isController": false}, {"data": [[2700.0, 1.0], [2900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[12100.0, 1.0], [12400.0, 1.0], [13100.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar", "isController": true}, {"data": [[200.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "1 - Index-1-1", "isController": false}, {"data": [[700.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30", "isController": false}, {"data": [[1300.0, 1.0], [1400.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "11 - Contactos Crear-79", "isController": false}, {"data": [[1100.0, 2.0], [900.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31", "isController": false}, {"data": [[700.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33", "isController": false}, {"data": [[1100.0, 1.0], [2300.0, 1.0], [2500.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34", "isController": false}, {"data": [[2300.0, 1.0], [1100.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35", "isController": false}, {"data": [[1500.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182", "isController": false}, {"data": [[2300.0, 1.0], [2900.0, 1.0], [3100.0, 1.0]], "isOverall": false, "label": "20 - Cerrar  Persona", "isController": true}, {"data": [[1600.0, 1.0], [1900.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-69", "isController": false}, {"data": [[1100.0, 1.0], [1700.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-68", "isController": false}, {"data": [[10600.0, 1.0], [10700.0, 1.0], [11500.0, 1.0], [23000.0, 1.0], [23300.0, 1.0], [23900.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion ", "isController": true}, {"data": [[600.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "5 - Clientes-14", "isController": false}, {"data": [[300.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-67", "isController": false}, {"data": [[1200.0, 1.0], [1300.0, 2.0]], "isOverall": false, "label": "5 - Clientes-13", "isController": false}, {"data": [[1100.0, 2.0], [1800.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-66", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-65", "isController": false}, {"data": [[300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "1 - Index-1-0", "isController": false}, {"data": [[400.0, 1.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-64", "isController": false}, {"data": [[1200.0, 1.0], [1500.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "12 - Formulario Contactos-82", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "4 - Mod de Personas-12", "isController": false}, {"data": [[1200.0, 1.0], [1300.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "6 - Nuevo Cliente-16", "isController": false}, {"data": [[1600.0, 1.0], [3200.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159", "isController": false}, {"data": [[400.0, 1.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "6 - Nuevo Cliente-17", "isController": false}, {"data": [[2300.0, 1.0], [2700.0, 1.0], [3400.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[5000.0, 1.0], [4900.0, 1.0], [1300.0, 1.0], [5700.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "12 - Formulario Contactos", "isController": true}, {"data": [[1200.0, 1.0], [2800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157", "isController": false}, {"data": [[1400.0, 2.0], [1800.0, 1.0]], "isOverall": false, "label": "6 - Nuevo Cliente-15", "isController": false}, {"data": [[1200.0, 2.0], [3000.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156", "isController": false}, {"data": [[4100.0, 1.0], [4600.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "19 - Grabar Persona-173", "isController": false}, {"data": [[800.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "19 - Grabar Persona-174", "isController": false}, {"data": [[35600.0, 1.0], [36400.0, 1.0], [37400.0, 1.0]], "isOverall": false, "label": "9 - Domicilio Crear", "isController": true}, {"data": [[800.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "17 - Campos Adicionales-140", "isController": false}, {"data": [[4800.0, 1.0], [5100.0, 1.0], [5800.0, 1.0]], "isOverall": false, "label": "17 - Campos Adicionales-141", "isController": false}, {"data": [[1300.0, 1.0], [1600.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "13 - Relacion Crear-86", "isController": false}, {"data": [[600.0, 1.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "13 - Relacion Crear-87", "isController": false}, {"data": [[700.0, 1.0], [1700.0, 2.0]], "isOverall": false, "label": "21 - Cerrar  Insis", "isController": true}, {"data": [[3300.0, 1.0], [3400.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "11 - Contactos Crear", "isController": true}, {"data": [[2300.0, 1.0], [2200.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "17 - Campos Adicionales-139", "isController": false}, {"data": [[2600.0, 1.0], [2900.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155", "isController": false}, {"data": [[2100.0, 1.0], [700.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154", "isController": false}, {"data": [[2300.0, 1.0], [2400.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153", "isController": false}, {"data": [[2100.0, 1.0], [2700.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152", "isController": false}, {"data": [[2300.0, 1.0], [2400.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "13 - Relacion Crear-88", "isController": false}, {"data": [[2700.0, 2.0], [2800.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[2200.0, 1.0], [2400.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150", "isController": false}, {"data": [[1100.0, 1.0], [1600.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-52", "isController": false}, {"data": [[300.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-51", "isController": false}, {"data": [[700.0, 2.0], [800.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-50", "isController": false}, {"data": [[2600.0, 1.0], [3200.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149", "isController": false}, {"data": [[0.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "2 - Login-9-0", "isController": false}, {"data": [[1700.0, 1.0], [1800.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "5 - Clientes", "isController": true}, {"data": [[15100.0, 1.0], [15200.0, 1.0], [15800.0, 1.0]], "isOverall": false, "label": "17 - Campos Adicionales", "isController": true}, {"data": [[2600.0, 1.0], [3300.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[3000.0, 1.0], [3100.0, 2.0]], "isOverall": false, "label": "17 - Campos Adicionales-136", "isController": false}, {"data": [[2200.0, 1.0], [2400.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[2100.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41", "isController": false}, {"data": [[1000.0, 3.0]], "isOverall": false, "label": "17 - Campos Adicionales-137", "isController": false}, {"data": [[2900.0, 1.0], [3000.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[600.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42", "isController": false}, {"data": [[2800.0, 1.0], [2700.0, 1.0], [2900.0, 1.0]], "isOverall": false, "label": "17 - Campos Adicionales-138", "isController": false}, {"data": [[2300.0, 1.0], [1300.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[800.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "Inicio - -10", "isController": false}, {"data": [[4800.0, 1.0], [5500.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "2 - Login-9-1", "isController": false}, {"data": [[0.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0", "isController": false}, {"data": [[4100.0, 1.0], [4900.0, 1.0], [5600.0, 1.0]], "isOverall": false, "label": "2 - Login-9", "isController": false}, {"data": [[400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "2 - Login-7", "isController": false}, {"data": [[1300.0, 1.0], [1600.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1100.0, 1.0], [700.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[4100.0, 1.0], [4300.0, 1.0], [2100.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[700.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "3 - Operaciones del Sistema-11", "isController": false}, {"data": [[600.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-49", "isController": false}, {"data": [[1300.0, 1.0], [2700.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[600.0, 3.0]], "isOverall": false, "label": "10 - Formulario Domicilio-48", "isController": false}, {"data": [[2200.0, 1.0], [1400.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -89", "isController": false}, {"data": [[1200.0, 2.0], [1300.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -100", "isController": false}, {"data": [[700.0, 1.0], [800.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[1300.0, 1.0], [1400.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "6 - Nuevo Cliente-18", "isController": false}, {"data": [[300.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-47", "isController": false}, {"data": [[1500.0, 1.0], [1600.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -101", "isController": false}, {"data": [[1700.0, 1.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[600.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-46", "isController": false}, {"data": [[1100.0, 1.0], [1600.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -102", "isController": false}, {"data": [[800.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-45", "isController": false}, {"data": [[1200.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "14 - Formulario Relacion -103", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [1300.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-44", "isController": false}, {"data": [[1300.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "12 - Formulario Contactos-83", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 221500.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 79.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 223.0, "series": [{"data": [[0.0, 79.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 223.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 175.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 2.109375000000001, "minX": 1.59496746E12, "maxY": 3.0, "series": [{"data": [[1.59496752E12, 3.0], [1.5949677E12, 2.109375000000001], [1.59496758E12, 3.0], [1.59496746E12, 2.929078014184395], [1.59496764E12, 3.0]], "isOverall": false, "label": "1- Thread Group_Registro de Cliente", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.5949677E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 1.0, "minX": 3.0, "maxY": 221525.0, "series": [{"data": [[6.0, 2624.3333333333335]], "isOverall": false, "label": "14 - Formulario Relacion Guardar", "isController": true}, {"data": [[6.0, 2624.3333333333335]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-Aggregated", "isController": true}, {"data": [[4.0, 5547.0], [6.0, 4682.5]], "isOverall": false, "label": "19 - Grabar Persona", "isController": true}, {"data": [[5.333333333333333, 4970.666666666667]], "isOverall": false, "label": "19 - Grabar Persona-Aggregated", "isController": true}, {"data": [[6.0, 1807.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[6.0, 1807.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169-Aggregated", "isController": false}, {"data": [[4.0, 100.0], [5.0, 103.0], [6.0, 105.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2", "isController": false}, {"data": [[5.0, 102.66666666666667]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2-Aggregated", "isController": false}, {"data": [[4.0, 119.0], [5.0, 330.0], [6.0, 179.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1", "isController": false}, {"data": [[5.0, 209.33333333333334]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1-Aggregated", "isController": false}, {"data": [[4.0, 154.0], [5.0, 260.0], [6.0, 431.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0", "isController": false}, {"data": [[5.0, 281.6666666666667]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0-Aggregated", "isController": false}, {"data": [[6.0, 2879.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[6.0, 2879.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165-Aggregated", "isController": false}, {"data": [[6.0, 2065.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[6.0, 2065.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164-Aggregated", "isController": false}, {"data": [[6.0, 2827.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[6.0, 2827.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163-Aggregated", "isController": false}, {"data": [[6.0, 2268.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[6.0, 2268.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162-Aggregated", "isController": false}, {"data": [[6.0, 4565.333333333333]], "isOverall": false, "label": "13 - Relacion Crear", "isController": true}, {"data": [[6.0, 4565.333333333333]], "isOverall": false, "label": "13 - Relacion Crear-Aggregated", "isController": true}, {"data": [[6.0, 3104.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[6.0, 3104.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161-Aggregated", "isController": false}, {"data": [[6.0, 1725.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160", "isController": false}, {"data": [[6.0, 1725.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160-Aggregated", "isController": false}, {"data": [[6.0, 5780.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[6.0, 5780.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-Aggregated", "isController": true}, {"data": [[6.0, 5399.666666666667]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[6.0, 5399.666666666667]], "isOverall": false, "label": "2 - Login-Aggregated", "isController": true}, {"data": [[6.0, 1004.3333333333334]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20", "isController": false}, {"data": [[6.0, 1004.3333333333334]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20-Aggregated", "isController": false}, {"data": [[6.0, 1422.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21", "isController": false}, {"data": [[6.0, 1422.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21-Aggregated", "isController": false}, {"data": [[6.0, 1580.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22", "isController": false}, {"data": [[6.0, 1580.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22-Aggregated", "isController": false}, {"data": [[6.0, 1886.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23", "isController": false}, {"data": [[6.0, 1886.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23-Aggregated", "isController": false}, {"data": [[6.0, 4916.0]], "isOverall": false, "label": "6 - Nuevo Cliente", "isController": true}, {"data": [[6.0, 4916.0]], "isOverall": false, "label": "6 - Nuevo Cliente-Aggregated", "isController": true}, {"data": [[6.0, 1350.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24", "isController": false}, {"data": [[6.0, 1350.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24-Aggregated", "isController": false}, {"data": [[6.0, 1215.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25", "isController": false}, {"data": [[6.0, 1215.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25-Aggregated", "isController": false}, {"data": [[6.0, 1480.6666666666667]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26", "isController": false}, {"data": [[6.0, 1480.6666666666667]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26-Aggregated", "isController": false}, {"data": [[6.0, 1453.6666666666667]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27", "isController": false}, {"data": [[6.0, 1453.6666666666667]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27-Aggregated", "isController": false}, {"data": [[6.0, 1017.3333333333334]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28", "isController": false}, {"data": [[6.0, 1017.3333333333334]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28-Aggregated", "isController": false}, {"data": [[6.0, 1660.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar", "isController": true}, {"data": [[6.0, 1660.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-Aggregated", "isController": true}, {"data": [[6.0, 610.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29", "isController": false}, {"data": [[6.0, 610.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29-Aggregated", "isController": false}, {"data": [[6.0, 901.0]], "isOverall": false, "label": "9 - Domicilio Crear-43", "isController": false}, {"data": [[6.0, 901.0]], "isOverall": false, "label": "9 - Domicilio Crear-43-Aggregated", "isController": false}, {"data": [[6.0, 1436.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-76", "isController": false}, {"data": [[6.0, 1436.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-76-Aggregated", "isController": false}, {"data": [[6.0, 1570.0]], "isOverall": false, "label": "10 - Formulario Domicilio-75", "isController": false}, {"data": [[6.0, 1570.0]], "isOverall": false, "label": "10 - Formulario Domicilio-75-Aggregated", "isController": false}, {"data": [[6.0, 2687.6666666666665]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[6.0, 2687.6666666666665]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-Aggregated", "isController": true}, {"data": [[6.0, 98.33333333333333]], "isOverall": false, "label": "2 - Login-7-1", "isController": false}, {"data": [[6.0, 98.33333333333333]], "isOverall": false, "label": "2 - Login-7-1-Aggregated", "isController": false}, {"data": [[6.0, 382.0]], "isOverall": false, "label": "2 - Login-7-0", "isController": false}, {"data": [[6.0, 382.0]], "isOverall": false, "label": "2 - Login-7-0-Aggregated", "isController": false}, {"data": [[4.0, 114.0], [5.0, 216.0], [6.0, 439.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1", "isController": false}, {"data": [[5.0, 256.3333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1-Aggregated", "isController": false}, {"data": [[6.0, 2631.3333333333335]], "isOverall": false, "label": "12 - Formulario Contactos Guardar", "isController": true}, {"data": [[6.0, 2631.3333333333335]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-Aggregated", "isController": true}, {"data": [[4.0, 105.0], [5.0, 590.0], [6.0, 437.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0", "isController": false}, {"data": [[5.0, 377.33333333333337]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0-Aggregated", "isController": false}, {"data": [[6.0, 645.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38", "isController": false}, {"data": [[6.0, 645.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38-Aggregated", "isController": false}, {"data": [[6.0, 11946.333333333334]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37", "isController": false}, {"data": [[6.0, 11946.333333333334]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37-Aggregated", "isController": false}, {"data": [[6.0, 4578.777777777777]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[6.0, 4578.777777777777]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-Aggregated", "isController": true}, {"data": [[6.0, 7640.333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[6.0, 7640.333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-Aggregated", "isController": true}, {"data": [[6.0, 349.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78", "isController": false}, {"data": [[6.0, 349.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78-Aggregated", "isController": false}, {"data": [[6.0, 671.6666666666666]], "isOverall": false, "label": "3 - Operaciones del Sistema", "isController": true}, {"data": [[6.0, 671.6666666666666]], "isOverall": false, "label": "3 - Operaciones del Sistema-Aggregated", "isController": true}, {"data": [[6.0, 2335.5]], "isOverall": false, "label": "8 - Formulario Datos de Cliente", "isController": true}, {"data": [[6.0, 2335.5]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-Aggregated", "isController": true}, {"data": [[6.0, 1311.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77", "isController": false}, {"data": [[6.0, 1311.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77-Aggregated", "isController": false}, {"data": [[6.0, 1730.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19", "isController": false}, {"data": [[6.0, 1730.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19-Aggregated", "isController": false}, {"data": [[6.0, 1005.6666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-63", "isController": false}, {"data": [[6.0, 1005.6666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-63-Aggregated", "isController": false}, {"data": [[6.0, 1462.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-62", "isController": false}, {"data": [[6.0, 1462.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-62-Aggregated", "isController": false}, {"data": [[6.0, 369.66666666666663]], "isOverall": false, "label": "10 - Formulario Domicilio-61", "isController": false}, {"data": [[6.0, 369.66666666666663]], "isOverall": false, "label": "10 - Formulario Domicilio-61-Aggregated", "isController": false}, {"data": [[6.0, 796.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-60", "isController": false}, {"data": [[6.0, 796.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-60-Aggregated", "isController": false}, {"data": [[6.0, 1530.3333333333333]], "isOverall": false, "label": "11 - Contactos Crear-81", "isController": false}, {"data": [[6.0, 1530.3333333333333]], "isOverall": false, "label": "11 - Contactos Crear-81-Aggregated", "isController": false}, {"data": [[6.0, 749.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[6.0, 749.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85-Aggregated", "isController": false}, {"data": [[6.0, 1874.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[6.0, 1874.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104-Aggregated", "isController": false}, {"data": [[6.0, 774.0]], "isOverall": false, "label": "11 - Contactos Crear-80", "isController": false}, {"data": [[6.0, 774.0]], "isOverall": false, "label": "11 - Contactos Crear-80-Aggregated", "isController": false}, {"data": [[6.0, 749.6666666666666]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[6.0, 749.6666666666666]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105-Aggregated", "isController": false}, {"data": [[6.0, 858.6666666666666]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39", "isController": false}, {"data": [[6.0, 858.6666666666666]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39-Aggregated", "isController": false}, {"data": [[6.0, 1882.3333333333333]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[6.0, 1882.3333333333333]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84-Aggregated", "isController": false}, {"data": [[6.0, 1619.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -90", "isController": false}, {"data": [[6.0, 1619.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -90-Aggregated", "isController": false}, {"data": [[6.0, 1999.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -91", "isController": false}, {"data": [[6.0, 1999.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -91-Aggregated", "isController": false}, {"data": [[6.0, 837.6666666666666]], "isOverall": false, "label": "14 - Formulario Relacion -92", "isController": false}, {"data": [[6.0, 837.6666666666666]], "isOverall": false, "label": "14 - Formulario Relacion -92-Aggregated", "isController": false}, {"data": [[6.0, 1152.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -93", "isController": false}, {"data": [[6.0, 1152.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -93-Aggregated", "isController": false}, {"data": [[6.0, 1258.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -94", "isController": false}, {"data": [[6.0, 1258.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -94-Aggregated", "isController": false}, {"data": [[6.0, 1278.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -95", "isController": false}, {"data": [[6.0, 1278.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -95-Aggregated", "isController": false}, {"data": [[4.0, 909.0], [6.0, 1053.5]], "isOverall": false, "label": "20 - Cerrar  Persona-175", "isController": false}, {"data": [[5.333333333333333, 1005.3333333333334]], "isOverall": false, "label": "20 - Cerrar  Persona-175-Aggregated", "isController": false}, {"data": [[6.0, 1051.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -96", "isController": false}, {"data": [[6.0, 1051.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -96-Aggregated", "isController": false}, {"data": [[4.0, 640.0], [6.0, 911.0]], "isOverall": false, "label": "20 - Cerrar  Persona-176", "isController": false}, {"data": [[5.333333333333333, 820.6666666666666]], "isOverall": false, "label": "20 - Cerrar  Persona-176-Aggregated", "isController": false}, {"data": [[6.0, 1529.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -97", "isController": false}, {"data": [[6.0, 1529.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -97-Aggregated", "isController": false}, {"data": [[6.0, 156.0]], "isOverall": false, "label": "4 - Mod de Personas", "isController": true}, {"data": [[6.0, 156.0]], "isOverall": false, "label": "4 - Mod de Personas-Aggregated", "isController": true}, {"data": [[6.0, 1502.0]], "isOverall": false, "label": "14 - Formulario Relacion -98", "isController": false}, {"data": [[6.0, 1502.0]], "isOverall": false, "label": "14 - Formulario Relacion -98-Aggregated", "isController": false}, {"data": [[6.0, 562.3333333333334]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40", "isController": false}, {"data": [[6.0, 562.3333333333334]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40-Aggregated", "isController": false}, {"data": [[6.0, 1578.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -99", "isController": false}, {"data": [[6.0, 1578.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -99-Aggregated", "isController": false}, {"data": [[6.0, 874.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-59", "isController": false}, {"data": [[6.0, 874.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-59-Aggregated", "isController": false}, {"data": [[4.0, 394.5], [6.0, 270.0]], "isOverall": false, "label": "1 - Index-1", "isController": false}, {"data": [[4.666666666666667, 353.0]], "isOverall": false, "label": "1 - Index-1-Aggregated", "isController": false}, {"data": [[4.0, 1052.5], [6.0, 688.0]], "isOverall": false, "label": "1 - Index", "isController": true}, {"data": [[4.666666666666667, 931.0]], "isOverall": false, "label": "1 - Index-Aggregated", "isController": true}, {"data": [[6.0, 687.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-58", "isController": false}, {"data": [[6.0, 687.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-58-Aggregated", "isController": false}, {"data": [[4.0, 586.0], [5.0, 754.0], [6.0, 446.0]], "isOverall": false, "label": "20 - Cerrar  Persona-177", "isController": false}, {"data": [[5.0, 595.3333333333334]], "isOverall": false, "label": "20 - Cerrar  Persona-177-Aggregated", "isController": false}, {"data": [[4.0, 221525.0], [5.0, 218764.0], [6.0, 217375.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[5.0, 219221.33333333334]], "isOverall": false, "label": "Transaction Controller-Aggregated", "isController": true}, {"data": [[6.0, 389.0]], "isOverall": false, "label": "10 - Formulario Domicilio-57", "isController": false}, {"data": [[6.0, 389.0]], "isOverall": false, "label": "10 - Formulario Domicilio-57-Aggregated", "isController": false}, {"data": [[4.0, 178.0], [5.0, 405.0], [6.0, 641.0]], "isOverall": false, "label": "20 - Cerrar  Persona-178", "isController": false}, {"data": [[5.0, 408.0]], "isOverall": false, "label": "20 - Cerrar  Persona-178-Aggregated", "isController": false}, {"data": [[6.0, 845.6666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-56", "isController": false}, {"data": [[6.0, 845.6666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-56-Aggregated", "isController": false}, {"data": [[6.0, 1011.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-55", "isController": false}, {"data": [[6.0, 1011.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-55-Aggregated", "isController": false}, {"data": [[6.0, 977.0]], "isOverall": false, "label": "10 - Formulario Domicilio-54", "isController": false}, {"data": [[6.0, 977.0]], "isOverall": false, "label": "10 - Formulario Domicilio-54-Aggregated", "isController": false}, {"data": [[6.0, 903.0]], "isOverall": false, "label": "10 - Formulario Domicilio-53", "isController": false}, {"data": [[6.0, 903.0]], "isOverall": false, "label": "10 - Formulario Domicilio-53-Aggregated", "isController": false}, {"data": [[6.0, 1144.0]], "isOverall": false, "label": "10 - Formulario Domicilio-74", "isController": false}, {"data": [[6.0, 1144.0]], "isOverall": false, "label": "10 - Formulario Domicilio-74-Aggregated", "isController": false}, {"data": [[6.0, 1469.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-73", "isController": false}, {"data": [[6.0, 1469.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-73-Aggregated", "isController": false}, {"data": [[6.0, 2458.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-72", "isController": false}, {"data": [[6.0, 2458.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-72-Aggregated", "isController": false}, {"data": [[6.0, 1911.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[6.0, 1911.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168-Aggregated", "isController": false}, {"data": [[6.0, 900.0]], "isOverall": false, "label": "10 - Formulario Domicilio-71", "isController": false}, {"data": [[6.0, 900.0]], "isOverall": false, "label": "10 - Formulario Domicilio-71-Aggregated", "isController": false}, {"data": [[6.0, 2022.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-70", "isController": false}, {"data": [[6.0, 2022.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-70-Aggregated", "isController": false}, {"data": [[6.0, 38591.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales", "isController": true}, {"data": [[6.0, 38591.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-Aggregated", "isController": true}, {"data": [[4.0, 184.0], [5.0, 208.0], [6.0, 203.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183", "isController": false}, {"data": [[5.0, 198.33333333333334]], "isOverall": false, "label": "21 - Cerrar  Insis-183-Aggregated", "isController": false}, {"data": [[6.0, 11324.22222222222]], "isOverall": false, "label": "10 - Formulario Domicilio", "isController": true}, {"data": [[6.0, 11324.22222222222]], "isOverall": false, "label": "10 - Formulario Domicilio-Aggregated", "isController": true}, {"data": [[4.0, 219.0], [5.0, 806.0], [6.0, 876.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185", "isController": false}, {"data": [[5.0, 633.6666666666666]], "isOverall": false, "label": "21 - Cerrar  Insis-185-Aggregated", "isController": false}, {"data": [[6.0, 2585.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[6.0, 2585.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166-Aggregated", "isController": false}, {"data": [[6.0, 1283.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[6.0, 1283.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167-Aggregated", "isController": false}, {"data": [[6.0, 12591.333333333334]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar", "isController": true}, {"data": [[6.0, 12591.333333333334]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-Aggregated", "isController": true}, {"data": [[4.0, 175.0], [6.0, 158.0]], "isOverall": false, "label": "1 - Index-1-1", "isController": false}, {"data": [[4.666666666666667, 169.33333333333334]], "isOverall": false, "label": "1 - Index-1-1-Aggregated", "isController": false}, {"data": [[6.0, 568.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30", "isController": false}, {"data": [[6.0, 568.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30-Aggregated", "isController": false}, {"data": [[6.0, 1260.0]], "isOverall": false, "label": "11 - Contactos Crear-79", "isController": false}, {"data": [[6.0, 1260.0]], "isOverall": false, "label": "11 - Contactos Crear-79-Aggregated", "isController": false}, {"data": [[6.0, 1093.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31", "isController": false}, {"data": [[6.0, 1093.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31-Aggregated", "isController": false}, {"data": [[6.0, 645.6666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32", "isController": false}, {"data": [[6.0, 645.6666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32-Aggregated", "isController": false}, {"data": [[6.0, 616.6666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33", "isController": false}, {"data": [[6.0, 616.6666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33-Aggregated", "isController": false}, {"data": [[6.0, 1980.6666666666667]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34", "isController": false}, {"data": [[6.0, 1980.6666666666667]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34-Aggregated", "isController": false}, {"data": [[6.0, 1735.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35", "isController": false}, {"data": [[6.0, 1735.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35-Aggregated", "isController": false}, {"data": [[6.0, 1154.6666666666667]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36", "isController": false}, {"data": [[6.0, 1154.6666666666667]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36-Aggregated", "isController": false}, {"data": [[4.0, 375.0], [5.0, 694.0], [6.0, 717.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182", "isController": false}, {"data": [[5.0, 595.3333333333334]], "isOverall": false, "label": "21 - Cerrar  Insis-182-Aggregated", "isController": false}, {"data": [[4.0, 2313.0], [5.0, 2994.0], [6.0, 3181.0]], "isOverall": false, "label": "20 - Cerrar  Persona", "isController": true}, {"data": [[5.0, 2829.3333333333335]], "isOverall": false, "label": "20 - Cerrar  Persona-Aggregated", "isController": true}, {"data": [[6.0, 1849.0]], "isOverall": false, "label": "10 - Formulario Domicilio-69", "isController": false}, {"data": [[6.0, 1849.0]], "isOverall": false, "label": "10 - Formulario Domicilio-69-Aggregated", "isController": false}, {"data": [[6.0, 1295.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-68", "isController": false}, {"data": [[6.0, 1295.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-68-Aggregated", "isController": false}, {"data": [[6.0, 17214.166666666668]], "isOverall": false, "label": "14 - Formulario Relacion ", "isController": true}, {"data": [[6.0, 17214.166666666668]], "isOverall": false, "label": "14 - Formulario Relacion -Aggregated", "isController": true}, {"data": [[6.0, 558.6666666666666]], "isOverall": false, "label": "5 - Clientes-14", "isController": false}, {"data": [[6.0, 558.6666666666666]], "isOverall": false, "label": "5 - Clientes-14-Aggregated", "isController": false}, {"data": [[6.0, 348.0]], "isOverall": false, "label": "10 - Formulario Domicilio-67", "isController": false}, {"data": [[6.0, 348.0]], "isOverall": false, "label": "10 - Formulario Domicilio-67-Aggregated", "isController": false}, {"data": [[6.0, 1320.3333333333333]], "isOverall": false, "label": "5 - Clientes-13", "isController": false}, {"data": [[6.0, 1320.3333333333333]], "isOverall": false, "label": "5 - Clientes-13-Aggregated", "isController": false}, {"data": [[6.0, 1373.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-66", "isController": false}, {"data": [[6.0, 1373.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-66-Aggregated", "isController": false}, {"data": [[6.0, 759.0]], "isOverall": false, "label": "10 - Formulario Domicilio-65", "isController": false}, {"data": [[6.0, 759.0]], "isOverall": false, "label": "10 - Formulario Domicilio-65-Aggregated", "isController": false}, {"data": [[4.0, 218.5], [6.0, 112.0]], "isOverall": false, "label": "1 - Index-1-0", "isController": false}, {"data": [[4.666666666666667, 183.0]], "isOverall": false, "label": "1 - Index-1-0-Aggregated", "isController": false}, {"data": [[6.0, 624.0]], "isOverall": false, "label": "10 - Formulario Domicilio-64", "isController": false}, {"data": [[6.0, 624.0]], "isOverall": false, "label": "10 - Formulario Domicilio-64-Aggregated", "isController": false}, {"data": [[6.0, 1487.0]], "isOverall": false, "label": "12 - Formulario Contactos-82", "isController": false}, {"data": [[6.0, 1487.0]], "isOverall": false, "label": "12 - Formulario Contactos-82-Aggregated", "isController": false}, {"data": [[6.0, 156.0]], "isOverall": false, "label": "4 - Mod de Personas-12", "isController": false}, {"data": [[6.0, 156.0]], "isOverall": false, "label": "4 - Mod de Personas-12-Aggregated", "isController": false}, {"data": [[6.0, 1462.0]], "isOverall": false, "label": "6 - Nuevo Cliente-16", "isController": false}, {"data": [[6.0, 1462.0]], "isOverall": false, "label": "6 - Nuevo Cliente-16-Aggregated", "isController": false}, {"data": [[6.0, 2786.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159", "isController": false}, {"data": [[6.0, 2786.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159-Aggregated", "isController": false}, {"data": [[6.0, 388.6666666666667]], "isOverall": false, "label": "6 - Nuevo Cliente-17", "isController": false}, {"data": [[6.0, 388.6666666666667]], "isOverall": false, "label": "6 - Nuevo Cliente-17-Aggregated", "isController": false}, {"data": [[6.0, 2858.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[6.0, 2858.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158-Aggregated", "isController": false}, {"data": [[6.0, 3172.5]], "isOverall": false, "label": "12 - Formulario Contactos", "isController": true}, {"data": [[6.0, 3172.5]], "isOverall": false, "label": "12 - Formulario Contactos-Aggregated", "isController": true}, {"data": [[6.0, 2041.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157", "isController": false}, {"data": [[6.0, 2041.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157-Aggregated", "isController": false}, {"data": [[6.0, 1595.3333333333333]], "isOverall": false, "label": "6 - Nuevo Cliente-15", "isController": false}, {"data": [[6.0, 1595.3333333333333]], "isOverall": false, "label": "6 - Nuevo Cliente-15-Aggregated", "isController": false}, {"data": [[6.0, 1844.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156", "isController": false}, {"data": [[6.0, 1844.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156-Aggregated", "isController": false}, {"data": [[5.0, 4614.0], [6.0, 3979.5]], "isOverall": false, "label": "19 - Grabar Persona-173", "isController": false}, {"data": [[5.666666666666667, 4191.0]], "isOverall": false, "label": "19 - Grabar Persona-173-Aggregated", "isController": false}, {"data": [[4.0, 933.0], [6.0, 703.0]], "isOverall": false, "label": "19 - Grabar Persona-174", "isController": false}, {"data": [[5.333333333333333, 779.6666666666666]], "isOverall": false, "label": "19 - Grabar Persona-174-Aggregated", "isController": false}, {"data": [[6.0, 36534.333333333336]], "isOverall": false, "label": "9 - Domicilio Crear", "isController": true}, {"data": [[6.0, 36534.333333333336]], "isOverall": false, "label": "9 - Domicilio Crear-Aggregated", "isController": true}, {"data": [[6.0, 950.0]], "isOverall": false, "label": "17 - Campos Adicionales-140", "isController": false}, {"data": [[6.0, 950.0]], "isOverall": false, "label": "17 - Campos Adicionales-140-Aggregated", "isController": false}, {"data": [[6.0, 5254.666666666667]], "isOverall": false, "label": "17 - Campos Adicionales-141", "isController": false}, {"data": [[6.0, 5254.666666666667]], "isOverall": false, "label": "17 - Campos Adicionales-141-Aggregated", "isController": false}, {"data": [[6.0, 1644.6666666666667]], "isOverall": false, "label": "13 - Relacion Crear-86", "isController": false}, {"data": [[6.0, 1644.6666666666667]], "isOverall": false, "label": "13 - Relacion Crear-86-Aggregated", "isController": false}, {"data": [[6.0, 690.6666666666666]], "isOverall": false, "label": "13 - Relacion Crear-87", "isController": false}, {"data": [[6.0, 690.6666666666666]], "isOverall": false, "label": "13 - Relacion Crear-87-Aggregated", "isController": false}, {"data": [[4.0, 778.0], [5.0, 1708.0], [6.0, 1796.0]], "isOverall": false, "label": "21 - Cerrar  Insis", "isController": true}, {"data": [[5.0, 1427.3333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-Aggregated", "isController": true}, {"data": [[6.0, 3564.3333333333335]], "isOverall": false, "label": "11 - Contactos Crear", "isController": true}, {"data": [[6.0, 3564.3333333333335]], "isOverall": false, "label": "11 - Contactos Crear-Aggregated", "isController": true}, {"data": [[6.0, 2205.6666666666665]], "isOverall": false, "label": "17 - Campos Adicionales-139", "isController": false}, {"data": [[6.0, 2205.6666666666665]], "isOverall": false, "label": "17 - Campos Adicionales-139-Aggregated", "isController": false}, {"data": [[6.0, 2480.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155", "isController": false}, {"data": [[6.0, 2480.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155-Aggregated", "isController": false}, {"data": [[6.0, 1487.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154", "isController": false}, {"data": [[6.0, 1487.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154-Aggregated", "isController": false}, {"data": [[6.0, 2139.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153", "isController": false}, {"data": [[6.0, 2139.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153-Aggregated", "isController": false}, {"data": [[6.0, 2282.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152", "isController": false}, {"data": [[6.0, 2282.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152-Aggregated", "isController": false}, {"data": [[6.0, 2230.0]], "isOverall": false, "label": "13 - Relacion Crear-88", "isController": false}, {"data": [[6.0, 2230.0]], "isOverall": false, "label": "13 - Relacion Crear-88-Aggregated", "isController": false}, {"data": [[6.0, 2778.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[6.0, 2778.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151-Aggregated", "isController": false}, {"data": [[6.0, 2103.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150", "isController": false}, {"data": [[6.0, 2103.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150-Aggregated", "isController": false}, {"data": [[6.0, 1517.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-52", "isController": false}, {"data": [[6.0, 1517.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-52-Aggregated", "isController": false}, {"data": [[6.0, 380.0]], "isOverall": false, "label": "10 - Formulario Domicilio-51", "isController": false}, {"data": [[6.0, 380.0]], "isOverall": false, "label": "10 - Formulario Domicilio-51-Aggregated", "isController": false}, {"data": [[6.0, 779.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-50", "isController": false}, {"data": [[6.0, 779.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-50-Aggregated", "isController": false}, {"data": [[6.0, 2624.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149", "isController": false}, {"data": [[6.0, 2624.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149-Aggregated", "isController": false}, {"data": [[6.0, 111.33333333333333]], "isOverall": false, "label": "2 - Login-9-0", "isController": false}, {"data": [[6.0, 111.33333333333333]], "isOverall": false, "label": "2 - Login-9-0-Aggregated", "isController": false}, {"data": [[6.0, 1879.0]], "isOverall": false, "label": "5 - Clientes", "isController": true}, {"data": [[6.0, 1879.0]], "isOverall": false, "label": "5 - Clientes-Aggregated", "isController": true}, {"data": [[6.0, 15409.333333333334]], "isOverall": false, "label": "17 - Campos Adicionales", "isController": true}, {"data": [[6.0, 15409.333333333334]], "isOverall": false, "label": "17 - Campos Adicionales-Aggregated", "isController": true}, {"data": [[6.0, 2702.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[6.0, 2702.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148-Aggregated", "isController": false}, {"data": [[6.0, 3105.6666666666665]], "isOverall": false, "label": "17 - Campos Adicionales-136", "isController": false}, {"data": [[6.0, 3105.6666666666665]], "isOverall": false, "label": "17 - Campos Adicionales-136-Aggregated", "isController": false}, {"data": [[6.0, 2172.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[6.0, 2172.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147-Aggregated", "isController": false}, {"data": [[6.0, 2115.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41", "isController": false}, {"data": [[6.0, 2115.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41-Aggregated", "isController": false}, {"data": [[6.0, 1051.6666666666667]], "isOverall": false, "label": "17 - Campos Adicionales-137", "isController": false}, {"data": [[6.0, 1051.6666666666667]], "isOverall": false, "label": "17 - Campos Adicionales-137-Aggregated", "isController": false}, {"data": [[6.0, 2578.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[6.0, 2578.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146-Aggregated", "isController": false}, {"data": [[6.0, 572.6666666666666]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42", "isController": false}, {"data": [[6.0, 572.6666666666666]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42-Aggregated", "isController": false}, {"data": [[6.0, 2841.6666666666665]], "isOverall": false, "label": "17 - Campos Adicionales-138", "isController": false}, {"data": [[6.0, 2841.6666666666665]], "isOverall": false, "label": "17 - Campos Adicionales-138-Aggregated", "isController": false}, {"data": [[6.0, 1925.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[6.0, 1925.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145-Aggregated", "isController": false}, {"data": [[4.0, 423.0], [3.0, 893.0], [6.0, 418.0]], "isOverall": false, "label": "Inicio - -10", "isController": false}, {"data": [[4.333333333333333, 578.0]], "isOverall": false, "label": "Inicio - -10-Aggregated", "isController": false}, {"data": [[6.0, 4807.333333333333]], "isOverall": false, "label": "2 - Login-9-1", "isController": false}, {"data": [[6.0, 4807.333333333333]], "isOverall": false, "label": "2 - Login-9-1-Aggregated", "isController": false}, {"data": [[4.0, 90.0], [5.0, 106.0], [6.0, 108.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1", "isController": false}, {"data": [[5.0, 101.33333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1-Aggregated", "isController": false}, {"data": [[4.0, 94.0], [5.0, 102.0], [6.0, 95.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0", "isController": false}, {"data": [[5.0, 97.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0-Aggregated", "isController": false}, {"data": [[6.0, 4918.666666666667]], "isOverall": false, "label": "2 - Login-9", "isController": false}, {"data": [[6.0, 4918.666666666667]], "isOverall": false, "label": "2 - Login-9-Aggregated", "isController": false}, {"data": [[6.0, 481.0]], "isOverall": false, "label": "2 - Login-7", "isController": false}, {"data": [[6.0, 481.0]], "isOverall": false, "label": "2 - Login-7-Aggregated", "isController": false}, {"data": [[6.0, 1341.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[6.0, 1341.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172-Aggregated", "isController": false}, {"data": [[4.0, 1.0], [5.0, 1.0], [6.0, 2.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[5.0, 1.3333333333333333]], "isOverall": false, "label": "Debug Sampler-Aggregated", "isController": false}, {"data": [[6.0, 923.6666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[6.0, 923.6666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171-Aggregated", "isController": false}, {"data": [[6.0, 3567.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[6.0, 3567.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170-Aggregated", "isController": false}, {"data": [[6.0, 671.6666666666666]], "isOverall": false, "label": "3 - Operaciones del Sistema-11", "isController": false}, {"data": [[6.0, 671.6666666666666]], "isOverall": false, "label": "3 - Operaciones del Sistema-11-Aggregated", "isController": false}, {"data": [[6.0, 920.0]], "isOverall": false, "label": "10 - Formulario Domicilio-49", "isController": false}, {"data": [[6.0, 920.0]], "isOverall": false, "label": "10 - Formulario Domicilio-49-Aggregated", "isController": false}, {"data": [[6.0, 1859.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[6.0, 1859.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144-Aggregated", "isController": false}, {"data": [[6.0, 677.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-48", "isController": false}, {"data": [[6.0, 677.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-48-Aggregated", "isController": false}, {"data": [[6.0, 1729.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -89", "isController": false}, {"data": [[6.0, 1729.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -89-Aggregated", "isController": false}, {"data": [[6.0, 1290.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -100", "isController": false}, {"data": [[6.0, 1290.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -100-Aggregated", "isController": false}, {"data": [[6.0, 1181.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[6.0, 1181.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143-Aggregated", "isController": false}, {"data": [[6.0, 1470.0]], "isOverall": false, "label": "6 - Nuevo Cliente-18", "isController": false}, {"data": [[6.0, 1470.0]], "isOverall": false, "label": "6 - Nuevo Cliente-18-Aggregated", "isController": false}, {"data": [[6.0, 287.0]], "isOverall": false, "label": "10 - Formulario Domicilio-47", "isController": false}, {"data": [[6.0, 287.0]], "isOverall": false, "label": "10 - Formulario Domicilio-47-Aggregated", "isController": false}, {"data": [[6.0, 1669.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -101", "isController": false}, {"data": [[6.0, 1669.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -101-Aggregated", "isController": false}, {"data": [[6.0, 1891.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[6.0, 1891.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142-Aggregated", "isController": false}, {"data": [[6.0, 621.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-46", "isController": false}, {"data": [[6.0, 621.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-46-Aggregated", "isController": false}, {"data": [[6.0, 1215.0]], "isOverall": false, "label": "14 - Formulario Relacion -102", "isController": false}, {"data": [[6.0, 1215.0]], "isOverall": false, "label": "14 - Formulario Relacion -102-Aggregated", "isController": false}, {"data": [[6.0, 953.0]], "isOverall": false, "label": "10 - Formulario Domicilio-45", "isController": false}, {"data": [[6.0, 953.0]], "isOverall": false, "label": "10 - Formulario Domicilio-45-Aggregated", "isController": false}, {"data": [[6.0, 1127.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -103", "isController": false}, {"data": [[6.0, 1127.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -103-Aggregated", "isController": false}, {"data": [[6.0, 1266.0]], "isOverall": false, "label": "10 - Formulario Domicilio-44", "isController": false}, {"data": [[6.0, 1266.0]], "isOverall": false, "label": "10 - Formulario Domicilio-44-Aggregated", "isController": false}, {"data": [[6.0, 1113.3333333333333]], "isOverall": false, "label": "12 - Formulario Contactos-83", "isController": false}, {"data": [[6.0, 1113.3333333333333]], "isOverall": false, "label": "12 - Formulario Contactos-83-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 6.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 3090.883333333333, "minX": 1.59496746E12, "maxY": 38370.8, "series": [{"data": [[1.59496752E12, 38370.8], [1.5949677E12, 12744.816666666668], [1.59496758E12, 24306.816666666666], [1.59496746E12, 31317.95], [1.59496764E12, 10735.133333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.59496752E12, 17474.283333333333], [1.5949677E12, 3090.883333333333], [1.59496758E12, 12183.65], [1.59496746E12, 6811.116666666667], [1.59496764E12, 11514.866666666667]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.5949677E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 1.3333333333333333, "minX": 1.59496746E12, "maxY": 219221.33333333334, "series": [{"data": [[1.59496758E12, 2624.3333333333335]], "isOverall": false, "label": "14 - Formulario Relacion Guardar", "isController": true}, {"data": [[1.5949677E12, 5149.0], [1.59496764E12, 4614.0]], "isOverall": false, "label": "19 - Grabar Persona", "isController": true}, {"data": [[1.59496764E12, 1807.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[1.5949677E12, 102.66666666666667]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2", "isController": false}, {"data": [[1.5949677E12, 209.33333333333334]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1", "isController": false}, {"data": [[1.5949677E12, 281.6666666666667]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0", "isController": false}, {"data": [[1.59496764E12, 2879.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[1.59496764E12, 2065.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[1.59496764E12, 2827.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[1.59496764E12, 2268.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[1.59496758E12, 4565.333333333333]], "isOverall": false, "label": "13 - Relacion Crear", "isController": true}, {"data": [[1.59496764E12, 3104.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[1.59496764E12, 1725.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160", "isController": false}, {"data": [[1.59496764E12, 5780.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[1.59496746E12, 5399.666666666667]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[1.59496746E12, 1004.3333333333334]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20", "isController": false}, {"data": [[1.59496746E12, 1422.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21", "isController": false}, {"data": [[1.59496746E12, 1580.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22", "isController": false}, {"data": [[1.59496746E12, 1886.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23", "isController": false}, {"data": [[1.59496746E12, 4916.0]], "isOverall": false, "label": "6 - Nuevo Cliente", "isController": true}, {"data": [[1.59496746E12, 1350.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24", "isController": false}, {"data": [[1.59496746E12, 1215.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25", "isController": false}, {"data": [[1.59496746E12, 1480.6666666666667]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26", "isController": false}, {"data": [[1.59496746E12, 1453.6666666666667]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27", "isController": false}, {"data": [[1.59496746E12, 1017.3333333333334]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28", "isController": false}, {"data": [[1.59496752E12, 1660.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar", "isController": true}, {"data": [[1.59496746E12, 610.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29", "isController": false}, {"data": [[1.59496752E12, 901.0]], "isOverall": false, "label": "9 - Domicilio Crear-43", "isController": false}, {"data": [[1.59496752E12, 1436.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-76", "isController": false}, {"data": [[1.59496752E12, 1570.0]], "isOverall": false, "label": "10 - Formulario Domicilio-75", "isController": false}, {"data": [[1.59496752E12, 2687.6666666666665]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[1.59496746E12, 98.33333333333333]], "isOverall": false, "label": "2 - Login-7-1", "isController": false}, {"data": [[1.59496746E12, 382.0]], "isOverall": false, "label": "2 - Login-7-0", "isController": false}, {"data": [[1.5949677E12, 256.3333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1", "isController": false}, {"data": [[1.59496758E12, 2631.3333333333335]], "isOverall": false, "label": "12 - Formulario Contactos Guardar", "isController": true}, {"data": [[1.5949677E12, 377.33333333333337]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0", "isController": false}, {"data": [[1.59496752E12, 645.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38", "isController": false}, {"data": [[1.59496752E12, 11946.333333333334]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37", "isController": false}, {"data": [[1.59496752E12, 10001.583333333334], [1.59496746E12, 1867.3750000000002]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[1.5949677E12, 5845.0], [1.59496764E12, 8538.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[1.59496752E12, 349.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78", "isController": false}, {"data": [[1.59496746E12, 671.6666666666666]], "isOverall": false, "label": "3 - Operaciones del Sistema", "isController": true}, {"data": [[1.59496752E12, 2335.5]], "isOverall": false, "label": "8 - Formulario Datos de Cliente", "isController": true}, {"data": [[1.59496752E12, 1311.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77", "isController": false}, {"data": [[1.59496746E12, 1730.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19", "isController": false}, {"data": [[1.59496752E12, 1005.6666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-63", "isController": false}, {"data": [[1.59496752E12, 1462.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-62", "isController": false}, {"data": [[1.59496752E12, 369.66666666666663]], "isOverall": false, "label": "10 - Formulario Domicilio-61", "isController": false}, {"data": [[1.59496752E12, 796.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-60", "isController": false}, {"data": [[1.59496758E12, 1530.3333333333333]], "isOverall": false, "label": "11 - Contactos Crear-81", "isController": false}, {"data": [[1.59496758E12, 749.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[1.59496758E12, 1874.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[1.59496752E12, 748.0], [1.59496758E12, 826.0]], "isOverall": false, "label": "11 - Contactos Crear-80", "isController": false}, {"data": [[1.59496758E12, 749.6666666666666]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[1.59496752E12, 858.6666666666666]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39", "isController": false}, {"data": [[1.59496758E12, 1882.3333333333333]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[1.59496758E12, 1619.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -90", "isController": false}, {"data": [[1.59496758E12, 1999.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -91", "isController": false}, {"data": [[1.59496758E12, 837.6666666666666]], "isOverall": false, "label": "14 - Formulario Relacion -92", "isController": false}, {"data": [[1.59496758E12, 1152.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -93", "isController": false}, {"data": [[1.59496758E12, 1258.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -94", "isController": false}, {"data": [[1.59496758E12, 1278.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -95", "isController": false}, {"data": [[1.5949677E12, 1005.3333333333334]], "isOverall": false, "label": "20 - Cerrar  Persona-175", "isController": false}, {"data": [[1.59496758E12, 1051.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -96", "isController": false}, {"data": [[1.5949677E12, 820.6666666666666]], "isOverall": false, "label": "20 - Cerrar  Persona-176", "isController": false}, {"data": [[1.59496758E12, 1529.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -97", "isController": false}, {"data": [[1.59496746E12, 156.0]], "isOverall": false, "label": "4 - Mod de Personas", "isController": true}, {"data": [[1.59496758E12, 1502.0]], "isOverall": false, "label": "14 - Formulario Relacion -98", "isController": false}, {"data": [[1.59496752E12, 562.3333333333334]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40", "isController": false}, {"data": [[1.59496758E12, 1578.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -99", "isController": false}, {"data": [[1.59496752E12, 874.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-59", "isController": false}, {"data": [[1.59496746E12, 353.0]], "isOverall": false, "label": "1 - Index-1", "isController": false}, {"data": [[1.59496746E12, 931.0]], "isOverall": false, "label": "1 - Index", "isController": true}, {"data": [[1.59496752E12, 687.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-58", "isController": false}, {"data": [[1.5949677E12, 595.3333333333334]], "isOverall": false, "label": "20 - Cerrar  Persona-177", "isController": false}, {"data": [[1.5949677E12, 219221.33333333334]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59496752E12, 389.0]], "isOverall": false, "label": "10 - Formulario Domicilio-57", "isController": false}, {"data": [[1.5949677E12, 408.0]], "isOverall": false, "label": "20 - Cerrar  Persona-178", "isController": false}, {"data": [[1.59496752E12, 845.6666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-56", "isController": false}, {"data": [[1.59496752E12, 1011.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-55", "isController": false}, {"data": [[1.59496752E12, 977.0]], "isOverall": false, "label": "10 - Formulario Domicilio-54", "isController": false}, {"data": [[1.59496752E12, 903.0]], "isOverall": false, "label": "10 - Formulario Domicilio-53", "isController": false}, {"data": [[1.59496752E12, 1144.0]], "isOverall": false, "label": "10 - Formulario Domicilio-74", "isController": false}, {"data": [[1.59496752E12, 1469.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-73", "isController": false}, {"data": [[1.59496752E12, 2458.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-72", "isController": false}, {"data": [[1.59496764E12, 1911.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[1.59496752E12, 900.0]], "isOverall": false, "label": "10 - Formulario Domicilio-71", "isController": false}, {"data": [[1.59496752E12, 2022.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-70", "isController": false}, {"data": [[1.5949677E12, 70083.0], [1.59496764E12, 34654.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales", "isController": true}, {"data": [[1.5949677E12, 198.33333333333334]], "isOverall": false, "label": "21 - Cerrar  Insis-183", "isController": false}, {"data": [[1.59496752E12, 11324.22222222222]], "isOverall": false, "label": "10 - Formulario Domicilio", "isController": true}, {"data": [[1.5949677E12, 633.6666666666666]], "isOverall": false, "label": "21 - Cerrar  Insis-185", "isController": false}, {"data": [[1.59496764E12, 2585.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[1.59496764E12, 1283.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[1.59496752E12, 12591.333333333334]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar", "isController": true}, {"data": [[1.59496746E12, 169.33333333333334]], "isOverall": false, "label": "1 - Index-1-1", "isController": false}, {"data": [[1.59496746E12, 568.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30", "isController": false}, {"data": [[1.59496752E12, 1174.0], [1.59496758E12, 1432.0]], "isOverall": false, "label": "11 - Contactos Crear-79", "isController": false}, {"data": [[1.59496746E12, 1093.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31", "isController": false}, {"data": [[1.59496746E12, 645.6666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32", "isController": false}, {"data": [[1.59496746E12, 616.6666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33", "isController": false}, {"data": [[1.59496752E12, 1980.6666666666667]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34", "isController": false}, {"data": [[1.59496752E12, 1735.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35", "isController": false}, {"data": [[1.59496752E12, 1154.6666666666667]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36", "isController": false}, {"data": [[1.5949677E12, 595.3333333333334]], "isOverall": false, "label": "21 - Cerrar  Insis-182", "isController": false}, {"data": [[1.5949677E12, 2829.3333333333335]], "isOverall": false, "label": "20 - Cerrar  Persona", "isController": true}, {"data": [[1.59496752E12, 1849.0]], "isOverall": false, "label": "10 - Formulario Domicilio-69", "isController": false}, {"data": [[1.59496752E12, 1295.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-68", "isController": false}, {"data": [[1.59496758E12, 17214.166666666668]], "isOverall": false, "label": "14 - Formulario Relacion ", "isController": true}, {"data": [[1.59496746E12, 558.6666666666666]], "isOverall": false, "label": "5 - Clientes-14", "isController": false}, {"data": [[1.59496752E12, 348.0]], "isOverall": false, "label": "10 - Formulario Domicilio-67", "isController": false}, {"data": [[1.59496746E12, 1320.3333333333333]], "isOverall": false, "label": "5 - Clientes-13", "isController": false}, {"data": [[1.59496752E12, 1373.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-66", "isController": false}, {"data": [[1.59496752E12, 759.0]], "isOverall": false, "label": "10 - Formulario Domicilio-65", "isController": false}, {"data": [[1.59496746E12, 183.0]], "isOverall": false, "label": "1 - Index-1-0", "isController": false}, {"data": [[1.59496752E12, 624.0]], "isOverall": false, "label": "10 - Formulario Domicilio-64", "isController": false}, {"data": [[1.59496758E12, 1487.0]], "isOverall": false, "label": "12 - Formulario Contactos-82", "isController": false}, {"data": [[1.59496746E12, 156.0]], "isOverall": false, "label": "4 - Mod de Personas-12", "isController": false}, {"data": [[1.59496746E12, 1462.0]], "isOverall": false, "label": "6 - Nuevo Cliente-16", "isController": false}, {"data": [[1.59496764E12, 2786.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159", "isController": false}, {"data": [[1.59496746E12, 388.6666666666667]], "isOverall": false, "label": "6 - Nuevo Cliente-17", "isController": false}, {"data": [[1.59496764E12, 2858.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[1.59496758E12, 3172.5]], "isOverall": false, "label": "12 - Formulario Contactos", "isController": true}, {"data": [[1.59496764E12, 2041.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157", "isController": false}, {"data": [[1.59496746E12, 1595.3333333333333]], "isOverall": false, "label": "6 - Nuevo Cliente-15", "isController": false}, {"data": [[1.59496764E12, 1844.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156", "isController": false}, {"data": [[1.5949677E12, 4386.5], [1.59496764E12, 3800.0]], "isOverall": false, "label": "19 - Grabar Persona-173", "isController": false}, {"data": [[1.5949677E12, 762.5], [1.59496764E12, 814.0]], "isOverall": false, "label": "19 - Grabar Persona-174", "isController": false}, {"data": [[1.59496752E12, 36534.333333333336]], "isOverall": false, "label": "9 - Domicilio Crear", "isController": true}, {"data": [[1.59496758E12, 950.0]], "isOverall": false, "label": "17 - Campos Adicionales-140", "isController": false}, {"data": [[1.59496758E12, 5254.666666666667]], "isOverall": false, "label": "17 - Campos Adicionales-141", "isController": false}, {"data": [[1.59496758E12, 1644.6666666666667]], "isOverall": false, "label": "13 - Relacion Crear-86", "isController": false}, {"data": [[1.59496758E12, 690.6666666666666]], "isOverall": false, "label": "13 - Relacion Crear-87", "isController": false}, {"data": [[1.5949677E12, 1427.3333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis", "isController": true}, {"data": [[1.59496758E12, 3564.3333333333335]], "isOverall": false, "label": "11 - Contactos Crear", "isController": true}, {"data": [[1.59496758E12, 2205.6666666666665]], "isOverall": false, "label": "17 - Campos Adicionales-139", "isController": false}, {"data": [[1.59496764E12, 2480.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155", "isController": false}, {"data": [[1.59496764E12, 1487.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154", "isController": false}, {"data": [[1.59496764E12, 2139.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153", "isController": false}, {"data": [[1.59496764E12, 2282.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152", "isController": false}, {"data": [[1.59496758E12, 2230.0]], "isOverall": false, "label": "13 - Relacion Crear-88", "isController": false}, {"data": [[1.59496764E12, 2778.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[1.59496764E12, 2103.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150", "isController": false}, {"data": [[1.59496752E12, 1517.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-52", "isController": false}, {"data": [[1.59496752E12, 380.0]], "isOverall": false, "label": "10 - Formulario Domicilio-51", "isController": false}, {"data": [[1.59496752E12, 779.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-50", "isController": false}, {"data": [[1.59496764E12, 2624.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149", "isController": false}, {"data": [[1.59496746E12, 111.33333333333333]], "isOverall": false, "label": "2 - Login-9-0", "isController": false}, {"data": [[1.59496746E12, 1879.0]], "isOverall": false, "label": "5 - Clientes", "isController": true}, {"data": [[1.59496758E12, 15409.333333333334]], "isOverall": false, "label": "17 - Campos Adicionales", "isController": true}, {"data": [[1.59496764E12, 2702.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[1.59496758E12, 3105.6666666666665]], "isOverall": false, "label": "17 - Campos Adicionales-136", "isController": false}, {"data": [[1.59496758E12, 2404.0], [1.59496764E12, 2056.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[1.59496752E12, 2115.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41", "isController": false}, {"data": [[1.59496758E12, 1051.6666666666667]], "isOverall": false, "label": "17 - Campos Adicionales-137", "isController": false}, {"data": [[1.59496758E12, 2379.0], [1.59496764E12, 2977.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[1.59496752E12, 572.6666666666666]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42", "isController": false}, {"data": [[1.59496758E12, 2841.6666666666665]], "isOverall": false, "label": "17 - Campos Adicionales-138", "isController": false}, {"data": [[1.59496758E12, 1714.0], [1.59496764E12, 2349.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[1.59496746E12, 578.0]], "isOverall": false, "label": "Inicio - -10", "isController": false}, {"data": [[1.59496746E12, 4807.333333333333]], "isOverall": false, "label": "2 - Login-9-1", "isController": false}, {"data": [[1.5949677E12, 101.33333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1", "isController": false}, {"data": [[1.5949677E12, 97.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0", "isController": false}, {"data": [[1.59496746E12, 4918.666666666667]], "isOverall": false, "label": "2 - Login-9", "isController": false}, {"data": [[1.59496746E12, 481.0]], "isOverall": false, "label": "2 - Login-7", "isController": false}, {"data": [[1.5949677E12, 1034.0], [1.59496764E12, 1495.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[1.5949677E12, 1.3333333333333333]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.5949677E12, 1157.0], [1.59496764E12, 807.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[1.59496764E12, 3567.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[1.59496746E12, 671.6666666666666]], "isOverall": false, "label": "3 - Operaciones del Sistema-11", "isController": false}, {"data": [[1.59496752E12, 920.0]], "isOverall": false, "label": "10 - Formulario Domicilio-49", "isController": false}, {"data": [[1.59496758E12, 1859.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[1.59496752E12, 677.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-48", "isController": false}, {"data": [[1.59496758E12, 1729.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -89", "isController": false}, {"data": [[1.59496758E12, 1290.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -100", "isController": false}, {"data": [[1.59496758E12, 1181.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[1.59496746E12, 1470.0]], "isOverall": false, "label": "6 - Nuevo Cliente-18", "isController": false}, {"data": [[1.59496752E12, 287.0]], "isOverall": false, "label": "10 - Formulario Domicilio-47", "isController": false}, {"data": [[1.59496758E12, 1669.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -101", "isController": false}, {"data": [[1.59496758E12, 1891.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[1.59496752E12, 621.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-46", "isController": false}, {"data": [[1.59496758E12, 1215.0]], "isOverall": false, "label": "14 - Formulario Relacion -102", "isController": false}, {"data": [[1.59496752E12, 953.0]], "isOverall": false, "label": "10 - Formulario Domicilio-45", "isController": false}, {"data": [[1.59496758E12, 1127.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -103", "isController": false}, {"data": [[1.59496752E12, 1266.0]], "isOverall": false, "label": "10 - Formulario Domicilio-44", "isController": false}, {"data": [[1.59496758E12, 1113.3333333333333]], "isOverall": false, "label": "12 - Formulario Contactos-83", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.5949677E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.59496746E12, "maxY": 198519.66666666666, "series": [{"data": [[1.59496758E12, 2242.3333333333335]], "isOverall": false, "label": "14 - Formulario Relacion Guardar", "isController": true}, {"data": [[1.5949677E12, 4517.0], [1.59496764E12, 4095.0]], "isOverall": false, "label": "19 - Grabar Persona", "isController": true}, {"data": [[1.59496764E12, 1801.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[1.5949677E12, 102.66666666666667]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2", "isController": false}, {"data": [[1.5949677E12, 209.33333333333334]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1", "isController": false}, {"data": [[1.5949677E12, 281.6666666666667]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0", "isController": false}, {"data": [[1.59496764E12, 2868.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[1.59496764E12, 2052.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[1.59496764E12, 2816.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[1.59496764E12, 2248.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[1.59496758E12, 4176.0]], "isOverall": false, "label": "13 - Relacion Crear", "isController": true}, {"data": [[1.59496764E12, 3097.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[1.59496764E12, 1719.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160", "isController": false}, {"data": [[1.59496764E12, 4885.666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[1.59496746E12, 493.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[1.59496746E12, 834.3333333333334]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20", "isController": false}, {"data": [[1.59496746E12, 1409.6666666666667]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21", "isController": false}, {"data": [[1.59496746E12, 1577.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22", "isController": false}, {"data": [[1.59496746E12, 1871.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23", "isController": false}, {"data": [[1.59496746E12, 4234.333333333333]], "isOverall": false, "label": "6 - Nuevo Cliente", "isController": true}, {"data": [[1.59496746E12, 1343.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24", "isController": false}, {"data": [[1.59496746E12, 1211.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25", "isController": false}, {"data": [[1.59496746E12, 1442.6666666666667]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26", "isController": false}, {"data": [[1.59496746E12, 1445.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27", "isController": false}, {"data": [[1.59496746E12, 1014.6666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28", "isController": false}, {"data": [[1.59496752E12, 1323.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar", "isController": true}, {"data": [[1.59496746E12, 502.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29", "isController": false}, {"data": [[1.59496752E12, 717.0]], "isOverall": false, "label": "9 - Domicilio Crear-43", "isController": false}, {"data": [[1.59496752E12, 1434.0]], "isOverall": false, "label": "10 - Formulario Domicilio-76", "isController": false}, {"data": [[1.59496752E12, 1566.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-75", "isController": false}, {"data": [[1.59496752E12, 2370.3333333333335]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[1.59496746E12, 97.0]], "isOverall": false, "label": "2 - Login-7-1", "isController": false}, {"data": [[1.59496746E12, 381.6666666666667]], "isOverall": false, "label": "2 - Login-7-0", "isController": false}, {"data": [[1.5949677E12, 194.66666666666666]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1", "isController": false}, {"data": [[1.59496758E12, 2167.6666666666665]], "isOverall": false, "label": "12 - Formulario Contactos Guardar", "isController": true}, {"data": [[1.5949677E12, 377.33333333333337]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0", "isController": false}, {"data": [[1.59496752E12, 585.6666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38", "isController": false}, {"data": [[1.59496752E12, 11441.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37", "isController": false}, {"data": [[1.59496752E12, 9654.416666666666], [1.59496746E12, 1840.875]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[1.5949677E12, 5621.0], [1.59496764E12, 8268.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[1.59496752E12, 226.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78", "isController": false}, {"data": [[1.59496746E12, 585.3333333333334]], "isOverall": false, "label": "3 - Operaciones del Sistema", "isController": true}, {"data": [[1.59496752E12, 2169.5]], "isOverall": false, "label": "8 - Formulario Datos de Cliente", "isController": true}, {"data": [[1.59496752E12, 1097.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77", "isController": false}, {"data": [[1.59496746E12, 1336.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19", "isController": false}, {"data": [[1.59496752E12, 1000.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-63", "isController": false}, {"data": [[1.59496752E12, 1366.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-62", "isController": false}, {"data": [[1.59496752E12, 283.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-61", "isController": false}, {"data": [[1.59496752E12, 792.6666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-60", "isController": false}, {"data": [[1.59496758E12, 1423.0]], "isOverall": false, "label": "11 - Contactos Crear-81", "isController": false}, {"data": [[1.59496758E12, 522.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[1.59496758E12, 1599.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[1.59496752E12, 691.0], [1.59496758E12, 765.0]], "isOverall": false, "label": "11 - Contactos Crear-80", "isController": false}, {"data": [[1.59496758E12, 643.3333333333334]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[1.59496752E12, 852.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39", "isController": false}, {"data": [[1.59496758E12, 1645.6666666666667]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[1.59496758E12, 1597.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -90", "isController": false}, {"data": [[1.59496758E12, 1791.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -91", "isController": false}, {"data": [[1.59496758E12, 819.3333333333334]], "isOverall": false, "label": "14 - Formulario Relacion -92", "isController": false}, {"data": [[1.59496758E12, 1145.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -93", "isController": false}, {"data": [[1.59496758E12, 1255.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -94", "isController": false}, {"data": [[1.59496758E12, 1144.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -95", "isController": false}, {"data": [[1.5949677E12, 996.0]], "isOverall": false, "label": "20 - Cerrar  Persona-175", "isController": false}, {"data": [[1.59496758E12, 926.3333333333334]], "isOverall": false, "label": "14 - Formulario Relacion -96", "isController": false}, {"data": [[1.5949677E12, 609.0]], "isOverall": false, "label": "20 - Cerrar  Persona-176", "isController": false}, {"data": [[1.59496758E12, 1333.0]], "isOverall": false, "label": "14 - Formulario Relacion -97", "isController": false}, {"data": [[1.59496746E12, 135.33333333333334]], "isOverall": false, "label": "4 - Mod de Personas", "isController": true}, {"data": [[1.59496758E12, 1163.0]], "isOverall": false, "label": "14 - Formulario Relacion -98", "isController": false}, {"data": [[1.59496752E12, 558.3333333333334]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40", "isController": false}, {"data": [[1.59496758E12, 1315.0]], "isOverall": false, "label": "14 - Formulario Relacion -99", "isController": false}, {"data": [[1.59496752E12, 870.6666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-59", "isController": false}, {"data": [[1.59496746E12, 183.0]], "isOverall": false, "label": "1 - Index-1", "isController": false}, {"data": [[1.59496746E12, 759.0]], "isOverall": false, "label": "1 - Index", "isController": true}, {"data": [[1.59496752E12, 681.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-58", "isController": false}, {"data": [[1.5949677E12, 572.6666666666666]], "isOverall": false, "label": "20 - Cerrar  Persona-177", "isController": false}, {"data": [[1.5949677E12, 198519.66666666666]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59496752E12, 345.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-57", "isController": false}, {"data": [[1.5949677E12, 403.0]], "isOverall": false, "label": "20 - Cerrar  Persona-178", "isController": false}, {"data": [[1.59496752E12, 755.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-56", "isController": false}, {"data": [[1.59496752E12, 739.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-55", "isController": false}, {"data": [[1.59496752E12, 973.0]], "isOverall": false, "label": "10 - Formulario Domicilio-54", "isController": false}, {"data": [[1.59496752E12, 900.0]], "isOverall": false, "label": "10 - Formulario Domicilio-53", "isController": false}, {"data": [[1.59496752E12, 1134.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-74", "isController": false}, {"data": [[1.59496752E12, 1460.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-73", "isController": false}, {"data": [[1.59496752E12, 2365.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-72", "isController": false}, {"data": [[1.59496764E12, 1818.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[1.59496752E12, 722.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-71", "isController": false}, {"data": [[1.59496752E12, 1919.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-70", "isController": false}, {"data": [[1.5949677E12, 68784.0], [1.59496764E12, 34085.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales", "isController": true}, {"data": [[1.5949677E12, 97.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183", "isController": false}, {"data": [[1.59496752E12, 10628.000000000002]], "isOverall": false, "label": "10 - Formulario Domicilio", "isController": true}, {"data": [[1.5949677E12, 377.33333333333337]], "isOverall": false, "label": "21 - Cerrar  Insis-185", "isController": false}, {"data": [[1.59496764E12, 2201.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[1.59496764E12, 866.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[1.59496752E12, 12026.666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar", "isController": true}, {"data": [[1.59496746E12, 129.66666666666666]], "isOverall": false, "label": "1 - Index-1-1", "isController": false}, {"data": [[1.59496746E12, 565.3333333333334]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30", "isController": false}, {"data": [[1.59496752E12, 943.0], [1.59496758E12, 1240.0]], "isOverall": false, "label": "11 - Contactos Crear-79", "isController": false}, {"data": [[1.59496746E12, 1091.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31", "isController": false}, {"data": [[1.59496746E12, 642.6666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32", "isController": false}, {"data": [[1.59496746E12, 610.6666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33", "isController": false}, {"data": [[1.59496752E12, 1967.6666666666667]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34", "isController": false}, {"data": [[1.59496752E12, 1729.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35", "isController": false}, {"data": [[1.59496752E12, 1149.6666666666667]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36", "isController": false}, {"data": [[1.5949677E12, 281.6666666666667]], "isOverall": false, "label": "21 - Cerrar  Insis-182", "isController": false}, {"data": [[1.5949677E12, 2580.6666666666665]], "isOverall": false, "label": "20 - Cerrar  Persona", "isController": true}, {"data": [[1.59496752E12, 1783.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-69", "isController": false}, {"data": [[1.59496752E12, 1287.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-68", "isController": false}, {"data": [[1.59496758E12, 15865.833333333332]], "isOverall": false, "label": "14 - Formulario Relacion ", "isController": true}, {"data": [[1.59496746E12, 507.0]], "isOverall": false, "label": "5 - Clientes-14", "isController": false}, {"data": [[1.59496752E12, 328.0]], "isOverall": false, "label": "10 - Formulario Domicilio-67", "isController": false}, {"data": [[1.59496746E12, 982.0]], "isOverall": false, "label": "5 - Clientes-13", "isController": false}, {"data": [[1.59496752E12, 1140.0]], "isOverall": false, "label": "10 - Formulario Domicilio-66", "isController": false}, {"data": [[1.59496752E12, 583.0]], "isOverall": false, "label": "10 - Formulario Domicilio-65", "isController": false}, {"data": [[1.59496746E12, 183.0]], "isOverall": false, "label": "1 - Index-1-0", "isController": false}, {"data": [[1.59496752E12, 621.6666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-64", "isController": false}, {"data": [[1.59496758E12, 1477.3333333333333]], "isOverall": false, "label": "12 - Formulario Contactos-82", "isController": false}, {"data": [[1.59496746E12, 135.33333333333334]], "isOverall": false, "label": "4 - Mod de Personas-12", "isController": false}, {"data": [[1.59496746E12, 845.6666666666666]], "isOverall": false, "label": "6 - Nuevo Cliente-16", "isController": false}, {"data": [[1.59496764E12, 2750.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159", "isController": false}, {"data": [[1.59496746E12, 340.6666666666667]], "isOverall": false, "label": "6 - Nuevo Cliente-17", "isController": false}, {"data": [[1.59496764E12, 2849.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[1.59496758E12, 2932.8333333333335]], "isOverall": false, "label": "12 - Formulario Contactos", "isController": true}, {"data": [[1.59496764E12, 2035.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157", "isController": false}, {"data": [[1.59496746E12, 1586.3333333333333]], "isOverall": false, "label": "6 - Nuevo Cliente-15", "isController": false}, {"data": [[1.59496764E12, 1825.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156", "isController": false}, {"data": [[1.5949677E12, 3847.5], [1.59496764E12, 3372.0]], "isOverall": false, "label": "19 - Grabar Persona-173", "isController": false}, {"data": [[1.5949677E12, 669.5], [1.59496764E12, 723.0]], "isOverall": false, "label": "19 - Grabar Persona-174", "isController": false}, {"data": [[1.59496752E12, 33924.333333333336]], "isOverall": false, "label": "9 - Domicilio Crear", "isController": true}, {"data": [[1.59496758E12, 932.3333333333334]], "isOverall": false, "label": "17 - Campos Adicionales-140", "isController": false}, {"data": [[1.59496758E12, 2072.6666666666665]], "isOverall": false, "label": "17 - Campos Adicionales-141", "isController": false}, {"data": [[1.59496758E12, 1463.6666666666667]], "isOverall": false, "label": "13 - Relacion Crear-86", "isController": false}, {"data": [[1.59496758E12, 571.6666666666666]], "isOverall": false, "label": "13 - Relacion Crear-87", "isController": false}, {"data": [[1.5949677E12, 756.0]], "isOverall": false, "label": "21 - Cerrar  Insis", "isController": true}, {"data": [[1.59496758E12, 3180.6666666666665]], "isOverall": false, "label": "11 - Contactos Crear", "isController": true}, {"data": [[1.59496758E12, 1802.0]], "isOverall": false, "label": "17 - Campos Adicionales-139", "isController": false}, {"data": [[1.59496764E12, 2474.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155", "isController": false}, {"data": [[1.59496764E12, 1481.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154", "isController": false}, {"data": [[1.59496764E12, 2095.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153", "isController": false}, {"data": [[1.59496764E12, 2269.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152", "isController": false}, {"data": [[1.59496758E12, 2140.6666666666665]], "isOverall": false, "label": "13 - Relacion Crear-88", "isController": false}, {"data": [[1.59496764E12, 2677.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[1.59496764E12, 2097.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150", "isController": false}, {"data": [[1.59496752E12, 1424.0]], "isOverall": false, "label": "10 - Formulario Domicilio-52", "isController": false}, {"data": [[1.59496752E12, 279.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-51", "isController": false}, {"data": [[1.59496752E12, 776.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-50", "isController": false}, {"data": [[1.59496764E12, 2612.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149", "isController": false}, {"data": [[1.59496746E12, 111.33333333333333]], "isOverall": false, "label": "2 - Login-9-0", "isController": false}, {"data": [[1.59496746E12, 1489.0]], "isOverall": false, "label": "5 - Clientes", "isController": true}, {"data": [[1.59496758E12, 11353.666666666666]], "isOverall": false, "label": "17 - Campos Adicionales", "isController": true}, {"data": [[1.59496764E12, 2687.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[1.59496758E12, 2890.3333333333335]], "isOverall": false, "label": "17 - Campos Adicionales-136", "isController": false}, {"data": [[1.59496758E12, 2390.0], [1.59496764E12, 2034.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[1.59496752E12, 1823.3333333333333]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41", "isController": false}, {"data": [[1.59496758E12, 830.6666666666666]], "isOverall": false, "label": "17 - Campos Adicionales-137", "isController": false}, {"data": [[1.59496758E12, 2370.5], [1.59496764E12, 2963.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[1.59496752E12, 547.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42", "isController": false}, {"data": [[1.59496758E12, 2825.6666666666665]], "isOverall": false, "label": "17 - Campos Adicionales-138", "isController": false}, {"data": [[1.59496758E12, 1668.0], [1.59496764E12, 2332.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[1.59496746E12, 576.0]], "isOverall": false, "label": "Inicio - -10", "isController": false}, {"data": [[1.59496746E12, 4589.333333333333]], "isOverall": false, "label": "2 - Login-9-1", "isController": false}, {"data": [[1.5949677E12, 100.66666666666667]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1", "isController": false}, {"data": [[1.5949677E12, 97.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0", "isController": false}, {"data": [[1.59496746E12, 111.33333333333333]], "isOverall": false, "label": "2 - Login-9", "isController": false}, {"data": [[1.59496746E12, 381.6666666666667]], "isOverall": false, "label": "2 - Login-7", "isController": false}, {"data": [[1.5949677E12, 1033.0], [1.59496764E12, 1485.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[1.5949677E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.5949677E12, 941.0], [1.59496764E12, 560.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[1.59496764E12, 3563.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[1.59496746E12, 585.3333333333334]], "isOverall": false, "label": "3 - Operaciones del Sistema-11", "isController": false}, {"data": [[1.59496752E12, 917.6666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-49", "isController": false}, {"data": [[1.59496758E12, 1848.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[1.59496752E12, 674.0]], "isOverall": false, "label": "10 - Formulario Domicilio-48", "isController": false}, {"data": [[1.59496758E12, 1720.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -89", "isController": false}, {"data": [[1.59496758E12, 1284.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -100", "isController": false}, {"data": [[1.59496758E12, 1175.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[1.59496746E12, 1461.6666666666667]], "isOverall": false, "label": "6 - Nuevo Cliente-18", "isController": false}, {"data": [[1.59496752E12, 271.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-47", "isController": false}, {"data": [[1.59496758E12, 1656.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -101", "isController": false}, {"data": [[1.59496758E12, 1883.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[1.59496752E12, 552.6666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-46", "isController": false}, {"data": [[1.59496758E12, 1209.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -102", "isController": false}, {"data": [[1.59496752E12, 761.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-45", "isController": false}, {"data": [[1.59496758E12, 1120.0]], "isOverall": false, "label": "14 - Formulario Relacion -103", "isController": false}, {"data": [[1.59496752E12, 1172.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-44", "isController": false}, {"data": [[1.59496758E12, 1110.3333333333333]], "isOverall": false, "label": "12 - Formulario Contactos-83", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.5949677E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.59496746E12, "maxY": 25860.333333333332, "series": [{"data": [[1.59496758E12, 431.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion Guardar", "isController": true}, {"data": [[1.5949677E12, 636.5], [1.59496764E12, 718.0]], "isOverall": false, "label": "19 - Grabar Persona", "isController": true}, {"data": [[1.59496764E12, 358.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[1.5949677E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2", "isController": false}, {"data": [[1.5949677E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1", "isController": false}, {"data": [[1.5949677E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0", "isController": false}, {"data": [[1.59496764E12, 102.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[1.59496764E12, 319.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[1.59496764E12, 245.66666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[1.59496764E12, 387.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[1.59496758E12, 594.0]], "isOverall": false, "label": "13 - Relacion Crear", "isController": true}, {"data": [[1.59496764E12, 248.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[1.59496764E12, 216.33333333333334]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160", "isController": false}, {"data": [[1.59496764E12, 716.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[1.59496746E12, 222.33333333333334]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20", "isController": false}, {"data": [[1.59496746E12, 111.33333333333334]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21", "isController": false}, {"data": [[1.59496746E12, 103.66666666666667]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22", "isController": false}, {"data": [[1.59496746E12, 206.66666666666669]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23", "isController": false}, {"data": [[1.59496746E12, 415.3333333333333]], "isOverall": false, "label": "6 - Nuevo Cliente", "isController": true}, {"data": [[1.59496746E12, 388.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24", "isController": false}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25", "isController": false}, {"data": [[1.59496746E12, 467.6666666666667]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26", "isController": false}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27", "isController": false}, {"data": [[1.59496746E12, 329.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28", "isController": false}, {"data": [[1.59496752E12, 389.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar", "isController": true}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "9 - Domicilio Crear-43", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-76", "isController": false}, {"data": [[1.59496752E12, 345.0]], "isOverall": false, "label": "10 - Formulario Domicilio-75", "isController": false}, {"data": [[1.59496752E12, 638.6666666666666]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "2 - Login-7-1", "isController": false}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "2 - Login-7-0", "isController": false}, {"data": [[1.5949677E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1", "isController": false}, {"data": [[1.59496758E12, 443.6666666666667]], "isOverall": false, "label": "12 - Formulario Contactos Guardar", "isController": true}, {"data": [[1.5949677E12, 258.33333333333337]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0", "isController": false}, {"data": [[1.59496752E12, 312.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38", "isController": false}, {"data": [[1.59496752E12, 240.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37", "isController": false}, {"data": [[1.59496752E12, 1067.4166666666667], [1.59496746E12, 248.8333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[1.5949677E12, 667.0], [1.59496764E12, 893.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78", "isController": false}, {"data": [[1.59496746E12, 391.3333333333333]], "isOverall": false, "label": "3 - Operaciones del Sistema", "isController": true}, {"data": [[1.59496752E12, 319.33333333333337]], "isOverall": false, "label": "8 - Formulario Datos de Cliente", "isController": true}, {"data": [[1.59496752E12, 389.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77", "isController": false}, {"data": [[1.59496746E12, 105.33333333333334]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19", "isController": false}, {"data": [[1.59496752E12, 328.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-63", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-62", "isController": false}, {"data": [[1.59496752E12, 99.66666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-61", "isController": false}, {"data": [[1.59496752E12, 104.0]], "isOverall": false, "label": "10 - Formulario Domicilio-60", "isController": false}, {"data": [[1.59496758E12, 0.0]], "isOverall": false, "label": "11 - Contactos Crear-81", "isController": false}, {"data": [[1.59496758E12, 118.33333333333334]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[1.59496758E12, 107.66666666666666]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[1.59496752E12, 375.5], [1.59496758E12, 340.0]], "isOverall": false, "label": "11 - Contactos Crear-80", "isController": false}, {"data": [[1.59496758E12, 323.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39", "isController": false}, {"data": [[1.59496758E12, 325.3333333333333]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[1.59496758E12, 133.0]], "isOverall": false, "label": "14 - Formulario Relacion -90", "isController": false}, {"data": [[1.59496758E12, 245.66666666666669]], "isOverall": false, "label": "14 - Formulario Relacion -91", "isController": false}, {"data": [[1.59496758E12, 216.66666666666666]], "isOverall": false, "label": "14 - Formulario Relacion -92", "isController": false}, {"data": [[1.59496758E12, 101.33333333333334]], "isOverall": false, "label": "14 - Formulario Relacion -93", "isController": false}, {"data": [[1.59496758E12, 144.0]], "isOverall": false, "label": "14 - Formulario Relacion -94", "isController": false}, {"data": [[1.59496758E12, 208.0]], "isOverall": false, "label": "14 - Formulario Relacion -95", "isController": false}, {"data": [[1.5949677E12, 0.0]], "isOverall": false, "label": "20 - Cerrar  Persona-175", "isController": false}, {"data": [[1.59496758E12, 103.0]], "isOverall": false, "label": "14 - Formulario Relacion -96", "isController": false}, {"data": [[1.5949677E12, 0.0]], "isOverall": false, "label": "20 - Cerrar  Persona-176", "isController": false}, {"data": [[1.59496758E12, 270.0]], "isOverall": false, "label": "14 - Formulario Relacion -97", "isController": false}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "4 - Mod de Personas", "isController": true}, {"data": [[1.59496758E12, 108.33333333333334]], "isOverall": false, "label": "14 - Formulario Relacion -98", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40", "isController": false}, {"data": [[1.59496758E12, 222.0]], "isOverall": false, "label": "14 - Formulario Relacion -99", "isController": false}, {"data": [[1.59496752E12, 107.0]], "isOverall": false, "label": "10 - Formulario Domicilio-59", "isController": false}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "1 - Index-1", "isController": false}, {"data": [[1.59496746E12, 469.6666666666667]], "isOverall": false, "label": "1 - Index", "isController": true}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-58", "isController": false}, {"data": [[1.5949677E12, 441.3333333333333]], "isOverall": false, "label": "20 - Cerrar  Persona-177", "isController": false}, {"data": [[1.5949677E12, 25860.333333333332]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59496752E12, 102.66666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-57", "isController": false}, {"data": [[1.5949677E12, 0.0]], "isOverall": false, "label": "20 - Cerrar  Persona-178", "isController": false}, {"data": [[1.59496752E12, 150.33333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-56", "isController": false}, {"data": [[1.59496752E12, 100.33333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-55", "isController": false}, {"data": [[1.59496752E12, 216.66666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-54", "isController": false}, {"data": [[1.59496752E12, 131.33333333333331]], "isOverall": false, "label": "10 - Formulario Domicilio-53", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-74", "isController": false}, {"data": [[1.59496752E12, 313.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-73", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-72", "isController": false}, {"data": [[1.59496764E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[1.59496752E12, 417.0]], "isOverall": false, "label": "10 - Formulario Domicilio-71", "isController": false}, {"data": [[1.59496752E12, 106.0]], "isOverall": false, "label": "10 - Formulario Domicilio-70", "isController": false}, {"data": [[1.5949677E12, 9014.0], [1.59496764E12, 4059.375]], "isOverall": false, "label": "18 - Formulario Campos Adicionales", "isController": true}, {"data": [[1.5949677E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183", "isController": false}, {"data": [[1.59496752E12, 1372.4444444444443]], "isOverall": false, "label": "10 - Formulario Domicilio", "isController": true}, {"data": [[1.5949677E12, 258.33333333333337]], "isOverall": false, "label": "21 - Cerrar  Insis-185", "isController": false}, {"data": [[1.59496764E12, 325.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[1.59496764E12, 391.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[1.59496752E12, 552.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar", "isController": true}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "1 - Index-1-1", "isController": false}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30", "isController": false}, {"data": [[1.59496752E12, 0.0], [1.59496758E12, 0.0]], "isOverall": false, "label": "11 - Contactos Crear-79", "isController": false}, {"data": [[1.59496746E12, 384.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31", "isController": false}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32", "isController": false}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33", "isController": false}, {"data": [[1.59496752E12, 318.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34", "isController": false}, {"data": [[1.59496752E12, 276.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35", "isController": false}, {"data": [[1.59496752E12, 105.33333333333334]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36", "isController": false}, {"data": [[1.5949677E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182", "isController": false}, {"data": [[1.5949677E12, 441.3333333333333]], "isOverall": false, "label": "20 - Cerrar  Persona", "isController": true}, {"data": [[1.59496752E12, 270.0]], "isOverall": false, "label": "10 - Formulario Domicilio-69", "isController": false}, {"data": [[1.59496752E12, 102.66666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-68", "isController": false}, {"data": [[1.59496758E12, 2360.1666666666665]], "isOverall": false, "label": "14 - Formulario Relacion ", "isController": true}, {"data": [[1.59496746E12, 313.3333333333333]], "isOverall": false, "label": "5 - Clientes-14", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-67", "isController": false}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "5 - Clientes-13", "isController": false}, {"data": [[1.59496752E12, 330.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-66", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-65", "isController": false}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "1 - Index-1-0", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-64", "isController": false}, {"data": [[1.59496758E12, 333.0]], "isOverall": false, "label": "12 - Formulario Contactos-82", "isController": false}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "4 - Mod de Personas-12", "isController": false}, {"data": [[1.59496746E12, 208.66666666666666]], "isOverall": false, "label": "6 - Nuevo Cliente-16", "isController": false}, {"data": [[1.59496764E12, 385.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159", "isController": false}, {"data": [[1.59496746E12, 104.66666666666666]], "isOverall": false, "label": "6 - Nuevo Cliente-17", "isController": false}, {"data": [[1.59496764E12, 451.33333333333337]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[1.59496758E12, 388.33333333333337]], "isOverall": false, "label": "12 - Formulario Contactos", "isController": true}, {"data": [[1.59496764E12, 238.66666666666669]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157", "isController": false}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "6 - Nuevo Cliente-15", "isController": false}, {"data": [[1.59496764E12, 247.66666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156", "isController": false}, {"data": [[1.5949677E12, 314.5], [1.59496764E12, 313.0]], "isOverall": false, "label": "19 - Grabar Persona-173", "isController": false}, {"data": [[1.5949677E12, 322.0], [1.59496764E12, 405.0]], "isOverall": false, "label": "19 - Grabar Persona-174", "isController": false}, {"data": [[1.59496752E12, 4506.666666666667]], "isOverall": false, "label": "9 - Domicilio Crear", "isController": true}, {"data": [[1.59496758E12, 357.6666666666667]], "isOverall": false, "label": "17 - Campos Adicionales-140", "isController": false}, {"data": [[1.59496758E12, 0.0]], "isOverall": false, "label": "17 - Campos Adicionales-141", "isController": false}, {"data": [[1.59496758E12, 247.33333333333334]], "isOverall": false, "label": "13 - Relacion Crear-86", "isController": false}, {"data": [[1.59496758E12, 136.0]], "isOverall": false, "label": "13 - Relacion Crear-87", "isController": false}, {"data": [[1.5949677E12, 258.33333333333337]], "isOverall": false, "label": "21 - Cerrar  Insis", "isController": true}, {"data": [[1.59496758E12, 363.6666666666667]], "isOverall": false, "label": "11 - Contactos Crear", "isController": true}, {"data": [[1.59496758E12, 415.6666666666667]], "isOverall": false, "label": "17 - Campos Adicionales-139", "isController": false}, {"data": [[1.59496764E12, 209.33333333333334]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155", "isController": false}, {"data": [[1.59496764E12, 218.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154", "isController": false}, {"data": [[1.59496764E12, 362.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153", "isController": false}, {"data": [[1.59496764E12, 373.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152", "isController": false}, {"data": [[1.59496758E12, 210.66666666666666]], "isOverall": false, "label": "13 - Relacion Crear-88", "isController": false}, {"data": [[1.59496764E12, 336.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[1.59496764E12, 232.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150", "isController": false}, {"data": [[1.59496752E12, 231.33333333333331]], "isOverall": false, "label": "10 - Formulario Domicilio-52", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-51", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-50", "isController": false}, {"data": [[1.59496764E12, 377.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149", "isController": false}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "2 - Login-9-0", "isController": false}, {"data": [[1.59496746E12, 313.3333333333333]], "isOverall": false, "label": "5 - Clientes", "isController": true}, {"data": [[1.59496758E12, 1109.6666666666667]], "isOverall": false, "label": "17 - Campos Adicionales", "isController": true}, {"data": [[1.59496764E12, 238.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[1.59496758E12, 0.0]], "isOverall": false, "label": "17 - Campos Adicionales-136", "isController": false}, {"data": [[1.59496758E12, 0.0], [1.59496764E12, 315.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[1.59496752E12, 323.3333333333333]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41", "isController": false}, {"data": [[1.59496758E12, 336.3333333333333]], "isOverall": false, "label": "17 - Campos Adicionales-137", "isController": false}, {"data": [[1.59496758E12, 366.5], [1.59496764E12, 378.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[1.59496752E12, 315.3333333333333]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42", "isController": false}, {"data": [[1.59496758E12, 0.0]], "isOverall": false, "label": "17 - Campos Adicionales-138", "isController": false}, {"data": [[1.59496758E12, 0.0], [1.59496764E12, 378.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[1.59496746E12, 469.6666666666667]], "isOverall": false, "label": "Inicio - -10", "isController": false}, {"data": [[1.59496746E12, 111.66666666666666]], "isOverall": false, "label": "2 - Login-9-1", "isController": false}, {"data": [[1.5949677E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1", "isController": false}, {"data": [[1.5949677E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0", "isController": false}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "2 - Login-9", "isController": false}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "2 - Login-7", "isController": false}, {"data": [[1.5949677E12, 0.0], [1.59496764E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[1.5949677E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.5949677E12, 367.0], [1.59496764E12, 344.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[1.59496764E12, 107.66666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[1.59496746E12, 391.3333333333333]], "isOverall": false, "label": "3 - Operaciones del Sistema-11", "isController": false}, {"data": [[1.59496752E12, 341.0]], "isOverall": false, "label": "10 - Formulario Domicilio-49", "isController": false}, {"data": [[1.59496758E12, 215.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-48", "isController": false}, {"data": [[1.59496758E12, 374.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -89", "isController": false}, {"data": [[1.59496758E12, 105.66666666666666]], "isOverall": false, "label": "14 - Formulario Relacion -100", "isController": false}, {"data": [[1.59496758E12, 107.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[1.59496746E12, 102.0]], "isOverall": false, "label": "6 - Nuevo Cliente-18", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-47", "isController": false}, {"data": [[1.59496758E12, 255.33333333333331]], "isOverall": false, "label": "14 - Formulario Relacion -101", "isController": false}, {"data": [[1.59496758E12, 309.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-46", "isController": false}, {"data": [[1.59496758E12, 150.33333333333331]], "isOverall": false, "label": "14 - Formulario Relacion -102", "isController": false}, {"data": [[1.59496752E12, 320.0]], "isOverall": false, "label": "10 - Formulario Domicilio-45", "isController": false}, {"data": [[1.59496758E12, 218.33333333333334]], "isOverall": false, "label": "14 - Formulario Relacion -103", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-44", "isController": false}, {"data": [[1.59496758E12, 0.0]], "isOverall": false, "label": "12 - Formulario Contactos-83", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.5949677E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.59496746E12, "maxY": 12375.0, "series": [{"data": [[1.59496752E12, 12375.0], [1.5949677E12, 4614.0], [1.59496758E12, 5809.0], [1.59496746E12, 5650.0], [1.59496764E12, 4391.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.59496752E12, 163.0], [1.5949677E12, 1.0], [1.59496758E12, 503.0], [1.59496746E12, 96.0], [1.59496764E12, 750.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.59496752E12, 2016.0], [1.5949677E12, 1132.4000000000005], [1.59496758E12, 2701.0], [1.59496746E12, 1976.0], [1.59496764E12, 3283.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.59496752E12, 12224.999999999998], [1.5949677E12, 4614.0], [1.59496758E12, 5739.500000000004], [1.59496746E12, 5650.0], [1.59496764E12, 4391.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.59496752E12, 2332.0], [1.5949677E12, 2367.9999999999955], [1.59496758E12, 3096.5], [1.59496746E12, 4168.0], [1.59496764E12, 3523.0]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.5949677E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 114.0, "minX": 1.0, "maxY": 1739.5, "series": [{"data": [[2.0, 1739.5], [4.0, 875.5], [1.0, 1630.0], [8.0, 205.5], [5.0, 739.5], [11.0, 114.0], [3.0, 1399.5], [6.0, 652.0], [14.0, 243.5], [7.0, 158.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 14.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 105.0, "minX": 1.0, "maxY": 1621.0, "series": [{"data": [[2.0, 1554.5], [4.0, 786.5], [1.0, 1621.0], [8.0, 113.5], [5.0, 671.5], [11.0, 105.0], [3.0, 1277.0], [6.0, 567.5], [14.0, 137.0], [7.0, 135.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 14.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.8, "minX": 1.59496746E12, "maxY": 2.316666666666667, "series": [{"data": [[1.59496752E12, 2.316666666666667], [1.5949677E12, 0.8], [1.59496758E12, 1.8166666666666667], [1.59496746E12, 1.7], [1.59496764E12, 1.3166666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.5949677E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.15, "minX": 1.59496746E12, "maxY": 2.316666666666667, "series": [{"data": [[1.59496752E12, 2.316666666666667], [1.5949677E12, 0.65], [1.59496758E12, 1.8166666666666667], [1.59496746E12, 1.5], [1.59496764E12, 1.3166666666666667]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.5949677E12, 0.2], [1.59496746E12, 0.15]], "isOverall": false, "label": "302", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.5949677E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.59496746E12, "maxY": 0.4, "series": [{"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "17 - Campos Adicionales-140-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-58-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-73-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "14 - Formulario Relacion -90-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152-success", "isController": false}, {"data": [[1.59496752E12, 0.15]], "isOverall": false, "label": "10 - Formulario Domicilio-success", "isController": true}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "17 - Campos Adicionales-138-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "14 - Formulario Relacion -94-success", "isController": false}, {"data": [[1.5949677E12, 0.016666666666666666], [1.59496764E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-67-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-54-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "6 - Nuevo Cliente-15-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "2 - Login-7-success", "isController": false}, {"data": [[1.59496752E12, 0.03333333333333333], [1.59496758E12, 0.016666666666666666]], "isOverall": false, "label": "11 - Contactos Crear-80-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-64-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "14 - Formulario Relacion -98-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-49-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "12 - Formulario Contactos-83-success", "isController": false}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "20 - Cerrar  Persona-success", "isController": true}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-success", "isController": true}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-50-success", "isController": false}, {"data": [[1.59496752E12, 0.03333333333333333], [1.59496758E12, 0.016666666666666666]], "isOverall": false, "label": "11 - Contactos Crear-79-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143-success", "isController": false}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "1 - Index-success", "isController": true}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "13 - Relacion Crear-88-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "1 - Index-1-1-success", "isController": false}, {"data": [[1.59496758E12, 0.016666666666666666], [1.59496764E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "9 - Domicilio Crear-success", "isController": true}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-60-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "4 - Mod de Personas-12-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-45-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "14 - Formulario Relacion -100-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-76-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-57-success", "isController": false}, {"data": [[1.5949677E12, 0.016666666666666666], [1.59496764E12, 0.13333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-success", "isController": true}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "Inicio - -10-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-success", "isController": true}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "6 - Nuevo Cliente-16-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "4 - Mod de Personas-success", "isController": true}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "5 - Clientes-13-success", "isController": false}, {"data": [[1.5949677E12, 0.03333333333333333], [1.59496764E12, 0.016666666666666666]], "isOverall": false, "label": "19 - Grabar Persona-174-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "14 - Formulario Relacion -91-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-74-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "2 - Login-7-0-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-53-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153-success", "isController": false}, {"data": [[1.5949677E12, 0.016666666666666666], [1.59496764E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "17 - Campos Adicionales-137-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-70-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-68-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "5 - Clientes-success", "isController": true}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "20 - Cerrar  Persona-176-success", "isController": false}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "Transaction Controller-success", "isController": true}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "21 - Cerrar  Insis-183-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-48-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144-success", "isController": false}, {"data": [[1.5949677E12, 0.016666666666666666], [1.59496764E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-success", "isController": true}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "14 - Formulario Relacion -95-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "14 - Formulario Relacion -103-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-65-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161-success", "isController": false}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166-success", "isController": false}, {"data": [[1.59496758E12, 0.1]], "isOverall": false, "label": "12 - Formulario Contactos-success", "isController": true}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "11 - Contactos Crear-success", "isController": true}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-success", "isController": true}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "1 - Index-1-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "12 - Formulario Contactos-82-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-44-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-61-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "14 - Formulario Relacion -99-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "2 - Login-7-1-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "3 - Operaciones del Sistema-success", "isController": true}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "5 - Clientes-14-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "6 - Nuevo Cliente-17-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-71-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-success", "isController": true}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-56-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "6 - Nuevo Cliente-success", "isController": true}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-success", "isController": true}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-69-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "14 - Formulario Relacion -92-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-52-success", "isController": false}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "20 - Cerrar  Persona-178-success", "isController": false}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "2 - Login-9-0-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157-success", "isController": false}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "20 - Cerrar  Persona-175-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-66-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "2 - Login-success", "isController": true}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-47-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "14 - Formulario Relacion -102-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "14 - Formulario Relacion -96-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37-success", "isController": false}, {"data": [[1.59496758E12, 0.03333333333333333], [1.59496764E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-success", "isController": true}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "2 - Login-9-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-62-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "13 - Relacion Crear-86-success", "isController": false}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164-success", "isController": false}, {"data": [[1.59496752E12, 0.1]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-success", "isController": true}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-59-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-72-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "14 - Formulario Relacion -89-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-55-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "6 - Nuevo Cliente-18-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "14 - Formulario Relacion -93-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160-success", "isController": false}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29-success", "isController": false}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "17 - Campos Adicionales-139-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "2 - Login-9-1-success", "isController": false}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "21 - Cerrar  Insis-182-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "17 - Campos Adicionales-success", "isController": true}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "17 - Campos Adicionales-141-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155-success", "isController": false}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "20 - Cerrar  Persona-177-success", "isController": false}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "21 - Cerrar  Insis-success", "isController": true}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "11 - Contactos Crear-81-success", "isController": false}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "21 - Cerrar  Insis-185-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-63-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "14 - Formulario Relacion -97-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "14 - Formulario Relacion -101-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142-success", "isController": false}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-51-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "17 - Campos Adicionales-136-success", "isController": false}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "Debug Sampler-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-46-success", "isController": false}, {"data": [[1.59496758E12, 0.03333333333333333], [1.59496764E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38-success", "isController": false}, {"data": [[1.5949677E12, 0.03333333333333333], [1.59496764E12, 0.016666666666666666]], "isOverall": false, "label": "19 - Grabar Persona-success", "isController": true}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "3 - Operaciones del Sistema-11-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "9 - Domicilio Crear-43-success", "isController": false}, {"data": [[1.59496758E12, 0.1]], "isOverall": false, "label": "14 - Formulario Relacion -success", "isController": true}, {"data": [[1.5949677E12, 0.03333333333333333], [1.59496764E12, 0.016666666666666666]], "isOverall": false, "label": "19 - Grabar Persona-173-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "1 - Index-1-0-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-75-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "13 - Relacion Crear-87-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163-success", "isController": false}, {"data": [[1.59496752E12, 0.2], [1.59496746E12, 0.4]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-success", "isController": true}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "13 - Relacion Crear-success", "isController": true}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.5949677E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 1.0666666666666667, "minX": 1.59496746E12, "maxY": 2.966666666666667, "series": [{"data": [[1.59496752E12, 2.966666666666667], [1.5949677E12, 1.0666666666666667], [1.59496758E12, 2.2666666666666666], [1.59496746E12, 2.35], [1.59496764E12, 1.55]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.5949677E12, "title": "Total Transactions Per Second"}},
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
