import React, {Component}from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ListItem from './App';
import * as serviceWorker from './serviceWorker';

class ToDoList extends Component{
  constructor(){
    super()
    this.state={
      list: [{
        name: 'python',status:0
      },{
        name:'java',status:0
      },{
        name:'php',status:0
      },{
        name:'js',status:0
      }
      ],
      inputVal:''
    }
  }
  addTask(){
    if(!this.state.inputVal) return
    this.setState(
      {
        list:[...this.state.list,{
          name:this.state.inputVal,
          status:0
        }],
        inputVal:''
      }
    )
  }
  handleChange(e){
    this.setState({
      inputVal: e.target.value
    })
  }
  deleteItem(name){
    const data = this.state.list.filter(element => element.name !== name)
    this.setState({
      list:data
    })
  }
  completeTask(name){
    const ToDoList=[]
    this.state.list.forEach((element,index)=>{
      if (element.name === name){
        const item = this.state.list[index]
        ToDoList.push(Object.assign({},item,{status:item.status===0 ? 1:0}))
        this.setState({
          list:ToDoList
        })
      }
      else{
        ToDoList.push(element)
      }
    }
    )
  }
  render(){
    return(
      <div className="reactToDoList">
      <header className="header">React ToDoList</header>
      <ListItem data={this.state.list} deleteItem={this.deleteItem.bind(this)}
        completeTask={this.completeTask.bind(this)}/>
      <footer>
        <input type="text" value={this.state.inputVal} onChange={this.handleChange.bind(this)} placeholder="添加TODO"></input>
        <button className="addTodo" onClick={this.addTask.bind(this)}>添加</button>
      </footer>
      </div>
    )
  }

}

ReactDOM.render(
  //<React.StrictMode>
  <ToDoList />,
  //</React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
