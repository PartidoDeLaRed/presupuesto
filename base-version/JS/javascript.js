$(document).ready(function(e) {
	window.categorias = [
		{
			nombre: 'Salud',
			presupuesto: 1000,
			imagen: 'saludIcon.png',
			color: 'saludIcon.png',
		},
		{
			nombre: 'Educación',
			presupuesto: 1000,
			imagen: 'educacionIcon.png',
			color: 'saludIcon.png',
		},
		{
			nombre: 'Transporte',
			presupuesto: 1000,
			imagen: 'transporteIcon.png',
			color: 'saludIcon.png',
		}
	]
	
	CargarCategorias();
});

function CargarCategorias()
{
	//PresupuestoTotal
	var presupuestoTotal = 0;
	window.categorias.forEach(function(cat){presupuestoTotal += cat.presupuesto;});
	var anchoTotal = $('.items-container').innerWidth() - (categorias.length-1)*10;
	
	var i = 1;
	window.categorias.forEach(function(cat)
	{
		var anchoCategoria = (cat.presupuesto / presupuestoTotal) * 100;

		var itemCategoria = document.createElement('div');
		$(itemCategoria).addClass('item-container');
		$(itemCategoria).css('width', anchoCategoria+'%');
		$('.items-container').append(itemCategoria);
		
		if(i < categorias.length)
		{
			var dragger = document.createElement('div');
			$(dragger).addClass('dragger');
			$(dragger).draggable({ axis: "x", 
				start: function() {
				},
				drag: function() {
				},
				stop: function() {
				}
			});
			$('.items-container').append(dragger);
		}
		i++;
	});
}