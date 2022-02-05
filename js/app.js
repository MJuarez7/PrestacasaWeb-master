

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

new Splide( '.splide' ).mount( window.splide.Extensions );

  function myFunction(x) {
    if (x.matches) { // If media query matches
        const splide = new Splide( '.splide', {
            type   : 'loop',
            pauseOnHover: boolean = true,
            focus  : 'center',
            perPage: 1,
            autoScroll: {
              speed: 2,
            },
          } );
          
          splide.mount();
    } else {
        const splide = new Splide( '.splide', {
            
            type   : 'loop',
            pauseOnHover: boolean = true,
            focus  : 'center',
            perPage: 4,
            autoScroll: {
              speed: 2,
            },
            speed: number = 3
          } );
          
          splide.mount();
          
    }
  }
  
  var x = window.matchMedia("(max-width: 768px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes


// import Splide from '@splidejs/splide';
// import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
// aparecer imagen de productos;
window.onload = function(){
    var imagen = document.getElementById("prueba");
    imagen.addEventListener('mouseover',cambiarImagen);
    imagen.addEventListener('mouseout',imagenIniciar);
   
    function cambiarImagen(){
        this.setAttribute('src','images/productos/p002/2.jpg'); 
    }
   
    function imagenIniciar(){
        this.setAttribute('src','images/productos/p002/1.jpg');
    }
}   
  
  