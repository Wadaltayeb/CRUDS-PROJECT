let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let btn = document.getElementById('btn');
let search = document.getElementById('search');
let count = document.getElementById('count');
let category = document.getElementById('category');
let deletel = document.getElementById('delete');
let mood = "create";
let gol;
let sbtn = document.getElementById('Search By Title');
let sbtnl = document.getElementById('Search By Category');
let btnMood = 'title';


function sum() {
  if (price.value != ''){
    let reslut = (+price.value + +taxes.value + +ads.value) - +discount.value;
    
    total.innerHTML = reslut;
    total.style.background = '#040';
  }else{
    total.innerHTML = '';
    total.style.background = 'rgb(255,50,50)';
  }
}

let datapro;
if (localStorage.prodcute != null){
  datapro = JSON.parse(localStorage.prodcute)
}else{
  datapro = [];
}


btn.onclick = function read(){
  sum();
  let newdata = {
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase()
  }
  
  if (title.value != '' && price.value != '' && category.value != '' && newdata.count <= 100){
    if (mood === 'create'){
   if (newdata.count > 1){
     for (let i=0 ; i < newdata.count ; i++){
      datapro.push(newdata);
     }
   }else{
    datapro.push(newdata);
   }
  }else{
   datapro[gol] = newdata;
   count.style.display = "block";
   btn.innerHTML = 'Create';
   mood = 'create';
  }
  
  }else{
    cleardata();
  }
  
  
  
  localStorage.setItem('prodcute', JSON.stringify(datapro));
  
  cleardata()
  show()
  
}


/*if (datapro != ''){
  deletel.style.display = "block";
}else{
  deletel.style.display = "none";
}*/

deletel.onclick = function cleardata(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

function show(){
  let lable = "";
  
  for (let i = 0 ; i < datapro.length ; i++){
    lable += `
    <tr>
	      <td>${i+1}</td>
	      <td>${datapro[i].title}</td>
	      <td>${datapro[i].price
	      }</td>
	      <td>${datapro[i].taxes
	      }</td>
	      <td>${datapro[i].ads
	      }</td>
	      <td>${datapro[i].discount
	      }</td>
	      <td>${datapro[i].category
	      }</td>
	      <td><span onclick="updateData(${i})" id="up">update<span/></td>
	      <td><span onclick="deleteElm(${i})" id="de" >delete<span/></td>
	    </tr>
    `
  }
  document.getElementById('tbody').innerHTML = lable;
  let delbtn = document.getElementById('delete')
  if (datapro.length > 0){
    delbtn.innerHTML = `
     	  <button onclick="delall()">Delete All (${datapro.length})</button>
    `;
   
  }else{
    delbtn.innerHTML = "";
  }
     

}

show();
// delbtn.onClick = delall();

function deleteElm(i){
  datapro.splice(i,1);
  localStorage.prodcute = JSON.stringify(datapro);
  show();
}

function showBtn(id){
  if (id === 'search by title'){
   btnMood = 'title';
   search.placeholder = 'Search By Title';
 }else{
   btnMood = 'category';
   search.placeholder = 'Search By Category';
   
 }
 search.focus();
 search.value = '';
 show();
}
 
 function searchData(value){

let lable = '';
  if (btnMood == 'title'){
  
  for (let i=0;i < datapro.length; i++){
      
       if(datapro[i].title.includes(value.toLowerCase()))
       {
      lable += `
        <tr>
	          <td>${i+1}</td>
	          <td>${datapro[i]    .title}</td>
	          <td>${datapro[i]    .price
	          }</td>
	          <td>${datapro[i]    .taxes
	          }</td>
	         <td>${datapro[i]   .ads
	         }</td>
	         <td>${datapro[i]   .discount
	         }</td>
	         <td>${datapro[i]   .category
	         }</td>
	         <td><span  id="up"  onclick   ="updateData   (${i})"    >update<span/></td>
   	      <td><span id="de"    onclick   ="deleteElm(${i}   )" >delete   <span/></td>
	       </tr>
       `
       }
       
       
       
     }
     
     
   }else{
     for (let i=0;i < datapro.length; i++){
      
       if(datapro[i].category.includes(value.toLowerCase()))
       {
      lable += `
        <tr>
	          <td>${i+1}</td>
	          <td>${datapro[i]    .title}</td>
	          <td>${datapro[i]    .price
	          }</td>
	          <td>${datapro[i]    .taxes
	          }</td>
	         <td>${datapro[i]   .ads
	         }</td>
	         <td>${datapro[i]   .discount
	         }</td>
	         <td>${datapro[i]   .category
	         }</td>
	         <td><span  id="up"  onclick   ="updateData   (${i})"    >update<span/></td>
   	      <td><span id="de"   onclick   ="deleteElm(${i}   )" >delete   <span/></td>
	       </tr>
       `
       }
       
       
       
     }
   }
   
   document.getElementById('tbody').innerHTML = lable;
 }
 

function delall(){
  localStorage.clear();
  datapro.splice(0);
  show();
}

function updateData(i){
  title.value = datapro[i].title
  price.value = datapro[i].price
  taxes.value = datapro[i].taxes
  ads.value = datapro[i].ads
  discount.value = datapro[i].discount
  sum()
  count.style.display = "none"
  category.value = datapro[i].category
  btn.innerHTML = "Update";
  mood = 'update';
  gol = i;
  scroll({
    top:0,
    behavior:'smooth',
  })
  show();
}

