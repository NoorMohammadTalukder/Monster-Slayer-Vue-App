function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner:null,
      logMessages:[],
    };
  },
  computed: {
    monsterBarStyles() {
        if(this.monsterHealth<0){
            return {width:'0%'}
        }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
        if(this.playerHealth<0){
            return {width:'0%'}
        }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch:{
      playerHealth(value){
          if(value<=0 && this.monsterHealth<=0){
              //draw
              this.winner="draw";
          }else if(value<=0){
              //player lost
              this.winner="monster";
          }
      },
      monsterHealth(value){
        if(value<=0 && this.playerHealth<=0){
            //draw
            this.winner="draw";
        }else if(value<=0){
            //monster lost
            this.winner="player";
        }
    },
  },
  methods: {
     playMusic(){
      var audio = new Audio('audio_file.mp3');
      audio.play();
     },
    attackMonster() {
      // const attackValue=Math.floor(Math.random()*(12-5))+5;
      this.currentRound++;
      const attackValue = getRandom(12, 5);
      this.monsterHealth = this.monsterHealth - attackValue;
      this.addLogMessage('player','attack',attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      // const attackValue=Math.floor(Math.random()*(15-8))+8;
      const attackValue = getRandom(15, 8);
      this.playerHealth = this.playerHealth - attackValue;
      this.addLogMessage('monster','attack',attackValue);
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandom(10, 25);
      this.monsterHealth -= attackValue;
     this.addLogMessage("player","special attack",attackValue);
      this.attackPlayer();
    },
    healPlayer(){
        this.currentRound++;
        const healValue=getRandom(8,20);
        if(this.playerHealth+healValue>100){
            this.playerHealth=100;
        }else{
           this.playerHealth+=healValue;
        }
       this.addLogMessage("player","heal",healValue);
       this.attackPlayer();
    },
    startNewGame(){
      this.playerHealth= 100;
      this.monsterHealth= 100;
      this.currentRound= 0;
      this.winner=null;
    },
    surrender(){
      this.winner="monster";
    },
    addLogMessage(who,what,value){
      this.logMessages.unshift({
        actionBy:who,
        actionType: what,
        actionValue:value,
   
      });
      console.log(this.logMessages);
    }  
  },
});
app.mount("#game");
