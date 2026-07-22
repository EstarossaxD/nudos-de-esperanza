function openApoyo(e){
  if(e) e.preventDefault();
  document.getElementById('apoyoModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeApoyo(){
  document.getElementById('apoyoModal').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape') closeApoyo();
});
