let text = document.querySelector(".text")
let stats = document.querySelector("#stats")
let timer = document.querySelector("#timer")
let input = document.querySelector("#input")

let resetBtn = document.querySelector("#reset")
let startBtn = document.querySelector("#start")

// let sentence = "A quick brown fox jumps over a lazy dog."

let sentence = [
    "Typing quickly requires focus,accuracy and practice",
    "Technology evolves rapidly in the modern era.",
    "To be or not to be, that is the question",
    "A quick brown fox jumps over a lazy dog.",
    "The cost of new laptop is $1,249,99.",
    "She sells seashells by the seashore.",
    "The sun sets in the west.",
    "Cats love to chase small mice."


]


let currentSentence = ""

let startTimer = null
let timeInterval = null;
let correctChars = 0
let totalChars = 0
let finished = false


function reset(){
    clearInterval(timeInterval)
    startTimer = null
    timeInterval = null
    correctChars = 0
    totalChars = 0
    finished = false


    input.value = ""
    input.disabled = true

    stats.textContent = ""
    timer.textContent = ""
    text.textContent = ""

}
reset()


startBtn.addEventListener("click" , function(){
    reset()
    input.disabled = false
    input.focus()
    currentSentence = sentence[Math.floor(Math.random() * sentence.length)]; // Store the sentence
    text.textContent = currentSentence;
    input.setAttribute("maxlength" , currentSentence.length)
    
    timer.textContent = `Time : 0s`
    stats.textContent = `WPM : 0 | Accuracy : 100% | Errors : 0`
// text.textContent = sentence[Math.floor(Math.random()* sentence.length)] 

})


function startTime(){
    if(startTimer)
        return

    startTimer = Date.now()

    timeInterval = setInterval(() => {
        let sec = Math.floor((Date.now() - startTimer)/ 1000)
        timer.textContent = `Time : ${sec}`
    },1000)
}


input.addEventListener("input" , function(){
    if(finished)
        return

    startTime()
    let typed = input.value
    totalChars = typed.length
    correctChars = 0

    for(let i = 0; i < typed.length; i++){
        if(typed[i] === currentSentence[i])
            correctChars++
    }

    const minutes = startTimer ? (Date.now() - startTimer) / 6000 : 0
    const WPM = minutes > 0 ? Math.round((correctChars / 5) / minutes) : 0
    const Error = totalChars - correctChars
    const Accuracy = totalChars > 0 ? (correctChars / totalChars) * 100  : 100

    stats.textContent = `WPM : ${WPM} | Accuracy : ${Accuracy.toFixed(2)}% | Errors : ${Error}`

    if(typed.length === currentSentence.length || typed === currentSentence){
        finishTest()
    }

})


function finishTest(){
    if(finished)
        return
    finished = true
    clearInterval(timeInterval)
    input.disabled = true
    

    const minutes = (Date.now() - startTimer) / 60000
    const Accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100
    const Error = totalChars - correctChars
    const WPM = Math.round((correctChars / 5) / minutes)
    stats.textContent = `WPM : ${WPM} | Accuracy : ${Accuracy.toFixed(2)}% | Errors : ${Error}`


}

resetBtn.addEventListener("click" , function(){
    reset()
})