$('#loginform').submit(function (e) {
  e.preventDefault()
  $.ajax({
    url: 'http://localhost:3000/auth/login',
    type: 'POST',
    data: $(this).serialize(),
    dataType: 'json',
    success: function (msg) {
      console.log(msg)
      if (msg.err === 'wrong password') {
        swal('oops', 'your password is wrong !', 'warning')
      }else if (msg.usernotfound) {
        swal('oops', 'Username not found !', 'warning')
      }else {
        localStorage.setItem('token', msg.token)
        localStorage.setItem('username', msg.username)
        window.location.href = 'http://127.0.0.1:8080/home.html'
      }
    },
    error: function (err) {
      console.log(err)
    }
  })
})

$('#registerform').submit(function (e) {
  e.preventDefault()
  console.log($(this).serialize())

  $.ajax({
    url: 'http://localhost:3000/auth/register',
    type: 'POST',
    data: $(this).serialize(),
    dataType: 'json'
  }).done(function (msg) {
    swal('Good job!', 'Successfull registered ! please login now', 'success')
  }).fail(function (err) {
    console.log(err)
  })
})
