// GET THE MODALS
var modal = document.getElementById('myModal');
var modal2 = document.getElementById('myModal2');


// INITIAL MODAL
$(window).on('load', function () {

// ONLY SHOW RECOMMENDED TOYS IF CUSTOMER HAS PEVIOUSLY COMPLETED THE SURVEY
    $.get("/api/toy", function (data) {      

        if (data.dbUser.createdAt != data.dbUser.updatedAt) {

            modal2.style.display = "block";

            $('#recommendPhoto4').attr("src", data.recommendArray[0].image);
            $('#toyLink4').attr("href", "/customer/" + data.dbUser.id +  "/toy/" + data.recommendArray[0].id);

            $('#recommendPhoto5').attr("src", data.recommendArray[1].image);
            $('#toyLink5').attr("href", "/customer/" + data.dbUser.id +  "/toy/" + data.recommendArray[1].id);

            $('#recommendPhoto6').attr("src", data.recommendArray[2].image);
            $('#toyLink6').attr("href", "/customer/" + data.dbUser.id +  "/toy/" + data.recommendArray[2].id);

        }
    })
});


// WHEN USER CLICKS X OR CLOSE BUTTON, BOTH MODAL CLOSES
$(".close").on("click ", function () {
    modal.style.display = "none";
    modal2.style.display = "none";

});

// SHOW MODAL

$("#findToy").on("click", function (event) {
    event.preventDefault();

    // VALIDATE FUNCTION

    function validateSurvey() {
        var valid = true;

        // VERIFY THE SCORES
        $('.validate').each(function () {
            // console.log($(this).val());
            if ($(this).val() === "") {
                valid = false;
            }
        });
        return valid;
    }

    if (validateSurvey() === true) {

        var customerPref = {
            id: $("#userID").text(),
            Q1: $("#Q1").val(),
            Q2: $("#Q2").val(),
            Q3: $("#Q3").val(),
            Q4: $("#Q4").val(),
            Q5: $("#Q5").val()
        }

        // console.log(customerPref);

        // POST REQUEST TO SHOW RECOMMEND TOY
        $.post("/api/toy", customerPref, function (data) {
            $('#recommendPhoto1').attr("src", data.recommendArray[0].image);
            $('#toyLink1').attr("href", "/customer/" + data.dbUser.id +  "/toy/" + data.recommendArray[0].id);

            $('#recommendPhoto2').attr("src", data.recommendArray[0].image);
            $('#toyLink2').attr("href", "/customer/" + data.dbUser.id +  "/toy/" + data.recommendArray[1].id);

            $('#recommendPhoto3').attr("src", data.recommendArray[0].image);
            $('#toyLink3').attr("href", "/customer/" + data.dbUser.id +  "/toy/" + data.recommendArray[2].id);
        });


        // POST REQUEST TO ADD USER PREFERENCE
        updateUser(customerPref);
        function updateUser(data) {
            $.ajax({
                method: "PUT",
                url: "/api/user",
                data: data
            })
        };

        modal.style.display = "block";

        $("#Q1").val("");
        $("#Q2").val("");
        $("#Q3").val("");
        $("#Q4").val("");
        $("#Q5").val("");

    } else {
        alert("Please fill out all fields!");
    }
    return false;

});

