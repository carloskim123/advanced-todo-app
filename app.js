// Get the task input and task list elements
        const taskInput = document.getElementById("taskInput");
        const taskList = document.getElementById("taskList");
        const statusElement = document.getElementById("status");
        const historyList = document.getElementById("historyList");

        // Add event listener to the form
        document.querySelector("form").addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent form submission

            // Get the task name and create a new task element
            const taskName = taskInput.value.trim();
            if (taskName !== "") {
                const taskElement = createTaskElement(taskName);

                // Add the task element to the task list
                taskList.appendChild(taskElement);

                // Clear the task input
                taskInput.value = "";

                // Add the task to the history list
                const historyElement = createHistoryElement(taskName);
                historyList.appendChild(historyElement);

                // Update the status
                updateStatus();
            }
        });

        // Create a new task element
        function createTaskElement(taskName) {
            const taskElement = document.createElement("li");
            taskElement.innerHTML = `
                <input type="checkbox">
                <span>${taskName}</span>
                <div>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>
            `;

            // Add event listeners to the edit and delete buttons
            const editButton = taskElement.querySelector(".edit");
            editButton.addEventListener("click", function() {
                editTask(taskElement);
            });

            const deleteButton = taskElement.querySelector(".delete");
            deleteButton.addEventListener("click", function() {
                deleteTask(taskElement);
            });

            // Add event listener to the checkbox
            const checkbox = taskElement.querySelector("input[type='checkbox']");
            checkbox.addEventListener("change", function() {
                taskElement.classList.toggle("completed");
                updateStatus();
            });

            return taskElement;
        }

        // Create a new history element
        function createHistoryElement(taskName) {
            const historyElement = document.createElement("li");
            historyElement.textContent = taskName;
            return historyElement;
        }

        // Edit a task
        function editTask(taskElement) {
            const taskName = taskElement.querySelector("span").textContent;
            const newTaskName = prompt("Enter the new task name:", taskName);
            if (newTaskName !== null && newTaskName.trim() !== "") {
                taskElement.querySelector("span").textContent = newTaskName.trim();

                // Add the task to the history list
                const historyElement = createHistoryElement(`Edited task "${taskName}" to "${newTaskName.trim()}"`);
                historyList.appendChild(historyElement);
            }
        }

        // Delete a task
        function deleteTask(taskElement) {
            const taskName = taskElement.querySelector("span").textContent;
            taskElement.remove();

            // Add the task to the history list
            const historyElement = createHistoryElement(`Deleted task "${taskName}"`);
            historyList.appendChild(historyElement);

            // Update the status
            updateStatus();
        }

        // Update the status
        function updateStatus() {
            const totalTasks = taskList.children.length;
            const completedTasks = taskList.querySelectorAll("input[type='checkbox']:checked").length;
            statusElement.textContent = `Total tasks: ${totalTasks}, Completed tasks: ${completedTasks}`;
        }
