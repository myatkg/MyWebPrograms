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

                <div>
                    <div class="controls">
                        <button v-show="paused" @click="play">&#9654;</button>
                        <button v-show="playing" @click="pause">&#9208;</button>
                        <button @click="forwardTenSec">Forward10</button>
                        <button @click="rewindTenSec">Rewind10</button>
                        <button @click="resetTimeline">reset</button>
                    </div>
                </div>
            </base-card>
        </section>
        <section>
            <base-card>
                <input id=myFileInput type="file">    
                <button @click="getByteArray">Try it</button>
                <span id="file">{{byteArrays}}</span>
            </base-card>
        </section>
    </div>
</template>

<script>
export default {
    props: ['id'],//

     methods: {
         async  getByteArray() {
    //Get file from your input element
    let myFile = document.getElementById('myFileInput').files[0];

    //Wait for the file to be converted to a byteArray
    let byteArray = await new Promise((resolve, reject) => {
                try {
                    let reader = new FileReader();
                    let fileByteArray = [];
                    reader.readAsArrayBuffer(myFile);
                    console.log("reader is reading")
                    reader.onloadend = (evt) => {
                        if (evt.target.readyState == FileReader.DONE) {
                            let arrayBuffer = evt.target.result,
                                array = new Uint8Array(arrayBuffer);
                            for (let i = 0; i < array.length; i++) {
                                fileByteArray.push(array[i]);
                            }
                            console.log("looping finished")
                        }
                        resolve(fileByteArray);
                    }
                }
                catch (e) {
                    reject(e);
                } 
            })
    //Do something with the byteArray
    console.log(byteArray);
},




    updatePaused(event) {
        this.videoElement = event.target;
        this.paused = event.target.paused;
    },
    resetTimeline() {
        this.setZero = false;
        this.lastSeconds = 0
        this.play();
    },
    forwardTenSec() {
        let videoElements = this.$el.querySelectorAll('video')
        this.lastSeconds =videoElements[0].currentTime+10;
        console.log(this.lastSeconds)
        this.play();
    },
    rewindTenSec() {
        let videoElements = this.$el.querySelectorAll('video')
        this.lastSeconds =videoElements[0].currentTime-10;
        console.log(this.lastSeconds)
        this.play();
    },
    play() {
        let videoElements = this.$el.querySelectorAll('video')
        let userTime = this.userSeconds()
        //console.log(userTime)
            for (let i = 0; i < videoElements.length; i++) {
                videoElements[i].currentTime=(userTime[i]+this.lastSeconds);
                videoElements[i].play();
                this.setZero = true;
            }
    },
    pause() {
            let videoElements = this.$el.querySelectorAll('video')
            for (let i = 0; i < videoElements.length; i++) {
                this.lastSeconds = this.updateTime(videoElements[i].currentTime)
                videoElements[i].pause();
                console.log(this.lastSeconds)
            }     
    },
    userSeconds() {
        if(!this.setZero) {
            var hms = ["00:00:10","00:00:10"]
            var a
            var seconds = []
            for(let i = 0; i < hms.length; i++) {
                a = hms[i].split(":");
                seconds[i] = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
            }
            return seconds;
            //console.log(seconds)
        }else return seconds = [0, 0];
    },
    updateTime(seconds) {
        return this.lastSeconds = seconds
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
            lastSeconds: 0,
            setZero: false,
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