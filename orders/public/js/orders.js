$("#order-submit").on("click", function (event) {
    event.preventDefault();

    

    var newOrder = {
        ToyName: $("#toyName").val().trim(),
        ToyQuantity: parseInt($("#toyQuantity").val().trim()),
        created_at: moment().format("YYYY-MM-DD HH:mm:ss")
    }

    console.log(newOrder);

    $.post("/api/new", newOrder).then(function() {

    })

    $.get("/api/all", function(data){
        console.log(data);
    })
    




})