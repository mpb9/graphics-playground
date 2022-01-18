let download = document.querySelector('#download');
download.addEventListener("mousedown", function(){

    let iSVG = document.querySelector('#imagesvg');
    let dSVG = document.querySelector('#shapesvg');


    document.getElementById("imagesvg").innerHTML =
         getSVGContents(iSVG)+getSVGContents(dSVG);
    
    var serializer = new XMLSerializer();

    var source = serializer.serializeToString(iSVG);
    
    //add name spaces.
    if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
        source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }
    
    //add xml declaration
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
    
    //convert svg source to URI data scheme.
    var imgurl = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
    
    //set url value to a element's href attribute.
    document.getElementById("imgDownload").href = imgurl;
    //you can download svg file by right click menu.

    document.getElementById("imgDownload").click();
    
    //download.href = imgsvg;
});



function getSVGContents(inputString){

    var serializer = new XMLSerializer();

    var source = serializer.serializeToString(inputString);
    
    //add name spaces.
    if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
        source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }
    
    //add xml declaration
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

    let domParser = new DOMParser();
    let svgDOM = domParser.parseFromString(source, 'text/xml')
        .getElementsByTagName('svg')[0];
    return svgDOM.innerHTML
}