
import './App.css';
import {useState} from "react";

const data = {
  id:0,
  content:"",
  isEdit: false
}
function App() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e) =>{
    setInput(e.target.value);
  }
  const handleAddClick = (e) => {
    if (e.key === "Enter"){
      const temp = [...list];
      const tem = {
        id:temp.length + 1,
        content: input,
        isEdit:false
      }
      temp.push(tem);
      setList(temp);
    }
  }
  const handleRemove = (e) => {
    console.log("hello");
  }
  return (
    <div class="todo_list">
      <div>{list.length!== 0 && list.map((ele) => {
        return (<li>{ele.content}<button id={ele.id}>Edit</button><button id={ele.id} onClick={handleRemove}>delete</button></li>)})}
      </div>
      <div class="input_control"/>
      <input class="todo_input" onChange={handleInputChange} value={input} onKeyPress={handleAddClick}/>
    </div>
  );
}

export default App;
