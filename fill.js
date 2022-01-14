let fillShown = document.querySelector('#colorPicker');
let fillShown2 = document.querySelector('#colorPicker2');


let openFill = document.querySelector('#fillButton');
openFill.onclick = function(){
    
    var lightbox = document.getElementById("lightbox"),
        dimmer = document.createElement("div"); 
    dimmer.style.width =  window.innerWidth-18 + 'px';
    dimmer.style.height = window.innerHeight + 'px';
    dimmer.className = 'dimmer';
    dimmer.onclick = function(){
        document.body.removeChild(this);   
        lightbox.style.visibility = 'hidden';
    } 
    document.body.appendChild(dimmer);
    
    var solidChosen = document.getElementById("solidChosen");
    document.querySelector('#fullColor').value = fillShown.value;

    solidChosen.onclick = function(){
        fillShown.value = document.querySelector('#fullColor').value;
        openFill.value = "solid";

        document.body.removeChild(dimmer); 
        lightbox.style.visibility = 'hidden';
        fillShown2.style.visibility = 'hidden';
        fillShown2.style.display = 'none';

    }

    var vertChosen = document.getElementById("vertChosen");
    document.querySelector('#gradColor1').value = fillShown.value;
    document.querySelector('#gradColor2').value = fillShown2.value;

    vertChosen.onclick = function(){
        fillShown.value = document.querySelector('#gradColor1').value; 
        fillShown2.value = document.querySelector('#gradColor2').value; 
        fillShown2.style.display = 'inline-block';
        fillShown2.style.visibility = 'visible';
        openFill.value = "vert";


        document.body.removeChild(dimmer);   
        lightbox.style.visibility = 'hidden';
    }

    var horiChosen = document.getElementById("horiChosen");
    horiChosen.onclick = function(){
        fillShown.value = document.querySelector('#gradColor1').value; 
        fillShown2.value = document.querySelector('#gradColor2').value; 
        fillShown2.style.display = 'inline-block';
        fillShown2.style.visibility = 'visible';
        openFill.value = "hori";

        document.body.removeChild(dimmer);   
        lightbox.style.visibility = 'hidden';
    }


    lightbox.style.visibility = 'visible';
    
    return false;
}