$(document).ready(function() {
	$.ajax({
	    type: "POST",
	    url: 'database/tienda.php',
	    dataType: 'json',
	    data: "productos="+JSON.stringify(productos)+'&condicion=productos',
	    success: function(response)
	    {
	    	var subtotal = 0;
			for (var i = 0; i < response.length; i++) {
				subtotal = subtotal + parseFloat(response[i].cantidad)*parseFloat(response[i].precio);
			}
			$("#preciototalc").val(subtotal);
	    }
	});
});

$(document).on("click",".btninfocliente",function () {
	getproductos = getProductos();
	productosseleccionados = [];
	if (getproductos) {
		for (var i = 0; i < getproductos.length; i++) {
			productosseleccionados.push({'id':getproductos[i][0],
									'cantidad':getproductos[i][1]});
		}
	}
	$.ajax({
	    type: "POST",
	    url: 'database/despacho.php',
	    dataType: 'json',
	    data: "productos="+JSON.stringify(productosseleccionados)+"&"+$("#formDatosUsuarioCompra").serialize(),
	    success: function(response)
	    {
	      // console.log(response);
	      window.location = 'metodosPago.html?idcompra=' + response;
	    }
	});
});