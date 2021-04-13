$(document).ready(function() {
    var info=[];
    var countryinfo=[];
    var osinfo=[];
    var browserinfo=[];
    $.get("http://www.randyconnolly.com/funwebdev/services/visits/browsers.php")
    .done(function(result) {
        // console.log(result);
        
        select = $("#filterBrowser")
        for(var i=0;i<result.length;i++)
        {
            browserinfo[i]=result[i].name;
            $(select).append('<option value"' + result[i].id +'">' + result[i].name +'</option>')   
        }
    }); 
    $.get("http://www.randyconnolly.com/funwebdev/services/visits/os.php")
    .done(function(result) {
        // console.log(result);
        select = $("#filterOS")
        for(var i=0;i<result.length;i++)
        {
            osinfo[i]=result[i].name;
            $(select).append('<option value"' + result[i].id +'">' + result[i].name +'</option>')   
        }
    }); 
    $.get("http://www.randyconnolly.com/funwebdev/services/visits/countries.php?continent=EU")
    .done(function(result) {
        // console.log(result);
        select = $("#filterCountry")
        for(var i=0;i<result.length;i++)
        {
            countryinfo[i]=JSON.stringify(result[i].name);
            $(select).append('<option value"' + result[i].id +'">' + result[i].name +'</option>')   
        }
    }); 
    
    $.get("http://www.randyconnolly.com/funwebdev/services/visits/visits.php?continent=EU&month=1&limit=100")
    .done(function(result) {
        info=result;
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
        var result=$.grep(info, function (item,i) {
            if(browser==0&&os==0&&country==0)
            return (info);

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
    google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Browser', 'Visit'],
          ['',     11],
          ['',      2],
          ['',  2],
          ['', 2],
          ['',    7]
        ]);

        var options = {
          title: ''
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }
    google.charts.load('current', {
        'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
      });
      //geochart
      google.charts.setOnLoadCallback(drawRegionsMap);
      var countrycount=[]
      var countrydata = [['Country', 'Visit']];
      console.log(countryinfo.length);
             for (var i = 0; i < countryinfo.length; i++) {
                 var count=0;
                 console.log(countryinfo[i]);
                 for(j=0;j < info.length; j++)
                 {
                    console.log(info[j].country);
                     if(countryinfo[i]==info[j].country)
                     {
                        count++;
                        console.log(count);
                     }
                 }
                 countrycount[i]=count;
                      
             }
             for (var i = 0; i < countryinfo.length; i++) {
                countrydata[i + 1] = [countryinfo[i], countrycount[i]];}
                console.log(countryinfo);

      function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable(countrydata);

        var options = {};

        var chart = new google.visualization.GeoChart(document.getElementById('geochart'));

        chart.draw(data, options);
      }
      //columnchart
      google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {

      var data = new google.visualization.DataTable();
      data.addColumn('timeofday', 'Time of Day');
      data.addColumn('number', 'Motivation Level');

      data.addRows([
        [{v: [8, 0, 0], f: '8 am'}, 1],
        [{v: [9, 0, 0], f: '9 am'}, 2],
        [{v: [10, 0, 0], f:'10 am'}, 3],
        [{v: [11, 0, 0], f: '11 am'}, 4],
        [{v: [12, 0, 0], f: '12 pm'}, 5],
        [{v: [13, 0, 0], f: '1 pm'}, 6],
        [{v: [14, 0, 0], f: '2 pm'}, 7],
        [{v: [15, 0, 0], f: '3 pm'}, 8],
        [{v: [16, 0, 0], f: '4 pm'}, 9],
        [{v: [17, 0, 0], f: '5 pm'}, 10],
      ]);

      var options = {
        title: 'Motivation Level Throughout the Day',
        hAxis: {
          title: 'Time of Day',
          format: 'h:mm a',
          viewWindow: {
            min: [7, 30, 0],
            max: [17, 30, 0]
          }
        },
        vAxis: {
          title: 'Rating (scale of 1-10)'
        }
      };

      var chart = new google.visualization.ColumnChart(
        document.getElementById('columnchart'));

      chart.draw(data, options);
    }    
})