'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GoalManager = function (_React$Component) {
    _inherits(GoalManager, _React$Component);

    function GoalManager(Goal) {
        _classCallCheck(this, GoalManager);

        var _this = _possibleConstructorReturn(this, (GoalManager.__proto__ || Object.getPrototypeOf(GoalManager)).call(this, Goal));

        _this.state = { liked: false };
        return _this;
    }

    _createClass(GoalManager, [{
        key: "render",
        value: function render() {

            return React.createElement(
                "li",
                { id: "goal-manager-my-goal" },
                React.createElement(
                    "div",
                    { "class": "accordion-header" },
                    React.createElement(
                        "button",
                        { "class": "accordion" },
                        React.createElement(
                            "div",
                            { "class": "goal-manager-name" },
                            React.createElement("input", { id: "goal-manager-my-goal", type: "text", value: "My Goal",
                                disabled: "true" })
                        ),
                        React.createElement(
                            "div",
                            { "class": "goal-manager-description" },
                            React.createElement("input", { id: "goal-manager-my-description",
                                value: "My description", disabled: "true" })
                        ),
                        React.createElement(
                            "div",
                            { "class": "goal-manager-deadline" },
                            React.createElement("input", { id: "goal-manager-my-deadline", type: "date",
                                value: "1999-07-31", disabled: "true" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { "class": "goal-manager-widgets", style: "justify-self: end;" },
                        React.createElement("img", { id: "goal-manager-edit-my-goal", src: "../images/edit.svg", alt: "edit goal",
                            onClick: "enableGoalEdit()", role: "button" }),
                        React.createElement("img", { src: "../images/trashcan.svg", alt: "trashcan", onClick: "deleteGoal()", role: "button" })
                    )
                ),
                React.createElement(
                    "div",
                    { "class": "dropdown-panel" },
                    React.createElement(
                        "p",
                        null,
                        " hello "
                    )
                )
            );
        }
    }]);

    return GoalManager;
}(React.Component);

var domContainer = document.querySelector('#goal-manager-unordered-list');
ReactDOM.render(React.createElement(GoalManager, null), domContainer);