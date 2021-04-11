if (!timer){
    var time_begin = Date.now();
    var timer = document.createElement("div");

    timer.innerText="00:00:00";
    timer.setAttribute("id","ext-webpage-timer")
    document.body.appendChild(timer);

    /**
     * update timer every 1s
     */
    var min=0,h=0;
    setInterval(()=>{
        let diff = Math.floor((Date.now()-time_begin)/1000)

        if (diff%59==0) {
            min++;

            if (min%59==0){
                min=0;
                h++;
            }
        }

        timer.innerText=`${h<10?'0'+h:h}:${min<10?'0'+min:min}:${diff%59<10?'0'+diff%59:diff%59}`
        if (diff>(14*60)) timer.innerText+=' 😱'
    },1000)


}
