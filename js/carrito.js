function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}


function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function AgregarCarrito(idproducto) {
	productos = JSON.parse(getCookie('carrito-productos'))?JSON.parse(getCookie('carrito-productos')):[];
	nuevosproductos = [];
	// console.log(productos);
	cantidad=1;
	ids=[];
	if (productos.length>0) {
		for (var i = productos.length - 1; i >= 0; i--) {
			ids.push(productos[i][0]);
		}

		if (ids.indexOf(idproducto)<0) {
			nuevosproductos.push([idproducto,cantidad]);
		}
		
		for (var i = productos.length - 1; i >= 0; i--) {
			if (productos[i][0]==idproducto) {
				nuevosproductos.push([productos[i][0],productos[i][1]+1]);
			}else{
				nuevosproductos.push([productos[i][0],productos[i][1]]);
			}
		}
	}else{
		nuevosproductos.push([idproducto,cantidad]);
	}
	setCookie("carrito-productos",JSON.stringify(nuevosproductos),2);
	// console.log(productos);
	// console.log(nuevosproductos);
}

function QuitarProducto(idproducto) {
	productos = JSON.parse(getCookie('carrito-productos'))?JSON.parse(getCookie('carrito-productos')):[];
	nuevosproductos = [];
	// console.log(productos);
	cantidad=1;
	ids=[];
	if (productos.length>0) {
		for (var i = productos.length - 1; i >= 0; i--) {
			ids.push(productos[i][0]);
		}

		if (ids.indexOf(idproducto)<0) {
			nuevosproductos.push([idproducto,cantidad]);
		}
		for (var i = productos.length - 1; i >= 0; i--) {
			if (productos[i][0]==idproducto) {
				nuevosproductos.push([productos[i][0],productos[i][1]-1]);
			}
			else{
				nuevosproductos.push([productos[i][0],productos[i][1]]);
			}
		}
	}
	setCookie("carrito-productos",JSON.stringify(nuevosproductos),2);
}

function getProductos() {
	productos = getCookie('carrito-productos')?JSON.parse(getCookie('carrito-productos')):[];
	return productos;
}

$(document).ready(function() {
	productos = getProductos();
	productosseleccionados = [];
	if (productos) {
		for (var i = 0; i < productos.length; i++) {
			productosseleccionados.push({'id':productos[i][0],
									'cantidad':productos[i][1]});
		}
		// console.log(productosseleccionados);
	}
});