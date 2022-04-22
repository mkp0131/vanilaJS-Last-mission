{
  const loginSubmit = (event) => {
    event.preventDefault();

    const id = idInput.value;
    const userList = JSON.parse(localStorage.getItem(USER_LIST)) || [];

    // 회원가입
    if (!userList.includes(id)) {
      localStorage.setItem(USER_LIST, JSON.stringify([...userList, id]));
    }
    localStorage.setItem(USER_ID, id);

    // 회원별 Todo 리스트 생성
    const LSTodoKey = USER_TODO(id);
    if (!localStorage.getItem(LSTodoKey)) {
      localStorage.setItem(LSTodoKey, JSON.stringify([]));
    }
    idInput.value = '';
    renderTodoList(LSTodoKey);

    loginForm.style.display = 'none';
    todoForm.style.display = 'grid';
    todoList.style.display = 'flex';
    showLogout();
    setTitle(TODO_TITLE(id));
  };

  loginForm.addEventListener('submit', loginSubmit);
}
