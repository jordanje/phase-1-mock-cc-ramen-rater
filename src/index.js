// write your code here
const ramenMenu = document.getElementById("ramen-menu");

fetch("http://localhost:3000/ramens")
    .then(data => data.json())
    .then(ramen => {

    //set default image to item 1 of ramen array
        if(ramen[0]){
            document.querySelector(".detail-image").src = ramen[0].image;
            document.querySelector(".name").textContent = ramen[0].name;
            document.querySelector(".name").id = ramen[0].id;
            document.querySelector(".restaurant").textContent = ramen[0].restaurant;
            document.querySelector("#rating-display").textContent = ramen[0].rating;
            document.querySelector("#comment-display").textContent = ramen[0].comment;
        }

        ramen.forEach(element => {
            createRamenImages(element)
        });    
    });


function createRamenImages(ramen){
    const ramenImg = document.createElement("img")
    ramenImg.src = ramen.image
    ramenMenu.append(ramenImg)

    ramenImg.addEventListener("click", () => {
        document.querySelector(".detail-image").src = ramen.image;
        document.querySelector(".name").id = ramen.id;
        document.querySelector(".name").textContent = ramen.name;
        document.querySelector(".restaurant").textContent = ramen.restaurant;
        document.querySelector("#rating-display").textContent = ramen.rating;
        document.querySelector("#comment-display").textContent = ramen.comment;
    })
}

function handleNewRamenForm(event){
    //new ramen item from form values
    const newRamenItem = {
        name: event.target.name.value,
        restaurant: event.target.restaurant.value,
        image: event.target.image.value,
        rating: event.target.rating.value,
        comment: event.target["new-comment"].value,
    }

    createRamenImages(newRamenItem)

    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newRamenItem)
    })
    .then(data => data.json())

    //set form inputs back to empty
    event.target.name.value = "";
    event.target.restaurant.value = "";
    event.target.image.value = "";
    event.target.rating.value = "";
    event.target["new-comment"].value = "";
    
}

//form submit events
const formNewRamen = document.getElementById("new-ramen");
const formEditRamen = document.getElementById("edit-ramen");

formNewRamen.addEventListener("submit", (event) => {
    event.preventDefault();
    handleNewRamenForm(event)
})

formEditRamen.addEventListener("submit", (event) => {
    event.preventDefault();
    const newRating = event.target.rating.value;
    const newComment = event.target["new-comment"].value;

    event.target.rating.value = "";
    event.target["new-comment"].value = "";

    const h2Element  = document.getElementsByClassName("name")
    const id = h2Element[0].id



    fetch(`http://localhost:3000/ramens/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            rating: newRating,
            comment: newComment
        })
    })
    .then(data => data.json())

})






