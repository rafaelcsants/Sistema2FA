async function mostrarCodigo() {
  try {
    let secret = document.getElementById('secret').value;

    let token = await $.ajax({
      url: `/api/pessoas/displaytoken?secret=${secret}`,
      method: "get",
      dataType: "json",
    });


    document.getElementById("token").innerHTML = token;

  } catch (err) {
    document.getElementById("msg").innerText = err.responseJSON.msg;
  }
}

setInterval(mostrarCodigo, 2000);
