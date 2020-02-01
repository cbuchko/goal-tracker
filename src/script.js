export class GoalItem {
    constructor(goal_name, goal_description, goal_deadline) {
        this.name = goal_name
        this.description = goal_description;
        this.deadline = goal_deadline;
    }
}

/** 
 * Should only be called by other functions
 * Takes a goal and adds the styling in the checklist
 */
function newCheckListItem(newGoal) {

    var li = document.createElement("li");
    var input = document.createElement("input");
    var nameSpace = document.createElement("p");
    var goal_content = document.createElement("div");
    var goal_info = document.createElement("div");
    var description = document.createElement("span");
    var deadline = document.createElement("span");

    input.type = "checkbox";
    input.name = "goal";
    input.className = "checkbox";
    nameSpace.className = "unordered-checklist-title";
    description.className = "unordered-checklist-description";
    goal_content.className = "unordered-checklist-goal-content";
    goal_info.className = "unordered-checklist-goal-info";
    deadline.className = "unordered-checklist-deadline";

    var t = document.createTextNode(" " + newGoal.name);
    var d = document.createTextNode(newGoal.description);
    var de = document.createTextNode(newGoal.deadline);

    nameSpace.appendChild(t);
    description.appendChild(d);
    deadline.appendChild(de);

    li.appendChild(input);

    goal_content.appendChild(nameSpace);
    goal_info.appendChild(description);
    goal_info.appendChild(deadline);
    goal_content.appendChild(goal_info)
    li.appendChild(goal_content);


    document.getElementById("unordered-checklist").appendChild(li);
    document.getElementById("input-form").style.opacity = 0;

    document.getElementById("goal-name").value = "";
    document.getElementById("goal-description").value = "";
    document.getElementById("goal-deadline").value = "";
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

    if (goal_list != null) {
        goal_list.push(newGoal);
    } else {
        var goal_list = [newGoal];
    }
    //make the new goal item appear in the checklist
    newCheckListItem(newGoal);

    //store goals into local storage
    updateMasterList(newGoal);
}

/** 
 * When the home page is loaded, make sure the checklist
 * contains all of the right goals
 */
function updateChecklist() {
    //get goals from local storage
    var goal_list = JSON.parse(window.localStorage.getItem('master_list'));
    if (goal_list != null) {
        goal_list.forEach(newCheckListItem);
    }
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
export function updateMasterList(newGoal) {

    if (JSON.parse(window.localStorage.getItem('master_list')) == null) {
        var goal_list = [newGoal];
        localStorage.setItem("master_list", JSON.stringify(goal_list));
    } else {
        var goal_list = JSON.parse(window.localStorage.getItem('master_list'));
        if(goal_list.includes(newGoal) )
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
