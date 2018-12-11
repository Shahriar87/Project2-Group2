// GET THE MODAL 1
var modal = document.getElementById('myModal');

// WHEN USER CLICKS X OR CLOSE BUTTON, BOTH MODAL CLOSES
$(".close").on("click ", function () {
    modal.style.display = "none";
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
            $('#recommendPhoto1').attr("src", data[0].image);
            $('#toyLink1').attr("href", "/toy/" + data[0].id);

            $('#recommendPhoto2').attr("src", data[1].image);
            $('#toyLink2').attr("href", "/toy/" + data[1].id);

            $('#recommendPhoto3').attr("src", data[2].image);
            $('#toyLink3').attr("href", "/toy/" + data[2].id);
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