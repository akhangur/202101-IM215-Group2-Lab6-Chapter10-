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

    $("#filterCountry").change(function()
    {
        displayFunction();
        
    })
    $("#filterBrowser").change(function()
    {
        displayFunction();
    })
   
    $("#filterOS").change(function()
    {
        displayFunction();
    })
    function displayFunction()
    {
        tbody = $("#visitsBody")
        tbody.empty();
        browser=$("#filterBrowser").val();
        country=$("#filterCountry").val();
        os=$("#filterOS").val();
        console.log("browser : "+browser+" country : "+country+" os : "+os)
        console.log(country);
        var result=$.grep(data, function (item,i) {
            if(browser==0&&os==0&&country==0)
            return (data);

            else if(browser==0&&os==0)
            return(item.country==country)

            else if(os==0&&country==0)
            return(item.browser==browser)

            else if(browser==0&&country==0)
            return(item.operatingSystem==os)

            else if(browser==0)
            return(item.country==country&&item.operatingSystem==os)

            else if(country==0)
            return(item.browser==browser&&item.operatingSystem==os)

            else if(os==0)
            return(item.country==country&&item.browser==browser)

            else
            return(item.country==country&&item.operatingSystem==os&&item.browser==browser)
        });
        console.log(result);
        for(var i=0;i<result.length;i++)
        {
            var date = new Date( result[i].visit_date)
            $(tbody).append('<tr><td>'+result[i].id+'</td><td>' +date.toDateString() +'</td><td>'+result[i].country +'</td><td>'+result[i].browser +'</td><td>'+result[i].operatingSystem +'</td></tr>')   
        }
    }
})