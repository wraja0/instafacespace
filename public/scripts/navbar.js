const list = document.querySelectorAll('.navlist');
const title = document.querySelector('.headtitle')
function activeLink() {
    list.forEach((item)=>
            item.classList.remove('active'));
        this.classList.add('active');
    }
list.forEach((item)=>
item.addEventListener('mouseover', activeLink));

const navSetIndex = (n)=> {
    list.forEach((item)=>{
        item.classList.remove('active')
    })
    list[n].classList.add('active') 
}
if (title.innerHTML === 'Create Card') {
    navSetIndex(1)
}