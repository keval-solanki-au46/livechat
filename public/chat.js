const socket=io()

let name;

let textarea=document.querySelector('#textarea')
let messagearea=document.querySelector('.message_area')
do{
    name=prompt('please enter your name: ')
}while(!name)

textarea.addEventListener('keyup',(e)=>{

        if(e.key==='Enter'){
            sendMessage(e.target.value)
        }
})
function sendMessage(message){
    let msg ={
        user:name,
        Message:message.trim(),
      }
    appendMessage(msg,'outgoing')
    textarea.value=''
    socket.emit('message',msg)

}
function appendMessage(msg,type){

    let maindiv=document.createElement('div')
    let className=type
    maindiv.classList.add(className,'message')

    let markup=`

        <h4>${msg.user}</h4>
        <p>${msg.Message}</p>    
    `
    maindiv.innerHTML=markup
    messagearea.appendChild(maindiv)
}
socket.on('message',(msg)=>{
   appendMessage(msg,'incoming')
})