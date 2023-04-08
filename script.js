console.log("Welcome to Spotify");
//Initialize the Variables
let songIndex=0;
let audioElement = new Audio('ganpati.mp3');
let masterPlay= document.getElementById('masterPlay');
let myProgressBar= document.getElementById('myProgressBar');
let gif= document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems= Array.from(document.getElementsByClassName('songItem'));
let songs =[
    {songName: "Ekadantaya Vakratundaya" , filePath:"songs/1.mp3" ,coverPath:"cover/1.jpg"},
    {songName: "Baller Shubh " , filePath:"songs/2.mp3" ,coverPath:"cover/2.jpg"},
    {songName: "Channa Ve " , filePath:"songs/3.mp3" ,coverPath:"cover/3.jpg"},
    {songName: "Isq Risk Mere Brother Ki Dulhan" , filePath:"songs/4.mp3" ,coverPath:"cover/4.jpg"},
    {songName: "Kahani Suno 2 Kaifi Khalil" , filePath:"songs/5.mp3" ,coverPath:"cover/5.jpg"},
    {songName: "So High Sidhu Moose Wala" , filePath:"songs/6.mp3" ,coverPath:"cover/6.jpg"},
]
songItems.forEach((element,i)=>{
    
    element.getElementsByTagName("img")[0].src= songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//audioElement.play();
//Handle play/pause click
masterPlay.addEventListener('click' , ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle-o');
        masterPlay.classList.add('fa-pause-circle-o');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle-o');
        masterPlay.classList.add('fa-play-circle-o');
        gif.style.opacity=0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate' , ()=>{
    
    //Update SeekBar
    progress= parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value= progress;
})
myProgressBar.addEventListener('change' , ()=>{
    audioElement.currentTime= myProgressBar.value *audioElement.duration/100;
})
const makeAllPlays= ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle-o');
        element.classList.add('fa-play-circle-o');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click' , (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle-o');
        e.target.classList.add('fa-pause-circle-o');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle-o');
        masterPlay.classList.add('fa-pause-circle-o');
    })
}) 
document.getElementById('next').addEventListener('click' , ()=>{
    if(songIndex>=6){
        songIndex = 0;   
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle-o');
    masterPlay.classList.add('fa-pause-circle-o');
    
    
})
document.getElementById('previous').addEventListener('click' , ()=>{
    if(songIndex<=0){
        songIndex = 0;   
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle-o');
    masterPlay.classList.add('fa-pause-circle-o'); 
})