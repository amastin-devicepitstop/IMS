window.onload = function(){
  preventFormSubmit();
  initDatabase();
  autocomplete();
  hideAnimation();
}

function preventFormSubmit() {
  // Check that the current page is the "New Store Stock" page
  
  if (urlContains("sign-maker")) {   
    // Prevent form submission
    $("form").submit(function (e) {  
      e.preventDefault();
      addSign();
      document.getElementById("sign-form").reset();
    });	
  }
}

function inputChange(element) {
  if (element.val() == ""){
    element.attr('class', 'sign-cell sign-value inputComment');
    element.closest("td").attr('class', 'sign-cell');
  }
  
  else{
    element.attr('class', 'sign-cell sign-value sign-comment inputComment');
    element.closest("td").attr('class', 'sign-cell sign-comment');
  }
}

function toQueue() {
  if ($(".card").children().length !== 0 ) {
    let product = $(".sign-product").val();
    let carrier = $(".sign-carrier").val();
    let storage = $(".sign-storage").val();
    let price = $(".sign-price").val();
    let comments = $(".inputComment").val();
    let sku = $(".inputSKU").val();
  
    save("signs", sku, {product: product, carrier: carrier, storage: storage, price: price, comments: comments, sku: sku});
  }
}

function addSign() {
  // Get <input> values
  let manufacturer = $("#manufacturer").val();
  let model = $("#model").val();
  let product = '"' + manufacturer + ' ' + model + '"';
  let carrier = $("#carrier").val();
  let storage = $("#storage").val();
  let price = $("#price").val();
  let comments = $("#comments").val();
  let sku = $("#sku").val();
  let id = '"' + 'id-' + sku + '"'
  
  // Create HTML for sign
  let signBegin = "<div class='sign-preview'><div><table><tbody>";
  let logoAndPriceRow = "<tr><td class='dp-logo sign-logo'></td><td class='sign-cell'><input class='sign-price sign-value' value=" + '$' + price + "></td></tr>";
  let manufacturerAndModelRow = "<tr><td colspan='2' class='sign-cell'><input class='sign-product sign-cell sign-value' value=" + product + "></td></tr>";
  let storageRow = "<tr><td colspan='2' class='sign-cell'><input class='sign-storage sign-cell sign-value' value=" + storage + "></input></td></tr>";
  let carrierRow = "<tr><td colspan='2' class='sign-cell'><input class='sign-carrier sign-cell sign-value' value=" + carrier + "></td></tr>";
  let commentsRow;
  let skuRow
  // If the sign has no comments, it should appear as a blank line
  if (comments == "") {
    commentsRow = "<tr><td colspan='2' class='sign-cell'><input id=" + id + "class='sign-cell sign-value inputComment' oninput='inputChange($(this))' value=" + comments + "></td></tr>";
    skuRow = "<tr><td colspan='2' class='sign-cell sign-sku'><input class='sign-cell sign-value sign-sku inputSKU' value=" + sku + "></td></tr>";
  }
  // If the sign does have comments, it should appear as a yellow line with red text.
  else {
    commentsRow = "<tr><td colspan='2' class='sign-cell sign-comment'><input id=" + id + "class='sign-cell sign-value sign-comment inputComment' oninput='inputChange($(this))' value=" + comments + "></td></tr>";
    skuRow = "<tr><td colspan='2' class='sign-cell'><input class='sign-cell sign-value inputSKU' value=" + sku + "></td></tr>";
  }
  let signEnd = "</tbody></table></div></div>";
  let sign = signBegin + logoAndPriceRow + manufacturerAndModelRow + storageRow + carrierRow + commentsRow + skuRow + signEnd
  
  $(".card").empty();
  $(".card").append(sign);
  $(".card").toggle();
  setTimeout(function() {
    $(".card").toggle();
  }, 200);
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
  
  let carrier = ["AT&T",
                  "Other",
                  "T-Mobile",
                  "Unlocked",
                  "Verizon",
                  "Sprint",
                  "Wi-Fi Only"
                 ];
  
  $("#carrier").autocomplete({
    source: carrier
  });
  
  let storage = ["4GB",
                 "8GB",
                 "16GB",
                 "32GB",
                 "64GB",
                 "128GB",
                 "256GB",
                 "512GB"
                ];
                
  $("#storage").autocomplete({
    source: storage
  });
  
  
}
