// fetch individual data by brand
let count = 0;
let productBucket;

let fetchByBrand = async (brandName) => {
  try {
    let response1 = await fetch(
      `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brandName}`
    );

    let data1 = await response1.json();

    console.log("filtered by Brand:", data1);

    // let buc1 = document.getElementById("bucket-1");
    let buc1 = document.getElementById("productCardContainer");

    buc1.parentNode.removeChild(buc1);

    // let bucket = document.createElement("div");
    // bucket.classList.add("bucket-1");
    // bucket.setAttribute("id", "bucket-1");
    // body.append(bucket);

    let a = document.createElement("div");
    a.classList.add("productCardContainer");
    a.setAttribute("id", "productCardContainer");
    bucket.append(a);

    // bucket.innerText = `<h1 class="white">newly fetched content</h2>`;

    // let h2 = document.createElement("h2");
    // h2.classList.add("white");
    // h2.innerText = ++count;

    // a.append(h2);

    data1.map((val) => {
      let values = `
  
  <div class="img-bucket">
  <img src="${val.image_link}" class="img" alt=${val.name} />
  </div>

 
  <h4>Brand Name: ${val.brand}</h4>
  <h4>Product Name: ${val.name}</h4>
  <h4>Product Price: ${val.price}</h4>
  <h4>Product Image Link: ${val.image_link}</h4>
  <a target="_blank" class="anchor" href=${val.image_link}>Click Here to Goto above Product Image Link page</a>
  <h4>Product Link: ${val.product_link}</h4>
  <a target="_blank" class="anchor" href=${val.product_link}>Click Here to Goto above Product Link page</a>
  <h4>Description: ${val.description}</h4>
  `;

      productBucket = document.createElement("div");
      productBucket.classList.add("product-card");
      productBucket.innerHTML = values;
      // bucket.append(productBucket);
      a.append(productBucket);
    });
  } catch (err) {
    confirm.log("Error Occured:", err);
  }
};

// ############################################# onchange function #############################

let changeHandler = (e) => {
  console.log("change handler function", e.target.value);

  if (e.target.value !== "none") {
    fetchByBrand(e.target.value);
  }
};

// ############################################# end onchange function #############################

// ################################################### START DATA FETCHING LOGIN ##################################

let fetchFunc = async () => {
  try {
    let response = await fetch(
      "http://makeup-api.herokuapp.com/api/v1/products.json"
    );
    let data = await response.json();

    console.log("THE FETCHED DATA=", data);

    let brandsArr = [];

    brandsArr = data.map((val) => {
      return val.brand;
    });

    console.log("brandsArr", brandsArr);

    let distinctBrandsArr = [...new Set(brandsArr)];

    console.log("distinctBrandsArr=", distinctBrandsArr);

    let oriBrands = distinctBrandsArr.filter((val) => {
      return val != null;
    });

    console.log("oriBrands=", oriBrands);

    data.map((val) => {
      let values = `
    
    <div class="img-bucket">
    <img src="${val.image_link}" class="img" alt=${val.name} />
    </div>

   
    <h4>Brand Name: ${val.brand}</h4>
    <h4>Product Name: ${val.name}</h4>
    <h4>Product Price: ${val.price}</h4>
    <h4>Product Image Link: ${val.image_link}</h4>
    <a target="_blank" class="anchor" href=${val.image_link}>Click Here to Goto above Product Image Link page</a>
    <h4>Product Link: ${val.product_link}</h4>
    <a target="_blank" class="anchor" href=${val.product_link}>Click Here to Goto above Product Link page</a>
    <h4>Description: ${val.description}</h4>
    `;

      productBucket = document.createElement("div");
      productBucket.classList.add("product-card");
      productBucket.innerHTML = values;
      // bucket.append(productBucket);
      productContainer.append(productBucket);
    });

    let selectBucket = document.getElementById("select-btn");
    let select1 = document.createElement("select");
    select1.setAttribute("name", "brand");
    select1.setAttribute("id", "brand");
    // select1.onchange = function (e) {
    //   console.log("onchange handler",e.target.value);
    // };

    select1.onchange = changeHandler;

    let op1 = document.createElement("option");
    op1.setAttribute("value", "none");
    op1.innerText = "choose Brand";
    select1.append(op1);

    oriBrands.map((val) => {
      let op = document.createElement("option");
      op.setAttribute("value", val);
      op.innerText = val;
      select1.append(op);
    });
    selectBucket.append(select1);
  } catch (err) {
    console.log("Error Occured:", err);
  }
};

// ################################################### END DATA FETCHING LOGIN ##################################

// ################################################### START DOM CREATION LOGIN ##################################

let body = document.querySelector("body");

let bucket = document.createElement("div");
bucket.classList.add("bucket-1");
bucket.setAttribute("id", "bucket-1");
body.append(bucket);

let title = `
<div><h1 class="title">Makeup API</h1></div>
<div id="select-btn"></div>`;
let titleBucket = document.createElement("div");
titleBucket.classList.add(
  "titleBucket",
  "d-flex",
  "align-items-center",
  "justify-content-between"
);
titleBucket.innerHTML = title;
bucket.append(titleBucket);
let productContainer = document.createElement("div");
productContainer.classList.add("productCardContainer");
productContainer.setAttribute("id", "productCardContainer");
bucket.append(productContainer);
// ################################################### END DOM CREATION LOGIN ##################################

fetchFunc();
