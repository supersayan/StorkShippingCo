import Phaser from "phaser";
import questionBank from "./QuizQuestions"
// import questionsStairs  from "./QuizQuestions";
// import questionsWindow  from "./QuizQuestions";
// import questionsWater  from "./QuizQuestions";
// import questionsBaby  from "./QuizQuestions";
// import questionsFurniture  from "./QuizQuestions";
// import questionsBed  from "./QuizQuestions";

// in progress
let questionsExample1 = {
    questionText: `What is 2+2?`,
    responses: [`1`, `2`, `3`, `4`],
    correct: 3,
    rationaleCorrect: `Two plus two is four.`,
    rationaleIncorrect: `Incorrect`
}
let questionsExample2 = {
    questionText: `What is 1x1?`,
    responses: [`1`, `4`, `9`, `16`],
    correct: 0,
    rationaleCorrect: `One times one is one.`,
    rationaleIncorrect: `Incorrect`
}
let questionsExample = [
    questionsExample1,
    questionsExample2
];

// keeps track of which questions you're on for each category to avoid repeats
let counter = [0,0,0,0,0,0]

class QuizScene extends Phaser.Scene {
    constructor() {
        super({ key: "quizScene" });
    }

    init(data) {
        console.log("init "+ data.id)
        this.gateID = data.id
    }

    preload() {
        this.load.image("background", "../assets/menu.jpg");
    }

    create() {
        console.log(this.gateID)
        //including an example q for now until data can be passed between scenes
        let question
        console.log(question)

        //pass in an int indicating which hazard was selected
        switch(this.gateID) {
            case 0:
                question = questionBank[0][counter[0]];
                counter[0]++;
                console.log(0.01)
                console.log(question)
                break;
            case 1:
                question = questionBank[1][counter[1]];
                counter[1]++;
                console.log(11)
                break;
            case 2:
                question = questionBank[2][counter[2]];
                counter[2]++;
                console.log(22)
                console.log(question)
                break;
            case 3:
                question = questionBank[3][counter[3]];
                counter[3]++;
                console.log(33)
                break;
            case 4:
                question = questionBank[4][counter[4]];
                counter[4]++;
                break;
            case 5:
                question = questionBank[5][counter[5]];
                counter[5]++;
                break;
        }

        let cam = this.cameras.add(0, 0, 800, 600);
        cam.setBackgroundColor(0x7AD7F0);
        const fontFam = {
            fontSize: 20,
            color: "#000000",
            backgroundColor: "#FFFFFF",
        };

        let bg = this.add.sprite(0, 0, "background");
        bg.setOrigin(400, 300);

        console.log(question)
        let title = this.add.text(0, 0, `${question.questionText}`,
         { ...fontFam, wordWrap: {width: 820} });
        
        for(let i = 0; i < question.responses.length; i++) {
            let choice;
            if(i == question.correct) {
                choice = this.add.text(0, 150 + 100 * i, question.responses[i],
                     {...fontFam, wordWrap: {width: 820}})
                choice.setInteractive();
                choice.on('pointerdown', () =>
                    this.correctResponse(question)
                );
            } else {
                choice = this.add.text(0, 150 + 100 * i, question.responses[i], {...fontFam, wordWrap: {width: 820}})
                choice.setInteractive();
                choice.on('pointerdown', function() {
                    alert(`Try again! ${question.rationaleIncorrect}`);
                });
            }
        }
    }

    correctResponse(question) {
        //alert(`Correct choice, Good job! ${question.rationaleCorrect}`);
        this.scene.switch("gameScene")
    }
}

export default QuizScene;
