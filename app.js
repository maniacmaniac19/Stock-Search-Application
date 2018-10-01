let stockList = ['CYBR', 'CSCO', 'FEYE', 'MIME', 'RPD'];
let validationList = []
const render = function () {

    $("#stocks-view").empty()
    for(let i = 0; i < stockList.length; i++){
      // $("#stocks-view").append(`<button class="get-stock" value=${stockList[i]}>${stockList[i]}</button>`)
      $("#stocks-view").append(`<button class=" button secondary get-stock" value=${stockList[i]}>${stockList[i]}</button>`)
    }
  
  }

  const addButton = function(event) {
    event.preventDefault();
    for(let i=0; i < validationList.length; i++){
      let newStock = $("#stock-query").val().trim();
      if(newStock === validationList[i].symbol){
        stockList.push(newStock)
      }
    
    
      
    }
    // Delete value from input box
    $("#stock-query").val("")
    console.log(stockList)
    render();
  }

  $('.stockentry').on('click', addButton);
  $('#stocks-view').on('click',".get-stock",function(event){
    event.preventDefault();
    const stock = $(this).val();
    
   
    const queryURL = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,logo,news&range=1m&last=10`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
      $(".stockinfo").empty();
      $(".stocknews").empty();
      console.log(response)
      $(".stockinfo").append(`<div class = "card><div class = "card-section"><img src = ${response.logo.url} alt = "logo"<br></div><div class="card-section"><p>Company Name: ${response.quote.companyName}</p><p>Latest Price: ${response.quote.latestPrice}</p></div></div>`)
      for(i = 0; i < response.news.length; i ++){
      $(".stocknews").append(`<div class = "card"><div class = "card-section"><h3> ${response.news[i].headline}</h3></div><div class = "card-section"><p>${response.news[i].summary}<a href="${response.news[i].url}">Click here for more<a></p><div></div>`)
      }
    })
    })
//function to get all stocks symbols in an array
    const verify = function(){
      const verifyURL = `https://api.iextrading.com/1.0/ref-data/symbols`;
    $.ajax({
      url: verifyURL,
      method: "GET"
    }).then(function(response){
      console.log(response);

      validationList = response
      
    })
    }
    verify();

    // $('.stockentry').on('click', addButton);
    // console.log(stockList)
    // $('#stocks-view').on('click',".get-stock",function(event){
    //   event.preventDefault();
    //   const stock = $(this).val();
      
     
    //   const queryURL = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,news&range=1m&last=10`;
    //   $.ajax({
    //     url: queryURL,
    //     method: "GET"
    //   }).then(function(response){
    //     console.log(response);
    //   })
    //   })