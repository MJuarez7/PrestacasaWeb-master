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
		    	oferta = getOferta(response[0].precio);
		    	$url = "images/productos/p"+response[0].id+"/1.jpg";
		    	$("#imgproducto").attr("src",$url);
		    	$("#catproducto").html(response[0].categoria);
		    	$("#nombproducto").html(response[0].nombre);
		    	$("#oferproducto").html(oferta+'% (OFERTA)');
		    	$("#preproducto").html(response[0].precio);
		    	preciooferta = parseFloat(response[0].precio)*((parseFloat(oferta)+100.00)/100.00);
		    	preciooferta = Math.round(preciooferta * 100) / 100;
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