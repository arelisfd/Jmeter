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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 6.0, "series": [{"data": [[5200.0, 2.0], [5600.0, 1.0], [5700.0, 2.0], [6000.0, 1.0]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -331", "isController": false}, {"data": [[2300.0, 1.0], [1300.0, 1.0], [1500.0, 1.0], [1700.0, 1.0], [900.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Buscar Cedula del Cliente - -234", "isController": false}, {"data": [[600.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Buscar Cedula del Cliente - -235", "isController": false}, {"data": [[400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -333", "isController": false}, {"data": [[800.0, 3.0], [15700.0, 1.0], [15800.0, 1.0], [16000.0, 1.0]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -291", "isController": false}, {"data": [[300.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -292", "isController": false}, {"data": [[1100.0, 1.0], [9600.0, 1.0], [10000.0, 1.0], [9800.0, 1.0], [1300.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Clic Crear Deducible - -347", "isController": false}, {"data": [[400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Editar Facturacion - -288", "isController": false}, {"data": [[500.0, 3.0]], "isOverall": false, "label": "Cobertura Siguiente - -344", "isController": false}, {"data": [[4500.0, 1.0], [4600.0, 1.0], [4700.0, 1.0], [5100.0, 2.0], [5200.0, 1.0]], "isOverall": false, "label": "Cobertura Siguiente - -343", "isController": false}, {"data": [[200.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "Index - -203-0", "isController": false}, {"data": [[700.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Ingresar Id Agente - -261", "isController": false}, {"data": [[200.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "Index - -203-1", "isController": false}, {"data": [[300.0, 1.0], [1300.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Ingresar Id Agente - -260", "isController": false}, {"data": [[300.0, 1.0], [1400.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "Ingresar Id Agente - -252", "isController": false}, {"data": [[300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "Ingresar Id Agente - -254", "isController": false}, {"data": [[400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Ingresar Id Agente - -253", "isController": false}, {"data": [[600.0, 6.0]], "isOverall": false, "label": "Ingresar Id Agente - -256", "isController": false}, {"data": [[300.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --406", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "Ingresar Id Agente - -255", "isController": false}, {"data": [[1100.0, 1.0], [29400.0, 1.0], [30300.0, 1.0], [31700.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -269", "isController": false}, {"data": [[1500.0, 3.0], [800.0, 3.0]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --405", "isController": false}, {"data": [[200.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "Ingresar Id Agente - -258", "isController": false}, {"data": [[1200.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [15200.0, 1.0], [15600.0, 1.0], [16300.0, 1.0]], "isOverall": false, "label": "Editar Objeto de Cobertura - -337", "isController": false}, {"data": [[600.0, 2.0], [400.0, 1.0], [900.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "Ingresar Id Agente - -257", "isController": false}, {"data": [[300.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --407", "isController": false}, {"data": [[400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Siguiente 2 - -240", "isController": false}, {"data": [[400.0, 2.0], [1000.0, 4.0]], "isOverall": false, "label": "Editar Objeto de Cobertura - -339", "isController": false}, {"data": [[100.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "Ingresar Id Agente - -259", "isController": false}, {"data": [[400.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "Index - -203", "isController": false}, {"data": [[600.0, 2.0], [1300.0, 1.0], [800.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "Index - -202", "isController": false}, {"data": [[1100.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "Clic Crear Deducible - -349", "isController": false}, {"data": [[700.0, 1.0], [800.0, 2.0]], "isOverall": false, "label": "Clic Crear Deducible - -348", "isController": false}, {"data": [[4300.0, 1.0], [4100.0, 1.0], [4500.0, 1.0], [4600.0, 1.0], [4800.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": "Clausulas Siguiente - -372", "isController": false}, {"data": [[500.0, 3.0]], "isOverall": false, "label": "Clausulas Siguiente - -373", "isController": false}, {"data": [[600.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -232", "isController": false}, {"data": [[1200.0, 1.0], [1400.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -330", "isController": false}, {"data": [[700.0, 1.0], [800.0, 2.0]], "isOverall": false, "label": "Guardar Participante de la Poliza - -316", "isController": false}, {"data": [[2300.0, 1.0], [2600.0, 2.0], [3100.0, 1.0], [3400.0, 2.0]], "isOverall": false, "label": "Guardar Participante de la Poliza - -315", "isController": false}, {"data": [[700.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -282", "isController": false}, {"data": [[1300.0, 1.0], [1400.0, 2.0], [800.0, 1.0], [1700.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -294", "isController": false}, {"data": [[4700.0, 1.0], [5500.0, 1.0], [5700.0, 1.0], [5800.0, 1.0], [6600.0, 1.0], [6800.0, 1.0]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -281", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -295", "isController": false}, {"data": [[100.0, 6.0]], "isOverall": false, "label": "Clic Menu Control de Polizas - -223", "isController": false}, {"data": [[400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -319", "isController": false}, {"data": [[300.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "Login - -207-0", "isController": false}, {"data": [[300.0, 2.0], [700.0, 1.0]], "isOverall": false, "label": "Ingresar Id Agente - -262", "isController": false}, {"data": [[4800.0, 1.0], [4700.0, 1.0], [5200.0, 1.0], [5600.0, 1.0], [5400.0, 1.0], [6000.0, 1.0]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -318", "isController": false}, {"data": [[4100.0, 1.0], [2800.0, 2.0], [3400.0, 3.0]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --402", "isController": false}, {"data": [[0.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "Login - -207-1", "isController": false}, {"data": [[600.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --403", "isController": false}, {"data": [[4200.0, 2.0], [4500.0, 1.0], [5000.0, 2.0], [3900.0, 1.0]], "isOverall": false, "label": "Impuestos Siguiente - -370", "isController": false}, {"data": [[600.0, 1.0], [800.0, 2.0]], "isOverall": false, "label": "Impuestos Siguiente - -371", "isController": false}, {"data": [[4800.0, 2.0], [5100.0, 1.0], [5300.0, 2.0], [5700.0, 1.0]], "isOverall": false, "label": "Siguiente 2 - -238", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Editar Facturacion - -286", "isController": false}, {"data": [[300.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Editar Facturacion - -287", "isController": false}, {"data": [[300.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "Editar Facturacion - -284", "isController": false}, {"data": [[600.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Editar Facturacion - -285", "isController": false}, {"data": [[300.0, 1.0], [700.0, 2.0], [6600.0, 1.0], [7000.0, 2.0]], "isOverall": false, "label": "Editar Facturacion - -283", "isController": false}, {"data": [[4400.0, 1.0], [4500.0, 1.0], [4600.0, 1.0], [4900.0, 1.0], [5100.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "Descuentos Siguiente - -345", "isController": false}, {"data": [[700.0, 2.0], [800.0, 1.0]], "isOverall": false, "label": "Siguiente 3 - -247", "isController": false}, {"data": [[600.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Descuentos Siguiente - -346", "isController": false}, {"data": [[600.0, 1.0], [800.0, 2.0]], "isOverall": false, "label": "Siguiente 3 - -249", "isController": false}, {"data": [[9800.0, 1.0], [10100.0, 2.0], [11200.0, 1.0], [11700.0, 2.0]], "isOverall": false, "label": "Siguiente 3 - -242", "isController": false}, {"data": [[600.0, 1.0], [1200.0, 1.0], [1400.0, 1.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -298", "isController": false}, {"data": [[600.0, 1.0], [2800.0, 1.0], [3100.0, 2.0], [800.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -297", "isController": false}, {"data": [[8400.0, 1.0], [8600.0, 1.0], [8500.0, 1.0], [600.0, 3.0]], "isOverall": false, "label": "Clic Crear Agente - -250", "isController": false}, {"data": [[600.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Clic Crear Agente - -251", "isController": false}, {"data": [[8500.0, 1.0], [8900.0, 1.0], [6800.0, 1.0], [7200.0, 1.0], [7500.0, 1.0], [7900.0, 1.0]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -362", "isController": false}, {"data": [[400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -341", "isController": false}, {"data": [[4300.0, 1.0], [3000.0, 1.0], [3200.0, 1.0], [3500.0, 1.0], [3700.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -340", "isController": false}, {"data": [[4100.0, 2.0], [4900.0, 2.0], [5000.0, 2.0]], "isOverall": false, "label": "Calculo de Prima Clic Boton Prima - -378", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [1200.0, 1.0], [1300.0, 1.0], [1500.0, 2.0]], "isOverall": false, "label": "Calculo de Prima Guardar - -376", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "Calculo de Prima Guardar - -377", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -336", "isController": false}, {"data": [[2200.0, 2.0], [2700.0, 1.0]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -335", "isController": false}, {"data": [[4100.0, 1.0], [1100.0, 1.0], [4500.0, 1.0], [1200.0, 1.0], [400.0, 1.0], [3700.0, 1.0]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -334", "isController": false}, {"data": [[1200.0, 1.0], [1300.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -365", "isController": false}, {"data": [[4200.0, 2.0], [4300.0, 1.0], [4800.0, 1.0], [4700.0, 1.0], [4900.0, 1.0]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -374", "isController": false}, {"data": [[4900.0, 2.0], [5700.0, 1.0]], "isOverall": false, "label": "Login - -209", "isController": false}, {"data": [[600.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -375", "isController": false}, {"data": [[300.0, 2.0], [5200.0, 2.0], [6100.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Login - -207", "isController": false}, {"data": [[225700.0, 1.0], [227600.0, 1.0], [226800.0, 1.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[900.0, 4.0], [1000.0, 2.0]], "isOverall": false, "label": "Agregar Participante de la Poliza - -312", "isController": false}, {"data": [[4500.0, 2.0], [4800.0, 1.0], [20800.0, 1.0], [21600.0, 1.0], [21900.0, 1.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -320", "isController": false}, {"data": [[1300.0, 1.0], [1400.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Deducible Siguiente - -360", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -324", "isController": false}, {"data": [[1200.0, 1.0], [1300.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -322", "isController": false}, {"data": [[700.0, 4.0], [500.0, 2.0]], "isOverall": false, "label": "Clic Menu Operaciones del Sistema - -222", "isController": false}, {"data": [[700.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -321", "isController": false}, {"data": [[800.0, 3.0]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -367", "isController": false}, {"data": [[1400.0, 1.0], [800.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -326", "isController": false}, {"data": [[2100.0, 1.0], [1100.0, 2.0], [1200.0, 1.0], [2500.0, 1.0], [2800.0, 1.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -325", "isController": false}, {"data": [[2300.0, 1.0], [2200.0, 1.0], [2400.0, 1.0], [2800.0, 1.0], [3000.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -224", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 2.0], [1400.0, 1.0], [800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -329", "isController": false}, {"data": [[4200.0, 1.0], [4500.0, 1.0], [4700.0, 1.0], [5100.0, 1.0], [5600.0, 1.0], [5400.0, 1.0]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -366", "isController": false}, {"data": [[200.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --409", "isController": false}, {"data": [[300.0, 4.0], [500.0, 2.0]], "isOverall": false, "label": "Ingresar Cedula del Cliente - -233", "isController": false}, {"data": [[600.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -306", "isController": false}, {"data": [[1100.0, 1.0], [2400.0, 3.0], [800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -307", "isController": false}, {"data": [[300.0, 3.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -305", "isController": false}, {"data": [[700.0, 3.0]], "isOverall": false, "label": "Clic Crear Deducible - -352", "isController": false}, {"data": [[800.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Guardar Facturacion - -290", "isController": false}, {"data": [[1100.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "Clic Crear Deducible - -351", "isController": false}, {"data": [[700.0, 2.0], [800.0, 1.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -308", "isController": false}, {"data": [[600.0, 1.0], [700.0, 2.0]], "isOverall": false, "label": "Clic Crear Deducible - -354", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -309", "isController": false}, {"data": [[2500.0, 1.0], [2600.0, 1.0], [2800.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Guardar Agente - -263", "isController": false}, {"data": [[1100.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "Clic Crear Deducible - -350", "isController": false}, {"data": [[8200.0, 1.0], [8900.0, 1.0], [9000.0, 1.0], [7400.0, 1.0], [7500.0, 2.0]], "isOverall": false, "label": "Deducible Siguiente - -357", "isController": false}, {"data": [[1200.0, 2.0], [900.0, 1.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -271", "isController": false}, {"data": [[200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -272", "isController": false}, {"data": [[500.0, 3.0]], "isOverall": false, "label": "Guardar Agente - -267", "isController": false}, {"data": [[600.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -273", "isController": false}, {"data": [[600.0, 1.0], [700.0, 2.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --408", "isController": false}, {"data": [[800.0, 1.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -274", "isController": false}, {"data": [[24900.0, 1.0], [25200.0, 1.0], [25900.0, 2.0], [26300.0, 1.0], [27200.0, 1.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -275", "isController": false}, {"data": [[400.0, 3.0]], "isOverall": false, "label": "Guardar Agente - -268", "isController": false}, {"data": [[0.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "Login - -209-0", "isController": false}, {"data": [[700.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -278", "isController": false}, {"data": [[4800.0, 1.0], [4700.0, 1.0], [5600.0, 1.0]], "isOverall": false, "label": "Login - -209-1", "isController": false}, {"data": [[700.0, 1.0], [2900.0, 1.0], [3100.0, 1.0], [800.0, 2.0], [3200.0, 1.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -302", "isController": false}, {"data": [[1100.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -303", "isController": false}, {"data": [[600.0, 1.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -300", "isController": false}, {"data": [[4100.0, 1.0], [2400.0, 1.0], [2500.0, 1.0], [3300.0, 1.0], [3400.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "Guardar Facturacion - -289", "isController": false}, {"data": [[600.0, 1.0], [700.0, 2.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -301", "isController": false}, {"data": [[4400.0, 2.0], [4500.0, 1.0], [5100.0, 2.0], [5200.0, 1.0]], "isOverall": false, "label": "Comisiones Siguiente - -368", "isController": false}, {"data": [[700.0, 3.0]], "isOverall": false, "label": "Comisiones Siguiente - -369", "isController": false}, {"data": [[400.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -384", "isController": false}, {"data": [[9100.0, 2.0], [9500.0, 2.0], [10100.0, 2.0]], "isOverall": false, "label": "Prima Objeto de Cobertura - -342", "isController": false}, {"data": [[900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -382", "isController": false}, {"data": [[5400.0, 1.0], [5800.0, 1.0], [5900.0, 1.0], [6400.0, 1.0], [7300.0, 1.0], [7800.0, 1.0]], "isOverall": false, "label": "Siguiente - -236", "isController": false}, {"data": [[400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Guardar Deducible - -356", "isController": false}, {"data": [[500.0, 3.0]], "isOverall": false, "label": "Siguiente - -237", "isController": false}, {"data": [[2600.0, 3.0], [3000.0, 1.0], [3100.0, 2.0]], "isOverall": false, "label": "Guardar Deducible - -355", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[4300.0, 2.0], [5400.0, 1.0], [3400.0, 1.0], [3500.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -379", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 227600.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 95.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 214.0, "series": [{"data": [[0.0, 99.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 214.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 95.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 2.793103448275862, "minX": 1.59496746E12, "maxY": 3.0, "series": [{"data": [[1.59496752E12, 3.0], [1.5949677E12, 2.793103448275862], [1.59496758E12, 3.0], [1.59496746E12, 2.8777777777777787], [1.59496764E12, 3.0]], "isOverall": false, "label": "2- Thread Group_Cotizacion", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.5949677E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 227695.0, "series": [{"data": [[6.0, 5625.166666666667]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -331", "isController": false}, {"data": [[6.0, 5625.166666666667]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -331-Aggregated", "isController": false}, {"data": [[6.0, 1621.1666666666665]], "isOverall": false, "label": "Buscar Cedula del Cliente - -234", "isController": false}, {"data": [[6.0, 1621.1666666666665]], "isOverall": false, "label": "Buscar Cedula del Cliente - -234-Aggregated", "isController": false}, {"data": [[6.0, 563.6666666666666]], "isOverall": false, "label": "Buscar Cedula del Cliente - -235", "isController": false}, {"data": [[6.0, 563.6666666666666]], "isOverall": false, "label": "Buscar Cedula del Cliente - -235-Aggregated", "isController": false}, {"data": [[6.0, 469.6666666666667]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -333", "isController": false}, {"data": [[6.0, 469.6666666666667]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -333-Aggregated", "isController": false}, {"data": [[6.0, 8357.5]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -291", "isController": false}, {"data": [[6.0, 8357.5]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -291-Aggregated", "isController": false}, {"data": [[6.0, 416.0]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -292", "isController": false}, {"data": [[6.0, 416.0]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -292-Aggregated", "isController": false}, {"data": [[6.0, 5502.666666666666]], "isOverall": false, "label": "Clic Crear Deducible - -347", "isController": false}, {"data": [[6.0, 5502.666666666666]], "isOverall": false, "label": "Clic Crear Deducible - -347-Aggregated", "isController": false}, {"data": [[6.0, 486.6666666666667]], "isOverall": false, "label": "Editar Facturacion - -288", "isController": false}, {"data": [[6.0, 486.6666666666667]], "isOverall": false, "label": "Editar Facturacion - -288-Aggregated", "isController": false}, {"data": [[6.0, 557.3333333333334]], "isOverall": false, "label": "Cobertura Siguiente - -344", "isController": false}, {"data": [[6.0, 557.3333333333334]], "isOverall": false, "label": "Cobertura Siguiente - -344-Aggregated", "isController": false}, {"data": [[6.0, 4925.333333333334]], "isOverall": false, "label": "Cobertura Siguiente - -343", "isController": false}, {"data": [[6.0, 4925.333333333334]], "isOverall": false, "label": "Cobertura Siguiente - -343-Aggregated", "isController": false}, {"data": [[4.0, 202.5], [6.0, 134.0]], "isOverall": false, "label": "Index - -203-0", "isController": false}, {"data": [[4.666666666666667, 179.66666666666666]], "isOverall": false, "label": "Index - -203-0-Aggregated", "isController": false}, {"data": [[6.0, 612.0]], "isOverall": false, "label": "Ingresar Id Agente - -261", "isController": false}, {"data": [[6.0, 612.0]], "isOverall": false, "label": "Ingresar Id Agente - -261-Aggregated", "isController": false}, {"data": [[4.0, 155.0], [6.0, 151.0]], "isOverall": false, "label": "Index - -203-1", "isController": false}, {"data": [[4.666666666666667, 153.66666666666666]], "isOverall": false, "label": "Index - -203-1-Aggregated", "isController": false}, {"data": [[6.0, 994.3333333333333]], "isOverall": false, "label": "Ingresar Id Agente - -260", "isController": false}, {"data": [[6.0, 994.3333333333333]], "isOverall": false, "label": "Ingresar Id Agente - -260-Aggregated", "isController": false}, {"data": [[6.0, 929.1666666666666]], "isOverall": false, "label": "Ingresar Id Agente - -252", "isController": false}, {"data": [[6.0, 929.1666666666666]], "isOverall": false, "label": "Ingresar Id Agente - -252-Aggregated", "isController": false}, {"data": [[6.0, 202.0]], "isOverall": false, "label": "Ingresar Id Agente - -254", "isController": false}, {"data": [[6.0, 202.0]], "isOverall": false, "label": "Ingresar Id Agente - -254-Aggregated", "isController": false}, {"data": [[6.0, 497.3333333333333]], "isOverall": false, "label": "Ingresar Id Agente - -253", "isController": false}, {"data": [[6.0, 497.3333333333333]], "isOverall": false, "label": "Ingresar Id Agente - -253-Aggregated", "isController": false}, {"data": [[6.0, 668.3333333333334]], "isOverall": false, "label": "Ingresar Id Agente - -256", "isController": false}, {"data": [[6.0, 668.3333333333334]], "isOverall": false, "label": "Ingresar Id Agente - -256-Aggregated", "isController": false}, {"data": [[3.0, 404.0]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --406", "isController": false}, {"data": [[3.0, 404.0]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --406-Aggregated", "isController": false}, {"data": [[6.0, 261.6666666666667]], "isOverall": false, "label": "Ingresar Id Agente - -255", "isController": false}, {"data": [[6.0, 261.6666666666667]], "isOverall": false, "label": "Ingresar Id Agente - -255-Aggregated", "isController": false}, {"data": [[6.0, 15805.833333333334]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -269", "isController": false}, {"data": [[6.0, 15805.833333333334]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -269-Aggregated", "isController": false}, {"data": [[3.0, 1216.5]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --405", "isController": false}, {"data": [[3.0, 1216.5]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --405-Aggregated", "isController": false}, {"data": [[6.0, 179.33333333333334]], "isOverall": false, "label": "Ingresar Id Agente - -258", "isController": false}, {"data": [[6.0, 179.33333333333334]], "isOverall": false, "label": "Ingresar Id Agente - -258-Aggregated", "isController": false}, {"data": [[6.0, 8582.0]], "isOverall": false, "label": "Editar Objeto de Cobertura - -337", "isController": false}, {"data": [[6.0, 8582.0]], "isOverall": false, "label": "Editar Objeto de Cobertura - -337-Aggregated", "isController": false}, {"data": [[6.0, 785.1666666666666]], "isOverall": false, "label": "Ingresar Id Agente - -257", "isController": false}, {"data": [[6.0, 785.1666666666666]], "isOverall": false, "label": "Ingresar Id Agente - -257-Aggregated", "isController": false}, {"data": [[3.0, 291.0]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --407", "isController": false}, {"data": [[3.0, 291.0]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --407-Aggregated", "isController": false}, {"data": [[6.0, 538.0]], "isOverall": false, "label": "Siguiente 2 - -240", "isController": false}, {"data": [[6.0, 538.0]], "isOverall": false, "label": "Siguiente 2 - -240-Aggregated", "isController": false}, {"data": [[6.0, 837.0]], "isOverall": false, "label": "Editar Objeto de Cobertura - -339", "isController": false}, {"data": [[6.0, 837.0]], "isOverall": false, "label": "Editar Objeto de Cobertura - -339-Aggregated", "isController": false}, {"data": [[6.0, 232.33333333333334]], "isOverall": false, "label": "Ingresar Id Agente - -259", "isController": false}, {"data": [[6.0, 232.33333333333334]], "isOverall": false, "label": "Ingresar Id Agente - -259-Aggregated", "isController": false}, {"data": [[4.0, 358.5], [6.0, 285.0]], "isOverall": false, "label": "Index - -203", "isController": false}, {"data": [[4.666666666666667, 334.0]], "isOverall": false, "label": "Index - -203-Aggregated", "isController": false}, {"data": [[4.0, 835.3333333333334], [3.0, 893.0], [6.0, 543.5]], "isOverall": false, "label": "Index - -202", "isController": false}, {"data": [[4.5, 747.6666666666666]], "isOverall": false, "label": "Index - -202-Aggregated", "isController": false}, {"data": [[6.0, 1107.3333333333333]], "isOverall": false, "label": "Clic Crear Deducible - -349", "isController": false}, {"data": [[6.0, 1107.3333333333333]], "isOverall": false, "label": "Clic Crear Deducible - -349-Aggregated", "isController": false}, {"data": [[6.0, 807.3333333333334]], "isOverall": false, "label": "Clic Crear Deducible - -348", "isController": false}, {"data": [[6.0, 807.3333333333334]], "isOverall": false, "label": "Clic Crear Deducible - -348-Aggregated", "isController": false}, {"data": [[6.0, 4424.5]], "isOverall": false, "label": "Clausulas Siguiente - -372", "isController": false}, {"data": [[6.0, 4424.5]], "isOverall": false, "label": "Clausulas Siguiente - -372-Aggregated", "isController": false}, {"data": [[6.0, 529.0]], "isOverall": false, "label": "Clausulas Siguiente - -373", "isController": false}, {"data": [[6.0, 529.0]], "isOverall": false, "label": "Clausulas Siguiente - -373-Aggregated", "isController": false}, {"data": [[6.0, 632.6666666666666]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -232", "isController": false}, {"data": [[6.0, 632.6666666666666]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -232-Aggregated", "isController": false}, {"data": [[6.0, 1172.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -330", "isController": false}, {"data": [[6.0, 1172.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -330-Aggregated", "isController": false}, {"data": [[6.0, 810.0]], "isOverall": false, "label": "Guardar Participante de la Poliza - -316", "isController": false}, {"data": [[6.0, 810.0]], "isOverall": false, "label": "Guardar Participante de la Poliza - -316-Aggregated", "isController": false}, {"data": [[6.0, 2953.666666666667]], "isOverall": false, "label": "Guardar Participante de la Poliza - -315", "isController": false}, {"data": [[6.0, 2953.666666666667]], "isOverall": false, "label": "Guardar Participante de la Poliza - -315-Aggregated", "isController": false}, {"data": [[6.0, 875.6666666666666]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -282", "isController": false}, {"data": [[6.0, 875.6666666666666]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -282-Aggregated", "isController": false}, {"data": [[6.0, 1312.8333333333335]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -294", "isController": false}, {"data": [[6.0, 1312.8333333333335]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -294-Aggregated", "isController": false}, {"data": [[6.0, 5901.833333333334]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -281", "isController": false}, {"data": [[6.0, 5901.833333333334]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -281-Aggregated", "isController": false}, {"data": [[6.0, 497.6666666666667]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -295", "isController": false}, {"data": [[6.0, 497.6666666666667]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -295-Aggregated", "isController": false}, {"data": [[6.0, 145.0]], "isOverall": false, "label": "Clic Menu Control de Polizas - -223", "isController": false}, {"data": [[6.0, 145.0]], "isOverall": false, "label": "Clic Menu Control de Polizas - -223-Aggregated", "isController": false}, {"data": [[6.0, 530.6666666666666]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -319", "isController": false}, {"data": [[6.0, 530.6666666666666]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -319-Aggregated", "isController": false}, {"data": [[6.0, 276.6666666666667]], "isOverall": false, "label": "Login - -207-0", "isController": false}, {"data": [[6.0, 276.6666666666667]], "isOverall": false, "label": "Login - -207-0-Aggregated", "isController": false}, {"data": [[6.0, 466.0]], "isOverall": false, "label": "Ingresar Id Agente - -262", "isController": false}, {"data": [[6.0, 466.0]], "isOverall": false, "label": "Ingresar Id Agente - -262-Aggregated", "isController": false}, {"data": [[6.0, 5349.0]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -318", "isController": false}, {"data": [[6.0, 5349.0]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -318-Aggregated", "isController": false}, {"data": [[3.0, 3349.8333333333335]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --402", "isController": false}, {"data": [[3.0, 3349.8333333333335]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --402-Aggregated", "isController": false}, {"data": [[6.0, 102.66666666666667]], "isOverall": false, "label": "Login - -207-1", "isController": false}, {"data": [[6.0, 102.66666666666667]], "isOverall": false, "label": "Login - -207-1-Aggregated", "isController": false}, {"data": [[3.0, 612.3333333333334]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --403", "isController": false}, {"data": [[3.0, 612.3333333333334]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --403-Aggregated", "isController": false}, {"data": [[6.0, 4512.333333333333]], "isOverall": false, "label": "Impuestos Siguiente - -370", "isController": false}, {"data": [[6.0, 4512.333333333333]], "isOverall": false, "label": "Impuestos Siguiente - -370-Aggregated", "isController": false}, {"data": [[6.0, 760.6666666666666]], "isOverall": false, "label": "Impuestos Siguiente - -371", "isController": false}, {"data": [[6.0, 760.6666666666666]], "isOverall": false, "label": "Impuestos Siguiente - -371-Aggregated", "isController": false}, {"data": [[6.0, 5227.333333333333]], "isOverall": false, "label": "Siguiente 2 - -238", "isController": false}, {"data": [[6.0, 5227.333333333333]], "isOverall": false, "label": "Siguiente 2 - -238-Aggregated", "isController": false}, {"data": [[6.0, 754.3333333333334]], "isOverall": false, "label": "Editar Facturacion - -286", "isController": false}, {"data": [[6.0, 754.3333333333334]], "isOverall": false, "label": "Editar Facturacion - -286-Aggregated", "isController": false}, {"data": [[6.0, 474.3333333333333]], "isOverall": false, "label": "Editar Facturacion - -287", "isController": false}, {"data": [[6.0, 474.3333333333333]], "isOverall": false, "label": "Editar Facturacion - -287-Aggregated", "isController": false}, {"data": [[6.0, 325.6666666666667]], "isOverall": false, "label": "Editar Facturacion - -284", "isController": false}, {"data": [[6.0, 325.6666666666667]], "isOverall": false, "label": "Editar Facturacion - -284-Aggregated", "isController": false}, {"data": [[6.0, 592.3333333333334]], "isOverall": false, "label": "Editar Facturacion - -285", "isController": false}, {"data": [[6.0, 592.3333333333334]], "isOverall": false, "label": "Editar Facturacion - -285-Aggregated", "isController": false}, {"data": [[6.0, 3752.0]], "isOverall": false, "label": "Editar Facturacion - -283", "isController": false}, {"data": [[6.0, 3752.0]], "isOverall": false, "label": "Editar Facturacion - -283-Aggregated", "isController": false}, {"data": [[6.0, 4633.5]], "isOverall": false, "label": "Descuentos Siguiente - -345", "isController": false}, {"data": [[6.0, 4633.5]], "isOverall": false, "label": "Descuentos Siguiente - -345-Aggregated", "isController": false}, {"data": [[6.0, 790.6666666666666]], "isOverall": false, "label": "Siguiente 3 - -247", "isController": false}, {"data": [[6.0, 790.6666666666666]], "isOverall": false, "label": "Siguiente 3 - -247-Aggregated", "isController": false}, {"data": [[6.0, 571.0]], "isOverall": false, "label": "Descuentos Siguiente - -346", "isController": false}, {"data": [[6.0, 571.0]], "isOverall": false, "label": "Descuentos Siguiente - -346-Aggregated", "isController": false}, {"data": [[6.0, 768.0]], "isOverall": false, "label": "Siguiente 3 - -249", "isController": false}, {"data": [[6.0, 768.0]], "isOverall": false, "label": "Siguiente 3 - -249-Aggregated", "isController": false}, {"data": [[6.0, 10792.333333333334]], "isOverall": false, "label": "Siguiente 3 - -242", "isController": false}, {"data": [[6.0, 10792.333333333334]], "isOverall": false, "label": "Siguiente 3 - -242-Aggregated", "isController": false}, {"data": [[6.0, 1102.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -298", "isController": false}, {"data": [[6.0, 1102.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -298-Aggregated", "isController": false}, {"data": [[6.0, 1952.6666666666667]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -297", "isController": false}, {"data": [[6.0, 1952.6666666666667]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -297-Aggregated", "isController": false}, {"data": [[6.0, 4610.5]], "isOverall": false, "label": "Clic Crear Agente - -250", "isController": false}, {"data": [[6.0, 4610.5]], "isOverall": false, "label": "Clic Crear Agente - -250-Aggregated", "isController": false}, {"data": [[6.0, 603.6666666666666]], "isOverall": false, "label": "Clic Crear Agente - -251", "isController": false}, {"data": [[6.0, 603.6666666666666]], "isOverall": false, "label": "Clic Crear Agente - -251-Aggregated", "isController": false}, {"data": [[6.0, 7845.666666666667]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -362", "isController": false}, {"data": [[6.0, 7845.666666666667]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -362-Aggregated", "isController": false}, {"data": [[6.0, 494.6666666666667]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -341", "isController": false}, {"data": [[6.0, 494.6666666666667]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -341-Aggregated", "isController": false}, {"data": [[6.0, 3633.333333333333]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -340", "isController": false}, {"data": [[6.0, 3633.333333333333]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -340-Aggregated", "isController": false}, {"data": [[5.0, 5023.5], [6.0, 4113.0]], "isOverall": false, "label": "Calculo de Prima Clic Boton Prima - -378", "isController": false}, {"data": [[5.333333333333334, 4720.0]], "isOverall": false, "label": "Calculo de Prima Clic Boton Prima - -378-Aggregated", "isController": false}, {"data": [[6.0, 1701.0]], "isOverall": false, "label": "Calculo de Prima Guardar - -376", "isController": false}, {"data": [[6.0, 1701.0]], "isOverall": false, "label": "Calculo de Prima Guardar - -376-Aggregated", "isController": false}, {"data": [[6.0, 508.6666666666667]], "isOverall": false, "label": "Calculo de Prima Guardar - -377", "isController": false}, {"data": [[6.0, 508.6666666666667]], "isOverall": false, "label": "Calculo de Prima Guardar - -377-Aggregated", "isController": false}, {"data": [[6.0, 776.6666666666666]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -336", "isController": false}, {"data": [[6.0, 776.6666666666666]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -336-Aggregated", "isController": false}, {"data": [[6.0, 2435.3333333333335]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -335", "isController": false}, {"data": [[6.0, 2435.3333333333335]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -335-Aggregated", "isController": false}, {"data": [[6.0, 2546.0]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -334", "isController": false}, {"data": [[6.0, 2546.0]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -334-Aggregated", "isController": false}, {"data": [[6.0, 1204.0]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -365", "isController": false}, {"data": [[6.0, 1204.0]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -365-Aggregated", "isController": false}, {"data": [[6.0, 4557.833333333333]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -374", "isController": false}, {"data": [[6.0, 4557.833333333333]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -374-Aggregated", "isController": false}, {"data": [[6.0, 5207.0]], "isOverall": false, "label": "Login - -209", "isController": false}, {"data": [[6.0, 5207.0]], "isOverall": false, "label": "Login - -209-Aggregated", "isController": false}, {"data": [[6.0, 565.6666666666666]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -375", "isController": false}, {"data": [[6.0, 565.6666666666666]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -375-Aggregated", "isController": false}, {"data": [[6.0, 2983.5]], "isOverall": false, "label": "Login - -207", "isController": false}, {"data": [[6.0, 2983.5]], "isOverall": false, "label": "Login - -207-Aggregated", "isController": false}, {"data": [[2.0, 227695.0], [1.0, 226865.0], [3.0, 225702.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[2.0, 226754.0]], "isOverall": false, "label": "Transaction Controller-Aggregated", "isController": true}, {"data": [[6.0, 993.3333333333334]], "isOverall": false, "label": "Agregar Participante de la Poliza - -312", "isController": false}, {"data": [[6.0, 993.3333333333334]], "isOverall": false, "label": "Agregar Participante de la Poliza - -312-Aggregated", "isController": false}, {"data": [[6.0, 13074.5]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -320", "isController": false}, {"data": [[6.0, 13074.5]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -320-Aggregated", "isController": false}, {"data": [[6.0, 1231.0]], "isOverall": false, "label": "Deducible Siguiente - -360", "isController": false}, {"data": [[6.0, 1231.0]], "isOverall": false, "label": "Deducible Siguiente - -360-Aggregated", "isController": false}, {"data": [[6.0, 152.33333333333334]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -324", "isController": false}, {"data": [[6.0, 152.33333333333334]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -324-Aggregated", "isController": false}, {"data": [[6.0, 1212.6666666666667]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -322", "isController": false}, {"data": [[6.0, 1212.6666666666667]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -322-Aggregated", "isController": false}, {"data": [[6.0, 668.6666666666667]], "isOverall": false, "label": "Clic Menu Operaciones del Sistema - -222", "isController": false}, {"data": [[6.0, 668.6666666666667]], "isOverall": false, "label": "Clic Menu Operaciones del Sistema - -222-Aggregated", "isController": false}, {"data": [[6.0, 635.6666666666666]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -321", "isController": false}, {"data": [[6.0, 635.6666666666666]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -321-Aggregated", "isController": false}, {"data": [[6.0, 883.6666666666666]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -367", "isController": false}, {"data": [[6.0, 883.6666666666666]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -367-Aggregated", "isController": false}, {"data": [[6.0, 1313.6666666666667]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -326", "isController": false}, {"data": [[6.0, 1313.6666666666667]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -326-Aggregated", "isController": false}, {"data": [[6.0, 1857.8333333333333]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -325", "isController": false}, {"data": [[6.0, 1857.8333333333333]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -325-Aggregated", "isController": false}, {"data": [[6.0, 2490.0]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -224", "isController": false}, {"data": [[6.0, 2490.0]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -224-Aggregated", "isController": false}, {"data": [[6.0, 1698.3333333333333]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -329", "isController": false}, {"data": [[6.0, 1698.3333333333333]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -329-Aggregated", "isController": false}, {"data": [[6.0, 4973.833333333333]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -366", "isController": false}, {"data": [[6.0, 4973.833333333333]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -366-Aggregated", "isController": false}, {"data": [[2.0, 165.0], [1.0, 166.0], [3.0, 222.0]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --409", "isController": false}, {"data": [[2.0, 184.33333333333334]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --409-Aggregated", "isController": false}, {"data": [[6.0, 380.3333333333333]], "isOverall": false, "label": "Ingresar Cedula del Cliente - -233", "isController": false}, {"data": [[6.0, 380.3333333333333]], "isOverall": false, "label": "Ingresar Cedula del Cliente - -233-Aggregated", "isController": false}, {"data": [[6.0, 937.3333333333334]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -306", "isController": false}, {"data": [[6.0, 937.3333333333334]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -306-Aggregated", "isController": false}, {"data": [[6.0, 1734.1666666666665]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -307", "isController": false}, {"data": [[6.0, 1734.1666666666665]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -307-Aggregated", "isController": false}, {"data": [[6.0, 341.6666666666667]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -305", "isController": false}, {"data": [[6.0, 341.6666666666667]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -305-Aggregated", "isController": false}, {"data": [[6.0, 749.0]], "isOverall": false, "label": "Clic Crear Deducible - -352", "isController": false}, {"data": [[6.0, 749.0]], "isOverall": false, "label": "Clic Crear Deducible - -352-Aggregated", "isController": false}, {"data": [[6.0, 783.6666666666666]], "isOverall": false, "label": "Guardar Facturacion - -290", "isController": false}, {"data": [[6.0, 783.6666666666666]], "isOverall": false, "label": "Guardar Facturacion - -290-Aggregated", "isController": false}, {"data": [[6.0, 1061.3333333333333]], "isOverall": false, "label": "Clic Crear Deducible - -351", "isController": false}, {"data": [[6.0, 1061.3333333333333]], "isOverall": false, "label": "Clic Crear Deducible - -351-Aggregated", "isController": false}, {"data": [[6.0, 759.3333333333334]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -308", "isController": false}, {"data": [[6.0, 759.3333333333334]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -308-Aggregated", "isController": false}, {"data": [[6.0, 699.0]], "isOverall": false, "label": "Clic Crear Deducible - -354", "isController": false}, {"data": [[6.0, 699.0]], "isOverall": false, "label": "Clic Crear Deducible - -354-Aggregated", "isController": false}, {"data": [[6.0, 746.3333333333334]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -309", "isController": false}, {"data": [[6.0, 746.3333333333334]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -309-Aggregated", "isController": false}, {"data": [[6.0, 2178.166666666667]], "isOverall": false, "label": "Guardar Agente - -263", "isController": false}, {"data": [[6.0, 2178.166666666667]], "isOverall": false, "label": "Guardar Agente - -263-Aggregated", "isController": false}, {"data": [[6.0, 1118.0]], "isOverall": false, "label": "Clic Crear Deducible - -350", "isController": false}, {"data": [[6.0, 1118.0]], "isOverall": false, "label": "Clic Crear Deducible - -350-Aggregated", "isController": false}, {"data": [[6.0, 8120.5]], "isOverall": false, "label": "Deducible Siguiente - -357", "isController": false}, {"data": [[6.0, 8120.5]], "isOverall": false, "label": "Deducible Siguiente - -357-Aggregated", "isController": false}, {"data": [[6.0, 1144.6666666666667]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -271", "isController": false}, {"data": [[6.0, 1144.6666666666667]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -271-Aggregated", "isController": false}, {"data": [[6.0, 218.33333333333334]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -272", "isController": false}, {"data": [[6.0, 218.33333333333334]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -272-Aggregated", "isController": false}, {"data": [[6.0, 541.0]], "isOverall": false, "label": "Guardar Agente - -267", "isController": false}, {"data": [[6.0, 541.0]], "isOverall": false, "label": "Guardar Agente - -267-Aggregated", "isController": false}, {"data": [[6.0, 894.3333333333334]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -273", "isController": false}, {"data": [[6.0, 894.3333333333334]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -273-Aggregated", "isController": false}, {"data": [[2.0, 679.0], [1.0, 725.0], [3.0, 567.25]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --408", "isController": false}, {"data": [[2.5, 612.1666666666667]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --408-Aggregated", "isController": false}, {"data": [[6.0, 814.6666666666666]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -274", "isController": false}, {"data": [[6.0, 814.6666666666666]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -274-Aggregated", "isController": false}, {"data": [[6.0, 25954.166666666664]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -275", "isController": false}, {"data": [[6.0, 25954.166666666664]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -275-Aggregated", "isController": false}, {"data": [[6.0, 435.3333333333333]], "isOverall": false, "label": "Guardar Agente - -268", "isController": false}, {"data": [[6.0, 435.3333333333333]], "isOverall": false, "label": "Guardar Agente - -268-Aggregated", "isController": false}, {"data": [[6.0, 120.66666666666667]], "isOverall": false, "label": "Login - -209-0", "isController": false}, {"data": [[6.0, 120.66666666666667]], "isOverall": false, "label": "Login - -209-0-Aggregated", "isController": false}, {"data": [[6.0, 851.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -278", "isController": false}, {"data": [[6.0, 851.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -278-Aggregated", "isController": false}, {"data": [[6.0, 5086.333333333333]], "isOverall": false, "label": "Login - -209-1", "isController": false}, {"data": [[6.0, 5086.333333333333]], "isOverall": false, "label": "Login - -209-1-Aggregated", "isController": false}, {"data": [[6.0, 1991.5]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -302", "isController": false}, {"data": [[6.0, 1991.5]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -302-Aggregated", "isController": false}, {"data": [[6.0, 1027.3333333333333]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -303", "isController": false}, {"data": [[6.0, 1027.3333333333333]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -303-Aggregated", "isController": false}, {"data": [[6.0, 350.6666666666667]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -300", "isController": false}, {"data": [[6.0, 350.6666666666667]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -300-Aggregated", "isController": false}, {"data": [[6.0, 3251.5]], "isOverall": false, "label": "Guardar Facturacion - -289", "isController": false}, {"data": [[6.0, 3251.5]], "isOverall": false, "label": "Guardar Facturacion - -289-Aggregated", "isController": false}, {"data": [[6.0, 749.3333333333334]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -301", "isController": false}, {"data": [[6.0, 749.3333333333334]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -301-Aggregated", "isController": false}, {"data": [[6.0, 4843.666666666667]], "isOverall": false, "label": "Comisiones Siguiente - -368", "isController": false}, {"data": [[6.0, 4843.666666666667]], "isOverall": false, "label": "Comisiones Siguiente - -368-Aggregated", "isController": false}, {"data": [[6.0, 744.6666666666666]], "isOverall": false, "label": "Comisiones Siguiente - -369", "isController": false}, {"data": [[6.0, 744.6666666666666]], "isOverall": false, "label": "Comisiones Siguiente - -369-Aggregated", "isController": false}, {"data": [[4.0, 376.0]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -384", "isController": false}, {"data": [[4.0, 376.0]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -384-Aggregated", "isController": false}, {"data": [[6.0, 9648.333333333334]], "isOverall": false, "label": "Prima Objeto de Cobertura - -342", "isController": false}, {"data": [[6.0, 9648.333333333334]], "isOverall": false, "label": "Prima Objeto de Cobertura - -342-Aggregated", "isController": false}, {"data": [[4.0, 676.3333333333334]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -382", "isController": false}, {"data": [[4.0, 676.3333333333334]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -382-Aggregated", "isController": false}, {"data": [[6.0, 6452.833333333333]], "isOverall": false, "label": "Siguiente - -236", "isController": false}, {"data": [[6.0, 6452.833333333333]], "isOverall": false, "label": "Siguiente - -236-Aggregated", "isController": false}, {"data": [[6.0, 509.3333333333333]], "isOverall": false, "label": "Guardar Deducible - -356", "isController": false}, {"data": [[6.0, 509.3333333333333]], "isOverall": false, "label": "Guardar Deducible - -356-Aggregated", "isController": false}, {"data": [[6.0, 537.0]], "isOverall": false, "label": "Siguiente - -237", "isController": false}, {"data": [[6.0, 537.0]], "isOverall": false, "label": "Siguiente - -237-Aggregated", "isController": false}, {"data": [[6.0, 2866.0]], "isOverall": false, "label": "Guardar Deducible - -355", "isController": false}, {"data": [[6.0, 2866.0]], "isOverall": false, "label": "Guardar Deducible - -355-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [1.0, 0.0], [3.0, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[2.0, 0.0]], "isOverall": false, "label": "Debug Sampler-Aggregated", "isController": false}, {"data": [[4.0, 4206.166666666666]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -379", "isController": false}, {"data": [[4.0, 4206.166666666666]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -379-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 6.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 1146.6, "minX": 1.59496746E12, "maxY": 89466.43333333333, "series": [{"data": [[1.59496752E12, 59044.86666666667], [1.5949677E12, 17900.383333333335], [1.59496758E12, 74496.68333333333], [1.59496746E12, 27898.45], [1.59496764E12, 89466.43333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.59496752E12, 4935.65], [1.5949677E12, 1146.6], [1.59496758E12, 4647.916666666667], [1.59496746E12, 1456.45], [1.59496764E12, 2616.15]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.5949677E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.59496746E12, "maxY": 226754.0, "series": [{"data": [[1.59496758E12, 5625.166666666667]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -331", "isController": false}, {"data": [[1.59496746E12, 1621.1666666666665]], "isOverall": false, "label": "Buscar Cedula del Cliente - -234", "isController": false}, {"data": [[1.59496746E12, 563.6666666666666]], "isOverall": false, "label": "Buscar Cedula del Cliente - -235", "isController": false}, {"data": [[1.59496758E12, 469.6666666666667]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -333", "isController": false}, {"data": [[1.59496752E12, 850.0], [1.59496758E12, 15865.0]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -291", "isController": false}, {"data": [[1.59496752E12, 416.0]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -292", "isController": false}, {"data": [[1.59496764E12, 5502.666666666666]], "isOverall": false, "label": "Clic Crear Deducible - -347", "isController": false}, {"data": [[1.59496752E12, 486.6666666666667]], "isOverall": false, "label": "Editar Facturacion - -288", "isController": false}, {"data": [[1.59496764E12, 557.3333333333334]], "isOverall": false, "label": "Cobertura Siguiente - -344", "isController": false}, {"data": [[1.59496764E12, 4925.333333333334]], "isOverall": false, "label": "Cobertura Siguiente - -343", "isController": false}, {"data": [[1.59496746E12, 179.66666666666666]], "isOverall": false, "label": "Index - -203-0", "isController": false}, {"data": [[1.59496752E12, 612.0]], "isOverall": false, "label": "Ingresar Id Agente - -261", "isController": false}, {"data": [[1.59496746E12, 153.66666666666666]], "isOverall": false, "label": "Index - -203-1", "isController": false}, {"data": [[1.59496752E12, 994.3333333333333]], "isOverall": false, "label": "Ingresar Id Agente - -260", "isController": false}, {"data": [[1.59496752E12, 929.1666666666666]], "isOverall": false, "label": "Ingresar Id Agente - -252", "isController": false}, {"data": [[1.59496752E12, 202.0]], "isOverall": false, "label": "Ingresar Id Agente - -254", "isController": false}, {"data": [[1.59496752E12, 497.3333333333333]], "isOverall": false, "label": "Ingresar Id Agente - -253", "isController": false}, {"data": [[1.59496752E12, 668.3333333333334]], "isOverall": false, "label": "Ingresar Id Agente - -256", "isController": false}, {"data": [[1.5949677E12, 404.0]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --406", "isController": false}, {"data": [[1.59496752E12, 261.6666666666667]], "isOverall": false, "label": "Ingresar Id Agente - -255", "isController": false}, {"data": [[1.59496752E12, 15805.833333333334]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -269", "isController": false}, {"data": [[1.5949677E12, 1216.5]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --405", "isController": false}, {"data": [[1.59496752E12, 179.33333333333334]], "isOverall": false, "label": "Ingresar Id Agente - -258", "isController": false}, {"data": [[1.59496758E12, 8582.0]], "isOverall": false, "label": "Editar Objeto de Cobertura - -337", "isController": false}, {"data": [[1.59496752E12, 785.1666666666666]], "isOverall": false, "label": "Ingresar Id Agente - -257", "isController": false}, {"data": [[1.5949677E12, 291.0]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --407", "isController": false}, {"data": [[1.59496746E12, 538.0]], "isOverall": false, "label": "Siguiente 2 - -240", "isController": false}, {"data": [[1.59496758E12, 837.0]], "isOverall": false, "label": "Editar Objeto de Cobertura - -339", "isController": false}, {"data": [[1.59496752E12, 232.33333333333334]], "isOverall": false, "label": "Ingresar Id Agente - -259", "isController": false}, {"data": [[1.59496746E12, 334.0]], "isOverall": false, "label": "Index - -203", "isController": false}, {"data": [[1.59496746E12, 747.6666666666666]], "isOverall": false, "label": "Index - -202", "isController": false}, {"data": [[1.59496764E12, 1107.3333333333333]], "isOverall": false, "label": "Clic Crear Deducible - -349", "isController": false}, {"data": [[1.59496764E12, 807.3333333333334]], "isOverall": false, "label": "Clic Crear Deducible - -348", "isController": false}, {"data": [[1.59496764E12, 4424.5]], "isOverall": false, "label": "Clausulas Siguiente - -372", "isController": false}, {"data": [[1.59496764E12, 529.0]], "isOverall": false, "label": "Clausulas Siguiente - -373", "isController": false}, {"data": [[1.59496746E12, 632.6666666666666]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -232", "isController": false}, {"data": [[1.59496758E12, 1172.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -330", "isController": false}, {"data": [[1.59496758E12, 810.0]], "isOverall": false, "label": "Guardar Participante de la Poliza - -316", "isController": false}, {"data": [[1.59496758E12, 2953.666666666667]], "isOverall": false, "label": "Guardar Participante de la Poliza - -315", "isController": false}, {"data": [[1.59496752E12, 875.6666666666666]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -282", "isController": false}, {"data": [[1.59496752E12, 1312.8333333333335]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -294", "isController": false}, {"data": [[1.59496752E12, 5901.833333333334]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -281", "isController": false}, {"data": [[1.59496752E12, 497.6666666666667]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -295", "isController": false}, {"data": [[1.59496746E12, 145.0]], "isOverall": false, "label": "Clic Menu Control de Polizas - -223", "isController": false}, {"data": [[1.59496758E12, 530.6666666666666]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -319", "isController": false}, {"data": [[1.59496746E12, 276.6666666666667]], "isOverall": false, "label": "Login - -207-0", "isController": false}, {"data": [[1.59496752E12, 466.0]], "isOverall": false, "label": "Ingresar Id Agente - -262", "isController": false}, {"data": [[1.59496758E12, 5349.0]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -318", "isController": false}, {"data": [[1.5949677E12, 3349.8333333333335]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --402", "isController": false}, {"data": [[1.59496746E12, 102.66666666666667]], "isOverall": false, "label": "Login - -207-1", "isController": false}, {"data": [[1.5949677E12, 612.3333333333334]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --403", "isController": false}, {"data": [[1.59496764E12, 4512.333333333333]], "isOverall": false, "label": "Impuestos Siguiente - -370", "isController": false}, {"data": [[1.59496764E12, 760.6666666666666]], "isOverall": false, "label": "Impuestos Siguiente - -371", "isController": false}, {"data": [[1.59496746E12, 5227.333333333333]], "isOverall": false, "label": "Siguiente 2 - -238", "isController": false}, {"data": [[1.59496752E12, 754.3333333333334]], "isOverall": false, "label": "Editar Facturacion - -286", "isController": false}, {"data": [[1.59496752E12, 474.3333333333333]], "isOverall": false, "label": "Editar Facturacion - -287", "isController": false}, {"data": [[1.59496752E12, 325.6666666666667]], "isOverall": false, "label": "Editar Facturacion - -284", "isController": false}, {"data": [[1.59496752E12, 592.3333333333334]], "isOverall": false, "label": "Editar Facturacion - -285", "isController": false}, {"data": [[1.59496752E12, 3752.0]], "isOverall": false, "label": "Editar Facturacion - -283", "isController": false}, {"data": [[1.59496764E12, 4633.5]], "isOverall": false, "label": "Descuentos Siguiente - -345", "isController": false}, {"data": [[1.59496752E12, 790.6666666666666]], "isOverall": false, "label": "Siguiente 3 - -247", "isController": false}, {"data": [[1.59496764E12, 571.0]], "isOverall": false, "label": "Descuentos Siguiente - -346", "isController": false}, {"data": [[1.59496752E12, 768.0]], "isOverall": false, "label": "Siguiente 3 - -249", "isController": false}, {"data": [[1.59496752E12, 10792.333333333334]], "isOverall": false, "label": "Siguiente 3 - -242", "isController": false}, {"data": [[1.59496758E12, 1102.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -298", "isController": false}, {"data": [[1.59496752E12, 1056.0], [1.59496758E12, 2132.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -297", "isController": false}, {"data": [[1.59496752E12, 4610.5]], "isOverall": false, "label": "Clic Crear Agente - -250", "isController": false}, {"data": [[1.59496752E12, 603.6666666666666]], "isOverall": false, "label": "Clic Crear Agente - -251", "isController": false}, {"data": [[1.59496764E12, 7845.666666666667]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -362", "isController": false}, {"data": [[1.59496758E12, 494.6666666666667]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -341", "isController": false}, {"data": [[1.59496758E12, 3633.333333333333]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -340", "isController": false}, {"data": [[1.5949677E12, 4720.0]], "isOverall": false, "label": "Calculo de Prima Clic Boton Prima - -378", "isController": false}, {"data": [[1.5949677E12, 2234.0], [1.59496764E12, 1434.5]], "isOverall": false, "label": "Calculo de Prima Guardar - -376", "isController": false}, {"data": [[1.5949677E12, 700.5], [1.59496764E12, 125.0]], "isOverall": false, "label": "Calculo de Prima Guardar - -377", "isController": false}, {"data": [[1.59496758E12, 776.6666666666666]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -336", "isController": false}, {"data": [[1.59496758E12, 2435.3333333333335]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -335", "isController": false}, {"data": [[1.59496758E12, 2546.0]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -334", "isController": false}, {"data": [[1.59496764E12, 1204.0]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -365", "isController": false}, {"data": [[1.59496764E12, 4557.833333333333]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -374", "isController": false}, {"data": [[1.59496746E12, 5207.0]], "isOverall": false, "label": "Login - -209", "isController": false}, {"data": [[1.59496764E12, 565.6666666666666]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -375", "isController": false}, {"data": [[1.59496746E12, 2983.5]], "isOverall": false, "label": "Login - -207", "isController": false}, {"data": [[1.5949677E12, 226754.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59496758E12, 993.3333333333334]], "isOverall": false, "label": "Agregar Participante de la Poliza - -312", "isController": false}, {"data": [[1.59496758E12, 13074.5]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -320", "isController": false}, {"data": [[1.59496764E12, 1231.0]], "isOverall": false, "label": "Deducible Siguiente - -360", "isController": false}, {"data": [[1.59496758E12, 152.33333333333334]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -324", "isController": false}, {"data": [[1.59496758E12, 1212.6666666666667]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -322", "isController": false}, {"data": [[1.59496746E12, 668.6666666666667]], "isOverall": false, "label": "Clic Menu Operaciones del Sistema - -222", "isController": false}, {"data": [[1.59496758E12, 635.6666666666666]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -321", "isController": false}, {"data": [[1.59496764E12, 883.6666666666666]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -367", "isController": false}, {"data": [[1.59496758E12, 1313.6666666666667]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -326", "isController": false}, {"data": [[1.59496758E12, 1857.8333333333333]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -325", "isController": false}, {"data": [[1.59496746E12, 2490.0]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -224", "isController": false}, {"data": [[1.59496758E12, 1698.3333333333333]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -329", "isController": false}, {"data": [[1.59496764E12, 4973.833333333333]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -366", "isController": false}, {"data": [[1.5949677E12, 184.33333333333334]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --409", "isController": false}, {"data": [[1.59496746E12, 380.3333333333333]], "isOverall": false, "label": "Ingresar Cedula del Cliente - -233", "isController": false}, {"data": [[1.59496758E12, 937.3333333333334]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -306", "isController": false}, {"data": [[1.59496758E12, 1734.1666666666665]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -307", "isController": false}, {"data": [[1.59496758E12, 341.6666666666667]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -305", "isController": false}, {"data": [[1.59496764E12, 749.0]], "isOverall": false, "label": "Clic Crear Deducible - -352", "isController": false}, {"data": [[1.59496752E12, 783.6666666666666]], "isOverall": false, "label": "Guardar Facturacion - -290", "isController": false}, {"data": [[1.59496764E12, 1061.3333333333333]], "isOverall": false, "label": "Clic Crear Deducible - -351", "isController": false}, {"data": [[1.59496758E12, 759.3333333333334]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -308", "isController": false}, {"data": [[1.59496764E12, 699.0]], "isOverall": false, "label": "Clic Crear Deducible - -354", "isController": false}, {"data": [[1.59496758E12, 746.3333333333334]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -309", "isController": false}, {"data": [[1.59496752E12, 2178.166666666667]], "isOverall": false, "label": "Guardar Agente - -263", "isController": false}, {"data": [[1.59496764E12, 1118.0]], "isOverall": false, "label": "Clic Crear Deducible - -350", "isController": false}, {"data": [[1.59496764E12, 8120.5]], "isOverall": false, "label": "Deducible Siguiente - -357", "isController": false}, {"data": [[1.59496752E12, 1144.6666666666667]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -271", "isController": false}, {"data": [[1.59496752E12, 218.33333333333334]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -272", "isController": false}, {"data": [[1.59496752E12, 541.0]], "isOverall": false, "label": "Guardar Agente - -267", "isController": false}, {"data": [[1.59496752E12, 894.3333333333334]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -273", "isController": false}, {"data": [[1.5949677E12, 612.1666666666667]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --408", "isController": false}, {"data": [[1.59496752E12, 814.6666666666666]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -274", "isController": false}, {"data": [[1.59496752E12, 25954.166666666664]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -275", "isController": false}, {"data": [[1.59496752E12, 435.3333333333333]], "isOverall": false, "label": "Guardar Agente - -268", "isController": false}, {"data": [[1.59496746E12, 120.66666666666667]], "isOverall": false, "label": "Login - -209-0", "isController": false}, {"data": [[1.59496752E12, 851.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -278", "isController": false}, {"data": [[1.59496746E12, 5086.333333333333]], "isOverall": false, "label": "Login - -209-1", "isController": false}, {"data": [[1.59496758E12, 1991.5]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -302", "isController": false}, {"data": [[1.59496758E12, 1027.3333333333333]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -303", "isController": false}, {"data": [[1.59496758E12, 350.6666666666667]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -300", "isController": false}, {"data": [[1.59496752E12, 3251.5]], "isOverall": false, "label": "Guardar Facturacion - -289", "isController": false}, {"data": [[1.59496758E12, 749.3333333333334]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -301", "isController": false}, {"data": [[1.59496764E12, 4843.666666666667]], "isOverall": false, "label": "Comisiones Siguiente - -368", "isController": false}, {"data": [[1.59496764E12, 744.6666666666666]], "isOverall": false, "label": "Comisiones Siguiente - -369", "isController": false}, {"data": [[1.5949677E12, 376.0]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -384", "isController": false}, {"data": [[1.59496758E12, 9648.333333333334]], "isOverall": false, "label": "Prima Objeto de Cobertura - -342", "isController": false}, {"data": [[1.5949677E12, 676.3333333333334]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -382", "isController": false}, {"data": [[1.59496746E12, 6452.833333333333]], "isOverall": false, "label": "Siguiente - -236", "isController": false}, {"data": [[1.59496764E12, 509.3333333333333]], "isOverall": false, "label": "Guardar Deducible - -356", "isController": false}, {"data": [[1.59496746E12, 537.0]], "isOverall": false, "label": "Siguiente - -237", "isController": false}, {"data": [[1.59496764E12, 2866.0]], "isOverall": false, "label": "Guardar Deducible - -355", "isController": false}, {"data": [[1.5949677E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.5949677E12, 4206.166666666666]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -379", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.5949677E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.59496746E12, "maxY": 194920.33333333334, "series": [{"data": [[1.59496758E12, 5262.666666666666]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -331", "isController": false}, {"data": [[1.59496746E12, 1597.8333333333335]], "isOverall": false, "label": "Buscar Cedula del Cliente - -234", "isController": false}, {"data": [[1.59496746E12, 525.6666666666666]], "isOverall": false, "label": "Buscar Cedula del Cliente - -235", "isController": false}, {"data": [[1.59496758E12, 448.6666666666667]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -333", "isController": false}, {"data": [[1.59496752E12, 590.3333333333334], [1.59496758E12, 13923.333333333334]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -291", "isController": false}, {"data": [[1.59496752E12, 236.0]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -292", "isController": false}, {"data": [[1.59496764E12, 5126.166666666667]], "isOverall": false, "label": "Clic Crear Deducible - -347", "isController": false}, {"data": [[1.59496752E12, 476.3333333333333]], "isOverall": false, "label": "Editar Facturacion - -288", "isController": false}, {"data": [[1.59496764E12, 542.0]], "isOverall": false, "label": "Cobertura Siguiente - -344", "isController": false}, {"data": [[1.59496764E12, 4388.0]], "isOverall": false, "label": "Cobertura Siguiente - -343", "isController": false}, {"data": [[1.59496746E12, 179.66666666666666]], "isOverall": false, "label": "Index - -203-0", "isController": false}, {"data": [[1.59496752E12, 602.3333333333334]], "isOverall": false, "label": "Ingresar Id Agente - -261", "isController": false}, {"data": [[1.59496746E12, 122.66666666666667]], "isOverall": false, "label": "Index - -203-1", "isController": false}, {"data": [[1.59496752E12, 986.0]], "isOverall": false, "label": "Ingresar Id Agente - -260", "isController": false}, {"data": [[1.59496752E12, 847.0]], "isOverall": false, "label": "Ingresar Id Agente - -252", "isController": false}, {"data": [[1.59496752E12, 194.66666666666666]], "isOverall": false, "label": "Ingresar Id Agente - -254", "isController": false}, {"data": [[1.59496752E12, 351.3333333333333]], "isOverall": false, "label": "Ingresar Id Agente - -253", "isController": false}, {"data": [[1.59496752E12, 665.6666666666666]], "isOverall": false, "label": "Ingresar Id Agente - -256", "isController": false}, {"data": [[1.5949677E12, 226.33333333333334]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --406", "isController": false}, {"data": [[1.59496752E12, 260.0]], "isOverall": false, "label": "Ingresar Id Agente - -255", "isController": false}, {"data": [[1.59496752E12, 15345.333333333334]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -269", "isController": false}, {"data": [[1.5949677E12, 1121.0]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --405", "isController": false}, {"data": [[1.59496752E12, 163.0]], "isOverall": false, "label": "Ingresar Id Agente - -258", "isController": false}, {"data": [[1.59496758E12, 6692.5]], "isOverall": false, "label": "Editar Objeto de Cobertura - -337", "isController": false}, {"data": [[1.59496752E12, 676.5]], "isOverall": false, "label": "Ingresar Id Agente - -257", "isController": false}, {"data": [[1.5949677E12, 288.3333333333333]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --407", "isController": false}, {"data": [[1.59496746E12, 509.3333333333333]], "isOverall": false, "label": "Siguiente 2 - -240", "isController": false}, {"data": [[1.59496758E12, 829.6666666666666]], "isOverall": false, "label": "Editar Objeto de Cobertura - -339", "isController": false}, {"data": [[1.59496752E12, 228.0]], "isOverall": false, "label": "Ingresar Id Agente - -259", "isController": false}, {"data": [[1.59496746E12, 179.66666666666666]], "isOverall": false, "label": "Index - -203", "isController": false}, {"data": [[1.59496746E12, 668.8333333333334]], "isOverall": false, "label": "Index - -202", "isController": false}, {"data": [[1.59496764E12, 1104.0]], "isOverall": false, "label": "Clic Crear Deducible - -349", "isController": false}, {"data": [[1.59496764E12, 795.6666666666666]], "isOverall": false, "label": "Clic Crear Deducible - -348", "isController": false}, {"data": [[1.59496764E12, 3851.3333333333335]], "isOverall": false, "label": "Clausulas Siguiente - -372", "isController": false}, {"data": [[1.59496764E12, 438.6666666666667]], "isOverall": false, "label": "Clausulas Siguiente - -373", "isController": false}, {"data": [[1.59496746E12, 523.3333333333334]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -232", "isController": false}, {"data": [[1.59496758E12, 1160.3333333333333]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -330", "isController": false}, {"data": [[1.59496758E12, 544.3333333333334]], "isOverall": false, "label": "Guardar Participante de la Poliza - -316", "isController": false}, {"data": [[1.59496758E12, 2416.5]], "isOverall": false, "label": "Guardar Participante de la Poliza - -315", "isController": false}, {"data": [[1.59496752E12, 753.3333333333334]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -282", "isController": false}, {"data": [[1.59496752E12, 1142.8333333333335]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -294", "isController": false}, {"data": [[1.59496752E12, 5311.0]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -281", "isController": false}, {"data": [[1.59496752E12, 289.6666666666667]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -295", "isController": false}, {"data": [[1.59496746E12, 138.0]], "isOverall": false, "label": "Clic Menu Control de Polizas - -223", "isController": false}, {"data": [[1.59496758E12, 517.6666666666666]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -319", "isController": false}, {"data": [[1.59496746E12, 276.6666666666667]], "isOverall": false, "label": "Login - -207-0", "isController": false}, {"data": [[1.59496752E12, 464.3333333333333]], "isOverall": false, "label": "Ingresar Id Agente - -262", "isController": false}, {"data": [[1.59496758E12, 4671.833333333333]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -318", "isController": false}, {"data": [[1.5949677E12, 3276.0]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --402", "isController": false}, {"data": [[1.59496746E12, 101.33333333333333]], "isOverall": false, "label": "Login - -207-1", "isController": false}, {"data": [[1.5949677E12, 467.3333333333333]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --403", "isController": false}, {"data": [[1.59496764E12, 4035.1666666666665]], "isOverall": false, "label": "Impuestos Siguiente - -370", "isController": false}, {"data": [[1.59496764E12, 471.6666666666667]], "isOverall": false, "label": "Impuestos Siguiente - -371", "isController": false}, {"data": [[1.59496746E12, 4563.333333333333]], "isOverall": false, "label": "Siguiente 2 - -238", "isController": false}, {"data": [[1.59496752E12, 550.0]], "isOverall": false, "label": "Editar Facturacion - -286", "isController": false}, {"data": [[1.59496752E12, 468.3333333333333]], "isOverall": false, "label": "Editar Facturacion - -287", "isController": false}, {"data": [[1.59496752E12, 155.66666666666666]], "isOverall": false, "label": "Editar Facturacion - -284", "isController": false}, {"data": [[1.59496752E12, 579.3333333333334]], "isOverall": false, "label": "Editar Facturacion - -285", "isController": false}, {"data": [[1.59496752E12, 3166.0]], "isOverall": false, "label": "Editar Facturacion - -283", "isController": false}, {"data": [[1.59496764E12, 4212.333333333333]], "isOverall": false, "label": "Descuentos Siguiente - -345", "isController": false}, {"data": [[1.59496752E12, 695.6666666666666]], "isOverall": false, "label": "Siguiente 3 - -247", "isController": false}, {"data": [[1.59496764E12, 555.3333333333334]], "isOverall": false, "label": "Descuentos Siguiente - -346", "isController": false}, {"data": [[1.59496752E12, 757.6666666666666]], "isOverall": false, "label": "Siguiente 3 - -249", "isController": false}, {"data": [[1.59496752E12, 9262.0]], "isOverall": false, "label": "Siguiente 3 - -242", "isController": false}, {"data": [[1.59496758E12, 838.3333333333334]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -298", "isController": false}, {"data": [[1.59496752E12, 1029.0], [1.59496758E12, 1940.6]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -297", "isController": false}, {"data": [[1.59496752E12, 4144.166666666666]], "isOverall": false, "label": "Clic Crear Agente - -250", "isController": false}, {"data": [[1.59496752E12, 519.0]], "isOverall": false, "label": "Clic Crear Agente - -251", "isController": false}, {"data": [[1.59496764E12, 6317.666666666666]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -362", "isController": false}, {"data": [[1.59496758E12, 478.6666666666667]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -341", "isController": false}, {"data": [[1.59496758E12, 2470.6666666666665]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -340", "isController": false}, {"data": [[1.5949677E12, 4616.666666666666]], "isOverall": false, "label": "Calculo de Prima Clic Boton Prima - -378", "isController": false}, {"data": [[1.5949677E12, 1783.5], [1.59496764E12, 1157.0]], "isOverall": false, "label": "Calculo de Prima Guardar - -376", "isController": false}, {"data": [[1.5949677E12, 527.0], [1.59496764E12, 113.0]], "isOverall": false, "label": "Calculo de Prima Guardar - -377", "isController": false}, {"data": [[1.59496758E12, 767.3333333333334]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -336", "isController": false}, {"data": [[1.59496758E12, 1116.3333333333333]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -335", "isController": false}, {"data": [[1.59496758E12, 1864.1666666666667]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -334", "isController": false}, {"data": [[1.59496764E12, 528.6666666666666]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -365", "isController": false}, {"data": [[1.59496764E12, 4161.833333333333]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -374", "isController": false}, {"data": [[1.59496746E12, 120.66666666666667]], "isOverall": false, "label": "Login - -209", "isController": false}, {"data": [[1.59496764E12, 474.3333333333333]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -375", "isController": false}, {"data": [[1.59496746E12, 337.0]], "isOverall": false, "label": "Login - -207", "isController": false}, {"data": [[1.5949677E12, 194920.33333333334]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59496758E12, 942.3333333333334]], "isOverall": false, "label": "Agregar Participante de la Poliza - -312", "isController": false}, {"data": [[1.59496758E12, 11650.5]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -320", "isController": false}, {"data": [[1.59496764E12, 462.3333333333333]], "isOverall": false, "label": "Deducible Siguiente - -360", "isController": false}, {"data": [[1.59496758E12, 142.66666666666666]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -324", "isController": false}, {"data": [[1.59496758E12, 684.3333333333334]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -322", "isController": false}, {"data": [[1.59496746E12, 572.6666666666667]], "isOverall": false, "label": "Clic Menu Operaciones del Sistema - -222", "isController": false}, {"data": [[1.59496758E12, 621.6666666666666]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -321", "isController": false}, {"data": [[1.59496764E12, 447.3333333333333]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -367", "isController": false}, {"data": [[1.59496758E12, 1305.6666666666667]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -326", "isController": false}, {"data": [[1.59496758E12, 1841.5]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -325", "isController": false}, {"data": [[1.59496746E12, 1352.0]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -224", "isController": false}, {"data": [[1.59496758E12, 1686.8333333333335]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -329", "isController": false}, {"data": [[1.59496764E12, 4361.666666666667]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -366", "isController": false}, {"data": [[1.5949677E12, 182.0]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --409", "isController": false}, {"data": [[1.59496746E12, 377.0]], "isOverall": false, "label": "Ingresar Cedula del Cliente - -233", "isController": false}, {"data": [[1.59496758E12, 891.6666666666666]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -306", "isController": false}, {"data": [[1.59496758E12, 1717.1666666666667]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -307", "isController": false}, {"data": [[1.59496758E12, 243.33333333333334]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -305", "isController": false}, {"data": [[1.59496764E12, 745.3333333333334]], "isOverall": false, "label": "Clic Crear Deducible - -352", "isController": false}, {"data": [[1.59496752E12, 580.6666666666666]], "isOverall": false, "label": "Guardar Facturacion - -290", "isController": false}, {"data": [[1.59496764E12, 1054.6666666666667]], "isOverall": false, "label": "Clic Crear Deducible - -351", "isController": false}, {"data": [[1.59496758E12, 744.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -308", "isController": false}, {"data": [[1.59496764E12, 688.3333333333334]], "isOverall": false, "label": "Clic Crear Deducible - -354", "isController": false}, {"data": [[1.59496758E12, 739.6666666666666]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -309", "isController": false}, {"data": [[1.59496752E12, 1777.8333333333333]], "isOverall": false, "label": "Guardar Agente - -263", "isController": false}, {"data": [[1.59496764E12, 1112.3333333333333]], "isOverall": false, "label": "Clic Crear Deducible - -350", "isController": false}, {"data": [[1.59496764E12, 6761.833333333333]], "isOverall": false, "label": "Deducible Siguiente - -357", "isController": false}, {"data": [[1.59496752E12, 998.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -271", "isController": false}, {"data": [[1.59496752E12, 199.66666666666666]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -272", "isController": false}, {"data": [[1.59496752E12, 454.6666666666667]], "isOverall": false, "label": "Guardar Agente - -267", "isController": false}, {"data": [[1.59496752E12, 890.6666666666666]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -273", "isController": false}, {"data": [[1.5949677E12, 608.0]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --408", "isController": false}, {"data": [[1.59496752E12, 811.3333333333334]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -274", "isController": false}, {"data": [[1.59496752E12, 25373.666666666668]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -275", "isController": false}, {"data": [[1.59496752E12, 433.0]], "isOverall": false, "label": "Guardar Agente - -268", "isController": false}, {"data": [[1.59496746E12, 120.66666666666667]], "isOverall": false, "label": "Login - -209-0", "isController": false}, {"data": [[1.59496752E12, 538.6666666666666]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -278", "isController": false}, {"data": [[1.59496746E12, 4885.666666666667]], "isOverall": false, "label": "Login - -209-1", "isController": false}, {"data": [[1.59496758E12, 1904.3333333333333]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -302", "isController": false}, {"data": [[1.59496758E12, 1017.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -303", "isController": false}, {"data": [[1.59496758E12, 318.3333333333333]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -300", "isController": false}, {"data": [[1.59496752E12, 2695.333333333333]], "isOverall": false, "label": "Guardar Facturacion - -289", "isController": false}, {"data": [[1.59496758E12, 744.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -301", "isController": false}, {"data": [[1.59496764E12, 4232.0]], "isOverall": false, "label": "Comisiones Siguiente - -368", "isController": false}, {"data": [[1.59496764E12, 577.3333333333334]], "isOverall": false, "label": "Comisiones Siguiente - -369", "isController": false}, {"data": [[1.5949677E12, 345.6666666666667]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -384", "isController": false}, {"data": [[1.59496758E12, 8584.666666666666]], "isOverall": false, "label": "Prima Objeto de Cobertura - -342", "isController": false}, {"data": [[1.5949677E12, 525.3333333333334]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -382", "isController": false}, {"data": [[1.59496746E12, 5208.166666666667]], "isOverall": false, "label": "Siguiente - -236", "isController": false}, {"data": [[1.59496764E12, 503.3333333333333]], "isOverall": false, "label": "Guardar Deducible - -356", "isController": false}, {"data": [[1.59496746E12, 445.0]], "isOverall": false, "label": "Siguiente - -237", "isController": false}, {"data": [[1.59496764E12, 2442.333333333333]], "isOverall": false, "label": "Guardar Deducible - -355", "isController": false}, {"data": [[1.5949677E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.5949677E12, 3714.833333333333]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -379", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.5949677E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.59496746E12, "maxY": 17754.333333333332, "series": [{"data": [[1.59496758E12, 271.0]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -331", "isController": false}, {"data": [[1.59496746E12, 187.16666666666669]], "isOverall": false, "label": "Buscar Cedula del Cliente - -234", "isController": false}, {"data": [[1.59496746E12, 374.3333333333333]], "isOverall": false, "label": "Buscar Cedula del Cliente - -235", "isController": false}, {"data": [[1.59496758E12, 300.0]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -333", "isController": false}, {"data": [[1.59496752E12, 0.0], [1.59496758E12, 2303.6666666666665]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -291", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -292", "isController": false}, {"data": [[1.59496764E12, 736.0]], "isOverall": false, "label": "Clic Crear Deducible - -347", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "Editar Facturacion - -288", "isController": false}, {"data": [[1.59496764E12, 345.3333333333333]], "isOverall": false, "label": "Cobertura Siguiente - -344", "isController": false}, {"data": [[1.59496764E12, 483.6666666666667]], "isOverall": false, "label": "Cobertura Siguiente - -343", "isController": false}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "Index - -203-0", "isController": false}, {"data": [[1.59496752E12, 200.33333333333334]], "isOverall": false, "label": "Ingresar Id Agente - -261", "isController": false}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "Index - -203-1", "isController": false}, {"data": [[1.59496752E12, 150.66666666666669]], "isOverall": false, "label": "Ingresar Id Agente - -260", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "Ingresar Id Agente - -252", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "Ingresar Id Agente - -254", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "Ingresar Id Agente - -253", "isController": false}, {"data": [[1.59496752E12, 383.3333333333333]], "isOverall": false, "label": "Ingresar Id Agente - -256", "isController": false}, {"data": [[1.5949677E12, 0.0]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --406", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "Ingresar Id Agente - -255", "isController": false}, {"data": [[1.59496752E12, 499.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -269", "isController": false}, {"data": [[1.5949677E12, 0.0]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --405", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "Ingresar Id Agente - -258", "isController": false}, {"data": [[1.59496758E12, 339.83333333333337]], "isOverall": false, "label": "Editar Objeto de Cobertura - -337", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "Ingresar Id Agente - -257", "isController": false}, {"data": [[1.5949677E12, 0.0]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --407", "isController": false}, {"data": [[1.59496746E12, 346.0]], "isOverall": false, "label": "Siguiente 2 - -240", "isController": false}, {"data": [[1.59496758E12, 242.0]], "isOverall": false, "label": "Editar Objeto de Cobertura - -339", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "Ingresar Id Agente - -259", "isController": false}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "Index - -203", "isController": false}, {"data": [[1.59496746E12, 469.0]], "isOverall": false, "label": "Index - -202", "isController": false}, {"data": [[1.59496764E12, 301.0]], "isOverall": false, "label": "Clic Crear Deducible - -349", "isController": false}, {"data": [[1.59496764E12, 0.0]], "isOverall": false, "label": "Clic Crear Deducible - -348", "isController": false}, {"data": [[1.59496764E12, 158.5]], "isOverall": false, "label": "Clausulas Siguiente - -372", "isController": false}, {"data": [[1.59496764E12, 317.0]], "isOverall": false, "label": "Clausulas Siguiente - -373", "isController": false}, {"data": [[1.59496746E12, 314.0]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -232", "isController": false}, {"data": [[1.59496758E12, 261.3333333333333]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -330", "isController": false}, {"data": [[1.59496758E12, 353.3333333333333]], "isOverall": false, "label": "Guardar Participante de la Poliza - -316", "isController": false}, {"data": [[1.59496758E12, 283.0]], "isOverall": false, "label": "Guardar Participante de la Poliza - -315", "isController": false}, {"data": [[1.59496752E12, 354.0]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -282", "isController": false}, {"data": [[1.59496752E12, 340.1666666666667]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -294", "isController": false}, {"data": [[1.59496752E12, 177.0]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -281", "isController": false}, {"data": [[1.59496752E12, 135.0]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -295", "isController": false}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "Clic Menu Control de Polizas - -223", "isController": false}, {"data": [[1.59496758E12, 318.0]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -319", "isController": false}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "Login - -207-0", "isController": false}, {"data": [[1.59496752E12, 101.0]], "isOverall": false, "label": "Ingresar Id Agente - -262", "isController": false}, {"data": [[1.59496758E12, 159.0]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -318", "isController": false}, {"data": [[1.5949677E12, 154.16666666666666]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --402", "isController": false}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "Login - -207-1", "isController": false}, {"data": [[1.5949677E12, 308.3333333333333]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --403", "isController": false}, {"data": [[1.59496764E12, 155.0]], "isOverall": false, "label": "Impuestos Siguiente - -370", "isController": false}, {"data": [[1.59496764E12, 310.0]], "isOverall": false, "label": "Impuestos Siguiente - -371", "isController": false}, {"data": [[1.59496746E12, 173.0]], "isOverall": false, "label": "Siguiente 2 - -238", "isController": false}, {"data": [[1.59496752E12, 343.3333333333333]], "isOverall": false, "label": "Editar Facturacion - -286", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "Editar Facturacion - -287", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "Editar Facturacion - -284", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "Editar Facturacion - -285", "isController": false}, {"data": [[1.59496752E12, 368.0]], "isOverall": false, "label": "Editar Facturacion - -283", "isController": false}, {"data": [[1.59496764E12, 171.83333333333331]], "isOverall": false, "label": "Descuentos Siguiente - -345", "isController": false}, {"data": [[1.59496752E12, 341.6666666666667]], "isOverall": false, "label": "Siguiente 3 - -247", "isController": false}, {"data": [[1.59496764E12, 343.6666666666667]], "isOverall": false, "label": "Descuentos Siguiente - -346", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "Siguiente 3 - -249", "isController": false}, {"data": [[1.59496752E12, 170.83333333333334]], "isOverall": false, "label": "Siguiente 3 - -242", "isController": false}, {"data": [[1.59496758E12, 284.6666666666667]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -298", "isController": false}, {"data": [[1.59496752E12, 0.0], [1.59496758E12, 253.8]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -297", "isController": false}, {"data": [[1.59496752E12, 681.8333333333334]], "isOverall": false, "label": "Clic Crear Agente - -250", "isController": false}, {"data": [[1.59496752E12, 353.6666666666667]], "isOverall": false, "label": "Clic Crear Agente - -251", "isController": false}, {"data": [[1.59496764E12, 186.66666666666666]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -362", "isController": false}, {"data": [[1.59496758E12, 307.3333333333333]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -341", "isController": false}, {"data": [[1.59496758E12, 284.0]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -340", "isController": false}, {"data": [[1.5949677E12, 105.66666666666666]], "isOverall": false, "label": "Calculo de Prima Clic Boton Prima - -378", "isController": false}, {"data": [[1.5949677E12, 313.0], [1.59496764E12, 0.0]], "isOverall": false, "label": "Calculo de Prima Guardar - -376", "isController": false}, {"data": [[1.5949677E12, 313.0], [1.59496764E12, 0.0]], "isOverall": false, "label": "Calculo de Prima Guardar - -377", "isController": false}, {"data": [[1.59496758E12, 341.0]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -336", "isController": false}, {"data": [[1.59496758E12, 0.0]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -335", "isController": false}, {"data": [[1.59496758E12, 170.5]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -334", "isController": false}, {"data": [[1.59496764E12, 373.3333333333333]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -365", "isController": false}, {"data": [[1.59496764E12, 174.83333333333334]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -374", "isController": false}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "Login - -209", "isController": false}, {"data": [[1.59496764E12, 349.6666666666667]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -375", "isController": false}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "Login - -207", "isController": false}, {"data": [[1.5949677E12, 17754.333333333332]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59496758E12, 102.0]], "isOverall": false, "label": "Agregar Participante de la Poliza - -312", "isController": false}, {"data": [[1.59496758E12, 982.5]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -320", "isController": false}, {"data": [[1.59496764E12, 335.6666666666667]], "isOverall": false, "label": "Deducible Siguiente - -360", "isController": false}, {"data": [[1.59496758E12, 0.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -324", "isController": false}, {"data": [[1.59496758E12, 0.0]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -322", "isController": false}, {"data": [[1.59496746E12, 432.6666666666667]], "isOverall": false, "label": "Clic Menu Operaciones del Sistema - -222", "isController": false}, {"data": [[1.59496758E12, 424.3333333333333]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -321", "isController": false}, {"data": [[1.59496764E12, 311.6666666666667]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -367", "isController": false}, {"data": [[1.59496758E12, 281.6666666666667]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -326", "isController": false}, {"data": [[1.59496758E12, 245.83333333333331]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -325", "isController": false}, {"data": [[1.59496746E12, 157.0]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -224", "isController": false}, {"data": [[1.59496758E12, 261.3333333333333]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -329", "isController": false}, {"data": [[1.59496764E12, 155.83333333333331]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -366", "isController": false}, {"data": [[1.5949677E12, 0.0]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --409", "isController": false}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "Ingresar Cedula del Cliente - -233", "isController": false}, {"data": [[1.59496758E12, 218.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -306", "isController": false}, {"data": [[1.59496758E12, 213.33333333333334]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -307", "isController": false}, {"data": [[1.59496758E12, 0.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -305", "isController": false}, {"data": [[1.59496764E12, 0.0]], "isOverall": false, "label": "Clic Crear Deducible - -352", "isController": false}, {"data": [[1.59496752E12, 392.6666666666667]], "isOverall": false, "label": "Guardar Facturacion - -290", "isController": false}, {"data": [[1.59496764E12, 408.6666666666667]], "isOverall": false, "label": "Clic Crear Deducible - -351", "isController": false}, {"data": [[1.59496758E12, 106.33333333333333]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -308", "isController": false}, {"data": [[1.59496764E12, 0.0]], "isOverall": false, "label": "Clic Crear Deducible - -354", "isController": false}, {"data": [[1.59496758E12, 98.33333333333333]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -309", "isController": false}, {"data": [[1.59496752E12, 162.66666666666666]], "isOverall": false, "label": "Guardar Agente - -263", "isController": false}, {"data": [[1.59496764E12, 0.0]], "isOverall": false, "label": "Clic Crear Deducible - -350", "isController": false}, {"data": [[1.59496764E12, 167.83333333333331]], "isOverall": false, "label": "Deducible Siguiente - -357", "isController": false}, {"data": [[1.59496752E12, 312.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -271", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -272", "isController": false}, {"data": [[1.59496752E12, 325.3333333333333]], "isOverall": false, "label": "Guardar Agente - -267", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -273", "isController": false}, {"data": [[1.5949677E12, 315.33333333333337]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --408", "isController": false}, {"data": [[1.59496752E12, 209.33333333333334]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -274", "isController": false}, {"data": [[1.59496752E12, 289.8333333333333]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -275", "isController": false}, {"data": [[1.59496752E12, 0.0]], "isOverall": false, "label": "Guardar Agente - -268", "isController": false}, {"data": [[1.59496746E12, 0.0]], "isOverall": false, "label": "Login - -209-0", "isController": false}, {"data": [[1.59496752E12, 373.6666666666667]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -278", "isController": false}, {"data": [[1.59496746E12, 110.33333333333334]], "isOverall": false, "label": "Login - -209-1", "isController": false}, {"data": [[1.59496758E12, 417.3333333333333]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -302", "isController": false}, {"data": [[1.59496758E12, 138.66666666666669]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -303", "isController": false}, {"data": [[1.59496758E12, 138.33333333333331]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -300", "isController": false}, {"data": [[1.59496752E12, 196.33333333333331]], "isOverall": false, "label": "Guardar Facturacion - -289", "isController": false}, {"data": [[1.59496758E12, 0.0]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -301", "isController": false}, {"data": [[1.59496764E12, 169.83333333333334]], "isOverall": false, "label": "Comisiones Siguiente - -368", "isController": false}, {"data": [[1.59496764E12, 339.6666666666667]], "isOverall": false, "label": "Comisiones Siguiente - -369", "isController": false}, {"data": [[1.5949677E12, 0.0]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -384", "isController": false}, {"data": [[1.59496758E12, 0.0]], "isOverall": false, "label": "Prima Objeto de Cobertura - -342", "isController": false}, {"data": [[1.5949677E12, 306.3333333333333]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -382", "isController": false}, {"data": [[1.59496746E12, 164.83333333333334]], "isOverall": false, "label": "Siguiente - -236", "isController": false}, {"data": [[1.59496764E12, 377.0]], "isOverall": false, "label": "Guardar Deducible - -356", "isController": false}, {"data": [[1.59496746E12, 329.6666666666667]], "isOverall": false, "label": "Siguiente - -237", "isController": false}, {"data": [[1.59496764E12, 573.8333333333334]], "isOverall": false, "label": "Guardar Deducible - -355", "isController": false}, {"data": [[1.5949677E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.5949677E12, 528.8333333333334]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -379", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.5949677E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.59496746E12, "maxY": 26333.0, "series": [{"data": [[1.59496752E12, 26333.0], [1.5949677E12, 5066.0], [1.59496758E12, 10176.0], [1.59496746E12, 7301.0], [1.59496764E12, 7565.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.59496752E12, 133.0], [1.5949677E12, 0.0], [1.59496758E12, 147.0], [1.59496746E12, 95.0], [1.59496764E12, 125.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.59496752E12, 2306.1999999999985], [1.5949677E12, 4057.2000000000003], [1.59496758E12, 4716.0], [1.59496746E12, 5067.2], [1.59496764E12, 4671.400000000001]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.59496752E12, 26098.04], [1.5949677E12, 5066.0], [1.59496758E12, 10164.220000000003], [1.59496746E12, 7301.0], [1.59496764E12, 7565.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.59496752E12, 9423.399999999967], [1.5949677E12, 4985.25], [1.59496758E12, 5585.599999999997], [1.59496746E12, 5700.599999999999], [1.59496764E12, 7367.900000000001]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.5949677E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 192.5, "minX": 1.0, "maxY": 2780.0, "series": [{"data": [[2.0, 1130.5], [8.0, 192.5], [4.0, 701.0], [1.0, 2780.0], [9.0, 252.0], [5.0, 696.5], [6.0, 578.0], [3.0, 1109.0], [14.0, 215.0], [7.0, 541.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 14.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 120.0, "minX": 1.0, "maxY": 1230.0, "series": [{"data": [[2.0, 917.5], [8.0, 156.0], [4.0, 633.5], [1.0, 1230.0], [9.0, 239.0], [5.0, 694.0], [6.0, 508.5], [3.0, 1086.0], [14.0, 120.0], [7.0, 539.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 14.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.5833333333333334, "minX": 1.59496746E12, "maxY": 2.0166666666666666, "series": [{"data": [[1.59496752E12, 2.0166666666666666], [1.5949677E12, 0.5833333333333334], [1.59496758E12, 1.6833333333333333], [1.59496746E12, 1.1], [1.59496764E12, 1.4166666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.5949677E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.15, "minX": 1.59496746E12, "maxY": 2.0166666666666666, "series": [{"data": [[1.59496752E12, 2.0166666666666666], [1.5949677E12, 0.6333333333333333], [1.59496758E12, 1.6833333333333333], [1.59496746E12, 0.9], [1.59496764E12, 1.4166666666666667]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.59496746E12, 0.15]], "isOverall": false, "label": "302", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.5949677E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.59496746E12, "maxY": 0.1, "series": [{"data": [[1.59496752E12, 0.1]], "isOverall": false, "label": "Ingresar Id Agente - -260-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Guardar Agente - -268-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "Clic Crear Deducible - -352-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "Descuentos Siguiente - -346-success", "isController": false}, {"data": [[1.59496746E12, 0.1]], "isOverall": false, "label": "Login - -207-success", "isController": false}, {"data": [[1.59496752E12, 0.1]], "isOverall": false, "label": "Guardar Facturacion - -289-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -301-success", "isController": false}, {"data": [[1.59496746E12, 0.1]], "isOverall": false, "label": "Index - -202-success", "isController": false}, {"data": [[1.59496758E12, 0.1]], "isOverall": false, "label": "Agregar Participante de la Poliza - -312-success", "isController": false}, {"data": [[1.59496758E12, 0.1]], "isOverall": false, "label": "Guardar Participante de la Poliza - -315-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Ingresar Id Agente - -258-success", "isController": false}, {"data": [[1.5949677E12, 0.1]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --405-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "Login - -209-1-success", "isController": false}, {"data": [[1.59496764E12, 0.1]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -366-success", "isController": false}, {"data": [[1.59496752E12, 0.016666666666666666], [1.59496758E12, 0.08333333333333333]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -297-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -305-success", "isController": false}, {"data": [[1.59496764E12, 0.1]], "isOverall": false, "label": "Comisiones Siguiente - -368-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -319-success", "isController": false}, {"data": [[1.59496758E12, 0.1]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -340-success", "isController": false}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -382-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "Buscar Cedula del Cliente - -235-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Siguiente 3 - -249-success", "isController": false}, {"data": [[1.59496758E12, 0.1]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -329-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -273-success", "isController": false}, {"data": [[1.59496764E12, 0.1]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -362-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -321-success", "isController": false}, {"data": [[1.59496758E12, 0.1]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -331-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Editar Facturacion - -287-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -308-success", "isController": false}, {"data": [[1.59496758E12, 0.1]], "isOverall": false, "label": "Editar Objeto de Cobertura - -339-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -298-success", "isController": false}, {"data": [[1.59496758E12, 0.1]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -325-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "Index - -203-0-success", "isController": false}, {"data": [[1.59496752E12, 0.1]], "isOverall": false, "label": "Editar Facturacion - -283-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "Impuestos Siguiente - -371-success", "isController": false}, {"data": [[1.59496746E12, 0.1]], "isOverall": false, "label": "Clic Menu Operaciones del Sistema - -222-success", "isController": false}, {"data": [[1.59496746E12, 0.1]], "isOverall": false, "label": "Siguiente 2 - -238-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -300-success", "isController": false}, {"data": [[1.5949677E12, 0.03333333333333333], [1.59496764E12, 0.016666666666666666]], "isOverall": false, "label": "Calculo de Prima Guardar - -377-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -330-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -336-success", "isController": false}, {"data": [[1.59496746E12, 0.1]], "isOverall": false, "label": "Ingresar Cedula del Cliente - -233-success", "isController": false}, {"data": [[1.59496746E12, 0.1]], "isOverall": false, "label": "Buscar Cedula del Cliente - -234-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "Guardar Participante de la Poliza - -316-success", "isController": false}, {"data": [[1.59496758E12, 0.1]], "isOverall": false, "label": "Cotizacion Geenral Siguiente - -318-success", "isController": false}, {"data": [[1.59496752E12, 0.1]], "isOverall": false, "label": "Ingresar Id Agente - -257-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "Documentos por Poliza Siguiente - -365-success", "isController": false}, {"data": [[1.59496764E12, 0.1]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -374-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "Siguiente - -237-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -272-success", "isController": false}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "Transaction Controller-success", "isController": true}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Editar Facturacion - -286-success", "isController": false}, {"data": [[1.59496764E12, 0.1]], "isOverall": false, "label": "Clic Crear Deducible - -347-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -322-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Ingresar Id Agente - -254-success", "isController": false}, {"data": [[1.59496764E12, 0.1]], "isOverall": false, "label": "Guardar Deducible - -355-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -326-success", "isController": false}, {"data": [[1.59496752E12, 0.1]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -294-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -282-success", "isController": false}, {"data": [[1.5949677E12, 0.03333333333333333], [1.59496764E12, 0.06666666666666667]], "isOverall": false, "label": "Calculo de Prima Guardar - -376-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "Login - -207-0-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "Clic Crear Deducible - -354-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -303-success", "isController": false}, {"data": [[1.59496764E12, 0.1]], "isOverall": false, "label": "Clausulas Siguiente - -372-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Ingresar Id Agente - -262-success", "isController": false}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -384-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Clic Crear Participante de Poliza - -295-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "Cobertura Siguiente - -344-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "Clic Crear Deducible - -350-success", "isController": false}, {"data": [[1.59496752E12, 0.1]], "isOverall": false, "label": "Clic Crear Agente - -250-success", "isController": false}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --407-success", "isController": false}, {"data": [[1.59496746E12, 0.1]], "isOverall": false, "label": "Clic Menu Control de Polizas - -223-success", "isController": false}, {"data": [[1.59496746E12, 0.1]], "isOverall": false, "label": "Siguiente - -236-success", "isController": false}, {"data": [[1.59496758E12, 0.1]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -307-success", "isController": false}, {"data": [[1.59496764E12, 0.1]], "isOverall": false, "label": "Deducible Siguiente - -357-success", "isController": false}, {"data": [[1.5949677E12, 0.1]], "isOverall": false, "label": "Calculo de Prima Clic Boton Prima - -378-success", "isController": false}, {"data": [[1.59496752E12, 0.05], [1.59496758E12, 0.05]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -291-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "Login - -209-success", "isController": false}, {"data": [[1.59496752E12, 0.1]], "isOverall": false, "label": "Ingresar Id Agente - -256-success", "isController": false}, {"data": [[1.59496752E12, 0.1]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -269-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "Informacion dle Cliente Siguiente - -375-success", "isController": false}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --409-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -335-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -271-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Editar Facturacion - -285-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Ingresar Id Agente - -253-success", "isController": false}, {"data": [[1.59496752E12, 0.1]], "isOverall": false, "label": "Cotizacion Relacionada a Historia Siguiente - -281-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "Guardar Objeto de Cobertura - -341-success", "isController": false}, {"data": [[1.59496752E12, 0.1]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -275-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "Guardar Deducible - -356-success", "isController": false}, {"data": [[1.59496752E12, 0.1]], "isOverall": false, "label": "Guardar Agente - -263-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "Clic Crear Deducible - -348-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Siguiente 3 - -247-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "Grabar Objeto de Cobertura - -333-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Guardar Agente - -267-success", "isController": false}, {"data": [[1.59496758E12, 0.1]], "isOverall": false, "label": "Editar Objeto de Cobertura - -337-success", "isController": false}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --403-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "Documentos por Objeto Siguiente - -367-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "Index - -203-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "Login - -207-1-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "Clausulas Siguiente - -373-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "Login - -209-0-success", "isController": false}, {"data": [[1.59496752E12, 0.1]], "isOverall": false, "label": "Siguiente 3 - -242-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "Clic Crear Deducible - -351-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Guardar Facturacion - -290-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Ingresar Id Agente - -259-success", "isController": false}, {"data": [[1.59496758E12, 0.1]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -302-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Ingresar Id Agente - -261-success", "isController": false}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "Clic Boton Cotizacion Aceptada --406-success", "isController": false}, {"data": [[1.59496764E12, 0.1]], "isOverall": false, "label": "Cobertura Siguiente - -343-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "Comisiones Siguiente - -369-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -232-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Clic Crear Agente - -251-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -306-success", "isController": false}, {"data": [[1.5949677E12, 0.1]], "isOverall": false, "label": "Clic Boton Proceder Cotizacion Aceptada --408-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Ingresar Id Agente - -255-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Clic Carpeta Participante de Poliza - -292-success", "isController": false}, {"data": [[1.59496758E12, 0.1]], "isOverall": false, "label": "Cerrar Objeto de Cobertura - -334-success", "isController": false}, {"data": [[1.5949677E12, 0.1]], "isOverall": false, "label": "Clic Menu Cotizacion Relacionada a Historia - -379-success", "isController": false}, {"data": [[1.59496752E12, 0.1]], "isOverall": false, "label": "Ingresar Id Agente - -252-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "Buscar ID Participante de Poliza - -309-success", "isController": false}, {"data": [[1.59496764E12, 0.1]], "isOverall": false, "label": "Impuestos Siguiente - -370-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "Deducible Siguiente - -360-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Editar Facturacion - -288-success", "isController": false}, {"data": [[1.59496758E12, 0.1]], "isOverall": false, "label": "Prima Objeto de Cobertura - -342-success", "isController": false}, {"data": [[1.59496758E12, 0.1]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -320-success", "isController": false}, {"data": [[1.5949677E12, 0.05]], "isOverall": false, "label": "Debug Sampler-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -274-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Clic Boton Crear Cotizacion Nueva - -278-success", "isController": false}, {"data": [[1.59496764E12, 0.05]], "isOverall": false, "label": "Clic Crear Deducible - -349-success", "isController": false}, {"data": [[1.59496764E12, 0.1]], "isOverall": false, "label": "Descuentos Siguiente - -345-success", "isController": false}, {"data": [[1.59496746E12, 0.1]], "isOverall": false, "label": "Clic MenuCrear Cotizacion - -224-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "Index - -203-1-success", "isController": false}, {"data": [[1.5949677E12, 0.1]], "isOverall": false, "label": "Clic Boton Cotizacion a Cliente --402-success", "isController": false}, {"data": [[1.59496746E12, 0.05]], "isOverall": false, "label": "Siguiente 2 - -240-success", "isController": false}, {"data": [[1.59496758E12, 0.05]], "isOverall": false, "label": "Anadir Objeto de Cobertura - -324-success", "isController": false}, {"data": [[1.59496752E12, 0.05]], "isOverall": false, "label": "Editar Facturacion - -284-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.5949677E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.9666666666666667, "minX": 1.59496746E12, "maxY": 2.6666666666666665, "series": [{"data": [[1.59496752E12, 2.6666666666666665], [1.5949677E12, 0.9666666666666667], [1.59496758E12, 2.4833333333333334], [1.59496746E12, 1.5], [1.59496764E12, 1.9833333333333334]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.5949677E12, "title": "Total Transactions Per Second"}},
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
