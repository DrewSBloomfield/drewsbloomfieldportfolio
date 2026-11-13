const films={
  pages:{title:'Pages',role:'Director / Editor',id:'ia1pxspCJ8E'},
  'data-op':{title:'DATA OP',role:'Director / Writer',id:'oAjmPuEGb8M'}
};
const dialog=document.getElementById('film-dialog');
const player=document.getElementById('dialog-player');
const closeButton=document.getElementById('close-dialog');
let returnFocus=null;
document.querySelectorAll('[data-film]').forEach(button=>{
  button.addEventListener('click',()=>{
    const film=films[button.dataset.film];
    if(!film)return;
    returnFocus=button;
    document.getElementById('dialog-title').textContent=film.title;
    document.getElementById('dialog-role').textContent=film.role;
    const link=document.getElementById('dialog-link');
    link.href='https://youtu.be/'+film.id;
    player.title=film.title+' video';
    player.src='https://www.youtube-nocookie.com/embed/'+film.id+'?autoplay=1&rel=0';
    dialog.showModal();
    closeButton.focus();
  });
});
function closeFilm(){dialog.close()}
closeButton.addEventListener('click',closeFilm);
dialog.addEventListener('click',event=>{
  if(event.target!==dialog)return;
  const r=dialog.getBoundingClientRect();
  if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeFilm();
});
dialog.addEventListener('close',()=>{
  player.removeAttribute('src');
  if(returnFocus){returnFocus.focus();returnFocus=null;}
});
document.getElementById('copyright-year').textContent=new Date().getFullYear();
