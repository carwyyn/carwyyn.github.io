function running(){

  function grant(income){
    var maxRange = income+3
    var minRange = income-3
    var maxiRange = income+7
    var miniRange = income -7


    if (income < 18370){
      var amount = 5161;
      console.log("FULL GRANT");
      console.log("£5,161");
      return amount;
    }else if(income < 26500){
      var amount = 5161;
      var count = 18370.0;
      while(count<26500){
        if (((Math.round(count)) >= minRange) && ((Math.round(count)) < maxRange)) {
          console.log(amount);
          return amount;
          break;
        };
        count = count + 3.653;
        amount = amount - 1;
      };
    } else if (income < 34000) {
      var amount = 2936;
      var count = 26500.0;
      while (count < 34000){
        if (((Math.round(count)) >= minRange) && ((Math.round(count)) < maxRange)){
          console.log(amount);
          return amount;
          break;
        };
        count = count+4.18;
        amount = amount - 1;
      };
    } else if (income < 50020){
      var amount = 1142;
      var count = 34000.0;
      while (count < 50020){
        if (((Math.round(count)) >= miniRange) && ((Math.round(count)) < maxiRange)){
          console.log(amount);
          return amount;
          break;
        };
        count = count + 14.67;
        amount = amount -1;
      };
    } else if (income == 50020){
      var amount = 50;
      console.log(amount);
      return amount;
    } else {
      var amount = 0;
      console.log("I'm sorry, you wouldn't qualify for a grant");
      return(amount);
    };
  };

  function loan(income, grant) {
    var loan = 6183;
    var reduction = 0;

    if (grant == 0){
      console.log("Might be some reduction");
      var loanLivingCosts = 50753;
      var numberBetween = income - loanLivingCosts;
      reduction = numberBetween/5;
      if (reduction > 1546){
        reduction = 1546;
      };
    } else {
      for (i=0; i<grant; i++){
        if (reduction < 2580){
          reduction = reduction + 0.5;
        } else {
          break;
        };
      };
    };
    console.log(reduction);
    console.log("GRANT");
    console.log(grant);
    console.log("LOAN");
    console.log(loan-reduction);
    console.log("TOTAL");
    console.log(grant + (loan-reduction));
    return reduction
  };

  function diamond(income){
    count=18370;
    reduction=0;
    if(income<18370){
      return(8100);
    } else{
      while (Math.round(count) < income){
        reduction = reduction + 1;
        count = count + 8.821126761;
      };
      return reduction;
    };
  };

  var income = document.getElementById('search_termPostCode').value;
  var newAmount = diamond(income);
  var grant = grant(income);
  var loan = loan(income, grant);

  var stuffOld = ("Currently, you would be eligible for a maintenance grant of £"+ grant +" and a \£" + (6183-loan) + " loan. Your total available manitenance fund is therefore \£" + (grant+(6183-loan)))
  var stuffOld=stuffOld.toString();
  var textOld = document.createTextNode(stuffOld);
  var textNew = document.createTextNode(". Under the system recommended in the Diamond Review(note: it's implementation is not guaranteed), you would be eligible for a grant of £"+ newAmount + " and a £"+(8100-newAmount)+" loan. Your total eligible maintenance available funds would be £8,100.")
  var p = document.createElement('p');
  var body = document.getElementsByTagName('body')[0];
  p.appendChild(textOld);
  p.appendChild(textNew);
  body.appendChild(p);
};

console.log('ready');
var search_button = document.getElementById('search_buttonPostCode');
search_button.addEventListener('click', running);
