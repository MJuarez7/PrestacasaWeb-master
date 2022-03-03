function hoverimage(obj,idproducto) {
	// console.log($(obj));
	// console.log(idproducto);
	$(obj).hover(function() {
	    $(obj+" div.card img.card-img-top").css("content", "url(images/productos/p"+idproducto+"/2.jpg)");
	  }, function() {
	  	$(obj+" div.card img.card-img-top").css("content", "url(images/productos/p"+idproducto+"/1.jpg)");
	  }
	);
}
$(document).ready(function () {
  	$.ajax({
	    type: "POST",
	    url: 'database/tienda.php',
	    dataType: 'json',
	    data: {
	    	condicion:'productostop',
	    	categoria:'HOGAR'
	    },
	    success: function(response)
	    {
	      // console.log(response);
	      for (var i = 0; i < response.length; i++) {
	      	j = i+1;
	      	$(".hogarp"+j+" a").attr('href','producto.html?idproducto='+response[i].id);
	      	$(".hogarp"+j+" div.card img.card-img-top").attr('src','images/productos/p'+response[i].id+'/1.jpg');
	      	$(".hogarp"+j+" div.card div.card-body h5.card-title").html(response[i].nombre);
	      	$(".hogarp"+j+" div.card div.card-body p.card-text").html(response[i].categoria);
	      	$(".hogarp"+j+" div.card div.card-body p.fw-bold").html(response[i].moneda+" "+response[i].precio);

	      	hoverimage(".hogarp"+j,response[i].id);
	      }
	    }
  	});

  	$.ajax({
	    type: "POST",
	    url: 'database/tienda.php',
	    dataType: 'json',
	    data: {
	    	condicion:'productostop',
	    	categoria:'OFICINA'
	    },
	    success: function(response)
	    {
	      for (var i = 0; i < response.length; i++) {
	      	j = i+1;
	      	$(".oficinap"+j+" a").attr('href','producto.html?idproducto='+response[i].id);
	      	$(".oficinap"+j+" div.card img.card-img-top").attr('src','images/productos/p'+response[i].id+'/1.jpg');
	      	$(".oficinap"+j+" div.card div.card-body h5.card-title").html(response[i].nombre);
	      	$(".oficinap"+j+" div.card div.card-body p.card-text").html(response[i].categoria);
	      	$(".oficinap"+j+" div.card div.card-body p.fw-bold").html(response[i].moneda+" "+response[i].precio);

	      	hoverimage(".oficinap"+j,response[i].id);
	      }
	    }
  	});

  	$.ajax({
	    type: "POST",
	    url: 'database/tienda.php',
	    dataType: 'json',
	    data: {
	    	condicion:'productostop',
	    	categoria:'RELAJAMIENTO'
	    },
	    success: function(response)
	    {
	      for (var i = 0; i < response.length; i++) {
	      	j = i+1;
	      	$(".relajamientop"+j+" a").attr('href','producto.html?idproducto='+response[i].id);
	      	$(".relajamientop"+j+" div.card img.card-img-top").attr('src','images/productos/p'+response[i].id+'/1.jpg');
	      	$(".relajamientop"+j+" div.card div.card-body h5.card-title").html(response[i].nombre);
	      	$(".relajamientop"+j+" div.card div.card-body p.card-text").html(response[i].categoria);
	      	$(".relajamientop"+j+" div.card div.card-body p.fw-bold").html(response[i].moneda+" "+response[i].precio);

	      	hoverimage(".relajamientop"+j,response[i].id);
	      }
	    }
  	});

  	$.ajax({
	    type: "POST",
	    url: 'database/tienda.php',
	    dataType: 'json',
	    data: {
	    	condicion:'productostop',
	    	categoria:'FITNES'
	    },
	    success: function(response)
	    {
	      for (var i = 0; i < response.length; i++) {
	      	j = i+1;
	      	$(".fitnessp"+j+" a").attr('href','producto.html?idproducto='+response[i].id);
	      	$(".fitnessp"+j+" div.card img.card-img-top").attr('src','images/productos/p'+response[i].id+'/1.jpg');
	      	$(".fitnessp"+j+" div.card div.card-body h5.card-title").html(response[i].nombre);
	      	$(".fitnessp"+j+" div.card div.card-body p.card-text").html(response[i].categoria);
	      	$(".fitnessp"+j+" div.card div.card-body p.fw-bold").html(response[i].moneda+" "+response[i].precio);

	      	hoverimage(".fitnessp"+j,response[i].id);
	      }
	    }
  	});
});