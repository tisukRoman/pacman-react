export const playAudio = (audio: string) => {
  const soundEffect = new Audio(audio);
  soundEffect.play();
};
