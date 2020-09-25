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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 10.0, "series": [{"data": [[2100.0, 1.0], [2800.0, 2.0], [2700.0, 3.0], [3000.0, 1.0], [3300.0, 1.0], [3400.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "57.2 - Cerra Campos Adicionales", "isController": false}, {"data": [[300.0, 1.0], [600.0, 4.0], [700.0, 2.0], [400.0, 1.0], [1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "T.4 - Seleccionar Modulo de Personas", "isController": true}, {"data": [[600.0, 2.0], [700.0, 3.0], [400.0, 2.0], [800.0, 1.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "18.1 - Ingresar Capacidad Maxima del Cliente-101", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 1.0], [2400.0, 1.0], [2900.0, 1.0], [3000.0, 1.0], [1800.0, 2.0], [1900.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "6.5 - Presionar Nuevo Cliente", "isController": false}, {"data": [[9000.0, 1.0], [2800.0, 1.0], [2900.0, 2.0], [3000.0, 1.0], [3100.0, 1.0], [3300.0, 1.0], [3400.0, 1.0], [3600.0, 2.0]], "isOverall": false, "label": "52.1 - Es accionista de una persona juridica", "isController": false}, {"data": [[100.0, 2.0], [200.0, 4.0], [400.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "59.3 - Cerrar Datos de la persona", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 2.0], [1300.0, 2.0], [1400.0, 1.0], [1600.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "59.2 - Cerrar Datos de la persona", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 1.0], [1200.0, 1.0], [1300.0, 1.0], [1400.0, 2.0], [1700.0, 3.0], [1800.0, 1.0]], "isOverall": false, "label": "36.8 - Buscar Beneficiario", "isController": false}, {"data": [[4500.0, 1.0], [4600.0, 1.0], [4400.0, 1.0], [5000.0, 1.0], [4900.0, 1.0], [5400.0, 1.0], [5500.0, 1.0], [6300.0, 1.0], [6600.0, 1.0], [6800.0, 1.0]], "isOverall": false, "label": "T.49 - Exoneracion de impuesto", "isController": true}, {"data": [[2400.0, 1.0], [2600.0, 1.0], [1300.0, 1.0], [2700.0, 1.0], [2800.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [1700.0, 2.0]], "isOverall": false, "label": "41.2 - Presionar boton Campos Adicionales", "isController": false}, {"data": [[2100.0, 2.0], [2300.0, 1.0], [2200.0, 1.0], [2600.0, 2.0], [1400.0, 1.0], [1800.0, 2.0], [1900.0, 1.0]], "isOverall": false, "label": "55.3 - Cantidad de Empleados", "isController": false}, {"data": [[600.0, 1.0], [1300.0, 1.0], [400.0, 3.0], [500.0, 5.0]], "isOverall": false, "label": "1.1 - Index", "isController": false}, {"data": [[2100.0, 1.0], [1200.0, 2.0], [1300.0, 3.0], [1400.0, 1.0], [1600.0, 1.0], [1900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "T.13 - Ingresar ocupacion", "isController": true}, {"data": [[2100.0, 2.0], [2300.0, 1.0], [2400.0, 1.0], [2500.0, 1.0], [2700.0, 1.0], [1700.0, 2.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "T.45 - Nombre de la empresa", "isController": true}, {"data": [[2100.0, 2.0], [2300.0, 2.0], [2400.0, 1.0], [2600.0, 1.0], [1500.0, 1.0], [3200.0, 2.0], [1900.0, 1.0]], "isOverall": false, "label": "53.1 - Es expuesto politicamente", "isController": false}, {"data": [[2100.0, 1.0], [1100.0, 1.0], [2200.0, 1.0], [2300.0, 2.0], [2500.0, 1.0], [2900.0, 1.0], [3000.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "54.1 - Es usted familiar a un colaborador", "isController": false}, {"data": [[2100.0, 1.0], [1200.0, 1.0], [2400.0, 1.0], [2600.0, 1.0], [1400.0, 1.0], [2900.0, 2.0], [3300.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "32.1 - Guardar Contactos", "isController": false}, {"data": [[1100.0, 2.0], [700.0, 1.0], [1500.0, 2.0], [1600.0, 1.0], [800.0, 1.0], [1700.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "T.16 - Ingresar Nacionalidad", "isController": true}, {"data": [[2100.0, 1.0], [1100.0, 1.0], [1200.0, 2.0], [1400.0, 1.0], [1600.0, 2.0], [1700.0, 1.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "24.2 - Buscar Corregimiento", "isController": false}, {"data": [[8800.0, 1.0], [9700.0, 1.0], [10200.0, 1.0], [10400.0, 1.0], [5900.0, 1.0], [6100.0, 1.0], [6700.0, 1.0], [6800.0, 1.0], [6900.0, 1.0], [7200.0, 1.0]], "isOverall": false, "label": "T.41 - Presionar boton Campos Adicionales", "isController": true}, {"data": [[2400.0, 3.0], [2600.0, 1.0], [5600.0, 1.0], [3300.0, 1.0], [3200.0, 1.0], [3500.0, 1.0], [3600.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "52.2 - Es accionista de una persona juridica176", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 1.0], [1500.0, 3.0], [1600.0, 1.0], [1700.0, 1.0], [1800.0, 1.0], [1900.0, 2.0]], "isOverall": false, "label": "27.1 - Guardar Domicilio", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 1.0], [1200.0, 1.0], [700.0, 2.0], [800.0, 2.0], [900.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "58.2 - Grabar Datos de la persona completos", "isController": false}, {"data": [[16600.0, 1.0], [18100.0, 1.0], [17700.0, 1.0], [18000.0, 1.0], [11700.0, 1.0], [12100.0, 1.0], [12500.0, 1.0], [12900.0, 1.0], [14700.0, 1.0], [15700.0, 1.0]], "isOverall": false, "label": "T.17 - Grabar Datos de la Persona", "isController": true}, {"data": [[2100.0, 1.0], [1400.0, 1.0], [6100.0, 1.0], [1600.0, 1.0], [1700.0, 1.0], [1800.0, 1.0], [1900.0, 2.0], [2000.0, 2.0]], "isOverall": false, "label": "35.1 - Seleccionar Vinculo o relacion", "isController": false}, {"data": [[2300.0, 1.0], [2900.0, 1.0], [3000.0, 1.0], [3100.0, 3.0], [1700.0, 1.0], [3400.0, 1.0], [1900.0, 2.0]], "isOverall": false, "label": "T.28 - Seleccionar Contactos", "isController": true}, {"data": [[4200.0, 1.0], [4700.0, 1.0], [5000.0, 1.0], [6000.0, 2.0], [6300.0, 1.0], [3300.0, 1.0], [6600.0, 2.0], [6800.0, 1.0]], "isOverall": false, "label": "T.48 - maneja persil PYMES", "isController": true}, {"data": [[2300.0, 2.0], [3100.0, 1.0], [3300.0, 2.0], [1800.0, 1.0], [3600.0, 1.0], [1900.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "49.1 - Exoneracion de impuesto", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 1.0], [1400.0, 1.0], [1500.0, 3.0], [800.0, 1.0], [900.0, 1.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "59.1 - Cerrar Datos de la persona", "isController": false}, {"data": [[600.0, 2.0], [700.0, 4.0], [800.0, 1.0], [900.0, 1.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "39.2 - Guardar Relacion", "isController": false}, {"data": [[4400.0, 1.0], [5000.0, 1.0], [5300.0, 2.0], [5600.0, 3.0], [5800.0, 1.0], [6900.0, 1.0], [7200.0, 1.0]], "isOverall": false, "label": "T.24- Buscar Corregimiento", "isController": true}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [2300.0, 1.0], [2500.0, 1.0], [1500.0, 1.0], [3200.0, 2.0], [3400.0, 2.0], [3600.0, 1.0]], "isOverall": false, "label": "48.1 - maneja persil PYMES", "isController": false}, {"data": [[2200.0, 1.0], [1100.0, 1.0], [1200.0, 1.0], [1400.0, 2.0], [1500.0, 1.0], [1600.0, 1.0], [1800.0, 1.0], [1900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "6.7 - Presionar Nuevo Cliente", "isController": false}, {"data": [[0.0, 1.0], [100.0, 8.0], [200.0, 1.0]], "isOverall": false, "label": "1.2 - Index-0", "isController": false}, {"data": [[2500.0, 1.0], [1300.0, 1.0], [1600.0, 1.0], [1700.0, 2.0], [1800.0, 2.0], [1900.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "36.7 - Buscar Beneficiario", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [2500.0, 1.0], [3500.0, 1.0], [1800.0, 2.0], [3600.0, 1.0], [1900.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "T.42 - Cantidad de Hijos", "isController": true}, {"data": [[2500.0, 1.0], [2800.0, 2.0], [2700.0, 1.0], [2900.0, 1.0], [3000.0, 2.0], [3100.0, 2.0], [3200.0, 1.0]], "isOverall": false, "label": "19.1 - Grabar Datos del Cliente", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0], [100.0, 4.0], [400.0, 1.0]], "isOverall": false, "label": "60.2 - Cerrar Insis-0", "isController": false}, {"data": [[300.0, 1.0], [100.0, 1.0], [200.0, 7.0], [400.0, 1.0]], "isOverall": false, "label": "1.2 - Index-1", "isController": false}, {"data": [[2500.0, 1.0], [1300.0, 1.0], [1500.0, 2.0], [3000.0, 2.0], [1600.0, 1.0], [1700.0, 1.0], [3400.0, 1.0], [3700.0, 1.0]], "isOverall": false, "label": "43.1 - Estado Civil", "isController": false}, {"data": [[300.0, 1.0], [200.0, 6.0], [100.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "60.2 - Cerrar Insis", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 2.0], [1300.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [800.0, 2.0], [1700.0, 1.0]], "isOverall": false, "label": "57.4 - Cerra Campos Adicionales", "isController": false}, {"data": [[2100.0, 1.0], [2500.0, 1.0], [2700.0, 2.0], [2900.0, 1.0], [3000.0, 1.0], [3100.0, 1.0], [1700.0, 1.0], [3400.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "48.2 - maneja persil PYMES", "isController": false}, {"data": [[0.0, 1.0], [100.0, 8.0], [200.0, 1.0]], "isOverall": false, "label": "60.2 - Cerrar Insis-1", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [1700.0, 2.0], [1900.0, 3.0], [2000.0, 1.0]], "isOverall": false, "label": "34.1 - Crear Relacion", "isController": false}, {"data": [[300.0, 2.0], [600.0, 1.0], [700.0, 2.0], [400.0, 3.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "27.2 - Guardar Domicilio", "isController": false}, {"data": [[1100.0, 1.0], [700.0, 1.0], [1600.0, 1.0], [800.0, 4.0], [900.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "T.1 - Index", "isController": true}, {"data": [[2100.0, 2.0], [2200.0, 1.0], [2400.0, 1.0], [1500.0, 1.0], [3100.0, 1.0], [3200.0, 1.0], [3500.0, 1.0], [3600.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "T.44 - Nombre de la empresa", "isController": true}, {"data": [[600.0, 1.0], [700.0, 3.0], [400.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "3.1 - Seleccionar Operaciones del sistema", "isController": false}, {"data": [[300.0, 4.0], [100.0, 2.0], [200.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "4.2 - Seleccionar Modulo de Personas", "isController": false}, {"data": [[1200.0, 2.0], [1300.0, 2.0], [1500.0, 1.0], [1600.0, 1.0], [800.0, 2.0], [1700.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "24.3 - Buscar Corregimiento", "isController": false}, {"data": [[1100.0, 1.0], [1300.0, 1.0], [800.0, 2.0], [900.0, 2.0], [1000.0, 4.0]], "isOverall": false, "label": "32.2 - Guardar Contactos", "isController": false}, {"data": [[2100.0, 3.0], [2400.0, 1.0], [1300.0, 2.0], [1500.0, 1.0], [1000.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "28.1 - Seleccionar Contactos", "isController": false}, {"data": [[1100.0, 1.0], [1300.0, 2.0], [1400.0, 2.0], [800.0, 1.0], [900.0, 1.0], [1000.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "1541 - Ingresar fecha de nacimiento", "isController": false}, {"data": [[1100.0, 1.0], [2300.0, 1.0], [1400.0, 1.0], [1600.0, 2.0], [1700.0, 3.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "36.9 - Buscar Beneficiario", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [200.0, 4.0], [500.0, 4.0]], "isOverall": false, "label": "59.4 - Cerrar Datos de la persona", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [1200.0, 1.0], [1400.0, 1.0], [1600.0, 1.0], [1700.0, 3.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "8.1 - Ingresar No de Identificacion", "isController": false}, {"data": [[2200.0, 2.0], [2300.0, 1.0], [2500.0, 1.0], [2600.0, 1.0], [2700.0, 1.0], [2900.0, 2.0], [6200.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "55.2 - Cantidad de Empleados", "isController": false}, {"data": [[1100.0, 1.0], [1300.0, 2.0], [1400.0, 2.0], [800.0, 1.0], [900.0, 1.0], [1000.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "T.14 - Ingresar fecha de nacimiento", "isController": true}, {"data": [[2200.0, 1.0], [1100.0, 1.0], [1200.0, 1.0], [1300.0, 2.0], [2700.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "31.1 - Ingresar Detalles", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [2400.0, 1.0], [2700.0, 1.0], [2800.0, 1.0], [2900.0, 2.0], [3100.0, 1.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "46.1 - Seleccionar si es Extranjero", "isController": false}, {"data": [[4400.0, 1.0], [4900.0, 1.0], [5100.0, 1.0], [5600.0, 1.0], [5500.0, 1.0], [5800.0, 1.0], [6000.0, 1.0], [6500.0, 1.0], [6700.0, 1.0], [6900.0, 1.0]], "isOverall": false, "label": "T.46 - Seleccionar si es Extranjero", "isController": true}, {"data": [[300.0, 6.0], [600.0, 1.0], [200.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "1.2 - Index", "isController": false}, {"data": [[1100.0, 3.0], [2200.0, 1.0], [1200.0, 1.0], [1600.0, 1.0], [1000.0, 3.0], [2000.0, 1.0]], "isOverall": false, "label": "T.20 - Seleccionar Domicilio Crear", "isController": true}, {"data": [[1100.0, 1.0], [1300.0, 1.0], [1400.0, 4.0], [1500.0, 1.0], [1700.0, 1.0], [900.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "36.6 - Buscar Beneficiario", "isController": false}, {"data": [[300.0, 1.0], [700.0, 2.0], [200.0, 4.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "2.1 - Ingresar al Insis-0", "isController": false}, {"data": [[0.0, 3.0], [100.0, 7.0]], "isOverall": false, "label": "2.1 - Ingresar al Insis-1", "isController": false}, {"data": [[2500.0, 1.0], [1400.0, 1.0], [2700.0, 1.0], [1800.0, 2.0], [1000.0, 4.0], [2000.0, 1.0]], "isOverall": false, "label": "T.29 - Crear Contactos", "isController": true}, {"data": [[4100.0, 1.0], [4200.0, 1.0], [2300.0, 1.0], [2700.0, 1.0], [2900.0, 1.0], [3000.0, 2.0], [3400.0, 1.0], [3500.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": "T.32 - Guardar Contactos", "isController": true}, {"data": [[2100.0, 1.0], [2700.0, 1.0], [1500.0, 1.0], [3100.0, 1.0], [1600.0, 1.0], [1700.0, 2.0], [1900.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "40.1 - Seleccionar Campos Adicionales", "isController": false}, {"data": [[1300.0, 1.0], [1400.0, 3.0], [1500.0, 2.0], [1600.0, 2.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "15.1 - Ingresar Pais de Nacimiento", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 1.0], [1300.0, 1.0], [700.0, 2.0], [1500.0, 1.0], [800.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "58.3 - Grabar Datos de la persona completos", "isController": false}, {"data": [[300.0, 8.0], [800.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "60.3 - Cerrar Insis", "isController": false}, {"data": [[2100.0, 2.0], [2300.0, 1.0], [2400.0, 1.0], [2500.0, 1.0], [2700.0, 1.0], [1700.0, 2.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "45.1 - Nombre de la empresa", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 1.0], [1300.0, 1.0], [1400.0, 1.0], [1600.0, 1.0], [1700.0, 2.0], [900.0, 2.0]], "isOverall": false, "label": "12.1 - Ingresar Segundo Apellido", "isController": false}, {"data": [[4300.0, 2.0], [4400.0, 1.0], [4600.0, 1.0], [4700.0, 1.0], [5000.0, 1.0], [5300.0, 1.0], [5900.0, 1.0], [3300.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "T.50 - Ingresos anuales por actividad principal", "isController": true}, {"data": [[1100.0, 1.0], [1200.0, 2.0], [1300.0, 1.0], [1400.0, 1.0], [1600.0, 2.0], [1700.0, 1.0], [1800.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "22.1 - Buscar Corregimiento", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [2500.0, 1.0], [3500.0, 1.0], [1800.0, 2.0], [3600.0, 1.0], [1900.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "42.1 - Cantidad de Hijos", "isController": false}, {"data": [[2100.0, 2.0], [2200.0, 1.0], [2400.0, 1.0], [1500.0, 1.0], [3100.0, 1.0], [3200.0, 1.0], [3500.0, 1.0], [3600.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "44.1 - Nombre de la empresa", "isController": false}, {"data": [[1100.0, 3.0], [1200.0, 1.0], [1300.0, 3.0], [1400.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "T.10 - Ingresar Nombre", "isController": true}, {"data": [[600.0, 2.0], [800.0, 2.0], [900.0, 4.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "28.2 - Seleccionar Contactos", "isController": false}, {"data": [[2300.0, 1.0], [2500.0, 1.0], [2700.0, 1.0], [2900.0, 2.0], [3100.0, 1.0], [1600.0, 1.0], [3300.0, 1.0], [1700.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "5.1 - Seleccionar Clientes", "isController": false}, {"data": [[300.0, 7.0], [400.0, 1.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "3.2 - Seleccionar Operaciones del sistema", "isController": false}, {"data": [[1100.0, 1.0], [1300.0, 1.0], [1500.0, 2.0], [1800.0, 1.0], [900.0, 1.0], [1900.0, 1.0], [1000.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "23.1 - Buscar Corregimiento", "isController": false}, {"data": [[300.0, 3.0], [200.0, 3.0], [400.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "4.1 - Seleccionar Modulo de Personas", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 1.0], [1300.0, 1.0], [1400.0, 1.0], [1600.0, 1.0], [1700.0, 2.0], [900.0, 2.0]], "isOverall": false, "label": "T.12 - Ingresar Segundo Apellido", "isController": true}, {"data": [[2300.0, 1.0], [2500.0, 2.0], [2600.0, 1.0], [2700.0, 1.0], [3200.0, 1.0], [3300.0, 2.0], [1700.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "24.1 - Buscar Corregimiento", "isController": false}, {"data": [[2300.0, 1.0], [2200.0, 1.0], [2400.0, 3.0], [2500.0, 1.0], [2600.0, 1.0], [2900.0, 1.0], [1500.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "50.1 - Ingresos anuales por actividad principal", "isController": false}, {"data": [[2500.0, 1.0], [1400.0, 1.0], [2700.0, 1.0], [1800.0, 2.0], [1000.0, 4.0], [2000.0, 1.0]], "isOverall": false, "label": "29.1 - Crear Contactos", "isController": false}, {"data": [[2200.0, 1.0], [1200.0, 2.0], [1300.0, 2.0], [1400.0, 2.0], [1500.0, 2.0], [1800.0, 1.0]], "isOverall": false, "label": "36.4 - Buscar Beneficiario", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [800.0, 3.0], [900.0, 4.0], [1000.0, 1.0]], "isOverall": false, "label": "T.3 - Seleccionar Operaciones del sistema", "isController": true}, {"data": [[200.0, 6.0], [100.0, 2.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "60.1 - Cerrar Insis-0", "isController": false}, {"data": [[1100.0, 2.0], [2300.0, 1.0], [1200.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [1700.0, 1.0], [1800.0, 2.0], [1900.0, 1.0]], "isOverall": false, "label": "26.1 - Guardar direccion", "isController": false}, {"data": [[2100.0, 1.0], [1100.0, 1.0], [2200.0, 1.0], [1400.0, 2.0], [1600.0, 1.0], [1700.0, 2.0], [900.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "57.5 - Cerra Campos Adicionales", "isController": false}, {"data": [[0.0, 1.0], [300.0, 3.0], [200.0, 3.0], [400.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "60.1 - Cerrar Insis-1", "isController": false}, {"data": [[400.0, 2.0], [100.0, 4.0], [200.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "60.1 - Cerrar Insis-2", "isController": false}, {"data": [[1100.0, 2.0], [1400.0, 2.0], [1800.0, 3.0], [1900.0, 1.0], [2000.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "T.7 - Seleccionar Tipo de Identificacion", "isController": true}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [1200.0, 1.0], [1500.0, 1.0], [1600.0, 2.0], [1800.0, 3.0], [1900.0, 1.0]], "isOverall": false, "label": "T.60 - Cerrar Insis", "isController": true}, {"data": [[1300.0, 1.0], [1400.0, 3.0], [1500.0, 2.0], [1600.0, 2.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "T.15 - Ingresar Pais de Nacimiento", "isController": true}, {"data": [[4400.0, 1.0], [4500.0, 1.0], [4600.0, 1.0], [4900.0, 1.0], [2700.0, 1.0], [3000.0, 1.0], [3200.0, 1.0], [3400.0, 1.0], [3600.0, 1.0], [3700.0, 1.0]], "isOverall": false, "label": "T.39 - Guardar Relacion", "isController": true}, {"data": [[700.0, 1.0], [800.0, 1.0], [1600.0, 1.0], [1700.0, 1.0], [900.0, 2.0], [1800.0, 2.0], [1900.0, 2.0]], "isOverall": false, "label": "T.30 - Seleccionar Tipo de Contacto", "isController": true}, {"data": [[2900.0, 2.0], [1500.0, 1.0], [3000.0, 1.0], [3100.0, 1.0], [3200.0, 1.0], [1700.0, 1.0], [1800.0, 1.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "21.1 - Ingrresar Pais de Residencia-108", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 1.0], [1300.0, 1.0], [1400.0, 1.0], [800.0, 2.0], [900.0, 3.0]], "isOverall": false, "label": "22.2 - Buscar Corregimiento", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [1300.0, 2.0], [1400.0, 1.0], [1500.0, 1.0], [1600.0, 2.0], [1800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "36.1 - Buscar Beneficiario", "isController": false}, {"data": [[4200.0, 1.0], [4400.0, 1.0], [3100.0, 1.0], [3200.0, 3.0], [3300.0, 2.0], [3600.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "58.1 - Grabar Datos de la persona completos2", "isController": false}, {"data": [[4200.0, 1.0], [2400.0, 3.0], [2500.0, 1.0], [2600.0, 1.0], [3300.0, 1.0], [3400.0, 1.0], [3800.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "56.1 - Grabar Campos Adicionales", "isController": false}, {"data": [[2100.0, 1.0], [1200.0, 2.0], [1300.0, 3.0], [1400.0, 1.0], [1600.0, 1.0], [1900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "13.1 - Ingresar ocupacion", "isController": false}, {"data": [[1100.0, 3.0], [1200.0, 2.0], [700.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "57.3 - Cerra Campos Adicionales", "isController": false}, {"data": [[600.0, 2.0], [300.0, 2.0], [700.0, 1.0], [800.0, 2.0], [400.0, 1.0], [1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "6.6 - Presionar Nuevo Cliente", "isController": false}, {"data": [[2300.0, 1.0], [1200.0, 1.0], [1300.0, 1.0], [1500.0, 2.0], [1600.0, 4.0], [1700.0, 1.0]], "isOverall": false, "label": "36.2 - Buscar Beneficiario", "isController": false}, {"data": [[700.0, 1.0], [800.0, 1.0], [1600.0, 1.0], [1700.0, 1.0], [900.0, 2.0], [1800.0, 2.0], [1900.0, 2.0]], "isOverall": false, "label": "30.1 - Seleccionar Tipo de Contacto", "isController": false}, {"data": [[200300.0, 1.0], [203500.0, 1.0], [197800.0, 1.0], [201800.0, 1.0], [220600.0, 1.0], [216500.0, 1.0], [218800.0, 1.0], [222000.0, 1.0], [226400.0, 1.0], [222100.0, 1.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[4100.0, 1.0], [2400.0, 1.0], [2500.0, 1.0], [2600.0, 3.0], [2700.0, 1.0], [3200.0, 1.0], [3400.0, 1.0], [3600.0, 1.0]], "isOverall": false, "label": "T.40 - Seleccionar Campos Adicionales", "isController": true}, {"data": [[2200.0, 1.0], [2500.0, 2.0], [2700.0, 3.0], [2900.0, 1.0], [1600.0, 1.0], [3200.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "43.2 - Estado Civil", "isController": false}, {"data": [[4300.0, 2.0], [5100.0, 2.0], [5500.0, 1.0], [6000.0, 1.0], [3800.0, 2.0], [3900.0, 2.0]], "isOverall": false, "label": "T.56 - Grabar Campos Adicionales", "isController": true}, {"data": [[4100.0, 1.0], [4800.0, 1.0], [4700.0, 1.0], [4900.0, 1.0], [5300.0, 1.0], [5600.0, 1.0], [5800.0, 1.0], [3000.0, 1.0], [3200.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": "T.53 - Es expuesto politicamente", "isController": true}, {"data": [[1100.0, 1.0], [1300.0, 1.0], [1500.0, 2.0], [1800.0, 1.0], [900.0, 1.0], [1900.0, 1.0], [1000.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "T.23 - Buscar Corregimiento", "isController": true}, {"data": [[4400.0, 1.0], [5000.0, 1.0], [5200.0, 2.0], [5300.0, 1.0], [5500.0, 2.0], [5800.0, 1.0], [5700.0, 2.0]], "isOverall": false, "label": "T.47 - Cargo que ocupa", "isController": true}, {"data": [[2100.0, 1.0], [1400.0, 1.0], [6100.0, 1.0], [1600.0, 1.0], [1700.0, 1.0], [1800.0, 1.0], [1900.0, 2.0], [2000.0, 2.0]], "isOverall": false, "label": "T.35 - Seleccionar Vinculo o relacion", "isController": true}, {"data": [[13200.0, 1.0], [13700.0, 2.0], [13800.0, 2.0], [13500.0, 1.0], [13900.0, 1.0], [14500.0, 2.0], [15000.0, 1.0]], "isOverall": false, "label": "T.36 - Buscar Beneficiario", "isController": true}, {"data": [[2200.0, 1.0], [2500.0, 1.0], [2700.0, 2.0], [2900.0, 1.0], [3500.0, 2.0], [3600.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "41.4 - Presionar boton Campos Adicionales", "isController": false}, {"data": [[600.0, 5.0], [700.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "22.3 - Buscar Corregimiento", "isController": false}, {"data": [[2300.0, 2.0], [2700.0, 3.0], [2800.0, 2.0], [3000.0, 1.0], [3100.0, 1.0], [3300.0, 1.0]], "isOverall": false, "label": "47.1 - Cargo que ocupa", "isController": false}, {"data": [[2200.0, 2.0], [2300.0, 1.0], [2700.0, 1.0], [3300.0, 1.0], [1700.0, 1.0], [1900.0, 2.0], [2000.0, 2.0]], "isOverall": false, "label": "50.2 - Ingresos anuales por actividad principal", "isController": false}, {"data": [[2200.0, 1.0], [2300.0, 1.0], [1200.0, 2.0], [1300.0, 1.0], [1500.0, 1.0], [800.0, 1.0], [1600.0, 1.0], [1800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "9.1- Ingresar Fecha de Vencimiento ID", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [2400.0, 1.0], [2500.0, 1.0], [2600.0, 1.0], [2800.0, 1.0], [3100.0, 1.0], [3300.0, 1.0], [3200.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "49.2 - Exoneracion de impuesto", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [1700.0, 2.0], [1900.0, 3.0], [2000.0, 1.0]], "isOverall": false, "label": "T.34 - Crear Relacion", "isController": true}, {"data": [[1400.0, 2.0], [1500.0, 1.0], [1700.0, 5.0], [1800.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "56.2 - Grabar Campos Adicionales", "isController": false}, {"data": [[1100.0, 1.0], [700.0, 1.0], [800.0, 2.0], [900.0, 2.0], [1000.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "60.1 - Cerrar Insis", "isController": false}, {"data": [[300.0, 4.0], [800.0, 1.0], [400.0, 5.0]], "isOverall": false, "label": "6.1 - Presionar Nuevo Cliente", "isController": false}, {"data": [[8700.0, 1.0], [9600.0, 1.0], [10100.0, 2.0], [6300.0, 1.0], [6500.0, 1.0], [6800.0, 1.0], [7400.0, 1.0], [7700.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "T. 6 - Presionar Nuevo Cliente", "isController": true}, {"data": [[600.0, 1.0], [700.0, 4.0], [800.0, 3.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "33.2 - Seleccionar Relacion", "isController": false}, {"data": [[600.0, 3.0], [300.0, 1.0], [1400.0, 3.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "41..3 - Presionar boton Campos Adicionales", "isController": false}, {"data": [[2500.0, 1.0], [2900.0, 1.0], [3000.0, 1.0], [3100.0, 2.0], [3200.0, 1.0], [3300.0, 1.0], [3600.0, 1.0], [3700.0, 2.0]], "isOverall": false, "label": "46.2 - Seleccionar si es Extranjero", "isController": false}, {"data": [[2100.0, 1.0], [2400.0, 1.0], [1200.0, 1.0], [2600.0, 1.0], [1400.0, 1.0], [2800.0, 1.0], [3100.0, 1.0], [1700.0, 1.0], [1800.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "57.1 - Cerra Campos Adicionales", "isController": false}, {"data": [[1200.0, 2.0], [1300.0, 2.0], [1500.0, 1.0], [1600.0, 1.0], [1700.0, 2.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "25.1 - Ingresar numero de casa", "isController": false}, {"data": [[4500.0, 2.0], [4600.0, 1.0], [4900.0, 1.0], [5500.0, 1.0], [5700.0, 1.0], [6200.0, 2.0], [6500.0, 1.0], [7200.0, 1.0]], "isOverall": false, "label": "T.22 - Buscar Corregimiento", "isController": true}, {"data": [[17200.0, 1.0], [17100.0, 1.0], [17500.0, 1.0], [11200.0, 1.0], [11300.0, 1.0], [11900.0, 1.0], [12300.0, 1.0], [14200.0, 1.0], [15100.0, 1.0], [16000.0, 1.0]], "isOverall": false, "label": "17.1 - Grabar Datos de la Persona", "isController": false}, {"data": [[3100.0, 1.0], [3200.0, 1.0], [3400.0, 2.0], [3500.0, 2.0], [3700.0, 1.0], [3600.0, 1.0], [3800.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": "T.19 - Grabar Datos del Cliente", "isController": true}, {"data": [[2200.0, 1.0], [2300.0, 1.0], [2400.0, 2.0], [1300.0, 1.0], [2600.0, 1.0], [2900.0, 1.0], [1500.0, 1.0], [1700.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "53.2 - Es expuesto politicamente", "isController": false}, {"data": [[2200.0, 1.0], [2300.0, 1.0], [1200.0, 2.0], [1300.0, 1.0], [1500.0, 1.0], [800.0, 1.0], [1600.0, 1.0], [1800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "T.9 - Ingresar Fecha de Vencimiento ID", "isController": true}, {"data": [[1100.0, 2.0], [600.0, 1.0], [1300.0, 2.0], [1400.0, 1.0], [1500.0, 1.0], [900.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "11.1 - Ingresar Apellido", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 1.0], [1200.0, 1.0], [700.0, 3.0], [800.0, 1.0], [400.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "22.4 - Buscar Corregimiento", "isController": false}, {"data": [[4300.0, 1.0], [2600.0, 1.0], [2700.0, 1.0], [5700.0, 1.0], [3200.0, 1.0], [3400.0, 1.0], [6800.0, 1.0], [7600.0, 2.0], [7900.0, 1.0]], "isOverall": false, "label": "T.2 - Ingresar al Insis", "isController": true}, {"data": [[2300.0, 1.0], [1700.0, 1.0], [1800.0, 4.0], [1900.0, 3.0], [2000.0, 1.0]], "isOverall": false, "label": "36.5 - Buscar Beneficiario", "isController": false}, {"data": [[2300.0, 1.0], [2200.0, 1.0], [2400.0, 2.0], [2500.0, 1.0], [2900.0, 1.0], [3100.0, 1.0], [1900.0, 3.0]], "isOverall": false, "label": "T.27 - Guardar Domicilio", "isController": true}, {"data": [[1100.0, 2.0], [1400.0, 2.0], [1800.0, 3.0], [1900.0, 1.0], [2000.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "7.1 - Seleccionar Tipo de Identificacion", "isController": false}, {"data": [[4400.0, 1.0], [4700.0, 1.0], [5000.0, 1.0], [5100.0, 1.0], [5300.0, 2.0], [5200.0, 2.0], [5500.0, 1.0], [5900.0, 1.0]], "isOverall": false, "label": "T.51 - Ingresos anuales por otras actividad", "isController": true}, {"data": [[2300.0, 1.0], [4600.0, 1.0], [2700.0, 1.0], [5800.0, 1.0], [6300.0, 1.0], [6500.0, 1.0], [6600.0, 1.0], [3600.0, 1.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "2.2 - Ingresar al Insis", "isController": false}, {"data": [[300.0, 2.0], [200.0, 6.0], [100.0, 2.0]], "isOverall": false, "label": "6.2 - Presionar Nuevo Cliente", "isController": false}, {"data": [[2300.0, 1.0], [2500.0, 1.0], [2700.0, 1.0], [2900.0, 2.0], [3100.0, 1.0], [1600.0, 1.0], [3300.0, 1.0], [1700.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "T.5 - Seleccionar Clientes", "isController": true}, {"data": [[600.0, 1.0], [700.0, 1.0], [800.0, 1.0], [500.0, 7.0]], "isOverall": false, "label": "17.2 - Grabar Datos de la Persona", "isController": false}, {"data": [[1100.0, 2.0], [2300.0, 1.0], [1200.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [1700.0, 1.0], [1800.0, 2.0], [1900.0, 1.0]], "isOverall": false, "label": "T.26 - Guardar direccion", "isController": true}, {"data": [[2100.0, 1.0], [2300.0, 1.0], [2400.0, 3.0], [2500.0, 1.0], [2600.0, 1.0], [2700.0, 1.0], [2800.0, 1.0], [3000.0, 1.0]], "isOverall": false, "label": "47.2 - Cargo que ocupa", "isController": false}, {"data": [[8600.0, 1.0], [5600.0, 2.0], [5800.0, 1.0], [6100.0, 2.0], [12200.0, 1.0], [6300.0, 2.0], [6500.0, 1.0]], "isOverall": false, "label": "T.52- Es accionista de una persona juridica", "isController": true}, {"data": [[300.0, 4.0], [700.0, 1.0], [400.0, 1.0], [800.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "2.1 - Ingresar al Insis", "isController": false}, {"data": [[600.0, 4.0], [800.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "19.2 - Grabar Datos del Cliente", "isController": false}, {"data": [[300.0, 5.0], [400.0, 3.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "6.3 - Presionar Nuevo Cliente", "isController": false}, {"data": [[600.0, 2.0], [1300.0, 2.0], [700.0, 1.0], [800.0, 2.0], [900.0, 3.0]], "isOverall": false, "label": "40.2 - Seleccionar Campos Adicionales", "isController": false}, {"data": [[2300.0, 1.0], [2200.0, 1.0], [2500.0, 2.0], [3300.0, 1.0], [1800.0, 1.0], [1900.0, 3.0], [2000.0, 1.0]], "isOverall": false, "label": "41.1 - Presionar boton Campos Adicionales", "isController": false}, {"data": [[100.0, 8.0], [400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "60.3 - Cerrar Insis-0", "isController": false}, {"data": [[1200.0, 2.0], [1300.0, 2.0], [1500.0, 1.0], [1600.0, 1.0], [1700.0, 2.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "T.25 - Ingresar numero de casa", "isController": true}, {"data": [[2300.0, 1.0], [2200.0, 1.0], [2500.0, 1.0], [1500.0, 1.0], [1700.0, 3.0], [1800.0, 1.0], [1900.0, 2.0]], "isOverall": false, "label": "33.1 - Seleccionar Relacion", "isController": false}, {"data": [[4100.0, 1.0], [2300.0, 1.0], [2600.0, 1.0], [2800.0, 2.0], [2900.0, 1.0], [3400.0, 2.0], [3700.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "39.1 - Guardar Relacion", "isController": false}, {"data": [[300.0, 1.0], [200.0, 9.0]], "isOverall": false, "label": "60.3 - Cerrar Insis-1", "isController": false}, {"data": [[4200.0, 2.0], [4500.0, 1.0], [4700.0, 1.0], [5500.0, 1.0], [5600.0, 1.0], [6000.0, 1.0], [3300.0, 1.0], [6600.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "T.43 - Estado Civil", "isController": true}, {"data": [[1100.0, 3.0], [2200.0, 1.0], [1200.0, 1.0], [1600.0, 1.0], [1000.0, 3.0], [2000.0, 1.0]], "isOverall": false, "label": "20.1 - Seleccionar Domicilio Crear", "isController": false}, {"data": [[2400.0, 1.0], [2500.0, 2.0], [2600.0, 2.0], [2700.0, 1.0], [2800.0, 1.0], [2900.0, 1.0], [3100.0, 1.0], [3200.0, 1.0]], "isOverall": false, "label": "T.33 - Seleccionar Relacion", "isController": true}, {"data": [[2300.0, 1.0], [2400.0, 4.0], [2500.0, 1.0], [2600.0, 1.0], [2700.0, 1.0], [2800.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "55.1 - Cantidad de Empleados", "isController": false}, {"data": [[2100.0, 1.0], [2400.0, 3.0], [2600.0, 1.0], [2800.0, 1.0], [2900.0, 1.0], [3100.0, 1.0], [3200.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "51.1 - Ingresos anuales por otras actividad", "isController": false}, {"data": [[2200.0, 4.0], [2300.0, 2.0], [2600.0, 1.0], [2800.0, 1.0], [2900.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "54.2- Es usted familiar a un colaborador", "isController": false}, {"data": [[4700.0, 2.0], [5100.0, 1.0], [5200.0, 1.0], [5400.0, 1.0], [5600.0, 1.0], [5500.0, 1.0], [6100.0, 1.0], [6300.0, 1.0], [6500.0, 1.0]], "isOverall": false, "label": "T.58 - Grabar Datos de la persona completos", "isController": true}, {"data": [[2200.0, 1.0], [1100.0, 1.0], [1200.0, 1.0], [1300.0, 2.0], [2700.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "T.31 - Ingresar Detalles", "isController": true}, {"data": [[2300.0, 1.0], [2400.0, 1.0], [2500.0, 2.0], [2600.0, 1.0], [3000.0, 1.0], [3300.0, 1.0], [1600.0, 1.0], [3200.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "51.2 - Ingresos anuales por otras actividad", "isController": false}, {"data": [[600.0, 2.0], [700.0, 3.0], [400.0, 2.0], [800.0, 1.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "T.18 - Ingresar Capacidad Maxima del Cliente", "isController": true}, {"data": [[2200.0, 1.0], [1200.0, 2.0], [1300.0, 2.0], [1400.0, 1.0], [1600.0, 1.0], [900.0, 1.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "22.5 - Buscar Corregimiento", "isController": false}, {"data": [[4300.0, 2.0], [4200.0, 1.0], [4800.0, 1.0], [5100.0, 2.0], [5300.0, 1.0], [5200.0, 1.0], [5400.0, 1.0], [3700.0, 1.0]], "isOverall": false, "label": "T.54 - Es usted familiar a un colaborador", "isController": true}, {"data": [[300.0, 3.0], [400.0, 6.0], [500.0, 1.0]], "isOverall": false, "label": "2.3 - Ingresar al Insis", "isController": false}, {"data": [[2200.0, 1.0], [2500.0, 2.0], [3000.0, 2.0], [3200.0, 1.0], [1600.0, 1.0], [3500.0, 1.0], [1800.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "6.4 - Presionar Nuevo Cliente", "isController": false}, {"data": [[11600.0, 1.0], [6400.0, 1.0], [6600.0, 1.0], [6800.0, 1.0], [6900.0, 1.0], [7400.0, 2.0], [7600.0, 1.0], [7700.0, 1.0], [7800.0, 1.0]], "isOverall": false, "label": "T.55 - Cantidad de Empleados", "isController": true}, {"data": [[1200.0, 1.0], [600.0, 2.0], [400.0, 2.0], [800.0, 1.0], [900.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "36.3 - Buscar Beneficiario", "isController": false}, {"data": [[300.0, 2.0], [100.0, 8.0]], "isOverall": false, "label": "60.4 - Cerrar Insis", "isController": false}, {"data": [[1100.0, 3.0], [1200.0, 1.0], [1300.0, 3.0], [1400.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "10.1 - Ingresar Nombre", "isController": false}, {"data": [[2900.0, 2.0], [1500.0, 1.0], [3000.0, 1.0], [3100.0, 1.0], [3200.0, 1.0], [1700.0, 1.0], [1800.0, 1.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "T.21 - Ingrresar Pais de Residencia", "isController": true}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[2300.0, 2.0], [2400.0, 1.0], [2800.0, 1.0], [3200.0, 1.0], [3600.0, 4.0], [3700.0, 1.0]], "isOverall": false, "label": "T.59 - Cerrar Datos de la persona", "isController": true}, {"data": [[9000.0, 1.0], [8900.0, 1.0], [9100.0, 1.0], [9500.0, 2.0], [9600.0, 1.0], [9300.0, 1.0], [10200.0, 1.0], [6900.0, 1.0], [7600.0, 1.0]], "isOverall": false, "label": "T.57 - Cerra Campos Adicionales", "isController": true}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [1200.0, 1.0], [1400.0, 1.0], [1600.0, 1.0], [1700.0, 3.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "T.8 - Ingresar No de Identificacion", "isController": true}, {"data": [[1100.0, 2.0], [600.0, 1.0], [1300.0, 2.0], [1400.0, 1.0], [1500.0, 1.0], [900.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "T.11 - Ingresar Apellido", "isController": true}, {"data": [[1100.0, 2.0], [700.0, 1.0], [1500.0, 2.0], [1600.0, 1.0], [800.0, 1.0], [1700.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "16.1 - Ingresar Nacionalidad-96", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 226400.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 251.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 645.0, "series": [{"data": [[0.0, 251.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 414.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 645.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 4.513698630136986, "minX": 1.5963567E12, "maxY": 10.0, "series": [{"data": [[1.59635682E12, 10.0], [1.5963567E12, 8.920289855072467], [1.59635688E12, 9.506234413965084], [1.59635694E12, 4.513698630136986], [1.59635676E12, 10.0]], "isOverall": false, "label": "1- Thread Group_Registro_de_Cliente", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59635694E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 6.0, "maxY": 226414.0, "series": [{"data": [[26.0, 2852.25], [27.0, 3052.0], [30.0, 2619.5]], "isOverall": false, "label": "57.2 - Cerra Campos Adicionales", "isController": false}, {"data": [[27.8, 2799.0999999999995]], "isOverall": false, "label": "57.2 - Cerra Campos Adicionales-Aggregated", "isController": false}, {"data": [[18.0, 393.0], [25.0, 661.0], [26.0, 654.0], [30.0, 748.5]], "isOverall": false, "label": "T.4 - Seleccionar Modulo de Personas", "isController": true}, {"data": [[26.7, 659.2]], "isOverall": false, "label": "T.4 - Seleccionar Modulo de Personas-Aggregated", "isController": true}, {"data": [[30.0, 695.2]], "isOverall": false, "label": "18.1 - Ingresar Capacidad Maxima del Cliente-101", "isController": false}, {"data": [[30.0, 695.2]], "isOverall": false, "label": "18.1 - Ingresar Capacidad Maxima del Cliente-101-Aggregated", "isController": false}, {"data": [[30.0, 2272.7999999999997]], "isOverall": false, "label": "6.5 - Presionar Nuevo Cliente", "isController": false}, {"data": [[30.0, 2272.7999999999997]], "isOverall": false, "label": "6.5 - Presionar Nuevo Cliente-Aggregated", "isController": false}, {"data": [[30.0, 3815.2000000000003]], "isOverall": false, "label": "52.1 - Es accionista de una persona juridica", "isController": false}, {"data": [[30.0, 3815.2000000000003]], "isOverall": false, "label": "52.1 - Es accionista de una persona juridica-Aggregated", "isController": false}, {"data": [[24.0, 502.0], [25.0, 281.0], [26.0, 454.3333333333333], [28.0, 151.0], [30.0, 213.33333333333334]], "isOverall": false, "label": "59.3 - Cerrar Datos de la persona", "isController": false}, {"data": [[26.900000000000002, 343.9]], "isOverall": false, "label": "59.3 - Cerrar Datos de la persona-Aggregated", "isController": false}, {"data": [[24.0, 1370.5], [25.0, 1658.0], [26.0, 1195.0], [28.0, 1270.0], [30.0, 1179.6666666666667]], "isOverall": false, "label": "59.2 - Cerrar Datos de la persona", "isController": false}, {"data": [[26.900000000000002, 1279.3]], "isOverall": false, "label": "59.2 - Cerrar Datos de la persona-Aggregated", "isController": false}, {"data": [[30.0, 1718.8000000000002]], "isOverall": false, "label": "36.8 - Buscar Beneficiario", "isController": false}, {"data": [[30.0, 1718.8000000000002]], "isOverall": false, "label": "36.8 - Buscar Beneficiario-Aggregated", "isController": false}, {"data": [[30.0, 5441.400000000001]], "isOverall": false, "label": "T.49 - Exoneracion de impuesto", "isController": true}, {"data": [[30.0, 5441.400000000001]], "isOverall": false, "label": "T.49 - Exoneracion de impuesto-Aggregated", "isController": true}, {"data": [[30.0, 2025.3000000000002]], "isOverall": false, "label": "41.2 - Presionar boton Campos Adicionales", "isController": false}, {"data": [[30.0, 2025.3000000000002]], "isOverall": false, "label": "41.2 - Presionar boton Campos Adicionales-Aggregated", "isController": false}, {"data": [[30.0, 2122.0]], "isOverall": false, "label": "55.3 - Cantidad de Empleados", "isController": false}, {"data": [[30.0, 2122.0]], "isOverall": false, "label": "55.3 - Cantidad de Empleados-Aggregated", "isController": false}, {"data": [[8.0, 474.0], [17.0, 549.0], [21.0, 617.0], [11.0, 524.0], [23.0, 531.0], [6.0, 988.5], [26.0, 501.0], [14.0, 498.0], [29.0, 494.0]], "isOverall": false, "label": "1.1 - Index", "isController": false}, {"data": [[16.099999999999998, 616.5]], "isOverall": false, "label": "1.1 - Index-Aggregated", "isController": false}, {"data": [[30.0, 1420.3]], "isOverall": false, "label": "T.13 - Ingresar ocupacion", "isController": true}, {"data": [[30.0, 1420.3]], "isOverall": false, "label": "T.13 - Ingresar ocupacion-Aggregated", "isController": true}, {"data": [[30.0, 2175.1000000000004]], "isOverall": false, "label": "T.45 - Nombre de la empresa", "isController": true}, {"data": [[30.0, 2175.1000000000004]], "isOverall": false, "label": "T.45 - Nombre de la empresa-Aggregated", "isController": true}, {"data": [[30.0, 2410.3]], "isOverall": false, "label": "53.1 - Es expuesto politicamente", "isController": false}, {"data": [[30.0, 2410.3]], "isOverall": false, "label": "53.1 - Es expuesto politicamente-Aggregated", "isController": false}, {"data": [[30.0, 2410.5]], "isOverall": false, "label": "54.1 - Es usted familiar a un colaborador", "isController": false}, {"data": [[30.0, 2410.5]], "isOverall": false, "label": "54.1 - Es usted familiar a un colaborador-Aggregated", "isController": false}, {"data": [[30.0, 2334.3]], "isOverall": false, "label": "32.1 - Guardar Contactos", "isController": false}, {"data": [[30.0, 2334.3]], "isOverall": false, "label": "32.1 - Guardar Contactos-Aggregated", "isController": false}, {"data": [[30.0, 1226.3]], "isOverall": false, "label": "T.16 - Ingresar Nacionalidad", "isController": true}, {"data": [[30.0, 1226.3]], "isOverall": false, "label": "T.16 - Ingresar Nacionalidad-Aggregated", "isController": true}, {"data": [[30.0, 1618.5]], "isOverall": false, "label": "24.2 - Buscar Corregimiento", "isController": false}, {"data": [[30.0, 1618.5]], "isOverall": false, "label": "24.2 - Buscar Corregimiento-Aggregated", "isController": false}, {"data": [[30.0, 7919.0]], "isOverall": false, "label": "T.41 - Presionar boton Campos Adicionales", "isController": true}, {"data": [[30.0, 7919.0]], "isOverall": false, "label": "T.41 - Presionar boton Campos Adicionales-Aggregated", "isController": true}, {"data": [[30.0, 3150.7000000000003]], "isOverall": false, "label": "52.2 - Es accionista de una persona juridica176", "isController": false}, {"data": [[30.0, 3150.7000000000003]], "isOverall": false, "label": "52.2 - Es accionista de una persona juridica176-Aggregated", "isController": false}, {"data": [[30.0, 1834.3]], "isOverall": false, "label": "27.1 - Guardar Domicilio", "isController": false}, {"data": [[30.0, 1834.3]], "isOverall": false, "label": "27.1 - Guardar Domicilio-Aggregated", "isController": false}, {"data": [[26.0, 975.0], [30.0, 837.75]], "isOverall": false, "label": "58.2 - Grabar Datos de la persona completos", "isController": false}, {"data": [[27.6, 920.0999999999999]], "isOverall": false, "label": "58.2 - Grabar Datos de la persona completos-Aggregated", "isController": false}, {"data": [[30.0, 15048.699999999997]], "isOverall": false, "label": "T.17 - Grabar Datos de la Persona", "isController": true}, {"data": [[30.0, 15048.699999999997]], "isOverall": false, "label": "T.17 - Grabar Datos de la Persona-Aggregated", "isController": true}, {"data": [[30.0, 2287.2]], "isOverall": false, "label": "35.1 - Seleccionar Vinculo o relacion", "isController": false}, {"data": [[30.0, 2287.2]], "isOverall": false, "label": "35.1 - Seleccionar Vinculo o relacion-Aggregated", "isController": false}, {"data": [[30.0, 2673.5]], "isOverall": false, "label": "T.28 - Seleccionar Contactos", "isController": true}, {"data": [[30.0, 2673.5]], "isOverall": false, "label": "T.28 - Seleccionar Contactos-Aggregated", "isController": true}, {"data": [[30.0, 5603.6]], "isOverall": false, "label": "T.48 - maneja persil PYMES", "isController": true}, {"data": [[30.0, 5603.6]], "isOverall": false, "label": "T.48 - maneja persil PYMES-Aggregated", "isController": true}, {"data": [[30.0, 2601.4]], "isOverall": false, "label": "49.1 - Exoneracion de impuesto", "isController": false}, {"data": [[30.0, 2601.4]], "isOverall": false, "label": "49.1 - Exoneracion de impuesto-Aggregated", "isController": false}, {"data": [[25.0, 1510.5], [26.0, 1292.5], [30.0, 751.25]], "isOverall": false, "label": "59.1 - Cerrar Datos de la persona", "isController": false}, {"data": [[27.400000000000002, 1119.6]], "isOverall": false, "label": "59.1 - Cerrar Datos de la persona-Aggregated", "isController": false}, {"data": [[30.0, 790.9999999999999]], "isOverall": false, "label": "39.2 - Guardar Relacion", "isController": false}, {"data": [[30.0, 790.9999999999999]], "isOverall": false, "label": "39.2 - Guardar Relacion-Aggregated", "isController": false}, {"data": [[30.0, 5714.7]], "isOverall": false, "label": "T.24- Buscar Corregimiento", "isController": true}, {"data": [[30.0, 5714.7]], "isOverall": false, "label": "T.24- Buscar Corregimiento-Aggregated", "isController": true}, {"data": [[30.0, 2781.9]], "isOverall": false, "label": "48.1 - maneja persil PYMES", "isController": false}, {"data": [[30.0, 2781.9]], "isOverall": false, "label": "48.1 - maneja persil PYMES-Aggregated", "isController": false}, {"data": [[30.0, 1561.7]], "isOverall": false, "label": "6.7 - Presionar Nuevo Cliente", "isController": false}, {"data": [[30.0, 1561.7]], "isOverall": false, "label": "6.7 - Presionar Nuevo Cliente-Aggregated", "isController": false}, {"data": [[9.0, 106.0], [18.0, 111.0], [22.0, 140.0], [6.0, 100.0], [12.0, 110.0], [25.0, 221.0], [27.0, 113.0], [15.0, 103.0], [30.0, 199.0]], "isOverall": false, "label": "1.2 - Index-0", "isController": false}, {"data": [[17.0, 130.3]], "isOverall": false, "label": "1.2 - Index-0-Aggregated", "isController": false}, {"data": [[30.0, 1864.2]], "isOverall": false, "label": "36.7 - Buscar Beneficiario", "isController": false}, {"data": [[30.0, 1864.2]], "isOverall": false, "label": "36.7 - Buscar Beneficiario-Aggregated", "isController": false}, {"data": [[30.0, 2387.8]], "isOverall": false, "label": "T.42 - Cantidad de Hijos", "isController": true}, {"data": [[30.0, 2387.8]], "isOverall": false, "label": "T.42 - Cantidad de Hijos-Aggregated", "isController": true}, {"data": [[30.0, 2948.8999999999996]], "isOverall": false, "label": "19.1 - Grabar Datos del Cliente", "isController": false}, {"data": [[30.0, 2948.8999999999996]], "isOverall": false, "label": "19.1 - Grabar Datos del Cliente-Aggregated", "isController": false}, {"data": [[22.0, 101.5], [24.0, 250.5], [26.0, 244.0], [27.0, 98.0], [29.0, 103.5], [30.0, 95.0]], "isOverall": false, "label": "60.2 - Cerrar Insis-0", "isController": false}, {"data": [[25.9, 159.2]], "isOverall": false, "label": "60.2 - Cerrar Insis-0-Aggregated", "isController": false}, {"data": [[9.0, 201.0], [18.0, 203.0], [22.0, 257.0], [6.0, 200.0], [12.0, 203.0], [25.0, 217.0], [27.0, 347.0], [15.0, 203.0], [30.0, 434.0]], "isOverall": false, "label": "1.2 - Index-1", "isController": false}, {"data": [[17.0, 246.5]], "isOverall": false, "label": "1.2 - Index-1-Aggregated", "isController": false}, {"data": [[30.0, 2367.7]], "isOverall": false, "label": "43.1 - Estado Civil", "isController": false}, {"data": [[30.0, 2367.7]], "isOverall": false, "label": "43.1 - Estado Civil-Aggregated", "isController": false}, {"data": [[22.0, 204.0], [24.0, 351.0], [26.0, 383.0], [27.0, 335.0], [29.0, 209.5], [30.0, 238.0]], "isOverall": false, "label": "60.2 - Cerrar Insis", "isController": false}, {"data": [[25.9, 286.8]], "isOverall": false, "label": "60.2 - Cerrar Insis-Aggregated", "isController": false}, {"data": [[26.0, 1332.5], [30.0, 1145.0]], "isOverall": false, "label": "57.4 - Cerra Campos Adicionales", "isController": false}, {"data": [[27.6, 1257.5]], "isOverall": false, "label": "57.4 - Cerra Campos Adicionales-Aggregated", "isController": false}, {"data": [[30.0, 2821.7000000000007]], "isOverall": false, "label": "48.2 - maneja persil PYMES", "isController": false}, {"data": [[30.0, 2821.7000000000007]], "isOverall": false, "label": "48.2 - maneja persil PYMES-Aggregated", "isController": false}, {"data": [[22.0, 102.5], [24.0, 100.0], [26.0, 139.0], [27.0, 237.0], [29.0, 105.5], [30.0, 142.0]], "isOverall": false, "label": "60.2 - Cerrar Insis-1", "isController": false}, {"data": [[25.9, 127.30000000000001]], "isOverall": false, "label": "60.2 - Cerrar Insis-1-Aggregated", "isController": false}, {"data": [[30.0, 1889.7]], "isOverall": false, "label": "34.1 - Crear Relacion", "isController": false}, {"data": [[30.0, 1889.7]], "isOverall": false, "label": "34.1 - Crear Relacion-Aggregated", "isController": false}, {"data": [[30.0, 566.2]], "isOverall": false, "label": "27.2 - Guardar Domicilio", "isController": false}, {"data": [[30.0, 566.2]], "isOverall": false, "label": "27.2 - Guardar Domicilio-Aggregated", "isController": false}, {"data": [[9.0, 781.0], [18.0, 863.0], [22.0, 1014.0], [6.0, 1289.0], [12.0, 838.0], [25.0, 969.0], [27.0, 961.0], [15.0, 804.0], [30.0, 1127.0]], "isOverall": false, "label": "T.1 - Index", "isController": true}, {"data": [[17.0, 993.5]], "isOverall": false, "label": "T.1 - Index-Aggregated", "isController": true}, {"data": [[30.0, 2625.2999999999997]], "isOverall": false, "label": "T.44 - Nombre de la empresa", "isController": true}, {"data": [[30.0, 2625.2999999999997]], "isOverall": false, "label": "T.44 - Nombre de la empresa-Aggregated", "isController": true}, {"data": [[16.0, 500.5], [21.0, 702.0], [24.0, 575.0], [30.0, 639.8333333333334]], "isOverall": false, "label": "3.1 - Seleccionar Operaciones del sistema", "isController": false}, {"data": [[25.7, 611.6999999999999]], "isOverall": false, "label": "3.1 - Seleccionar Operaciones del sistema-Aggregated", "isController": false}, {"data": [[18.0, 153.0], [25.0, 315.0], [26.0, 331.0], [30.0, 319.33333333333337]], "isOverall": false, "label": "4.2 - Seleccionar Modulo de Personas", "isController": false}, {"data": [[26.7, 286.8]], "isOverall": false, "label": "4.2 - Seleccionar Modulo de Personas-Aggregated", "isController": false}, {"data": [[30.0, 1299.0]], "isOverall": false, "label": "24.3 - Buscar Corregimiento", "isController": false}, {"data": [[30.0, 1299.0]], "isOverall": false, "label": "24.3 - Buscar Corregimiento-Aggregated", "isController": false}, {"data": [[30.0, 1012.4]], "isOverall": false, "label": "32.2 - Guardar Contactos", "isController": false}, {"data": [[30.0, 1012.4]], "isOverall": false, "label": "32.2 - Guardar Contactos-Aggregated", "isController": false}, {"data": [[30.0, 1825.0]], "isOverall": false, "label": "28.1 - Seleccionar Contactos", "isController": false}, {"data": [[30.0, 1825.0]], "isOverall": false, "label": "28.1 - Seleccionar Contactos-Aggregated", "isController": false}, {"data": [[30.0, 1119.7000000000003]], "isOverall": false, "label": "1541 - Ingresar fecha de nacimiento", "isController": false}, {"data": [[30.0, 1119.7000000000003]], "isOverall": false, "label": "1541 - Ingresar fecha de nacimiento-Aggregated", "isController": false}, {"data": [[30.0, 1749.4]], "isOverall": false, "label": "36.9 - Buscar Beneficiario", "isController": false}, {"data": [[30.0, 1749.4]], "isOverall": false, "label": "36.9 - Buscar Beneficiario-Aggregated", "isController": false}, {"data": [[23.0, 334.0], [24.0, 411.0], [25.0, 592.0], [26.0, 554.0], [27.0, 225.0], [30.0, 378.6666666666667]], "isOverall": false, "label": "59.4 - Cerrar Datos de la persona", "isController": false}, {"data": [[26.5, 421.7]], "isOverall": false, "label": "59.4 - Cerrar Datos de la persona-Aggregated", "isController": false}, {"data": [[30.0, 1766.6999999999998]], "isOverall": false, "label": "8.1 - Ingresar No de Identificacion", "isController": false}, {"data": [[30.0, 1766.6999999999998]], "isOverall": false, "label": "8.1 - Ingresar No de Identificacion-Aggregated", "isController": false}, {"data": [[30.0, 3098.3]], "isOverall": false, "label": "55.2 - Cantidad de Empleados", "isController": false}, {"data": [[30.0, 3098.3]], "isOverall": false, "label": "55.2 - Cantidad de Empleados-Aggregated", "isController": false}, {"data": [[30.0, 1119.7000000000003]], "isOverall": false, "label": "T.14 - Ingresar fecha de nacimiento", "isController": true}, {"data": [[30.0, 1119.7000000000003]], "isOverall": false, "label": "T.14 - Ingresar fecha de nacimiento-Aggregated", "isController": true}, {"data": [[30.0, 1744.4]], "isOverall": false, "label": "31.1 - Ingresar Detalles", "isController": false}, {"data": [[30.0, 1744.4]], "isOverall": false, "label": "31.1 - Ingresar Detalles-Aggregated", "isController": false}, {"data": [[30.0, 2540.2999999999997]], "isOverall": false, "label": "46.1 - Seleccionar si es Extranjero", "isController": false}, {"data": [[30.0, 2540.2999999999997]], "isOverall": false, "label": "46.1 - Seleccionar si es Extranjero-Aggregated", "isController": false}, {"data": [[30.0, 5789.200000000001]], "isOverall": false, "label": "T.46 - Seleccionar si es Extranjero", "isController": true}, {"data": [[30.0, 5789.200000000001]], "isOverall": false, "label": "T.46 - Seleccionar si es Extranjero-Aggregated", "isController": true}, {"data": [[9.0, 307.0], [18.0, 314.0], [22.0, 397.0], [6.0, 300.5], [12.0, 314.0], [25.0, 438.0], [27.0, 460.0], [15.0, 306.0], [30.0, 633.0]], "isOverall": false, "label": "1.2 - Index", "isController": false}, {"data": [[17.0, 377.0]], "isOverall": false, "label": "1.2 - Index-Aggregated", "isController": false}, {"data": [[30.0, 1358.3]], "isOverall": false, "label": "T.20 - Seleccionar Domicilio Crear", "isController": true}, {"data": [[30.0, 1358.3]], "isOverall": false, "label": "T.20 - Seleccionar Domicilio Crear-Aggregated", "isController": true}, {"data": [[30.0, 1421.7]], "isOverall": false, "label": "36.6 - Buscar Beneficiario", "isController": false}, {"data": [[30.0, 1421.7]], "isOverall": false, "label": "36.6 - Buscar Beneficiario-Aggregated", "isController": false}, {"data": [[16.0, 236.0], [10.0, 233.0], [20.0, 429.0], [24.0, 478.0], [13.0, 340.0], [27.0, 596.0], [7.0, 233.0], [30.0, 728.5]], "isOverall": false, "label": "2.1 - Ingresar al Insis-0", "isController": false}, {"data": [[18.4, 423.5]], "isOverall": false, "label": "2.1 - Ingresar al Insis-0-Aggregated", "isController": false}, {"data": [[16.0, 93.0], [10.0, 113.0], [20.0, 120.0], [24.0, 103.0], [13.0, 98.0], [27.0, 108.0], [7.0, 97.0], [30.0, 109.0]], "isOverall": false, "label": "2.1 - Ingresar al Insis-1", "isController": false}, {"data": [[18.4, 104.7]], "isOverall": false, "label": "2.1 - Ingresar al Insis-1-Aggregated", "isController": false}, {"data": [[30.0, 1685.6000000000001]], "isOverall": false, "label": "T.29 - Crear Contactos", "isController": true}, {"data": [[30.0, 1685.6000000000001]], "isOverall": false, "label": "T.29 - Crear Contactos-Aggregated", "isController": true}, {"data": [[30.0, 3346.7]], "isOverall": false, "label": "T.32 - Guardar Contactos", "isController": true}, {"data": [[30.0, 3346.7]], "isOverall": false, "label": "T.32 - Guardar Contactos-Aggregated", "isController": true}, {"data": [[30.0, 2087.9]], "isOverall": false, "label": "40.1 - Seleccionar Campos Adicionales", "isController": false}, {"data": [[30.0, 2087.9]], "isOverall": false, "label": "40.1 - Seleccionar Campos Adicionales-Aggregated", "isController": false}, {"data": [[30.0, 1596.7]], "isOverall": false, "label": "15.1 - Ingresar Pais de Nacimiento", "isController": false}, {"data": [[30.0, 1596.7]], "isOverall": false, "label": "15.1 - Ingresar Pais de Nacimiento-Aggregated", "isController": false}, {"data": [[26.0, 1082.0], [30.0, 1053.75]], "isOverall": false, "label": "58.3 - Grabar Datos de la persona completos", "isController": false}, {"data": [[27.6, 1070.7]], "isOverall": false, "label": "58.3 - Grabar Datos de la persona completos-Aggregated", "isController": false}, {"data": [[21.0, 357.0], [22.0, 350.0], [23.0, 385.0], [24.0, 353.0], [25.0, 454.0], [26.0, 369.0], [27.0, 373.0], [29.0, 595.0], [30.0, 378.0]], "isOverall": false, "label": "60.3 - Cerrar Insis", "isController": false}, {"data": [[25.6, 420.9]], "isOverall": false, "label": "60.3 - Cerrar Insis-Aggregated", "isController": false}, {"data": [[30.0, 2175.1000000000004]], "isOverall": false, "label": "45.1 - Nombre de la empresa", "isController": false}, {"data": [[30.0, 2175.1000000000004]], "isOverall": false, "label": "45.1 - Nombre de la empresa-Aggregated", "isController": false}, {"data": [[30.0, 1353.4]], "isOverall": false, "label": "12.1 - Ingresar Segundo Apellido", "isController": false}, {"data": [[30.0, 1353.4]], "isOverall": false, "label": "12.1 - Ingresar Segundo Apellido-Aggregated", "isController": false}, {"data": [[30.0, 4620.1]], "isOverall": false, "label": "T.50 - Ingresos anuales por actividad principal", "isController": true}, {"data": [[30.0, 4620.1]], "isOverall": false, "label": "T.50 - Ingresos anuales por actividad principal-Aggregated", "isController": true}, {"data": [[30.0, 1528.5]], "isOverall": false, "label": "22.1 - Buscar Corregimiento", "isController": false}, {"data": [[30.0, 1528.5]], "isOverall": false, "label": "22.1 - Buscar Corregimiento-Aggregated", "isController": false}, {"data": [[30.0, 2387.8]], "isOverall": false, "label": "42.1 - Cantidad de Hijos", "isController": false}, {"data": [[30.0, 2387.8]], "isOverall": false, "label": "42.1 - Cantidad de Hijos-Aggregated", "isController": false}, {"data": [[30.0, 2625.2999999999997]], "isOverall": false, "label": "44.1 - Nombre de la empresa", "isController": false}, {"data": [[30.0, 2625.2999999999997]], "isOverall": false, "label": "44.1 - Nombre de la empresa-Aggregated", "isController": false}, {"data": [[30.0, 1212.7999999999997]], "isOverall": false, "label": "T.10 - Ingresar Nombre", "isController": true}, {"data": [[30.0, 1212.7999999999997]], "isOverall": false, "label": "T.10 - Ingresar Nombre-Aggregated", "isController": true}, {"data": [[30.0, 848.5]], "isOverall": false, "label": "28.2 - Seleccionar Contactos", "isController": false}, {"data": [[30.0, 848.5]], "isOverall": false, "label": "28.2 - Seleccionar Contactos-Aggregated", "isController": false}, {"data": [[24.0, 1702.0], [30.0, 2742.25]], "isOverall": false, "label": "5.1 - Seleccionar Clientes", "isController": false}, {"data": [[28.8, 2534.2000000000003]], "isOverall": false, "label": "5.1 - Seleccionar Clientes-Aggregated", "isController": false}, {"data": [[17.0, 361.5], [23.0, 478.0], [24.0, 245.0], [30.0, 374.16666666666663]], "isOverall": false, "label": "3.2 - Seleccionar Operaciones del sistema", "isController": false}, {"data": [[26.1, 369.1]], "isOverall": false, "label": "3.2 - Seleccionar Operaciones del sistema-Aggregated", "isController": false}, {"data": [[30.0, 1576.2]], "isOverall": false, "label": "23.1 - Buscar Corregimiento", "isController": false}, {"data": [[30.0, 1576.2]], "isOverall": false, "label": "23.1 - Buscar Corregimiento-Aggregated", "isController": false}, {"data": [[18.0, 240.0], [24.0, 346.0], [25.0, 323.0], [30.0, 429.1666666666667]], "isOverall": false, "label": "4.1 - Seleccionar Modulo de Personas", "isController": false}, {"data": [[26.5, 372.40000000000003]], "isOverall": false, "label": "4.1 - Seleccionar Modulo de Personas-Aggregated", "isController": false}, {"data": [[30.0, 1353.4]], "isOverall": false, "label": "T.12 - Ingresar Segundo Apellido", "isController": true}, {"data": [[30.0, 1353.4]], "isOverall": false, "label": "T.12 - Ingresar Segundo Apellido-Aggregated", "isController": true}, {"data": [[30.0, 2797.2000000000003]], "isOverall": false, "label": "24.1 - Buscar Corregimiento", "isController": false}, {"data": [[30.0, 2797.2000000000003]], "isOverall": false, "label": "24.1 - Buscar Corregimiento-Aggregated", "isController": false}, {"data": [[30.0, 2354.1]], "isOverall": false, "label": "50.1 - Ingresos anuales por actividad principal", "isController": false}, {"data": [[30.0, 2354.1]], "isOverall": false, "label": "50.1 - Ingresos anuales por actividad principal-Aggregated", "isController": false}, {"data": [[30.0, 1685.6000000000001]], "isOverall": false, "label": "29.1 - Crear Contactos", "isController": false}, {"data": [[30.0, 1685.6000000000001]], "isOverall": false, "label": "29.1 - Crear Contactos-Aggregated", "isController": false}, {"data": [[30.0, 1535.9]], "isOverall": false, "label": "36.4 - Buscar Beneficiario", "isController": false}, {"data": [[30.0, 1535.9]], "isOverall": false, "label": "36.4 - Buscar Beneficiario-Aggregated", "isController": false}, {"data": [[17.0, 862.0], [23.0, 1180.0], [24.0, 820.0], [30.0, 1014.0]], "isOverall": false, "label": "T.3 - Seleccionar Operaciones del sistema", "isController": true}, {"data": [[26.1, 980.8000000000001]], "isOverall": false, "label": "T.3 - Seleccionar Operaciones del sistema-Aggregated", "isController": true}, {"data": [[22.0, 254.0], [24.0, 380.5], [26.0, 377.0], [27.0, 190.0], [29.0, 254.0], [30.0, 231.5]], "isOverall": false, "label": "60.1 - Cerrar Insis-0", "isController": false}, {"data": [[26.0, 293.0]], "isOverall": false, "label": "60.1 - Cerrar Insis-0-Aggregated", "isController": false}, {"data": [[30.0, 1648.6999999999998]], "isOverall": false, "label": "26.1 - Guardar direccion", "isController": false}, {"data": [[30.0, 1648.6999999999998]], "isOverall": false, "label": "26.1 - Guardar direccion-Aggregated", "isController": false}, {"data": [[26.0, 1851.1666666666667], [30.0, 1300.0]], "isOverall": false, "label": "57.5 - Cerra Campos Adicionales", "isController": false}, {"data": [[27.6, 1630.7]], "isOverall": false, "label": "57.5 - Cerra Campos Adicionales-Aggregated", "isController": false}, {"data": [[22.0, 177.0], [24.0, 344.0], [26.0, 396.5], [27.0, 330.0], [29.0, 456.0], [30.0, 192.5]], "isOverall": false, "label": "60.1 - Cerrar Insis-1", "isController": false}, {"data": [[26.0, 300.6]], "isOverall": false, "label": "60.1 - Cerrar Insis-1-Aggregated", "isController": false}, {"data": [[22.0, 196.0], [24.0, 204.0], [26.0, 329.5], [27.0, 500.0], [29.0, 195.0], [30.0, 507.0]], "isOverall": false, "label": "60.1 - Cerrar Insis-2", "isController": false}, {"data": [[26.0, 316.8]], "isOverall": false, "label": "60.1 - Cerrar Insis-2-Aggregated", "isController": false}, {"data": [[30.0, 1589.7]], "isOverall": false, "label": "T.7 - Seleccionar Tipo de Identificacion", "isController": true}, {"data": [[30.0, 1589.7]], "isOverall": false, "label": "T.7 - Seleccionar Tipo de Identificacion-Aggregated", "isController": true}, {"data": [[21.0, 1649.0], [22.0, 1224.0], [23.0, 1653.0], [24.0, 1852.0], [25.0, 2146.0], [26.0, 1917.0], [27.0, 1854.0], [28.0, 1870.0], [29.0, 2214.0], [30.0, 1573.0]], "isOverall": false, "label": "T.60 - Cerrar Insis", "isController": true}, {"data": [[25.5, 1795.1999999999998]], "isOverall": false, "label": "T.60 - Cerrar Insis-Aggregated", "isController": true}, {"data": [[30.0, 1596.7]], "isOverall": false, "label": "T.15 - Ingresar Pais de Nacimiento", "isController": true}, {"data": [[30.0, 1596.7]], "isOverall": false, "label": "T.15 - Ingresar Pais de Nacimiento-Aggregated", "isController": true}, {"data": [[30.0, 3840.1]], "isOverall": false, "label": "T.39 - Guardar Relacion", "isController": true}, {"data": [[30.0, 3840.1]], "isOverall": false, "label": "T.39 - Guardar Relacion-Aggregated", "isController": true}, {"data": [[30.0, 1457.5]], "isOverall": false, "label": "T.30 - Seleccionar Tipo de Contacto", "isController": true}, {"data": [[30.0, 1457.5]], "isOverall": false, "label": "T.30 - Seleccionar Tipo de Contacto-Aggregated", "isController": true}, {"data": [[30.0, 2441.3999999999996]], "isOverall": false, "label": "21.1 - Ingrresar Pais de Residencia-108", "isController": false}, {"data": [[30.0, 2441.3999999999996]], "isOverall": false, "label": "21.1 - Ingrresar Pais de Residencia-108-Aggregated", "isController": false}, {"data": [[30.0, 1084.3]], "isOverall": false, "label": "22.2 - Buscar Corregimiento", "isController": false}, {"data": [[30.0, 1084.3]], "isOverall": false, "label": "22.2 - Buscar Corregimiento-Aggregated", "isController": false}, {"data": [[30.0, 1421.7]], "isOverall": false, "label": "36.1 - Buscar Beneficiario", "isController": false}, {"data": [[30.0, 1421.7]], "isOverall": false, "label": "36.1 - Buscar Beneficiario-Aggregated", "isController": false}, {"data": [[26.0, 3766.0], [30.0, 3251.75]], "isOverall": false, "label": "58.1 - Grabar Datos de la persona completos2", "isController": false}, {"data": [[27.6, 3560.2999999999997]], "isOverall": false, "label": "58.1 - Grabar Datos de la persona completos2-Aggregated", "isController": false}, {"data": [[29.0, 1977.0], [30.0, 3039.444444444444]], "isOverall": false, "label": "56.1 - Grabar Campos Adicionales", "isController": false}, {"data": [[29.9, 2933.1999999999994]], "isOverall": false, "label": "56.1 - Grabar Campos Adicionales-Aggregated", "isController": false}, {"data": [[30.0, 1420.3]], "isOverall": false, "label": "13.1 - Ingresar ocupacion", "isController": false}, {"data": [[30.0, 1420.3]], "isOverall": false, "label": "13.1 - Ingresar ocupacion-Aggregated", "isController": false}, {"data": [[26.0, 1295.0], [30.0, 999.75]], "isOverall": false, "label": "57.3 - Cerra Campos Adicionales", "isController": false}, {"data": [[27.6, 1176.9]], "isOverall": false, "label": "57.3 - Cerra Campos Adicionales-Aggregated", "isController": false}, {"data": [[30.0, 635.3]], "isOverall": false, "label": "6.6 - Presionar Nuevo Cliente", "isController": false}, {"data": [[30.0, 635.3]], "isOverall": false, "label": "6.6 - Presionar Nuevo Cliente-Aggregated", "isController": false}, {"data": [[30.0, 1651.1]], "isOverall": false, "label": "36.2 - Buscar Beneficiario", "isController": false}, {"data": [[30.0, 1651.1]], "isOverall": false, "label": "36.2 - Buscar Beneficiario-Aggregated", "isController": false}, {"data": [[30.0, 1457.5]], "isOverall": false, "label": "30.1 - Seleccionar Tipo de Contacto", "isController": false}, {"data": [[30.0, 1457.5]], "isOverall": false, "label": "30.1 - Seleccionar Tipo de Contacto-Aggregated", "isController": false}, {"data": [[21.0, 222142.0], [22.0, 226414.0], [23.0, 218878.0], [24.0, 216511.0], [25.0, 220673.0], [26.0, 222088.0], [27.0, 201825.0], [28.0, 197815.0], [29.0, 203514.0], [30.0, 200367.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[25.5, 213022.69999999995]], "isOverall": false, "label": "Transaction Controller-Aggregated", "isController": true}, {"data": [[30.0, 3017.1]], "isOverall": false, "label": "T.40 - Seleccionar Campos Adicionales", "isController": true}, {"data": [[30.0, 3017.1]], "isOverall": false, "label": "T.40 - Seleccionar Campos Adicionales-Aggregated", "isController": true}, {"data": [[30.0, 2545.6]], "isOverall": false, "label": "43.2 - Estado Civil", "isController": false}, {"data": [[30.0, 2545.6]], "isOverall": false, "label": "43.2 - Estado Civil-Aggregated", "isController": false}, {"data": [[27.0, 4196.666666666667], [30.0, 4809.000000000001]], "isOverall": false, "label": "T.56 - Grabar Campos Adicionales", "isController": true}, {"data": [[29.099999999999998, 4625.300000000001]], "isOverall": false, "label": "T.56 - Grabar Campos Adicionales-Aggregated", "isController": true}, {"data": [[30.0, 4587.9]], "isOverall": false, "label": "T.53 - Es expuesto politicamente", "isController": true}, {"data": [[30.0, 4587.9]], "isOverall": false, "label": "T.53 - Es expuesto politicamente-Aggregated", "isController": true}, {"data": [[30.0, 1576.2]], "isOverall": false, "label": "T.23 - Buscar Corregimiento", "isController": true}, {"data": [[30.0, 1576.2]], "isOverall": false, "label": "T.23 - Buscar Corregimiento-Aggregated", "isController": true}, {"data": [[30.0, 5379.4]], "isOverall": false, "label": "T.47 - Cargo que ocupa", "isController": true}, {"data": [[30.0, 5379.4]], "isOverall": false, "label": "T.47 - Cargo que ocupa-Aggregated", "isController": true}, {"data": [[30.0, 2287.2]], "isOverall": false, "label": "T.35 - Seleccionar Vinculo o relacion", "isController": true}, {"data": [[30.0, 2287.2]], "isOverall": false, "label": "T.35 - Seleccionar Vinculo o relacion-Aggregated", "isController": true}, {"data": [[30.0, 13997.5]], "isOverall": false, "label": "T.36 - Buscar Beneficiario", "isController": true}, {"data": [[30.0, 13997.5]], "isOverall": false, "label": "T.36 - Buscar Beneficiario-Aggregated", "isController": true}, {"data": [[30.0, 2799.5]], "isOverall": false, "label": "41.4 - Presionar boton Campos Adicionales", "isController": false}, {"data": [[30.0, 2799.5]], "isOverall": false, "label": "41.4 - Presionar boton Campos Adicionales-Aggregated", "isController": false}, {"data": [[30.0, 618.9000000000001]], "isOverall": false, "label": "22.3 - Buscar Corregimiento", "isController": false}, {"data": [[30.0, 618.9000000000001]], "isOverall": false, "label": "22.3 - Buscar Corregimiento-Aggregated", "isController": false}, {"data": [[30.0, 2809.5]], "isOverall": false, "label": "47.1 - Cargo que ocupa", "isController": false}, {"data": [[30.0, 2809.5]], "isOverall": false, "label": "47.1 - Cargo que ocupa-Aggregated", "isController": false}, {"data": [[30.0, 2266.0]], "isOverall": false, "label": "50.2 - Ingresos anuales por actividad principal", "isController": false}, {"data": [[30.0, 2266.0]], "isOverall": false, "label": "50.2 - Ingresos anuales por actividad principal-Aggregated", "isController": false}, {"data": [[30.0, 1539.1]], "isOverall": false, "label": "9.1- Ingresar Fecha de Vencimiento ID", "isController": false}, {"data": [[30.0, 1539.1]], "isOverall": false, "label": "9.1- Ingresar Fecha de Vencimiento ID-Aggregated", "isController": false}, {"data": [[30.0, 2840.0]], "isOverall": false, "label": "49.2 - Exoneracion de impuesto", "isController": false}, {"data": [[30.0, 2840.0]], "isOverall": false, "label": "49.2 - Exoneracion de impuesto-Aggregated", "isController": false}, {"data": [[30.0, 1889.7]], "isOverall": false, "label": "T.34 - Crear Relacion", "isController": true}, {"data": [[30.0, 1889.7]], "isOverall": false, "label": "T.34 - Crear Relacion-Aggregated", "isController": true}, {"data": [[27.0, 1815.3333333333333], [30.0, 1639.2857142857142]], "isOverall": false, "label": "56.2 - Grabar Campos Adicionales", "isController": false}, {"data": [[29.099999999999998, 1692.1]], "isOverall": false, "label": "56.2 - Grabar Campos Adicionales-Aggregated", "isController": false}, {"data": [[22.0, 629.0], [24.0, 930.5], [26.0, 1104.0], [27.0, 1022.0], [29.0, 906.0], [30.0, 934.0]], "isOverall": false, "label": "60.1 - Cerrar Insis", "isController": false}, {"data": [[26.0, 912.3]], "isOverall": false, "label": "60.1 - Cerrar Insis-Aggregated", "isController": false}, {"data": [[25.0, 387.5], [30.0, 467.5]], "isOverall": false, "label": "6.1 - Presionar Nuevo Cliente", "isController": false}, {"data": [[29.0, 451.49999999999994]], "isOverall": false, "label": "6.1 - Presionar Nuevo Cliente-Aggregated", "isController": false}, {"data": [[30.0, 8162.999999999999]], "isOverall": false, "label": "T. 6 - Presionar Nuevo Cliente", "isController": true}, {"data": [[30.0, 8162.999999999999]], "isOverall": false, "label": "T. 6 - Presionar Nuevo Cliente-Aggregated", "isController": true}, {"data": [[30.0, 819.8]], "isOverall": false, "label": "33.2 - Seleccionar Relacion", "isController": false}, {"data": [[30.0, 819.8]], "isOverall": false, "label": "33.2 - Seleccionar Relacion-Aggregated", "isController": false}, {"data": [[30.0, 805.1]], "isOverall": false, "label": "41..3 - Presionar boton Campos Adicionales", "isController": false}, {"data": [[30.0, 805.1]], "isOverall": false, "label": "41..3 - Presionar boton Campos Adicionales-Aggregated", "isController": false}, {"data": [[30.0, 3248.9]], "isOverall": false, "label": "46.2 - Seleccionar si es Extranjero", "isController": false}, {"data": [[30.0, 3248.9]], "isOverall": false, "label": "46.2 - Seleccionar si es Extranjero-Aggregated", "isController": false}, {"data": [[26.0, 2904.3333333333335], [29.0, 1205.0], [30.0, 1937.6666666666665]], "isOverall": false, "label": "57.1 - Cerra Campos Adicionales", "isController": false}, {"data": [[28.7, 2154.3999999999996]], "isOverall": false, "label": "57.1 - Cerra Campos Adicionales-Aggregated", "isController": false}, {"data": [[30.0, 1379.8]], "isOverall": false, "label": "25.1 - Ingresar numero de casa", "isController": false}, {"data": [[30.0, 1379.8]], "isOverall": false, "label": "25.1 - Ingresar numero de casa-Aggregated", "isController": false}, {"data": [[30.0, 5637.8]], "isOverall": false, "label": "T.22 - Buscar Corregimiento", "isController": true}, {"data": [[30.0, 5637.8]], "isOverall": false, "label": "T.22 - Buscar Corregimiento-Aggregated", "isController": true}, {"data": [[30.0, 14424.5]], "isOverall": false, "label": "17.1 - Grabar Datos de la Persona", "isController": false}, {"data": [[30.0, 14424.5]], "isOverall": false, "label": "17.1 - Grabar Datos de la Persona-Aggregated", "isController": false}, {"data": [[30.0, 3573.8]], "isOverall": false, "label": "T.19 - Grabar Datos del Cliente", "isController": true}, {"data": [[30.0, 3573.8]], "isOverall": false, "label": "T.19 - Grabar Datos del Cliente-Aggregated", "isController": true}, {"data": [[30.0, 2177.6]], "isOverall": false, "label": "53.2 - Es expuesto politicamente", "isController": false}, {"data": [[30.0, 2177.6]], "isOverall": false, "label": "53.2 - Es expuesto politicamente-Aggregated", "isController": false}, {"data": [[30.0, 1539.1]], "isOverall": false, "label": "T.9 - Ingresar Fecha de Vencimiento ID", "isController": true}, {"data": [[30.0, 1539.1]], "isOverall": false, "label": "T.9 - Ingresar Fecha de Vencimiento ID-Aggregated", "isController": true}, {"data": [[30.0, 1171.8000000000002]], "isOverall": false, "label": "11.1 - Ingresar Apellido", "isController": false}, {"data": [[30.0, 1171.8000000000002]], "isOverall": false, "label": "11.1 - Ingresar Apellido-Aggregated", "isController": false}, {"data": [[30.0, 852.9999999999999]], "isOverall": false, "label": "22.4 - Buscar Corregimiento", "isController": false}, {"data": [[30.0, 852.9999999999999]], "isOverall": false, "label": "22.4 - Buscar Corregimiento-Aggregated", "isController": false}, {"data": [[19.0, 3468.0], [22.0, 3222.0], [28.0, 4325.0], [15.0, 2728.5], [30.0, 7163.4]], "isOverall": false, "label": "T.2 - Ingresar al Insis", "isController": true}, {"data": [[24.9, 5228.9]], "isOverall": false, "label": "T.2 - Ingresar al Insis-Aggregated", "isController": true}, {"data": [[30.0, 1944.6000000000001]], "isOverall": false, "label": "36.5 - Buscar Beneficiario", "isController": false}, {"data": [[30.0, 1944.6000000000001]], "isOverall": false, "label": "36.5 - Buscar Beneficiario-Aggregated", "isController": false}, {"data": [[30.0, 2400.5]], "isOverall": false, "label": "T.27 - Guardar Domicilio", "isController": true}, {"data": [[30.0, 2400.5]], "isOverall": false, "label": "T.27 - Guardar Domicilio-Aggregated", "isController": true}, {"data": [[30.0, 1589.7]], "isOverall": false, "label": "7.1 - Seleccionar Tipo de Identificacion", "isController": false}, {"data": [[30.0, 1589.7]], "isOverall": false, "label": "7.1 - Seleccionar Tipo de Identificacion-Aggregated", "isController": false}, {"data": [[30.0, 5215.599999999999]], "isOverall": false, "label": "T.51 - Ingresos anuales por otras actividad", "isController": true}, {"data": [[30.0, 5215.599999999999]], "isOverall": false, "label": "T.51 - Ingresos anuales por otras actividad-Aggregated", "isController": true}, {"data": [[18.0, 2718.0], [21.0, 2353.0], [13.0, 1996.0], [27.0, 3603.0], [30.0, 6006.8]], "isOverall": false, "label": "2.2 - Ingresar al Insis", "isController": false}, {"data": [[24.2, 4270.0]], "isOverall": false, "label": "2.2 - Ingresar al Insis-Aggregated", "isController": false}, {"data": [[25.0, 253.5], [30.0, 267.75]], "isOverall": false, "label": "6.2 - Presionar Nuevo Cliente", "isController": false}, {"data": [[29.0, 264.90000000000003]], "isOverall": false, "label": "6.2 - Presionar Nuevo Cliente-Aggregated", "isController": false}, {"data": [[24.0, 1702.0], [30.0, 2742.25]], "isOverall": false, "label": "T.5 - Seleccionar Clientes", "isController": true}, {"data": [[28.8, 2534.2000000000003]], "isOverall": false, "label": "T.5 - Seleccionar Clientes-Aggregated", "isController": true}, {"data": [[30.0, 624.2]], "isOverall": false, "label": "17.2 - Grabar Datos de la Persona", "isController": false}, {"data": [[30.0, 624.2]], "isOverall": false, "label": "17.2 - Grabar Datos de la Persona-Aggregated", "isController": false}, {"data": [[30.0, 1648.6999999999998]], "isOverall": false, "label": "T.26 - Guardar direccion", "isController": true}, {"data": [[30.0, 1648.6999999999998]], "isOverall": false, "label": "T.26 - Guardar direccion-Aggregated", "isController": true}, {"data": [[30.0, 2569.8999999999996]], "isOverall": false, "label": "47.2 - Cargo que ocupa", "isController": false}, {"data": [[30.0, 2569.8999999999996]], "isOverall": false, "label": "47.2 - Cargo que ocupa-Aggregated", "isController": false}, {"data": [[30.0, 6965.900000000001]], "isOverall": false, "label": "T.52- Es accionista de una persona juridica", "isController": true}, {"data": [[30.0, 6965.900000000001]], "isOverall": false, "label": "T.52- Es accionista de una persona juridica-Aggregated", "isController": true}, {"data": [[16.0, 330.0], [10.0, 346.0], [20.0, 550.0], [24.0, 582.0], [13.0, 439.0], [27.0, 704.0], [7.0, 331.0], [30.0, 837.5]], "isOverall": false, "label": "2.1 - Ingresar al Insis", "isController": false}, {"data": [[18.4, 528.8]], "isOverall": false, "label": "2.1 - Ingresar al Insis-Aggregated", "isController": false}, {"data": [[30.0, 624.9]], "isOverall": false, "label": "19.2 - Grabar Datos del Cliente", "isController": false}, {"data": [[30.0, 624.9]], "isOverall": false, "label": "19.2 - Grabar Datos del Cliente-Aggregated", "isController": false}, {"data": [[27.0, 410.0], [30.0, 383.875]], "isOverall": false, "label": "6.3 - Presionar Nuevo Cliente", "isController": false}, {"data": [[29.4, 389.1]], "isOverall": false, "label": "6.3 - Presionar Nuevo Cliente-Aggregated", "isController": false}, {"data": [[30.0, 929.2]], "isOverall": false, "label": "40.2 - Seleccionar Campos Adicionales", "isController": false}, {"data": [[30.0, 929.2]], "isOverall": false, "label": "40.2 - Seleccionar Campos Adicionales-Aggregated", "isController": false}, {"data": [[30.0, 2289.1]], "isOverall": false, "label": "41.1 - Presionar boton Campos Adicionales", "isController": false}, {"data": [[30.0, 2289.1]], "isOverall": false, "label": "41.1 - Presionar boton Campos Adicionales-Aggregated", "isController": false}, {"data": [[21.0, 131.0], [22.0, 116.0], [23.0, 116.0], [24.0, 122.0], [25.0, 212.0], [26.0, 142.0], [27.0, 138.0], [29.0, 290.5], [30.0, 134.0]], "isOverall": false, "label": "60.3 - Cerrar Insis-0", "isController": false}, {"data": [[25.6, 169.20000000000002]], "isOverall": false, "label": "60.3 - Cerrar Insis-0-Aggregated", "isController": false}, {"data": [[30.0, 1379.8]], "isOverall": false, "label": "T.25 - Ingresar numero de casa", "isController": true}, {"data": [[30.0, 1379.8]], "isOverall": false, "label": "T.25 - Ingresar numero de casa-Aggregated", "isController": true}, {"data": [[30.0, 1962.9]], "isOverall": false, "label": "33.1 - Seleccionar Relacion", "isController": false}, {"data": [[30.0, 1962.9]], "isOverall": false, "label": "33.1 - Seleccionar Relacion-Aggregated", "isController": false}, {"data": [[30.0, 3049.1]], "isOverall": false, "label": "39.1 - Guardar Relacion", "isController": false}, {"data": [[30.0, 3049.1]], "isOverall": false, "label": "39.1 - Guardar Relacion-Aggregated", "isController": false}, {"data": [[21.0, 226.0], [22.0, 233.0], [23.0, 269.0], [24.0, 231.0], [25.0, 242.0], [26.0, 227.0], [27.0, 235.0], [29.0, 304.0], [30.0, 244.0]], "isOverall": false, "label": "60.3 - Cerrar Insis-1", "isController": false}, {"data": [[25.6, 251.5]], "isOverall": false, "label": "60.3 - Cerrar Insis-1-Aggregated", "isController": false}, {"data": [[30.0, 4913.3]], "isOverall": false, "label": "T.43 - Estado Civil", "isController": true}, {"data": [[30.0, 4913.3]], "isOverall": false, "label": "T.43 - Estado Civil-Aggregated", "isController": true}, {"data": [[30.0, 1358.3]], "isOverall": false, "label": "20.1 - Seleccionar Domicilio Crear", "isController": false}, {"data": [[30.0, 1358.3]], "isOverall": false, "label": "20.1 - Seleccionar Domicilio Crear-Aggregated", "isController": false}, {"data": [[30.0, 2782.7000000000003]], "isOverall": false, "label": "T.33 - Seleccionar Relacion", "isController": true}, {"data": [[30.0, 2782.7000000000003]], "isOverall": false, "label": "T.33 - Seleccionar Relacion-Aggregated", "isController": true}, {"data": [[30.0, 2456.0]], "isOverall": false, "label": "55.1 - Cantidad de Empleados", "isController": false}, {"data": [[30.0, 2456.0]], "isOverall": false, "label": "55.1 - Cantidad de Empleados-Aggregated", "isController": false}, {"data": [[30.0, 2626.2]], "isOverall": false, "label": "51.1 - Ingresos anuales por otras actividad", "isController": false}, {"data": [[30.0, 2626.2]], "isOverall": false, "label": "51.1 - Ingresos anuales por otras actividad-Aggregated", "isController": false}, {"data": [[30.0, 2404.4]], "isOverall": false, "label": "54.2- Es usted familiar a un colaborador", "isController": false}, {"data": [[30.0, 2404.4]], "isOverall": false, "label": "54.2- Es usted familiar a un colaborador-Aggregated", "isController": false}, {"data": [[26.0, 5823.0], [30.0, 5143.25]], "isOverall": false, "label": "T.58 - Grabar Datos de la persona completos", "isController": true}, {"data": [[27.6, 5551.1]], "isOverall": false, "label": "T.58 - Grabar Datos de la persona completos-Aggregated", "isController": true}, {"data": [[30.0, 1744.4]], "isOverall": false, "label": "T.31 - Ingresar Detalles", "isController": true}, {"data": [[30.0, 1744.4]], "isOverall": false, "label": "T.31 - Ingresar Detalles-Aggregated", "isController": true}, {"data": [[30.0, 2589.4]], "isOverall": false, "label": "51.2 - Ingresos anuales por otras actividad", "isController": false}, {"data": [[30.0, 2589.4]], "isOverall": false, "label": "51.2 - Ingresos anuales por otras actividad-Aggregated", "isController": false}, {"data": [[30.0, 695.2]], "isOverall": false, "label": "T.18 - Ingresar Capacidad Maxima del Cliente", "isController": true}, {"data": [[30.0, 695.2]], "isOverall": false, "label": "T.18 - Ingresar Capacidad Maxima del Cliente-Aggregated", "isController": true}, {"data": [[30.0, 1553.1]], "isOverall": false, "label": "22.5 - Buscar Corregimiento", "isController": false}, {"data": [[30.0, 1553.1]], "isOverall": false, "label": "22.5 - Buscar Corregimiento-Aggregated", "isController": false}, {"data": [[30.0, 4814.900000000001]], "isOverall": false, "label": "T.54 - Es usted familiar a un colaborador", "isController": true}, {"data": [[30.0, 4814.900000000001]], "isOverall": false, "label": "T.54 - Es usted familiar a un colaborador-Aggregated", "isController": true}, {"data": [[19.0, 404.0], [22.0, 430.0], [28.0, 392.0], [15.0, 401.5], [30.0, 454.4]], "isOverall": false, "label": "2.3 - Ingresar al Insis", "isController": false}, {"data": [[24.9, 430.1]], "isOverall": false, "label": "2.3 - Ingresar al Insis-Aggregated", "isController": false}, {"data": [[30.0, 2587.7]], "isOverall": false, "label": "6.4 - Presionar Nuevo Cliente", "isController": false}, {"data": [[30.0, 2587.7]], "isOverall": false, "label": "6.4 - Presionar Nuevo Cliente-Aggregated", "isController": false}, {"data": [[30.0, 7676.300000000001]], "isOverall": false, "label": "T.55 - Cantidad de Empleados", "isController": true}, {"data": [[30.0, 7676.300000000001]], "isOverall": false, "label": "T.55 - Cantidad de Empleados-Aggregated", "isController": true}, {"data": [[30.0, 690.1]], "isOverall": false, "label": "36.3 - Buscar Beneficiario", "isController": false}, {"data": [[30.0, 690.1]], "isOverall": false, "label": "36.3 - Buscar Beneficiario-Aggregated", "isController": false}, {"data": [[21.0, 390.0], [22.0, 110.0], [23.0, 104.0], [24.0, 100.0], [25.0, 134.0], [26.0, 132.0], [27.0, 124.0], [28.0, 385.0], [29.0, 171.0], [30.0, 102.0]], "isOverall": false, "label": "60.4 - Cerrar Insis", "isController": false}, {"data": [[25.5, 175.20000000000005]], "isOverall": false, "label": "60.4 - Cerrar Insis-Aggregated", "isController": false}, {"data": [[30.0, 1212.7999999999997]], "isOverall": false, "label": "10.1 - Ingresar Nombre", "isController": false}, {"data": [[30.0, 1212.7999999999997]], "isOverall": false, "label": "10.1 - Ingresar Nombre-Aggregated", "isController": false}, {"data": [[30.0, 2441.3999999999996]], "isOverall": false, "label": "T.21 - Ingrresar Pais de Residencia", "isController": true}, {"data": [[30.0, 2441.3999999999996]], "isOverall": false, "label": "T.21 - Ingrresar Pais de Residencia-Aggregated", "isController": true}, {"data": [[21.0, 0.0], [22.0, 1.0], [23.0, 0.0], [24.0, 0.0], [25.0, 0.0], [26.0, 0.0], [27.0, 1.0], [28.0, 1.0], [29.0, 0.0], [30.0, 2.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[25.5, 0.5000000000000001]], "isOverall": false, "label": "Debug Sampler-Aggregated", "isController": false}, {"data": [[23.0, 3682.0], [24.0, 3654.0], [25.0, 3778.0], [26.0, 3455.5], [27.0, 2308.0], [30.0, 2552.6666666666665]], "isOverall": false, "label": "T.59 - Cerrar Datos de la persona", "isController": true}, {"data": [[26.5, 3164.5]], "isOverall": false, "label": "T.59 - Cerrar Datos de la persona-Aggregated", "isController": true}, {"data": [[26.0, 9577.5], [30.0, 8180.25]], "isOverall": false, "label": "T.57 - Cerra Campos Adicionales", "isController": true}, {"data": [[27.6, 9018.6]], "isOverall": false, "label": "T.57 - Cerra Campos Adicionales-Aggregated", "isController": true}, {"data": [[30.0, 1766.6999999999998]], "isOverall": false, "label": "T.8 - Ingresar No de Identificacion", "isController": true}, {"data": [[30.0, 1766.6999999999998]], "isOverall": false, "label": "T.8 - Ingresar No de Identificacion-Aggregated", "isController": true}, {"data": [[30.0, 1171.8000000000002]], "isOverall": false, "label": "T.11 - Ingresar Apellido", "isController": true}, {"data": [[30.0, 1171.8000000000002]], "isOverall": false, "label": "T.11 - Ingresar Apellido-Aggregated", "isController": true}, {"data": [[30.0, 1226.3]], "isOverall": false, "label": "16.1 - Ingresar Nacionalidad-96", "isController": false}, {"data": [[30.0, 1226.3]], "isOverall": false, "label": "16.1 - Ingresar Nacionalidad-96-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 30.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 7884.683333333333, "minX": 1.5963567E12, "maxY": 125088.51666666666, "series": [{"data": [[1.59635682E12, 51964.566666666666], [1.5963567E12, 99081.91666666667], [1.59635688E12, 46881.583333333336], [1.59635694E12, 31484.616666666665], [1.59635676E12, 125088.51666666666]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.59635682E12, 35501.066666666666], [1.5963567E12, 14843.533333333333], [1.59635688E12, 36085.38333333333], [1.59635694E12, 7884.683333333333], [1.59635676E12, 37897.816666666666]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59635694E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 0.16666666666666669, "minX": 1.5963567E12, "maxY": 221117.66666666666, "series": [{"data": [[1.59635688E12, 2799.0999999999995]], "isOverall": false, "label": "57.2 - Cerra Campos Adicionales", "isController": false}, {"data": [[1.5963567E12, 659.2]], "isOverall": false, "label": "T.4 - Seleccionar Modulo de Personas", "isController": true}, {"data": [[1.59635676E12, 695.2]], "isOverall": false, "label": "18.1 - Ingresar Capacidad Maxima del Cliente-101", "isController": false}, {"data": [[1.5963567E12, 2272.7999999999997]], "isOverall": false, "label": "6.5 - Presionar Nuevo Cliente", "isController": false}, {"data": [[1.59635688E12, 3815.2000000000003]], "isOverall": false, "label": "52.1 - Es accionista de una persona juridica", "isController": false}, {"data": [[1.59635688E12, 197.75], [1.59635694E12, 441.3333333333333]], "isOverall": false, "label": "59.3 - Cerrar Datos de la persona", "isController": false}, {"data": [[1.59635688E12, 1202.25], [1.59635694E12, 1330.6666666666665]], "isOverall": false, "label": "59.2 - Cerrar Datos de la persona", "isController": false}, {"data": [[1.59635682E12, 1718.8000000000002]], "isOverall": false, "label": "36.8 - Buscar Beneficiario", "isController": false}, {"data": [[1.59635682E12, 5334.25], [1.59635688E12, 5512.833333333334]], "isOverall": false, "label": "T.49 - Exoneracion de impuesto", "isController": true}, {"data": [[1.59635682E12, 2025.3000000000002]], "isOverall": false, "label": "41.2 - Presionar boton Campos Adicionales", "isController": false}, {"data": [[1.59635688E12, 2122.0]], "isOverall": false, "label": "55.3 - Cantidad de Empleados", "isController": false}, {"data": [[1.5963567E12, 616.5]], "isOverall": false, "label": "1.1 - Index", "isController": false}, {"data": [[1.5963567E12, 1643.2], [1.59635676E12, 1197.4]], "isOverall": false, "label": "T.13 - Ingresar ocupacion", "isController": true}, {"data": [[1.59635682E12, 2175.1000000000004]], "isOverall": false, "label": "T.45 - Nombre de la empresa", "isController": true}, {"data": [[1.59635688E12, 2410.3]], "isOverall": false, "label": "53.1 - Es expuesto politicamente", "isController": false}, {"data": [[1.59635688E12, 2410.5]], "isOverall": false, "label": "54.1 - Es usted familiar a un colaborador", "isController": false}, {"data": [[1.59635682E12, 2044.5], [1.59635676E12, 2406.75]], "isOverall": false, "label": "32.1 - Guardar Contactos", "isController": false}, {"data": [[1.5963567E12, 1637.0], [1.59635676E12, 1050.2857142857142]], "isOverall": false, "label": "T.16 - Ingresar Nacionalidad", "isController": true}, {"data": [[1.59635676E12, 1618.5]], "isOverall": false, "label": "24.2 - Buscar Corregimiento", "isController": false}, {"data": [[1.59635682E12, 7919.0]], "isOverall": false, "label": "T.41 - Presionar boton Campos Adicionales", "isController": true}, {"data": [[1.59635688E12, 3150.7000000000003]], "isOverall": false, "label": "52.2 - Es accionista de una persona juridica176", "isController": false}, {"data": [[1.59635676E12, 1834.3]], "isOverall": false, "label": "27.1 - Guardar Domicilio", "isController": false}, {"data": [[1.59635688E12, 837.75], [1.59635694E12, 975.0]], "isOverall": false, "label": "58.2 - Grabar Datos de la persona completos", "isController": false}, {"data": [[1.59635676E12, 15048.699999999997]], "isOverall": false, "label": "T.17 - Grabar Datos de la Persona", "isController": true}, {"data": [[1.59635682E12, 2589.8333333333335], [1.59635676E12, 1833.25]], "isOverall": false, "label": "35.1 - Seleccionar Vinculo o relacion", "isController": false}, {"data": [[1.59635676E12, 2673.5]], "isOverall": false, "label": "T.28 - Seleccionar Contactos", "isController": true}, {"data": [[1.59635682E12, 4381.75], [1.59635688E12, 6418.166666666666]], "isOverall": false, "label": "T.48 - maneja persil PYMES", "isController": true}, {"data": [[1.59635682E12, 2332.25], [1.59635688E12, 2780.8333333333335]], "isOverall": false, "label": "49.1 - Exoneracion de impuesto", "isController": false}, {"data": [[1.59635688E12, 751.25], [1.59635694E12, 1365.1666666666667]], "isOverall": false, "label": "59.1 - Cerrar Datos de la persona", "isController": false}, {"data": [[1.59635682E12, 790.9999999999999]], "isOverall": false, "label": "39.2 - Guardar Relacion", "isController": false}, {"data": [[1.59635676E12, 5714.7]], "isOverall": false, "label": "T.24- Buscar Corregimiento", "isController": true}, {"data": [[1.59635682E12, 2563.0], [1.59635688E12, 3110.25]], "isOverall": false, "label": "48.1 - maneja persil PYMES", "isController": false}, {"data": [[1.5963567E12, 1561.7]], "isOverall": false, "label": "6.7 - Presionar Nuevo Cliente", "isController": false}, {"data": [[1.5963567E12, 130.3]], "isOverall": false, "label": "1.2 - Index-0", "isController": false}, {"data": [[1.59635682E12, 1864.2]], "isOverall": false, "label": "36.7 - Buscar Beneficiario", "isController": false}, {"data": [[1.59635682E12, 2387.8]], "isOverall": false, "label": "T.42 - Cantidad de Hijos", "isController": true}, {"data": [[1.59635676E12, 2948.8999999999996]], "isOverall": false, "label": "19.1 - Grabar Datos del Cliente", "isController": false}, {"data": [[1.59635688E12, 100.0], [1.59635694E12, 198.66666666666669]], "isOverall": false, "label": "60.2 - Cerrar Insis-0", "isController": false}, {"data": [[1.5963567E12, 246.5]], "isOverall": false, "label": "1.2 - Index-1", "isController": false}, {"data": [[1.59635682E12, 2367.7]], "isOverall": false, "label": "43.1 - Estado Civil", "isController": false}, {"data": [[1.59635688E12, 248.0], [1.59635694E12, 312.66666666666663]], "isOverall": false, "label": "60.2 - Cerrar Insis", "isController": false}, {"data": [[1.59635688E12, 1288.75], [1.59635694E12, 1132.5]], "isOverall": false, "label": "57.4 - Cerra Campos Adicionales", "isController": false}, {"data": [[1.59635682E12, 2295.75], [1.59635688E12, 3172.333333333333]], "isOverall": false, "label": "48.2 - maneja persil PYMES", "isController": false}, {"data": [[1.59635688E12, 147.5], [1.59635694E12, 113.83333333333333]], "isOverall": false, "label": "60.2 - Cerrar Insis-1", "isController": false}, {"data": [[1.59635682E12, 1886.3333333333335], [1.59635676E12, 1894.75]], "isOverall": false, "label": "34.1 - Crear Relacion", "isController": false}, {"data": [[1.59635676E12, 566.2]], "isOverall": false, "label": "27.2 - Guardar Domicilio", "isController": false}, {"data": [[1.5963567E12, 993.5]], "isOverall": false, "label": "T.1 - Index", "isController": true}, {"data": [[1.59635682E12, 2625.2999999999997]], "isOverall": false, "label": "T.44 - Nombre de la empresa", "isController": true}, {"data": [[1.5963567E12, 611.6999999999999]], "isOverall": false, "label": "3.1 - Seleccionar Operaciones del sistema", "isController": false}, {"data": [[1.5963567E12, 286.8]], "isOverall": false, "label": "4.2 - Seleccionar Modulo de Personas", "isController": false}, {"data": [[1.59635676E12, 1299.0]], "isOverall": false, "label": "24.3 - Buscar Corregimiento", "isController": false}, {"data": [[1.59635682E12, 967.5], [1.59635676E12, 1023.625]], "isOverall": false, "label": "32.2 - Guardar Contactos", "isController": false}, {"data": [[1.59635676E12, 1825.0]], "isOverall": false, "label": "28.1 - Seleccionar Contactos", "isController": false}, {"data": [[1.5963567E12, 1249.2], [1.59635676E12, 990.2]], "isOverall": false, "label": "1541 - Ingresar fecha de nacimiento", "isController": false}, {"data": [[1.59635682E12, 1749.4]], "isOverall": false, "label": "36.9 - Buscar Beneficiario", "isController": false}, {"data": [[1.59635688E12, 340.25], [1.59635694E12, 476.0]], "isOverall": false, "label": "59.4 - Cerrar Datos de la persona", "isController": false}, {"data": [[1.5963567E12, 1766.6999999999998]], "isOverall": false, "label": "8.1 - Ingresar No de Identificacion", "isController": false}, {"data": [[1.59635688E12, 3098.3]], "isOverall": false, "label": "55.2 - Cantidad de Empleados", "isController": false}, {"data": [[1.5963567E12, 1249.2], [1.59635676E12, 990.2]], "isOverall": false, "label": "T.14 - Ingresar fecha de nacimiento", "isController": true}, {"data": [[1.59635676E12, 1744.4]], "isOverall": false, "label": "31.1 - Ingresar Detalles", "isController": false}, {"data": [[1.59635682E12, 2540.2999999999997]], "isOverall": false, "label": "46.1 - Seleccionar si es Extranjero", "isController": false}, {"data": [[1.59635682E12, 5789.200000000001]], "isOverall": false, "label": "T.46 - Seleccionar si es Extranjero", "isController": true}, {"data": [[1.5963567E12, 377.0]], "isOverall": false, "label": "1.2 - Index", "isController": false}, {"data": [[1.59635676E12, 1358.3]], "isOverall": false, "label": "T.20 - Seleccionar Domicilio Crear", "isController": true}, {"data": [[1.59635682E12, 1421.7]], "isOverall": false, "label": "36.6 - Buscar Beneficiario", "isController": false}, {"data": [[1.5963567E12, 423.5]], "isOverall": false, "label": "2.1 - Ingresar al Insis-0", "isController": false}, {"data": [[1.5963567E12, 104.7]], "isOverall": false, "label": "2.1 - Ingresar al Insis-1", "isController": false}, {"data": [[1.59635676E12, 1685.6000000000001]], "isOverall": false, "label": "T.29 - Crear Contactos", "isController": true}, {"data": [[1.59635682E12, 3012.0], [1.59635676E12, 3430.375]], "isOverall": false, "label": "T.32 - Guardar Contactos", "isController": true}, {"data": [[1.59635682E12, 2087.9]], "isOverall": false, "label": "40.1 - Seleccionar Campos Adicionales", "isController": false}, {"data": [[1.5963567E12, 1579.5], [1.59635676E12, 1608.1666666666665]], "isOverall": false, "label": "15.1 - Ingresar Pais de Nacimiento", "isController": false}, {"data": [[1.59635688E12, 1053.75], [1.59635694E12, 1082.0]], "isOverall": false, "label": "58.3 - Grabar Datos de la persona completos", "isController": false}, {"data": [[1.59635688E12, 485.25], [1.59635694E12, 378.0]], "isOverall": false, "label": "60.3 - Cerrar Insis", "isController": false}, {"data": [[1.59635682E12, 2175.1000000000004]], "isOverall": false, "label": "45.1 - Nombre de la empresa", "isController": false}, {"data": [[1.5963567E12, 1418.142857142857], [1.59635676E12, 1202.3333333333333]], "isOverall": false, "label": "12.1 - Ingresar Segundo Apellido", "isController": false}, {"data": [[1.59635682E12, 5048.0], [1.59635688E12, 4572.555555555555]], "isOverall": false, "label": "T.50 - Ingresos anuales por actividad principal", "isController": true}, {"data": [[1.59635676E12, 1528.5]], "isOverall": false, "label": "22.1 - Buscar Corregimiento", "isController": false}, {"data": [[1.59635682E12, 2387.8]], "isOverall": false, "label": "42.1 - Cantidad de Hijos", "isController": false}, {"data": [[1.59635682E12, 2625.2999999999997]], "isOverall": false, "label": "44.1 - Nombre de la empresa", "isController": false}, {"data": [[1.5963567E12, 1212.7999999999997]], "isOverall": false, "label": "T.10 - Ingresar Nombre", "isController": true}, {"data": [[1.59635676E12, 848.5]], "isOverall": false, "label": "28.2 - Seleccionar Contactos", "isController": false}, {"data": [[1.5963567E12, 2534.2000000000003]], "isOverall": false, "label": "5.1 - Seleccionar Clientes", "isController": false}, {"data": [[1.5963567E12, 369.1]], "isOverall": false, "label": "3.2 - Seleccionar Operaciones del sistema", "isController": false}, {"data": [[1.59635676E12, 1576.2]], "isOverall": false, "label": "23.1 - Buscar Corregimiento", "isController": false}, {"data": [[1.5963567E12, 372.40000000000003]], "isOverall": false, "label": "4.1 - Seleccionar Modulo de Personas", "isController": false}, {"data": [[1.5963567E12, 1418.142857142857], [1.59635676E12, 1202.3333333333333]], "isOverall": false, "label": "T.12 - Ingresar Segundo Apellido", "isController": true}, {"data": [[1.59635676E12, 2797.2000000000003]], "isOverall": false, "label": "24.1 - Buscar Corregimiento", "isController": false}, {"data": [[1.59635682E12, 2211.5], [1.59635688E12, 2449.1666666666665]], "isOverall": false, "label": "50.1 - Ingresos anuales por actividad principal", "isController": false}, {"data": [[1.59635676E12, 1685.6000000000001]], "isOverall": false, "label": "29.1 - Crear Contactos", "isController": false}, {"data": [[1.59635682E12, 1535.9]], "isOverall": false, "label": "36.4 - Buscar Beneficiario", "isController": false}, {"data": [[1.5963567E12, 980.8000000000001]], "isOverall": false, "label": "T.3 - Seleccionar Operaciones del sistema", "isController": true}, {"data": [[1.59635688E12, 226.75], [1.59635694E12, 337.1666666666667]], "isOverall": false, "label": "60.1 - Cerrar Insis-0", "isController": false}, {"data": [[1.59635676E12, 1648.6999999999998]], "isOverall": false, "label": "26.1 - Guardar direccion", "isController": false}, {"data": [[1.59635688E12, 1571.7142857142858], [1.59635694E12, 1768.3333333333333]], "isOverall": false, "label": "57.5 - Cerra Campos Adicionales", "isController": false}, {"data": [[1.59635688E12, 292.75], [1.59635694E12, 305.8333333333333]], "isOverall": false, "label": "60.1 - Cerrar Insis-1", "isController": false}, {"data": [[1.59635688E12, 427.25], [1.59635694E12, 243.16666666666666]], "isOverall": false, "label": "60.1 - Cerrar Insis-2", "isController": false}, {"data": [[1.5963567E12, 1589.7]], "isOverall": false, "label": "T.7 - Seleccionar Tipo de Identificacion", "isController": true}, {"data": [[1.59635688E12, 1877.75], [1.59635694E12, 1740.1666666666667]], "isOverall": false, "label": "T.60 - Cerrar Insis", "isController": true}, {"data": [[1.5963567E12, 1579.5], [1.59635676E12, 1608.1666666666665]], "isOverall": false, "label": "T.15 - Ingresar Pais de Nacimiento", "isController": true}, {"data": [[1.59635682E12, 3840.1]], "isOverall": false, "label": "T.39 - Guardar Relacion", "isController": true}, {"data": [[1.59635676E12, 1457.5]], "isOverall": false, "label": "T.30 - Seleccionar Tipo de Contacto", "isController": true}, {"data": [[1.59635676E12, 2441.3999999999996]], "isOverall": false, "label": "21.1 - Ingrresar Pais de Residencia-108", "isController": false}, {"data": [[1.59635676E12, 1084.3]], "isOverall": false, "label": "22.2 - Buscar Corregimiento", "isController": false}, {"data": [[1.59635682E12, 1462.6666666666667], [1.59635676E12, 1360.25]], "isOverall": false, "label": "36.1 - Buscar Beneficiario", "isController": false}, {"data": [[1.59635688E12, 3251.75], [1.59635694E12, 3766.0]], "isOverall": false, "label": "58.1 - Grabar Datos de la persona completos2", "isController": false}, {"data": [[1.59635688E12, 2933.1999999999994]], "isOverall": false, "label": "56.1 - Grabar Campos Adicionales", "isController": false}, {"data": [[1.5963567E12, 1643.2], [1.59635676E12, 1197.4]], "isOverall": false, "label": "13.1 - Ingresar ocupacion", "isController": false}, {"data": [[1.59635688E12, 1176.9]], "isOverall": false, "label": "57.3 - Cerra Campos Adicionales", "isController": false}, {"data": [[1.5963567E12, 635.3]], "isOverall": false, "label": "6.6 - Presionar Nuevo Cliente", "isController": false}, {"data": [[1.59635682E12, 1705.2857142857142], [1.59635676E12, 1524.6666666666667]], "isOverall": false, "label": "36.2 - Buscar Beneficiario", "isController": false}, {"data": [[1.59635676E12, 1457.5]], "isOverall": false, "label": "30.1 - Seleccionar Tipo de Contacto", "isController": false}, {"data": [[1.59635688E12, 200880.25], [1.59635694E12, 221117.66666666666]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59635682E12, 3017.1]], "isOverall": false, "label": "T.40 - Seleccionar Campos Adicionales", "isController": true}, {"data": [[1.59635682E12, 2545.6]], "isOverall": false, "label": "43.2 - Estado Civil", "isController": false}, {"data": [[1.59635688E12, 4625.300000000001]], "isOverall": false, "label": "T.56 - Grabar Campos Adicionales", "isController": true}, {"data": [[1.59635688E12, 4587.9]], "isOverall": false, "label": "T.53 - Es expuesto politicamente", "isController": true}, {"data": [[1.59635676E12, 1576.2]], "isOverall": false, "label": "T.23 - Buscar Corregimiento", "isController": true}, {"data": [[1.59635682E12, 5204.142857142857], [1.59635688E12, 5788.333333333333]], "isOverall": false, "label": "T.47 - Cargo que ocupa", "isController": true}, {"data": [[1.59635682E12, 2589.8333333333335], [1.59635676E12, 1833.25]], "isOverall": false, "label": "T.35 - Seleccionar Vinculo o relacion", "isController": true}, {"data": [[1.59635682E12, 13997.5]], "isOverall": false, "label": "T.36 - Buscar Beneficiario", "isController": true}, {"data": [[1.59635682E12, 2799.5]], "isOverall": false, "label": "41.4 - Presionar boton Campos Adicionales", "isController": false}, {"data": [[1.59635676E12, 618.9000000000001]], "isOverall": false, "label": "22.3 - Buscar Corregimiento", "isController": false}, {"data": [[1.59635682E12, 2815.0], [1.59635688E12, 2787.5]], "isOverall": false, "label": "47.1 - Cargo que ocupa", "isController": false}, {"data": [[1.59635688E12, 2266.0]], "isOverall": false, "label": "50.2 - Ingresos anuales por actividad principal", "isController": false}, {"data": [[1.5963567E12, 1539.1]], "isOverall": false, "label": "9.1- Ingresar Fecha de Vencimiento ID", "isController": false}, {"data": [[1.59635682E12, 3002.0], [1.59635688E12, 2732.0]], "isOverall": false, "label": "49.2 - Exoneracion de impuesto", "isController": false}, {"data": [[1.59635682E12, 1886.3333333333335], [1.59635676E12, 1894.75]], "isOverall": false, "label": "T.34 - Crear Relacion", "isController": true}, {"data": [[1.59635688E12, 1692.1]], "isOverall": false, "label": "56.2 - Grabar Campos Adicionales", "isController": false}, {"data": [[1.59635688E12, 949.0], [1.59635694E12, 887.8333333333334]], "isOverall": false, "label": "60.1 - Cerrar Insis", "isController": false}, {"data": [[1.5963567E12, 451.49999999999994]], "isOverall": false, "label": "6.1 - Presionar Nuevo Cliente", "isController": false}, {"data": [[1.5963567E12, 8162.999999999999]], "isOverall": false, "label": "T. 6 - Presionar Nuevo Cliente", "isController": true}, {"data": [[1.59635682E12, 754.5], [1.59635676E12, 863.3333333333334]], "isOverall": false, "label": "33.2 - Seleccionar Relacion", "isController": false}, {"data": [[1.59635682E12, 805.1]], "isOverall": false, "label": "41..3 - Presionar boton Campos Adicionales", "isController": false}, {"data": [[1.59635682E12, 3248.9]], "isOverall": false, "label": "46.2 - Seleccionar si es Extranjero", "isController": false}, {"data": [[1.59635688E12, 2154.3999999999996]], "isOverall": false, "label": "57.1 - Cerra Campos Adicionales", "isController": false}, {"data": [[1.59635676E12, 1379.8]], "isOverall": false, "label": "25.1 - Ingresar numero de casa", "isController": false}, {"data": [[1.59635676E12, 5637.8]], "isOverall": false, "label": "T.22 - Buscar Corregimiento", "isController": true}, {"data": [[1.59635676E12, 14424.5]], "isOverall": false, "label": "17.1 - Grabar Datos de la Persona", "isController": false}, {"data": [[1.59635676E12, 3573.8]], "isOverall": false, "label": "T.19 - Grabar Datos del Cliente", "isController": true}, {"data": [[1.59635688E12, 2177.6]], "isOverall": false, "label": "53.2 - Es expuesto politicamente", "isController": false}, {"data": [[1.5963567E12, 1539.1]], "isOverall": false, "label": "T.9 - Ingresar Fecha de Vencimiento ID", "isController": true}, {"data": [[1.5963567E12, 1108.0], [1.59635676E12, 1427.0]], "isOverall": false, "label": "11.1 - Ingresar Apellido", "isController": false}, {"data": [[1.59635676E12, 852.9999999999999]], "isOverall": false, "label": "22.4 - Buscar Corregimiento", "isController": false}, {"data": [[1.5963567E12, 5228.9]], "isOverall": false, "label": "T.2 - Ingresar al Insis", "isController": true}, {"data": [[1.59635682E12, 1944.6000000000001]], "isOverall": false, "label": "36.5 - Buscar Beneficiario", "isController": false}, {"data": [[1.59635676E12, 2400.5]], "isOverall": false, "label": "T.27 - Guardar Domicilio", "isController": true}, {"data": [[1.5963567E12, 1589.7]], "isOverall": false, "label": "7.1 - Seleccionar Tipo de Identificacion", "isController": false}, {"data": [[1.59635688E12, 5215.599999999999]], "isOverall": false, "label": "T.51 - Ingresos anuales por otras actividad", "isController": true}, {"data": [[1.5963567E12, 4270.0]], "isOverall": false, "label": "2.2 - Ingresar al Insis", "isController": false}, {"data": [[1.5963567E12, 264.90000000000003]], "isOverall": false, "label": "6.2 - Presionar Nuevo Cliente", "isController": false}, {"data": [[1.5963567E12, 2534.2000000000003]], "isOverall": false, "label": "T.5 - Seleccionar Clientes", "isController": true}, {"data": [[1.59635676E12, 624.2]], "isOverall": false, "label": "17.2 - Grabar Datos de la Persona", "isController": false}, {"data": [[1.59635676E12, 1648.6999999999998]], "isOverall": false, "label": "T.26 - Guardar direccion", "isController": true}, {"data": [[1.59635682E12, 2472.428571428571], [1.59635688E12, 2797.3333333333335]], "isOverall": false, "label": "47.2 - Cargo que ocupa", "isController": false}, {"data": [[1.59635688E12, 6965.900000000001]], "isOverall": false, "label": "T.52- Es accionista de una persona juridica", "isController": true}, {"data": [[1.5963567E12, 528.8]], "isOverall": false, "label": "2.1 - Ingresar al Insis", "isController": false}, {"data": [[1.59635676E12, 624.9]], "isOverall": false, "label": "19.2 - Grabar Datos del Cliente", "isController": false}, {"data": [[1.5963567E12, 389.1]], "isOverall": false, "label": "6.3 - Presionar Nuevo Cliente", "isController": false}, {"data": [[1.59635682E12, 929.2]], "isOverall": false, "label": "40.2 - Seleccionar Campos Adicionales", "isController": false}, {"data": [[1.59635682E12, 2289.1]], "isOverall": false, "label": "41.1 - Presionar boton Campos Adicionales", "isController": false}, {"data": [[1.59635688E12, 213.25], [1.59635694E12, 139.83333333333331]], "isOverall": false, "label": "60.3 - Cerrar Insis-0", "isController": false}, {"data": [[1.59635676E12, 1379.8]], "isOverall": false, "label": "T.25 - Ingresar numero de casa", "isController": true}, {"data": [[1.59635682E12, 2161.0], [1.59635676E12, 1878.0]], "isOverall": false, "label": "33.1 - Seleccionar Relacion", "isController": false}, {"data": [[1.59635682E12, 3049.1]], "isOverall": false, "label": "39.1 - Guardar Relacion", "isController": false}, {"data": [[1.59635688E12, 271.75], [1.59635694E12, 238.0]], "isOverall": false, "label": "60.3 - Cerrar Insis-1", "isController": false}, {"data": [[1.59635682E12, 4913.3]], "isOverall": false, "label": "T.43 - Estado Civil", "isController": true}, {"data": [[1.59635676E12, 1358.3]], "isOverall": false, "label": "20.1 - Seleccionar Domicilio Crear", "isController": false}, {"data": [[1.59635682E12, 2832.25], [1.59635676E12, 2749.6666666666665]], "isOverall": false, "label": "T.33 - Seleccionar Relacion", "isController": true}, {"data": [[1.59635688E12, 2456.0]], "isOverall": false, "label": "55.1 - Cantidad de Empleados", "isController": false}, {"data": [[1.59635688E12, 2626.2]], "isOverall": false, "label": "51.1 - Ingresos anuales por otras actividad", "isController": false}, {"data": [[1.59635688E12, 2404.4]], "isOverall": false, "label": "54.2- Es usted familiar a un colaborador", "isController": false}, {"data": [[1.59635688E12, 5143.25], [1.59635694E12, 5823.0]], "isOverall": false, "label": "T.58 - Grabar Datos de la persona completos", "isController": true}, {"data": [[1.59635676E12, 1744.4]], "isOverall": false, "label": "T.31 - Ingresar Detalles", "isController": true}, {"data": [[1.59635688E12, 2589.4]], "isOverall": false, "label": "51.2 - Ingresos anuales por otras actividad", "isController": false}, {"data": [[1.59635676E12, 695.2]], "isOverall": false, "label": "T.18 - Ingresar Capacidad Maxima del Cliente", "isController": true}, {"data": [[1.59635676E12, 1553.1]], "isOverall": false, "label": "22.5 - Buscar Corregimiento", "isController": false}, {"data": [[1.59635688E12, 4814.900000000001]], "isOverall": false, "label": "T.54 - Es usted familiar a un colaborador", "isController": true}, {"data": [[1.5963567E12, 430.1]], "isOverall": false, "label": "2.3 - Ingresar al Insis", "isController": false}, {"data": [[1.5963567E12, 2587.7]], "isOverall": false, "label": "6.4 - Presionar Nuevo Cliente", "isController": false}, {"data": [[1.59635688E12, 7676.300000000001]], "isOverall": false, "label": "T.55 - Cantidad de Empleados", "isController": true}, {"data": [[1.59635682E12, 733.375], [1.59635676E12, 517.0]], "isOverall": false, "label": "36.3 - Buscar Beneficiario", "isController": false}, {"data": [[1.59635688E12, 195.5], [1.59635694E12, 161.66666666666666]], "isOverall": false, "label": "60.4 - Cerrar Insis", "isController": false}, {"data": [[1.5963567E12, 1212.7999999999997]], "isOverall": false, "label": "10.1 - Ingresar Nombre", "isController": false}, {"data": [[1.59635676E12, 2441.3999999999996]], "isOverall": false, "label": "T.21 - Ingrresar Pais de Residencia", "isController": true}, {"data": [[1.59635688E12, 1.0], [1.59635694E12, 0.16666666666666669]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59635688E12, 2491.5], [1.59635694E12, 3613.166666666667]], "isOverall": false, "label": "T.59 - Cerrar Datos de la persona", "isController": true}, {"data": [[1.59635688E12, 8720.57142857143], [1.59635694E12, 9714.0]], "isOverall": false, "label": "T.57 - Cerra Campos Adicionales", "isController": true}, {"data": [[1.5963567E12, 1766.6999999999998]], "isOverall": false, "label": "T.8 - Ingresar No de Identificacion", "isController": true}, {"data": [[1.5963567E12, 1108.0], [1.59635676E12, 1427.0]], "isOverall": false, "label": "T.11 - Ingresar Apellido", "isController": true}, {"data": [[1.5963567E12, 1637.0], [1.59635676E12, 1050.2857142857142]], "isOverall": false, "label": "16.1 - Ingresar Nacionalidad-96", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59635694E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.5963567E12, "maxY": 17520.0, "series": [{"data": [[1.59635682E12, 6132.0], [1.5963567E12, 6618.0], [1.59635688E12, 9051.0], [1.59635694E12, 4476.0], [1.59635676E12, 17520.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.59635682E12, 315.0], [1.5963567E12, 92.0], [1.59635688E12, 0.0], [1.59635694E12, 0.0], [1.59635676E12, 312.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.59635682E12, 3166.4], [1.5963567E12, 2228.0000000000005], [1.59635688E12, 3247.5], [1.59635694E12, 1511.0], [1.59635676E12, 2714.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.59635682E12, 3819.2799999999947], [1.5963567E12, 6396.830000000004], [1.59635688E12, 5652.950000000007], [1.59635694E12, 4428.599999999999], [1.59635676E12, 16862.75]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.59635682E12, 3563.7999999999993], [1.5963567E12, 2943.4499999999994], [1.59635688E12, 3453.5], [1.59635694E12, 3109.0], [1.59635676E12, 3255.25]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59635694E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 198.0, "minX": 1.0, "maxY": 11248.0, "series": [{"data": [[8.0, 1709.5], [2.0, 2332.5], [9.0, 1670.5], [10.0, 1238.5], [11.0, 330.0], [12.0, 757.5], [3.0, 2073.0], [13.0, 11248.0], [14.0, 381.5], [15.0, 251.0], [4.0, 1722.5], [1.0, 2214.0], [16.0, 276.0], [17.0, 198.0], [18.0, 363.5], [5.0, 1900.0], [22.0, 417.0], [6.0, 1802.0], [26.0, 226.5], [7.0, 1556.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 26.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 107.0, "minX": 1.0, "maxY": 9967.0, "series": [{"data": [[8.0, 1532.5], [2.0, 2277.5], [9.0, 1322.5], [10.0, 1183.0], [11.0, 129.0], [12.0, 693.0], [3.0, 1945.0], [13.0, 9967.0], [14.0, 187.0], [15.0, 152.0], [4.0, 1661.5], [1.0, 2193.5], [16.0, 229.5], [17.0, 107.0], [18.0, 241.5], [5.0, 1801.0], [22.0, 223.0], [6.0, 1656.0], [26.0, 122.0], [7.0, 1491.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 26.0, "title": "Latencies Vs Request"}},
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
            });
};
