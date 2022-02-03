$(document).ready(function () {
    var itemsMainDiv = ('.MultiCarousel');
    var itemsDiv = ('.MultiCarousel-inner');
    var itemWidth = "";

    $('.leftLst, .rightLst').click(function () {
        var condition = $(this).hasClass("leftLst");
        if (condition)
            click(0, this);
        else
            click(1, this)
    });

    ResCarouselSize();




    $(window).resize(function () {
        ResCarouselSize();
    });

    //this function define the size of the items
    function ResCarouselSize() {
        var incno = 0;
        var dataItems = ("data-items");
        var itemClass = ('.item');
        var id = 0;
        var btnParentSb = '';
        var itemsSplit = '';
        var sampwidth = $(itemsMainDiv).width();
        var bodyWidth = $('body').width();
        $(itemsDiv).each(function () {
            id = id + 1;
            var itemNumbers = $(this).find(itemClass).length;
            btnParentSb = $(this).parent().attr(dataItems);
            itemsSplit = btnParentSb.split(',');
            $(this).parent().attr("id", "MultiCarousel" + id);


            if (bodyWidth >= 1200) {
                incno = itemsSplit[3];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 992) {
                incno = itemsSplit[2];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 768) {
                incno = itemsSplit[1];
                itemWidth = sampwidth / incno;
            }
            else {
                incno = itemsSplit[0];
                itemWidth = sampwidth / incno;
            }
            $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
            $(this).find(itemClass).each(function () {
                $(this).outerWidth(itemWidth);
            });

            $(".leftLst").addClass("over");
            $(".rightLst").removeClass("over");

        });
    }


    //this function used to move the items
    function ResCarousel(e, el, s) {
        var leftBtn = ('.leftLst');
        var rightBtn = ('.rightLst');
        var translateXval = '';
        var divStyle = $(el + ' ' + itemsDiv).css('transform');
        var values = divStyle.match(/-?[\d\.]+/g);
        var xds = Math.abs(values[4]);
        if (e == 0) {
            translateXval = parseInt(xds) - parseInt(itemWidth * s);
            $(el + ' ' + rightBtn).removeClass("over");

            if (translateXval <= itemWidth / 2) {
                translateXval = 0;
                $(el + ' ' + leftBtn).addClass("over");
            }
        }
        else if (e == 1) {
            var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
            translateXval = parseInt(xds) + parseInt(itemWidth * s);
            $(el + ' ' + leftBtn).removeClass("over");

            if (translateXval >= itemsCondition - itemWidth / 2) {
                translateXval = itemsCondition;
                $(el + ' ' + rightBtn).addClass("over");
            }
        }
        $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
    }

    //It is used to get some elements from btn
    function click(ell, ee) {
        var Parent = "#" + $(ee).parent().attr("id");
        var slide = $(Parent).attr("data-slide");
        ResCarousel(ell, Parent, slide);
    }

  $.ajax({
    type: "POST",
    url: 'database/conexion.php',
    dataType: 'json',
    success: function(response)
    {
      console.log(response);
      var productos = response;
      let arregloOriginal = productos,
      arregloDeArreglos = [];
      const LONGITUD_PEDAZOS = 3; // Partir en arreglo de 3
      for (let i = 0; i < arregloOriginal.length; i += LONGITUD_PEDAZOS) {
        let pedazo = arregloOriginal.slice(i, i + LONGITUD_PEDAZOS);
        arregloDeArreglos.push(pedazo);
      }

      // console.log(arregloDeArreglos);
      var htmlproductos = "<div>Mostrando "+productos.length+" resultados<div><br>";
      for (var i = 0; i <= arregloDeArreglos.length - 1; i++) {
        htmlproductos +=  "<div class='card-group row justify-content-start'>";
        for (var j = 0; j <= arregloDeArreglos[i].length - 1; j++) {
          htmlproductos +="<div class='card col-4'>"+
                            "<img class='card-img-top' style='height:300px;width:300px' src='images/"+arregloDeArreglos[i][j].imagen+"' alt='Card image'>"+
                            "<div class='card-body'>"+
                              "<h5 class='card-title'>"+arregloDeArreglos[i][j].nombre+"</h5>"+
                              "<p class='card-text'>"+arregloDeArreglos[i][j].descripcion+"</p>"+
                              "<p class='card-text'>"+arregloDeArreglos[i][j].moneda+" "+arregloDeArreglos[i][j].precio+"</p>"+
                            "</div>"+
                          "</div>";
          if (arregloDeArreglos[i].length<=2) {
            htmlproductos +="<div class='card col-4'></div><div class='card col-4'></div>";
          }
        }
        htmlproductos += "</div>";
      }
      htmlproductos += "</div>";
      $('#productos').append(htmlproductos);
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

});


 //funciones para movimientos
 
 let imgSer = document.getElementsByClassName("imgSer");
 let imgGrand = document.getElementsByClassName("imgGrand");
 let buttonAnimation= document.getElementsByClassName("buttonAnimation");

 //imagen pequeña//crecer y decrecer

var crecer = function () {
    this.style.transform ="scale(1.25, 1.25)";
    this.style.transition = "0.8s";
    
};

var nocrecer = function () {
    this.style.transform="scale(1, 1)";
    this.style.transition = "0.8s";
    this.style.transition = "0.8s";
};

for (var i = 0; i < imgSer.length; i++) {
    imgSer[i].addEventListener('mouseover', crecer, false);
}

for (var i = 0; i < imgSer.length; i++) {
    imgSer[i].addEventListener('mouseout', nocrecer, false);
}
//imagen grande
var crecerb = function () {
    this.style.transform ="scale(1.05, 1.05)";
    this.style.transition = "0.8s";
    
};

var nocrecerb = function () {
    this.style.transform="scale(1, 1)";
    this.style.transition = "0.8s";
    this.style.transition = "0.8s";
};

for (var i = 0; i < imgGrand.length; i++) {
    imgGrand[i].addEventListener('mouseover', crecerb, false);
}

for (var i = 0; i < imgGrand.length; i++) {
    imgGrand[i].addEventListener('mouseout', nocrecerb, false);
}

//efecto boton facebook
var heartBeat = function () {
    this.classList.add("animate__animated");
    this.classList.add("animate__heartBeat");
};
var heartBeatOff = function () {
    this.classList.remove("animate__animated");
    this.classList.remove("animate__heartBeat");
};
for (var i = 0; i < buttonAnimation.length; i++) {
    buttonAnimation[i].addEventListener('mouseover', heartBeat, false);
}
for (var i = 0; i < buttonAnimation.length; i++) {
    buttonAnimation[i].addEventListener('mouseout', heartBeatOff, false);
}



  function myFunction(x) {
    if (x.matches) { // If media query matches
        new Splide( '.splide', {
            type:"loop",
            perPage: 2,
            autoplay:true
          }).mount();
    } else {
        new Splide( '.splide', {
            type:"loop",
            perPage: 4,
            autoplay:true
          }).mount();
    }
  }
  
  var x = window.matchMedia("(max-width: 768px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes