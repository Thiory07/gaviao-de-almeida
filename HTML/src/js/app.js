// setup page
let mainMenu = document.querySelector("#main-menu"),
stickyMenu = mainMenu.cloneNode(true);
stickyMenu.id = "sticky";
stickyMenu.classList.remove('content');
stickyMenu.classList.add('disabled', 'sticky');

document.body.appendChild(stickyMenu);

document.addEventListener('scroll', (e) => {
  let offset = mainMenu.offsetTop + 60;
  if (window.pageYOffset > offset) {
    stickyMenu.classList.remove('disabled');
  }
  if (window.pageYOffset < offset) {
    stickyMenu.classList.add('disabled');
  }
  // or for modern browsers
}, {capture: false,passive: true});

navButtons = document.querySelectorAll("a[href*='#']");
for (let i = 0; i < navButtons.length; i++) {
  navButtons[i].addEventListener('click', function(e) {
    e.preventDefault();
    let sections = document.querySelectorAll('section');
    for (let i = 0; i < sections.length; i++) {
      sections[i].classList.add('hide');
    }
    let target = e.target;
    let href = (target.getAttribute('href')) ? target.getAttribute('href') : target.closest('a').getAttribute('href');
    let sectionDOM = document.querySelector(href);

    if (sectionDOM) {
      sectionDOM.classList.remove('hide');
      let url = 'chunks/' + href.replace("#", "") + '.html';
      history.pushState({
        page: url.replace('home','index')
      }, "title 1", url.replace("chunks/", "").replace('home','index'));
    } else {

      let url = 'chunks/' + href.replace("#", "") + '.html';
      console.log(url);
      history.pushState({
        page: url.replace('home','index')
      }, "title 1", url.replace("chunks/", "").replace('home','index'));

      client.open('GET', url);
      client.send();
      document.querySelector('.loading-screen').classList.remove('disabled')
    }
    return false;
  });
}
// Input
function mascaraMutuario(e, a) {v_obj = e, v_fun = a, setTimeout("execmascara()", 1)}
function execmascara() {v_obj.value = v_fun(v_obj.value)}
function cpfCnpj(e) {return e = (e = e.replace(/\D/g, "")).length <= 14 ? (e = (e = e.replace(/(\d{3})(\d)/, "$1.$2")).replace(/(\d{3})(\d)/, "$1.$2")).replace(/(\d{3})(\d{1,2})$/, "$1-$2") : (e = (e = (e = e.replace(/^(\d{2})(\d)/, "$1.$2")).replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")).replace(/\.(\d{3})(\d)/, ".$1/$2")).replace(/(\d{4})(\d)/, "$1-$2")};
// Load chunks
var client = new XMLHttpRequest();

client.addEventListener("load", function(e) {
  document.querySelector('.loading-screen').classList.add('disabled');
  console.log(e);
  document.querySelector('main').innerHTML += client.responseText;
});

window.onpopstate = function(event) {
   console.log(event.state);
  
  var id = event.state.page.replace('chunks/',"").replace(".html","");
  let sections = document.querySelectorAll('section');
    for (let i = 0; i < sections.length; i++) {
    sections[i].classList.add('hide');
  }
  id = id.includes('index') ? 'home' : id;
  document.querySelector('#'+id).classList.remove('hide');
};