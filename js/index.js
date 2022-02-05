$(document).ready(function () {
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