const films={
  pages:{title:'Pages',role:'Director / Editor',id:'ia1pxspCJ8E',description:'A film made for my older sister’s wedding, set to a song written by my dad. The goal was to create something emotional and tearjerking.'},
  'data-op':{title:'DATA OP',role:'Director / Writer',id:'oAjmPuEGb8M',description:'Project description and creative reflection to be added.'},
  'pineapple-incident':{title:'The Pineapple Incident',role:'Editor / Actor for John',id:'WtntfiZmZZ4',description:'A satirical short, written by the Actor for Maria and Directed by a classmate, and edited by me, as a project for our Audio for Digital Film class.'}
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
    document.getElementById('dialog-description').textContent=film.description;
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

/* Muted hover playback with the original 3% enlargement and page dimming. */
const hoverFilms=document.querySelectorAll('.hover-film');
const hoverCapable=window.matchMedia('(hover:hover) and (pointer:fine)');
function stopHoverPreview(button){
  const iframe=button.querySelector('.hover-preview');
  button.classList.remove('is-previewing','is-focused');
  if(iframe)iframe.removeAttribute('src');
  if(!document.querySelector('.hover-film.is-focused'))document.body.classList.remove('film-focus-active');
}
hoverFilms.forEach(button=>{
  const iframe=button.querySelector('.hover-preview');
  const film=films[button.dataset.film];
  if(!iframe||!film)return;
  button.addEventListener('pointerenter',event=>{
    if(!hoverCapable.matches||event.pointerType==='touch'||dialog.open)return;
    button.classList.add('is-focused','is-previewing');
    document.body.classList.add('film-focus-active');
    iframe.src='https://www.youtube-nocookie.com/embed/'+film.id+'?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist='+film.id;
  });
  button.addEventListener('pointerleave',()=>stopHoverPreview(button));
  button.addEventListener('click',()=>stopHoverPreview(button));
});
dialog.addEventListener('close',()=>hoverFilms.forEach(stopHoverPreview));
