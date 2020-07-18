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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 3.0, "series": [{"data": [[2300.0, 1.0], [1200.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar", "isController": true}, {"data": [[3500.0, 2.0]], "isOverall": false, "label": "19 - Grabar Persona", "isController": true}, {"data": [[800.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[100.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2", "isController": false}, {"data": [[100.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1", "isController": false}, {"data": [[200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0", "isController": false}, {"data": [[1100.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[1200.0, 1.0], [1400.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[700.0, 2.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[2100.0, 1.0], [2500.0, 1.0]], "isOverall": false, "label": "13 - Relacion Crear", "isController": true}, {"data": [[700.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160", "isController": false}, {"data": [[2400.0, 2.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[31300.0, 1.0], [31500.0, 1.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[300.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20", "isController": false}, {"data": [[5000.0, 1.0], [5500.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21", "isController": false}, {"data": [[1100.0, 2.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22", "isController": false}, {"data": [[600.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23", "isController": false}, {"data": [[9000.0, 1.0], [9400.0, 1.0]], "isOverall": false, "label": "6 - Nuevo Cliente", "isController": true}, {"data": [[900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25", "isController": false}, {"data": [[400.0, 2.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26", "isController": false}, {"data": [[400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27", "isController": false}, {"data": [[2900.0, 2.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar", "isController": true}, {"data": [[1100.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29", "isController": false}, {"data": [[700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "9 - Domicilio Crear-43", "isController": false}, {"data": [[800.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-76", "isController": false}, {"data": [[500.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-75", "isController": false}, {"data": [[2400.0, 1.0], [2800.0, 1.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[400.0, 2.0]], "isOverall": false, "label": "2 - Login-7-1", "isController": false}, {"data": [[7100.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "2 - Login-7-0", "isController": false}, {"data": [[800.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1", "isController": false}, {"data": [[1100.0, 1.0], [1300.0, 1.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar", "isController": true}, {"data": [[2500.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0", "isController": false}, {"data": [[800.0, 2.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38", "isController": false}, {"data": [[33700.0, 2.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37", "isController": false}, {"data": [[2200.0, 1.0], [600.0, 1.0], [2600.0, 1.0], [700.0, 1.0], [800.0, 1.0], [200.0, 1.0], [55700.0, 1.0], [55400.0, 1.0], [900.0, 1.0], [3800.0, 1.0], [1000.0, 1.0], [4000.0, 1.0], [1100.0, 2.0], [1200.0, 1.0], [5000.0, 1.0], [5500.0, 1.0], [1400.0, 1.0], [400.0, 3.0], [1700.0, 1.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[4100.0, 1.0], [3300.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78", "isController": false}, {"data": [[700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "3 - Operaciones del Sistema", "isController": true}, {"data": [[400.0, 2.0], [3300.0, 1.0], [3700.0, 1.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente", "isController": true}, {"data": [[900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77", "isController": false}, {"data": [[600.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19", "isController": false}, {"data": [[400.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-63", "isController": false}, {"data": [[1100.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-62", "isController": false}, {"data": [[600.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-61", "isController": false}, {"data": [[900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-60", "isController": false}, {"data": [[900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "11 - Contactos Crear-81", "isController": false}, {"data": [[600.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[1500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "11 - Contactos Crear-80", "isController": false}, {"data": [[100.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[400.0, 2.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39", "isController": false}, {"data": [[600.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[300.0, 1.0], [1400.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -90", "isController": false}, {"data": [[700.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -91", "isController": false}, {"data": [[200.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -92", "isController": false}, {"data": [[400.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -93", "isController": false}, {"data": [[400.0, 2.0]], "isOverall": false, "label": "14 - Formulario Relacion -94", "isController": false}, {"data": [[600.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -95", "isController": false}, {"data": [[300.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "20 - Cerrar  Persona-175", "isController": false}, {"data": [[700.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -96", "isController": false}, {"data": [[1100.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "20 - Cerrar  Persona-176", "isController": false}, {"data": [[1100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -97", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "4 - Mod de Personas", "isController": true}, {"data": [[600.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -98", "isController": false}, {"data": [[400.0, 2.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40", "isController": false}, {"data": [[700.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -99", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-59", "isController": false}, {"data": [[400.0, 2.0]], "isOverall": false, "label": "1 - Index-1", "isController": false}, {"data": [[1100.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "1 - Index", "isController": true}, {"data": [[600.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-58", "isController": false}, {"data": [[1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "20 - Cerrar  Persona-177", "isController": false}, {"data": [[218700.0, 1.0], [217700.0, 1.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[400.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-57", "isController": false}, {"data": [[200.0, 2.0]], "isOverall": false, "label": "20 - Cerrar  Persona-178", "isController": false}, {"data": [[800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-56", "isController": false}, {"data": [[1200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-55", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-54", "isController": false}, {"data": [[400.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-53", "isController": false}, {"data": [[800.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-74", "isController": false}, {"data": [[600.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-73", "isController": false}, {"data": [[1000.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-72", "isController": false}, {"data": [[700.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[700.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-71", "isController": false}, {"data": [[1200.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-70", "isController": false}, {"data": [[4200.0, 1.0], [34200.0, 1.0], [18200.0, 1.0], [19800.0, 1.0], [3800.0, 1.0], [32700.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales", "isController": true}, {"data": [[300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183", "isController": false}, {"data": [[4900.0, 1.0], [5200.0, 1.0], [1300.0, 2.0], [16100.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio", "isController": true}, {"data": [[300.0, 1.0], [3300.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185", "isController": false}, {"data": [[1400.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[300.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[34500.0, 2.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar", "isController": true}, {"data": [[200.0, 2.0]], "isOverall": false, "label": "1 - Index-1-1", "isController": false}, {"data": [[500.0, 2.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30", "isController": false}, {"data": [[600.0, 2.0]], "isOverall": false, "label": "11 - Contactos Crear-79", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31", "isController": false}, {"data": [[400.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32", "isController": false}, {"data": [[700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33", "isController": false}, {"data": [[400.0, 2.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34", "isController": false}, {"data": [[2200.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35", "isController": false}, {"data": [[1400.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36", "isController": false}, {"data": [[600.0, 1.0], [2400.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182", "isController": false}, {"data": [[2700.0, 1.0], [2800.0, 1.0]], "isOverall": false, "label": "20 - Cerrar  Persona", "isController": true}, {"data": [[300.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-69", "isController": false}, {"data": [[900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-68", "isController": false}, {"data": [[5600.0, 1.0], [6100.0, 1.0], [12100.0, 1.0], [13100.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion ", "isController": true}, {"data": [[1100.0, 2.0]], "isOverall": false, "label": "5 - Clientes-14", "isController": false}, {"data": [[100.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-67", "isController": false}, {"data": [[14200.0, 2.0]], "isOverall": false, "label": "5 - Clientes-13", "isController": false}, {"data": [[500.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-66", "isController": false}, {"data": [[600.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-65", "isController": false}, {"data": [[200.0, 2.0]], "isOverall": false, "label": "1 - Index-1-0", "isController": false}, {"data": [[800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-64", "isController": false}, {"data": [[900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "12 - Formulario Contactos-82", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "4 - Mod de Personas-12", "isController": false}, {"data": [[1100.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "6 - Nuevo Cliente-16", "isController": false}, {"data": [[1100.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "6 - Nuevo Cliente-17", "isController": false}, {"data": [[1200.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[2200.0, 1.0], [2800.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "12 - Formulario Contactos", "isController": true}, {"data": [[1200.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157", "isController": false}, {"data": [[7300.0, 1.0], [7900.0, 1.0]], "isOverall": false, "label": "6 - Nuevo Cliente-15", "isController": false}, {"data": [[1200.0, 1.0], [1300.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156", "isController": false}, {"data": [[2400.0, 1.0], [2500.0, 1.0]], "isOverall": false, "label": "19 - Grabar Persona-173", "isController": false}, {"data": [[1000.0, 2.0]], "isOverall": false, "label": "19 - Grabar Persona-174", "isController": false}, {"data": [[24300.0, 1.0], [24600.0, 1.0]], "isOverall": false, "label": "9 - Domicilio Crear", "isController": true}, {"data": [[200.0, 2.0]], "isOverall": false, "label": "17 - Campos Adicionales-140", "isController": false}, {"data": [[4600.0, 1.0], [5200.0, 1.0]], "isOverall": false, "label": "17 - Campos Adicionales-141", "isController": false}, {"data": [[900.0, 2.0]], "isOverall": false, "label": "13 - Relacion Crear-86", "isController": false}, {"data": [[600.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "13 - Relacion Crear-87", "isController": false}, {"data": [[4100.0, 1.0], [3100.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis", "isController": true}, {"data": [[1400.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "11 - Contactos Crear", "isController": true}, {"data": [[1100.0, 2.0]], "isOverall": false, "label": "17 - Campos Adicionales-139", "isController": false}, {"data": [[1400.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155", "isController": false}, {"data": [[1300.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154", "isController": false}, {"data": [[1100.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153", "isController": false}, {"data": [[1300.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152", "isController": false}, {"data": [[800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "13 - Relacion Crear-88", "isController": false}, {"data": [[1200.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[1100.0, 1.0], [1400.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150", "isController": false}, {"data": [[1100.0, 1.0], [1400.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-52", "isController": false}, {"data": [[200.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-51", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-50", "isController": false}, {"data": [[1200.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "2 - Login-9-0", "isController": false}, {"data": [[15400.0, 2.0]], "isOverall": false, "label": "5 - Clientes", "isController": true}, {"data": [[13500.0, 2.0]], "isOverall": false, "label": "17 - Campos Adicionales", "isController": true}, {"data": [[1000.0, 2.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[3300.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "17 - Campos Adicionales-136", "isController": false}, {"data": [[600.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41", "isController": false}, {"data": [[500.0, 2.0]], "isOverall": false, "label": "17 - Campos Adicionales-137", "isController": false}, {"data": [[1300.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42", "isController": false}, {"data": [[2800.0, 1.0], [2900.0, 1.0]], "isOverall": false, "label": "17 - Campos Adicionales-138", "isController": false}, {"data": [[700.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[600.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "Inicio - -10", "isController": false}, {"data": [[22600.0, 1.0], [23800.0, 1.0]], "isOverall": false, "label": "2 - Login-9-1", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1", "isController": false}, {"data": [[100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0", "isController": false}, {"data": [[22700.0, 1.0], [23900.0, 1.0]], "isOverall": false, "label": "2 - Login-9", "isController": false}, {"data": [[8600.0, 1.0], [7500.0, 1.0]], "isOverall": false, "label": "2 - Login-7", "isController": false}, {"data": [[400.0, 2.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[600.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[1700.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "3 - Operaciones del Sistema-11", "isController": false}, {"data": [[900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-49", "isController": false}, {"data": [[1100.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-48", "isController": false}, {"data": [[600.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -89", "isController": false}, {"data": [[400.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -100", "isController": false}, {"data": [[700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[400.0, 2.0]], "isOverall": false, "label": "6 - Nuevo Cliente-18", "isController": false}, {"data": [[200.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-47", "isController": false}, {"data": [[700.0, 2.0]], "isOverall": false, "label": "14 - Formulario Relacion -101", "isController": false}, {"data": [[1400.0, 2.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[600.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-46", "isController": false}, {"data": [[600.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -102", "isController": false}, {"data": [[900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-45", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -103", "isController": false}, {"data": [[800.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio-44", "isController": false}, {"data": [[500.0, 2.0]], "isOverall": false, "label": "12 - Formulario Contactos-83", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 218700.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 45.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 186.0, "series": [{"data": [[0.0, 87.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 186.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 45.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 2.0, "minX": 1.59496254E12, "maxY": 2.0, "series": [{"data": [[1.5949626E12, 2.0], [1.59496272E12, 2.0], [1.59496254E12, 2.0], [1.59496266E12, 2.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59496272E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 1.0, "minX": 2.0, "maxY": 218244.5, "series": [{"data": [[2.0, 1782.5]], "isOverall": false, "label": "14 - Formulario Relacion Guardar", "isController": true}, {"data": [[2.0, 1782.5]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-Aggregated", "isController": true}, {"data": [[2.0, 3558.5]], "isOverall": false, "label": "19 - Grabar Persona", "isController": true}, {"data": [[2.0, 3558.5]], "isOverall": false, "label": "19 - Grabar Persona-Aggregated", "isController": true}, {"data": [[2.0, 666.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[2.0, 666.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169-Aggregated", "isController": false}, {"data": [[2.0, 582.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2", "isController": false}, {"data": [[2.0, 582.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2-Aggregated", "isController": false}, {"data": [[2.0, 575.5]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1", "isController": false}, {"data": [[2.0, 575.5]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1-Aggregated", "isController": false}, {"data": [[2.0, 384.5]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0", "isController": false}, {"data": [[2.0, 384.5]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0-Aggregated", "isController": false}, {"data": [[2.0, 933.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[2.0, 933.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165-Aggregated", "isController": false}, {"data": [[2.0, 681.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[2.0, 681.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164-Aggregated", "isController": false}, {"data": [[2.0, 1342.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[2.0, 1342.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163-Aggregated", "isController": false}, {"data": [[2.0, 722.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[2.0, 722.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162-Aggregated", "isController": false}, {"data": [[2.0, 2315.5]], "isOverall": false, "label": "13 - Relacion Crear", "isController": true}, {"data": [[2.0, 2315.5]], "isOverall": false, "label": "13 - Relacion Crear-Aggregated", "isController": true}, {"data": [[2.0, 781.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[2.0, 781.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161-Aggregated", "isController": false}, {"data": [[2.0, 1016.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160", "isController": false}, {"data": [[2.0, 1016.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160-Aggregated", "isController": false}, {"data": [[2.0, 2440.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[2.0, 2440.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-Aggregated", "isController": true}, {"data": [[2.0, 31427.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[2.0, 31427.0]], "isOverall": false, "label": "2 - Login-Aggregated", "isController": true}, {"data": [[2.0, 569.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20", "isController": false}, {"data": [[2.0, 569.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20-Aggregated", "isController": false}, {"data": [[2.0, 5295.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21", "isController": false}, {"data": [[2.0, 5295.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21-Aggregated", "isController": false}, {"data": [[2.0, 1154.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22", "isController": false}, {"data": [[2.0, 1154.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22-Aggregated", "isController": false}, {"data": [[2.0, 761.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23", "isController": false}, {"data": [[2.0, 761.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23-Aggregated", "isController": false}, {"data": [[2.0, 9245.5]], "isOverall": false, "label": "6 - Nuevo Cliente", "isController": true}, {"data": [[2.0, 9245.5]], "isOverall": false, "label": "6 - Nuevo Cliente-Aggregated", "isController": true}, {"data": [[2.0, 983.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24", "isController": false}, {"data": [[2.0, 983.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24-Aggregated", "isController": false}, {"data": [[2.0, 529.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25", "isController": false}, {"data": [[2.0, 529.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25-Aggregated", "isController": false}, {"data": [[2.0, 446.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26", "isController": false}, {"data": [[2.0, 446.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26-Aggregated", "isController": false}, {"data": [[2.0, 354.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27", "isController": false}, {"data": [[2.0, 354.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27-Aggregated", "isController": false}, {"data": [[2.0, 2940.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28", "isController": false}, {"data": [[2.0, 2940.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28-Aggregated", "isController": false}, {"data": [[2.0, 1202.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar", "isController": true}, {"data": [[2.0, 1202.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-Aggregated", "isController": true}, {"data": [[2.0, 1009.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29", "isController": false}, {"data": [[2.0, 1009.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29-Aggregated", "isController": false}, {"data": [[2.0, 638.0]], "isOverall": false, "label": "9 - Domicilio Crear-43", "isController": false}, {"data": [[2.0, 638.0]], "isOverall": false, "label": "9 - Domicilio Crear-43-Aggregated", "isController": false}, {"data": [[2.0, 839.5]], "isOverall": false, "label": "10 - Formulario Domicilio-76", "isController": false}, {"data": [[2.0, 839.5]], "isOverall": false, "label": "10 - Formulario Domicilio-76-Aggregated", "isController": false}, {"data": [[2.0, 509.5]], "isOverall": false, "label": "10 - Formulario Domicilio-75", "isController": false}, {"data": [[2.0, 509.5]], "isOverall": false, "label": "10 - Formulario Domicilio-75-Aggregated", "isController": false}, {"data": [[2.0, 2653.5]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[2.0, 2653.5]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-Aggregated", "isController": true}, {"data": [[2.0, 433.5]], "isOverall": false, "label": "2 - Login-7-1", "isController": false}, {"data": [[2.0, 433.5]], "isOverall": false, "label": "2 - Login-7-1-Aggregated", "isController": false}, {"data": [[2.0, 7651.5]], "isOverall": false, "label": "2 - Login-7-0", "isController": false}, {"data": [[2.0, 7651.5]], "isOverall": false, "label": "2 - Login-7-0-Aggregated", "isController": false}, {"data": [[2.0, 496.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1", "isController": false}, {"data": [[2.0, 496.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1-Aggregated", "isController": false}, {"data": [[2.0, 1247.5]], "isOverall": false, "label": "12 - Formulario Contactos Guardar", "isController": true}, {"data": [[2.0, 1247.5]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-Aggregated", "isController": true}, {"data": [[2.0, 1350.5]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0", "isController": false}, {"data": [[2.0, 1350.5]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0-Aggregated", "isController": false}, {"data": [[2.0, 807.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38", "isController": false}, {"data": [[2.0, 807.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38-Aggregated", "isController": false}, {"data": [[2.0, 33738.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37", "isController": false}, {"data": [[2.0, 33738.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37-Aggregated", "isController": false}, {"data": [[2.0, 6294.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[2.0, 6294.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-Aggregated", "isController": true}, {"data": [[2.0, 3737.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[2.0, 3737.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-Aggregated", "isController": true}, {"data": [[2.0, 218.5]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78", "isController": false}, {"data": [[2.0, 218.5]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78-Aggregated", "isController": false}, {"data": [[2.0, 662.0]], "isOverall": false, "label": "3 - Operaciones del Sistema", "isController": true}, {"data": [[2.0, 662.0]], "isOverall": false, "label": "3 - Operaciones del Sistema-Aggregated", "isController": true}, {"data": [[2.0, 1986.75]], "isOverall": false, "label": "8 - Formulario Datos de Cliente", "isController": true}, {"data": [[2.0, 1986.75]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-Aggregated", "isController": true}, {"data": [[2.0, 983.5]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77", "isController": false}, {"data": [[2.0, 983.5]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77-Aggregated", "isController": false}, {"data": [[2.0, 555.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19", "isController": false}, {"data": [[2.0, 555.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19-Aggregated", "isController": false}, {"data": [[2.0, 694.0]], "isOverall": false, "label": "10 - Formulario Domicilio-63", "isController": false}, {"data": [[2.0, 694.0]], "isOverall": false, "label": "10 - Formulario Domicilio-63-Aggregated", "isController": false}, {"data": [[2.0, 1057.0]], "isOverall": false, "label": "10 - Formulario Domicilio-62", "isController": false}, {"data": [[2.0, 1057.0]], "isOverall": false, "label": "10 - Formulario Domicilio-62-Aggregated", "isController": false}, {"data": [[2.0, 402.5]], "isOverall": false, "label": "10 - Formulario Domicilio-61", "isController": false}, {"data": [[2.0, 402.5]], "isOverall": false, "label": "10 - Formulario Domicilio-61-Aggregated", "isController": false}, {"data": [[2.0, 759.5]], "isOverall": false, "label": "10 - Formulario Domicilio-60", "isController": false}, {"data": [[2.0, 759.5]], "isOverall": false, "label": "10 - Formulario Domicilio-60-Aggregated", "isController": false}, {"data": [[2.0, 793.0]], "isOverall": false, "label": "11 - Contactos Crear-81", "isController": false}, {"data": [[2.0, 793.0]], "isOverall": false, "label": "11 - Contactos Crear-81-Aggregated", "isController": false}, {"data": [[2.0, 448.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[2.0, 448.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85-Aggregated", "isController": false}, {"data": [[2.0, 1274.5]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[2.0, 1274.5]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104-Aggregated", "isController": false}, {"data": [[2.0, 174.0]], "isOverall": false, "label": "11 - Contactos Crear-80", "isController": false}, {"data": [[2.0, 174.0]], "isOverall": false, "label": "11 - Contactos Crear-80-Aggregated", "isController": false}, {"data": [[2.0, 508.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[2.0, 508.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105-Aggregated", "isController": false}, {"data": [[2.0, 499.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39", "isController": false}, {"data": [[2.0, 499.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39-Aggregated", "isController": false}, {"data": [[2.0, 799.5]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[2.0, 799.5]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84-Aggregated", "isController": false}, {"data": [[2.0, 926.0]], "isOverall": false, "label": "14 - Formulario Relacion -90", "isController": false}, {"data": [[2.0, 926.0]], "isOverall": false, "label": "14 - Formulario Relacion -90-Aggregated", "isController": false}, {"data": [[2.0, 637.0]], "isOverall": false, "label": "14 - Formulario Relacion -91", "isController": false}, {"data": [[2.0, 637.0]], "isOverall": false, "label": "14 - Formulario Relacion -91-Aggregated", "isController": false}, {"data": [[2.0, 614.0]], "isOverall": false, "label": "14 - Formulario Relacion -92", "isController": false}, {"data": [[2.0, 614.0]], "isOverall": false, "label": "14 - Formulario Relacion -92-Aggregated", "isController": false}, {"data": [[2.0, 678.5]], "isOverall": false, "label": "14 - Formulario Relacion -93", "isController": false}, {"data": [[2.0, 678.5]], "isOverall": false, "label": "14 - Formulario Relacion -93-Aggregated", "isController": false}, {"data": [[2.0, 472.5]], "isOverall": false, "label": "14 - Formulario Relacion -94", "isController": false}, {"data": [[2.0, 472.5]], "isOverall": false, "label": "14 - Formulario Relacion -94-Aggregated", "isController": false}, {"data": [[2.0, 772.5]], "isOverall": false, "label": "14 - Formulario Relacion -95", "isController": false}, {"data": [[2.0, 772.5]], "isOverall": false, "label": "14 - Formulario Relacion -95-Aggregated", "isController": false}, {"data": [[2.0, 361.0]], "isOverall": false, "label": "20 - Cerrar  Persona-175", "isController": false}, {"data": [[2.0, 361.0]], "isOverall": false, "label": "20 - Cerrar  Persona-175-Aggregated", "isController": false}, {"data": [[2.0, 870.0]], "isOverall": false, "label": "14 - Formulario Relacion -96", "isController": false}, {"data": [[2.0, 870.0]], "isOverall": false, "label": "14 - Formulario Relacion -96-Aggregated", "isController": false}, {"data": [[2.0, 1424.0]], "isOverall": false, "label": "20 - Cerrar  Persona-176", "isController": false}, {"data": [[2.0, 1424.0]], "isOverall": false, "label": "20 - Cerrar  Persona-176-Aggregated", "isController": false}, {"data": [[2.0, 829.5]], "isOverall": false, "label": "14 - Formulario Relacion -97", "isController": false}, {"data": [[2.0, 829.5]], "isOverall": false, "label": "14 - Formulario Relacion -97-Aggregated", "isController": false}, {"data": [[2.0, 128.5]], "isOverall": false, "label": "4 - Mod de Personas", "isController": true}, {"data": [[2.0, 128.5]], "isOverall": false, "label": "4 - Mod de Personas-Aggregated", "isController": true}, {"data": [[2.0, 531.0]], "isOverall": false, "label": "14 - Formulario Relacion -98", "isController": false}, {"data": [[2.0, 531.0]], "isOverall": false, "label": "14 - Formulario Relacion -98-Aggregated", "isController": false}, {"data": [[2.0, 410.5]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40", "isController": false}, {"data": [[2.0, 410.5]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40-Aggregated", "isController": false}, {"data": [[2.0, 884.5]], "isOverall": false, "label": "14 - Formulario Relacion -99", "isController": false}, {"data": [[2.0, 884.5]], "isOverall": false, "label": "14 - Formulario Relacion -99-Aggregated", "isController": false}, {"data": [[2.0, 534.5]], "isOverall": false, "label": "10 - Formulario Domicilio-59", "isController": false}, {"data": [[2.0, 534.5]], "isOverall": false, "label": "10 - Formulario Domicilio-59-Aggregated", "isController": false}, {"data": [[2.0, 481.5]], "isOverall": false, "label": "1 - Index-1", "isController": false}, {"data": [[2.0, 481.5]], "isOverall": false, "label": "1 - Index-1-Aggregated", "isController": false}, {"data": [[2.0, 1598.5]], "isOverall": false, "label": "1 - Index", "isController": true}, {"data": [[2.0, 1598.5]], "isOverall": false, "label": "1 - Index-Aggregated", "isController": true}, {"data": [[2.0, 614.0]], "isOverall": false, "label": "10 - Formulario Domicilio-58", "isController": false}, {"data": [[2.0, 614.0]], "isOverall": false, "label": "10 - Formulario Domicilio-58-Aggregated", "isController": false}, {"data": [[2.0, 759.5]], "isOverall": false, "label": "20 - Cerrar  Persona-177", "isController": false}, {"data": [[2.0, 759.5]], "isOverall": false, "label": "20 - Cerrar  Persona-177-Aggregated", "isController": false}, {"data": [[2.0, 218244.5]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[2.0, 218244.5]], "isOverall": false, "label": "Transaction Controller-Aggregated", "isController": true}, {"data": [[2.0, 333.5]], "isOverall": false, "label": "10 - Formulario Domicilio-57", "isController": false}, {"data": [[2.0, 333.5]], "isOverall": false, "label": "10 - Formulario Domicilio-57-Aggregated", "isController": false}, {"data": [[2.0, 216.0]], "isOverall": false, "label": "20 - Cerrar  Persona-178", "isController": false}, {"data": [[2.0, 216.0]], "isOverall": false, "label": "20 - Cerrar  Persona-178-Aggregated", "isController": false}, {"data": [[2.0, 704.5]], "isOverall": false, "label": "10 - Formulario Domicilio-56", "isController": false}, {"data": [[2.0, 704.5]], "isOverall": false, "label": "10 - Formulario Domicilio-56-Aggregated", "isController": false}, {"data": [[2.0, 912.0]], "isOverall": false, "label": "10 - Formulario Domicilio-55", "isController": false}, {"data": [[2.0, 912.0]], "isOverall": false, "label": "10 - Formulario Domicilio-55-Aggregated", "isController": false}, {"data": [[2.0, 673.5]], "isOverall": false, "label": "10 - Formulario Domicilio-54", "isController": false}, {"data": [[2.0, 673.5]], "isOverall": false, "label": "10 - Formulario Domicilio-54-Aggregated", "isController": false}, {"data": [[2.0, 651.0]], "isOverall": false, "label": "10 - Formulario Domicilio-53", "isController": false}, {"data": [[2.0, 651.0]], "isOverall": false, "label": "10 - Formulario Domicilio-53-Aggregated", "isController": false}, {"data": [[2.0, 830.0]], "isOverall": false, "label": "10 - Formulario Domicilio-74", "isController": false}, {"data": [[2.0, 830.0]], "isOverall": false, "label": "10 - Formulario Domicilio-74-Aggregated", "isController": false}, {"data": [[2.0, 623.0]], "isOverall": false, "label": "10 - Formulario Domicilio-73", "isController": false}, {"data": [[2.0, 623.0]], "isOverall": false, "label": "10 - Formulario Domicilio-73-Aggregated", "isController": false}, {"data": [[2.0, 1085.5]], "isOverall": false, "label": "10 - Formulario Domicilio-72", "isController": false}, {"data": [[2.0, 1085.5]], "isOverall": false, "label": "10 - Formulario Domicilio-72-Aggregated", "isController": false}, {"data": [[2.0, 609.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[2.0, 609.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168-Aggregated", "isController": false}, {"data": [[2.0, 707.0]], "isOverall": false, "label": "10 - Formulario Domicilio-71", "isController": false}, {"data": [[2.0, 707.0]], "isOverall": false, "label": "10 - Formulario Domicilio-71-Aggregated", "isController": false}, {"data": [[2.0, 1056.5]], "isOverall": false, "label": "10 - Formulario Domicilio-70", "isController": false}, {"data": [[2.0, 1056.5]], "isOverall": false, "label": "10 - Formulario Domicilio-70-Aggregated", "isController": false}, {"data": [[2.0, 18868.166666666664]], "isOverall": false, "label": "18 - Formulario Campos Adicionales", "isController": true}, {"data": [[2.0, 18868.166666666664]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-Aggregated", "isController": true}, {"data": [[2.0, 274.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183", "isController": false}, {"data": [[2.0, 274.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-Aggregated", "isController": false}, {"data": [[2.0, 7537.0]], "isOverall": false, "label": "10 - Formulario Domicilio", "isController": true}, {"data": [[2.0, 7537.0]], "isOverall": false, "label": "10 - Formulario Domicilio-Aggregated", "isController": true}, {"data": [[2.0, 1847.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185", "isController": false}, {"data": [[2.0, 1847.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-Aggregated", "isController": false}, {"data": [[2.0, 1199.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[2.0, 1199.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166-Aggregated", "isController": false}, {"data": [[2.0, 631.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[2.0, 631.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167-Aggregated", "isController": false}, {"data": [[2.0, 34545.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar", "isController": true}, {"data": [[2.0, 34545.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-Aggregated", "isController": true}, {"data": [[2.0, 226.5]], "isOverall": false, "label": "1 - Index-1-1", "isController": false}, {"data": [[2.0, 226.5]], "isOverall": false, "label": "1 - Index-1-1-Aggregated", "isController": false}, {"data": [[2.0, 514.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30", "isController": false}, {"data": [[2.0, 514.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30-Aggregated", "isController": false}, {"data": [[2.0, 647.5]], "isOverall": false, "label": "11 - Contactos Crear-79", "isController": false}, {"data": [[2.0, 647.5]], "isOverall": false, "label": "11 - Contactos Crear-79-Aggregated", "isController": false}, {"data": [[2.0, 529.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31", "isController": false}, {"data": [[2.0, 529.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31-Aggregated", "isController": false}, {"data": [[2.0, 634.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32", "isController": false}, {"data": [[2.0, 634.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32-Aggregated", "isController": false}, {"data": [[2.0, 655.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33", "isController": false}, {"data": [[2.0, 655.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33-Aggregated", "isController": false}, {"data": [[2.0, 424.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34", "isController": false}, {"data": [[2.0, 424.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34-Aggregated", "isController": false}, {"data": [[2.0, 2115.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35", "isController": false}, {"data": [[2.0, 2115.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35-Aggregated", "isController": false}, {"data": [[2.0, 1585.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36", "isController": false}, {"data": [[2.0, 1585.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36-Aggregated", "isController": false}, {"data": [[2.0, 1545.5]], "isOverall": false, "label": "21 - Cerrar  Insis-182", "isController": false}, {"data": [[2.0, 1545.5]], "isOverall": false, "label": "21 - Cerrar  Insis-182-Aggregated", "isController": false}, {"data": [[2.0, 2760.5]], "isOverall": false, "label": "20 - Cerrar  Persona", "isController": true}, {"data": [[2.0, 2760.5]], "isOverall": false, "label": "20 - Cerrar  Persona-Aggregated", "isController": true}, {"data": [[2.0, 387.5]], "isOverall": false, "label": "10 - Formulario Domicilio-69", "isController": false}, {"data": [[2.0, 387.5]], "isOverall": false, "label": "10 - Formulario Domicilio-69-Aggregated", "isController": false}, {"data": [[2.0, 735.0]], "isOverall": false, "label": "10 - Formulario Domicilio-68", "isController": false}, {"data": [[2.0, 735.0]], "isOverall": false, "label": "10 - Formulario Domicilio-68-Aggregated", "isController": false}, {"data": [[2.0, 9273.0]], "isOverall": false, "label": "14 - Formulario Relacion ", "isController": true}, {"data": [[2.0, 9273.0]], "isOverall": false, "label": "14 - Formulario Relacion -Aggregated", "isController": true}, {"data": [[2.0, 1190.5]], "isOverall": false, "label": "5 - Clientes-14", "isController": false}, {"data": [[2.0, 1190.5]], "isOverall": false, "label": "5 - Clientes-14-Aggregated", "isController": false}, {"data": [[2.0, 313.5]], "isOverall": false, "label": "10 - Formulario Domicilio-67", "isController": false}, {"data": [[2.0, 313.5]], "isOverall": false, "label": "10 - Formulario Domicilio-67-Aggregated", "isController": false}, {"data": [[2.0, 14242.5]], "isOverall": false, "label": "5 - Clientes-13", "isController": false}, {"data": [[2.0, 14242.5]], "isOverall": false, "label": "5 - Clientes-13-Aggregated", "isController": false}, {"data": [[2.0, 511.0]], "isOverall": false, "label": "10 - Formulario Domicilio-66", "isController": false}, {"data": [[2.0, 511.0]], "isOverall": false, "label": "10 - Formulario Domicilio-66-Aggregated", "isController": false}, {"data": [[2.0, 600.5]], "isOverall": false, "label": "10 - Formulario Domicilio-65", "isController": false}, {"data": [[2.0, 600.5]], "isOverall": false, "label": "10 - Formulario Domicilio-65-Aggregated", "isController": false}, {"data": [[2.0, 253.5]], "isOverall": false, "label": "1 - Index-1-0", "isController": false}, {"data": [[2.0, 253.5]], "isOverall": false, "label": "1 - Index-1-0-Aggregated", "isController": false}, {"data": [[2.0, 662.5]], "isOverall": false, "label": "10 - Formulario Domicilio-64", "isController": false}, {"data": [[2.0, 662.5]], "isOverall": false, "label": "10 - Formulario Domicilio-64-Aggregated", "isController": false}, {"data": [[2.0, 730.0]], "isOverall": false, "label": "12 - Formulario Contactos-82", "isController": false}, {"data": [[2.0, 730.0]], "isOverall": false, "label": "12 - Formulario Contactos-82-Aggregated", "isController": false}, {"data": [[2.0, 128.5]], "isOverall": false, "label": "4 - Mod de Personas-12", "isController": false}, {"data": [[2.0, 128.5]], "isOverall": false, "label": "4 - Mod de Personas-12-Aggregated", "isController": false}, {"data": [[2.0, 1036.0]], "isOverall": false, "label": "6 - Nuevo Cliente-16", "isController": false}, {"data": [[2.0, 1036.0]], "isOverall": false, "label": "6 - Nuevo Cliente-16-Aggregated", "isController": false}, {"data": [[2.0, 1077.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159", "isController": false}, {"data": [[2.0, 1077.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159-Aggregated", "isController": false}, {"data": [[2.0, 144.5]], "isOverall": false, "label": "6 - Nuevo Cliente-17", "isController": false}, {"data": [[2.0, 144.5]], "isOverall": false, "label": "6 - Nuevo Cliente-17-Aggregated", "isController": false}, {"data": [[2.0, 1160.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[2.0, 1160.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158-Aggregated", "isController": false}, {"data": [[2.0, 1521.25]], "isOverall": false, "label": "12 - Formulario Contactos", "isController": true}, {"data": [[2.0, 1521.25]], "isOverall": false, "label": "12 - Formulario Contactos-Aggregated", "isController": true}, {"data": [[2.0, 1401.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157", "isController": false}, {"data": [[2.0, 1401.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157-Aggregated", "isController": false}, {"data": [[2.0, 7633.5]], "isOverall": false, "label": "6 - Nuevo Cliente-15", "isController": false}, {"data": [[2.0, 7633.5]], "isOverall": false, "label": "6 - Nuevo Cliente-15-Aggregated", "isController": false}, {"data": [[2.0, 1272.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156", "isController": false}, {"data": [[2.0, 1272.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156-Aggregated", "isController": false}, {"data": [[2.0, 2504.0]], "isOverall": false, "label": "19 - Grabar Persona-173", "isController": false}, {"data": [[2.0, 2504.0]], "isOverall": false, "label": "19 - Grabar Persona-173-Aggregated", "isController": false}, {"data": [[2.0, 1054.5]], "isOverall": false, "label": "19 - Grabar Persona-174", "isController": false}, {"data": [[2.0, 1054.5]], "isOverall": false, "label": "19 - Grabar Persona-174-Aggregated", "isController": false}, {"data": [[2.0, 24450.5]], "isOverall": false, "label": "9 - Domicilio Crear", "isController": true}, {"data": [[2.0, 24450.5]], "isOverall": false, "label": "9 - Domicilio Crear-Aggregated", "isController": true}, {"data": [[2.0, 286.5]], "isOverall": false, "label": "17 - Campos Adicionales-140", "isController": false}, {"data": [[2.0, 286.5]], "isOverall": false, "label": "17 - Campos Adicionales-140-Aggregated", "isController": false}, {"data": [[2.0, 4971.5]], "isOverall": false, "label": "17 - Campos Adicionales-141", "isController": false}, {"data": [[2.0, 4971.5]], "isOverall": false, "label": "17 - Campos Adicionales-141-Aggregated", "isController": false}, {"data": [[2.0, 970.5]], "isOverall": false, "label": "13 - Relacion Crear-86", "isController": false}, {"data": [[2.0, 970.5]], "isOverall": false, "label": "13 - Relacion Crear-86-Aggregated", "isController": false}, {"data": [[2.0, 447.5]], "isOverall": false, "label": "13 - Relacion Crear-87", "isController": false}, {"data": [[2.0, 447.5]], "isOverall": false, "label": "13 - Relacion Crear-87-Aggregated", "isController": false}, {"data": [[2.0, 3666.5]], "isOverall": false, "label": "21 - Cerrar  Insis", "isController": true}, {"data": [[2.0, 3666.5]], "isOverall": false, "label": "21 - Cerrar  Insis-Aggregated", "isController": true}, {"data": [[2.0, 1614.5]], "isOverall": false, "label": "11 - Contactos Crear", "isController": true}, {"data": [[2.0, 1614.5]], "isOverall": false, "label": "11 - Contactos Crear-Aggregated", "isController": true}, {"data": [[2.0, 1134.5]], "isOverall": false, "label": "17 - Campos Adicionales-139", "isController": false}, {"data": [[2.0, 1134.5]], "isOverall": false, "label": "17 - Campos Adicionales-139-Aggregated", "isController": false}, {"data": [[2.0, 1764.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155", "isController": false}, {"data": [[2.0, 1764.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155-Aggregated", "isController": false}, {"data": [[2.0, 1429.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154", "isController": false}, {"data": [[2.0, 1429.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154-Aggregated", "isController": false}, {"data": [[2.0, 1438.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153", "isController": false}, {"data": [[2.0, 1438.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153-Aggregated", "isController": false}, {"data": [[2.0, 1216.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152", "isController": false}, {"data": [[2.0, 1216.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152-Aggregated", "isController": false}, {"data": [[2.0, 897.5]], "isOverall": false, "label": "13 - Relacion Crear-88", "isController": false}, {"data": [[2.0, 897.5]], "isOverall": false, "label": "13 - Relacion Crear-88-Aggregated", "isController": false}, {"data": [[2.0, 1518.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[2.0, 1518.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151-Aggregated", "isController": false}, {"data": [[2.0, 1292.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150", "isController": false}, {"data": [[2.0, 1292.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150-Aggregated", "isController": false}, {"data": [[2.0, 1288.5]], "isOverall": false, "label": "10 - Formulario Domicilio-52", "isController": false}, {"data": [[2.0, 1288.5]], "isOverall": false, "label": "10 - Formulario Domicilio-52-Aggregated", "isController": false}, {"data": [[2.0, 264.0]], "isOverall": false, "label": "10 - Formulario Domicilio-51", "isController": false}, {"data": [[2.0, 264.0]], "isOverall": false, "label": "10 - Formulario Domicilio-51-Aggregated", "isController": false}, {"data": [[2.0, 699.5]], "isOverall": false, "label": "10 - Formulario Domicilio-50", "isController": false}, {"data": [[2.0, 699.5]], "isOverall": false, "label": "10 - Formulario Domicilio-50-Aggregated", "isController": false}, {"data": [[2.0, 1084.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149", "isController": false}, {"data": [[2.0, 1084.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149-Aggregated", "isController": false}, {"data": [[2.0, 106.0]], "isOverall": false, "label": "2 - Login-9-0", "isController": false}, {"data": [[2.0, 106.0]], "isOverall": false, "label": "2 - Login-9-0-Aggregated", "isController": false}, {"data": [[2.0, 15433.0]], "isOverall": false, "label": "5 - Clientes", "isController": true}, {"data": [[2.0, 15433.0]], "isOverall": false, "label": "5 - Clientes-Aggregated", "isController": true}, {"data": [[2.0, 13543.0]], "isOverall": false, "label": "17 - Campos Adicionales", "isController": true}, {"data": [[2.0, 13543.0]], "isOverall": false, "label": "17 - Campos Adicionales-Aggregated", "isController": true}, {"data": [[2.0, 1022.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[2.0, 1022.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148-Aggregated", "isController": false}, {"data": [[2.0, 3721.0]], "isOverall": false, "label": "17 - Campos Adicionales-136", "isController": false}, {"data": [[2.0, 3721.0]], "isOverall": false, "label": "17 - Campos Adicionales-136-Aggregated", "isController": false}, {"data": [[2.0, 753.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[2.0, 753.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147-Aggregated", "isController": false}, {"data": [[2.0, 1951.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41", "isController": false}, {"data": [[2.0, 1951.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41-Aggregated", "isController": false}, {"data": [[2.0, 559.0]], "isOverall": false, "label": "17 - Campos Adicionales-137", "isController": false}, {"data": [[2.0, 559.0]], "isOverall": false, "label": "17 - Campos Adicionales-137-Aggregated", "isController": false}, {"data": [[2.0, 1171.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[2.0, 1171.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146-Aggregated", "isController": false}, {"data": [[2.0, 702.5]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42", "isController": false}, {"data": [[2.0, 702.5]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42-Aggregated", "isController": false}, {"data": [[2.0, 2870.5]], "isOverall": false, "label": "17 - Campos Adicionales-138", "isController": false}, {"data": [[2.0, 2870.5]], "isOverall": false, "label": "17 - Campos Adicionales-138-Aggregated", "isController": false}, {"data": [[2.0, 868.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[2.0, 868.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145-Aggregated", "isController": false}, {"data": [[2.0, 1117.0]], "isOverall": false, "label": "Inicio - -10", "isController": false}, {"data": [[2.0, 1117.0]], "isOverall": false, "label": "Inicio - -10-Aggregated", "isController": false}, {"data": [[2.0, 23234.0]], "isOverall": false, "label": "2 - Login-9-1", "isController": false}, {"data": [[2.0, 23234.0]], "isOverall": false, "label": "2 - Login-9-1-Aggregated", "isController": false}, {"data": [[2.0, 115.5]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1", "isController": false}, {"data": [[2.0, 115.5]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1-Aggregated", "isController": false}, {"data": [[2.0, 157.5]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0", "isController": false}, {"data": [[2.0, 157.5]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0-Aggregated", "isController": false}, {"data": [[2.0, 23340.0]], "isOverall": false, "label": "2 - Login-9", "isController": false}, {"data": [[2.0, 23340.0]], "isOverall": false, "label": "2 - Login-9-Aggregated", "isController": false}, {"data": [[2.0, 8087.0]], "isOverall": false, "label": "2 - Login-7", "isController": false}, {"data": [[2.0, 8087.0]], "isOverall": false, "label": "2 - Login-7-Aggregated", "isController": false}, {"data": [[2.0, 450.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[2.0, 450.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172-Aggregated", "isController": false}, {"data": [[2.0, 1.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[2.0, 1.0]], "isOverall": false, "label": "Debug Sampler-Aggregated", "isController": false}, {"data": [[2.0, 724.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[2.0, 724.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171-Aggregated", "isController": false}, {"data": [[2.0, 1896.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[2.0, 1896.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170-Aggregated", "isController": false}, {"data": [[2.0, 662.0]], "isOverall": false, "label": "3 - Operaciones del Sistema-11", "isController": false}, {"data": [[2.0, 662.0]], "isOverall": false, "label": "3 - Operaciones del Sistema-11-Aggregated", "isController": false}, {"data": [[2.0, 995.5]], "isOverall": false, "label": "10 - Formulario Domicilio-49", "isController": false}, {"data": [[2.0, 995.5]], "isOverall": false, "label": "10 - Formulario Domicilio-49-Aggregated", "isController": false}, {"data": [[2.0, 1325.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[2.0, 1325.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144-Aggregated", "isController": false}, {"data": [[2.0, 480.5]], "isOverall": false, "label": "10 - Formulario Domicilio-48", "isController": false}, {"data": [[2.0, 480.5]], "isOverall": false, "label": "10 - Formulario Domicilio-48-Aggregated", "isController": false}, {"data": [[2.0, 847.0]], "isOverall": false, "label": "14 - Formulario Relacion -89", "isController": false}, {"data": [[2.0, 847.0]], "isOverall": false, "label": "14 - Formulario Relacion -89-Aggregated", "isController": false}, {"data": [[2.0, 633.5]], "isOverall": false, "label": "14 - Formulario Relacion -100", "isController": false}, {"data": [[2.0, 633.5]], "isOverall": false, "label": "14 - Formulario Relacion -100-Aggregated", "isController": false}, {"data": [[2.0, 635.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[2.0, 635.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143-Aggregated", "isController": false}, {"data": [[2.0, 431.5]], "isOverall": false, "label": "6 - Nuevo Cliente-18", "isController": false}, {"data": [[2.0, 431.5]], "isOverall": false, "label": "6 - Nuevo Cliente-18-Aggregated", "isController": false}, {"data": [[2.0, 224.0]], "isOverall": false, "label": "10 - Formulario Domicilio-47", "isController": false}, {"data": [[2.0, 224.0]], "isOverall": false, "label": "10 - Formulario Domicilio-47-Aggregated", "isController": false}, {"data": [[2.0, 783.5]], "isOverall": false, "label": "14 - Formulario Relacion -101", "isController": false}, {"data": [[2.0, 783.5]], "isOverall": false, "label": "14 - Formulario Relacion -101-Aggregated", "isController": false}, {"data": [[2.0, 1445.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[2.0, 1445.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142-Aggregated", "isController": false}, {"data": [[2.0, 620.5]], "isOverall": false, "label": "10 - Formulario Domicilio-46", "isController": false}, {"data": [[2.0, 620.5]], "isOverall": false, "label": "10 - Formulario Domicilio-46-Aggregated", "isController": false}, {"data": [[2.0, 797.0]], "isOverall": false, "label": "14 - Formulario Relacion -102", "isController": false}, {"data": [[2.0, 797.0]], "isOverall": false, "label": "14 - Formulario Relacion -102-Aggregated", "isController": false}, {"data": [[2.0, 1001.0]], "isOverall": false, "label": "10 - Formulario Domicilio-45", "isController": false}, {"data": [[2.0, 1001.0]], "isOverall": false, "label": "10 - Formulario Domicilio-45-Aggregated", "isController": false}, {"data": [[2.0, 579.0]], "isOverall": false, "label": "14 - Formulario Relacion -103", "isController": false}, {"data": [[2.0, 579.0]], "isOverall": false, "label": "14 - Formulario Relacion -103-Aggregated", "isController": false}, {"data": [[2.0, 840.0]], "isOverall": false, "label": "10 - Formulario Domicilio-44", "isController": false}, {"data": [[2.0, 840.0]], "isOverall": false, "label": "10 - Formulario Domicilio-44-Aggregated", "isController": false}, {"data": [[2.0, 532.5]], "isOverall": false, "label": "12 - Formulario Contactos-83", "isController": false}, {"data": [[2.0, 532.5]], "isOverall": false, "label": "12 - Formulario Contactos-83-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 2.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 1481.7666666666667, "minX": 1.59496254E12, "maxY": 29989.25, "series": [{"data": [[1.5949626E12, 13277.633333333333], [1.59496272E12, 15674.683333333332], [1.59496254E12, 19362.6], [1.59496266E12, 29989.25]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.5949626E12, 5349.833333333333], [1.59496272E12, 9937.15], [1.59496254E12, 1481.7666666666667], [1.59496266E12, 17278.116666666665]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59496272E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.59496254E12, "maxY": 218244.5, "series": [{"data": [[1.59496266E12, 1782.5]], "isOverall": false, "label": "14 - Formulario Relacion Guardar", "isController": true}, {"data": [[1.59496272E12, 3558.5]], "isOverall": false, "label": "19 - Grabar Persona", "isController": true}, {"data": [[1.59496272E12, 666.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[1.59496272E12, 582.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2", "isController": false}, {"data": [[1.59496272E12, 575.5]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1", "isController": false}, {"data": [[1.59496272E12, 384.5]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0", "isController": false}, {"data": [[1.59496272E12, 933.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[1.59496272E12, 681.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[1.59496272E12, 1342.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[1.59496272E12, 722.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[1.59496266E12, 2315.5]], "isOverall": false, "label": "13 - Relacion Crear", "isController": true}, {"data": [[1.59496272E12, 781.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[1.59496272E12, 1016.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160", "isController": false}, {"data": [[1.59496272E12, 2440.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[1.59496254E12, 31427.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[1.59496254E12, 569.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20", "isController": false}, {"data": [[1.5949626E12, 5295.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21", "isController": false}, {"data": [[1.5949626E12, 1154.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22", "isController": false}, {"data": [[1.5949626E12, 761.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23", "isController": false}, {"data": [[1.59496254E12, 9245.5]], "isOverall": false, "label": "6 - Nuevo Cliente", "isController": true}, {"data": [[1.5949626E12, 983.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24", "isController": false}, {"data": [[1.5949626E12, 529.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25", "isController": false}, {"data": [[1.5949626E12, 446.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26", "isController": false}, {"data": [[1.5949626E12, 354.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27", "isController": false}, {"data": [[1.5949626E12, 2940.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28", "isController": false}, {"data": [[1.59496266E12, 1202.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar", "isController": true}, {"data": [[1.5949626E12, 1009.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29", "isController": false}, {"data": [[1.5949626E12, 638.0]], "isOverall": false, "label": "9 - Domicilio Crear-43", "isController": false}, {"data": [[1.59496266E12, 839.5]], "isOverall": false, "label": "10 - Formulario Domicilio-76", "isController": false}, {"data": [[1.59496266E12, 509.5]], "isOverall": false, "label": "10 - Formulario Domicilio-75", "isController": false}, {"data": [[1.5949626E12, 2653.5]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[1.59496254E12, 433.5]], "isOverall": false, "label": "2 - Login-7-1", "isController": false}, {"data": [[1.59496254E12, 7651.5]], "isOverall": false, "label": "2 - Login-7-0", "isController": false}, {"data": [[1.59496272E12, 496.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1", "isController": false}, {"data": [[1.59496266E12, 1247.5]], "isOverall": false, "label": "12 - Formulario Contactos Guardar", "isController": true}, {"data": [[1.59496272E12, 1350.5]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0", "isController": false}, {"data": [[1.5949626E12, 807.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38", "isController": false}, {"data": [[1.5949626E12, 33738.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37", "isController": false}, {"data": [[1.5949626E12, 6294.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[1.59496272E12, 3737.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[1.59496266E12, 218.5]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78", "isController": false}, {"data": [[1.59496254E12, 662.0]], "isOverall": false, "label": "3 - Operaciones del Sistema", "isController": true}, {"data": [[1.5949626E12, 1986.75]], "isOverall": false, "label": "8 - Formulario Datos de Cliente", "isController": true}, {"data": [[1.59496266E12, 983.5]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77", "isController": false}, {"data": [[1.59496254E12, 555.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19", "isController": false}, {"data": [[1.59496266E12, 694.0]], "isOverall": false, "label": "10 - Formulario Domicilio-63", "isController": false}, {"data": [[1.59496266E12, 1057.0]], "isOverall": false, "label": "10 - Formulario Domicilio-62", "isController": false}, {"data": [[1.59496266E12, 402.5]], "isOverall": false, "label": "10 - Formulario Domicilio-61", "isController": false}, {"data": [[1.59496266E12, 759.5]], "isOverall": false, "label": "10 - Formulario Domicilio-60", "isController": false}, {"data": [[1.59496266E12, 793.0]], "isOverall": false, "label": "11 - Contactos Crear-81", "isController": false}, {"data": [[1.59496266E12, 448.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[1.59496266E12, 1274.5]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[1.59496266E12, 174.0]], "isOverall": false, "label": "11 - Contactos Crear-80", "isController": false}, {"data": [[1.59496266E12, 508.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[1.5949626E12, 499.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39", "isController": false}, {"data": [[1.59496266E12, 799.5]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[1.59496266E12, 926.0]], "isOverall": false, "label": "14 - Formulario Relacion -90", "isController": false}, {"data": [[1.59496266E12, 637.0]], "isOverall": false, "label": "14 - Formulario Relacion -91", "isController": false}, {"data": [[1.59496266E12, 614.0]], "isOverall": false, "label": "14 - Formulario Relacion -92", "isController": false}, {"data": [[1.59496266E12, 678.5]], "isOverall": false, "label": "14 - Formulario Relacion -93", "isController": false}, {"data": [[1.59496266E12, 472.5]], "isOverall": false, "label": "14 - Formulario Relacion -94", "isController": false}, {"data": [[1.59496266E12, 772.5]], "isOverall": false, "label": "14 - Formulario Relacion -95", "isController": false}, {"data": [[1.59496272E12, 361.0]], "isOverall": false, "label": "20 - Cerrar  Persona-175", "isController": false}, {"data": [[1.59496266E12, 870.0]], "isOverall": false, "label": "14 - Formulario Relacion -96", "isController": false}, {"data": [[1.59496272E12, 1424.0]], "isOverall": false, "label": "20 - Cerrar  Persona-176", "isController": false}, {"data": [[1.59496266E12, 829.5]], "isOverall": false, "label": "14 - Formulario Relacion -97", "isController": false}, {"data": [[1.59496254E12, 128.5]], "isOverall": false, "label": "4 - Mod de Personas", "isController": true}, {"data": [[1.59496266E12, 531.0]], "isOverall": false, "label": "14 - Formulario Relacion -98", "isController": false}, {"data": [[1.5949626E12, 410.5]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40", "isController": false}, {"data": [[1.59496266E12, 884.5]], "isOverall": false, "label": "14 - Formulario Relacion -99", "isController": false}, {"data": [[1.59496266E12, 534.5]], "isOverall": false, "label": "10 - Formulario Domicilio-59", "isController": false}, {"data": [[1.59496254E12, 481.5]], "isOverall": false, "label": "1 - Index-1", "isController": false}, {"data": [[1.59496254E12, 1598.5]], "isOverall": false, "label": "1 - Index", "isController": true}, {"data": [[1.59496266E12, 614.0]], "isOverall": false, "label": "10 - Formulario Domicilio-58", "isController": false}, {"data": [[1.59496272E12, 759.5]], "isOverall": false, "label": "20 - Cerrar  Persona-177", "isController": false}, {"data": [[1.59496272E12, 218244.5]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59496266E12, 333.5]], "isOverall": false, "label": "10 - Formulario Domicilio-57", "isController": false}, {"data": [[1.59496272E12, 216.0]], "isOverall": false, "label": "20 - Cerrar  Persona-178", "isController": false}, {"data": [[1.59496266E12, 704.5]], "isOverall": false, "label": "10 - Formulario Domicilio-56", "isController": false}, {"data": [[1.59496266E12, 912.0]], "isOverall": false, "label": "10 - Formulario Domicilio-55", "isController": false}, {"data": [[1.59496266E12, 673.5]], "isOverall": false, "label": "10 - Formulario Domicilio-54", "isController": false}, {"data": [[1.59496266E12, 651.0]], "isOverall": false, "label": "10 - Formulario Domicilio-53", "isController": false}, {"data": [[1.59496266E12, 830.0]], "isOverall": false, "label": "10 - Formulario Domicilio-74", "isController": false}, {"data": [[1.59496266E12, 623.0]], "isOverall": false, "label": "10 - Formulario Domicilio-73", "isController": false}, {"data": [[1.59496266E12, 1085.5]], "isOverall": false, "label": "10 - Formulario Domicilio-72", "isController": false}, {"data": [[1.59496272E12, 609.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[1.59496266E12, 707.0]], "isOverall": false, "label": "10 - Formulario Domicilio-71", "isController": false}, {"data": [[1.59496266E12, 1056.5]], "isOverall": false, "label": "10 - Formulario Domicilio-70", "isController": false}, {"data": [[1.59496272E12, 18868.166666666664]], "isOverall": false, "label": "18 - Formulario Campos Adicionales", "isController": true}, {"data": [[1.59496272E12, 274.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183", "isController": false}, {"data": [[1.59496266E12, 7537.0]], "isOverall": false, "label": "10 - Formulario Domicilio", "isController": true}, {"data": [[1.59496272E12, 1847.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185", "isController": false}, {"data": [[1.59496272E12, 1199.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[1.59496272E12, 631.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[1.5949626E12, 34545.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar", "isController": true}, {"data": [[1.59496254E12, 226.5]], "isOverall": false, "label": "1 - Index-1-1", "isController": false}, {"data": [[1.5949626E12, 514.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30", "isController": false}, {"data": [[1.59496266E12, 647.5]], "isOverall": false, "label": "11 - Contactos Crear-79", "isController": false}, {"data": [[1.5949626E12, 529.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31", "isController": false}, {"data": [[1.5949626E12, 634.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32", "isController": false}, {"data": [[1.5949626E12, 655.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33", "isController": false}, {"data": [[1.5949626E12, 424.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34", "isController": false}, {"data": [[1.5949626E12, 2115.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35", "isController": false}, {"data": [[1.5949626E12, 1585.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36", "isController": false}, {"data": [[1.59496272E12, 1545.5]], "isOverall": false, "label": "21 - Cerrar  Insis-182", "isController": false}, {"data": [[1.59496272E12, 2760.5]], "isOverall": false, "label": "20 - Cerrar  Persona", "isController": true}, {"data": [[1.59496266E12, 387.5]], "isOverall": false, "label": "10 - Formulario Domicilio-69", "isController": false}, {"data": [[1.59496266E12, 735.0]], "isOverall": false, "label": "10 - Formulario Domicilio-68", "isController": false}, {"data": [[1.59496266E12, 9273.0]], "isOverall": false, "label": "14 - Formulario Relacion ", "isController": true}, {"data": [[1.59496254E12, 1190.5]], "isOverall": false, "label": "5 - Clientes-14", "isController": false}, {"data": [[1.59496266E12, 313.5]], "isOverall": false, "label": "10 - Formulario Domicilio-67", "isController": false}, {"data": [[1.59496254E12, 14242.5]], "isOverall": false, "label": "5 - Clientes-13", "isController": false}, {"data": [[1.59496266E12, 511.0]], "isOverall": false, "label": "10 - Formulario Domicilio-66", "isController": false}, {"data": [[1.59496266E12, 600.5]], "isOverall": false, "label": "10 - Formulario Domicilio-65", "isController": false}, {"data": [[1.59496254E12, 253.5]], "isOverall": false, "label": "1 - Index-1-0", "isController": false}, {"data": [[1.59496266E12, 662.5]], "isOverall": false, "label": "10 - Formulario Domicilio-64", "isController": false}, {"data": [[1.59496266E12, 730.0]], "isOverall": false, "label": "12 - Formulario Contactos-82", "isController": false}, {"data": [[1.59496254E12, 128.5]], "isOverall": false, "label": "4 - Mod de Personas-12", "isController": false}, {"data": [[1.59496254E12, 1036.0]], "isOverall": false, "label": "6 - Nuevo Cliente-16", "isController": false}, {"data": [[1.59496272E12, 1077.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159", "isController": false}, {"data": [[1.59496254E12, 144.5]], "isOverall": false, "label": "6 - Nuevo Cliente-17", "isController": false}, {"data": [[1.59496272E12, 1160.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[1.59496266E12, 1521.25]], "isOverall": false, "label": "12 - Formulario Contactos", "isController": true}, {"data": [[1.59496272E12, 1401.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157", "isController": false}, {"data": [[1.59496254E12, 7633.5]], "isOverall": false, "label": "6 - Nuevo Cliente-15", "isController": false}, {"data": [[1.59496272E12, 1272.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156", "isController": false}, {"data": [[1.59496272E12, 2504.0]], "isOverall": false, "label": "19 - Grabar Persona-173", "isController": false}, {"data": [[1.59496272E12, 1054.5]], "isOverall": false, "label": "19 - Grabar Persona-174", "isController": false}, {"data": [[1.59496266E12, 24450.5]], "isOverall": false, "label": "9 - Domicilio Crear", "isController": true}, {"data": [[1.59496266E12, 286.5]], "isOverall": false, "label": "17 - Campos Adicionales-140", "isController": false}, {"data": [[1.59496266E12, 4971.5]], "isOverall": false, "label": "17 - Campos Adicionales-141", "isController": false}, {"data": [[1.59496266E12, 970.5]], "isOverall": false, "label": "13 - Relacion Crear-86", "isController": false}, {"data": [[1.59496266E12, 447.5]], "isOverall": false, "label": "13 - Relacion Crear-87", "isController": false}, {"data": [[1.59496272E12, 3666.5]], "isOverall": false, "label": "21 - Cerrar  Insis", "isController": true}, {"data": [[1.59496266E12, 1614.5]], "isOverall": false, "label": "11 - Contactos Crear", "isController": true}, {"data": [[1.59496266E12, 1134.5]], "isOverall": false, "label": "17 - Campos Adicionales-139", "isController": false}, {"data": [[1.59496272E12, 1764.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155", "isController": false}, {"data": [[1.59496272E12, 1429.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154", "isController": false}, {"data": [[1.59496272E12, 1438.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153", "isController": false}, {"data": [[1.59496272E12, 1216.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152", "isController": false}, {"data": [[1.59496266E12, 897.5]], "isOverall": false, "label": "13 - Relacion Crear-88", "isController": false}, {"data": [[1.59496272E12, 1518.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[1.59496272E12, 1292.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150", "isController": false}, {"data": [[1.59496266E12, 1288.5]], "isOverall": false, "label": "10 - Formulario Domicilio-52", "isController": false}, {"data": [[1.59496266E12, 264.0]], "isOverall": false, "label": "10 - Formulario Domicilio-51", "isController": false}, {"data": [[1.59496266E12, 699.5]], "isOverall": false, "label": "10 - Formulario Domicilio-50", "isController": false}, {"data": [[1.59496272E12, 1084.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149", "isController": false}, {"data": [[1.59496254E12, 106.0]], "isOverall": false, "label": "2 - Login-9-0", "isController": false}, {"data": [[1.59496254E12, 15433.0]], "isOverall": false, "label": "5 - Clientes", "isController": true}, {"data": [[1.59496266E12, 13543.0]], "isOverall": false, "label": "17 - Campos Adicionales", "isController": true}, {"data": [[1.59496272E12, 1022.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[1.59496266E12, 3721.0]], "isOverall": false, "label": "17 - Campos Adicionales-136", "isController": false}, {"data": [[1.59496272E12, 753.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[1.5949626E12, 1951.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41", "isController": false}, {"data": [[1.59496266E12, 559.0]], "isOverall": false, "label": "17 - Campos Adicionales-137", "isController": false}, {"data": [[1.59496272E12, 1171.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[1.5949626E12, 702.5]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42", "isController": false}, {"data": [[1.59496266E12, 2870.5]], "isOverall": false, "label": "17 - Campos Adicionales-138", "isController": false}, {"data": [[1.59496266E12, 868.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[1.59496254E12, 1117.0]], "isOverall": false, "label": "Inicio - -10", "isController": false}, {"data": [[1.59496254E12, 23234.0]], "isOverall": false, "label": "2 - Login-9-1", "isController": false}, {"data": [[1.59496272E12, 115.5]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1", "isController": false}, {"data": [[1.59496272E12, 157.5]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0", "isController": false}, {"data": [[1.59496254E12, 23340.0]], "isOverall": false, "label": "2 - Login-9", "isController": false}, {"data": [[1.59496254E12, 8087.0]], "isOverall": false, "label": "2 - Login-7", "isController": false}, {"data": [[1.59496272E12, 450.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[1.59496272E12, 1.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59496272E12, 724.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[1.59496272E12, 1896.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[1.59496254E12, 662.0]], "isOverall": false, "label": "3 - Operaciones del Sistema-11", "isController": false}, {"data": [[1.59496266E12, 995.5]], "isOverall": false, "label": "10 - Formulario Domicilio-49", "isController": false}, {"data": [[1.59496266E12, 1325.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[1.59496266E12, 480.5]], "isOverall": false, "label": "10 - Formulario Domicilio-48", "isController": false}, {"data": [[1.59496266E12, 847.0]], "isOverall": false, "label": "14 - Formulario Relacion -89", "isController": false}, {"data": [[1.59496266E12, 633.5]], "isOverall": false, "label": "14 - Formulario Relacion -100", "isController": false}, {"data": [[1.59496266E12, 635.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[1.59496254E12, 431.5]], "isOverall": false, "label": "6 - Nuevo Cliente-18", "isController": false}, {"data": [[1.59496266E12, 224.0]], "isOverall": false, "label": "10 - Formulario Domicilio-47", "isController": false}, {"data": [[1.59496266E12, 783.5]], "isOverall": false, "label": "14 - Formulario Relacion -101", "isController": false}, {"data": [[1.59496266E12, 1445.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[1.59496266E12, 620.5]], "isOverall": false, "label": "10 - Formulario Domicilio-46", "isController": false}, {"data": [[1.59496266E12, 797.0]], "isOverall": false, "label": "14 - Formulario Relacion -102", "isController": false}, {"data": [[1.59496266E12, 1001.0]], "isOverall": false, "label": "10 - Formulario Domicilio-45", "isController": false}, {"data": [[1.59496266E12, 579.0]], "isOverall": false, "label": "14 - Formulario Relacion -103", "isController": false}, {"data": [[1.5949626E12, 840.0]], "isOverall": false, "label": "10 - Formulario Domicilio-44", "isController": false}, {"data": [[1.59496266E12, 532.5]], "isOverall": false, "label": "12 - Formulario Contactos-83", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59496272E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.59496254E12, "maxY": 181176.0, "series": [{"data": [[1.59496266E12, 1612.5]], "isOverall": false, "label": "14 - Formulario Relacion Guardar", "isController": true}, {"data": [[1.59496272E12, 2927.5]], "isOverall": false, "label": "19 - Grabar Persona", "isController": true}, {"data": [[1.59496272E12, 666.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[1.59496272E12, 581.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2", "isController": false}, {"data": [[1.59496272E12, 575.5]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1", "isController": false}, {"data": [[1.59496272E12, 384.5]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0", "isController": false}, {"data": [[1.59496272E12, 929.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[1.59496272E12, 633.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[1.59496272E12, 1337.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[1.59496272E12, 714.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[1.59496266E12, 2026.0]], "isOverall": false, "label": "13 - Relacion Crear", "isController": true}, {"data": [[1.59496272E12, 776.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[1.59496272E12, 1005.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160", "isController": false}, {"data": [[1.59496272E12, 2073.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[1.59496254E12, 7757.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[1.59496254E12, 490.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20", "isController": false}, {"data": [[1.5949626E12, 5294.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21", "isController": false}, {"data": [[1.5949626E12, 1154.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22", "isController": false}, {"data": [[1.5949626E12, 760.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23", "isController": false}, {"data": [[1.59496254E12, 8761.0]], "isOverall": false, "label": "6 - Nuevo Cliente", "isController": true}, {"data": [[1.5949626E12, 980.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24", "isController": false}, {"data": [[1.5949626E12, 524.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25", "isController": false}, {"data": [[1.5949626E12, 443.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26", "isController": false}, {"data": [[1.5949626E12, 352.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27", "isController": false}, {"data": [[1.5949626E12, 2938.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28", "isController": false}, {"data": [[1.59496266E12, 1022.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar", "isController": true}, {"data": [[1.5949626E12, 825.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29", "isController": false}, {"data": [[1.5949626E12, 503.5]], "isOverall": false, "label": "9 - Domicilio Crear-43", "isController": false}, {"data": [[1.59496266E12, 839.5]], "isOverall": false, "label": "10 - Formulario Domicilio-76", "isController": false}, {"data": [[1.59496266E12, 503.0]], "isOverall": false, "label": "10 - Formulario Domicilio-75", "isController": false}, {"data": [[1.5949626E12, 2249.5]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[1.59496254E12, 432.0]], "isOverall": false, "label": "2 - Login-7-1", "isController": false}, {"data": [[1.59496254E12, 7651.0]], "isOverall": false, "label": "2 - Login-7-0", "isController": false}, {"data": [[1.59496272E12, 427.5]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1", "isController": false}, {"data": [[1.59496266E12, 1040.5]], "isOverall": false, "label": "12 - Formulario Contactos Guardar", "isController": true}, {"data": [[1.59496272E12, 1350.5]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0", "isController": false}, {"data": [[1.5949626E12, 717.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38", "isController": false}, {"data": [[1.5949626E12, 33412.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37", "isController": false}, {"data": [[1.5949626E12, 6208.125]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[1.59496272E12, 3638.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[1.59496266E12, 174.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78", "isController": false}, {"data": [[1.59496254E12, 572.5]], "isOverall": false, "label": "3 - Operaciones del Sistema", "isController": true}, {"data": [[1.5949626E12, 1780.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente", "isController": true}, {"data": [[1.59496266E12, 848.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77", "isController": false}, {"data": [[1.59496254E12, 445.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19", "isController": false}, {"data": [[1.59496266E12, 691.0]], "isOverall": false, "label": "10 - Formulario Domicilio-63", "isController": false}, {"data": [[1.59496266E12, 961.0]], "isOverall": false, "label": "10 - Formulario Domicilio-62", "isController": false}, {"data": [[1.59496266E12, 343.0]], "isOverall": false, "label": "10 - Formulario Domicilio-61", "isController": false}, {"data": [[1.59496266E12, 758.5]], "isOverall": false, "label": "10 - Formulario Domicilio-60", "isController": false}, {"data": [[1.59496266E12, 746.5]], "isOverall": false, "label": "11 - Contactos Crear-81", "isController": false}, {"data": [[1.59496266E12, 365.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[1.59496266E12, 1165.5]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[1.59496266E12, 154.0]], "isOverall": false, "label": "11 - Contactos Crear-80", "isController": false}, {"data": [[1.59496266E12, 447.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[1.5949626E12, 494.5]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39", "isController": false}, {"data": [[1.59496266E12, 675.5]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[1.59496266E12, 866.0]], "isOverall": false, "label": "14 - Formulario Relacion -90", "isController": false}, {"data": [[1.59496266E12, 449.5]], "isOverall": false, "label": "14 - Formulario Relacion -91", "isController": false}, {"data": [[1.59496266E12, 611.5]], "isOverall": false, "label": "14 - Formulario Relacion -92", "isController": false}, {"data": [[1.59496266E12, 674.0]], "isOverall": false, "label": "14 - Formulario Relacion -93", "isController": false}, {"data": [[1.59496266E12, 469.0]], "isOverall": false, "label": "14 - Formulario Relacion -94", "isController": false}, {"data": [[1.59496266E12, 675.5]], "isOverall": false, "label": "14 - Formulario Relacion -95", "isController": false}, {"data": [[1.59496272E12, 360.0]], "isOverall": false, "label": "20 - Cerrar  Persona-175", "isController": false}, {"data": [[1.59496266E12, 775.0]], "isOverall": false, "label": "14 - Formulario Relacion -96", "isController": false}, {"data": [[1.59496272E12, 937.5]], "isOverall": false, "label": "20 - Cerrar  Persona-176", "isController": false}, {"data": [[1.59496266E12, 743.0]], "isOverall": false, "label": "14 - Formulario Relacion -97", "isController": false}, {"data": [[1.59496254E12, 122.5]], "isOverall": false, "label": "4 - Mod de Personas", "isController": true}, {"data": [[1.59496266E12, 430.5]], "isOverall": false, "label": "14 - Formulario Relacion -98", "isController": false}, {"data": [[1.5949626E12, 408.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40", "isController": false}, {"data": [[1.59496266E12, 785.5]], "isOverall": false, "label": "14 - Formulario Relacion -99", "isController": false}, {"data": [[1.59496266E12, 531.0]], "isOverall": false, "label": "10 - Formulario Domicilio-59", "isController": false}, {"data": [[1.59496254E12, 253.5]], "isOverall": false, "label": "1 - Index-1", "isController": false}, {"data": [[1.59496254E12, 1366.5]], "isOverall": false, "label": "1 - Index", "isController": true}, {"data": [[1.59496266E12, 610.5]], "isOverall": false, "label": "10 - Formulario Domicilio-58", "isController": false}, {"data": [[1.59496272E12, 740.5]], "isOverall": false, "label": "20 - Cerrar  Persona-177", "isController": false}, {"data": [[1.59496272E12, 181176.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59496266E12, 329.0]], "isOverall": false, "label": "10 - Formulario Domicilio-57", "isController": false}, {"data": [[1.59496272E12, 213.5]], "isOverall": false, "label": "20 - Cerrar  Persona-178", "isController": false}, {"data": [[1.59496266E12, 606.5]], "isOverall": false, "label": "10 - Formulario Domicilio-56", "isController": false}, {"data": [[1.59496266E12, 694.0]], "isOverall": false, "label": "10 - Formulario Domicilio-55", "isController": false}, {"data": [[1.59496266E12, 669.5]], "isOverall": false, "label": "10 - Formulario Domicilio-54", "isController": false}, {"data": [[1.59496266E12, 644.5]], "isOverall": false, "label": "10 - Formulario Domicilio-53", "isController": false}, {"data": [[1.59496266E12, 828.0]], "isOverall": false, "label": "10 - Formulario Domicilio-74", "isController": false}, {"data": [[1.59496266E12, 622.0]], "isOverall": false, "label": "10 - Formulario Domicilio-73", "isController": false}, {"data": [[1.59496266E12, 991.5]], "isOverall": false, "label": "10 - Formulario Domicilio-72", "isController": false}, {"data": [[1.59496272E12, 605.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[1.59496266E12, 603.5]], "isOverall": false, "label": "10 - Formulario Domicilio-71", "isController": false}, {"data": [[1.59496266E12, 939.5]], "isOverall": false, "label": "10 - Formulario Domicilio-70", "isController": false}, {"data": [[1.59496272E12, 18597.333333333332]], "isOverall": false, "label": "18 - Formulario Campos Adicionales", "isController": true}, {"data": [[1.59496272E12, 157.5]], "isOverall": false, "label": "21 - Cerrar  Insis-183", "isController": false}, {"data": [[1.59496266E12, 6998.666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio", "isController": true}, {"data": [[1.59496272E12, 1350.5]], "isOverall": false, "label": "21 - Cerrar  Insis-185", "isController": false}, {"data": [[1.59496272E12, 978.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[1.59496272E12, 489.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[1.5949626E12, 34129.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar", "isController": true}, {"data": [[1.59496254E12, 138.5]], "isOverall": false, "label": "1 - Index-1-1", "isController": false}, {"data": [[1.5949626E12, 511.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30", "isController": false}, {"data": [[1.59496266E12, 531.5]], "isOverall": false, "label": "11 - Contactos Crear-79", "isController": false}, {"data": [[1.5949626E12, 528.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31", "isController": false}, {"data": [[1.5949626E12, 632.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32", "isController": false}, {"data": [[1.5949626E12, 650.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33", "isController": false}, {"data": [[1.5949626E12, 422.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34", "isController": false}, {"data": [[1.5949626E12, 2115.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35", "isController": false}, {"data": [[1.5949626E12, 1584.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36", "isController": false}, {"data": [[1.59496272E12, 384.5]], "isOverall": false, "label": "21 - Cerrar  Insis-182", "isController": false}, {"data": [[1.59496272E12, 2251.5]], "isOverall": false, "label": "20 - Cerrar  Persona", "isController": true}, {"data": [[1.59496266E12, 384.5]], "isOverall": false, "label": "10 - Formulario Domicilio-69", "isController": false}, {"data": [[1.59496266E12, 730.0]], "isOverall": false, "label": "10 - Formulario Domicilio-68", "isController": false}, {"data": [[1.59496266E12, 8616.5]], "isOverall": false, "label": "14 - Formulario Relacion ", "isController": true}, {"data": [[1.59496254E12, 1180.0]], "isOverall": false, "label": "5 - Clientes-14", "isController": false}, {"data": [[1.59496266E12, 311.0]], "isOverall": false, "label": "10 - Formulario Domicilio-67", "isController": false}, {"data": [[1.59496254E12, 13943.5]], "isOverall": false, "label": "5 - Clientes-13", "isController": false}, {"data": [[1.59496266E12, 449.5]], "isOverall": false, "label": "10 - Formulario Domicilio-66", "isController": false}, {"data": [[1.59496266E12, 400.5]], "isOverall": false, "label": "10 - Formulario Domicilio-65", "isController": false}, {"data": [[1.59496254E12, 253.5]], "isOverall": false, "label": "1 - Index-1-0", "isController": false}, {"data": [[1.59496266E12, 660.5]], "isOverall": false, "label": "10 - Formulario Domicilio-64", "isController": false}, {"data": [[1.59496266E12, 727.0]], "isOverall": false, "label": "12 - Formulario Contactos-82", "isController": false}, {"data": [[1.59496254E12, 122.5]], "isOverall": false, "label": "4 - Mod de Personas-12", "isController": false}, {"data": [[1.59496254E12, 613.0]], "isOverall": false, "label": "6 - Nuevo Cliente-16", "isController": false}, {"data": [[1.59496272E12, 1072.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159", "isController": false}, {"data": [[1.59496254E12, 139.0]], "isOverall": false, "label": "6 - Nuevo Cliente-17", "isController": false}, {"data": [[1.59496272E12, 1156.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[1.59496266E12, 1412.75]], "isOverall": false, "label": "12 - Formulario Contactos", "isController": true}, {"data": [[1.59496272E12, 1395.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157", "isController": false}, {"data": [[1.59496254E12, 7579.0]], "isOverall": false, "label": "6 - Nuevo Cliente-15", "isController": false}, {"data": [[1.59496272E12, 1265.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156", "isController": false}, {"data": [[1.59496272E12, 2055.0]], "isOverall": false, "label": "19 - Grabar Persona-173", "isController": false}, {"data": [[1.59496272E12, 872.5]], "isOverall": false, "label": "19 - Grabar Persona-174", "isController": false}, {"data": [[1.59496266E12, 22521.5]], "isOverall": false, "label": "9 - Domicilio Crear", "isController": true}, {"data": [[1.59496266E12, 280.0]], "isOverall": false, "label": "17 - Campos Adicionales-140", "isController": false}, {"data": [[1.59496266E12, 1427.0]], "isOverall": false, "label": "17 - Campos Adicionales-141", "isController": false}, {"data": [[1.59496266E12, 808.5]], "isOverall": false, "label": "13 - Relacion Crear-86", "isController": false}, {"data": [[1.59496266E12, 414.5]], "isOverall": false, "label": "13 - Relacion Crear-87", "isController": false}, {"data": [[1.59496272E12, 1892.5]], "isOverall": false, "label": "21 - Cerrar  Insis", "isController": true}, {"data": [[1.59496266E12, 1432.0]], "isOverall": false, "label": "11 - Contactos Crear", "isController": true}, {"data": [[1.59496266E12, 949.0]], "isOverall": false, "label": "17 - Campos Adicionales-139", "isController": false}, {"data": [[1.59496272E12, 1752.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155", "isController": false}, {"data": [[1.59496272E12, 1417.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154", "isController": false}, {"data": [[1.59496272E12, 1433.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153", "isController": false}, {"data": [[1.59496272E12, 1213.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152", "isController": false}, {"data": [[1.59496266E12, 803.0]], "isOverall": false, "label": "13 - Relacion Crear-88", "isController": false}, {"data": [[1.59496272E12, 1515.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[1.59496272E12, 1288.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150", "isController": false}, {"data": [[1.59496266E12, 1161.5]], "isOverall": false, "label": "10 - Formulario Domicilio-52", "isController": false}, {"data": [[1.59496266E12, 159.0]], "isOverall": false, "label": "10 - Formulario Domicilio-51", "isController": false}, {"data": [[1.59496266E12, 698.0]], "isOverall": false, "label": "10 - Formulario Domicilio-50", "isController": false}, {"data": [[1.59496272E12, 1083.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149", "isController": false}, {"data": [[1.59496254E12, 106.0]], "isOverall": false, "label": "2 - Login-9-0", "isController": false}, {"data": [[1.59496254E12, 15123.5]], "isOverall": false, "label": "5 - Clientes", "isController": true}, {"data": [[1.59496266E12, 9595.0]], "isOverall": false, "label": "17 - Campos Adicionales", "isController": true}, {"data": [[1.59496272E12, 1017.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[1.59496266E12, 3604.5]], "isOverall": false, "label": "17 - Campos Adicionales-136", "isController": false}, {"data": [[1.59496272E12, 749.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[1.5949626E12, 1577.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41", "isController": false}, {"data": [[1.59496266E12, 468.0]], "isOverall": false, "label": "17 - Campos Adicionales-137", "isController": false}, {"data": [[1.59496272E12, 1158.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[1.5949626E12, 672.5]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42", "isController": false}, {"data": [[1.59496266E12, 2866.5]], "isOverall": false, "label": "17 - Campos Adicionales-138", "isController": false}, {"data": [[1.59496266E12, 863.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[1.59496254E12, 1113.0]], "isOverall": false, "label": "Inicio - -10", "isController": false}, {"data": [[1.59496254E12, 22961.0]], "isOverall": false, "label": "2 - Login-9-1", "isController": false}, {"data": [[1.59496272E12, 115.5]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1", "isController": false}, {"data": [[1.59496272E12, 157.5]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0", "isController": false}, {"data": [[1.59496254E12, 106.0]], "isOverall": false, "label": "2 - Login-9", "isController": false}, {"data": [[1.59496254E12, 7651.0]], "isOverall": false, "label": "2 - Login-7", "isController": false}, {"data": [[1.59496272E12, 447.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[1.59496272E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59496272E12, 629.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[1.59496272E12, 1895.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[1.59496254E12, 572.5]], "isOverall": false, "label": "3 - Operaciones del Sistema-11", "isController": false}, {"data": [[1.59496266E12, 991.0]], "isOverall": false, "label": "10 - Formulario Domicilio-49", "isController": false}, {"data": [[1.59496266E12, 1320.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[1.59496266E12, 475.5]], "isOverall": false, "label": "10 - Formulario Domicilio-48", "isController": false}, {"data": [[1.59496266E12, 846.0]], "isOverall": false, "label": "14 - Formulario Relacion -89", "isController": false}, {"data": [[1.59496266E12, 629.0]], "isOverall": false, "label": "14 - Formulario Relacion -100", "isController": false}, {"data": [[1.59496266E12, 632.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[1.59496254E12, 430.0]], "isOverall": false, "label": "6 - Nuevo Cliente-18", "isController": false}, {"data": [[1.59496266E12, 216.0]], "isOverall": false, "label": "10 - Formulario Domicilio-47", "isController": false}, {"data": [[1.59496266E12, 780.0]], "isOverall": false, "label": "14 - Formulario Relacion -101", "isController": false}, {"data": [[1.59496266E12, 1438.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[1.59496266E12, 580.0]], "isOverall": false, "label": "10 - Formulario Domicilio-46", "isController": false}, {"data": [[1.59496266E12, 793.5]], "isOverall": false, "label": "14 - Formulario Relacion -102", "isController": false}, {"data": [[1.59496266E12, 774.0]], "isOverall": false, "label": "10 - Formulario Domicilio-45", "isController": false}, {"data": [[1.59496266E12, 578.0]], "isOverall": false, "label": "14 - Formulario Relacion -103", "isController": false}, {"data": [[1.5949626E12, 839.5]], "isOverall": false, "label": "10 - Formulario Domicilio-44", "isController": false}, {"data": [[1.59496266E12, 529.0]], "isOverall": false, "label": "12 - Formulario Contactos-83", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59496272E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.59496254E12, "maxY": 20222.0, "series": [{"data": [[1.59496266E12, 252.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar", "isController": true}, {"data": [[1.59496272E12, 557.5]], "isOverall": false, "label": "19 - Grabar Persona", "isController": true}, {"data": [[1.59496272E12, 162.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[1.59496272E12, 425.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2", "isController": false}, {"data": [[1.59496272E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1", "isController": false}, {"data": [[1.59496272E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0", "isController": false}, {"data": [[1.59496272E12, 156.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[1.59496272E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[1.59496272E12, 457.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[1.59496272E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[1.59496266E12, 245.0]], "isOverall": false, "label": "13 - Relacion Crear", "isController": true}, {"data": [[1.59496272E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[1.59496272E12, 307.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160", "isController": false}, {"data": [[1.59496272E12, 538.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[1.59496254E12, 167.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[1.59496254E12, 174.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20", "isController": false}, {"data": [[1.5949626E12, 156.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21", "isController": false}, {"data": [[1.5949626E12, 404.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22", "isController": false}, {"data": [[1.5949626E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23", "isController": false}, {"data": [[1.59496254E12, 316.0]], "isOverall": false, "label": "6 - Nuevo Cliente", "isController": true}, {"data": [[1.5949626E12, 159.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24", "isController": false}, {"data": [[1.5949626E12, 156.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25", "isController": false}, {"data": [[1.5949626E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26", "isController": false}, {"data": [[1.5949626E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27", "isController": false}, {"data": [[1.5949626E12, 211.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28", "isController": false}, {"data": [[1.59496266E12, 335.5]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar", "isController": true}, {"data": [[1.5949626E12, 314.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29", "isController": false}, {"data": [[1.5949626E12, 0.0]], "isOverall": false, "label": "9 - Domicilio Crear-43", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-76", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-75", "isController": false}, {"data": [[1.5949626E12, 432.5]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[1.59496254E12, 328.5]], "isOverall": false, "label": "2 - Login-7-1", "isController": false}, {"data": [[1.59496254E12, 167.0]], "isOverall": false, "label": "2 - Login-7-0", "isController": false}, {"data": [[1.59496272E12, 288.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1", "isController": false}, {"data": [[1.59496266E12, 375.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar", "isController": true}, {"data": [[1.59496272E12, 1104.5]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0", "isController": false}, {"data": [[1.5949626E12, 560.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38", "isController": false}, {"data": [[1.5949626E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37", "isController": false}, {"data": [[1.5949626E12, 398.33333333333337]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[1.59496272E12, 616.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78", "isController": false}, {"data": [[1.59496254E12, 432.5]], "isOverall": false, "label": "3 - Operaciones del Sistema", "isController": true}, {"data": [[1.5949626E12, 216.25]], "isOverall": false, "label": "8 - Formulario Datos de Cliente", "isController": true}, {"data": [[1.59496266E12, 335.5]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77", "isController": false}, {"data": [[1.59496254E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19", "isController": false}, {"data": [[1.59496266E12, 159.5]], "isOverall": false, "label": "10 - Formulario Domicilio-63", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-62", "isController": false}, {"data": [[1.59496266E12, 159.0]], "isOverall": false, "label": "10 - Formulario Domicilio-61", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-60", "isController": false}, {"data": [[1.59496266E12, 208.5]], "isOverall": false, "label": "11 - Contactos Crear-81", "isController": false}, {"data": [[1.59496266E12, 195.5]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "11 - Contactos Crear-80", "isController": false}, {"data": [[1.59496266E12, 252.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[1.5949626E12, 0.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39", "isController": false}, {"data": [[1.59496266E12, 179.5]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[1.59496266E12, 320.5]], "isOverall": false, "label": "14 - Formulario Relacion -90", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "14 - Formulario Relacion -91", "isController": false}, {"data": [[1.59496266E12, 311.0]], "isOverall": false, "label": "14 - Formulario Relacion -92", "isController": false}, {"data": [[1.59496266E12, 179.0]], "isOverall": false, "label": "14 - Formulario Relacion -93", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "14 - Formulario Relacion -94", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "14 - Formulario Relacion -95", "isController": false}, {"data": [[1.59496272E12, 0.0]], "isOverall": false, "label": "20 - Cerrar  Persona-175", "isController": false}, {"data": [[1.59496266E12, 177.0]], "isOverall": false, "label": "14 - Formulario Relacion -96", "isController": false}, {"data": [[1.59496272E12, 0.0]], "isOverall": false, "label": "20 - Cerrar  Persona-176", "isController": false}, {"data": [[1.59496266E12, 203.5]], "isOverall": false, "label": "14 - Formulario Relacion -97", "isController": false}, {"data": [[1.59496254E12, 0.0]], "isOverall": false, "label": "4 - Mod de Personas", "isController": true}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "14 - Formulario Relacion -98", "isController": false}, {"data": [[1.5949626E12, 0.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40", "isController": false}, {"data": [[1.59496266E12, 157.0]], "isOverall": false, "label": "14 - Formulario Relacion -99", "isController": false}, {"data": [[1.59496266E12, 157.5]], "isOverall": false, "label": "10 - Formulario Domicilio-59", "isController": false}, {"data": [[1.59496254E12, 0.0]], "isOverall": false, "label": "1 - Index-1", "isController": false}, {"data": [[1.59496254E12, 960.0]], "isOverall": false, "label": "1 - Index", "isController": true}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-58", "isController": false}, {"data": [[1.59496272E12, 625.5]], "isOverall": false, "label": "20 - Cerrar  Persona-177", "isController": false}, {"data": [[1.59496272E12, 20222.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59496266E12, 174.5]], "isOverall": false, "label": "10 - Formulario Domicilio-57", "isController": false}, {"data": [[1.59496272E12, 0.0]], "isOverall": false, "label": "20 - Cerrar  Persona-178", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-56", "isController": false}, {"data": [[1.59496266E12, 181.0]], "isOverall": false, "label": "10 - Formulario Domicilio-55", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-54", "isController": false}, {"data": [[1.59496266E12, 177.0]], "isOverall": false, "label": "10 - Formulario Domicilio-53", "isController": false}, {"data": [[1.59496266E12, 310.0]], "isOverall": false, "label": "10 - Formulario Domicilio-74", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-73", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-72", "isController": false}, {"data": [[1.59496272E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[1.59496266E12, 343.5]], "isOverall": false, "label": "10 - Formulario Domicilio-71", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-70", "isController": false}, {"data": [[1.59496272E12, 2637.8333333333335]], "isOverall": false, "label": "18 - Formulario Campos Adicionales", "isController": true}, {"data": [[1.59496272E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183", "isController": false}, {"data": [[1.59496266E12, 1044.6666666666665]], "isOverall": false, "label": "10 - Formulario Domicilio", "isController": true}, {"data": [[1.59496272E12, 1104.5]], "isOverall": false, "label": "21 - Cerrar  Insis-185", "isController": false}, {"data": [[1.59496272E12, 308.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[1.59496272E12, 230.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[1.5949626E12, 560.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar", "isController": true}, {"data": [[1.59496254E12, 0.0]], "isOverall": false, "label": "1 - Index-1-1", "isController": false}, {"data": [[1.5949626E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "11 - Contactos Crear-79", "isController": false}, {"data": [[1.5949626E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31", "isController": false}, {"data": [[1.5949626E12, 160.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32", "isController": false}, {"data": [[1.5949626E12, 144.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33", "isController": false}, {"data": [[1.5949626E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34", "isController": false}, {"data": [[1.5949626E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35", "isController": false}, {"data": [[1.5949626E12, 316.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36", "isController": false}, {"data": [[1.59496272E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182", "isController": false}, {"data": [[1.59496272E12, 625.5]], "isOverall": false, "label": "20 - Cerrar  Persona", "isController": true}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-69", "isController": false}, {"data": [[1.59496266E12, 188.0]], "isOverall": false, "label": "10 - Formulario Domicilio-68", "isController": false}, {"data": [[1.59496266E12, 1676.0]], "isOverall": false, "label": "14 - Formulario Relacion ", "isController": true}, {"data": [[1.59496254E12, 299.0]], "isOverall": false, "label": "5 - Clientes-14", "isController": false}, {"data": [[1.59496266E12, 160.0]], "isOverall": false, "label": "10 - Formulario Domicilio-67", "isController": false}, {"data": [[1.59496254E12, 0.0]], "isOverall": false, "label": "5 - Clientes-13", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-66", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-65", "isController": false}, {"data": [[1.59496254E12, 0.0]], "isOverall": false, "label": "1 - Index-1-0", "isController": false}, {"data": [[1.59496266E12, 166.5]], "isOverall": false, "label": "10 - Formulario Domicilio-64", "isController": false}, {"data": [[1.59496266E12, 221.5]], "isOverall": false, "label": "12 - Formulario Contactos-82", "isController": false}, {"data": [[1.59496254E12, 0.0]], "isOverall": false, "label": "4 - Mod de Personas-12", "isController": false}, {"data": [[1.59496254E12, 316.0]], "isOverall": false, "label": "6 - Nuevo Cliente-16", "isController": false}, {"data": [[1.59496272E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159", "isController": false}, {"data": [[1.59496254E12, 0.0]], "isOverall": false, "label": "6 - Nuevo Cliente-17", "isController": false}, {"data": [[1.59496272E12, 326.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[1.59496266E12, 298.25]], "isOverall": false, "label": "12 - Formulario Contactos", "isController": true}, {"data": [[1.59496272E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157", "isController": false}, {"data": [[1.59496254E12, 0.0]], "isOverall": false, "label": "6 - Nuevo Cliente-15", "isController": false}, {"data": [[1.59496272E12, 314.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156", "isController": false}, {"data": [[1.59496272E12, 0.0]], "isOverall": false, "label": "19 - Grabar Persona-173", "isController": false}, {"data": [[1.59496272E12, 557.5]], "isOverall": false, "label": "19 - Grabar Persona-174", "isController": false}, {"data": [[1.59496266E12, 3469.5]], "isOverall": false, "label": "9 - Domicilio Crear", "isController": true}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "17 - Campos Adicionales-140", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "17 - Campos Adicionales-141", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "13 - Relacion Crear-86", "isController": false}, {"data": [[1.59496266E12, 245.0]], "isOverall": false, "label": "13 - Relacion Crear-87", "isController": false}, {"data": [[1.59496272E12, 1104.5]], "isOverall": false, "label": "21 - Cerrar  Insis", "isController": true}, {"data": [[1.59496266E12, 208.5]], "isOverall": false, "label": "11 - Contactos Crear", "isController": true}, {"data": [[1.59496266E12, 315.5]], "isOverall": false, "label": "17 - Campos Adicionales-139", "isController": false}, {"data": [[1.59496272E12, 164.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155", "isController": false}, {"data": [[1.59496272E12, 177.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154", "isController": false}, {"data": [[1.59496272E12, 158.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153", "isController": false}, {"data": [[1.59496272E12, 176.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "13 - Relacion Crear-88", "isController": false}, {"data": [[1.59496272E12, 154.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[1.59496272E12, 207.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150", "isController": false}, {"data": [[1.59496266E12, 169.5]], "isOverall": false, "label": "10 - Formulario Domicilio-52", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-51", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-50", "isController": false}, {"data": [[1.59496272E12, 145.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149", "isController": false}, {"data": [[1.59496254E12, 0.0]], "isOverall": false, "label": "2 - Login-9-0", "isController": false}, {"data": [[1.59496254E12, 299.0]], "isOverall": false, "label": "5 - Clientes", "isController": true}, {"data": [[1.59496266E12, 850.5]], "isOverall": false, "label": "17 - Campos Adicionales", "isController": true}, {"data": [[1.59496272E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[1.59496266E12, 221.0]], "isOverall": false, "label": "17 - Campos Adicionales-136", "isController": false}, {"data": [[1.59496272E12, 160.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[1.5949626E12, 0.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41", "isController": false}, {"data": [[1.59496266E12, 314.0]], "isOverall": false, "label": "17 - Campos Adicionales-137", "isController": false}, {"data": [[1.59496272E12, 145.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[1.5949626E12, 432.5]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "17 - Campos Adicionales-138", "isController": false}, {"data": [[1.59496266E12, 170.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[1.59496254E12, 960.0]], "isOverall": false, "label": "Inicio - -10", "isController": false}, {"data": [[1.59496254E12, 0.0]], "isOverall": false, "label": "2 - Login-9-1", "isController": false}, {"data": [[1.59496272E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1", "isController": false}, {"data": [[1.59496272E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0", "isController": false}, {"data": [[1.59496254E12, 0.0]], "isOverall": false, "label": "2 - Login-9", "isController": false}, {"data": [[1.59496254E12, 167.0]], "isOverall": false, "label": "2 - Login-7", "isController": false}, {"data": [[1.59496272E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[1.59496272E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59496272E12, 454.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[1.59496272E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[1.59496254E12, 432.5]], "isOverall": false, "label": "3 - Operaciones del Sistema-11", "isController": false}, {"data": [[1.59496266E12, 386.0]], "isOverall": false, "label": "10 - Formulario Domicilio-49", "isController": false}, {"data": [[1.59496266E12, 152.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-48", "isController": false}, {"data": [[1.59496266E12, 256.5]], "isOverall": false, "label": "14 - Formulario Relacion -89", "isController": false}, {"data": [[1.59496266E12, 163.0]], "isOverall": false, "label": "14 - Formulario Relacion -100", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[1.59496254E12, 0.0]], "isOverall": false, "label": "6 - Nuevo Cliente-18", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-47", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "14 - Formulario Relacion -101", "isController": false}, {"data": [[1.59496266E12, 338.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-46", "isController": false}, {"data": [[1.59496266E12, 160.5]], "isOverall": false, "label": "14 - Formulario Relacion -102", "isController": false}, {"data": [[1.59496266E12, 402.0]], "isOverall": false, "label": "10 - Formulario Domicilio-45", "isController": false}, {"data": [[1.59496266E12, 155.5]], "isOverall": false, "label": "14 - Formulario Relacion -103", "isController": false}, {"data": [[1.5949626E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-44", "isController": false}, {"data": [[1.59496266E12, 0.0]], "isOverall": false, "label": "12 - Formulario Contactos-83", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59496272E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.59496254E12, "maxY": 33775.0, "series": [{"data": [[1.5949626E12, 33775.0], [1.59496272E12, 3353.0], [1.59496254E12, 23968.0], [1.59496266E12, 5271.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.5949626E12, 291.0], [1.59496272E12, 1.0], [1.59496254E12, 100.0], [1.59496266E12, 156.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.5949626E12, 3188.400000000003], [1.59496272E12, 1788.7000000000005], [1.59496254E12, 21775.29999999999], [1.59496266E12, 1209.700000000001]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.5949626E12, 33775.0], [1.59496272E12, 3353.0], [1.59496254E12, 23968.0], [1.59496266E12, 5013.429999999996]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.5949626E12, 21010.54999999992], [1.59496272E12, 2492.2], [1.59496254E12, 23798.799999999996], [1.59496266E12, 1526.55]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59496272E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 219.5, "minX": 1.0, "maxY": 1191.5, "series": [{"data": [[8.0, 364.5], [4.0, 534.5], [1.0, 1191.5], [2.0, 1039.0], [5.0, 430.0], [10.0, 219.5], [3.0, 720.0], [6.0, 456.0], [7.0, 331.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 10.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 170.0, "minX": 1.0, "maxY": 1188.0, "series": [{"data": [[8.0, 253.5], [4.0, 503.5], [1.0, 1188.0], [2.0, 991.5], [5.0, 429.0], [10.0, 208.5], [3.0, 641.5], [6.0, 170.0], [7.0, 205.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 10.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.59496248E12, "maxY": 2.3666666666666667, "series": [{"data": [[1.5949626E12, 0.8], [1.59496272E12, 1.4333333333333333], [1.59496254E12, 0.6833333333333333], [1.59496248E12, 0.016666666666666666], [1.59496266E12, 2.3666666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59496272E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.1, "minX": 1.59496254E12, "maxY": 2.3666666666666667, "series": [{"data": [[1.5949626E12, 0.8], [1.59496272E12, 1.3333333333333333], [1.59496254E12, 0.5666666666666667], [1.59496266E12, 2.3666666666666667]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.59496272E12, 0.13333333333333333], [1.59496254E12, 0.1]], "isOverall": false, "label": "302", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59496272E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.59496254E12, "maxY": 0.4, "series": [{"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "17 - Campos Adicionales-140-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-58-success", "isController": false}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-73-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -90-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152-success", "isController": false}, {"data": [[1.59496266E12, 0.1]], "isOverall": false, "label": "10 - Formulario Domicilio-success", "isController": true}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "17 - Campos Adicionales-138-success", "isController": false}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -94-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171-success", "isController": false}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-67-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-54-success", "isController": false}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "6 - Nuevo Cliente-15-success", "isController": false}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "2 - Login-7-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "11 - Contactos Crear-80-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169-success", "isController": false}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-64-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -98-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-49-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "12 - Formulario Contactos-83-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "20 - Cerrar  Persona-success", "isController": true}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-success", "isController": true}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-50-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "11 - Contactos Crear-79-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1-success", "isController": false}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "1 - Index-success", "isController": true}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "13 - Relacion Crear-88-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167-success", "isController": false}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "1 - Index-1-1-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "9 - Domicilio Crear-success", "isController": true}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-60-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162-success", "isController": false}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "4 - Mod de Personas-12-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-45-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -100-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-76-success", "isController": false}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-57-success", "isController": false}, {"data": [[1.59496272E12, 0.1]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-success", "isController": true}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "Inicio - -10-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-success", "isController": true}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "6 - Nuevo Cliente-16-success", "isController": false}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "4 - Mod de Personas-success", "isController": true}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "5 - Clientes-13-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "19 - Grabar Persona-174-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -91-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-74-success", "isController": false}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "2 - Login-7-0-success", "isController": false}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-53-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "17 - Campos Adicionales-137-success", "isController": false}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-70-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-68-success", "isController": false}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "5 - Clientes-success", "isController": true}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "20 - Cerrar  Persona-176-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "Transaction Controller-success", "isController": true}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-183-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-48-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-success", "isController": true}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -95-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -103-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-65-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2-success", "isController": false}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166-success", "isController": false}, {"data": [[1.59496266E12, 0.06666666666666667]], "isOverall": false, "label": "12 - Formulario Contactos-success", "isController": true}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "11 - Contactos Crear-success", "isController": true}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148-success", "isController": false}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-success", "isController": true}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "1 - Index-1-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "12 - Formulario Contactos-82-success", "isController": false}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-44-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-61-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -99-success", "isController": false}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "2 - Login-7-1-success", "isController": false}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "3 - Operaciones del Sistema-success", "isController": true}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "5 - Clientes-14-success", "isController": false}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "6 - Nuevo Cliente-17-success", "isController": false}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-71-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-success", "isController": true}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-56-success", "isController": false}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "6 - Nuevo Cliente-success", "isController": true}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-success", "isController": true}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-69-success", "isController": false}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -92-success", "isController": false}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-52-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "20 - Cerrar  Persona-178-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0-success", "isController": false}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "2 - Login-9-0-success", "isController": false}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "20 - Cerrar  Persona-175-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-66-success", "isController": false}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "2 - Login-success", "isController": true}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-47-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -102-success", "isController": false}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41-success", "isController": false}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -96-success", "isController": false}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-success", "isController": true}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "2 - Login-9-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-62-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "13 - Relacion Crear-86-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164-success", "isController": false}, {"data": [[1.5949626E12, 0.06666666666666667]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-success", "isController": true}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-59-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-72-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -89-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-55-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149-success", "isController": false}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21-success", "isController": false}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "6 - Nuevo Cliente-18-success", "isController": false}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -93-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1-success", "isController": false}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34-success", "isController": false}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "17 - Campos Adicionales-139-success", "isController": false}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "2 - Login-9-1-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-182-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "17 - Campos Adicionales-success", "isController": true}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "17 - Campos Adicionales-141-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "20 - Cerrar  Persona-177-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-success", "isController": true}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "11 - Contactos Crear-81-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-185-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-63-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -97-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -101-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-51-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "17 - Campos Adicionales-136-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "Debug Sampler-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-46-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146-success", "isController": false}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "19 - Grabar Persona-success", "isController": true}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "3 - Operaciones del Sistema-11-success", "isController": false}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "9 - Domicilio Crear-43-success", "isController": false}, {"data": [[1.59496266E12, 0.06666666666666667]], "isOverall": false, "label": "14 - Formulario Relacion -success", "isController": true}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "19 - Grabar Persona-173-success", "isController": false}, {"data": [[1.59496254E12, 0.03333333333333333]], "isOverall": false, "label": "1 - Index-1-0-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio-75-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "13 - Relacion Crear-87-success", "isController": false}, {"data": [[1.59496272E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163-success", "isController": false}, {"data": [[1.5949626E12, 0.4]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-success", "isController": true}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77-success", "isController": false}, {"data": [[1.5949626E12, 0.03333333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25-success", "isController": false}, {"data": [[1.59496266E12, 0.03333333333333333]], "isOverall": false, "label": "13 - Relacion Crear-success", "isController": true}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59496272E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.8666666666666667, "minX": 1.59496254E12, "maxY": 2.8333333333333335, "series": [{"data": [[1.5949626E12, 1.3333333333333333], [1.59496272E12, 1.7666666666666666], [1.59496254E12, 0.8666666666666667], [1.59496266E12, 2.8333333333333335]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59496272E12, "title": "Total Transactions Per Second"}},
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
