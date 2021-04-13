$(document).ready(function() {
    $.get("http://www.randyconnolly.com/funwebdev/services/visits/browsers.php")
    .done(function(result) {
        // console.log(result);
        select = $("#filterBrowser")
        for(var i=0;i<result.length;i++)
        {
            $(select).append('<option value"' + result[i].id +'">' + result[i].name +'</option>')   
        }
    }); 
    $.get("http://www.randyconnolly.com/funwebdev/services/visits/os.php")
    .done(function(result) {
        // console.log(result);
        select = $("#filterOS")
        for(var i=0;i<result.length;i++)
        {
            $(select).append('<option value"' + result[i].id +'">' + result[i].name +'</option>')   
        }
    }); 
    $.get("http://www.randyconnolly.com/funwebdev/services/visits/countries.php?continent=EU")
    .done(function(result) {
        // console.log(result);
        select = $("#filterCountry")
        for(var i=0;i<result.length;i++)
        {
            $(select).append('<option value"' + result[i].id +'">' + result[i].name +'</option>')   
        }
    }); 
    var data=[];
    $.get("http://www.randyconnolly.com/funwebdev/services/visits/visits.php?continent=EU&month=1&limit=100")
    .done(function(result) {
        data=result;
        tbody = $("#visitsBody")
        for(var i=0;i<result.length;i++)
        {
            var date = new Date( result[i].visit_date)
            $(tbody).append('<tr><td>'+result[i].id+'</td><td>' +date.toDateString() +'</td><td>'+result[i].country +'</td><td>'+result[i].browser +'</td><td>'+result[i].operatingSystem +'</td></tr>')   
        }
    }); 
    }); 
    
})