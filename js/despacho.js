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