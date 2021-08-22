const Stack = require('./Stack.js');
const prompt = require('prompt-sync')();

const backPages = new Stack();
const nextPages = new Stack();

let currentPage = 'Hi, this is the Start Page'

let finish = false;
let showBack = false;
let showNext = false;

const showCurrentPage = (action) => {
   console.log(`\n${action}`);
   console.log(`Current page = ${currentPage}`);
   console.log('Back page = ', backPages.peek())
   console.log('Next page = ', nextPages.peek())
}

const newPage = (page) => {
  backPages.push(currentPage);
  currentPage = page;
  while(!nextPages.isEmpty()) {
    nextPages.pop()
  }
  showCurrentPage("NEW: ")
}

const backPage = () => {
  nextPages.push(currentPage);
  currentPage = backPages.pop();
  showCurrentPage("BACK: ")
}

const nextPage = () => {
  backPages.push(currentPage);
  currentPage = nextPages.pop()
  showCurrentPage("NEXT: ")  
}

showCurrentPage("DEFAULT: ")


const baseInfo = '\nEnter a url';
const backInfo = 'B|b for back page';
const nextInfo = 'N|n for next page';
const quitInfo = 'Q|q for quit';
const question = 'Where would you like to go today?';


while(finish === false){
  let instructions = baseInfo
  if(backPages.peek() != null){
      instructions = `${instructions}, ${backInfo}`;
      showBack = true;
  }
  else {
    showBack = false;
  }

  if(nextPages.peek() != null) {
    instructions = `${instructions}, ${nextInfo}`
    showNext = true;
  }
  else{
    showNext = false;
  }
  instructions = `${instructions}, ${quitInfo}`
  console.log(instructions)
  const answer = prompt(question)
  const lowerCaseAnswer = answer.toLowerCase()

if((lowerCaseAnswer !== 'n') && (lowerCaseAnswer !== 'b') && (lowerCaseAnswer !== 'q')){
  newPage(answer)
}
else if((showNext === true) && (lowerCaseAnswer === 'n')){
   nextPage();
}
else if ((showBack === true) && (lowerCaseAnswer === 'b')){
  backPage();
}

else if (lowerCaseAnswer === 'b') {
  console.log('Cannot go back a page. Stack is empty.');
}
else if (lowerCaseAnswer === 'n') {
  console.log('Cannot go to the next page. Stack is empty')
}

else if (lowerCaseAnswer === 'q'){
  finish = true
}
}