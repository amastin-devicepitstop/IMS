window.onload = function(){
  hideAnimation();
  preventFormSubmit();
  initDatabase();
  autocomplete();
}

function preventFormSubmit() {
  // Check that the current page is the "New Store Stock" page
  
  if (urlContains("new")) {
    $("#date").val(new Date().toLocaleDateString());
    $("#date").datepicker({dateFormat: "m/d/yy"});
    
    // Prevent form submission
    $("form").submit(function (e) {  
      e.preventDefault();
      addBuySale();
    });	
  }
}

function addBuySale() {
  let name = document.getElementById("first-name").value + " " + document.getElementById("last-name").value;
  let manufacturer = document.getElementById("manufacturer").value;
  let model = document.getElementById("model").value;
  let sku = document.getElementById("sku").value;
  let date = document.getElementById("date").value;
  
  let month = getMonth(date);
  let day = getDay(date);
  let year = getYear(date);
  
  let buy = $("#buy").prop('checked');
  let sale = $("#sale").prop('checked');
  
  save("buysale", sku, {tech: name, manufacturer: manufacturer, model: model, sku: sku, date: date, month: month, day: day, year: year, buy: buy, sale: sale});
}

function autocomplete() {
  let manufacturers = ["Acer", "Alienware", "Apple", "ASUS",
                       "BenQ",
                       "Compaq","CyberPowerPC",
                       "Dell",
                       "Gateway",
                       "HP","HTC",
                       "Intel",
                       "Lenovo","LG",
                       "Microsoft", "Motorola", "MSI",
                       "Origin PC",
                       "Panasonic",
                       "Razer",
                       "Samsung",
                       "Toshiba",
                       "Vizio"
                      ];
  
  $("#manufacturer").autocomplete({
    source: manufacturers
  });
  
  let models = ["Elitebook ",
                "Galaxy S4", "Galaxy S4 Active",
                "Galaxy S5", "Galaxy S5 Active",
                "Galaxy S6", "Galaxy S6 Active", "Galaxy S6 Edge", "Galaxy S6 Edge+",
                "Galaxy S7", "Galaxy S7 Edge", "Galaxy S7 Active",
                "Galaxy S8", "Galaxy S8+", "Galaxy S8 Active",
                "Galaxy S9", "Galaxy S9+",
                "iPad (1st Gen)", "iPad (2nd Gen)", "iPad (3rd Gen)",
                "iPad Mini",
                "iPad (4th Gen)",
                "iPad Air",
                "iPad Mini 2",
                "iPad Air 2",
                "iPad Mini 3", "iPad Mini 4",
                "iPad Pro (1st Gen, 12.9 in.)", "iPad Pro (1st Gen, 9.7 in.)", 
                "iPad (2017)",
                "iPad Pro (2nd Gen, 12.9 in.)", "iPad Pro (2nd Gen, 9.7 in.)",
                "iPad (2018)",
                "iPhone 5", "iPhone 5S",
                "iPhone 6", "iPhone 6S", "iPhone 6S Plus", "iPhone SE",
                "iPhone 7", "iPhone 7 Plus",
                "iPhone 8", "iPhone 8 Plus",
                "iPhone X", "iPhone XR", "iPhone XS", "iPhone XS Max",
                "Thinkpad ",
                "XPS "
               ];
  
  $("#model").autocomplete({
    source: models
  });
}