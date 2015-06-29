$(document).ready(function(e) {
	
	CargarInicio();
	
});

function CargarInicio()
{
	var	titulo = CrearElemento('div', 'title');
	$(titulo).html('Armá tu ciudad');
	$('#inicio').append(titulo);

	var	subTitulo = CrearElemento('div', 'subTitle');
	$(subTitulo).html('Hacé como si fueras un/a legislador/a y designá el porcentaje del presupuesto que querés destinar a cada área </br> ¿Qué considerás prioritario? ¿Qué deseás mejorar?');
	$('#inicio').append(subTitulo);
	
	var iniciarJuego = CrearElemento('div', 'buttonIniciarJuego');
	$(iniciarJuego).html('Comenzar');
	$(iniciarJuego).click(function(e) {
		CargaJuego(categoriasDefault);
    });
	$('#inicio').append(iniciarJuego);
}

function CargaJuego(data)
{
	CargarData('#juego', data);


	var terminarJuego = CrearElemento('div', 'finishButton');
	$(terminarJuego).html('Terminar');
	$(terminarJuego).click(function(e) {
		CargarResultados(data);
		
		//Guardar resultado en base de datos
		//Crear cookie con un identificador del resultado
    });
	$('.header').append(terminarJuego);

	//Interaccion
	$('.item-container:not(:last)').resizable({
		handles: "e",
		resize: function( event, ui ) {
			var dif = ui.originalSize.width - $(ui.element).outerWidth(true) + 1;
			var siguientes = $('.ui-resizable-resizing ~ .item-container').filter(function(index, e){
				return ( dif > 0 || (dif < 0 && $(e).outerWidth(true) > 12)) });
			var sumaCategoria = dif / siguientes.length;

			var presupuesto = (ui.size.width + 2) / window.anchoTotal * window.presupuestoTotal;
			$(ui.element).children('.presupuestoCategoria').html(FormateoDinero(presupuesto));

			siguientes.each(function(index, element) {
				var anchoCategoria = parseFloat($(this).attr('data-presupuesto')) / window.presupuestoTotal * window.anchoTotal + sumaCategoria;
				var presupuesto = anchoCategoria / window.anchoTotal * window.presupuestoTotal;
				$(this).children('.presupuestoCategoria').html(FormateoDinero(presupuesto));
				$(element).css('width', anchoCategoria + 'px');
            });
			ui.element.css('width', ui.size.width + 'px');
		},
		stop: function(event, ui)
		{
			$('.item-container').each(function(index, element) {
                var cat = data.filter(function(cat){return cat.codigo == parseInt($(this).attr('data-codigo'))});
				cat.presupuesto = $(this).outerWidth(true) / window.anchoTotal * window.presupuestoTotal;
				$(this).children('.presupuestoCategoria').html(FormateoDinero(cat.presupuesto));
				$(this).attr('data-presupuesto', cat.presupuesto);
            });
		}
	});
	
	//Desplazamiento hacia el contenedor del juego
	$('.container-wrapper').animate({top: '-100%'}, 1000, function()
		{
			setTimeout(function(){
				$('.item-container').css('border-color', 'rgba(0,0,0,.1)');
				$('.header').animate({top:0}, 300);
			}, 200);
		}
	);
}

function CargarResultados(data)
{
	var	contenedor1 = CrearElemento('div', 'inset-container');
	$('#resultados').append(contenedor1);
		var titulo1 = CrearElemento('div','headerName');
		$(titulo1).html('Tu ciudad');
		$(contenedor1).append(titulo1);

	var	contenedor2 = CrearElemento('div', 'inset-container');
	$('#resultados').append(contenedor2);
		var titulo2 = CrearElemento('div','headerName');
		$(titulo2).html('Ciudad actual');
		$(contenedor2).append(titulo2);

	CargarData(contenedor1, data);
	CargarData(contenedor2, categoriasGobierno2015);

	$('.container-wrapper').animate({top: '-200%'}, 1000, function()
		{
			setTimeout(function(){
				$('.header').animate({top:'-85px'}, 300);
				$('.inset-container').animate({opacity:1}, 700);
			}, 200);
		}
	);
}

function CargarData(contenedor, data)
{
	//Creación del cielo, calle base y contenedor de categorias
	var sky = CrearElemento('div', 'street-section-sky');
	$(contenedor).append(sky);
		$(sky).append(CrearElemento('div', 'rear-clouds'));
		$(sky).append(CrearElemento('div', 'front-clouds'));
	var base = CrearElemento('div', 'items-base');
	$(contenedor).append(base);
	var itemsContainer = CrearElemento('div', 'items-container');
	$(contenedor).append(itemsContainer);
	
	//Calculo de presupuestoTotal en base a la suma de los presupuestos de todas las categoiras
	window.presupuestoTotal = 0;
	data.forEach(function(cat){window.presupuestoTotal += cat.presupuesto;});
	
	window.anchoTotal = $(itemsContainer).outerWidth(true);
	
	//Carga de cada categoria en el contenedor con un ancho relativo a su presupuesto
	data.forEach(function(cat)
	{
		var anchoCategoria = cat.presupuesto / window.presupuestoTotal * window.anchoTotal;

		var itemCategoria = document.createElement('div');
		$(itemCategoria).addClass('item-container');
		$(itemCategoria).attr('id', 'panelCategoria'+cat.codigo);
		$(itemCategoria).attr('data-codigo', cat.codigo);
		$(itemCategoria).attr('data-presupuesto', cat.presupuesto);
		$(itemCategoria).css('width', anchoCategoria+'px');
		$(itemsContainer).append(itemCategoria);
		
		var dataContainer = document.createElement('div');
		$(dataContainer).addClass('dataContainer');
		$(dataContainer).css('background-color', cat.color);
		$(itemCategoria).append(dataContainer);
		
		var nombreCategoria = document.createElement('div');
		$(nombreCategoria).addClass('nombreCategoria');
		$(nombreCategoria).html(cat.nombre);
		$(nombreCategoria).attr('title', cat.nombre);
		$(itemCategoria).append(nombreCategoria);

		var presupuestoCategoria = document.createElement('div');
		$(presupuestoCategoria).addClass('presupuestoCategoria');
		$(presupuestoCategoria).html(FormateoDinero(cat.presupuesto));
		$(itemCategoria).append(presupuestoCategoria);

		var imagenesCategoriaContainer = document.createElement('div');
		$(imagenesCategoriaContainer).addClass('imagenesCategoriaContainer');
		$(itemCategoria).append(imagenesCategoriaContainer);
		
		var imagenCategoria = document.createElement('div');
		$(imagenCategoria).addClass('imagenCategoria');
		$(imagenCategoria).css('background-image', 'url(IMG/categorias/'+cat.imagen+')');
		$(imagenesCategoriaContainer).append(imagenCategoria);
	});
}

function SinPx(string)
{
	return parseInt(string.split('px')[0]);
}

function SinPorcentaje(string)
{
	return parseInt(string.split('%')[0]);
}

function Porcentaje(valor, total)
{
	return valor / total * 100;
}

function FormateoDinero(num)
{
	var str = (num/1000000).toFixed(2).toString().split('.');
    if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1.');
    }
    return '$' + str.join(',') + ' M';
}

function CrearElemento(tag, className)
{
	var presupuestoCategoria = document.createElement(tag);
	$(presupuestoCategoria).addClass(className);
	return presupuestoCategoria;
}