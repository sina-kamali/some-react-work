import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";

class App extends Component {
  state = {
    persons: [
      {id:"Ma1", name: "Max", age: 29 },
      {id:"Mu1", name: "Manue", age: 20 },
      {id:"Al1", name: "Alex", age: 18 }
    ],
    showPerson : true
  };

  // switchNameHandler = (newName) => {
  //   this.setState({
  //     persons: [
  //       { name: newName, age: 29 },
  //       { name: "Manu-2", age: 20 },
  //       { name: "Alex-2", age: 18 }
  //     ]
  //   });
  // };

  togglePersonsHandler = () => {
    this.setState({showPerson: !this.state.showPerson});
  }

  nameChangedHandler = (event, personId) => {
    const foundPerson = this.state.persons.findIndex(p => {
      return p.id === personId;
    });

    const person = {
      ...this.state.persons[foundPerson]
    }

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[foundPerson] = person;
    this.setState({persons});
  }

  deletPersonHandler = (personIndex) => {
    // const tmpPersons = this.state.persons.slice();
    const tmpPersons = [...this.state.persons];
    tmpPersons.splice(personIndex, 1);
    this.setState({persons: tmpPersons});

  }

  render() {
    const style = {
      backgroundColor: 'green',
      color:'white',
      fontWeight:'bold',
      font:'iherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
      
    };

    let persons = null;
    if(this.state.showPerson){
      
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person key = {person.id}
            name={person.name}
            age={person.age}
            changed={(event) => this.nameChangedHandler(event,person.id)}
            click={()=> this.deletPersonHandler(index)}
            />
          })}
         
        </div> 
        
      );
      style.backgroundColor = 'red';
      
    }

    const classes = [];
    if(this.state.persons.length <=2) {
      classes.push('red');
    }
    if(this.state.persons.length <= 1){
      classes.push('bold');
    }

    return (
      
        <div className="App">
          <h1>Lets Managing Some Lists At the bottom!</h1>
          <p className={classes.join(' ')}>Our list has {this.state.persons.length} person</p>
          <button style={style} onClick={this.togglePersonsHandler}>Toggle Persons</button>
          {persons}   
        </div>
      
    );
  }
}

export default App;
