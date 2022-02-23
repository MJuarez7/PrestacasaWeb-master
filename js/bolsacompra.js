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

function ProductosVista() {
	productos = getProductos();
	// console.log(JSON.stringify(productos));
	if (productos.length>0) {
		ids = [];
		cantidades = [];
		for (var i = productos.length - 1; i >= 0; i--) {
			ids.push(productos[i][0]);
			// cantidades.push([]);
		}
	}
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
	    	// console.log(response);
	    	$("#productosselecionados").html("");
	    	
	    	var prods = "";
	    	var subtotal = 0;
			for (var i = 0; i < response.length; i++) {
				// console.log(response[i].categoria);
				if (parseFloat(response[i].cantidad)>0) {
					prods=prods+"<div class='container form-control my-1'>"+
					"<label> Nombre"+response[i].nombre+"</label><br>"+
					"<label>Precio Total:</label><label>"+response[i].moneda+"</label>"+
					"<label id='modalprecio'>"+response[i].cantidad*response[i].precio+"</label><br>"+
					"<img height='200px' src='images/productos/p"+response[i].id+"/1.jpg'><br>"+
					"<a idproducto='"+response[i].id+"' class='btn btn-primary' id='aumentarcant'>+</a><br>"+
					"<input hidden='hidden' id='modalpreciounit' value='"+response[i].precio+"'>"+
					"<label>Cantidad:</label><input id='modalcantidad' value='"+response[i].cantidad+"' disabled><br>"+
					"<a idproducto='"+response[i].id+"' class='btn btn-primary' id='disminuircant'>-</a>"+
					"</div><br>";
					subtotal = subtotal + parseFloat(response[i].cantidad)*parseFloat(response[i].precio);
				}
			}
			// console.log(response);
			$("#productosselecionados").append(prods);
			$("#subtotalcompra").html('S/.'+subtotal);
			// console.log($("#valorcupon").html());//Falta poner valor de cupon
			$("#totalcompra").html('S/.'+(subtotal-0));
	    },
	    complete: function() {
	        $("#modalcargando").modal('hide');
	    }
	});
}

$(document).ready(function() {
	ProductosVista();
});

$(document).on("click","#aumentarcant",function() {
	nuevovalor = parseInt($("#modalcantidad").val())+1;
	$("#modalcantidad").val(nuevovalor);
	$("#modalprecio").html(parseFloat($("#modalpreciounit").val())*parseFloat(nuevovalor));
	AgregarCarrito($(this).attr("idproducto"));
	mostrarContadorbolsa();
	if (parseInt($("#modalcantidad").val())>0) {
		$("#disminuircant").removeAttr("disabled").off("click");
	}
	ProductosVista();
});

$(document).on("click","#disminuircant",function() {
	nuevovalor = parseInt($("#modalcantidad").val())-1;
	$("#modalcantidad").val(nuevovalor);
	$("#modalprecio").html(parseFloat($("#modalpreciounit").val())*parseFloat(nuevovalor));
	QuitarProducto($(this).attr("idproducto"));
	mostrarContadorbolsa();
	console.log(parseInt($("#modalcantidad").val())<=0);
	if (parseInt($("#modalcantidad").val())<=0) {
		$("#disminuircant").attr("disabled", "disabled").on("click", function() {
		    return false;
		});
	}
	ProductosVista();
});