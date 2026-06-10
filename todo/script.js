// LocalStorage Key
const STORAGE_KEY = 'todoList';
const FILTER_KEY = 'todoFilter';

// DOM Elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearBtn = document.getElementById('clearBtn');
const totalTasksSpan = document.getElementById('totalTasks');
const completedTasksSpan = document.getElementById('completedTasks');

// State
let todos = [];
let currentFilter = 'all';

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    loadFilter();
    render();
    
    // Event Listeners
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            saveFilter();
            render();
        });
    });
    clearBtn.addEventListener('click', clearCompleted);
});

// Load todos from localStorage
function loadTodos() {
    const saved = localStorage.getItem(STORAGE_KEY);
    todos = saved ? JSON.parse(saved) : [];
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// Load filter from localStorage
function loadFilter() {
    const saved = localStorage.getItem(FILTER_KEY);
    if (saved) {
        currentFilter = saved;
        document.querySelector(`[data-filter="${currentFilter}"]`).classList.add('active');
        document.querySelector('[data-filter="all"]').classList.remove('active');
    }
}

// Save filter to localStorage
function saveFilter() {
    localStorage.setItem(FILTER_KEY, currentFilter);
}

// Add new todo
function addTodo() {
    const text = todoInput.value.trim();
    
    if (!text) {
        alert('Por favor, digite uma tarefa!');
        return;
    }
    
    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toLocaleString('pt-BR')
    };
    
    todos.push(newTodo);
    saveTodos();
    todoInput.value = '';
    todoInput.focus();
    render();
}

// Toggle todo completion
function toggleTodo(id) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos();
    render();
}

// Delete todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    render();
}

// Clear completed todos
function clearCompleted() {
    const completedCount = todos.filter(t => t.completed).length;
    
    if (completedCount === 0) {
        alert('Nenhuma tarefa concluída para limpar!');
        return;
    }
    
    if (confirm(`Deseja deletar ${completedCount} tarefa(s) concluída(s)?`)) {
        todos = todos.filter(todo => !todo.completed);
        saveTodos();
        render();
    }
}

// Filter todos based on current filter
function getFilteredTodos() {
    switch (currentFilter) {
        case 'active':
            return todos.filter(t => !t.completed);
        case 'completed':
            return todos.filter(t => t.completed);
        default:
            return todos;
    }
}

// Render todo list
function render() {
    const filtered = getFilteredTodos();
    
    // Update stats
    const completed = todos.filter(t => t.completed).length;
    totalTasksSpan.textContent = `Total: ${todos.length}`;
    completedTasksSpan.textContent = `Concluídas: ${completed}`;
    
    // Clear list
    todoList.innerHTML = '';
    
    // Show empty state if no todos
    if (todos.length === 0) {
        todoList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🎉</div>
                <p>Nenhuma tarefa ainda!</p>
                <p>Adicione uma nova tarefa para começar.</p>
            </div>
        `;
        return;
    }
    
    // Show empty filtered state
    if (filtered.length === 0) {
        todoList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📭</div>
                <p>Nenhuma tarefa encontrada nesta categoria.</p>
            </div>
        `;
        return;
    }
    
    // Render todos
    filtered.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <input 
                type="checkbox" 
                class="checkbox" 
                ${todo.completed ? 'checked' : ''}
                onchange="toggleTodo(${todo.id})"
            >
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Deletar</button>
        `;
        todoList.appendChild(li);
    });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
