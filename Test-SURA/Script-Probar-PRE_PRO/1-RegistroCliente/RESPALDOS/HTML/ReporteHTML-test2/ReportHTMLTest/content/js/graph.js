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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 4.0, "series": [{"data": [[9400.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar", "isController": true}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "19 - Grabar Persona", "isController": true}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[1600.0, 1.0]], "isOverall": false, "label": "13 - Relacion Crear", "isController": true}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160", "isController": false}, {"data": [[1500.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[3300.0, 1.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23", "isController": false}, {"data": [[1800.0, 1.0]], "isOverall": false, "label": "6 - Nuevo Cliente", "isController": true}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar", "isController": true}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "9 - Domicilio Crear-43", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-76", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-75", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "2 - Login-7-1", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "2 - Login-7-0", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar", "isController": true}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37", "isController": false}, {"data": [[300.0, 2.0], [10500.0, 1.0], [700.0, 1.0], [2900.0, 1.0], [400.0, 4.0], [200.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[1500.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "3 - Operaciones del Sistema", "isController": true}, {"data": [[300.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente", "isController": true}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-63", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-62", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-61", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-60", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "11 - Contactos Crear-81", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[8700.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "11 - Contactos Crear-80", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -90", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -91", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -92", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -93", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -94", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -95", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "20 - Cerrar  Persona-175", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -96", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "20 - Cerrar  Persona-176", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -97", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "4 - Mod de Personas", "isController": true}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -98", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -99", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-59", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "1 - Index-1", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "1 - Index", "isController": true}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-58", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "20 - Cerrar  Persona-177", "isController": false}, {"data": [[83100.0, 1.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-57", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "20 - Cerrar  Persona-178", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-56", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-55", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-54", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-53", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-74", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-73", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-72", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-71", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-70", "isController": false}, {"data": [[8600.0, 1.0], [2200.0, 1.0], [16100.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales", "isController": true}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183", "isController": false}, {"data": [[11200.0, 1.0], [800.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio", "isController": true}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[1300.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar", "isController": true}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "1 - Index-1-1", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "11 - Contactos Crear-79", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "20 - Cerrar  Persona", "isController": true}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-69", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-68", "isController": false}, {"data": [[18200.0, 1.0], [5200.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion ", "isController": true}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "5 - Clientes-14", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-67", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "5 - Clientes-13", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-66", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-65", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "1 - Index-1-0", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-64", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "12 - Formulario Contactos-82", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "4 - Mod de Personas-12", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "6 - Nuevo Cliente-16", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "6 - Nuevo Cliente-17", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[600.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "12 - Formulario Contactos", "isController": true}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "6 - Nuevo Cliente-15", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "19 - Grabar Persona-173", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "19 - Grabar Persona-174", "isController": false}, {"data": [[17400.0, 1.0]], "isOverall": false, "label": "9 - Domicilio Crear", "isController": true}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "17 - Campos Adicionales-140", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "17 - Campos Adicionales-141", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "13 - Relacion Crear-86", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "13 - Relacion Crear-87", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis", "isController": true}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "11 - Contactos Crear", "isController": true}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "17 - Campos Adicionales-139", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "13 - Relacion Crear-88", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-52", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-51", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-50", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "2 - Login-9-0", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "5 - Clientes", "isController": true}, {"data": [[2800.0, 1.0]], "isOverall": false, "label": "17 - Campos Adicionales", "isController": true}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "17 - Campos Adicionales-136", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "17 - Campos Adicionales-137", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "17 - Campos Adicionales-138", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Inicio - -10", "isController": false}, {"data": [[2900.0, 1.0]], "isOverall": false, "label": "2 - Login-9-1", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0", "isController": false}, {"data": [[3000.0, 1.0]], "isOverall": false, "label": "2 - Login-9", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "2 - Login-7", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "3 - Operaciones del Sistema-11", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-49", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-48", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -89", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -100", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "6 - Nuevo Cliente-18", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-47", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -101", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-46", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -102", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-45", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "14 - Formulario Relacion -103", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio-44", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "12 - Formulario Contactos-83", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 83100.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 3.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 104.0, "series": [{"data": [[0.0, 104.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 52.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 3.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.59535944E12, "maxY": 1.0, "series": [{"data": [[1.59535944E12, 1.0], [1.5953595E12, 1.0], [1.59535956E12, 1.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59535956E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 2.0, "minX": 1.0, "maxY": 83174.0, "series": [{"data": [[1.0, 9453.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar", "isController": true}, {"data": [[1.0, 9453.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-Aggregated", "isController": true}, {"data": [[1.0, 1238.0]], "isOverall": false, "label": "19 - Grabar Persona", "isController": true}, {"data": [[1.0, 1238.0]], "isOverall": false, "label": "19 - Grabar Persona-Aggregated", "isController": true}, {"data": [[1.0, 403.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[1.0, 403.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169-Aggregated", "isController": false}, {"data": [[1.0, 104.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2", "isController": false}, {"data": [[1.0, 104.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2-Aggregated", "isController": false}, {"data": [[1.0, 111.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1", "isController": false}, {"data": [[1.0, 111.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1-Aggregated", "isController": false}, {"data": [[1.0, 169.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0", "isController": false}, {"data": [[1.0, 169.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0-Aggregated", "isController": false}, {"data": [[1.0, 458.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[1.0, 458.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165-Aggregated", "isController": false}, {"data": [[1.0, 766.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[1.0, 766.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164-Aggregated", "isController": false}, {"data": [[1.0, 489.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[1.0, 489.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163-Aggregated", "isController": false}, {"data": [[1.0, 466.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[1.0, 466.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162-Aggregated", "isController": false}, {"data": [[1.0, 1684.0]], "isOverall": false, "label": "13 - Relacion Crear", "isController": true}, {"data": [[1.0, 1684.0]], "isOverall": false, "label": "13 - Relacion Crear-Aggregated", "isController": true}, {"data": [[1.0, 394.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[1.0, 394.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161-Aggregated", "isController": false}, {"data": [[1.0, 789.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160", "isController": false}, {"data": [[1.0, 789.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160-Aggregated", "isController": false}, {"data": [[1.0, 1581.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[1.0, 1581.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-Aggregated", "isController": true}, {"data": [[1.0, 3325.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[1.0, 3325.0]], "isOverall": false, "label": "2 - Login-Aggregated", "isController": true}, {"data": [[1.0, 319.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20", "isController": false}, {"data": [[1.0, 319.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20-Aggregated", "isController": false}, {"data": [[1.0, 777.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21", "isController": false}, {"data": [[1.0, 777.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21-Aggregated", "isController": false}, {"data": [[1.0, 485.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22", "isController": false}, {"data": [[1.0, 485.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22-Aggregated", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23-Aggregated", "isController": false}, {"data": [[1.0, 1882.0]], "isOverall": false, "label": "6 - Nuevo Cliente", "isController": true}, {"data": [[1.0, 1882.0]], "isOverall": false, "label": "6 - Nuevo Cliente-Aggregated", "isController": true}, {"data": [[1.0, 468.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24", "isController": false}, {"data": [[1.0, 468.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24-Aggregated", "isController": false}, {"data": [[1.0, 653.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25", "isController": false}, {"data": [[1.0, 653.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25-Aggregated", "isController": false}, {"data": [[1.0, 440.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26", "isController": false}, {"data": [[1.0, 440.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26-Aggregated", "isController": false}, {"data": [[1.0, 296.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27", "isController": false}, {"data": [[1.0, 296.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27-Aggregated", "isController": false}, {"data": [[1.0, 445.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28", "isController": false}, {"data": [[1.0, 445.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28-Aggregated", "isController": false}, {"data": [[1.0, 1030.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar", "isController": true}, {"data": [[1.0, 1030.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-Aggregated", "isController": true}, {"data": [[1.0, 493.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29", "isController": false}, {"data": [[1.0, 493.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29-Aggregated", "isController": false}, {"data": [[1.0, 400.0]], "isOverall": false, "label": "9 - Domicilio Crear-43", "isController": false}, {"data": [[1.0, 400.0]], "isOverall": false, "label": "9 - Domicilio Crear-43-Aggregated", "isController": false}, {"data": [[1.0, 422.0]], "isOverall": false, "label": "10 - Formulario Domicilio-76", "isController": false}, {"data": [[1.0, 422.0]], "isOverall": false, "label": "10 - Formulario Domicilio-76-Aggregated", "isController": false}, {"data": [[1.0, 438.0]], "isOverall": false, "label": "10 - Formulario Domicilio-75", "isController": false}, {"data": [[1.0, 438.0]], "isOverall": false, "label": "10 - Formulario Domicilio-75-Aggregated", "isController": false}, {"data": [[1.0, 1210.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[1.0, 1210.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-Aggregated", "isController": true}, {"data": [[1.0, 105.0]], "isOverall": false, "label": "2 - Login-7-1", "isController": false}, {"data": [[1.0, 105.0]], "isOverall": false, "label": "2 - Login-7-1-Aggregated", "isController": false}, {"data": [[1.0, 207.0]], "isOverall": false, "label": "2 - Login-7-0", "isController": false}, {"data": [[1.0, 207.0]], "isOverall": false, "label": "2 - Login-7-0-Aggregated", "isController": false}, {"data": [[1.0, 115.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1", "isController": false}, {"data": [[1.0, 115.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1-Aggregated", "isController": false}, {"data": [[1.0, 701.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar", "isController": true}, {"data": [[1.0, 701.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-Aggregated", "isController": true}, {"data": [[1.0, 107.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0", "isController": false}, {"data": [[1.0, 107.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0-Aggregated", "isController": false}, {"data": [[1.0, 179.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38", "isController": false}, {"data": [[1.0, 179.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38-Aggregated", "isController": false}, {"data": [[1.0, 1127.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37", "isController": false}, {"data": [[1.0, 1127.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37-Aggregated", "isController": false}, {"data": [[1.0, 1599.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[1.0, 1599.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-Aggregated", "isController": true}, {"data": [[1.0, 1514.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[1.0, 1514.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-Aggregated", "isController": true}, {"data": [[1.0, 558.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78", "isController": false}, {"data": [[1.0, 558.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78-Aggregated", "isController": false}, {"data": [[1.0, 541.0]], "isOverall": false, "label": "3 - Operaciones del Sistema", "isController": true}, {"data": [[1.0, 541.0]], "isOverall": false, "label": "3 - Operaciones del Sistema-Aggregated", "isController": true}, {"data": [[1.0, 1137.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente", "isController": true}, {"data": [[1.0, 1137.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-Aggregated", "isController": true}, {"data": [[1.0, 472.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77", "isController": false}, {"data": [[1.0, 472.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77-Aggregated", "isController": false}, {"data": [[1.0, 385.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19", "isController": false}, {"data": [[1.0, 385.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19-Aggregated", "isController": false}, {"data": [[1.0, 825.0]], "isOverall": false, "label": "10 - Formulario Domicilio-63", "isController": false}, {"data": [[1.0, 825.0]], "isOverall": false, "label": "10 - Formulario Domicilio-63-Aggregated", "isController": false}, {"data": [[1.0, 826.0]], "isOverall": false, "label": "10 - Formulario Domicilio-62", "isController": false}, {"data": [[1.0, 826.0]], "isOverall": false, "label": "10 - Formulario Domicilio-62-Aggregated", "isController": false}, {"data": [[1.0, 171.0]], "isOverall": false, "label": "10 - Formulario Domicilio-61", "isController": false}, {"data": [[1.0, 171.0]], "isOverall": false, "label": "10 - Formulario Domicilio-61-Aggregated", "isController": false}, {"data": [[1.0, 440.0]], "isOverall": false, "label": "10 - Formulario Domicilio-60", "isController": false}, {"data": [[1.0, 440.0]], "isOverall": false, "label": "10 - Formulario Domicilio-60-Aggregated", "isController": false}, {"data": [[1.0, 464.0]], "isOverall": false, "label": "11 - Contactos Crear-81", "isController": false}, {"data": [[1.0, 464.0]], "isOverall": false, "label": "11 - Contactos Crear-81-Aggregated", "isController": false}, {"data": [[1.0, 174.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[1.0, 174.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85-Aggregated", "isController": false}, {"data": [[1.0, 8738.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[1.0, 8738.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104-Aggregated", "isController": false}, {"data": [[1.0, 162.0]], "isOverall": false, "label": "11 - Contactos Crear-80", "isController": false}, {"data": [[1.0, 162.0]], "isOverall": false, "label": "11 - Contactos Crear-80-Aggregated", "isController": false}, {"data": [[1.0, 715.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[1.0, 715.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105-Aggregated", "isController": false}, {"data": [[1.0, 294.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39", "isController": false}, {"data": [[1.0, 294.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39-Aggregated", "isController": false}, {"data": [[1.0, 527.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[1.0, 527.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84-Aggregated", "isController": false}, {"data": [[1.0, 456.0]], "isOverall": false, "label": "14 - Formulario Relacion -90", "isController": false}, {"data": [[1.0, 456.0]], "isOverall": false, "label": "14 - Formulario Relacion -90-Aggregated", "isController": false}, {"data": [[1.0, 477.0]], "isOverall": false, "label": "14 - Formulario Relacion -91", "isController": false}, {"data": [[1.0, 477.0]], "isOverall": false, "label": "14 - Formulario Relacion -91-Aggregated", "isController": false}, {"data": [[1.0, 618.0]], "isOverall": false, "label": "14 - Formulario Relacion -92", "isController": false}, {"data": [[1.0, 618.0]], "isOverall": false, "label": "14 - Formulario Relacion -92-Aggregated", "isController": false}, {"data": [[1.0, 496.0]], "isOverall": false, "label": "14 - Formulario Relacion -93", "isController": false}, {"data": [[1.0, 496.0]], "isOverall": false, "label": "14 - Formulario Relacion -93-Aggregated", "isController": false}, {"data": [[1.0, 375.0]], "isOverall": false, "label": "14 - Formulario Relacion -94", "isController": false}, {"data": [[1.0, 375.0]], "isOverall": false, "label": "14 - Formulario Relacion -94-Aggregated", "isController": false}, {"data": [[1.0, 624.0]], "isOverall": false, "label": "14 - Formulario Relacion -95", "isController": false}, {"data": [[1.0, 624.0]], "isOverall": false, "label": "14 - Formulario Relacion -95-Aggregated", "isController": false}, {"data": [[1.0, 565.0]], "isOverall": false, "label": "20 - Cerrar  Persona-175", "isController": false}, {"data": [[1.0, 565.0]], "isOverall": false, "label": "20 - Cerrar  Persona-175-Aggregated", "isController": false}, {"data": [[1.0, 1155.0]], "isOverall": false, "label": "14 - Formulario Relacion -96", "isController": false}, {"data": [[1.0, 1155.0]], "isOverall": false, "label": "14 - Formulario Relacion -96-Aggregated", "isController": false}, {"data": [[1.0, 276.0]], "isOverall": false, "label": "20 - Cerrar  Persona-176", "isController": false}, {"data": [[1.0, 276.0]], "isOverall": false, "label": "20 - Cerrar  Persona-176-Aggregated", "isController": false}, {"data": [[1.0, 546.0]], "isOverall": false, "label": "14 - Formulario Relacion -97", "isController": false}, {"data": [[1.0, 546.0]], "isOverall": false, "label": "14 - Formulario Relacion -97-Aggregated", "isController": false}, {"data": [[1.0, 130.0]], "isOverall": false, "label": "4 - Mod de Personas", "isController": true}, {"data": [[1.0, 130.0]], "isOverall": false, "label": "4 - Mod de Personas-Aggregated", "isController": true}, {"data": [[1.0, 507.0]], "isOverall": false, "label": "14 - Formulario Relacion -98", "isController": false}, {"data": [[1.0, 507.0]], "isOverall": false, "label": "14 - Formulario Relacion -98-Aggregated", "isController": false}, {"data": [[1.0, 385.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40", "isController": false}, {"data": [[1.0, 385.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40-Aggregated", "isController": false}, {"data": [[1.0, 783.0]], "isOverall": false, "label": "14 - Formulario Relacion -99", "isController": false}, {"data": [[1.0, 783.0]], "isOverall": false, "label": "14 - Formulario Relacion -99-Aggregated", "isController": false}, {"data": [[1.0, 649.0]], "isOverall": false, "label": "10 - Formulario Domicilio-59", "isController": false}, {"data": [[1.0, 649.0]], "isOverall": false, "label": "10 - Formulario Domicilio-59-Aggregated", "isController": false}, {"data": [[1.0, 256.0]], "isOverall": false, "label": "1 - Index-1", "isController": false}, {"data": [[1.0, 256.0]], "isOverall": false, "label": "1 - Index-1-Aggregated", "isController": false}, {"data": [[1.0, 938.0]], "isOverall": false, "label": "1 - Index", "isController": true}, {"data": [[1.0, 938.0]], "isOverall": false, "label": "1 - Index-Aggregated", "isController": true}, {"data": [[1.0, 454.0]], "isOverall": false, "label": "10 - Formulario Domicilio-58", "isController": false}, {"data": [[1.0, 454.0]], "isOverall": false, "label": "10 - Formulario Domicilio-58-Aggregated", "isController": false}, {"data": [[1.0, 426.0]], "isOverall": false, "label": "20 - Cerrar  Persona-177", "isController": false}, {"data": [[1.0, 426.0]], "isOverall": false, "label": "20 - Cerrar  Persona-177-Aggregated", "isController": false}, {"data": [[1.0, 83174.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.0, 83174.0]], "isOverall": false, "label": "Transaction Controller-Aggregated", "isController": true}, {"data": [[1.0, 165.0]], "isOverall": false, "label": "10 - Formulario Domicilio-57", "isController": false}, {"data": [[1.0, 165.0]], "isOverall": false, "label": "10 - Formulario Domicilio-57-Aggregated", "isController": false}, {"data": [[1.0, 181.0]], "isOverall": false, "label": "20 - Cerrar  Persona-178", "isController": false}, {"data": [[1.0, 181.0]], "isOverall": false, "label": "20 - Cerrar  Persona-178-Aggregated", "isController": false}, {"data": [[1.0, 428.0]], "isOverall": false, "label": "10 - Formulario Domicilio-56", "isController": false}, {"data": [[1.0, 428.0]], "isOverall": false, "label": "10 - Formulario Domicilio-56-Aggregated", "isController": false}, {"data": [[1.0, 486.0]], "isOverall": false, "label": "10 - Formulario Domicilio-55", "isController": false}, {"data": [[1.0, 486.0]], "isOverall": false, "label": "10 - Formulario Domicilio-55-Aggregated", "isController": false}, {"data": [[1.0, 706.0]], "isOverall": false, "label": "10 - Formulario Domicilio-54", "isController": false}, {"data": [[1.0, 706.0]], "isOverall": false, "label": "10 - Formulario Domicilio-54-Aggregated", "isController": false}, {"data": [[1.0, 350.0]], "isOverall": false, "label": "10 - Formulario Domicilio-53", "isController": false}, {"data": [[1.0, 350.0]], "isOverall": false, "label": "10 - Formulario Domicilio-53-Aggregated", "isController": false}, {"data": [[1.0, 395.0]], "isOverall": false, "label": "10 - Formulario Domicilio-74", "isController": false}, {"data": [[1.0, 395.0]], "isOverall": false, "label": "10 - Formulario Domicilio-74-Aggregated", "isController": false}, {"data": [[1.0, 708.0]], "isOverall": false, "label": "10 - Formulario Domicilio-73", "isController": false}, {"data": [[1.0, 708.0]], "isOverall": false, "label": "10 - Formulario Domicilio-73-Aggregated", "isController": false}, {"data": [[1.0, 698.0]], "isOverall": false, "label": "10 - Formulario Domicilio-72", "isController": false}, {"data": [[1.0, 698.0]], "isOverall": false, "label": "10 - Formulario Domicilio-72-Aggregated", "isController": false}, {"data": [[1.0, 818.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[1.0, 818.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168-Aggregated", "isController": false}, {"data": [[1.0, 173.0]], "isOverall": false, "label": "10 - Formulario Domicilio-71", "isController": false}, {"data": [[1.0, 173.0]], "isOverall": false, "label": "10 - Formulario Domicilio-71-Aggregated", "isController": false}, {"data": [[1.0, 459.0]], "isOverall": false, "label": "10 - Formulario Domicilio-70", "isController": false}, {"data": [[1.0, 459.0]], "isOverall": false, "label": "10 - Formulario Domicilio-70-Aggregated", "isController": false}, {"data": [[1.0, 9003.666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales", "isController": true}, {"data": [[1.0, 9003.666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-Aggregated", "isController": true}, {"data": [[1.0, 198.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183", "isController": false}, {"data": [[1.0, 198.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-Aggregated", "isController": false}, {"data": [[1.0, 5336.0]], "isOverall": false, "label": "10 - Formulario Domicilio", "isController": true}, {"data": [[1.0, 5336.0]], "isOverall": false, "label": "10 - Formulario Domicilio-Aggregated", "isController": true}, {"data": [[1.0, 222.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185", "isController": false}, {"data": [[1.0, 222.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-Aggregated", "isController": false}, {"data": [[1.0, 378.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[1.0, 378.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166-Aggregated", "isController": false}, {"data": [[1.0, 385.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[1.0, 385.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167-Aggregated", "isController": false}, {"data": [[1.0, 1306.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar", "isController": true}, {"data": [[1.0, 1306.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-Aggregated", "isController": true}, {"data": [[1.0, 128.0]], "isOverall": false, "label": "1 - Index-1-1", "isController": false}, {"data": [[1.0, 128.0]], "isOverall": false, "label": "1 - Index-1-1-Aggregated", "isController": false}, {"data": [[1.0, 1101.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30", "isController": false}, {"data": [[1.0, 1101.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30-Aggregated", "isController": false}, {"data": [[1.0, 527.0]], "isOverall": false, "label": "11 - Contactos Crear-79", "isController": false}, {"data": [[1.0, 527.0]], "isOverall": false, "label": "11 - Contactos Crear-79-Aggregated", "isController": false}, {"data": [[1.0, 423.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31", "isController": false}, {"data": [[1.0, 423.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31-Aggregated", "isController": false}, {"data": [[1.0, 568.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32", "isController": false}, {"data": [[1.0, 568.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32-Aggregated", "isController": false}, {"data": [[1.0, 812.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33", "isController": false}, {"data": [[1.0, 812.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33-Aggregated", "isController": false}, {"data": [[1.0, 396.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34", "isController": false}, {"data": [[1.0, 396.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34-Aggregated", "isController": false}, {"data": [[1.0, 433.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35", "isController": false}, {"data": [[1.0, 433.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35-Aggregated", "isController": false}, {"data": [[1.0, 390.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36", "isController": false}, {"data": [[1.0, 390.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36-Aggregated", "isController": false}, {"data": [[1.0, 387.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182", "isController": false}, {"data": [[1.0, 387.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-Aggregated", "isController": false}, {"data": [[1.0, 1448.0]], "isOverall": false, "label": "20 - Cerrar  Persona", "isController": true}, {"data": [[1.0, 1448.0]], "isOverall": false, "label": "20 - Cerrar  Persona-Aggregated", "isController": true}, {"data": [[1.0, 393.0]], "isOverall": false, "label": "10 - Formulario Domicilio-69", "isController": false}, {"data": [[1.0, 393.0]], "isOverall": false, "label": "10 - Formulario Domicilio-69-Aggregated", "isController": false}, {"data": [[1.0, 363.0]], "isOverall": false, "label": "10 - Formulario Domicilio-68", "isController": false}, {"data": [[1.0, 363.0]], "isOverall": false, "label": "10 - Formulario Domicilio-68-Aggregated", "isController": false}, {"data": [[1.0, 11774.5]], "isOverall": false, "label": "14 - Formulario Relacion ", "isController": true}, {"data": [[1.0, 11774.5]], "isOverall": false, "label": "14 - Formulario Relacion -Aggregated", "isController": true}, {"data": [[1.0, 121.0]], "isOverall": false, "label": "5 - Clientes-14", "isController": false}, {"data": [[1.0, 121.0]], "isOverall": false, "label": "5 - Clientes-14-Aggregated", "isController": false}, {"data": [[1.0, 480.0]], "isOverall": false, "label": "10 - Formulario Domicilio-67", "isController": false}, {"data": [[1.0, 480.0]], "isOverall": false, "label": "10 - Formulario Domicilio-67-Aggregated", "isController": false}, {"data": [[1.0, 970.0]], "isOverall": false, "label": "5 - Clientes-13", "isController": false}, {"data": [[1.0, 970.0]], "isOverall": false, "label": "5 - Clientes-13-Aggregated", "isController": false}, {"data": [[1.0, 475.0]], "isOverall": false, "label": "10 - Formulario Domicilio-66", "isController": false}, {"data": [[1.0, 475.0]], "isOverall": false, "label": "10 - Formulario Domicilio-66-Aggregated", "isController": false}, {"data": [[1.0, 571.0]], "isOverall": false, "label": "10 - Formulario Domicilio-65", "isController": false}, {"data": [[1.0, 571.0]], "isOverall": false, "label": "10 - Formulario Domicilio-65-Aggregated", "isController": false}, {"data": [[1.0, 125.0]], "isOverall": false, "label": "1 - Index-1-0", "isController": false}, {"data": [[1.0, 125.0]], "isOverall": false, "label": "1 - Index-1-0-Aggregated", "isController": false}, {"data": [[1.0, 337.0]], "isOverall": false, "label": "10 - Formulario Domicilio-64", "isController": false}, {"data": [[1.0, 337.0]], "isOverall": false, "label": "10 - Formulario Domicilio-64-Aggregated", "isController": false}, {"data": [[1.0, 432.0]], "isOverall": false, "label": "12 - Formulario Contactos-82", "isController": false}, {"data": [[1.0, 432.0]], "isOverall": false, "label": "12 - Formulario Contactos-82-Aggregated", "isController": false}, {"data": [[1.0, 130.0]], "isOverall": false, "label": "4 - Mod de Personas-12", "isController": false}, {"data": [[1.0, 130.0]], "isOverall": false, "label": "4 - Mod de Personas-12-Aggregated", "isController": false}, {"data": [[1.0, 849.0]], "isOverall": false, "label": "6 - Nuevo Cliente-16", "isController": false}, {"data": [[1.0, 849.0]], "isOverall": false, "label": "6 - Nuevo Cliente-16-Aggregated", "isController": false}, {"data": [[1.0, 486.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159", "isController": false}, {"data": [[1.0, 486.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159-Aggregated", "isController": false}, {"data": [[1.0, 130.0]], "isOverall": false, "label": "6 - Nuevo Cliente-17", "isController": false}, {"data": [[1.0, 130.0]], "isOverall": false, "label": "6 - Nuevo Cliente-17-Aggregated", "isController": false}, {"data": [[1.0, 461.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[1.0, 461.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158-Aggregated", "isController": false}, {"data": [[1.0, 1237.5]], "isOverall": false, "label": "12 - Formulario Contactos", "isController": true}, {"data": [[1.0, 1237.5]], "isOverall": false, "label": "12 - Formulario Contactos-Aggregated", "isController": true}, {"data": [[1.0, 475.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157", "isController": false}, {"data": [[1.0, 475.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157-Aggregated", "isController": false}, {"data": [[1.0, 588.0]], "isOverall": false, "label": "6 - Nuevo Cliente-15", "isController": false}, {"data": [[1.0, 588.0]], "isOverall": false, "label": "6 - Nuevo Cliente-15-Aggregated", "isController": false}, {"data": [[1.0, 708.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156", "isController": false}, {"data": [[1.0, 708.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156-Aggregated", "isController": false}, {"data": [[1.0, 1011.0]], "isOverall": false, "label": "19 - Grabar Persona-173", "isController": false}, {"data": [[1.0, 1011.0]], "isOverall": false, "label": "19 - Grabar Persona-173-Aggregated", "isController": false}, {"data": [[1.0, 227.0]], "isOverall": false, "label": "19 - Grabar Persona-174", "isController": false}, {"data": [[1.0, 227.0]], "isOverall": false, "label": "19 - Grabar Persona-174-Aggregated", "isController": false}, {"data": [[1.0, 17438.0]], "isOverall": false, "label": "9 - Domicilio Crear", "isController": true}, {"data": [[1.0, 17438.0]], "isOverall": false, "label": "9 - Domicilio Crear-Aggregated", "isController": true}, {"data": [[1.0, 607.0]], "isOverall": false, "label": "17 - Campos Adicionales-140", "isController": false}, {"data": [[1.0, 607.0]], "isOverall": false, "label": "17 - Campos Adicionales-140-Aggregated", "isController": false}, {"data": [[1.0, 527.0]], "isOverall": false, "label": "17 - Campos Adicionales-141", "isController": false}, {"data": [[1.0, 527.0]], "isOverall": false, "label": "17 - Campos Adicionales-141-Aggregated", "isController": false}, {"data": [[1.0, 532.0]], "isOverall": false, "label": "13 - Relacion Crear-86", "isController": false}, {"data": [[1.0, 532.0]], "isOverall": false, "label": "13 - Relacion Crear-86-Aggregated", "isController": false}, {"data": [[1.0, 172.0]], "isOverall": false, "label": "13 - Relacion Crear-87", "isController": false}, {"data": [[1.0, 172.0]], "isOverall": false, "label": "13 - Relacion Crear-87-Aggregated", "isController": false}, {"data": [[1.0, 807.0]], "isOverall": false, "label": "21 - Cerrar  Insis", "isController": true}, {"data": [[1.0, 807.0]], "isOverall": false, "label": "21 - Cerrar  Insis-Aggregated", "isController": true}, {"data": [[1.0, 1153.0]], "isOverall": false, "label": "11 - Contactos Crear", "isController": true}, {"data": [[1.0, 1153.0]], "isOverall": false, "label": "11 - Contactos Crear-Aggregated", "isController": true}, {"data": [[1.0, 481.0]], "isOverall": false, "label": "17 - Campos Adicionales-139", "isController": false}, {"data": [[1.0, 481.0]], "isOverall": false, "label": "17 - Campos Adicionales-139-Aggregated", "isController": false}, {"data": [[1.0, 517.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155", "isController": false}, {"data": [[1.0, 517.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155-Aggregated", "isController": false}, {"data": [[1.0, 461.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154", "isController": false}, {"data": [[1.0, 461.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154-Aggregated", "isController": false}, {"data": [[1.0, 477.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153", "isController": false}, {"data": [[1.0, 477.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153-Aggregated", "isController": false}, {"data": [[1.0, 791.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152", "isController": false}, {"data": [[1.0, 791.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152-Aggregated", "isController": false}, {"data": [[1.0, 980.0]], "isOverall": false, "label": "13 - Relacion Crear-88", "isController": false}, {"data": [[1.0, 980.0]], "isOverall": false, "label": "13 - Relacion Crear-88-Aggregated", "isController": false}, {"data": [[1.0, 514.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[1.0, 514.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151-Aggregated", "isController": false}, {"data": [[1.0, 410.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150", "isController": false}, {"data": [[1.0, 410.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150-Aggregated", "isController": false}, {"data": [[1.0, 739.0]], "isOverall": false, "label": "10 - Formulario Domicilio-52", "isController": false}, {"data": [[1.0, 739.0]], "isOverall": false, "label": "10 - Formulario Domicilio-52-Aggregated", "isController": false}, {"data": [[1.0, 247.0]], "isOverall": false, "label": "10 - Formulario Domicilio-51", "isController": false}, {"data": [[1.0, 247.0]], "isOverall": false, "label": "10 - Formulario Domicilio-51-Aggregated", "isController": false}, {"data": [[1.0, 704.0]], "isOverall": false, "label": "10 - Formulario Domicilio-50", "isController": false}, {"data": [[1.0, 704.0]], "isOverall": false, "label": "10 - Formulario Domicilio-50-Aggregated", "isController": false}, {"data": [[1.0, 466.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149", "isController": false}, {"data": [[1.0, 466.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149-Aggregated", "isController": false}, {"data": [[1.0, 104.0]], "isOverall": false, "label": "2 - Login-9-0", "isController": false}, {"data": [[1.0, 104.0]], "isOverall": false, "label": "2 - Login-9-0-Aggregated", "isController": false}, {"data": [[1.0, 1091.0]], "isOverall": false, "label": "5 - Clientes", "isController": true}, {"data": [[1.0, 1091.0]], "isOverall": false, "label": "5 - Clientes-Aggregated", "isController": true}, {"data": [[1.0, 2825.0]], "isOverall": false, "label": "17 - Campos Adicionales", "isController": true}, {"data": [[1.0, 2825.0]], "isOverall": false, "label": "17 - Campos Adicionales-Aggregated", "isController": true}, {"data": [[1.0, 794.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[1.0, 794.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148-Aggregated", "isController": false}, {"data": [[1.0, 541.0]], "isOverall": false, "label": "17 - Campos Adicionales-136", "isController": false}, {"data": [[1.0, 541.0]], "isOverall": false, "label": "17 - Campos Adicionales-136-Aggregated", "isController": false}, {"data": [[1.0, 464.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[1.0, 464.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147-Aggregated", "isController": false}, {"data": [[1.0, 1039.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41", "isController": false}, {"data": [[1.0, 1039.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41-Aggregated", "isController": false}, {"data": [[1.0, 219.0]], "isOverall": false, "label": "17 - Campos Adicionales-137", "isController": false}, {"data": [[1.0, 219.0]], "isOverall": false, "label": "17 - Campos Adicionales-137-Aggregated", "isController": false}, {"data": [[1.0, 503.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[1.0, 503.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146-Aggregated", "isController": false}, {"data": [[1.0, 171.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42", "isController": false}, {"data": [[1.0, 171.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42-Aggregated", "isController": false}, {"data": [[1.0, 450.0]], "isOverall": false, "label": "17 - Campos Adicionales-138", "isController": false}, {"data": [[1.0, 450.0]], "isOverall": false, "label": "17 - Campos Adicionales-138-Aggregated", "isController": false}, {"data": [[1.0, 401.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[1.0, 401.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145-Aggregated", "isController": false}, {"data": [[1.0, 682.0]], "isOverall": false, "label": "Inicio - -10", "isController": false}, {"data": [[1.0, 682.0]], "isOverall": false, "label": "Inicio - -10-Aggregated", "isController": false}, {"data": [[1.0, 2907.0]], "isOverall": false, "label": "2 - Login-9-1", "isController": false}, {"data": [[1.0, 2907.0]], "isOverall": false, "label": "2 - Login-9-1-Aggregated", "isController": false}, {"data": [[1.0, 106.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1", "isController": false}, {"data": [[1.0, 106.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1-Aggregated", "isController": false}, {"data": [[1.0, 92.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0", "isController": false}, {"data": [[1.0, 92.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0-Aggregated", "isController": false}, {"data": [[1.0, 3012.0]], "isOverall": false, "label": "2 - Login-9", "isController": false}, {"data": [[1.0, 3012.0]], "isOverall": false, "label": "2 - Login-9-Aggregated", "isController": false}, {"data": [[1.0, 313.0]], "isOverall": false, "label": "2 - Login-7", "isController": false}, {"data": [[1.0, 313.0]], "isOverall": false, "label": "2 - Login-7-Aggregated", "isController": false}, {"data": [[1.0, 457.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[1.0, 457.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172-Aggregated", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "Debug Sampler-Aggregated", "isController": false}, {"data": [[1.0, 218.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[1.0, 218.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171-Aggregated", "isController": false}, {"data": [[1.0, 436.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[1.0, 436.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170-Aggregated", "isController": false}, {"data": [[1.0, 541.0]], "isOverall": false, "label": "3 - Operaciones del Sistema-11", "isController": false}, {"data": [[1.0, 541.0]], "isOverall": false, "label": "3 - Operaciones del Sistema-11-Aggregated", "isController": false}, {"data": [[1.0, 403.0]], "isOverall": false, "label": "10 - Formulario Domicilio-49", "isController": false}, {"data": [[1.0, 403.0]], "isOverall": false, "label": "10 - Formulario Domicilio-49-Aggregated", "isController": false}, {"data": [[1.0, 794.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[1.0, 794.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144-Aggregated", "isController": false}, {"data": [[1.0, 458.0]], "isOverall": false, "label": "10 - Formulario Domicilio-48", "isController": false}, {"data": [[1.0, 458.0]], "isOverall": false, "label": "10 - Formulario Domicilio-48-Aggregated", "isController": false}, {"data": [[1.0, 472.0]], "isOverall": false, "label": "14 - Formulario Relacion -89", "isController": false}, {"data": [[1.0, 472.0]], "isOverall": false, "label": "14 - Formulario Relacion -89-Aggregated", "isController": false}, {"data": [[1.0, 450.0]], "isOverall": false, "label": "14 - Formulario Relacion -100", "isController": false}, {"data": [[1.0, 450.0]], "isOverall": false, "label": "14 - Formulario Relacion -100-Aggregated", "isController": false}, {"data": [[1.0, 452.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[1.0, 452.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143-Aggregated", "isController": false}, {"data": [[1.0, 315.0]], "isOverall": false, "label": "6 - Nuevo Cliente-18", "isController": false}, {"data": [[1.0, 315.0]], "isOverall": false, "label": "6 - Nuevo Cliente-18-Aggregated", "isController": false}, {"data": [[1.0, 153.0]], "isOverall": false, "label": "10 - Formulario Domicilio-47", "isController": false}, {"data": [[1.0, 153.0]], "isOverall": false, "label": "10 - Formulario Domicilio-47-Aggregated", "isController": false}, {"data": [[1.0, 497.0]], "isOverall": false, "label": "14 - Formulario Relacion -101", "isController": false}, {"data": [[1.0, 497.0]], "isOverall": false, "label": "14 - Formulario Relacion -101-Aggregated", "isController": false}, {"data": [[1.0, 491.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[1.0, 491.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142-Aggregated", "isController": false}, {"data": [[1.0, 360.0]], "isOverall": false, "label": "10 - Formulario Domicilio-46", "isController": false}, {"data": [[1.0, 360.0]], "isOverall": false, "label": "10 - Formulario Domicilio-46-Aggregated", "isController": false}, {"data": [[1.0, 481.0]], "isOverall": false, "label": "14 - Formulario Relacion -102", "isController": false}, {"data": [[1.0, 481.0]], "isOverall": false, "label": "14 - Formulario Relacion -102-Aggregated", "isController": false}, {"data": [[1.0, 812.0]], "isOverall": false, "label": "10 - Formulario Domicilio-45", "isController": false}, {"data": [[1.0, 812.0]], "isOverall": false, "label": "10 - Formulario Domicilio-45-Aggregated", "isController": false}, {"data": [[1.0, 870.0]], "isOverall": false, "label": "14 - Formulario Relacion -103", "isController": false}, {"data": [[1.0, 870.0]], "isOverall": false, "label": "14 - Formulario Relacion -103-Aggregated", "isController": false}, {"data": [[1.0, 720.0]], "isOverall": false, "label": "10 - Formulario Domicilio-44", "isController": false}, {"data": [[1.0, 720.0]], "isOverall": false, "label": "10 - Formulario Domicilio-44-Aggregated", "isController": false}, {"data": [[1.0, 671.0]], "isOverall": false, "label": "12 - Formulario Contactos-83", "isController": false}, {"data": [[1.0, 671.0]], "isOverall": false, "label": "12 - Formulario Contactos-83-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 1204.0666666666666, "minX": 1.59535944E12, "maxY": 18982.7, "series": [{"data": [[1.59535944E12, 9804.85], [1.5953595E12, 18982.7], [1.59535956E12, 7006.066666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.59535944E12, 1204.0666666666666], [1.5953595E12, 12107.483333333334], [1.59535956E12, 3714.35]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59535956E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 2.0, "minX": 1.59535944E12, "maxY": 83174.0, "series": [{"data": [[1.5953595E12, 9453.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar", "isController": true}, {"data": [[1.59535956E12, 1238.0]], "isOverall": false, "label": "19 - Grabar Persona", "isController": true}, {"data": [[1.59535956E12, 403.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[1.59535956E12, 104.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2", "isController": false}, {"data": [[1.59535956E12, 111.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1", "isController": false}, {"data": [[1.59535956E12, 169.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0", "isController": false}, {"data": [[1.59535956E12, 458.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[1.59535956E12, 766.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[1.59535956E12, 489.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[1.59535956E12, 466.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[1.5953595E12, 1684.0]], "isOverall": false, "label": "13 - Relacion Crear", "isController": true}, {"data": [[1.59535956E12, 394.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[1.59535956E12, 789.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160", "isController": false}, {"data": [[1.59535956E12, 1581.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[1.59535944E12, 3325.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[1.59535944E12, 319.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20", "isController": false}, {"data": [[1.59535944E12, 777.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21", "isController": false}, {"data": [[1.59535944E12, 485.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22", "isController": false}, {"data": [[1.59535944E12, 409.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23", "isController": false}, {"data": [[1.59535944E12, 1882.0]], "isOverall": false, "label": "6 - Nuevo Cliente", "isController": true}, {"data": [[1.59535944E12, 468.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24", "isController": false}, {"data": [[1.5953595E12, 653.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25", "isController": false}, {"data": [[1.5953595E12, 440.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26", "isController": false}, {"data": [[1.5953595E12, 296.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27", "isController": false}, {"data": [[1.5953595E12, 445.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28", "isController": false}, {"data": [[1.5953595E12, 1030.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar", "isController": true}, {"data": [[1.5953595E12, 493.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29", "isController": false}, {"data": [[1.5953595E12, 400.0]], "isOverall": false, "label": "9 - Domicilio Crear-43", "isController": false}, {"data": [[1.5953595E12, 422.0]], "isOverall": false, "label": "10 - Formulario Domicilio-76", "isController": false}, {"data": [[1.5953595E12, 438.0]], "isOverall": false, "label": "10 - Formulario Domicilio-75", "isController": false}, {"data": [[1.5953595E12, 1210.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[1.59535944E12, 105.0]], "isOverall": false, "label": "2 - Login-7-1", "isController": false}, {"data": [[1.59535944E12, 207.0]], "isOverall": false, "label": "2 - Login-7-0", "isController": false}, {"data": [[1.59535956E12, 115.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1", "isController": false}, {"data": [[1.5953595E12, 701.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar", "isController": true}, {"data": [[1.59535956E12, 107.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0", "isController": false}, {"data": [[1.5953595E12, 179.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38", "isController": false}, {"data": [[1.5953595E12, 1127.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37", "isController": false}, {"data": [[1.59535944E12, 534.75], [1.5953595E12, 2131.125]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[1.59535956E12, 1514.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[1.5953595E12, 558.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78", "isController": false}, {"data": [[1.59535944E12, 541.0]], "isOverall": false, "label": "3 - Operaciones del Sistema", "isController": true}, {"data": [[1.5953595E12, 1137.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente", "isController": true}, {"data": [[1.5953595E12, 472.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77", "isController": false}, {"data": [[1.59535944E12, 385.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19", "isController": false}, {"data": [[1.5953595E12, 825.0]], "isOverall": false, "label": "10 - Formulario Domicilio-63", "isController": false}, {"data": [[1.5953595E12, 826.0]], "isOverall": false, "label": "10 - Formulario Domicilio-62", "isController": false}, {"data": [[1.5953595E12, 171.0]], "isOverall": false, "label": "10 - Formulario Domicilio-61", "isController": false}, {"data": [[1.5953595E12, 440.0]], "isOverall": false, "label": "10 - Formulario Domicilio-60", "isController": false}, {"data": [[1.5953595E12, 464.0]], "isOverall": false, "label": "11 - Contactos Crear-81", "isController": false}, {"data": [[1.5953595E12, 174.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[1.5953595E12, 8738.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[1.5953595E12, 162.0]], "isOverall": false, "label": "11 - Contactos Crear-80", "isController": false}, {"data": [[1.5953595E12, 715.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[1.5953595E12, 294.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39", "isController": false}, {"data": [[1.5953595E12, 527.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[1.5953595E12, 456.0]], "isOverall": false, "label": "14 - Formulario Relacion -90", "isController": false}, {"data": [[1.5953595E12, 477.0]], "isOverall": false, "label": "14 - Formulario Relacion -91", "isController": false}, {"data": [[1.5953595E12, 618.0]], "isOverall": false, "label": "14 - Formulario Relacion -92", "isController": false}, {"data": [[1.5953595E12, 496.0]], "isOverall": false, "label": "14 - Formulario Relacion -93", "isController": false}, {"data": [[1.5953595E12, 375.0]], "isOverall": false, "label": "14 - Formulario Relacion -94", "isController": false}, {"data": [[1.5953595E12, 624.0]], "isOverall": false, "label": "14 - Formulario Relacion -95", "isController": false}, {"data": [[1.59535956E12, 565.0]], "isOverall": false, "label": "20 - Cerrar  Persona-175", "isController": false}, {"data": [[1.5953595E12, 1155.0]], "isOverall": false, "label": "14 - Formulario Relacion -96", "isController": false}, {"data": [[1.59535956E12, 276.0]], "isOverall": false, "label": "20 - Cerrar  Persona-176", "isController": false}, {"data": [[1.5953595E12, 546.0]], "isOverall": false, "label": "14 - Formulario Relacion -97", "isController": false}, {"data": [[1.59535944E12, 130.0]], "isOverall": false, "label": "4 - Mod de Personas", "isController": true}, {"data": [[1.5953595E12, 507.0]], "isOverall": false, "label": "14 - Formulario Relacion -98", "isController": false}, {"data": [[1.5953595E12, 385.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40", "isController": false}, {"data": [[1.5953595E12, 783.0]], "isOverall": false, "label": "14 - Formulario Relacion -99", "isController": false}, {"data": [[1.5953595E12, 649.0]], "isOverall": false, "label": "10 - Formulario Domicilio-59", "isController": false}, {"data": [[1.59535944E12, 256.0]], "isOverall": false, "label": "1 - Index-1", "isController": false}, {"data": [[1.59535944E12, 938.0]], "isOverall": false, "label": "1 - Index", "isController": true}, {"data": [[1.5953595E12, 454.0]], "isOverall": false, "label": "10 - Formulario Domicilio-58", "isController": false}, {"data": [[1.59535956E12, 426.0]], "isOverall": false, "label": "20 - Cerrar  Persona-177", "isController": false}, {"data": [[1.59535956E12, 83174.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.5953595E12, 165.0]], "isOverall": false, "label": "10 - Formulario Domicilio-57", "isController": false}, {"data": [[1.59535956E12, 181.0]], "isOverall": false, "label": "20 - Cerrar  Persona-178", "isController": false}, {"data": [[1.5953595E12, 428.0]], "isOverall": false, "label": "10 - Formulario Domicilio-56", "isController": false}, {"data": [[1.5953595E12, 486.0]], "isOverall": false, "label": "10 - Formulario Domicilio-55", "isController": false}, {"data": [[1.5953595E12, 706.0]], "isOverall": false, "label": "10 - Formulario Domicilio-54", "isController": false}, {"data": [[1.5953595E12, 350.0]], "isOverall": false, "label": "10 - Formulario Domicilio-53", "isController": false}, {"data": [[1.5953595E12, 395.0]], "isOverall": false, "label": "10 - Formulario Domicilio-74", "isController": false}, {"data": [[1.5953595E12, 708.0]], "isOverall": false, "label": "10 - Formulario Domicilio-73", "isController": false}, {"data": [[1.5953595E12, 698.0]], "isOverall": false, "label": "10 - Formulario Domicilio-72", "isController": false}, {"data": [[1.59535956E12, 818.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[1.5953595E12, 173.0]], "isOverall": false, "label": "10 - Formulario Domicilio-71", "isController": false}, {"data": [[1.5953595E12, 459.0]], "isOverall": false, "label": "10 - Formulario Domicilio-70", "isController": false}, {"data": [[1.5953595E12, 2227.0], [1.59535956E12, 12392.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales", "isController": true}, {"data": [[1.59535956E12, 198.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183", "isController": false}, {"data": [[1.5953595E12, 5336.0]], "isOverall": false, "label": "10 - Formulario Domicilio", "isController": true}, {"data": [[1.59535956E12, 222.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185", "isController": false}, {"data": [[1.59535956E12, 378.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[1.59535956E12, 385.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[1.5953595E12, 1306.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar", "isController": true}, {"data": [[1.59535944E12, 128.0]], "isOverall": false, "label": "1 - Index-1-1", "isController": false}, {"data": [[1.5953595E12, 1101.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30", "isController": false}, {"data": [[1.5953595E12, 527.0]], "isOverall": false, "label": "11 - Contactos Crear-79", "isController": false}, {"data": [[1.5953595E12, 423.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31", "isController": false}, {"data": [[1.5953595E12, 568.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32", "isController": false}, {"data": [[1.5953595E12, 812.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33", "isController": false}, {"data": [[1.5953595E12, 396.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34", "isController": false}, {"data": [[1.5953595E12, 433.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35", "isController": false}, {"data": [[1.5953595E12, 390.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36", "isController": false}, {"data": [[1.59535956E12, 387.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182", "isController": false}, {"data": [[1.59535956E12, 1448.0]], "isOverall": false, "label": "20 - Cerrar  Persona", "isController": true}, {"data": [[1.5953595E12, 393.0]], "isOverall": false, "label": "10 - Formulario Domicilio-69", "isController": false}, {"data": [[1.5953595E12, 363.0]], "isOverall": false, "label": "10 - Formulario Domicilio-68", "isController": false}, {"data": [[1.5953595E12, 11774.5]], "isOverall": false, "label": "14 - Formulario Relacion ", "isController": true}, {"data": [[1.59535944E12, 121.0]], "isOverall": false, "label": "5 - Clientes-14", "isController": false}, {"data": [[1.5953595E12, 480.0]], "isOverall": false, "label": "10 - Formulario Domicilio-67", "isController": false}, {"data": [[1.59535944E12, 970.0]], "isOverall": false, "label": "5 - Clientes-13", "isController": false}, {"data": [[1.5953595E12, 475.0]], "isOverall": false, "label": "10 - Formulario Domicilio-66", "isController": false}, {"data": [[1.5953595E12, 571.0]], "isOverall": false, "label": "10 - Formulario Domicilio-65", "isController": false}, {"data": [[1.59535944E12, 125.0]], "isOverall": false, "label": "1 - Index-1-0", "isController": false}, {"data": [[1.5953595E12, 337.0]], "isOverall": false, "label": "10 - Formulario Domicilio-64", "isController": false}, {"data": [[1.5953595E12, 432.0]], "isOverall": false, "label": "12 - Formulario Contactos-82", "isController": false}, {"data": [[1.59535944E12, 130.0]], "isOverall": false, "label": "4 - Mod de Personas-12", "isController": false}, {"data": [[1.59535944E12, 849.0]], "isOverall": false, "label": "6 - Nuevo Cliente-16", "isController": false}, {"data": [[1.59535956E12, 486.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159", "isController": false}, {"data": [[1.59535944E12, 130.0]], "isOverall": false, "label": "6 - Nuevo Cliente-17", "isController": false}, {"data": [[1.59535956E12, 461.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[1.5953595E12, 1237.5]], "isOverall": false, "label": "12 - Formulario Contactos", "isController": true}, {"data": [[1.59535956E12, 475.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157", "isController": false}, {"data": [[1.59535944E12, 588.0]], "isOverall": false, "label": "6 - Nuevo Cliente-15", "isController": false}, {"data": [[1.59535956E12, 708.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156", "isController": false}, {"data": [[1.59535956E12, 1011.0]], "isOverall": false, "label": "19 - Grabar Persona-173", "isController": false}, {"data": [[1.59535956E12, 227.0]], "isOverall": false, "label": "19 - Grabar Persona-174", "isController": false}, {"data": [[1.5953595E12, 17438.0]], "isOverall": false, "label": "9 - Domicilio Crear", "isController": true}, {"data": [[1.5953595E12, 607.0]], "isOverall": false, "label": "17 - Campos Adicionales-140", "isController": false}, {"data": [[1.5953595E12, 527.0]], "isOverall": false, "label": "17 - Campos Adicionales-141", "isController": false}, {"data": [[1.5953595E12, 532.0]], "isOverall": false, "label": "13 - Relacion Crear-86", "isController": false}, {"data": [[1.5953595E12, 172.0]], "isOverall": false, "label": "13 - Relacion Crear-87", "isController": false}, {"data": [[1.59535956E12, 807.0]], "isOverall": false, "label": "21 - Cerrar  Insis", "isController": true}, {"data": [[1.5953595E12, 1153.0]], "isOverall": false, "label": "11 - Contactos Crear", "isController": true}, {"data": [[1.5953595E12, 481.0]], "isOverall": false, "label": "17 - Campos Adicionales-139", "isController": false}, {"data": [[1.59535956E12, 517.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155", "isController": false}, {"data": [[1.59535956E12, 461.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154", "isController": false}, {"data": [[1.5953595E12, 477.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153", "isController": false}, {"data": [[1.5953595E12, 791.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152", "isController": false}, {"data": [[1.5953595E12, 980.0]], "isOverall": false, "label": "13 - Relacion Crear-88", "isController": false}, {"data": [[1.5953595E12, 514.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[1.5953595E12, 410.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150", "isController": false}, {"data": [[1.5953595E12, 739.0]], "isOverall": false, "label": "10 - Formulario Domicilio-52", "isController": false}, {"data": [[1.5953595E12, 247.0]], "isOverall": false, "label": "10 - Formulario Domicilio-51", "isController": false}, {"data": [[1.5953595E12, 704.0]], "isOverall": false, "label": "10 - Formulario Domicilio-50", "isController": false}, {"data": [[1.5953595E12, 466.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149", "isController": false}, {"data": [[1.59535944E12, 104.0]], "isOverall": false, "label": "2 - Login-9-0", "isController": false}, {"data": [[1.59535944E12, 1091.0]], "isOverall": false, "label": "5 - Clientes", "isController": true}, {"data": [[1.5953595E12, 2825.0]], "isOverall": false, "label": "17 - Campos Adicionales", "isController": true}, {"data": [[1.5953595E12, 794.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[1.5953595E12, 541.0]], "isOverall": false, "label": "17 - Campos Adicionales-136", "isController": false}, {"data": [[1.5953595E12, 464.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[1.5953595E12, 1039.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41", "isController": false}, {"data": [[1.5953595E12, 219.0]], "isOverall": false, "label": "17 - Campos Adicionales-137", "isController": false}, {"data": [[1.5953595E12, 503.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[1.5953595E12, 171.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42", "isController": false}, {"data": [[1.5953595E12, 450.0]], "isOverall": false, "label": "17 - Campos Adicionales-138", "isController": false}, {"data": [[1.5953595E12, 401.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[1.59535944E12, 682.0]], "isOverall": false, "label": "Inicio - -10", "isController": false}, {"data": [[1.59535944E12, 2907.0]], "isOverall": false, "label": "2 - Login-9-1", "isController": false}, {"data": [[1.59535956E12, 106.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1", "isController": false}, {"data": [[1.59535956E12, 92.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0", "isController": false}, {"data": [[1.59535944E12, 3012.0]], "isOverall": false, "label": "2 - Login-9", "isController": false}, {"data": [[1.59535944E12, 313.0]], "isOverall": false, "label": "2 - Login-7", "isController": false}, {"data": [[1.59535956E12, 457.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[1.59535956E12, 2.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59535956E12, 218.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[1.59535956E12, 436.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[1.59535944E12, 541.0]], "isOverall": false, "label": "3 - Operaciones del Sistema-11", "isController": false}, {"data": [[1.5953595E12, 403.0]], "isOverall": false, "label": "10 - Formulario Domicilio-49", "isController": false}, {"data": [[1.5953595E12, 794.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[1.5953595E12, 458.0]], "isOverall": false, "label": "10 - Formulario Domicilio-48", "isController": false}, {"data": [[1.5953595E12, 472.0]], "isOverall": false, "label": "14 - Formulario Relacion -89", "isController": false}, {"data": [[1.5953595E12, 450.0]], "isOverall": false, "label": "14 - Formulario Relacion -100", "isController": false}, {"data": [[1.5953595E12, 452.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[1.59535944E12, 315.0]], "isOverall": false, "label": "6 - Nuevo Cliente-18", "isController": false}, {"data": [[1.5953595E12, 153.0]], "isOverall": false, "label": "10 - Formulario Domicilio-47", "isController": false}, {"data": [[1.5953595E12, 497.0]], "isOverall": false, "label": "14 - Formulario Relacion -101", "isController": false}, {"data": [[1.5953595E12, 491.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[1.5953595E12, 360.0]], "isOverall": false, "label": "10 - Formulario Domicilio-46", "isController": false}, {"data": [[1.5953595E12, 481.0]], "isOverall": false, "label": "14 - Formulario Relacion -102", "isController": false}, {"data": [[1.5953595E12, 812.0]], "isOverall": false, "label": "10 - Formulario Domicilio-45", "isController": false}, {"data": [[1.5953595E12, 870.0]], "isOverall": false, "label": "14 - Formulario Relacion -103", "isController": false}, {"data": [[1.5953595E12, 720.0]], "isOverall": false, "label": "10 - Formulario Domicilio-44", "isController": false}, {"data": [[1.5953595E12, 671.0]], "isOverall": false, "label": "12 - Formulario Contactos-83", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59535956E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.59535944E12, "maxY": 74546.0, "series": [{"data": [[1.5953595E12, 9432.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar", "isController": true}, {"data": [[1.59535956E12, 955.0]], "isOverall": false, "label": "19 - Grabar Persona", "isController": true}, {"data": [[1.59535956E12, 400.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[1.59535956E12, 102.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2", "isController": false}, {"data": [[1.59535956E12, 111.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1", "isController": false}, {"data": [[1.59535956E12, 169.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0", "isController": false}, {"data": [[1.59535956E12, 456.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[1.59535956E12, 763.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[1.59535956E12, 485.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[1.59535956E12, 464.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[1.5953595E12, 1477.0]], "isOverall": false, "label": "13 - Relacion Crear", "isController": true}, {"data": [[1.59535956E12, 392.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[1.59535956E12, 786.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160", "isController": false}, {"data": [[1.59535956E12, 1557.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[1.59535944E12, 310.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[1.59535944E12, 257.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20", "isController": false}, {"data": [[1.59535944E12, 775.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21", "isController": false}, {"data": [[1.59535944E12, 483.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22", "isController": false}, {"data": [[1.59535944E12, 408.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23", "isController": false}, {"data": [[1.59535944E12, 1545.0]], "isOverall": false, "label": "6 - Nuevo Cliente", "isController": true}, {"data": [[1.59535944E12, 466.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24", "isController": false}, {"data": [[1.5953595E12, 650.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25", "isController": false}, {"data": [[1.5953595E12, 437.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26", "isController": false}, {"data": [[1.5953595E12, 293.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27", "isController": false}, {"data": [[1.5953595E12, 441.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28", "isController": false}, {"data": [[1.5953595E12, 843.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar", "isController": true}, {"data": [[1.5953595E12, 398.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29", "isController": false}, {"data": [[1.5953595E12, 340.0]], "isOverall": false, "label": "9 - Domicilio Crear-43", "isController": false}, {"data": [[1.5953595E12, 420.0]], "isOverall": false, "label": "10 - Formulario Domicilio-76", "isController": false}, {"data": [[1.5953595E12, 435.0]], "isOverall": false, "label": "10 - Formulario Domicilio-75", "isController": false}, {"data": [[1.5953595E12, 886.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[1.59535944E12, 102.0]], "isOverall": false, "label": "2 - Login-7-1", "isController": false}, {"data": [[1.59535944E12, 206.0]], "isOverall": false, "label": "2 - Login-7-0", "isController": false}, {"data": [[1.59535956E12, 112.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1", "isController": false}, {"data": [[1.5953595E12, 576.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar", "isController": true}, {"data": [[1.59535956E12, 107.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0", "isController": false}, {"data": [[1.5953595E12, 170.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38", "isController": false}, {"data": [[1.5953595E12, 797.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37", "isController": false}, {"data": [[1.59535944E12, 533.0], [1.5953595E12, 2037.875]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[1.59535956E12, 1493.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[1.5953595E12, 467.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78", "isController": false}, {"data": [[1.59535944E12, 446.0]], "isOverall": false, "label": "3 - Operaciones del Sistema", "isController": true}, {"data": [[1.5953595E12, 971.5]], "isOverall": false, "label": "8 - Formulario Datos de Cliente", "isController": true}, {"data": [[1.5953595E12, 376.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77", "isController": false}, {"data": [[1.59535944E12, 323.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19", "isController": false}, {"data": [[1.5953595E12, 822.0]], "isOverall": false, "label": "10 - Formulario Domicilio-63", "isController": false}, {"data": [[1.5953595E12, 724.0]], "isOverall": false, "label": "10 - Formulario Domicilio-62", "isController": false}, {"data": [[1.5953595E12, 148.0]], "isOverall": false, "label": "10 - Formulario Domicilio-61", "isController": false}, {"data": [[1.5953595E12, 439.0]], "isOverall": false, "label": "10 - Formulario Domicilio-60", "isController": false}, {"data": [[1.5953595E12, 459.0]], "isOverall": false, "label": "11 - Contactos Crear-81", "isController": false}, {"data": [[1.5953595E12, 139.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[1.5953595E12, 8735.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[1.5953595E12, 143.0]], "isOverall": false, "label": "11 - Contactos Crear-80", "isController": false}, {"data": [[1.5953595E12, 697.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[1.5953595E12, 293.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39", "isController": false}, {"data": [[1.5953595E12, 437.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[1.5953595E12, 454.0]], "isOverall": false, "label": "14 - Formulario Relacion -90", "isController": false}, {"data": [[1.5953595E12, 346.0]], "isOverall": false, "label": "14 - Formulario Relacion -91", "isController": false}, {"data": [[1.5953595E12, 617.0]], "isOverall": false, "label": "14 - Formulario Relacion -92", "isController": false}, {"data": [[1.5953595E12, 493.0]], "isOverall": false, "label": "14 - Formulario Relacion -93", "isController": false}, {"data": [[1.5953595E12, 373.0]], "isOverall": false, "label": "14 - Formulario Relacion -94", "isController": false}, {"data": [[1.5953595E12, 488.0]], "isOverall": false, "label": "14 - Formulario Relacion -95", "isController": false}, {"data": [[1.59535956E12, 449.0]], "isOverall": false, "label": "20 - Cerrar  Persona-175", "isController": false}, {"data": [[1.5953595E12, 1016.0]], "isOverall": false, "label": "14 - Formulario Relacion -96", "isController": false}, {"data": [[1.59535956E12, 238.0]], "isOverall": false, "label": "20 - Cerrar  Persona-176", "isController": false}, {"data": [[1.5953595E12, 490.0]], "isOverall": false, "label": "14 - Formulario Relacion -97", "isController": false}, {"data": [[1.59535944E12, 123.0]], "isOverall": false, "label": "4 - Mod de Personas", "isController": true}, {"data": [[1.5953595E12, 359.0]], "isOverall": false, "label": "14 - Formulario Relacion -98", "isController": false}, {"data": [[1.5953595E12, 382.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40", "isController": false}, {"data": [[1.5953595E12, 693.0]], "isOverall": false, "label": "14 - Formulario Relacion -99", "isController": false}, {"data": [[1.5953595E12, 646.0]], "isOverall": false, "label": "10 - Formulario Domicilio-59", "isController": false}, {"data": [[1.59535944E12, 124.0]], "isOverall": false, "label": "1 - Index-1", "isController": false}, {"data": [[1.59535944E12, 805.0]], "isOverall": false, "label": "1 - Index", "isController": true}, {"data": [[1.5953595E12, 452.0]], "isOverall": false, "label": "10 - Formulario Domicilio-58", "isController": false}, {"data": [[1.59535956E12, 418.0]], "isOverall": false, "label": "20 - Cerrar  Persona-177", "isController": false}, {"data": [[1.59535956E12, 74546.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.5953595E12, 160.0]], "isOverall": false, "label": "10 - Formulario Domicilio-57", "isController": false}, {"data": [[1.59535956E12, 179.0]], "isOverall": false, "label": "20 - Cerrar  Persona-178", "isController": false}, {"data": [[1.5953595E12, 376.0]], "isOverall": false, "label": "10 - Formulario Domicilio-56", "isController": false}, {"data": [[1.5953595E12, 307.0]], "isOverall": false, "label": "10 - Formulario Domicilio-55", "isController": false}, {"data": [[1.5953595E12, 703.0]], "isOverall": false, "label": "10 - Formulario Domicilio-54", "isController": false}, {"data": [[1.5953595E12, 347.0]], "isOverall": false, "label": "10 - Formulario Domicilio-53", "isController": false}, {"data": [[1.5953595E12, 393.0]], "isOverall": false, "label": "10 - Formulario Domicilio-74", "isController": false}, {"data": [[1.5953595E12, 704.0]], "isOverall": false, "label": "10 - Formulario Domicilio-73", "isController": false}, {"data": [[1.5953595E12, 695.0]], "isOverall": false, "label": "10 - Formulario Domicilio-72", "isController": false}, {"data": [[1.59535956E12, 816.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[1.5953595E12, 147.0]], "isOverall": false, "label": "10 - Formulario Domicilio-71", "isController": false}, {"data": [[1.5953595E12, 456.0]], "isOverall": false, "label": "10 - Formulario Domicilio-70", "isController": false}, {"data": [[1.5953595E12, 2215.0], [1.59535956E12, 12303.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales", "isController": true}, {"data": [[1.59535956E12, 92.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183", "isController": false}, {"data": [[1.5953595E12, 4959.333333333334]], "isOverall": false, "label": "10 - Formulario Domicilio", "isController": true}, {"data": [[1.59535956E12, 107.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185", "isController": false}, {"data": [[1.59535956E12, 375.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[1.59535956E12, 366.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[1.5953595E12, 967.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar", "isController": true}, {"data": [[1.59535944E12, 124.0]], "isOverall": false, "label": "1 - Index-1-1", "isController": false}, {"data": [[1.5953595E12, 1096.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30", "isController": false}, {"data": [[1.5953595E12, 436.0]], "isOverall": false, "label": "11 - Contactos Crear-79", "isController": false}, {"data": [[1.5953595E12, 422.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31", "isController": false}, {"data": [[1.5953595E12, 564.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32", "isController": false}, {"data": [[1.5953595E12, 808.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33", "isController": false}, {"data": [[1.5953595E12, 394.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34", "isController": false}, {"data": [[1.5953595E12, 419.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35", "isController": false}, {"data": [[1.5953595E12, 390.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36", "isController": false}, {"data": [[1.59535956E12, 169.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182", "isController": false}, {"data": [[1.59535956E12, 1284.0]], "isOverall": false, "label": "20 - Cerrar  Persona", "isController": true}, {"data": [[1.5953595E12, 390.0]], "isOverall": false, "label": "10 - Formulario Domicilio-69", "isController": false}, {"data": [[1.5953595E12, 360.0]], "isOverall": false, "label": "10 - Formulario Domicilio-68", "isController": false}, {"data": [[1.5953595E12, 11186.5]], "isOverall": false, "label": "14 - Formulario Relacion ", "isController": true}, {"data": [[1.59535944E12, 112.0]], "isOverall": false, "label": "5 - Clientes-14", "isController": false}, {"data": [[1.5953595E12, 476.0]], "isOverall": false, "label": "10 - Formulario Domicilio-67", "isController": false}, {"data": [[1.59535944E12, 678.0]], "isOverall": false, "label": "5 - Clientes-13", "isController": false}, {"data": [[1.5953595E12, 325.0]], "isOverall": false, "label": "10 - Formulario Domicilio-66", "isController": false}, {"data": [[1.5953595E12, 391.0]], "isOverall": false, "label": "10 - Formulario Domicilio-65", "isController": false}, {"data": [[1.59535944E12, 124.0]], "isOverall": false, "label": "1 - Index-1-0", "isController": false}, {"data": [[1.5953595E12, 334.0]], "isOverall": false, "label": "10 - Formulario Domicilio-64", "isController": false}, {"data": [[1.5953595E12, 432.0]], "isOverall": false, "label": "12 - Formulario Contactos-82", "isController": false}, {"data": [[1.59535944E12, 123.0]], "isOverall": false, "label": "4 - Mod de Personas-12", "isController": false}, {"data": [[1.59535944E12, 519.0]], "isOverall": false, "label": "6 - Nuevo Cliente-16", "isController": false}, {"data": [[1.59535956E12, 483.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159", "isController": false}, {"data": [[1.59535944E12, 127.0]], "isOverall": false, "label": "6 - Nuevo Cliente-17", "isController": false}, {"data": [[1.59535956E12, 457.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[1.5953595E12, 1172.0]], "isOverall": false, "label": "12 - Formulario Contactos", "isController": true}, {"data": [[1.59535956E12, 472.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157", "isController": false}, {"data": [[1.59535944E12, 587.0]], "isOverall": false, "label": "6 - Nuevo Cliente-15", "isController": false}, {"data": [[1.59535956E12, 705.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156", "isController": false}, {"data": [[1.59535956E12, 739.0]], "isOverall": false, "label": "19 - Grabar Persona-173", "isController": false}, {"data": [[1.59535956E12, 216.0]], "isOverall": false, "label": "19 - Grabar Persona-174", "isController": false}, {"data": [[1.5953595E12, 16061.0]], "isOverall": false, "label": "9 - Domicilio Crear", "isController": true}, {"data": [[1.5953595E12, 601.0]], "isOverall": false, "label": "17 - Campos Adicionales-140", "isController": false}, {"data": [[1.5953595E12, 523.0]], "isOverall": false, "label": "17 - Campos Adicionales-141", "isController": false}, {"data": [[1.5953595E12, 437.0]], "isOverall": false, "label": "13 - Relacion Crear-86", "isController": false}, {"data": [[1.5953595E12, 149.0]], "isOverall": false, "label": "13 - Relacion Crear-87", "isController": false}, {"data": [[1.59535956E12, 368.0]], "isOverall": false, "label": "21 - Cerrar  Insis", "isController": true}, {"data": [[1.5953595E12, 1038.0]], "isOverall": false, "label": "11 - Contactos Crear", "isController": true}, {"data": [[1.5953595E12, 475.0]], "isOverall": false, "label": "17 - Campos Adicionales-139", "isController": false}, {"data": [[1.59535956E12, 508.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155", "isController": false}, {"data": [[1.59535956E12, 457.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154", "isController": false}, {"data": [[1.5953595E12, 475.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153", "isController": false}, {"data": [[1.5953595E12, 787.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152", "isController": false}, {"data": [[1.5953595E12, 891.0]], "isOverall": false, "label": "13 - Relacion Crear-88", "isController": false}, {"data": [[1.5953595E12, 511.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[1.5953595E12, 406.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150", "isController": false}, {"data": [[1.5953595E12, 733.0]], "isOverall": false, "label": "10 - Formulario Domicilio-52", "isController": false}, {"data": [[1.5953595E12, 148.0]], "isOverall": false, "label": "10 - Formulario Domicilio-51", "isController": false}, {"data": [[1.5953595E12, 703.0]], "isOverall": false, "label": "10 - Formulario Domicilio-50", "isController": false}, {"data": [[1.5953595E12, 463.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149", "isController": false}, {"data": [[1.59535944E12, 104.0]], "isOverall": false, "label": "2 - Login-9-0", "isController": false}, {"data": [[1.59535944E12, 790.0]], "isOverall": false, "label": "5 - Clientes", "isController": true}, {"data": [[1.5953595E12, 2593.0]], "isOverall": false, "label": "17 - Campos Adicionales", "isController": true}, {"data": [[1.5953595E12, 791.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[1.5953595E12, 331.0]], "isOverall": false, "label": "17 - Campos Adicionales-136", "isController": false}, {"data": [[1.5953595E12, 461.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[1.5953595E12, 725.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41", "isController": false}, {"data": [[1.5953595E12, 215.0]], "isOverall": false, "label": "17 - Campos Adicionales-137", "isController": false}, {"data": [[1.5953595E12, 500.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[1.5953595E12, 161.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42", "isController": false}, {"data": [[1.5953595E12, 448.0]], "isOverall": false, "label": "17 - Campos Adicionales-138", "isController": false}, {"data": [[1.5953595E12, 400.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[1.59535944E12, 681.0]], "isOverall": false, "label": "Inicio - -10", "isController": false}, {"data": [[1.59535944E12, 2718.0]], "isOverall": false, "label": "2 - Login-9-1", "isController": false}, {"data": [[1.59535956E12, 105.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1", "isController": false}, {"data": [[1.59535956E12, 92.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0", "isController": false}, {"data": [[1.59535944E12, 104.0]], "isOverall": false, "label": "2 - Login-9", "isController": false}, {"data": [[1.59535944E12, 206.0]], "isOverall": false, "label": "2 - Login-7", "isController": false}, {"data": [[1.59535956E12, 454.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59535956E12, 206.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[1.59535956E12, 433.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[1.59535944E12, 446.0]], "isOverall": false, "label": "3 - Operaciones del Sistema-11", "isController": false}, {"data": [[1.5953595E12, 396.0]], "isOverall": false, "label": "10 - Formulario Domicilio-49", "isController": false}, {"data": [[1.5953595E12, 790.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[1.5953595E12, 453.0]], "isOverall": false, "label": "10 - Formulario Domicilio-48", "isController": false}, {"data": [[1.5953595E12, 470.0]], "isOverall": false, "label": "14 - Formulario Relacion -89", "isController": false}, {"data": [[1.5953595E12, 447.0]], "isOverall": false, "label": "14 - Formulario Relacion -100", "isController": false}, {"data": [[1.5953595E12, 449.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[1.59535944E12, 312.0]], "isOverall": false, "label": "6 - Nuevo Cliente-18", "isController": false}, {"data": [[1.5953595E12, 149.0]], "isOverall": false, "label": "10 - Formulario Domicilio-47", "isController": false}, {"data": [[1.5953595E12, 496.0]], "isOverall": false, "label": "14 - Formulario Relacion -101", "isController": false}, {"data": [[1.5953595E12, 489.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[1.5953595E12, 311.0]], "isOverall": false, "label": "10 - Formulario Domicilio-46", "isController": false}, {"data": [[1.5953595E12, 479.0]], "isOverall": false, "label": "14 - Formulario Relacion -102", "isController": false}, {"data": [[1.5953595E12, 617.0]], "isOverall": false, "label": "10 - Formulario Domicilio-45", "isController": false}, {"data": [[1.5953595E12, 870.0]], "isOverall": false, "label": "14 - Formulario Relacion -103", "isController": false}, {"data": [[1.5953595E12, 718.0]], "isOverall": false, "label": "10 - Formulario Domicilio-44", "isController": false}, {"data": [[1.5953595E12, 668.0]], "isOverall": false, "label": "12 - Formulario Contactos-83", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59535956E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.59535944E12, "maxY": 11520.0, "series": [{"data": [[1.5953595E12, 398.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar", "isController": true}, {"data": [[1.59535956E12, 321.0]], "isOverall": false, "label": "19 - Grabar Persona", "isController": true}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[1.59535956E12, 310.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[1.5953595E12, 322.0]], "isOverall": false, "label": "13 - Relacion Crear", "isController": true}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[1.59535956E12, 319.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160", "isController": false}, {"data": [[1.59535956E12, 320.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[1.59535944E12, 0.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[1.59535944E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20", "isController": false}, {"data": [[1.59535944E12, 316.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21", "isController": false}, {"data": [[1.59535944E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22", "isController": false}, {"data": [[1.59535944E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23", "isController": false}, {"data": [[1.59535944E12, 319.0]], "isOverall": false, "label": "6 - Nuevo Cliente", "isController": true}, {"data": [[1.59535944E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24", "isController": false}, {"data": [[1.5953595E12, 322.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28", "isController": false}, {"data": [[1.5953595E12, 329.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar", "isController": true}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "9 - Domicilio Crear-43", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-76", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-75", "isController": false}, {"data": [[1.5953595E12, 326.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[1.59535944E12, 0.0]], "isOverall": false, "label": "2 - Login-7-1", "isController": false}, {"data": [[1.59535944E12, 0.0]], "isOverall": false, "label": "2 - Login-7-0", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar", "isController": true}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38", "isController": false}, {"data": [[1.5953595E12, 334.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37", "isController": false}, {"data": [[1.59535944E12, 79.0], [1.5953595E12, 329.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[1.5953595E12, 329.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78", "isController": false}, {"data": [[1.59535944E12, 317.0]], "isOverall": false, "label": "3 - Operaciones del Sistema", "isController": true}, {"data": [[1.5953595E12, 163.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente", "isController": true}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77", "isController": false}, {"data": [[1.59535944E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19", "isController": false}, {"data": [[1.5953595E12, 416.0]], "isOverall": false, "label": "10 - Formulario Domicilio-63", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-62", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-61", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-60", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "11 - Contactos Crear-81", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "11 - Contactos Crear-80", "isController": false}, {"data": [[1.5953595E12, 398.0]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "14 - Formulario Relacion -90", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "14 - Formulario Relacion -91", "isController": false}, {"data": [[1.5953595E12, 410.0]], "isOverall": false, "label": "14 - Formulario Relacion -92", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "14 - Formulario Relacion -93", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "14 - Formulario Relacion -94", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "14 - Formulario Relacion -95", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "20 - Cerrar  Persona-175", "isController": false}, {"data": [[1.5953595E12, 408.0]], "isOverall": false, "label": "14 - Formulario Relacion -96", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "20 - Cerrar  Persona-176", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "14 - Formulario Relacion -97", "isController": false}, {"data": [[1.59535944E12, 0.0]], "isOverall": false, "label": "4 - Mod de Personas", "isController": true}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "14 - Formulario Relacion -98", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40", "isController": false}, {"data": [[1.5953595E12, 337.0]], "isOverall": false, "label": "14 - Formulario Relacion -99", "isController": false}, {"data": [[1.5953595E12, 330.0]], "isOverall": false, "label": "10 - Formulario Domicilio-59", "isController": false}, {"data": [[1.59535944E12, 0.0]], "isOverall": false, "label": "1 - Index-1", "isController": false}, {"data": [[1.59535944E12, 575.0]], "isOverall": false, "label": "1 - Index", "isController": true}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-58", "isController": false}, {"data": [[1.59535956E12, 306.0]], "isOverall": false, "label": "20 - Cerrar  Persona-177", "isController": false}, {"data": [[1.59535956E12, 11520.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-57", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "20 - Cerrar  Persona-178", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-56", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-55", "isController": false}, {"data": [[1.5953595E12, 314.0]], "isOverall": false, "label": "10 - Formulario Domicilio-54", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-53", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-74", "isController": false}, {"data": [[1.5953595E12, 332.0]], "isOverall": false, "label": "10 - Formulario Domicilio-73", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-72", "isController": false}, {"data": [[1.59535956E12, 320.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-71", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-70", "isController": false}, {"data": [[1.5953595E12, 314.0], [1.59535956E12, 1735.5]], "isOverall": false, "label": "18 - Formulario Campos Adicionales", "isController": true}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183", "isController": false}, {"data": [[1.5953595E12, 783.6666666666667]], "isOverall": false, "label": "10 - Formulario Domicilio", "isController": true}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-185", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[1.5953595E12, 334.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar", "isController": true}, {"data": [[1.59535944E12, 0.0]], "isOverall": false, "label": "1 - Index-1-1", "isController": false}, {"data": [[1.5953595E12, 323.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "11 - Contactos Crear-79", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32", "isController": false}, {"data": [[1.5953595E12, 346.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-182", "isController": false}, {"data": [[1.59535956E12, 306.0]], "isOverall": false, "label": "20 - Cerrar  Persona", "isController": true}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-69", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-68", "isController": false}, {"data": [[1.5953595E12, 1459.0]], "isOverall": false, "label": "14 - Formulario Relacion ", "isController": true}, {"data": [[1.59535944E12, 0.0]], "isOverall": false, "label": "5 - Clientes-14", "isController": false}, {"data": [[1.5953595E12, 328.0]], "isOverall": false, "label": "10 - Formulario Domicilio-67", "isController": false}, {"data": [[1.59535944E12, 0.0]], "isOverall": false, "label": "5 - Clientes-13", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-66", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-65", "isController": false}, {"data": [[1.59535944E12, 0.0]], "isOverall": false, "label": "1 - Index-1-0", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-64", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "12 - Formulario Contactos-82", "isController": false}, {"data": [[1.59535944E12, 0.0]], "isOverall": false, "label": "4 - Mod de Personas-12", "isController": false}, {"data": [[1.59535944E12, 319.0]], "isOverall": false, "label": "6 - Nuevo Cliente-16", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159", "isController": false}, {"data": [[1.59535944E12, 0.0]], "isOverall": false, "label": "6 - Nuevo Cliente-17", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[1.5953595E12, 299.0]], "isOverall": false, "label": "12 - Formulario Contactos", "isController": true}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157", "isController": false}, {"data": [[1.59535944E12, 0.0]], "isOverall": false, "label": "6 - Nuevo Cliente-15", "isController": false}, {"data": [[1.59535956E12, 313.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156", "isController": false}, {"data": [[1.59535956E12, 321.0]], "isOverall": false, "label": "19 - Grabar Persona-173", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "19 - Grabar Persona-174", "isController": false}, {"data": [[1.5953595E12, 2680.0]], "isOverall": false, "label": "9 - Domicilio Crear", "isController": true}, {"data": [[1.5953595E12, 341.0]], "isOverall": false, "label": "17 - Campos Adicionales-140", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "17 - Campos Adicionales-141", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "13 - Relacion Crear-86", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "13 - Relacion Crear-87", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis", "isController": true}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "11 - Contactos Crear", "isController": true}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "17 - Campos Adicionales-139", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153", "isController": false}, {"data": [[1.5953595E12, 319.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152", "isController": false}, {"data": [[1.5953595E12, 322.0]], "isOverall": false, "label": "13 - Relacion Crear-88", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-52", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-51", "isController": false}, {"data": [[1.5953595E12, 317.0]], "isOverall": false, "label": "10 - Formulario Domicilio-50", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149", "isController": false}, {"data": [[1.59535944E12, 0.0]], "isOverall": false, "label": "2 - Login-9-0", "isController": false}, {"data": [[1.59535944E12, 0.0]], "isOverall": false, "label": "5 - Clientes", "isController": true}, {"data": [[1.5953595E12, 341.0]], "isOverall": false, "label": "17 - Campos Adicionales", "isController": true}, {"data": [[1.5953595E12, 314.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "17 - Campos Adicionales-136", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[1.5953595E12, 326.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "17 - Campos Adicionales-137", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "17 - Campos Adicionales-138", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[1.59535944E12, 575.0]], "isOverall": false, "label": "Inicio - -10", "isController": false}, {"data": [[1.59535944E12, 0.0]], "isOverall": false, "label": "2 - Login-9-1", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0", "isController": false}, {"data": [[1.59535944E12, 0.0]], "isOverall": false, "label": "2 - Login-9", "isController": false}, {"data": [[1.59535944E12, 0.0]], "isOverall": false, "label": "2 - Login-7", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[1.59535956E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[1.59535944E12, 317.0]], "isOverall": false, "label": "3 - Operaciones del Sistema-11", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-49", "isController": false}, {"data": [[1.5953595E12, 315.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-48", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "14 - Formulario Relacion -89", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "14 - Formulario Relacion -100", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[1.59535944E12, 0.0]], "isOverall": false, "label": "6 - Nuevo Cliente-18", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-47", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "14 - Formulario Relacion -101", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-46", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "14 - Formulario Relacion -102", "isController": false}, {"data": [[1.5953595E12, 314.0]], "isOverall": false, "label": "10 - Formulario Domicilio-45", "isController": false}, {"data": [[1.5953595E12, 310.0]], "isOverall": false, "label": "14 - Formulario Relacion -103", "isController": false}, {"data": [[1.5953595E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio-44", "isController": false}, {"data": [[1.5953595E12, 299.0]], "isOverall": false, "label": "12 - Formulario Contactos-83", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59535956E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 2.0, "minX": 1.59535944E12, "maxY": 8738.0, "series": [{"data": [[1.59535944E12, 3012.0], [1.5953595E12, 8738.0], [1.59535956E12, 1011.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.59535944E12, 104.0], [1.5953595E12, 153.0], [1.59535956E12, 2.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.59535944E12, 1938.5], [1.5953595E12, 812.0], [1.59535956E12, 772.9000000000001]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.59535944E12, 3012.0], [1.5953595E12, 8738.0], [1.59535956E12, 1011.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.59535944E12, 2985.75], [1.5953595E12, 1039.0], [1.59535956E12, 846.9499999999997]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59535956E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 113.0, "minX": 1.0, "maxY": 1724.0, "series": [{"data": [[4.0, 1724.0], [2.0, 466.0], [1.0, 706.0], [5.0, 207.0], [3.0, 426.0], [12.0, 113.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 12.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 107.0, "minX": 1.0, "maxY": 703.0, "series": [{"data": [[4.0, 284.5], [2.0, 457.0], [1.0, 703.0], [5.0, 124.0], [3.0, 375.0], [12.0, 107.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 12.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.4166666666666667, "minX": 1.59535944E12, "maxY": 1.65, "series": [{"data": [[1.59535944E12, 0.4166666666666667], [1.5953595E12, 1.65], [1.59535956E12, 0.5833333333333334]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59535956E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.05, "minX": 1.59535944E12, "maxY": 1.65, "series": [{"data": [[1.59535944E12, 0.35], [1.5953595E12, 1.65], [1.59535956E12, 0.5333333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.59535944E12, 0.05], [1.59535956E12, 0.06666666666666667]], "isOverall": false, "label": "302", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59535956E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.59535944E12, "maxY": 0.13333333333333333, "series": [{"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-165-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "17 - Campos Adicionales-140-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-58-success", "isController": false}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-22-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-73-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "14 - Formulario Relacion -90-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-152-success", "isController": false}, {"data": [[1.5953595E12, 0.05]], "isOverall": false, "label": "10 - Formulario Domicilio-success", "isController": true}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-35-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "17 - Campos Adicionales-138-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-40-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "14 - Formulario Relacion -94-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-171-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-42-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-156-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-67-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-105-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-54-success", "isController": false}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "6 - Nuevo Cliente-15-success", "isController": false}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "2 - Login-7-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "11 - Contactos Crear-80-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-169-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-31-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-64-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "14 - Formulario Relacion -98-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-49-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-159-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "12 - Formulario Contactos-83-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "20 - Cerrar  Persona-success", "isController": true}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-success", "isController": true}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-50-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "11 - Contactos Crear-79-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-143-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "21 - Cerrar  Insis-185-1-success", "isController": false}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "1 - Index-success", "isController": true}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "13 - Relacion Crear-88-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-167-success", "isController": false}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "1 - Index-1-1-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-147-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "9 - Domicilio Crear-success", "isController": true}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-26-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-60-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-162-success", "isController": false}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "4 - Mod de Personas-12-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-45-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-78-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "14 - Formulario Relacion -100-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-76-success", "isController": false}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-23-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-57-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666], [1.59535956E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-success", "isController": true}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "Inicio - -10-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-success", "isController": true}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "6 - Nuevo Cliente-16-success", "isController": false}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "4 - Mod de Personas-success", "isController": true}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "5 - Clientes-13-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "19 - Grabar Persona-174-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "14 - Formulario Relacion -91-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-74-success", "isController": false}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "2 - Login-7-0-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-36-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-53-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-153-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-172-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "17 - Campos Adicionales-137-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-32-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-70-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-68-success", "isController": false}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "5 - Clientes-success", "isController": true}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "20 - Cerrar  Persona-176-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "Transaction Controller-success", "isController": true}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "21 - Cerrar  Insis-183-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-48-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-144-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-success", "isController": true}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "14 - Formulario Relacion -95-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "14 - Formulario Relacion -103-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-65-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-161-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "21 - Cerrar  Insis-182-2-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-27-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-166-success", "isController": false}, {"data": [[1.5953595E12, 0.03333333333333333]], "isOverall": false, "label": "12 - Formulario Contactos-success", "isController": true}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "11 - Contactos Crear-success", "isController": true}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-148-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-success", "isController": true}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "1 - Index-1-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "12 - Formulario Contactos-82-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-44-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-61-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "14 - Formulario Relacion -99-success", "isController": false}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "2 - Login-7-1-success", "isController": false}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "3 - Operaciones del Sistema-success", "isController": true}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "5 - Clientes-14-success", "isController": false}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "6 - Nuevo Cliente-17-success", "isController": false}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-24-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-71-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-150-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-success", "isController": true}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-56-success", "isController": false}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "6 - Nuevo Cliente-success", "isController": true}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-success", "isController": true}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-168-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-69-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-28-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-154-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-85-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "14 - Formulario Relacion -92-success", "isController": false}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-20-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-52-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "20 - Cerrar  Persona-178-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "21 - Cerrar  Insis-183-0-success", "isController": false}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "2 - Login-9-0-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-33-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-157-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "20 - Cerrar  Persona-175-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-66-success", "isController": false}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "2 - Login-success", "isController": true}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-47-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "14 - Formulario Relacion -102-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "8 - Formulario Datos de Cliente Grabar-41-success", "isController": false}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-19-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "14 - Formulario Relacion -96-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-37-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-145-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Grabar-success", "isController": true}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "2 - Login-9-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-62-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "13 - Relacion Crear-86-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "21 - Cerrar  Insis-182-1-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-164-success", "isController": false}, {"data": [[1.5953595E12, 0.03333333333333333]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-success", "isController": true}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-59-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-72-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "14 - Formulario Relacion -89-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-55-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-151-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-149-success", "isController": false}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-21-success", "isController": false}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "6 - Nuevo Cliente-18-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "8 - Formulario Datos de Cliente-39-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "12 - Formulario Contactos Guardar-84-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "14 - Formulario Relacion -93-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-160-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "21 - Cerrar  Insis-183-1-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-34-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-29-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "21 - Cerrar  Insis-185-0-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "17 - Campos Adicionales-139-success", "isController": false}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "2 - Login-9-1-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "21 - Cerrar  Insis-182-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "17 - Campos Adicionales-success", "isController": true}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales Cerrar-170-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "17 - Campos Adicionales-141-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-155-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "20 - Cerrar  Persona-177-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "21 - Cerrar  Insis-success", "isController": true}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-30-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-158-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "11 - Contactos Crear-81-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "21 - Cerrar  Insis-185-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-63-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "14 - Formulario Relacion -97-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "14 - Formulario Relacion -101-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-142-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "21 - Cerrar  Insis-182-0-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "14 - Formulario Relacion Guardar-104-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-51-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "17 - Campos Adicionales-136-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "Debug Sampler-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-46-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-146-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona Grabar-38-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "19 - Grabar Persona-success", "isController": true}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "3 - Operaciones del Sistema-11-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "9 - Domicilio Crear-43-success", "isController": false}, {"data": [[1.5953595E12, 0.03333333333333333]], "isOverall": false, "label": "14 - Formulario Relacion -success", "isController": true}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "19 - Grabar Persona-173-success", "isController": false}, {"data": [[1.59535944E12, 0.016666666666666666]], "isOverall": false, "label": "1 - Index-1-0-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio-75-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "13 - Relacion Crear-87-success", "isController": false}, {"data": [[1.59535956E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Formulario Campos Adicionales-163-success", "isController": false}, {"data": [[1.59535944E12, 0.06666666666666667], [1.5953595E12, 0.13333333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-success", "isController": true}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Guardar-77-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-25-success", "isController": false}, {"data": [[1.5953595E12, 0.016666666666666666]], "isOverall": false, "label": "13 - Relacion Crear-success", "isController": true}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59535956E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.5666666666666667, "minX": 1.59535944E12, "maxY": 2.1, "series": [{"data": [[1.59535944E12, 0.5666666666666667], [1.5953595E12, 2.1], [1.59535956E12, 0.7333333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59535956E12, "title": "Total Transactions Per Second"}},
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
