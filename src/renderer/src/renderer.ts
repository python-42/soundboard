const names = document.getElementsByClassName("name");
window.electronAPI.onUpdateUI((value : string[]) => {
    for (let i = 0; i < names.length; i++) {
        console.log(value[i]);
        names[i].innerHTML = value[i];
    }
});

const workingDir = document.getElementById("workingDir");
window.electronAPI.onUpdateWorkingDir((value : string) => {
  if (workingDir !== null) {
    workingDir.innerHTML = value;
  }
});