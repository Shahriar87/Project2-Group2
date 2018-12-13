// PUT REQUEST TO ADD TOY INVENTORY QUANTITY

$("#quantBtn").on("click", function (event) {
    var updateT = {
        id: $("#toyID").text(),
        unitStock: parseInt($("#toyQuant").val()),
    }
    // console.log(updateT);
    updateToy(updateT);
});

//FUNCTION WHICH MAKES THE AJAX PUT CALL

function updateToy(data) {
    $.ajax({
        method: "PUT",
        url: "/api/toys/" + data.id,
        data: data
    }).then(function () {
        //RELOAD PAGE
        location.reload();
    })
};

// TIMEOUT TO HIGHLIGHT THE QUANTITY CHANGE FOR 2 secs

$("#stockQuant").addClass("bg-warning")
setTimeout(function () {
    $("#stockQuant").removeClass("bg-warning")
}, 2000);
