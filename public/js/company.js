$(document).ready(function () {


    var toyName = $("#name");
    var toyDescription = $("#description");
    var toyPrice = $("#price");
    var toyQuantity = $("#quantity");
    var toyImage = $("#imageURL");
    var toyRating = $("#rating");
    var ageLimit = $("#age");
    var toyCategory = $("#toyCategory");
    var toyManufacturer = $("#toyManufacturer");

    var score = [
        $("#Q1"),
        $("#Q2"),
        $("#Q3"),
        $("#Q4"),
        $("#Q5")
    ];

    $("#inventoryForm").on("submit", handleFormSubmit);

    // FORM SUBMISSION

    function handleFormSubmit(event) {
        event.preventDefault();
        // Wont submit the post if we are missing a body, title, or author
        if (!titleInput.val().trim() || !bodyInput.val().trim() || !authorSelect.val()) {
            return;
        }
        // Constructing a newPost object to hand to the database
        var newPost = {
            title: titleInput
                .val()
                .trim(),
            body: bodyInput
                .val()
                .trim(),
            AuthorId: authorSelect.val()
        };

        // If we're updating a post run updatePost to update a post
        // Otherwise run submitPost to create a whole new post
        if (updating) {
            newPost.id = postId;
            updatePost(newPost);
        }
        else {
            submitPost(newPost);
        }
    }

});