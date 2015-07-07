function CargarDefault(categories, totalBudget)
{
	window.categoriasDefault = categories.map(function(category) {
		return {
			codigo: category._id,
			nombre: category.name,
			color: DEFAULT_COLOR,
			presupuesto: totalBudget / categories.length,
			imagen: category.image
		}
	})
}