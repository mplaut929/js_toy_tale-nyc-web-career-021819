const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById('toy-collection')
const addToyForm = document.querySelector('.add-toy-form')


let addToy = false

// YOUR CODE HERE

const allToyUrl = 'http://localhost:3000/toys'

fetchToys()


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!

addToyForm.addEventListener('submit', function(e){
  e.preventDefault()
  const newToyName = e.target.querySelector('.input-text').value
  const newToyImage = e.target.querySelector('.input-image').value

  const newToyObj = {name: newToyName, image: newToyImage, likes: 0}

  fetch(allToyUrl, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newToyObj)
  })
  .then(res => res.json())
  .then(function(newToy){
    createToyCard(newToy)

  })

})

toyCollection.addEventListener('click', function(e){
  e.preventDefault()
  if (e.target.matches('.like-btn')){
    const toyID = e.target.parentNode.dataset.id
    let toyLikes = parseInt(e.target.previousElementSibling.innerText)
    let newToyLikes = toyLikes += 1
    fetch(`${allToyUrl}/${toyID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({likes: newToyLikes})

    })
    .then(res => res.json())
    .then(function(){
      fetchToys()
    })
  }


})




function fetchToys(){
  fetch(allToyUrl)
  .then(res => res.json())
  .then(function(toys){
      toyCollection.innerHTML = ""
      toys.forEach(function(toy){
        createToyCard(toy)

      })


  })

}

function createToyCard(toy){
  toyCollection.innerHTML += `
  <div class="card" data-id=${toy.id}>
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>`

}
