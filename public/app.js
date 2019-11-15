document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    console.log(app);
    const db = firebase.firestore();

    const recordRef = db.collection('records');

    const query = recordRef.where('plays', '>=', 0);
    query.get()
        .then(records => {
            records.forEach(doc => {
                console.log("got record");
                data = doc.data();
                document.getElementById("recordHeader").innerHTML = `Record: ${data.wins} - ${data.losses}`;
            })
        });

    const pRecordRef = recordRef.doc("playerRecord");
    pRecordRef
        .onSnapshot(function (doc) {
            var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            document.getElementById("recordHeader").innerHTML = `Record: ${doc.data().wins} - ${doc.data().losses}`;
        });
});
function checkSWin(lettersGood) {
    const db = firebase.firestore();
    const recordRef = db.collection("records").doc("playerRecord");
    recordRef.get().then(function(doc){
        if(doc.exists){
            if (y.length == lettersGood) {
                document.getElementById("display4").innerHTML = "you have won congrats, press restart";
                recordRef.update({
                    wins: doc.data().wins + 1
                })
                    .then(function(){
                        console.log("Document successfully updated");
                    })
                    .catch(function (error) {
                        console.error("Error updating document: ", error);
                    });
            }
            if (missed >= 7) {
                document.getElementById("faces").src = faces[7];
                recordRef.update({
                    losses: doc.data().losses + 1
                })
                    .then(function(){
                        console.log("Document successfully updated");
                    })
                    .catch(function (error) {
                        console.error("Error updating document: ", error);
                    });
                document.getElementById("start").style.visibility = 'hidden';
                document.getElementById("setUp").style.visibility = 'hidden';
                document.getElementById("display3").innerHTML = "you have missed " + missed + " letters, that means you lose, the word was " + y;
                alert("you've lost, game over hit restart if you want to play again");
            }
        }
        else{
            console.log("No document found");
        }
    }).catch(function (error) {
        console.log("Error gettting document: ", error);
    });
}
function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    alert("mub1");
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            // document.write(`Hello ${user.displayName}`);
            alert("mub worked");
            console.log(user)
        })
        .catch(console.log)
}
var x;
var y;
var display;
var guessed = "";
var guessedunchecked = "";
var missed = 0;
var games = 0;
var games1 = 0;
var gameslost = 0;
var gameslost1 = 0;
var difficulty;
var warning = 0;
var player = 2;
var mode;
var guess;
var categ;
var xrand;
var faces = [];
var changed = false;
function classic() {
    displayModes();
    faces = ["resources/stage.PNG","resources/stage1.PNG","resources/stage2.PNG","resources/stage3.PNG","resources/stage4.PNG","resources/stage5.PNG","resources/stage6.PNG","resources/stage7.PNG"];
}
function monster() {
    displayModes();
    faces = ["resources/creep.PNG","resources/creep00.PNG","resources/creep1.PNG","resources/creep3.PNG","resources/creep4.PNG","resources/creep5.PNG","resources/creep6.PNG","resources/creep7.PNG"];
}
function zombie() {
    displayModes();
    faces = ["resources/zombie.PNG","resources/zombie1.PNG","resources/zombie2.PNG","resources/zombie3.PNG","resources/zombie4.PNG","resources/zombie5.PNG","resources/zombie6.PNG","resources/zombie7.PNG"];
}
function changeTheme() {
    changed= true;
    document.getElementById("zombie").style.visibility = 'visible';
    document.getElementById("monster").style.visibility = 'visible';
    document.getElementById("classic").style.visibility = 'visible';

}
function displayModes() {
    if (changed==false) {
        document.getElementById("sPlayer").style.visibility = 'visible';
        document.getElementById("2Player").style.visibility = 'visible';     //if this is the first time changing the theme then it will allow you to choose which mode
        document.getElementById("textofstarting").style.visibility = 'hidden';
    }
    document.getElementById("zombie").style.visibility = 'hidden';
    document.getElementById("monster").style.visibility = 'hidden';
    document.getElementById("classic").style.visibility = 'hidden';
}
function singlePlayer() {
    mode = 0;
    document.getElementById("starterText").style.visibility= 'visible';
    document.getElementById("easy").style.visibility= 'visible';
    document.getElementById("medium").style.visibility= 'visible';
    document.getElementById("hard").style.visibility= 'visible';
    document.getElementById("extreme").style.visibility= 'visible';
    document.getElementById("random").style.visibility= 'visible';
    document.getElementById("sPlayer").style.visibility= 'hidden';
    document.getElementById("2Player").style.visibility= 'hidden';
}
function twoPlayer() {
    mode=1;
    DisplayStuff();
}
function easy() {
    difficulty=0;
    DisplayStuff()
}
function medium() {
    difficulty=1;
    DisplayStuff()
}
function hard() {
    difficulty=2;
    DisplayStuff()
}
function extreme() {
    difficulty=3;
    DisplayStuff()
}
function rDiff() {
    difficulty = Math.floor((Math.random()*4));
    DisplayStuff()
}
function setUp() {
    if (mode==0) {
        chooseArray();
        var yrand = Math.floor((Math.random() * 5));
        y = x[yrand];
    }
    else if (mode==1) {
        var cheater1 = true;
        y= prompt("Tell your friend to put a word here, no peaking!");  //instead of choosing a word from the chooseArray() function, this allows the player to input their own word
        cheater1 = checkWord(cheater1);
        if (cheater1 == true) {
            return;
        }
        categ= prompt("what is the category of this word");
    }
    document.getElementById("theme").style.visibility = 'visible';
    document.getElementById("game").style.visibility='visible';
    document.getElementById("restart").style.visibility= 'visible';
    document.getElementById("start").style.visibility= 'visible';
    display = "_" +" ";
    for (i=0;i<y.length - 1;i++) {
        display = display + "_" + " ";    //creates spaces depending on the amount letters in the word
    }
    document.getElementById("display").innerHTML = display;
    document.getElementById("category").innerHTML = "the category is " + categ;
}
function checkWord(cheater1) {
    y = y.toLowerCase();    //turns the 2player word to lower case
    for (p=0;p<y.length;p++) {
        if (y.charCodeAt(p)>=97 && y.charCodeAt(p)<=122) {  //makes sure every single letter is a lower case letter
            cheater1 = false;
        }
    }
    return cheater1;
}
function start() {
    var cheater = false;
    display = "";
    guess = prompt("guess a letter, but don't be dumb");
    guessedunchecked = guessedunchecked + guess;   //this is the unverified string which will be checked
    cheater =checkGuess(cheater,lettersGood);
    if (cheater == true) {
        return;
    }
    guessed = guessed + guess; // this is the string with no cheated letters
    var incorrect = true;
    var lettersGood = 0;
    for (k = 0; k < y.length; k++) {            //this rotates each letter in the to be guess word
        done = false;
        for (L = 0; L < guessed.length; L++) {
            if (guessed.substring(L, L + 1) == y.substring(k, k + 1)) {
                var correct = guessed.substring(L, L + 1);                          //this checks each letter to find a match
                var done = true;
                lettersGood++;
            }
            if (guess == y.substring(k, k + 1)) {         //once a match is found, the person is now correct
                incorrect = false;
            }
        }
        if (done == true) {
            display = display + " " + correct
        }
        else {
            display = display + " " + "_";
        }
    }
    if (incorrect == true) {
        missed++;
        document.getElementById("display3").innerHTML = "you have missed " + missed + " letters, don't hit 7!";
    }
    document.getElementById("faces").src = faces[missed];
    document.getElementById("display").innerHTML = display;
    document.getElementById("display2").innerHTML = "The letters you have guessed are " + guessed;
    if (mode==0) {
        checkSWin(lettersGood)
    }
    else if (mode==1) {
        checkMWin(lettersGood);
    }
}
function checkGuess(cheater,lettersGood) {
    guess = guess.toLowerCase();
    if (guess.charCodeAt(0) >= 97 && guess.charCodeAt(0) <= 122) {
        cheater=false;
    }
    else {
        cheater =  true;
    }
    if (guessedunchecked.length > 0) {
        for (p = 0; p < guessedunchecked.length - 1; p++) {
            if (guess == guessedunchecked.substring(p, p + 1)) {
                //what this does is checks each letter in the string for a duplicate.
                cheater = true
            }
        }
    }
    if (guess.length > 1 && warning >= 1) {
        alert("congrats, you've been exposed for breaking unwritten rules, feel shame");
        missed = missed+7; //this is if the person has already broken the rule of one letter per guess it forces a loss
        document.getElementById("faces").src = faces[7];
    }
    else if (guess.length > 1) {
        warning++;
        alert("do not input more than one letter, this is a warning");
        missed++;
        cheater = true;
    }
    return cheater
}
function checkMWin(lettersGood) {
    if (y.length == lettersGood) {
        document.getElementById("display4").innerHTML = "you have won congrats, press restart";
        if (player % 2 == 0) {
            games++;
        }
        else if (player % 2 == 1) {
            games1++;

        }
        player++;
        document.getElementById("display5").innerHTML = "Player 1 has won " + games + " and lost " + gameslost;
        document.getElementById("display7").innerHTML = "Player 2 has won " + games1 + " and lost" + gameslost1;
    }

    if (missed >= 7) {
        document.getElementById("faces").src = faces[7];
        document.getElementById("start").style.visibility = 'hidden';
        if (player % 2 == 0) {
            gameslost++;
        }
        else if (player % 2 == 1) {
            gameslost1++;
        }
        player++;
        document.getElementById("display3").innerHTML = "you have missed " + missed + " letters, that means you lose, the word was " + y;
        alert("you've lost, game over hit restart if you want to play again");
        document.getElementById("display5").innerHTML = "Player 1 has won " + games + " and lost " + gameslost;
        document.getElementById("display7").innerHTML = "Player 2 has won " + games1 + " and lost " + gameslost1;

    }
}
function restart() {
    missed = 0;
    warning = 0;
    display = "";
    guessed = "";
    guessedunchecked = "";
    document.getElementById("category").innerHTML = "";
    document.getElementById("display").innerHTML = "";
    document.getElementById("display2").innerHTML = "";
    document.getElementById("display3").innerHTML = ""; //This resets all global variables and returns back to original game face but keeps win stat
    document.getElementById("display4").innerHTML = "";
    document.getElementById("faces").src = faces[0];
    document.getElementById("restart").style.visibility = 'hidden';
    document.getElementById("start").style.visibility = 'hidden';
    document.getElementById("setUp").style.visibility = 'hidden';
    document.getElementById("starterText").innerHTML = "Choose a difficulty:";
    document.getElementById("game").innerHTML = "Game Controls(they'll appear after you choose a difficulty)";
    document.getElementById("sPlayer").style.visibility = 'visible';
    document.getElementById("game").style.visibility = 'hidden';
    document.getElementById("2Player").style.visibility = 'visible';
    document.getElementById("easy").style.visibility= 'hidden';
    document.getElementById("medium").style.visibility= 'hidden';
    document.getElementById("hard").style.visibility= 'hidden';
    document.getElementById("extreme").style.visibility= 'hidden';
    document.getElementById("random").style.visibility= 'hidden';
}

function DisplayStuff() {
    document.getElementById("setUp").style.visibility = 'visible';
    document.getElementById("starterText").innerHTML = "Difficulty Settings:";
    document.getElementById("game").style.visibility = 'visible';
    document.getElementById("game").innerHTML = "Game Controls:";
}

function chooseArray() {
    xrand = Math.floor((Math.random() * 3)); // i wanted to change this function to one array but I couldn't understand AJAX in JQuery so i left it as is.
    if (xrand == 0 && difficulty == 0) {
        x = ["cat", "dog", "fish","fox","fly"];
        categ = "animals: scrub edition"
    }
    else if (xrand == 0 && difficulty == 1) {
        x = ["zebra", "tiger", "puppy","sheep","horse"];
        categ = "animals: normal edition"
    }
    else if (xrand == 0 && difficulty == 2) {
        x = ["jaguar", "walrus", "bobcat","rabbit","donkey"];
        categ = "animals: hard edition";
    }
    else if (xrand == 0 && difficulty == 3) {
        x = ["brachiosaurus", "velociraptor", "pterodactyl","ankylosaurus","spinosaurus"];
        categ = "animals: extreme dinosaur edition"
    }
    else if (xrand == 1 && difficulty == 0) {
        x = ["app", "ram", "roms","web","net"];
        categ = "technology: noob edition"
    }
    else if (xrand == 1 && difficulty == 1) {
        x = ["apple", "files", "folder","circuit","monitor"];
        categ = "technology: normal edition"
    }
    else if (xrand == 1 && difficulty == 2) {
        x = ["binary", "bases", "lossy","software","hardware"];
        categ = "technology: hard edition"
    }
    else if (xrand == 1 && difficulty == 3) {
        x = ["hexadecimal", "compression", "lossless", "motherboard","transistor"];
        categ = "technology: extreme edition"
    }
    else if (xrand == 2 && difficulty == 0) {
        x = ["math", "read", "pen","book","gym"];
        categ = "academic/school: scrub edition"
    }
    else if (xrand == 2 && difficulty == 1) {
        x = ["pencil", "class", "grade","teacher","locker"];
        categ = "academic/school: normal edition"
    }
    else if (xrand == 2 && difficulty == 2) {
        x = ["science", "writing", "atlas","english","campus"];
        categ = "academic/school: hard edition"
    }
    else if (xrand == 2 && difficulty == 3) {
        x = ["thesaurus", "dictionary", "assignment", "vocabulary", "encyclopedia"];
        categ = "academic/school: extreme edition"
    }
    return categ;
}