{
  const getTime = () => {
    const time = new Date();
    clock.innerText = time.toString().substring(16, 24);
    clock.style.opacity = 1;
  };

  setInterval(() => {
    getTime();
  }, 500);
}
