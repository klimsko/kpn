// RANDOM function ------------------------
function rand(min, max) {
  var argc = arguments.length
  if (argc === 0) {
    min = 1
    max = 2147483647
  } else if (argc === 1) {
    throw new Error('Warning: rand() expects exactly 2 parameters, 1 given')
  }
  return Math.floor(Math.random() * (max - min + 1)) + min

}

window.onload = function() {

// ----------- MODAL ------------------
$('#myModal').modal({
  backdrop: 'static',
  keyboard: false,
  show: true
});

var noName = ['Enter your name!', 'Are you jocking?', 'Enter your kurwa name!'];

$('#myModal').on('shown.bs.modal', function () {
  $('#userName').focus()
})

var userName;
var click = 0;

$('#myModal').unbind("keyup").keyup(function(e){ 
    var code = e.which; // recommended to use e.which, it's normalized across browsers
    if(code==13)
    {
        $('.save').click();
    }
});

$('.save').click(function () {
  userName = $('#userName').val();
  if (userName == ""){
    userName = 0;
    $('.test').empty();
    $('.test').append('<br>'+'<blockquote>'+'<p>'+noName[click]+'</p>'+'</blockquote>');
    click++;
    if (click == noName.length){
      click = 0;
    }
  } else {
    $('#myModal').modal('hide');
    $('.myChoice h4').append(userName+'!');
    console.log(userName);
  }
});
$('.ok').click(function (){
  $('#myModal2').modal('hide');
  reset();
})
// ----------- MODAL END ------------------

// ----------- Choice function ------------------
function keypress(){
    switch (myChoice){
      case 1: 
        $('.left-side').html('<button class="btn btn-primary stone-1 btn-lg">Kamień</button>')
        break;
      case 2:
        $('.left-side').html('<button class="btn btn-primary scissors-1 btn-lg">Nożyce</button>')
        break;
      case 3:
        $('.left-side').html('<button class="btn btn-primary papier-1 btn-lg">Papier</button>')   
    }
  }

var myChoice = 0;
$('.myChoice .btn').on('click', function(){
  myChoice = $(this).text();
  
  switch (myChoice){
    case 'Kamień': myChoice = 1
      break;
    case 'Nożyce': myChoice = 2
      break;
    default: myChoice = 3
  }
  
  keypress();
})
// ----------- Choice function END------------------

// ----------- AI make choice function ------------------
function aiCleverChoise2(){
  if (win){
    if (aiIndex === 1){
      aiIndex = 2;
    }
    if (aiIndex === 2){
      aiIndex = 3;
    }
    if (aiIndex === 3){
      aiIndex = 1;
    }
  }
  else {
    if (aiIndex === 1){
      aiIndex = 3;
    }
    if (aiIndex === 2){
      aiIndex = 1;
    }
    if (aiIndex === 3){
      aiIndex = 2;
    }
  }
}
function aiCleverChoise(){
  console.log('myChoice = '+myChoice);
    if (aiIndex === myChoice){
      aiIndex = rand(1, 3);
      console.log('RANDOM');
    }
    else if (aiIndex === 1){
      aiIndex = 2;
      console.log('aiCleverChoise I if = '+aiIndex);
    }
    else if (aiIndex === 2){
      aiIndex = 3;
      console.log('aiCleverChoise II if = '+aiIndex);
    }
    else if (aiIndex === 3){
      aiIndex = 1;
      console.log('aiCleverChoise III if = '+aiIndex);
    }
  aiButton();
}
function aiButton(){
  switch (aiIndex){
      case 1: 
        $('.right-side').html('<button class="btn btn-danger stone-1 btn-lg">Kamień</button>')
        break;
      case 2:
        $('.right-side').html('<button class="btn btn-danger scissors-1 btn-lg">Nożyce</button>')
        break;
      case 3:
        $('.right-side').html('<button class="btn btn-danger papier-1 btn-lg">Papier</button>')   
    }
}

var aiIndex = 0;
var execOnes = 0;
function aiChoice(){
  if (myChoice !== 0){
    execOnes = 1;
    aiIndex = rand(1, 3);
    console.log(aiIndex);
    aiButton();
  }
}
// ----------- AI make choice function END------------------

// ----------- Compare choices function ------------------
var win;
function compare(){
  if (myChoice === 1 && aiIndex === 2){
    $('.log').prepend('<p>'+'--> Wygrałeś rundę '+runda+'!'+'</p>');
    aihealthChange();
    win = false;
  }
  else if (myChoice === 1 && aiIndex === 3){
    $('.log').prepend('<p>'+'--> Przegrałeś rundę '+runda+'!'+'</p>');
    myhealthChange();
    win = true;
  }
  else if (myChoice === 2 && aiIndex === 1){
    $('.log').prepend('<p>'+'--> Przegrałeś rundę '+runda+'!'+'</p>');
    myhealthChange();
    win = true;
  }
  else if (myChoice === 2 && aiIndex === 3){
    $('.log').prepend('<p>'+'--> Wygrałeś rundę '+runda+'!'+'</p>');
    aihealthChange();
    win = false;
  }
  else if (myChoice === 3 && aiIndex === 1){
    $('.log').prepend('<p>'+'--> Wygrałeś rundę '+runda+'!'+'</p>');
    aihealthChange();
    win = false;
  }
  else if (myChoice === 3 && aiIndex === 2){
    $('.log').prepend('<p>'+'--> Przegrałeś rundę '+runda+'!'+'</p>');
    myhealthChange();
    win = true;
  }
  else if (myChoice === aiIndex && myChoice !== 0){
    $('.log').prepend('<p>'+'--> Remis'+'</p>');
    myhealthChange();
  }
  else {
    $('.log').prepend('<p>'+'--> MUSISZ WYBRAĆ BROŃ! Naciśnij '+
                                '<kbd>'+'K'+'</kbd>'+' - Kamień '+'LUB '+
                                '<kbd>'+'P'+'</kbd>'+' - Papier '+'LUB '+
                                '<kbd>'+'N'+'</kbd>'+' - Nożyce '+'a następnie '+
                                '<kbd>'+'SPACE'+'</kbd>'+' - przycisk START'+'</p>');
  }
}
// ----------- Compare choices function END------------------

// ----------- Click START button function ------------------
$('.start').on('click', function(){
  
  round();
  if (execOnes === 0){
    aiChoice();
    console.log('aiIndex if = '+aiIndex);
  } else {
    aiCleverChoise();
    console.log('aiIndex else = '+aiIndex);
  }
  compare();
  gameOver();

})
// ----------- Click START button function END------------------


$(document).unbind("keyup").keyup(function(e){ 
    var code = e.which; // recommended to use e.which, it's normalized across browsers
    if(code==32)
    {
        $('.start').click();
    }
    if(code==75) // Kamień
    {
      myChoice = 1;
      keypress();
    }
    if(code==78) // Nożyce
    {
      myChoice = 2;
      keypress();
    }
    if(code==80) // Papier
    {
      myChoice = 3;
      keypress();
    }
});

// ----------- Next ROUND function ------------------
var runda = 0;
function round(){
  if (myChoice !== 0){
    runda++;
    $('.round').empty();
    $('.round').append('RUNDA '+runda);
  }
}
// ----------- Next ROUND function END------------------

// ----------- Live progress bar -------------------------
var myHealth = 100;
var aiHealth = 100;

function myhealthChange(){
  myHealth = myHealth - 10;
  $(".progress-live").css("width", myHealth + "%").text(myHealth + " %");
}
function aihealthChange(){
  aiHealth = aiHealth - 10;
  $(".progress-ailive").css("width", aiHealth + "%").text(aiHealth + " %");
}
// ----------- Live progress bar END-------------------------

function gameOver(){

  if (aiHealth <= 0) {
    $('#myModal2').modal({
      backdrop: 'static',
      keyboard: false,
      show: true
    });
    $('.finish').html('<p>'+'<b>'+'Wygrałeś!!!'+'</b>'+'</p>');
  }
  else if (myHealth <= 0){
    $('#myModal2').modal({
      backdrop: 'static',
      keyboard: false,
      show: true
    });
    $('.finish').html('<p>'+'<b>'+'Przegrałeś ;)'+'</b>'+'</p>')
  }

}

function reset(){
  myHealth = 100;
  aiHealth = 100;
  $(".progress-live").css("width", myHealth + "%").text(myHealth + " %");
  $(".progress-ailive").css("width", aiHealth + "%").text(aiHealth + " %");
  $('.log').empty();
  $('.left-side').empty();
  $('.right-side').empty();
}

}