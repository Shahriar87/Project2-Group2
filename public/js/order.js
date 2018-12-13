console.log("ready!")

// import moment from 'moment';

$("#quantityWarning").hide();
$("#warningConfirm").hide();
$("#orderConfirmTwo").hide();
$("#currentOrderValidationCard").hide();
$("#currentOrders").hide();
$("#orderHistoryCard").hide();
$("#warning").hide();

//This is the original order submit button
//
$("#order-submit").on("click", function (event) {
    event.preventDefault();

    // console.log($("#toyStock").text());


    if (parseInt($("#toyQuantity").val().trim()) > parseInt($("#toyStock").text())) {
        // $("#order-submit").hide();
        //This hides the order history button
        $("#warning").show();
        // $("#quantityWarning").attr('style', 'color:red');
        return;
        // console.log(Number.isInteger(parseInt($("#toyQuantity").val().trim())));
    } else {
        $("#warning").hide();
    }

    if (Number.isInteger(parseInt($("#toyQuantity").val().trim()))) {
        console.log("number is an integer");
        $("#orderHistoryCard").hide();
        $("#currentOrderValidationCard").show();
        $("#orderConfirmTwo").show();

        $("#cardHeaderTwo").html("<h3>Are you sure you want to submit this order?</h3>");
        $("#cardHeaderTwo").attr('style', 'color:red');


        $("#columnHeadersTwo").append("<tr><td>" + $("#toyName").text() + "</td><td>" + parseInt($("#toyQuantity").val().trim()) + "</td><td>" + moment().format("LLL") + "</td></tr>")

        // CUSTOMER CAN ONLY PURCHASE FROM WHATS AVAILABLE IN DATABASE
        $("#orderConfirmTwo").on("click", function () {

            var newOrder = {
                ToyName: $("#toyName").text(),
                price: $("#toyPrice").text(),
                ToyQuantity: parseInt($("#toyQuantity").val().trim()),
                totalCost: parseFloat($("#toyPrice").text()) * parseInt($("#toyQuantity").val().trim()),
                createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
            };

            var upToy = {
                id: $("#toyId").text(),
                unitStock: - parseInt($("#toyQuantity").val()),
            };
            updateToy(upToy);

            $.post("/api/new", newOrder);

            function updateToy (data) {
                console.log(data);
                $.ajax({
                    method: "PUT",
                    url: "/api/toys/" + upToy.id,
                    data: data
                }).then(function () {
                    //RELOAD PAGE
                    // location.reload();
                })
            }



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


