function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).ready(function () {
	idcompra = getParameterByName("idcompra");

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
		    	var subtotal = 0;
				for (var i = 0; i < response.length; i++) {
					subtotal = subtotal + parseFloat(response[i].cantidad)*parseFloat(response[i].precio);
				}
				
				Culqi.settings({
					title: 'Pago',
					currency: 'PEN',
					description: '',
					amount: subtotal*100
				});
		    }
		});
	}
});


$(document).on("click",".pagoculqui",function () {
	Culqi.open();
});