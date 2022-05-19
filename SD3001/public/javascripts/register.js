async function register() {
  try {
    let inputData = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      pass: document.getElementById("pass").value,
    };

    if(inputData.nome == '' ||inputData.email == ''||inputData.pass == ''){
      throw Error ('Preencha todos os campos')
    }
      
      let pessoa = await $.ajax({
      url: "/api/pessoas/register",
      method: "post",
      dataType: "json",
      data: JSON.stringify(inputData),  
      contentType: "application/json",
    });
    sessionStorage.setItem("PessoaId", pessoa.pessoa_id);
    alert("Já pode efetuar o login");
    window.location = "login.html";
  } catch (err) {
    document.getElementById("msg").innerText = err.message;
  }
  }
