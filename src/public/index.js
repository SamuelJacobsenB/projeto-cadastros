const searchInput = document.querySelector('input#search');
const cadList = document.querySelector('div.cadlist');
const cad = [...document.querySelectorAll('div.cad')];

searchInput.addEventListener('keydown',()=>{
    cadList.innerHTML = '';
    let searchCads = cad.filter(i => i.id.toLocaleLowerCase().includes(searchInput.value.toLocaleLowerCase()));
    searchCads.map((el)=>{
        cadList.appendChild(el);
    });
});