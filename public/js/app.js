console.log("Js client side")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const p1 = document.querySelector('#message-1')
const p2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    //Do not refresh the page!
    e.preventDefault()
    p1.textContent = ""
    p2.textContent = ""

    fetch("/weather?address=" + search.value).then((response) => {
        response.json().then(data => {
            if(data.error){
                p1.textContent = error;
            }
            else{
                p1.textContent = data.location
                p2.textContent = data.forecast.summary;
            }
        })
    })
})