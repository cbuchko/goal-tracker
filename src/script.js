class GoalItem {
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
 * Should only be called by other functions.
 * Takes the goal list and generates the goal manager.
 */
// function buildGoalManager(newGoal) {

//     var newListItem = document.createElement("li");
//     newListItem.id = "goal-manager-" + newGoal.name.replace(/\s/g, '-');

//     var accordionButton = document.createElement("button");
//     accordionButton.className = "accordion";

//     var block = document.createElement("div");

//     var accordionHeader = document.createElement("div");
//     accordionHeader.className = "accordion-header";

//     var nameSpace = document.createElement("div");
//     nameSpace.className = "goal-manager-name";

//     var nameInput = document.createElement("input");
//     nameInput.value = newGoal.name;
//     nameInput.disabled = true;

//     nameSpace.appendChild(nameInput);
//     accordionButton.appendChild(nameSpace);

//     var descriptionSpace = document.createElement("div");
//     descriptionSpace.className = "goal-manager-description";

//     var descriptionInput = document.createElement("input");
//     descriptionInput.value = newGoal.description;
//     descriptionInput.disabled = true;

//     descriptionSpace.appendChild(descriptionInput);
//     accordionButton.appendChild(descriptionSpace);

//     var deadlineSpace = document.createElement("div");
//     deadlineSpace.className = "goal-manager-deadline";

//     var deadlineInput = document.createElement("input");
//     deadlineInput.value = newGoal.deadline;
//     deadlineInput.type = "date";
//     deadlineInput.disabled = true;

//     deadlineSpace.appendChild(deadlineInput);
//     accordionButton.appendChild(deadlineSpace);

//     var widgetSpace = document.createElement("div");
//     widgetSpace.className = "goal-manager-widgets";
//     widgetSpace.style = "justify-self: end;";

//     var edit = document.createElement("img");
//     edit.className = "edit-widget"
//     edit.src = "../images/edit.svg";
//     edit.alt = "edit";
//     edit.setAttribute("onclick", "enableGoalEdit(\"" + newGoal.name + "\")");

//     widgetSpace.appendChild(edit);

//     var trashcan = document.createElement("img");
//     trashcan.src = "../images/trashcan.svg";
//     trashcan.alt = "trashcan";
//     trashcan.setAttribute("onclick", "deleteGoal(\"" + newGoal.name + "\")");

//     widgetSpace.appendChild(trashcan);

//     accordionHeader.appendChild(accordionButton);
//     accordionHeader.appendChild(widgetSpace);
//     //block.appendChild(accordionButton);

//     var dropdownPanel = document.createElement("div");
//     dropdownPanel.className = "dropdown-panel";

//     var content = document.createTextNode("hello");
//     var p = document.createElement("p");
//     p.appendChild(content);

//     dropdownPanel.appendChild(p);

//     newListItem.appendChild(accordionHeader);
//     newListItem.appendChild(dropdownPanel)

//     document.getElementById("goal-manager-unordered-list").appendChild(newListItem);
// }

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
 * Enable the input fields for the specific
 * goal so that they are editable.
 */
function enableGoalEdit(goalName) {

    var goalLookup = goalName.replace(/\s/g, '-');
    var listItemBase = "#goal-manager-" + goalLookup;
    var editWidget = document.querySelector(listItemBase + " .edit-widget");

    document.querySelector(listItemBase + " .goal-manager-name input").disabled = false;
    document.querySelector(listItemBase + " .goal-manager-description input").disabled = false;
    document.querySelector(listItemBase + " .goal-manager-deadline input").disabled = false;

    editWidget.src = "../images/checkmark.png";
    editWidget.setAttribute("onClick", "disableGoalEdit(\"" + goalName + "\")");

    
    //document.querySelector(listItemBase + " .accordion").disabled = true;
}

/**
 * Disable the input fields for the specific
 * goal so that they are no longer editable.
 * Any entries in the fields will be the new values
 * for that goal.
 * 
 * TODO: Make it so that editing a goal
 * doesn't reorder it to the bottom. This 
 * doesn't matter if sorting is implemented.
 */
function disableGoalEdit(goalName) {
    var goalLookup = goalName.replace(/\s/g, '-');
    var listItemBase = "#goal-manager-" + goalLookup;
    var editWidget = document.querySelector(listItemBase + " .edit-widget");

    console.log("hi");
    document.querySelector(listItemBase + " .goal-manager-name input").disabled = true;
    document.querySelector(listItemBase + " .goal-manager-description input").disabled = true;
    document.querySelector(listItemBase + " .goal-manager-deadline input").disabled = true;
    console.log(document.querySelector(listItemBase + " .goal-manager-deadline input").disabled);

    var goal = masterListSearch(goalName);
    goal.disabled = true;
    //document.querySelector(listItemBase + " .accordion").disabled = false;

    // var goal_list = getMasterList();
    // var goal = masterListSearch(goalName); 

    // deleteGoalNoReload(goal.name);

    // goal.name = document.querySelector(listItemBase + " .goal-manager-name input").value;
    // goal.description = document.querySelector(listItemBase + " .goal-manager-description input").value;
    // goal.deadline = document.querySelector(listItemBase + " .goal-manager-deadline input").value;

    // editWidget.src = "../images/edit.svg";
    // editWidget.setAttribute("onClick", "enableGoalEdit(\"" + goalName + "\")");

    // console.log(goal);
    // updateMasterList(goal);
}

/** 
 * Remove a goal permanently from the master
 * goal list.
 * @param goalToDelete: Name of the goal to be deleted from the maste list
 */
function deleteGoal(goalToDelete) {

    var goal_list = getMasterList();

    for (var i = goal_list.length - 1; i >= 0; i--) {
        if (goal_list[i].name === goalToDelete) {
            goal_list.splice(i, 1);
        }
    }

    localStorage.setItem("master_list", JSON.stringify(goal_list));
    document.location.reload();
}

/** 
 * Remove a goal permanently from the master
 * goal list. Doesn't refresh page.
 * @param goalToDelete: Name of the goal to be deleted from the maste list
 */
function deleteGoalNoReload(goalToDelete) {

    var goal_list = getMasterList();

    for (var i = goal_list.length - 1; i >= 0; i--) {
        if (goal_list[i].name === goalToDelete) {
            goal_list.splice(i, 1);
        }
    }

    localStorage.setItem("master_list", JSON.stringify(goal_list));
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