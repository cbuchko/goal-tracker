import React, { Component } from "react";
import ReactDOM from "react-dom";

/** 
 * These next two functions are temporarily 
 * relocated here until other work gets been done.
 */
class GoalItem {
  constructor(goal_name, goal_description, goal_deadline) {
      this.name = goal_name
      this.description = goal_description;
      this.deadline = goal_deadline;
  }
}

function updateMasterList(newGoal) {

  if (JSON.parse(window.localStorage.getItem('master_list')) == null) {
      var goal_list = [newGoal];
      localStorage.setItem("master_list", JSON.stringify(goal_list));
  } else {
      var goal_list = JSON.parse(window.localStorage.getItem('master_list'));
      goal_list.push(newGoal);
      localStorage.setItem("master_list", JSON.stringify(goal_list));
  }
}

class GoalListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      name: '',
      description: '',
      deadline: '',
      oldGoal: '',
      goals: JSON.parse(window.localStorage.getItem("master_list"))
    };
    this.updateGoal = this.updateGoal.bind(this);
    this.confirmUpdateGoal = this.confirmUpdateGoal.bind(this);
  }

  /**
   * When a change is made to a goal input,
   * update the state values to match these changes.
   */
  updateGoal(event){
    
    const target = event.target;
    if(target.name === "title"){
      this.state.name = target.value;
    }
    if(target.name === "description"){
      this.state.description = target.value;
    }
    if(target.name === "deadline"){
      this.state.deadline = target.value;
    }
  }

  /**
   * If the current mode is editing,
   * update the goal in the master list for the new inputs.
   * If the current mode is not editing,
   * store the current title so that it can be used later.
   */
  confirmUpdateGoal(){
    if(this.state.isEditing){
      this.deleteGoal(this.state.oldGoal);
      var goal = new GoalItem(this.state.name, this.state.description, this.state.deadline);
      updateMasterList(goal);
    }else{
      this.state.oldGoal = this.state.name;
    }
  }

  /**
   * Remove a goal permanently from the master
   * goal list.
   * @param goalToDelete: Name of the goal to be deleted from the maste list
   */
  deleteGoal(goalToDelete) {
    var goal_list = this.state.goals;
    for (var i = goal_list.length - 1; i >= 0; i--) {
      if (goal_list[i].name === goalToDelete) {
        goal_list.splice(i, 1);
      }
    }
    localStorage.setItem("master_list", JSON.stringify(goal_list));
    document.location.reload();
  }

  // Function to create goal list element
  buildGoalManager(goal) {
    this.state.name = goal.name;
    this.state.description = goal.description;
    this.state.deadline = goal.deadline;

    return (
      <div>
        <div className="accordion-header">
          <button className="accordion">
            <div className="goal-manager-name">
              <input
                name="title"
                disabled={!this.state.isEditing}
                defaultValue={goal.name}
                onChange={this.updateGoal}
              ></input>
            </div>
            <div className="goal-manager-description">
              <input
                name="description"
                disabled={!this.state.isEditing}
                defaultValue={goal.description}
                onChange={this.updateGoal}
              ></input>
            </div>
            <div className="goal-manager-deadline">
              <input
                name="deadline"
                type="date"
                disabled={!this.state.isEditing}
                defaultValue={goal.deadline}
                onChange={this.updateGoal}
              ></input>
            </div>
          </button>
          <div className="goal-manager-widgets" style={{ justifySelf: "end" }}>
            <img
              className="edit-widget"
              src= {this.state.isEditing ? "../images/checkmark.png" : "../images/edit.svg"}
              alt="edit"
              onClick={() => {
                this.confirmUpdateGoal();
                this.setState(state => {               
                  return { isEditing: !state.isEditing };
                })   
              }      
              }
            ></img>
            <img
              src="../images/trashcan.svg"
              alt="trashcan"
              onClick={() => this.deleteGoal(goal.name)}
            ></img>
          </div>
        </div> 
        <div className="dropdown-panel">
          <p> hello </p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <li
        id={`goal-manager-${this.props.goal.name.replace(/\s/g, "-")}`}
        key={this.props.goal.name}
      >
        {this.buildGoalManager(this.props.goal)}
      </li>
    );
  }
}



class GoalManager extends Component {
  constructor() {
    super();
    this.state = {
      goals: JSON.parse(window.localStorage.getItem("master_list"))
    }
  } 

  render() {
    return (
      <div>
        {this.state.goals.map((goal, index) => {
          return <GoalListItem goal={goal} key={index} />;
        })}
      </div>
    );
  }
}

let domContainer = document.querySelector("#goal-manager-unordered-list");
ReactDOM.render(<GoalManager />, domContainer);

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.parentNode.nextElementSibling;
      if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
      } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
      }
  });
}
