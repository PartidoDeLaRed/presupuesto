function CargarDefault(categories, totalBudget)
{
	window.categoriasDefault = categories.map(function(category) {
		return {
			codigo: category._id,
			nombre: category.name,
			color: DEFAULT_COLOR,
			presupuesto: totalBudget / categories.length,
			imagen: category.image,
			info: InfoCategory(category.name)
		}
	})
}

function InfoCategory(cat)
{
	switch(cat)
	{
		case 'Salud': 
			return "La ciudad ofrece un sistema público y gratuito de servicios de salud que incluye: atención en hospitales y centros de atención, acciones de prevención y la acción del SAME, entre otros. El Ministerio de Salud dispone del 90% de esta área."; break;
		case 'Promoción y Acción Social': 
			return "¿Cómo garantizar la igualdad de oportunidades? Hoy, Buenos Aires ofrece, por ejemplo, el programa Ciudadanía Porteña y estímulos económicos para la finalización de estudios secundarios. ¿Vos qué harías? El 50% de este presupuesto lo ejecuta el Ministerio de Desarrollo Social."; break;
		case 'Transporte y Espacio Público': 
			return "¿Cómo nos trasladamos en la ciudad? Metrobuses, ciclovías, políticas de reordenamiento del tránsito y de promoción de la seguridad vial: todo esto es la política de transporte de la ciudad. En la actualidad, el 80 % lo implementa la Jefatura De Gabinete De Ministros."; break;
		case 'Administración y Legislación': 
			return "El funcionamiento de los programas y actividades de una ciudad requieren de personas que los lleven a cabo! Aquí incluimos los salarios que paga la Ciudad a técnicos, profesionales, legisladores y demás miembros de la administración pública porteña."; break;
		case 'Vivienda': 
			return "En su Constitución, la Ciudad reconoce el derecho a una vivienda digna. Hoy el Instituto de la Vivienda (Ministerio de Desarrollo Urbano) implementa el programa Mi casa BA y Alquilar se Puede, además de impulsar la urbanización de villas."; break;
		case 'Ecología y Medio Ambiente': 
			return "Recolección y clasificación de residuos, mantenimiento del sistema de alcantarillado y de los espacios verdes: los Ministerios de Ambiente y Espacio Público y de Desarrollo Urbano impulsan estas tareas. ¿Hay más por hacer?"; break;
		case 'Cultura y Turismo': 
			return "Festivales de teatro, cine, danza, la actividad en los centros culturales de los barrios, la promoción de artistas emergentes y también el disfrute de la ciudad como polo turístico: todo esto es parte de la tarea del Ministerio de Cultura."; break;
		case 'Educación': 
			return "Más del 90% del presupuesto educativo es ejecutado por el Ministerio de Educación. Se destina a brindar educación pública, laica y gratuita en diferentes niveles: inicial, primaria, secundaria y superior."; break;
		case 'Trabajo e Industria': 
			return "Créditos a emprendimientos, capacitaciones profesionales, fomento a la industria cultural: son algunas de las líneas de trabajo del Ministerio de Desarrollo Económico. ¿Qué harías vos?"; break;
		case 'Seguridad y Justicia': 
			return "La prevención del delito y su control constituyen tareas del Ministerio de Justicia y Seguridad. La Policía Metropolitana, por ejemplo, se financia con este presupuesto."; break;
	}
}