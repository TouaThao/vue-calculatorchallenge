<template>
<div>
  <div class="calculator">
    <div  class="display" >{{current || 0}}</div>
    <div @click="clear" class="btn">C</div>
    <div @click="sign" class="btn">+/-</div>
    <div @click="percent" class="btn">%</div>
    <div @click="divide" class="btn operator">÷</div>
    <div @click="append('7')" class="btn">7</div>
    <div @click="append('8')" class="btn">8</div>
    <div @click="append('9')" class="btn">9</div>
    <div @click="multiply" class="btn operator">x</div>
    <div @click="append('4')" class="btn">4</div>
    <div @click="append('5')" class="btn">5</div>
    <div @click="append('6')" class="btn">6</div>
    <div @click="subtract" class="btn operator">-</div>
    <div @click="append('1')" class="btn">1</div>
    <div @click="append('2')" class="btn">2</div>
    <div @click="append('3')" class="btn">3</div>
    <div @click="addition" class="btn operator">+</div>
    <div @click="append('0')" class="btn zero">0</div>
    <div @click="dot" class="btn">.</div>
    <div @click="equal(), addMessage()" class="btn operator">=</div>
    </div>
    <div class="card">
      <div class='card-content'>
   <ul class="messages" v-chat-scroll>
      <li v-for="(message,index) in newMessage.slice(Math.max(newMessage.length -10,0))":key="message.id">
        <span class ='grey-text text-darken-3'>Result: {{message.current}}</span>
        <span class='grey-text time'>Time:{{message.timestamp}}</span>
      </li>
    </ul>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import moment from 'moment'
export default {
  name: "Calculator",
  data() {
    return {
      limitationList:10,
      current: "",
      operator: null,
      previous: null,
      click: false,
      newMessage: [],
    };
  },
  methods: {
    clear() {
      this.current = "";
    },
    sign() {
      this.current =
        this.current.charAt(0) === "-"
          ? this.current.slice(1)
          : `-${this.current}`;
    },
    percent() {
      this.current = `${parseFloat(this.current) / 100}`;
    },
    append(number) {
      if (this.click) {
        this.current = "";
        this.click = false;
      }
      this.current = `${this.current}${number}`;
    },
    dot() {
      if (this.current.indexOf(".") === -1) {
        this.append(".");
      }
    },
    setPrevious() {
      this.previous = this.current;
      this.click = true;
    },

    divide() {
      this.operator = (a, b) => a / b;
      this.setPrevious();
      
    },
    multiply() {
      this.operator = (a, b) => a * b;
      this.setPrevious();
    },
    subtract() {
      this.operator = (a, b) => a - b;
      this.setPrevious();
    },
    addition() {
      this.operator = (a, b) => a + b;
      this.setPrevious();
      
    },
    equal() {
        this.current = `${this.operator(
        parseFloat(this.previous),
        parseFloat(this.current)
      )}`;
      this.previous = null;
    },
    addMessage(){
        db.collection('number').add({
          current: this.current,
          timestamp: Date.now()
        }).catch(err => {
          console.log(err)
        })
    }
  },

  created(){
    let ref = db.collection('number').orderBy('timestamp')
    ref.onSnapshot(snapshot=>{
      snapshot.docChanges().forEach(change=>{
        if(change.type === 'added'){
          let doc = change.doc
          this.newMessage.push({
            id:doc.id,
            current:doc.data().current,
            timestamp:moment(doc.data().timestamp).format('lll')
          })
        }
      })
    })
  }
};
</script>


<style>
.calculator {
  margin: 0 auto;
  width: 400px;
  font-size: 35px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(50px, auto);
  text-align: center;
}

.card span{
  font-size: 1.4em;
}
.card .time{
  display: block;
  font-size:0.8em;
}
.messages{
  max-height: 300px;
  overflow: auto;
}
.messages::-webkit-scrollbar {
  width: 3px;
}
 
.messages::-webkit-scrollbar-track {
  background: #ddd;
}
 
.messages::-webkit-scrollbar-thumb {
  background: #aaa; 
}
.display {
  grid-column: 1 / 5;
  background-color: gray;
  color: white;
}
.zero {
  grid-column: 1/3;
}

.btn {
  background-color: #eee;
  border: 2px solid gray;
  color: black;
  cursor:pointer;
}
.btn:active {
   transform: scale(0.95);
}

.operator {
  background-color: orange;
  color: white;
}

</style>
