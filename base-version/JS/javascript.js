$(document).ready(function(e) {
	CargarData(categoriasDefault);
});

function CargarData(data)
{
	window.presupuestoTotal = 0;
	data.forEach(function(cat){window.presupuestoTotal += cat.presupuesto;});
	$('.total-dinero').html(FormateoDinero(window.presupuestoTotal));
	
	window.anchoTotal = $('.items-container').outerWidth(true);
	
	//Carga Inicial
	data.forEach(function(cat)
	{
		var anchoCategoria = cat.presupuesto / window.presupuestoTotal * window.anchoTotal;

		var itemCategoria = document.createElement('div');
		$(itemCategoria).addClass('item-container');
		$(itemCategoria).attr('id', 'panelCategoria'+cat.codigo);
		$(itemCategoria).attr('data-codigo', cat.codigo);
		$(itemCategoria).attr('data-presupuesto', cat.presupuesto);
		$(itemCategoria).css('width', anchoCategoria+'px');
		$('.items-container').append(itemCategoria);
		
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