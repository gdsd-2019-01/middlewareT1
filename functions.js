/////////////// CONVERTER //////////////////
function convert(){
    var c1 = document.getElementById("currency1").value;
    var c2 = document.getElementById("currency2").value;
    var name = document.getElementById("customer").value;
    var result;
    if(c2!=0 && c1!='') {
        if (c2=='INR') {
            c2 = 78.49;
            result = 'Rs.';
        } else if (c2== 'USD') {
            c2 = 1.11;
            result = '$';
        }  else if (c2== 'BPS') {
            c2 = 0.86;
            result = '£';
        } else {
            c2 = 120.41;
            result = '¥';
        }
        var amount = c1*c2;
        result = result + amount.toFixed(2);
        document.getElementById("result").value = result;
        document.getElementById("ca").innerHTML = name + " your converted amount is";
    }
}

//////////////// RESET VALUES ////////////////
function reset(){
    document.getElementById("currency1").value = '';
    document.getElementById("customer").value = '';
    document.getElementById("currency2").value = '0';
    document.getElementById("result").value = '';
    document.getElementById("ca").innerHTML = "Coverted Amount";
}

/////////////////////////// Database /////////////////////////

////////////////// GET /////////////////////////
function loadHistory(){

    //////////SET LOG DIV HEIGHTEQUAL TO CONVERTER HEIGHT//////////
    var elmnt = document.getElementById("convertWindow");
    var height = elmnt.offsetHeight
    document.getElementById("history").style.height = height;

    //////////// AJAX REQUEST TO GET DATA ////////////////////
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200)
        {
            document.getElementById('history').innerHTML = '';
            var result = this.responseText;

            var results = JSON.parse(result);
            var list = document.createElement("ul");
            var i = 0; //made for getting number of conversions
            results.forEach((history)=>
        {
            i++;
            var listItem = document.createElement("li");
            list.className = "list-group";
            listItem.className = "list-group-item";
            var data = document.createTextNode(history.name+" converted "+history._from+" euro to "+history._to);
            listItem.appendChild(data);
            list.appendChild(listItem);
            document.getElementById('history').appendChild(list);
        });
            document.getElementById("counter").innerHTML = i + " Conversions Done";
        }
    }

    xhttp.open("GET", "/home", true);
    xhttp.send();
}

/////////////INSERTION////////////////
function insert()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
        {
            loadHistory();
        }
    }

    var name = document.getElementById('customer').value;
    var _from = document.getElementById('currency1').value;
    var _to = document.getElementById('result').value;

    xhttp.open("POST", "/insert", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send('{"name":"'+name+'", "_from":"'+_from+'","_to":"'+_to+'"}');
}


function addvisit()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
        { }
    }

    xhttp.open("POST", "/addvisit", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send('{"count":"NULL"}');
}

function loadVisits(){
    addvisit();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200)
        {
            var result = this.responseText;
            var results = JSON.parse(result);
            var i = 0;
            results.forEach((visits)=>
        {
            i++;
        });
            document.getElementById("visit").innerHTML ="Visits: "+ i;
        }
    }

    xhttp.open("GET", "/showVisits", true);
    xhttp.send();
}