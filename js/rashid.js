const title= document.getElementById('title')
const artist= document.getElementById('artist')
const music= document.querySelector('audio')

const progressContainer= document.getElementById('progress-container')
const progress= document.getElementById('progress')
const currentTimeEl= document.getElementById('current-time')
const durationEl= document.getElementById('duration')

//player controls 
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn= document.getElementById('next')

const songs= [
    {
        name:'rashid1',  //key-value
        displayName:'Bakı',
        artist:'Rəşid Behbudov'    
    },
    {
        name:'rashid2',  //key-value
        displayName:'Ayrılıq',
        artist:'Rəşid Behbudov' 
    },
    {
        name:'rashid3',  //key-value
        displayName:'Üzüyümün qaşı firuzədəndir',
        artist:'Rəşid Behbudov' 
    }
]  

  let isPlaying = false 

  
  function playSong(){
     isPlaying= true
     playBtn.classList.replace('fa-play', 'fa-pause')
     music.play()    //document.querySelector('audio').play()
  }
  function pauseSong(){
      isPlaying= false 
      playBtn.classList.replace('fa-pause', 'fa-play')
      music.pause()
  }
      
  // ternary operator ? : 
  playBtn.addEventListener('click', () => (isPlaying ? pauseSong(): playSong()))

  // music loading function

  function loadSong(song){
      title.textContent = song.displayName
      artist.textContent = song.artist
    music.src= `../music/${song.name}.mp3` //music.src = music + "/" +song.name+".mp3"
  }
     let songIndex = 0
   
 function prevSong(){
     songIndex--
     if(songIndex<0){
         songIndex = songs.length -1 
     }
      loadSong(songs[songIndex])
      playSong()
   }
 function nextSong(){
    songIndex++
    if(songIndex> songs.length-1){
        songIndex = 0 
    }
     loadSong(songs[songIndex])
     playSong()
  }

  loadSong(songs[songIndex])

  function updateProgressBar(e) {
      //destructring 
         if(isPlaying) {
             const{duration, currentTime}= e.srcElement
                
                const progressPercent= (currentTime / duration)*100

                progress.style.width = `${progressPercent}%`

                const durationMinutes = Math.floor(duration /60)
                const durationSeconds = Math.floor(duration % 60)
                if(durationSeconds <10){
                    durationSeconds = `0${durationSeconds}`
                }

                if(durationSeconds){
                    durationEl.textContent=`${durationMinutes}:${durationSeconds}`
                }
                const currentMinutes= Math.floor(currentTime/60)
                let currentSeconds=  Math.floor(currentTime%60)
                if(currentSeconds<10){
                    currentSeconds = `0${currentSeconds}`
                }
                currentTimeEl.textContent=`${currentMinutes}:${currentSeconds}`
                

         }
  }

  prevBtn.addEventListener('click', prevSong)
  nextBtn.addEventListener('click', nextSong)
 
   //eventlistener
   music.addEventListener('timeupdate', updateProgressBar)