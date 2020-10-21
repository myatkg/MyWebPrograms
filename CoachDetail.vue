<template>
    <div>
        <section>
            <base-card>
                <h2>{{ fullName }}</h2>
                <h3>${{ rate }}/hour</h3>            
            </base-card>
        </section>
        <section>
            <base-card>
            <header>
                <h2>Interested? Get in touch now!</h2>
                <base-button link :to="contactLink">Contact</base-button>
            </header>
            </base-card>
            <router-view></router-view>
        </section>
        <section>
            <base-card>
                <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
                <p>{{ description }}</p>
            </base-card>
        </section>
        <section>
            <base-card>
                <video  controls poster="velocity-thumbnail.jpg"
                @canplay="updatePaused" @playing="updatePaused" @pause="updatePaused">
                    <source src="https://s3-ap-northeast-1.amazonaws.com/daniemon/demos/Velocity-Mobile.mp4" type="video/mp4" media="all and (max-width:680px)"> 
                    <p>Sorry, there's a problem playing this video. Please try using a different browser.</p>
                </video>
                <video  controls poster="velocity-thumbnail.jpg"
                @canplay="updatePaused" @playing="updatePaused" @pause="updatePaused">
                    <source src="https://s3-ap-northeast-1.amazonaws.com/daniemon/demos/Velocity-Mobile.mp4" type="video/mp4" media="all and (max-width:680px)"> 
                    <p>Sorry, there's a problem playing this video. Please try using a different browser.</p>
                </video>

                <div class="controls">
                    <button v-show="paused" @click="play">&#9654;</button>
                    <button v-show="playing" @click="pause">&#9208;</button>
                </div>
            </base-card>
        </section>
    </div>
</template>

<script>
export default {
    props: ['id'],

     methods: {
    updatePaused(event) {
        this.videoElement = event.target;
      /* this.videoElement1 = event.target;
      this.videoElement2 = event.target; */
      this.paused = event.target.paused;
    },
    play() {
        let videoElements = this.$el.querySelectorAll('video')
        console.log(videoElements[0].currentTime)
            for (let i = 0; i < videoElements.length; i++) {
                videoElements[0].currentTime=50;
                videoElements[i].play()
            }
            /* this.videoElement1.play();
            this.videoElement2.play(); */
    },
    pause() {
            let videoElements = this.$el.querySelectorAll('video')
  for (let i = 0; i < videoElements.length; i++) {
    videoElements[i].pause()
  }
      
    }
  },
    computed: {
        playing() { return !this.paused; },

        fullName() {
            return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
        },
        contactLink() {
            return this.$router.path + '/' + this.id + '/contact';
        },
        areas() {
            return this.selectedCoach.areas;
        },
        rate() {
            return this.selectedCoach.hourlyRate;
        },
        description() {
            return this.selectedCoach.description;
        }
    },
    data() {
        return {
            selectedCoach: null,
            videoElement: null,
            /* videoElement1: null,
            videoElement2: null, */
            paused: null
        };
    },
    created() {
        this.selectedCoach = this.$store.getters['coaches/coaches'].find((coach) => coach.id === this.id)
    }
    //
}
</script>