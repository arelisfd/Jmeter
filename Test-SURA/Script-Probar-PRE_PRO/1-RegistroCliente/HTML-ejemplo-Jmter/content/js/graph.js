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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 1.0, "series": [{"data": [[700.0, 1.0]], "isOverall": false, "label": "1 - Seleccionar Index", "isController": true}, {"data": [[500.0, 1.0]], "isOverall": false, "label": " 13.4.10 - Llenar Formulario Relacion -99", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": " 13.4.7 - Llenar Formulario Relacion -95", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -97", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -98", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": " 13.4.12 - Llenar Formulario Relacion -101", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "7.4 - Formulario Datos de la Persona Identificacion-17", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "6.2 - Presionar boton Nuevo Cliente-12", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "7.12 - Formulario Datos de la Persona Buscar Ocupacion-25", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "15.3.3 -  Formulario Campos Adicionales-140", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "14.4.19 - Formulario Cuentas Bancarias-127", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "4 - Seleccionar en el menu Modulo de Personas", "isController": true}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "5 - Seleccionar en el menu Clientes", "isController": true}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "10.5 - Formulario Domicilio Provincia Pais de residencia-44", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "15.3.22 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "13.4.3 - Llenar Formulario Relacion -91", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "13.4.5 - Llenar Formulario Relacion -93", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "10.6 - Formulario Domicilio Provincia Pais de residencia-45", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "12.3 - Formulario Contactos Guardar", "isController": true}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "14.5.1 - Guardar Cuentas Bancarias-134", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "15.3.20 - Formulario Campos Adicionales Actividad Principal-156", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "15.3.23 - Formulario Campo Accionista-159", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "15.3.25 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "6.1 - Presionar boton Nuevo Cliente-11", "isController": false}, {"data": [[7500.0, 1.0]], "isOverall": false, "label": "13.4 - Formulario Relacion Buscar ", "isController": true}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "13.4.1 - Buscar Identificacion -89", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": " 13.4.13 - Llenar Formulario Relacion Identificacion -102", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito Ventana-71", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": " 13.4.14 - Llenar Formulario Relacion -103", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "6.4 - Presionar boton Nuevo Cliente-14", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "14.4.25 - Tercera Cuenta Bancaria", "isController": true}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "15.5.1 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "14.5.2 - Guardar Cuentas Bancarias-135", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "7.7 - Formulario Persona Digito Verificador y Fecha de Vencimiento-20", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "11.3 - Hacer clic en Crear Contactos-81", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "14.3 - Hacer clic en Crear Cuentas Bancarias-108", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "7.2 - Se abre Formulario Persona-16", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "14.4.2 - Formulario Cuentas Bancarias-110", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "12.3.2 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "14.4.17 - Formulario Cuentas Bancarias-125", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "18 - Presionar el boton Cerrar  Insis", "isController": true}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "17.2 - Presionar el boton Cerrar  Persona--176", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito -53", "isController": false}, {"data": [[1700.0, 1.0]], "isOverall": false, "label": "17 - Presionar el boton Cerrar  Persona", "isController": true}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "7.8 - Formulario Datos de la Persona Nombre-21", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "11.1 - Hacer clic en Crear Contactos-79", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "15.3.27 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "14.4.3 - Formulario Cuentas Bancarias-111", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "14.2 - Hacer clic en Crear Cuentas Bancarias-107", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "17.1 - Presionar el boton Cerrar  Persona-175", "isController": false}, {"data": [[17400.0, 1.0]], "isOverall": false, "label": "10 - Llenar el Formulario Domicilio", "isController": true}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "5.1 - Seleccionar en el menu Cliente-9", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "7.5 - Formulario Datos de la Persona Identificacion-18", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "15.3.13 - Formulario Campo Cargo que Ocupa-150", "isController": false}, {"data": [[1600.0, 1.0]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "3.1 - Seleccionar en el menu Operaciones del Sistema-7", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "7.11 - Formulario Datos de la Persona Buscar Ocupacion-24", "isController": false}, {"data": [[104100.0, 1.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "14.4.16- Formulario Cuentas Bancarias-124", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "15.5.4 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "15.3.16 - Formulario Tipo de PYMES-153", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "13.3 - Seleccionar Vinculo Relacion-88", "isController": false}, {"data": [[18400.0, 1.0]], "isOverall": false, "label": "13.5 - Formulario Relacion Guardar", "isController": true}, {"data": [[1800.0, 1.0]], "isOverall": false, "label": "12 - Llenar el Formulario de Contactos", "isController": true}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "11 - Seleccionar opcion Contactos", "isController": true}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-57", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "7.18 - Formulario Datos de la Persona Pais-31", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "15.5.2 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "7.20 - Presionar Grabar Datos de la Persona ", "isController": true}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "15.3.19- Formulario Campo Ingresos Anuales-155", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "14.4.9 - Formulario Cuentas Bancarias-117", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "15.4.3 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "4.1 - Seleccionar Modulo de Personas-8", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "14.4.21 - Formulario Cuentas Bancarias-129", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "1.2 Se Selecciona Index-2", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "14.4.25.1 - Tercera Cuenta Bancaria", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "13.2 - Hacer clic en Crear Relacion-87", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "7.16 - Formulario Datos de la Persona Seleccionar Genero-29", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "10.1 - Formulario Domicilio Tipo de direccion-40", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "15.3.15 - Formulario Campo Perfil PYMES-152", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "14.4.13 - Formulario Cuentas Bancarias-121", "isController": false}, {"data": [[17600.0, 1.0]], "isOverall": false, "label": "13.5.1 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "14.4.6 - Formulario Cuentas Bancarias-114", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "15.3.21 - Formulario Campos Adicionales por otras Actividad-157", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "3 - Seleccionar en el menu Operaciones del Sistema", "isController": true}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "6.3 - Presionar boton Nuevo Cliente-13", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "16 - Presionar el boton Grabar Persona", "isController": true}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "7.15 - Formulario Datos de la Persona Seleccionar Genero-28", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "15.5.3 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "13.4.6 - Llenar Formulario Relacion -94", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "15.3.5 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "14.4.10 - Formulario Cuentas Bancarias-118", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "1.1 Se selecciona Inicio-1", "isController": false}, {"data": [[11500.0, 1.0]], "isOverall": false, "label": "14.4 - Llenar el Formulario de Cuentas Bancarias", "isController": true}, {"data": [[14700.0, 1.0]], "isOverall": false, "label": "14 - Seleccionar opcion Cuentas Bancarias ", "isController": true}, {"data": [[16000.0, 1.0]], "isOverall": false, "label": "15.3 - Llenar Formulario Campos Adicionales", "isController": true}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "8.3.1 - Formulario Datos de Cliente Grabar-37", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "14.4.7 - Formulario Cuentas Bancarias-115", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": " 13.4.8 - Llenar Formulario Relacion -96", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "14.4.24.1 - Segunda Cuenta Bancaria-132", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-52", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-55", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "14.4.12 - Formulario Cuentas Bancarias-120", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "15.3.6 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-54", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "7.17 - Formulario Datos de la Persona Fecha de Nacimiento-30", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-56", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-59", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-58", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "7.20.2 - Presionar Grabar Datos de la Persona -34", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "14.4.22 - Formulario Cuentas Bancarias-130", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "12.1 - Formulario Contactos-82", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "7.6 - Formulario Datos de la Persona Identificacion-19", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "15.3.7 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-77", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-78", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "14.4.8 - Formulario Cuentas Bancarias-116", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "14.4.23 - Cunenta Bancaria Principal", "isController": true}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "15.3.4 -  Formulario Campos Adicionales-141", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "15.3.10 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "13.1 - Seleccionar opcion Relacion-86", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": " 13.4.11 - Llenar Formulario Relacion -100", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "12.2 - Formulario Contactos Correo-83", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "8.1 - Llenar Formulario Datos de Cliente-35", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "13.5.2 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "7.14 - Formulario Datos de la Persona Seleccionar Ocupacion-27", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "15.3.29 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "15.3.18 - Formulario Campo Exoneracion de impuesto-154", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "15.3.8 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "14.4.5 - Formulario Cuentas Bancarias-113", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "14.4.14 - Formulario Cuentas Bancarias-122", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-75", "isController": false}, {"data": [[1900.0, 1.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-67", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-74", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-76", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-61", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "14.4.11 - Formulario Cuentas Bancarias-119", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-70", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-73", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-72", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "10.4 - Formulario Domicilio Venta Provincia Pais de residencia-43", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "15.4.2 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "16.1 - Presionar el boton Grabar Persona-173", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "7.10 - Formulario Datos de la Persona Segundo Apellido-23", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "7.19 - Formulario Datos de la Persona Nacionalidad-32", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-64", "isController": false}, {"data": [[9100.0, 1.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-63", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "15.3.14 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-66", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-65", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "13.4.4 - Llenar Formulario Relacion -92", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-68", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "14.4.23.1 - Cunenta Bancaria Principal-131", "isController": false}, {"data": [[1800.0, 1.0]], "isOverall": false, "label": "15.5 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-69", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "17.4 - Presionar el boton Cerrar  Persona--178", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-60", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "17.3 - Presionar el boton Cerrar  Persona-", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-62", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "15.3.2 -  Formulario Campos Adicionales-139", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "10.7 - Formulario Domicilio Provincia Pais de residencia-46", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "7.1 - Se abre Formulario Persona-15", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "7.13 - Formulario Datos de la Persona Buscar Ocupacion-26", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "8.2 - Seleccionar Datos de Cliente-36", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "7.20.1 - Presionar Grabar Datos de la Persona -33", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "7.9 - Formulario Datos de la Persona Primer Apellido-22", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "15.4 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "15.3.9 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "14.4.4 - Formulario Cuentas Bancarias-112", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "14.1 - Hacer clic en Crear Cuentas Bancarias-106", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "14.4.15 - Formulario Cuentas Bancarias-123", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "15.3.12 - Formulario campo Nombre de la Empresa y Nacionalidad-149", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "8.3.2 - Formulario Datos de Cliente Grabar-38", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "15.3.24 - Formulario Campo Porcentaje de participacion-160", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "14.4.20 - Formulario Cuentas Bancarias-128", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "14.5 - Guardar Cuentas Bancarias", "isController": true}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "15.4.1 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "9.1 - Hacer clic en Crear Domicilio-39", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "15.3.1 - Formulario Campos Adicionales-138", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "16.2 - Presionar el boton Grabar Persona-174", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "15.3.28 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "14.4.24 - Segunda Cuenta Bancaria", "isController": true}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "9 - Seleccionar Domicilio", "isController": true}, {"data": [[27600.0, 1.0]], "isOverall": false, "label": "13 - Seleccionar opcion Relacion", "isController": true}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "14.4.18 - Formulario Cuentas Bancarias-126", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "15.2 - Hacer clic en la opcion Campos Adicionales-137", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "14.4.1 - Formulario Cuentas Bancarias-109", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "15.3.26 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "5.2 -Hacer clic en la opcion Cliente-10", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "15.1 - Seleccionar la opcion Campos Adicionales-136", "isController": false}, {"data": [[1900.0, 1.0]], "isOverall": false, "label": "8 - Llenar Formulario Datos de Cliente", "isController": true}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "11.2 - Hacer clic en Crear Contactos-80", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "8.3 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio", "isController": true}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "10.2 - Formulario Domicilio Provincia Pais de residencia-41", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "12.3.1 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "13.4.2 - Llenar Formulario Relacion -90", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "15.3.11 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[20000.0, 1.0]], "isOverall": false, "label": "15 - Seleccionar la opcion Campos Adicionales", "isController": true}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "10.8 - Formulario Domicilio Corregimiento Distrito-47", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "10.3 - Formulario Domicilio Provincia Pais de residencia-42", "isController": false}, {"data": [[2000.0, 1.0]], "isOverall": false, "label": "6 - Presionar boton Nuevo Cliente", "isController": true}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 104100.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 2.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 109.0, "series": [{"data": [[0.0, 109.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 61.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 2.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 4.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.59719202E12, "maxY": 1.0, "series": [{"data": [[1.59719202E12, 1.0], [1.59719214E12, 1.0], [1.59719208E12, 1.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59719214E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 3.0, "minX": 1.0, "maxY": 104114.0, "series": [{"data": [[1.0, 742.0]], "isOverall": false, "label": "1 - Seleccionar Index", "isController": true}, {"data": [[1.0, 742.0]], "isOverall": false, "label": "1 - Seleccionar Index-Aggregated", "isController": true}, {"data": [[1.0, 504.0]], "isOverall": false, "label": " 13.4.10 - Llenar Formulario Relacion -99", "isController": false}, {"data": [[1.0, 504.0]], "isOverall": false, "label": " 13.4.10 - Llenar Formulario Relacion -99-Aggregated", "isController": false}, {"data": [[1.0, 535.0]], "isOverall": false, "label": " 13.4.7 - Llenar Formulario Relacion -95", "isController": false}, {"data": [[1.0, 535.0]], "isOverall": false, "label": " 13.4.7 - Llenar Formulario Relacion -95-Aggregated", "isController": false}, {"data": [[1.0, 516.0]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -97", "isController": false}, {"data": [[1.0, 516.0]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -97-Aggregated", "isController": false}, {"data": [[1.0, 405.0]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -98", "isController": false}, {"data": [[1.0, 405.0]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -98-Aggregated", "isController": false}, {"data": [[1.0, 450.0]], "isOverall": false, "label": " 13.4.12 - Llenar Formulario Relacion -101", "isController": false}, {"data": [[1.0, 450.0]], "isOverall": false, "label": " 13.4.12 - Llenar Formulario Relacion -101-Aggregated", "isController": false}, {"data": [[1.0, 445.0]], "isOverall": false, "label": "7.4 - Formulario Datos de la Persona Identificacion-17", "isController": false}, {"data": [[1.0, 445.0]], "isOverall": false, "label": "7.4 - Formulario Datos de la Persona Identificacion-17-Aggregated", "isController": false}, {"data": [[1.0, 419.0]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182", "isController": false}, {"data": [[1.0, 419.0]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182-Aggregated", "isController": false}, {"data": [[1.0, 823.0]], "isOverall": false, "label": "6.2 - Presionar boton Nuevo Cliente-12", "isController": false}, {"data": [[1.0, 823.0]], "isOverall": false, "label": "6.2 - Presionar boton Nuevo Cliente-12-Aggregated", "isController": false}, {"data": [[1.0, 371.0]], "isOverall": false, "label": "7.12 - Formulario Datos de la Persona Buscar Ocupacion-25", "isController": false}, {"data": [[1.0, 371.0]], "isOverall": false, "label": "7.12 - Formulario Datos de la Persona Buscar Ocupacion-25-Aggregated", "isController": false}, {"data": [[1.0, 628.0]], "isOverall": false, "label": "15.3.3 -  Formulario Campos Adicionales-140", "isController": false}, {"data": [[1.0, 628.0]], "isOverall": false, "label": "15.3.3 -  Formulario Campos Adicionales-140-Aggregated", "isController": false}, {"data": [[1.0, 445.0]], "isOverall": false, "label": "14.4.19 - Formulario Cuentas Bancarias-127", "isController": false}, {"data": [[1.0, 445.0]], "isOverall": false, "label": "14.4.19 - Formulario Cuentas Bancarias-127-Aggregated", "isController": false}, {"data": [[1.0, 121.0]], "isOverall": false, "label": "4 - Seleccionar en el menu Modulo de Personas", "isController": true}, {"data": [[1.0, 121.0]], "isOverall": false, "label": "4 - Seleccionar en el menu Modulo de Personas-Aggregated", "isController": true}, {"data": [[1.0, 958.0]], "isOverall": false, "label": "5 - Seleccionar en el menu Clientes", "isController": true}, {"data": [[1.0, 958.0]], "isOverall": false, "label": "5 - Seleccionar en el menu Clientes-Aggregated", "isController": true}, {"data": [[1.0, 470.0]], "isOverall": false, "label": "10.5 - Formulario Domicilio Provincia Pais de residencia-44", "isController": false}, {"data": [[1.0, 470.0]], "isOverall": false, "label": "10.5 - Formulario Domicilio Provincia Pais de residencia-44-Aggregated", "isController": false}, {"data": [[1.0, 403.0]], "isOverall": false, "label": "15.3.22 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[1.0, 403.0]], "isOverall": false, "label": "15.3.22 - Formulario Campos Adicionales-158-Aggregated", "isController": false}, {"data": [[1.0, 447.0]], "isOverall": false, "label": "13.4.3 - Llenar Formulario Relacion -91", "isController": false}, {"data": [[1.0, 447.0]], "isOverall": false, "label": "13.4.3 - Llenar Formulario Relacion -91-Aggregated", "isController": false}, {"data": [[1.0, 452.0]], "isOverall": false, "label": "13.4.5 - Llenar Formulario Relacion -93", "isController": false}, {"data": [[1.0, 452.0]], "isOverall": false, "label": "13.4.5 - Llenar Formulario Relacion -93-Aggregated", "isController": false}, {"data": [[1.0, 330.0]], "isOverall": false, "label": "10.6 - Formulario Domicilio Provincia Pais de residencia-45", "isController": false}, {"data": [[1.0, 330.0]], "isOverall": false, "label": "10.6 - Formulario Domicilio Provincia Pais de residencia-45-Aggregated", "isController": false}, {"data": [[1.0, 738.0]], "isOverall": false, "label": "12.3 - Formulario Contactos Guardar", "isController": true}, {"data": [[1.0, 738.0]], "isOverall": false, "label": "12.3 - Formulario Contactos Guardar-Aggregated", "isController": true}, {"data": [[1.0, 361.0]], "isOverall": false, "label": "14.5.1 - Guardar Cuentas Bancarias-134", "isController": false}, {"data": [[1.0, 361.0]], "isOverall": false, "label": "14.5.1 - Guardar Cuentas Bancarias-134-Aggregated", "isController": false}, {"data": [[1.0, 509.0]], "isOverall": false, "label": "15.3.20 - Formulario Campos Adicionales Actividad Principal-156", "isController": false}, {"data": [[1.0, 509.0]], "isOverall": false, "label": "15.3.20 - Formulario Campos Adicionales Actividad Principal-156-Aggregated", "isController": false}, {"data": [[1.0, 838.0]], "isOverall": false, "label": "15.3.23 - Formulario Campo Accionista-159", "isController": false}, {"data": [[1.0, 838.0]], "isOverall": false, "label": "15.3.23 - Formulario Campo Accionista-159-Aggregated", "isController": false}, {"data": [[1.0, 466.0]], "isOverall": false, "label": "15.3.25 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[1.0, 466.0]], "isOverall": false, "label": "15.3.25 - Formulario Campos Adicionales-161-Aggregated", "isController": false}, {"data": [[1.0, 733.0]], "isOverall": false, "label": "6.1 - Presionar boton Nuevo Cliente-11", "isController": false}, {"data": [[1.0, 733.0]], "isOverall": false, "label": "6.1 - Presionar boton Nuevo Cliente-11-Aggregated", "isController": false}, {"data": [[1.0, 7583.0]], "isOverall": false, "label": "13.4 - Formulario Relacion Buscar ", "isController": true}, {"data": [[1.0, 7583.0]], "isOverall": false, "label": "13.4 - Formulario Relacion Buscar -Aggregated", "isController": true}, {"data": [[1.0, 428.0]], "isOverall": false, "label": "13.4.1 - Buscar Identificacion -89", "isController": false}, {"data": [[1.0, 428.0]], "isOverall": false, "label": "13.4.1 - Buscar Identificacion -89-Aggregated", "isController": false}, {"data": [[1.0, 444.0]], "isOverall": false, "label": " 13.4.13 - Llenar Formulario Relacion Identificacion -102", "isController": false}, {"data": [[1.0, 444.0]], "isOverall": false, "label": " 13.4.13 - Llenar Formulario Relacion Identificacion -102-Aggregated", "isController": false}, {"data": [[1.0, 173.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito Ventana-71", "isController": false}, {"data": [[1.0, 173.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito Ventana-71-Aggregated", "isController": false}, {"data": [[1.0, 355.0]], "isOverall": false, "label": " 13.4.14 - Llenar Formulario Relacion -103", "isController": false}, {"data": [[1.0, 355.0]], "isOverall": false, "label": " 13.4.14 - Llenar Formulario Relacion -103-Aggregated", "isController": false}, {"data": [[1.0, 321.0]], "isOverall": false, "label": "6.4 - Presionar boton Nuevo Cliente-14", "isController": false}, {"data": [[1.0, 321.0]], "isOverall": false, "label": "6.4 - Presionar boton Nuevo Cliente-14-Aggregated", "isController": false}, {"data": [[1.0, 408.0]], "isOverall": false, "label": "14.4.25 - Tercera Cuenta Bancaria", "isController": true}, {"data": [[1.0, 408.0]], "isOverall": false, "label": "14.4.25 - Tercera Cuenta Bancaria-Aggregated", "isController": true}, {"data": [[1.0, 438.0]], "isOverall": false, "label": "15.5.1 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[1.0, 438.0]], "isOverall": false, "label": "15.5.1 - Formulario Campos Adicionales Cerrar-169-Aggregated", "isController": false}, {"data": [[1.0, 639.0]], "isOverall": false, "label": "14.5.2 - Guardar Cuentas Bancarias-135", "isController": false}, {"data": [[1.0, 639.0]], "isOverall": false, "label": "14.5.2 - Guardar Cuentas Bancarias-135-Aggregated", "isController": false}, {"data": [[1.0, 404.0]], "isOverall": false, "label": "7.7 - Formulario Persona Digito Verificador y Fecha de Vencimiento-20", "isController": false}, {"data": [[1.0, 404.0]], "isOverall": false, "label": "7.7 - Formulario Persona Digito Verificador y Fecha de Vencimiento-20-Aggregated", "isController": false}, {"data": [[1.0, 471.0]], "isOverall": false, "label": "11.3 - Hacer clic en Crear Contactos-81", "isController": false}, {"data": [[1.0, 471.0]], "isOverall": false, "label": "11.3 - Hacer clic en Crear Contactos-81-Aggregated", "isController": false}, {"data": [[1.0, 439.0]], "isOverall": false, "label": "14.3 - Hacer clic en Crear Cuentas Bancarias-108", "isController": false}, {"data": [[1.0, 439.0]], "isOverall": false, "label": "14.3 - Hacer clic en Crear Cuentas Bancarias-108-Aggregated", "isController": false}, {"data": [[1.0, 314.0]], "isOverall": false, "label": "7.2 - Se abre Formulario Persona-16", "isController": false}, {"data": [[1.0, 314.0]], "isOverall": false, "label": "7.2 - Se abre Formulario Persona-16-Aggregated", "isController": false}, {"data": [[1.0, 373.0]], "isOverall": false, "label": "14.4.2 - Formulario Cuentas Bancarias-110", "isController": false}, {"data": [[1.0, 373.0]], "isOverall": false, "label": "14.4.2 - Formulario Cuentas Bancarias-110-Aggregated", "isController": false}, {"data": [[1.0, 185.0]], "isOverall": false, "label": "12.3.2 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[1.0, 185.0]], "isOverall": false, "label": "12.3.2 - Formulario Contactos Guardar-85-Aggregated", "isController": false}, {"data": [[1.0, 420.0]], "isOverall": false, "label": "14.4.17 - Formulario Cuentas Bancarias-125", "isController": false}, {"data": [[1.0, 420.0]], "isOverall": false, "label": "14.4.17 - Formulario Cuentas Bancarias-125-Aggregated", "isController": false}, {"data": [[1.0, 824.0]], "isOverall": false, "label": "18 - Presionar el boton Cerrar  Insis", "isController": true}, {"data": [[1.0, 824.0]], "isOverall": false, "label": "18 - Presionar el boton Cerrar  Insis-Aggregated", "isController": true}, {"data": [[1.0, 250.0]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3", "isController": false}, {"data": [[1.0, 250.0]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3-Aggregated", "isController": false}, {"data": [[1.0, 828.0]], "isOverall": false, "label": "17.2 - Presionar el boton Cerrar  Persona--176", "isController": false}, {"data": [[1.0, 828.0]], "isOverall": false, "label": "17.2 - Presionar el boton Cerrar  Persona--176-Aggregated", "isController": false}, {"data": [[1.0, 395.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito -53", "isController": false}, {"data": [[1.0, 395.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito -53-Aggregated", "isController": false}, {"data": [[1.0, 1712.0]], "isOverall": false, "label": "17 - Presionar el boton Cerrar  Persona", "isController": true}, {"data": [[1.0, 1712.0]], "isOverall": false, "label": "17 - Presionar el boton Cerrar  Persona-Aggregated", "isController": true}, {"data": [[1.0, 299.0]], "isOverall": false, "label": "7.8 - Formulario Datos de la Persona Nombre-21", "isController": false}, {"data": [[1.0, 299.0]], "isOverall": false, "label": "7.8 - Formulario Datos de la Persona Nombre-21-Aggregated", "isController": false}, {"data": [[1.0, 608.0]], "isOverall": false, "label": "11.1 - Hacer clic en Crear Contactos-79", "isController": false}, {"data": [[1.0, 608.0]], "isOverall": false, "label": "11.1 - Hacer clic en Crear Contactos-79-Aggregated", "isController": false}, {"data": [[1.0, 788.0]], "isOverall": false, "label": "15.3.27 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[1.0, 788.0]], "isOverall": false, "label": "15.3.27 - Formulario Campos Adicionales-163-Aggregated", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "14.4.3 - Formulario Cuentas Bancarias-111", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "14.4.3 - Formulario Cuentas Bancarias-111-Aggregated", "isController": false}, {"data": [[1.0, 538.0]], "isOverall": false, "label": "14.2 - Hacer clic en Crear Cuentas Bancarias-107", "isController": false}, {"data": [[1.0, 538.0]], "isOverall": false, "label": "14.2 - Hacer clic en Crear Cuentas Bancarias-107-Aggregated", "isController": false}, {"data": [[1.0, 587.0]], "isOverall": false, "label": "17.1 - Presionar el boton Cerrar  Persona-175", "isController": false}, {"data": [[1.0, 587.0]], "isOverall": false, "label": "17.1 - Presionar el boton Cerrar  Persona-175-Aggregated", "isController": false}, {"data": [[1.0, 17431.0]], "isOverall": false, "label": "10 - Llenar el Formulario Domicilio", "isController": true}, {"data": [[1.0, 17431.0]], "isOverall": false, "label": "10 - Llenar el Formulario Domicilio-Aggregated", "isController": true}, {"data": [[1.0, 813.0]], "isOverall": false, "label": "5.1 - Seleccionar en el menu Cliente-9", "isController": false}, {"data": [[1.0, 813.0]], "isOverall": false, "label": "5.1 - Seleccionar en el menu Cliente-9-Aggregated", "isController": false}, {"data": [[1.0, 879.0]], "isOverall": false, "label": "7.5 - Formulario Datos de la Persona Identificacion-18", "isController": false}, {"data": [[1.0, 879.0]], "isOverall": false, "label": "7.5 - Formulario Datos de la Persona Identificacion-18-Aggregated", "isController": false}, {"data": [[1.0, 580.0]], "isOverall": false, "label": "15.3.13 - Formulario Campo Cargo que Ocupa-150", "isController": false}, {"data": [[1.0, 580.0]], "isOverall": false, "label": "15.3.13 - Formulario Campo Cargo que Ocupa-150-Aggregated", "isController": false}, {"data": [[1.0, 1690.0]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5", "isController": false}, {"data": [[1.0, 1690.0]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5-Aggregated", "isController": false}, {"data": [[1.0, 544.0]], "isOverall": false, "label": "3.1 - Seleccionar en el menu Operaciones del Sistema-7", "isController": false}, {"data": [[1.0, 544.0]], "isOverall": false, "label": "3.1 - Seleccionar en el menu Operaciones del Sistema-7-Aggregated", "isController": false}, {"data": [[1.0, 471.0]], "isOverall": false, "label": "7.11 - Formulario Datos de la Persona Buscar Ocupacion-24", "isController": false}, {"data": [[1.0, 471.0]], "isOverall": false, "label": "7.11 - Formulario Datos de la Persona Buscar Ocupacion-24-Aggregated", "isController": false}, {"data": [[1.0, 104114.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.0, 104114.0]], "isOverall": false, "label": "Transaction Controller-Aggregated", "isController": true}, {"data": [[1.0, 364.0]], "isOverall": false, "label": "14.4.16- Formulario Cuentas Bancarias-124", "isController": false}, {"data": [[1.0, 364.0]], "isOverall": false, "label": "14.4.16- Formulario Cuentas Bancarias-124-Aggregated", "isController": false}, {"data": [[1.0, 701.0]], "isOverall": false, "label": "15.5.4 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[1.0, 701.0]], "isOverall": false, "label": "15.5.4 - Formulario Campos Adicionales Cerrar-172-Aggregated", "isController": false}, {"data": [[1.0, 689.0]], "isOverall": false, "label": "15.3.16 - Formulario Tipo de PYMES-153", "isController": false}, {"data": [[1.0, 689.0]], "isOverall": false, "label": "15.3.16 - Formulario Tipo de PYMES-153-Aggregated", "isController": false}, {"data": [[1.0, 604.0]], "isOverall": false, "label": "13.3 - Seleccionar Vinculo Relacion-88", "isController": false}, {"data": [[1.0, 604.0]], "isOverall": false, "label": "13.3 - Seleccionar Vinculo Relacion-88-Aggregated", "isController": false}, {"data": [[1.0, 18419.0]], "isOverall": false, "label": "13.5 - Formulario Relacion Guardar", "isController": true}, {"data": [[1.0, 18419.0]], "isOverall": false, "label": "13.5 - Formulario Relacion Guardar-Aggregated", "isController": true}, {"data": [[1.0, 1819.0]], "isOverall": false, "label": "12 - Llenar el Formulario de Contactos", "isController": true}, {"data": [[1.0, 1819.0]], "isOverall": false, "label": "12 - Llenar el Formulario de Contactos-Aggregated", "isController": true}, {"data": [[1.0, 1258.0]], "isOverall": false, "label": "11 - Seleccionar opcion Contactos", "isController": true}, {"data": [[1.0, 1258.0]], "isOverall": false, "label": "11 - Seleccionar opcion Contactos-Aggregated", "isController": true}, {"data": [[1.0, 170.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-57", "isController": false}, {"data": [[1.0, 170.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-57-Aggregated", "isController": false}, {"data": [[1.0, 369.0]], "isOverall": false, "label": "7.18 - Formulario Datos de la Persona Pais-31", "isController": false}, {"data": [[1.0, 369.0]], "isOverall": false, "label": "7.18 - Formulario Datos de la Persona Pais-31-Aggregated", "isController": false}, {"data": [[1.0, 372.0]], "isOverall": false, "label": "15.5.2 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[1.0, 372.0]], "isOverall": false, "label": "15.5.2 - Formulario Campos Adicionales Cerrar-170-Aggregated", "isController": false}, {"data": [[1.0, 1265.0]], "isOverall": false, "label": "7.20 - Presionar Grabar Datos de la Persona ", "isController": true}, {"data": [[1.0, 1265.0]], "isOverall": false, "label": "7.20 - Presionar Grabar Datos de la Persona -Aggregated", "isController": true}, {"data": [[1.0, 901.0]], "isOverall": false, "label": "15.3.19- Formulario Campo Ingresos Anuales-155", "isController": false}, {"data": [[1.0, 901.0]], "isOverall": false, "label": "15.3.19- Formulario Campo Ingresos Anuales-155-Aggregated", "isController": false}, {"data": [[1.0, 765.0]], "isOverall": false, "label": "14.4.9 - Formulario Cuentas Bancarias-117", "isController": false}, {"data": [[1.0, 765.0]], "isOverall": false, "label": "14.4.9 - Formulario Cuentas Bancarias-117-Aggregated", "isController": false}, {"data": [[1.0, 451.0]], "isOverall": false, "label": "15.4.3 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[1.0, 451.0]], "isOverall": false, "label": "15.4.3 - Formulario Campos Adicionales Grabar-168-Aggregated", "isController": false}, {"data": [[1.0, 121.0]], "isOverall": false, "label": "4.1 - Seleccionar Modulo de Personas-8", "isController": false}, {"data": [[1.0, 121.0]], "isOverall": false, "label": "4.1 - Seleccionar Modulo de Personas-8-Aggregated", "isController": false}, {"data": [[1.0, 217.0]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185", "isController": false}, {"data": [[1.0, 217.0]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185-Aggregated", "isController": false}, {"data": [[1.0, 435.0]], "isOverall": false, "label": "14.4.21 - Formulario Cuentas Bancarias-129", "isController": false}, {"data": [[1.0, 435.0]], "isOverall": false, "label": "14.4.21 - Formulario Cuentas Bancarias-129-Aggregated", "isController": false}, {"data": [[1.0, 188.0]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183", "isController": false}, {"data": [[1.0, 188.0]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183-Aggregated", "isController": false}, {"data": [[1.0, 257.0]], "isOverall": false, "label": "1.2 Se Selecciona Index-2", "isController": false}, {"data": [[1.0, 257.0]], "isOverall": false, "label": "1.2 Se Selecciona Index-2-Aggregated", "isController": false}, {"data": [[1.0, 408.0]], "isOverall": false, "label": "14.4.25.1 - Tercera Cuenta Bancaria", "isController": false}, {"data": [[1.0, 408.0]], "isOverall": false, "label": "14.4.25.1 - Tercera Cuenta Bancaria-Aggregated", "isController": false}, {"data": [[1.0, 510.0]], "isOverall": false, "label": "13.2 - Hacer clic en Crear Relacion-87", "isController": false}, {"data": [[1.0, 510.0]], "isOverall": false, "label": "13.2 - Hacer clic en Crear Relacion-87-Aggregated", "isController": false}, {"data": [[1.0, 296.0]], "isOverall": false, "label": "7.16 - Formulario Datos de la Persona Seleccionar Genero-29", "isController": false}, {"data": [[1.0, 296.0]], "isOverall": false, "label": "7.16 - Formulario Datos de la Persona Seleccionar Genero-29-Aggregated", "isController": false}, {"data": [[1.0, 641.0]], "isOverall": false, "label": "10.1 - Formulario Domicilio Tipo de direccion-40", "isController": false}, {"data": [[1.0, 641.0]], "isOverall": false, "label": "10.1 - Formulario Domicilio Tipo de direccion-40-Aggregated", "isController": false}, {"data": [[1.0, 857.0]], "isOverall": false, "label": "15.3.15 - Formulario Campo Perfil PYMES-152", "isController": false}, {"data": [[1.0, 857.0]], "isOverall": false, "label": "15.3.15 - Formulario Campo Perfil PYMES-152-Aggregated", "isController": false}, {"data": [[1.0, 808.0]], "isOverall": false, "label": "14.4.13 - Formulario Cuentas Bancarias-121", "isController": false}, {"data": [[1.0, 808.0]], "isOverall": false, "label": "14.4.13 - Formulario Cuentas Bancarias-121-Aggregated", "isController": false}, {"data": [[1.0, 17640.0]], "isOverall": false, "label": "13.5.1 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[1.0, 17640.0]], "isOverall": false, "label": "13.5.1 - Formulario Relacion Guardar-104-Aggregated", "isController": false}, {"data": [[1.0, 445.0]], "isOverall": false, "label": "14.4.6 - Formulario Cuentas Bancarias-114", "isController": false}, {"data": [[1.0, 445.0]], "isOverall": false, "label": "14.4.6 - Formulario Cuentas Bancarias-114-Aggregated", "isController": false}, {"data": [[1.0, 468.0]], "isOverall": false, "label": "15.3.21 - Formulario Campos Adicionales por otras Actividad-157", "isController": false}, {"data": [[1.0, 468.0]], "isOverall": false, "label": "15.3.21 - Formulario Campos Adicionales por otras Actividad-157-Aggregated", "isController": false}, {"data": [[1.0, 544.0]], "isOverall": false, "label": "3 - Seleccionar en el menu Operaciones del Sistema", "isController": true}, {"data": [[1.0, 544.0]], "isOverall": false, "label": "3 - Seleccionar en el menu Operaciones del Sistema-Aggregated", "isController": true}, {"data": [[1.0, 141.0]], "isOverall": false, "label": "6.3 - Presionar boton Nuevo Cliente-13", "isController": false}, {"data": [[1.0, 141.0]], "isOverall": false, "label": "6.3 - Presionar boton Nuevo Cliente-13-Aggregated", "isController": false}, {"data": [[1.0, 871.0]], "isOverall": false, "label": "16 - Presionar el boton Grabar Persona", "isController": true}, {"data": [[1.0, 871.0]], "isOverall": false, "label": "16 - Presionar el boton Grabar Persona-Aggregated", "isController": true}, {"data": [[1.0, 739.0]], "isOverall": false, "label": "7.15 - Formulario Datos de la Persona Seleccionar Genero-28", "isController": false}, {"data": [[1.0, 739.0]], "isOverall": false, "label": "7.15 - Formulario Datos de la Persona Seleccionar Genero-28-Aggregated", "isController": false}, {"data": [[1.0, 297.0]], "isOverall": false, "label": "15.5.3 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[1.0, 297.0]], "isOverall": false, "label": "15.5.3 - Formulario Campos Adicionales Cerrar-171-Aggregated", "isController": false}, {"data": [[1.0, 446.0]], "isOverall": false, "label": "13.4.6 - Llenar Formulario Relacion -94", "isController": false}, {"data": [[1.0, 446.0]], "isOverall": false, "label": "13.4.6 - Llenar Formulario Relacion -94-Aggregated", "isController": false}, {"data": [[1.0, 443.0]], "isOverall": false, "label": "15.3.5 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[1.0, 443.0]], "isOverall": false, "label": "15.3.5 - Formulario Campos Adicionales-142-Aggregated", "isController": false}, {"data": [[1.0, 379.0]], "isOverall": false, "label": "14.4.10 - Formulario Cuentas Bancarias-118", "isController": false}, {"data": [[1.0, 379.0]], "isOverall": false, "label": "14.4.10 - Formulario Cuentas Bancarias-118-Aggregated", "isController": false}, {"data": [[1.0, 485.0]], "isOverall": false, "label": "1.1 Se selecciona Inicio-1", "isController": false}, {"data": [[1.0, 485.0]], "isOverall": false, "label": "1.1 Se selecciona Inicio-1-Aggregated", "isController": false}, {"data": [[1.0, 11505.0]], "isOverall": false, "label": "14.4 - Llenar el Formulario de Cuentas Bancarias", "isController": true}, {"data": [[1.0, 11505.0]], "isOverall": false, "label": "14.4 - Llenar el Formulario de Cuentas Bancarias-Aggregated", "isController": true}, {"data": [[1.0, 14762.0]], "isOverall": false, "label": "14 - Seleccionar opcion Cuentas Bancarias ", "isController": true}, {"data": [[1.0, 14762.0]], "isOverall": false, "label": "14 - Seleccionar opcion Cuentas Bancarias -Aggregated", "isController": true}, {"data": [[1.0, 16031.0]], "isOverall": false, "label": "15.3 - Llenar Formulario Campos Adicionales", "isController": true}, {"data": [[1.0, 16031.0]], "isOverall": false, "label": "15.3 - Llenar Formulario Campos Adicionales-Aggregated", "isController": true}, {"data": [[1.0, 1007.0]], "isOverall": false, "label": "8.3.1 - Formulario Datos de Cliente Grabar-37", "isController": false}, {"data": [[1.0, 1007.0]], "isOverall": false, "label": "8.3.1 - Formulario Datos de Cliente Grabar-37-Aggregated", "isController": false}, {"data": [[1.0, 232.0]], "isOverall": false, "label": "14.4.7 - Formulario Cuentas Bancarias-115", "isController": false}, {"data": [[1.0, 232.0]], "isOverall": false, "label": "14.4.7 - Formulario Cuentas Bancarias-115-Aggregated", "isController": false}, {"data": [[1.0, 842.0]], "isOverall": false, "label": " 13.4.8 - Llenar Formulario Relacion -96", "isController": false}, {"data": [[1.0, 842.0]], "isOverall": false, "label": " 13.4.8 - Llenar Formulario Relacion -96-Aggregated", "isController": false}, {"data": [[1.0, 447.0]], "isOverall": false, "label": "14.4.24.1 - Segunda Cuenta Bancaria-132", "isController": false}, {"data": [[1.0, 447.0]], "isOverall": false, "label": "14.4.24.1 - Segunda Cuenta Bancaria-132-Aggregated", "isController": false}, {"data": [[1.0, 726.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-52", "isController": false}, {"data": [[1.0, 726.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-52-Aggregated", "isController": false}, {"data": [[1.0, 536.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-55", "isController": false}, {"data": [[1.0, 536.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-55-Aggregated", "isController": false}, {"data": [[1.0, 470.0]], "isOverall": false, "label": "14.4.12 - Formulario Cuentas Bancarias-120", "isController": false}, {"data": [[1.0, 470.0]], "isOverall": false, "label": "14.4.12 - Formulario Cuentas Bancarias-120-Aggregated", "isController": false}, {"data": [[1.0, 458.0]], "isOverall": false, "label": "15.3.6 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[1.0, 458.0]], "isOverall": false, "label": "15.3.6 - Formulario Campos Adicionales-143-Aggregated", "isController": false}, {"data": [[1.0, 756.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-54", "isController": false}, {"data": [[1.0, 756.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-54-Aggregated", "isController": false}, {"data": [[1.0, 380.0]], "isOverall": false, "label": "7.17 - Formulario Datos de la Persona Fecha de Nacimiento-30", "isController": false}, {"data": [[1.0, 380.0]], "isOverall": false, "label": "7.17 - Formulario Datos de la Persona Fecha de Nacimiento-30-Aggregated", "isController": false}, {"data": [[1.0, 424.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-56", "isController": false}, {"data": [[1.0, 424.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-56-Aggregated", "isController": false}, {"data": [[1.0, 643.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-59", "isController": false}, {"data": [[1.0, 643.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-59-Aggregated", "isController": false}, {"data": [[1.0, 430.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-58", "isController": false}, {"data": [[1.0, 430.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-58-Aggregated", "isController": false}, {"data": [[1.0, 254.0]], "isOverall": false, "label": "7.20.2 - Presionar Grabar Datos de la Persona -34", "isController": false}, {"data": [[1.0, 254.0]], "isOverall": false, "label": "7.20.2 - Presionar Grabar Datos de la Persona -34-Aggregated", "isController": false}, {"data": [[1.0, 380.0]], "isOverall": false, "label": "14.4.22 - Formulario Cuentas Bancarias-130", "isController": false}, {"data": [[1.0, 380.0]], "isOverall": false, "label": "14.4.22 - Formulario Cuentas Bancarias-130-Aggregated", "isController": false}, {"data": [[1.0, 725.0]], "isOverall": false, "label": "12.1 - Formulario Contactos-82", "isController": false}, {"data": [[1.0, 725.0]], "isOverall": false, "label": "12.1 - Formulario Contactos-82-Aggregated", "isController": false}, {"data": [[1.0, 342.0]], "isOverall": false, "label": "7.6 - Formulario Datos de la Persona Identificacion-19", "isController": false}, {"data": [[1.0, 342.0]], "isOverall": false, "label": "7.6 - Formulario Datos de la Persona Identificacion-19-Aggregated", "isController": false}, {"data": [[1.0, 446.0]], "isOverall": false, "label": "15.3.7 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[1.0, 446.0]], "isOverall": false, "label": "15.3.7 - Formulario Campos Adicionales-144-Aggregated", "isController": false}, {"data": [[1.0, 826.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-77", "isController": false}, {"data": [[1.0, 826.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-77-Aggregated", "isController": false}, {"data": [[1.0, 213.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-78", "isController": false}, {"data": [[1.0, 213.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-78-Aggregated", "isController": false}, {"data": [[1.0, 438.0]], "isOverall": false, "label": "14.4.8 - Formulario Cuentas Bancarias-116", "isController": false}, {"data": [[1.0, 438.0]], "isOverall": false, "label": "14.4.8 - Formulario Cuentas Bancarias-116-Aggregated", "isController": false}, {"data": [[1.0, 803.0]], "isOverall": false, "label": "14.4.23 - Cunenta Bancaria Principal", "isController": true}, {"data": [[1.0, 803.0]], "isOverall": false, "label": "14.4.23 - Cunenta Bancaria Principal-Aggregated", "isController": true}, {"data": [[1.0, 386.0]], "isOverall": false, "label": "15.3.4 -  Formulario Campos Adicionales-141", "isController": false}, {"data": [[1.0, 386.0]], "isOverall": false, "label": "15.3.4 -  Formulario Campos Adicionales-141-Aggregated", "isController": false}, {"data": [[1.0, 449.0]], "isOverall": false, "label": "15.3.10 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[1.0, 449.0]], "isOverall": false, "label": "15.3.10 - Formulario Campos Adicionales-147-Aggregated", "isController": false}, {"data": [[1.0, 492.0]], "isOverall": false, "label": "13.1 - Seleccionar opcion Relacion-86", "isController": false}, {"data": [[1.0, 492.0]], "isOverall": false, "label": "13.1 - Seleccionar opcion Relacion-86-Aggregated", "isController": false}, {"data": [[1.0, 734.0]], "isOverall": false, "label": " 13.4.11 - Llenar Formulario Relacion -100", "isController": false}, {"data": [[1.0, 734.0]], "isOverall": false, "label": " 13.4.11 - Llenar Formulario Relacion -100-Aggregated", "isController": false}, {"data": [[1.0, 356.0]], "isOverall": false, "label": "12.2 - Formulario Contactos Correo-83", "isController": false}, {"data": [[1.0, 356.0]], "isOverall": false, "label": "12.2 - Formulario Contactos Correo-83-Aggregated", "isController": false}, {"data": [[1.0, 315.0]], "isOverall": false, "label": "8.1 - Llenar Formulario Datos de Cliente-35", "isController": false}, {"data": [[1.0, 315.0]], "isOverall": false, "label": "8.1 - Llenar Formulario Datos de Cliente-35-Aggregated", "isController": false}, {"data": [[1.0, 779.0]], "isOverall": false, "label": "13.5.2 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[1.0, 779.0]], "isOverall": false, "label": "13.5.2 - Formulario Relacion Guardar-105-Aggregated", "isController": false}, {"data": [[1.0, 328.0]], "isOverall": false, "label": "7.14 - Formulario Datos de la Persona Seleccionar Ocupacion-27", "isController": false}, {"data": [[1.0, 328.0]], "isOverall": false, "label": "7.14 - Formulario Datos de la Persona Seleccionar Ocupacion-27-Aggregated", "isController": false}, {"data": [[1.0, 496.0]], "isOverall": false, "label": "15.3.29 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[1.0, 496.0]], "isOverall": false, "label": "15.3.29 - Formulario Campos Adicionales-165-Aggregated", "isController": false}, {"data": [[1.0, 634.0]], "isOverall": false, "label": "15.3.18 - Formulario Campo Exoneracion de impuesto-154", "isController": false}, {"data": [[1.0, 634.0]], "isOverall": false, "label": "15.3.18 - Formulario Campo Exoneracion de impuesto-154-Aggregated", "isController": false}, {"data": [[1.0, 774.0]], "isOverall": false, "label": "15.3.8 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[1.0, 774.0]], "isOverall": false, "label": "15.3.8 - Formulario Campos Adicionales-145-Aggregated", "isController": false}, {"data": [[1.0, 410.0]], "isOverall": false, "label": "14.4.5 - Formulario Cuentas Bancarias-113", "isController": false}, {"data": [[1.0, 410.0]], "isOverall": false, "label": "14.4.5 - Formulario Cuentas Bancarias-113-Aggregated", "isController": false}, {"data": [[1.0, 220.0]], "isOverall": false, "label": "14.4.14 - Formulario Cuentas Bancarias-122", "isController": false}, {"data": [[1.0, 220.0]], "isOverall": false, "label": "14.4.14 - Formulario Cuentas Bancarias-122-Aggregated", "isController": false}, {"data": [[1.0, 334.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-75", "isController": false}, {"data": [[1.0, 334.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-75-Aggregated", "isController": false}, {"data": [[1.0, 1940.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[1.0, 1940.0]], "isOverall": false, "label": "2 - Login-Aggregated", "isController": true}, {"data": [[1.0, 227.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-67", "isController": false}, {"data": [[1.0, 227.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-67-Aggregated", "isController": false}, {"data": [[1.0, 414.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-74", "isController": false}, {"data": [[1.0, 414.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-74-Aggregated", "isController": false}, {"data": [[1.0, 613.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-76", "isController": false}, {"data": [[1.0, 613.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-76-Aggregated", "isController": false}, {"data": [[1.0, 182.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-61", "isController": false}, {"data": [[1.0, 182.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-61-Aggregated", "isController": false}, {"data": [[1.0, 440.0]], "isOverall": false, "label": "14.4.11 - Formulario Cuentas Bancarias-119", "isController": false}, {"data": [[1.0, 440.0]], "isOverall": false, "label": "14.4.11 - Formulario Cuentas Bancarias-119-Aggregated", "isController": false}, {"data": [[1.0, 671.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-70", "isController": false}, {"data": [[1.0, 671.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-70-Aggregated", "isController": false}, {"data": [[1.0, 798.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-73", "isController": false}, {"data": [[1.0, 798.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-73-Aggregated", "isController": false}, {"data": [[1.0, 718.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-72", "isController": false}, {"data": [[1.0, 718.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-72-Aggregated", "isController": false}, {"data": [[1.0, 161.0]], "isOverall": false, "label": "10.4 - Formulario Domicilio Venta Provincia Pais de residencia-43", "isController": false}, {"data": [[1.0, 161.0]], "isOverall": false, "label": "10.4 - Formulario Domicilio Venta Provincia Pais de residencia-43-Aggregated", "isController": false}, {"data": [[1.0, 552.0]], "isOverall": false, "label": "15.4.2 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[1.0, 552.0]], "isOverall": false, "label": "15.4.2 - Formulario Campos Adicionales Grabar-167-Aggregated", "isController": false}, {"data": [[1.0, 656.0]], "isOverall": false, "label": "16.1 - Presionar el boton Grabar Persona-173", "isController": false}, {"data": [[1.0, 656.0]], "isOverall": false, "label": "16.1 - Presionar el boton Grabar Persona-173-Aggregated", "isController": false}, {"data": [[1.0, 673.0]], "isOverall": false, "label": "7.10 - Formulario Datos de la Persona Segundo Apellido-23", "isController": false}, {"data": [[1.0, 673.0]], "isOverall": false, "label": "7.10 - Formulario Datos de la Persona Segundo Apellido-23-Aggregated", "isController": false}, {"data": [[1.0, 422.0]], "isOverall": false, "label": "7.19 - Formulario Datos de la Persona Nacionalidad-32", "isController": false}, {"data": [[1.0, 422.0]], "isOverall": false, "label": "7.19 - Formulario Datos de la Persona Nacionalidad-32-Aggregated", "isController": false}, {"data": [[1.0, 671.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-64", "isController": false}, {"data": [[1.0, 671.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-64-Aggregated", "isController": false}, {"data": [[1.0, 9130.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[1.0, 9130.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-Aggregated", "isController": true}, {"data": [[1.0, 404.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-63", "isController": false}, {"data": [[1.0, 404.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-63-Aggregated", "isController": false}, {"data": [[1.0, 600.0]], "isOverall": false, "label": "15.3.14 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[1.0, 600.0]], "isOverall": false, "label": "15.3.14 - Formulario Campos Adicionales-151-Aggregated", "isController": false}, {"data": [[1.0, 368.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-66", "isController": false}, {"data": [[1.0, 368.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-66-Aggregated", "isController": false}, {"data": [[1.0, 573.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-65", "isController": false}, {"data": [[1.0, 573.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-65-Aggregated", "isController": false}, {"data": [[1.0, 589.0]], "isOverall": false, "label": "13.4.4 - Llenar Formulario Relacion -92", "isController": false}, {"data": [[1.0, 589.0]], "isOverall": false, "label": "13.4.4 - Llenar Formulario Relacion -92-Aggregated", "isController": false}, {"data": [[1.0, 357.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-68", "isController": false}, {"data": [[1.0, 357.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-68-Aggregated", "isController": false}, {"data": [[1.0, 803.0]], "isOverall": false, "label": "14.4.23.1 - Cunenta Bancaria Principal-131", "isController": false}, {"data": [[1.0, 803.0]], "isOverall": false, "label": "14.4.23.1 - Cunenta Bancaria Principal-131-Aggregated", "isController": false}, {"data": [[1.0, 1808.0]], "isOverall": false, "label": "15.5 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[1.0, 1808.0]], "isOverall": false, "label": "15.5 - Formulario Campos Adicionales Cerrar-Aggregated", "isController": true}, {"data": [[1.0, 714.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-69", "isController": false}, {"data": [[1.0, 714.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-69-Aggregated", "isController": false}, {"data": [[1.0, 176.0]], "isOverall": false, "label": "17.4 - Presionar el boton Cerrar  Persona--178", "isController": false}, {"data": [[1.0, 176.0]], "isOverall": false, "label": "17.4 - Presionar el boton Cerrar  Persona--178-Aggregated", "isController": false}, {"data": [[1.0, 462.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-60", "isController": false}, {"data": [[1.0, 462.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-60-Aggregated", "isController": false}, {"data": [[1.0, 121.0]], "isOverall": false, "label": "17.3 - Presionar el boton Cerrar  Persona-", "isController": false}, {"data": [[1.0, 121.0]], "isOverall": false, "label": "17.3 - Presionar el boton Cerrar  Persona--Aggregated", "isController": false}, {"data": [[1.0, 690.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-62", "isController": false}, {"data": [[1.0, 690.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-62-Aggregated", "isController": false}, {"data": [[1.0, 371.0]], "isOverall": false, "label": "15.3.2 -  Formulario Campos Adicionales-139", "isController": false}, {"data": [[1.0, 371.0]], "isOverall": false, "label": "15.3.2 -  Formulario Campos Adicionales-139-Aggregated", "isController": false}, {"data": [[1.0, 806.0]], "isOverall": false, "label": "10.7 - Formulario Domicilio Provincia Pais de residencia-46", "isController": false}, {"data": [[1.0, 806.0]], "isOverall": false, "label": "10.7 - Formulario Domicilio Provincia Pais de residencia-46-Aggregated", "isController": false}, {"data": [[1.0, 372.0]], "isOverall": false, "label": "7.1 - Se abre Formulario Persona-15", "isController": false}, {"data": [[1.0, 372.0]], "isOverall": false, "label": "7.1 - Se abre Formulario Persona-15-Aggregated", "isController": false}, {"data": [[1.0, 385.0]], "isOverall": false, "label": "7.13 - Formulario Datos de la Persona Buscar Ocupacion-26", "isController": false}, {"data": [[1.0, 385.0]], "isOverall": false, "label": "7.13 - Formulario Datos de la Persona Buscar Ocupacion-26-Aggregated", "isController": false}, {"data": [[1.0, 398.0]], "isOverall": false, "label": "8.2 - Seleccionar Datos de Cliente-36", "isController": false}, {"data": [[1.0, 398.0]], "isOverall": false, "label": "8.2 - Seleccionar Datos de Cliente-36-Aggregated", "isController": false}, {"data": [[1.0, 1011.0]], "isOverall": false, "label": "7.20.1 - Presionar Grabar Datos de la Persona -33", "isController": false}, {"data": [[1.0, 1011.0]], "isOverall": false, "label": "7.20.1 - Presionar Grabar Datos de la Persona -33-Aggregated", "isController": false}, {"data": [[1.0, 376.0]], "isOverall": false, "label": "7.9 - Formulario Datos de la Persona Primer Apellido-22", "isController": false}, {"data": [[1.0, 376.0]], "isOverall": false, "label": "7.9 - Formulario Datos de la Persona Primer Apellido-22-Aggregated", "isController": false}, {"data": [[1.0, 1488.0]], "isOverall": false, "label": "15.4 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[1.0, 1488.0]], "isOverall": false, "label": "15.4 - Formulario Campos Adicionales Grabar-Aggregated", "isController": true}, {"data": [[1.0, 403.0]], "isOverall": false, "label": "15.3.9 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[1.0, 403.0]], "isOverall": false, "label": "15.3.9 - Formulario Campos Adicionales-146-Aggregated", "isController": false}, {"data": [[1.0, 704.0]], "isOverall": false, "label": "14.4.4 - Formulario Cuentas Bancarias-112", "isController": false}, {"data": [[1.0, 704.0]], "isOverall": false, "label": "14.4.4 - Formulario Cuentas Bancarias-112-Aggregated", "isController": false}, {"data": [[1.0, 1280.0]], "isOverall": false, "label": "14.1 - Hacer clic en Crear Cuentas Bancarias-106", "isController": false}, {"data": [[1.0, 1280.0]], "isOverall": false, "label": "14.1 - Hacer clic en Crear Cuentas Bancarias-106-Aggregated", "isController": false}, {"data": [[1.0, 449.0]], "isOverall": false, "label": "14.4.15 - Formulario Cuentas Bancarias-123", "isController": false}, {"data": [[1.0, 449.0]], "isOverall": false, "label": "14.4.15 - Formulario Cuentas Bancarias-123-Aggregated", "isController": false}, {"data": [[1.0, 891.0]], "isOverall": false, "label": "15.3.12 - Formulario campo Nombre de la Empresa y Nacionalidad-149", "isController": false}, {"data": [[1.0, 891.0]], "isOverall": false, "label": "15.3.12 - Formulario campo Nombre de la Empresa y Nacionalidad-149-Aggregated", "isController": false}, {"data": [[1.0, 233.0]], "isOverall": false, "label": "8.3.2 - Formulario Datos de Cliente Grabar-38", "isController": false}, {"data": [[1.0, 233.0]], "isOverall": false, "label": "8.3.2 - Formulario Datos de Cliente Grabar-38-Aggregated", "isController": false}, {"data": [[1.0, 418.0]], "isOverall": false, "label": "15.3.24 - Formulario Campo Porcentaje de participacion-160", "isController": false}, {"data": [[1.0, 418.0]], "isOverall": false, "label": "15.3.24 - Formulario Campo Porcentaje de participacion-160-Aggregated", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "14.4.20 - Formulario Cuentas Bancarias-128", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "14.4.20 - Formulario Cuentas Bancarias-128-Aggregated", "isController": false}, {"data": [[1.0, 1000.0]], "isOverall": false, "label": "14.5 - Guardar Cuentas Bancarias", "isController": true}, {"data": [[1.0, 1000.0]], "isOverall": false, "label": "14.5 - Guardar Cuentas Bancarias-Aggregated", "isController": true}, {"data": [[1.0, 485.0]], "isOverall": false, "label": "15.4.1 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[1.0, 485.0]], "isOverall": false, "label": "15.4.1 - Formulario Campos Adicionales Grabar-166-Aggregated", "isController": false}, {"data": [[1.0, 396.0]], "isOverall": false, "label": "9.1 - Hacer clic en Crear Domicilio-39", "isController": false}, {"data": [[1.0, 396.0]], "isOverall": false, "label": "9.1 - Hacer clic en Crear Domicilio-39-Aggregated", "isController": false}, {"data": [[1.0, 424.0]], "isOverall": false, "label": "15.3.1 - Formulario Campos Adicionales-138", "isController": false}, {"data": [[1.0, 424.0]], "isOverall": false, "label": "15.3.1 - Formulario Campos Adicionales-138-Aggregated", "isController": false}, {"data": [[1.0, 215.0]], "isOverall": false, "label": "16.2 - Presionar el boton Grabar Persona-174", "isController": false}, {"data": [[1.0, 215.0]], "isOverall": false, "label": "16.2 - Presionar el boton Grabar Persona-174-Aggregated", "isController": false}, {"data": [[1.0, 690.0]], "isOverall": false, "label": "15.3.28 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[1.0, 690.0]], "isOverall": false, "label": "15.3.28 - Formulario Campos Adicionales-164-Aggregated", "isController": false}, {"data": [[1.0, 447.0]], "isOverall": false, "label": "14.4.24 - Segunda Cuenta Bancaria", "isController": true}, {"data": [[1.0, 447.0]], "isOverall": false, "label": "14.4.24 - Segunda Cuenta Bancaria-Aggregated", "isController": true}, {"data": [[1.0, 396.0]], "isOverall": false, "label": "9 - Seleccionar Domicilio", "isController": true}, {"data": [[1.0, 396.0]], "isOverall": false, "label": "9 - Seleccionar Domicilio-Aggregated", "isController": true}, {"data": [[1.0, 27608.0]], "isOverall": false, "label": "13 - Seleccionar opcion Relacion", "isController": true}, {"data": [[1.0, 27608.0]], "isOverall": false, "label": "13 - Seleccionar opcion Relacion-Aggregated", "isController": true}, {"data": [[1.0, 544.0]], "isOverall": false, "label": "14.4.18 - Formulario Cuentas Bancarias-126", "isController": false}, {"data": [[1.0, 544.0]], "isOverall": false, "label": "14.4.18 - Formulario Cuentas Bancarias-126-Aggregated", "isController": false}, {"data": [[1.0, 219.0]], "isOverall": false, "label": "15.2 - Hacer clic en la opcion Campos Adicionales-137", "isController": false}, {"data": [[1.0, 219.0]], "isOverall": false, "label": "15.2 - Hacer clic en la opcion Campos Adicionales-137-Aggregated", "isController": false}, {"data": [[1.0, 427.0]], "isOverall": false, "label": "14.4.1 - Formulario Cuentas Bancarias-109", "isController": false}, {"data": [[1.0, 427.0]], "isOverall": false, "label": "14.4.1 - Formulario Cuentas Bancarias-109-Aggregated", "isController": false}, {"data": [[1.0, 455.0]], "isOverall": false, "label": "15.3.26 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[1.0, 455.0]], "isOverall": false, "label": "15.3.26 - Formulario Campos Adicionales-162-Aggregated", "isController": false}, {"data": [[1.0, 145.0]], "isOverall": false, "label": "5.2 -Hacer clic en la opcion Cliente-10", "isController": false}, {"data": [[1.0, 145.0]], "isOverall": false, "label": "5.2 -Hacer clic en la opcion Cliente-10-Aggregated", "isController": false}, {"data": [[1.0, 481.0]], "isOverall": false, "label": "15.1 - Seleccionar la opcion Campos Adicionales-136", "isController": false}, {"data": [[1.0, 481.0]], "isOverall": false, "label": "15.1 - Seleccionar la opcion Campos Adicionales-136-Aggregated", "isController": false}, {"data": [[1.0, 1953.0]], "isOverall": false, "label": "8 - Llenar Formulario Datos de Cliente", "isController": true}, {"data": [[1.0, 1953.0]], "isOverall": false, "label": "8 - Llenar Formulario Datos de Cliente-Aggregated", "isController": true}, {"data": [[1.0, 179.0]], "isOverall": false, "label": "11.2 - Hacer clic en Crear Contactos-80", "isController": false}, {"data": [[1.0, 179.0]], "isOverall": false, "label": "11.2 - Hacer clic en Crear Contactos-80-Aggregated", "isController": false}, {"data": [[1.0, 1240.0]], "isOverall": false, "label": "8.3 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[1.0, 1240.0]], "isOverall": false, "label": "8.3 - Formulario Datos de Cliente Grabar-Aggregated", "isController": true}, {"data": [[1.0, 1039.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio", "isController": true}, {"data": [[1.0, 1039.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-Aggregated", "isController": true}, {"data": [[1.0, 883.0]], "isOverall": false, "label": "10.2 - Formulario Domicilio Provincia Pais de residencia-41", "isController": false}, {"data": [[1.0, 883.0]], "isOverall": false, "label": "10.2 - Formulario Domicilio Provincia Pais de residencia-41-Aggregated", "isController": false}, {"data": [[1.0, 553.0]], "isOverall": false, "label": "12.3.1 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[1.0, 553.0]], "isOverall": false, "label": "12.3.1 - Formulario Contactos Guardar-84-Aggregated", "isController": false}, {"data": [[1.0, 436.0]], "isOverall": false, "label": "13.4.2 - Llenar Formulario Relacion -90", "isController": false}, {"data": [[1.0, 436.0]], "isOverall": false, "label": "13.4.2 - Llenar Formulario Relacion -90-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "Debug Sampler-Aggregated", "isController": false}, {"data": [[1.0, 566.0]], "isOverall": false, "label": "15.3.11 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[1.0, 566.0]], "isOverall": false, "label": "15.3.11 - Formulario Campos Adicionales-148-Aggregated", "isController": false}, {"data": [[1.0, 20027.0]], "isOverall": false, "label": "15 - Seleccionar la opcion Campos Adicionales", "isController": true}, {"data": [[1.0, 20027.0]], "isOverall": false, "label": "15 - Seleccionar la opcion Campos Adicionales-Aggregated", "isController": true}, {"data": [[1.0, 237.0]], "isOverall": false, "label": "10.8 - Formulario Domicilio Corregimiento Distrito-47", "isController": false}, {"data": [[1.0, 237.0]], "isOverall": false, "label": "10.8 - Formulario Domicilio Corregimiento Distrito-47-Aggregated", "isController": false}, {"data": [[1.0, 415.0]], "isOverall": false, "label": "10.3 - Formulario Domicilio Provincia Pais de residencia-42", "isController": false}, {"data": [[1.0, 415.0]], "isOverall": false, "label": "10.3 - Formulario Domicilio Provincia Pais de residencia-42-Aggregated", "isController": false}, {"data": [[1.0, 2018.0]], "isOverall": false, "label": "6 - Presionar boton Nuevo Cliente", "isController": true}, {"data": [[1.0, 2018.0]], "isOverall": false, "label": "6 - Presionar boton Nuevo Cliente-Aggregated", "isController": true}], "supportsControllersDiscrimination": true, "maxX": 1.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 0.0, "minX": 1.59719202E12, "maxY": 18772.633333333335, "series": [{"data": [[1.59719202E12, 8313.433333333332], [1.59719214E12, 7769.316666666667], [1.59719208E12, 18772.633333333335]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.59719202E12, 0.0], [1.59719214E12, 0.0], [1.59719208E12, 0.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59719214E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 3.0, "minX": 1.59719202E12, "maxY": 104114.0, "series": [{"data": [[1.59719202E12, 742.0]], "isOverall": false, "label": "1 - Seleccionar Index", "isController": true}, {"data": [[1.59719208E12, 504.0]], "isOverall": false, "label": " 13.4.10 - Llenar Formulario Relacion -99", "isController": false}, {"data": [[1.59719208E12, 535.0]], "isOverall": false, "label": " 13.4.7 - Llenar Formulario Relacion -95", "isController": false}, {"data": [[1.59719208E12, 516.0]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -97", "isController": false}, {"data": [[1.59719208E12, 405.0]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -98", "isController": false}, {"data": [[1.59719208E12, 450.0]], "isOverall": false, "label": " 13.4.12 - Llenar Formulario Relacion -101", "isController": false}, {"data": [[1.59719202E12, 445.0]], "isOverall": false, "label": "7.4 - Formulario Datos de la Persona Identificacion-17", "isController": false}, {"data": [[1.59719214E12, 419.0]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182", "isController": false}, {"data": [[1.59719202E12, 823.0]], "isOverall": false, "label": "6.2 - Presionar boton Nuevo Cliente-12", "isController": false}, {"data": [[1.59719208E12, 371.0]], "isOverall": false, "label": "7.12 - Formulario Datos de la Persona Buscar Ocupacion-25", "isController": false}, {"data": [[1.59719214E12, 628.0]], "isOverall": false, "label": "15.3.3 -  Formulario Campos Adicionales-140", "isController": false}, {"data": [[1.59719214E12, 445.0]], "isOverall": false, "label": "14.4.19 - Formulario Cuentas Bancarias-127", "isController": false}, {"data": [[1.59719202E12, 121.0]], "isOverall": false, "label": "4 - Seleccionar en el menu Modulo de Personas", "isController": true}, {"data": [[1.59719202E12, 958.0]], "isOverall": false, "label": "5 - Seleccionar en el menu Clientes", "isController": true}, {"data": [[1.59719208E12, 470.0]], "isOverall": false, "label": "10.5 - Formulario Domicilio Provincia Pais de residencia-44", "isController": false}, {"data": [[1.59719214E12, 403.0]], "isOverall": false, "label": "15.3.22 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[1.59719208E12, 447.0]], "isOverall": false, "label": "13.4.3 - Llenar Formulario Relacion -91", "isController": false}, {"data": [[1.59719208E12, 452.0]], "isOverall": false, "label": "13.4.5 - Llenar Formulario Relacion -93", "isController": false}, {"data": [[1.59719208E12, 330.0]], "isOverall": false, "label": "10.6 - Formulario Domicilio Provincia Pais de residencia-45", "isController": false}, {"data": [[1.59719208E12, 738.0]], "isOverall": false, "label": "12.3 - Formulario Contactos Guardar", "isController": true}, {"data": [[1.59719214E12, 361.0]], "isOverall": false, "label": "14.5.1 - Guardar Cuentas Bancarias-134", "isController": false}, {"data": [[1.59719214E12, 509.0]], "isOverall": false, "label": "15.3.20 - Formulario Campos Adicionales Actividad Principal-156", "isController": false}, {"data": [[1.59719214E12, 838.0]], "isOverall": false, "label": "15.3.23 - Formulario Campo Accionista-159", "isController": false}, {"data": [[1.59719214E12, 466.0]], "isOverall": false, "label": "15.3.25 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[1.59719202E12, 733.0]], "isOverall": false, "label": "6.1 - Presionar boton Nuevo Cliente-11", "isController": false}, {"data": [[1.59719208E12, 7583.0]], "isOverall": false, "label": "13.4 - Formulario Relacion Buscar ", "isController": true}, {"data": [[1.59719208E12, 428.0]], "isOverall": false, "label": "13.4.1 - Buscar Identificacion -89", "isController": false}, {"data": [[1.59719208E12, 444.0]], "isOverall": false, "label": " 13.4.13 - Llenar Formulario Relacion Identificacion -102", "isController": false}, {"data": [[1.59719208E12, 173.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito Ventana-71", "isController": false}, {"data": [[1.59719208E12, 355.0]], "isOverall": false, "label": " 13.4.14 - Llenar Formulario Relacion -103", "isController": false}, {"data": [[1.59719202E12, 321.0]], "isOverall": false, "label": "6.4 - Presionar boton Nuevo Cliente-14", "isController": false}, {"data": [[1.59719214E12, 408.0]], "isOverall": false, "label": "14.4.25 - Tercera Cuenta Bancaria", "isController": true}, {"data": [[1.59719214E12, 438.0]], "isOverall": false, "label": "15.5.1 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[1.59719214E12, 639.0]], "isOverall": false, "label": "14.5.2 - Guardar Cuentas Bancarias-135", "isController": false}, {"data": [[1.59719208E12, 404.0]], "isOverall": false, "label": "7.7 - Formulario Persona Digito Verificador y Fecha de Vencimiento-20", "isController": false}, {"data": [[1.59719208E12, 471.0]], "isOverall": false, "label": "11.3 - Hacer clic en Crear Contactos-81", "isController": false}, {"data": [[1.59719214E12, 439.0]], "isOverall": false, "label": "14.3 - Hacer clic en Crear Cuentas Bancarias-108", "isController": false}, {"data": [[1.59719202E12, 314.0]], "isOverall": false, "label": "7.2 - Se abre Formulario Persona-16", "isController": false}, {"data": [[1.59719214E12, 373.0]], "isOverall": false, "label": "14.4.2 - Formulario Cuentas Bancarias-110", "isController": false}, {"data": [[1.59719208E12, 185.0]], "isOverall": false, "label": "12.3.2 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[1.59719214E12, 420.0]], "isOverall": false, "label": "14.4.17 - Formulario Cuentas Bancarias-125", "isController": false}, {"data": [[1.59719214E12, 824.0]], "isOverall": false, "label": "18 - Presionar el boton Cerrar  Insis", "isController": true}, {"data": [[1.59719202E12, 250.0]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3", "isController": false}, {"data": [[1.59719214E12, 828.0]], "isOverall": false, "label": "17.2 - Presionar el boton Cerrar  Persona--176", "isController": false}, {"data": [[1.59719208E12, 395.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito -53", "isController": false}, {"data": [[1.59719214E12, 1712.0]], "isOverall": false, "label": "17 - Presionar el boton Cerrar  Persona", "isController": true}, {"data": [[1.59719208E12, 299.0]], "isOverall": false, "label": "7.8 - Formulario Datos de la Persona Nombre-21", "isController": false}, {"data": [[1.59719208E12, 608.0]], "isOverall": false, "label": "11.1 - Hacer clic en Crear Contactos-79", "isController": false}, {"data": [[1.59719214E12, 788.0]], "isOverall": false, "label": "15.3.27 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[1.59719214E12, 290.0]], "isOverall": false, "label": "14.4.3 - Formulario Cuentas Bancarias-111", "isController": false}, {"data": [[1.59719214E12, 538.0]], "isOverall": false, "label": "14.2 - Hacer clic en Crear Cuentas Bancarias-107", "isController": false}, {"data": [[1.59719214E12, 587.0]], "isOverall": false, "label": "17.1 - Presionar el boton Cerrar  Persona-175", "isController": false}, {"data": [[1.59719208E12, 17431.0]], "isOverall": false, "label": "10 - Llenar el Formulario Domicilio", "isController": true}, {"data": [[1.59719202E12, 813.0]], "isOverall": false, "label": "5.1 - Seleccionar en el menu Cliente-9", "isController": false}, {"data": [[1.59719208E12, 879.0]], "isOverall": false, "label": "7.5 - Formulario Datos de la Persona Identificacion-18", "isController": false}, {"data": [[1.59719214E12, 580.0]], "isOverall": false, "label": "15.3.13 - Formulario Campo Cargo que Ocupa-150", "isController": false}, {"data": [[1.59719202E12, 1690.0]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5", "isController": false}, {"data": [[1.59719202E12, 544.0]], "isOverall": false, "label": "3.1 - Seleccionar en el menu Operaciones del Sistema-7", "isController": false}, {"data": [[1.59719208E12, 471.0]], "isOverall": false, "label": "7.11 - Formulario Datos de la Persona Buscar Ocupacion-24", "isController": false}, {"data": [[1.59719214E12, 104114.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59719214E12, 364.0]], "isOverall": false, "label": "14.4.16- Formulario Cuentas Bancarias-124", "isController": false}, {"data": [[1.59719214E12, 701.0]], "isOverall": false, "label": "15.5.4 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[1.59719214E12, 689.0]], "isOverall": false, "label": "15.3.16 - Formulario Tipo de PYMES-153", "isController": false}, {"data": [[1.59719208E12, 604.0]], "isOverall": false, "label": "13.3 - Seleccionar Vinculo Relacion-88", "isController": false}, {"data": [[1.59719208E12, 18419.0]], "isOverall": false, "label": "13.5 - Formulario Relacion Guardar", "isController": true}, {"data": [[1.59719208E12, 1819.0]], "isOverall": false, "label": "12 - Llenar el Formulario de Contactos", "isController": true}, {"data": [[1.59719208E12, 1258.0]], "isOverall": false, "label": "11 - Seleccionar opcion Contactos", "isController": true}, {"data": [[1.59719208E12, 170.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-57", "isController": false}, {"data": [[1.59719208E12, 369.0]], "isOverall": false, "label": "7.18 - Formulario Datos de la Persona Pais-31", "isController": false}, {"data": [[1.59719214E12, 372.0]], "isOverall": false, "label": "15.5.2 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[1.59719208E12, 1265.0]], "isOverall": false, "label": "7.20 - Presionar Grabar Datos de la Persona ", "isController": true}, {"data": [[1.59719214E12, 901.0]], "isOverall": false, "label": "15.3.19- Formulario Campo Ingresos Anuales-155", "isController": false}, {"data": [[1.59719214E12, 765.0]], "isOverall": false, "label": "14.4.9 - Formulario Cuentas Bancarias-117", "isController": false}, {"data": [[1.59719214E12, 451.0]], "isOverall": false, "label": "15.4.3 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[1.59719202E12, 121.0]], "isOverall": false, "label": "4.1 - Seleccionar Modulo de Personas-8", "isController": false}, {"data": [[1.59719214E12, 217.0]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185", "isController": false}, {"data": [[1.59719214E12, 435.0]], "isOverall": false, "label": "14.4.21 - Formulario Cuentas Bancarias-129", "isController": false}, {"data": [[1.59719214E12, 188.0]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183", "isController": false}, {"data": [[1.59719202E12, 257.0]], "isOverall": false, "label": "1.2 Se Selecciona Index-2", "isController": false}, {"data": [[1.59719214E12, 408.0]], "isOverall": false, "label": "14.4.25.1 - Tercera Cuenta Bancaria", "isController": false}, {"data": [[1.59719208E12, 510.0]], "isOverall": false, "label": "13.2 - Hacer clic en Crear Relacion-87", "isController": false}, {"data": [[1.59719208E12, 296.0]], "isOverall": false, "label": "7.16 - Formulario Datos de la Persona Seleccionar Genero-29", "isController": false}, {"data": [[1.59719208E12, 641.0]], "isOverall": false, "label": "10.1 - Formulario Domicilio Tipo de direccion-40", "isController": false}, {"data": [[1.59719214E12, 857.0]], "isOverall": false, "label": "15.3.15 - Formulario Campo Perfil PYMES-152", "isController": false}, {"data": [[1.59719214E12, 808.0]], "isOverall": false, "label": "14.4.13 - Formulario Cuentas Bancarias-121", "isController": false}, {"data": [[1.59719208E12, 17640.0]], "isOverall": false, "label": "13.5.1 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[1.59719214E12, 445.0]], "isOverall": false, "label": "14.4.6 - Formulario Cuentas Bancarias-114", "isController": false}, {"data": [[1.59719214E12, 468.0]], "isOverall": false, "label": "15.3.21 - Formulario Campos Adicionales por otras Actividad-157", "isController": false}, {"data": [[1.59719202E12, 544.0]], "isOverall": false, "label": "3 - Seleccionar en el menu Operaciones del Sistema", "isController": true}, {"data": [[1.59719202E12, 141.0]], "isOverall": false, "label": "6.3 - Presionar boton Nuevo Cliente-13", "isController": false}, {"data": [[1.59719214E12, 871.0]], "isOverall": false, "label": "16 - Presionar el boton Grabar Persona", "isController": true}, {"data": [[1.59719208E12, 739.0]], "isOverall": false, "label": "7.15 - Formulario Datos de la Persona Seleccionar Genero-28", "isController": false}, {"data": [[1.59719214E12, 297.0]], "isOverall": false, "label": "15.5.3 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[1.59719208E12, 446.0]], "isOverall": false, "label": "13.4.6 - Llenar Formulario Relacion -94", "isController": false}, {"data": [[1.59719214E12, 443.0]], "isOverall": false, "label": "15.3.5 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[1.59719214E12, 379.0]], "isOverall": false, "label": "14.4.10 - Formulario Cuentas Bancarias-118", "isController": false}, {"data": [[1.59719202E12, 485.0]], "isOverall": false, "label": "1.1 Se selecciona Inicio-1", "isController": false}, {"data": [[1.59719214E12, 11505.0]], "isOverall": false, "label": "14.4 - Llenar el Formulario de Cuentas Bancarias", "isController": true}, {"data": [[1.59719214E12, 14762.0]], "isOverall": false, "label": "14 - Seleccionar opcion Cuentas Bancarias ", "isController": true}, {"data": [[1.59719214E12, 16031.0]], "isOverall": false, "label": "15.3 - Llenar Formulario Campos Adicionales", "isController": true}, {"data": [[1.59719208E12, 1007.0]], "isOverall": false, "label": "8.3.1 - Formulario Datos de Cliente Grabar-37", "isController": false}, {"data": [[1.59719214E12, 232.0]], "isOverall": false, "label": "14.4.7 - Formulario Cuentas Bancarias-115", "isController": false}, {"data": [[1.59719208E12, 842.0]], "isOverall": false, "label": " 13.4.8 - Llenar Formulario Relacion -96", "isController": false}, {"data": [[1.59719214E12, 447.0]], "isOverall": false, "label": "14.4.24.1 - Segunda Cuenta Bancaria-132", "isController": false}, {"data": [[1.59719208E12, 726.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-52", "isController": false}, {"data": [[1.59719208E12, 536.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-55", "isController": false}, {"data": [[1.59719214E12, 470.0]], "isOverall": false, "label": "14.4.12 - Formulario Cuentas Bancarias-120", "isController": false}, {"data": [[1.59719214E12, 458.0]], "isOverall": false, "label": "15.3.6 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[1.59719208E12, 756.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-54", "isController": false}, {"data": [[1.59719208E12, 380.0]], "isOverall": false, "label": "7.17 - Formulario Datos de la Persona Fecha de Nacimiento-30", "isController": false}, {"data": [[1.59719208E12, 424.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-56", "isController": false}, {"data": [[1.59719208E12, 643.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-59", "isController": false}, {"data": [[1.59719208E12, 430.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-58", "isController": false}, {"data": [[1.59719208E12, 254.0]], "isOverall": false, "label": "7.20.2 - Presionar Grabar Datos de la Persona -34", "isController": false}, {"data": [[1.59719214E12, 380.0]], "isOverall": false, "label": "14.4.22 - Formulario Cuentas Bancarias-130", "isController": false}, {"data": [[1.59719208E12, 725.0]], "isOverall": false, "label": "12.1 - Formulario Contactos-82", "isController": false}, {"data": [[1.59719208E12, 342.0]], "isOverall": false, "label": "7.6 - Formulario Datos de la Persona Identificacion-19", "isController": false}, {"data": [[1.59719214E12, 446.0]], "isOverall": false, "label": "15.3.7 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[1.59719208E12, 826.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-77", "isController": false}, {"data": [[1.59719208E12, 213.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-78", "isController": false}, {"data": [[1.59719214E12, 438.0]], "isOverall": false, "label": "14.4.8 - Formulario Cuentas Bancarias-116", "isController": false}, {"data": [[1.59719214E12, 803.0]], "isOverall": false, "label": "14.4.23 - Cunenta Bancaria Principal", "isController": true}, {"data": [[1.59719214E12, 386.0]], "isOverall": false, "label": "15.3.4 -  Formulario Campos Adicionales-141", "isController": false}, {"data": [[1.59719214E12, 449.0]], "isOverall": false, "label": "15.3.10 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[1.59719208E12, 492.0]], "isOverall": false, "label": "13.1 - Seleccionar opcion Relacion-86", "isController": false}, {"data": [[1.59719208E12, 734.0]], "isOverall": false, "label": " 13.4.11 - Llenar Formulario Relacion -100", "isController": false}, {"data": [[1.59719208E12, 356.0]], "isOverall": false, "label": "12.2 - Formulario Contactos Correo-83", "isController": false}, {"data": [[1.59719208E12, 315.0]], "isOverall": false, "label": "8.1 - Llenar Formulario Datos de Cliente-35", "isController": false}, {"data": [[1.59719208E12, 779.0]], "isOverall": false, "label": "13.5.2 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[1.59719208E12, 328.0]], "isOverall": false, "label": "7.14 - Formulario Datos de la Persona Seleccionar Ocupacion-27", "isController": false}, {"data": [[1.59719214E12, 496.0]], "isOverall": false, "label": "15.3.29 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[1.59719214E12, 634.0]], "isOverall": false, "label": "15.3.18 - Formulario Campo Exoneracion de impuesto-154", "isController": false}, {"data": [[1.59719214E12, 774.0]], "isOverall": false, "label": "15.3.8 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[1.59719214E12, 410.0]], "isOverall": false, "label": "14.4.5 - Formulario Cuentas Bancarias-113", "isController": false}, {"data": [[1.59719214E12, 220.0]], "isOverall": false, "label": "14.4.14 - Formulario Cuentas Bancarias-122", "isController": false}, {"data": [[1.59719208E12, 334.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-75", "isController": false}, {"data": [[1.59719202E12, 1940.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[1.59719208E12, 227.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-67", "isController": false}, {"data": [[1.59719208E12, 414.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-74", "isController": false}, {"data": [[1.59719208E12, 613.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-76", "isController": false}, {"data": [[1.59719208E12, 182.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-61", "isController": false}, {"data": [[1.59719214E12, 440.0]], "isOverall": false, "label": "14.4.11 - Formulario Cuentas Bancarias-119", "isController": false}, {"data": [[1.59719208E12, 671.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-70", "isController": false}, {"data": [[1.59719208E12, 798.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-73", "isController": false}, {"data": [[1.59719208E12, 718.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-72", "isController": false}, {"data": [[1.59719208E12, 161.0]], "isOverall": false, "label": "10.4 - Formulario Domicilio Venta Provincia Pais de residencia-43", "isController": false}, {"data": [[1.59719214E12, 552.0]], "isOverall": false, "label": "15.4.2 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[1.59719214E12, 656.0]], "isOverall": false, "label": "16.1 - Presionar el boton Grabar Persona-173", "isController": false}, {"data": [[1.59719208E12, 673.0]], "isOverall": false, "label": "7.10 - Formulario Datos de la Persona Segundo Apellido-23", "isController": false}, {"data": [[1.59719208E12, 422.0]], "isOverall": false, "label": "7.19 - Formulario Datos de la Persona Nacionalidad-32", "isController": false}, {"data": [[1.59719208E12, 671.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-64", "isController": false}, {"data": [[1.59719208E12, 9130.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[1.59719208E12, 404.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-63", "isController": false}, {"data": [[1.59719214E12, 600.0]], "isOverall": false, "label": "15.3.14 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[1.59719208E12, 368.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-66", "isController": false}, {"data": [[1.59719208E12, 573.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-65", "isController": false}, {"data": [[1.59719208E12, 589.0]], "isOverall": false, "label": "13.4.4 - Llenar Formulario Relacion -92", "isController": false}, {"data": [[1.59719208E12, 357.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-68", "isController": false}, {"data": [[1.59719214E12, 803.0]], "isOverall": false, "label": "14.4.23.1 - Cunenta Bancaria Principal-131", "isController": false}, {"data": [[1.59719214E12, 1808.0]], "isOverall": false, "label": "15.5 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[1.59719208E12, 714.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-69", "isController": false}, {"data": [[1.59719214E12, 176.0]], "isOverall": false, "label": "17.4 - Presionar el boton Cerrar  Persona--178", "isController": false}, {"data": [[1.59719208E12, 462.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-60", "isController": false}, {"data": [[1.59719214E12, 121.0]], "isOverall": false, "label": "17.3 - Presionar el boton Cerrar  Persona-", "isController": false}, {"data": [[1.59719208E12, 690.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-62", "isController": false}, {"data": [[1.59719214E12, 371.0]], "isOverall": false, "label": "15.3.2 -  Formulario Campos Adicionales-139", "isController": false}, {"data": [[1.59719208E12, 806.0]], "isOverall": false, "label": "10.7 - Formulario Domicilio Provincia Pais de residencia-46", "isController": false}, {"data": [[1.59719202E12, 372.0]], "isOverall": false, "label": "7.1 - Se abre Formulario Persona-15", "isController": false}, {"data": [[1.59719208E12, 385.0]], "isOverall": false, "label": "7.13 - Formulario Datos de la Persona Buscar Ocupacion-26", "isController": false}, {"data": [[1.59719208E12, 398.0]], "isOverall": false, "label": "8.2 - Seleccionar Datos de Cliente-36", "isController": false}, {"data": [[1.59719208E12, 1011.0]], "isOverall": false, "label": "7.20.1 - Presionar Grabar Datos de la Persona -33", "isController": false}, {"data": [[1.59719208E12, 376.0]], "isOverall": false, "label": "7.9 - Formulario Datos de la Persona Primer Apellido-22", "isController": false}, {"data": [[1.59719214E12, 1488.0]], "isOverall": false, "label": "15.4 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[1.59719214E12, 403.0]], "isOverall": false, "label": "15.3.9 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[1.59719214E12, 704.0]], "isOverall": false, "label": "14.4.4 - Formulario Cuentas Bancarias-112", "isController": false}, {"data": [[1.59719208E12, 1280.0]], "isOverall": false, "label": "14.1 - Hacer clic en Crear Cuentas Bancarias-106", "isController": false}, {"data": [[1.59719214E12, 449.0]], "isOverall": false, "label": "14.4.15 - Formulario Cuentas Bancarias-123", "isController": false}, {"data": [[1.59719214E12, 891.0]], "isOverall": false, "label": "15.3.12 - Formulario campo Nombre de la Empresa y Nacionalidad-149", "isController": false}, {"data": [[1.59719208E12, 233.0]], "isOverall": false, "label": "8.3.2 - Formulario Datos de Cliente Grabar-38", "isController": false}, {"data": [[1.59719214E12, 418.0]], "isOverall": false, "label": "15.3.24 - Formulario Campo Porcentaje de participacion-160", "isController": false}, {"data": [[1.59719214E12, 409.0]], "isOverall": false, "label": "14.4.20 - Formulario Cuentas Bancarias-128", "isController": false}, {"data": [[1.59719214E12, 1000.0]], "isOverall": false, "label": "14.5 - Guardar Cuentas Bancarias", "isController": true}, {"data": [[1.59719214E12, 485.0]], "isOverall": false, "label": "15.4.1 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[1.59719208E12, 396.0]], "isOverall": false, "label": "9.1 - Hacer clic en Crear Domicilio-39", "isController": false}, {"data": [[1.59719214E12, 424.0]], "isOverall": false, "label": "15.3.1 - Formulario Campos Adicionales-138", "isController": false}, {"data": [[1.59719214E12, 215.0]], "isOverall": false, "label": "16.2 - Presionar el boton Grabar Persona-174", "isController": false}, {"data": [[1.59719214E12, 690.0]], "isOverall": false, "label": "15.3.28 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[1.59719214E12, 447.0]], "isOverall": false, "label": "14.4.24 - Segunda Cuenta Bancaria", "isController": true}, {"data": [[1.59719208E12, 396.0]], "isOverall": false, "label": "9 - Seleccionar Domicilio", "isController": true}, {"data": [[1.59719208E12, 27608.0]], "isOverall": false, "label": "13 - Seleccionar opcion Relacion", "isController": true}, {"data": [[1.59719214E12, 544.0]], "isOverall": false, "label": "14.4.18 - Formulario Cuentas Bancarias-126", "isController": false}, {"data": [[1.59719214E12, 219.0]], "isOverall": false, "label": "15.2 - Hacer clic en la opcion Campos Adicionales-137", "isController": false}, {"data": [[1.59719214E12, 427.0]], "isOverall": false, "label": "14.4.1 - Formulario Cuentas Bancarias-109", "isController": false}, {"data": [[1.59719214E12, 455.0]], "isOverall": false, "label": "15.3.26 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[1.59719202E12, 145.0]], "isOverall": false, "label": "5.2 -Hacer clic en la opcion Cliente-10", "isController": false}, {"data": [[1.59719214E12, 481.0]], "isOverall": false, "label": "15.1 - Seleccionar la opcion Campos Adicionales-136", "isController": false}, {"data": [[1.59719208E12, 1953.0]], "isOverall": false, "label": "8 - Llenar Formulario Datos de Cliente", "isController": true}, {"data": [[1.59719208E12, 179.0]], "isOverall": false, "label": "11.2 - Hacer clic en Crear Contactos-80", "isController": false}, {"data": [[1.59719208E12, 1240.0]], "isOverall": false, "label": "8.3 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[1.59719208E12, 1039.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio", "isController": true}, {"data": [[1.59719208E12, 883.0]], "isOverall": false, "label": "10.2 - Formulario Domicilio Provincia Pais de residencia-41", "isController": false}, {"data": [[1.59719208E12, 553.0]], "isOverall": false, "label": "12.3.1 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[1.59719208E12, 436.0]], "isOverall": false, "label": "13.4.2 - Llenar Formulario Relacion -90", "isController": false}, {"data": [[1.59719214E12, 3.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59719214E12, 566.0]], "isOverall": false, "label": "15.3.11 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[1.59719214E12, 20027.0]], "isOverall": false, "label": "15 - Seleccionar la opcion Campos Adicionales", "isController": true}, {"data": [[1.59719208E12, 237.0]], "isOverall": false, "label": "10.8 - Formulario Domicilio Corregimiento Distrito-47", "isController": false}, {"data": [[1.59719208E12, 415.0]], "isOverall": false, "label": "10.3 - Formulario Domicilio Provincia Pais de residencia-42", "isController": false}, {"data": [[1.59719202E12, 2018.0]], "isOverall": false, "label": "6 - Presionar boton Nuevo Cliente", "isController": true}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59719214E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.59719202E12, "maxY": 96978.0, "series": [{"data": [[1.59719202E12, 623.0]], "isOverall": false, "label": "1 - Seleccionar Index", "isController": true}, {"data": [[1.59719208E12, 430.0]], "isOverall": false, "label": " 13.4.10 - Llenar Formulario Relacion -99", "isController": false}, {"data": [[1.59719208E12, 438.0]], "isOverall": false, "label": " 13.4.7 - Llenar Formulario Relacion -95", "isController": false}, {"data": [[1.59719208E12, 462.0]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -97", "isController": false}, {"data": [[1.59719208E12, 353.0]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -98", "isController": false}, {"data": [[1.59719208E12, 448.0]], "isOverall": false, "label": " 13.4.12 - Llenar Formulario Relacion -101", "isController": false}, {"data": [[1.59719202E12, 445.0]], "isOverall": false, "label": "7.4 - Formulario Datos de la Persona Identificacion-17", "isController": false}, {"data": [[1.59719214E12, 211.0]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182", "isController": false}, {"data": [[1.59719202E12, 504.0]], "isOverall": false, "label": "6.2 - Presionar boton Nuevo Cliente-12", "isController": false}, {"data": [[1.59719208E12, 274.0]], "isOverall": false, "label": "7.12 - Formulario Datos de la Persona Buscar Ocupacion-25", "isController": false}, {"data": [[1.59719214E12, 622.0]], "isOverall": false, "label": "15.3.3 -  Formulario Campos Adicionales-140", "isController": false}, {"data": [[1.59719214E12, 443.0]], "isOverall": false, "label": "14.4.19 - Formulario Cuentas Bancarias-127", "isController": false}, {"data": [[1.59719202E12, 118.0]], "isOverall": false, "label": "4 - Seleccionar en el menu Modulo de Personas", "isController": true}, {"data": [[1.59719202E12, 735.0]], "isOverall": false, "label": "5 - Seleccionar en el menu Clientes", "isController": true}, {"data": [[1.59719208E12, 466.0]], "isOverall": false, "label": "10.5 - Formulario Domicilio Provincia Pais de residencia-44", "isController": false}, {"data": [[1.59719214E12, 400.0]], "isOverall": false, "label": "15.3.22 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[1.59719208E12, 350.0]], "isOverall": false, "label": "13.4.3 - Llenar Formulario Relacion -91", "isController": false}, {"data": [[1.59719208E12, 447.0]], "isOverall": false, "label": "13.4.5 - Llenar Formulario Relacion -93", "isController": false}, {"data": [[1.59719208E12, 329.0]], "isOverall": false, "label": "10.6 - Formulario Domicilio Provincia Pais de residencia-45", "isController": false}, {"data": [[1.59719208E12, 609.0]], "isOverall": false, "label": "12.3 - Formulario Contactos Guardar", "isController": true}, {"data": [[1.59719214E12, 360.0]], "isOverall": false, "label": "14.5.1 - Guardar Cuentas Bancarias-134", "isController": false}, {"data": [[1.59719214E12, 504.0]], "isOverall": false, "label": "15.3.20 - Formulario Campos Adicionales Actividad Principal-156", "isController": false}, {"data": [[1.59719214E12, 834.0]], "isOverall": false, "label": "15.3.23 - Formulario Campo Accionista-159", "isController": false}, {"data": [[1.59719214E12, 465.0]], "isOverall": false, "label": "15.3.25 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[1.59719202E12, 724.0]], "isOverall": false, "label": "6.1 - Presionar boton Nuevo Cliente-11", "isController": false}, {"data": [[1.59719208E12, 7090.0]], "isOverall": false, "label": "13.4 - Formulario Relacion Buscar ", "isController": true}, {"data": [[1.59719208E12, 425.0]], "isOverall": false, "label": "13.4.1 - Buscar Identificacion -89", "isController": false}, {"data": [[1.59719208E12, 444.0]], "isOverall": false, "label": " 13.4.13 - Llenar Formulario Relacion Identificacion -102", "isController": false}, {"data": [[1.59719208E12, 148.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito Ventana-71", "isController": false}, {"data": [[1.59719208E12, 351.0]], "isOverall": false, "label": " 13.4.14 - Llenar Formulario Relacion -103", "isController": false}, {"data": [[1.59719202E12, 317.0]], "isOverall": false, "label": "6.4 - Presionar boton Nuevo Cliente-14", "isController": false}, {"data": [[1.59719214E12, 407.0]], "isOverall": false, "label": "14.4.25 - Tercera Cuenta Bancaria", "isController": true}, {"data": [[1.59719214E12, 438.0]], "isOverall": false, "label": "15.5.1 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[1.59719214E12, 627.0]], "isOverall": false, "label": "14.5.2 - Guardar Cuentas Bancarias-135", "isController": false}, {"data": [[1.59719208E12, 400.0]], "isOverall": false, "label": "7.7 - Formulario Persona Digito Verificador y Fecha de Vencimiento-20", "isController": false}, {"data": [[1.59719208E12, 469.0]], "isOverall": false, "label": "11.3 - Hacer clic en Crear Contactos-81", "isController": false}, {"data": [[1.59719214E12, 437.0]], "isOverall": false, "label": "14.3 - Hacer clic en Crear Cuentas Bancarias-108", "isController": false}, {"data": [[1.59719202E12, 253.0]], "isOverall": false, "label": "7.2 - Se abre Formulario Persona-16", "isController": false}, {"data": [[1.59719214E12, 373.0]], "isOverall": false, "label": "14.4.2 - Formulario Cuentas Bancarias-110", "isController": false}, {"data": [[1.59719208E12, 153.0]], "isOverall": false, "label": "12.3.2 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[1.59719214E12, 414.0]], "isOverall": false, "label": "14.4.17 - Formulario Cuentas Bancarias-125", "isController": false}, {"data": [[1.59719214E12, 409.0]], "isOverall": false, "label": "18 - Presionar el boton Cerrar  Insis", "isController": true}, {"data": [[1.59719202E12, 158.0]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3", "isController": false}, {"data": [[1.59719214E12, 657.0]], "isOverall": false, "label": "17.2 - Presionar el boton Cerrar  Persona--176", "isController": false}, {"data": [[1.59719208E12, 395.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito -53", "isController": false}, {"data": [[1.59719214E12, 1419.0]], "isOverall": false, "label": "17 - Presionar el boton Cerrar  Persona", "isController": true}, {"data": [[1.59719208E12, 295.0]], "isOverall": false, "label": "7.8 - Formulario Datos de la Persona Nombre-21", "isController": false}, {"data": [[1.59719208E12, 512.0]], "isOverall": false, "label": "11.1 - Hacer clic en Crear Contactos-79", "isController": false}, {"data": [[1.59719214E12, 784.0]], "isOverall": false, "label": "15.3.27 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[1.59719214E12, 283.0]], "isOverall": false, "label": "14.4.3 - Formulario Cuentas Bancarias-111", "isController": false}, {"data": [[1.59719214E12, 527.0]], "isOverall": false, "label": "14.2 - Hacer clic en Crear Cuentas Bancarias-107", "isController": false}, {"data": [[1.59719214E12, 474.0]], "isOverall": false, "label": "17.1 - Presionar el boton Cerrar  Persona-175", "isController": false}, {"data": [[1.59719208E12, 16256.0]], "isOverall": false, "label": "10 - Llenar el Formulario Domicilio", "isController": true}, {"data": [[1.59719202E12, 601.0]], "isOverall": false, "label": "5.1 - Seleccionar en el menu Cliente-9", "isController": false}, {"data": [[1.59719208E12, 877.0]], "isOverall": false, "label": "7.5 - Formulario Datos de la Persona Identificacion-18", "isController": false}, {"data": [[1.59719214E12, 576.0]], "isOverall": false, "label": "15.3.13 - Formulario Campo Cargo que Ocupa-150", "isController": false}, {"data": [[1.59719202E12, 104.0]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5", "isController": false}, {"data": [[1.59719202E12, 443.0]], "isOverall": false, "label": "3.1 - Seleccionar en el menu Operaciones del Sistema-7", "isController": false}, {"data": [[1.59719208E12, 471.0]], "isOverall": false, "label": "7.11 - Formulario Datos de la Persona Buscar Ocupacion-24", "isController": false}, {"data": [[1.59719214E12, 96978.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59719214E12, 359.0]], "isOverall": false, "label": "14.4.16- Formulario Cuentas Bancarias-124", "isController": false}, {"data": [[1.59719214E12, 701.0]], "isOverall": false, "label": "15.5.4 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[1.59719214E12, 686.0]], "isOverall": false, "label": "15.3.16 - Formulario Tipo de PYMES-153", "isController": false}, {"data": [[1.59719208E12, 514.0]], "isOverall": false, "label": "13.3 - Seleccionar Vinculo Relacion-88", "isController": false}, {"data": [[1.59719208E12, 18395.0]], "isOverall": false, "label": "13.5 - Formulario Relacion Guardar", "isController": true}, {"data": [[1.59719208E12, 1688.0]], "isOverall": false, "label": "12 - Llenar el Formulario de Contactos", "isController": true}, {"data": [[1.59719208E12, 1138.0]], "isOverall": false, "label": "11 - Seleccionar opcion Contactos", "isController": true}, {"data": [[1.59719208E12, 164.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-57", "isController": false}, {"data": [[1.59719208E12, 369.0]], "isOverall": false, "label": "7.18 - Formulario Datos de la Persona Pais-31", "isController": false}, {"data": [[1.59719214E12, 369.0]], "isOverall": false, "label": "15.5.2 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[1.59719208E12, 943.0]], "isOverall": false, "label": "7.20 - Presionar Grabar Datos de la Persona ", "isController": true}, {"data": [[1.59719214E12, 894.0]], "isOverall": false, "label": "15.3.19- Formulario Campo Ingresos Anuales-155", "isController": false}, {"data": [[1.59719214E12, 764.0]], "isOverall": false, "label": "14.4.9 - Formulario Cuentas Bancarias-117", "isController": false}, {"data": [[1.59719214E12, 448.0]], "isOverall": false, "label": "15.4.3 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[1.59719202E12, 118.0]], "isOverall": false, "label": "4.1 - Seleccionar Modulo de Personas-8", "isController": false}, {"data": [[1.59719214E12, 103.0]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185", "isController": false}, {"data": [[1.59719214E12, 435.0]], "isOverall": false, "label": "14.4.21 - Formulario Cuentas Bancarias-129", "isController": false}, {"data": [[1.59719214E12, 95.0]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183", "isController": false}, {"data": [[1.59719202E12, 138.0]], "isOverall": false, "label": "1.2 Se Selecciona Index-2", "isController": false}, {"data": [[1.59719214E12, 407.0]], "isOverall": false, "label": "14.4.25.1 - Tercera Cuenta Bancaria", "isController": false}, {"data": [[1.59719208E12, 492.0]], "isOverall": false, "label": "13.2 - Hacer clic en Crear Relacion-87", "isController": false}, {"data": [[1.59719208E12, 295.0]], "isOverall": false, "label": "7.16 - Formulario Datos de la Persona Seleccionar Genero-29", "isController": false}, {"data": [[1.59719208E12, 637.0]], "isOverall": false, "label": "10.1 - Formulario Domicilio Tipo de direccion-40", "isController": false}, {"data": [[1.59719214E12, 854.0]], "isOverall": false, "label": "15.3.15 - Formulario Campo Perfil PYMES-152", "isController": false}, {"data": [[1.59719214E12, 807.0]], "isOverall": false, "label": "14.4.13 - Formulario Cuentas Bancarias-121", "isController": false}, {"data": [[1.59719208E12, 17639.0]], "isOverall": false, "label": "13.5.1 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[1.59719214E12, 443.0]], "isOverall": false, "label": "14.4.6 - Formulario Cuentas Bancarias-114", "isController": false}, {"data": [[1.59719214E12, 466.0]], "isOverall": false, "label": "15.3.21 - Formulario Campos Adicionales por otras Actividad-157", "isController": false}, {"data": [[1.59719202E12, 443.0]], "isOverall": false, "label": "3 - Seleccionar en el menu Operaciones del Sistema", "isController": true}, {"data": [[1.59719202E12, 138.0]], "isOverall": false, "label": "6.3 - Presionar boton Nuevo Cliente-13", "isController": false}, {"data": [[1.59719214E12, 580.0]], "isOverall": false, "label": "16 - Presionar el boton Grabar Persona", "isController": true}, {"data": [[1.59719208E12, 739.0]], "isOverall": false, "label": "7.15 - Formulario Datos de la Persona Seleccionar Genero-28", "isController": false}, {"data": [[1.59719214E12, 282.0]], "isOverall": false, "label": "15.5.3 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[1.59719208E12, 443.0]], "isOverall": false, "label": "13.4.6 - Llenar Formulario Relacion -94", "isController": false}, {"data": [[1.59719214E12, 443.0]], "isOverall": false, "label": "15.3.5 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[1.59719214E12, 379.0]], "isOverall": false, "label": "14.4.10 - Formulario Cuentas Bancarias-118", "isController": false}, {"data": [[1.59719202E12, 485.0]], "isOverall": false, "label": "1.1 Se selecciona Inicio-1", "isController": false}, {"data": [[1.59719214E12, 11417.0]], "isOverall": false, "label": "14.4 - Llenar el Formulario de Cuentas Bancarias", "isController": true}, {"data": [[1.59719214E12, 14459.0]], "isOverall": false, "label": "14 - Seleccionar opcion Cuentas Bancarias ", "isController": true}, {"data": [[1.59719214E12, 15954.0]], "isOverall": false, "label": "15.3 - Llenar Formulario Campos Adicionales", "isController": true}, {"data": [[1.59719208E12, 718.0]], "isOverall": false, "label": "8.3.1 - Formulario Datos de Cliente Grabar-37", "isController": false}, {"data": [[1.59719214E12, 221.0]], "isOverall": false, "label": "14.4.7 - Formulario Cuentas Bancarias-115", "isController": false}, {"data": [[1.59719208E12, 752.0]], "isOverall": false, "label": " 13.4.8 - Llenar Formulario Relacion -96", "isController": false}, {"data": [[1.59719214E12, 447.0]], "isOverall": false, "label": "14.4.24.1 - Segunda Cuenta Bancaria-132", "isController": false}, {"data": [[1.59719208E12, 722.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-52", "isController": false}, {"data": [[1.59719208E12, 347.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-55", "isController": false}, {"data": [[1.59719214E12, 467.0]], "isOverall": false, "label": "14.4.12 - Formulario Cuentas Bancarias-120", "isController": false}, {"data": [[1.59719214E12, 454.0]], "isOverall": false, "label": "15.3.6 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[1.59719208E12, 754.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-54", "isController": false}, {"data": [[1.59719208E12, 377.0]], "isOverall": false, "label": "7.17 - Formulario Datos de la Persona Fecha de Nacimiento-30", "isController": false}, {"data": [[1.59719208E12, 393.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-56", "isController": false}, {"data": [[1.59719208E12, 640.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-59", "isController": false}, {"data": [[1.59719208E12, 425.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-58", "isController": false}, {"data": [[1.59719208E12, 241.0]], "isOverall": false, "label": "7.20.2 - Presionar Grabar Datos de la Persona -34", "isController": false}, {"data": [[1.59719214E12, 378.0]], "isOverall": false, "label": "14.4.22 - Formulario Cuentas Bancarias-130", "isController": false}, {"data": [[1.59719208E12, 723.0]], "isOverall": false, "label": "12.1 - Formulario Contactos-82", "isController": false}, {"data": [[1.59719208E12, 337.0]], "isOverall": false, "label": "7.6 - Formulario Datos de la Persona Identificacion-19", "isController": false}, {"data": [[1.59719214E12, 445.0]], "isOverall": false, "label": "15.3.7 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[1.59719208E12, 738.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-77", "isController": false}, {"data": [[1.59719208E12, 163.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-78", "isController": false}, {"data": [[1.59719214E12, 435.0]], "isOverall": false, "label": "14.4.8 - Formulario Cuentas Bancarias-116", "isController": false}, {"data": [[1.59719214E12, 801.0]], "isOverall": false, "label": "14.4.23 - Cunenta Bancaria Principal", "isController": true}, {"data": [[1.59719214E12, 381.0]], "isOverall": false, "label": "15.3.4 -  Formulario Campos Adicionales-141", "isController": false}, {"data": [[1.59719214E12, 446.0]], "isOverall": false, "label": "15.3.10 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[1.59719208E12, 391.0]], "isOverall": false, "label": "13.1 - Seleccionar opcion Relacion-86", "isController": false}, {"data": [[1.59719208E12, 732.0]], "isOverall": false, "label": " 13.4.11 - Llenar Formulario Relacion -100", "isController": false}, {"data": [[1.59719208E12, 356.0]], "isOverall": false, "label": "12.2 - Formulario Contactos Correo-83", "isController": false}, {"data": [[1.59719208E12, 311.0]], "isOverall": false, "label": "8.1 - Llenar Formulario Datos de Cliente-35", "isController": false}, {"data": [[1.59719208E12, 756.0]], "isOverall": false, "label": "13.5.2 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[1.59719208E12, 327.0]], "isOverall": false, "label": "7.14 - Formulario Datos de la Persona Seleccionar Ocupacion-27", "isController": false}, {"data": [[1.59719214E12, 493.0]], "isOverall": false, "label": "15.3.29 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[1.59719214E12, 630.0]], "isOverall": false, "label": "15.3.18 - Formulario Campo Exoneracion de impuesto-154", "isController": false}, {"data": [[1.59719214E12, 770.0]], "isOverall": false, "label": "15.3.8 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[1.59719214E12, 408.0]], "isOverall": false, "label": "14.4.5 - Formulario Cuentas Bancarias-113", "isController": false}, {"data": [[1.59719214E12, 213.0]], "isOverall": false, "label": "14.4.14 - Formulario Cuentas Bancarias-122", "isController": false}, {"data": [[1.59719208E12, 329.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-75", "isController": false}, {"data": [[1.59719202E12, 262.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[1.59719208E12, 226.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-67", "isController": false}, {"data": [[1.59719208E12, 411.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-74", "isController": false}, {"data": [[1.59719208E12, 612.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-76", "isController": false}, {"data": [[1.59719208E12, 159.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-61", "isController": false}, {"data": [[1.59719214E12, 436.0]], "isOverall": false, "label": "14.4.11 - Formulario Cuentas Bancarias-119", "isController": false}, {"data": [[1.59719208E12, 578.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-70", "isController": false}, {"data": [[1.59719208E12, 798.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-73", "isController": false}, {"data": [[1.59719208E12, 714.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-72", "isController": false}, {"data": [[1.59719208E12, 157.0]], "isOverall": false, "label": "10.4 - Formulario Domicilio Venta Provincia Pais de residencia-43", "isController": false}, {"data": [[1.59719214E12, 539.0]], "isOverall": false, "label": "15.4.2 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[1.59719214E12, 375.0]], "isOverall": false, "label": "16.1 - Presionar el boton Grabar Persona-173", "isController": false}, {"data": [[1.59719208E12, 672.0]], "isOverall": false, "label": "7.10 - Formulario Datos de la Persona Segundo Apellido-23", "isController": false}, {"data": [[1.59719208E12, 421.0]], "isOverall": false, "label": "7.19 - Formulario Datos de la Persona Nacionalidad-32", "isController": false}, {"data": [[1.59719208E12, 671.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-64", "isController": false}, {"data": [[1.59719208E12, 8564.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[1.59719208E12, 401.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-63", "isController": false}, {"data": [[1.59719214E12, 598.0]], "isOverall": false, "label": "15.3.14 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[1.59719208E12, 312.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-66", "isController": false}, {"data": [[1.59719208E12, 385.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-65", "isController": false}, {"data": [[1.59719208E12, 582.0]], "isOverall": false, "label": "13.4.4 - Llenar Formulario Relacion -92", "isController": false}, {"data": [[1.59719208E12, 354.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-68", "isController": false}, {"data": [[1.59719214E12, 801.0]], "isOverall": false, "label": "14.4.23.1 - Cunenta Bancaria Principal-131", "isController": false}, {"data": [[1.59719214E12, 1790.0]], "isOverall": false, "label": "15.5 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[1.59719208E12, 714.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-69", "isController": false}, {"data": [[1.59719214E12, 175.0]], "isOverall": false, "label": "17.4 - Presionar el boton Cerrar  Persona--178", "isController": false}, {"data": [[1.59719208E12, 460.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-60", "isController": false}, {"data": [[1.59719214E12, 113.0]], "isOverall": false, "label": "17.3 - Presionar el boton Cerrar  Persona-", "isController": false}, {"data": [[1.59719208E12, 690.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-62", "isController": false}, {"data": [[1.59719214E12, 371.0]], "isOverall": false, "label": "15.3.2 -  Formulario Campos Adicionales-139", "isController": false}, {"data": [[1.59719208E12, 804.0]], "isOverall": false, "label": "10.7 - Formulario Domicilio Provincia Pais de residencia-46", "isController": false}, {"data": [[1.59719202E12, 309.0]], "isOverall": false, "label": "7.1 - Se abre Formulario Persona-15", "isController": false}, {"data": [[1.59719208E12, 384.0]], "isOverall": false, "label": "7.13 - Formulario Datos de la Persona Buscar Ocupacion-26", "isController": false}, {"data": [[1.59719208E12, 395.0]], "isOverall": false, "label": "8.2 - Seleccionar Datos de Cliente-36", "isController": false}, {"data": [[1.59719208E12, 702.0]], "isOverall": false, "label": "7.20.1 - Presionar Grabar Datos de la Persona -33", "isController": false}, {"data": [[1.59719208E12, 376.0]], "isOverall": false, "label": "7.9 - Formulario Datos de la Persona Primer Apellido-22", "isController": false}, {"data": [[1.59719214E12, 1469.0]], "isOverall": false, "label": "15.4 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[1.59719214E12, 400.0]], "isOverall": false, "label": "15.3.9 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[1.59719214E12, 700.0]], "isOverall": false, "label": "14.4.4 - Formulario Cuentas Bancarias-112", "isController": false}, {"data": [[1.59719208E12, 1091.0]], "isOverall": false, "label": "14.1 - Hacer clic en Crear Cuentas Bancarias-106", "isController": false}, {"data": [[1.59719214E12, 445.0]], "isOverall": false, "label": "14.4.15 - Formulario Cuentas Bancarias-123", "isController": false}, {"data": [[1.59719214E12, 888.0]], "isOverall": false, "label": "15.3.12 - Formulario campo Nombre de la Empresa y Nacionalidad-149", "isController": false}, {"data": [[1.59719208E12, 223.0]], "isOverall": false, "label": "8.3.2 - Formulario Datos de Cliente Grabar-38", "isController": false}, {"data": [[1.59719214E12, 416.0]], "isOverall": false, "label": "15.3.24 - Formulario Campo Porcentaje de participacion-160", "isController": false}, {"data": [[1.59719214E12, 400.0]], "isOverall": false, "label": "14.4.20 - Formulario Cuentas Bancarias-128", "isController": false}, {"data": [[1.59719214E12, 987.0]], "isOverall": false, "label": "14.5 - Guardar Cuentas Bancarias", "isController": true}, {"data": [[1.59719214E12, 482.0]], "isOverall": false, "label": "15.4.1 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[1.59719208E12, 338.0]], "isOverall": false, "label": "9.1 - Hacer clic en Crear Domicilio-39", "isController": false}, {"data": [[1.59719214E12, 424.0]], "isOverall": false, "label": "15.3.1 - Formulario Campos Adicionales-138", "isController": false}, {"data": [[1.59719214E12, 205.0]], "isOverall": false, "label": "16.2 - Presionar el boton Grabar Persona-174", "isController": false}, {"data": [[1.59719214E12, 690.0]], "isOverall": false, "label": "15.3.28 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[1.59719214E12, 447.0]], "isOverall": false, "label": "14.4.24 - Segunda Cuenta Bancaria", "isController": true}, {"data": [[1.59719208E12, 338.0]], "isOverall": false, "label": "9 - Seleccionar Domicilio", "isController": true}, {"data": [[1.59719208E12, 26882.0]], "isOverall": false, "label": "13 - Seleccionar opcion Relacion", "isController": true}, {"data": [[1.59719214E12, 532.0]], "isOverall": false, "label": "14.4.18 - Formulario Cuentas Bancarias-126", "isController": false}, {"data": [[1.59719214E12, 205.0]], "isOverall": false, "label": "15.2 - Hacer clic en la opcion Campos Adicionales-137", "isController": false}, {"data": [[1.59719214E12, 427.0]], "isOverall": false, "label": "14.4.1 - Formulario Cuentas Bancarias-109", "isController": false}, {"data": [[1.59719214E12, 454.0]], "isOverall": false, "label": "15.3.26 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[1.59719202E12, 134.0]], "isOverall": false, "label": "5.2 -Hacer clic en la opcion Cliente-10", "isController": false}, {"data": [[1.59719214E12, 316.0]], "isOverall": false, "label": "15.1 - Seleccionar la opcion Campos Adicionales-136", "isController": false}, {"data": [[1.59719208E12, 1647.0]], "isOverall": false, "label": "8 - Llenar Formulario Datos de Cliente", "isController": true}, {"data": [[1.59719208E12, 157.0]], "isOverall": false, "label": "11.2 - Hacer clic en Crear Contactos-80", "isController": false}, {"data": [[1.59719208E12, 941.0]], "isOverall": false, "label": "8.3 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[1.59719208E12, 901.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio", "isController": true}, {"data": [[1.59719208E12, 643.0]], "isOverall": false, "label": "10.2 - Formulario Domicilio Provincia Pais de residencia-41", "isController": false}, {"data": [[1.59719208E12, 456.0]], "isOverall": false, "label": "12.3.1 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[1.59719208E12, 433.0]], "isOverall": false, "label": "13.4.2 - Llenar Formulario Relacion -90", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59719214E12, 566.0]], "isOverall": false, "label": "15.3.11 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[1.59719214E12, 19734.0]], "isOverall": false, "label": "15 - Seleccionar la opcion Campos Adicionales", "isController": true}, {"data": [[1.59719208E12, 151.0]], "isOverall": false, "label": "10.8 - Formulario Domicilio Corregimiento Distrito-47", "isController": false}, {"data": [[1.59719208E12, 366.0]], "isOverall": false, "label": "10.3 - Formulario Domicilio Provincia Pais de residencia-42", "isController": false}, {"data": [[1.59719202E12, 1683.0]], "isOverall": false, "label": "6 - Presionar boton Nuevo Cliente", "isController": true}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59719214E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.59719202E12, "maxY": 4.9E-324, "series": [{"data": [[1.59719202E12, 0.0]], "isOverall": false, "label": "1 - Seleccionar Index", "isController": true}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": " 13.4.10 - Llenar Formulario Relacion -99", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": " 13.4.7 - Llenar Formulario Relacion -95", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -97", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -98", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": " 13.4.12 - Llenar Formulario Relacion -101", "isController": false}, {"data": [[1.59719202E12, 0.0]], "isOverall": false, "label": "7.4 - Formulario Datos de la Persona Identificacion-17", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182", "isController": false}, {"data": [[1.59719202E12, 0.0]], "isOverall": false, "label": "6.2 - Presionar boton Nuevo Cliente-12", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "7.12 - Formulario Datos de la Persona Buscar Ocupacion-25", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.3 -  Formulario Campos Adicionales-140", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.19 - Formulario Cuentas Bancarias-127", "isController": false}, {"data": [[1.59719202E12, 0.0]], "isOverall": false, "label": "4 - Seleccionar en el menu Modulo de Personas", "isController": true}, {"data": [[1.59719202E12, 0.0]], "isOverall": false, "label": "5 - Seleccionar en el menu Clientes", "isController": true}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10.5 - Formulario Domicilio Provincia Pais de residencia-44", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.22 - Formulario Campos Adicionales-158", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "13.4.3 - Llenar Formulario Relacion -91", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "13.4.5 - Llenar Formulario Relacion -93", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10.6 - Formulario Domicilio Provincia Pais de residencia-45", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "12.3 - Formulario Contactos Guardar", "isController": true}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.5.1 - Guardar Cuentas Bancarias-134", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.20 - Formulario Campos Adicionales Actividad Principal-156", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.23 - Formulario Campo Accionista-159", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.25 - Formulario Campos Adicionales-161", "isController": false}, {"data": [[1.59719202E12, 0.0]], "isOverall": false, "label": "6.1 - Presionar boton Nuevo Cliente-11", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "13.4 - Formulario Relacion Buscar ", "isController": true}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "13.4.1 - Buscar Identificacion -89", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": " 13.4.13 - Llenar Formulario Relacion Identificacion -102", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito Ventana-71", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": " 13.4.14 - Llenar Formulario Relacion -103", "isController": false}, {"data": [[1.59719202E12, 0.0]], "isOverall": false, "label": "6.4 - Presionar boton Nuevo Cliente-14", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.25 - Tercera Cuenta Bancaria", "isController": true}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.5.1 - Formulario Campos Adicionales Cerrar-169", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.5.2 - Guardar Cuentas Bancarias-135", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "7.7 - Formulario Persona Digito Verificador y Fecha de Vencimiento-20", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "11.3 - Hacer clic en Crear Contactos-81", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.3 - Hacer clic en Crear Cuentas Bancarias-108", "isController": false}, {"data": [[1.59719202E12, 0.0]], "isOverall": false, "label": "7.2 - Se abre Formulario Persona-16", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.2 - Formulario Cuentas Bancarias-110", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "12.3.2 - Formulario Contactos Guardar-85", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.17 - Formulario Cuentas Bancarias-125", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "18 - Presionar el boton Cerrar  Insis", "isController": true}, {"data": [[1.59719202E12, 0.0]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "17.2 - Presionar el boton Cerrar  Persona--176", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito -53", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "17 - Presionar el boton Cerrar  Persona", "isController": true}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "7.8 - Formulario Datos de la Persona Nombre-21", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "11.1 - Hacer clic en Crear Contactos-79", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.27 - Formulario Campos Adicionales-163", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.3 - Formulario Cuentas Bancarias-111", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.2 - Hacer clic en Crear Cuentas Bancarias-107", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "17.1 - Presionar el boton Cerrar  Persona-175", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Llenar el Formulario Domicilio", "isController": true}, {"data": [[1.59719202E12, 0.0]], "isOverall": false, "label": "5.1 - Seleccionar en el menu Cliente-9", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "7.5 - Formulario Datos de la Persona Identificacion-18", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.13 - Formulario Campo Cargo que Ocupa-150", "isController": false}, {"data": [[1.59719202E12, 0.0]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5", "isController": false}, {"data": [[1.59719202E12, 0.0]], "isOverall": false, "label": "3.1 - Seleccionar en el menu Operaciones del Sistema-7", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "7.11 - Formulario Datos de la Persona Buscar Ocupacion-24", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.16- Formulario Cuentas Bancarias-124", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.5.4 - Formulario Campos Adicionales Cerrar-172", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.16 - Formulario Tipo de PYMES-153", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "13.3 - Seleccionar Vinculo Relacion-88", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "13.5 - Formulario Relacion Guardar", "isController": true}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "12 - Llenar el Formulario de Contactos", "isController": true}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "11 - Seleccionar opcion Contactos", "isController": true}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-57", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "7.18 - Formulario Datos de la Persona Pais-31", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.5.2 - Formulario Campos Adicionales Cerrar-170", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "7.20 - Presionar Grabar Datos de la Persona ", "isController": true}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.19- Formulario Campo Ingresos Anuales-155", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.9 - Formulario Cuentas Bancarias-117", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.4.3 - Formulario Campos Adicionales Grabar-168", "isController": false}, {"data": [[1.59719202E12, 0.0]], "isOverall": false, "label": "4.1 - Seleccionar Modulo de Personas-8", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.21 - Formulario Cuentas Bancarias-129", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183", "isController": false}, {"data": [[1.59719202E12, 0.0]], "isOverall": false, "label": "1.2 Se Selecciona Index-2", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.25.1 - Tercera Cuenta Bancaria", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "13.2 - Hacer clic en Crear Relacion-87", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "7.16 - Formulario Datos de la Persona Seleccionar Genero-29", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10.1 - Formulario Domicilio Tipo de direccion-40", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.15 - Formulario Campo Perfil PYMES-152", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.13 - Formulario Cuentas Bancarias-121", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "13.5.1 - Formulario Relacion Guardar-104", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.6 - Formulario Cuentas Bancarias-114", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.21 - Formulario Campos Adicionales por otras Actividad-157", "isController": false}, {"data": [[1.59719202E12, 0.0]], "isOverall": false, "label": "3 - Seleccionar en el menu Operaciones del Sistema", "isController": true}, {"data": [[1.59719202E12, 0.0]], "isOverall": false, "label": "6.3 - Presionar boton Nuevo Cliente-13", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "16 - Presionar el boton Grabar Persona", "isController": true}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "7.15 - Formulario Datos de la Persona Seleccionar Genero-28", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.5.3 - Formulario Campos Adicionales Cerrar-171", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "13.4.6 - Llenar Formulario Relacion -94", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.5 - Formulario Campos Adicionales-142", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.10 - Formulario Cuentas Bancarias-118", "isController": false}, {"data": [[1.59719202E12, 0.0]], "isOverall": false, "label": "1.1 Se selecciona Inicio-1", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4 - Llenar el Formulario de Cuentas Bancarias", "isController": true}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14 - Seleccionar opcion Cuentas Bancarias ", "isController": true}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3 - Llenar Formulario Campos Adicionales", "isController": true}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "8.3.1 - Formulario Datos de Cliente Grabar-37", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.7 - Formulario Cuentas Bancarias-115", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": " 13.4.8 - Llenar Formulario Relacion -96", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.24.1 - Segunda Cuenta Bancaria-132", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-52", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-55", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.12 - Formulario Cuentas Bancarias-120", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.6 - Formulario Campos Adicionales-143", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-54", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "7.17 - Formulario Datos de la Persona Fecha de Nacimiento-30", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-56", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-59", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-58", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "7.20.2 - Presionar Grabar Datos de la Persona -34", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.22 - Formulario Cuentas Bancarias-130", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "12.1 - Formulario Contactos-82", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "7.6 - Formulario Datos de la Persona Identificacion-19", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.7 - Formulario Campos Adicionales-144", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-77", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-78", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.8 - Formulario Cuentas Bancarias-116", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.23 - Cunenta Bancaria Principal", "isController": true}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.4 -  Formulario Campos Adicionales-141", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.10 - Formulario Campos Adicionales-147", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "13.1 - Seleccionar opcion Relacion-86", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": " 13.4.11 - Llenar Formulario Relacion -100", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "12.2 - Formulario Contactos Correo-83", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "8.1 - Llenar Formulario Datos de Cliente-35", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "13.5.2 - Formulario Relacion Guardar-105", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "7.14 - Formulario Datos de la Persona Seleccionar Ocupacion-27", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.29 - Formulario Campos Adicionales-165", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.18 - Formulario Campo Exoneracion de impuesto-154", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.8 - Formulario Campos Adicionales-145", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.5 - Formulario Cuentas Bancarias-113", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.14 - Formulario Cuentas Bancarias-122", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-75", "isController": false}, {"data": [[1.59719202E12, 0.0]], "isOverall": false, "label": "2 - Login", "isController": true}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-67", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-74", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-76", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-61", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.11 - Formulario Cuentas Bancarias-119", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-70", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-73", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-72", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10.4 - Formulario Domicilio Venta Provincia Pais de residencia-43", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.4.2 - Formulario Campos Adicionales Grabar-167", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "16.1 - Presionar el boton Grabar Persona-173", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "7.10 - Formulario Datos de la Persona Segundo Apellido-23", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "7.19 - Formulario Datos de la Persona Nacionalidad-32", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-64", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "7 - Formulario Datos de la Persona", "isController": true}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-63", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.14 - Formulario Campos Adicionales-151", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-66", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-65", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "13.4.4 - Llenar Formulario Relacion -92", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-68", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.23.1 - Cunenta Bancaria Principal-131", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.5 - Formulario Campos Adicionales Cerrar", "isController": true}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-69", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "17.4 - Presionar el boton Cerrar  Persona--178", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-60", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "17.3 - Presionar el boton Cerrar  Persona-", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-62", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.2 -  Formulario Campos Adicionales-139", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10.7 - Formulario Domicilio Provincia Pais de residencia-46", "isController": false}, {"data": [[1.59719202E12, 0.0]], "isOverall": false, "label": "7.1 - Se abre Formulario Persona-15", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "7.13 - Formulario Datos de la Persona Buscar Ocupacion-26", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "8.2 - Seleccionar Datos de Cliente-36", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "7.20.1 - Presionar Grabar Datos de la Persona -33", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "7.9 - Formulario Datos de la Persona Primer Apellido-22", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.4 - Formulario Campos Adicionales Grabar", "isController": true}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.9 - Formulario Campos Adicionales-146", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.4 - Formulario Cuentas Bancarias-112", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "14.1 - Hacer clic en Crear Cuentas Bancarias-106", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.15 - Formulario Cuentas Bancarias-123", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.12 - Formulario campo Nombre de la Empresa y Nacionalidad-149", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "8.3.2 - Formulario Datos de Cliente Grabar-38", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.24 - Formulario Campo Porcentaje de participacion-160", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.20 - Formulario Cuentas Bancarias-128", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.5 - Guardar Cuentas Bancarias", "isController": true}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.4.1 - Formulario Campos Adicionales Grabar-166", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "9.1 - Hacer clic en Crear Domicilio-39", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.1 - Formulario Campos Adicionales-138", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "16.2 - Presionar el boton Grabar Persona-174", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.28 - Formulario Campos Adicionales-164", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.24 - Segunda Cuenta Bancaria", "isController": true}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "9 - Seleccionar Domicilio", "isController": true}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "13 - Seleccionar opcion Relacion", "isController": true}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.18 - Formulario Cuentas Bancarias-126", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.2 - Hacer clic en la opcion Campos Adicionales-137", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "14.4.1 - Formulario Cuentas Bancarias-109", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.26 - Formulario Campos Adicionales-162", "isController": false}, {"data": [[1.59719202E12, 0.0]], "isOverall": false, "label": "5.2 -Hacer clic en la opcion Cliente-10", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.1 - Seleccionar la opcion Campos Adicionales-136", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "8 - Llenar Formulario Datos de Cliente", "isController": true}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "11.2 - Hacer clic en Crear Contactos-80", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "8.3 - Formulario Datos de Cliente Grabar", "isController": true}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio", "isController": true}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10.2 - Formulario Domicilio Provincia Pais de residencia-41", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "12.3.1 - Formulario Contactos Guardar-84", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "13.4.2 - Llenar Formulario Relacion -90", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15.3.11 - Formulario Campos Adicionales-148", "isController": false}, {"data": [[1.59719214E12, 0.0]], "isOverall": false, "label": "15 - Seleccionar la opcion Campos Adicionales", "isController": true}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10.8 - Formulario Domicilio Corregimiento Distrito-47", "isController": false}, {"data": [[1.59719208E12, 0.0]], "isOverall": false, "label": "10.3 - Formulario Domicilio Provincia Pais de residencia-42", "isController": false}, {"data": [[1.59719202E12, 0.0]], "isOverall": false, "label": "6 - Presionar boton Nuevo Cliente", "isController": true}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59719214E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 3.0, "minX": 1.59719202E12, "maxY": 17640.0, "series": [{"data": [[1.59719202E12, 1690.0], [1.59719214E12, 901.0], [1.59719208E12, 17640.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.59719202E12, 121.0], [1.59719214E12, 3.0], [1.59719208E12, 161.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.59719202E12, 1169.8000000000002], [1.59719214E12, 794.0000000000001], [1.59719208E12, 792.3000000000001]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.59719202E12, 1690.0], [1.59719214E12, 901.0], [1.59719208E12, 17640.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.59719202E12, 1690.0], [1.59719214E12, 841.8000000000001], [1.59719208E12, 873.4499999999998]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59719214E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 202.5, "minX": 1.0, "maxY": 1009.0, "series": [{"data": [[1.0, 714.0], [2.0, 456.5], [4.0, 202.5], [3.0, 396.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 499.0], [3.0, 1009.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 4.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 99.0, "minX": 1.0, "maxY": 710.0, "series": [{"data": [[1.0, 637.0], [2.0, 445.0], [4.0, 99.0], [3.0, 376.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 356.0], [3.0, 710.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 4.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.26666666666666666, "minX": 1.59719202E12, "maxY": 1.4166666666666667, "series": [{"data": [[1.59719202E12, 0.26666666666666666], [1.59719214E12, 1.25], [1.59719208E12, 1.4166666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59719214E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.25, "minX": 1.59719202E12, "maxY": 1.4166666666666667, "series": [{"data": [[1.59719202E12, 0.25], [1.59719214E12, 1.2666666666666666], [1.59719208E12, 1.4166666666666667]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59719214E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.59719202E12, "maxY": 0.016666666666666666, "series": [{"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-67-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.6 - Formulario Cuentas Bancarias-114-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "13.4.2 - Llenar Formulario Relacion -90-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "8.1 - Llenar Formulario Datos de Cliente-35-success", "isController": false}, {"data": [[1.59719202E12, 0.016666666666666666]], "isOverall": false, "label": "1 - Seleccionar Index-success", "isController": true}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.13 - Formulario Cuentas Bancarias-121-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-78-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "17.1 - Presionar el boton Cerrar  Persona-175-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-76-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "7.10 - Formulario Datos de la Persona Segundo Apellido-23-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "7.12 - Formulario Datos de la Persona Buscar Ocupacion-25-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "17 - Presionar el boton Cerrar  Persona-success", "isController": true}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10.7 - Formulario Domicilio Provincia Pais de residencia-46-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "13.5 - Formulario Relacion Guardar-success", "isController": true}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.4 -  Formulario Campos Adicionales-141-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "13.4.6 - Llenar Formulario Relacion -94-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.21 - Formulario Campos Adicionales por otras Actividad-157-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.5.1 - Formulario Campos Adicionales Cerrar-169-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "13.4.1 - Buscar Identificacion -89-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "7.11 - Formulario Datos de la Persona Buscar Ocupacion-24-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.9 - Formulario Campos Adicionales-146-success", "isController": false}, {"data": [[1.59719202E12, 0.016666666666666666]], "isOverall": false, "label": "2.1 Ingresar user name y pass-3-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "12.1 - Formulario Contactos-82-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "18.2 - Presionar el boton Cerrar  Insis-183-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15 - Seleccionar la opcion Campos Adicionales-success", "isController": true}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "7.14 - Formulario Datos de la Persona Seleccionar Ocupacion-27-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.18 - Formulario Cuentas Bancarias-126-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-73-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.18 - Formulario Campo Exoneracion de impuesto-154-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.20 - Formulario Cuentas Bancarias-128-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "12.3 - Formulario Contactos Guardar-success", "isController": true}, {"data": [[1.59719202E12, 0.016666666666666666]], "isOverall": false, "label": "6.3 - Presionar boton Nuevo Cliente-13-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.11 - Formulario Cuentas Bancarias-119-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.24.1 - Segunda Cuenta Bancaria-132-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.27 - Formulario Campos Adicionales-163-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-56-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "11.1 - Hacer clic en Crear Contactos-79-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.10 - Formulario Campos Adicionales-147-success", "isController": false}, {"data": [[1.59719202E12, 0.016666666666666666]], "isOverall": false, "label": "3.1 - Seleccionar en el menu Operaciones del Sistema-7-success", "isController": false}, {"data": [[1.59719202E12, 0.016666666666666666]], "isOverall": false, "label": "4.1 - Seleccionar Modulo de Personas-8-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": " 13.4.10 - Llenar Formulario Relacion -99-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.8 - Formulario Cuentas Bancarias-116-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-64-success", "isController": false}, {"data": [[1.59719202E12, 0.016666666666666666]], "isOverall": false, "label": "1.1 Se selecciona Inicio-1-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.4.1 - Formulario Campos Adicionales Grabar-166-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.1 - Seleccionar la opcion Campos Adicionales-136-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.15 - Formulario Cuentas Bancarias-123-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.4.3 - Formulario Campos Adicionales Grabar-168-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.16- Formulario Cuentas Bancarias-124-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10.4 - Formulario Domicilio Venta Provincia Pais de residencia-43-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.6 - Formulario Campos Adicionales-143-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "7.7 - Formulario Persona Digito Verificador y Fecha de Vencimiento-20-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.5.3 - Formulario Campos Adicionales Cerrar-171-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.5 - Formulario Campos Adicionales-142-success", "isController": false}, {"data": [[1.59719202E12, 0.016666666666666666]], "isOverall": false, "label": "1.2 Se Selecciona Index-2-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "18.4 - Presionar el boton Cerrar  Insis-185-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4 - Llenar el Formulario de Cuentas Bancarias-success", "isController": true}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "7.6 - Formulario Datos de la Persona Identificacion-19-failure", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "13.4.3 - Llenar Formulario Relacion -91-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10.5 - Formulario Domicilio Provincia Pais de residencia-44-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.22 - Formulario Cuentas Bancarias-130-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.25 - Formulario Campos Adicionales-161-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-55-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.9 - Formulario Cuentas Bancarias-117-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "7.18 - Formulario Datos de la Persona Pais-31-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-74-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.4 - Formulario Cuentas Bancarias-112-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "7.5 - Formulario Datos de la Persona Identificacion-18-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-success", "isController": true}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14 - Seleccionar opcion Cuentas Bancarias -success", "isController": true}, {"data": [[1.59719202E12, 0.016666666666666666]], "isOverall": false, "label": "2 - Login-success", "isController": true}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "17.2 - Presionar el boton Cerrar  Persona--176-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "16 - Presionar el boton Grabar Persona-failure", "isController": true}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.5 - Guardar Cuentas Bancarias-success", "isController": true}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.1 - Formulario Campos Adicionales-138-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "11.3 - Hacer clic en Crear Contactos-81-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "13.3 - Seleccionar Vinculo Relacion-88-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-65-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.25 - Tercera Cuenta Bancaria-success", "isController": true}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "8.3 - Formulario Datos de Cliente Grabar-failure", "isController": true}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.11 - Formulario Campos Adicionales-148-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-58-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "9.1 - Hacer clic en Crear Domicilio-39-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "7 - Formulario Datos de la Persona-failure", "isController": true}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "8.3.2 - Formulario Datos de Cliente Grabar-38-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "13.1 - Seleccionar opcion Relacion-86-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "13 - Seleccionar opcion Relacion-success", "isController": true}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "9 - Seleccionar Domicilio-success", "isController": true}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Hacer clic en boton Guardar Domicilio-77-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.15 - Formulario Campo Perfil PYMES-152-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.5 - Formulario Cuentas Bancarias-113-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.5.1 - Guardar Cuentas Bancarias-134-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10.6 - Formulario Domicilio Provincia Pais de residencia-45-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "13.2 - Hacer clic en Crear Relacion-87-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -97-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.12 - Formulario campo Nombre de la Empresa y Nacionalidad-149-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.5 - Formulario Campos Adicionales Cerrar-success", "isController": true}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "13.5.1 - Formulario Relacion Guardar-104-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": " 13.4.8 - Llenar Formulario Relacion -96-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-62-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.4.2 - Formulario Campos Adicionales Grabar-167-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "Debug Sampler-success", "isController": false}, {"data": [[1.59719202E12, 0.016666666666666666]], "isOverall": false, "label": "7.1 - Se abre Formulario Persona-15-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "7.13 - Formulario Datos de la Persona Buscar Ocupacion-26-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.14 - Formulario Campos Adicionales-151-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.26 - Formulario Campos Adicionales-162-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "7.17 - Formulario Datos de la Persona Fecha de Nacimiento-30-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.23.1 - Cunenta Bancaria Principal-131-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-61-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "12.3.2 - Formulario Contactos Guardar-85-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.5.2 - Formulario Campos Adicionales Cerrar-170-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "7.16 - Formulario Datos de la Persona Seleccionar Genero-29-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10.3 - Formulario Domicilio Provincia Pais de residencia-42-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.23 - Cunenta Bancaria Principal-success", "isController": true}, {"data": [[1.59719202E12, 0.016666666666666666]], "isOverall": false, "label": "6.4 - Presionar boton Nuevo Cliente-14-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.10 - Formulario Cuentas Bancarias-118-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-72-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "18.1 - Presionar el boton Cerrar  Insis-182-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "8.3.1 - Formulario Datos de Cliente Grabar-37-failure", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": " 13.4.12 - Llenar Formulario Relacion -101-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "16.2 - Presionar el boton Grabar Persona-174-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "7.20 - Presionar Grabar Datos de la Persona -failure", "isController": true}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.25.1 - Tercera Cuenta Bancaria-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.2 - Hacer clic en la opcion Campos Adicionales-137-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "7.20.1 - Presionar Grabar Datos de la Persona -33-failure", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.21 - Formulario Cuentas Bancarias-129-success", "isController": false}, {"data": [[1.59719202E12, 0.016666666666666666]], "isOverall": false, "label": "6 - Presionar boton Nuevo Cliente-success", "isController": true}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": " 13.4.7 - Llenar Formulario Relacion -95-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.22 - Formulario Campos Adicionales-158-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.12 - Formulario Cuentas Bancarias-120-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "7.8 - Formulario Datos de la Persona Nombre-21-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-63-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.23 - Formulario Campo Accionista-159-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.19 - Formulario Cuentas Bancarias-127-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10.8 - Formulario Domicilio Corregimiento Distrito-47-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.29 - Formulario Campos Adicionales-165-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "13.4.4 - Llenar Formulario Relacion -92-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito ventana-57-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.16 - Formulario Tipo de PYMES-153-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10.2 - Formulario Domicilio Provincia Pais de residencia-41-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.2 -  Formulario Campos Adicionales-139-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "11 - Seleccionar opcion Contactos-success", "isController": true}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": " 13.4.11 - Llenar Formulario Relacion -100-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.17 - Formulario Cuentas Bancarias-125-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito Ventana-71-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "16.1 - Presionar el boton Grabar Persona-173-failure", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "8.2 - Seleccionar Datos de Cliente-36-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "7.19 - Formulario Datos de la Persona Nacionalidad-32-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": " 13.4.13 - Llenar Formulario Relacion Identificacion -102-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-60-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "18 - Presionar el boton Cerrar  Insis-success", "isController": true}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.13 - Formulario Campo Cargo que Ocupa-150-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "13.4 - Formulario Relacion Buscar -success", "isController": true}, {"data": [[1.59719202E12, 0.016666666666666666]], "isOverall": false, "label": "5.2 -Hacer clic en la opcion Cliente-10-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.3 -  Formulario Campos Adicionales-140-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "Transaction Controller-failure", "isController": true}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-68-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.20 - Formulario Campos Adicionales Actividad Principal-156-success", "isController": false}, {"data": [[1.59719202E12, 0.016666666666666666]], "isOverall": false, "label": "6.1 - Presionar boton Nuevo Cliente-11-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "12.2 - Formulario Contactos Correo-83-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-52-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "7.15 - Formulario Datos de la Persona Seleccionar Genero-28-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "13.4.5 - Llenar Formulario Relacion -93-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-59-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.19- Formulario Campo Ingresos Anuales-155-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.24 - Segunda Cuenta Bancaria-success", "isController": true}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-70-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3 - Llenar Formulario Campos Adicionales-success", "isController": true}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.3 - Formulario Cuentas Bancarias-111-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.4 - Formulario Campos Adicionales Grabar-success", "isController": true}, {"data": [[1.59719202E12, 0.016666666666666666]], "isOverall": false, "label": "3 - Seleccionar en el menu Operaciones del Sistema-success", "isController": true}, {"data": [[1.59719202E12, 0.016666666666666666]], "isOverall": false, "label": "5.1 - Seleccionar en el menu Cliente-9-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": " 13.4.9 - Llenar Formulario Relacion -98-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Llenar el Formulario Domicilio-success", "isController": true}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.1 - Formulario Cuentas Bancarias-109-success", "isController": false}, {"data": [[1.59719202E12, 0.016666666666666666]], "isOverall": false, "label": "4 - Seleccionar en el menu Modulo de Personas-success", "isController": true}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "11.2 - Hacer clic en Crear Contactos-80-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "17.3 - Presionar el boton Cerrar  Persona--success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-69-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.8 - Formulario Campos Adicionales-145-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.5.2 - Guardar Cuentas Bancarias-135-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "7.20.2 - Presionar Grabar Datos de la Persona -34-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "12.3.1 - Formulario Contactos Guardar-84-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "12 - Llenar el Formulario de Contactos-success", "isController": true}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10.1 - Formulario Domicilio Tipo de direccion-40-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": " 13.4.14 - Llenar Formulario Relacion -103-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "13.5.2 - Formulario Relacion Guardar-105-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "14.1 - Hacer clic en Crear Cuentas Bancarias-106-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.2 - Hacer clic en Crear Cuentas Bancarias-107-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.28 - Formulario Campos Adicionales-164-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "17.4 - Presionar el boton Cerrar  Persona--178-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.7 - Formulario Campos Adicionales-144-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.3 - Hacer clic en Crear Cuentas Bancarias-108-success", "isController": false}, {"data": [[1.59719202E12, 0.016666666666666666]], "isOverall": false, "label": "7.4 - Formulario Datos de la Persona Identificacion-17-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "7.9 - Formulario Datos de la Persona Primer Apellido-22-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "8 - Llenar Formulario Datos de Cliente-failure", "isController": true}, {"data": [[1.59719202E12, 0.016666666666666666]], "isOverall": false, "label": "7.2 - Se abre Formulario Persona-16-success", "isController": false}, {"data": [[1.59719202E12, 0.016666666666666666]], "isOverall": false, "label": "5 - Seleccionar en el menu Clientes-success", "isController": true}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-75-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito -53-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.2 - Formulario Cuentas Bancarias-110-success", "isController": false}, {"data": [[1.59719202E12, 0.016666666666666666]], "isOverall": false, "label": "6.2 - Presionar boton Nuevo Cliente-12-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-66-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.3.24 - Formulario Campo Porcentaje de participacion-160-success", "isController": false}, {"data": [[1.59719208E12, 0.016666666666666666]], "isOverall": false, "label": "10 - Formulario Domicilio Corregimiento Distrito-54-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.7 - Formulario Cuentas Bancarias-115-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "14.4.14 - Formulario Cuentas Bancarias-122-success", "isController": false}, {"data": [[1.59719214E12, 0.016666666666666666]], "isOverall": false, "label": "15.5.4 - Formulario Campos Adicionales Cerrar-172-success", "isController": false}, {"data": [[1.59719202E12, 0.016666666666666666]], "isOverall": false, "label": "2.3 - Presionar aceptar Login-5-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59719214E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.05, "minX": 1.59719202E12, "maxY": 1.5166666666666666, "series": [{"data": [[1.59719202E12, 0.35], [1.59719214E12, 1.45], [1.59719208E12, 1.5166666666666666]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.59719214E12, 0.05], [1.59719208E12, 0.11666666666666667]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59719214E12, "title": "Total Transactions Per Second"}},
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
