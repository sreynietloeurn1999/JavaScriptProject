


function getUrl() {
    var url ="https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(() =>{
    requestApi();
    $('#line').hide();
    $('#recipe').on('change',function(){
        $('#line').show();
        var recipes = $('#recipe').val();
        getRecipe(recipes);
       
        
    });
});
function requestApi(){
    $.ajax({
        dataType: 'json',
        url:getUrl(),
        success: (data) => chhosenRechipe(data.recipes),
        error: () => console.log("Cannot get data"),
    })
}
var alldata = [];
function chhosenRechipe(rechipe){
    alldata = rechipe;
    var Option ="";
    rechipe.forEach(element =>{
        Option +=`
            <option value = "${element.id}">${element.name}</option>
        `;
    });
    $('#recipe').append(Option);
}
function getRecipe(rechipeId){
    alldata.forEach(element =>{
            if(element.id == rechipeId){
               getEachRecipe(element.name,element.iconUrl);
               eachIngredient(element.ingredients);
               eachStep(element.instructions);
            }
        
        
    });   
}

/////  Get iconUrl and Name of food
var getEachRecipe = (name,img) =>{
    var result = "";
    result +=`
        <h3>${name}</h3> 
    `;
    $('#card').html(result);
   
    var results = "";
    results +=`
        <img src="${img}" width="100"> 
    `;
    $('#cards').html(results);
}


/// Get ingredients

function eachIngredient(ingredient) {
    var ing = "";
    ingredient.forEach(el => {
        ing +=`
            <tr>
              <td><img src="${el.iconUrl}" width="100"></td>
                <td>${el.name}</td>
                <td>${el.quantity}</td>
                <td>${el.unit[0]}</td>
                
            </tr>
        `;
    });
    $('#table').html(ing);
}



// get instruction
function eachStep(instruction) {
    var result ="";
    var ing = instruction.split('<step>');
    for(var i = 1; i < ing.length; i++) {
        result +=`
            <h5 class="text-primary">Step:${i}</h5>
            <p>${ing[i]}</p>
        `;
    }
    $('#instruction').html(result);
   
   
}









