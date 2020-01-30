"use strict";

class GoalManager extends React.Component {
  constructor() {
    super();
    this.state = {
      goals: JSON.parse(window.localStorage.getItem("master_list"))
    };
  }

  /**
   * Enable the input fields for the specific
   * goal so that they are editable.
   */
  enableGoalEdit(goalName) {
    console.log("You would like to edit: ", goalName);

    // var goalLookup = goalName.replace(/\s/g, "-");
    // var listItemBase = "#goal-manager-" + goalLookup;
    // var editWidget = document.querySelector(listItemBase + " .edit-widget");

    // document.querySelector(
    //   listItemBase + " .goal-manager-name input"
    // ).disabled = false;
    // document.querySelector(
    //   listItemBase + " .goal-manager-description input"
    // ).disabled = false;
    // document.querySelector(
    //   listItemBase + " .goal-manager-deadline input"
    // ).disabled = false;

    // editWidget.src = "../images/checkmark.png";
    // editWidget.setAttribute("onclick", 'disableGoalEdit("' + goalName + '")');

    // document.querySelector(listItemBase + " .accordion").disabled = true;
  }

  /**
   * Remove a goal permanently from the master
   * goal list.
   * @param goalToDelete: Name of the goal to be deleted from the maste list
   */
  deleteGoal(goalToDelete) {
    console.log("You would like to delete: ", goalToDelete.name);
    // var goal_list = getMasterList();
    // for (var i = goal_list.length - 1; i >= 0; i--) {
    //   if (goal_list[i].name === goalToDelete) {
    //     goal_list.splice(i, 1);
    //   }
    // }
    // localStorage.setItem("master_list", JSON.stringify(goal_list));
    // document.location.reload();
  }

  // Function to create goal list element
  buildGoalManager(goal) {
    return (
      <li id={`goal-manager-${goal.name.replace(/\s/g, "-")}`} key={goal.name}>
        <div className="accordion-header">
          <button className="accordion">
            <div className="goal-manager-name">
              <input disabled={true} defaultValue={goal.name}></input>
            </div>
            <div className="goal-manager-description">
              <input disabled={true} defaultValue={goal.description}></input>
            </div>
            <div className="goal-manager-deadline">
              <input
                type="date"
                disabled={true}
                defaultValue={goal.deadline}
              ></input>
            </div>
          </button>
          <div className="goal-manager-widgets" style={{ justifySelf: "end" }}>
            <img
              className="edit-widget"
              src="../images/edit.svg"
              alt="edit"
              onClick={() => this.enableGoalEdit(goal.name)}
            ></img>
            <img
              src="../images/trashcan.svg"
              alt="trashcan"
              onClick={() => this.deleteGoal(goal.name)}
            ></img>
          </div>
        </div>
        <div className="dropdown-panel">
          <p>hello</p>
        </div>
      </li>
    );
  }

  render() {
    return (
      <div>
        {this.state.goals.map(goal => {
          return this.buildGoalManager(goal);
        })}
      </div>
    );
  }
}

let domContainer = document.querySelector("#goal-manager-unordered-list");
ReactDOM.render(<GoalManager />, domContainer);
