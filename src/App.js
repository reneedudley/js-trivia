import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import obj from './obj.png';
import arr from './arr.png';

class App extends Component {
  state = {
     teams: [],
     teamInput: '',
     currentTeam: 0,
     categories:{
          'git': [{id: 1, text: 'what is the command to switch to gh-pages', shown: false, team: null, value: 100},
              {id: 2, text: 'what is the commit to create a new branch called pigLatin', shown: false, team: null, value: 200},
              {id: 3, text: 'what is the command to switch to the previous branch', shown: false, team: null, value: 200},
              {id: 4, text: 'what is the command to delete a branch named oops', shown: false, team: null, value: 300},
              {id: 5, text: 'what is the command sequence to push a changed file ticTacToe.js', shown: false, team: null, value: 300},
              {id: 6, text: 'what are the commands to undo the last commit, checkout an unwanted change on test.js, add the remaining files, make a new commit and push', shown: false, team: null, value: 500},
          ],
          'objects':[
              {id: 7, text: 'how would you access the body property?', shown: false, team: null, value: 100},
              {id: 8, text: 'how would you change the title property value to "dolphins"', shown: false, team: null, value: 100},
              {id: 9, text: `add a new property to exampleObj called date with today's date`, shown: false, team: null, value: 200},
              {id: 10, text: `how would you access the type_id property?`, shown: false, team: null, value: 200},
              {id: 11, text: `how would you create  an array with all of the keys in exampleObj?`, shown: false, team: null, value: 300},
              {id: 12, text: `how woudld you delete the name key from exampleObj?`, shown: false, team: null, value: 400},
          ],
          'arrays': [
              {id: 13, text: 'how would you access the third item in example arr', shown: false, team: null, value: 100},
              {id: 14, text: `how would you set the 4th item in example Arr to be 'nathan'`, shown: false, team: null, value: 100},
              {id: 15, text: `how would you remove the last item of exampleArr and save it to a variable named deletedName?`, shown: false, team: null, value: 200},
              {id: 16, text: `how would you add the name 'Molly' to example array `, shown: false, team: null, value: 200},
              {id: 17, text: `name 2 immutable array methods`, shown: false, team: null, value: 300},
              {id: 18, text: `name 2 mutable array methods`, shown: false, team: null, value: 300},
              {id: 19, text: `loop through exampleArr and console log each of the names`, shown: false, team: null, value: 300},
              {id: 20, text: `loop through the authorizedUsers array and console log the user name `, shown: false, team: null, value: 400},
          ],
          'functions & conditionals': [
              {id: 21, text: 'write a one line function called sumOfTwo numbers that takes two arguments and returns the sum', shown: false, team: null, value: 200},
              {id: 21, text: 'write a one line function that determines if two arguments evaluate to true', shown: false, team: null, value: 200},
              {id: 21, text: 'write a function that accepts a string and returns whether or not there are vowels in the string', shown: false, team: null, value: 300},
              {id: 21, text: 'write a function that accepts a string and returns whether or not there are vowels in the string', shown: false, team: null, value: 400},
              {id: 21, text: 'write a function that takes in an object, loops through every key/value pair and console.logs both the key & value', shown: false, team: null, value: 500},
              {id: 21, text: `write a function that accepts a number and if there is a decimal point, returns the number with the decimal point one space to the left. If there's not, then adds .00 to the end`, shown: false, team: null, value: 600},
          ],
     },
     selectedQuestion: null,
     exampleObj: {
         userId: 1,
         id: 1,
         title: "sunt aut facere repellat provident",
         body: "quia et suscipit suscipit recusandae",
         user: {
             type: {type_id: 7, title: 'view'},
             name: 'Bob'
         }
     },
     exampleArr: ['Andy', 'Renee', 'Tom', 'Lyndsey', 'Todd'],
     authorizedUsers: [
         {id: 1, name: 'sara'},
         {id: 2, name: 'jade'},
         {id: 3, name: 'mike'},
         {id: 4, name: 'jody'},
         {id: 6, name: 'chris'},
     ],
     show: null,
  };

  handleSubmit(e){
    e.preventDefault();
    const {teams, teamInput} = this.state;
    const newTeams = teams.map(team => team);
    newTeams.push(teamInput);
    this.setState({teams: newTeams, teamInput: ''});
  };

  renderQuestions(questions, category){
      const {teams} = this.state;
      return questions.map((question, key) => {
        const team = question.team || question.team ==0 ?`${teams[question.team]}: ${question.value}` : question.value;

        const background = question.team || question.team ==0  ? '#068b7f' : '#6a6a8d';

        return (
            <div
                key={key}
                onClick={()=> this.onQuestionClick(question, category)}
                style={{background: background, color: 'white', width: '100px', marginBottom:'10px'}}
            >
                <p>{team}</p>
            </div>
        )
      })
  };
  makeCopyOfCategories(){
      const {categories} = this.state;
      return  Object.keys(categories).reduce((acc, key) => {
          acc[key] =  categories[key].map(arr => arr);
          return acc
      },{});
  }
  onQuestionClick=(question, category)=>{
      const newCategories = this.makeCopyOfCategories();
      const selectedQuestionIndex = newCategories[category].findIndex(obj => obj.id == question.id);
      question['shown'] = true;
      newCategories[category][selectedQuestionIndex] = question;
      this.setState({categories: newCategories, selectedQuestion: {index: selectedQuestionIndex, question, category}})
  };

  renderCategories() {
     const {categories, selectedQuestion, teams} =this.state;
     if (selectedQuestion) {
         return this.renderCurrentQuestion()
     }
     return Object.keys(categories).map((key) => {
         return (
             <div key={key} style={{display: 'flex', flexDirection: 'column', marginRight: '20px'}}>
                 <h5>{key}</h5>
                 {this.renderQuestions(categories[key], key)}
             </div>
         )
     })
  }
  renderCurrentTeam(){
      const {teams, currentTeam} = this.state;
      if (teams.length == 0) return null;
      const team = teams[currentTeam];
      if (team) {
          return <h3>It's {team}'s turn</h3>
      }
  }
  renderCurrentQuestion(){
      const {selectedQuestion, teams} = this.state;
      const backButton = <button onClick={()=> this.setState({selectedQuestion: null})}>Back</button>;
          if (selectedQuestion.question.team || selectedQuestion.question.team ==0){
              return (
                  <div>
                      <h3>Question: {selectedQuestion.question.text}</h3>
                      <h3>Answered by: {teams[selectedQuestion.question.team]}</h3>
                      {backButton}
                  </div>
              )
          }

          const objImage = selectedQuestion.category == 'objects' && <img  style={{margin: 10}} src={obj} />;
          const arrImage = selectedQuestion.category == 'arrays' && <img style={{margin: 10}} src={arr} />;

          return (
              <div>
                  {arrImage}
                  {objImage}
                  <h3>Question: {selectedQuestion.question.text}</h3>
                  {backButton}
                  <div style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
                    <select onChange={(e) => {
                        this.setState({selectedTeam: Number(e.target.value)})
                    }}>
                        <option value={null}>Choose Team</option>
                        {teams.map((team, key) => {
                            return <option key={key} value={key}>{team}</option>
                        })}
                    </select>
                    <button onClick={() => this.handleQuestionAnswer()}>Submit team point</button>

                  </div>
              </div>
          )

  }
  handleQuestionAnswer(){
      const {selectedQuestion, selectedTeam, teams} = this.state;
      if (selectedTeam || selectedTeam == 0){
         const newCategories = this.makeCopyOfCategories();
         const question = selectedQuestion.question;
         question.team = selectedTeam;
         newCategories[selectedQuestion.category][selectedQuestion.index] = question;
         const nextTeamIndex = teams.length - 1 == selectedTeam ? 0 : selectedTeam + 1;
         this.setState({categories: newCategories, selectedQuestion: null, selectedTeam: null, currentTeam: nextTeamIndex})
      }
  }
  renderTeams(){
      const {teams, categories} =this.state;
      return teams.map((team, key) => {
          const points = Object.keys(categories).reduce((acc, category)=>{
              categories[category].forEach(question => {
                  if (question.team == key){
                      acc += question.value;
                  }
              });
              return acc;
          },0);
          return <p key={key}>{team}-{points} points</p>
      })
  }
  gameOver(){
      const {categories} = this.state;
      const gameHasEnded = Object.keys(categories).reduce((acc, key)=>{
          const category = categories[key];
          category.forEach(obj =>{
              if (obj.team != 0 && !obj.team){
                  acc = false;
              }
          });
          return acc;
      },true)
      // console.log(gameHasEnded)
  }
  render() {
    // console.log(this.gameOver())
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Javascript Trivia!</h1>
            {this.renderCurrentTeam()}
        </header>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <div style={{display: 'flex', flex: '1 1 auto', justifyContent: 'space-around'}}>
                {this.renderCategories()}
            </div>
            <form onSubmit={(e)=> this.handleSubmit(e)}>
                <input
                    placeholder="Enter a team name"
                    onChange={(e)=> this.setState({teamInput: e.target.value})}
                    value={this.state.teamInput}
                />
                <button type="submit">Submit</button>
                <div>
                    <h3>Teams</h3>
                    {this.renderTeams()}
                </div>
            </form>
        </div>
      </div>
    );
  }
}
const exampleArr = ['Andy', 'Renee', 'Tom', 'Lyndsey', 'Todd'];

const exampleObj = {
    userId: 1,
    id: 1,
    title: "sunt aut facere repellat provident",
    body: "quia et suscipit suscipit recusandae",
    user: {
        type: {type_id: 7, title: 'view'},
        name: 'Bob'
    }
};


export default App;




