function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).ready(function () {
	productos = getProductos();
	// console.log(JSON.stringify(productos));
	
	// if (productos.length>0) {
		ids = [];
		cantidades = [];
		for (var i = productos.length - 1; i >= 0; i--) {
			ids.push(productos[i][0]);
			// cantidades.push([]);
		}
		// console.log(ids);
		$.ajax({
		    type: "POST",
		    url: 'database/metodosPago.php',
		    dataType: 'json',
		    data: "id_compra="+getParameterByName("idcompra"),
		    beforeSend: function(argument) {
				$("#modalcargando").modal();
			},
		    success: function(response)
		    {
		    	// console.log(response[0].estado);
		    	if (!(parseInt(response[0].estado)==2)) {
			    	Culqi.publicKey = 'sk_test_4610c3692687a261';
						Culqi.settings({
							title: 'Pago de Producto(s)',
							currency: 'PEN',
							description: '',
							amount: response[0].preciototal*100
						});
					}else{
						// setCookie("carrito-productos","","1");
						document.cookie = 'carrito-productos' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		    		window.location = 'tienda.html';
					}
		    },
		    complete: function() {
		        $("#modalcargando").modal('hide');
		    }
		});
	// }
});


$(document).on("click",".pagoculqui",function () {
	Culqi.open();
});

function culqi() {
  if (Culqi.token) { // ¡Objeto Token creado exitosamente!
      var token = Culqi.token.id;
      console.log('Se ha creado un token:' + token);
      //En esta linea de codigo debemos enviar el "Culqi.token.id"
      //hacia tu servidor con Ajax
        $.ajax({
			    type: "POST",
			    url: 'database/compra.php',
			    dataType: 'json',
			    data: {
			    	id_compra:getParameterByName("idcompra"),
			    	token:token
			    },
			    beforeSend: function(argument) {
						$("#modalcargando").modal();
					},
			    success: function(response)
			    {
			    	// console.log(response);
			    	if (response=="exito") {
			    		document.cookie = 'carrito-productos' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			    		window.location = 'tienda.html';
			    	}else{
			    		alert("Hubo un problema con la compra");
			    	}
			    },
			    complete: function() {
			      $("#modalcargando").modal('hide');
			    }
				});
  } else { // ¡Hubo algún problema!
      // Mostramos JSON de objeto error en consola
      console.log(Culqi.error);
      alert(Culqi.error.user_message);
  }
};