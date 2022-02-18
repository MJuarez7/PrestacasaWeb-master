$(document).ready(function() {
	$.ajax({
	    type: "POST",
	    url: 'database/tienda.php',
	    dataType: 'json',
	    data: "productos="+JSON.stringify(productos)+'&condicion=productos',
	    beforeSend: function(argument) {
			$("#modalcargando").modal();
		},
	    success: function(response)
	    {
	    	var subtotal = 0;
			for (var i = 0; i < response.length; i++) {
				subtotal = subtotal + parseFloat(response[i].cantidad)*parseFloat(response[i].precio);
			}
			$("#preciototalc").val(subtotal);
	    },
		complete: function() {
	        $("#modalcargando").modal('hide');
	    }
	});

	$.ajax({
	    type: "POST",
	    url: 'database/ubigeo.php',
	    dataType: 'json',
	    data: {
	    	condicion:"departamento"
	    },
	    beforeSend: function(argument) {
			$("#modalcargando").modal();
		},
	    success: function(response)
	    {
	    	// console.log(response);
	    	$("#provincias").html("");
	    	$("#distritos").html("");
	    	$("#departamentos").append("<option value='0'>Seleccionar Departamento</option>");
	    	for (var i = 0; i < response.length; i++) {
	    		$("#departamentos").append("<option value='"+response[i].idDepa+"'>"+response[i].departamento+"</option>");
	    	}
	    },
		complete: function() {
	        $("#modalcargando").modal('hide');
	    }
	});
});


$(document).on("change","#departamentos",function() {
	$.ajax({
	    type: "POST",
	    url: 'database/ubigeo.php',
	    dataType: 'json',
	    data: {
	    	condicion:"provincia",
	    	idDepa:$(this).val()
	    },
	    beforeSend: function(argument) {
			$("#modalcargando").modal();
		},
	    success: function(response)
	    {
	    	$("#distritos").html("");
	    	// console.log(response);
	    	$("#provincias").append("<option value='0'>Seleccionar Provincia</option>");
	    	for (var i = 0; i < response.length; i++) {
	    		$("#provincias").append("<option value='"+response[i].idProv+"'>"+response[i].provincia+"</option>");
	    	}
	    },
		complete: function() {
	        $("#modalcargando").modal('hide');
	    }
	});
});


$(document).on("change","#provincias",function() {
	$.ajax({
	    type: "POST",
	    url: 'database/ubigeo.php',
	    dataType: 'json',
	    data: {
	    	condicion:"distrito",
	    	idProv:$(this).val()
	    },
	    beforeSend: function(argument) {
			$("#modalcargando").modal();
		},
	    success: function(response)
	    {
	    	// console.log(response);
	    	$("#distritos").append("<option value='0'>Seleccionar Distrito</option>");
	    	for (var i = 0; i < response.length; i++) {
	    		$("#distritos").append("<option value='"+response[i].idDist+"'>"+response[i].distrito+"</option>");
	    	}
	    },
		complete: function() {
	        $("#modalcargando").modal('hide');
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
		beforeSend: function(argument) {
			$("#modalcargando").modal();
		},
	    success: function(response)
	    {
	      console.log(response);
	      if (response==0) {
	      	alert("Necesitamos al menos tu correo, nombre y teléfono");
	      }else{
	      	window.location = 'metodosPago.html?idcompra=' + response;
	      }
	    },
		complete: function() {
	        $("#modalcargando").modal('hide');
	    }
	});
});