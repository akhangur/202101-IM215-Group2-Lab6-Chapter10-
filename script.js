$(document).ready(function() {
    $.get("http://www.randyconnolly.com/funwebdev/services/visits/browsers.php")
    .done(function(result) {
        console.log(result);
        select = $("#filterBrowser")
        for(var i=0;i<result.length;i++)
        {
            $(select).append('<option value"' + result[i].id +'">' + result[i].name +'</option>')   
        }
    }); 
})