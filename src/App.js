
import axios from 'axios';
import { useState } from 'react';

import './App.css';
import studentFace from './studentFace.jpeg';
import tutorFace from './tutorFace.jpeg';


function App() {
  var [response, setResponse] = useState("");
  var [count, setCount] = useState(1);
  var [user, setUser] = useState([]);
  var [holder,setHolder] = useState("");
  var [answers, setAnswers] = useState([]);
  var [ifwrong, setIfwrong] = useState(false);
  var [wrongIndex, setWrongindex] = useState(0);
  
  

  const getReply = () => {
    
    axios.get('http://localhost:8000/response') //using local host on part 8000
    
    .then( (response) => {
      console.log("success")
      
      
      let data = response.data["context"]
      data = data + response.data["question"]
      var answer = response.data["answer"]
      
      pushAns(answer)
      dbPush(data)
      setResponse(response.data)
      
    }).catch(err => {
      console.log(err)
    })
  }

  const postReply = (newlist) => {
    
    axios.get('http://localhost:8000/response') //using localhost and port 8000
    .then( (response) => {
      console.log("success")
      
      
      let data = response.data["context"]
      data = "Correct! Here's a new Question: \n" + data + response.data["question"]
      var answer = response.data["answer"]
      
      pushAns(answer)
      newlist = newlist.concat({"holder": data})
      
      setUser(newlist)
      setResponse(response.data)
      
    }).catch(err => {
      console.log(err)
    })
  }

  const pushAns = (answer) => {
    
    var newList = answers.concat(answer)
    setAnswers(newList)
   
  }

  const dbPush = (data) => {
    let obj = [{"holder": data}]
    
    setCount(count + 1)
   
    setUser(obj)
    

  }
  
  const pushElement = () => {
    const hold = {holder}
    
    var newlist = user.concat({"holder": hold.holder})
   
    
    checkAnswer(newlist)
  }

  const checkAnswer = (newlist) => {
    
    if (answers[answers.length - 1] === newlist[newlist.length - 1].holder){
      
      if (ifwrong){
       
        if (wrongIndex === response["potential_context"].length - 1){

          setWrongindex(0)
          var buf = "That's Correct! Back to the original question: \n" + response["question"]
          var newList = newlist.concat({"holder": buf})
          setUser(newList)
          setAnswers(answers.concat(response["answer"]))
          setIfwrong(false)
        }

        else{

          var buff = "That's right! Here's a followup question: \n" + response["potential_context"][wrongIndex + 1]["question"]
          var newListy = newlist.concat({"holder": buff})
          setWrongindex(wrongIndex + 1)
          setUser(newListy)
          setAnswers(answers.concat(response["potential_context"][wrongIndex + 1]["answer"]))

        }
        
        
      }
      else{
        postReply(newlist)
      }
      
    }
    else{
      if ( ifwrong ){
        var inter = "That wasn't correct, try again! \n" + response["potential_context"][wrongIndex]["question"] 
        setUser(newlist.concat({"holder": inter}))
      }
      else{

      
        setIfwrong(true)

        var intermediate =  "Sorry, that was incorrect. Try this one: \n" + response["potential_context"][wrongIndex]["question"]
        
        newList = newlist.concat({"holder": intermediate})
        setUser(newList)
        
        setAnswers(answers.concat(response["potential_context"][wrongIndex]["answer"]))

        

      }
    }
    setCount(count + 1)
  }

  


  return(
  
  <div className="background">
      <container className="title">
        <div className="titleDiv">
          <h1>Math Word Problem Tutor</h1>
        </div>
      </container>
      <container className="second">
          <div className="res">
            <div className="messages">
              
              {user.map((e,i) => {
                if (i % 2 === 0){
                  return <div className="temps"><img className="image" src={tutorFace} alt=""></img><div className="messageBox"><p>{e.holder}</p></div></div>
                }
                else{
                  return <div className="temps"><div className="messageBox"><p>{e.holder}</p></div><img className="image" src={studentFace} alt=""></img></div>
                }
              })}
            </div>
          </div>
          <div className="input1">
              <h1>Submit Answer</h1>
              <form>
                  <input className="responseField" type="text" onChange={(e) => {
                    setHolder(e.target.value)
                    
                  

                    }}></input>
              </form>
              <button className="button1" type="Submit" onClick={pushElement}>Submit</button>
              
          </div>
          <div className="resButton">
              <button className="resetButton" onClick={getReply}>
                Reset
              </button>
              
          </div>
      </container>
  </div>
  )
 
}


export default App;
