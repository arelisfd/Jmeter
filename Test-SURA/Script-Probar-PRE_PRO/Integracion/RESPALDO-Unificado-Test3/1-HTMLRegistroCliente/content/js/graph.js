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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 2.0, "series": [{"data": [[1700.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "1 - Seleccionar Index", "isController": true}, {"data": [[1500.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": " 13.4.10 - Llenar Formulario Relacion -99", "isController": false}, {"data": [[1500.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": " 13.4.7 - Llenar Formulario Relacion -95", "isController": false}, {"data": [[1300.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -97", "isController": false}, {"data": [[1100.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -98", "isController": false}, {"data": [[3400.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": " 13.4.12 - Llenar Formulario Relacion -101", "isController": false}, {"data": [[2800.0, 1.0], [2900.0, 1.0]], "isOverall": false, "label": "7.4 - Formulario Datos de la Persona Identificacion-17", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182", "isController": false}, {"data": [[2600.0, 1.0], [2700.0, 1.0]], "isOverall": false, "label": "6.2 - Presionar boton Nuevo Cliente-12", "isController": false}, {"data": [[1200.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "7.12 - Formulario Datos de la Persona Buscar Ocupacion-25", "isController": false}, {"data": [[300.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "15.3.3 -  Formulario Campos Adicionales-140", "isController": false}, {"data": [[700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "14.4.19 - Formulario Cuentas Bancarias-127", "isController": false}, {"data": [[200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "4 - Seleccionar en el menu Modulo de Personas", "isController": true}, {"data": [[2700.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "5 - Seleccionar en el menu Clientes", "isController": true}, {"data": [[600.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "10.5 - Formulario Domicilio Provincia Pais de residencia-44", "isController": false}, {"data": [[1500.0, 2.0]], "isOverall": false, "label": "15.3.22 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[2100.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "13.4.3 - Llenar Formulario Relacion -91", "isController": false}, {"data": [[1400.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "13.4.5 - Llenar Formulario Relacion -93", "isController": false}, {"data": [[700.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "10.6 - Formulario Domicilio Provincia Pais de residencia-45", "isController": false}, {"data": [[3300.0, 1.0], [3400.0, 1.0]], "isOverall": false, "label": "12.3 - Formulario Contactos Guardar", "isController": true}, {"data": [[1100.0, 1.0], [1200.0, 1.0]], "isOverall": false, "label": "14.5.1 - Guardar Cuentas Bancarias-134", "isController": false}, {"data": [[1100.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "15.3.20 - Formulario Campos Adicionales Actividad Principal-156", "isController": false}, {"data": [[1600.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "15.3.23 - Formulario Campo Accionista-159", "isController": false}, {"data": [[900.0, 2.0]], "isOverall": false, "label": "15.3.25 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[2200.0, 2.0]], "isOverall": false, "label": "6.1 - Presionar boton Nuevo Cliente-11", "isController": false}, {"data": [[33600.0, 1.0], [30400.0, 1.0]], "isOverall": false, "label": "13.4 - Formulario Relacion Buscar ", "isController": true}, {"data": [[2100.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "13.4.1 - Buscar Identificacion -89", "isController": false}, {"data": [[2800.0, 1.0], [3100.0, 1.0]], "isOverall": false, "label": " 13.4.13 - Llenar Formulario Relacion Identificacion -102", "isController": false}, {"data": [[400.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito Ventana-71", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185-0", "isController": false}, {"data": [[2900.0, 1.0], [3100.0, 1.0]], "isOverall": false, "label": " 13.4.14 - Llenar Formulario Relacion -103", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185-1", "isController": false}, {"data": [[2400.0, 1.0], [1400.0, 1.0]], "isOverall": false, "label": "6.4 - Presionar boton Nuevo Cliente-14", "isController": false}, {"data": [[800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "14.4.25 - Tercera Cuenta Bancaria", "isController": true}, {"data": [[1300.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "15.5.1 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "14.5.2 - Guardar Cuentas Bancarias-135", "isController": false}, {"data": [[3100.0, 1.0], [3400.0, 1.0]], "isOverall": false, "label": "7.7 - Formulario Persona Digito Verificador y Fecha de Vencimiento-20", "isController": false}, {"data": [[1600.0, 1.0], [3200.0, 1.0]], "isOverall": false, "label": "11.3 - Hacer clic en Crear Contactos-81", "isController": false}, {"data": [[2900.0, 1.0], [3400.0, 1.0]], "isOverall": false, "label": "14.3 - Hacer clic en Crear Cuentas Bancarias-108", "isController": false}, {"data": [[2200.0, 1.0], [2900.0, 1.0]], "isOverall": false, "label": "7.2 - Se abre Formulario Persona-16", "isController": false}, {"data": [[3000.0, 1.0], [3600.0, 1.0]], "isOverall": false, "label": "14.4.2 - Formulario Cuentas Bancarias-110", "isController": false}, {"data": [[800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "12.3.2 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[700.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "14.4.17 - Formulario Cuentas Bancarias-125", "isController": false}, {"data": [[1100.0, 2.0]], "isOverall": false, "label": "18 - Presionar el boton Cerrar  Insis", "isController": true}, {"data": [[400.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3", "isController": false}, {"data": [[300.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "17.2 - Presionar el boton Cerrar  Persona--176", "isController": false}, {"data": [[2600.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito -53", "isController": false}, {"data": [[1200.0, 1.0], [1300.0, 1.0]], "isOverall": false, "label": "17 - Presionar el boton Cerrar  Persona", "isController": true}, {"data": [[2500.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "7.8 - Formulario Datos de la Persona Nombre-21", "isController": false}, {"data": [[900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "11.1 - Hacer clic en Crear Contactos-79", "isController": false}, {"data": [[1200.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "15.3.27 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[1300.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "14.4.3 - Formulario Cuentas Bancarias-111", "isController": false}, {"data": [[1100.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "14.2 - Hacer clic en Crear Cuentas Bancarias-107", "isController": false}, {"data": [[300.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "17.1 - Presionar el boton Cerrar  Persona-175", "isController": false}, {"data": [[44400.0, 2.0]], "isOverall": false, "label": "10 - Llenar el Formulario Domicilio", "isController": true}, {"data": [[1200.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "5.1 - Seleccionar en el menu Cliente-9", "isController": false}, {"data": [[2800.0, 1.0], [3100.0, 1.0]], "isOverall": false, "label": "7.5 - Formulario Datos de la Persona Identificacion-18", "isController": false}, {"data": [[2500.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "15.3.13 - Formulario Campo Cargo que Ocupa-150", "isController": false}, {"data": [[6400.0, 1.0], [7600.0, 1.0]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5", "isController": false}, {"data": [[600.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "3.1 - Seleccionar en el menu Operaciones del Sistema-7", "isController": false}, {"data": [[2100.0, 1.0], [2400.0, 1.0]], "isOverall": false, "label": "7.11 - Formulario Datos de la Persona Buscar Ocupacion-24", "isController": false}, {"data": [[320100.0, 1.0], [320000.0, 1.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1300.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "14.4.16- Formulario Cuentas Bancarias-124", "isController": false}, {"data": [[700.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "15.5.4 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "15.3.16 - Formulario Tipo de PYMES-153", "isController": false}, {"data": [[2100.0, 1.0], [1400.0, 1.0]], "isOverall": false, "label": "13.3 - Seleccionar Vinculo Relacion-88", "isController": false}, {"data": [[4700.0, 1.0], [6300.0, 1.0]], "isOverall": false, "label": "13.5 - Formulario Relacion Guardar", "isController": true}, {"data": [[8200.0, 1.0], [8900.0, 1.0]], "isOverall": false, "label": "12 - Llenar el Formulario de Contactos", "isController": true}, {"data": [[4600.0, 1.0], [3400.0, 1.0]], "isOverall": false, "label": "11 - Seleccionar opcion Contactos", "isController": true}, {"data": [[300.0, 1.0], [600.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-57", "isController": false}, {"data": [[2100.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "7.18 - Formulario Datos de la Persona Pais-31", "isController": false}, {"data": [[2900.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "15.5.2 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[9600.0, 1.0], [10600.0, 1.0]], "isOverall": false, "label": "7.20 - Presionar Grabar Datos de la Persona ", "isController": true}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183-0", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183-1", "isController": false}, {"data": [[1200.0, 1.0], [1400.0, 1.0]], "isOverall": false, "label": "15.3.19- Formulario Campo Ingresos Anuales-155", "isController": false}, {"data": [[3700.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "14.4.9 - Formulario Cuentas Bancarias-117", "isController": false}, {"data": [[1100.0, 1.0], [1300.0, 1.0]], "isOverall": false, "label": "15.4.3 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "4.1 - Seleccionar Modulo de Personas-8", "isController": false}, {"data": [[100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185", "isController": false}, {"data": [[600.0, 2.0]], "isOverall": false, "label": "14.4.21 - Formulario Cuentas Bancarias-129", "isController": false}, {"data": [[400.0, 2.0]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182-0", "isController": false}, {"data": [[100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182-2", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182-1", "isController": false}, {"data": [[200.0, 2.0]], "isOverall": false, "label": "1.2 Se Selecciona Index-2", "isController": false}, {"data": [[800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "14.4.25.1 - Tercera Cuenta Bancaria", "isController": false}, {"data": [[300.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "13.2 - Hacer clic en Crear Relacion-87", "isController": false}, {"data": [[1400.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "7.16 - Formulario Datos de la Persona Seleccionar Genero-29", "isController": false}, {"data": [[2400.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "10.1 - Formulario Domicilio Tipo de direccion-40", "isController": false}, {"data": [[1500.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "15.3.15 - Formulario Campo Perfil PYMES-152", "isController": false}, {"data": [[2200.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "14.4.13 - Formulario Cuentas Bancarias-121", "isController": false}, {"data": [[4900.0, 1.0], [3700.0, 1.0]], "isOverall": false, "label": "13.5.1 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[2800.0, 1.0], [24800.0, 1.0]], "isOverall": false, "label": "14.4.6 - Formulario Cuentas Bancarias-114", "isController": false}, {"data": [[1200.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "15.3.21 - Formulario Campos Adicionales por otras Actividad-157", "isController": false}, {"data": [[600.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "3 - Seleccionar en el menu Operaciones del Sistema", "isController": true}, {"data": [[1100.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "6.3 - Presionar boton Nuevo Cliente-13", "isController": false}, {"data": [[5200.0, 2.0]], "isOverall": false, "label": "16 - Presionar el boton Grabar Persona", "isController": true}, {"data": [[1700.0, 2.0]], "isOverall": false, "label": "7.15 - Formulario Datos de la Persona Seleccionar Genero-28", "isController": false}, {"data": [[800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "15.5.3 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[1300.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "13.4.6 - Llenar Formulario Relacion -94", "isController": false}, {"data": [[2500.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "15.3.5 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[1700.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "14.4.10 - Formulario Cuentas Bancarias-118", "isController": false}, {"data": [[700.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "1.1 Se selecciona Inicio-1", "isController": false}, {"data": [[60000.0, 1.0], [62600.0, 1.0]], "isOverall": false, "label": "14.4 - Llenar el Formulario de Cuentas Bancarias", "isController": true}, {"data": [[68400.0, 1.0], [69900.0, 1.0]], "isOverall": false, "label": "14 - Seleccionar opcion Cuentas Bancarias ", "isController": true}, {"data": [[49000.0, 2.0]], "isOverall": false, "label": "15.3 - Llenar Formulario Campos Adicionales", "isController": true}, {"data": [[2900.0, 1.0], [3600.0, 1.0]], "isOverall": false, "label": "8.3.1 - Formulario Datos de Cliente Grabar-37", "isController": false}, {"data": [[22100.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "14.4.7 - Formulario Cuentas Bancarias-115", "isController": false}, {"data": [[2600.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": " 13.4.8 - Llenar Formulario Relacion -96", "isController": false}, {"data": [[600.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "14.4.24.1 - Segunda Cuenta Bancaria-132", "isController": false}, {"data": [[2900.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-52", "isController": false}, {"data": [[2300.0, 1.0], [1200.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-55", "isController": false}, {"data": [[1300.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "14.4.12 - Formulario Cuentas Bancarias-120", "isController": false}, {"data": [[1200.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "15.3.6 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-54", "isController": false}, {"data": [[1500.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "7.17 - Formulario Datos de la Persona Fecha de Nacimiento-30", "isController": false}, {"data": [[2100.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-56", "isController": false}, {"data": [[1300.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-59", "isController": false}, {"data": [[700.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-58", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5-0", "isController": false}, {"data": [[900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "7.20.2 - Presionar Grabar Datos de la Persona -34", "isController": false}, {"data": [[900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "14.4.22 - Formulario Cuentas Bancarias-130", "isController": false}, {"data": [[6300.0, 1.0], [7500.0, 1.0]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5-1", "isController": false}, {"data": [[2600.0, 1.0], [2900.0, 1.0]], "isOverall": false, "label": "12.1 - Formulario Contactos-82", "isController": false}, {"data": [[3300.0, 1.0], [3200.0, 1.0]], "isOverall": false, "label": "7.6 - Formulario Datos de la Persona Identificacion-19", "isController": false}, {"data": [[1400.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "15.3.7 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[600.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-77", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-78", "isController": false}, {"data": [[2600.0, 1.0], [3700.0, 1.0]], "isOverall": false, "label": "14.4.8 - Formulario Cuentas Bancarias-116", "isController": false}, {"data": [[1100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "14.4.23 - Cunenta Bancaria Principal", "isController": true}, {"data": [[5600.0, 1.0], [6600.0, 1.0]], "isOverall": false, "label": "15.3.4 -  Formulario Campos Adicionales-141", "isController": false}, {"data": [[2100.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "15.3.10 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[1100.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "13.1 - Seleccionar opcion Relacion-86", "isController": false}, {"data": [[2900.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": " 13.4.11 - Llenar Formulario Relacion -100", "isController": false}, {"data": [[2500.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "12.2 - Formulario Contactos Correo-83", "isController": false}, {"data": [[1300.0, 2.0]], "isOverall": false, "label": "8.1 - Llenar Formulario Datos de Cliente-35", "isController": false}, {"data": [[1400.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "13.5.2 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[2100.0, 2.0]], "isOverall": false, "label": "7.14 - Formulario Datos de la Persona Seleccionar Ocupacion-27", "isController": false}, {"data": [[1200.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "15.3.29 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[1600.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "15.3.18 - Formulario Campo Exoneracion de impuesto-154", "isController": false}, {"data": [[1100.0, 1.0], [1400.0, 1.0]], "isOverall": false, "label": "15.3.8 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[2300.0, 1.0], [3200.0, 1.0]], "isOverall": false, "label": "14.4.5 - Formulario Cuentas Bancarias-113", "isController": false}, {"data": [[700.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "14.4.14 - Formulario Cuentas Bancarias-122", "isController": false}, {"data": [[1100.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-75", "isController": false}, {"data": [[8400.0, 1.0], [6800.0, 1.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[700.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-67", "isController": false}, {"data": [[800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-74", "isController": false}, {"data": [[900.0, 2.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-76", "isController": false}, {"data": [[700.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-61", "isController": false}, {"data": [[1400.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "14.4.11 - Formulario Cuentas Bancarias-119", "isController": false}, {"data": [[1400.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-70", "isController": false}, {"data": [[1300.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-73", "isController": false}, {"data": [[2100.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-72", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0]], "isOverall": false, "label": "10.4 - Formulario Domicilio Venta Provincia Pais de residencia-43", "isController": false}, {"data": [[1100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "15.4.2 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[4400.0, 2.0]], "isOverall": false, "label": "16.1 - Presionar el boton Grabar Persona-173", "isController": false}, {"data": [[2900.0, 1.0], [3000.0, 1.0]], "isOverall": false, "label": "7.10 - Formulario Datos de la Persona Segundo Apellido-23", "isController": false}, {"data": [[1600.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "7.19 - Formulario Datos de la Persona Nacionalidad-32", "isController": false}, {"data": [[1300.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-64", "isController": false}, {"data": [[50200.0, 1.0], [53800.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[1300.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-63", "isController": false}, {"data": [[2200.0, 1.0], [1400.0, 1.0]], "isOverall": false, "label": "15.3.14 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[1200.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-66", "isController": false}, {"data": [[1300.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-65", "isController": false}, {"data": [[800.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "13.4.4 - Llenar Formulario Relacion -92", "isController": false}, {"data": [[1600.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-68", "isController": false}, {"data": [[1100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "14.4.23.1 - Cunenta Bancaria Principal-131", "isController": false}, {"data": [[6000.0, 1.0], [6300.0, 1.0]], "isOverall": false, "label": "15.5 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[700.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-69", "isController": false}, {"data": [[200.0, 2.0]], "isOverall": false, "label": "17.4 - Presionar el boton Cerrar  Persona--178", "isController": false}, {"data": [[900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-60", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "17.3 - Presionar el boton Cerrar  Persona-", "isController": false}, {"data": [[2500.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-62", "isController": false}, {"data": [[1000.0, 2.0]], "isOverall": false, "label": "15.3.2 -  Formulario Campos Adicionales-139", "isController": false}, {"data": [[1300.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "10.7 - Formulario Domicilio Provincia Pais de residencia-46", "isController": false}, {"data": [[2600.0, 1.0], [3000.0, 1.0]], "isOverall": false, "label": "7.1 - Se abre Formulario Persona-15", "isController": false}, {"data": [[900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "7.13 - Formulario Datos de la Persona Buscar Ocupacion-26", "isController": false}, {"data": [[2200.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "8.2 - Seleccionar Datos de Cliente-36", "isController": false}, {"data": [[8600.0, 1.0], [9500.0, 1.0]], "isOverall": false, "label": "7.20.1 - Presionar Grabar Datos de la Persona -33", "isController": false}, {"data": [[2400.0, 1.0], [2700.0, 1.0]], "isOverall": false, "label": "7.9 - Formulario Datos de la Persona Primer Apellido-22", "isController": false}, {"data": [[4300.0, 1.0], [3700.0, 1.0]], "isOverall": false, "label": "15.4 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[2500.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "15.3.9 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[2600.0, 1.0], [2700.0, 1.0]], "isOverall": false, "label": "14.4.4 - Formulario Cuentas Bancarias-112", "isController": false}, {"data": [[2500.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "14.1 - Hacer clic en Crear Cuentas Bancarias-106", "isController": false}, {"data": [[1200.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "14.4.15 - Formulario Cuentas Bancarias-123", "isController": false}, {"data": [[1300.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "15.3.12 - Formulario campo Nombre de la Empresa y Nacionalidad-149", "isController": false}, {"data": [[800.0, 2.0]], "isOverall": false, "label": "8.3.2 - Formulario Datos de Cliente Grabar-38", "isController": false}, {"data": [[1400.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "15.3.24 - Formulario Campo Porcentaje de participacion-160", "isController": false}, {"data": [[500.0, 2.0]], "isOverall": false, "label": "14.4.20 - Formulario Cuentas Bancarias-128", "isController": false}, {"data": [[1400.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "14.5 - Guardar Cuentas Bancarias", "isController": true}, {"data": [[1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "15.4.1 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "9.1 - Hacer clic en Crear Domicilio-39", "isController": false}, {"data": [[2100.0, 1.0], [3000.0, 1.0]], "isOverall": false, "label": "15.3.1 - Formulario Campos Adicionales-138", "isController": false}, {"data": [[700.0, 2.0]], "isOverall": false, "label": "16.2 - Presionar el boton Grabar Persona-174", "isController": false}, {"data": [[1500.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "15.3.28 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[600.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "14.4.24 - Segunda Cuenta Bancaria", "isController": true}, {"data": [[0.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3-1", "isController": false}, {"data": [[900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "9 - Seleccionar Domicilio", "isController": true}, {"data": [[41200.0, 1.0], [41900.0, 1.0]], "isOverall": false, "label": "13 - Seleccionar opcion Relacion", "isController": true}, {"data": [[600.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "14.4.18 - Formulario Cuentas Bancarias-126", "isController": false}, {"data": [[300.0, 2.0]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3-0", "isController": false}, {"data": [[600.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "15.2 - Hacer clic en la opcion Campos Adicionales-137", "isController": false}, {"data": [[3300.0, 1.0], [3200.0, 1.0]], "isOverall": false, "label": "14.4.1 - Formulario Cuentas Bancarias-109", "isController": false}, {"data": [[1100.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "15.3.26 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "5.2 -Hacer clic en la opcion Cliente-10", "isController": false}, {"data": [[2900.0, 1.0], [3400.0, 1.0]], "isOverall": false, "label": "15.1 - Seleccionar la opcion Campos Adicionales-136", "isController": false}, {"data": [[7200.0, 1.0], [7900.0, 1.0]], "isOverall": false, "label": "8 - Llenar Formulario Datos de Cliente", "isController": true}, {"data": [[700.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "11.2 - Hacer clic en Crear Contactos-80", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "1.2 Se Selecciona Index-2-0", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "1.2 Se Selecciona Index-2-1", "isController": false}, {"data": [[4400.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "8.3 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[1300.0, 1.0], [1400.0, 1.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio", "isController": true}, {"data": [[2200.0, 1.0], [1100.0, 1.0]], "isOverall": false, "label": "10.2 - Formulario Domicilio Provincia Pais de residencia-41", "isController": false}, {"data": [[2400.0, 1.0], [2600.0, 1.0]], "isOverall": false, "label": "12.3.1 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[2100.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "13.4.2 - Llenar Formulario Relacion -90", "isController": false}, {"data": [[2700.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "15.3.11 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[63400.0, 1.0], [62700.0, 1.0]], "isOverall": false, "label": "15 - Seleccionar la opcion Campos Adicionales", "isController": true}, {"data": [[800.0, 2.0]], "isOverall": false, "label": "10.8 - Formulario Domicilio Corregimiento Distrito-47", "isController": false}, {"data": [[1100.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "10.3 - Formulario Domicilio Provincia Pais de residencia-42", "isController": false}, {"data": [[8500.0, 1.0], [7300.0, 1.0]], "isOverall": false, "label": "6 - Presionar boton Nuevo Cliente", "isController": true}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 320100.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 51.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 170.0, "series": [{"data": [[0.0, 51.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 155.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 170.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 1.8695652173913044, "minX": 1.59594972E12, "maxY": 2.0, "series": [{"data": [[1.59594996E12, 2.0], [1.59594978E12, 2.0], [1.5959499E12, 2.0], [1.59594972E12, 2.0], [1.59595002E12, 1.8695652173913044], [1.59594984E12, 2.0]], "isOverall": false, "label": "1- Thread Group_Registro_de_Cliente", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59595002E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 91.0, "minX": 3.0, "maxY": 320105.0, "series": [{"data": [[10.0, 1390.0]], "isOverall": false, "label": "1 - Seleccionar Index", "isController": true}, {"data": [[10.0, 1390.0]], "isOverall": false, "label": "1 - Seleccionar Index-Aggregated", "isController": true}, {"data": [[6.0, 2793.5]], "isOverall": false, "label": " 13.4.10 - Llenar Formulario Relacion -99", "isController": false}, {"data": [[6.0, 2793.5]], "isOverall": false, "label": " 13.4.10 - Llenar Formulario Relacion -99-Aggregated", "isController": false}, {"data": [[6.0, 1805.0]], "isOverall": false, "label": " 13.4.7 - Llenar Formulario Relacion -95", "isController": false}, {"data": [[6.0, 1805.0]], "isOverall": false, "label": " 13.4.7 - Llenar Formulario Relacion -95-Aggregated", "isController": false}, {"data": [[6.0, 1549.0]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -97", "isController": false}, {"data": [[6.0, 1549.0]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -97-Aggregated", "isController": false}, {"data": [[6.0, 1010.5]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -98", "isController": false}, {"data": [[6.0, 1010.5]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -98-Aggregated", "isController": false}, {"data": [[6.0, 3712.5]], "isOverall": false, "label": " 13.4.12 - Llenar Formulario Relacion -101", "isController": false}, {"data": [[6.0, 3712.5]], "isOverall": false, "label": " 13.4.12 - Llenar Formulario Relacion -101-Aggregated", "isController": false}, {"data": [[10.0, 2887.5]], "isOverall": false, "label": "7.4 - Formulario Datos de la Persona Identificacion-17", "isController": false}, {"data": [[10.0, 2887.5]], "isOverall": false, "label": "7.4 - Formulario Datos de la Persona Identificacion-17-Aggregated", "isController": false}, {"data": [[4.0, 752.0], [3.0, 671.0]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182", "isController": false}, {"data": [[3.5, 711.5]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182-Aggregated", "isController": false}, {"data": [[10.0, 2677.5]], "isOverall": false, "label": "6.2 - Presionar boton Nuevo Cliente-12", "isController": false}, {"data": [[10.0, 2677.5]], "isOverall": false, "label": "6.2 - Presionar boton Nuevo Cliente-12-Aggregated", "isController": false}, {"data": [[8.0, 1413.5]], "isOverall": false, "label": "7.12 - Formulario Datos de la Persona Buscar Ocupacion-25", "isController": false}, {"data": [[8.0, 1413.5]], "isOverall": false, "label": "7.12 - Formulario Datos de la Persona Buscar Ocupacion-25-Aggregated", "isController": false}, {"data": [[4.0, 248.0]], "isOverall": false, "label": "15.3.3 -  Formulario Campos Adicionales-140", "isController": false}, {"data": [[4.0, 248.0]], "isOverall": false, "label": "15.3.3 -  Formulario Campos Adicionales-140-Aggregated", "isController": false}, {"data": [[4.0, 645.0]], "isOverall": false, "label": "14.4.19 - Formulario Cuentas Bancarias-127", "isController": false}, {"data": [[4.0, 645.0]], "isOverall": false, "label": "14.4.19 - Formulario Cuentas Bancarias-127-Aggregated", "isController": false}, {"data": [[10.0, 224.0]], "isOverall": false, "label": "4 - Seleccionar en el menu Modulo de Personas", "isController": true}, {"data": [[10.0, 224.0]], "isOverall": false, "label": "4 - Seleccionar en el menu Modulo de Personas-Aggregated", "isController": true}, {"data": [[10.0, 2301.0]], "isOverall": false, "label": "5 - Seleccionar en el menu Clientes", "isController": true}, {"data": [[10.0, 2301.0]], "isOverall": false, "label": "5 - Seleccionar en el menu Clientes-Aggregated", "isController": true}, {"data": [[6.0, 844.0]], "isOverall": false, "label": "10.5 - Formulario Domicilio Provincia Pais de residencia-44", "isController": false}, {"data": [[6.0, 844.0]], "isOverall": false, "label": "10.5 - Formulario Domicilio Provincia Pais de residencia-44-Aggregated", "isController": false}, {"data": [[4.0, 1566.0]], "isOverall": false, "label": "15.3.22 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[4.0, 1566.0]], "isOverall": false, "label": "15.3.22 - Formulario Campos Adicionales-158-Aggregated", "isController": false}, {"data": [[6.0, 2116.5]], "isOverall": false, "label": "13.4.3 - Llenar Formulario Relacion -91", "isController": false}, {"data": [[6.0, 2116.5]], "isOverall": false, "label": "13.4.3 - Llenar Formulario Relacion -91-Aggregated", "isController": false}, {"data": [[6.0, 1747.0]], "isOverall": false, "label": "13.4.5 - Llenar Formulario Relacion -93", "isController": false}, {"data": [[6.0, 1747.0]], "isOverall": false, "label": "13.4.5 - Llenar Formulario Relacion -93-Aggregated", "isController": false}, {"data": [[6.0, 894.0]], "isOverall": false, "label": "10.6 - Formulario Domicilio Provincia Pais de residencia-45", "isController": false}, {"data": [[6.0, 894.0]], "isOverall": false, "label": "10.6 - Formulario Domicilio Provincia Pais de residencia-45-Aggregated", "isController": false}, {"data": [[6.0, 3436.0]], "isOverall": false, "label": "12.3 - Formulario Contactos Guardar", "isController": true}, {"data": [[6.0, 3436.0]], "isOverall": false, "label": "12.3 - Formulario Contactos Guardar-Aggregated", "isController": true}, {"data": [[4.0, 1188.5]], "isOverall": false, "label": "14.5.1 - Guardar Cuentas Bancarias-134", "isController": false}, {"data": [[4.0, 1188.5]], "isOverall": false, "label": "14.5.1 - Guardar Cuentas Bancarias-134-Aggregated", "isController": false}, {"data": [[4.0, 1104.5]], "isOverall": false, "label": "15.3.20 - Formulario Campos Adicionales Actividad Principal-156", "isController": false}, {"data": [[4.0, 1104.5]], "isOverall": false, "label": "15.3.20 - Formulario Campos Adicionales Actividad Principal-156-Aggregated", "isController": false}, {"data": [[4.0, 1800.0]], "isOverall": false, "label": "15.3.23 - Formulario Campo Accionista-159", "isController": false}, {"data": [[4.0, 1800.0]], "isOverall": false, "label": "15.3.23 - Formulario Campo Accionista-159-Aggregated", "isController": false}, {"data": [[4.0, 952.5]], "isOverall": false, "label": "15.3.25 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[4.0, 952.5]], "isOverall": false, "label": "15.3.25 - Formulario Campos Adicionales-161-Aggregated", "isController": false}, {"data": [[10.0, 2241.5]], "isOverall": false, "label": "6.1 - Presionar boton Nuevo Cliente-11", "isController": false}, {"data": [[10.0, 2241.5]], "isOverall": false, "label": "6.1 - Presionar boton Nuevo Cliente-11-Aggregated", "isController": false}, {"data": [[6.0, 32032.0]], "isOverall": false, "label": "13.4 - Formulario Relacion Buscar ", "isController": true}, {"data": [[6.0, 32032.0]], "isOverall": false, "label": "13.4 - Formulario Relacion Buscar -Aggregated", "isController": true}, {"data": [[6.0, 2028.0]], "isOverall": false, "label": "13.4.1 - Buscar Identificacion -89", "isController": false}, {"data": [[6.0, 2028.0]], "isOverall": false, "label": "13.4.1 - Buscar Identificacion -89-Aggregated", "isController": false}, {"data": [[6.0, 3025.5]], "isOverall": false, "label": " 13.4.13 - Llenar Formulario Relacion Identificacion -102", "isController": false}, {"data": [[6.0, 3025.5]], "isOverall": false, "label": " 13.4.13 - Llenar Formulario Relacion Identificacion -102-Aggregated", "isController": false}, {"data": [[6.0, 715.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito Ventana-71", "isController": false}, {"data": [[6.0, 715.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito Ventana-71-Aggregated", "isController": false}, {"data": [[4.0, 96.0], [3.0, 105.0]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185-0", "isController": false}, {"data": [[3.5, 100.5]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185-0-Aggregated", "isController": false}, {"data": [[6.0, 3018.5]], "isOverall": false, "label": " 13.4.14 - Llenar Formulario Relacion -103", "isController": false}, {"data": [[6.0, 3018.5]], "isOverall": false, "label": " 13.4.14 - Llenar Formulario Relacion -103-Aggregated", "isController": false}, {"data": [[4.0, 99.0], [3.0, 114.0]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185-1", "isController": false}, {"data": [[3.5, 106.5]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185-1-Aggregated", "isController": false}, {"data": [[10.0, 1980.5]], "isOverall": false, "label": "6.4 - Presionar boton Nuevo Cliente-14", "isController": false}, {"data": [[10.0, 1980.5]], "isOverall": false, "label": "6.4 - Presionar boton Nuevo Cliente-14-Aggregated", "isController": false}, {"data": [[4.0, 660.0]], "isOverall": false, "label": "14.4.25 - Tercera Cuenta Bancaria", "isController": true}, {"data": [[4.0, 660.0]], "isOverall": false, "label": "14.4.25 - Tercera Cuenta Bancaria-Aggregated", "isController": true}, {"data": [[4.0, 1210.0]], "isOverall": false, "label": "15.5.1 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[4.0, 1210.0]], "isOverall": false, "label": "15.5.1 - Formulario Campos Adicionales Cerrar-169-Aggregated", "isController": false}, {"data": [[4.0, 295.0]], "isOverall": false, "label": "14.5.2 - Guardar Cuentas Bancarias-135", "isController": false}, {"data": [[4.0, 295.0]], "isOverall": false, "label": "14.5.2 - Guardar Cuentas Bancarias-135-Aggregated", "isController": false}, {"data": [[10.0, 3300.5]], "isOverall": false, "label": "7.7 - Formulario Persona Digito Verificador y Fecha de Vencimiento-20", "isController": false}, {"data": [[10.0, 3300.5]], "isOverall": false, "label": "7.7 - Formulario Persona Digito Verificador y Fecha de Vencimiento-20-Aggregated", "isController": false}, {"data": [[6.0, 2443.5]], "isOverall": false, "label": "11.3 - Hacer clic en Crear Contactos-81", "isController": false}, {"data": [[6.0, 2443.5]], "isOverall": false, "label": "11.3 - Hacer clic en Crear Contactos-81-Aggregated", "isController": false}, {"data": [[6.0, 3202.5]], "isOverall": false, "label": "14.3 - Hacer clic en Crear Cuentas Bancarias-108", "isController": false}, {"data": [[6.0, 3202.5]], "isOverall": false, "label": "14.3 - Hacer clic en Crear Cuentas Bancarias-108-Aggregated", "isController": false}, {"data": [[10.0, 2601.0]], "isOverall": false, "label": "7.2 - Se abre Formulario Persona-16", "isController": false}, {"data": [[10.0, 2601.0]], "isOverall": false, "label": "7.2 - Se abre Formulario Persona-16-Aggregated", "isController": false}, {"data": [[6.0, 3374.0]], "isOverall": false, "label": "14.4.2 - Formulario Cuentas Bancarias-110", "isController": false}, {"data": [[6.0, 3374.0]], "isOverall": false, "label": "14.4.2 - Formulario Cuentas Bancarias-110-Aggregated", "isController": false}, {"data": [[6.0, 883.0]], "isOverall": false, "label": "12.3.2 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[6.0, 883.0]], "isOverall": false, "label": "12.3.2 - Formulario Contactos Guardar-85-Aggregated", "isController": false}, {"data": [[4.0, 851.0]], "isOverall": false, "label": "14.4.17 - Formulario Cuentas Bancarias-125", "isController": false}, {"data": [[4.0, 851.0]], "isOverall": false, "label": "14.4.17 - Formulario Cuentas Bancarias-125-Aggregated", "isController": false}, {"data": [[4.0, 1141.0], [3.0, 1106.0]], "isOverall": false, "label": "18 - Presionar el boton Cerrar  Insis", "isController": true}, {"data": [[3.5, 1123.5]], "isOverall": false, "label": "18 - Presionar el boton Cerrar  Insis-Aggregated", "isController": true}, {"data": [[10.0, 641.0]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3", "isController": false}, {"data": [[10.0, 641.0]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3-Aggregated", "isController": false}, {"data": [[4.0, 470.0]], "isOverall": false, "label": "17.2 - Presionar el boton Cerrar  Persona--176", "isController": false}, {"data": [[4.0, 470.0]], "isOverall": false, "label": "17.2 - Presionar el boton Cerrar  Persona--176-Aggregated", "isController": false}, {"data": [[6.0, 2148.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito -53", "isController": false}, {"data": [[6.0, 2148.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito -53-Aggregated", "isController": false}, {"data": [[4.0, 1258.5]], "isOverall": false, "label": "17 - Presionar el boton Cerrar  Persona", "isController": true}, {"data": [[4.0, 1258.5]], "isOverall": false, "label": "17 - Presionar el boton Cerrar  Persona-Aggregated", "isController": true}, {"data": [[10.0, 3034.0]], "isOverall": false, "label": "7.8 - Formulario Datos de la Persona Nombre-21", "isController": false}, {"data": [[10.0, 3034.0]], "isOverall": false, "label": "7.8 - Formulario Datos de la Persona Nombre-21-Aggregated", "isController": false}, {"data": [[6.0, 998.5]], "isOverall": false, "label": "11.1 - Hacer clic en Crear Contactos-79", "isController": false}, {"data": [[6.0, 998.5]], "isOverall": false, "label": "11.1 - Hacer clic en Crear Contactos-79-Aggregated", "isController": false}, {"data": [[4.0, 1375.5]], "isOverall": false, "label": "15.3.27 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[4.0, 1375.5]], "isOverall": false, "label": "15.3.27 - Formulario Campos Adicionales-163-Aggregated", "isController": false}, {"data": [[6.0, 1201.5]], "isOverall": false, "label": "14.4.3 - Formulario Cuentas Bancarias-111", "isController": false}, {"data": [[6.0, 1201.5]], "isOverall": false, "label": "14.4.3 - Formulario Cuentas Bancarias-111-Aggregated", "isController": false}, {"data": [[6.0, 1000.5]], "isOverall": false, "label": "14.2 - Hacer clic en Crear Cuentas Bancarias-107", "isController": false}, {"data": [[6.0, 1000.5]], "isOverall": false, "label": "14.2 - Hacer clic en Crear Cuentas Bancarias-107-Aggregated", "isController": false}, {"data": [[4.0, 407.0]], "isOverall": false, "label": "17.1 - Presionar el boton Cerrar  Persona-175", "isController": false}, {"data": [[4.0, 407.0]], "isOverall": false, "label": "17.1 - Presionar el boton Cerrar  Persona-175-Aggregated", "isController": false}, {"data": [[6.0, 44451.5]], "isOverall": false, "label": "10 - Llenar el Formulario Domicilio", "isController": true}, {"data": [[6.0, 44451.5]], "isOverall": false, "label": "10 - Llenar el Formulario Domicilio-Aggregated", "isController": true}, {"data": [[10.0, 1617.0]], "isOverall": false, "label": "5.1 - Seleccionar en el menu Cliente-9", "isController": false}, {"data": [[10.0, 1617.0]], "isOverall": false, "label": "5.1 - Seleccionar en el menu Cliente-9-Aggregated", "isController": false}, {"data": [[10.0, 3004.5]], "isOverall": false, "label": "7.5 - Formulario Datos de la Persona Identificacion-18", "isController": false}, {"data": [[10.0, 3004.5]], "isOverall": false, "label": "7.5 - Formulario Datos de la Persona Identificacion-18-Aggregated", "isController": false}, {"data": [[4.0, 2236.5]], "isOverall": false, "label": "15.3.13 - Formulario Campo Cargo que Ocupa-150", "isController": false}, {"data": [[4.0, 2236.5]], "isOverall": false, "label": "15.3.13 - Formulario Campo Cargo que Ocupa-150-Aggregated", "isController": false}, {"data": [[10.0, 7018.0]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5", "isController": false}, {"data": [[10.0, 7018.0]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5-Aggregated", "isController": false}, {"data": [[10.0, 784.0]], "isOverall": false, "label": "3.1 - Seleccionar en el menu Operaciones del Sistema-7", "isController": false}, {"data": [[10.0, 784.0]], "isOverall": false, "label": "3.1 - Seleccionar en el menu Operaciones del Sistema-7-Aggregated", "isController": false}, {"data": [[8.0, 2263.0]], "isOverall": false, "label": "7.11 - Formulario Datos de la Persona Buscar Ocupacion-24", "isController": false}, {"data": [[8.0, 2263.0]], "isOverall": false, "label": "7.11 - Formulario Datos de la Persona Buscar Ocupacion-24-Aggregated", "isController": false}, {"data": [[4.0, 320105.0], [3.0, 320028.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[3.5, 320066.5]], "isOverall": false, "label": "Transaction Controller-Aggregated", "isController": true}, {"data": [[4.0, 874.0], [5.0, 1301.0]], "isOverall": false, "label": "14.4.16- Formulario Cuentas Bancarias-124", "isController": false}, {"data": [[4.5, 1087.5]], "isOverall": false, "label": "14.4.16- Formulario Cuentas Bancarias-124-Aggregated", "isController": false}, {"data": [[4.0, 813.5]], "isOverall": false, "label": "15.5.4 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[4.0, 813.5]], "isOverall": false, "label": "15.5.4 - Formulario Campos Adicionales Cerrar-172-Aggregated", "isController": false}, {"data": [[4.0, 2036.5]], "isOverall": false, "label": "15.3.16 - Formulario Tipo de PYMES-153", "isController": false}, {"data": [[4.0, 2036.5]], "isOverall": false, "label": "15.3.16 - Formulario Tipo de PYMES-153-Aggregated", "isController": false}, {"data": [[6.0, 1831.0]], "isOverall": false, "label": "13.3 - Seleccionar Vinculo Relacion-88", "isController": false}, {"data": [[6.0, 1831.0]], "isOverall": false, "label": "13.3 - Seleccionar Vinculo Relacion-88-Aggregated", "isController": false}, {"data": [[6.0, 5540.5]], "isOverall": false, "label": "13.5 - Formulario Relacion Guardar", "isController": true}, {"data": [[6.0, 5540.5]], "isOverall": false, "label": "13.5 - Formulario Relacion Guardar-Aggregated", "isController": true}, {"data": [[6.0, 8576.5]], "isOverall": false, "label": "12 - Llenar el Formulario de Contactos", "isController": true}, {"data": [[6.0, 8576.5]], "isOverall": false, "label": "12 - Llenar el Formulario de Contactos-Aggregated", "isController": true}, {"data": [[6.0, 4059.5]], "isOverall": false, "label": "11 - Seleccionar opcion Contactos", "isController": true}, {"data": [[6.0, 4059.5]], "isOverall": false, "label": "11 - Seleccionar opcion Contactos-Aggregated", "isController": true}, {"data": [[6.0, 464.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-57", "isController": false}, {"data": [[6.0, 464.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-57-Aggregated", "isController": false}, {"data": [[8.0, 1963.5]], "isOverall": false, "label": "7.18 - Formulario Datos de la Persona Pais-31", "isController": false}, {"data": [[8.0, 1963.5]], "isOverall": false, "label": "7.18 - Formulario Datos de la Persona Pais-31-Aggregated", "isController": false}, {"data": [[4.0, 3289.5]], "isOverall": false, "label": "15.5.2 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[4.0, 3289.5]], "isOverall": false, "label": "15.5.2 - Formulario Campos Adicionales Cerrar-170-Aggregated", "isController": false}, {"data": [[8.0, 10145.5]], "isOverall": false, "label": "7.20 - Presionar Grabar Datos de la Persona ", "isController": true}, {"data": [[8.0, 10145.5]], "isOverall": false, "label": "7.20 - Presionar Grabar Datos de la Persona -Aggregated", "isController": true}, {"data": [[4.0, 96.0], [3.0, 108.0]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183-0", "isController": false}, {"data": [[3.5, 102.0]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183-0-Aggregated", "isController": false}, {"data": [[4.0, 98.0], [3.0, 108.0]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183-1", "isController": false}, {"data": [[3.5, 103.0]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183-1-Aggregated", "isController": false}, {"data": [[4.0, 1333.0]], "isOverall": false, "label": "15.3.19- Formulario Campo Ingresos Anuales-155", "isController": false}, {"data": [[4.0, 1333.0]], "isOverall": false, "label": "15.3.19- Formulario Campo Ingresos Anuales-155-Aggregated", "isController": false}, {"data": [[6.0, 2878.5]], "isOverall": false, "label": "14.4.9 - Formulario Cuentas Bancarias-117", "isController": false}, {"data": [[6.0, 2878.5]], "isOverall": false, "label": "14.4.9 - Formulario Cuentas Bancarias-117-Aggregated", "isController": false}, {"data": [[4.0, 1256.5]], "isOverall": false, "label": "15.4.3 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[4.0, 1256.5]], "isOverall": false, "label": "15.4.3 - Formulario Campos Adicionales Grabar-168-Aggregated", "isController": false}, {"data": [[10.0, 224.0]], "isOverall": false, "label": "4.1 - Seleccionar Modulo de Personas-8", "isController": false}, {"data": [[10.0, 224.0]], "isOverall": false, "label": "4.1 - Seleccionar Modulo de Personas-8-Aggregated", "isController": false}, {"data": [[4.0, 195.0], [3.0, 219.0]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185", "isController": false}, {"data": [[3.5, 207.0]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185-Aggregated", "isController": false}, {"data": [[4.0, 605.5]], "isOverall": false, "label": "14.4.21 - Formulario Cuentas Bancarias-129", "isController": false}, {"data": [[4.0, 605.5]], "isOverall": false, "label": "14.4.21 - Formulario Cuentas Bancarias-129-Aggregated", "isController": false}, {"data": [[4.0, 466.0], [3.0, 467.0]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182-0", "isController": false}, {"data": [[3.5, 466.5]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182-0-Aggregated", "isController": false}, {"data": [[4.0, 194.0], [3.0, 216.0]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183", "isController": false}, {"data": [[3.5, 205.0]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183-Aggregated", "isController": false}, {"data": [[4.0, 172.0], [3.0, 91.0]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182-2", "isController": false}, {"data": [[3.5, 131.5]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182-2-Aggregated", "isController": false}, {"data": [[4.0, 113.0], [3.0, 113.0]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182-1", "isController": false}, {"data": [[3.5, 113.0]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182-1-Aggregated", "isController": false}, {"data": [[10.0, 218.5]], "isOverall": false, "label": "1.2 Se Selecciona Index-2", "isController": false}, {"data": [[10.0, 218.5]], "isOverall": false, "label": "1.2 Se Selecciona Index-2-Aggregated", "isController": false}, {"data": [[4.0, 660.0]], "isOverall": false, "label": "14.4.25.1 - Tercera Cuenta Bancaria", "isController": false}, {"data": [[4.0, 660.0]], "isOverall": false, "label": "14.4.25.1 - Tercera Cuenta Bancaria-Aggregated", "isController": false}, {"data": [[6.0, 701.0]], "isOverall": false, "label": "13.2 - Hacer clic en Crear Relacion-87", "isController": false}, {"data": [[6.0, 701.0]], "isOverall": false, "label": "13.2 - Hacer clic en Crear Relacion-87-Aggregated", "isController": false}, {"data": [[8.0, 1265.5]], "isOverall": false, "label": "7.16 - Formulario Datos de la Persona Seleccionar Genero-29", "isController": false}, {"data": [[8.0, 1265.5]], "isOverall": false, "label": "7.16 - Formulario Datos de la Persona Seleccionar Genero-29-Aggregated", "isController": false}, {"data": [[6.0, 2975.5]], "isOverall": false, "label": "10.1 - Formulario Domicilio Tipo de direccion-40", "isController": false}, {"data": [[6.0, 2975.5]], "isOverall": false, "label": "10.1 - Formulario Domicilio Tipo de direccion-40-Aggregated", "isController": false}, {"data": [[4.0, 1796.5]], "isOverall": false, "label": "15.3.15 - Formulario Campo Perfil PYMES-152", "isController": false}, {"data": [[4.0, 1796.5]], "isOverall": false, "label": "15.3.15 - Formulario Campo Perfil PYMES-152-Aggregated", "isController": false}, {"data": [[5.0, 2220.0], [6.0, 1556.0]], "isOverall": false, "label": "14.4.13 - Formulario Cuentas Bancarias-121", "isController": false}, {"data": [[5.5, 1888.0]], "isOverall": false, "label": "14.4.13 - Formulario Cuentas Bancarias-121-Aggregated", "isController": false}, {"data": [[6.0, 4322.5]], "isOverall": false, "label": "13.5.1 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[6.0, 4322.5]], "isOverall": false, "label": "13.5.1 - Formulario Relacion Guardar-104-Aggregated", "isController": false}, {"data": [[6.0, 13843.5]], "isOverall": false, "label": "14.4.6 - Formulario Cuentas Bancarias-114", "isController": false}, {"data": [[6.0, 13843.5]], "isOverall": false, "label": "14.4.6 - Formulario Cuentas Bancarias-114-Aggregated", "isController": false}, {"data": [[4.0, 1185.0]], "isOverall": false, "label": "15.3.21 - Formulario Campos Adicionales por otras Actividad-157", "isController": false}, {"data": [[4.0, 1185.0]], "isOverall": false, "label": "15.3.21 - Formulario Campos Adicionales por otras Actividad-157-Aggregated", "isController": false}, {"data": [[10.0, 784.0]], "isOverall": false, "label": "3 - Seleccionar en el menu Operaciones del Sistema", "isController": true}, {"data": [[10.0, 784.0]], "isOverall": false, "label": "3 - Seleccionar en el menu Operaciones del Sistema-Aggregated", "isController": true}, {"data": [[10.0, 1030.5]], "isOverall": false, "label": "6.3 - Presionar boton Nuevo Cliente-13", "isController": false}, {"data": [[10.0, 1030.5]], "isOverall": false, "label": "6.3 - Presionar boton Nuevo Cliente-13-Aggregated", "isController": false}, {"data": [[4.0, 5248.5]], "isOverall": false, "label": "16 - Presionar el boton Grabar Persona", "isController": true}, {"data": [[4.0, 5248.5]], "isOverall": false, "label": "16 - Presionar el boton Grabar Persona-Aggregated", "isController": true}, {"data": [[8.0, 1767.5]], "isOverall": false, "label": "7.15 - Formulario Datos de la Persona Seleccionar Genero-28", "isController": false}, {"data": [[8.0, 1767.5]], "isOverall": false, "label": "7.15 - Formulario Datos de la Persona Seleccionar Genero-28-Aggregated", "isController": false}, {"data": [[4.0, 907.5]], "isOverall": false, "label": "15.5.3 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[4.0, 907.5]], "isOverall": false, "label": "15.5.3 - Formulario Campos Adicionales Cerrar-171-Aggregated", "isController": false}, {"data": [[6.0, 1647.0]], "isOverall": false, "label": "13.4.6 - Llenar Formulario Relacion -94", "isController": false}, {"data": [[6.0, 1647.0]], "isOverall": false, "label": "13.4.6 - Llenar Formulario Relacion -94-Aggregated", "isController": false}, {"data": [[4.0, 2211.0]], "isOverall": false, "label": "15.3.5 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[4.0, 2211.0]], "isOverall": false, "label": "15.3.5 - Formulario Campos Adicionales-142-Aggregated", "isController": false}, {"data": [[6.0, 1923.0]], "isOverall": false, "label": "14.4.10 - Formulario Cuentas Bancarias-118", "isController": false}, {"data": [[6.0, 1923.0]], "isOverall": false, "label": "14.4.10 - Formulario Cuentas Bancarias-118-Aggregated", "isController": false}, {"data": [[10.0, 1171.5]], "isOverall": false, "label": "1.1 Se selecciona Inicio-1", "isController": false}, {"data": [[10.0, 1171.5]], "isOverall": false, "label": "1.1 Se selecciona Inicio-1-Aggregated", "isController": false}, {"data": [[4.0, 61363.5]], "isOverall": false, "label": "14.4 - Llenar el Formulario de Cuentas Bancarias", "isController": true}, {"data": [[4.0, 61363.5]], "isOverall": false, "label": "14.4 - Llenar el Formulario de Cuentas Bancarias-Aggregated", "isController": true}, {"data": [[4.0, 69190.5]], "isOverall": false, "label": "14 - Seleccionar opcion Cuentas Bancarias ", "isController": true}, {"data": [[4.0, 69190.5]], "isOverall": false, "label": "14 - Seleccionar opcion Cuentas Bancarias -Aggregated", "isController": true}, {"data": [[4.0, 49057.5]], "isOverall": false, "label": "15.3 - Llenar Formulario Campos Adicionales", "isController": true}, {"data": [[4.0, 49057.5]], "isOverall": false, "label": "15.3 - Llenar Formulario Campos Adicionales-Aggregated", "isController": true}, {"data": [[6.0, 3267.0]], "isOverall": false, "label": "8.3.1 - Formulario Datos de Cliente Grabar-37", "isController": false}, {"data": [[6.0, 3267.0]], "isOverall": false, "label": "8.3.1 - Formulario Datos de Cliente Grabar-37-Aggregated", "isController": false}, {"data": [[6.0, 12059.5]], "isOverall": false, "label": "14.4.7 - Formulario Cuentas Bancarias-115", "isController": false}, {"data": [[6.0, 12059.5]], "isOverall": false, "label": "14.4.7 - Formulario Cuentas Bancarias-115-Aggregated", "isController": false}, {"data": [[6.0, 2355.0]], "isOverall": false, "label": " 13.4.8 - Llenar Formulario Relacion -96", "isController": false}, {"data": [[6.0, 2355.0]], "isOverall": false, "label": " 13.4.8 - Llenar Formulario Relacion -96-Aggregated", "isController": false}, {"data": [[4.0, 564.5]], "isOverall": false, "label": "14.4.24.1 - Segunda Cuenta Bancaria-132", "isController": false}, {"data": [[4.0, 564.5]], "isOverall": false, "label": "14.4.24.1 - Segunda Cuenta Bancaria-132-Aggregated", "isController": false}, {"data": [[6.0, 2432.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-52", "isController": false}, {"data": [[6.0, 2432.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-52-Aggregated", "isController": false}, {"data": [[6.0, 1796.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-55", "isController": false}, {"data": [[6.0, 1796.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-55-Aggregated", "isController": false}, {"data": [[6.0, 1097.5]], "isOverall": false, "label": "14.4.12 - Formulario Cuentas Bancarias-120", "isController": false}, {"data": [[6.0, 1097.5]], "isOverall": false, "label": "14.4.12 - Formulario Cuentas Bancarias-120-Aggregated", "isController": false}, {"data": [[4.0, 1019.5]], "isOverall": false, "label": "15.3.6 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[4.0, 1019.5]], "isOverall": false, "label": "15.3.6 - Formulario Campos Adicionales-143-Aggregated", "isController": false}, {"data": [[6.0, 1211.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-54", "isController": false}, {"data": [[6.0, 1211.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-54-Aggregated", "isController": false}, {"data": [[8.0, 1680.0]], "isOverall": false, "label": "7.17 - Formulario Datos de la Persona Fecha de Nacimiento-30", "isController": false}, {"data": [[8.0, 1680.0]], "isOverall": false, "label": "7.17 - Formulario Datos de la Persona Fecha de Nacimiento-30-Aggregated", "isController": false}, {"data": [[6.0, 1878.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-56", "isController": false}, {"data": [[6.0, 1878.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-56-Aggregated", "isController": false}, {"data": [[6.0, 914.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-59", "isController": false}, {"data": [[6.0, 914.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-59-Aggregated", "isController": false}, {"data": [[6.0, 1407.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-58", "isController": false}, {"data": [[6.0, 1407.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-58-Aggregated", "isController": false}, {"data": [[10.0, 111.0]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5-0", "isController": false}, {"data": [[10.0, 111.0]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5-0-Aggregated", "isController": false}, {"data": [[8.0, 1013.0]], "isOverall": false, "label": "7.20.2 - Presionar Grabar Datos de la Persona -34", "isController": false}, {"data": [[8.0, 1013.0]], "isOverall": false, "label": "7.20.2 - Presionar Grabar Datos de la Persona -34-Aggregated", "isController": false}, {"data": [[4.0, 736.0]], "isOverall": false, "label": "14.4.22 - Formulario Cuentas Bancarias-130", "isController": false}, {"data": [[4.0, 736.0]], "isOverall": false, "label": "14.4.22 - Formulario Cuentas Bancarias-130-Aggregated", "isController": false}, {"data": [[10.0, 6906.5]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5-1", "isController": false}, {"data": [[10.0, 6906.5]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5-1-Aggregated", "isController": false}, {"data": [[6.0, 2833.5]], "isOverall": false, "label": "12.1 - Formulario Contactos-82", "isController": false}, {"data": [[6.0, 2833.5]], "isOverall": false, "label": "12.1 - Formulario Contactos-82-Aggregated", "isController": false}, {"data": [[10.0, 3328.5]], "isOverall": false, "label": "7.6 - Formulario Datos de la Persona Identificacion-19", "isController": false}, {"data": [[10.0, 3328.5]], "isOverall": false, "label": "7.6 - Formulario Datos de la Persona Identificacion-19-Aggregated", "isController": false}, {"data": [[4.0, 1690.5]], "isOverall": false, "label": "15.3.7 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[4.0, 1690.5]], "isOverall": false, "label": "15.3.7 - Formulario Campos Adicionales-144-Aggregated", "isController": false}, {"data": [[6.0, 858.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-77", "isController": false}, {"data": [[6.0, 858.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-77-Aggregated", "isController": false}, {"data": [[6.0, 547.5]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-78", "isController": false}, {"data": [[6.0, 547.5]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-78-Aggregated", "isController": false}, {"data": [[6.0, 3199.5]], "isOverall": false, "label": "14.4.8 - Formulario Cuentas Bancarias-116", "isController": false}, {"data": [[6.0, 3199.5]], "isOverall": false, "label": "14.4.8 - Formulario Cuentas Bancarias-116-Aggregated", "isController": false}, {"data": [[4.0, 846.5]], "isOverall": false, "label": "14.4.23 - Cunenta Bancaria Principal", "isController": true}, {"data": [[4.0, 846.5]], "isOverall": false, "label": "14.4.23 - Cunenta Bancaria Principal-Aggregated", "isController": true}, {"data": [[4.0, 6161.0]], "isOverall": false, "label": "15.3.4 -  Formulario Campos Adicionales-141", "isController": false}, {"data": [[4.0, 6161.0]], "isOverall": false, "label": "15.3.4 -  Formulario Campos Adicionales-141-Aggregated", "isController": false}, {"data": [[4.0, 2079.5]], "isOverall": false, "label": "15.3.10 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[4.0, 2079.5]], "isOverall": false, "label": "15.3.10 - Formulario Campos Adicionales-147-Aggregated", "isController": false}, {"data": [[6.0, 1484.5]], "isOverall": false, "label": "13.1 - Seleccionar opcion Relacion-86", "isController": false}, {"data": [[6.0, 1484.5]], "isOverall": false, "label": "13.1 - Seleccionar opcion Relacion-86-Aggregated", "isController": false}, {"data": [[6.0, 2354.0]], "isOverall": false, "label": " 13.4.11 - Llenar Formulario Relacion -100", "isController": false}, {"data": [[6.0, 2354.0]], "isOverall": false, "label": " 13.4.11 - Llenar Formulario Relacion -100-Aggregated", "isController": false}, {"data": [[6.0, 2307.0]], "isOverall": false, "label": "12.2 - Formulario Contactos Correo-83", "isController": false}, {"data": [[6.0, 2307.0]], "isOverall": false, "label": "12.2 - Formulario Contactos Correo-83-Aggregated", "isController": false}, {"data": [[8.0, 1370.5]], "isOverall": false, "label": "8.1 - Llenar Formulario Datos de Cliente-35", "isController": false}, {"data": [[8.0, 1370.5]], "isOverall": false, "label": "8.1 - Llenar Formulario Datos de Cliente-35-Aggregated", "isController": false}, {"data": [[6.0, 1218.0]], "isOverall": false, "label": "13.5.2 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[6.0, 1218.0]], "isOverall": false, "label": "13.5.2 - Formulario Relacion Guardar-105-Aggregated", "isController": false}, {"data": [[8.0, 2142.0]], "isOverall": false, "label": "7.14 - Formulario Datos de la Persona Seleccionar Ocupacion-27", "isController": false}, {"data": [[8.0, 2142.0]], "isOverall": false, "label": "7.14 - Formulario Datos de la Persona Seleccionar Ocupacion-27-Aggregated", "isController": false}, {"data": [[4.0, 1414.5]], "isOverall": false, "label": "15.3.29 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[4.0, 1414.5]], "isOverall": false, "label": "15.3.29 - Formulario Campos Adicionales-165-Aggregated", "isController": false}, {"data": [[4.0, 1784.0]], "isOverall": false, "label": "15.3.18 - Formulario Campo Exoneracion de impuesto-154", "isController": false}, {"data": [[4.0, 1784.0]], "isOverall": false, "label": "15.3.18 - Formulario Campo Exoneracion de impuesto-154-Aggregated", "isController": false}, {"data": [[4.0, 1308.0]], "isOverall": false, "label": "15.3.8 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[4.0, 1308.0]], "isOverall": false, "label": "15.3.8 - Formulario Campos Adicionales-145-Aggregated", "isController": false}, {"data": [[6.0, 2794.0]], "isOverall": false, "label": "14.4.5 - Formulario Cuentas Bancarias-113", "isController": false}, {"data": [[6.0, 2794.0]], "isOverall": false, "label": "14.4.5 - Formulario Cuentas Bancarias-113-Aggregated", "isController": false}, {"data": [[5.0, 1081.0], [6.0, 764.0]], "isOverall": false, "label": "14.4.14 - Formulario Cuentas Bancarias-122", "isController": false}, {"data": [[5.5, 922.5]], "isOverall": false, "label": "14.4.14 - Formulario Cuentas Bancarias-122-Aggregated", "isController": false}, {"data": [[6.0, 1058.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-75", "isController": false}, {"data": [[6.0, 1058.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-75-Aggregated", "isController": false}, {"data": [[10.0, 7659.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[10.0, 7659.0]], "isOverall": false, "label": "2 - Login-Aggregated", "isController": true}, {"data": [[6.0, 790.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-67", "isController": false}, {"data": [[6.0, 790.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-67-Aggregated", "isController": false}, {"data": [[6.0, 872.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-74", "isController": false}, {"data": [[6.0, 872.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-74-Aggregated", "isController": false}, {"data": [[6.0, 984.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-76", "isController": false}, {"data": [[6.0, 984.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-76-Aggregated", "isController": false}, {"data": [[6.0, 773.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-61", "isController": false}, {"data": [[6.0, 773.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-61-Aggregated", "isController": false}, {"data": [[6.0, 1635.5]], "isOverall": false, "label": "14.4.11 - Formulario Cuentas Bancarias-119", "isController": false}, {"data": [[6.0, 1635.5]], "isOverall": false, "label": "14.4.11 - Formulario Cuentas Bancarias-119-Aggregated", "isController": false}, {"data": [[6.0, 1567.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-70", "isController": false}, {"data": [[6.0, 1567.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-70-Aggregated", "isController": false}, {"data": [[6.0, 1208.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-73", "isController": false}, {"data": [[6.0, 1208.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-73-Aggregated", "isController": false}, {"data": [[6.0, 1931.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-72", "isController": false}, {"data": [[6.0, 1931.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-72-Aggregated", "isController": false}, {"data": [[6.0, 523.0]], "isOverall": false, "label": "10.4 - Formulario Domicilio Venta Provincia Pais de residencia-43", "isController": false}, {"data": [[6.0, 523.0]], "isOverall": false, "label": "10.4 - Formulario Domicilio Venta Provincia Pais de residencia-43-Aggregated", "isController": false}, {"data": [[4.0, 837.5]], "isOverall": false, "label": "15.4.2 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[4.0, 837.5]], "isOverall": false, "label": "15.4.2 - Formulario Campos Adicionales Grabar-167-Aggregated", "isController": false}, {"data": [[4.0, 4488.0]], "isOverall": false, "label": "16.1 - Presionar el boton Grabar Persona-173", "isController": false}, {"data": [[4.0, 4488.0]], "isOverall": false, "label": "16.1 - Presionar el boton Grabar Persona-173-Aggregated", "isController": false}, {"data": [[9.0, 2933.0], [10.0, 3031.0]], "isOverall": false, "label": "7.10 - Formulario Datos de la Persona Segundo Apellido-23", "isController": false}, {"data": [[9.5, 2982.0]], "isOverall": false, "label": "7.10 - Formulario Datos de la Persona Segundo Apellido-23-Aggregated", "isController": false}, {"data": [[8.0, 1833.5]], "isOverall": false, "label": "7.19 - Formulario Datos de la Persona Nacionalidad-32", "isController": false}, {"data": [[8.0, 1833.5]], "isOverall": false, "label": "7.19 - Formulario Datos de la Persona Nacionalidad-32-Aggregated", "isController": false}, {"data": [[6.0, 1130.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-64", "isController": false}, {"data": [[6.0, 1130.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-64-Aggregated", "isController": false}, {"data": [[8.0, 52092.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[8.0, 52092.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-Aggregated", "isController": true}, {"data": [[6.0, 1436.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-63", "isController": false}, {"data": [[6.0, 1436.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-63-Aggregated", "isController": false}, {"data": [[4.0, 1871.5]], "isOverall": false, "label": "15.3.14 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[4.0, 1871.5]], "isOverall": false, "label": "15.3.14 - Formulario Campos Adicionales-151-Aggregated", "isController": false}, {"data": [[6.0, 1018.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-66", "isController": false}, {"data": [[6.0, 1018.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-66-Aggregated", "isController": false}, {"data": [[6.0, 1599.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-65", "isController": false}, {"data": [[6.0, 1599.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-65-Aggregated", "isController": false}, {"data": [[6.0, 941.0]], "isOverall": false, "label": "13.4.4 - Llenar Formulario Relacion -92", "isController": false}, {"data": [[6.0, 941.0]], "isOverall": false, "label": "13.4.4 - Llenar Formulario Relacion -92-Aggregated", "isController": false}, {"data": [[6.0, 1286.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-68", "isController": false}, {"data": [[6.0, 1286.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-68-Aggregated", "isController": false}, {"data": [[4.0, 846.5]], "isOverall": false, "label": "14.4.23.1 - Cunenta Bancaria Principal-131", "isController": false}, {"data": [[4.0, 846.5]], "isOverall": false, "label": "14.4.23.1 - Cunenta Bancaria Principal-131-Aggregated", "isController": false}, {"data": [[4.0, 6220.5]], "isOverall": false, "label": "15.5 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[4.0, 6220.5]], "isOverall": false, "label": "15.5 - Formulario Campos Adicionales Cerrar-Aggregated", "isController": true}, {"data": [[6.0, 832.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-69", "isController": false}, {"data": [[6.0, 832.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-69-Aggregated", "isController": false}, {"data": [[4.0, 260.0]], "isOverall": false, "label": "17.4 - Presionar el boton Cerrar  Persona--178", "isController": false}, {"data": [[4.0, 260.0]], "isOverall": false, "label": "17.4 - Presionar el boton Cerrar  Persona--178-Aggregated", "isController": false}, {"data": [[6.0, 994.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-60", "isController": false}, {"data": [[6.0, 994.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-60-Aggregated", "isController": false}, {"data": [[4.0, 121.5]], "isOverall": false, "label": "17.3 - Presionar el boton Cerrar  Persona-", "isController": false}, {"data": [[4.0, 121.5]], "isOverall": false, "label": "17.3 - Presionar el boton Cerrar  Persona--Aggregated", "isController": false}, {"data": [[6.0, 2115.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-62", "isController": false}, {"data": [[6.0, 2115.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-62-Aggregated", "isController": false}, {"data": [[4.0, 1015.0]], "isOverall": false, "label": "15.3.2 -  Formulario Campos Adicionales-139", "isController": false}, {"data": [[4.0, 1015.0]], "isOverall": false, "label": "15.3.2 -  Formulario Campos Adicionales-139-Aggregated", "isController": false}, {"data": [[6.0, 1579.0]], "isOverall": false, "label": "10.7 - Formulario Domicilio Provincia Pais de residencia-46", "isController": false}, {"data": [[6.0, 1579.0]], "isOverall": false, "label": "10.7 - Formulario Domicilio Provincia Pais de residencia-46-Aggregated", "isController": false}, {"data": [[10.0, 2853.0]], "isOverall": false, "label": "7.1 - Se abre Formulario Persona-15", "isController": false}, {"data": [[10.0, 2853.0]], "isOverall": false, "label": "7.1 - Se abre Formulario Persona-15-Aggregated", "isController": false}, {"data": [[8.0, 1015.0]], "isOverall": false, "label": "7.13 - Formulario Datos de la Persona Buscar Ocupacion-26", "isController": false}, {"data": [[8.0, 1015.0]], "isOverall": false, "label": "7.13 - Formulario Datos de la Persona Buscar Ocupacion-26-Aggregated", "isController": false}, {"data": [[7.0, 2125.0]], "isOverall": false, "label": "8.2 - Seleccionar Datos de Cliente-36", "isController": false}, {"data": [[7.0, 2125.0]], "isOverall": false, "label": "8.2 - Seleccionar Datos de Cliente-36-Aggregated", "isController": false}, {"data": [[8.0, 9132.5]], "isOverall": false, "label": "7.20.1 - Presionar Grabar Datos de la Persona -33", "isController": false}, {"data": [[8.0, 9132.5]], "isOverall": false, "label": "7.20.1 - Presionar Grabar Datos de la Persona -33-Aggregated", "isController": false}, {"data": [[10.0, 2612.5]], "isOverall": false, "label": "7.9 - Formulario Datos de la Persona Primer Apellido-22", "isController": false}, {"data": [[10.0, 2612.5]], "isOverall": false, "label": "7.9 - Formulario Datos de la Persona Primer Apellido-22-Aggregated", "isController": false}, {"data": [[4.0, 4030.5]], "isOverall": false, "label": "15.4 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[4.0, 4030.5]], "isOverall": false, "label": "15.4 - Formulario Campos Adicionales Grabar-Aggregated", "isController": true}, {"data": [[4.0, 2210.0]], "isOverall": false, "label": "15.3.9 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[4.0, 2210.0]], "isOverall": false, "label": "15.3.9 - Formulario Campos Adicionales-146-Aggregated", "isController": false}, {"data": [[6.0, 2695.5]], "isOverall": false, "label": "14.4.4 - Formulario Cuentas Bancarias-112", "isController": false}, {"data": [[6.0, 2695.5]], "isOverall": false, "label": "14.4.4 - Formulario Cuentas Bancarias-112-Aggregated", "isController": false}, {"data": [[6.0, 2140.5]], "isOverall": false, "label": "14.1 - Hacer clic en Crear Cuentas Bancarias-106", "isController": false}, {"data": [[6.0, 2140.5]], "isOverall": false, "label": "14.1 - Hacer clic en Crear Cuentas Bancarias-106-Aggregated", "isController": false}, {"data": [[4.0, 1200.0], [5.0, 1735.0]], "isOverall": false, "label": "14.4.15 - Formulario Cuentas Bancarias-123", "isController": false}, {"data": [[4.5, 1467.5]], "isOverall": false, "label": "14.4.15 - Formulario Cuentas Bancarias-123-Aggregated", "isController": false}, {"data": [[4.0, 1585.0]], "isOverall": false, "label": "15.3.12 - Formulario campo Nombre de la Empresa y Nacionalidad-149", "isController": false}, {"data": [[4.0, 1585.0]], "isOverall": false, "label": "15.3.12 - Formulario campo Nombre de la Empresa y Nacionalidad-149-Aggregated", "isController": false}, {"data": [[6.0, 843.0]], "isOverall": false, "label": "8.3.2 - Formulario Datos de Cliente Grabar-38", "isController": false}, {"data": [[6.0, 843.0]], "isOverall": false, "label": "8.3.2 - Formulario Datos de Cliente Grabar-38-Aggregated", "isController": false}, {"data": [[4.0, 1248.5]], "isOverall": false, "label": "15.3.24 - Formulario Campo Porcentaje de participacion-160", "isController": false}, {"data": [[4.0, 1248.5]], "isOverall": false, "label": "15.3.24 - Formulario Campo Porcentaje de participacion-160-Aggregated", "isController": false}, {"data": [[4.0, 555.0]], "isOverall": false, "label": "14.4.20 - Formulario Cuentas Bancarias-128", "isController": false}, {"data": [[4.0, 555.0]], "isOverall": false, "label": "14.4.20 - Formulario Cuentas Bancarias-128-Aggregated", "isController": false}, {"data": [[4.0, 1483.5]], "isOverall": false, "label": "14.5 - Guardar Cuentas Bancarias", "isController": true}, {"data": [[4.0, 1483.5]], "isOverall": false, "label": "14.5 - Guardar Cuentas Bancarias-Aggregated", "isController": true}, {"data": [[4.0, 1936.5]], "isOverall": false, "label": "15.4.1 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[4.0, 1936.5]], "isOverall": false, "label": "15.4.1 - Formulario Campos Adicionales Grabar-166-Aggregated", "isController": false}, {"data": [[6.0, 1494.5]], "isOverall": false, "label": "9.1 - Hacer clic en Crear Domicilio-39", "isController": false}, {"data": [[6.0, 1494.5]], "isOverall": false, "label": "9.1 - Hacer clic en Crear Domicilio-39-Aggregated", "isController": false}, {"data": [[4.0, 2603.0]], "isOverall": false, "label": "15.3.1 - Formulario Campos Adicionales-138", "isController": false}, {"data": [[4.0, 2603.0]], "isOverall": false, "label": "15.3.1 - Formulario Campos Adicionales-138-Aggregated", "isController": false}, {"data": [[4.0, 760.5]], "isOverall": false, "label": "16.2 - Presionar el boton Grabar Persona-174", "isController": false}, {"data": [[4.0, 760.5]], "isOverall": false, "label": "16.2 - Presionar el boton Grabar Persona-174-Aggregated", "isController": false}, {"data": [[4.0, 1583.0]], "isOverall": false, "label": "15.3.28 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[4.0, 1583.0]], "isOverall": false, "label": "15.3.28 - Formulario Campos Adicionales-164-Aggregated", "isController": false}, {"data": [[4.0, 564.5]], "isOverall": false, "label": "14.4.24 - Segunda Cuenta Bancaria", "isController": true}, {"data": [[4.0, 564.5]], "isOverall": false, "label": "14.4.24 - Segunda Cuenta Bancaria-Aggregated", "isController": true}, {"data": [[10.0, 317.0]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3-1", "isController": false}, {"data": [[10.0, 317.0]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3-1-Aggregated", "isController": false}, {"data": [[6.0, 1494.5]], "isOverall": false, "label": "9 - Seleccionar Domicilio", "isController": true}, {"data": [[6.0, 1494.5]], "isOverall": false, "label": "9 - Seleccionar Domicilio-Aggregated", "isController": true}, {"data": [[6.0, 41589.0]], "isOverall": false, "label": "13 - Seleccionar opcion Relacion", "isController": true}, {"data": [[6.0, 41589.0]], "isOverall": false, "label": "13 - Seleccionar opcion Relacion-Aggregated", "isController": true}, {"data": [[4.0, 524.5]], "isOverall": false, "label": "14.4.18 - Formulario Cuentas Bancarias-126", "isController": false}, {"data": [[4.0, 524.5]], "isOverall": false, "label": "14.4.18 - Formulario Cuentas Bancarias-126-Aggregated", "isController": false}, {"data": [[10.0, 324.0]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3-0", "isController": false}, {"data": [[10.0, 324.0]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3-0-Aggregated", "isController": false}, {"data": [[4.0, 600.0]], "isOverall": false, "label": "15.2 - Hacer clic en la opcion Campos Adicionales-137", "isController": false}, {"data": [[4.0, 600.0]], "isOverall": false, "label": "15.2 - Hacer clic en la opcion Campos Adicionales-137-Aggregated", "isController": false}, {"data": [[6.0, 3308.0]], "isOverall": false, "label": "14.4.1 - Formulario Cuentas Bancarias-109", "isController": false}, {"data": [[6.0, 3308.0]], "isOverall": false, "label": "14.4.1 - Formulario Cuentas Bancarias-109-Aggregated", "isController": false}, {"data": [[4.0, 1325.0]], "isOverall": false, "label": "15.3.26 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[4.0, 1325.0]], "isOverall": false, "label": "15.3.26 - Formulario Campos Adicionales-162-Aggregated", "isController": false}, {"data": [[10.0, 684.0]], "isOverall": false, "label": "5.2 -Hacer clic en la opcion Cliente-10", "isController": false}, {"data": [[10.0, 684.0]], "isOverall": false, "label": "5.2 -Hacer clic en la opcion Cliente-10-Aggregated", "isController": false}, {"data": [[4.0, 3180.0]], "isOverall": false, "label": "15.1 - Seleccionar la opcion Campos Adicionales-136", "isController": false}, {"data": [[4.0, 3180.0]], "isOverall": false, "label": "15.1 - Seleccionar la opcion Campos Adicionales-136-Aggregated", "isController": false}, {"data": [[6.0, 7605.5]], "isOverall": false, "label": "8 - Llenar Formulario Datos de Cliente", "isController": true}, {"data": [[6.0, 7605.5]], "isOverall": false, "label": "8 - Llenar Formulario Datos de Cliente-Aggregated", "isController": true}, {"data": [[6.0, 617.5]], "isOverall": false, "label": "11.2 - Hacer clic en Crear Contactos-80", "isController": false}, {"data": [[6.0, 617.5]], "isOverall": false, "label": "11.2 - Hacer clic en Crear Contactos-80-Aggregated", "isController": false}, {"data": [[10.0, 102.5]], "isOverall": false, "label": "1.2 Se Selecciona Index-2-0", "isController": false}, {"data": [[10.0, 102.5]], "isOverall": false, "label": "1.2 Se Selecciona Index-2-0-Aggregated", "isController": false}, {"data": [[10.0, 115.5]], "isOverall": false, "label": "1.2 Se Selecciona Index-2-1", "isController": false}, {"data": [[10.0, 115.5]], "isOverall": false, "label": "1.2 Se Selecciona Index-2-1-Aggregated", "isController": false}, {"data": [[6.0, 4110.0]], "isOverall": false, "label": "8.3 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[6.0, 4110.0]], "isOverall": false, "label": "8.3 - Formulario Datos de Cliente Grabar-Aggregated", "isController": true}, {"data": [[6.0, 1405.5]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio", "isController": true}, {"data": [[6.0, 1405.5]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-Aggregated", "isController": true}, {"data": [[6.0, 1712.0]], "isOverall": false, "label": "10.2 - Formulario Domicilio Provincia Pais de residencia-41", "isController": false}, {"data": [[6.0, 1712.0]], "isOverall": false, "label": "10.2 - Formulario Domicilio Provincia Pais de residencia-41-Aggregated", "isController": false}, {"data": [[6.0, 2553.0]], "isOverall": false, "label": "12.3.1 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[6.0, 2553.0]], "isOverall": false, "label": "12.3.1 - Formulario Contactos Guardar-84-Aggregated", "isController": false}, {"data": [[6.0, 1929.0]], "isOverall": false, "label": "13.4.2 - Llenar Formulario Relacion -90", "isController": false}, {"data": [[6.0, 1929.0]], "isOverall": false, "label": "13.4.2 - Llenar Formulario Relacion -90-Aggregated", "isController": false}, {"data": [[4.0, 2314.5]], "isOverall": false, "label": "15.3.11 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[4.0, 2314.5]], "isOverall": false, "label": "15.3.11 - Formulario Campos Adicionales-148-Aggregated", "isController": false}, {"data": [[4.0, 63088.5]], "isOverall": false, "label": "15 - Seleccionar la opcion Campos Adicionales", "isController": true}, {"data": [[4.0, 63088.5]], "isOverall": false, "label": "15 - Seleccionar la opcion Campos Adicionales-Aggregated", "isController": true}, {"data": [[6.0, 856.5]], "isOverall": false, "label": "10.8 - Formulario Domicilio Corregimiento Distrito-47", "isController": false}, {"data": [[6.0, 856.5]], "isOverall": false, "label": "10.8 - Formulario Domicilio Corregimiento Distrito-47-Aggregated", "isController": false}, {"data": [[6.0, 1095.0]], "isOverall": false, "label": "10.3 - Formulario Domicilio Provincia Pais de residencia-42", "isController": false}, {"data": [[6.0, 1095.0]], "isOverall": false, "label": "10.3 - Formulario Domicilio Provincia Pais de residencia-42-Aggregated", "isController": false}, {"data": [[10.0, 7930.0]], "isOverall": false, "label": "6 - Presionar boton Nuevo Cliente", "isController": true}, {"data": [[10.0, 7930.0]], "isOverall": false, "label": "6 - Presionar boton Nuevo Cliente-Aggregated", "isController": true}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 2525.9666666666667, "minX": 1.59594972E12, "maxY": 19619.633333333335, "series": [{"data": [[1.59594996E12, 10897.633333333333], [1.59594978E12, 18884.0], [1.5959499E12, 5280.366666666667], [1.59594972E12, 19619.633333333335], [1.59595002E12, 15378.3], [1.59594984E12, 17067.266666666666]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.59594996E12, 9157.366666666667], [1.59594978E12, 7529.316666666667], [1.5959499E12, 3295.45], [1.59594972E12, 2525.9666666666667], [1.59595002E12, 8396.033333333333], [1.59594984E12, 10308.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59595002E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 100.5, "minX": 1.59594972E12, "maxY": 320066.5, "series": [{"data": [[1.59594972E12, 1390.0]], "isOverall": false, "label": "1 - Seleccionar Index", "isController": true}, {"data": [[1.5959499E12, 4076.0], [1.59594984E12, 1511.0]], "isOverall": false, "label": " 13.4.10 - Llenar Formulario Relacion -99", "isController": false}, {"data": [[1.59594984E12, 1805.0]], "isOverall": false, "label": " 13.4.7 - Llenar Formulario Relacion -95", "isController": false}, {"data": [[1.59594984E12, 1549.0]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -97", "isController": false}, {"data": [[1.59594984E12, 1010.5]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -98", "isController": false}, {"data": [[1.5959499E12, 3712.5]], "isOverall": false, "label": " 13.4.12 - Llenar Formulario Relacion -101", "isController": false}, {"data": [[1.59594972E12, 2887.5]], "isOverall": false, "label": "7.4 - Formulario Datos de la Persona Identificacion-17", "isController": false}, {"data": [[1.59595002E12, 711.5]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182", "isController": false}, {"data": [[1.59594972E12, 2677.5]], "isOverall": false, "label": "6.2 - Presionar boton Nuevo Cliente-12", "isController": false}, {"data": [[1.59594978E12, 1413.5]], "isOverall": false, "label": "7.12 - Formulario Datos de la Persona Buscar Ocupacion-25", "isController": false}, {"data": [[1.59594996E12, 248.0]], "isOverall": false, "label": "15.3.3 -  Formulario Campos Adicionales-140", "isController": false}, {"data": [[1.59594996E12, 645.0]], "isOverall": false, "label": "14.4.19 - Formulario Cuentas Bancarias-127", "isController": false}, {"data": [[1.59594972E12, 224.0]], "isOverall": false, "label": "4 - Seleccionar en el menu Modulo de Personas", "isController": true}, {"data": [[1.59594972E12, 2301.0]], "isOverall": false, "label": "5 - Seleccionar en el menu Clientes", "isController": true}, {"data": [[1.59594978E12, 844.0]], "isOverall": false, "label": "10.5 - Formulario Domicilio Provincia Pais de residencia-44", "isController": false}, {"data": [[1.59595002E12, 1566.0]], "isOverall": false, "label": "15.3.22 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[1.59594984E12, 2116.5]], "isOverall": false, "label": "13.4.3 - Llenar Formulario Relacion -91", "isController": false}, {"data": [[1.59594984E12, 1747.0]], "isOverall": false, "label": "13.4.5 - Llenar Formulario Relacion -93", "isController": false}, {"data": [[1.59594978E12, 894.0]], "isOverall": false, "label": "10.6 - Formulario Domicilio Provincia Pais de residencia-45", "isController": false}, {"data": [[1.59594984E12, 3436.0]], "isOverall": false, "label": "12.3 - Formulario Contactos Guardar", "isController": true}, {"data": [[1.59594996E12, 1188.5]], "isOverall": false, "label": "14.5.1 - Guardar Cuentas Bancarias-134", "isController": false}, {"data": [[1.59595002E12, 1104.5]], "isOverall": false, "label": "15.3.20 - Formulario Campos Adicionales Actividad Principal-156", "isController": false}, {"data": [[1.59595002E12, 1800.0]], "isOverall": false, "label": "15.3.23 - Formulario Campo Accionista-159", "isController": false}, {"data": [[1.59595002E12, 952.5]], "isOverall": false, "label": "15.3.25 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[1.59594972E12, 2241.5]], "isOverall": false, "label": "6.1 - Presionar boton Nuevo Cliente-11", "isController": false}, {"data": [[1.5959499E12, 32032.0]], "isOverall": false, "label": "13.4 - Formulario Relacion Buscar ", "isController": true}, {"data": [[1.59594984E12, 2028.0]], "isOverall": false, "label": "13.4.1 - Buscar Identificacion -89", "isController": false}, {"data": [[1.5959499E12, 3025.5]], "isOverall": false, "label": " 13.4.13 - Llenar Formulario Relacion Identificacion -102", "isController": false}, {"data": [[1.59594984E12, 715.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito Ventana-71", "isController": false}, {"data": [[1.59595002E12, 100.5]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185-0", "isController": false}, {"data": [[1.5959499E12, 3018.5]], "isOverall": false, "label": " 13.4.14 - Llenar Formulario Relacion -103", "isController": false}, {"data": [[1.59595002E12, 106.5]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185-1", "isController": false}, {"data": [[1.59594972E12, 1980.5]], "isOverall": false, "label": "6.4 - Presionar boton Nuevo Cliente-14", "isController": false}, {"data": [[1.59594996E12, 660.0]], "isOverall": false, "label": "14.4.25 - Tercera Cuenta Bancaria", "isController": true}, {"data": [[1.59595002E12, 1210.0]], "isOverall": false, "label": "15.5.1 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[1.59594996E12, 295.0]], "isOverall": false, "label": "14.5.2 - Guardar Cuentas Bancarias-135", "isController": false}, {"data": [[1.59594972E12, 3300.5]], "isOverall": false, "label": "7.7 - Formulario Persona Digito Verificador y Fecha de Vencimiento-20", "isController": false}, {"data": [[1.59594984E12, 2443.5]], "isOverall": false, "label": "11.3 - Hacer clic en Crear Contactos-81", "isController": false}, {"data": [[1.5959499E12, 3202.5]], "isOverall": false, "label": "14.3 - Hacer clic en Crear Cuentas Bancarias-108", "isController": false}, {"data": [[1.59594972E12, 2601.0]], "isOverall": false, "label": "7.2 - Se abre Formulario Persona-16", "isController": false}, {"data": [[1.5959499E12, 3374.0]], "isOverall": false, "label": "14.4.2 - Formulario Cuentas Bancarias-110", "isController": false}, {"data": [[1.59594984E12, 883.0]], "isOverall": false, "label": "12.3.2 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[1.59594996E12, 851.0]], "isOverall": false, "label": "14.4.17 - Formulario Cuentas Bancarias-125", "isController": false}, {"data": [[1.59595002E12, 1123.5]], "isOverall": false, "label": "18 - Presionar el boton Cerrar  Insis", "isController": true}, {"data": [[1.59594972E12, 641.0]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3", "isController": false}, {"data": [[1.59595002E12, 470.0]], "isOverall": false, "label": "17.2 - Presionar el boton Cerrar  Persona--176", "isController": false}, {"data": [[1.59594978E12, 2148.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito -53", "isController": false}, {"data": [[1.59595002E12, 1258.5]], "isOverall": false, "label": "17 - Presionar el boton Cerrar  Persona", "isController": true}, {"data": [[1.59594978E12, 2547.0], [1.59594972E12, 3521.0]], "isOverall": false, "label": "7.8 - Formulario Datos de la Persona Nombre-21", "isController": false}, {"data": [[1.59594984E12, 998.5]], "isOverall": false, "label": "11.1 - Hacer clic en Crear Contactos-79", "isController": false}, {"data": [[1.59595002E12, 1375.5]], "isOverall": false, "label": "15.3.27 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[1.5959499E12, 1201.5]], "isOverall": false, "label": "14.4.3 - Formulario Cuentas Bancarias-111", "isController": false}, {"data": [[1.5959499E12, 1000.5]], "isOverall": false, "label": "14.2 - Hacer clic en Crear Cuentas Bancarias-107", "isController": false}, {"data": [[1.59595002E12, 407.0]], "isOverall": false, "label": "17.1 - Presionar el boton Cerrar  Persona-175", "isController": false}, {"data": [[1.59594984E12, 44451.5]], "isOverall": false, "label": "10 - Llenar el Formulario Domicilio", "isController": true}, {"data": [[1.59594972E12, 1617.0]], "isOverall": false, "label": "5.1 - Seleccionar en el menu Cliente-9", "isController": false}, {"data": [[1.59594972E12, 3004.5]], "isOverall": false, "label": "7.5 - Formulario Datos de la Persona Identificacion-18", "isController": false}, {"data": [[1.59595002E12, 2236.5]], "isOverall": false, "label": "15.3.13 - Formulario Campo Cargo que Ocupa-150", "isController": false}, {"data": [[1.59594972E12, 7018.0]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5", "isController": false}, {"data": [[1.59594972E12, 784.0]], "isOverall": false, "label": "3.1 - Seleccionar en el menu Operaciones del Sistema-7", "isController": false}, {"data": [[1.59594978E12, 2263.0]], "isOverall": false, "label": "7.11 - Formulario Datos de la Persona Buscar Ocupacion-24", "isController": false}, {"data": [[1.59595002E12, 320066.5]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59594996E12, 1087.5]], "isOverall": false, "label": "14.4.16- Formulario Cuentas Bancarias-124", "isController": false}, {"data": [[1.59595002E12, 813.5]], "isOverall": false, "label": "15.5.4 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[1.59595002E12, 2036.5]], "isOverall": false, "label": "15.3.16 - Formulario Tipo de PYMES-153", "isController": false}, {"data": [[1.59594984E12, 1831.0]], "isOverall": false, "label": "13.3 - Seleccionar Vinculo Relacion-88", "isController": false}, {"data": [[1.5959499E12, 5540.5]], "isOverall": false, "label": "13.5 - Formulario Relacion Guardar", "isController": true}, {"data": [[1.59594984E12, 8576.5]], "isOverall": false, "label": "12 - Llenar el Formulario de Contactos", "isController": true}, {"data": [[1.59594984E12, 4059.5]], "isOverall": false, "label": "11 - Seleccionar opcion Contactos", "isController": true}, {"data": [[1.59594978E12, 308.0], [1.59594984E12, 621.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-57", "isController": false}, {"data": [[1.59594978E12, 1963.5]], "isOverall": false, "label": "7.18 - Formulario Datos de la Persona Pais-31", "isController": false}, {"data": [[1.59595002E12, 3289.5]], "isOverall": false, "label": "15.5.2 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[1.59594978E12, 10145.5]], "isOverall": false, "label": "7.20 - Presionar Grabar Datos de la Persona ", "isController": true}, {"data": [[1.59595002E12, 102.0]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183-0", "isController": false}, {"data": [[1.59595002E12, 103.0]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183-1", "isController": false}, {"data": [[1.59595002E12, 1333.0]], "isOverall": false, "label": "15.3.19- Formulario Campo Ingresos Anuales-155", "isController": false}, {"data": [[1.59594996E12, 2878.5]], "isOverall": false, "label": "14.4.9 - Formulario Cuentas Bancarias-117", "isController": false}, {"data": [[1.59595002E12, 1256.5]], "isOverall": false, "label": "15.4.3 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[1.59594972E12, 224.0]], "isOverall": false, "label": "4.1 - Seleccionar Modulo de Personas-8", "isController": false}, {"data": [[1.59595002E12, 207.0]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185", "isController": false}, {"data": [[1.59594996E12, 605.5]], "isOverall": false, "label": "14.4.21 - Formulario Cuentas Bancarias-129", "isController": false}, {"data": [[1.59595002E12, 466.5]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182-0", "isController": false}, {"data": [[1.59595002E12, 205.0]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183", "isController": false}, {"data": [[1.59595002E12, 131.5]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182-2", "isController": false}, {"data": [[1.59595002E12, 113.0]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182-1", "isController": false}, {"data": [[1.59594972E12, 218.5]], "isOverall": false, "label": "1.2 Se Selecciona Index-2", "isController": false}, {"data": [[1.59594996E12, 660.0]], "isOverall": false, "label": "14.4.25.1 - Tercera Cuenta Bancaria", "isController": false}, {"data": [[1.59594984E12, 701.0]], "isOverall": false, "label": "13.2 - Hacer clic en Crear Relacion-87", "isController": false}, {"data": [[1.59594978E12, 1265.5]], "isOverall": false, "label": "7.16 - Formulario Datos de la Persona Seleccionar Genero-29", "isController": false}, {"data": [[1.59594978E12, 2975.5]], "isOverall": false, "label": "10.1 - Formulario Domicilio Tipo de direccion-40", "isController": false}, {"data": [[1.59595002E12, 1796.5]], "isOverall": false, "label": "15.3.15 - Formulario Campo Perfil PYMES-152", "isController": false}, {"data": [[1.59594996E12, 1888.0]], "isOverall": false, "label": "14.4.13 - Formulario Cuentas Bancarias-121", "isController": false}, {"data": [[1.5959499E12, 4322.5]], "isOverall": false, "label": "13.5.1 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[1.59594996E12, 24883.0], [1.5959499E12, 2804.0]], "isOverall": false, "label": "14.4.6 - Formulario Cuentas Bancarias-114", "isController": false}, {"data": [[1.59595002E12, 1185.0]], "isOverall": false, "label": "15.3.21 - Formulario Campos Adicionales por otras Actividad-157", "isController": false}, {"data": [[1.59594972E12, 784.0]], "isOverall": false, "label": "3 - Seleccionar en el menu Operaciones del Sistema", "isController": true}, {"data": [[1.59594972E12, 1030.5]], "isOverall": false, "label": "6.3 - Presionar boton Nuevo Cliente-13", "isController": false}, {"data": [[1.59595002E12, 5248.5]], "isOverall": false, "label": "16 - Presionar el boton Grabar Persona", "isController": true}, {"data": [[1.59594978E12, 1767.5]], "isOverall": false, "label": "7.15 - Formulario Datos de la Persona Seleccionar Genero-28", "isController": false}, {"data": [[1.59595002E12, 907.5]], "isOverall": false, "label": "15.5.3 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[1.59594984E12, 1647.0]], "isOverall": false, "label": "13.4.6 - Llenar Formulario Relacion -94", "isController": false}, {"data": [[1.59594996E12, 2211.0]], "isOverall": false, "label": "15.3.5 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[1.59594996E12, 1923.0]], "isOverall": false, "label": "14.4.10 - Formulario Cuentas Bancarias-118", "isController": false}, {"data": [[1.59594972E12, 1171.5]], "isOverall": false, "label": "1.1 Se selecciona Inicio-1", "isController": false}, {"data": [[1.59594996E12, 61363.5]], "isOverall": false, "label": "14.4 - Llenar el Formulario de Cuentas Bancarias", "isController": true}, {"data": [[1.59594996E12, 69190.5]], "isOverall": false, "label": "14 - Seleccionar opcion Cuentas Bancarias ", "isController": true}, {"data": [[1.59595002E12, 49057.5]], "isOverall": false, "label": "15.3 - Llenar Formulario Campos Adicionales", "isController": true}, {"data": [[1.59594978E12, 3267.0]], "isOverall": false, "label": "8.3.1 - Formulario Datos de Cliente Grabar-37", "isController": false}, {"data": [[1.59594996E12, 12059.5]], "isOverall": false, "label": "14.4.7 - Formulario Cuentas Bancarias-115", "isController": false}, {"data": [[1.59594984E12, 2355.0]], "isOverall": false, "label": " 13.4.8 - Llenar Formulario Relacion -96", "isController": false}, {"data": [[1.59594996E12, 564.5]], "isOverall": false, "label": "14.4.24.1 - Segunda Cuenta Bancaria-132", "isController": false}, {"data": [[1.59594978E12, 2432.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-52", "isController": false}, {"data": [[1.59594978E12, 1796.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-55", "isController": false}, {"data": [[1.59594996E12, 1097.5]], "isOverall": false, "label": "14.4.12 - Formulario Cuentas Bancarias-120", "isController": false}, {"data": [[1.59594996E12, 1019.5]], "isOverall": false, "label": "15.3.6 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[1.59594978E12, 1211.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-54", "isController": false}, {"data": [[1.59594978E12, 1680.0]], "isOverall": false, "label": "7.17 - Formulario Datos de la Persona Fecha de Nacimiento-30", "isController": false}, {"data": [[1.59594978E12, 1604.0], [1.59594984E12, 2153.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-56", "isController": false}, {"data": [[1.59594984E12, 914.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-59", "isController": false}, {"data": [[1.59594984E12, 1407.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-58", "isController": false}, {"data": [[1.59594972E12, 111.0]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5-0", "isController": false}, {"data": [[1.59594978E12, 1013.0]], "isOverall": false, "label": "7.20.2 - Presionar Grabar Datos de la Persona -34", "isController": false}, {"data": [[1.59594996E12, 736.0]], "isOverall": false, "label": "14.4.22 - Formulario Cuentas Bancarias-130", "isController": false}, {"data": [[1.59594972E12, 6906.5]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5-1", "isController": false}, {"data": [[1.59594984E12, 2833.5]], "isOverall": false, "label": "12.1 - Formulario Contactos-82", "isController": false}, {"data": [[1.59594972E12, 3328.5]], "isOverall": false, "label": "7.6 - Formulario Datos de la Persona Identificacion-19", "isController": false}, {"data": [[1.59594996E12, 1690.5]], "isOverall": false, "label": "15.3.7 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[1.59594984E12, 858.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-77", "isController": false}, {"data": [[1.59594984E12, 547.5]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-78", "isController": false}, {"data": [[1.59594996E12, 3199.5]], "isOverall": false, "label": "14.4.8 - Formulario Cuentas Bancarias-116", "isController": false}, {"data": [[1.59594996E12, 846.5]], "isOverall": false, "label": "14.4.23 - Cunenta Bancaria Principal", "isController": true}, {"data": [[1.59594996E12, 6161.0]], "isOverall": false, "label": "15.3.4 -  Formulario Campos Adicionales-141", "isController": false}, {"data": [[1.59594996E12, 2079.5]], "isOverall": false, "label": "15.3.10 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[1.59594984E12, 1484.5]], "isOverall": false, "label": "13.1 - Seleccionar opcion Relacion-86", "isController": false}, {"data": [[1.5959499E12, 2354.0]], "isOverall": false, "label": " 13.4.11 - Llenar Formulario Relacion -100", "isController": false}, {"data": [[1.59594984E12, 2307.0]], "isOverall": false, "label": "12.2 - Formulario Contactos Correo-83", "isController": false}, {"data": [[1.59594978E12, 1370.5]], "isOverall": false, "label": "8.1 - Llenar Formulario Datos de Cliente-35", "isController": false}, {"data": [[1.5959499E12, 1218.0]], "isOverall": false, "label": "13.5.2 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[1.59594978E12, 2142.0]], "isOverall": false, "label": "7.14 - Formulario Datos de la Persona Seleccionar Ocupacion-27", "isController": false}, {"data": [[1.59595002E12, 1414.5]], "isOverall": false, "label": "15.3.29 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[1.59595002E12, 1784.0]], "isOverall": false, "label": "15.3.18 - Formulario Campo Exoneracion de impuesto-154", "isController": false}, {"data": [[1.59594996E12, 1308.0]], "isOverall": false, "label": "15.3.8 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[1.5959499E12, 2794.0]], "isOverall": false, "label": "14.4.5 - Formulario Cuentas Bancarias-113", "isController": false}, {"data": [[1.59594996E12, 922.5]], "isOverall": false, "label": "14.4.14 - Formulario Cuentas Bancarias-122", "isController": false}, {"data": [[1.59594984E12, 1058.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-75", "isController": false}, {"data": [[1.59594972E12, 7659.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[1.59594984E12, 790.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-67", "isController": false}, {"data": [[1.59594984E12, 872.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-74", "isController": false}, {"data": [[1.59594984E12, 984.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-76", "isController": false}, {"data": [[1.59594984E12, 773.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-61", "isController": false}, {"data": [[1.59594996E12, 1635.5]], "isOverall": false, "label": "14.4.11 - Formulario Cuentas Bancarias-119", "isController": false}, {"data": [[1.59594984E12, 1567.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-70", "isController": false}, {"data": [[1.59594984E12, 1208.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-73", "isController": false}, {"data": [[1.59594984E12, 1931.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-72", "isController": false}, {"data": [[1.59594978E12, 523.0]], "isOverall": false, "label": "10.4 - Formulario Domicilio Venta Provincia Pais de residencia-43", "isController": false}, {"data": [[1.59595002E12, 837.5]], "isOverall": false, "label": "15.4.2 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[1.59595002E12, 4488.0]], "isOverall": false, "label": "16.1 - Presionar el boton Grabar Persona-173", "isController": false}, {"data": [[1.59594978E12, 2982.0]], "isOverall": false, "label": "7.10 - Formulario Datos de la Persona Segundo Apellido-23", "isController": false}, {"data": [[1.59594978E12, 1833.5]], "isOverall": false, "label": "7.19 - Formulario Datos de la Persona Nacionalidad-32", "isController": false}, {"data": [[1.59594984E12, 1130.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-64", "isController": false}, {"data": [[1.59594978E12, 52092.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[1.59594984E12, 1436.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-63", "isController": false}, {"data": [[1.59594996E12, 1871.5]], "isOverall": false, "label": "15.3.14 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[1.59594984E12, 1018.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-66", "isController": false}, {"data": [[1.59594984E12, 1599.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-65", "isController": false}, {"data": [[1.59594984E12, 941.0]], "isOverall": false, "label": "13.4.4 - Llenar Formulario Relacion -92", "isController": false}, {"data": [[1.59594984E12, 1286.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-68", "isController": false}, {"data": [[1.59594996E12, 846.5]], "isOverall": false, "label": "14.4.23.1 - Cunenta Bancaria Principal-131", "isController": false}, {"data": [[1.59595002E12, 6220.5]], "isOverall": false, "label": "15.5 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[1.59594984E12, 832.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-69", "isController": false}, {"data": [[1.59595002E12, 260.0]], "isOverall": false, "label": "17.4 - Presionar el boton Cerrar  Persona--178", "isController": false}, {"data": [[1.59594984E12, 994.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-60", "isController": false}, {"data": [[1.59595002E12, 121.5]], "isOverall": false, "label": "17.3 - Presionar el boton Cerrar  Persona-", "isController": false}, {"data": [[1.59594984E12, 2115.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-62", "isController": false}, {"data": [[1.59594996E12, 1015.0]], "isOverall": false, "label": "15.3.2 -  Formulario Campos Adicionales-139", "isController": false}, {"data": [[1.59594978E12, 1579.0]], "isOverall": false, "label": "10.7 - Formulario Domicilio Provincia Pais de residencia-46", "isController": false}, {"data": [[1.59594972E12, 2853.0]], "isOverall": false, "label": "7.1 - Se abre Formulario Persona-15", "isController": false}, {"data": [[1.59594978E12, 1015.0]], "isOverall": false, "label": "7.13 - Formulario Datos de la Persona Buscar Ocupacion-26", "isController": false}, {"data": [[1.59594978E12, 2125.0]], "isOverall": false, "label": "8.2 - Seleccionar Datos de Cliente-36", "isController": false}, {"data": [[1.59594978E12, 9132.5]], "isOverall": false, "label": "7.20.1 - Presionar Grabar Datos de la Persona -33", "isController": false}, {"data": [[1.59594978E12, 2612.5]], "isOverall": false, "label": "7.9 - Formulario Datos de la Persona Primer Apellido-22", "isController": false}, {"data": [[1.59595002E12, 4030.5]], "isOverall": false, "label": "15.4 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[1.59594996E12, 2210.0]], "isOverall": false, "label": "15.3.9 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[1.5959499E12, 2695.5]], "isOverall": false, "label": "14.4.4 - Formulario Cuentas Bancarias-112", "isController": false}, {"data": [[1.5959499E12, 2140.5]], "isOverall": false, "label": "14.1 - Hacer clic en Crear Cuentas Bancarias-106", "isController": false}, {"data": [[1.59594996E12, 1467.5]], "isOverall": false, "label": "14.4.15 - Formulario Cuentas Bancarias-123", "isController": false}, {"data": [[1.59594996E12, 1585.0]], "isOverall": false, "label": "15.3.12 - Formulario campo Nombre de la Empresa y Nacionalidad-149", "isController": false}, {"data": [[1.59594978E12, 843.0]], "isOverall": false, "label": "8.3.2 - Formulario Datos de Cliente Grabar-38", "isController": false}, {"data": [[1.59595002E12, 1248.5]], "isOverall": false, "label": "15.3.24 - Formulario Campo Porcentaje de participacion-160", "isController": false}, {"data": [[1.59594996E12, 555.0]], "isOverall": false, "label": "14.4.20 - Formulario Cuentas Bancarias-128", "isController": false}, {"data": [[1.59594996E12, 1483.5]], "isOverall": false, "label": "14.5 - Guardar Cuentas Bancarias", "isController": true}, {"data": [[1.59595002E12, 1936.5]], "isOverall": false, "label": "15.4.1 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[1.59594978E12, 1494.5]], "isOverall": false, "label": "9.1 - Hacer clic en Crear Domicilio-39", "isController": false}, {"data": [[1.59594996E12, 2603.0]], "isOverall": false, "label": "15.3.1 - Formulario Campos Adicionales-138", "isController": false}, {"data": [[1.59595002E12, 760.5]], "isOverall": false, "label": "16.2 - Presionar el boton Grabar Persona-174", "isController": false}, {"data": [[1.59595002E12, 1583.0]], "isOverall": false, "label": "15.3.28 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[1.59594996E12, 564.5]], "isOverall": false, "label": "14.4.24 - Segunda Cuenta Bancaria", "isController": true}, {"data": [[1.59594972E12, 317.0]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3-1", "isController": false}, {"data": [[1.59594978E12, 1494.5]], "isOverall": false, "label": "9 - Seleccionar Domicilio", "isController": true}, {"data": [[1.5959499E12, 41589.0]], "isOverall": false, "label": "13 - Seleccionar opcion Relacion", "isController": true}, {"data": [[1.59594996E12, 524.5]], "isOverall": false, "label": "14.4.18 - Formulario Cuentas Bancarias-126", "isController": false}, {"data": [[1.59594972E12, 324.0]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3-0", "isController": false}, {"data": [[1.59594996E12, 600.0]], "isOverall": false, "label": "15.2 - Hacer clic en la opcion Campos Adicionales-137", "isController": false}, {"data": [[1.5959499E12, 3308.0]], "isOverall": false, "label": "14.4.1 - Formulario Cuentas Bancarias-109", "isController": false}, {"data": [[1.59595002E12, 1325.0]], "isOverall": false, "label": "15.3.26 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[1.59594972E12, 684.0]], "isOverall": false, "label": "5.2 -Hacer clic en la opcion Cliente-10", "isController": false}, {"data": [[1.59594996E12, 3180.0]], "isOverall": false, "label": "15.1 - Seleccionar la opcion Campos Adicionales-136", "isController": false}, {"data": [[1.59594978E12, 7605.5]], "isOverall": false, "label": "8 - Llenar Formulario Datos de Cliente", "isController": true}, {"data": [[1.59594984E12, 617.5]], "isOverall": false, "label": "11.2 - Hacer clic en Crear Contactos-80", "isController": false}, {"data": [[1.59594972E12, 102.5]], "isOverall": false, "label": "1.2 Se Selecciona Index-2-0", "isController": false}, {"data": [[1.59594972E12, 115.5]], "isOverall": false, "label": "1.2 Se Selecciona Index-2-1", "isController": false}, {"data": [[1.59594978E12, 4110.0]], "isOverall": false, "label": "8.3 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[1.59594984E12, 1405.5]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio", "isController": true}, {"data": [[1.59594978E12, 1712.0]], "isOverall": false, "label": "10.2 - Formulario Domicilio Provincia Pais de residencia-41", "isController": false}, {"data": [[1.59594984E12, 2553.0]], "isOverall": false, "label": "12.3.1 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[1.59594984E12, 1929.0]], "isOverall": false, "label": "13.4.2 - Llenar Formulario Relacion -90", "isController": false}, {"data": [[1.59594996E12, 2314.5]], "isOverall": false, "label": "15.3.11 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[1.59595002E12, 63088.5]], "isOverall": false, "label": "15 - Seleccionar la opcion Campos Adicionales", "isController": true}, {"data": [[1.59594978E12, 856.5]], "isOverall": false, "label": "10.8 - Formulario Domicilio Corregimiento Distrito-47", "isController": false}, {"data": [[1.59594978E12, 1095.0]], "isOverall": false, "label": "10.3 - Formulario Domicilio Provincia Pais de residencia-42", "isController": false}, {"data": [[1.59594972E12, 7930.0]], "isOverall": false, "label": "6 - Presionar boton Nuevo Cliente", "isController": true}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59595002E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 100.0, "minX": 1.59594972E12, "maxY": 292324.0, "series": [{"data": [[1.59594972E12, 1273.5]], "isOverall": false, "label": "1 - Seleccionar Index", "isController": true}, {"data": [[1.5959499E12, 3121.0], [1.59594984E12, 1376.0]], "isOverall": false, "label": " 13.4.10 - Llenar Formulario Relacion -99", "isController": false}, {"data": [[1.59594984E12, 1505.5]], "isOverall": false, "label": " 13.4.7 - Llenar Formulario Relacion -95", "isController": false}, {"data": [[1.59594984E12, 1449.5]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -97", "isController": false}, {"data": [[1.59594984E12, 901.0]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -98", "isController": false}, {"data": [[1.5959499E12, 3702.0]], "isOverall": false, "label": " 13.4.12 - Llenar Formulario Relacion -101", "isController": false}, {"data": [[1.59594972E12, 2873.5]], "isOverall": false, "label": "7.4 - Formulario Datos de la Persona Identificacion-17", "isController": false}, {"data": [[1.59595002E12, 466.5]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182", "isController": false}, {"data": [[1.59594972E12, 1819.5]], "isOverall": false, "label": "6.2 - Presionar boton Nuevo Cliente-12", "isController": false}, {"data": [[1.59594978E12, 1291.0]], "isOverall": false, "label": "7.12 - Formulario Datos de la Persona Buscar Ocupacion-25", "isController": false}, {"data": [[1.59594996E12, 242.0]], "isOverall": false, "label": "15.3.3 -  Formulario Campos Adicionales-140", "isController": false}, {"data": [[1.59594996E12, 642.5]], "isOverall": false, "label": "14.4.19 - Formulario Cuentas Bancarias-127", "isController": false}, {"data": [[1.59594972E12, 195.0]], "isOverall": false, "label": "4 - Seleccionar en el menu Modulo de Personas", "isController": true}, {"data": [[1.59594972E12, 1827.0]], "isOverall": false, "label": "5 - Seleccionar en el menu Clientes", "isController": true}, {"data": [[1.59594978E12, 831.5]], "isOverall": false, "label": "10.5 - Formulario Domicilio Provincia Pais de residencia-44", "isController": false}, {"data": [[1.59595002E12, 1557.0]], "isOverall": false, "label": "15.3.22 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[1.59594984E12, 1740.5]], "isOverall": false, "label": "13.4.3 - Llenar Formulario Relacion -91", "isController": false}, {"data": [[1.59594984E12, 1737.0]], "isOverall": false, "label": "13.4.5 - Llenar Formulario Relacion -93", "isController": false}, {"data": [[1.59594978E12, 889.5]], "isOverall": false, "label": "10.6 - Formulario Domicilio Provincia Pais de residencia-45", "isController": false}, {"data": [[1.59594984E12, 3025.5]], "isOverall": false, "label": "12.3 - Formulario Contactos Guardar", "isController": true}, {"data": [[1.59594996E12, 1087.5]], "isOverall": false, "label": "14.5.1 - Guardar Cuentas Bancarias-134", "isController": false}, {"data": [[1.59595002E12, 1101.0]], "isOverall": false, "label": "15.3.20 - Formulario Campos Adicionales Actividad Principal-156", "isController": false}, {"data": [[1.59595002E12, 1797.5]], "isOverall": false, "label": "15.3.23 - Formulario Campo Accionista-159", "isController": false}, {"data": [[1.59595002E12, 950.5]], "isOverall": false, "label": "15.3.25 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[1.59594972E12, 2228.5]], "isOverall": false, "label": "6.1 - Presionar boton Nuevo Cliente-11", "isController": false}, {"data": [[1.5959499E12, 30329.0]], "isOverall": false, "label": "13.4 - Formulario Relacion Buscar ", "isController": true}, {"data": [[1.59594984E12, 2017.5]], "isOverall": false, "label": "13.4.1 - Buscar Identificacion -89", "isController": false}, {"data": [[1.5959499E12, 2991.5]], "isOverall": false, "label": " 13.4.13 - Llenar Formulario Relacion Identificacion -102", "isController": false}, {"data": [[1.59594984E12, 625.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito Ventana-71", "isController": false}, {"data": [[1.59595002E12, 100.0]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185-0", "isController": false}, {"data": [[1.5959499E12, 3005.0]], "isOverall": false, "label": " 13.4.14 - Llenar Formulario Relacion -103", "isController": false}, {"data": [[1.59595002E12, 102.5]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185-1", "isController": false}, {"data": [[1.59594972E12, 1962.0]], "isOverall": false, "label": "6.4 - Presionar boton Nuevo Cliente-14", "isController": false}, {"data": [[1.59594996E12, 655.5]], "isOverall": false, "label": "14.4.25 - Tercera Cuenta Bancaria", "isController": true}, {"data": [[1.59595002E12, 1204.0]], "isOverall": false, "label": "15.5.1 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[1.59594996E12, 213.0]], "isOverall": false, "label": "14.5.2 - Guardar Cuentas Bancarias-135", "isController": false}, {"data": [[1.59594972E12, 3275.5]], "isOverall": false, "label": "7.7 - Formulario Persona Digito Verificador y Fecha de Vencimiento-20", "isController": false}, {"data": [[1.59594984E12, 2345.5]], "isOverall": false, "label": "11.3 - Hacer clic en Crear Contactos-81", "isController": false}, {"data": [[1.5959499E12, 3047.0]], "isOverall": false, "label": "14.3 - Hacer clic en Crear Cuentas Bancarias-108", "isController": false}, {"data": [[1.59594972E12, 2137.5]], "isOverall": false, "label": "7.2 - Se abre Formulario Persona-16", "isController": false}, {"data": [[1.5959499E12, 2811.0]], "isOverall": false, "label": "14.4.2 - Formulario Cuentas Bancarias-110", "isController": false}, {"data": [[1.59594984E12, 757.0]], "isOverall": false, "label": "12.3.2 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[1.59594996E12, 755.0]], "isOverall": false, "label": "14.4.17 - Formulario Cuentas Bancarias-125", "isController": false}, {"data": [[1.59595002E12, 668.5]], "isOverall": false, "label": "18 - Presionar el boton Cerrar  Insis", "isController": true}, {"data": [[1.59594972E12, 323.5]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3", "isController": false}, {"data": [[1.59595002E12, 317.5]], "isOverall": false, "label": "17.2 - Presionar el boton Cerrar  Persona--176", "isController": false}, {"data": [[1.59594978E12, 2140.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito -53", "isController": false}, {"data": [[1.59595002E12, 1091.5]], "isOverall": false, "label": "17 - Presionar el boton Cerrar  Persona", "isController": true}, {"data": [[1.59594978E12, 2518.0], [1.59594972E12, 3509.0]], "isOverall": false, "label": "7.8 - Formulario Datos de la Persona Nombre-21", "isController": false}, {"data": [[1.59594984E12, 827.0]], "isOverall": false, "label": "11.1 - Hacer clic en Crear Contactos-79", "isController": false}, {"data": [[1.59595002E12, 1374.0]], "isOverall": false, "label": "15.3.27 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[1.5959499E12, 1009.5]], "isOverall": false, "label": "14.4.3 - Formulario Cuentas Bancarias-111", "isController": false}, {"data": [[1.5959499E12, 808.5]], "isOverall": false, "label": "14.2 - Hacer clic en Crear Cuentas Bancarias-107", "isController": false}, {"data": [[1.59595002E12, 404.5]], "isOverall": false, "label": "17.1 - Presionar el boton Cerrar  Persona-175", "isController": false}, {"data": [[1.59594984E12, 41962.0]], "isOverall": false, "label": "10 - Llenar el Formulario Domicilio", "isController": true}, {"data": [[1.59594972E12, 1174.5]], "isOverall": false, "label": "5.1 - Seleccionar en el menu Cliente-9", "isController": false}, {"data": [[1.59594972E12, 2998.5]], "isOverall": false, "label": "7.5 - Formulario Datos de la Persona Identificacion-18", "isController": false}, {"data": [[1.59595002E12, 2226.0]], "isOverall": false, "label": "15.3.13 - Formulario Campo Cargo que Ocupa-150", "isController": false}, {"data": [[1.59594972E12, 110.5]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5", "isController": false}, {"data": [[1.59594972E12, 733.5]], "isOverall": false, "label": "3.1 - Seleccionar en el menu Operaciones del Sistema-7", "isController": false}, {"data": [[1.59594978E12, 2248.5]], "isOverall": false, "label": "7.11 - Formulario Datos de la Persona Buscar Ocupacion-24", "isController": false}, {"data": [[1.59595002E12, 292324.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59594996E12, 1084.0]], "isOverall": false, "label": "14.4.16- Formulario Cuentas Bancarias-124", "isController": false}, {"data": [[1.59595002E12, 803.0]], "isOverall": false, "label": "15.5.4 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[1.59595002E12, 2030.5]], "isOverall": false, "label": "15.3.16 - Formulario Tipo de PYMES-153", "isController": false}, {"data": [[1.59594984E12, 1720.0]], "isOverall": false, "label": "13.3 - Seleccionar Vinculo Relacion-88", "isController": false}, {"data": [[1.5959499E12, 4959.5]], "isOverall": false, "label": "13.5 - Formulario Relacion Guardar", "isController": true}, {"data": [[1.59594984E12, 8146.5]], "isOverall": false, "label": "12 - Llenar el Formulario de Contactos", "isController": true}, {"data": [[1.59594984E12, 3715.5]], "isOverall": false, "label": "11 - Seleccionar opcion Contactos", "isController": true}, {"data": [[1.59594978E12, 296.0], [1.59594984E12, 602.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-57", "isController": false}, {"data": [[1.59594978E12, 1943.0]], "isOverall": false, "label": "7.18 - Formulario Datos de la Persona Pais-31", "isController": false}, {"data": [[1.59595002E12, 3288.5]], "isOverall": false, "label": "15.5.2 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[1.59594978E12, 9322.0]], "isOverall": false, "label": "7.20 - Presionar Grabar Datos de la Persona ", "isController": true}, {"data": [[1.59595002E12, 102.0]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183-0", "isController": false}, {"data": [[1.59595002E12, 103.0]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183-1", "isController": false}, {"data": [[1.59595002E12, 1326.0]], "isOverall": false, "label": "15.3.19- Formulario Campo Ingresos Anuales-155", "isController": false}, {"data": [[1.59594996E12, 2877.5]], "isOverall": false, "label": "14.4.9 - Formulario Cuentas Bancarias-117", "isController": false}, {"data": [[1.59595002E12, 1166.0]], "isOverall": false, "label": "15.4.3 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[1.59594972E12, 195.0]], "isOverall": false, "label": "4.1 - Seleccionar Modulo de Personas-8", "isController": false}, {"data": [[1.59595002E12, 100.0]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185", "isController": false}, {"data": [[1.59594996E12, 603.0]], "isOverall": false, "label": "14.4.21 - Formulario Cuentas Bancarias-129", "isController": false}, {"data": [[1.59595002E12, 466.5]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182-0", "isController": false}, {"data": [[1.59595002E12, 102.0]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183", "isController": false}, {"data": [[1.59595002E12, 130.0]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182-2", "isController": false}, {"data": [[1.59595002E12, 113.0]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182-1", "isController": false}, {"data": [[1.59594972E12, 102.5]], "isOverall": false, "label": "1.2 Se Selecciona Index-2", "isController": false}, {"data": [[1.59594996E12, 655.5]], "isOverall": false, "label": "14.4.25.1 - Tercera Cuenta Bancaria", "isController": false}, {"data": [[1.59594984E12, 629.0]], "isOverall": false, "label": "13.2 - Hacer clic en Crear Relacion-87", "isController": false}, {"data": [[1.59594978E12, 1247.5]], "isOverall": false, "label": "7.16 - Formulario Datos de la Persona Seleccionar Genero-29", "isController": false}, {"data": [[1.59594978E12, 2881.5]], "isOverall": false, "label": "10.1 - Formulario Domicilio Tipo de direccion-40", "isController": false}, {"data": [[1.59595002E12, 1795.0]], "isOverall": false, "label": "15.3.15 - Formulario Campo Perfil PYMES-152", "isController": false}, {"data": [[1.59594996E12, 1645.0]], "isOverall": false, "label": "14.4.13 - Formulario Cuentas Bancarias-121", "isController": false}, {"data": [[1.5959499E12, 3886.5]], "isOverall": false, "label": "13.5.1 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[1.59594996E12, 24792.0], [1.5959499E12, 2710.0]], "isOverall": false, "label": "14.4.6 - Formulario Cuentas Bancarias-114", "isController": false}, {"data": [[1.59595002E12, 1177.0]], "isOverall": false, "label": "15.3.21 - Formulario Campos Adicionales por otras Actividad-157", "isController": false}, {"data": [[1.59594972E12, 733.5]], "isOverall": false, "label": "3 - Seleccionar en el menu Operaciones del Sistema", "isController": true}, {"data": [[1.59594972E12, 997.0]], "isOverall": false, "label": "6.3 - Presionar boton Nuevo Cliente-13", "isController": false}, {"data": [[1.59595002E12, 4869.5]], "isOverall": false, "label": "16 - Presionar el boton Grabar Persona", "isController": true}, {"data": [[1.59594978E12, 1760.0]], "isOverall": false, "label": "7.15 - Formulario Datos de la Persona Seleccionar Genero-28", "isController": false}, {"data": [[1.59595002E12, 822.5]], "isOverall": false, "label": "15.5.3 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[1.59594984E12, 1644.5]], "isOverall": false, "label": "13.4.6 - Llenar Formulario Relacion -94", "isController": false}, {"data": [[1.59594996E12, 2208.0]], "isOverall": false, "label": "15.3.5 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[1.59594996E12, 1920.0]], "isOverall": false, "label": "14.4.10 - Formulario Cuentas Bancarias-118", "isController": false}, {"data": [[1.59594972E12, 1171.0]], "isOverall": false, "label": "1.1 Se selecciona Inicio-1", "isController": false}, {"data": [[1.59594996E12, 59351.5]], "isOverall": false, "label": "14.4 - Llenar el Formulario de Cuentas Bancarias", "isController": true}, {"data": [[1.59594996E12, 66208.0]], "isOverall": false, "label": "14 - Seleccionar opcion Cuentas Bancarias ", "isController": true}, {"data": [[1.59595002E12, 44042.0]], "isOverall": false, "label": "15.3 - Llenar Formulario Campos Adicionales", "isController": true}, {"data": [[1.59594978E12, 2752.0]], "isOverall": false, "label": "8.3.1 - Formulario Datos de Cliente Grabar-37", "isController": false}, {"data": [[1.59594996E12, 11483.5]], "isOverall": false, "label": "14.4.7 - Formulario Cuentas Bancarias-115", "isController": false}, {"data": [[1.59594984E12, 2207.5]], "isOverall": false, "label": " 13.4.8 - Llenar Formulario Relacion -96", "isController": false}, {"data": [[1.59594996E12, 561.0]], "isOverall": false, "label": "14.4.24.1 - Segunda Cuenta Bancaria-132", "isController": false}, {"data": [[1.59594978E12, 2343.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-52", "isController": false}, {"data": [[1.59594978E12, 1507.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-55", "isController": false}, {"data": [[1.59594996E12, 1093.0]], "isOverall": false, "label": "14.4.12 - Formulario Cuentas Bancarias-120", "isController": false}, {"data": [[1.59594996E12, 1017.0]], "isOverall": false, "label": "15.3.6 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[1.59594978E12, 1205.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-54", "isController": false}, {"data": [[1.59594978E12, 1675.5]], "isOverall": false, "label": "7.17 - Formulario Datos de la Persona Fecha de Nacimiento-30", "isController": false}, {"data": [[1.59594978E12, 1483.0], [1.59594984E12, 1971.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-56", "isController": false}, {"data": [[1.59594984E12, 912.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-59", "isController": false}, {"data": [[1.59594984E12, 1398.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-58", "isController": false}, {"data": [[1.59594972E12, 110.5]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5-0", "isController": false}, {"data": [[1.59594978E12, 838.0]], "isOverall": false, "label": "7.20.2 - Presionar Grabar Datos de la Persona -34", "isController": false}, {"data": [[1.59594996E12, 734.0]], "isOverall": false, "label": "14.4.22 - Formulario Cuentas Bancarias-130", "isController": false}, {"data": [[1.59594972E12, 6714.5]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5-1", "isController": false}, {"data": [[1.59594984E12, 2817.5]], "isOverall": false, "label": "12.1 - Formulario Contactos-82", "isController": false}, {"data": [[1.59594972E12, 3312.0]], "isOverall": false, "label": "7.6 - Formulario Datos de la Persona Identificacion-19", "isController": false}, {"data": [[1.59594996E12, 1683.0]], "isOverall": false, "label": "15.3.7 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[1.59594984E12, 761.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-77", "isController": false}, {"data": [[1.59594984E12, 474.5]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-78", "isController": false}, {"data": [[1.59594996E12, 3180.5]], "isOverall": false, "label": "14.4.8 - Formulario Cuentas Bancarias-116", "isController": false}, {"data": [[1.59594996E12, 843.0]], "isOverall": false, "label": "14.4.23 - Cunenta Bancaria Principal", "isController": true}, {"data": [[1.59594996E12, 1611.5]], "isOverall": false, "label": "15.3.4 -  Formulario Campos Adicionales-141", "isController": false}, {"data": [[1.59594996E12, 2066.0]], "isOverall": false, "label": "15.3.10 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[1.59594984E12, 1253.5]], "isOverall": false, "label": "13.1 - Seleccionar opcion Relacion-86", "isController": false}, {"data": [[1.5959499E12, 2334.5]], "isOverall": false, "label": " 13.4.11 - Llenar Formulario Relacion -100", "isController": false}, {"data": [[1.59594984E12, 2303.5]], "isOverall": false, "label": "12.2 - Formulario Contactos Correo-83", "isController": false}, {"data": [[1.59594978E12, 1340.0]], "isOverall": false, "label": "8.1 - Llenar Formulario Datos de Cliente-35", "isController": false}, {"data": [[1.5959499E12, 1073.0]], "isOverall": false, "label": "13.5.2 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[1.59594978E12, 2134.5]], "isOverall": false, "label": "7.14 - Formulario Datos de la Persona Seleccionar Ocupacion-27", "isController": false}, {"data": [[1.59595002E12, 1409.0]], "isOverall": false, "label": "15.3.29 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[1.59595002E12, 1780.0]], "isOverall": false, "label": "15.3.18 - Formulario Campo Exoneracion de impuesto-154", "isController": false}, {"data": [[1.59594996E12, 1304.0]], "isOverall": false, "label": "15.3.8 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[1.5959499E12, 2782.0]], "isOverall": false, "label": "14.4.5 - Formulario Cuentas Bancarias-113", "isController": false}, {"data": [[1.59594996E12, 905.5]], "isOverall": false, "label": "14.4.14 - Formulario Cuentas Bancarias-122", "isController": false}, {"data": [[1.59594984E12, 1055.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-75", "isController": false}, {"data": [[1.59594972E12, 434.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[1.59594984E12, 775.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-67", "isController": false}, {"data": [[1.59594984E12, 858.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-74", "isController": false}, {"data": [[1.59594984E12, 981.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-76", "isController": false}, {"data": [[1.59594984E12, 607.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-61", "isController": false}, {"data": [[1.59594996E12, 1624.0]], "isOverall": false, "label": "14.4.11 - Formulario Cuentas Bancarias-119", "isController": false}, {"data": [[1.59594984E12, 1482.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-70", "isController": false}, {"data": [[1.59594984E12, 1204.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-73", "isController": false}, {"data": [[1.59594984E12, 1838.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-72", "isController": false}, {"data": [[1.59594978E12, 508.5]], "isOverall": false, "label": "10.4 - Formulario Domicilio Venta Provincia Pais de residencia-43", "isController": false}, {"data": [[1.59595002E12, 548.5]], "isOverall": false, "label": "15.4.2 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[1.59595002E12, 4203.5]], "isOverall": false, "label": "16.1 - Presionar el boton Grabar Persona-173", "isController": false}, {"data": [[1.59594978E12, 2964.0]], "isOverall": false, "label": "7.10 - Formulario Datos de la Persona Segundo Apellido-23", "isController": false}, {"data": [[1.59594978E12, 1820.0]], "isOverall": false, "label": "7.19 - Formulario Datos de la Persona Nacionalidad-32", "isController": false}, {"data": [[1.59594984E12, 1130.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-64", "isController": false}, {"data": [[1.59594978E12, 50083.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[1.59594984E12, 1427.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-63", "isController": false}, {"data": [[1.59594996E12, 1870.5]], "isOverall": false, "label": "15.3.14 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[1.59594984E12, 901.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-66", "isController": false}, {"data": [[1.59594984E12, 1227.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-65", "isController": false}, {"data": [[1.59594984E12, 928.0]], "isOverall": false, "label": "13.4.4 - Llenar Formulario Relacion -92", "isController": false}, {"data": [[1.59594984E12, 1277.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-68", "isController": false}, {"data": [[1.59594996E12, 843.0]], "isOverall": false, "label": "14.4.23.1 - Cunenta Bancaria Principal-131", "isController": false}, {"data": [[1.59595002E12, 6118.0]], "isOverall": false, "label": "15.5 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[1.59594984E12, 818.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-69", "isController": false}, {"data": [[1.59595002E12, 258.0]], "isOverall": false, "label": "17.4 - Presionar el boton Cerrar  Persona--178", "isController": false}, {"data": [[1.59594984E12, 987.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-60", "isController": false}, {"data": [[1.59595002E12, 111.5]], "isOverall": false, "label": "17.3 - Presionar el boton Cerrar  Persona-", "isController": false}, {"data": [[1.59594984E12, 2020.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-62", "isController": false}, {"data": [[1.59594996E12, 826.0]], "isOverall": false, "label": "15.3.2 -  Formulario Campos Adicionales-139", "isController": false}, {"data": [[1.59594978E12, 1573.5]], "isOverall": false, "label": "10.7 - Formulario Domicilio Provincia Pais de residencia-46", "isController": false}, {"data": [[1.59594972E12, 2458.5]], "isOverall": false, "label": "7.1 - Se abre Formulario Persona-15", "isController": false}, {"data": [[1.59594978E12, 1012.5]], "isOverall": false, "label": "7.13 - Formulario Datos de la Persona Buscar Ocupacion-26", "isController": false}, {"data": [[1.59594978E12, 2117.5]], "isOverall": false, "label": "8.2 - Seleccionar Datos de Cliente-36", "isController": false}, {"data": [[1.59594978E12, 8484.0]], "isOverall": false, "label": "7.20.1 - Presionar Grabar Datos de la Persona -33", "isController": false}, {"data": [[1.59594978E12, 2595.5]], "isOverall": false, "label": "7.9 - Formulario Datos de la Persona Primer Apellido-22", "isController": false}, {"data": [[1.59595002E12, 3360.0]], "isOverall": false, "label": "15.4 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[1.59594996E12, 2204.5]], "isOverall": false, "label": "15.3.9 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[1.5959499E12, 2684.5]], "isOverall": false, "label": "14.4.4 - Formulario Cuentas Bancarias-112", "isController": false}, {"data": [[1.5959499E12, 1700.5]], "isOverall": false, "label": "14.1 - Hacer clic en Crear Cuentas Bancarias-106", "isController": false}, {"data": [[1.59594996E12, 1460.0]], "isOverall": false, "label": "14.4.15 - Formulario Cuentas Bancarias-123", "isController": false}, {"data": [[1.59594996E12, 1483.0]], "isOverall": false, "label": "15.3.12 - Formulario campo Nombre de la Empresa y Nacionalidad-149", "isController": false}, {"data": [[1.59594978E12, 785.5]], "isOverall": false, "label": "8.3.2 - Formulario Datos de Cliente Grabar-38", "isController": false}, {"data": [[1.59595002E12, 1244.0]], "isOverall": false, "label": "15.3.24 - Formulario Campo Porcentaje de participacion-160", "isController": false}, {"data": [[1.59594996E12, 553.0]], "isOverall": false, "label": "14.4.20 - Formulario Cuentas Bancarias-128", "isController": false}, {"data": [[1.59594996E12, 1300.5]], "isOverall": false, "label": "14.5 - Guardar Cuentas Bancarias", "isController": true}, {"data": [[1.59595002E12, 1645.5]], "isOverall": false, "label": "15.4.1 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[1.59594978E12, 1127.0]], "isOverall": false, "label": "9.1 - Hacer clic en Crear Domicilio-39", "isController": false}, {"data": [[1.59594996E12, 2600.5]], "isOverall": false, "label": "15.3.1 - Formulario Campos Adicionales-138", "isController": false}, {"data": [[1.59595002E12, 666.0]], "isOverall": false, "label": "16.2 - Presionar el boton Grabar Persona-174", "isController": false}, {"data": [[1.59595002E12, 1528.0]], "isOverall": false, "label": "15.3.28 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[1.59594996E12, 561.0]], "isOverall": false, "label": "14.4.24 - Segunda Cuenta Bancaria", "isController": true}, {"data": [[1.59594972E12, 317.0]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3-1", "isController": false}, {"data": [[1.59594978E12, 1127.0]], "isOverall": false, "label": "9 - Seleccionar Domicilio", "isController": true}, {"data": [[1.5959499E12, 38891.0]], "isOverall": false, "label": "13 - Seleccionar opcion Relacion", "isController": true}, {"data": [[1.59594996E12, 399.0]], "isOverall": false, "label": "14.4.18 - Formulario Cuentas Bancarias-126", "isController": false}, {"data": [[1.59594972E12, 323.5]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3-0", "isController": false}, {"data": [[1.59594996E12, 514.0]], "isOverall": false, "label": "15.2 - Hacer clic en la opcion Campos Adicionales-137", "isController": false}, {"data": [[1.5959499E12, 3294.5]], "isOverall": false, "label": "14.4.1 - Formulario Cuentas Bancarias-109", "isController": false}, {"data": [[1.59595002E12, 1321.0]], "isOverall": false, "label": "15.3.26 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[1.59594972E12, 652.5]], "isOverall": false, "label": "5.2 -Hacer clic en la opcion Cliente-10", "isController": false}, {"data": [[1.59594996E12, 3062.5]], "isOverall": false, "label": "15.1 - Seleccionar la opcion Campos Adicionales-136", "isController": false}, {"data": [[1.59594978E12, 6995.0]], "isOverall": false, "label": "8 - Llenar Formulario Datos de Cliente", "isController": true}, {"data": [[1.59594984E12, 543.0]], "isOverall": false, "label": "11.2 - Hacer clic en Crear Contactos-80", "isController": false}, {"data": [[1.59594972E12, 102.5]], "isOverall": false, "label": "1.2 Se Selecciona Index-2-0", "isController": false}, {"data": [[1.59594972E12, 113.0]], "isOverall": false, "label": "1.2 Se Selecciona Index-2-1", "isController": false}, {"data": [[1.59594978E12, 3537.5]], "isOverall": false, "label": "8.3 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[1.59594984E12, 1235.5]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio", "isController": true}, {"data": [[1.59594978E12, 1447.0]], "isOverall": false, "label": "10.2 - Formulario Domicilio Provincia Pais de residencia-41", "isController": false}, {"data": [[1.59594984E12, 2268.5]], "isOverall": false, "label": "12.3.1 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[1.59594984E12, 1916.5]], "isOverall": false, "label": "13.4.2 - Llenar Formulario Relacion -90", "isController": false}, {"data": [[1.59594996E12, 2309.5]], "isOverall": false, "label": "15.3.11 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[1.59595002E12, 57096.5]], "isOverall": false, "label": "15 - Seleccionar la opcion Campos Adicionales", "isController": true}, {"data": [[1.59594978E12, 761.5]], "isOverall": false, "label": "10.8 - Formulario Domicilio Corregimiento Distrito-47", "isController": false}, {"data": [[1.59594978E12, 934.5]], "isOverall": false, "label": "10.3 - Formulario Domicilio Provincia Pais de residencia-42", "isController": false}, {"data": [[1.59594972E12, 7007.0]], "isOverall": false, "label": "6 - Presionar boton Nuevo Cliente", "isController": true}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59595002E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.59594972E12, "maxY": 66700.5, "series": [{"data": [[1.59594972E12, 1073.0]], "isOverall": false, "label": "1 - Seleccionar Index", "isController": true}, {"data": [[1.5959499E12, 459.0], [1.59594984E12, 438.0]], "isOverall": false, "label": " 13.4.10 - Llenar Formulario Relacion -99", "isController": false}, {"data": [[1.59594984E12, 0.0]], "isOverall": false, "label": " 13.4.7 - Llenar Formulario Relacion -95", "isController": false}, {"data": [[1.59594984E12, 416.5]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -97", "isController": false}, {"data": [[1.59594984E12, 0.0]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -98", "isController": false}, {"data": [[1.5959499E12, 495.0]], "isOverall": false, "label": " 13.4.12 - Llenar Formulario Relacion -101", "isController": false}, {"data": [[1.59594972E12, 395.0]], "isOverall": false, "label": "7.4 - Formulario Datos de la Persona Identificacion-17", "isController": false}, {"data": [[1.59595002E12, 333.0]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182", "isController": false}, {"data": [[1.59594972E12, 627.5]], "isOverall": false, "label": "6.2 - Presionar boton Nuevo Cliente-12", "isController": false}, {"data": [[1.59594978E12, 544.5]], "isOverall": false, "label": "7.12 - Formulario Datos de la Persona Buscar Ocupacion-25", "isController": false}, {"data": [[1.59594996E12, 0.0]], "isOverall": false, "label": "15.3.3 -  Formulario Campos Adicionales-140", "isController": false}, {"data": [[1.59594996E12, 174.5]], "isOverall": false, "label": "14.4.19 - Formulario Cuentas Bancarias-127", "isController": false}, {"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "4 - Seleccionar en el menu Modulo de Personas", "isController": true}, {"data": [[1.59594972E12, 523.0]], "isOverall": false, "label": "5 - Seleccionar en el menu Clientes", "isController": true}, {"data": [[1.59594978E12, 0.0]], "isOverall": false, "label": "10.5 - Formulario Domicilio Provincia Pais de residencia-44", "isController": false}, {"data": [[1.59595002E12, 344.5]], "isOverall": false, "label": "15.3.22 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[1.59594984E12, 441.0]], "isOverall": false, "label": "13.4.3 - Llenar Formulario Relacion -91", "isController": false}, {"data": [[1.59594984E12, 0.0]], "isOverall": false, "label": "13.4.5 - Llenar Formulario Relacion -93", "isController": false}, {"data": [[1.59594978E12, 176.0]], "isOverall": false, "label": "10.6 - Formulario Domicilio Provincia Pais de residencia-45", "isController": false}, {"data": [[1.59594984E12, 735.5]], "isOverall": false, "label": "12.3 - Formulario Contactos Guardar", "isController": true}, {"data": [[1.59594996E12, 166.5]], "isOverall": false, "label": "14.5.1 - Guardar Cuentas Bancarias-134", "isController": false}, {"data": [[1.59595002E12, 380.0]], "isOverall": false, "label": "15.3.20 - Formulario Campos Adicionales Actividad Principal-156", "isController": false}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "15.3.23 - Formulario Campo Accionista-159", "isController": false}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "15.3.25 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "6.1 - Presionar boton Nuevo Cliente-11", "isController": false}, {"data": [[1.5959499E12, 5282.5]], "isOverall": false, "label": "13.4 - Formulario Relacion Buscar ", "isController": true}, {"data": [[1.59594984E12, 442.0]], "isOverall": false, "label": "13.4.1 - Buscar Identificacion -89", "isController": false}, {"data": [[1.5959499E12, 537.5]], "isOverall": false, "label": " 13.4.13 - Llenar Formulario Relacion Identificacion -102", "isController": false}, {"data": [[1.59594984E12, 213.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito Ventana-71", "isController": false}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185-0", "isController": false}, {"data": [[1.5959499E12, 540.5]], "isOverall": false, "label": " 13.4.14 - Llenar Formulario Relacion -103", "isController": false}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185-1", "isController": false}, {"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "6.4 - Presionar boton Nuevo Cliente-14", "isController": false}, {"data": [[1.59594996E12, 159.5]], "isOverall": false, "label": "14.4.25 - Tercera Cuenta Bancaria", "isController": true}, {"data": [[1.59595002E12, 209.5]], "isOverall": false, "label": "15.5.1 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[1.59594996E12, 0.0]], "isOverall": false, "label": "14.5.2 - Guardar Cuentas Bancarias-135", "isController": false}, {"data": [[1.59594972E12, 558.0]], "isOverall": false, "label": "7.7 - Formulario Persona Digito Verificador y Fecha de Vencimiento-20", "isController": false}, {"data": [[1.59594984E12, 217.0]], "isOverall": false, "label": "11.3 - Hacer clic en Crear Contactos-81", "isController": false}, {"data": [[1.5959499E12, 0.0]], "isOverall": false, "label": "14.3 - Hacer clic en Crear Cuentas Bancarias-108", "isController": false}, {"data": [[1.59594972E12, 498.5]], "isOverall": false, "label": "7.2 - Se abre Formulario Persona-16", "isController": false}, {"data": [[1.5959499E12, 554.0]], "isOverall": false, "label": "14.4.2 - Formulario Cuentas Bancarias-110", "isController": false}, {"data": [[1.59594984E12, 345.5]], "isOverall": false, "label": "12.3.2 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[1.59594996E12, 0.0]], "isOverall": false, "label": "14.4.17 - Formulario Cuentas Bancarias-125", "isController": false}, {"data": [[1.59595002E12, 333.0]], "isOverall": false, "label": "18 - Presionar el boton Cerrar  Insis", "isController": true}, {"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3", "isController": false}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "17.2 - Presionar el boton Cerrar  Persona--176", "isController": false}, {"data": [[1.59594978E12, 436.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito -53", "isController": false}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "17 - Presionar el boton Cerrar  Persona", "isController": true}, {"data": [[1.59594978E12, 452.0], [1.59594972E12, 667.0]], "isOverall": false, "label": "7.8 - Formulario Datos de la Persona Nombre-21", "isController": false}, {"data": [[1.59594984E12, 0.0]], "isOverall": false, "label": "11.1 - Hacer clic en Crear Contactos-79", "isController": false}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "15.3.27 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[1.5959499E12, 470.0]], "isOverall": false, "label": "14.4.3 - Formulario Cuentas Bancarias-111", "isController": false}, {"data": [[1.5959499E12, 377.0]], "isOverall": false, "label": "14.2 - Hacer clic en Crear Cuentas Bancarias-107", "isController": false}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "17.1 - Presionar el boton Cerrar  Persona-175", "isController": false}, {"data": [[1.59594984E12, 7288.0]], "isOverall": false, "label": "10 - Llenar el Formulario Domicilio", "isController": true}, {"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "5.1 - Seleccionar en el menu Cliente-9", "isController": false}, {"data": [[1.59594972E12, 534.0]], "isOverall": false, "label": "7.5 - Formulario Datos de la Persona Identificacion-18", "isController": false}, {"data": [[1.59595002E12, 374.0]], "isOverall": false, "label": "15.3.13 - Formulario Campo Cargo que Ocupa-150", "isController": false}, {"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5", "isController": false}, {"data": [[1.59594972E12, 455.0]], "isOverall": false, "label": "3.1 - Seleccionar en el menu Operaciones del Sistema-7", "isController": false}, {"data": [[1.59594978E12, 511.0]], "isOverall": false, "label": "7.11 - Formulario Datos de la Persona Buscar Ocupacion-24", "isController": false}, {"data": [[1.59595002E12, 66700.5]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59594996E12, 396.0]], "isOverall": false, "label": "14.4.16- Formulario Cuentas Bancarias-124", "isController": false}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "15.5.4 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[1.59595002E12, 192.5]], "isOverall": false, "label": "15.3.16 - Formulario Tipo de PYMES-153", "isController": false}, {"data": [[1.59594984E12, 231.5]], "isOverall": false, "label": "13.3 - Seleccionar Vinculo Relacion-88", "isController": false}, {"data": [[1.5959499E12, 966.0]], "isOverall": false, "label": "13.5 - Formulario Relacion Guardar", "isController": true}, {"data": [[1.59594984E12, 1807.5]], "isOverall": false, "label": "12 - Llenar el Formulario de Contactos", "isController": true}, {"data": [[1.59594984E12, 450.0]], "isOverall": false, "label": "11 - Seleccionar opcion Contactos", "isController": true}, {"data": [[1.59594978E12, 0.0], [1.59594984E12, 377.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-57", "isController": false}, {"data": [[1.59594978E12, 0.0]], "isOverall": false, "label": "7.18 - Formulario Datos de la Persona Pais-31", "isController": false}, {"data": [[1.59595002E12, 169.5]], "isOverall": false, "label": "15.5.2 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[1.59594978E12, 683.5]], "isOverall": false, "label": "7.20 - Presionar Grabar Datos de la Persona ", "isController": true}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183-0", "isController": false}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183-1", "isController": false}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "15.3.19- Formulario Campo Ingresos Anuales-155", "isController": false}, {"data": [[1.59594996E12, 661.0]], "isOverall": false, "label": "14.4.9 - Formulario Cuentas Bancarias-117", "isController": false}, {"data": [[1.59595002E12, 191.5]], "isOverall": false, "label": "15.4.3 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "4.1 - Seleccionar Modulo de Personas-8", "isController": false}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185", "isController": false}, {"data": [[1.59594996E12, 0.0]], "isOverall": false, "label": "14.4.21 - Formulario Cuentas Bancarias-129", "isController": false}, {"data": [[1.59595002E12, 333.0]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182-0", "isController": false}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183", "isController": false}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182-2", "isController": false}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182-1", "isController": false}, {"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "1.2 Se Selecciona Index-2", "isController": false}, {"data": [[1.59594996E12, 159.5]], "isOverall": false, "label": "14.4.25.1 - Tercera Cuenta Bancaria", "isController": false}, {"data": [[1.59594984E12, 270.0]], "isOverall": false, "label": "13.2 - Hacer clic en Crear Relacion-87", "isController": false}, {"data": [[1.59594978E12, 0.0]], "isOverall": false, "label": "7.16 - Formulario Datos de la Persona Seleccionar Genero-29", "isController": false}, {"data": [[1.59594978E12, 225.0]], "isOverall": false, "label": "10.1 - Formulario Domicilio Tipo de direccion-40", "isController": false}, {"data": [[1.59595002E12, 256.5]], "isOverall": false, "label": "15.3.15 - Formulario Campo Perfil PYMES-152", "isController": false}, {"data": [[1.59594996E12, 225.5]], "isOverall": false, "label": "14.4.13 - Formulario Cuentas Bancarias-121", "isController": false}, {"data": [[1.5959499E12, 486.0]], "isOverall": false, "label": "13.5.1 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[1.59594996E12, 20993.0], [1.5959499E12, 454.0]], "isOverall": false, "label": "14.4.6 - Formulario Cuentas Bancarias-114", "isController": false}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "15.3.21 - Formulario Campos Adicionales por otras Actividad-157", "isController": false}, {"data": [[1.59594972E12, 455.0]], "isOverall": false, "label": "3 - Seleccionar en el menu Operaciones del Sistema", "isController": true}, {"data": [[1.59594972E12, 505.5]], "isOverall": false, "label": "6.3 - Presionar boton Nuevo Cliente-13", "isController": false}, {"data": [[1.59595002E12, 409.5]], "isOverall": false, "label": "16 - Presionar el boton Grabar Persona", "isController": true}, {"data": [[1.59594978E12, 496.5]], "isOverall": false, "label": "7.15 - Formulario Datos de la Persona Seleccionar Genero-28", "isController": false}, {"data": [[1.59595002E12, 415.0]], "isOverall": false, "label": "15.5.3 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[1.59594984E12, 456.5]], "isOverall": false, "label": "13.4.6 - Llenar Formulario Relacion -94", "isController": false}, {"data": [[1.59594996E12, 329.0]], "isOverall": false, "label": "15.3.5 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[1.59594996E12, 472.0]], "isOverall": false, "label": "14.4.10 - Formulario Cuentas Bancarias-118", "isController": false}, {"data": [[1.59594972E12, 1073.0]], "isOverall": false, "label": "1.1 Se selecciona Inicio-1", "isController": false}, {"data": [[1.59594996E12, 27379.5]], "isOverall": false, "label": "14.4 - Llenar el Formulario de Cuentas Bancarias", "isController": true}, {"data": [[1.59594996E12, 27923.0]], "isOverall": false, "label": "14 - Seleccionar opcion Cuentas Bancarias ", "isController": true}, {"data": [[1.59595002E12, 6135.0]], "isOverall": false, "label": "15.3 - Llenar Formulario Campos Adicionales", "isController": true}, {"data": [[1.59594978E12, 439.5]], "isOverall": false, "label": "8.3.1 - Formulario Datos de Cliente Grabar-37", "isController": false}, {"data": [[1.59594996E12, 10655.0]], "isOverall": false, "label": "14.4.7 - Formulario Cuentas Bancarias-115", "isController": false}, {"data": [[1.59594984E12, 521.5]], "isOverall": false, "label": " 13.4.8 - Llenar Formulario Relacion -96", "isController": false}, {"data": [[1.59594996E12, 0.0]], "isOverall": false, "label": "14.4.24.1 - Segunda Cuenta Bancaria-132", "isController": false}, {"data": [[1.59594978E12, 192.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-52", "isController": false}, {"data": [[1.59594978E12, 276.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-55", "isController": false}, {"data": [[1.59594996E12, 300.5]], "isOverall": false, "label": "14.4.12 - Formulario Cuentas Bancarias-120", "isController": false}, {"data": [[1.59594996E12, 232.0]], "isOverall": false, "label": "15.3.6 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[1.59594978E12, 199.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-54", "isController": false}, {"data": [[1.59594978E12, 436.5]], "isOverall": false, "label": "7.17 - Formulario Datos de la Persona Fecha de Nacimiento-30", "isController": false}, {"data": [[1.59594978E12, 511.0], [1.59594984E12, 377.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-56", "isController": false}, {"data": [[1.59594984E12, 200.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-59", "isController": false}, {"data": [[1.59594984E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-58", "isController": false}, {"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5-0", "isController": false}, {"data": [[1.59594978E12, 435.5]], "isOverall": false, "label": "7.20.2 - Presionar Grabar Datos de la Persona -34", "isController": false}, {"data": [[1.59594996E12, 167.5]], "isOverall": false, "label": "14.4.22 - Formulario Cuentas Bancarias-130", "isController": false}, {"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5-1", "isController": false}, {"data": [[1.59594984E12, 570.0]], "isOverall": false, "label": "12.1 - Formulario Contactos-82", "isController": false}, {"data": [[1.59594972E12, 664.5]], "isOverall": false, "label": "7.6 - Formulario Datos de la Persona Identificacion-19", "isController": false}, {"data": [[1.59594996E12, 216.0]], "isOverall": false, "label": "15.3.7 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[1.59594984E12, 243.5]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-77", "isController": false}, {"data": [[1.59594984E12, 244.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-78", "isController": false}, {"data": [[1.59594996E12, 222.0]], "isOverall": false, "label": "14.4.8 - Formulario Cuentas Bancarias-116", "isController": false}, {"data": [[1.59594996E12, 224.0]], "isOverall": false, "label": "14.4.23 - Cunenta Bancaria Principal", "isController": true}, {"data": [[1.59594996E12, 0.0]], "isOverall": false, "label": "15.3.4 -  Formulario Campos Adicionales-141", "isController": false}, {"data": [[1.59594996E12, 444.0]], "isOverall": false, "label": "15.3.10 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[1.59594984E12, 0.0]], "isOverall": false, "label": "13.1 - Seleccionar opcion Relacion-86", "isController": false}, {"data": [[1.5959499E12, 312.5]], "isOverall": false, "label": " 13.4.11 - Llenar Formulario Relacion -100", "isController": false}, {"data": [[1.59594984E12, 502.0]], "isOverall": false, "label": "12.2 - Formulario Contactos Correo-83", "isController": false}, {"data": [[1.59594978E12, 0.0]], "isOverall": false, "label": "8.1 - Llenar Formulario Datos de Cliente-35", "isController": false}, {"data": [[1.5959499E12, 480.0]], "isOverall": false, "label": "13.5.2 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[1.59594978E12, 434.0]], "isOverall": false, "label": "7.14 - Formulario Datos de la Persona Seleccionar Ocupacion-27", "isController": false}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "15.3.29 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[1.59595002E12, 452.0]], "isOverall": false, "label": "15.3.18 - Formulario Campo Exoneracion de impuesto-154", "isController": false}, {"data": [[1.59594996E12, 211.5]], "isOverall": false, "label": "15.3.8 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[1.5959499E12, 521.0]], "isOverall": false, "label": "14.4.5 - Formulario Cuentas Bancarias-113", "isController": false}, {"data": [[1.59594996E12, 445.5]], "isOverall": false, "label": "14.4.14 - Formulario Cuentas Bancarias-122", "isController": false}, {"data": [[1.59594984E12, 444.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-75", "isController": false}, {"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[1.59594984E12, 397.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-67", "isController": false}, {"data": [[1.59594984E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-74", "isController": false}, {"data": [[1.59594984E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-76", "isController": false}, {"data": [[1.59594984E12, 392.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-61", "isController": false}, {"data": [[1.59594996E12, 282.0]], "isOverall": false, "label": "14.4.11 - Formulario Cuentas Bancarias-119", "isController": false}, {"data": [[1.59594984E12, 236.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-70", "isController": false}, {"data": [[1.59594984E12, 362.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-73", "isController": false}, {"data": [[1.59594984E12, 167.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-72", "isController": false}, {"data": [[1.59594978E12, 184.5]], "isOverall": false, "label": "10.4 - Formulario Domicilio Venta Provincia Pais de residencia-43", "isController": false}, {"data": [[1.59595002E12, 206.0]], "isOverall": false, "label": "15.4.2 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "16.1 - Presionar el boton Grabar Persona-173", "isController": false}, {"data": [[1.59594978E12, 558.5]], "isOverall": false, "label": "7.10 - Formulario Datos de la Persona Segundo Apellido-23", "isController": false}, {"data": [[1.59594978E12, 571.0]], "isOverall": false, "label": "7.19 - Formulario Datos de la Persona Nacionalidad-32", "isController": false}, {"data": [[1.59594984E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-64", "isController": false}, {"data": [[1.59594978E12, 8699.5]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[1.59594984E12, 421.5]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-63", "isController": false}, {"data": [[1.59594996E12, 206.5]], "isOverall": false, "label": "15.3.14 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[1.59594984E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-66", "isController": false}, {"data": [[1.59594984E12, 329.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-65", "isController": false}, {"data": [[1.59594984E12, 482.0]], "isOverall": false, "label": "13.4.4 - Llenar Formulario Relacion -92", "isController": false}, {"data": [[1.59594984E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-68", "isController": false}, {"data": [[1.59594996E12, 224.0]], "isOverall": false, "label": "14.4.23.1 - Cunenta Bancaria Principal-131", "isController": false}, {"data": [[1.59595002E12, 794.0]], "isOverall": false, "label": "15.5 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[1.59594984E12, 160.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-69", "isController": false}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "17.4 - Presionar el boton Cerrar  Persona--178", "isController": false}, {"data": [[1.59594984E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-60", "isController": false}, {"data": [[1.59595002E12, 0.0]], "isOverall": false, "label": "17.3 - Presionar el boton Cerrar  Persona-", "isController": false}, {"data": [[1.59594984E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-62", "isController": false}, {"data": [[1.59594996E12, 316.0]], "isOverall": false, "label": "15.3.2 -  Formulario Campos Adicionales-139", "isController": false}, {"data": [[1.59594978E12, 250.0]], "isOverall": false, "label": "10.7 - Formulario Domicilio Provincia Pais de residencia-46", "isController": false}, {"data": [[1.59594972E12, 644.0]], "isOverall": false, "label": "7.1 - Se abre Formulario Persona-15", "isController": false}, {"data": [[1.59594978E12, 0.0]], "isOverall": false, "label": "7.13 - Formulario Datos de la Persona Buscar Ocupacion-26", "isController": false}, {"data": [[1.59594978E12, 650.5]], "isOverall": false, "label": "8.2 - Seleccionar Datos de Cliente-36", "isController": false}, {"data": [[1.59594978E12, 248.0]], "isOverall": false, "label": "7.20.1 - Presionar Grabar Datos de la Persona -33", "isController": false}, {"data": [[1.59594978E12, 610.5]], "isOverall": false, "label": "7.9 - Formulario Datos de la Persona Primer Apellido-22", "isController": false}, {"data": [[1.59595002E12, 850.0]], "isOverall": false, "label": "15.4 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[1.59594996E12, 178.0]], "isOverall": false, "label": "15.3.9 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[1.5959499E12, 0.0]], "isOverall": false, "label": "14.4.4 - Formulario Cuentas Bancarias-112", "isController": false}, {"data": [[1.5959499E12, 0.0]], "isOverall": false, "label": "14.1 - Hacer clic en Crear Cuentas Bancarias-106", "isController": false}, {"data": [[1.59594996E12, 0.0]], "isOverall": false, "label": "14.4.15 - Formulario Cuentas Bancarias-123", "isController": false}, {"data": [[1.59594996E12, 268.0]], "isOverall": false, "label": "15.3.12 - Formulario campo Nombre de la Empresa y Nacionalidad-149", "isController": false}, {"data": [[1.59594978E12, 471.0]], "isOverall": false, "label": "8.3.2 - Formulario Datos de Cliente Grabar-38", "isController": false}, {"data": [[1.59595002E12, 435.0]], "isOverall": false, "label": "15.3.24 - Formulario Campo Porcentaje de participacion-160", "isController": false}, {"data": [[1.59594996E12, 0.0]], "isOverall": false, "label": "14.4.20 - Formulario Cuentas Bancarias-128", "isController": false}, {"data": [[1.59594996E12, 166.5]], "isOverall": false, "label": "14.5 - Guardar Cuentas Bancarias", "isController": true}, {"data": [[1.59595002E12, 452.5]], "isOverall": false, "label": "15.4.1 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[1.59594978E12, 0.0]], "isOverall": false, "label": "9.1 - Hacer clic en Crear Domicilio-39", "isController": false}, {"data": [[1.59594996E12, 0.0]], "isOverall": false, "label": "15.3.1 - Formulario Campos Adicionales-138", "isController": false}, {"data": [[1.59595002E12, 409.5]], "isOverall": false, "label": "16.2 - Presionar el boton Grabar Persona-174", "isController": false}, {"data": [[1.59595002E12, 365.5]], "isOverall": false, "label": "15.3.28 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[1.59594996E12, 0.0]], "isOverall": false, "label": "14.4.24 - Segunda Cuenta Bancaria", "isController": true}, {"data": [[1.59594972E12, 217.0]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3-1", "isController": false}, {"data": [[1.59594978E12, 0.0]], "isOverall": false, "label": "9 - Seleccionar Domicilio", "isController": true}, {"data": [[1.5959499E12, 6750.0]], "isOverall": false, "label": "13 - Seleccionar opcion Relacion", "isController": true}, {"data": [[1.59594996E12, 162.0]], "isOverall": false, "label": "14.4.18 - Formulario Cuentas Bancarias-126", "isController": false}, {"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3-0", "isController": false}, {"data": [[1.59594996E12, 355.5]], "isOverall": false, "label": "15.2 - Hacer clic en la opcion Campos Adicionales-137", "isController": false}, {"data": [[1.5959499E12, 564.0]], "isOverall": false, "label": "14.4.1 - Formulario Cuentas Bancarias-109", "isController": false}, {"data": [[1.59595002E12, 395.0]], "isOverall": false, "label": "15.3.26 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[1.59594972E12, 523.0]], "isOverall": false, "label": "5.2 -Hacer clic en la opcion Cliente-10", "isController": false}, {"data": [[1.59594996E12, 160.5]], "isOverall": false, "label": "15.1 - Seleccionar la opcion Campos Adicionales-136", "isController": false}, {"data": [[1.59594978E12, 1561.0]], "isOverall": false, "label": "8 - Llenar Formulario Datos de Cliente", "isController": true}, {"data": [[1.59594984E12, 233.0]], "isOverall": false, "label": "11.2 - Hacer clic en Crear Contactos-80", "isController": false}, {"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "1.2 Se Selecciona Index-2-0", "isController": false}, {"data": [[1.59594972E12, 0.0]], "isOverall": false, "label": "1.2 Se Selecciona Index-2-1", "isController": false}, {"data": [[1.59594978E12, 910.5]], "isOverall": false, "label": "8.3 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[1.59594984E12, 487.5]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio", "isController": true}, {"data": [[1.59594978E12, 405.5]], "isOverall": false, "label": "10.2 - Formulario Domicilio Provincia Pais de residencia-41", "isController": false}, {"data": [[1.59594984E12, 390.0]], "isOverall": false, "label": "12.3.1 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[1.59594984E12, 189.0]], "isOverall": false, "label": "13.4.2 - Llenar Formulario Relacion -90", "isController": false}, {"data": [[1.59594996E12, 539.0]], "isOverall": false, "label": "15.3.11 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[1.59595002E12, 8295.0]], "isOverall": false, "label": "15 - Seleccionar la opcion Campos Adicionales", "isController": true}, {"data": [[1.59594978E12, 245.5]], "isOverall": false, "label": "10.8 - Formulario Domicilio Corregimiento Distrito-47", "isController": false}, {"data": [[1.59594978E12, 254.0]], "isOverall": false, "label": "10.3 - Formulario Domicilio Provincia Pais de residencia-42", "isController": false}, {"data": [[1.59594972E12, 1133.0]], "isOverall": false, "label": "6 - Presionar boton Nuevo Cliente", "isController": true}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59595002E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 91.0, "minX": 1.59594972E12, "maxY": 24883.0, "series": [{"data": [[1.59594996E12, 24883.0], [1.59594978E12, 9573.0], [1.5959499E12, 4921.0], [1.59594972E12, 7618.0], [1.59595002E12, 4498.0], [1.59594984E12, 3245.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.59594996E12, 175.0], [1.59594978E12, 308.0], [1.5959499E12, 887.0], [1.59594972E12, 94.0], [1.59595002E12, 91.0], [1.59594984E12, 314.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.59594996E12, 3295.400000000003], [1.59594978E12, 2960.0], [1.5959499E12, 3948.1000000000004], [1.59594972E12, 3521.0], [1.59595002E12, 2003.3], [1.59594984E12, 2283.6000000000013]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.59594996E12, 24883.0], [1.59594978E12, 9573.0], [1.5959499E12, 4921.0], [1.59594972E12, 7618.0], [1.59595002E12, 4498.0], [1.59594984E12, 3245.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.59594996E12, 5968.599999999998], [1.59594978E12, 3587.9999999999995], [1.5959499E12, 4456.249999999999], [1.59594972E12, 6961.5], [1.59595002E12, 3079.849999999995], [1.59594984E12, 2663.1]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59595002E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 113.0, "minX": 1.0, "maxY": 1921.0, "series": [{"data": [[1.0, 1921.0], [2.0, 1547.0], [4.0, 614.0], [10.0, 260.0], [3.0, 912.5], [12.0, 218.5], [15.0, 113.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 15.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 105.0, "minX": 1.0, "maxY": 1784.0, "series": [{"data": [[1.0, 1784.0], [2.0, 1481.0], [4.0, 564.0], [10.0, 254.0], [3.0, 760.0], [12.0, 113.0], [15.0, 105.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 15.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.5, "minX": 1.59594972E12, "maxY": 1.4166666666666667, "series": [{"data": [[1.59594996E12, 1.2166666666666666], [1.59594978E12, 1.05], [1.5959499E12, 0.5], [1.59594972E12, 0.85], [1.59595002E12, 1.2333333333333334], [1.59594984E12, 1.4166666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59595002E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.1, "minX": 1.59594972E12, "maxY": 1.4166666666666667, "series": [{"data": [[1.59594996E12, 1.2166666666666666], [1.59594978E12, 1.05], [1.5959499E12, 0.5], [1.59594972E12, 0.7166666666666667], [1.59595002E12, 1.1333333333333333], [1.59594984E12, 1.4166666666666667]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.59594972E12, 0.1], [1.59595002E12, 0.13333333333333333]], "isOverall": false, "label": "302", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59595002E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.59594972E12, "maxY": 0.03333333333333333, "series": [{"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-67-success", "isController": false}, {"data": [[1.59594996E12, 0.016666666666666666], [1.5959499E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.6 - Formulario Cuentas Bancarias-114-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "13.4.2 - Llenar Formulario Relacion -90-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "8.1 - Llenar Formulario Datos de Cliente-35-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "1 - Seleccionar Index-success", "isController": true}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.13 - Formulario Cuentas Bancarias-121-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-78-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "17.1 - Presionar el boton Cerrar  Persona-175-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-76-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "7.10 - Formulario Datos de la Persona Segundo Apellido-23-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "7.12 - Formulario Datos de la Persona Buscar Ocupacion-25-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "17 - Presionar el boton Cerrar  Persona-success", "isController": true}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "10.7 - Formulario Domicilio Provincia Pais de residencia-46-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "7.20 - Presionar Grabar Datos de la Persona -success", "isController": true}, {"data": [[1.5959499E12, 0.03333333333333333]], "isOverall": false, "label": "13.5 - Formulario Relacion Guardar-success", "isController": true}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.4 -  Formulario Campos Adicionales-141-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "13.4.6 - Llenar Formulario Relacion -94-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185-1-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.21 - Formulario Campos Adicionales por otras Actividad-157-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15.5.1 - Formulario Campos Adicionales Cerrar-169-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "13.4.1 - Buscar Identificacion -89-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "7.11 - Formulario Datos de la Persona Buscar Ocupacion-24-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182-2-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "7.20.1 - Presionar Grabar Datos de la Persona -33-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.9 - Formulario Campos Adicionales-146-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "12.1 - Formulario Contactos-82-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15 - Seleccionar la opcion Campos Adicionales-success", "isController": true}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "7.14 - Formulario Datos de la Persona Seleccionar Ocupacion-27-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.18 - Formulario Cuentas Bancarias-126-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "16.1 - Presionar el boton Grabar Persona-173-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-73-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.18 - Formulario Campo Exoneracion de impuesto-154-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.20 - Formulario Cuentas Bancarias-128-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "12.3 - Formulario Contactos Guardar-success", "isController": true}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "6.3 - Presionar boton Nuevo Cliente-13-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "1.2 Se Selecciona Index-2-0-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.11 - Formulario Cuentas Bancarias-119-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.24.1 - Segunda Cuenta Bancaria-132-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.27 - Formulario Campos Adicionales-163-success", "isController": false}, {"data": [[1.59594978E12, 0.016666666666666666], [1.59594984E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-56-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "11.1 - Hacer clic en Crear Contactos-79-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.10 - Formulario Campos Adicionales-147-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "3.1 - Seleccionar en el menu Operaciones del Sistema-7-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "4.1 - Seleccionar Modulo de Personas-8-success", "isController": false}, {"data": [[1.5959499E12, 0.016666666666666666], [1.59594984E12, 0.016666666666666666]], "isOverall": false, "label": " 13.4.10 - Llenar Formulario Relacion -99-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.8 - Formulario Cuentas Bancarias-116-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "Transaction Controller-success", "isController": true}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-64-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "1.1 Se selecciona Inicio-1-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15.4.1 - Formulario Campos Adicionales Grabar-166-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "15.1 - Seleccionar la opcion Campos Adicionales-136-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.15 - Formulario Cuentas Bancarias-123-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15.4.3 - Formulario Campos Adicionales Grabar-168-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.16- Formulario Cuentas Bancarias-124-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "10.4 - Formulario Domicilio Venta Provincia Pais de residencia-43-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.6 - Formulario Campos Adicionales-143-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "7.7 - Formulario Persona Digito Verificador y Fecha de Vencimiento-20-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15.5.3 - Formulario Campos Adicionales Cerrar-171-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.5 - Formulario Campos Adicionales-142-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "1.2 Se Selecciona Index-2-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183-1-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.4 - Llenar el Formulario de Cuentas Bancarias-success", "isController": true}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "13.4.3 - Llenar Formulario Relacion -91-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "10.5 - Formulario Domicilio Provincia Pais de residencia-44-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.22 - Formulario Cuentas Bancarias-130-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.25 - Formulario Campos Adicionales-161-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-55-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.9 - Formulario Cuentas Bancarias-117-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "7.18 - Formulario Datos de la Persona Pais-31-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "7.6 - Formulario Datos de la Persona Identificacion-19-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-74-success", "isController": false}, {"data": [[1.5959499E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.4 - Formulario Cuentas Bancarias-112-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "7.5 - Formulario Datos de la Persona Identificacion-18-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-success", "isController": true}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14 - Seleccionar opcion Cuentas Bancarias -success", "isController": true}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "2 - Login-success", "isController": true}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "17.2 - Presionar el boton Cerrar  Persona--176-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.5 - Guardar Cuentas Bancarias-success", "isController": true}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.1 - Formulario Campos Adicionales-138-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "11.3 - Hacer clic en Crear Contactos-81-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "16 - Presionar el boton Grabar Persona-success", "isController": true}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "13.3 - Seleccionar Vinculo Relacion-88-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-65-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.25 - Tercera Cuenta Bancaria-success", "isController": true}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "8.3 - Formulario Datos de Cliente Grabar-success", "isController": true}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.11 - Formulario Campos Adicionales-148-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-58-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "9.1 - Hacer clic en Crear Domicilio-39-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "8.3.2 - Formulario Datos de Cliente Grabar-38-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "13.1 - Seleccionar opcion Relacion-86-success", "isController": false}, {"data": [[1.5959499E12, 0.03333333333333333]], "isOverall": false, "label": "13 - Seleccionar opcion Relacion-success", "isController": true}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "9 - Seleccionar Domicilio-success", "isController": true}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-77-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.15 - Formulario Campo Perfil PYMES-152-success", "isController": false}, {"data": [[1.5959499E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.5 - Formulario Cuentas Bancarias-113-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.5.1 - Guardar Cuentas Bancarias-134-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "10.6 - Formulario Domicilio Provincia Pais de residencia-45-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "13.2 - Hacer clic en Crear Relacion-87-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -97-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.12 - Formulario campo Nombre de la Empresa y Nacionalidad-149-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15.5 - Formulario Campos Adicionales Cerrar-success", "isController": true}, {"data": [[1.5959499E12, 0.03333333333333333]], "isOverall": false, "label": "13.5.1 - Formulario Relacion Guardar-104-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": " 13.4.8 - Llenar Formulario Relacion -96-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-62-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15.4.2 - Formulario Campos Adicionales Grabar-167-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "7.1 - Se abre Formulario Persona-15-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "7.13 - Formulario Datos de la Persona Buscar Ocupacion-26-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.14 - Formulario Campos Adicionales-151-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.26 - Formulario Campos Adicionales-162-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "7.17 - Formulario Datos de la Persona Fecha de Nacimiento-30-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.23.1 - Cunenta Bancaria Principal-131-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3-0-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-success", "isController": true}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-61-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "12.3.2 - Formulario Contactos Guardar-85-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15.5.2 - Formulario Campos Adicionales Cerrar-170-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "7.16 - Formulario Datos de la Persona Seleccionar Genero-29-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "10.3 - Formulario Domicilio Provincia Pais de residencia-42-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.23 - Cunenta Bancaria Principal-success", "isController": true}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "6.4 - Presionar boton Nuevo Cliente-14-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.10 - Formulario Cuentas Bancarias-118-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-72-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182-success", "isController": false}, {"data": [[1.5959499E12, 0.03333333333333333]], "isOverall": false, "label": " 13.4.12 - Llenar Formulario Relacion -101-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "16.2 - Presionar el boton Grabar Persona-174-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.25.1 - Tercera Cuenta Bancaria-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "15.2 - Hacer clic en la opcion Campos Adicionales-137-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.21 - Formulario Cuentas Bancarias-129-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "6 - Presionar boton Nuevo Cliente-success", "isController": true}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": " 13.4.7 - Llenar Formulario Relacion -95-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.22 - Formulario Campos Adicionales-158-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.12 - Formulario Cuentas Bancarias-120-success", "isController": false}, {"data": [[1.59594978E12, 0.016666666666666666], [1.59594972E12, 0.016666666666666666]], "isOverall": false, "label": "7.8 - Formulario Datos de la Persona Nombre-21-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-63-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.23 - Formulario Campo Accionista-159-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.19 - Formulario Cuentas Bancarias-127-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "10.8 - Formulario Domicilio Corregimiento Distrito-47-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.29 - Formulario Campos Adicionales-165-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "13.4.4 - Llenar Formulario Relacion -92-success", "isController": false}, {"data": [[1.59594978E12, 0.016666666666666666], [1.59594984E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-57-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.16 - Formulario Tipo de PYMES-153-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "10.2 - Formulario Domicilio Provincia Pais de residencia-41-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183-0-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.2 -  Formulario Campos Adicionales-139-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "11 - Seleccionar opcion Contactos-success", "isController": true}, {"data": [[1.5959499E12, 0.03333333333333333]], "isOverall": false, "label": " 13.4.11 - Llenar Formulario Relacion -100-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.17 - Formulario Cuentas Bancarias-125-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito Ventana-71-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "8.2 - Seleccionar Datos de Cliente-36-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "7.19 - Formulario Datos de la Persona Nacionalidad-32-success", "isController": false}, {"data": [[1.5959499E12, 0.03333333333333333]], "isOverall": false, "label": " 13.4.13 - Llenar Formulario Relacion Identificacion -102-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-60-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "18 - Presionar el boton Cerrar  Insis-success", "isController": true}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.13 - Formulario Campo Cargo que Ocupa-150-success", "isController": false}, {"data": [[1.5959499E12, 0.03333333333333333]], "isOverall": false, "label": "13.4 - Formulario Relacion Buscar -success", "isController": true}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "5.2 -Hacer clic en la opcion Cliente-10-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.3 -  Formulario Campos Adicionales-140-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-68-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.20 - Formulario Campos Adicionales Actividad Principal-156-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182-1-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185-0-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "6.1 - Presionar boton Nuevo Cliente-11-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "12.2 - Formulario Contactos Correo-83-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-52-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "7.15 - Formulario Datos de la Persona Seleccionar Genero-28-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "13.4.5 - Llenar Formulario Relacion -93-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5-0-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-59-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.19- Formulario Campo Ingresos Anuales-155-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.24 - Segunda Cuenta Bancaria-success", "isController": true}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-70-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15.3 - Llenar Formulario Campos Adicionales-success", "isController": true}, {"data": [[1.5959499E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.3 - Formulario Cuentas Bancarias-111-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "1.2 Se Selecciona Index-2-1-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15.4 - Formulario Campos Adicionales Grabar-success", "isController": true}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182-0-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "3 - Seleccionar en el menu Operaciones del Sistema-success", "isController": true}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "5.1 - Seleccionar en el menu Cliente-9-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -98-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Llenar el Formulario Domicilio-success", "isController": true}, {"data": [[1.5959499E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.1 - Formulario Cuentas Bancarias-109-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "4 - Seleccionar en el menu Modulo de Personas-success", "isController": true}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5-1-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "11.2 - Hacer clic en Crear Contactos-80-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "17.3 - Presionar el boton Cerrar  Persona--success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-69-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.8 - Formulario Campos Adicionales-145-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.5.2 - Guardar Cuentas Bancarias-135-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "8 - Llenar Formulario Datos de Cliente-success", "isController": true}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3-1-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "7.20.2 - Presionar Grabar Datos de la Persona -34-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "12.3.1 - Formulario Contactos Guardar-84-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "12 - Llenar el Formulario de Contactos-success", "isController": true}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "10.1 - Formulario Domicilio Tipo de direccion-40-success", "isController": false}, {"data": [[1.5959499E12, 0.03333333333333333]], "isOverall": false, "label": " 13.4.14 - Llenar Formulario Relacion -103-success", "isController": false}, {"data": [[1.5959499E12, 0.03333333333333333]], "isOverall": false, "label": "13.5.2 - Formulario Relacion Guardar-105-success", "isController": false}, {"data": [[1.5959499E12, 0.03333333333333333]], "isOverall": false, "label": "14.1 - Hacer clic en Crear Cuentas Bancarias-106-success", "isController": false}, {"data": [[1.5959499E12, 0.03333333333333333]], "isOverall": false, "label": "14.2 - Hacer clic en Crear Cuentas Bancarias-107-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.28 - Formulario Campos Adicionales-164-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "17.4 - Presionar el boton Cerrar  Persona--178-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.7 - Formulario Campos Adicionales-144-success", "isController": false}, {"data": [[1.5959499E12, 0.03333333333333333]], "isOverall": false, "label": "14.3 - Hacer clic en Crear Cuentas Bancarias-108-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "7.4 - Formulario Datos de la Persona Identificacion-17-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "7.9 - Formulario Datos de la Persona Primer Apellido-22-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "7.2 - Se abre Formulario Persona-16-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "5 - Seleccionar en el menu Clientes-success", "isController": true}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-75-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito -53-success", "isController": false}, {"data": [[1.5959499E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.2 - Formulario Cuentas Bancarias-110-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "6.2 - Presionar boton Nuevo Cliente-12-success", "isController": false}, {"data": [[1.59594984E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-66-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15.3.24 - Formulario Campo Porcentaje de participacion-160-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-54-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.7 - Formulario Cuentas Bancarias-115-success", "isController": false}, {"data": [[1.59594996E12, 0.03333333333333333]], "isOverall": false, "label": "14.4.14 - Formulario Cuentas Bancarias-122-success", "isController": false}, {"data": [[1.59594978E12, 0.03333333333333333]], "isOverall": false, "label": "8.3.1 - Formulario Datos de Cliente Grabar-37-success", "isController": false}, {"data": [[1.59595002E12, 0.03333333333333333]], "isOverall": false, "label": "15.5.4 - Formulario Campos Adicionales Cerrar-172-success", "isController": false}, {"data": [[1.59594972E12, 0.03333333333333333]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59595002E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.6, "minX": 1.59594972E12, "maxY": 1.5833333333333333, "series": [{"data": [[1.59594996E12, 1.4166666666666667], [1.59594978E12, 1.2166666666666666], [1.5959499E12, 0.6], [1.59594972E12, 1.0166666666666666], [1.59595002E12, 1.5333333333333334], [1.59594984E12, 1.5833333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59595002E12, "title": "Total Transactions Per Second"}},
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
