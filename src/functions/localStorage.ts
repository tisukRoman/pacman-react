export function getMaxScoreFromStorage() {
  let maxScore = localStorage.getItem('maxScore');

  if (maxScore) {
    return JSON.parse(maxScore);
  } else {
    return 0;
  }
}

export function setMaxScoreToStorage(currentScore: number) {
  let maxScore = localStorage.getItem('maxScore');

  if (maxScore) {
    if (currentScore > JSON.parse(maxScore)) {
      localStorage.setItem('maxScore', JSON.stringify(currentScore));
    } else {
      return;
    }
  } else {
    localStorage.setItem('maxScore', JSON.stringify(currentScore));
  }
}
