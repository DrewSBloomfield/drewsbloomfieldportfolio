const modal=document.getElementById('project-dialog');
const projectVideo=document.getElementById('project-video-embed');
const projectVideoPlaceholder=document.getElementById('project-video-placeholder');
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
  document.getElementById('project-title').textContent=button.dataset.project;
  const isFirstProject=button.dataset.project==='Film project 01';
  projectVideoPlaceholder.hidden=isFirstProject;
  projectVideoPlaceholder.style.display=isFirstProject?'none':'grid';
  projectVideo.hidden=!isFirstProject;
  projectVideo.style.display=isFirstProject?'block':'none';
  projectVideo.src=isFirstProject?'https://www.youtube-nocookie.com/embed/oAjmPuEGb8M':'';
  modal.showModal();
}));
modal.addEventListener('close',()=>{projectVideo.src='';});
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

/* Load Film 01 only on hover: muted autoplay is required by browsers. */
const filmOne=document.querySelector('.film-one');
const filmOnePreview=filmOne?.querySelector('.film-one-preview');
const filmOneHoverUrl='https://www.youtube-nocookie.com/embed/oAjmPuEGb8M?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=oAjmPuEGb8M';
function stopFilmOnePreview(){
  if(!filmOnePreview)return;
  filmOne.classList.remove('is-previewing');
  filmOnePreview.removeAttribute('src');
}
if(filmOne&&filmOnePreview){
  filmOne.addEventListener('pointerenter',event=>{
    if(!canHover.matches||event.pointerType==='touch')return;
    filmOnePreview.src=filmOneHoverUrl;
    filmOne.classList.add('is-previewing');
  });
  filmOne.addEventListener('pointerleave',stopFilmOnePreview);
  filmOne.addEventListener('click',()=>{
    stopFilmOnePreview();
    setFilmFocus(null);
  });
}
