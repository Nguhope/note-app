const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function loadNotes() {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
        notesContainer.innerHTML = savedNotes;
    }
}
loadNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
    const inputBox = document.createElement("p");
    const img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "./image/detele.png"; // Ensure the image path is correct
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);

    inputBox.addEventListener("input", updateStorage);
    img.addEventListener("click", () => {
        inputBox.remove();
        updateStorage();
    });

    updateStorage();
});

notesContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    } else if (e.target.tagName === "P") {
        const notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.addEventListener("input", updateStorage);
        });
    }
});
const clearBtn = document.querySelector(".clear-btn");

clearBtn.addEventListener("click", () => {
    localStorage.clear();
    notesContainer.innerHTML = ""; // Clear the displayed notes as well
});

document.addEventListener("keydown", event =>{
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
        
    }
})
