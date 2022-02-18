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

$(document).ready(function () {
	$.ajax({
		type: "POST",
		url: 'database/categoria.php',
		dataType: 'json',
		data: 'condicion=categoria',
		beforeSend: function(argument) {
			$("#modalcargando").modal();
		},
		success: function(response)
		{
		  // console.log(response);
		  var categorias = "";
		  for (var i = 0; i < response.length; i++) {
		  	// console.log(response[i].categoria);
		  	categorias=categorias+"<input type='checkbox' class='ccategorias' name='categoria["+response[i].categoria+"]'>"+
		  	"<label>"+response[i].categoria+"</label><br>";
		  }
		  // console.log(categorias);
		  $("#categorias").append(categorias);
		},
		complete: function() {
	        $("#modalcargando").modal('hide');
	    }
	});

	$("#categoria").click(function(){
	    $("#categorias").slideToggle("slow");
	});
	$("#precio").click(function(){
	    $("#precios").slideToggle("slow");
	});
	$.ajax({
		type: "POST",
		url: 'database/tienda.php',
		dataType: 'json',
		data: 'condicion=productos',
		beforeSend: function(argument) {
			$("#modalcargando").modal();
		},
		success: function(response)
		{
		  var productos = "";
		  for (var i = 0; i < response.length; i++) {
		  	  oferta = getOferta(response[i].precio);
			  $url = "images/productos/p"+response[i].id+"/1.jpg";
			  productos=productos+"<div class='col-md-3 col-6 my-1'><div class='card h-100'><a href='producto.html?idproducto="+response[i].id+"'><img src='"+$url+"' class='card-img-top' alt='"+response[i].nombre+"'></a><div class='card-body'><h6 class='card-title'style='font-size: 14px;'>"+response[i].nombre+"</h6> <p class='card-text' style='font-size: 12px; color:#58585899'> "+response[i].categoria+"</p><p class='card-text fw-bold' 'style='font-size: 14px;'>"+response[i].moneda+response[i].precio+"</p><p class='card-text' style='font-size: 14px;'>"+oferta+" %</p></div><button type='button' class='btn btn-primary ms-md-3 me-md-3 ms-1 me-1 mb-1 myproducto' idproducto='"+response[i].id+"' nombre='"+response[i].nombre+"' categoria='"+response[i].categoria+"' moneda='"+response[i].moneda+"' precio='"+response[i].precio+"'  url='"+$url+"'>Agregar a la bolsa</button></div></div>";
		  }
		  $("#productos").append(productos);
		},
		complete: function() {
	        $("#modalcargando").modal('hide');
	    }
	});
	mostrarContadorbolsa();
});

$(document).on("click",".myproducto", function() {
	// alert(1);
	AgregarCarrito($(this).attr("idproducto"));
	getproductos = getProductos();
	productosseleccionados = [];
	if (getproductos) {
		for (var i = 0; i < getproductos.length; i++) {
			productosseleccionados.push({'id':getproductos[i][0],
									'cantidad':getproductos[i][1]});
		}
	}
	// console.log(productosseleccionados);
	$("#modalid").val($(this).attr("idproducto"));
	$("#modalmoneda").html($(this).attr("moneda"));
	$("#modalprecio").html($(this).attr("precio"));
	$("#modalpreciounit").val($(this).attr("precio"));
	$("#modalcategoria").html($(this).attr("categoria"));
	$("#modalnombre").html($(this).attr("nombre"));
	$("#modalimagen").attr("src",$(this).attr("url"));

	if (productosseleccionados.length>0) {
		for (var i = 0; i < productosseleccionados.length; i++) {
			// console.log(productosseleccionados[i]['id']);
			if (productosseleccionados[i]['id']==$(this).attr("idproducto")) {
				$("#modalcantidad").val(productosseleccionados[i]['cantidad']);
				if (productosseleccionados[i]['cantidad']>0) {
					$("#modalprecio").html(parseFloat($(this).attr("precio"))*parseFloat(productosseleccionados[i]['cantidad']));
				}
			}
		}
	}
	// console.log(contador);
	$("#aumentarcant").attr("idproducto",$(this).attr("idproducto"));
	$("#disminuircant").attr("idproducto",$(this).attr("idproducto"));
	$("#modelAgregarProducto").modal();
	mostrarContadorbolsa();
	if (parseInt($("#modalcantidad").val())>0) {
		$("#disminuircant").removeAttr("disabled").off("click");
	}
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
});

$(document).on("click",".cerrarmodal", function() {
	// console.log(this);
	$("#modelAgregarProducto").modal('hide');
});

$(document).on("change","#ordenamiento",function(argument) {
	consultarproductos($("#formfiltros").serialize());
});

$(document).on("click",".ccategorias",function(argument) {
	consultarproductos($("#formfiltros").serialize());
});

$(document).on("click","#buscar",function(argument) {
	consultarproductos($("#formfiltros").serialize());
});

function consultarproductos(data) {
	// console.log(data);
	$.ajax({
		type: "POST",
		url: 'database/tienda.php',
		dataType: 'json',
		data: data+'&condicion=productos',
		beforeSend: function(argument) {
			$("#modalcargando").modal();
		},
		success: function(response)
		{
		  // console.log(response);
		  var productos = "";
		  for (var i = 0; i < response.length; i++) {
		  	oferta = getOferta(response[i].precio);
			  $url = "images/productos/p"+response[i].id+"/1.jpg";
			  productos=productos+"<div class='col-md-3 col-6 my-1'><div class='card h-100'><a href='producto.html?idproducto="+response[i].id+"'><img src='"+$url+"' class='card-img-top' alt='"+response[i].nombre+"'></a><div class='card-body'><h6 class='card-title'style='font-size: 14px;'>"+response[i].nombre+"</h6> <p class='card-text' style='font-size: 12px; color:#58585899'> "+response[i].categoria+"</p><p class='card-text fw-bold' 'style='font-size: 14px;'>"+response[i].moneda+response[i].precio+"</p><p class='card-text' style='font-size: 14px;'>"+oferta+" %</p></div><button type='button' class='btn btn-primary ms-md-3 me-md-3 ms-1 me-1 mb-1 myproducto' idproducto='"+response[i].id+"' nombre='"+response[i].nombre+"' categoria='"+response[i].categoria+"' moneda='"+response[i].moneda+"' precio='"+response[i].precio+"'  url='"+$url+"'>Agregar a la bolsa</button></div></div>";
		  }
		  $("#productos").html(productos);
		},
		complete: function() {
	        $("#modalcargando").modal('hide');
	    }
	});
}

$(document).on("click",".botonproducto",function() {
	// htmlproducto = "";
	trproducto = $("#tcarrito").find("tr[idproducto='"+$(this).attr("idprod")+"']").length;
	// console.log(trproducto);
	cant = 1;
	if (trproducto) {
		cant = $("#tcarrito tr[idproducto='"+$(this).attr("idprod")+"'] th.cantidad").html();
		cant++;
	}
	if (cant<=1) {
		htmlproducto = "<tr idproducto='"+$(this).attr("idprod")+"'><th class='cantidad'>"+cant+"</th><th>"+$(this).attr("nombre")+"</th><th class='precioprod'>"+$(this).attr("precio")+"</th></tr>";
		$("#tcarrito").append(htmlproducto);
	}else{
		$("#tcarrito tr[idproducto='"+$(this).attr("idprod")+"'] th.cantidad").html(cant);
		$("#tcarrito tr[idproducto='"+$(this).attr("idprod")+"'] th.precioprod").html($(this).attr("precio")*cant);
	}	
});