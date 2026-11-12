const modal=document.getElementById('project-dialog');
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{document.getElementById('project-title').textContent=button.dataset.project;modal.showModal()}));
modal.querySelector('.close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',event=>{if(event.target===modal){const r=modal.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)modal.close()}});

/* Keep the active film above a darkened backdrop on hover or keyboard focus. */
const filmPreviews=document.querySelectorAll('.latest-project, .film-grid .project');
const canHover=window.matchMedia('(hover: hover) and (pointer: fine)');
function setFilmFocus(active){
  filmPreviews.forEach(preview=>preview.classList.toggle('is-focused',preview===active));
  document.body.classList.toggle('film-focus-active',Boolean(active));
}
filmPreviews.forEach(preview=>{
  preview.addEventListener('pointerenter',event=>{
    if(canHover.matches&&event.pointerType!=='touch')setFilmFocus(preview);
  });
  preview.addEventListener('pointerleave',()=>setFilmFocus(null));
  preview.addEventListener('focusin',()=>setFilmFocus(preview));
  preview.addEventListener('focusout',event=>{
    if(!preview.contains(event.relatedTarget))setFilmFocus(null);
  });
});
document.addEventListener('keydown',event=>{if(event.key==='Escape')setFilmFocus(null)});

/* Corner navigation drawer */
const menuToggle=document.getElementById('menu-toggle');
const menu=document.getElementById('site-menu');
const menuClose=document.getElementById('menu-close');
const menuBackdrop=document.getElementById('menu-backdrop');
let menuReturnFocus=null;
function setMenuOpen(open){
  menu.classList.toggle('open',open);
  menu.setAttribute('aria-hidden',String(!open));
  menu.inert=!open;
  menuToggle.setAttribute('aria-expanded',String(open));
  menuToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
  menuBackdrop.hidden=!open;
  document.body.style.overflow=open?'hidden':'';
  if(open){menuReturnFocus=document.activeElement;menuClose.focus();}
  else if(menuReturnFocus){menuReturnFocus.focus();menuReturnFocus=null;}
}
menuToggle.addEventListener('click',()=>setMenuOpen(!menu.classList.contains('open')));
menuClose.addEventListener('click',()=>setMenuOpen(false));
menuBackdrop.addEventListener('click',()=>setMenuOpen(false));
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenuOpen(false)));
document.addEventListener('keydown',event=>{
 if(event.key==='Escape'&&menu.classList.contains('open'))setMenuOpen(false);
 if(event.key==='Tab'&&menu.classList.contains('open')){
   const focusables=[menuClose,...menu.querySelectorAll('a')];
   const first=focusables[0],last=focusables[focusables.length-1];
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
 }
});
