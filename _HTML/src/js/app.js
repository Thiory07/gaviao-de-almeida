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

navButtons = document.querySelectorAll("a[data-href]");
for (let i = 0; i < navButtons.length; i++) {
  navButtons[i].addEventListener('click', function(e) {
    e.preventDefault();
    let sections = document.querySelectorAll('section');
    for (let i = 0; i < sections.length; i++) {
      sections[i].classList.add('hide');
    }
    let target = e.target;
    let href = (target.getAttribute('data-href')) ? target.getAttribute('data-href') : target.closest('a').getAttribute('data-href');
    let sectionDOM = document.querySelector(href);

    if (sectionDOM) {
      sectionDOM.classList.remove('hide');
      let url = 'chunks/' + href.replace("#", "") + '.html';
      history.pushState({
        page: url.replace('home','index')
      }, "title 1", url.replace("chunks/", "").replace('home','index'));
      window.scroll({
 top: 0, 
 left: 0, 
 behavior: 'smooth' 
});
    } else {

      let url = 'chunks/' + href.replace("#", "") + '.html';
      url = url.replace('home', 'index');
      history.pushState({
        page: url.replace('home','index')
      }, "title 1", url.replace("chunks/", "").replace('home','index'));

      client.open('GET', url);
      client.send();
      document.querySelector('.loading-screen').classList.remove('disabled');
      window.scroll({
 top: 0, 
 left: 0, 
 behavior: 'smooth' 
});
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
  if ( event.state ) {
    var id = event.state.page.replace('chunks/',"").replace(".html","");
    let sections = document.querySelectorAll('section');
      for (let i = 0; i < sections.length; i++) {
      sections[i].classList.add('hide');
    }
    id = id.includes('index') ? 'home' : id;
    document.querySelector('#'+id).classList.remove('hide');
  }
};


function anchorLinkHandler(e) {
    const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);

    e.preventDefault();
    const targetID = this.getAttribute("href");
    const targetAnchor = document.querySelector(targetID);
    if (!targetAnchor) return;
    const originalTop = distanceToTop(targetAnchor);

    window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });

    const checkIfDone = setInterval(function() {
        const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
        if (distanceToTop(targetAnchor) === 0 || atBottom) {
            targetAnchor.tabIndex = "-1";
            targetAnchor.focus();
            window.history.pushState("", "", targetID);
            clearInterval(checkIfDone);
        }
    }, 100);
}

const linksToAnchors = document.querySelectorAll('a[href="#contato"]');

linksToAnchors.forEach(each => (each.onclick = anchorLinkHandler));

// it could probably work in two dimensions too... that'd be kinda cool.

var form =document.querySelector('#contato');
var inputs = form.querySelectorAll('input');
for (var i = 0; i < inputs.length; i++) {
   inputs[i].addEventListener('blur', (e) => {
      console.log(e.target.validity);
      if (!e.target.validity.valid){
         e.target.classList.add('error');
      }else{
         e.target.classList.remove('error');
      }
   });
   inputs[i].addEventListener('keyup', (e) => {
      if (!e.target.validity.valid){
         e.target.classList.remove('error');
      }
   });
   inputs[i].addEventListener('focus', (e) => {
    document.querySelector(".form-info").classList.remove('active');
   });
}
document.querySelector(".form-info-ico").addEventListener("click", (e) =>{
  console.log(document.querySelector(".form-info"));
  if(document.querySelector(".form-info").classList.contains('active')){
    document.querySelector(".form-info").classList.remove('active');
  }else{
    document.querySelector(".form-info").classList.add('active');
  }
});


