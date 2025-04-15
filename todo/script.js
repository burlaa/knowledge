document.addEventListener('DOMContentLoaded', () => {
    const newItemInput = document.getElementById('newItemInput');
    const checklist = document.getElementById('checklist');
    const emptyState = document.querySelector('.empty-state');

    // Load items from Local Storage when the page loads
    loadList();

    // Event Listener for Adding Items
    newItemInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addItem();
        }
    });

    // Event Listener for Marking Done and Deleting (using Event Delegation)
    checklist.addEventListener('click', handleChecklistClick);

    // Function to Add Item
    function addItem() {
        const itemText = newItemInput.value.trim();

        if (itemText === '') {
            return;
        }

        const newTask = createListItem(itemText, false);
        newTask.style.opacity = '0';
        newTask.style.transform = 'translateY(20px) scale(0.95)';
        
        checklist.appendChild(newTask);
        
        // Trigger animation
        requestAnimationFrame(() => {
            newTask.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            newTask.style.opacity = '1';
            newTask.style.transform = 'translateY(0) scale(1)';
        });

        // Animate input field
        newItemInput.style.transform = 'scale(0.98)';
        setTimeout(() => {
            newItemInput.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            newItemInput.style.transform = 'scale(1)';
        }, 100);

        newItemInput.value = '';
        newItemInput.focus();
        saveList();
        updateEmptyState();
        updateTaskGroups();
    }

    // Function to Create a List Item Element
    function createListItem(text, isDone) {
        const li = document.createElement('li');
        
        // Create checkbox
        const checkbox = document.createElement('div');
        checkbox.classList.add('task-checkbox');
        if (isDone) {
            checkbox.classList.add('checked');
        }
        li.appendChild(checkbox);

        // Create text span
        const textSpan = document.createElement('span');
        textSpan.textContent = text;
        textSpan.classList.add('task-text');
        li.appendChild(textSpan);

        // Create actions container
        const actions = document.createElement('div');
        actions.classList.add('task-actions');

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.classList.add('task-btn', 'delete');
        actions.appendChild(deleteBtn);

        li.appendChild(actions);

        if (isDone) {
            li.classList.add('done');
        }

        return li;
    }

    // Function to Handle Clicks within the Checklist
    function handleChecklistClick(event) {
        const target = event.target;
        
        // Handle checkbox click
        if (target.classList.contains('task-checkbox')) {
            const listItem = target.closest('li');
            const isDone = listItem.classList.contains('done');
            
            // Animate completion
            if (!isDone) {
                listItem.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                listItem.style.transform = 'translateX(10px)';
                setTimeout(() => {
                    listItem.style.transform = 'translateX(0)';
                }, 300);
            }
            
            listItem.classList.toggle('done');
            target.classList.toggle('checked');
            saveList();
            updateTaskGroups();
        }
        // Handle delete button click
        else if (target.closest('.delete')) {
            const listItem = target.closest('li');
            listItem.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            listItem.style.transform = 'translateX(-100%)';
            listItem.style.opacity = '0';
            
            setTimeout(() => {
                listItem.remove();
                saveList();
                updateEmptyState();
                updateTaskGroups();
            }, 500);
        }
        // Handle clear completed button click
        else if (target.classList.contains('clear-completed')) {
            clearCompletedTasks();
        }
    }

    // Function to Clear Completed Tasks
    function clearCompletedTasks() {
        const completedTasks = checklist.querySelectorAll('li.done');
        let delay = 0;
        
        completedTasks.forEach(task => {
            setTimeout(() => {
                task.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                task.style.transform = 'translateX(-100%)';
                task.style.opacity = '0';
                
                setTimeout(() => {
                    task.remove();
                    saveList();
                    updateEmptyState();
                    updateTaskGroups();
                }, 500);
            }, delay);
            
            delay += 100;
        });
    }

    // Function to Update Task Groups
    function updateTaskGroups() {
        const tasks = Array.from(checklist.querySelectorAll('li'));
        const pendingTasks = tasks.filter(task => !task.classList.contains('done'));
        const completedTasks = tasks.filter(task => task.classList.contains('done'));

        // Clear the list
        checklist.innerHTML = '';

        // Add pending tasks first
        if (pendingTasks.length > 0) {
            const pendingHeader = document.createElement('h2');
            pendingHeader.textContent = 'Pending';
            pendingHeader.classList.add('task-group-header');
            checklist.appendChild(pendingHeader);
            
            pendingTasks.forEach((task, index) => {
                task.style.opacity = '0';
                task.style.transform = 'translateY(20px)';
                checklist.appendChild(task);
                
                setTimeout(() => {
                    task.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    task.style.opacity = '1';
                    task.style.transform = 'translateY(0)';
                }, index * 50);
            });
        }

        // Add completed tasks
        if (completedTasks.length > 0) {
            const completedHeader = document.createElement('div');
            completedHeader.classList.add('task-group-header');
            
            const headerText = document.createElement('h2');
            headerText.textContent = 'Completed';
            completedHeader.appendChild(headerText);
            
            const clearButton = document.createElement('button');
            clearButton.classList.add('clear-completed');
            clearButton.innerHTML = '<i class="fas fa-trash"></i> Clear All';
            completedHeader.appendChild(clearButton);
            
            checklist.appendChild(completedHeader);
            
            completedTasks.forEach((task, index) => {
                task.style.opacity = '0';
                task.style.transform = 'translateY(20px)';
                checklist.appendChild(task);
                
                setTimeout(() => {
                    task.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    task.style.opacity = '1';
                    task.style.transform = 'translateY(0)';
                }, index * 50);
            });
        }
    }

    // Function to Update Empty State
    function updateEmptyState() {
        const hasTasks = checklist.querySelectorAll('li').length > 0;
        emptyState.style.display = hasTasks ? 'none' : 'flex';
    }

    // Function to Save the List to Local Storage
    function saveList() {
        const items = [];
        checklist.querySelectorAll('li').forEach(li => {
            const textSpan = li.querySelector('.task-text');
            if (textSpan) {
                items.push({
                    text: textSpan.textContent,
                    done: li.classList.contains('done')
                });
            }
        });
        localStorage.setItem('checklistItems', JSON.stringify(items));
    }

    // Function to Load the List from Local Storage
    function loadList() {
        const storedItems = localStorage.getItem('checklistItems');
        if (storedItems) {
            const items = JSON.parse(storedItems);
            items.forEach(item => {
                const newTask = createListItem(item.text, item.done);
                checklist.appendChild(newTask);
            });
        }
        updateEmptyState();
        updateTaskGroups();
    }
});