<template>
  <div class="real-page">
    <div class="message-container">
      <h1>The Truth Behind the Matrix</h1>
      
      <div class="explanation">
        <p class="reveal-text">
          The page just now is just a little joke by AI. 
          I just told AI that I needed an animation of 'The Matrix' to be shown 
          after the countdown to an AI-themed conference.
        </p>
        <p class="reveal-text">
          Please relax and don't take it too seriously.
        </p>
      </div>

      <div class="today-plan">
        <h2>Today's Plan:</h2>
        <ol>
          <li>Add new features to my demo software</li>
          <li>Try to create a new website based on some real needs</li>
        </ol>
      </div>

      <button class="start-button" @click="startReal">Let's Really Start</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RealPage',
  methods: {
    startReal() {
      // You can add navigation to your actual work page here
      console.log('Starting real work...');
    }
  }
}
</script>

<style scoped>
.real-page {
  min-height: 100vh;
  background-color: #0a0a0a;
  color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Open Sans', sans-serif;
}

.message-container {
  max-width: 800px;
  padding: 2rem;
  background-color: rgba(105, 240, 174, 0.1);
  border-radius: 15px;
  border: 1px solid #00ffff;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
}

h1 {
  color: #69f0ae;
  text-align: center;
  margin-bottom: 2rem;
  font-family: 'Orbitron', sans-serif;
}

.explanation {
  margin-bottom: 2rem;
}

.reveal-text {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #00ffff;
}

.today-plan {
  margin: 2rem 0;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.today-plan h2 {
  color: #f4ff81;
  margin-bottom: 1rem;
  font-family: 'Orbitron', sans-serif;
}

.today-plan ol {
  padding-left: 1.5rem;
}

.today-plan li {
  color: #69f0ae;
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.start-button {
  display: block;
  margin: 2rem auto 0;
  padding: 1rem 2rem;
  background-color: #69f0ae;
  color: #000;
  border: none;
  border-radius: 5px;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.start-button:hover {
  background-color: #00ffff;
  box-shadow: 0 0 15px #00ffff;
}
</style> 