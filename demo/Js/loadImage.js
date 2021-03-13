var startTime=[];


function onLoadStart(id) {
    startTime[parseInt(id)]= new Date().getTime();
    console.log(startTime[parseInt(id)]);

}
async function onLoad(id) {
    console.log(id)
    
    // console.log(id)
    // console.getElementById(document.getElementById('p'+id).innerHTML="Hii")
    var loadtime = new Date().getTime() - startTime[parseInt(id)];
    // // console.log(img.naturalWidth+" "+img.naturalHeight)
    // // size=(img.naturalHeight*img.naturalWidth*4)/(1024)
    // // console.log(size)
    const fileImg = await fetch(document.getElementById(id).src,{mode: 'cors',credentials: 'same-origin',headers:{'Access-Control-Allow-Origin':'*'}}).then(r => r.blob());
    size=fileImg.size/1000000
    document.getElementById('p'+id).innerHTML="Load time: "+loadtime+"ms<br> Image size="+size.toPrecision(2)+"Mb"
    
}
