$(document).ready(function() {
	productos = getProductos();
	console.log(JSON.stringify(productos));
	if (productos.length>0) {
		ids = [];
		cantidades = [];
		for (var i = productos.length - 1; i >= 0; i--) {
			ids.push(productos[i][0]);
			// cantidades.push([]);
		}
		// console.log(ids);
		$.ajax({
		    type: "POST",
		    url: 'database/tienda.php',
		    dataType: 'json',
		    data: "productos="+JSON.stringify(productos)+'&condicion=productos',
		    success: function(response)
		    {
		    	// console.log(response);
		    	var prods = "";
				for (var i = 0; i < response.length; i++) {
					// console.log(response[i].categoria);
					prods=prods+"<div><label> Nombre"+response[i].nombre+"</label><br><label>Precio Total"+response[i].moneda+" "+response[i].cantidad*response[i].precio+"</label><br><label>Cantidad:"+response[i].cantidad+"</label><br><img height='200px' src='images/productos/p"+response[i].id+"/1.jpg' ></div><br>";
				}
				console.log(response);
				$("#productosselecionados").append(prods);
		    }
		});
	}
});