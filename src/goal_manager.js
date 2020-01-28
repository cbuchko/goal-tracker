'use strict';

class GoalManager extends React.Component {
  constructor(Goal) {
    super(Goal);
    this.state = { liked: false };
  }

  render() {

    return (
        <li id="goal-manager-my-goal">
            <div class="accordion-header">
                <button class="accordion">
                    <div class="goal-manager-name"><input id="goal-manager-my-goal" type="text" value="My Goal"
                            disabled="true"></input></div>
                    <div class="goal-manager-description"><input id="goal-manager-my-description"
                            value="My description" disabled="true"></input></div>
                    <div class="goal-manager-deadline"><input id="goal-manager-my-deadline" type="date"
                            value="1999-07-31" disabled="true"></input></div>
                </button>
                <div class="goal-manager-widgets" style="justify-self: end;">
                    <img id="goal-manager-edit-my-goal" src="../images/edit.svg" alt="edit goal"
                        onClick="enableGoalEdit()" role="button"></img>
                    <img src="../images/trashcan.svg" alt="trashcan" onClick="deleteGoal()" role="button"></img>
                </div>
            </div>             
            <div class="dropdown-panel">
                <p> hello </p>
            </div>
        </li>
    );
  }
}

let domContainer = document.querySelector('#goal-manager-unordered-list');
ReactDOM.render(<GoalManager />, domContainer);