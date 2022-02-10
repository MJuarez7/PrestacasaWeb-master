$(document).ready(function () {

	$.ajax({
	    type: "POST",
	    url: 'database/marca.php',
	    dataType: 'json',
	    data: 'condicion=marca',
	    success: function(response)
	    {
	      // console.log(response);
	      var marcas = "";
	      for (var i = 0; i < response.length; i++) {
	      	// console.log(response[i].marca);
	      	marcas=marcas+"<input type='checkbox' class='cmarcas' name='marca["+response[i].marca+"]'>"+
	      	"<label>"+response[i].marca+"</label><br>";
	      }
	      // console.log(marcas);
	      $("#marcas").html(marcas);
	    }
	});

	$.ajax({
		type: "POST",
		url: 'database/categoria.php',
		dataType: 'json',
		data: 'condicion=categoria',
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
		}
	});

	$("#marca").click(function(){
	    $("#marcas").slideToggle("slow");
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
		success: function(response)
		{
		  var productos = "";
		  for (var i = 0; i < response.length; i++) {
			  $url = "images/productos/p"+response[i].id+"/1.jpg";
			  productos=productos+"<div class='col-md-3 col-6 my-1 myproducto' nombre='"+response[i].nombre+"' categoria='"+response[i].categoria+"' moneda='"+response[i].moneda+"' precio='"+response[i].precio+"'  url='"+$url+"'><div class='card h-100'><img src='"+$url+"' class='card-img-top' alt='"+response[i].nombre+"'><div class='card-body'><h6 class='card-title'style='font-size: 15px;'>"+response[i].nombre+"</h6> <p class='card-text' style='font-size: 13px; color:#58585899'> "+response[i].categoria+"</p><p class='card-text fw-bold' 'style='font-size: 15px;'>"+response[i].moneda+response[i].precio+"</p></div><button type='button' class='btn btn-primary ms-1 me-1 mb-1'>Agregar a la bolsa</button></div></div>";
		  }
		  $("#productos").append(productos);
		}
	});
});

$(document).on("click",".myproducto", function() {
	$("#modalnombre").html($(this).attr("nombre"));
	$("#modalmoneda").html($(this).attr("moneda"));
	$("#modalprecio").html($(this).attr("precio"));
	$("#modalcategoria").html($(this).attr("categoria"));
	$("#modalnombre").html($(this).attr("nombre"));
	$("#modalimagen").attr("src",$(this).attr("url"));
	$("#modelAgregarProducto").modal();
});

$(document).on("click",".cerrarmodal", function() {
	// console.log(this);
	$("#modelAgregarProducto").modal('hide');
});

$(document).on("click",".cmarcas",function(argument) {
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
		success: function(response)
		{
		  // console.log(response);
		  var productos = "";
		  for (var i = 0; i < response.length; i++) {
		  	// console.log(response[i].nombre);
			  $url = "images/productos/p"+response[i].id+"/1.jpg";
			  productos=productos+"<div class='col-md-3 col-6 my-1 myproducto' nombre='"+response[i].nombre+"' categoria='"+response[i].categoria+"' moneda='"+response[i].moneda+"' precio='"+response[i].precio+"'  url='"+$url+"'><div class='card h-100'><img src='"+$url+"' class='card-img-top' alt='"+response[i].nombre+"'><div class='card-body'><h6 class='card-title'style='font-size: 15px;'>"+response[i].nombre+"</h6> <p class='card-text' style='font-size: 13px; color:#58585899'> "+response[i].categoria+"</p><p class='card-text fw-bold' 'style='font-size: 15px;'>"+response[i].moneda+response[i].precio+"</p></div></div></a></div>";
		  }
		  $("#productos").html(productos);
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