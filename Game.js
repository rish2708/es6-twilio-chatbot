import { Session } from "inspector";

const GameState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    FLAT:  Symbol("flat"),
    WAIT: Symbol("wait"),
    PALACE: Symbol("mansion"),
    UPSTAIR: Symbol("upstair"),
    DOWNSTAIR: Symbol("downstair"),
    SAME: Symbol("same"),
    NEXT: Symbol("next"),
    CLOSE: Symbol("close"),
    END: Symbol("end"),
    RESTART: Symbol("restart")
});

export default class Game{
    constructor(){
        this.stateCur = GameState.WELCOMING;
    }
    
    makeAMove(sInput)
    {
        switch(this.stateStart){
            case GameState.RESTART:    
            let sReply = "Hello! Get ready for a spooky adventure at the Darcula's Palace. So let's beging without any further ado!"+"Are you ready or would like to wait?";
            switch(this.stateCur){
                case GameState.WELCOMING:
                    this.stateCur = GameState.FLAT;
                    break;

                case GameState.FLAT:
                    if(sInput.toLowerCase().match("wait")){
                        sReply = "Don't worry! It won't be that scary. Do you still want to wait or do you want go inside the palace?";
                    }else{
                        sReply ="On the door is a large knocker shaped like a bat's face. As we go in there are three options 1)Go upstairs 2)Stay on the same level 3) Go downstairs into the dark basement (Ends the game quickly). Where do you want to start?";
                        this.stateCur = GameState.PALACE;
                    }
                    break;
            
                case GameState.PALACE:
                    if(sInput.toLowerCase().match("go upstair"||"upstairs"||"upstair"||"go upstairs")){
                        this.stateCur = GameState.UPSTAIR;
                    }
                    else if(sInput.toLowerCase().match("go downstair"||"downstairs"||"downstair"||"go downstairs")){
                        this.stateCur = GameState.DOWNSTAIR;
                    }
                    else{
                        this.stateCur = GameState.SAME;
                    }
                    break;

                case GameState.UPSTAIR:
                    sReply = "While going upstairs using the stairs the squeaking sounds make it more spooky. Once upstairs there are two rooms. Which one to go into first? First or second?"
                    if(sInput.toLowerCase().match("first")){
                        sReply = "As soon as the door opens rats run out, causing you to fall on the floor. You get up and walk in to find out that the room is empty. You walk out and open the door of the next room. This room is full of old furniture covered in white cloths. The walls are full of hideous pictures. We immediately run out and head downstairs. Where next? 1) Basement or 2) ground (ends the game quickly)?"
                        this.stateCur = GameState.PALACE;
                    }
                    else{
                        sReply = "As soon as the door opens rats run out, causing you to fall on the floor. You get up and walk in to find out that the room is empty. You walk out and open the door of the next room. This room is full of old furniture covered in white cloths. The walls are full of hideous pictures. We immediately run out and head downstairs. Where next? 1) Basement or 2) ground (ends the game quickly)?"
                        this.stateCur = GameState.PALACE;
                    }
                    break;

                case GameState.SAME:
                    sReply = "There are three rooms. Where to first? 1) Living room. 2) Kitchen. 3) Guest room."
                    if(sInput.toLowerCase().match("living room"||"living")){
                        sReply = "The living room is just as luxurious as any other palace. Crystal Chandiliers, sitting area full of furniture. This room doesn't look like a haunted house living room. Now we go to the kitchen. There is a delicious smell coming from the kitchen. Seems as if someone is cooking something delicious. We enter carefully seeing no one, we go in. Someone has something cooking inside the oven. Being scared we rush out and go to the Guest room. But the door is locked. We rush out. Where to now? 1) Upstairs. 2) Downstairs (ends the game quickly)"
                        this.stateCur = GameState.PALACE;
                    }
                    else if(sInput.toLowerCase().match("kitchen")){
                        sReply = "We go to the kitchen. There is a delicious smell coming from the kitchen. Seems as if someone is cooking something delicious. We enter carefully seeing no one, we go in. Someone has something cooking inside the oven. Being scared we rush out and go to the Guest room. But the door is locked. We rush out. The living room is just as luxurious as any other palace. Crystal Chandiliers, sitting area full of furniture. This room doesn't look like a haunted house living room. Where to now? 1) Upstairs. 2) Downstairs (ends the game quickly)"
                        this.stateCur = GameState.PALACE;
                    }
                    else if(sInput.toLowerCase().match("guest room"||"")){
                        sReply = "We go to the Guest room. But the door is locked. We rush out. We go to the kitchen. There is a delicious smell coming from the kitchen. Seems as if someone is cooking something delicious. We enter carefully seeing no one, we go in. Someone has something cooking inside the oven. Being scared we rush out and go to the living room. It is just as luxurious as any other palace. Crystal Chandiliers, sitting area full of furniture. This room doesn't look like a haunted house living room. Where to now? 1) Upstairs. 2) Downstairs (ends the game quickly)"
                        this.stateCur = GameState.PALACE;
                    }
                    break;

                case GameState.DOWNSTAIR:
                    sReply = "It is a dark basement. We slowly move around. Exploring the spooky basement. When we look up the whole ceiling is filled with bats. Keeping the cool we keep on moving. Suddenly at one end we spot a coffin. Do we proceed or run?"
                    if(sInput.toLowerCase().match("run")){
                        sReply = "We run upstairs and rush out the house immediately without looking back."
                        this.stateCur = GameState.END;
                    }
                    else{
                        sReply = "We move ahead towards the coffin. As we approach it we notice that the coffin is closed. Do we open it? Yes/No?"
                        if(sInput.toLowerCase().match("yes")){
                            sReply = "We slowly open it. We are scared but still do it. As we open it.................................. It is empty!! And suddenly someone keeps a hand on your back at that very moment. The person speaks, 'Looking for me?' Being scared we don't bother to look and just run away."
                            this.stateCur = GameState.END;
                        }
                        else{
                            sReply = "We look at each other. At that very moment someone keeps a hand on your back. The person speaks, 'Looking for me?' Being scared we don't bother to look and just run away."
                            this.stateCur = GameState.END;
                        }
                    }
                    break;
                    
                case GameState.END:
                    sReply = "Oh Man! That was one heck of an adventure! Do you want to end it here? Yes or no?"
                    if(sInput.toLowerCase().match("yes")){
                        sReply = "It was fun! Have a great day! See you another time! Bye!"
                        this.stateCur = GameState.CLOSE;
                    }
                    else{
                        sReply = "This will restart the game. Are you sure you want to play again? Yes or No?"
                        if(sInput.toLowerCase().match("yes")){
                            this.stateStart = GameState.RESTART;
                        }
                        else{
                            sReply = "It was fun! Have a great day! See you another time! Bye!"
                            this.stateCur = GameState.CLOSE;
                        }
                    }
                    break;
                    
                case GameState.CLOSE:
                    
                }
            break;
        }
    }
}
