// 상수정리
const USER_ID = 'VJSLM_USER_ID';
const USER_LIST = 'VJSLM_USER_LIST';
const USER_TODO = (id) => 'VJSLM_' + id + '_TODO_LIST';
const LOGIN_TITLE = '✌️ 이름을 적어주세요!';
const TODO_TITLE = (id) =>
  `👋 Hello ${id}<br/><span style="font-size: 70%">📝 오늘 해야할일</span>`;

// HTML 엘리먼트 정리
const loginFormContainer = document.getElementById('loginFormContainer');
const loginForm = document.getElementById('loginForm');
const idInput = loginForm.querySelector('input[name="id"]');
const todoForm = document.getElementById('todoForm');
const todoInput = todoForm.querySelector('input[name="todo"]');
const todoListHTML = document.getElementById('todoList');
const bg = document.getElementById('bg');
const clock = document.getElementById('clock');
const weatherHTML = document.getElementById('weather');
const logoutHTML = document.getElementById('logout');
const userListHTML = document.getElementById('userList');
const userListContainer = document.getElementById('userListContainer');

// 함수정리
const setTitle = (html) => {
  document.getElementById('title').innerHTML = html;
};

const renderTodoList = (LSTodoKey) => {
  const todoList = JSON.parse(localStorage.getItem(LSTodoKey));
  let result = '';
  todoList.forEach((todo) => {
    const HTML = `
      <li data-id="${todo.id}">${todo.todo} <button onclick="deleteTodo(${todo.id})">❌</button></li>
    `;
    result = result + HTML;
  });

  todoListHTML.innerHTML = result;
};

const deleteTodo = (todoId) => {
  const id = localStorage.getItem(USER_ID);
  const LSTodoKey = USER_TODO(id);
  const todoList = JSON.parse(localStorage.getItem(LSTodoKey));

  localStorage.setItem(
    LSTodoKey,
    JSON.stringify(todoList.filter((todo) => todo.id !== todoId))
  );

  renderTodoList(LSTodoKey);
};

const logout = () => {
  localStorage.removeItem(USER_ID);
  init();
};

const login = (userId) => {
  localStorage.setItem(USER_ID, userId);
  init();
};

const showLogout = () => {
  logoutHTML.style.display = 'block';
  setTimeout(() => {
    logoutHTML.style.opacity = 1;
  }, 1000);
};

// 유저 프로필 리스트
const renderUserList = () => {
  const user_list = JSON.parse(localStorage.getItem(USER_LIST));
  if (user_list == null) return;

  const emoji = ['😀', '👻', '🍎', '🐤', '🥕', '🚌', '🦄'];
  let result = '';
  user_list.forEach((user) => {
    const randomIndex = Math.floor(Math.random() * emoji.length);

    const HTML = `<li><button onclick="login('${user}')">${emoji[randomIndex]}<div style="font-size: 70%">${user}</div></button></li>`;
    result = result + HTML;
  });
  userListHTML.innerHTML = result;
};

renderUserList();

// 앱실행
// 유저 아이디가 있는지 확인후 케이스별 처리
const init = () => {
  const id = localStorage.getItem(USER_ID);
  if (id) {
    loginForm.style.display = 'none';
    userListContainer.style.display = 'none';
    todoForm.style.display = 'grid';
    todoList.style.display = 'flex';
    showLogout();
    setTitle(TODO_TITLE(id));
    const LSTodoKey = USER_TODO(id);
    renderTodoList(LSTodoKey);
  } else {
    loginForm.style.display = 'grid';
    userListContainer.style.display = 'block';
    todoForm.style.display = 'none';
    todoList.style.display = 'none';
    logoutHTML.style.display = 'none';
    todoList.innerHTML = '';
    setTitle(LOGIN_TITLE);
  }
};
init();
