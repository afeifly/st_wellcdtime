<template>
  <div class="app-container">
    <canvas ref="matrixCanvas" class="matrix-canvas"></canvas>
    <header class="header-section">
      <div class="header-content">
        <h1>AI in Development</h1>
      </div>
    </header>

    <main class="main-section">
      <div class="content-container">
        <div class="ai-benefits">
          <div class="benefit">
            <span class="benefit-icon">
              <i class="fa-solid fa-bolt"></i>
            </span>
            <h3>Faster Coding</h3>
            <p>AI speeds up coding with real-time suggestions.</p>
          </div>
          <div class="benefit">
            <span class="benefit-icon">
              <i class="fa-solid fa-bug-slash"></i>
            </span>
            <h3>Smarter Debugging</h3>
            <p>Catch bugs instantly with AI analysis.</p>
          </div>
          <div class="benefit">
            <span class="benefit-icon">
              <i class="fa-solid fa-people-group"></i>
            </span>
            <h3>Accessible to All</h3>
            <p>AI makes coding easier for everyone.</p>
          </div>
          <div class="benefit">
            <span class="benefit-icon">
              <i class="fa-solid fa-rocket"></i>
            </span>
            <h3>One More Thing</h3>
            <p>Don't be too serious, all pages are created by AI.</p>
          </div>
        </div>
        <div class="countdown-container">
          <div class="countdown-header">
            <h2>Countdown to the AI Coding Revolution</h2>
            <p>Join us 2025-03-05 16:00:00 for the AI Event!</p>
          </div>
          <div class="countdown-area" v-if="timeLeft > 0">
            <div class="time-segment">
              <span class="time-value">{{ formattedTime.days }}</span>
              <span class="time-label">d</span>
            </div>
            <div class="time-segment">
              <span class="time-value">{{ formattedTime.hours }}</span>
              <span class="time-label">h</span>
            </div>
            <div class="time-segment">
              <span class="time-value">{{ formattedTime.minutes }}</span>
              <span class="time-label">m</span>
            </div>
            <div class="time-segment">
              <span class="time-value">{{ formattedTime.seconds }}</span>
              <span class="time-label">s</span>
            </div>
          </div>
          <div class="start-message" v-else>
            <h2>Let's start now!</h2>
            <button class="next-page-button" @click="goToRealPage">Continue</button>
            <button class="play-again-button" @click="playAgain">Play Again</button>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer-section">
      <p>Ethan.Xu@suto-itec.com</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      targetDate: new Date('2025-03-05T16:00:00'),
    //   targetDate: new Date('2025-02-27T15:51:00'),
      timeLeft: 0,
      intervalId: null,
      matrixChars: '0123456789',
      drops: [],
      ctx: null,
      matrixEffectActive: false,
      animationFrame: null,
    };
  },
  computed: {
    formattedTime() {
      const days = Math.floor(this.timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((this.timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((this.timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((this.timeLeft % (1000 * 60)) / 1000);
      return {
        days: this.padZero(days),
        hours: this.padZero(hours),
        minutes: this.padZero(minutes),
        seconds: this.padZero(seconds),
      };
    },
  },
  mounted() {
    this.updateTimeLeft();
    this.intervalId = setInterval(this.updateTimeLeft, 1000);
    this.$nextTick(() => {
      this.initializeMatrix(); // Ensure the DOM is ready
    });
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
    this.matrixEffectActive = false;
    cancelAnimationFrame(this.animationFrame);
    this.ctx = null;
  },
  methods: {
    updateTimeLeft() {
      const now = new Date();
      this.timeLeft = this.targetDate - now;
      if (this.timeLeft < 0) {
        this.timeLeft = 0;
        clearInterval(this.intervalId);
        this.startMatrixEffect();
        setTimeout(() => this.stopMatrixEffect(), 15000);
      }
    },
    padZero(num) {
      return num.toString().padStart(2, '0');
    },
    initializeMatrix() {
      this.$nextTick(() => {  // Add this wrapper
        const canvas = this.$refs.matrixCanvas;
        if (!canvas) return;  // Add safety check
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.ctx = canvas.getContext('2d');
        
        const columns = canvas.width / 20;
        this.drops = Array(Math.floor(columns)).fill(1);
        
        window.addEventListener('resize', () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          this.drops = Array(Math.floor(canvas.width / 20)).fill(1);
        });
      });
    },
    
    drawMatrix() {
      if (!this.matrixEffectActive || !this.ctx) return;
      
      const canvas = this.$refs.matrixCanvas;
      if (!canvas) return;  // Add safety check
      
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);  // Use canvas directly
      
      this.ctx.fillStyle = '#0F0';
      this.ctx.font = '15px monospace';
      
      for (let i = 0; i < this.drops.length; i++) {
        const text = this.matrixChars[Math.floor(Math.random() * this.matrixChars.length)];
        this.ctx.fillText(text, i * 20, this.drops[i] * 20);
        
        if (this.drops[i] * 20 > canvas.height && Math.random() > 0.975) {  // Use canvas directly
          this.drops[i] = 0;
        }
        this.drops[i]++;
      }
      
      // Store the animation frame ID
      this.animationFrame = requestAnimationFrame(() => this.drawMatrix());
    },
    
    startMatrixEffect() {
      if (!this.$refs.matrixCanvas || !this.ctx) {
        this.initializeMatrix();
        // Add delay to ensure initialization is complete
        setTimeout(() => {
          this.startMatrixEffect();
        }, 100);
        return;
      }
      
      this.matrixEffectActive = true;
      this.$refs.matrixCanvas.style.opacity = '0.8';
      this.drawMatrix();
    },
    
    stopMatrixEffect() {
      const canvas = this.$refs.matrixCanvas;
      if (!canvas) return;  // Add safety check
      
      canvas.style.transition = 'opacity 2s ease-out';
      canvas.style.opacity = '0';
      
      this.matrixEffectActive = false;  // Stop the animation immediately
      cancelAnimationFrame(this.animationFrame);  // Cancel any pending animation frame
      
      setTimeout(() => {
        canvas.style.transition = '';
      }, 2000);
    },
    
    testMatrixEffect() {
      this.timeLeft = 0;
      this.startMatrixEffect();
      setTimeout(() => this.stopMatrixEffect(), 15000);
    },
    
    goToRealPage() {
      // Stop matrix effect before navigation
      this.stopMatrixEffect();
      // Add a small delay to ensure the effect is cleaned up
      setTimeout(() => {
        this.$router.push({ name: 'RealPage' });
      }, 100);
    },
    
    playAgain() {
      if (!this.ctx) {
        this.initializeMatrix();
      }
      this.$nextTick(() => {
        this.startMatrixEffect();
        setTimeout(() => this.stopMatrixEffect(), 15000);
      });
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Open+Sans:wght@400;600&family=Roboto+Condensed:wght@400;700&display=swap');

/* Overall Container */
.app-container {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  background-color: #0a0a0a; /* Very dark background */
  color: #e0e0e0; /* Light gray text for contrast */
  font-family: 'Orbitron', sans-serif; /* Futuristic font */
  overflow: hidden; /* Hide any overflow */
}

/* Header Section */
.header-section {
  height: 25vh; /* make header bigger */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
  padding: 20px;
  overflow: hidden;
}

.header-content {
  z-index: 1;
  position: relative;
}

.header-section h1 {
  font-family: 'Orbitron', sans-serif; /* Futuristic font */
  font-weight: bold;
  font-size: 54px;
  color: #69f0ae; /* Neon green */
  text-shadow: 0 0 10px #69f0ae; /* Glowing effect */
  margin: 0;
  z-index: 1;
}

/* Header Gradient Background */
.header-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #001524, #000428); /* Dark gradient */
  opacity: 0.8;
  z-index: 0;
  border-bottom: 1px solid #69f0ae; /* Thin neon green border */
}

/* Corner Background Image */
.corner-background {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 300px;
  height: 200px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.3;
  z-index: 0;
  border-top-left-radius: 20px;
    /* Add a subtle glow to the corners */
  box-shadow: 0 0 10px rgba(105, 240, 174, 0.5); /* Neon green glow */
}
.corner-background-desaturate {
  filter: grayscale(80%) blur(1px);
}

/* Main Section */
.main-section {
  flex-grow: 1;
  padding: 20px;
  position: relative; /* For potential glitch effects */
}

.content-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

/* AI Benefits Section */
.ai-benefits {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  flex-grow: 0.8;
}

.benefit {
  text-align: center;
  background-color: rgba(105, 240, 174, 0.1); /* Neon green transparent */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 255, 255, 0.1); /* Cyan shadow */
  border: 1px solid #00ffff; /* thin border */
}

.benefit-icon {
  font-size: 2em;
  margin-bottom: 10px;
  display: block;
  color: #00ffff; /* Cyan icon */
  text-shadow: 0 0 5px #00ffff; /* Glowing effect */
}

.benefit h3 {
  color: #00ffff; /* Cyan text */
  font-weight: 600;
  margin: 10px;
  text-shadow: 0 0 5px #00ffff; /* Glowing effect */
}

.benefit p {
  font-size: 18px;
  color: #69f0ae; /* Neon green text */
}

/* Countdown Section */
.countdown-container {
  text-align: center;
  width: 50%;
}

.countdown-header h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: 2em;
  color: #f4ff81; /* Neon yellow */
  text-shadow: 0 0 10px #f4ff81; /* Glowing effect */
}

.countdown-header p {
  margin-top: 10px;
  font-size: 1.2em;
  color: #00ffff; /* Cyan text */
}

/* Countdown Styles */
.countdown-area {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  margin-bottom: 10px;
  margin-left: 15px;
  border: 1px solid #00ffff;
  border-radius: 20px;
  box-shadow: 0 0 20px #00ffff;
  padding: 20px;
}

.time-segment {
  margin: 0 10px;
  min-width: 100px;
  border: 2px solid #00ffff; /* Cyan border */
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 0 10px #00ffff; /* Cyan glow */
}

.time-value {
  font-family: 'Orbitron', sans-serif;
  font-size: 3.5em;
  font-weight: bold;
  color: #f4ff81; /* Neon yellow */
  text-shadow: 0 0 10px #f4ff81; /* Glowing effect */
}

.time-label {
  font-size: 0.8em;
  margin-top: 5px;
  display: block;
  color: #f4ff81;
  text-shadow: 0 0 5px #f4ff81;
}

/* Start Message */
.start-message {
  font-size: 2em;
  color: #f4ff81; /* Neon yellow */
  text-shadow: 0 0 10px #f4ff81; /* Glowing effect */
}

/* Footer Section */
.footer-section {
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  padding: 10px;
  text-align: center;
  border-top: 1px solid #69f0ae;
}

.footer-section p {
  font-size: 14px;
  color: #69f0ae; /* Neon green text */
}

.footer-section p a {
  color: #00ffff; /* Cyan link */
}

/* Responsive Design */
@media (max-width: 1350px) {
  .countdown-container {
    width: 100%;
    margin-top: 20px;
  }
}

@media (max-width: 768px) {
  .header-section h1 {
    font-size: 32px;
  }

  .content-container {
    flex-direction: column;
  }

  .ai-benefits {
    grid-template-columns: 1fr;
  }

  .countdown-container {
    width: 100%;
    margin-top: 20px;
  }

  .benefit p {
    font-size: 16px;
  }

  .time-segment {
    margin: 0 5px;
  }

  .time-value {
    font-size: 2em;
  }

  /* Responsive Corner Background Image */
  .corner-background {
    width: 200px;
    height: 150px;
    opacity: 0.1;
    background-blend-mode: multiply;
  }
}

.matrix-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.8;
}

.test-button {
  background-color: #69f0ae;
  color: #000;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s ease;
}

.test-button:hover {
  background-color: #00ffff;
  box-shadow: 0 0 10px #00ffff;
}

/* Modify existing styles to ensure content is visible above canvas */
.header-section,
.main-section,
.footer-section {
  position: relative;
  z-index: 1;
}

.next-page-button {
  background-color: #69f0ae;
  color: #000;
  border: none;
  padding: 15px 30px;
  border-radius: 5px;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease;
}

.next-page-button:hover {
  background-color: #00ffff;
  box-shadow: 0 0 15px #00ffff;
  transform: scale(1.05);
}

.play-again-button {
  background-color: #69f0ae;
  color: #000;
  border: none;
  padding: 15px 30px;
  border-radius: 5px;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease;
}

.play-again-button:hover {
  background-color: #00ffff;
  box-shadow: 0 0 15px #00ffff;
  transform: scale(1.05);
}
</style> 