{
  const todoSubmit = (event) => {
    event.preventDefault();

    const todo = todoInput.value;
    const id = localStorage.getItem(USER_ID);
    const LSTodoKey = USER_TODO(id);
    const todoList = JSON.parse(localStorage.getItem(LSTodoKey));

    localStorage.setItem(
      LSTodoKey,
      JSON.stringify([{ todo, id: Date.now() }, ...todoList])
    );

    todoInput.value = '';
    renderTodoList(LSTodoKey);
  };

  todoForm.addEventListener('submit', todoSubmit);
}
