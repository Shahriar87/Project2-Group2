$(document).ready(function () {

    var name = $("#name").val().trim();
    var description = $("#description").val().trim();
    var price = $("#price").val().trim();
    var quantity = $("#quantity").val().trim();
    var image = $("#imageURL").val().trim();
    var rating = $("#rating").val();
    var age = $("#age").val();
    var category = $("#toyCategory").val();
    var manufacturer = $("#toyManufacturer").val();


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

        // VALIDATE FUNCTION
        // function validateForm() {
        //     var valid = true;

        //     // VERIFY FIELDS
        //     if (name === "") {
        //         valid = false;
        //     };
        //     if (description === "") {
        //         valid = false;
        //     };
        //     if (price === "") {
        //         valid = false;
        //     };
        //     if (quantity === "") {
        //         valid = false;
        //     };
        //     if (rating === "") {
        //         valid = false;
        //     };
        //     if (age === "") {
        //         valid = false;
        //     };
        //     if (category === "") {
        //         valid = false;
        //     };
        //     if (manufacturer === "") {
        //         valid = false;
        //     };

        //     // VERIFY PHOTO URL
        //     var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        //     if (image === "") {
        //         valid = false;
        //     } else if ((!regex.test(photoUrl))) {
        //         alert("Please write a valid image source URL!");
        //         valid = false;
        //     }
        //     // VERIFY THE SCORES
        //     $('.validate').each(function () {
        //         // console.log($(this).val());
        //         if ($(this).val() === "") {
        //             valid = false;
        //         }
        //     });
        //     return valid;
        // }

        // GRAB DATA
        // if (validateForm() === false) {
        //     return;
        // }
        // Constructing a newToy object to hand to the database
        var newToy = {
            toyName: $("#name").val().trim(),
            toyDescription: $("#description").val().trim(),
            toyPrice: parseFloat($("#price").val().trim()),
            toyQuantity: parseInt($("#quantity").val().trim()),
            toyImage: $("#imageURL").val().trim(),
            toyRating: parseInt($("#rating").val()),
            ageLimit: parseInt($("#age").val()),
            CategoryID: parseInt($("#toyCategory").val()),
            ManufacturerID: parseInt($("#toyManufacturer").val()),
            scores: [
                parseInt($("#Q1").val()),
                parseInt($("#Q2").val()),
                parseInt($("#Q3").val()),
                parseInt($("#Q4").val()),
                parseInt($("#Q5").val())
            ]
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
            // location.reload();
        })
    }

    // // Gets toy data for the current toy if we're editing
    // function getToyData(id, type) {
    //     var queryUrl;
    //     switch (type) {
    //         case "toy":
    //             queryUrl = "/api/toys/" + id;
    //             break;
    //         case "category":
    //             queryUrl = "/api/category/" + id;
    //             break;
    //         case "manufacturer":
    //             queryUrl = "/api/manufacturer/" + id;
    //             break;
    //         default:
    //             return;
    //     }
    //     $.get(queryUrl, function (data) {
    //         if (data) {
    //             console.log(data.CategoryID || data.ManufacturerID || data.id);
    //             // If this toy exists, prefill our companypage forms with its data
    //             titleInput.val(data.title);
    //             bodyInput.val(data.body);
    //             authorId = data.AuthorId || data.id;
    //             $("#name").val(data.name);
    //             $("#description").val(data.description);
    //             $("#price").val(data.price);
    //             $("#quantity").val(data.quantity);
    //             $("#imageURL").val(data.image);
    //             categoryId = data.CategoryID || data.ManufacturerID || data.id;
    //             manufacturerId = data.CategoryID || data.ManufacturerID || data.id;
    //             // If we have a toy with this id, set a flag for us to know to update the toy
    //             // when we hit submit
    //             updating = true;
    //         }
    //     });
    // }

    // A function to get Category and then render our list of Category
    // function getCategory() {
    //     $.get("/api/category", renderCategoryList);
    // }
    // renderCategoryList
    // // Function to either render a list of categories, or if there are none, direct the user to the page
    // // to create a category first
    // function renderCategoryList(data) {
    //     if (!data.length) {
    //         $("#myModal").style.display = "block";
    //     }
    //     // var rowsToAdd = [];
    //     // for (var i = 0; i < data.length; i++) {
    //     //     rowsToAdd.push(createAuthorRow(data[i]));
    //     // }
    //     $("#toyCategory").empty();
    //     // console.log(rowsToAdd);
    //     // console.log(authorSelect);
    //     // authorSelect.append(rowsToAdd);
    //     // authorSelect.val(authorId);
    // }


});