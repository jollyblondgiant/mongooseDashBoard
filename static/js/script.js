$(document).ready(function(){
    console.log("READY")
    $(".toggleBox").hide()
   $("img").hover(function(){
       console.log(this.id)
        $("."+this.id).toggle()
        
   })
 
})

