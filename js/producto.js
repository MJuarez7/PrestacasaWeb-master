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
		    	console.log(response[0]);
		    	oferta = getOferta(response[0].precio);
		    	$url = "images/productos/p"+response[0].id+"/1.jpg";
		    	$("#imgproducto").attr("src",$url);
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