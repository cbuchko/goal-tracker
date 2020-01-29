"use strict";

class GoalManager extends React.Component {
  constructor() {
    super();
  }

  // Function to create goal list element
  buildGoalManager(goal) {
    return (
      <li id={`goal-manager-${goal.name.replace(/\s/g, '-')}`} key={goal.name}>
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
              onClick={() => enableGoalEdit(goal.name)}
            ></img>
            <img
              src="../images/trashcan.svg"
              alt="trashcan"
              onClick={() => deleteGoal(goal.name)}
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
        {JSON.parse(window.localStorage.getItem("master_list")).map(goal => {
          return this.buildGoalManager(goal);
        })}
      </div>
    );
  }
}

let domContainer = document.querySelector("#goal-manager-unordered-list");
ReactDOM.render(<GoalManager />, domContainer);
