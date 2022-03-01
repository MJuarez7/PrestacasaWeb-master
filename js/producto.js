function mostrarContadorbolsa() {
	getproductos = getProductos();
	productosseleccionados = [];
	if (getproductos) {
		for (var i = 0; i < getproductos.length; i++) {
			productosseleccionados.push({'id':getproductos[i][0],
									'cantidad':getproductos[i][1]});
		}
	}
	contador = 0;
	if (productosseleccionados.length>0) {
		for (var i = 0; i < productosseleccionados.length; i++) {
			// console.log(productosseleccionados[i]['id']);
			contador=contador+parseInt(productosseleccionados[i]['cantidad']);
		}
	}
	$(".contadorbolsa").html(contador);
}

function getOferta(precio) {
	if (parseFloat(precio)<=30) {
		oferta = 55.0;
	}else if (parseFloat(precio)>=31 && parseFloat(precio)<=50) {
		oferta = 45.0;
	}else if (parseFloat(precio)<=51 && parseFloat(precio)>=70) {
		oferta = 35.0;
	}else if (parseFloat(precio)<=71 && parseFloat(precio)>=90) {
		oferta = 25.0;
	}else if (parseFloat(precio)<=91 && parseFloat(precio)>=110) {
		oferta = 20.0;
	}else{
		oferta = 15.0;
	}
	return oferta;
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getInfoProductos(idproducto) {
	$.ajax({
	    type: "POST",
	    url: 'database/producto.php',
	    dataType: 'json',
	    data: "idproducto="+idproducto,
	    beforeSend: function(argument) {
			$("#modalcargando").modal();
		},
	    success: function(response)
	    {
	    	if (response.length>0) {
	    		console.log(response[0]);
	   			$(".MATERIAL").html(response[0].MATERIAL);
				$(".ALTO").html(response[0].ALTO);
				$(".ANCHO").html(response[0].ANCHO);
				$(".PROFUNDIDAD").html(response[0].PROFUNDIDAD);
				$(".OPERATIVIDAD").html(response[0].OPERATIVIDAD);
				$(".CAPACIDAD").html(response[0].CAPACIDAD);
				$(".PESO").html(response[0].PESO);
				$(".COLOR").html(response[0].COLOR);
				$(".FUNCIONALIDAD").html(response[0].FUNCIONALIDAD);
				$(".GARANTIA").html(response[0].GARANTIA);
				$(".INCLUYE").html(response[0].INCLUYE);
				$(".PRECAUCIONES").html(response[0].PRECAUCIONES);
				$(".DESCRIPCION").html(response[0].DESCRIPCION);
				$(".CARACTERISTICAS").html(response[0].CARACTERISTICAS);
	    	}else{
	    		console.log("No tiene características en la BD");
	    	}
	    },
		complete: function() {
	        $("#modalcargando").modal('hide');
	    }
    });
}

$(document).ready(function () {
	mostrarContadorbolsa();
	getproductos = getProductos();
	idproducto = getParameterByName('idproducto');
	if (idproducto) {
		$.ajax({
		    type: "POST",
		    url: 'database/tienda.php',
		    dataType: 'json',
		    data: "productos="+JSON.stringify(productos)+"&idproducto="+idproducto+'&condicion=productos',
		    beforeSend: function(argument) {
				$("#modalcargando").modal();
			},
		    success: function(response)
		    {
		    	// console.log(response[0]);
		    	oferta = getOferta(response[0].precio);
		    	// $url = "images/productos/p"+response[0].id+"/1.jpg";
		    	// $("#imgproducto").attr("src",$url);

		    	$url1 = "images/productos/p"+response[0].id+"/1.jpg";
		    	$url2 = "images/productos/p"+response[0].id+"/2.jpg";
		    	$url3 = "images/productos/p"+response[0].id+"/3.jpg";
		    	$url4 = "images/productos/p"+response[0].id+"/4.jpg";
		    	$url5 = "images/productos/p"+response[0].id+"/5.jpg";
		    	$url6 = "images/productos/p"+response[0].id+"/6.jpg";
		    	$(".imgproducto1").attr("src",$url1);
		    	$(".imgproducto2").attr("src",$url2);
		    	$(".imgproducto3").attr("src",$url3);
		    	$(".imgproducto4").attr("src",$url4);
		    	$(".imgproducto5").attr("src",$url5);
		    	$(".imgproducto6").attr("src",$url6);

		    	$("#catproducto").html(response[0].categoria);
		    	$("#nombproducto").html(response[0].nombre);
		    	$("#oferproducto").html(oferta+'% (OFERTA)');
		    	$("#preproducto").html(response[0].precio);
		    	preciooferta = parseFloat(response[0].precio)*((parseFloat(oferta)+100.00)/100.00);
		    	preciooferta = Math.round(preciooferta * 100) / 100;
		    	$("#oferpreproducto").html(preciooferta);

		    	$("#modalpreciounit").val(response[0].precio);
		    	$("#modalcantidad").val(response[0].cantidad);
		    	$("#aumentarcant").attr("idproducto",parseInt(response[0].id));
				$("#disminuircant").attr("idproducto",parseInt(response[0].id));
				if (response[0].cantidad<=0) {
					$("#enbolsa").attr('hidden','hidden');
					$("#disminuircant").attr('hidden','hidden');
					$("#prefinalproducto").attr('hidden','hidden');
				}else{
					$("#enbolsa").removeAttr('hidden');
					$("#prefinalproducto").removeAttr('hidden');
					$("#prefinalproducto").html(parseFloat(response[0].precio)*parseFloat(response[0].cantidad));
				}
		    },
			complete: function() {
		        $("#modalcargando").modal('hide');
		    }
		});
	}else{
		window.location = 'tienda.html';
	}

	getInfoProductos(idproducto);

	var main = new Splide( '#main', {
		type      : 'fade',
		rewind    : true,
		pagination: false,
		arrows    : false,
	} );

	var thumbnails = new Splide( '#thumbnail', {
		fixedWidth  : 100,
		fixedHeight : 60,
		gap         : 10,
		rewind      : true,
		pagination  : false,
		isNavigation: true,
		breakpoints : {
		  600: {
		    fixedWidth : 60,
		    fixedHeight: 44,
		  },
		},
	} );

	main.sync( thumbnails );
	main.mount();
	thumbnails.mount();
});


$(document).on("click","#aumentarcant",function(e) {
	e.preventDefault();
	// console.log(parseInt($("#modalcantidad").val()));
	nuevovalor = parseInt($("#modalcantidad").val())+1;
	$("#modalcantidad").val(nuevovalor);
	AgregarCarrito($(this).attr("idproducto"));
	location.reload();
});

$(document).on("click","#disminuircant",function(e) {
	e.preventDefault();
	// console.log(parseInt($("#modalcantidad").val()));
	nuevovalor = parseInt($("#modalcantidad").val())-1;
	$("#modalcantidad").val(nuevovalor);
	QuitarProducto($(this).attr("idproducto"));
	location.reload();
});