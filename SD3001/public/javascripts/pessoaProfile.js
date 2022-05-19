var PessoaId = sessionStorage.getItem("PessoaId");
var AdminId = sessionStorage.getItem("AdminId");
var monitor = sessionStorage.getItem("monitorId");

window.onload = async function () {
    try {
  
      let html10 = `<ul class="navbar-nav ms-auto">
        <li class="nav-item mx-3">
        <a class="nav-link text-white" href="/campos.html"
          >CAMPOS</a
        >
        </li>
        <ul class="navbar-nav ms-auto">
        <li class="nav-item mx-3">
        <a class="nav-link text-white" href="/CamposMap.html"
          >CAMPOS MAP</a
        >
        </li>
        <li class="nav-item mx-3">
        <a class="nav-link text-white" href="/Contactos.html"
          >CONTACTOS</a
        >
        </li>`
  
    if(PessoaId){
      html10 += `
        <li class="nav-item mx-3">
        <a class="nav-link text-white" href="/pessoaProfile.html"
          >PERFIL</a
        >
        </li>
        <li class="nav-item mx-3">
        <a class="nav-link text-white" onclick="logout()">LOGOUT
        </li>`
    }

    else{
        html10 += `
        </li>
        <li class="nav-item mx-3">
        <a class="nav-link text-white" href="/login.html"
        >LOGIN</a
        >
        </li>
        <li class="nav-item mx-3">
        <a class="nav-link text-white" href="/register.html"
        >REGISTAR</a
        >
        </li>
        </ul>`
    }
  
      document.getElementById("navbarNav").innerHTML = html10;
  
      let pessoa = await $.ajax({
        url: `/api/pessoas/${PessoaId}`,
        method: "get",
        dataType: "json",
      });
      
      if(pessoa.pessoa_secret == null){
      let html = `<div class="card text-center shadow" style="width: 25rem;">
            <div class="card-body">
                <h5 class="card-title text-capitalize">${pessoa.pessoa_nome}</h5>
                <hr/>
                <p class="card-text"><b>Email:</b> ${pessoa.pessoa_email}</p>
                <button onclick="ativar()"> Ativar 2FA </button>
            </div>
                </div>`
  
        document.getElementById("perfil").innerHTML = html;
        }

       else{
        let html = `<div class="card text-center shadow" style="width: 25rem;">
        <div class="card-body">
            <h5 class="card-title text-capitalize">${pessoa.pessoa_nome}</h5>
            <hr/>
            <p class="card-text"><b>Email:</b> ${pessoa.pessoa_email}</p>
            <p class="card-text"><b>Secret:</b> ${pessoa.pessoa_secret}</p>
        </div>
            </div>`
        document.getElementById("perfil").innerHTML = html;
       } 
       
    } catch (err) {
      console.log(err);
    }
};
  
  
async function ativar(){
  try {
    let obj = {PessoaId}
    let pessoa = await $.ajax({
      url: "/api/pessoas/ativar2fa",
      method: "put",
      dataType: "json",
      data: JSON.stringify(obj),
      contentType: "application/json",
    });
  } catch (err) {
        console.log(err);
    }
}
