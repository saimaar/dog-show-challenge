document.addEventListener('DOMContentLoaded', () => {

const tableBody = document.querySelector("#table-body")
const editform = document.querySelector("#dog-form")


fetch('http://localhost:3000/dogs')
.then((resp) => {
  return resp.json()
})
.then((dogArray) => {
  renderAllDogs(dogArray)
})

function slapEachDogOnDom(dog){
  const tr = document.createElement("tr")
  const td = document.createElement("td")
  td.innerText = dog.breed
  const td1 = document.createElement("td")
  td1.innerText = dog.name
  const td2 = document.createElement("td")
  td2.innerText = dog.sex
  const td3 = document.createElement("td")
  const editButton = document.createElement("button")
  editButton.innerText = "Edit"
  tr.dataset.id = dog.id
  td3.append(editButton)
  tr.append(td1, td, td2, td3)
  tableBody.append(tr)
  editDog(editButton, dog)

}

  function editDog(editButton, dog){
    editButton.addEventListener("click", (evt) => {
      // debugger
      editform["name"].value = dog.name
      editform.breed.value = dog.breed
      editform.sex.value = dog.sex
      editform.dataset.id = dog.id
    })
  }


  editform.addEventListener("submit", (evt) => {
    evt.preventDefault()
    dogName = evt.target["name"].value
    dogBreed = evt.target["breed"].value
    dogSex = evt.target["sex"].value

   fetch(`http://localhost:3000/dogs/${evt.target.dataset.id}`, {
     method: "PATCH",
     headers: {
       "Content-Type" : "application/json"
     },
     body: JSON.stringify({
      "name": dogName,
      "breed": dogBreed,
      "sex": dogSex
     })

   })
   .then((resp) => {
     return resp.json()
   })
   .then((eachDog) => {
  let editTr = document.querySelector(`tr[data-id="${eachDog.id}"]`)
  editTr.children[0].innerText = eachDog.name
  editTr.children[1].innerText = eachDog.breed
  editTr.children[2].innerText = eachDog.sex
    // debugger
   })




  })




function renderAllDogs(dogArray){
  dogArray.forEach((dog) => {
    slapEachDogOnDom(dog)

  })
}








// <tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>






















})
