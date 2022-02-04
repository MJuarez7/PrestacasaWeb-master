$(document).ready(function () {
	$.ajax({
	    type: "POST",
	    url: 'database/tienda.php',
	    data: 'condicion=catalogo',
	    success: function(response)
	    {
	      console.log(response);
	    }
  	});
 });