let database;  

window.onload = function(){
  initDatabase();
  hideAnimation();
} 

// ===============
// === GENERAL ===
// ===============

function showConfirmDialog(message) {
  if ($(".checkmark").length > 0) {
    convertModalToConfirm();
  }
  $("#modal-text").text(message);
  $("#modal").attr('class', 'modal open fade');
  $("#backdrop").attr('class', 'modal-backdrop fade  in open high');
  $("#modal-content").attr('class', 'modal-dialog fade show in open');
}

function closeModal(){
  $("#modal-content").attr('class', 'modal-dialog fade show in closed');
  $("#backdrop").attr('class', 'modal-backdrop fade  in closed high');
  $("#modal").attr('class', 'modal closed');
  setTimeout(function() {
    $("#backdrop").attr('class', 'modal-backdrop fade  in closed low');
  }, 500);  
}

function closeModalNoBackdrop() {
  $("#modal").attr('class', 'modal closed');
  $("#modal-content").attr('class', 'modal-dialog fade show in closed');
}

function showSuccessDialog(message) {
  // Basically check if the unwanted stuff is here, and if so, call convertModal().
  if ($("#backdrop").length > 0) {
    convertModalToSuccess();  
  }
  $("#modal-text").text(message);
  $("#modal").attr('class', 'modal open fade');
  $("#modal-content").attr('class', 'modal-dialog fade show in open');
  $(".checkmark__circle").attr('class', 'checkmark__circle');
  $(".checkmark").attr('class', 'checkmark');
  $(".checkmark__check").attr('class', 'checkmark__check');
  setTimeout(function(){
    closeModal();
    $(".checkmark__circle").attr('class', 'checkmark__circle wait');
    $(".checkmark").attr('class', 'checkmark wait');
    $(".checkmark__check").attr('class', 'checkmark__check wait');
  }, 3000);
}

function convertModalToSuccess() {
  $("#backdrop").hide();
  $(".alert-actions").eq(0).hide();
  $(".alert-icon").eq(0).html("<i><svg class='checkmark wait' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 52 52'><circle class='checkmark__circle wait' cx='26' cy='26' r='25' fill='none'/><path class='checkmark__check wait' fill='none' d='M14.1 27.2l7.1 7.2 16.7-16.8'/></svg></i>");
}

function convertModalToConfirm() {
  $("#backdrop").show();
  $(".alert-actions").eq(0).show();
  $(".alert-icon").eq(0).html("<i><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='svg alert'><path d='M256 32c30.3 0 59.6 5.9 87.2 17.6 26.7 11.3 50.6 27.4 71.2 48s36.7 44.5 48 71.2c11.7 27.6 17.6 56.9 17.6 87.2s-5.9 59.6-17.6 87.2c-11.3 26.7-27.4 50.6-48 71.2s-44.5 36.7-71.2 48C315.6 474.1 286.3 480 256 480s-59.6-5.9-87.2-17.6c-26.7-11.3-50.6-27.4-71.2-48s-36.7-44.5-48-71.2C37.9 315.6 32 286.3 32 256s5.9-59.6 17.6-87.2c11.3-26.7 27.4-50.6 48-71.2s44.5-36.7 71.2-48C196.4 37.9 225.7 32 256 32m0-32C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0z'></path><circle cx='256' cy='384' r='32'></circle><path d='M256.3 96.3h-.6c-17.5 0-31.7 14.2-31.7 31.7v160c0 17.5 14.2 31.7 31.7 31.7h.6c17.5 0 31.7-14.2 31.7-31.7V128c0-17.5-14.2-31.7-31.7-31.7z'></path></svg></i>");
}


function hideAnimation() {
  document.getElementById("load-screen").style.display = "none";
}

function newTab(url) {
  let tab = window.open(url, '_blank');
  tab.focus();
}

function setURL(url) {
  document.location.href = url;
}

function getPage(){
  return location.pathname.split("/").pop();
}

function getModel() {
  let model = window.location.search.replace("?model=", "");
  model = model.split("%20").join(" ");
  model = model.slice(0, model.indexOf("&"));
  return model;
}

function getID() {
  let id = window.location.search.replace("?id=", "");
  id = id.split("%20").join(" ");
  return id;
}

function getSKU() {
  let sku = window.location.search;
  sku = sku.match(/(\d\d\d\d\d\d\d\d\d\d\d\w)/i)[0];
  return sku;
}

function urlContains(string) {
  return window.location.href.indexOf(string) !== -1
}

function getMonth(date) {
  return date.split("/")[0];  
}

function getDay(date) {
  return date.split("/")[1];  
}

function getYear(date) {
  return date.split("/")[2];  
}

function sortTable(tableID, sortRules) {
  $("#" + tableID).tablesorter(sortRules);
}

function markSold() {
  let icon = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='icon lpanel text-top'><path d='M384 352H148.5c-6.9 0-13-4.4-15.2-10.9l-61.4-175c-1.6-3.7-5.2-6.1-9.2-6.1H48.5c-8.6 0-16-6.6-16.4-15.2-.4-9.2 6.9-16.8 16-16.8h32.8c6.9 0 13 4.4 15.2 10.9l61.4 175c1.6 3.7 5.2 6.1 9.2 6.1h199.6c4.2 0 7.9-2.6 9.4-6.6l27.9-108c2.4-6.5-2.4-13.4-9.4-13.4H176.5c-8.6 0-16-6.6-16.4-15.2-.4-9.2 6.9-16.8 16-16.8h255.6c4 0 8 1.4 11 4.1 5.1 4.6 6.6 11.8 4.2 17.9l-48 160c-2.5 6-8.4 10-14.9 10z'></path><circle cx='192' cy='416' r='32'></circle><circle cx='352' cy='416' r='32'></circle><path d='M192 295.5c-1.1 0-2.3-.3-3.3-.8-3.7-1.9-5.2-6.4-3.4-10.1l32-64c1.9-3.7 6.4-5.2 10.1-3.4 3.7 1.9 5.2 6.4 3.4 10.1l-32 64c-1.4 2.7-4.1 4.2-6.8 4.2zm64 0c-1.1 0-2.3-.3-3.3-.8-3.7-1.9-5.2-6.4-3.4-10.1l32-64c1.9-3.7 6.4-5.2 10.1-3.4 3.7 1.9 5.2 6.4 3.4 10.1l-32 64c-1.4 2.7-4.1 4.2-6.8 4.2zm64 0c-1.1 0-2.3-.3-3.3-.8-3.7-1.9-5.2-6.4-3.4-10.1l32-64c1.9-3.7 6.4-5.2 10.1-3.4 3.7 1.9 5.2 6.4 3.4 10.1l-32 64c-1.4 2.7-4.1 4.2-6.8 4.2z'></path></svg>";
}

function markReady(element) {
  let icon = "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' width='363.025px' height='363.024px' viewBox='0 0 363.025 363.024' style='enable-background:new 0 0 363.025 363.024;' xml:space='preserve'><g><g><g><path d='M181.512,363.024C81.43,363.024,0,281.601,0,181.513C0,81.424,81.43,0,181.512,0     c100.083,0,181.513,81.424,181.513,181.513C363.025,281.601,281.595,363.024,181.512,363.024z M181.512,11.71     C87.88,11.71,11.71,87.886,11.71,181.513s76.17,169.802,169.802,169.802c93.633,0,169.803-76.175,169.803-169.802     S275.145,11.71,181.512,11.71z'></path></g></g><g><polygon style='fill:#030303;' points='147.957,258.935 83.068,194.046 91.348,185.767 147.957,242.375 271.171,119.166     279.451,127.445   '></polygon></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>";  
  
}

// ====================
// ===== FIREBASE =====
// ====================

function initDatabase(){
  const config = {
      apiKey: "AIzaSyAchMHl30dBGYZHfVJR3ch12jFCpReQSdM",
      authDomain: "devicepitstop-imsdb.firebaseapp.com",
      databaseURL: "https://devicepitstop-imsdb.firebaseio.com",
      projectId: "devicepitstop-imsdb",
      storageBucket: "devicepitstop-imsdb.appspot.com",
      messagingSenderId: "658605927128"
    };
  
    const app = firebase.initializeApp(config);
    const settings = {
      timestampsInSnapshots: true  
    };
  database = firebase.firestore();
  database.settings(settings);
}  

function remove(collection, doc) {
  database.collection(collection).doc(doc).delete().then(function() {
    console.log("Document successfully deleted!");
  }).catch(function(error) {
      alert("An error occurred while processing your request. Please try again.");
  });  
}

function removeAll(collection) {
  let docs = getAll(collection);
  setTimeout(function() {
    for (let i = 0; i < docs.length; i++){
      remove(collection, docs[i].sku);
    }
  }, 1000);
}

function save(collection, doc, json) {
  database.collection(collection).doc(doc).set(json)
  .then(function(){
        console.log("Document successfully written!");
        if (getPage().indexOf("storestock") !== -1 && getPage().indexOf("storestock.html") == -1){
          setURL("/IMS/storestock.html");
        }
        else if (getPage().indexOf("returns-tracker") !== -1 && getPage().indexOf("returns-tracker.html") == -1){
          setURL("/IMS/returns-tracker.html");
        }
        else if (getPage().indexOf("buy-sale-tracker") !== -1 && getPage().indexOf("buy-sale-tracker.html") == -1){
          setURL("/IMS/buy-sale-tracker.html");
        }
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
        alert("An error occurred while processing your request. Please try again.");
    });
}

function get(collection, doc) {
    database.collection(collection).doc(doc).get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}

function getWhere(collection, field, operator, expected) {
  let array = [];
  database.collection(collection).where(field, operator, expected).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
          array.push(doc.data())
        });
    })
  return array;
}

function getAll(collection) {
  let array = [];
  database.collection(collection).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        array.push(doc.data());
    });
  });
  return array;
}

function merge(collection, doc, json) {
    database.collection(collection).doc(doc).set(json, { merge: false });
}

function update(collection, doc, json) {
    database.collection(collection).doc(doc).update(json)
      .then(function() {
        console.log("Document successfully updated!");
        if (getPage().indexOf("storestock") !== -1 && getPage().indexOf("storestock.html") == -1){
          setURL("/IMS/storestock.html");
        }
        else if (getPage().indexOf("returns-tracker") !== -1 && getPage().indexOf("returns-tracker.html") == -1){
          setURL("/IMS/returns-tracker.html");
        }
        else if (getPage().indexOf("buy-sale-tracker") !== -1 && getPage().indexOf("buy-sale-tracker.html") == -1){
          setURL("/IMS/buy-sale-tracker.html");
        }
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
}

// ==========================
// ===== FIREBASE STATS =====
// ==========================

function updateBuySaleCount() {
  let buySaleCount = getWhere("buysale", "date", "==", new Date().toLocaleDateString());
  let buyCount = 0;
  let saleCount = 0;
  setTimeout(function() {
    for (let i = 0; i < buySaleCount.length; i++) {
      if (buySaleCount[i].buy) {
        buyCount++;
      }
      else if (buySaleCount[i].sale) {
        saleCount++;
      }
    }
    $("#buys-count").text(buyCount);
    $("#sales-count").text(saleCount);
  }, 1000);
}

function updateStoreStockCount() {
  let storeStockCount = getWhere("devices", "date", "==", new Date().toLocaleDateString());
  setTimeout(function() {
    $("#qoh").text(storeStockCount.length);
  }, 1000);
}

function updateReadyForFloorCount() {
  let readyForFloorCount = getWhere("devices", "date", "==", new Date().toLocaleDateString());
  let count = 0;
  setTimeout(function() {
    for (let i = 0; i < readyForFloorCount.length; i++) {
      if (readyForFloorCount[i].ready) {
        count++;
      }
    }
    $("#rff").text(count);
  }, 1000);
}

function updateReturnCount() {
  let returnCount = getWhere("returns", "date", "==", new Date().toLocaleDateString());
    setTimeout(function() {
    $("#returns-count").text(returnCount.length);
  }, 1000);
}
