console.log("ready!")

// import moment from 'moment';

$("#quantityWarning").hide();
$("#warningConfirm").hide();
$("#orderConfirmTwo").hide();
$("#currentOrderValidationCard").hide();
$("#currentOrders").hide();
$("#orderHistoryCard").hide();

//if we are in order history and order is less then 10 units, then submit button adds to the order history table, but does not pass the order to the database
$("#order-history").on("click", function (data) {
    event.preventDefault();
    $("#orderHistoryCard").show();
    $("#currentOrderValidationCard").hide();
    $("#order-submit").hide();
    $("#currentOrders").show();
    $("#cardHeaderOne").html("<h3>Order History</h3>");
    console.log("order history clicked");
    $.get("/api/all", function (data) {
        for (i = 0; i < data.length; i++) {
            var toyName = data[i].ToyName;
            var toyQuantity = data[i].ToyQuantity;
            var timeOrdered = data[i].createdAt;

            console.log(moment(timeOrdered).format("LLL"));

            $("#columnHeaders").append("<tr><td>" + toyName + "</td><td>" + toyQuantity + "</td><td>" + moment(timeOrdered).format("LLL") + "</td></tr>")

        }
    })
})

//This is the original order submit button
//
$("#order-submit").on("click", function (event) {
    event.preventDefault();

    if ($("#toyQuantity").val().trim() > 10) {
        $("#order-submit").hide();
        //This hides the order history button
        $("#order-history").show();
        // $("#quantityWarning").attr('style', 'color:red');

        console.log(Number.isInteger(parseInt($("#toyQuantity").val().trim())));
    }

    if (Number.isInteger(parseInt($("#toyQuantity").val().trim()))) {
        console.log("number is an integer");
        $("#orderHistoryCard").hide();
        $("#currentOrderValidationCard").show();
        $("#orderConfirmTwo").show();

        $("#cardHeaderTwo").html("<h3>Are you sure you want to submit this order?</h3>");
        $("#cardHeaderTwo").attr('style', 'color:red');


        $("#columnHeadersTwo").append("<tr><td>" + $("#toyName").text() + "</td><td>" + parseInt($("#toyQuantity").val().trim()) + "</td><td>" + moment().format("LLL") + "</td></tr>")
        //this is the button that shows up on the bottom of the form "yes, I'm sure..."
        //this button will send the single order directly to the database from the bottom of the form
        //this button only shows if the order quantity is questionable, ie > 10 units
        $("#orderConfirmTwo").on("click", function () {

            var newOrder = {
                ToyName: $("#toyName").text(),
                price: $("#toyPrice").text(),
                ToyQuantity: parseInt($("#toyQuantity").val().trim()),
                totalCost: parseFloat($("#toyPrice").text()) * parseInt($("#toyQuantity").val().trim()),
                createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
            }

            console.log(newOrder);
            $.post("/api/new", newOrder).then(function () {
                $.get("/api/all", function (data) {
                })
            })


        });


    } else {
        alert("You did not enter an adequate quantity or you left key fields blank.")
    }
})

$("#currentOrders").on("click", function (event) {
    event.preventDefault();
    $("#orderHistoryCard").hide();
    $("#currentOrderCard").show();
    $("#currentOrderValidationCard").show();
    $("#order-submit").show();
})


