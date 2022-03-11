
import './App.css';
import {useState, useEffect} from "react";

const data = {
  id:0,
  content:"",
  isDone: false,
  isEdit: false,
  quality: 1
}
function App() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [edit, setEdit] = useState("");
  const [quality, setQuality] = useState(1);
  const [controlCount, setControl] = useState("2");
  const [searchInput, setSearch] = useState("");

  const handleInputChange = (e) =>{
    setInput(e.target.value);
  }
  const handleEditChange = (e) =>{
    setEdit(e.target.value);
  }
  const handleQuality = (e) => {
    setQuality(e.target.value);
    const temp = [...list];
    
    temp.map(element => element.isEditQuality=false);
    const tem = temp.find(element => element.id == e.target.id);
    temp[temp.indexOf(tem)].isEditQuality = true;
    
    setList(temp);
  }
  const editQuality = (e) =>{
    if (e.key === "Enter"){
      const temp = [...list];
      const tem = temp.find(element => element.id == e.target.id);
      temp[temp.indexOf(tem)].quality = e.target.value;
      temp[temp.indexOf(tem)].isEditQuality = false;
      temp[temp.indexOf(tem)].quality = e.target.value;
      setList(temp);
    }
  }
  const handleAddClick = (e) => {
    if (e.key === "Enter"){
      const temp = [...list];
      let tem;
      if (temp.length!=0){
        tem = {
          id:temp[temp.length-1].id + 1,
          content: input,
          isDone:false,
          isEdit: false,
          quality: 1,
          isEditQuality: false
        }
      } else {
        tem = {
          id: 0,
          content: input,
          isDone:false,
          isEdit: false,
          quality: 1,
          isEditQuality: false
        }
      }
      temp.push(tem);
      setList(temp);
      setInput("");
    }
  }
  const handleEdit = (e) =>{
    const temp = [...list];
    const tem = temp.find(element => element.id == e.target.id);
    temp[temp.indexOf(tem)].isEdit = true;
    setList(temp);
  }
  const handleCancel = (e) =>{
    const temp = [...list];
    const tem = temp.find(element => element.id == e.target.id);
    temp[temp.indexOf(tem)].isEdit = false;
    setList(temp);
  }
  const handleDone = (e) => {
    const temp = [...list];
    const tem = temp.find(element => element.id == e.target.id);
    let checker = temp[temp.indexOf(tem)].isDone;
    if(checker){
      temp[temp.indexOf(tem)].isDone = false;
    } else{
      temp[temp.indexOf(tem)].isDone = true;
    }
    setList(temp);
  }
  const handleEditContent = (e) =>{
      const temp = [...list];
      const tem = temp.find(element => element.id == e.target.id);
      temp[temp.indexOf(tem)].content = edit;
      temp[temp.indexOf(tem)].isEdit = false;
      setList(temp);
  }
  const handleRemove = (e) => {
    const temp = list.filter(
      (value) => {
      if (value.id != e.target.id){
        return value;
      }
    });
    setList(temp);
  }
 

  const handleControl = (e) =>{
    setControl(e.target.id);
  }
  const search = (e) =>{
    setSearch(e.target.value);
  }
  // useEffect(() => {
  //   window.addEventListener("click", (e)=>
  //   console.log(e.target.id))
  //   return function cleanup() {
  //     window.removeEventListener("click",(e)=>
  //     console.log(e.target.id))
  //   }
  // })
  return (
    <div className="todo_list">
      <Display list={list} handleRemove={handleRemove} handleEdit={handleEdit} editContent={handleEditContent} 
      editChange={handleEditChange} handleCancel={handleCancel} handleDone={handleDone} 
      handleQuality={handleQuality} quality={quality} editQuality={editQuality}
      controlCount={controlCount} handleControl={handleControl}
      search={search} searchInput = {searchInput}/>
      <input className="todo_input" onChange={handleInputChange} value={input} onKeyPress={handleAddClick} placeholder={"Come on!!!"}/>
    </div>
  );
}
function Display({list, handleRemove, handleEdit, editContent, editChange, handleCancel, handleDone, handleQuality, quality, editQuality, controlCount,  handleControl, search, searchInput}) {
  if (list.length === 0){
    return  (<h1>No Todos Here...</h1>);
  }
  let array1;
  if (controlCount == 0){
    array1 = list.filter(element => element.isDone === false)
  } else if(controlCount == 1){
    array1 = list.filter(element => element.isDone === true)
  } else {
    array1 = list.sort(function(a, b){ return a.quality - b.quality;
    })
  }
  if (searchInput){
    array1 = array1.filter(element => element.content.includes(searchInput));
  } 
  return (<div className="todolist_contain">
  <input className="searchinput" onChange={search} placeholder={"Search the to do list"}/>
  {array1.map((ele) => {
      return (<li className="item"><InputQuality ele={ele} handleQuality={handleQuality} quality={quality} editQuality={editQuality}/>
      <Edit ele={ele} handleEdit={handleEdit} editContent={editContent} editChange={editChange} handleCancel={handleCancel} handleDone={handleDone}/>
      <button id={ele.id} onClick={handleRemove}>delete</button>
      </li>)})}
  <Control list={list} handleControl={handleControl} controlCount={controlCount}/>
  </div>)

}
function Control({list, handleControl, controlCount}){
  if (list.length===0){
    return null;
  } if (controlCount == 0){
    return (<div className="control"><a id="2"  onClick={handleControl}>all</a><a id="0" style={{color:'red'}} onClick={handleControl}>processing</a><a id="1"  onClick={handleControl}>done</a></div>)
  } else if (controlCount == 1){
    return (<div className="control"><a id="2"  onClick={handleControl}>all</a><a id="0"  onClick={handleControl}>processing</a><a id="1" style={{color:'red'}} onClick={handleControl}>done</a></div>)
  } else {
    return (<div className="control"><a id="2" style={{color:'red'}} onClick={handleControl}>all</a><a id="0"  onClick={handleControl}>processing</a><a id="1"  onClick={handleControl}>done</a></div>)
  }
  
}
function Edit({ele, handleEdit, editContent, editChange, handleCancel, handleDone}){
  if (ele.isDone){
    return (<span className="edit" display="inline"><a id={ele.id} onClick={handleDone} style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>{ele.content}</a><button id={ele.id} disabled>Edit</button></span>); 
  } else {
    if (ele.isEdit){
      return (<span className="edit"><input placeholder={ele.content} onChange={editChange}/><button id={ele.id} onClick={handleCancel}>Cancel</button><button id={ele.id} value={ele.content} onClick={editContent}>save</button></span>);
    } else {
      return (<span className="edit" display="inline-block"><a id={ele.id} onClick={handleDone}>{ele.content}</a><button id={ele.id} onClick={handleEdit}>Edit</button></span>);
    }
  }
}
function InputQuality({ele, handleQuality, quality, editQuality}){
  if (ele.isEditQuality){
    return (
      <span>
        <input id={ele.id} type="number" value={quality} onChange={handleQuality} onKeyPress={editQuality}/>
      </span>
    )
  } else{
      return (
    <span>
      <input id={ele.id}  type="number" value={ele.quality} onClick={handleQuality}/>
    </span>
  )
  }

}
export default App;
