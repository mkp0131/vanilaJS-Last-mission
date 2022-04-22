{
  fetch('https://picsum.photos/1920/1080/')
    .then((res) => {
      const img = new Image();
      img.src = res.url;
      img.crossOrigin = 'Anonymous';
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const base64 = canvas.toDataURL('image/*');
        bg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, 1)), url(${base64})`;
        bg.style.opacity = 1;
      };
    })
    .catch(() => {
      bg.style.background = 'rgb(2,0,36)';
      bg.style.background =
        'linear-gradient(40deg, rgba(2,0,36,1) 0%, rgba(121,9,69,1) 35%, rgba(0,212,255,1) 100%)';
      bg.style.opacity = 1;
    });
}
