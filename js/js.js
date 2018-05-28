
//Variables
var cargado = 1;
var scroll = true;
//Al cargar la pagina
$(document).ready(function(){
		//Apagar/encender scroll al pulsar boton
		$("#bscroll").click(function(){
			if (scroll==true) {//Scroll encendido
				scroll = false;
				$("#bscroll").html("OFF");
				$("#bscroll").css("box-shadow","0px 3px grey");
				$("#bscroll").css("padding","0px 6.5px");
				$("#bscroll").css("color","red");
				$("#bmas").show();
			}
			else{//Scroll apagado
				scroll = true;
				$("#bscroll").html("ON");
				$("#bscroll").css("box-shadow","0px 3px grey");
				$("#bscroll").css("padding","0px 10px");
				$("#bscroll").css("color","green");
				$("#bmas").hide();
			}
		});

		$(window).scroll(function(){
			doScroll();
		});

		$("body").on("click", ".img-responsive", function(){
			var id = $(this).attr('id');
			$("#imgmodal").attr("src","img/"+id+".jpg");
		});
});

function doScroll() {
	if ($(window).scrollTop() + $(window).height() + 5 >= $(document).height() && scroll) {
		cargar();
	}
};
function cargar(){
	if (cargado <= 3) {
		$("#cargando").fadeToggle("slow");
		$.getJSON("https://rawgit.com/Mikelodion/tablonAnuncis/final/json/news" + cargado + ".json", function(jsonObject){
			addRow(jsonObject);
		});cargado++;
	}
	else{
		$("#bmas").html("No hay mas noticias");
	}
};

function addRow(json){
	$(".container-fluid").append('<div class="row" id="normales'+cargado+'">');
	$.each(json, function(i,noticia){
		$("#normales" + cargado).append(
				'<div class="col-sm-6">' + 
				'<div class="thumbnail">' +
				'<div class="caption">' +
				'<h3 class="text-center">' + noticia.title + '</h3>' + '</div>' +
				'<img id="new'+((cargado-2)*2+i+4) +'" class="img-responsive thumbnail" src="' + noticia.imgbig + '" alt="Foto Noticia" data-toggle="modal" data-target="#myModal">' +
				'<div class="caption">'+
				'<p class="text-center">' + noticia.description + '</p>' +
				'<p class="text-right">' + noticia.datetime + '</p>' +
				'</div>' + '</div>' + '</div>');
	})
	$("#cargando").fadeToggle("slow");
};