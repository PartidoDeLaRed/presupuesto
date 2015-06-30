window.DEFAULT_COLOR = 'rgba(255,255,255,.0)';
$(document).ready(function(e) {
	$.get('/api/budget/2015', function (data) {
		var i = -1;
		window.categoriasGobierno2015 = data.map(function(budget) {
			i++;
			return {
				codigo: i,
				nombre: budget.category.name,
				color: DEFAULT_COLOR,
				presupuesto: budget.amount,
				imagen: budget.category.image
			}
		})
		CargarInicio();
	});
});

function CargarInicio()
{
	var sky = CrearElemento('div', 'street-section-sky');
	$('#inicio').append(sky);
		$(sky).append(CrearElemento('div', 'rear-clouds'));
		$(sky).append(CrearElemento('div', 'front-clouds'));

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
	CargarData('#juego', data, false);

	var terminarJuego = CrearElemento('div', 'finishButton');
	$(terminarJuego).html('Terminar');
	$(terminarJuego).click(function(e) {
		CargarResultados(data);

		//Guardar resultado en base de datos
		GuardarData(data, function (respuesta)
		{
			if (respuesta.status === 200)
			{
				var texto = respuesta.responseText;
				var cookieName = 'mybudget';
				//Crear cookie con un identificador del resultado
				document.cookie = cookieName + '=' + texto;
			}
		});
    });
	$('.header').append(terminarJuego);

	var dineroTotal = CrearElemento('div','total-dinero');
	$(dineroTotal).html('Presupuesto Total: '+FormateoDinero(window.presupuestoTotal));
	$('#juego').append(dineroTotal);

	//Interaccion
	$('.item-container:first').resizable({
		handles: "e",
		autoHide: true,
		resize: function( event, ui ) {
			var presupuesto = ui.size.width / window.anchoTotal * window.presupuestoTotal;
			$(ui.element).children('.presupuestoCategoria').html(FormateoDinero(presupuesto));

			dif = ui.originalSize.width - ui.element.outerWidth(true);
			siguientes = $('.ui-resizable-resizing').nextAll().filter(function(index, e){ return ( dif > 0 || (dif < 0 && $(e).outerWidth(true) > 12)) });
			var sumaCategoria = dif / siguientes.length;
			siguientes.each(function(index, element) {
				var anchoCategoria = parseFloat($(element).attr('data-presupuesto')) / window.presupuestoTotal * window.anchoTotal + sumaCategoria;
				var presupuesto = anchoCategoria / window.anchoTotal * window.presupuestoTotal;
				$(this).children('.presupuestoCategoria').html(FormateoDinero(presupuesto));
				$(element).css('width', anchoCategoria + 'px');
            });
			ui.element.css('width', ui.size.width + 'px');
		},
		stop: function(event, ui)
		{
			$(data).each(function(index, element) {
				RecalcularPresupuesto(element);
            });
		}
	});
	$('.item-container:not(:first):not(:last)').resizable({
		handles: "w,e",
		autoHide: true,
		resize: function( event, ui ) {
			var direction = 'left';
			var dif = ui.position.left - ui.originalPosition.left;
			var siguientes = $('.ui-resizable-resizing').prevAll().filter(function(index, e){ return ( dif > 0 || (dif < 0 && $(e).outerWidth(true) > 12)) });
			if(dif == 0)
			{
				direction = 'right';
				dif = ui.originalSize.width - ui.size.width;
				siguientes = $('.ui-resizable-resizing').nextAll().filter(function(index, e){ return ( dif > 0 || (dif < 0 && $(e).outerWidth(true) > 12)) });
			}
			var sumaCategoria = dif / siguientes.length;

			var presupuesto = (ui.size.width + 2) / window.anchoTotal * window.presupuestoTotal;
			$(ui.element).children('.presupuestoCategoria').html(FormateoDinero(presupuesto));

			siguientes.each(function(index, element) {
				var anchoCategoria = parseFloat($(element).attr('data-presupuesto')) / window.presupuestoTotal * window.anchoTotal + sumaCategoria;
				$(element).css('width', anchoCategoria + 'px');

				var presupuesto = anchoCategoria / window.anchoTotal * window.presupuestoTotal;
				$(this).children('.presupuestoCategoria').html(FormateoDinero(presupuesto));
            });

			if(direction == 'right')
				ui.element.css('width', ui.size.width + 'px');
			else
			{
				ui.element.css('margin-left', -dif + 'px');
				ui.element.css('margin-right', dif + 'px');
			}
		},
		stop: function(event, ui)
		{
			ui.element.css('left', ui.position.left + SinPx(ui.element.css('margin-left')));
			ui.element.css('margin-left', 0 + 'px');
			ui.element.css('margin-right', 0 + 'px');
			$(data).each(function(index, element) {
				RecalcularPresupuesto(element);
            });
		}
	});
	$('.item-container:last').resizable({
		handles: "w",
		autoHide: true,
		resize: function( event, ui ) {
			var dif = ui.position.left - ui.originalPosition.left;
			var siguientes = $('.ui-resizable-resizing').prevAll().filter(function(index, e){ return ( dif > 0 || (dif < 0 && $(e).outerWidth(true) > 12)) });
			var sumaCategoria = dif / siguientes.length;

			var presupuesto = (ui.size.width + 2) / window.anchoTotal * window.presupuestoTotal;
			$(ui.element).children('.presupuestoCategoria').html(FormateoDinero(presupuesto));

			siguientes.each(function(index, element) {
				var anchoCategoria = parseFloat($(element).attr('data-presupuesto')) / window.presupuestoTotal * window.anchoTotal + sumaCategoria;
				$(element).css('width', anchoCategoria + 'px');

				var presupuesto = anchoCategoria / window.anchoTotal * window.presupuestoTotal;
				$(this).children('.presupuestoCategoria').html(FormateoDinero(presupuesto));
            });
			ui.element.css('margin-left', -dif + 'px');
			ui.element.css('margin-right', dif + 'px');
		},
		stop: function(event, ui)
		{
			ui.element.css('left', ui.position.left + SinPx(ui.element.css('margin-left')));
			ui.element.css('margin-left', 0 + 'px');
			ui.element.css('margin-right', 0 + 'px');
			$(data).each(function(index, element) {
				RecalcularPresupuesto(element);
            });
		}
	});

	//Desplazamiento hacia el contenedor del juego
	$('.container-wrapper').animate({top: '-100%'}, 1000, function()
		{
			setTimeout(function(){
				$('.item-container').css('border-color', 'rgba(0,0,0,.1)');
				$('.header').animate({top:0}, 500);
			}, 200);
		}
	);
}

function CargarResultados(data)
{
	$('.finishButton').animate({opacity:0}, 500, function(){
		$('.finishButton').remove();
		var masInfo = CrearElemento('div', 'finishButton');
		$(masInfo).html('Mas info');
		$(masInfo).click(function(e) {
			CargarMasInfo();
		});
		$('.header').append(masInfo);
	});

	var	contenedor1 = CrearElemento('div', 'inset-container');
	$('#resultados').append(contenedor1);
		var titulo1 = CrearElemento('div','headerName');
		$(titulo1).html('Tu ciudad');
		$(contenedor1).append(titulo1);

	var	contenedor2 = CrearElemento('div', 'inset-container');
	$('#resultados').append(contenedor2);
		var titulo2 = CrearElemento('div','headerName');
		$(titulo2).html('Buenos Aires hoy');
		$(contenedor2).append(titulo2);

	CargarData(contenedor1, data, true);
	CargarData(contenedor2, categoriasGobierno2015, true);

	$('.container-wrapper').animate({top: '-200%'}, 1000, function()
		{
			setTimeout(function(){
				$('.inset-container').each(function(index, element) {
					setTimeout(function(){
						$(element).animate({opacity:1}, 700);
					}, 300);
                });
			}, 200);
		}
	);
}

function CargarMasInfo()
{
	// Información
	var info = {
		titulo: '¿Cómo se formula el presupuesto porteño?',
		descripcion: 'Cada año, a partir de un proyecto que envía el Jefe de gobierno, la Legislatura porteña sanciona la ley de Presupuesto de la ciudad, que estipula la distribución de los fondos para cada área de gobierno.<br />Las prioridades de gestión de gobierno, así como el mantenimiento del estado, se deciden en el presupuesto.'
	};

	//Cargar información en #datos
	var $datos = $('#datos');

	var $sky = $(CrearElemento('div', 'street-section-sky'));
	$sky.append(CrearElemento('div', 'rear-clouds'));
	$sky.append(CrearElemento('div', 'front-clouds'));

	var $titulo = $(CrearElemento('div', 'title'));
	$titulo.html(info.titulo);

	var $descripcion = $(CrearElemento('div', 'subTitle'));
	$descripcion.html(info.descripcion);

	var $volverInicio = $(CrearElemento('div', 'buttonIniciarJuego'));
	$volverInicio.html('Volver a armar');
	$volverInicio.click(function(e) {
		// vaciamos el contenido de #juego
		$('#juego').html('');
		// y volvemos a ejecutar CargaJuego
		CargaJuego(categoriasDefault);

		// esperamos que termine de subír y borramos los resultados
		// y los datos
		setTimeout(function ()
		{
			$('#resultados').html('');
			$datos.html('');
		}, 1000)
	});

	$datos.append($sky);
	$datos.append($titulo);
	$datos.append($descripcion);
	$datos.append($volverInicio);

	//Desplazamiento hacia el contenedor de más info
	$('.container-wrapper').animate({top: '-300%'}, 1000, function()
		{
			setTimeout(function(){
				$('.item-container').css('border-color', 'rgba(0,0,0,.1)');
				$('.header').animate({top:'-100%'}, 500);
			}, 200);
		}
	);
}

function CargarData(contenedor, data, porcentaje)
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
	var porcentajePromedio = 100 / data.length;
	var leftAcumulador = 0;
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

		if(porcentaje)
		{
			var porcentajeCategoria = CrearElemento('div', 'porcentajeCategoria');
			var dif = Math.round(((cat.presupuesto * 100 / presupuestoTotal) - porcentajePromedio) * 100) / 100;
			$(porcentajeCategoria).html(dif > 0 ? '+'+dif+'%' : +dif+'%');
			$(porcentajeCategoria).css('color', dif > 0 ? '#70C738' : '#C83637');
			$(itemCategoria).append(porcentajeCategoria);
		}

		var imagenesCategoriaContainer = document.createElement('div');
		$(imagenesCategoriaContainer).addClass('imagenesCategoriaContainer');
		$(itemCategoria).append(imagenesCategoriaContainer);

		var imagenCategoria = document.createElement('div');
		$(imagenCategoria).addClass('imagenCategoria');
		$(imagenCategoria).css('background-image', 'url(IMG/categorias/'+cat.imagen+')');
		$(imagenesCategoriaContainer).append(imagenCategoria);
	});
}

function RecalcularPresupuesto(element)
{
	var e = $('.item-container[data-codigo="'+element.codigo+'"]');
	var ancho = e.outerWidth(true);
	element.presupuesto = ancho / window.anchoTotal * window.presupuestoTotal;
	$(e).children('.presupuestoCategoria').html(FormateoDinero(element.presupuesto));
	$(e).attr('data-presupuesto', element.presupuesto);
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

function GuardarData(data, cb)
{
	$.ajax({
		type: 'POST',
		url: '/api/mybudget/',
		data: { data: data },
		dataType: 'json'
	}).always(cb);
}