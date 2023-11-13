$(document).ready(function () {

    $(".loanCalc").hide();
    $("#loanButton").click(function () {
        $(".loanCalc").show();
    });
    // stopped while working on data validation
    $("#calcButton").click(function () {
        var loanAmount = parseFloat($("#loanAmount").val());
        var interestRate = (parseFloat($("#interestRate").val())) / 100;
        var loanTerm = parseFloat($("#loanTerm").val());
        var loanTermMonths = loanTerm * 12;
        var startMonth = $("#month").val();
        var startYear = parseFloat($("#year option:selected").text());
        console.log(loanAmount, interestRate, loanTerm, startMonth, startYear);

        var monthlyInterestRate = (interestRate / 12);
        var monthlyPayment = loanAmount * monthlyInterestRate / (1 - Math.pow((1 + monthlyInterestRate), (-loanTermMonths)));
        var balance = loanAmount;
        var i = startYear;
        var output = "";
        output += "<p>Monthly Payment: " + monthlyPayment.toFixed(2) + "</p>";
        output += "<table>";
        for(i; i <= startYear + loanTerm; i++) {
            var interestPaidPerYear = 0;
            var principalPaidPerYear = 0;
            for(var x = 1; x <= 12; x++) {
                var interestPaidPerMonth = balance * monthlyInterestRate;
                interestPaidPerYear += interestPaidPerMonth;
                var principalPaidPerMonth = monthlyPayment - interestPaidPerMonth;
                principalPaidPerYear += principalPaidPerMonth;
                balance -= principalPaidPerMonth;
            }
            output += "<tr><td>" + startMonth + "/" + i + "-" + startMonth + "/" + (i + 1) + "</td><td>" + interestPaidPerYear.toFixed(2) + "</td><td>" + (principalPaidPerMonth * 12).toFixed(2) + "</td><td>" + balance.toFixed(2) + "</td></tr>";
        }
        output += "</table>";
        $(".table").html(output);

        /*
        let monthlyInterestRate = (interestRate / 12);
        let monthlyPayment = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate), (-loanTerm * 12));


        let i = startYear;
        let j = startMonth;
        let endYear = startYear + loanTerm;
        let output = "<p>Monthly Payment: " + monthlyPayment + "</p>";
        output += "<table>";
        for (i; i <= endYear; i++) {
            if (i == endYear) {
                for (j; j <= startMonth; j++) {
                    let interestPaidPerMonth = loanAmount * monthlyInterestRate;
                    let principalPaidPerMonth = monthlyPayment - interestPaidPerMonth;
                    loanAmount -= principalPaidPerMonth;
                    output += "<tr><td>" + j + " / " + i + "</td><td>" + interestPaidPerMonth.toFixed(2) + "</td><td>" + principalPaidPerMonth.toFixed(2) + "</td><td>" + loanAmount.toFixed(2) + "</td></tr>"
                }
            } else {
                for (j; j < 13; j++) {
                    let interestPaidPerMonth = loanAmount * monthlyInterestRate;
                    let principalPaidPerMonth = monthlyPayment - interestPaidPerMonth;
                    loanAmount -= principalPaidPerMonth;
                    output += "<tr><td>" + j + " / " + i + "</td><td>" + interestPaidPerMonth.toFixed(2) + "</td><td>" + principalPaidPerMonth.toFixed(2) + "</td><td>" + loanAmount.toFixed(2) + "</td></tr>"
                }
            }

            j = 1;
        }
        output += "</table>";
        $(".table").html(output);
        */
    });

});
