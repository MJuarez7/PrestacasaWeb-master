$(document).ready(function() {
	productos = getProductos();
	// console.log(productos);
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
		    data: "id="+ids+'&condicion=productos',
		    success: function(response)
		    {
		    	// console.log(response);
		    	var prods = "";
				for (var i = 0; i < response.length; i++) {
					// console.log(response[i].categoria);
					prods=prods+"<div><label> Nombre"+response[i].nombre+"</label><br><label>Precio Unitario"+response[i].moneda+" "+response[i].precio+"</label><br><label>Cantidad:"+""+"</label></div><br>";
				}

				for (var i = ids.length - 1; i >= 0; i--) {
					console.log(ids[i]);
				}
				console.log(productos);
				console.log(response);
				$("#productosselecionados").append(prods);
		    }
		});
	}
});