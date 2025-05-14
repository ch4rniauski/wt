$(document).ready(function () {
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToDOM(task.text, task.completed);
        });
    }

    function saveTasks() {
        const tasks = [];
        $('#task-list li').each(function () {
            const text = $(this).find('.task-text').text();
            const completed = $(this).hasClass('completed');
            tasks.push({ text, completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTaskToDOM(taskText, completed = false) {
        const task = $(`
            <li class="${completed ? 'completed' : ''}">
                <span class="task-text">${taskText}</span>
                <button class="complete-btn">${completed ? 'Возобновить' : 'Завершить'}</button>
                <button class="delete-btn">Удалить</button>
            </li>
        `);

        $('#task-list').append(task);
    }

    $(document).on('click', '.complete-btn', function () {
        const parent = $(this).parent();
        parent.toggleClass('completed');
        const isCompleted = parent.hasClass('completed');
        $(this).text(isCompleted ? 'Возобновить' : 'Завершить');
        saveTasks();
    });

    $(document).on('click', '.delete-btn', function () {
        $(this).parent().remove();
        saveTasks();
    });

    $('#add-task-btn').on('click', function () {
        const taskText = $('#task-input').val().trim();
        if (taskText) {
            addTaskToDOM(taskText);
            saveTasks();
            $('#task-input').val('');
        }
    });

    $('#sort-tasks-btn').on('click', function () {
        const tasks = $('#task-list li').toArray();
        
        tasks.sort((a, b) => $(a).hasClass('completed') - $(b).hasClass('completed'));

        $('#task-list').empty().append(tasks);

        saveTasks();
    });

    loadTasks();
});
