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
	      	marcas=marcas+"<div class='marca'>"+response[i].marca+"</div>";
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
		  var modelos = "";
		  for (var i = 0; i < response.length; i++) {
		  	// console.log(response[i].modelo);
		  	modelos=modelos+"<div class='modelo'>"+response[i].modelo+"</div>";
		  }
		  $("#modelos").append(modelos);
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
		  	categorias=categorias+"<div class='categoria'>"+response[i].categoria+"</div>";
		  }
		  console.log(categorias);
		  $("#categorias").append(categorias);
		}
	});

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
		  	"</div>";
		  }
		  $("#productos").append(productos);
		}
	});
});


$(document).on("click",".marca",function(argument) {
	// console.log(this);
	// console.log(this.innerHTML);
	$.ajax({
		type: "POST",
		url: 'database/tienda.php',
		dataType: 'json',
		data: 'condicion=productos&marca='+this.innerHTML,
		success: function(response)
		{
		  // console.log(response);
		  var productos = "<div>";
		  for (var i = 0; i < response.length; i++) {
		  	// console.log(response[i].nombre);
		  	productos=productos+"<div>"+response[i].nombre+","+response[i].moneda+response[i].precio+
		  	"<img src='images/productos/p00"+response[i].id+"/"+response[i].id+".jpg' height='50'>"+
		  	"</div>";
		  }
		  $("#productos").html(productos);
		}
	});
});