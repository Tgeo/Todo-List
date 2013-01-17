// Tyler Geonetta
// Todo list logic

if (browserSupportsLocalStorage())
{
	showAllItems(); //initialize
}
else
{
	alert('To-Do List will not be displayed as your browser does not support localstorage');
}

// Checks whether the browser supports html5 localstorage
function browserSupportsLocalStorage()
{
	if (localStorage)
		return true;
	else
		return false;
}

// Sets focus to 'new' item textbox
function setFocusToTextbox()
{
	document.getElementById('newItemText').focus();
}

// Creates 'new' item row
function newItem()
{
	var table = document.getElementById('listTable');
	
	var newItem = table.insertRow(table.rows.length);
	newItem.setAttribute('id', 'newItemRow');
	
	var textCell = newItem.insertCell(0);
	var text = document.createElement('input');
	text.type = "text";	
	text.className = "input-xlarge";
	var placeholder = document.createAttribute('placeholder');
	text.setAttribute('placeholder', 'Ex: Go to the bar ...');
	text.setAttribute('id', 'newItemText');
	text.setAttribute('onkeydown',
		"if (event.keyCode == 13) saveItem()"); // adding enter key functionality
	textCell.appendChild(text);
	
	var saveCell = newItem.insertCell(1);	
	var save = document.createElement('a'); //save button
	save.className = "btn btn-primary";
	var onClick = document.createAttribute('onClick');
	save.setAttribute('onClick', 'saveItem()');
	save.innerText = "Save";
	saveCell.appendChild(save);
	
	setFocusToTextbox();
}

// Saves data in localStorage
function saveItem()
{
	var data = document.getElementById('newItemText').value;
	if (data == "")
	{
		alert('Enter some text');
		return;
	}	
	
	autoIncrement = localStorage.length;	
	var index = autoIncrement;
	
	localStorage.setItem(index, data);
	
	var parent = document.getElementById('newItemRow').parentNode;
	parent.removeChild(document.getElementById('newItemRow'));
	
	showAllItems();
	setFocusToTextbox();
}

// Runs through localStorage and prints all items in our todo list
function showAllItems()
{
	var table = document.getElementById('listTable');
	table.innerHTML = ""; //emptying table to be refilled
	for (var i = 0; i < localStorage.length; i++)
	{
		
		var data = localStorage.getItem(i);
		var sTemp = i + 1; //giving the rows numbers
		data = sTemp + ") " + data;
		
		var newRow = table.insertRow(table.rows.length);
		newRow.setAttribute('index', i);

		var textCell = newRow.insertCell(0);
		textCell.innerHTML = data;
		
		var buttonCell = newRow.insertCell(1);
		
		var edit = document.createElement('a'); //edit button
		edit.className = "btn";
		edit.setAttribute('onClick', "editItem(" + i + ")");
		edit.innerText = "Edit";
		buttonCell.appendChild(edit);
		
		var moveUp = document.createElement('a'); //move up button
		moveUp.className = "btn";
		moveUp.setAttribute('onClick', "moveItemUp(" + i + ")");		
		moveUp.innerText = "Up";
		buttonCell.appendChild(moveUp);
		
		var moveDown = document.createElement('a'); //move down button
		moveDown.className = "btn";
		moveDown.setAttribute('onClick', "moveItemDown(" + i + ")");
		moveDown.innerText = "Down";
		buttonCell.appendChild(moveDown);
		
		var del = document.createElement('a'); //delete button
		del.className = "btn btn-danger";
		del.setAttribute('onClick', "deleteItem(" + i + ")");
		del.innerText = "Delete";
		buttonCell.appendChild(del);
	}
	newItem();
	setFocusToTextbox();
}

// Deletes item from list and adjusts indexes
function deleteItem(ID)
{
	localStorage.removeItem(ID);
	if (ID != localStorage.length)
	{
		for (var i = ID + 1; i < localStorage.length + 1; i++)
		{
			var temp = localStorage.getItem(i);
			var sIndex = i - 1;
			localStorage.setItem(sIndex, temp);
		}
		localStorage.removeItem(localStorage.length - 1);
	}	
	showAllItems();
	setFocusToTextbox();
}

// Creates edit dialog in corresponding row
function editItem(ID)
{
	var todoText = localStorage.getItem(ID);
	
	var table = document.getElementById('listTable');
	var row = table.rows[ID];
	row.innerHTML = "";

	var textCell = row.insertCell(0);
	var textBox = document.createElement('input');
	textBox.type = "text";	
	textBox.value = todoText;
	textBox.className = "input-xlarge";
	textBox.setAttribute('id', 'editText' + ID);
	textBox.setAttribute('onkeydown',
		"if (event.keyCode == 13) saveEditItem(" + ID + ")"); // adding enter key functionality
	textCell.appendChild(textBox);
	
	var buttonCell = row.insertCell(1);
	var save = document.createElement('a'); //save button
	save.className = "btn btn-primary";
	save.setAttribute('onClick', "saveEditItem(" + ID + ")");
	save.innerText = "Save";
	buttonCell.appendChild(save);
	
	document.getElementById('editText' + ID).focus();
}

// Saves the new data after an edit
function saveEditItem(ID)
{
	var data = document.getElementById('editText' + ID).value;
	
	localStorage.setItem(ID, data);
	showAllItems();
}

// Moves a list item up and displaces another list item to its original spot
function moveItemUp(ID)
{
	if (ID == 0)
		return;
	var sIndex = ID - 1;
	
	var temp = localStorage.getItem(sIndex);	
	localStorage.setItem(sIndex, localStorage.getItem(ID));
	localStorage.setItem(ID, temp);
	showAllItems();
}

// Moves a list item down and displaces another list item to its original spot
function moveItemDown(ID)
{
	if (ID == localStorage.length - 1)
		return;
	var sIndex = ID + 1;
	
	var temp = localStorage.getItem(sIndex);	
	localStorage.setItem(sIndex, localStorage.getItem(ID));
	localStorage.setItem(ID, temp);
	showAllItems();
}
