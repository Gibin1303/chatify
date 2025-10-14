const keyStrokeSounds = [
  new Audio("/sounds/Keystroke1.mp3"),
  new Audio("/sounds/Keystroke2.mp3"),
  new Audio("/sounds/Keystroke3.mp3"),
  new Audio("/sounds/Keystroke4.mp3"),
];


const useKeyboardSound = () =>{
   const playRandomKeyStrokeSound = () =>{
    const randomSound = keyStrokeSounds[Math.floor(Math.random()*keyStrokeSounds.length)]
    randomSound.currentTime = 0
    randomSound.play().catch(error=>console.log("error occured while playing",error)
    )
   }

   return {playRandomKeyStrokeSound}
}


export default useKeyboardSound