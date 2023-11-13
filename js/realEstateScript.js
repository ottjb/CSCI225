$(document).ready(function () {

    $(".loanCalc").hide();
    $("#loanButton").click(function () {
        $(".loanCalc").show();
        $(".table").hide("");
    });
    $("#calcButton").click(function () {
        var loanAmount = parseFloat($("#loanAmount").val());
        var interestRate = (parseFloat($("#interestRate").val())) / 100;
        var loanTerm = parseFloat($("#loanTerm").val());
        var startMonth = $("#month").val();
        var startYear = parseFloat($("#year option:selected").text());
        var showResultsBy = $("#showResultsBy option:selected").text();

        if (!loanAmount || !interestRate || !loanTerm) {
            alert("Please enter a number in all fields");
        } else { calculate(loanAmount, interestRate, loanTerm, startMonth, startYear, showResultsBy); }
    });


    function calculate(loanAmount, interestRate, loanTerm, startMonth, startYear, showResultsBy) {

        var monthlyInterestRate = (interestRate / 12);
        var loanTermMonths = loanTerm * 12;
        var monthlyPayment = loanAmount * monthlyInterestRate / (1 - Math.pow((1 + monthlyInterestRate), (-loanTermMonths)));
        var balance = loanAmount;
        var i = startYear;
        var endYear = startYear + loanTerm;
        var output = "";
        output += "<p>Monthly Payment: " + monthlyPayment.toFixed(2) + "</p>";
        output += "<table>";
        output += "<tr><th>Date</th><th>Interest</th><th>Principal</th><th>Balance</th></tr>";
        if (showResultsBy == "Year") {
            for (i; i < endYear; i++) {
                var interestPaidPerYear = 0;
                var principalPaidPerYear = 0;
                for (var x = 1; x <= 12; x++) {
                    var interestPaidPerMonth = balance * monthlyInterestRate;
                    interestPaidPerYear += interestPaidPerMonth;
                    var principalPaidPerMonth = monthlyPayment - interestPaidPerMonth;
                    principalPaidPerYear += principalPaidPerMonth;
                    balance -= principalPaidPerMonth;
                }
                output += "<tr><td>" + startMonth + "/" + i + "-" + startMonth + "/" + (i + 1) +
                    "</td><td>$" + interestPaidPerYear.toFixed(2) + "</td><td>$" +
                    (principalPaidPerMonth * 12).toFixed(2) + "</td><td>$" + balance.toFixed(2) + "</td></tr>";
            }
            output += "</table>";
            $(".table").html(output);
            $(".loanCalc").hide();
            $(".table").show("");
        } else if (showResultsBy == "Month") {
            var j = startMonth;
            output += "<table>";
            output += "<tr><th>Date</th><th>Interest</th><th>Principal</th><th>Balance</th></tr>";
            for (i; i <= endYear; i++) {
                if (i == endYear) {
                    for (j; j < startMonth; j++) {
                        var interestPaidPerMonth = balance * monthlyInterestRate;
                        var principalPaidPerMonth = monthlyPayment - interestPaidPerMonth;
                        balance -= principalPaidPerMonth;
                        output += "<tr><td>" + j + "/" + i + "</td><td>$" + interestPaidPerMonth.toFixed(2) + "</td><td>$" + principalPaidPerMonth.toFixed(2) + "</td><td>$" + balance.toFixed(2) + "</td></tr>";
                    }
                } else {
                    for (j; j < 13; j++) {
                        var interestPaidPerMonth = balance * monthlyInterestRate;
                        var principalPaidPerMonth = monthlyPayment - interestPaidPerMonth;
                        balance -= principalPaidPerMonth;
                        output += "<tr><td>" + j + "/" + i + "</td><td>$" + interestPaidPerMonth.toFixed(2) + "</td><td>$" + principalPaidPerMonth.toFixed(2) + "</td><td>$" + balance.toFixed(2) + "</td></tr>";
                    }
                }

                j = 1;
            }
            output += "</table>";
            $(".table").html(output);
        }

    }

});
