/**
 * This function will be called when DOM is ready and it's elements can be accessed by JS
 * @see hw-08-index.html for detailed assignment
 */

function displayStop(stop){
    // TODO
    return;
}
function printbob(bob){
    let target_element = document.getElementById("solution");
    let test_text = document.createTextNode(bob);
    target_element.appendChild(test_text);
}
function search(usr_input){
    //let target_element = document.getElementById("solution");
    
    printbob(usr_input);



    let stops = window.stopsData.stopsGroups;
    let search_output = stops.filter(stop => stop.name.includes(usr_input));

    let output_div = document.getElementById("results")

    if(search_output.empty()){
        output_div.textContent = "Žádné výsledky!";
    }
    else if(search_output.length === 1){
        displayStop(search_output[0]);
    }
    else{
        output_div.textContent = "Měli jste na mysli:";
        search_output.forEach(output => {
            let a = document.createElement("a");
            a.textContent = output.name;
            a.href = "#";
            a.addEventListener("click", function(){
                let output_div_div = document.getElementById("results");
                output_div_div.innerHTML = '';
                displayStop(output);
            });
            output_div.appendChild(document.createElement("br"));
            output_div.appendChild("a");
        });
    }
}

function search_stage(){
    btn = document.getElementById("button");
}

function btnZastavkyLoad(){
    
    let target_element = document.getElementById("solution");
    let text_node = document.createTextNode("Hledat");
    target_element.appendChild(text_node);
    
    let text_field = document.createElement("input");
    text_field.setAttribute("type", "text");
    text_field.setAttribute("id", "searchInput");
    text_field.style.marginLeft = "10px";
    text_field.style.marginRight = "10px";
    target_element.appendChild(text_field);
    
    let btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("id", "searchButton");
    btn.textContent = "Hledej!";
    btn.disabled = true;
    target_element.appendChild(btn);
    
    let div = document.createElement("div");
    div.id = "results";
    target_element.appendChild(div);

    text_field = document.getElementById("searchInput");
    text_field.addEventListener("input", function(){
        if(text_field.value === ''){
            btn.disabled = true;
        }
        else{
            btn.disabled = false;
        }
    });
    text_field.addEventListener("keyup", function(event){ 
        if(text_field.value === ''){
            btn.disabled = true;
        }
        else{
            btn.disabled = false;
        }
        if(event && event.key === "Enter"){
            let input = document.getElementById("searchInput");
            search(input.value);
        }
    });
    
    btn.addEventListener("click", ()=>search(text_field.value));
}


//function afterFetch()

function btnZastavky(){
    document.getElementById("loadData").addEventListener("click", function() {    
        document.getElementById("loadData").disabled = true;
        window.fetchStopsData().then(()=>{
            document.getElementById("loadData").disabled = false;
            if(document.getElementById("searchInput") === null){
                btnZastavkyLoad();
            }
            document.getElementById("loadData").innerHTML = "Aktualizovat data o zastávkách.";
            
        
        
        })
    })    
}


function init() {
   btnZastavky();
}

window.init = init;
