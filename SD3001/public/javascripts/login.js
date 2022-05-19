var PessoaId;

async function login() {
  try {
      let obj = {
      email: document.getElementById("email").value,
      pass: document.getElementById("pass").value,
    };
    
    let pessoa = await $.ajax({
      url: "/api/pessoas/login",
      method: "post",
      dataType: "json",
      data: JSON.stringify(obj),
      contentType: "application/json",
    });

    sessionStorage.setItem("PessoaId", JSON.stringify(pessoa.pessoa_id));
    PessoaId = sessionStorage.getItem("PessoaId", JSON.stringify(pessoa.pessoa_id));

    let pessoas = await $.ajax({
      url: `/api/pessoas/${PessoaId}`,
      method: "get",
      dataType: "json",
      contentType: "application/json",
    });
    
  if(pessoas.pessoa_secret == null){
    window.location = "pessoaProfile.html";
  }
  else{
    let tokenInput = prompt("Please enter your token:");

    if(pessoas.pessoa_token == tokenInput){
      window.location = "pessoaProfile.html";
    }
    else{
      alert("ERRRO")
    }
  }

  } catch (err) {
    document.getElementById("msg").innerText = err.responseJSON.msg;
  }
}
