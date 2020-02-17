class GoalItem {
    constructor(goal_name, goal_description, goal_deadline) {
        this.name = goal_name
        this.description = goal_description;
        this.deadline = goal_deadline;
    }
}



/**
 * Makes a new goal item from submitted inputs.
 * Creates styling for the item in the checklist.
 */
function makeGoalItem() {
    if (document.getElementById("goal-name").value === "") {
        alert("Name needed!");
        return;
    }

    var nameInput = document.getElementById("goal-name").value;
    var descriptionInput = document.getElementById("goal-description").value;
    var deadlineInput = document.getElementById("goal-deadline").value;

    var newGoal = new GoalItem(nameInput, descriptionInput, deadlineInput);
    
    //make the new goal item appear in the checklist
    //newCheckListItem(newGoal);

    //store goals into local storage
    updateMasterList(newGoal);
    location.reload();
}

function openForm() {
    document.getElementById("input-form").style.opacity = 100;
}

function loadGoalManager() {
    var goal_list = JSON.parse(window.localStorage.getItem('master_list'));
    if (goal_list != null) {
        goal_list.forEach(buildGoalManager);
    }

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
}

/**
 * Functions for easily working with local storage
 * and updating the master list. Takes a new goal to be added
 * to local storage.
 */
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

function getMasterList() {
    return JSON.parse(window.localStorage.getItem('master_list'));
}

function masterListSearch(goalName) {
    var goal_list = getMasterList();

    for(var i = 0; i < goal_list.length ; i++){
        if(goal_list[i].name == goalName){
            return goal_list[i];
        }
    }
}
