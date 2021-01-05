import React, { Component } from "react";
import Header from "../components/Header";
import x_img from "../img/x.png"
class TodoItem extends Component { 
    render() { 
        const { id, text, isCompleted, display, deleteTodo, checkboxOnclick } = this.props;
        console.log({display})
        return (
            <li className="todo-app__item" id={id} isCompleted={isCompleted} style={{display}}>
                <div className="todo-app__checkbox" onClick={checkboxOnclick}>
                    <input type="checkbox" defaultChecked={false}></input>
                    <label></label>
                </div>
                <h1 className="todo-app__item-detail">{text}</h1>
                <img className="todo-app__item-x" src = {x_img} onClick={deleteTodo}></img>
            </li>
        );
    }
}
class TodoApp extends Component { 
    constructor(props) { 
        super(props);
        this.state = {
            count: 0,
            mode: 0,
            todo_arr : [],
        };
    }
    handleKeyUp = (e) => { 
        const { todo_arr } = this.state;
        if (e.key === 'Enter' && e.target.value !== "") { 
            this.setState(state => ({ count: state.count + 1 }));
            this.setState({todo_arr: [...todo_arr, {id: this.state.count,text: e.target.value,isCompleted: false, display:'flex'}]});
            e.target.value = "";
        }
    }
    checkboxOnclick = (e) => { 
        if (e.target.parentNode.parentNode.nodeName.toLowerCase() === 'li') { 
            const checkedItem = e.target.parentNode.parentNode;
            const itemInput = checkedItem.childNodes[0].childNodes[0];
            const itemIndex = (this.state.todo_arr).indexOf(this.state.todo_arr.find(todo=>(todo.id).toString()===checkedItem.id))
            this.state.todo_arr[itemIndex].isCompleted =!itemInput.checked;
            if (itemInput.checked === true) {
                checkedItem.style["textDecoration"] = "";
                checkedItem.style["opacity"] = 1;
            }
            else { 
                checkedItem.style["textDecoration"] = "line-through";
                checkedItem.style["opacity"] = 0.5;
            }
            itemInput.checked = !itemInput.checked;
            this.forceUpdate()
        }
    }
    deleteTodo = (e) => {
        const delItem = e.target.parentNode;
        this.setState({todo_arr:this.state.todo_arr.filter(todo => todo.id.toString() !== delItem.id)})
    }
    modeChange = (e) => { 
        if (e.target.id === 'All') this.setState({ mode: 0 });
        else if (e.target.id === 'Active') this.setState({ mode: 1 });
        else if (e.target.id === 'Completed') this.setState({ mode: 2 });
    }
    clearCompleted = (e) => { 
        this.setState({todo_arr:this.state.todo_arr.filter(todo => !todo.isCompleted)})
    }
    update = () => { 
        for (var i = 0; i < this.state.todo_arr.length; i++) { 
            if (this.state.mode === 0) this.state.todo_arr[i].display = 'flex';
            else if (this.state.mode === 1) {
                if (this.state.todo_arr[i].isCompleted) this.state.todo_arr[i].display = 'none';
                else this.state.todo_arr[i].display = 'flex';
            }
            else if (this.state.mode === 2) { 
                if (!this.state.todo_arr[i].isCompleted) this.state.todo_arr[i].display = 'none';
                else this.state.todo_arr[i].display = 'flex';
            }
        }
    }
    render() {
        this.update();
        return (
            <div className="todo-app__root">
                <Header text="todos"  class="todo-app__header"/>
                <section className="todo-app__main">
                    <input className="todo-app__input" placeholder="What needs to be done?" onKeyUp={this.handleKeyUp}></input>
                    <ul className="todo-app__list">
                        {this.state.todo_arr.map(todo => (<TodoItem id={todo.id} key={todo.id} text={todo.text} isCompleted={todo.isCompleted} display={todo.display} deleteTodo={this.deleteTodo} checkboxOnclick={this.checkboxOnclick}></TodoItem>))}
                    </ul>
                </section>
                <footer className="todo-app__footer" style={{display: (this.state.todo_arr.length>0?'flex':'none')}}>
                    <div className="todo-app__total">{this.state.todo_arr.filter(todo => !todo.isCompleted).length} left</div>
                    <ul className="todo-app__view-buttons">
                        <button id="All" onClick={this.modeChange}>All</button>
                        <button id="Active" onClick={this.modeChange}>Active</button>
                        <button id="Completed" onClick={this.modeChange}>Completed</button>
                    </ul>
                    <div className="todo-app__clean" style={{visibility: ((this.state.todo_arr.filter(todo=>todo.isCompleted)).length>0?'visible':'hidden')}}>
                        <button id="Clear" onClick={this.clearCompleted}>Clear completed</button>
                    </div>
                </footer>
            </div>
        );
    }
}
export default TodoApp;
