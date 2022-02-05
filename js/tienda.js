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
	      console.log(response);
	    }
  	});

  	$.ajax({
	    type: "POST",
	    url: 'database/modelo.php',
	    dataType: 'json',
	    data: 'condicion=modelo',
	    success: function(response)
	    {
	      console.log(response);
	    }
  	});

  	$.ajax({
	    type: "POST",
	    url: 'database/categoria.php',
	    dataType: 'json',
	    data: 'condicion=categoria',
	    success: function(response)
	    {
	      console.log(response);
	    }
  	});

  	$.ajax({
	    type: "POST",
	    url: 'database/tienda.php',
	    dataType: 'json',
	    data: 'condicion=productos',
	    success: function(response)
	    {
	      console.log(response);
	    }
  	});
});