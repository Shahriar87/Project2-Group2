// GET THE MODAL 1
var modal = document.getElementById('myModal');

// WHEN USER CLICKS X OR CLOSE BUTTON, BOTH MODAL CLOSES
$('.close').on("click ", function () {
  modal.style.display = "none";
  modal2.style.display = "none";
});

// SHOW MODAL

$("#categoryCreate").on("click", function () {
  modal.style.display = "block";
});

// GET THE MODAL 2
var modal2 = document.getElementById('myModal2');

// SHOW MODAL

$("#manufacturerCreate").on("click", function () {
  modal2.style.display = "block";
});



$(document).ready(function () {

    $("#addInv").on("click", handleFormSubmit);

    // GETS PART OF THE URL THAT COMES AFTER THE "?"

    var url = window.location.search;
    var toyId;
    var categoryId;
    var manufacturerId;

    // SETS A FLAG WHETHER OR NOT WE ARE UPDATING A TOY TO BE FALSE INITIALLY
    var updating = false;

    // If we have this section in our url, we pull out the toy id from the url
    // In '?toy_id=1', toyId is 1
    // if (url.indexOf("?toy_id=") !== -1) {
    //     toyId = url.split("=")[1];
    //     getToyData(toyId, "toy");
    // }
    // else if (url.indexOf("?category_id=") !== -1) {
    //     categoryId = url.split("=")[1];
    // }
    // else if (url.indexOf("?manufacturer_id=") !== -1) {
    //     manufacturerId = url.split("=")[1];
    // }

    // getCategory();

    // FORM SUBMISSION

    function handleFormSubmit(event) {
        event.preventDefault();

        var name = $("#name").val().trim();
        var description = $("#description").val().trim();
        var price = $("#price").val().trim();
        var quantity = $("#quantity").val().trim();
        var image = $("#imageURL").val().trim();
        var rating = $("#rating").val();
        var age = $("#age").val();
        var category = $("#toyCategory").val();
        var manufacturer = $("#toyManufacturer").val();

        // VALIDATE FUNCTION
        function validateForm() {
            var valid = true;

            // VERIFY FIELDS
            if (name === "") {
                valid = false;
            };
            if (description === "") {
                valid = false;
            };
            if (price === "") {
                valid = false;
            };
            if (quantity === "") {
                valid = false;
            };
            if (rating === "") {
                valid = false;
            };
            if (age === "") {
                valid = false;
            };
            if (category === "") {
                valid = false;
            };
            if (manufacturer === "") {
                valid = false;
            };

            // VERIFY PHOTO URL
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if (image === "") {
                valid = false;
            } else if ((!regex.test(image))) {
                alert("Please write a valid image source URL!");
                valid = false;
            }
            // VERIFY THE SCORES
            $('.validate').each(function () {
                // console.log($(this).val());
                if ($(this).val() === "") {
                    valid = false;
                }
            });
            return valid;
        }

        console.log(validateForm());




        // GRAB DATA
        if (validateForm() === false) {
            return;
        }
        // Constructing a newToy object to hand to the database
        var newToy = {
            toyName: name,
            toyDescription: description,
            price: parseFloat(price),
            unitStock: parseInt(quantity),
            image: image,
            rating: parseInt(rating),
            ageAbove: parseInt(age),
            category_id: parseInt(category),
            manufacturer_id: parseInt(manufacturer),
            Q1: parseInt($("#Q1").val()),
            Q2: parseInt($("#Q2").val()),
            Q3: parseInt($("#Q3").val()),
            Q4: parseInt($("#Q4").val()),
            Q5: parseInt($("#Q5").val())
        };

        console.log(newToy);

        // If we're updating a toy run updateToy to update a toy
        // Otherwise run submitToy to create a whole new toy
        // if (updating) {
        //     newToy.id = toyId;
        //     updateToy(newToy);
        // }
        // else {
        submitToy(newToy);
        // }
    }

    function submitToy(toy) {
        console.log(toy)
        $.post("/api/toys", toy, function () {
            console.log("Added new toy: " + toy);
            //RELOAD PAGE
            location.reload();
        })
    }

    // ADDING A NEW CATEGORY

    $("#catButton").on("click", function (event) {
        event.preventDefault();

        var cateInp = $("#cate-name").val().trim()

        // VALIDATE INPUT
        if (cateInp === "") {
            return;
        }
        // FETCH INPUT
        upsertCategory({
            categoryName: cateInp
        });

        function upsertCategory(categoryData) {
            $.post("/api/category", categoryData, function () {
                console.log("Added new category: " + categoryData);
                //RELOAD PAGE
                location.reload();
            });
        }
    });



    $("#manButton").on("click", function (event) {
        event.preventDefault();

        var manuInp = $("#manu-name").val().trim()

        // VALIDATE INPUT
        if (manuInp === "") {
            return;
        }
        // FETCH INPUT
        upsertManuf({
            manufacturerName: manuInp
        });

        function upsertManuf(manufacturerData) {
            $.post("/api/manufacturer", manufacturerData, function () {
                console.log("Added new manufacturer: " + manufacturerData);
                //RELOAD PAGE
                location.reload();
            });
        }
    });











});