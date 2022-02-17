function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).ready(function () {
	idproducto = getParameterByName('idproducto');
	if (idproducto) {
		$.ajax({
		    type: "POST",
		    url: 'database/tienda.php',
		    dataType: 'json',
		    data: "idproducto="+idproducto+'&condicion=productos',
		    beforeSend: function(argument) {
				$("#modalcargando").modal();
			},
		    success: function(response)
		    {
		    	console.log(response[0]);
		    	$url = "images/productos/p"+response[0].id+"/1.jpg";
		    	$("#imgproducto").attr("src",$url);
		    	$("#catproducto").html(response[0].categoria);
		    	$("#nombproducto").html(response[0].nombre);
		    	$("#oferproducto").html(response[0].oferta+'% (OFERTA)');
		    	$("#preproducto").html(response[0].precio);
		    	preciooferta = parseFloat(response[0].precio)*((parseFloat(response[0].oferta)+100.0)/100.0);
		    	$("#oferpreproducto").html(preciooferta);
		    },
			complete: function() {
		        $("#modalcargando").modal('hide');
		    }
		});
	}else{
		window.location = 'tienda.html';
	}
});