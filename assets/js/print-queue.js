let signs;

window.onload = function(){
  initDatabase();
  loadSigns();
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

function loadSigns() {
  signs = getAll("signs");
  setTimeout(function() {
    for (let i = 0; i < signs.length; i++){
      createSign(signs[i], isOdd(signs.indexOf(signs[i])));
      setupDelete();
    }
    hideAnimation();
  }, 1000);
}             

function createSign(sign, odd) {
  let manufacturerAndModel = sign.product;
  let carrier = sign.carrier;
  let storage = sign.storage;
  let price = sign.price;
  let comments = sign.comments;
  let sku = sign.sku;
  
  let signBegin = "<div class='sign-preview'><div class='sign-delete'></div><div><table><tbody>";
  let logoAndPriceRow = "<tr><td class='dp-logo sign-logo'></td><td class='sign-cell'><input class='sign-price sign-value' value=" + price + "></td></tr>";
  let manufacturerAndModelRow = "<tr><td colspan='2' class='sign-cell'><input class='sign-product sign-cell sign-value' value=" + manufacturerAndModel + "></td></tr>";
  let storageRow = "<tr><td colspan='2' class='sign-cell'><input class='sign-storage sign-cell sign-value' value=" + storage + "></input></td></tr>";
  let carrierRow = "<tr><td colspan='2' class='sign-cell'><input class='sign-carrier sign-cell sign-value' value=" + carrier + "></td></tr>";
  let commentsRow;
  // If the sign has no comments, it should appear as a blank line
  let skuRow = "<tr><td colspan='2' class='sign-cell sign-sku'><input class='sign-cell sign-value sign-sku inputSKU' value=" + sku + "></td></tr>";
  // If the sign has no comments, it should appear as a blank line
  if (comments == "" || comments == '""') {
    console.log(comments);
    commentsRow = "<tr><td colspan='2' class='sign-cell'><input class='sign-cell sign-value inputComment' oninput='inputChange($(this))' value=" + comments + "></td></tr>";
  }
  // If the sign does have comments, it should appear as a yellow line with red text.
  else {
    console.log(comments);
    commentsRow = "<tr><td colspan='2' class='sign-cell sign-comment'><input class='sign-cell sign-value sign-comment inputComment' oninput='inputChange($(this))' value=" + comments + "></td></tr>";
  }
  let signEnd = "</tbody></table></div></div>";
  let newSign = signBegin + logoAndPriceRow + manufacturerAndModelRow + storageRow + carrierRow + commentsRow + skuRow + signEnd
  
  if (odd) {
    $(".queue-right").append(newSign);
    console.log($(".queue-right").children().last());
  }
  else {
    $(".queue-left").append(newSign);  
  }
}

function deleteSign() {
  closeModal();
  let sku = $(".to-delete").closest(".sign-preview").find(".inputSKU").val();
  console.log(sku);
  $(".to-delete").closest(".sign-preview").remove();
  remove("signs", sku);
}

function keepSign() {
  closeModal();
  $(".to-delete").attr('class', 'sign-delete');
}

function isOdd(num) {
  return num % 2;
}

function clearQueue() {
  let sign;
  setTimeout(function() {
    for (let j = 0; j < signs.length; j++){
      sign = signs[j];
      remove("signs", sign.sku);
    }
  }, 1000);
}

function setupDelete() {
  $(".sign-delete").click(function() {
    $(this).attr('class', 'sign-delete to-delete');
    showConfirmDialog("Do you want to delete this sign?");
  });
}
