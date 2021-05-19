//Declared variable and set to false to ensure user is not logged yet
var logged = false;

//Condition to verify if user has already been authenticated
if(localStorage.getItem("access") == "true"){
    logged = true;
    console.log('logged');
    
    //Function to show username in the main page by DOM
    function greeting(){
        var s = document.getElementById("greeting").innerHTML = "Welcome, " + localStorage.getItem("nameUser");
        
    }
    
    //function to log user out
    function logout(){
        localStorage.setItem("access", false);
        window.location.href = "../html/login.html";
        alert("You are logged out now")
    }
    
    //function to customize main body on pages "home", "symptoms" and "prevention"
    function customize_div(){
        var fcolor = document.getElementById("font_colorPicker").value;
        var fsize = document.getElementById("font_size").value;
        document.querySelector("main").style.backgroundColor = fcolor;
        document.querySelector("main").style.fontSize = fsize;
    }

    //function to create and draw chart on page "statistics data"
    function drawChart(){    

        //Totals Data
        var data_set = document.getElementById("data_origin").value;
        d3.csv(data_set).then(function(data){
            console.log(data);
        
            //Values for bar chart
            var height = document.getElementById("charHeight").value;
            var width = 400;
            var dataCount = data.length;
            var gap = 5;
            var chartColor = document.getElementById("colorPicker").value;
    
        
            //Convert to numbers
            data.forEach(function(d){
                d.totals = Number(d.totals);
            })
        
            //create a scale for y
            var yScale = d3.scaleLinear()
                .domain([0,d3.max(data,function(d){
                    return d.totals
                })])
                .range([height,10]);
        
            //Create a scale for x
            var xScale = d3.scaleBand()
                .domain(data.map(function(d){
                    return d.month;
                }))
                .range([0,width]);
        
        
            //Create y Axis
            var yAxis = d3.axisLeft()
                .scale(yScale)
        
            //Create X Axis
            var xAxis = d3.axisBottom()
                .scale(xScale);
        
            d3.select("#csv_chart").selectAll("*").remove();
        
            //Create an SVG Container
            var svgContainer = d3.select("#csv_chart").append("svg")
                .attr("width", "100%")
                .attr("height", 1000);
        
            //Create a rectangle
            var myRectangle = svgContainer.selectAll("rect")
                .data(data);
        
            //Add Attributes to rectangle
            myRectangle.enter()
                .append("rect")
                    .attr("x", function(d,i){
                        return (100 + (i*(width/dataCount)));
        
                    })
                    .attr("y",function(d){
                        return yScale(d.totals);
                    })
                    .attr("width",(width/dataCount - gap))
                    .attr("height", function(d){ 
                        return (height) - yScale(d.totals);
                    })
                    .attr("fill",chartColor);
        
        
            //Position of Y label
            svgContainer.append("g")
                    .attr("transform", "translate(95,0)")
                    .call(yAxis);
        
            //Position of X label
            svgContainer.append("g")
                .attr("transform", "translate(100," + height + ")")    
                .call(xAxis)
                .selectAll("text")
                    .attr("transform", "rotate(60)")
                    .attr("text-anchor", "start")
                    .attr("x", "9")
                    .attr("y","3");
        });
    }
    //function to create and draw chart specific for covid Ireland in 2020
    function drawChart_IE(){    

        //Creating array for total deaths in Ireland in 2020
        //Source: https://raw.githubusercontent.com/datasets/covid-19/main/data/countries-aggregated.csv
        var total_deaths =[
            {month: "January", totals: 0},
            {month: "February", totals: 0},
            {month: "March", totals: 71},
            {month: "April", totals: 1232},
            {month: "May", totals: 1652},
            {month: "June", totals: 1736},
            {month: "July", totals: 1763},
            {month: "August", totals: 1777},
            {month: "September", totals: 1804},
            {month: "October", totals: 1913},
            {month: "November", totals: 2053},
            {month: "December", totals: 2237},
        ];

        //Creating array for total cases confirmed in Ireland in 2020
        //Source: https://raw.githubusercontent.com/datasets/covid-19/main/data/countries-aggregated.csv
        var total_confirmed =[
            {month: "January", totals: 0},
            {month: "February", totals: 1},
            {month: "March", totals: 3235},
            {month: "April", totals: 20612},
            {month: "May", totals: 24990},
            {month: "June", totals: 25473},
            {month: "July", totals: 26065},
            {month: "August", totals: 28811},
            {month: "September", totals: 36155},
            {month: "October", totals: 61456},
            {month: "November", totals: 72544},
            {month: "December", totals: 91779},
        ];
        
        //Defines which array to output chart based on user's choiice in checkbox from Statistics_data.html
        if (document.getElementById("data_origin_IE").value == "total_deaths"){
            data_set_ie = total_deaths;
            
        }
        if (document.getElementById("data_origin_IE").value == "total_confirmed"){
            data_set_ie = total_confirmed;
            
        }
        console.log(data_set_ie);
    
        //Values for bar chart
        var height = document.getElementById("charHeight_IE").value;
        var width = 400;
        var dataCount = data_set_ie.length;
        var gap = 5;
        var chartColor = document.getElementById("colorPicker_IE").value;

    
        //Convert to numbers
        data_set_ie.forEach(function(d){
            d.totals = Number(d.totals);
        })
    
        //create a scale for y
        var yScale = d3.scaleLinear()
            .domain([0,d3.max(data_set_ie,function(d){
                return d.totals
            })])
            .range([height,10]);
    
        //Create a scale for x
        var xScale = d3.scaleBand()
            .domain(data_set_ie.map(function(d){
                return d.month;
            }))
            .range([0,width]);
    
    
        //Create y Axis
        var yAxis = d3.axisLeft()
            .scale(yScale)
    
        //Create X Axis
        var xAxis = d3.axisBottom()
            .scale(xScale);
    
        d3.select("#array_chart").selectAll("*").remove();
    
        //Create an SVG Container
        var svgContainer = d3.select("#array_chart").append("svg")
            .attr("width", "100%")
            .attr("height", 1000);
    
        //Creatye a rectangle
        var myRectangle = svgContainer.selectAll("rect")
            .data(data_set_ie);
    
        //Add Attributes to rectangle
        myRectangle.enter()
            .append("rect")
                .attr("x", function(d,i){
                    return (100 + (i*(width/dataCount)));
    
                })
                .attr("y",function(d){
                    return yScale(d.totals);
                })
                .attr("width",(width/dataCount - gap))
                .attr("height", function(d){ 
                    return (height) - yScale(d.totals);
                })
                .attr("fill",chartColor);
    
    
        //Position of Y label
        svgContainer.append("g")
                .attr("transform", "translate(95,0)")
                .call(yAxis);
    
        //Position of X label
        svgContainer.append("g")
            .attr("transform", "translate(100," + height + ")")    
            .call(xAxis)
            .selectAll("text")
                .attr("transform", "rotate(60)")
                .attr("text-anchor", "start")
                .attr("x", "9")
                .attr("y","3");
                
    
        //});
    }
    
}

//Condition to verify if user is not authenticated - if not, it will open login page
if(logged != true){
    alert("User has not been authenticated!");
    window.location.href="../html/login.html";
}



