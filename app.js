function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
    };
  },
  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  methods: {
    attackMonster() {
      // const attackValue=Math.floor(Math.random()*(12-5))+5;
      this.currentRound++;
      const attackValue = getRandom(12, 5);
      this.monsterHealth = this.monsterHealth - attackValue;

      this.attackPlayer();
    },
    attackPlayer() {
      // const attackValue=Math.floor(Math.random()*(15-8))+8;
      const attackValue = getRandom(15, 8);
      this.playerHealth = this.playerHealth - attackValue;
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandom(10, 25);
      this.monsterHealth -= attackValue;
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
       this.attackPlayer();
    }
  },
});
app.mount("#game");
