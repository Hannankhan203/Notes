const notesInput = document.querySelector(".notes-input");
const saveBtn = document.querySelector(".save-btn");
const notesContainer = document.querySelector(".notes-container");

let notesArray = JSON.parse(localStorage.getItem("notes")) || [];

function saveToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notesArray));
}

function renderNotes() {
  notesContainer.innerHTML = "";

  notesArray.forEach((noteText, i) => {
    let notes = document.createElement("div");
    notes.classList.add("notes");

    let note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = noteText;
    notes.append(note);

    let delBtn = document.createElement("button");
    delBtn.innerHTML = "Delete";
    delBtn.classList.add("btn");
    notes.append(delBtn);
    delBtn.addEventListener("click", () => deleteNote(i));

    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.classList.add("btn");
    notes.append(editBtn);
    editBtn.addEventListener("click", () => editNoteInLine(i, note, delBtn, editBtn));

    notesContainer.append(notes);
  });
}

function addNotes() {
  if (notesInput.value.trim() === "") {
    notesContainer.innerHTML = "The input cannot be left empty";
    return;
  }
  
  notesArray.push(notesInput.value.trim());
  saveToLocalStorage();
  renderNotes();
  notesInput.value = "";
}

function deleteNote(i) {
    notesArray.splice(i, 1);
    saveToLocalStorage();
    renderNotes();
}

function editNoteInLine(i, noteDiv, delBtn, editBtn) {
    const parenDiv = noteDiv.parentElement;

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = notesArray[i];
    inputField.classList.add("edit-note");

    const saveEditBtn = document.createElement("button");
    saveEditBtn.innerHTML = "Save";
    saveEditBtn.classList.add("btn");

    parenDiv.innerHTML = "";
    parenDiv.appendChild(inputField);
    parenDiv.appendChild(saveEditBtn);

    saveEditBtn.addEventListener("click", () => {
        const updatedNote = inputField.value.trim();
        if(updatedNote === "") {
            notesContainer.innerHTML = "The input cannot be left empty";
            return;
        }
        notesArray[i] = updatedNote;
        saveToLocalStorage();
        renderNotes();
    });
}

renderNotes();

saveBtn.addEventListener("click", addNotes);
