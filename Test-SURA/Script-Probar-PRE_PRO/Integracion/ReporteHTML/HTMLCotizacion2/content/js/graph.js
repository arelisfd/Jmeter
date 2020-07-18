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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 4.0, "series": [{"data": [[4400.0, 1.0], [3200.0, 1.0], [3300.0, 1.0], [3600.0, 1.0], [3800.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -331", "isController": false}, {"data": [[4200.0, 1.0], [3100.0, 1.0], [3200.0, 1.0], [3500.0, 1.0], [3800.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": "Buscar Cedula del Cliente - -234", "isController": false}, {"data": [[600.0, 1.0], [700.0, 2.0]], "isOverall": false, "label": "Buscar Cedula del Cliente - -235", "isController": false}, {"data": [[700.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -333", "isController": false}, {"data": [[1400.0, 2.0], [25300.0, 1.0], [25900.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -291", "isController": false}, {"data": [[600.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -292", "isController": false}, {"data": [[17500.0, 1.0], [18400.0, 1.0], [18500.0, 1.0], [1400.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "Clic Crear Deducible - -347", "isController": false}, {"data": [[800.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Editar Facturacion - -288", "isController": false}, {"data": [[700.0, 1.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Cobertura Siguiente - -344", "isController": false}, {"data": [[8500.0, 1.0], [8300.0, 1.0], [8700.0, 1.0], [9100.0, 2.0], [7900.0, 1.0]], "isOverall": false, "label": "Cobertura Siguiente - -343", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "Index - -203-0", "isController": false}, {"data": [[1300.0, 1.0], [1400.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Ingresar Id Agente - -261", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "Index - -203-1", "isController": false}, {"data": [[1100.0, 1.0], [3100.0, 2.0], [800.0, 2.0], [3500.0, 1.0]], "isOverall": false, "label": "Ingresar Id Agente - -260", "isController": false}, {"data": [[4600.0, 1.0], [4700.0, 1.0], [5100.0, 1.0], [1500.0, 3.0]], "isOverall": false, "label": "Ingresar Id Agente - -252", "isController": false}, {"data": [[300.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "Ingresar Id Agente - -254", "isController": false}, {"data": [[1600.0, 2.0], [1700.0, 1.0]], "isOverall": false, "label": "Ingresar Id Agente - -253", "isController": false}, {"data": [[1300.0, 2.0], [900.0, 4.0]], "isOverall": false, "label": "Ingresar Id Agente - -256", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --406", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "Ingresar Id Agente - -255", "isController": false}, {"data": [[1100.0, 1.0], [1300.0, 1.0], [1600.0, 1.0], [14400.0, 1.0], [15100.0, 1.0], [15900.0, 1.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -269", "isController": false}, {"data": [[8200.0, 1.0], [5500.0, 1.0], [6100.0, 1.0], [6200.0, 1.0], [7400.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --405", "isController": false}, {"data": [[700.0, 1.0], [400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "Ingresar Id Agente - -258", "isController": false}, {"data": [[18700.0, 1.0], [19300.0, 1.0], [18600.0, 1.0], [2700.0, 2.0], [3200.0, 1.0]], "isOverall": false, "label": "Editar Objeto de Cobertura - -337", "isController": false}, {"data": [[2900.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [3200.0, 1.0], [3300.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Ingresar Id Agente - -257", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --407", "isController": false}, {"data": [[600.0, 3.0]], "isOverall": false, "label": "Siguiente 2 - -240", "isController": false}, {"data": [[1400.0, 2.0], [1500.0, 2.0], [1600.0, 2.0]], "isOverall": false, "label": "Editar Objeto de Cobertura - -339", "isController": false}, {"data": [[1200.0, 1.0], [600.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Ingresar Id Agente - -259", "isController": false}, {"data": [[300.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "Index - -203", "isController": false}, {"data": [[1400.0, 1.0], [700.0, 1.0], [400.0, 1.0], [1800.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Index - -202", "isController": false}, {"data": [[2300.0, 1.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Clic Crear Deducible - -349", "isController": false}, {"data": [[1700.0, 2.0], [1800.0, 1.0]], "isOverall": false, "label": "Clic Crear Deducible - -348", "isController": false}, {"data": [[6700.0, 1.0], [6900.0, 2.0], [7400.0, 1.0], [7600.0, 2.0]], "isOverall": false, "label": "Clausulas Siguiente - -372", "isController": false}, {"data": [[600.0, 3.0]], "isOverall": false, "label": "Clausulas Siguiente - -373", "isController": false}, {"data": [[600.0, 1.0], [800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -232", "isController": false}, {"data": [[2400.0, 1.0], [2700.0, 1.0], [2900.0, 1.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -330", "isController": false}, {"data": [[1200.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "Guardar Participante de la Poliza - -316", "isController": false}, {"data": [[5200.0, 1.0], [5600.0, 1.0], [5400.0, 1.0], [6400.0, 1.0], [6500.0, 1.0], [6700.0, 1.0]], "isOverall": false, "label": "Guardar Participante de la Poliza - -315", "isController": false}, {"data": [[1100.0, 3.0]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -282", "isController": false}, {"data": [[1100.0, 1.0], [1300.0, 1.0], [700.0, 1.0], [1500.0, 1.0], [900.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -294", "isController": false}, {"data": [[10200.0, 1.0], [10600.0, 1.0], [11100.0, 1.0], [11400.0, 1.0], [11800.0, 1.0], [12300.0, 1.0]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -281", "isController": false}, {"data": [[400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -295", "isController": false}, {"data": [[300.0, 4.0], [200.0, 2.0]], "isOverall": false, "label": "Clic Menu Control de Polizas - -223", "isController": false}, {"data": [[700.0, 2.0], [900.0, 1.0]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -319", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Login - -207-0", "isController": false}, {"data": [[1200.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "Ingresar Id Agente - -262", "isController": false}, {"data": [[9500.0, 1.0], [9900.0, 1.0], [10100.0, 1.0], [10200.0, 1.0], [10800.0, 2.0]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -318", "isController": false}, {"data": [[4400.0, 1.0], [2400.0, 1.0], [2700.0, 1.0], [3200.0, 1.0], [3600.0, 2.0]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --402", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Login - -207-1", "isController": false}, {"data": [[800.0, 2.0], [900.0, 1.0]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --403", "isController": false}, {"data": [[9200.0, 1.0], [9000.0, 1.0], [9100.0, 1.0], [11900.0, 1.0], [11800.0, 2.0]], "isOverall": false, "label": "Impuestos Siguiente - -370", "isController": false}, {"data": [[2600.0, 1.0], [2700.0, 1.0], [2800.0, 1.0]], "isOverall": false, "label": "Impuestos Siguiente - -371", "isController": false}, {"data": [[8600.0, 2.0], [9300.0, 1.0], [7400.0, 1.0], [7900.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "Siguiente 2 - -238", "isController": false}, {"data": [[900.0, 3.0]], "isOverall": false, "label": "Editar Facturacion - -286", "isController": false}, {"data": [[1200.0, 1.0], [600.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Editar Facturacion - -287", "isController": false}, {"data": [[900.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "Editar Facturacion - -284", "isController": false}, {"data": [[1200.0, 1.0], [1500.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "Editar Facturacion - -285", "isController": false}, {"data": [[1100.0, 1.0], [11000.0, 2.0], [10900.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "Editar Facturacion - -283", "isController": false}, {"data": [[8200.0, 1.0], [7000.0, 1.0], [7400.0, 1.0], [7600.0, 1.0], [7700.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "Descuentos Siguiente - -345", "isController": false}, {"data": [[800.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "Siguiente 3 - -247", "isController": false}, {"data": [[600.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Descuentos Siguiente - -346", "isController": false}, {"data": [[1300.0, 1.0], [1500.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "Siguiente 3 - -249", "isController": false}, {"data": [[11100.0, 2.0], [11700.0, 1.0], [13300.0, 1.0], [13800.0, 1.0], [14300.0, 1.0]], "isOverall": false, "label": "Siguiente 3 - -242", "isController": false}, {"data": [[1400.0, 1.0], [1900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -298", "isController": false}, {"data": [[4200.0, 1.0], [4800.0, 1.0], [1300.0, 1.0], [800.0, 1.0], [1000.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -297", "isController": false}, {"data": [[2100.0, 2.0], [2400.0, 1.0], [20900.0, 1.0], [20700.0, 1.0], [21800.0, 1.0]], "isOverall": false, "label": "Clic Crear Agente - -250", "isController": false}, {"data": [[900.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "Clic Crear Agente - -251", "isController": false}, {"data": [[10400.0, 1.0], [11000.0, 1.0], [11400.0, 1.0], [12600.0, 1.0], [13200.0, 1.0], [13900.0, 1.0]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -362", "isController": false}, {"data": [[400.0, 1.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -341", "isController": false}, {"data": [[4400.0, 1.0], [4900.0, 2.0], [5400.0, 1.0], [5500.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -340", "isController": false}, {"data": [[8800.0, 2.0], [7100.0, 2.0], [7900.0, 2.0]], "isOverall": false, "label": "Calculo de Prima Clic Boton Prima - -378", "isController": false}, {"data": [[2200.0, 1.0], [2400.0, 1.0], [2600.0, 1.0], [2900.0, 1.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Calculo de Prima Guardar - -376", "isController": false}, {"data": [[600.0, 2.0], [700.0, 1.0]], "isOverall": false, "label": "Calculo de Prima Guardar - -377", "isController": false}, {"data": [[1200.0, 1.0], [800.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -336", "isController": false}, {"data": [[4100.0, 1.0], [4400.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -335", "isController": false}, {"data": [[1700.0, 2.0], [7000.0, 1.0], [7400.0, 1.0], [7300.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -334", "isController": false}, {"data": [[2100.0, 2.0], [2400.0, 1.0]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -365", "isController": false}, {"data": [[4600.0, 1.0], [4500.0, 2.0], [3900.0, 1.0], [4000.0, 2.0]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -374", "isController": false}, {"data": [[9100.0, 1.0], [11100.0, 1.0], [11400.0, 1.0]], "isOverall": false, "label": "Login - -209", "isController": false}, {"data": [[600.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -375", "isController": false}, {"data": [[9900.0, 1.0], [700.0, 1.0], [1400.0, 1.0], [11600.0, 1.0], [400.0, 1.0], [12800.0, 1.0]], "isOverall": false, "label": "Login - -207", "isController": false}, {"data": [[330600.0, 1.0], [332300.0, 1.0], [330700.0, 1.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[2200.0, 2.0], [1500.0, 2.0], [2000.0, 2.0]], "isOverall": false, "label": "Agregar Participante de la Poliza - -312", "isController": false}, {"data": [[4800.0, 1.0], [4700.0, 1.0], [4900.0, 1.0], [27400.0, 1.0], [27700.0, 1.0], [29500.0, 1.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -320", "isController": false}, {"data": [[2700.0, 1.0], [3100.0, 1.0], [3400.0, 1.0]], "isOverall": false, "label": "Deducible Siguiente - -360", "isController": false}, {"data": [[600.0, 1.0], [700.0, 2.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -324", "isController": false}, {"data": [[2100.0, 1.0], [2500.0, 2.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -322", "isController": false}, {"data": [[700.0, 2.0], [500.0, 4.0]], "isOverall": false, "label": "Clic Menu Operaciones del Sistema - -222", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -321", "isController": false}, {"data": [[1200.0, 2.0], [1400.0, 1.0]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -367", "isController": false}, {"data": [[2300.0, 1.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -326", "isController": false}, {"data": [[1400.0, 1.0], [1500.0, 1.0], [1700.0, 1.0], [3500.0, 1.0], [3700.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -325", "isController": false}, {"data": [[4900.0, 1.0], [5100.0, 1.0], [5000.0, 1.0], [5600.0, 1.0], [5800.0, 1.0], [5900.0, 1.0]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -224", "isController": false}, {"data": [[1100.0, 1.0], [5000.0, 1.0], [1600.0, 1.0], [3900.0, 1.0], [2000.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -329", "isController": false}, {"data": [[8400.0, 1.0], [8200.0, 1.0], [8600.0, 1.0], [6900.0, 1.0], [7100.0, 1.0], [7200.0, 1.0]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -366", "isController": false}, {"data": [[1200.0, 1.0], [700.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --409", "isController": false}, {"data": [[700.0, 2.0], [900.0, 4.0]], "isOverall": false, "label": "Ingresar Cedula del Cliente - -233", "isController": false}, {"data": [[1200.0, 1.0], [800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -306", "isController": false}, {"data": [[1100.0, 1.0], [4500.0, 1.0], [4400.0, 1.0], [1200.0, 1.0], [5000.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -307", "isController": false}, {"data": [[700.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -305", "isController": false}, {"data": [[1800.0, 1.0], [1900.0, 2.0]], "isOverall": false, "label": "Clic Crear Deducible - -352", "isController": false}, {"data": [[700.0, 3.0]], "isOverall": false, "label": "Guardar Facturacion - -290", "isController": false}, {"data": [[2100.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "Clic Crear Deducible - -351", "isController": false}, {"data": [[1700.0, 1.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -308", "isController": false}, {"data": [[1100.0, 1.0], [2400.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "Clic Crear Deducible - -354", "isController": false}, {"data": [[1400.0, 1.0], [1500.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -309", "isController": false}, {"data": [[5500.0, 1.0], [5400.0, 1.0], [5600.0, 1.0], [3700.0, 1.0], [3900.0, 2.0]], "isOverall": false, "label": "Guardar Agente - -263", "isController": false}, {"data": [[2200.0, 1.0], [1800.0, 2.0]], "isOverall": false, "label": "Clic Crear Deducible - -350", "isController": false}, {"data": [[8400.0, 1.0], [8800.0, 1.0], [9500.0, 1.0], [11500.0, 1.0], [12200.0, 1.0], [12300.0, 1.0]], "isOverall": false, "label": "Deducible Siguiente - -357", "isController": false}, {"data": [[1400.0, 1.0], [1600.0, 2.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -271", "isController": false}, {"data": [[300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -272", "isController": false}, {"data": [[700.0, 1.0], [800.0, 2.0]], "isOverall": false, "label": "Guardar Agente - -267", "isController": false}, {"data": [[800.0, 2.0], [900.0, 1.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -273", "isController": false}, {"data": [[1100.0, 1.0], [1500.0, 1.0], [1800.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --408", "isController": false}, {"data": [[1500.0, 2.0], [1600.0, 1.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -274", "isController": false}, {"data": [[8400.0, 1.0], [8500.0, 1.0], [8700.0, 1.0], [9800.0, 1.0], [10000.0, 1.0], [7300.0, 1.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -275", "isController": false}, {"data": [[600.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "Guardar Agente - -268", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "Login - -209-0", "isController": false}, {"data": [[1300.0, 2.0], [1400.0, 1.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -278", "isController": false}, {"data": [[9000.0, 1.0], [11000.0, 1.0], [11200.0, 1.0]], "isOverall": false, "label": "Login - -209-1", "isController": false}, {"data": [[4100.0, 1.0], [4600.0, 1.0], [4700.0, 1.0], [700.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -302", "isController": false}, {"data": [[1700.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -303", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -300", "isController": false}, {"data": [[4100.0, 2.0], [4400.0, 1.0], [4800.0, 2.0], [3700.0, 1.0]], "isOverall": false, "label": "Guardar Facturacion - -289", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 1.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -301", "isController": false}, {"data": [[8200.0, 1.0], [6800.0, 1.0], [7100.0, 1.0], [7200.0, 1.0], [7600.0, 1.0], [7900.0, 1.0]], "isOverall": false, "label": "Comisiones Siguiente - -368", "isController": false}, {"data": [[700.0, 1.0], [800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Comisiones Siguiente - -369", "isController": false}, {"data": [[600.0, 1.0], [1300.0, 2.0]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -384", "isController": false}, {"data": [[8900.0, 2.0], [9300.0, 2.0], [9500.0, 2.0]], "isOverall": false, "label": "Prima Objeto de Cobertura - -342", "isController": false}, {"data": [[1300.0, 1.0], [1400.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -382", "isController": false}, {"data": [[8700.0, 1.0], [8900.0, 1.0], [8800.0, 1.0], [9500.0, 1.0], [9700.0, 1.0], [9800.0, 1.0]], "isOverall": false, "label": "Siguiente - -236", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Guardar Deducible - -356", "isController": false}, {"data": [[700.0, 1.0], [800.0, 2.0]], "isOverall": false, "label": "Siguiente - -237", "isController": false}, {"data": [[4500.0, 1.0], [4600.0, 1.0], [5100.0, 2.0], [5900.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "Guardar Deducible - -355", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[4100.0, 1.0], [4500.0, 1.0], [5600.0, 1.0], [3500.0, 1.0], [7100.0, 1.0], [7200.0, 1.0]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -379", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 332300.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 35.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 190.0, "series": [{"data": [[0.0, 35.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 190.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 183.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 2.8505747126436787, "minX": 1.59499386E12, "maxY": 3.0, "series": [{"data": [[1.59499398E12, 3.0], [1.5949941E12, 3.0], [1.59499392E12, 3.0], [1.59499404E12, 3.0], [1.59499386E12, 2.9777777777777774], [1.59499416E12, 2.8505747126436787]], "isOverall": false, "label": "2- Thread Group_Cotizacion", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59499416E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 7.0, "maxY": 332305.0, "series": [{"data": [[9.0, 3792.166666666667]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -331", "isController": false}, {"data": [[9.0, 3792.166666666667]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -331-Aggregated", "isController": false}, {"data": [[11.0, 3664.1666666666665]], "isOverall": false, "label": "Buscar Cedula del Cliente - -234", "isController": false}, {"data": [[11.0, 3664.1666666666665]], "isOverall": false, "label": "Buscar Cedula del Cliente - -234-Aggregated", "isController": false}, {"data": [[11.0, 713.6666666666666]], "isOverall": false, "label": "Buscar Cedula del Cliente - -235", "isController": false}, {"data": [[11.0, 713.6666666666666]], "isOverall": false, "label": "Buscar Cedula del Cliente - -235-Aggregated", "isController": false}, {"data": [[9.0, 697.6666666666666]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -333", "isController": false}, {"data": [[9.0, 697.6666666666666]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -333-Aggregated", "isController": false}, {"data": [[9.0, 13513.833333333334]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -291", "isController": false}, {"data": [[9.0, 13513.833333333334]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -291-Aggregated", "isController": false}, {"data": [[9.0, 857.0]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -292", "isController": false}, {"data": [[9.0, 857.0]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -292-Aggregated", "isController": false}, {"data": [[9.0, 9758.833333333334]], "isOverall": false, "label": "Clic Crear Deducible - -347", "isController": false}, {"data": [[9.0, 9758.833333333334]], "isOverall": false, "label": "Clic Crear Deducible - -347-Aggregated", "isController": false}, {"data": [[9.0, 965.6666666666666]], "isOverall": false, "label": "Editar Facturacion - -288", "isController": false}, {"data": [[9.0, 965.6666666666666]], "isOverall": false, "label": "Editar Facturacion - -288-Aggregated", "isController": false}, {"data": [[9.0, 719.6666666666666]], "isOverall": false, "label": "Cobertura Siguiente - -344", "isController": false}, {"data": [[9.0, 719.6666666666666]], "isOverall": false, "label": "Cobertura Siguiente - -344-Aggregated", "isController": false}, {"data": [[9.0, 8622.833333333332]], "isOverall": false, "label": "Cobertura Siguiente - -343", "isController": false}, {"data": [[9.0, 8622.833333333332]], "isOverall": false, "label": "Cobertura Siguiente - -343-Aggregated", "isController": false}, {"data": [[10.0, 192.0], [11.0, 134.0]], "isOverall": false, "label": "Index - -203-0", "isController": false}, {"data": [[10.333333333333334, 172.66666666666666]], "isOverall": false, "label": "Index - -203-0-Aggregated", "isController": false}, {"data": [[11.0, 1239.0]], "isOverall": false, "label": "Ingresar Id Agente - -261", "isController": false}, {"data": [[11.0, 1239.0]], "isOverall": false, "label": "Ingresar Id Agente - -261-Aggregated", "isController": false}, {"data": [[10.0, 219.0], [11.0, 224.0]], "isOverall": false, "label": "Index - -203-1", "isController": false}, {"data": [[10.333333333333334, 220.66666666666666]], "isOverall": false, "label": "Index - -203-1-Aggregated", "isController": false}, {"data": [[11.0, 2112.6666666666665]], "isOverall": false, "label": "Ingresar Id Agente - -260", "isController": false}, {"data": [[11.0, 2112.6666666666665]], "isOverall": false, "label": "Ingresar Id Agente - -260-Aggregated", "isController": false}, {"data": [[11.0, 3194.666666666667]], "isOverall": false, "label": "Ingresar Id Agente - -252", "isController": false}, {"data": [[11.0, 3194.666666666667]], "isOverall": false, "label": "Ingresar Id Agente - -252-Aggregated", "isController": false}, {"data": [[11.0, 313.3333333333333]], "isOverall": false, "label": "Ingresar Id Agente - -254", "isController": false}, {"data": [[11.0, 313.3333333333333]], "isOverall": false, "label": "Ingresar Id Agente - -254-Aggregated", "isController": false}, {"data": [[11.0, 1706.0]], "isOverall": false, "label": "Ingresar Id Agente - -253", "isController": false}, {"data": [[11.0, 1706.0]], "isOverall": false, "label": "Ingresar Id Agente - -253-Aggregated", "isController": false}, {"data": [[11.0, 1074.6666666666667]], "isOverall": false, "label": "Ingresar Id Agente - -256", "isController": false}, {"data": [[11.0, 1074.6666666666667]], "isOverall": false, "label": "Ingresar Id Agente - -256-Aggregated", "isController": false}, {"data": [[9.0, 1163.3333333333333]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --406", "isController": false}, {"data": [[9.0, 1163.3333333333333]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --406-Aggregated", "isController": false}, {"data": [[11.0, 1324.6666666666667]], "isOverall": false, "label": "Ingresar Id Agente - -255", "isController": false}, {"data": [[11.0, 1324.6666666666667]], "isOverall": false, "label": "Ingresar Id Agente - -255-Aggregated", "isController": false}, {"data": [[11.0, 8294.833333333334]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -269", "isController": false}, {"data": [[11.0, 8294.833333333334]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -269-Aggregated", "isController": false}, {"data": [[9.0, 6956.0]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --405", "isController": false}, {"data": [[9.0, 6956.0]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --405-Aggregated", "isController": false}, {"data": [[11.0, 479.0]], "isOverall": false, "label": "Ingresar Id Agente - -258", "isController": false}, {"data": [[11.0, 479.0]], "isOverall": false, "label": "Ingresar Id Agente - -258-Aggregated", "isController": false}, {"data": [[9.0, 10940.833333333334]], "isOverall": false, "label": "Editar Objeto de Cobertura - -337", "isController": false}, {"data": [[9.0, 10940.833333333334]], "isOverall": false, "label": "Editar Objeto de Cobertura - -337-Aggregated", "isController": false}, {"data": [[11.0, 2421.166666666667]], "isOverall": false, "label": "Ingresar Id Agente - -257", "isController": false}, {"data": [[11.0, 2421.166666666667]], "isOverall": false, "label": "Ingresar Id Agente - -257-Aggregated", "isController": false}, {"data": [[9.0, 779.3333333333334]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --407", "isController": false}, {"data": [[9.0, 779.3333333333334]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --407-Aggregated", "isController": false}, {"data": [[11.0, 669.6666666666666]], "isOverall": false, "label": "Siguiente 2 - -240", "isController": false}, {"data": [[11.0, 669.6666666666666]], "isOverall": false, "label": "Siguiente 2 - -240-Aggregated", "isController": false}, {"data": [[9.0, 1547.6666666666667]], "isOverall": false, "label": "Editar Objeto de Cobertura - -339", "isController": false}, {"data": [[9.0, 1547.6666666666667]], "isOverall": false, "label": "Editar Objeto de Cobertura - -339-Aggregated", "isController": false}, {"data": [[11.0, 1018.0]], "isOverall": false, "label": "Ingresar Id Agente - -259", "isController": false}, {"data": [[11.0, 1018.0]], "isOverall": false, "label": "Ingresar Id Agente - -259-Aggregated", "isController": false}, {"data": [[10.0, 413.0], [11.0, 358.0]], "isOverall": false, "label": "Index - -203", "isController": false}, {"data": [[10.333333333333334, 394.6666666666667]], "isOverall": false, "label": "Index - -203-Aggregated", "isController": false}, {"data": [[8.0, 1001.5], [10.0, 1414.5], [11.0, 580.0]], "isOverall": false, "label": "Index - -202", "isController": false}, {"data": [[9.666666666666668, 998.6666666666666]], "isOverall": false, "label": "Index - -202-Aggregated", "isController": false}, {"data": [[9.0, 2087.0]], "isOverall": false, "label": "Clic Crear Deducible - -349", "isController": false}, {"data": [[9.0, 2087.0]], "isOverall": false, "label": "Clic Crear Deducible - -349-Aggregated", "isController": false}, {"data": [[9.0, 1810.3333333333333]], "isOverall": false, "label": "Clic Crear Deducible - -348", "isController": false}, {"data": [[9.0, 1810.3333333333333]], "isOverall": false, "label": "Clic Crear Deducible - -348-Aggregated", "isController": false}, {"data": [[9.0, 7230.666666666667]], "isOverall": false, "label": "Clausulas Siguiente - -372", "isController": false}, {"data": [[9.0, 7230.666666666667]], "isOverall": false, "label": "Clausulas Siguiente - -372-Aggregated", "isController": false}, {"data": [[9.0, 666.6666666666666]], "isOverall": false, "label": "Clausulas Siguiente - -373", "isController": false}, {"data": [[9.0, 666.6666666666666]], "isOverall": false, "label": "Clausulas Siguiente - -373-Aggregated", "isController": false}, {"data": [[11.0, 798.0]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -232", "isController": false}, {"data": [[11.0, 798.0]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -232-Aggregated", "isController": false}, {"data": [[9.0, 2735.6666666666665]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -330", "isController": false}, {"data": [[9.0, 2735.6666666666665]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -330-Aggregated", "isController": false}, {"data": [[9.0, 1118.0]], "isOverall": false, "label": "Guardar Participante de la Poliza - -316", "isController": false}, {"data": [[9.0, 1118.0]], "isOverall": false, "label": "Guardar Participante de la Poliza - -316-Aggregated", "isController": false}, {"data": [[9.0, 6007.333333333334]], "isOverall": false, "label": "Guardar Participante de la Poliza - -315", "isController": false}, {"data": [[9.0, 6007.333333333334]], "isOverall": false, "label": "Guardar Participante de la Poliza - -315-Aggregated", "isController": false}, {"data": [[9.0, 1147.0]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -282", "isController": false}, {"data": [[9.0, 1147.0]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -282-Aggregated", "isController": false}, {"data": [[9.0, 1287.8333333333335]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -294", "isController": false}, {"data": [[9.0, 1287.8333333333335]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -294-Aggregated", "isController": false}, {"data": [[9.0, 11312.2], [11.0, 11144.0]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -281", "isController": false}, {"data": [[9.333333333333334, 11284.166666666666]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -281-Aggregated", "isController": false}, {"data": [[9.0, 524.3333333333334]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -295", "isController": false}, {"data": [[9.0, 524.3333333333334]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -295-Aggregated", "isController": false}, {"data": [[11.0, 321.6666666666667]], "isOverall": false, "label": "Clic Menu Control de Polizas - -223", "isController": false}, {"data": [[11.0, 321.6666666666667]], "isOverall": false, "label": "Clic Menu Control de Polizas - -223-Aggregated", "isController": false}, {"data": [[9.0, 819.0]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -319", "isController": false}, {"data": [[9.0, 819.0]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -319-Aggregated", "isController": false}, {"data": [[11.0, 631.0]], "isOverall": false, "label": "Login - -207-0", "isController": false}, {"data": [[11.0, 631.0]], "isOverall": false, "label": "Login - -207-0-Aggregated", "isController": false}, {"data": [[11.0, 1071.6666666666667]], "isOverall": false, "label": "Ingresar Id Agente - -262", "isController": false}, {"data": [[11.0, 1071.6666666666667]], "isOverall": false, "label": "Ingresar Id Agente - -262-Aggregated", "isController": false}, {"data": [[9.0, 10269.5]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -318", "isController": false}, {"data": [[9.0, 10269.5]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -318-Aggregated", "isController": false}, {"data": [[9.0, 3364.166666666667]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --402", "isController": false}, {"data": [[9.0, 3364.166666666667]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --402-Aggregated", "isController": false}, {"data": [[11.0, 245.66666666666666]], "isOverall": false, "label": "Login - -207-1", "isController": false}, {"data": [[11.0, 245.66666666666666]], "isOverall": false, "label": "Login - -207-1-Aggregated", "isController": false}, {"data": [[9.0, 874.3333333333334]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --403", "isController": false}, {"data": [[9.0, 874.3333333333334]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --403-Aggregated", "isController": false}, {"data": [[9.0, 10504.5]], "isOverall": false, "label": "Impuestos Siguiente - -370", "isController": false}, {"data": [[9.0, 10504.5]], "isOverall": false, "label": "Impuestos Siguiente - -370-Aggregated", "isController": false}, {"data": [[9.0, 2737.0]], "isOverall": false, "label": "Impuestos Siguiente - -371", "isController": false}, {"data": [[9.0, 2737.0]], "isOverall": false, "label": "Impuestos Siguiente - -371-Aggregated", "isController": false}, {"data": [[11.0, 8367.5]], "isOverall": false, "label": "Siguiente 2 - -238", "isController": false}, {"data": [[11.0, 8367.5]], "isOverall": false, "label": "Siguiente 2 - -238-Aggregated", "isController": false}, {"data": [[9.0, 956.6666666666666]], "isOverall": false, "label": "Editar Facturacion - -286", "isController": false}, {"data": [[9.0, 956.6666666666666]], "isOverall": false, "label": "Editar Facturacion - -286-Aggregated", "isController": false}, {"data": [[9.0, 914.0]], "isOverall": false, "label": "Editar Facturacion - -287", "isController": false}, {"data": [[9.0, 914.0]], "isOverall": false, "label": "Editar Facturacion - -287-Aggregated", "isController": false}, {"data": [[9.0, 953.0]], "isOverall": false, "label": "Editar Facturacion - -284", "isController": false}, {"data": [[9.0, 953.0]], "isOverall": false, "label": "Editar Facturacion - -284-Aggregated", "isController": false}, {"data": [[9.0, 1468.6666666666667]], "isOverall": false, "label": "Editar Facturacion - -285", "isController": false}, {"data": [[9.0, 1468.6666666666667]], "isOverall": false, "label": "Editar Facturacion - -285-Aggregated", "isController": false}, {"data": [[9.0, 6039.5]], "isOverall": false, "label": "Editar Facturacion - -283", "isController": false}, {"data": [[9.0, 6039.5]], "isOverall": false, "label": "Editar Facturacion - -283-Aggregated", "isController": false}, {"data": [[9.0, 7720.666666666667]], "isOverall": false, "label": "Descuentos Siguiente - -345", "isController": false}, {"data": [[9.0, 7720.666666666667]], "isOverall": false, "label": "Descuentos Siguiente - -345-Aggregated", "isController": false}, {"data": [[11.0, 945.0]], "isOverall": false, "label": "Siguiente 3 - -247", "isController": false}, {"data": [[11.0, 945.0]], "isOverall": false, "label": "Siguiente 3 - -247-Aggregated", "isController": false}, {"data": [[9.0, 608.0]], "isOverall": false, "label": "Descuentos Siguiente - -346", "isController": false}, {"data": [[9.0, 608.0]], "isOverall": false, "label": "Descuentos Siguiente - -346-Aggregated", "isController": false}, {"data": [[11.0, 1513.6666666666667]], "isOverall": false, "label": "Siguiente 3 - -249", "isController": false}, {"data": [[11.0, 1513.6666666666667]], "isOverall": false, "label": "Siguiente 3 - -249-Aggregated", "isController": false}, {"data": [[11.0, 12597.333333333332]], "isOverall": false, "label": "Siguiente 3 - -242", "isController": false}, {"data": [[11.0, 12597.333333333332]], "isOverall": false, "label": "Siguiente 3 - -242-Aggregated", "isController": false}, {"data": [[9.0, 1496.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -298", "isController": false}, {"data": [[9.0, 1496.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -298-Aggregated", "isController": false}, {"data": [[9.0, 2716.333333333333]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -297", "isController": false}, {"data": [[9.0, 2716.333333333333]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -297-Aggregated", "isController": false}, {"data": [[11.0, 11705.0]], "isOverall": false, "label": "Clic Crear Agente - -250", "isController": false}, {"data": [[11.0, 11705.0]], "isOverall": false, "label": "Clic Crear Agente - -250-Aggregated", "isController": false}, {"data": [[11.0, 1014.6666666666666]], "isOverall": false, "label": "Clic Crear Agente - -251", "isController": false}, {"data": [[11.0, 1014.6666666666666]], "isOverall": false, "label": "Clic Crear Agente - -251-Aggregated", "isController": false}, {"data": [[9.0, 12147.5]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -362", "isController": false}, {"data": [[9.0, 12147.5]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -362-Aggregated", "isController": false}, {"data": [[9.0, 618.0]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -341", "isController": false}, {"data": [[9.0, 618.0]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -341-Aggregated", "isController": false}, {"data": [[9.0, 4818.666666666667]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -340", "isController": false}, {"data": [[9.0, 4818.666666666667]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -340-Aggregated", "isController": false}, {"data": [[9.0, 8004.666666666666]], "isOverall": false, "label": "Calculo de Prima Clic Boton Prima - -378", "isController": false}, {"data": [[9.0, 8004.666666666666]], "isOverall": false, "label": "Calculo de Prima Clic Boton Prima - -378-Aggregated", "isController": false}, {"data": [[9.0, 2347.6666666666665]], "isOverall": false, "label": "Calculo de Prima Guardar - -376", "isController": false}, {"data": [[9.0, 2347.6666666666665]], "isOverall": false, "label": "Calculo de Prima Guardar - -376-Aggregated", "isController": false}, {"data": [[9.0, 646.0]], "isOverall": false, "label": "Calculo de Prima Guardar - -377", "isController": false}, {"data": [[9.0, 646.0]], "isOverall": false, "label": "Calculo de Prima Guardar - -377-Aggregated", "isController": false}, {"data": [[9.0, 1269.3333333333333]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -336", "isController": false}, {"data": [[9.0, 1269.3333333333333]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -336-Aggregated", "isController": false}, {"data": [[9.0, 4151.666666666667]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -335", "isController": false}, {"data": [[9.0, 4151.666666666667]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -335-Aggregated", "isController": false}, {"data": [[9.0, 4590.5]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -334", "isController": false}, {"data": [[9.0, 4590.5]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -334-Aggregated", "isController": false}, {"data": [[9.0, 2273.0]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -365", "isController": false}, {"data": [[9.0, 2273.0]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -365-Aggregated", "isController": false}, {"data": [[9.0, 4291.166666666666]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -374", "isController": false}, {"data": [[9.0, 4291.166666666666]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -374-Aggregated", "isController": false}, {"data": [[11.0, 10572.0]], "isOverall": false, "label": "Login - -209", "isController": false}, {"data": [[11.0, 10572.0]], "isOverall": false, "label": "Login - -209-Aggregated", "isController": false}, {"data": [[9.0, 589.6666666666666]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -375", "isController": false}, {"data": [[9.0, 589.6666666666666]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -375-Aggregated", "isController": false}, {"data": [[11.0, 6163.666666666667]], "isOverall": false, "label": "Login - -207", "isController": false}, {"data": [[11.0, 6163.666666666667]], "isOverall": false, "label": "Login - -207-Aggregated", "isController": false}, {"data": [[8.0, 332305.0], [9.0, 330683.0], [7.0, 330781.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[8.0, 331256.3333333333]], "isOverall": false, "label": "Transaction Controller-Aggregated", "isController": true}, {"data": [[9.0, 1957.0]], "isOverall": false, "label": "Agregar Participante de la Poliza - -312", "isController": false}, {"data": [[9.0, 1957.0]], "isOverall": false, "label": "Agregar Participante de la Poliza - -312-Aggregated", "isController": false}, {"data": [[9.0, 16556.166666666664]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -320", "isController": false}, {"data": [[9.0, 16556.166666666664]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -320-Aggregated", "isController": false}, {"data": [[9.0, 3097.6666666666665]], "isOverall": false, "label": "Deducible Siguiente - -360", "isController": false}, {"data": [[9.0, 3097.6666666666665]], "isOverall": false, "label": "Deducible Siguiente - -360-Aggregated", "isController": false}, {"data": [[9.0, 710.3333333333334]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -324", "isController": false}, {"data": [[9.0, 710.3333333333334]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -324-Aggregated", "isController": false}, {"data": [[9.0, 2436.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -322", "isController": false}, {"data": [[9.0, 2436.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -322-Aggregated", "isController": false}, {"data": [[11.0, 642.6666666666666]], "isOverall": false, "label": "Clic Menu Operaciones del Sistema - -222", "isController": false}, {"data": [[11.0, 642.6666666666666]], "isOverall": false, "label": "Clic Menu Operaciones del Sistema - -222-Aggregated", "isController": false}, {"data": [[9.0, 739.6666666666666]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -321", "isController": false}, {"data": [[9.0, 739.6666666666666]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -321-Aggregated", "isController": false}, {"data": [[9.0, 1331.0]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -367", "isController": false}, {"data": [[9.0, 1331.0]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -367-Aggregated", "isController": false}, {"data": [[9.0, 2136.3333333333335]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -326", "isController": false}, {"data": [[9.0, 2136.3333333333335]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -326-Aggregated", "isController": false}, {"data": [[9.0, 2650.8333333333335]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -325", "isController": false}, {"data": [[9.0, 2650.8333333333335]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -325-Aggregated", "isController": false}, {"data": [[11.0, 5433.0]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -224", "isController": false}, {"data": [[11.0, 5433.0]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -224-Aggregated", "isController": false}, {"data": [[9.0, 2999.5]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -329", "isController": false}, {"data": [[9.0, 2999.5]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -329-Aggregated", "isController": false}, {"data": [[9.0, 7780.833333333334]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -366", "isController": false}, {"data": [[9.0, 7780.833333333334]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -366-Aggregated", "isController": false}, {"data": [[8.0, 1233.0], [9.0, 991.0], [7.0, 723.0]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --409", "isController": false}, {"data": [[8.0, 982.3333333333334]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --409-Aggregated", "isController": false}, {"data": [[11.0, 893.6666666666666]], "isOverall": false, "label": "Ingresar Cedula del Cliente - -233", "isController": false}, {"data": [[11.0, 893.6666666666666]], "isOverall": false, "label": "Ingresar Cedula del Cliente - -233-Aggregated", "isController": false}, {"data": [[9.0, 991.6666666666666]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -306", "isController": false}, {"data": [[9.0, 991.6666666666666]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -306-Aggregated", "isController": false}, {"data": [[9.0, 2894.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -307", "isController": false}, {"data": [[9.0, 2894.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -307-Aggregated", "isController": false}, {"data": [[9.0, 655.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -305", "isController": false}, {"data": [[9.0, 655.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -305-Aggregated", "isController": false}, {"data": [[9.0, 1898.3333333333333]], "isOverall": false, "label": "Clic Crear Deducible - -352", "isController": false}, {"data": [[9.0, 1898.3333333333333]], "isOverall": false, "label": "Clic Crear Deducible - -352-Aggregated", "isController": false}, {"data": [[9.0, 762.3333333333334]], "isOverall": false, "label": "Guardar Facturacion - -290", "isController": false}, {"data": [[9.0, 762.3333333333334]], "isOverall": false, "label": "Guardar Facturacion - -290-Aggregated", "isController": false}, {"data": [[9.0, 2118.6666666666665]], "isOverall": false, "label": "Clic Crear Deducible - -351", "isController": false}, {"data": [[9.0, 2118.6666666666665]], "isOverall": false, "label": "Clic Crear Deducible - -351-Aggregated", "isController": false}, {"data": [[9.0, 1924.3333333333333]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -308", "isController": false}, {"data": [[9.0, 1924.3333333333333]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -308-Aggregated", "isController": false}, {"data": [[9.0, 1762.0]], "isOverall": false, "label": "Clic Crear Deducible - -354", "isController": false}, {"data": [[9.0, 1762.0]], "isOverall": false, "label": "Clic Crear Deducible - -354-Aggregated", "isController": false}, {"data": [[9.0, 1617.6666666666667]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -309", "isController": false}, {"data": [[9.0, 1617.6666666666667]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -309-Aggregated", "isController": false}, {"data": [[11.0, 4728.833333333334]], "isOverall": false, "label": "Guardar Agente - -263", "isController": false}, {"data": [[11.0, 4728.833333333334]], "isOverall": false, "label": "Guardar Agente - -263-Aggregated", "isController": false}, {"data": [[9.0, 1973.6666666666667]], "isOverall": false, "label": "Clic Crear Deducible - -350", "isController": false}, {"data": [[9.0, 1973.6666666666667]], "isOverall": false, "label": "Clic Crear Deducible - -350-Aggregated", "isController": false}, {"data": [[9.0, 10504.166666666668]], "isOverall": false, "label": "Deducible Siguiente - -357", "isController": false}, {"data": [[9.0, 10504.166666666668]], "isOverall": false, "label": "Deducible Siguiente - -357-Aggregated", "isController": false}, {"data": [[11.0, 1563.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -271", "isController": false}, {"data": [[11.0, 1563.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -271-Aggregated", "isController": false}, {"data": [[11.0, 241.33333333333334]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -272", "isController": false}, {"data": [[11.0, 241.33333333333334]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -272-Aggregated", "isController": false}, {"data": [[11.0, 818.0]], "isOverall": false, "label": "Guardar Agente - -267", "isController": false}, {"data": [[11.0, 818.0]], "isOverall": false, "label": "Guardar Agente - -267-Aggregated", "isController": false}, {"data": [[11.0, 870.6666666666666]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -273", "isController": false}, {"data": [[11.0, 870.6666666666666]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -273-Aggregated", "isController": false}, {"data": [[8.0, 1473.0], [9.0, 886.3333333333333], [7.0, 1850.0]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --408", "isController": false}, {"data": [[8.333333333333332, 1242.5]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --408-Aggregated", "isController": false}, {"data": [[11.0, 1563.3333333333333]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -274", "isController": false}, {"data": [[11.0, 1563.3333333333333]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -274-Aggregated", "isController": false}, {"data": [[11.0, 8818.666666666666]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -275", "isController": false}, {"data": [[11.0, 8818.666666666666]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -275-Aggregated", "isController": false}, {"data": [[11.0, 811.6666666666666]], "isOverall": false, "label": "Guardar Agente - -268", "isController": false}, {"data": [[11.0, 811.6666666666666]], "isOverall": false, "label": "Guardar Agente - -268-Aggregated", "isController": false}, {"data": [[11.0, 108.66666666666667]], "isOverall": false, "label": "Login - -209-0", "isController": false}, {"data": [[11.0, 108.66666666666667]], "isOverall": false, "label": "Login - -209-0-Aggregated", "isController": false}, {"data": [[11.0, 1413.3333333333333]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -278", "isController": false}, {"data": [[11.0, 1413.3333333333333]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -278-Aggregated", "isController": false}, {"data": [[11.0, 10463.0]], "isOverall": false, "label": "Login - -209-1", "isController": false}, {"data": [[11.0, 10463.0]], "isOverall": false, "label": "Login - -209-1-Aggregated", "isController": false}, {"data": [[9.0, 2706.833333333333]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -302", "isController": false}, {"data": [[9.0, 2706.833333333333]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -302-Aggregated", "isController": false}, {"data": [[9.0, 1957.6666666666667]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -303", "isController": false}, {"data": [[9.0, 1957.6666666666667]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -303-Aggregated", "isController": false}, {"data": [[9.0, 568.6666666666666]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -300", "isController": false}, {"data": [[9.0, 568.6666666666666]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -300-Aggregated", "isController": false}, {"data": [[9.0, 4371.833333333334]], "isOverall": false, "label": "Guardar Facturacion - -289", "isController": false}, {"data": [[9.0, 4371.833333333334]], "isOverall": false, "label": "Guardar Facturacion - -289-Aggregated", "isController": false}, {"data": [[9.0, 1188.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -301", "isController": false}, {"data": [[9.0, 1188.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -301-Aggregated", "isController": false}, {"data": [[9.0, 7512.833333333334]], "isOverall": false, "label": "Comisiones Siguiente - -368", "isController": false}, {"data": [[9.0, 7512.833333333334]], "isOverall": false, "label": "Comisiones Siguiente - -368-Aggregated", "isController": false}, {"data": [[9.0, 871.0]], "isOverall": false, "label": "Comisiones Siguiente - -369", "isController": false}, {"data": [[9.0, 871.0]], "isOverall": false, "label": "Comisiones Siguiente - -369-Aggregated", "isController": false}, {"data": [[9.0, 1130.0]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -384", "isController": false}, {"data": [[9.0, 1130.0]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -384-Aggregated", "isController": false}, {"data": [[9.0, 9303.666666666668]], "isOverall": false, "label": "Prima Objeto de Cobertura - -342", "isController": false}, {"data": [[9.0, 9303.666666666668]], "isOverall": false, "label": "Prima Objeto de Cobertura - -342-Aggregated", "isController": false}, {"data": [[9.0, 1486.3333333333333]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -382", "isController": false}, {"data": [[9.0, 1486.3333333333333]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -382-Aggregated", "isController": false}, {"data": [[11.0, 9266.833333333334]], "isOverall": false, "label": "Siguiente - -236", "isController": false}, {"data": [[11.0, 9266.833333333334]], "isOverall": false, "label": "Siguiente - -236-Aggregated", "isController": false}, {"data": [[9.0, 742.0]], "isOverall": false, "label": "Guardar Deducible - -356", "isController": false}, {"data": [[9.0, 742.0]], "isOverall": false, "label": "Guardar Deducible - -356-Aggregated", "isController": false}, {"data": [[11.0, 841.0]], "isOverall": false, "label": "Siguiente - -237", "isController": false}, {"data": [[11.0, 841.0]], "isOverall": false, "label": "Siguiente - -237-Aggregated", "isController": false}, {"data": [[9.0, 4892.666666666667]], "isOverall": false, "label": "Guardar Deducible - -355", "isController": false}, {"data": [[9.0, 4892.666666666667]], "isOverall": false, "label": "Guardar Deducible - -355-Aggregated", "isController": false}, {"data": [[8.0, 1.0], [9.0, 0.0], [7.0, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[8.0, 0.33333333333333337]], "isOverall": false, "label": "Debug Sampler-Aggregated", "isController": false}, {"data": [[9.0, 5396.5]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -379", "isController": false}, {"data": [[9.0, 5396.5]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -379-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 11.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 1251.3166666666666, "minX": 1.59499386E12, "maxY": 60137.333333333336, "series": [{"data": [[1.59499398E12, 45311.23333333333], [1.5949941E12, 55161.683333333334], [1.59499392E12, 43320.8], [1.59499404E12, 60137.333333333336], [1.59499386E12, 27897.666666666668], [1.59499416E12, 39231.05]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.59499398E12, 4657.916666666667], [1.5949941E12, 1251.3166666666666], [1.59499392E12, 3664.233333333333], [1.59499404E12, 2187.5833333333335], [1.59499386E12, 1455.45], [1.59499416E12, 1578.7]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59499416E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 0.33333333333333337, "minX": 1.59499386E12, "maxY": 331256.3333333333, "series": [{"data": [[1.59499404E12, 3792.166666666667]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -331", "isController": false}, {"data": [[1.59499386E12, 3664.1666666666665]], "isOverall": false, "label": "Buscar Cedula del Cliente - -234", "isController": false}, {"data": [[1.59499386E12, 713.6666666666666]], "isOverall": false, "label": "Buscar Cedula del Cliente - -235", "isController": false}, {"data": [[1.59499404E12, 697.6666666666666]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -333", "isController": false}, {"data": [[1.59499398E12, 13513.833333333334]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -291", "isController": false}, {"data": [[1.59499398E12, 857.0]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -292", "isController": false}, {"data": [[1.5949941E12, 18215.666666666668], [1.59499404E12, 1302.0]], "isOverall": false, "label": "Clic Crear Deducible - -347", "isController": false}, {"data": [[1.59499398E12, 965.6666666666666]], "isOverall": false, "label": "Editar Facturacion - -288", "isController": false}, {"data": [[1.59499404E12, 719.6666666666666]], "isOverall": false, "label": "Cobertura Siguiente - -344", "isController": false}, {"data": [[1.59499404E12, 8622.833333333332]], "isOverall": false, "label": "Cobertura Siguiente - -343", "isController": false}, {"data": [[1.59499386E12, 172.66666666666666]], "isOverall": false, "label": "Index - -203-0", "isController": false}, {"data": [[1.59499392E12, 1239.0]], "isOverall": false, "label": "Ingresar Id Agente - -261", "isController": false}, {"data": [[1.59499386E12, 220.66666666666666]], "isOverall": false, "label": "Index - -203-1", "isController": false}, {"data": [[1.59499392E12, 2112.6666666666665]], "isOverall": false, "label": "Ingresar Id Agente - -260", "isController": false}, {"data": [[1.59499392E12, 3194.666666666667]], "isOverall": false, "label": "Ingresar Id Agente - -252", "isController": false}, {"data": [[1.59499392E12, 313.3333333333333]], "isOverall": false, "label": "Ingresar Id Agente - -254", "isController": false}, {"data": [[1.59499392E12, 1706.0]], "isOverall": false, "label": "Ingresar Id Agente - -253", "isController": false}, {"data": [[1.59499392E12, 1074.6666666666667]], "isOverall": false, "label": "Ingresar Id Agente - -256", "isController": false}, {"data": [[1.59499416E12, 1163.3333333333333]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --406", "isController": false}, {"data": [[1.59499392E12, 1324.6666666666667]], "isOverall": false, "label": "Ingresar Id Agente - -255", "isController": false}, {"data": [[1.59499392E12, 8294.833333333334]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -269", "isController": false}, {"data": [[1.59499416E12, 6956.0]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --405", "isController": false}, {"data": [[1.59499392E12, 479.0]], "isOverall": false, "label": "Ingresar Id Agente - -258", "isController": false}, {"data": [[1.59499404E12, 10940.833333333334]], "isOverall": false, "label": "Editar Objeto de Cobertura - -337", "isController": false}, {"data": [[1.59499392E12, 2421.166666666667]], "isOverall": false, "label": "Ingresar Id Agente - -257", "isController": false}, {"data": [[1.59499416E12, 779.3333333333334]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --407", "isController": false}, {"data": [[1.59499386E12, 669.6666666666666]], "isOverall": false, "label": "Siguiente 2 - -240", "isController": false}, {"data": [[1.59499404E12, 1547.6666666666667]], "isOverall": false, "label": "Editar Objeto de Cobertura - -339", "isController": false}, {"data": [[1.59499392E12, 1018.0]], "isOverall": false, "label": "Ingresar Id Agente - -259", "isController": false}, {"data": [[1.59499386E12, 394.6666666666667]], "isOverall": false, "label": "Index - -203", "isController": false}, {"data": [[1.59499386E12, 998.6666666666666]], "isOverall": false, "label": "Index - -202", "isController": false}, {"data": [[1.59499404E12, 2087.0]], "isOverall": false, "label": "Clic Crear Deducible - -349", "isController": false}, {"data": [[1.59499404E12, 1810.3333333333333]], "isOverall": false, "label": "Clic Crear Deducible - -348", "isController": false}, {"data": [[1.59499416E12, 7230.666666666667]], "isOverall": false, "label": "Clausulas Siguiente - -372", "isController": false}, {"data": [[1.59499416E12, 666.6666666666666]], "isOverall": false, "label": "Clausulas Siguiente - -373", "isController": false}, {"data": [[1.59499386E12, 798.0]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -232", "isController": false}, {"data": [[1.59499404E12, 2735.6666666666665]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -330", "isController": false}, {"data": [[1.59499398E12, 1118.0]], "isOverall": false, "label": "Guardar Participante de la Poliza - -316", "isController": false}, {"data": [[1.59499398E12, 6007.333333333334]], "isOverall": false, "label": "Guardar Participante de la Poliza - -315", "isController": false}, {"data": [[1.59499392E12, 1147.0]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -282", "isController": false}, {"data": [[1.59499398E12, 1287.8333333333335]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -294", "isController": false}, {"data": [[1.59499392E12, 11284.166666666666]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -281", "isController": false}, {"data": [[1.59499398E12, 524.3333333333334]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -295", "isController": false}, {"data": [[1.59499386E12, 321.6666666666667]], "isOverall": false, "label": "Clic Menu Control de Polizas - -223", "isController": false}, {"data": [[1.59499398E12, 819.0]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -319", "isController": false}, {"data": [[1.59499386E12, 631.0]], "isOverall": false, "label": "Login - -207-0", "isController": false}, {"data": [[1.59499392E12, 1071.6666666666667]], "isOverall": false, "label": "Ingresar Id Agente - -262", "isController": false}, {"data": [[1.59499398E12, 10269.5]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -318", "isController": false}, {"data": [[1.59499416E12, 3364.166666666667]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --402", "isController": false}, {"data": [[1.59499386E12, 245.66666666666666]], "isOverall": false, "label": "Login - -207-1", "isController": false}, {"data": [[1.59499416E12, 874.3333333333334]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --403", "isController": false}, {"data": [[1.5949941E12, 9136.0], [1.59499416E12, 11873.0]], "isOverall": false, "label": "Impuestos Siguiente - -370", "isController": false}, {"data": [[1.59499416E12, 2737.0]], "isOverall": false, "label": "Impuestos Siguiente - -371", "isController": false}, {"data": [[1.59499386E12, 8367.5]], "isOverall": false, "label": "Siguiente 2 - -238", "isController": false}, {"data": [[1.59499398E12, 956.6666666666666]], "isOverall": false, "label": "Editar Facturacion - -286", "isController": false}, {"data": [[1.59499398E12, 914.0]], "isOverall": false, "label": "Editar Facturacion - -287", "isController": false}, {"data": [[1.59499392E12, 953.0]], "isOverall": false, "label": "Editar Facturacion - -284", "isController": false}, {"data": [[1.59499398E12, 1559.5], [1.59499392E12, 1287.0]], "isOverall": false, "label": "Editar Facturacion - -285", "isController": false}, {"data": [[1.59499398E12, 11045.0], [1.59499392E12, 1034.0]], "isOverall": false, "label": "Editar Facturacion - -283", "isController": false}, {"data": [[1.59499404E12, 7720.666666666667]], "isOverall": false, "label": "Descuentos Siguiente - -345", "isController": false}, {"data": [[1.59499392E12, 945.0]], "isOverall": false, "label": "Siguiente 3 - -247", "isController": false}, {"data": [[1.59499404E12, 608.0]], "isOverall": false, "label": "Descuentos Siguiente - -346", "isController": false}, {"data": [[1.59499392E12, 1513.6666666666667]], "isOverall": false, "label": "Siguiente 3 - -249", "isController": false}, {"data": [[1.59499392E12, 12597.333333333332]], "isOverall": false, "label": "Siguiente 3 - -242", "isController": false}, {"data": [[1.59499398E12, 1496.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -298", "isController": false}, {"data": [[1.59499398E12, 2716.333333333333]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -297", "isController": false}, {"data": [[1.59499392E12, 11705.0]], "isOverall": false, "label": "Clic Crear Agente - -250", "isController": false}, {"data": [[1.59499392E12, 1014.6666666666666]], "isOverall": false, "label": "Clic Crear Agente - -251", "isController": false}, {"data": [[1.5949941E12, 12147.5]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -362", "isController": false}, {"data": [[1.59499404E12, 618.0]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -341", "isController": false}, {"data": [[1.59499404E12, 4818.666666666667]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -340", "isController": false}, {"data": [[1.59499416E12, 8004.666666666666]], "isOverall": false, "label": "Calculo de Prima Clic Boton Prima - -378", "isController": false}, {"data": [[1.59499416E12, 2347.6666666666665]], "isOverall": false, "label": "Calculo de Prima Guardar - -376", "isController": false}, {"data": [[1.59499416E12, 646.0]], "isOverall": false, "label": "Calculo de Prima Guardar - -377", "isController": false}, {"data": [[1.59499404E12, 1269.3333333333333]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -336", "isController": false}, {"data": [[1.59499404E12, 4151.666666666667]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -335", "isController": false}, {"data": [[1.59499404E12, 4590.5]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -334", "isController": false}, {"data": [[1.5949941E12, 2273.0]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -365", "isController": false}, {"data": [[1.59499416E12, 4291.166666666666]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -374", "isController": false}, {"data": [[1.59499386E12, 10572.0]], "isOverall": false, "label": "Login - -209", "isController": false}, {"data": [[1.59499416E12, 589.6666666666666]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -375", "isController": false}, {"data": [[1.59499386E12, 6163.666666666667]], "isOverall": false, "label": "Login - -207", "isController": false}, {"data": [[1.59499416E12, 331256.3333333333]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59499398E12, 1957.0]], "isOverall": false, "label": "Agregar Participante de la Poliza - -312", "isController": false}, {"data": [[1.59499398E12, 4849.0], [1.59499404E12, 28263.333333333332]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -320", "isController": false}, {"data": [[1.5949941E12, 3097.6666666666665]], "isOverall": false, "label": "Deducible Siguiente - -360", "isController": false}, {"data": [[1.59499398E12, 710.3333333333334]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -324", "isController": false}, {"data": [[1.59499398E12, 2436.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -322", "isController": false}, {"data": [[1.59499386E12, 642.6666666666666]], "isOverall": false, "label": "Clic Menu Operaciones del Sistema - -222", "isController": false}, {"data": [[1.59499398E12, 739.6666666666666]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -321", "isController": false}, {"data": [[1.5949941E12, 1331.0]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -367", "isController": false}, {"data": [[1.59499398E12, 2136.3333333333335]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -326", "isController": false}, {"data": [[1.59499398E12, 2650.8333333333335]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -325", "isController": false}, {"data": [[1.59499386E12, 5433.0]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -224", "isController": false}, {"data": [[1.59499398E12, 1631.6666666666667], [1.59499404E12, 4367.333333333333]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -329", "isController": false}, {"data": [[1.5949941E12, 7780.833333333334]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -366", "isController": false}, {"data": [[1.59499416E12, 982.3333333333334]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --409", "isController": false}, {"data": [[1.59499386E12, 893.6666666666666]], "isOverall": false, "label": "Ingresar Cedula del Cliente - -233", "isController": false}, {"data": [[1.59499398E12, 991.6666666666666]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -306", "isController": false}, {"data": [[1.59499398E12, 2894.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -307", "isController": false}, {"data": [[1.59499398E12, 655.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -305", "isController": false}, {"data": [[1.5949941E12, 1862.0], [1.59499404E12, 1971.0]], "isOverall": false, "label": "Clic Crear Deducible - -352", "isController": false}, {"data": [[1.59499398E12, 762.3333333333334]], "isOverall": false, "label": "Guardar Facturacion - -290", "isController": false}, {"data": [[1.59499404E12, 2118.6666666666665]], "isOverall": false, "label": "Clic Crear Deducible - -351", "isController": false}, {"data": [[1.59499398E12, 1924.3333333333333]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -308", "isController": false}, {"data": [[1.5949941E12, 1762.0]], "isOverall": false, "label": "Clic Crear Deducible - -354", "isController": false}, {"data": [[1.59499398E12, 1617.6666666666667]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -309", "isController": false}, {"data": [[1.59499392E12, 4728.833333333334]], "isOverall": false, "label": "Guardar Agente - -263", "isController": false}, {"data": [[1.59499404E12, 1973.6666666666667]], "isOverall": false, "label": "Clic Crear Deducible - -350", "isController": false}, {"data": [[1.5949941E12, 10504.166666666668]], "isOverall": false, "label": "Deducible Siguiente - -357", "isController": false}, {"data": [[1.59499392E12, 1563.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -271", "isController": false}, {"data": [[1.59499392E12, 241.33333333333334]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -272", "isController": false}, {"data": [[1.59499392E12, 818.0]], "isOverall": false, "label": "Guardar Agente - -267", "isController": false}, {"data": [[1.59499392E12, 870.6666666666666]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -273", "isController": false}, {"data": [[1.59499416E12, 1242.5]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --408", "isController": false}, {"data": [[1.59499392E12, 1563.3333333333333]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -274", "isController": false}, {"data": [[1.59499392E12, 8818.666666666666]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -275", "isController": false}, {"data": [[1.59499392E12, 811.6666666666666]], "isOverall": false, "label": "Guardar Agente - -268", "isController": false}, {"data": [[1.59499386E12, 108.66666666666667]], "isOverall": false, "label": "Login - -209-0", "isController": false}, {"data": [[1.59499392E12, 1413.3333333333333]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -278", "isController": false}, {"data": [[1.59499386E12, 10463.0]], "isOverall": false, "label": "Login - -209-1", "isController": false}, {"data": [[1.59499398E12, 2706.833333333333]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -302", "isController": false}, {"data": [[1.59499398E12, 1957.6666666666667]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -303", "isController": false}, {"data": [[1.59499398E12, 568.6666666666666]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -300", "isController": false}, {"data": [[1.59499398E12, 4371.833333333334]], "isOverall": false, "label": "Guardar Facturacion - -289", "isController": false}, {"data": [[1.59499398E12, 1188.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -301", "isController": false}, {"data": [[1.5949941E12, 7512.833333333334]], "isOverall": false, "label": "Comisiones Siguiente - -368", "isController": false}, {"data": [[1.5949941E12, 871.0]], "isOverall": false, "label": "Comisiones Siguiente - -369", "isController": false}, {"data": [[1.59499416E12, 1130.0]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -384", "isController": false}, {"data": [[1.59499404E12, 9303.666666666668]], "isOverall": false, "label": "Prima Objeto de Cobertura - -342", "isController": false}, {"data": [[1.59499416E12, 1486.3333333333333]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -382", "isController": false}, {"data": [[1.59499386E12, 9266.833333333334]], "isOverall": false, "label": "Siguiente - -236", "isController": false}, {"data": [[1.5949941E12, 742.0]], "isOverall": false, "label": "Guardar Deducible - -356", "isController": false}, {"data": [[1.59499386E12, 841.0]], "isOverall": false, "label": "Siguiente - -237", "isController": false}, {"data": [[1.5949941E12, 4892.666666666667]], "isOverall": false, "label": "Guardar Deducible - -355", "isController": false}, {"data": [[1.59499416E12, 0.33333333333333337]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59499416E12, 5396.5]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -379", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59499416E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.59499386E12, "maxY": 268525.6666666667, "series": [{"data": [[1.59499404E12, 2888.5]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -331", "isController": false}, {"data": [[1.59499386E12, 3566.6666666666665]], "isOverall": false, "label": "Buscar Cedula del Cliente - -234", "isController": false}, {"data": [[1.59499386E12, 572.0]], "isOverall": false, "label": "Buscar Cedula del Cliente - -235", "isController": false}, {"data": [[1.59499404E12, 567.6666666666666]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -333", "isController": false}, {"data": [[1.59499398E12, 11688.833333333332]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -291", "isController": false}, {"data": [[1.59499398E12, 543.0]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -292", "isController": false}, {"data": [[1.5949941E12, 16804.333333333332], [1.59499404E12, 1103.0]], "isOverall": false, "label": "Clic Crear Deducible - -347", "isController": false}, {"data": [[1.59499398E12, 955.3333333333334]], "isOverall": false, "label": "Editar Facturacion - -288", "isController": false}, {"data": [[1.59499404E12, 672.3333333333334]], "isOverall": false, "label": "Cobertura Siguiente - -344", "isController": false}, {"data": [[1.59499404E12, 7208.833333333333]], "isOverall": false, "label": "Cobertura Siguiente - -343", "isController": false}, {"data": [[1.59499386E12, 172.66666666666666]], "isOverall": false, "label": "Index - -203-0", "isController": false}, {"data": [[1.59499392E12, 1227.0]], "isOverall": false, "label": "Ingresar Id Agente - -261", "isController": false}, {"data": [[1.59499386E12, 210.0]], "isOverall": false, "label": "Index - -203-1", "isController": false}, {"data": [[1.59499392E12, 2082.8333333333335]], "isOverall": false, "label": "Ingresar Id Agente - -260", "isController": false}, {"data": [[1.59499392E12, 2941.0]], "isOverall": false, "label": "Ingresar Id Agente - -252", "isController": false}, {"data": [[1.59499392E12, 285.6666666666667]], "isOverall": false, "label": "Ingresar Id Agente - -254", "isController": false}, {"data": [[1.59499392E12, 1292.6666666666667]], "isOverall": false, "label": "Ingresar Id Agente - -253", "isController": false}, {"data": [[1.59499392E12, 1053.0]], "isOverall": false, "label": "Ingresar Id Agente - -256", "isController": false}, {"data": [[1.59499416E12, 780.3333333333334]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --406", "isController": false}, {"data": [[1.59499392E12, 1315.6666666666667]], "isOverall": false, "label": "Ingresar Id Agente - -255", "isController": false}, {"data": [[1.59499392E12, 7388.166666666666]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -269", "isController": false}, {"data": [[1.59499416E12, 6680.0]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --405", "isController": false}, {"data": [[1.59499392E12, 390.6666666666667]], "isOverall": false, "label": "Ingresar Id Agente - -258", "isController": false}, {"data": [[1.59499404E12, 7224.833333333333]], "isOverall": false, "label": "Editar Objeto de Cobertura - -337", "isController": false}, {"data": [[1.59499392E12, 1998.1666666666667]], "isOverall": false, "label": "Ingresar Id Agente - -257", "isController": false}, {"data": [[1.59499416E12, 767.0]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --407", "isController": false}, {"data": [[1.59499386E12, 602.0]], "isOverall": false, "label": "Siguiente 2 - -240", "isController": false}, {"data": [[1.59499404E12, 1527.3333333333333]], "isOverall": false, "label": "Editar Objeto de Cobertura - -339", "isController": false}, {"data": [[1.59499392E12, 959.0]], "isOverall": false, "label": "Ingresar Id Agente - -259", "isController": false}, {"data": [[1.59499386E12, 172.66666666666666]], "isOverall": false, "label": "Index - -203", "isController": false}, {"data": [[1.59499386E12, 882.3333333333334]], "isOverall": false, "label": "Index - -202", "isController": false}, {"data": [[1.59499404E12, 1990.0]], "isOverall": false, "label": "Clic Crear Deducible - -349", "isController": false}, {"data": [[1.59499404E12, 1787.0]], "isOverall": false, "label": "Clic Crear Deducible - -348", "isController": false}, {"data": [[1.59499416E12, 6525.333333333334]], "isOverall": false, "label": "Clausulas Siguiente - -372", "isController": false}, {"data": [[1.59499416E12, 524.0]], "isOverall": false, "label": "Clausulas Siguiente - -373", "isController": false}, {"data": [[1.59499386E12, 631.6666666666666]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -232", "isController": false}, {"data": [[1.59499404E12, 2720.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -330", "isController": false}, {"data": [[1.59499398E12, 620.0]], "isOverall": false, "label": "Guardar Participante de la Poliza - -316", "isController": false}, {"data": [[1.59499398E12, 4994.0]], "isOverall": false, "label": "Guardar Participante de la Poliza - -315", "isController": false}, {"data": [[1.59499392E12, 895.6666666666666]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -282", "isController": false}, {"data": [[1.59499398E12, 1033.5]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -294", "isController": false}, {"data": [[1.59499392E12, 9848.166666666668]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -281", "isController": false}, {"data": [[1.59499398E12, 189.0]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -295", "isController": false}, {"data": [[1.59499386E12, 279.3333333333333]], "isOverall": false, "label": "Clic Menu Control de Polizas - -223", "isController": false}, {"data": [[1.59499398E12, 777.3333333333334]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -319", "isController": false}, {"data": [[1.59499386E12, 631.0]], "isOverall": false, "label": "Login - -207-0", "isController": false}, {"data": [[1.59499392E12, 1056.6666666666667]], "isOverall": false, "label": "Ingresar Id Agente - -262", "isController": false}, {"data": [[1.59499398E12, 9111.0]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -318", "isController": false}, {"data": [[1.59499416E12, 3016.166666666667]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --402", "isController": false}, {"data": [[1.59499386E12, 244.66666666666666]], "isOverall": false, "label": "Login - -207-1", "isController": false}, {"data": [[1.59499416E12, 482.3333333333333]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --403", "isController": false}, {"data": [[1.5949941E12, 7961.333333333333], [1.59499416E12, 9816.666666666666]], "isOverall": false, "label": "Impuestos Siguiente - -370", "isController": false}, {"data": [[1.59499416E12, 1855.3333333333333]], "isOverall": false, "label": "Impuestos Siguiente - -371", "isController": false}, {"data": [[1.59499386E12, 6791.0]], "isOverall": false, "label": "Siguiente 2 - -238", "isController": false}, {"data": [[1.59499398E12, 627.3333333333334]], "isOverall": false, "label": "Editar Facturacion - -286", "isController": false}, {"data": [[1.59499398E12, 902.0]], "isOverall": false, "label": "Editar Facturacion - -287", "isController": false}, {"data": [[1.59499392E12, 660.0]], "isOverall": false, "label": "Editar Facturacion - -284", "isController": false}, {"data": [[1.59499398E12, 1476.5], [1.59499392E12, 1264.0]], "isOverall": false, "label": "Editar Facturacion - -285", "isController": false}, {"data": [[1.59499398E12, 9624.0], [1.59499392E12, 1015.3333333333334]], "isOverall": false, "label": "Editar Facturacion - -283", "isController": false}, {"data": [[1.59499404E12, 6811.666666666667]], "isOverall": false, "label": "Descuentos Siguiente - -345", "isController": false}, {"data": [[1.59499392E12, 789.3333333333334]], "isOverall": false, "label": "Siguiente 3 - -247", "isController": false}, {"data": [[1.59499404E12, 586.6666666666666]], "isOverall": false, "label": "Descuentos Siguiente - -346", "isController": false}, {"data": [[1.59499392E12, 1492.3333333333333]], "isOverall": false, "label": "Siguiente 3 - -249", "isController": false}, {"data": [[1.59499392E12, 10619.166666666666]], "isOverall": false, "label": "Siguiente 3 - -242", "isController": false}, {"data": [[1.59499398E12, 1032.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -298", "isController": false}, {"data": [[1.59499398E12, 2447.333333333333]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -297", "isController": false}, {"data": [[1.59499392E12, 10343.166666666668]], "isOverall": false, "label": "Clic Crear Agente - -250", "isController": false}, {"data": [[1.59499392E12, 576.0]], "isOverall": false, "label": "Clic Crear Agente - -251", "isController": false}, {"data": [[1.5949941E12, 8591.166666666666]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -362", "isController": false}, {"data": [[1.59499404E12, 545.3333333333334]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -341", "isController": false}, {"data": [[1.59499404E12, 3356.0]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -340", "isController": false}, {"data": [[1.59499416E12, 7880.666666666667]], "isOverall": false, "label": "Calculo de Prima Clic Boton Prima - -378", "isController": false}, {"data": [[1.59499416E12, 1913.1666666666667]], "isOverall": false, "label": "Calculo de Prima Guardar - -376", "isController": false}, {"data": [[1.59499416E12, 554.3333333333334]], "isOverall": false, "label": "Calculo de Prima Guardar - -377", "isController": false}, {"data": [[1.59499404E12, 1259.3333333333333]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -336", "isController": false}, {"data": [[1.59499404E12, 2220.6666666666665]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -335", "isController": false}, {"data": [[1.59499404E12, 3579.6666666666665]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -334", "isController": false}, {"data": [[1.5949941E12, 625.6666666666666]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -365", "isController": false}, {"data": [[1.59499416E12, 3901.3333333333335]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -374", "isController": false}, {"data": [[1.59499386E12, 107.66666666666667]], "isOverall": false, "label": "Login - -209", "isController": false}, {"data": [[1.59499416E12, 496.0]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -375", "isController": false}, {"data": [[1.59499386E12, 684.8333333333334]], "isOverall": false, "label": "Login - -207", "isController": false}, {"data": [[1.59499416E12, 268525.6666666667]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59499398E12, 1928.3333333333333]], "isOverall": false, "label": "Agregar Participante de la Poliza - -312", "isController": false}, {"data": [[1.59499398E12, 4063.6666666666665], [1.59499404E12, 23168.666666666668]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -320", "isController": false}, {"data": [[1.5949941E12, 758.6666666666666]], "isOverall": false, "label": "Deducible Siguiente - -360", "isController": false}, {"data": [[1.59499398E12, 642.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -324", "isController": false}, {"data": [[1.59499398E12, 1265.6666666666667]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -322", "isController": false}, {"data": [[1.59499386E12, 581.6666666666666]], "isOverall": false, "label": "Clic Menu Operaciones del Sistema - -222", "isController": false}, {"data": [[1.59499398E12, 684.6666666666666]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -321", "isController": false}, {"data": [[1.5949941E12, 746.6666666666666]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -367", "isController": false}, {"data": [[1.59499398E12, 2118.6666666666665]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -326", "isController": false}, {"data": [[1.59499398E12, 2636.666666666667]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -325", "isController": false}, {"data": [[1.59499386E12, 2775.8333333333335]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -224", "isController": false}, {"data": [[1.59499398E12, 1604.6666666666667], [1.59499404E12, 4324.666666666667]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -329", "isController": false}, {"data": [[1.5949941E12, 6853.0]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -366", "isController": false}, {"data": [[1.59499416E12, 965.3333333333334]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --409", "isController": false}, {"data": [[1.59499386E12, 862.6666666666666]], "isOverall": false, "label": "Ingresar Cedula del Cliente - -233", "isController": false}, {"data": [[1.59499398E12, 968.3333333333334]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -306", "isController": false}, {"data": [[1.59499398E12, 2828.3333333333335]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -307", "isController": false}, {"data": [[1.59499398E12, 522.3333333333334]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -305", "isController": false}, {"data": [[1.5949941E12, 1790.5], [1.59499404E12, 1969.0]], "isOverall": false, "label": "Clic Crear Deducible - -352", "isController": false}, {"data": [[1.59499398E12, 666.6666666666666]], "isOverall": false, "label": "Guardar Facturacion - -290", "isController": false}, {"data": [[1.59499404E12, 2093.0]], "isOverall": false, "label": "Clic Crear Deducible - -351", "isController": false}, {"data": [[1.59499398E12, 1866.3333333333333]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -308", "isController": false}, {"data": [[1.5949941E12, 1749.6666666666667]], "isOverall": false, "label": "Clic Crear Deducible - -354", "isController": false}, {"data": [[1.59499398E12, 1589.6666666666667]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -309", "isController": false}, {"data": [[1.59499392E12, 3681.833333333333]], "isOverall": false, "label": "Guardar Agente - -263", "isController": false}, {"data": [[1.59499404E12, 1951.0]], "isOverall": false, "label": "Clic Crear Deducible - -350", "isController": false}, {"data": [[1.5949941E12, 7853.0]], "isOverall": false, "label": "Deducible Siguiente - -357", "isController": false}, {"data": [[1.59499392E12, 1439.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -271", "isController": false}, {"data": [[1.59499392E12, 227.33333333333334]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -272", "isController": false}, {"data": [[1.59499392E12, 542.3333333333334]], "isOverall": false, "label": "Guardar Agente - -267", "isController": false}, {"data": [[1.59499392E12, 866.3333333333334]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -273", "isController": false}, {"data": [[1.59499416E12, 1220.6666666666665]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --408", "isController": false}, {"data": [[1.59499392E12, 1546.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -274", "isController": false}, {"data": [[1.59499392E12, 7488.166666666667]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -275", "isController": false}, {"data": [[1.59499392E12, 794.6666666666666]], "isOverall": false, "label": "Guardar Agente - -268", "isController": false}, {"data": [[1.59499386E12, 107.66666666666667]], "isOverall": false, "label": "Login - -209-0", "isController": false}, {"data": [[1.59499392E12, 787.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -278", "isController": false}, {"data": [[1.59499386E12, 10274.666666666666]], "isOverall": false, "label": "Login - -209-1", "isController": false}, {"data": [[1.59499398E12, 2569.5]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -302", "isController": false}, {"data": [[1.59499398E12, 1889.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -303", "isController": false}, {"data": [[1.59499398E12, 526.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -300", "isController": false}, {"data": [[1.59499398E12, 3725.0]], "isOverall": false, "label": "Guardar Facturacion - -289", "isController": false}, {"data": [[1.59499398E12, 1171.3333333333333]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -301", "isController": false}, {"data": [[1.5949941E12, 6736.0]], "isOverall": false, "label": "Comisiones Siguiente - -368", "isController": false}, {"data": [[1.5949941E12, 638.0]], "isOverall": false, "label": "Comisiones Siguiente - -369", "isController": false}, {"data": [[1.59499416E12, 1014.6666666666666]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -384", "isController": false}, {"data": [[1.59499404E12, 7065.0]], "isOverall": false, "label": "Prima Objeto de Cobertura - -342", "isController": false}, {"data": [[1.59499416E12, 1119.0]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -382", "isController": false}, {"data": [[1.59499386E12, 7140.5]], "isOverall": false, "label": "Siguiente - -236", "isController": false}, {"data": [[1.5949941E12, 698.3333333333334]], "isOverall": false, "label": "Guardar Deducible - -356", "isController": false}, {"data": [[1.59499386E12, 572.3333333333334]], "isOverall": false, "label": "Siguiente - -237", "isController": false}, {"data": [[1.5949941E12, 3931.5]], "isOverall": false, "label": "Guardar Deducible - -355", "isController": false}, {"data": [[1.59499416E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59499416E12, 4472.166666666666]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -379", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59499416E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.59499386E12, "maxY": 26122.0, "series": [{"data": [[1.59499404E12, 513.1666666666666]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -331", "isController": false}, {"data": [[1.59499386E12, 187.16666666666669]], "isOverall": false, "label": "Buscar Cedula del Cliente - -234", "isController": false}, {"data": [[1.59499386E12, 374.3333333333333]], "isOverall": false, "label": "Buscar Cedula del Cliente - -235", "isController": false}, {"data": [[1.59499404E12, 337.6666666666667]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -333", "isController": false}, {"data": [[1.59499398E12, 1638.5]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -291", "isController": false}, {"data": [[1.59499398E12, 215.66666666666666]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -292", "isController": false}, {"data": [[1.5949941E12, 2033.6666666666667], [1.59499404E12, 0.0]], "isOverall": false, "label": "Clic Crear Deducible - -347", "isController": false}, {"data": [[1.59499398E12, 109.66666666666666]], "isOverall": false, "label": "Editar Facturacion - -288", "isController": false}, {"data": [[1.59499404E12, 323.0]], "isOverall": false, "label": "Cobertura Siguiente - -344", "isController": false}, {"data": [[1.59499404E12, 581.8333333333334]], "isOverall": false, "label": "Cobertura Siguiente - -343", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "Index - -203-0", "isController": false}, {"data": [[1.59499392E12, 261.0]], "isOverall": false, "label": "Ingresar Id Agente - -261", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "Index - -203-1", "isController": false}, {"data": [[1.59499392E12, 190.66666666666666]], "isOverall": false, "label": "Ingresar Id Agente - -260", "isController": false}, {"data": [[1.59499392E12, 334.5]], "isOverall": false, "label": "Ingresar Id Agente - -252", "isController": false}, {"data": [[1.59499392E12, 0.0]], "isOverall": false, "label": "Ingresar Id Agente - -254", "isController": false}, {"data": [[1.59499392E12, 424.0]], "isOverall": false, "label": "Ingresar Id Agente - -253", "isController": false}, {"data": [[1.59499392E12, 152.33333333333334]], "isOverall": false, "label": "Ingresar Id Agente - -256", "isController": false}, {"data": [[1.59499416E12, 395.3333333333333]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --406", "isController": false}, {"data": [[1.59499392E12, 245.0]], "isOverall": false, "label": "Ingresar Id Agente - -255", "isController": false}, {"data": [[1.59499392E12, 526.8333333333333]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -269", "isController": false}, {"data": [[1.59499416E12, 197.66666666666666]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --405", "isController": false}, {"data": [[1.59499392E12, 147.0]], "isOverall": false, "label": "Ingresar Id Agente - -258", "isController": false}, {"data": [[1.59499404E12, 391.66666666666663]], "isOverall": false, "label": "Editar Objeto de Cobertura - -337", "isController": false}, {"data": [[1.59499392E12, 425.5]], "isOverall": false, "label": "Ingresar Id Agente - -257", "isController": false}, {"data": [[1.59499416E12, 0.0]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --407", "isController": false}, {"data": [[1.59499386E12, 369.0]], "isOverall": false, "label": "Siguiente 2 - -240", "isController": false}, {"data": [[1.59499404E12, 450.0]], "isOverall": false, "label": "Editar Objeto de Cobertura - -339", "isController": false}, {"data": [[1.59499392E12, 238.66666666666669]], "isOverall": false, "label": "Ingresar Id Agente - -259", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "Index - -203", "isController": false}, {"data": [[1.59499386E12, 685.0]], "isOverall": false, "label": "Index - -202", "isController": false}, {"data": [[1.59499404E12, 201.66666666666669]], "isOverall": false, "label": "Clic Crear Deducible - -349", "isController": false}, {"data": [[1.59499404E12, 156.66666666666666]], "isOverall": false, "label": "Clic Crear Deducible - -348", "isController": false}, {"data": [[1.59499416E12, 537.6666666666666]], "isOverall": false, "label": "Clausulas Siguiente - -372", "isController": false}, {"data": [[1.59499416E12, 365.3333333333333]], "isOverall": false, "label": "Clausulas Siguiente - -373", "isController": false}, {"data": [[1.59499386E12, 403.6666666666667]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -232", "isController": false}, {"data": [[1.59499404E12, 238.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -330", "isController": false}, {"data": [[1.59499398E12, 408.6666666666667]], "isOverall": false, "label": "Guardar Participante de la Poliza - -316", "isController": false}, {"data": [[1.59499398E12, 553.6666666666667]], "isOverall": false, "label": "Guardar Participante de la Poliza - -315", "isController": false}, {"data": [[1.59499392E12, 369.0]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -282", "isController": false}, {"data": [[1.59499398E12, 139.33333333333331]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -294", "isController": false}, {"data": [[1.59499392E12, 184.5]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -281", "isController": false}, {"data": [[1.59499398E12, 0.0]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -295", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "Clic Menu Control de Polizas - -223", "isController": false}, {"data": [[1.59499398E12, 413.6666666666667]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -319", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "Login - -207-0", "isController": false}, {"data": [[1.59499392E12, 120.33333333333334]], "isOverall": false, "label": "Ingresar Id Agente - -262", "isController": false}, {"data": [[1.59499398E12, 206.83333333333331]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -318", "isController": false}, {"data": [[1.59499416E12, 503.6666666666667]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --402", "isController": false}, {"data": [[1.59499386E12, 140.0]], "isOverall": false, "label": "Login - -207-1", "isController": false}, {"data": [[1.59499416E12, 306.0]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --403", "isController": false}, {"data": [[1.5949941E12, 0.0], [1.59499416E12, 359.3333333333333]], "isOverall": false, "label": "Impuestos Siguiente - -370", "isController": false}, {"data": [[1.59499416E12, 359.3333333333333]], "isOverall": false, "label": "Impuestos Siguiente - -371", "isController": false}, {"data": [[1.59499386E12, 184.5]], "isOverall": false, "label": "Siguiente 2 - -238", "isController": false}, {"data": [[1.59499398E12, 326.3333333333333]], "isOverall": false, "label": "Editar Facturacion - -286", "isController": false}, {"data": [[1.59499398E12, 0.0]], "isOverall": false, "label": "Editar Facturacion - -287", "isController": false}, {"data": [[1.59499392E12, 381.3333333333333]], "isOverall": false, "label": "Editar Facturacion - -284", "isController": false}, {"data": [[1.59499398E12, 0.0], [1.59499392E12, 0.0]], "isOverall": false, "label": "Editar Facturacion - -285", "isController": false}, {"data": [[1.59499398E12, 1408.0], [1.59499392E12, 0.0]], "isOverall": false, "label": "Editar Facturacion - -283", "isController": false}, {"data": [[1.59499404E12, 174.0]], "isOverall": false, "label": "Descuentos Siguiente - -345", "isController": false}, {"data": [[1.59499392E12, 345.6666666666667]], "isOverall": false, "label": "Siguiente 3 - -247", "isController": false}, {"data": [[1.59499404E12, 348.0]], "isOverall": false, "label": "Descuentos Siguiente - -346", "isController": false}, {"data": [[1.59499392E12, 0.0]], "isOverall": false, "label": "Siguiente 3 - -249", "isController": false}, {"data": [[1.59499392E12, 172.83333333333334]], "isOverall": false, "label": "Siguiente 3 - -242", "isController": false}, {"data": [[1.59499398E12, 130.33333333333334]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -298", "isController": false}, {"data": [[1.59499398E12, 469.5]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -297", "isController": false}, {"data": [[1.59499392E12, 1734.6666666666667]], "isOverall": false, "label": "Clic Crear Agente - -250", "isController": false}, {"data": [[1.59499392E12, 322.3333333333333]], "isOverall": false, "label": "Clic Crear Agente - -251", "isController": false}, {"data": [[1.5949941E12, 573.5]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -362", "isController": false}, {"data": [[1.59499404E12, 333.3333333333333]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -341", "isController": false}, {"data": [[1.59499404E12, 166.66666666666669]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -340", "isController": false}, {"data": [[1.59499416E12, 0.0]], "isOverall": false, "label": "Calculo de Prima Clic Boton Prima - -378", "isController": false}, {"data": [[1.59499416E12, 171.66666666666669]], "isOverall": false, "label": "Calculo de Prima Guardar - -376", "isController": false}, {"data": [[1.59499416E12, 343.3333333333333]], "isOverall": false, "label": "Calculo de Prima Guardar - -377", "isController": false}, {"data": [[1.59499404E12, 406.3333333333333]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -336", "isController": false}, {"data": [[1.59499404E12, 390.3333333333333]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -335", "isController": false}, {"data": [[1.59499404E12, 398.33333333333337]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -334", "isController": false}, {"data": [[1.5949941E12, 353.0]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -365", "isController": false}, {"data": [[1.59499416E12, 182.66666666666669]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -374", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "Login - -209", "isController": false}, {"data": [[1.59499416E12, 365.3333333333333]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -375", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "Login - -207", "isController": false}, {"data": [[1.59499416E12, 26122.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59499398E12, 280.3333333333333]], "isOverall": false, "label": "Agregar Participante de la Poliza - -312", "isController": false}, {"data": [[1.59499398E12, 0.0], [1.59499404E12, 3299.6666666666665]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -320", "isController": false}, {"data": [[1.5949941E12, 444.0]], "isOverall": false, "label": "Deducible Siguiente - -360", "isController": false}, {"data": [[1.59499398E12, 321.3333333333333]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -324", "isController": false}, {"data": [[1.59499398E12, 0.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -322", "isController": false}, {"data": [[1.59499386E12, 340.3333333333333]], "isOverall": false, "label": "Clic Menu Operaciones del Sistema - -222", "isController": false}, {"data": [[1.59499398E12, 408.6666666666667]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -321", "isController": false}, {"data": [[1.5949941E12, 516.6666666666666]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -367", "isController": false}, {"data": [[1.59499398E12, 631.6666666666666]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -326", "isController": false}, {"data": [[1.59499398E12, 315.83333333333337]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -325", "isController": false}, {"data": [[1.59499386E12, 201.83333333333334]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -224", "isController": false}, {"data": [[1.59499398E12, 221.33333333333334], [1.59499404E12, 459.3333333333333]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -329", "isController": false}, {"data": [[1.5949941E12, 620.3333333333333]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -366", "isController": false}, {"data": [[1.59499416E12, 212.66666666666669]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --409", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "Ingresar Cedula del Cliente - -233", "isController": false}, {"data": [[1.59499398E12, 109.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -306", "isController": false}, {"data": [[1.59499398E12, 224.66666666666669]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -307", "isController": false}, {"data": [[1.59499398E12, 248.66666666666669]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -305", "isController": false}, {"data": [[1.5949941E12, 379.5], [1.59499404E12, 439.0]], "isOverall": false, "label": "Clic Crear Deducible - -352", "isController": false}, {"data": [[1.59499398E12, 375.0]], "isOverall": false, "label": "Guardar Facturacion - -290", "isController": false}, {"data": [[1.59499404E12, 121.66666666666667]], "isOverall": false, "label": "Clic Crear Deducible - -351", "isController": false}, {"data": [[1.59499398E12, 340.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -308", "isController": false}, {"data": [[1.5949941E12, 0.0]], "isOverall": false, "label": "Clic Crear Deducible - -354", "isController": false}, {"data": [[1.59499398E12, 109.33333333333333]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -309", "isController": false}, {"data": [[1.59499392E12, 380.1666666666667]], "isOverall": false, "label": "Guardar Agente - -263", "isController": false}, {"data": [[1.59499404E12, 338.6666666666667]], "isOverall": false, "label": "Clic Crear Deducible - -350", "isController": false}, {"data": [[1.5949941E12, 222.0]], "isOverall": false, "label": "Deducible Siguiente - -357", "isController": false}, {"data": [[1.59499392E12, 359.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -271", "isController": false}, {"data": [[1.59499392E12, 0.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -272", "isController": false}, {"data": [[1.59499392E12, 327.6666666666667]], "isOverall": false, "label": "Guardar Agente - -267", "isController": false}, {"data": [[1.59499392E12, 0.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -273", "isController": false}, {"data": [[1.59499416E12, 226.0]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --408", "isController": false}, {"data": [[1.59499392E12, 334.3333333333333]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -274", "isController": false}, {"data": [[1.59499392E12, 180.16666666666666]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -275", "isController": false}, {"data": [[1.59499392E12, 0.0]], "isOverall": false, "label": "Guardar Agente - -268", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "Login - -209-0", "isController": false}, {"data": [[1.59499392E12, 360.3333333333333]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -278", "isController": false}, {"data": [[1.59499386E12, 0.0]], "isOverall": false, "label": "Login - -209-1", "isController": false}, {"data": [[1.59499398E12, 362.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -302", "isController": false}, {"data": [[1.59499398E12, 366.3333333333333]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -303", "isController": false}, {"data": [[1.59499398E12, 235.33333333333334]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -300", "isController": false}, {"data": [[1.59499398E12, 403.1666666666667]], "isOverall": false, "label": "Guardar Facturacion - -289", "isController": false}, {"data": [[1.59499398E12, 116.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -301", "isController": false}, {"data": [[1.5949941E12, 201.5]], "isOverall": false, "label": "Comisiones Siguiente - -368", "isController": false}, {"data": [[1.5949941E12, 403.0]], "isOverall": false, "label": "Comisiones Siguiente - -369", "isController": false}, {"data": [[1.59499416E12, 0.0]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -384", "isController": false}, {"data": [[1.59499404E12, 0.0]], "isOverall": false, "label": "Prima Objeto de Cobertura - -342", "isController": false}, {"data": [[1.59499416E12, 365.3333333333333]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -382", "isController": false}, {"data": [[1.59499386E12, 194.66666666666666]], "isOverall": false, "label": "Siguiente - -236", "isController": false}, {"data": [[1.5949941E12, 364.6666666666667]], "isOverall": false, "label": "Guardar Deducible - -356", "isController": false}, {"data": [[1.59499386E12, 389.3333333333333]], "isOverall": false, "label": "Siguiente - -237", "isController": false}, {"data": [[1.5949941E12, 633.3333333333333]], "isOverall": false, "label": "Guardar Deducible - -355", "isController": false}, {"data": [[1.59499416E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59499416E12, 576.0]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -379", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59499416E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.59499386E12, "maxY": 11765.0, "series": [{"data": [[1.59499398E12, 10100.0], [1.5949941E12, 11439.0], [1.59499392E12, 11765.0], [1.59499404E12, 9566.0], [1.59499386E12, 11400.0], [1.59499416E12, 8857.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.59499398E12, 300.0], [1.5949941E12, 675.0], [1.59499392E12, 164.0], [1.59499404E12, 466.0], [1.59499386E12, 98.0], [1.59499416E12, 0.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.59499398E12, 4207.700000000005], [1.5949941E12, 9686.2], [1.59499392E12, 6664.79999999999], [1.59499404E12, 7866.200000000001], [1.59499386E12, 8992.0], [1.59499416E12, 6803.400000000001]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.59499398E12, 10100.0], [1.5949941E12, 11439.0], [1.59499392E12, 11765.0], [1.59499404E12, 9566.0], [1.59499386E12, 11400.0], [1.59499416E12, 8857.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.59499398E12, 5459.599999999999], [1.5949941E12, 11113.15], [1.59499392E12, 10876.999999999996], [1.59499404E12, 8946.099999999999], [1.59499386E12, 11169.199999999999], [1.59499416E12, 7256.499999999995]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59499416E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 265.0, "minX": 1.0, "maxY": 2014.5, "series": [{"data": [[8.0, 316.0], [2.0, 1472.5], [1.0, 2014.5], [4.0, 974.0], [10.0, 340.0], [5.0, 893.0], [6.0, 265.0], [3.0, 1278.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 10.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 205.0, "minX": 1.0, "maxY": 1850.5, "series": [{"data": [[8.0, 205.0], [2.0, 1251.5], [1.0, 1850.5], [4.0, 915.5], [10.0, 260.5], [5.0, 674.0], [6.0, 214.0], [3.0, 1182.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 10.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.6333333333333333, "minX": 1.59499386E12, "maxY": 1.6333333333333333, "series": [{"data": [[1.59499398E12, 1.6333333333333333], [1.5949941E12, 0.6333333333333333], [1.59499392E12, 1.5166666666666666], [1.59499404E12, 1.0166666666666666], [1.59499386E12, 1.1], [1.59499416E12, 0.9]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59499416E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.15, "minX": 1.59499386E12, "maxY": 1.6333333333333333, "series": [{"data": [[1.59499398E12, 1.6333333333333333], [1.5949941E12, 0.6333333333333333], [1.59499392E12, 1.5166666666666666], [1.59499404E12, 1.0166666666666666], [1.59499386E12, 0.9], [1.59499416E12, 0.95]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.59499386E12, 0.15]], "isOverall": false, "label": "302", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59499416E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.59499386E12, "maxY": 0.1, "series": [{"data": [[1.59499392E12, 0.1]], "isOverall": false, "label": "Ingresar Id Agente - -260-success", "isController": false}, {"data": [[1.59499392E12, 0.05]], "isOverall": false, "label": "Guardar Agente - -268-success", "isController": false}, {"data": [[1.5949941E12, 0.03333333333333333], [1.59499404E12, 0.016666666666666666]], "isOverall": false, "label": "Clic Crear Deducible - -352-success", "isController": false}, {"data": [[1.59499404E12, 0.05]], "isOverall": false, "label": "Descuentos Siguiente - -346-success", "isController": false}, {"data": [[1.59499386E12, 0.1]], "isOverall": false, "label": "Login - -207-success", "isController": false}, {"data": [[1.59499398E12, 0.1]], "isOverall": false, "label": "Guardar Facturacion - -289-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -301-success", "isController": false}, {"data": [[1.59499386E12, 0.1]], "isOverall": false, "label": "Index - -202-success", "isController": false}, {"data": [[1.59499398E12, 0.1]], "isOverall": false, "label": "Agregar Participante de la Poliza - -312-success", "isController": false}, {"data": [[1.59499398E12, 0.1]], "isOverall": false, "label": "Guardar Participante de la Poliza - -315-success", "isController": false}, {"data": [[1.59499392E12, 0.05]], "isOverall": false, "label": "Ingresar Id Agente - -258-success", "isController": false}, {"data": [[1.59499416E12, 0.1]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --405-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Login - -209-1-success", "isController": false}, {"data": [[1.5949941E12, 0.1]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -366-success", "isController": false}, {"data": [[1.59499398E12, 0.1]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -297-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -305-success", "isController": false}, {"data": [[1.5949941E12, 0.1]], "isOverall": false, "label": "Comisiones Siguiente - -368-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -319-success", "isController": false}, {"data": [[1.59499404E12, 0.1]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -340-success", "isController": false}, {"data": [[1.59499416E12, 0.05]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -382-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Buscar Cedula del Cliente - -235-success", "isController": false}, {"data": [[1.59499392E12, 0.05]], "isOverall": false, "label": "Siguiente 3 - -249-success", "isController": false}, {"data": [[1.59499398E12, 0.05], [1.59499404E12, 0.05]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -329-success", "isController": false}, {"data": [[1.59499392E12, 0.05]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -273-success", "isController": false}, {"data": [[1.5949941E12, 0.1]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -362-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -321-success", "isController": false}, {"data": [[1.59499404E12, 0.1]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -331-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Editar Facturacion - -287-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -308-success", "isController": false}, {"data": [[1.59499404E12, 0.1]], "isOverall": false, "label": "Editar Objeto de Cobertura - -339-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -298-success", "isController": false}, {"data": [[1.59499398E12, 0.1]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -325-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Index - -203-0-success", "isController": false}, {"data": [[1.59499398E12, 0.05], [1.59499392E12, 0.05]], "isOverall": false, "label": "Editar Facturacion - -283-success", "isController": false}, {"data": [[1.59499416E12, 0.05]], "isOverall": false, "label": "Impuestos Siguiente - -371-success", "isController": false}, {"data": [[1.59499386E12, 0.1]], "isOverall": false, "label": "Clic Menu Operaciones del Sistema - -222-success", "isController": false}, {"data": [[1.59499386E12, 0.1]], "isOverall": false, "label": "Siguiente 2 - -238-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -300-success", "isController": false}, {"data": [[1.59499416E12, 0.05]], "isOverall": false, "label": "Calculo de Prima Guardar - -377-success", "isController": false}, {"data": [[1.59499404E12, 0.05]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -330-success", "isController": false}, {"data": [[1.59499404E12, 0.05]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -336-success", "isController": false}, {"data": [[1.59499386E12, 0.1]], "isOverall": false, "label": "Ingresar Cedula del Cliente - -233-success", "isController": false}, {"data": [[1.59499386E12, 0.1]], "isOverall": false, "label": "Buscar Cedula del Cliente - -234-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Guardar Participante de la Poliza - -316-success", "isController": false}, {"data": [[1.59499398E12, 0.1]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -318-success", "isController": false}, {"data": [[1.59499392E12, 0.1]], "isOverall": false, "label": "Ingresar Id Agente - -257-success", "isController": false}, {"data": [[1.5949941E12, 0.05]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -365-success", "isController": false}, {"data": [[1.59499416E12, 0.1]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -374-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Siguiente - -237-success", "isController": false}, {"data": [[1.59499392E12, 0.05]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -272-success", "isController": false}, {"data": [[1.59499416E12, 0.05]], "isOverall": false, "label": "Transaction Controller-success", "isController": true}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Editar Facturacion - -286-success", "isController": false}, {"data": [[1.5949941E12, 0.05], [1.59499404E12, 0.05]], "isOverall": false, "label": "Clic Crear Deducible - -347-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -322-success", "isController": false}, {"data": [[1.59499392E12, 0.05]], "isOverall": false, "label": "Ingresar Id Agente - -254-success", "isController": false}, {"data": [[1.5949941E12, 0.1]], "isOverall": false, "label": "Guardar Deducible - -355-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -326-success", "isController": false}, {"data": [[1.59499398E12, 0.1]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -294-success", "isController": false}, {"data": [[1.59499392E12, 0.05]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -282-success", "isController": false}, {"data": [[1.59499416E12, 0.1]], "isOverall": false, "label": "Calculo de Prima Guardar - -376-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Login - -207-0-success", "isController": false}, {"data": [[1.5949941E12, 0.05]], "isOverall": false, "label": "Clic Crear Deducible - -354-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -303-success", "isController": false}, {"data": [[1.59499416E12, 0.1]], "isOverall": false, "label": "Clausulas Siguiente - -372-success", "isController": false}, {"data": [[1.59499392E12, 0.05]], "isOverall": false, "label": "Ingresar Id Agente - -262-success", "isController": false}, {"data": [[1.59499416E12, 0.05]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -384-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -295-success", "isController": false}, {"data": [[1.59499404E12, 0.05]], "isOverall": false, "label": "Cobertura Siguiente - -344-success", "isController": false}, {"data": [[1.59499404E12, 0.05]], "isOverall": false, "label": "Clic Crear Deducible - -350-success", "isController": false}, {"data": [[1.59499392E12, 0.1]], "isOverall": false, "label": "Clic Crear Agente - -250-success", "isController": false}, {"data": [[1.59499416E12, 0.05]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --407-success", "isController": false}, {"data": [[1.59499386E12, 0.1]], "isOverall": false, "label": "Clic Menu Control de Polizas - -223-success", "isController": false}, {"data": [[1.59499386E12, 0.1]], "isOverall": false, "label": "Siguiente - -236-success", "isController": false}, {"data": [[1.59499398E12, 0.1]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -307-success", "isController": false}, {"data": [[1.5949941E12, 0.1]], "isOverall": false, "label": "Deducible Siguiente - -357-success", "isController": false}, {"data": [[1.59499416E12, 0.1]], "isOverall": false, "label": "Calculo de Prima Clic Boton Prima - -378-success", "isController": false}, {"data": [[1.59499398E12, 0.1]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -291-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Login - -209-success", "isController": false}, {"data": [[1.59499392E12, 0.1]], "isOverall": false, "label": "Ingresar Id Agente - -256-success", "isController": false}, {"data": [[1.59499392E12, 0.1]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -269-success", "isController": false}, {"data": [[1.59499416E12, 0.05]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -375-success", "isController": false}, {"data": [[1.59499416E12, 0.05]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --409-success", "isController": false}, {"data": [[1.59499404E12, 0.05]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -335-success", "isController": false}, {"data": [[1.59499392E12, 0.05]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -271-success", "isController": false}, {"data": [[1.59499398E12, 0.03333333333333333], [1.59499392E12, 0.016666666666666666]], "isOverall": false, "label": "Editar Facturacion - -285-success", "isController": false}, {"data": [[1.59499392E12, 0.05]], "isOverall": false, "label": "Ingresar Id Agente - -253-success", "isController": false}, {"data": [[1.59499392E12, 0.1]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -281-success", "isController": false}, {"data": [[1.59499404E12, 0.05]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -341-success", "isController": false}, {"data": [[1.59499392E12, 0.1]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -275-success", "isController": false}, {"data": [[1.5949941E12, 0.05]], "isOverall": false, "label": "Guardar Deducible - -356-success", "isController": false}, {"data": [[1.59499392E12, 0.1]], "isOverall": false, "label": "Guardar Agente - -263-success", "isController": false}, {"data": [[1.59499404E12, 0.05]], "isOverall": false, "label": "Clic Crear Deducible - -348-success", "isController": false}, {"data": [[1.59499392E12, 0.05]], "isOverall": false, "label": "Siguiente 3 - -247-success", "isController": false}, {"data": [[1.59499404E12, 0.05]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -333-success", "isController": false}, {"data": [[1.59499392E12, 0.05]], "isOverall": false, "label": "Guardar Agente - -267-success", "isController": false}, {"data": [[1.59499404E12, 0.1]], "isOverall": false, "label": "Editar Objeto de Cobertura - -337-success", "isController": false}, {"data": [[1.59499416E12, 0.05]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --403-success", "isController": false}, {"data": [[1.5949941E12, 0.05]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -367-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Index - -203-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Login - -207-1-success", "isController": false}, {"data": [[1.59499416E12, 0.05]], "isOverall": false, "label": "Clausulas Siguiente - -373-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Login - -209-0-success", "isController": false}, {"data": [[1.59499392E12, 0.1]], "isOverall": false, "label": "Siguiente 3 - -242-success", "isController": false}, {"data": [[1.59499404E12, 0.05]], "isOverall": false, "label": "Clic Crear Deducible - -351-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Guardar Facturacion - -290-success", "isController": false}, {"data": [[1.59499392E12, 0.05]], "isOverall": false, "label": "Ingresar Id Agente - -259-success", "isController": false}, {"data": [[1.59499398E12, 0.1]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -302-success", "isController": false}, {"data": [[1.59499392E12, 0.05]], "isOverall": false, "label": "Ingresar Id Agente - -261-success", "isController": false}, {"data": [[1.59499416E12, 0.05]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --406-success", "isController": false}, {"data": [[1.59499404E12, 0.1]], "isOverall": false, "label": "Cobertura Siguiente - -343-success", "isController": false}, {"data": [[1.5949941E12, 0.05]], "isOverall": false, "label": "Comisiones Siguiente - -369-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -232-success", "isController": false}, {"data": [[1.59499392E12, 0.05]], "isOverall": false, "label": "Clic Crear Agente - -251-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -306-success", "isController": false}, {"data": [[1.59499416E12, 0.1]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --408-success", "isController": false}, {"data": [[1.59499392E12, 0.05]], "isOverall": false, "label": "Ingresar Id Agente - -255-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -292-success", "isController": false}, {"data": [[1.59499404E12, 0.1]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -334-success", "isController": false}, {"data": [[1.59499416E12, 0.1]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -379-success", "isController": false}, {"data": [[1.59499392E12, 0.1]], "isOverall": false, "label": "Ingresar Id Agente - -252-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -309-success", "isController": false}, {"data": [[1.5949941E12, 0.05], [1.59499416E12, 0.05]], "isOverall": false, "label": "Impuestos Siguiente - -370-success", "isController": false}, {"data": [[1.5949941E12, 0.05]], "isOverall": false, "label": "Deducible Siguiente - -360-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Editar Facturacion - -288-success", "isController": false}, {"data": [[1.59499404E12, 0.1]], "isOverall": false, "label": "Prima Objeto de Cobertura - -342-success", "isController": false}, {"data": [[1.59499398E12, 0.05], [1.59499404E12, 0.05]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -320-success", "isController": false}, {"data": [[1.59499416E12, 0.05]], "isOverall": false, "label": "Debug Sampler-success", "isController": false}, {"data": [[1.59499392E12, 0.05]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -274-success", "isController": false}, {"data": [[1.59499392E12, 0.05]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -278-success", "isController": false}, {"data": [[1.59499404E12, 0.05]], "isOverall": false, "label": "Clic Crear Deducible - -349-success", "isController": false}, {"data": [[1.59499404E12, 0.1]], "isOverall": false, "label": "Descuentos Siguiente - -345-success", "isController": false}, {"data": [[1.59499386E12, 0.1]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -224-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Index - -203-1-success", "isController": false}, {"data": [[1.59499416E12, 0.1]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --402-success", "isController": false}, {"data": [[1.59499386E12, 0.05]], "isOverall": false, "label": "Siguiente 2 - -240-success", "isController": false}, {"data": [[1.59499398E12, 0.05]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -324-success", "isController": false}, {"data": [[1.59499392E12, 0.05]], "isOverall": false, "label": "Editar Facturacion - -284-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59499416E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.9333333333333333, "minX": 1.59499386E12, "maxY": 2.183333333333333, "series": [{"data": [[1.59499398E12, 2.183333333333333], [1.5949941E12, 0.9333333333333333], [1.59499392E12, 2.0166666666666666], [1.59499404E12, 1.5166666666666666], [1.59499386E12, 1.5], [1.59499416E12, 1.45]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59499416E12, "title": "Total Transactions Per Second"}},
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
