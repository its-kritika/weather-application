// console.log('Client side javascript file is loaded!')


const weatherForm = document.querySelector('form')
const searchItem = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e) => {
    //set this to prevent browser from refreshing on form submission
    e.preventDefault()

    const location = searchItem.value
    messageOne.textContent = 'Loading...' 
    messageTwo.textContent = '' 
    messageThree.textContent = '' 

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                messageOne.textContent = data.error
            }
            else{
                messageOne.textContent = 'Weather is fetched for '+data.location
                messageTwo.textContent = 'It feels like '+data.forecast.weather+'. It is currently '+data.forecast.temp+' degrees out but feels like '+data.forecast.feel+' degrees.'
                messageThree.textContent = 'The humidity is '+data.forecast.humid+'%.🥵'
            }
        })
    })
})