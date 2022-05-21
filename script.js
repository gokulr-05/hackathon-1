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
      console.log(
        "#########################################################################################"
      );
      console.log("brand=", val.brand);
      console.log("name=", val.name);
      console.log("price=", val.price);
      console.log("image_link=", val.image_link);
      console.log("product_link=", val.product_link);
      console.log("description=", val.description);
      console.log(
        "#########################################################################################"
      );

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

      let productBucket = document.createElement("div");
      productBucket.classList.add("product-card");
      productBucket.innerHTML = values;
      bucket.append(productBucket);
    });

    let selectBucket = document.getElementById("select-btn");
    let select1 = document.createElement("select");
    select1.setAttribute("name", "brand");
    select1.setAttribute("id", "brand");

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

// ################################################### END DOM CREATION LOGIN ##################################

fetchFunc();
