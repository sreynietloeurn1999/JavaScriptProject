
// Get URL

function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(() => {
    requestApi();

// Hide button and input
    $('#increaseDecreaseGuest').hide();

    $('#card-form').hide();
    $('.big-quote').show();

    // select change
    $('#recipe').on('change', function () {
        $('#card-form').show();
        $('.big-quote').hide();
        $('#increaseDecreaseGuest').show();
        var recipes = $('#recipe').val();
        getRecipe(recipes);
    });

    // Click add number of guests
    $('#add').on('click',function() {
        var add = $('#member').val();
        addPerson(add);      
    })

    // Click to decrease number of guests
    $('#decrease').on('click',function() {
        var decrease = $('#member').val();
        decreasePerson(decrease);
        
    })
});

// Calculate quntities when increase or decrease guest
    function calculate(calculate) {
        var newQuantity;
        var quantities;
        var result;
        oldQuantity.ingredients.forEach(items => {
            quantities = items.quantity/oldGuest;
            newQuantity = quantities*calculate
            result +=`
            <tr>
            <td><img src="${items.iconUrl}" width="100"></td>
             
              <td id="quantity">${newQuantity}</td>
              <td>${items.unit[0]}</td>
              <td>${items.name}</td>
              
          </tr>
            
            `;
            $('#ingredient').html(result);
        })
    }

// Request data to store in data variable
function requestApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chosenRechipe(data.recipes),
        error: () => console.log("Cannot get data"),
    })
}

// To get name of food in to select form
var alldata = [];
function chosenRechipe(recipe) {
    alldata = recipe;
    var Option = "";
    recipe.forEach(element => {
        Option += `
            <option value = "${element.id}">${element.name}</option>
        `;
    });
    $('#recipe').append(Option);
}

// getRecipe
function getRecipe(recipeID) {
    alldata.forEach(element => {
        if (element.id == recipeID) {
            getEachRecipe(element.name, element.iconUrl);
           
            eachIngredient(element.ingredients);
            eachStep(element.instructions);
            numberGuest(element.nbGuests);
            oldGuest = element.nbGuests;
            oldQuantity = element;
           
        }
    });
}





/////  Get iconUrl and Name of food
var getEachRecipe = (name, img) => {
    var result = "";
    result += `
        <h3>${name}</h3> 
    `;
    $('#nameOfFood').html(result);

    var results = "";
    results += `
        <img src="${img}" width="300" class="img-thumbnail"> 
    `;
    $('#imageOfFood').html(results);
}


/// Get ingredients

var oldQuantity ;
function eachIngredient(ingredient) {
    var ing = "";
    
    ingredient.forEach(el => {
        ing += `
            <tr>
              <td><img src="${el.iconUrl}" width="100"></td>
               
                <td>${el.quantity}</td>
                <td>${el.unit[0]}</td>
                <td>${el.name}</td>
                
            </tr>
        `;
    });
    $('#ingre').html("Ingredients");
    $('#ingredient').html(ing);
}



// get instructions
function eachStep(instruction) {
    var result = "";
    var ing = instruction.split('<step>');
    for (var i = 1; i < ing.length; i++) {
        result += `
            <h5 class="text-primary">Step:${i}</h5>
            <p>${ing[i]}</p>
        `;
    }
    $('#instruct').html("Instruction");
    $('#instruction').html(result);


}


// Get number of guests
function numberGuest(guest) {
   
    var result = "";
    result += `
    <input type="text" class="form-control text-center" value="${guest}" id="member" disabled>
    `;

    $('#input').html(result);
} 


//Add person

function addPerson(adds)  {
    var added = parseInt(adds) +1;
    if(added<=15) {
        $('#member').val(added);
        calculate($("#member").val());
      
    }
}

// Decrease person
function decreasePerson(decrease)  {
    var decrease = parseInt(decrease)-1;
    if(decrease>0) {
        $('#member').val(decrease);
        calculate($("#member").val());
        
    }
}




  








