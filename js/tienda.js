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
		  // console.log(response);
		  var productos = "<div>";
		  for (var i = 0; i < response.length; i++) {
		  	// console.log(response[i].nombre);
		  	productos=productos+"<div>"+response[i].nombre+","+response[i].moneda+response[i].precio+
		  	"<img src='images/productos/p00"+response[i].id+"/"+response[i].id+".jpg' height='50'>"+
		  	"<button type='button' class='botonproducto' idprod='"+response[i].id+"' nombre='"+response[i].nombre+"' precio='"+response[i].precio+"' moneda='"+response[i].moneda+"'>Agregar</button>"+
		  	"</div>";
		  }
		  $("#productos").append(productos);
		}
	});
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
		  var productos = "<div>";
		  for (var i = 0; i < response.length; i++) {
		  	// console.log(response[i].nombre);
		  	productos=productos+"<div>"+"<a href='' class='text-decoration-none text-black'> <div class='card h-100 shadow'><div class='card-img-top'></div><div class='card-body'><h5 class='card-title'>"+response[i].nombre+"</h5> <p class='card-text'>"+response[i].categoria+"</p><p class='card-text fw-bold'>"+response[i].moneda+response[i].precio+"</p></div></div></a>"
		  	// "<img src='images/productos/p00"+response[i].id+"/"+response[i].id+".jpg' height='50'>"+
		  	// "<button type='button' class='botonproducto' idprod='"+response[i].id+"' nombre='"+response[i].nombre+"' precio='"+response[i].precio+"' moneda='"+response[i].moneda+"'>Agregar</button>"+
		  	"</div>";
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