$(document).ready(function () {
	$("#marca").click(function(){
        $("#marcas").slideToggle("slow");
    });
    $("#modelo").click(function(){
        $("#modelos").slideToggle("slow");
    });
    $("#categoria").click(function(){
        $("#categorias").slideToggle("slow");
    });


    $.ajax({
	    type: "POST",
	    url: 'database/marca.php',
	    dataType: 'json',
	    data: 'condicion=marca',
	    success: function(response)
	    {
	      // console.log(response);
	      var marcas = "<div>";
	      for (var i = 0; i < response.length; i++) {
	      	// console.log(response[i].marca);
	      	marcas=marcas+response[i].marca+"<br>";
	      }
	      $("#marcas").html(marcas);
	    }
  	});

  	$.ajax({
	    type: "POST",
	    url: 'database/modelo.php',
	    dataType: 'json',
	    data: 'condicion=modelo',
	    success: function(response)
	    {
	      // console.log(response);
	      var modelos = "<div>";
	      for (var i = 0; i < response.length; i++) {
	      	// console.log(response[i].modelo);
	      	modelos=modelos+response[i].modelo+"<br>";
	      }
	      $("#modelos").html(modelos);
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
	      var categorias = "<div>";
	      for (var i = 0; i < response.length; i++) {
	      	// console.log(response[i].categoria);
	      	categorias=categorias+response[i].categoria+"<br>";
	      }
	      $("#categorias").html(categorias);
	    }
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
	      	productos=productos+response[i].nombre+","+response[i].moneda+response[i].precio+"<br>";
	      }
	      $("#productos").html(productos);
	    }
  	});
});