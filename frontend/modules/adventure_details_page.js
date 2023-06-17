import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let urlParams = new URLSearchParams(search);
  const adventureId= urlParams.get('adventure')
  console.log(adventureId);


  // Place holder for functionality to work in the Stubs
  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
 try {
  let response = await fetch (`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
  let jsonData = await response.json();
  console.log(jsonData)
  return jsonData;
 }
  catch (error){
    console.log(error);
  return null;
  }
  // Place holder for functionality to work in the Stubs
}


//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
try{
  document.getElementById("adventure-name").textContent=adventure.name;
  document.getElementById("adventure-subtitle").textContent=adventure.subtitle;
  document.getElementById("adventure-content").textContent=adventure.content;

  const image = document.getElementById("photo-gallery");
  const imagedata=adventure.images
  imagedata.forEach(element =>{
    const div= document.createElement("div");
    const img=document.createElement("img");
    img.className="activity-card-image";
    img.src=element;
    div.append(img);
    img.append(div);
  });
}
catch (err){
  return null;
}
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
document.getElementById("photo-gallery").innerHTML=`
<div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel-inner">
  
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Prev</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
  </button>
  </div>`;
  images.map((image,idx)=>{
   let ele=document.createElement("div");
   ele.className=`carousel-item ${idx ===0 ? "active":""}`;
   ele.innerHTML=`
    <img
     src=${image}
     alt=""
     srcset=""
     class="activity-card-image pb-3 pb-md-0"
   />`;
   document.getElementById("carousel-inner").appendChild(ele);
   
  })
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
 document.getElementById("reservation-panel-available").style.display="block"
 document.getElementById("reservation-panel-sold-out").style.display="none";
 document.getElementById("reservation-person-cost").textContent=adventure.costPerHead;
  }else{
    document.getElementById("reservation-panel-available").style.display="none"
    document.getElementById("reservation-panel-sold-out").style.display="block"

  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
document.getElementById("reservation-cost").textContent=adventure.costPerHead*persons
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let formcontainer = document.getElementById("myForm");
  formcontainer.addEventListener('submit',async(e)=>{
    e.preventDefault();
    let formElem = formcontainer.elements ;
    let formData = JSON.stringify({

      name:formElem["name"].value,
      date:formElem["date"].value,
      person:formElem["person"].value,
      adventure:adventure.id,
    })
    let url= config.backendEndpoint+"/reservations/new";
    try{
      let fetchDatsa = await fetch(url,{
        method:"POST",
        body:formData,
        headers:{
          "content-type":"application/json"
        }
      })
      if (fetchDatsa.ok){
        alert("Success!")
        window.location.reload();
      }else{
        alert("Failed!")
      }
    }
    catch(err){
      alert
      ("Error occured")
    }
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
if(adventure.reserved){
  document.getElementById("reserved-banner").style.display="block";
}else{
  document.getElementById("reserved-banner").style.display="none";
}
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
