function setInLocal(massive){
    localStorage.setItem("data", JSON.stringify(massive));
};

function getInLocal(){
    console.log(JSON.parse(localStorage.getItem("data")));
    return JSON.parse(localStorage.getItem("data"));
}