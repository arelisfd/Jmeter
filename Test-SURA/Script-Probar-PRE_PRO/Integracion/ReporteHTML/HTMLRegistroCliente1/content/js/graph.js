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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 3.0, "series": [{"data": [[5300.0, 1.0], [3900.0, 2.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar", "isController": true}, {"data": [[6200.0, 1.0], [7000.0, 1.0], [7900.0, 1.0]], "isOverall": false, "label": "19 - Grabar Persona", "isController": true}, {"data": [[1100.0, 1.0], [1500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2", "isController": false}, {"data": [[100.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1", "isController": false}, {"data": [[400.0, 1.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0", "isController": false}, {"data": [[1300.0, 1.0], [1400.0, 2.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[1200.0, 1.0], [1300.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[1100.0, 1.0], [1400.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[1100.0, 2.0], [700.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[9900.0, 1.0], [9800.0, 1.0], [10800.0, 1.0]], "isOverall": false, "label": "13 - Relacion Crear", "isController": true}, {"data": [[1500.0, 1.0], [1700.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[1300.0, 1.0], [800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160", "isController": false}, {"data": [[2500.0, 1.0], [2800.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[11600.0, 1.0], [12500.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[2800.0, 1.0], [3000.0, 1.0], [3200.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20", "isController": false}, {"data": [[3400.0, 1.0], [3600.0, 1.0], [3700.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21", "isController": false}, {"data": [[3100.0, 1.0], [3500.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22", "isController": false}, {"data": [[3500.0, 1.0], [3600.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23", "isController": false}, {"data": [[10800.0, 1.0], [11100.0, 1.0], [11400.0, 1.0]], "isOverall": false, "label": "6 - Nuevo Cliente", "isController": true}, {"data": [[3200.0, 2.0], [3300.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24", "isController": false}, {"data": [[2300.0, 1.0], [4000.0, 2.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25", "isController": false}, {"data": [[2700.0, 2.0], [2800.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26", "isController": false}, {"data": [[2900.0, 1.0], [3100.0, 1.0], [3300.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27", "isController": false}, {"data": [[4700.0, 1.0], [2900.0, 1.0], [3200.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28", "isController": false}, {"data": [[5100.0, 1.0], [4900.0, 1.0], [5500.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar", "isController": true}, {"data": [[2100.0, 1.0], [3200.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29", "isController": false}, {"data": [[2600.0, 1.0], [3500.0, 2.0]], "isOverall": false, "label": "9 - Domicilio Crear-43", "isController": false}, {"data": [[3500.0, 1.0], [3700.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-76", "isController": false}, {"data": [[3300.0, 1.0], [3400.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-75", "isController": false}, {"data": [[9200.0, 1.0], [8800.0, 1.0], [10500.0, 1.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[400.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "2 - Login-7-1", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "2 - Login-7-0", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1", "isController": false}, {"data": [[5500.0, 1.0], [6000.0, 1.0], [6500.0, 1.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar", "isController": true}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0", "isController": false}, {"data": [[1100.0, 1.0], [700.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38", "isController": false}, {"data": [[11700.0, 1.0], [6800.0, 1.0], [6900.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37", "isController": false}, {"data": [[8400.0, 1.0], [9100.0, 1.0], [9000.0, 1.0], [1600.0, 2.0], [2000.0, 2.0], [2100.0, 3.0], [2300.0, 1.0], [2600.0, 1.0], [2900.0, 1.0], [3100.0, 2.0], [3200.0, 2.0], [3300.0, 2.0], [3400.0, 1.0], [3500.0, 2.0], [3600.0, 2.0], [3700.0, 1.0], [57700.0, 1.0], [58600.0, 1.0], [3800.0, 1.0], [4000.0, 1.0], [65300.0, 1.0], [5000.0, 1.0], [5100.0, 1.0], [5300.0, 1.0], [6900.0, 1.0], [6800.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[6400.0, 1.0], [7100.0, 1.0], [7500.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[1200.0, 1.0], [1300.0, 1.0], [1400.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78", "isController": false}, {"data": [[600.0, 2.0], [800.0, 1.0]], "isOverall": false, "label": "3 - Operaciones del Sistema", "isController": true}, {"data": [[3100.0, 1.0], [3200.0, 1.0], [3400.0, 1.0], [14600.0, 1.0], [15200.0, 1.0], [15100.0, 1.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente", "isController": true}, {"data": [[4100.0, 1.0], [3500.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77", "isController": false}, {"data": [[3100.0, 1.0], [3200.0, 2.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19", "isController": false}, {"data": [[2400.0, 1.0], [1900.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-63", "isController": false}, {"data": [[5700.0, 2.0], [6100.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-62", "isController": false}, {"data": [[1100.0, 1.0], [1300.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-61", "isController": false}, {"data": [[3200.0, 1.0], [3400.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-60", "isController": false}, {"data": [[2700.0, 1.0], [3000.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "11 - Contactos Crear-81", "isController": false}, {"data": [[1400.0, 1.0], [1700.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[2800.0, 1.0], [3100.0, 1.0], [3200.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[1700.0, 1.0], [1800.0, 2.0]], "isOverall": false, "label": "11 - Contactos Crear-80", "isController": false}, {"data": [[2100.0, 1.0], [1100.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[2100.0, 1.0], [2800.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39", "isController": false}, {"data": [[4200.0, 1.0], [4400.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[4200.0, 1.0], [3900.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -90", "isController": false}, {"data": [[4300.0, 2.0], [3500.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -91", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -92", "isController": false}, {"data": [[3200.0, 1.0], [3500.0, 2.0]], "isOverall": false, "label": "14 - Formulario Relacion -93", "isController": false}, {"data": [[3000.0, 2.0], [3300.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -94", "isController": false}, {"data": [[3200.0, 1.0], [3500.0, 1.0], [3600.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -95", "isController": false}, {"data": [[600.0, 1.0], [1300.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "20 - Cerrar  Persona-175", "isController": false}, {"data": [[4100.0, 1.0], [4200.0, 1.0], [4500.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -96", "isController": false}, {"data": [[600.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "20 - Cerrar  Persona-176", "isController": false}, {"data": [[4100.0, 1.0], [3500.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -97", "isController": false}, {"data": [[400.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "4 - Mod de Personas", "isController": true}, {"data": [[4100.0, 1.0], [4200.0, 1.0], [4500.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -98", "isController": false}, {"data": [[3100.0, 1.0], [3200.0, 1.0], [3400.0, 1.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40", "isController": false}, {"data": [[4600.0, 1.0], [2600.0, 1.0], [3100.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -99", "isController": false}, {"data": [[2900.0, 1.0], [3200.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-59", "isController": false}, {"data": [[300.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "1 - Index-1", "isController": false}, {"data": [[700.0, 1.0], [1800.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "1 - Index", "isController": true}, {"data": [[4400.0, 1.0], [3900.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-58", "isController": false}, {"data": [[100.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "20 - Cerrar  Persona-177", "isController": false}, {"data": [[387800.0, 1.0], [387200.0, 1.0], [391800.0, 1.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1200.0, 1.0], [1300.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-57", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "20 - Cerrar  Persona-178", "isController": false}, {"data": [[3300.0, 2.0], [3900.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-56", "isController": false}, {"data": [[3700.0, 1.0], [4000.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-55", "isController": false}, {"data": [[3200.0, 1.0], [3500.0, 1.0], [3600.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-54", "isController": false}, {"data": [[3300.0, 2.0], [3700.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-53", "isController": false}, {"data": [[2800.0, 1.0], [2900.0, 1.0], [3400.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-74", "isController": false}, {"data": [[3400.0, 1.0], [3700.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-73", "isController": false}, {"data": [[4100.0, 1.0], [5000.0, 1.0], [4900.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-72", "isController": false}, {"data": [[1700.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[1200.0, 1.0], [1300.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-71", "isController": false}, {"data": [[3500.0, 1.0], [3600.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-70", "isController": false}, {"data": [[10700.0, 2.0], [11700.0, 1.0], [25200.0, 1.0], [26600.0, 1.0], [27000.0, 1.0], [58800.0, 1.0], [60000.0, 1.0], [61800.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales", "isController": true}, {"data": [[300.0, 1.0], [100.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183", "isController": false}, {"data": [[71600.0, 1.0], [72200.0, 1.0], [72500.0, 1.0], [19400.0, 1.0], [19500.0, 2.0], [7000.0, 1.0], [7100.0, 1.0], [7200.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio", "isController": true}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185", "isController": false}, {"data": [[1200.0, 1.0], [1300.0, 2.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[200.0, 1.0], [400.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[12400.0, 1.0], [7700.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar", "isController": true}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "1 - Index-1-1", "isController": false}, {"data": [[2400.0, 1.0], [2500.0, 2.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30", "isController": false}, {"data": [[4300.0, 1.0], [3000.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "11 - Contactos Crear-79", "isController": false}, {"data": [[2200.0, 2.0], [2600.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31", "isController": false}, {"data": [[2100.0, 1.0], [1800.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32", "isController": false}, {"data": [[2200.0, 1.0], [1800.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34", "isController": false}, {"data": [[2100.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35", "isController": false}, {"data": [[2600.0, 1.0], [1600.0, 2.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182", "isController": false}, {"data": [[2200.0, 1.0], [2500.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "20 - Cerrar  Persona", "isController": true}, {"data": [[2800.0, 1.0], [2900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-69", "isController": false}, {"data": [[3000.0, 1.0], [3200.0, 1.0], [3400.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-68", "isController": false}, {"data": [[55200.0, 1.0], [57200.0, 1.0], [29500.0, 1.0], [29600.0, 1.0], [57600.0, 1.0], [30200.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion ", "isController": true}, {"data": [[700.0, 1.0], [800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "5 - Clientes-14", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-67", "isController": false}, {"data": [[2400.0, 1.0], [2500.0, 1.0], [3000.0, 1.0]], "isOverall": false, "label": "5 - Clientes-13", "isController": false}, {"data": [[2400.0, 1.0], [2800.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-66", "isController": false}, {"data": [[3000.0, 1.0], [3400.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-65", "isController": false}, {"data": [[200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "1 - Index-1-0", "isController": false}, {"data": [[2700.0, 1.0], [1500.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-64", "isController": false}, {"data": [[4200.0, 1.0], [3100.0, 1.0], [3400.0, 1.0]], "isOverall": false, "label": "12 - Formulario Contactos-82", "isController": false}, {"data": [[400.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "4 - Mod de Personas-12", "isController": false}, {"data": [[2900.0, 1.0], [3000.0, 1.0], [3100.0, 1.0]], "isOverall": false, "label": "6 - Nuevo Cliente-16", "isController": false}, {"data": [[1700.0, 1.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159", "isController": false}, {"data": [[1100.0, 1.0], [800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "6 - Nuevo Cliente-17", "isController": false}, {"data": [[1100.0, 1.0], [1300.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[12100.0, 1.0], [12800.0, 1.0], [3400.0, 2.0], [3500.0, 1.0], [14300.0, 1.0]], "isOverall": false, "label": "12 - Formulario Contactos", "isController": true}, {"data": [[1300.0, 1.0], [1600.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157", "isController": false}, {"data": [[3100.0, 1.0], [3800.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "6 - Nuevo Cliente-15", "isController": false}, {"data": [[1200.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156", "isController": false}, {"data": [[5100.0, 1.0], [6300.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "19 - Grabar Persona-173", "isController": false}, {"data": [[700.0, 1.0], [3800.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "19 - Grabar Persona-174", "isController": false}, {"data": [[106400.0, 1.0], [107400.0, 1.0], [107700.0, 1.0]], "isOverall": false, "label": "9 - Domicilio Crear", "isController": true}, {"data": [[1200.0, 1.0], [700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "17 - Campos Adicionales-140", "isController": false}, {"data": [[7200.0, 1.0], [7600.0, 1.0], [7500.0, 1.0]], "isOverall": false, "label": "17 - Campos Adicionales-141", "isController": false}, {"data": [[4300.0, 1.0], [4100.0, 1.0], [4200.0, 1.0]], "isOverall": false, "label": "13 - Relacion Crear-86", "isController": false}, {"data": [[1400.0, 1.0], [1600.0, 2.0]], "isOverall": false, "label": "13 - Relacion Crear-87", "isController": false}, {"data": [[1200.0, 1.0], [1300.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis", "isController": true}, {"data": [[8300.0, 2.0], [7700.0, 1.0]], "isOverall": false, "label": "11 - Contactos Crear", "isController": true}, {"data": [[2200.0, 1.0], [2500.0, 2.0]], "isOverall": false, "label": "17 - Campos Adicionales-139", "isController": false}, {"data": [[2500.0, 1.0], [1600.0, 2.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155", "isController": false}, {"data": [[2400.0, 1.0], [1400.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154", "isController": false}, {"data": [[1300.0, 1.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153", "isController": false}, {"data": [[1500.0, 1.0], [800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152", "isController": false}, {"data": [[4300.0, 1.0], [4700.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": "13 - Relacion Crear-88", "isController": false}, {"data": [[2300.0, 1.0], [3700.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[2900.0, 1.0], [3300.0, 1.0], [3700.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150", "isController": false}, {"data": [[4600.0, 1.0], [4700.0, 1.0], [4800.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-52", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-51", "isController": false}, {"data": [[2500.0, 1.0], [2700.0, 1.0], [2800.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-50", "isController": false}, {"data": [[2900.0, 1.0], [3500.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "2 - Login-9-0", "isController": false}, {"data": [[3300.0, 1.0], [3400.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "5 - Clientes", "isController": true}, {"data": [[19500.0, 1.0], [21400.0, 1.0], [21700.0, 1.0]], "isOverall": false, "label": "17 - Campos Adicionales", "isController": true}, {"data": [[2100.0, 1.0], [2900.0, 1.0], [3000.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[4900.0, 1.0], [5300.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": "17 - Campos Adicionales-136", "isController": false}, {"data": [[2100.0, 1.0], [2500.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[9100.0, 1.0], [7500.0, 1.0], [7800.0, 1.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41", "isController": false}, {"data": [[700.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "17 - Campos Adicionales-137", "isController": false}, {"data": [[2800.0, 1.0], [3200.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[1300.0, 3.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42", "isController": false}, {"data": [[4200.0, 1.0], [4800.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "17 - Campos Adicionales-138", "isController": false}, {"data": [[2800.0, 1.0], [3500.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[600.0, 1.0], [1400.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Inicio - -10", "isController": false}, {"data": [[11000.0, 1.0], [11500.0, 1.0], [3200.0, 1.0]], "isOverall": false, "label": "2 - Login-9-1", "isController": false}, {"data": [[300.0, 1.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0", "isController": false}, {"data": [[11200.0, 1.0], [11600.0, 1.0], [3300.0, 1.0]], "isOverall": false, "label": "2 - Login-9", "isController": false}, {"data": [[600.0, 1.0], [800.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "2 - Login-7", "isController": false}, {"data": [[1400.0, 1.0], [1600.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[700.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[2900.0, 1.0], [3300.0, 2.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[600.0, 2.0], [800.0, 1.0]], "isOverall": false, "label": "3 - Operaciones del Sistema-11", "isController": false}, {"data": [[2100.0, 3.0]], "isOverall": false, "label": "10 - Formulario Domicilio-49", "isController": false}, {"data": [[4100.0, 1.0], [3000.0, 1.0], [3200.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[2200.0, 2.0], [2700.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-48", "isController": false}, {"data": [[2900.0, 1.0], [3100.0, 2.0]], "isOverall": false, "label": "14 - Formulario Relacion -89", "isController": false}, {"data": [[4500.0, 1.0], [4600.0, 1.0], [3400.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -100", "isController": false}, {"data": [[2500.0, 1.0], [2600.0, 1.0], [2900.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[3200.0, 2.0], [3500.0, 1.0]], "isOverall": false, "label": "6 - Nuevo Cliente-18", "isController": false}, {"data": [[700.0, 1.0], [100.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-47", "isController": false}, {"data": [[4100.0, 1.0], [4600.0, 1.0], [4400.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -101", "isController": false}, {"data": [[2600.0, 1.0], [3100.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[2300.0, 1.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-46", "isController": false}, {"data": [[2600.0, 1.0], [2800.0, 1.0], [3000.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -102", "isController": false}, {"data": [[2800.0, 1.0], [3100.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-45", "isController": false}, {"data": [[2200.0, 1.0], [2400.0, 1.0], [2500.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -103", "isController": false}, {"data": [[5100.0, 1.0], [5200.0, 1.0], [5300.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-44", "isController": false}, {"data": [[3400.0, 2.0], [3500.0, 1.0]], "isOverall": false, "label": "12 - Formulario Contactos-83", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 391800.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 58.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 315.0, "series": [{"data": [[0.0, 58.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 104.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 315.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 2.678571428571429, "minX": 1.59499386E12, "maxY": 3.0, "series": [{"data": [[1.59499398E12, 3.0], [1.5949941E12, 3.0], [1.59499392E12, 3.0], [1.59499422E12, 2.678571428571429], [1.59499404E12, 3.0], [1.59499386E12, 2.98019801980198], [1.59499416E12, 3.0]], "isOverall": false, "label": "1- Thread Group_Registro de Cliente", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59499422E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 4.0, "maxY": 391874.0, "series": [{"data": [[9.0, 4439.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar", "isController": true}, {"data": [[9.0, 4439.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-Aggregated", "isController": true}, {"data": [[6.0, 7070.333333333333]], "isOverall": false, "label": "19 - Grabar Persona", "isController": true}, {"data": [[6.0, 7070.333333333333]], "isOverall": false, "label": "19 - Grabar Persona-Aggregated", "isController": true}, {"data": [[6.0, 1255.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[6.0, 1255.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169-Aggregated", "isController": false}, {"data": [[4.0, 102.0], [6.0, 107.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2", "isController": false}, {"data": [[5.333333333333333, 105.33333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2-Aggregated", "isController": false}, {"data": [[4.0, 295.0], [6.0, 228.5]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1", "isController": false}, {"data": [[5.333333333333333, 250.66666666666666]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1-Aggregated", "isController": false}, {"data": [[4.0, 223.0], [6.0, 301.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0", "isController": false}, {"data": [[5.333333333333333, 275.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0-Aggregated", "isController": false}, {"data": [[6.0, 1389.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[6.0, 1389.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165-Aggregated", "isController": false}, {"data": [[6.0, 1132.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[6.0, 1132.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164-Aggregated", "isController": false}, {"data": [[6.0, 1433.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[6.0, 1433.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163-Aggregated", "isController": false}, {"data": [[6.0, 1015.3333333333334]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[6.0, 1015.3333333333334]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162-Aggregated", "isController": false}, {"data": [[9.0, 10211.333333333334]], "isOverall": false, "label": "13 - Relacion Crear", "isController": true}, {"data": [[9.0, 10211.333333333334]], "isOverall": false, "label": "13 - Relacion Crear-Aggregated", "isController": true}, {"data": [[6.0, 1711.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[6.0, 1711.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161-Aggregated", "isController": false}, {"data": [[6.0, 1058.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160", "isController": false}, {"data": [[6.0, 1058.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160-Aggregated", "isController": false}, {"data": [[6.0, 2983.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[6.0, 2983.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-Aggregated", "isController": true}, {"data": [[11.0, 9433.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[11.0, 9433.0]], "isOverall": false, "label": "2 - Login-Aggregated", "isController": true}, {"data": [[11.0, 3064.3333333333335]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20", "isController": false}, {"data": [[11.0, 3064.3333333333335]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20-Aggregated", "isController": false}, {"data": [[11.0, 3587.6666666666665]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21", "isController": false}, {"data": [[11.0, 3587.6666666666665]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21-Aggregated", "isController": false}, {"data": [[11.0, 3512.6666666666665]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22", "isController": false}, {"data": [[11.0, 3512.6666666666665]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22-Aggregated", "isController": false}, {"data": [[11.0, 3737.6666666666665]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23", "isController": false}, {"data": [[11.0, 3737.6666666666665]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23-Aggregated", "isController": false}, {"data": [[11.0, 11124.666666666666]], "isOverall": false, "label": "6 - Nuevo Cliente", "isController": true}, {"data": [[11.0, 11124.666666666666]], "isOverall": false, "label": "6 - Nuevo Cliente-Aggregated", "isController": true}, {"data": [[11.0, 3286.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24", "isController": false}, {"data": [[11.0, 3286.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24-Aggregated", "isController": false}, {"data": [[11.0, 3484.6666666666665]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25", "isController": false}, {"data": [[11.0, 3484.6666666666665]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25-Aggregated", "isController": false}, {"data": [[11.0, 2794.6666666666665]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26", "isController": false}, {"data": [[11.0, 2794.6666666666665]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26-Aggregated", "isController": false}, {"data": [[11.0, 3154.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27", "isController": false}, {"data": [[11.0, 3154.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27-Aggregated", "isController": false}, {"data": [[11.0, 3642.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28", "isController": false}, {"data": [[11.0, 3642.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28-Aggregated", "isController": false}, {"data": [[9.0, 5212.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar", "isController": true}, {"data": [[9.0, 5212.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-Aggregated", "isController": true}, {"data": [[11.0, 2519.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29", "isController": false}, {"data": [[11.0, 2519.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29-Aggregated", "isController": false}, {"data": [[9.0, 3220.0]], "isOverall": false, "label": "9 - Domicilio Crear-43", "isController": false}, {"data": [[9.0, 3220.0]], "isOverall": false, "label": "9 - Domicilio Crear-43-Aggregated", "isController": false}, {"data": [[9.0, 3690.0]], "isOverall": false, "label": "10 - Formulario Domicilio-76", "isController": false}, {"data": [[9.0, 3690.0]], "isOverall": false, "label": "10 - Formulario Domicilio-76-Aggregated", "isController": false}, {"data": [[9.0, 3426.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-75", "isController": false}, {"data": [[9.0, 3426.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-75-Aggregated", "isController": false}, {"data": [[11.0, 9530.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[11.0, 9530.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-Aggregated", "isController": true}, {"data": [[11.0, 224.33333333333334]], "isOverall": false, "label": "2 - Login-7-1", "isController": false}, {"data": [[11.0, 224.33333333333334]], "isOverall": false, "label": "2 - Login-7-1-Aggregated", "isController": false}, {"data": [[11.0, 451.3333333333333]], "isOverall": false, "label": "2 - Login-7-0", "isController": false}, {"data": [[11.0, 451.3333333333333]], "isOverall": false, "label": "2 - Login-7-0-Aggregated", "isController": false}, {"data": [[4.0, 108.0], [5.0, 133.0], [6.0, 137.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1", "isController": false}, {"data": [[5.0, 126.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1-Aggregated", "isController": false}, {"data": [[9.0, 6059.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar", "isController": true}, {"data": [[9.0, 6059.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-Aggregated", "isController": true}, {"data": [[4.0, 104.0], [5.0, 146.0], [6.0, 114.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0", "isController": false}, {"data": [[5.0, 121.33333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0-Aggregated", "isController": false}, {"data": [[11.0, 912.3333333333334]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38", "isController": false}, {"data": [[11.0, 912.3333333333334]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38-Aggregated", "isController": false}, {"data": [[11.0, 8512.333333333334]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37", "isController": false}, {"data": [[11.0, 8512.333333333334]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37-Aggregated", "isController": false}, {"data": [[11.0, 8788.888888888889]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[11.0, 8788.888888888889]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-Aggregated", "isController": true}, {"data": [[6.0, 7061.333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[6.0, 7061.333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-Aggregated", "isController": true}, {"data": [[9.0, 1327.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78", "isController": false}, {"data": [[9.0, 1327.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78-Aggregated", "isController": false}, {"data": [[11.0, 705.6666666666666]], "isOverall": false, "label": "3 - Operaciones del Sistema", "isController": true}, {"data": [[11.0, 705.6666666666666]], "isOverall": false, "label": "3 - Operaciones del Sistema-Aggregated", "isController": true}, {"data": [[11.0, 9159.833333333334]], "isOverall": false, "label": "8 - Formulario Datos de Cliente", "isController": true}, {"data": [[11.0, 9159.833333333334]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-Aggregated", "isController": true}, {"data": [[9.0, 3885.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77", "isController": false}, {"data": [[9.0, 3885.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77-Aggregated", "isController": false}, {"data": [[11.0, 3209.6666666666665]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19", "isController": false}, {"data": [[11.0, 3209.6666666666665]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19-Aggregated", "isController": false}, {"data": [[9.0, 2125.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-63", "isController": false}, {"data": [[9.0, 2125.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-63-Aggregated", "isController": false}, {"data": [[9.0, 5867.666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-62", "isController": false}, {"data": [[9.0, 5867.666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-62-Aggregated", "isController": false}, {"data": [[9.0, 1265.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-61", "isController": false}, {"data": [[9.0, 1265.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-61-Aggregated", "isController": false}, {"data": [[9.0, 3399.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-60", "isController": false}, {"data": [[9.0, 3399.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-60-Aggregated", "isController": false}, {"data": [[9.0, 2634.6666666666665]], "isOverall": false, "label": "11 - Contactos Crear-81", "isController": false}, {"data": [[9.0, 2634.6666666666665]], "isOverall": false, "label": "11 - Contactos Crear-81-Aggregated", "isController": false}, {"data": [[9.0, 1781.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[9.0, 1781.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85-Aggregated", "isController": false}, {"data": [[9.0, 3076.3333333333335]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[9.0, 3076.3333333333335]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104-Aggregated", "isController": false}, {"data": [[9.0, 1847.3333333333333]], "isOverall": false, "label": "11 - Contactos Crear-80", "isController": false}, {"data": [[9.0, 1847.3333333333333]], "isOverall": false, "label": "11 - Contactos Crear-80-Aggregated", "isController": false}, {"data": [[9.0, 1362.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[9.0, 1362.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105-Aggregated", "isController": false}, {"data": [[11.0, 2171.6666666666665]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39", "isController": false}, {"data": [[11.0, 2171.6666666666665]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39-Aggregated", "isController": false}, {"data": [[9.0, 4278.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[9.0, 4278.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84-Aggregated", "isController": false}, {"data": [[9.0, 4060.6666666666665]], "isOverall": false, "label": "14 - Formulario Relacion -90", "isController": false}, {"data": [[9.0, 4060.6666666666665]], "isOverall": false, "label": "14 - Formulario Relacion -90-Aggregated", "isController": false}, {"data": [[9.0, 4082.3333333333335]], "isOverall": false, "label": "14 - Formulario Relacion -91", "isController": false}, {"data": [[9.0, 4082.3333333333335]], "isOverall": false, "label": "14 - Formulario Relacion -91-Aggregated", "isController": false}, {"data": [[9.0, 1175.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -92", "isController": false}, {"data": [[9.0, 1175.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -92-Aggregated", "isController": false}, {"data": [[9.0, 3470.0]], "isOverall": false, "label": "14 - Formulario Relacion -93", "isController": false}, {"data": [[9.0, 3470.0]], "isOverall": false, "label": "14 - Formulario Relacion -93-Aggregated", "isController": false}, {"data": [[9.0, 3120.0]], "isOverall": false, "label": "14 - Formulario Relacion -94", "isController": false}, {"data": [[9.0, 3120.0]], "isOverall": false, "label": "14 - Formulario Relacion -94-Aggregated", "isController": false}, {"data": [[9.0, 3472.3333333333335]], "isOverall": false, "label": "14 - Formulario Relacion -95", "isController": false}, {"data": [[9.0, 3472.3333333333335]], "isOverall": false, "label": "14 - Formulario Relacion -95-Aggregated", "isController": false}, {"data": [[4.0, 606.0], [6.0, 1029.5]], "isOverall": false, "label": "20 - Cerrar  Persona-175", "isController": false}, {"data": [[5.333333333333333, 888.3333333333334]], "isOverall": false, "label": "20 - Cerrar  Persona-175-Aggregated", "isController": false}, {"data": [[9.0, 4316.333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -96", "isController": false}, {"data": [[9.0, 4316.333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -96-Aggregated", "isController": false}, {"data": [[4.0, 569.0], [6.0, 592.5]], "isOverall": false, "label": "20 - Cerrar  Persona-176", "isController": false}, {"data": [[5.333333333333333, 584.6666666666666]], "isOverall": false, "label": "20 - Cerrar  Persona-176-Aggregated", "isController": false}, {"data": [[9.0, 3826.3333333333335]], "isOverall": false, "label": "14 - Formulario Relacion -97", "isController": false}, {"data": [[9.0, 3826.3333333333335]], "isOverall": false, "label": "14 - Formulario Relacion -97-Aggregated", "isController": false}, {"data": [[11.0, 291.0]], "isOverall": false, "label": "4 - Mod de Personas", "isController": true}, {"data": [[11.0, 291.0]], "isOverall": false, "label": "4 - Mod de Personas-Aggregated", "isController": true}, {"data": [[9.0, 4310.666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -98", "isController": false}, {"data": [[9.0, 4310.666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -98-Aggregated", "isController": false}, {"data": [[11.0, 3309.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40", "isController": false}, {"data": [[11.0, 3309.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40-Aggregated", "isController": false}, {"data": [[9.0, 3468.6666666666665]], "isOverall": false, "label": "14 - Formulario Relacion -99", "isController": false}, {"data": [[9.0, 3468.6666666666665]], "isOverall": false, "label": "14 - Formulario Relacion -99-Aggregated", "isController": false}, {"data": [[9.0, 3138.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-59", "isController": false}, {"data": [[9.0, 3138.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-59-Aggregated", "isController": false}, {"data": [[10.0, 418.5], [11.0, 368.0]], "isOverall": false, "label": "1 - Index-1", "isController": false}, {"data": [[10.333333333333334, 401.6666666666667]], "isOverall": false, "label": "1 - Index-1-Aggregated", "isController": false}, {"data": [[10.0, 1469.5], [11.0, 785.0]], "isOverall": false, "label": "1 - Index", "isController": true}, {"data": [[10.333333333333334, 1241.3333333333333]], "isOverall": false, "label": "1 - Index-Aggregated", "isController": true}, {"data": [[9.0, 4146.0]], "isOverall": false, "label": "10 - Formulario Domicilio-58", "isController": false}, {"data": [[9.0, 4146.0]], "isOverall": false, "label": "10 - Formulario Domicilio-58-Aggregated", "isController": false}, {"data": [[4.0, 131.0], [6.0, 376.5]], "isOverall": false, "label": "20 - Cerrar  Persona-177", "isController": false}, {"data": [[5.333333333333333, 294.6666666666667]], "isOverall": false, "label": "20 - Cerrar  Persona-177-Aggregated", "isController": false}, {"data": [[4.0, 391874.0], [5.0, 387262.0], [6.0, 387872.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[5.0, 389002.6666666667]], "isOverall": false, "label": "Transaction Controller-Aggregated", "isController": true}, {"data": [[9.0, 1204.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-57", "isController": false}, {"data": [[9.0, 1204.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-57-Aggregated", "isController": false}, {"data": [[4.0, 667.0], [6.0, 419.5]], "isOverall": false, "label": "20 - Cerrar  Persona-178", "isController": false}, {"data": [[5.333333333333333, 502.0]], "isOverall": false, "label": "20 - Cerrar  Persona-178-Aggregated", "isController": false}, {"data": [[9.0, 3572.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-56", "isController": false}, {"data": [[9.0, 3572.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-56-Aggregated", "isController": false}, {"data": [[9.0, 3953.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-55", "isController": false}, {"data": [[9.0, 3953.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-55-Aggregated", "isController": false}, {"data": [[9.0, 3476.0]], "isOverall": false, "label": "10 - Formulario Domicilio-54", "isController": false}, {"data": [[9.0, 3476.0]], "isOverall": false, "label": "10 - Formulario Domicilio-54-Aggregated", "isController": false}, {"data": [[9.0, 3472.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-53", "isController": false}, {"data": [[9.0, 3472.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-53-Aggregated", "isController": false}, {"data": [[9.0, 3098.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-74", "isController": false}, {"data": [[9.0, 3098.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-74-Aggregated", "isController": false}, {"data": [[9.0, 3633.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-73", "isController": false}, {"data": [[9.0, 3633.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-73-Aggregated", "isController": false}, {"data": [[9.0, 4697.666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-72", "isController": false}, {"data": [[9.0, 4697.666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-72-Aggregated", "isController": false}, {"data": [[6.0, 1094.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[6.0, 1094.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168-Aggregated", "isController": false}, {"data": [[9.0, 1298.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-71", "isController": false}, {"data": [[9.0, 1298.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-71-Aggregated", "isController": false}, {"data": [[9.0, 3662.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-70", "isController": false}, {"data": [[9.0, 3662.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-70-Aggregated", "isController": false}, {"data": [[6.0, 32545.11111111111]], "isOverall": false, "label": "18 - Formulario Campos Adicionales", "isController": true}, {"data": [[6.0, 32545.11111111111]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-Aggregated", "isController": true}, {"data": [[4.0, 427.0], [5.0, 199.0], [6.0, 355.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183", "isController": false}, {"data": [[5.0, 327.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-Aggregated", "isController": false}, {"data": [[9.0, 32926.11111111111]], "isOverall": false, "label": "10 - Formulario Domicilio", "isController": true}, {"data": [[9.0, 32926.11111111111]], "isOverall": false, "label": "10 - Formulario Domicilio-Aggregated", "isController": true}, {"data": [[4.0, 212.0], [5.0, 279.0], [6.0, 252.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185", "isController": false}, {"data": [[5.0, 247.66666666666666]], "isOverall": false, "label": "21 - Cerrar  Insis-185-Aggregated", "isController": false}, {"data": [[6.0, 1301.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[6.0, 1301.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166-Aggregated", "isController": false}, {"data": [[6.0, 587.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[6.0, 587.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167-Aggregated", "isController": false}, {"data": [[11.0, 9424.666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar", "isController": true}, {"data": [[11.0, 9424.666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-Aggregated", "isController": true}, {"data": [[10.0, 212.5], [11.0, 236.0]], "isOverall": false, "label": "1 - Index-1-1", "isController": false}, {"data": [[10.333333333333334, 220.33333333333334]], "isOverall": false, "label": "1 - Index-1-1-Aggregated", "isController": false}, {"data": [[11.0, 2513.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30", "isController": false}, {"data": [[11.0, 2513.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30-Aggregated", "isController": false}, {"data": [[9.0, 3638.0]], "isOverall": false, "label": "11 - Contactos Crear-79", "isController": false}, {"data": [[9.0, 3638.0]], "isOverall": false, "label": "11 - Contactos Crear-79-Aggregated", "isController": false}, {"data": [[11.0, 2377.3333333333335]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31", "isController": false}, {"data": [[11.0, 2377.3333333333335]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31-Aggregated", "isController": false}, {"data": [[11.0, 1987.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32", "isController": false}, {"data": [[11.0, 1987.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32-Aggregated", "isController": false}, {"data": [[11.0, 2021.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33", "isController": false}, {"data": [[11.0, 2021.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33-Aggregated", "isController": false}, {"data": [[11.0, 2170.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34", "isController": false}, {"data": [[11.0, 2170.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34-Aggregated", "isController": false}, {"data": [[11.0, 2105.6666666666665]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35", "isController": false}, {"data": [[11.0, 2105.6666666666665]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35-Aggregated", "isController": false}, {"data": [[11.0, 1991.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36", "isController": false}, {"data": [[11.0, 1991.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36-Aggregated", "isController": false}, {"data": [[4.0, 621.0], [6.0, 637.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182", "isController": false}, {"data": [[5.333333333333333, 631.6666666666666]], "isOverall": false, "label": "21 - Cerrar  Insis-182-Aggregated", "isController": false}, {"data": [[4.0, 1973.0], [6.0, 2418.0]], "isOverall": false, "label": "20 - Cerrar  Persona", "isController": true}, {"data": [[5.333333333333333, 2269.6666666666665]], "isOverall": false, "label": "20 - Cerrar  Persona-Aggregated", "isController": true}, {"data": [[9.0, 2641.0]], "isOverall": false, "label": "10 - Formulario Domicilio-69", "isController": false}, {"data": [[9.0, 2641.0]], "isOverall": false, "label": "10 - Formulario Domicilio-69-Aggregated", "isController": false}, {"data": [[9.0, 3291.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-68", "isController": false}, {"data": [[9.0, 3291.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-68-Aggregated", "isController": false}, {"data": [[9.0, 43286.5]], "isOverall": false, "label": "14 - Formulario Relacion ", "isController": true}, {"data": [[9.0, 43286.5]], "isOverall": false, "label": "14 - Formulario Relacion -Aggregated", "isController": true}, {"data": [[11.0, 859.0]], "isOverall": false, "label": "5 - Clientes-14", "isController": false}, {"data": [[11.0, 859.0]], "isOverall": false, "label": "5 - Clientes-14-Aggregated", "isController": false}, {"data": [[9.0, 1153.0]], "isOverall": false, "label": "10 - Formulario Domicilio-67", "isController": false}, {"data": [[9.0, 1153.0]], "isOverall": false, "label": "10 - Formulario Domicilio-67-Aggregated", "isController": false}, {"data": [[11.0, 2678.3333333333335]], "isOverall": false, "label": "5 - Clientes-13", "isController": false}, {"data": [[11.0, 2678.3333333333335]], "isOverall": false, "label": "5 - Clientes-13-Aggregated", "isController": false}, {"data": [[9.0, 2930.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-66", "isController": false}, {"data": [[9.0, 2930.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-66-Aggregated", "isController": false}, {"data": [[9.0, 3418.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-65", "isController": false}, {"data": [[9.0, 3418.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-65-Aggregated", "isController": false}, {"data": [[10.0, 203.5], [11.0, 131.0]], "isOverall": false, "label": "1 - Index-1-0", "isController": false}, {"data": [[10.333333333333334, 179.33333333333334]], "isOverall": false, "label": "1 - Index-1-0-Aggregated", "isController": false}, {"data": [[9.0, 1997.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-64", "isController": false}, {"data": [[9.0, 1997.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-64-Aggregated", "isController": false}, {"data": [[9.0, 3611.3333333333335]], "isOverall": false, "label": "12 - Formulario Contactos-82", "isController": false}, {"data": [[9.0, 3611.3333333333335]], "isOverall": false, "label": "12 - Formulario Contactos-82-Aggregated", "isController": false}, {"data": [[11.0, 291.0]], "isOverall": false, "label": "4 - Mod de Personas-12", "isController": false}, {"data": [[11.0, 291.0]], "isOverall": false, "label": "4 - Mod de Personas-12-Aggregated", "isController": false}, {"data": [[11.0, 3082.6666666666665]], "isOverall": false, "label": "6 - Nuevo Cliente-16", "isController": false}, {"data": [[11.0, 3082.6666666666665]], "isOverall": false, "label": "6 - Nuevo Cliente-16-Aggregated", "isController": false}, {"data": [[6.0, 1878.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159", "isController": false}, {"data": [[6.0, 1878.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159-Aggregated", "isController": false}, {"data": [[11.0, 999.0]], "isOverall": false, "label": "6 - Nuevo Cliente-17", "isController": false}, {"data": [[11.0, 999.0]], "isOverall": false, "label": "6 - Nuevo Cliente-17-Aggregated", "isController": false}, {"data": [[6.0, 1173.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[6.0, 1173.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158-Aggregated", "isController": false}, {"data": [[9.0, 8313.833333333334]], "isOverall": false, "label": "12 - Formulario Contactos", "isController": true}, {"data": [[9.0, 8313.833333333334]], "isOverall": false, "label": "12 - Formulario Contactos-Aggregated", "isController": true}, {"data": [[6.0, 1580.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157", "isController": false}, {"data": [[6.0, 1580.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157-Aggregated", "isController": false}, {"data": [[11.0, 3687.0]], "isOverall": false, "label": "6 - Nuevo Cliente-15", "isController": false}, {"data": [[11.0, 3687.0]], "isOverall": false, "label": "6 - Nuevo Cliente-15-Aggregated", "isController": false}, {"data": [[6.0, 1099.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156", "isController": false}, {"data": [[6.0, 1099.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156-Aggregated", "isController": false}, {"data": [[6.0, 5193.0]], "isOverall": false, "label": "19 - Grabar Persona-173", "isController": false}, {"data": [[6.0, 5193.0]], "isOverall": false, "label": "19 - Grabar Persona-173-Aggregated", "isController": false}, {"data": [[6.0, 1877.3333333333335]], "isOverall": false, "label": "19 - Grabar Persona-174", "isController": false}, {"data": [[6.0, 1877.3333333333335]], "isOverall": false, "label": "19 - Grabar Persona-174-Aggregated", "isController": false}, {"data": [[9.0, 107210.33333333333]], "isOverall": false, "label": "9 - Domicilio Crear", "isController": true}, {"data": [[9.0, 107210.33333333333]], "isOverall": false, "label": "9 - Domicilio Crear-Aggregated", "isController": true}, {"data": [[9.0, 851.6666666666666]], "isOverall": false, "label": "17 - Campos Adicionales-140", "isController": false}, {"data": [[9.0, 851.6666666666666]], "isOverall": false, "label": "17 - Campos Adicionales-140-Aggregated", "isController": false}, {"data": [[9.0, 7458.333333333333]], "isOverall": false, "label": "17 - Campos Adicionales-141", "isController": false}, {"data": [[9.0, 7458.333333333333]], "isOverall": false, "label": "17 - Campos Adicionales-141-Aggregated", "isController": false}, {"data": [[9.0, 4254.333333333333]], "isOverall": false, "label": "13 - Relacion Crear-86", "isController": false}, {"data": [[9.0, 4254.333333333333]], "isOverall": false, "label": "13 - Relacion Crear-86-Aggregated", "isController": false}, {"data": [[9.0, 1592.3333333333333]], "isOverall": false, "label": "13 - Relacion Crear-87", "isController": false}, {"data": [[9.0, 1592.3333333333333]], "isOverall": false, "label": "13 - Relacion Crear-87-Aggregated", "isController": false}, {"data": [[4.0, 1260.0], [5.0, 1040.0], [6.0, 1319.0]], "isOverall": false, "label": "21 - Cerrar  Insis", "isController": true}, {"data": [[5.0, 1206.3333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-Aggregated", "isController": true}, {"data": [[9.0, 8120.0]], "isOverall": false, "label": "11 - Contactos Crear", "isController": true}, {"data": [[9.0, 8120.0]], "isOverall": false, "label": "11 - Contactos Crear-Aggregated", "isController": true}, {"data": [[9.0, 2451.0]], "isOverall": false, "label": "17 - Campos Adicionales-139", "isController": false}, {"data": [[9.0, 2451.0]], "isOverall": false, "label": "17 - Campos Adicionales-139-Aggregated", "isController": false}, {"data": [[6.0, 1967.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155", "isController": false}, {"data": [[6.0, 1967.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155-Aggregated", "isController": false}, {"data": [[6.0, 1987.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154", "isController": false}, {"data": [[6.0, 1987.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154-Aggregated", "isController": false}, {"data": [[6.0, 1768.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153", "isController": false}, {"data": [[6.0, 1768.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153-Aggregated", "isController": false}, {"data": [[6.0, 1123.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152", "isController": false}, {"data": [[6.0, 1123.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152-Aggregated", "isController": false}, {"data": [[9.0, 4364.666666666667]], "isOverall": false, "label": "13 - Relacion Crear-88", "isController": false}, {"data": [[9.0, 4364.666666666667]], "isOverall": false, "label": "13 - Relacion Crear-88-Aggregated", "isController": false}, {"data": [[6.0, 2679.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[6.0, 2679.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151-Aggregated", "isController": false}, {"data": [[6.0, 3337.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150", "isController": false}, {"data": [[6.0, 3337.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150-Aggregated", "isController": false}, {"data": [[9.0, 4738.0]], "isOverall": false, "label": "10 - Formulario Domicilio-52", "isController": false}, {"data": [[9.0, 4738.0]], "isOverall": false, "label": "10 - Formulario Domicilio-52-Aggregated", "isController": false}, {"data": [[9.0, 1176.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-51", "isController": false}, {"data": [[9.0, 1176.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-51-Aggregated", "isController": false}, {"data": [[9.0, 2714.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-50", "isController": false}, {"data": [[9.0, 2714.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-50-Aggregated", "isController": false}, {"data": [[6.0, 2801.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149", "isController": false}, {"data": [[6.0, 2801.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149-Aggregated", "isController": false}, {"data": [[11.0, 132.33333333333334]], "isOverall": false, "label": "2 - Login-9-0", "isController": false}, {"data": [[11.0, 132.33333333333334]], "isOverall": false, "label": "2 - Login-9-0-Aggregated", "isController": false}, {"data": [[11.0, 3537.3333333333335]], "isOverall": false, "label": "5 - Clientes", "isController": true}, {"data": [[11.0, 3537.3333333333335]], "isOverall": false, "label": "5 - Clientes-Aggregated", "isController": true}, {"data": [[9.0, 20893.0]], "isOverall": false, "label": "17 - Campos Adicionales", "isController": true}, {"data": [[9.0, 20893.0]], "isOverall": false, "label": "17 - Campos Adicionales-Aggregated", "isController": true}, {"data": [[6.0, 2763.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[6.0, 2763.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148-Aggregated", "isController": false}, {"data": [[9.0, 4783.333333333333]], "isOverall": false, "label": "17 - Campos Adicionales-136", "isController": false}, {"data": [[9.0, 4783.333333333333]], "isOverall": false, "label": "17 - Campos Adicionales-136-Aggregated", "isController": false}, {"data": [[6.0, 2199.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[6.0, 2199.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147-Aggregated", "isController": false}, {"data": [[11.0, 8154.666666666667]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41", "isController": false}, {"data": [[11.0, 8154.666666666667]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41-Aggregated", "isController": false}, {"data": [[9.0, 959.3333333333334]], "isOverall": false, "label": "17 - Campos Adicionales-137", "isController": false}, {"data": [[9.0, 959.3333333333334]], "isOverall": false, "label": "17 - Campos Adicionales-137-Aggregated", "isController": false}, {"data": [[6.0, 3070.0], [7.0, 3853.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[6.333333333333333, 3331.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146-Aggregated", "isController": false}, {"data": [[11.0, 1375.3333333333333]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42", "isController": false}, {"data": [[11.0, 1375.3333333333333]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42-Aggregated", "isController": false}, {"data": [[9.0, 4389.333333333333]], "isOverall": false, "label": "17 - Campos Adicionales-138", "isController": false}, {"data": [[9.0, 4389.333333333333]], "isOverall": false, "label": "17 - Campos Adicionales-138-Aggregated", "isController": false}, {"data": [[9.0, 3520.0], [6.0, 2811.0], [7.0, 3941.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[7.333333333333333, 3424.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145-Aggregated", "isController": false}, {"data": [[8.0, 1051.0], [11.0, 417.0]], "isOverall": false, "label": "Inicio - -10", "isController": false}, {"data": [[9.0, 839.6666666666666]], "isOverall": false, "label": "Inicio - -10-Aggregated", "isController": false}, {"data": [[11.0, 8624.666666666666]], "isOverall": false, "label": "2 - Login-9-1", "isController": false}, {"data": [[11.0, 8624.666666666666]], "isOverall": false, "label": "2 - Login-9-1-Aggregated", "isController": false}, {"data": [[4.0, 327.0], [5.0, 100.0], [6.0, 249.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1", "isController": false}, {"data": [[5.0, 225.33333333333334]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1-Aggregated", "isController": false}, {"data": [[4.0, 99.0], [5.0, 99.0], [6.0, 106.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0", "isController": false}, {"data": [[5.0, 101.33333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0-Aggregated", "isController": false}, {"data": [[11.0, 8757.0]], "isOverall": false, "label": "2 - Login-9", "isController": false}, {"data": [[11.0, 8757.0]], "isOverall": false, "label": "2 - Login-9-Aggregated", "isController": false}, {"data": [[11.0, 676.0]], "isOverall": false, "label": "2 - Login-7", "isController": false}, {"data": [[11.0, 676.0]], "isOverall": false, "label": "2 - Login-7-Aggregated", "isController": false}, {"data": [[6.0, 1651.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[6.0, 1651.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172-Aggregated", "isController": false}, {"data": [[4.0, 1.0], [5.0, 0.0], [6.0, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[5.0, 0.3333333333333333]], "isOverall": false, "label": "Debug Sampler-Aggregated", "isController": false}, {"data": [[6.0, 898.6666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[6.0, 898.6666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171-Aggregated", "isController": false}, {"data": [[6.0, 3256.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[6.0, 3256.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170-Aggregated", "isController": false}, {"data": [[11.0, 705.6666666666666]], "isOverall": false, "label": "3 - Operaciones del Sistema-11", "isController": false}, {"data": [[11.0, 705.6666666666666]], "isOverall": false, "label": "3 - Operaciones del Sistema-11-Aggregated", "isController": false}, {"data": [[9.0, 2162.0]], "isOverall": false, "label": "10 - Formulario Domicilio-49", "isController": false}, {"data": [[9.0, 2162.0]], "isOverall": false, "label": "10 - Formulario Domicilio-49-Aggregated", "isController": false}, {"data": [[9.0, 3490.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[9.0, 3490.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144-Aggregated", "isController": false}, {"data": [[9.0, 2429.0]], "isOverall": false, "label": "10 - Formulario Domicilio-48", "isController": false}, {"data": [[9.0, 2429.0]], "isOverall": false, "label": "10 - Formulario Domicilio-48-Aggregated", "isController": false}, {"data": [[9.0, 3086.0]], "isOverall": false, "label": "14 - Formulario Relacion -89", "isController": false}, {"data": [[9.0, 3086.0]], "isOverall": false, "label": "14 - Formulario Relacion -89-Aggregated", "isController": false}, {"data": [[9.0, 4226.666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -100", "isController": false}, {"data": [[9.0, 4226.666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -100-Aggregated", "isController": false}, {"data": [[9.0, 2727.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[9.0, 2727.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143-Aggregated", "isController": false}, {"data": [[11.0, 3356.0]], "isOverall": false, "label": "6 - Nuevo Cliente-18", "isController": false}, {"data": [[11.0, 3356.0]], "isOverall": false, "label": "6 - Nuevo Cliente-18-Aggregated", "isController": false}, {"data": [[9.0, 574.0]], "isOverall": false, "label": "10 - Formulario Domicilio-47", "isController": false}, {"data": [[9.0, 574.0]], "isOverall": false, "label": "10 - Formulario Domicilio-47-Aggregated", "isController": false}, {"data": [[9.0, 4409.666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -101", "isController": false}, {"data": [[9.0, 4409.666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -101-Aggregated", "isController": false}, {"data": [[9.0, 3092.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[9.0, 3092.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142-Aggregated", "isController": false}, {"data": [[9.0, 2120.0]], "isOverall": false, "label": "10 - Formulario Domicilio-46", "isController": false}, {"data": [[9.0, 2120.0]], "isOverall": false, "label": "10 - Formulario Domicilio-46-Aggregated", "isController": false}, {"data": [[9.0, 2828.6666666666665]], "isOverall": false, "label": "14 - Formulario Relacion -102", "isController": false}, {"data": [[9.0, 2828.6666666666665]], "isOverall": false, "label": "14 - Formulario Relacion -102-Aggregated", "isController": false}, {"data": [[9.0, 3038.0]], "isOverall": false, "label": "10 - Formulario Domicilio-45", "isController": false}, {"data": [[9.0, 3038.0]], "isOverall": false, "label": "10 - Formulario Domicilio-45-Aggregated", "isController": false}, {"data": [[9.0, 2446.6666666666665]], "isOverall": false, "label": "14 - Formulario Relacion -103", "isController": false}, {"data": [[9.0, 2446.6666666666665]], "isOverall": false, "label": "14 - Formulario Relacion -103-Aggregated", "isController": false}, {"data": [[9.0, 5266.0]], "isOverall": false, "label": "10 - Formulario Domicilio-44", "isController": false}, {"data": [[9.0, 5266.0]], "isOverall": false, "label": "10 - Formulario Domicilio-44-Aggregated", "isController": false}, {"data": [[9.0, 3478.6666666666665]], "isOverall": false, "label": "12 - Formulario Contactos-83", "isController": false}, {"data": [[9.0, 3478.6666666666665]], "isOverall": false, "label": "12 - Formulario Contactos-83-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 11.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 3611.3333333333335, "minX": 1.59499386E12, "maxY": 29401.866666666665, "series": [{"data": [[1.59499398E12, 12133.133333333333], [1.5949941E12, 11970.583333333334], [1.59499392E12, 18721.983333333334], [1.59499422E12, 23048.7], [1.59499404E12, 11596.566666666668], [1.59499386E12, 29401.866666666665], [1.59499416E12, 10630.65]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.59499398E12, 8459.6], [1.5949941E12, 5842.8], [1.59499392E12, 6159.716666666666], [1.59499422E12, 12446.1], [1.59499404E12, 7310.5], [1.59499386E12, 3611.3333333333335], [1.59499416E12, 7288.45]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59499422E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 0.3333333333333333, "minX": 1.59499386E12, "maxY": 389002.6666666667, "series": [{"data": [[1.59499416E12, 4439.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar", "isController": true}, {"data": [[1.59499422E12, 7070.333333333333]], "isOverall": false, "label": "19 - Grabar Persona", "isController": true}, {"data": [[1.59499422E12, 1255.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[1.59499422E12, 105.33333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2", "isController": false}, {"data": [[1.59499422E12, 250.66666666666666]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1", "isController": false}, {"data": [[1.59499422E12, 275.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0", "isController": false}, {"data": [[1.59499422E12, 1389.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[1.59499422E12, 1132.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[1.59499422E12, 1433.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[1.59499422E12, 1015.3333333333334]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[1.5949941E12, 10211.333333333334]], "isOverall": false, "label": "13 - Relacion Crear", "isController": true}, {"data": [[1.59499422E12, 1711.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[1.59499422E12, 1058.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160", "isController": false}, {"data": [[1.59499422E12, 2983.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[1.59499386E12, 9433.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[1.59499386E12, 3064.3333333333335]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20", "isController": false}, {"data": [[1.59499386E12, 3587.6666666666665]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21", "isController": false}, {"data": [[1.59499386E12, 3512.6666666666665]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22", "isController": false}, {"data": [[1.59499386E12, 3737.6666666666665]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23", "isController": false}, {"data": [[1.59499386E12, 11124.666666666666]], "isOverall": false, "label": "6 - Nuevo Cliente", "isController": true}, {"data": [[1.59499392E12, 3321.0], [1.59499386E12, 3216.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24", "isController": false}, {"data": [[1.59499392E12, 4060.5], [1.59499386E12, 2333.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25", "isController": false}, {"data": [[1.59499392E12, 2827.5], [1.59499386E12, 2729.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26", "isController": false}, {"data": [[1.59499392E12, 3154.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27", "isController": false}, {"data": [[1.59499392E12, 3642.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28", "isController": false}, {"data": [[1.59499404E12, 5212.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar", "isController": true}, {"data": [[1.59499392E12, 2519.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29", "isController": false}, {"data": [[1.59499392E12, 3220.0]], "isOverall": false, "label": "9 - Domicilio Crear-43", "isController": false}, {"data": [[1.59499404E12, 3690.0]], "isOverall": false, "label": "10 - Formulario Domicilio-76", "isController": false}, {"data": [[1.59499404E12, 3426.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-75", "isController": false}, {"data": [[1.59499392E12, 9530.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[1.59499386E12, 224.33333333333334]], "isOverall": false, "label": "2 - Login-7-1", "isController": false}, {"data": [[1.59499386E12, 451.3333333333333]], "isOverall": false, "label": "2 - Login-7-0", "isController": false}, {"data": [[1.59499422E12, 126.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1", "isController": false}, {"data": [[1.5949941E12, 6059.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar", "isController": true}, {"data": [[1.59499422E12, 121.33333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0", "isController": false}, {"data": [[1.59499392E12, 912.3333333333334]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38", "isController": false}, {"data": [[1.59499392E12, 8512.333333333334]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37", "isController": false}, {"data": [[1.59499392E12, 11024.32], [1.59499386E12, 3708.3636363636365]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[1.59499422E12, 7061.333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[1.59499404E12, 1327.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78", "isController": false}, {"data": [[1.59499386E12, 705.6666666666666]], "isOverall": false, "label": "3 - Operaciones del Sistema", "isController": true}, {"data": [[1.59499392E12, 9159.833333333334]], "isOverall": false, "label": "8 - Formulario Datos de Cliente", "isController": true}, {"data": [[1.59499404E12, 3885.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77", "isController": false}, {"data": [[1.59499386E12, 3209.6666666666665]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19", "isController": false}, {"data": [[1.59499398E12, 2125.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-63", "isController": false}, {"data": [[1.59499398E12, 5867.666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-62", "isController": false}, {"data": [[1.59499398E12, 1265.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-61", "isController": false}, {"data": [[1.59499398E12, 3399.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-60", "isController": false}, {"data": [[1.59499404E12, 2634.6666666666665]], "isOverall": false, "label": "11 - Contactos Crear-81", "isController": false}, {"data": [[1.5949941E12, 1781.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[1.59499416E12, 3076.3333333333335]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[1.59499404E12, 1847.3333333333333]], "isOverall": false, "label": "11 - Contactos Crear-80", "isController": false}, {"data": [[1.59499416E12, 1362.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[1.59499392E12, 2171.6666666666665]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39", "isController": false}, {"data": [[1.5949941E12, 4278.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[1.5949941E12, 4060.6666666666665]], "isOverall": false, "label": "14 - Formulario Relacion -90", "isController": false}, {"data": [[1.5949941E12, 4082.3333333333335]], "isOverall": false, "label": "14 - Formulario Relacion -91", "isController": false}, {"data": [[1.5949941E12, 1175.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -92", "isController": false}, {"data": [[1.5949941E12, 3470.0]], "isOverall": false, "label": "14 - Formulario Relacion -93", "isController": false}, {"data": [[1.5949941E12, 3120.0]], "isOverall": false, "label": "14 - Formulario Relacion -94", "isController": false}, {"data": [[1.5949941E12, 3472.3333333333335]], "isOverall": false, "label": "14 - Formulario Relacion -95", "isController": false}, {"data": [[1.59499422E12, 888.3333333333334]], "isOverall": false, "label": "20 - Cerrar  Persona-175", "isController": false}, {"data": [[1.5949941E12, 4316.333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -96", "isController": false}, {"data": [[1.59499422E12, 584.6666666666666]], "isOverall": false, "label": "20 - Cerrar  Persona-176", "isController": false}, {"data": [[1.5949941E12, 3826.3333333333335]], "isOverall": false, "label": "14 - Formulario Relacion -97", "isController": false}, {"data": [[1.59499386E12, 291.0]], "isOverall": false, "label": "4 - Mod de Personas", "isController": true}, {"data": [[1.5949941E12, 4310.666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -98", "isController": false}, {"data": [[1.59499392E12, 3309.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40", "isController": false}, {"data": [[1.5949941E12, 3468.6666666666665]], "isOverall": false, "label": "14 - Formulario Relacion -99", "isController": false}, {"data": [[1.59499398E12, 3138.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-59", "isController": false}, {"data": [[1.59499386E12, 401.6666666666667]], "isOverall": false, "label": "1 - Index-1", "isController": false}, {"data": [[1.59499386E12, 1241.3333333333333]], "isOverall": false, "label": "1 - Index", "isController": true}, {"data": [[1.59499398E12, 4146.0]], "isOverall": false, "label": "10 - Formulario Domicilio-58", "isController": false}, {"data": [[1.59499422E12, 294.6666666666667]], "isOverall": false, "label": "20 - Cerrar  Persona-177", "isController": false}, {"data": [[1.59499422E12, 389002.6666666667]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59499398E12, 1204.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-57", "isController": false}, {"data": [[1.59499422E12, 502.0]], "isOverall": false, "label": "20 - Cerrar  Persona-178", "isController": false}, {"data": [[1.59499398E12, 3572.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-56", "isController": false}, {"data": [[1.59499398E12, 3953.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-55", "isController": false}, {"data": [[1.59499398E12, 3476.0]], "isOverall": false, "label": "10 - Formulario Domicilio-54", "isController": false}, {"data": [[1.59499398E12, 3472.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-53", "isController": false}, {"data": [[1.59499404E12, 3098.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-74", "isController": false}, {"data": [[1.59499404E12, 3633.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-73", "isController": false}, {"data": [[1.59499404E12, 4697.666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-72", "isController": false}, {"data": [[1.59499422E12, 1094.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[1.59499404E12, 1298.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-71", "isController": false}, {"data": [[1.59499404E12, 3662.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-70", "isController": false}, {"data": [[1.59499422E12, 43270.66666666667], [1.59499416E12, 11094.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales", "isController": true}, {"data": [[1.59499422E12, 327.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183", "isController": false}, {"data": [[1.59499398E12, 19480.0], [1.59499404E12, 39649.166666666664]], "isOverall": false, "label": "10 - Formulario Domicilio", "isController": true}, {"data": [[1.59499422E12, 247.66666666666666]], "isOverall": false, "label": "21 - Cerrar  Insis-185", "isController": false}, {"data": [[1.59499422E12, 1301.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[1.59499422E12, 587.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[1.59499392E12, 9424.666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar", "isController": true}, {"data": [[1.59499386E12, 220.33333333333334]], "isOverall": false, "label": "1 - Index-1-1", "isController": false}, {"data": [[1.59499392E12, 2513.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30", "isController": false}, {"data": [[1.59499404E12, 3638.0]], "isOverall": false, "label": "11 - Contactos Crear-79", "isController": false}, {"data": [[1.59499392E12, 2377.3333333333335]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31", "isController": false}, {"data": [[1.59499392E12, 1987.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32", "isController": false}, {"data": [[1.59499392E12, 2021.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33", "isController": false}, {"data": [[1.59499392E12, 2170.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34", "isController": false}, {"data": [[1.59499392E12, 2105.6666666666665]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35", "isController": false}, {"data": [[1.59499392E12, 1991.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36", "isController": false}, {"data": [[1.59499422E12, 631.6666666666666]], "isOverall": false, "label": "21 - Cerrar  Insis-182", "isController": false}, {"data": [[1.59499422E12, 2269.6666666666665]], "isOverall": false, "label": "20 - Cerrar  Persona", "isController": true}, {"data": [[1.59499404E12, 2641.0]], "isOverall": false, "label": "10 - Formulario Domicilio-69", "isController": false}, {"data": [[1.59499404E12, 3291.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-68", "isController": false}, {"data": [[1.59499416E12, 43286.5]], "isOverall": false, "label": "14 - Formulario Relacion ", "isController": true}, {"data": [[1.59499386E12, 859.0]], "isOverall": false, "label": "5 - Clientes-14", "isController": false}, {"data": [[1.59499404E12, 1153.0]], "isOverall": false, "label": "10 - Formulario Domicilio-67", "isController": false}, {"data": [[1.59499386E12, 2678.3333333333335]], "isOverall": false, "label": "5 - Clientes-13", "isController": false}, {"data": [[1.59499404E12, 2930.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-66", "isController": false}, {"data": [[1.59499404E12, 3418.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-65", "isController": false}, {"data": [[1.59499386E12, 179.33333333333334]], "isOverall": false, "label": "1 - Index-1-0", "isController": false}, {"data": [[1.59499398E12, 1616.0], [1.59499404E12, 2761.0]], "isOverall": false, "label": "10 - Formulario Domicilio-64", "isController": false}, {"data": [[1.59499404E12, 3611.3333333333335]], "isOverall": false, "label": "12 - Formulario Contactos-82", "isController": false}, {"data": [[1.59499386E12, 291.0]], "isOverall": false, "label": "4 - Mod de Personas-12", "isController": false}, {"data": [[1.59499386E12, 3082.6666666666665]], "isOverall": false, "label": "6 - Nuevo Cliente-16", "isController": false}, {"data": [[1.59499422E12, 1878.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159", "isController": false}, {"data": [[1.59499386E12, 999.0]], "isOverall": false, "label": "6 - Nuevo Cliente-17", "isController": false}, {"data": [[1.59499422E12, 1173.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[1.5949941E12, 13149.0], [1.59499404E12, 3478.6666666666665]], "isOverall": false, "label": "12 - Formulario Contactos", "isController": true}, {"data": [[1.59499422E12, 1580.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157", "isController": false}, {"data": [[1.59499386E12, 3687.0]], "isOverall": false, "label": "6 - Nuevo Cliente-15", "isController": false}, {"data": [[1.59499422E12, 1099.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156", "isController": false}, {"data": [[1.59499422E12, 5193.0]], "isOverall": false, "label": "19 - Grabar Persona-173", "isController": false}, {"data": [[1.59499422E12, 1877.3333333333335]], "isOverall": false, "label": "19 - Grabar Persona-174", "isController": false}, {"data": [[1.59499404E12, 107210.33333333333]], "isOverall": false, "label": "9 - Domicilio Crear", "isController": true}, {"data": [[1.59499416E12, 851.6666666666666]], "isOverall": false, "label": "17 - Campos Adicionales-140", "isController": false}, {"data": [[1.59499416E12, 7458.333333333333]], "isOverall": false, "label": "17 - Campos Adicionales-141", "isController": false}, {"data": [[1.5949941E12, 4254.333333333333]], "isOverall": false, "label": "13 - Relacion Crear-86", "isController": false}, {"data": [[1.5949941E12, 1592.3333333333333]], "isOverall": false, "label": "13 - Relacion Crear-87", "isController": false}, {"data": [[1.59499422E12, 1206.3333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis", "isController": true}, {"data": [[1.59499404E12, 8120.0]], "isOverall": false, "label": "11 - Contactos Crear", "isController": true}, {"data": [[1.59499416E12, 2451.0]], "isOverall": false, "label": "17 - Campos Adicionales-139", "isController": false}, {"data": [[1.59499422E12, 1967.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155", "isController": false}, {"data": [[1.59499422E12, 1987.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154", "isController": false}, {"data": [[1.59499422E12, 1768.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153", "isController": false}, {"data": [[1.59499422E12, 1123.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152", "isController": false}, {"data": [[1.5949941E12, 4364.666666666667]], "isOverall": false, "label": "13 - Relacion Crear-88", "isController": false}, {"data": [[1.59499422E12, 2167.5], [1.59499416E12, 3702.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[1.59499416E12, 3337.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150", "isController": false}, {"data": [[1.59499398E12, 4738.0]], "isOverall": false, "label": "10 - Formulario Domicilio-52", "isController": false}, {"data": [[1.59499398E12, 1176.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-51", "isController": false}, {"data": [[1.59499398E12, 2714.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-50", "isController": false}, {"data": [[1.59499416E12, 2801.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149", "isController": false}, {"data": [[1.59499386E12, 132.33333333333334]], "isOverall": false, "label": "2 - Login-9-0", "isController": false}, {"data": [[1.59499386E12, 3537.3333333333335]], "isOverall": false, "label": "5 - Clientes", "isController": true}, {"data": [[1.59499416E12, 20893.0]], "isOverall": false, "label": "17 - Campos Adicionales", "isController": true}, {"data": [[1.59499416E12, 2763.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[1.59499416E12, 4783.333333333333]], "isOverall": false, "label": "17 - Campos Adicionales-136", "isController": false}, {"data": [[1.59499416E12, 2199.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[1.59499392E12, 8154.666666666667]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41", "isController": false}, {"data": [[1.59499416E12, 959.3333333333334]], "isOverall": false, "label": "17 - Campos Adicionales-137", "isController": false}, {"data": [[1.59499416E12, 3331.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[1.59499392E12, 1375.3333333333333]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42", "isController": false}, {"data": [[1.59499416E12, 4389.333333333333]], "isOverall": false, "label": "17 - Campos Adicionales-138", "isController": false}, {"data": [[1.59499416E12, 3424.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[1.59499386E12, 839.6666666666666]], "isOverall": false, "label": "Inicio - -10", "isController": false}, {"data": [[1.59499386E12, 8624.666666666666]], "isOverall": false, "label": "2 - Login-9-1", "isController": false}, {"data": [[1.59499422E12, 225.33333333333334]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1", "isController": false}, {"data": [[1.59499422E12, 101.33333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0", "isController": false}, {"data": [[1.59499386E12, 8757.0]], "isOverall": false, "label": "2 - Login-9", "isController": false}, {"data": [[1.59499386E12, 676.0]], "isOverall": false, "label": "2 - Login-7", "isController": false}, {"data": [[1.59499422E12, 1651.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[1.59499422E12, 0.3333333333333333]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59499422E12, 898.6666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[1.59499422E12, 3256.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[1.59499386E12, 705.6666666666666]], "isOverall": false, "label": "3 - Operaciones del Sistema-11", "isController": false}, {"data": [[1.59499398E12, 2162.0]], "isOverall": false, "label": "10 - Formulario Domicilio-49", "isController": false}, {"data": [[1.59499416E12, 3490.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[1.59499398E12, 2429.0]], "isOverall": false, "label": "10 - Formulario Domicilio-48", "isController": false}, {"data": [[1.5949941E12, 3086.0]], "isOverall": false, "label": "14 - Formulario Relacion -89", "isController": false}, {"data": [[1.5949941E12, 4226.666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -100", "isController": false}, {"data": [[1.59499416E12, 2727.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[1.59499386E12, 3356.0]], "isOverall": false, "label": "6 - Nuevo Cliente-18", "isController": false}, {"data": [[1.59499398E12, 574.0]], "isOverall": false, "label": "10 - Formulario Domicilio-47", "isController": false}, {"data": [[1.5949941E12, 4516.5], [1.59499416E12, 4196.0]], "isOverall": false, "label": "14 - Formulario Relacion -101", "isController": false}, {"data": [[1.59499416E12, 3092.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[1.59499398E12, 2120.0]], "isOverall": false, "label": "10 - Formulario Domicilio-46", "isController": false}, {"data": [[1.59499416E12, 2828.6666666666665]], "isOverall": false, "label": "14 - Formulario Relacion -102", "isController": false}, {"data": [[1.59499398E12, 3038.0]], "isOverall": false, "label": "10 - Formulario Domicilio-45", "isController": false}, {"data": [[1.59499416E12, 2446.6666666666665]], "isOverall": false, "label": "14 - Formulario Relacion -103", "isController": false}, {"data": [[1.59499398E12, 5266.0]], "isOverall": false, "label": "10 - Formulario Domicilio-44", "isController": false}, {"data": [[1.59499404E12, 3478.6666666666665]], "isOverall": false, "label": "12 - Formulario Contactos-83", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59499422E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.59499386E12, "maxY": 348646.3333333333, "series": [{"data": [[1.59499416E12, 4054.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar", "isController": true}, {"data": [[1.59499422E12, 6615.666666666667]], "isOverall": false, "label": "19 - Grabar Persona", "isController": true}, {"data": [[1.59499422E12, 1161.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[1.59499422E12, 103.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2", "isController": false}, {"data": [[1.59499422E12, 250.33333333333334]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1", "isController": false}, {"data": [[1.59499422E12, 274.6666666666667]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0", "isController": false}, {"data": [[1.59499422E12, 1381.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[1.59499422E12, 1129.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[1.59499422E12, 1431.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[1.59499422E12, 1011.6666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[1.5949941E12, 9201.0]], "isOverall": false, "label": "13 - Relacion Crear", "isController": true}, {"data": [[1.59499422E12, 1701.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[1.59499422E12, 1053.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160", "isController": false}, {"data": [[1.59499422E12, 2616.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[1.59499386E12, 583.3333333333334]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[1.59499386E12, 2190.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20", "isController": false}, {"data": [[1.59499386E12, 3577.3333333333335]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21", "isController": false}, {"data": [[1.59499386E12, 3489.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22", "isController": false}, {"data": [[1.59499386E12, 3646.6666666666665]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23", "isController": false}, {"data": [[1.59499386E12, 9689.0]], "isOverall": false, "label": "6 - Nuevo Cliente", "isController": true}, {"data": [[1.59499392E12, 3316.0], [1.59499386E12, 3196.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24", "isController": false}, {"data": [[1.59499392E12, 4016.5], [1.59499386E12, 2299.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25", "isController": false}, {"data": [[1.59499392E12, 2802.5], [1.59499386E12, 2729.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26", "isController": false}, {"data": [[1.59499392E12, 3122.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27", "isController": false}, {"data": [[1.59499392E12, 3619.6666666666665]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28", "isController": false}, {"data": [[1.59499404E12, 4262.666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar", "isController": true}, {"data": [[1.59499392E12, 1910.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29", "isController": false}, {"data": [[1.59499392E12, 2750.0]], "isOverall": false, "label": "9 - Domicilio Crear-43", "isController": false}, {"data": [[1.59499404E12, 3657.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-76", "isController": false}, {"data": [[1.59499404E12, 3407.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-75", "isController": false}, {"data": [[1.59499392E12, 7697.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[1.59499386E12, 224.0]], "isOverall": false, "label": "2 - Login-7-1", "isController": false}, {"data": [[1.59499386E12, 451.0]], "isOverall": false, "label": "2 - Login-7-0", "isController": false}, {"data": [[1.59499422E12, 122.33333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1", "isController": false}, {"data": [[1.5949941E12, 4927.666666666667]], "isOverall": false, "label": "12 - Formulario Contactos Guardar", "isController": true}, {"data": [[1.59499422E12, 121.33333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0", "isController": false}, {"data": [[1.59499392E12, 797.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38", "isController": false}, {"data": [[1.59499392E12, 7867.666666666667]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37", "isController": false}, {"data": [[1.59499392E12, 10491.92], [1.59499386E12, 3669.3636363636365]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[1.59499422E12, 6809.333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[1.59499404E12, 937.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78", "isController": false}, {"data": [[1.59499386E12, 623.3333333333334]], "isOverall": false, "label": "3 - Operaciones del Sistema", "isController": true}, {"data": [[1.59499392E12, 8197.666666666666]], "isOverall": false, "label": "8 - Formulario Datos de Cliente", "isController": true}, {"data": [[1.59499404E12, 3325.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77", "isController": false}, {"data": [[1.59499386E12, 2339.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19", "isController": false}, {"data": [[1.59499398E12, 2113.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-63", "isController": false}, {"data": [[1.59499398E12, 5770.0]], "isOverall": false, "label": "10 - Formulario Domicilio-62", "isController": false}, {"data": [[1.59499398E12, 822.3333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio-61", "isController": false}, {"data": [[1.59499398E12, 3389.0]], "isOverall": false, "label": "10 - Formulario Domicilio-60", "isController": false}, {"data": [[1.59499404E12, 2534.0]], "isOverall": false, "label": "11 - Contactos Crear-81", "isController": false}, {"data": [[1.5949941E12, 1250.6666666666667]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[1.59499416E12, 2934.3333333333335]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[1.59499404E12, 1457.0]], "isOverall": false, "label": "11 - Contactos Crear-80", "isController": false}, {"data": [[1.59499416E12, 1119.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[1.59499392E12, 2138.3333333333335]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39", "isController": false}, {"data": [[1.5949941E12, 3677.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[1.5949941E12, 4032.0]], "isOverall": false, "label": "14 - Formulario Relacion -90", "isController": false}, {"data": [[1.5949941E12, 3452.6666666666665]], "isOverall": false, "label": "14 - Formulario Relacion -91", "isController": false}, {"data": [[1.5949941E12, 1140.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -92", "isController": false}, {"data": [[1.5949941E12, 3423.6666666666665]], "isOverall": false, "label": "14 - Formulario Relacion -93", "isController": false}, {"data": [[1.5949941E12, 3091.6666666666665]], "isOverall": false, "label": "14 - Formulario Relacion -94", "isController": false}, {"data": [[1.5949941E12, 2850.6666666666665]], "isOverall": false, "label": "14 - Formulario Relacion -95", "isController": false}, {"data": [[1.59499422E12, 882.0]], "isOverall": false, "label": "20 - Cerrar  Persona-175", "isController": false}, {"data": [[1.5949941E12, 3702.0]], "isOverall": false, "label": "14 - Formulario Relacion -96", "isController": false}, {"data": [[1.59499422E12, 364.3333333333333]], "isOverall": false, "label": "20 - Cerrar  Persona-176", "isController": false}, {"data": [[1.5949941E12, 3202.0]], "isOverall": false, "label": "14 - Formulario Relacion -97", "isController": false}, {"data": [[1.59499386E12, 238.0]], "isOverall": false, "label": "4 - Mod de Personas", "isController": true}, {"data": [[1.5949941E12, 3657.0]], "isOverall": false, "label": "14 - Formulario Relacion -98", "isController": false}, {"data": [[1.59499392E12, 3280.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40", "isController": false}, {"data": [[1.5949941E12, 2566.6666666666665]], "isOverall": false, "label": "14 - Formulario Relacion -99", "isController": false}, {"data": [[1.59499398E12, 3118.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-59", "isController": false}, {"data": [[1.59499386E12, 179.33333333333334]], "isOverall": false, "label": "1 - Index-1", "isController": false}, {"data": [[1.59499386E12, 1014.0]], "isOverall": false, "label": "1 - Index", "isController": true}, {"data": [[1.59499398E12, 4098.666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-58", "isController": false}, {"data": [[1.59499422E12, 233.0]], "isOverall": false, "label": "20 - Cerrar  Persona-177", "isController": false}, {"data": [[1.59499422E12, 348646.3333333333]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59499398E12, 1146.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-57", "isController": false}, {"data": [[1.59499422E12, 498.3333333333333]], "isOverall": false, "label": "20 - Cerrar  Persona-178", "isController": false}, {"data": [[1.59499398E12, 2552.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-56", "isController": false}, {"data": [[1.59499398E12, 3252.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-55", "isController": false}, {"data": [[1.59499398E12, 3458.0]], "isOverall": false, "label": "10 - Formulario Domicilio-54", "isController": false}, {"data": [[1.59499398E12, 3381.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-53", "isController": false}, {"data": [[1.59499404E12, 3039.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-74", "isController": false}, {"data": [[1.59499404E12, 3558.0]], "isOverall": false, "label": "10 - Formulario Domicilio-73", "isController": false}, {"data": [[1.59499404E12, 4605.333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-72", "isController": false}, {"data": [[1.59499422E12, 1060.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[1.59499404E12, 966.0]], "isOverall": false, "label": "10 - Formulario Domicilio-71", "isController": false}, {"data": [[1.59499404E12, 3572.0]], "isOverall": false, "label": "10 - Formulario Domicilio-70", "isController": false}, {"data": [[1.59499422E12, 42739.666666666664], [1.59499416E12, 11006.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales", "isController": true}, {"data": [[1.59499422E12, 100.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183", "isController": false}, {"data": [[1.59499398E12, 18225.0], [1.59499404E12, 37324.5]], "isOverall": false, "label": "10 - Formulario Domicilio", "isController": true}, {"data": [[1.59499422E12, 121.33333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-185", "isController": false}, {"data": [[1.59499422E12, 1116.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[1.59499422E12, 439.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[1.59499392E12, 8664.666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar", "isController": true}, {"data": [[1.59499386E12, 214.0]], "isOverall": false, "label": "1 - Index-1-1", "isController": false}, {"data": [[1.59499392E12, 2499.6666666666665]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30", "isController": false}, {"data": [[1.59499404E12, 2844.3333333333335]], "isOverall": false, "label": "11 - Contactos Crear-79", "isController": false}, {"data": [[1.59499392E12, 2321.6666666666665]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31", "isController": false}, {"data": [[1.59499392E12, 1970.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32", "isController": false}, {"data": [[1.59499392E12, 2001.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33", "isController": false}, {"data": [[1.59499392E12, 2160.6666666666665]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34", "isController": false}, {"data": [[1.59499392E12, 2097.3333333333335]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35", "isController": false}, {"data": [[1.59499392E12, 1933.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36", "isController": false}, {"data": [[1.59499422E12, 274.6666666666667]], "isOverall": false, "label": "21 - Cerrar  Insis-182", "isController": false}, {"data": [[1.59499422E12, 1977.6666666666667]], "isOverall": false, "label": "20 - Cerrar  Persona", "isController": true}, {"data": [[1.59499404E12, 2622.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-69", "isController": false}, {"data": [[1.59499404E12, 3265.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-68", "isController": false}, {"data": [[1.59499416E12, 39466.0]], "isOverall": false, "label": "14 - Formulario Relacion ", "isController": true}, {"data": [[1.59499386E12, 691.6666666666666]], "isOverall": false, "label": "5 - Clientes-14", "isController": false}, {"data": [[1.59499404E12, 1049.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-67", "isController": false}, {"data": [[1.59499386E12, 1967.0]], "isOverall": false, "label": "5 - Clientes-13", "isController": false}, {"data": [[1.59499404E12, 2400.0]], "isOverall": false, "label": "10 - Formulario Domicilio-66", "isController": false}, {"data": [[1.59499404E12, 2776.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-65", "isController": false}, {"data": [[1.59499386E12, 179.33333333333334]], "isOverall": false, "label": "1 - Index-1-0", "isController": false}, {"data": [[1.59499398E12, 1606.5], [1.59499404E12, 2728.0]], "isOverall": false, "label": "10 - Formulario Domicilio-64", "isController": false}, {"data": [[1.59499404E12, 3527.0]], "isOverall": false, "label": "12 - Formulario Contactos-82", "isController": false}, {"data": [[1.59499386E12, 238.0]], "isOverall": false, "label": "4 - Mod de Personas-12", "isController": false}, {"data": [[1.59499386E12, 1724.6666666666667]], "isOverall": false, "label": "6 - Nuevo Cliente-16", "isController": false}, {"data": [[1.59499422E12, 1871.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159", "isController": false}, {"data": [[1.59499386E12, 963.3333333333334]], "isOverall": false, "label": "6 - Nuevo Cliente-17", "isController": false}, {"data": [[1.59499422E12, 1170.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[1.5949941E12, 11906.666666666666], [1.59499404E12, 3452.0]], "isOverall": false, "label": "12 - Formulario Contactos", "isController": true}, {"data": [[1.59499422E12, 1575.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157", "isController": false}, {"data": [[1.59499386E12, 3662.3333333333335]], "isOverall": false, "label": "6 - Nuevo Cliente-15", "isController": false}, {"data": [[1.59499422E12, 1090.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156", "isController": false}, {"data": [[1.59499422E12, 4834.0]], "isOverall": false, "label": "19 - Grabar Persona-173", "isController": false}, {"data": [[1.59499422E12, 1781.6666666666665]], "isOverall": false, "label": "19 - Grabar Persona-174", "isController": false}, {"data": [[1.59499404E12, 99886.66666666667]], "isOverall": false, "label": "9 - Domicilio Crear", "isController": true}, {"data": [[1.59499416E12, 767.3333333333334]], "isOverall": false, "label": "17 - Campos Adicionales-140", "isController": false}, {"data": [[1.59499416E12, 2761.0]], "isOverall": false, "label": "17 - Campos Adicionales-141", "isController": false}, {"data": [[1.5949941E12, 3619.6666666666665]], "isOverall": false, "label": "13 - Relacion Crear-86", "isController": false}, {"data": [[1.5949941E12, 1313.6666666666667]], "isOverall": false, "label": "13 - Relacion Crear-87", "isController": false}, {"data": [[1.59499422E12, 496.0]], "isOverall": false, "label": "21 - Cerrar  Insis", "isController": true}, {"data": [[1.59499404E12, 6835.333333333333]], "isOverall": false, "label": "11 - Contactos Crear", "isController": true}, {"data": [[1.59499416E12, 2245.6666666666665]], "isOverall": false, "label": "17 - Campos Adicionales-139", "isController": false}, {"data": [[1.59499422E12, 1961.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155", "isController": false}, {"data": [[1.59499422E12, 1976.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154", "isController": false}, {"data": [[1.59499422E12, 1715.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153", "isController": false}, {"data": [[1.59499422E12, 1119.6666666666667]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152", "isController": false}, {"data": [[1.5949941E12, 4267.666666666667]], "isOverall": false, "label": "13 - Relacion Crear-88", "isController": false}, {"data": [[1.59499422E12, 2164.5], [1.59499416E12, 3695.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[1.59499416E12, 3329.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150", "isController": false}, {"data": [[1.59499398E12, 4646.0]], "isOverall": false, "label": "10 - Formulario Domicilio-52", "isController": false}, {"data": [[1.59499398E12, 954.6666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-51", "isController": false}, {"data": [[1.59499398E12, 2706.0]], "isOverall": false, "label": "10 - Formulario Domicilio-50", "isController": false}, {"data": [[1.59499416E12, 2779.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149", "isController": false}, {"data": [[1.59499386E12, 132.33333333333334]], "isOverall": false, "label": "2 - Login-9-0", "isController": false}, {"data": [[1.59499386E12, 2658.6666666666665]], "isOverall": false, "label": "5 - Clientes", "isController": true}, {"data": [[1.59499416E12, 15455.333333333334]], "isOverall": false, "label": "17 - Campos Adicionales", "isController": true}, {"data": [[1.59499416E12, 2753.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[1.59499416E12, 4601.666666666667]], "isOverall": false, "label": "17 - Campos Adicionales-136", "isController": false}, {"data": [[1.59499416E12, 2172.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[1.59499392E12, 6762.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41", "isController": false}, {"data": [[1.59499416E12, 718.3333333333334]], "isOverall": false, "label": "17 - Campos Adicionales-137", "isController": false}, {"data": [[1.59499416E12, 3301.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[1.59499392E12, 935.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42", "isController": false}, {"data": [[1.59499416E12, 4361.333333333333]], "isOverall": false, "label": "17 - Campos Adicionales-138", "isController": false}, {"data": [[1.59499416E12, 3411.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[1.59499386E12, 834.6666666666666]], "isOverall": false, "label": "Inicio - -10", "isController": false}, {"data": [[1.59499386E12, 8430.666666666666]], "isOverall": false, "label": "2 - Login-9-1", "isController": false}, {"data": [[1.59499422E12, 224.66666666666666]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1", "isController": false}, {"data": [[1.59499422E12, 100.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0", "isController": false}, {"data": [[1.59499386E12, 132.33333333333334]], "isOverall": false, "label": "2 - Login-9", "isController": false}, {"data": [[1.59499386E12, 451.0]], "isOverall": false, "label": "2 - Login-7", "isController": false}, {"data": [[1.59499422E12, 1646.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[1.59499422E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59499422E12, 754.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[1.59499422E12, 3247.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[1.59499386E12, 623.3333333333334]], "isOverall": false, "label": "3 - Operaciones del Sistema-11", "isController": false}, {"data": [[1.59499398E12, 2142.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio-49", "isController": false}, {"data": [[1.59499416E12, 3472.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[1.59499398E12, 2418.0]], "isOverall": false, "label": "10 - Formulario Domicilio-48", "isController": false}, {"data": [[1.5949941E12, 3067.6666666666665]], "isOverall": false, "label": "14 - Formulario Relacion -89", "isController": false}, {"data": [[1.5949941E12, 4158.333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -100", "isController": false}, {"data": [[1.59499416E12, 2708.6666666666665]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[1.59499386E12, 3338.6666666666665]], "isOverall": false, "label": "6 - Nuevo Cliente-18", "isController": false}, {"data": [[1.59499398E12, 565.6666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-47", "isController": false}, {"data": [[1.5949941E12, 4491.5], [1.59499416E12, 4171.0]], "isOverall": false, "label": "14 - Formulario Relacion -101", "isController": false}, {"data": [[1.59499416E12, 3072.3333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[1.59499398E12, 1845.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-46", "isController": false}, {"data": [[1.59499416E12, 2805.3333333333335]], "isOverall": false, "label": "14 - Formulario Relacion -102", "isController": false}, {"data": [[1.59499398E12, 2424.3333333333335]], "isOverall": false, "label": "10 - Formulario Domicilio-45", "isController": false}, {"data": [[1.59499416E12, 2433.6666666666665]], "isOverall": false, "label": "14 - Formulario Relacion -103", "isController": false}, {"data": [[1.59499398E12, 5168.0]], "isOverall": false, "label": "10 - Formulario Domicilio-44", "isController": false}, {"data": [[1.59499404E12, 3452.0]], "isOverall": false, "label": "12 - Formulario Contactos-83", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59499422E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.59499386E12, "maxY": 40262.666666666664, "series": [{"data": [[1.59499416E12, 1025.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion Guardar", "isController": true}, {"data": [[1.59499422E12, 731.6666666666666]], "isOverall": false, "label": "19 - Grabar Persona", "isController": true}, {"data": [[1.59499422E12, 204.66666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[1.59499422E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2", "isController": false}, {"data": [[1.59499422E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1", "isController": false}, {"data": [[1.59499422E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0", "isController": false}, {"data": [[1.59499422E12, 136.33333333333331]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[1.59499422E12, 252.33333333333331]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[1.59499422E12, 118.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[1.59499422E12, 240.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[1.5949941E12, 418.6666666666667]], "isOverall": false, "label": "13 - Relacion Crear", "isController": true}, {"data": [[1.59499422E12, 114.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[1.59499422E12, 243.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160", "isController": false}, {"data": [[1.59499422E12, 349.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[1.59499386E12, 365.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20", "isController": false}, {"data": [[1.59499386E12, 318.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21", "isController": false}, {"data": [[1.59499386E12, 429.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22", "isController": false}, {"data": [[1.59499386E12, 356.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23", "isController": false}, {"data": [[1.59499386E12, 746.6666666666666]], "isOverall": false, "label": "6 - Nuevo Cliente", "isController": true}, {"data": [[1.59499392E12, 311.5], [1.59499386E12, 392.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24", "isController": false}, {"data": [[1.59499392E12, 437.0], [1.59499386E12, 316.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25", "isController": false}, {"data": [[1.59499392E12, 428.5], [1.59499386E12, 334.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26", "isController": false}, {"data": [[1.59499392E12, 349.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27", "isController": false}, {"data": [[1.59499392E12, 469.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28", "isController": false}, {"data": [[1.59499404E12, 704.6666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar", "isController": true}, {"data": [[1.59499392E12, 374.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29", "isController": false}, {"data": [[1.59499392E12, 0.0]], "isOverall": false, "label": "9 - Domicilio Crear-43", "isController": false}, {"data": [[1.59499404E12, 392.0]], "isOverall": false, "label": "10 - Formulario Domicilio-76", "isController": false}, {"data": [[1.59499404E12, 462.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-75", "isController": false}, {"data": [[1.59499392E12, 1080.6666666666667]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[1.59499386E12, 107.0]], "isOverall": false, "label": "2 - Login-7-1", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "2 - Login-7-0", "isController": false}, {"data": [[1.59499422E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1", "isController": false}, {"data": [[1.5949941E12, 806.3333333333334]], "isOverall": false, "label": "12 - Formulario Contactos Guardar", "isController": true}, {"data": [[1.59499422E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0", "isController": false}, {"data": [[1.59499392E12, 388.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38", "isController": false}, {"data": [[1.59499392E12, 148.66666666666669]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37", "isController": false}, {"data": [[1.59499392E12, 1404.6399999999999], [1.59499386E12, 395.6363636363637]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[1.59499422E12, 709.6666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[1.59499404E12, 307.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78", "isController": false}, {"data": [[1.59499386E12, 319.3333333333333]], "isOverall": false, "label": "3 - Operaciones del Sistema", "isController": true}, {"data": [[1.59499392E12, 956.3333333333334]], "isOverall": false, "label": "8 - Formulario Datos de Cliente", "isController": true}, {"data": [[1.59499404E12, 397.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77", "isController": false}, {"data": [[1.59499386E12, 438.6666666666667]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19", "isController": false}, {"data": [[1.59499398E12, 432.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-63", "isController": false}, {"data": [[1.59499398E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-62", "isController": false}, {"data": [[1.59499398E12, 322.0]], "isOverall": false, "label": "10 - Formulario Domicilio-61", "isController": false}, {"data": [[1.59499398E12, 349.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-60", "isController": false}, {"data": [[1.59499404E12, 0.0]], "isOverall": false, "label": "11 - Contactos Crear-81", "isController": false}, {"data": [[1.5949941E12, 362.3333333333333]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[1.59499416E12, 351.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[1.59499404E12, 574.6666666666666]], "isOverall": false, "label": "11 - Contactos Crear-80", "isController": false}, {"data": [[1.59499416E12, 673.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[1.59499392E12, 0.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39", "isController": false}, {"data": [[1.5949941E12, 444.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[1.5949941E12, 332.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -90", "isController": false}, {"data": [[1.5949941E12, 382.0]], "isOverall": false, "label": "14 - Formulario Relacion -91", "isController": false}, {"data": [[1.5949941E12, 321.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -92", "isController": false}, {"data": [[1.5949941E12, 0.0]], "isOverall": false, "label": "14 - Formulario Relacion -93", "isController": false}, {"data": [[1.5949941E12, 361.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -94", "isController": false}, {"data": [[1.5949941E12, 346.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -95", "isController": false}, {"data": [[1.59499422E12, 105.33333333333334]], "isOverall": false, "label": "20 - Cerrar  Persona-175", "isController": false}, {"data": [[1.5949941E12, 462.3333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -96", "isController": false}, {"data": [[1.59499422E12, 0.0]], "isOverall": false, "label": "20 - Cerrar  Persona-176", "isController": false}, {"data": [[1.5949941E12, 538.3333333333334]], "isOverall": false, "label": "14 - Formulario Relacion -97", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "4 - Mod de Personas", "isController": true}, {"data": [[1.5949941E12, 420.0]], "isOverall": false, "label": "14 - Formulario Relacion -98", "isController": false}, {"data": [[1.59499392E12, 416.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40", "isController": false}, {"data": [[1.5949941E12, 416.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -99", "isController": false}, {"data": [[1.59499398E12, 550.0]], "isOverall": false, "label": "10 - Formulario Domicilio-59", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "1 - Index-1", "isController": false}, {"data": [[1.59499386E12, 722.0]], "isOverall": false, "label": "1 - Index", "isController": true}, {"data": [[1.59499398E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-58", "isController": false}, {"data": [[1.59499422E12, 104.66666666666666]], "isOverall": false, "label": "20 - Cerrar  Persona-177", "isController": false}, {"data": [[1.59499422E12, 40262.666666666664]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59499398E12, 320.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-57", "isController": false}, {"data": [[1.59499422E12, 212.0]], "isOverall": false, "label": "20 - Cerrar  Persona-178", "isController": false}, {"data": [[1.59499398E12, 309.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-56", "isController": false}, {"data": [[1.59499398E12, 334.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-55", "isController": false}, {"data": [[1.59499398E12, 412.0]], "isOverall": false, "label": "10 - Formulario Domicilio-54", "isController": false}, {"data": [[1.59499398E12, 335.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-53", "isController": false}, {"data": [[1.59499404E12, 370.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-74", "isController": false}, {"data": [[1.59499404E12, 358.0]], "isOverall": false, "label": "10 - Formulario Domicilio-73", "isController": false}, {"data": [[1.59499404E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-72", "isController": false}, {"data": [[1.59499422E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[1.59499404E12, 310.0]], "isOverall": false, "label": "10 - Formulario Domicilio-71", "isController": false}, {"data": [[1.59499404E12, 311.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-70", "isController": false}, {"data": [[1.59499422E12, 5279.833333333334], [1.59499416E12, 1635.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales", "isController": true}, {"data": [[1.59499422E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183", "isController": false}, {"data": [[1.59499398E12, 3028.6666666666665], [1.59499404E12, 3580.333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio", "isController": true}, {"data": [[1.59499422E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185", "isController": false}, {"data": [[1.59499422E12, 208.33333333333334]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[1.59499422E12, 141.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[1.59499392E12, 536.6666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar", "isController": true}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "1 - Index-1-1", "isController": false}, {"data": [[1.59499392E12, 405.6666666666667]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30", "isController": false}, {"data": [[1.59499404E12, 0.0]], "isOverall": false, "label": "11 - Contactos Crear-79", "isController": false}, {"data": [[1.59499392E12, 369.6666666666667]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31", "isController": false}, {"data": [[1.59499392E12, 366.6666666666667]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32", "isController": false}, {"data": [[1.59499392E12, 145.66666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33", "isController": false}, {"data": [[1.59499392E12, 441.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34", "isController": false}, {"data": [[1.59499392E12, 339.6666666666667]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35", "isController": false}, {"data": [[1.59499392E12, 411.3333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36", "isController": false}, {"data": [[1.59499422E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182", "isController": false}, {"data": [[1.59499422E12, 422.0]], "isOverall": false, "label": "20 - Cerrar  Persona", "isController": true}, {"data": [[1.59499404E12, 334.0]], "isOverall": false, "label": "10 - Formulario Domicilio-69", "isController": false}, {"data": [[1.59499404E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-68", "isController": false}, {"data": [[1.59499416E12, 4788.5]], "isOverall": false, "label": "14 - Formulario Relacion ", "isController": true}, {"data": [[1.59499386E12, 430.6666666666667]], "isOverall": false, "label": "5 - Clientes-14", "isController": false}, {"data": [[1.59499404E12, 379.0]], "isOverall": false, "label": "10 - Formulario Domicilio-67", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "5 - Clientes-13", "isController": false}, {"data": [[1.59499404E12, 381.0]], "isOverall": false, "label": "10 - Formulario Domicilio-66", "isController": false}, {"data": [[1.59499404E12, 332.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-65", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "1 - Index-1-0", "isController": false}, {"data": [[1.59499398E12, 0.0], [1.59499404E12, 492.0]], "isOverall": false, "label": "10 - Formulario Domicilio-64", "isController": false}, {"data": [[1.59499404E12, 332.6666666666667]], "isOverall": false, "label": "12 - Formulario Contactos-82", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "4 - Mod de Personas-12", "isController": false}, {"data": [[1.59499386E12, 362.6666666666667]], "isOverall": false, "label": "6 - Nuevo Cliente-16", "isController": false}, {"data": [[1.59499422E12, 245.33333333333334]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159", "isController": false}, {"data": [[1.59499386E12, 384.0]], "isOverall": false, "label": "6 - Nuevo Cliente-17", "isController": false}, {"data": [[1.59499422E12, 111.33333333333334]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[1.5949941E12, 1502.0], [1.59499404E12, 363.0]], "isOverall": false, "label": "12 - Formulario Contactos", "isController": true}, {"data": [[1.59499422E12, 243.66666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "6 - Nuevo Cliente-15", "isController": false}, {"data": [[1.59499422E12, 108.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156", "isController": false}, {"data": [[1.59499422E12, 344.3333333333333]], "isOverall": false, "label": "19 - Grabar Persona-173", "isController": false}, {"data": [[1.59499422E12, 387.3333333333333]], "isOverall": false, "label": "19 - Grabar Persona-174", "isController": false}, {"data": [[1.59499404E12, 10894.0]], "isOverall": false, "label": "9 - Domicilio Crear", "isController": true}, {"data": [[1.59499416E12, 317.0]], "isOverall": false, "label": "17 - Campos Adicionales-140", "isController": false}, {"data": [[1.59499416E12, 0.0]], "isOverall": false, "label": "17 - Campos Adicionales-141", "isController": false}, {"data": [[1.5949941E12, 103.66666666666667]], "isOverall": false, "label": "13 - Relacion Crear-86", "isController": false}, {"data": [[1.5949941E12, 315.0]], "isOverall": false, "label": "13 - Relacion Crear-87", "isController": false}, {"data": [[1.59499422E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis", "isController": true}, {"data": [[1.59499404E12, 574.6666666666666]], "isOverall": false, "label": "11 - Contactos Crear", "isController": true}, {"data": [[1.59499416E12, 339.6666666666667]], "isOverall": false, "label": "17 - Campos Adicionales-139", "isController": false}, {"data": [[1.59499422E12, 238.66666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155", "isController": false}, {"data": [[1.59499422E12, 229.66666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154", "isController": false}, {"data": [[1.59499422E12, 115.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153", "isController": false}, {"data": [[1.59499422E12, 236.33333333333334]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152", "isController": false}, {"data": [[1.5949941E12, 0.0]], "isOverall": false, "label": "13 - Relacion Crear-88", "isController": false}, {"data": [[1.59499422E12, 386.0], [1.59499416E12, 342.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[1.59499416E12, 239.33333333333331]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150", "isController": false}, {"data": [[1.59499398E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-52", "isController": false}, {"data": [[1.59499398E12, 472.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-51", "isController": false}, {"data": [[1.59499398E12, 383.0]], "isOverall": false, "label": "10 - Formulario Domicilio-50", "isController": false}, {"data": [[1.59499416E12, 413.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "2 - Login-9-0", "isController": false}, {"data": [[1.59499386E12, 430.6666666666667]], "isOverall": false, "label": "5 - Clientes", "isController": true}, {"data": [[1.59499416E12, 1081.0]], "isOverall": false, "label": "17 - Campos Adicionales", "isController": true}, {"data": [[1.59499416E12, 283.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[1.59499416E12, 109.33333333333333]], "isOverall": false, "label": "17 - Campos Adicionales-136", "isController": false}, {"data": [[1.59499416E12, 456.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[1.59499392E12, 730.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41", "isController": false}, {"data": [[1.59499416E12, 315.0]], "isOverall": false, "label": "17 - Campos Adicionales-137", "isController": false}, {"data": [[1.59499416E12, 482.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[1.59499392E12, 350.6666666666667]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42", "isController": false}, {"data": [[1.59499416E12, 0.0]], "isOverall": false, "label": "17 - Campos Adicionales-138", "isController": false}, {"data": [[1.59499416E12, 368.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[1.59499386E12, 722.0]], "isOverall": false, "label": "Inicio - -10", "isController": false}, {"data": [[1.59499386E12, 138.66666666666666]], "isOverall": false, "label": "2 - Login-9-1", "isController": false}, {"data": [[1.59499422E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1", "isController": false}, {"data": [[1.59499422E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "2 - Login-9", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "2 - Login-7", "isController": false}, {"data": [[1.59499422E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[1.59499422E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59499422E12, 390.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[1.59499422E12, 114.66666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[1.59499386E12, 319.3333333333333]], "isOverall": false, "label": "3 - Operaciones del Sistema-11", "isController": false}, {"data": [[1.59499398E12, 373.0]], "isOverall": false, "label": "10 - Formulario Domicilio-49", "isController": false}, {"data": [[1.59499416E12, 334.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[1.59499398E12, 177.33333333333331]], "isOverall": false, "label": "10 - Formulario Domicilio-48", "isController": false}, {"data": [[1.5949941E12, 368.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -89", "isController": false}, {"data": [[1.5949941E12, 339.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -100", "isController": false}, {"data": [[1.59499416E12, 331.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "6 - Nuevo Cliente-18", "isController": false}, {"data": [[1.59499398E12, 359.0]], "isOverall": false, "label": "10 - Formulario Domicilio-47", "isController": false}, {"data": [[1.5949941E12, 320.5], [1.59499416E12, 447.0]], "isOverall": false, "label": "14 - Formulario Relacion -101", "isController": false}, {"data": [[1.59499416E12, 347.3333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[1.59499398E12, 426.3333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-46", "isController": false}, {"data": [[1.59499416E12, 340.0]], "isOverall": false, "label": "14 - Formulario Relacion -102", "isController": false}, {"data": [[1.59499398E12, 433.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-45", "isController": false}, {"data": [[1.59499416E12, 339.6666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -103", "isController": false}, {"data": [[1.59499398E12, 403.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio-44", "isController": false}, {"data": [[1.59499404E12, 363.0]], "isOverall": false, "label": "12 - Formulario Contactos-83", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59499422E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.59499386E12, "maxY": 11732.0, "series": [{"data": [[1.59499398E12, 6100.0], [1.5949941E12, 4787.0], [1.59499392E12, 11732.0], [1.59499422E12, 6333.0], [1.59499404E12, 5020.0], [1.59499386E12, 11668.0], [1.59499416E12, 7614.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.59499398E12, 198.0], [1.5949941E12, 1040.0], [1.59499392E12, 733.0], [1.59499422E12, 0.0], [1.59499404E12, 1044.0], [1.59499386E12, 105.0], [1.59499416E12, 516.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.59499398E12, 5082.000000000001], [1.5949941E12, 4556.0], [1.59499392E12, 6887.8], [1.59499422E12, 2046.6], [1.59499404E12, 4131.4], [1.59499386E12, 3864.3], [1.59499416E12, 4851.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.59499398E12, 6100.0], [1.5949941E12, 4787.0], [1.59499392E12, 11732.0], [1.59499422E12, 6134.949999999998], [1.59499404E12, 5020.0], [1.59499386E12, 11668.0], [1.59499416E12, 7614.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.59499398E12, 5673.799999999997], [1.5949941E12, 4661.1], [1.59499392E12, 7963.499999999993], [1.59499422E12, 3386.35], [1.59499404E12, 4397.8499999999985], [1.59499386E12, 11130.349999999999], [1.59499416E12, 7261.0]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59499422E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 172.5, "minX": 1.0, "maxY": 3120.0, "series": [{"data": [[8.0, 315.0], [2.0, 2920.5], [1.0, 3120.0], [4.0, 1672.5], [9.0, 320.0], [18.0, 172.5], [5.0, 612.0], [3.0, 2653.0], [6.0, 377.0], [13.0, 368.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 18.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 120.5, "minX": 1.0, "maxY": 2883.5, "series": [{"data": [[8.0, 205.0], [2.0, 2628.0], [1.0, 2883.5], [4.0, 1444.5], [9.0, 318.0], [18.0, 120.5], [5.0, 545.5], [3.0, 2311.0], [6.0, 172.5], [13.0, 243.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 18.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.8833333333333333, "minX": 1.59499386E12, "maxY": 1.8833333333333333, "series": [{"data": [[1.59499398E12, 1.0333333333333334], [1.5949941E12, 0.8833333333333333], [1.59499392E12, 0.95], [1.59499422E12, 1.8833333333333333], [1.59499404E12, 0.9666666666666667], [1.59499386E12, 1.25], [1.59499416E12, 0.9833333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59499422E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.15, "minX": 1.59499386E12, "maxY": 1.7333333333333334, "series": [{"data": [[1.59499398E12, 1.0333333333333334], [1.5949941E12, 0.8833333333333333], [1.59499392E12, 0.95], [1.59499422E12, 1.7333333333333334], [1.59499404E12, 0.9666666666666667], [1.59499386E12, 1.05], [1.59499416E12, 0.9833333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.59499422E12, 0.2], [1.59499386E12, 0.15]], "isOverall": false, "label": "302", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59499422E12, "title": "Codes Per Second"}},
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
        return;
    }
    }