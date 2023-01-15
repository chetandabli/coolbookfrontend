const navbar = () => {
  return `<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="index.html">Cool Books</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="d-flex justify-content-between w-100">
          <div class="d-flex">
          <a class="nav-link active" aria-current="page" href="index.html">Home</a>
          <a class="nav-link" href="books.html">Books</a>
          <a class="nav-link" href="about.html">About</a>
          </div>
          <div class="d-flex" id="logoutorloginbutton">
          <a class="nav-link" href="login.html" >Login</a>
          <a class="nav-link" href="signup.html" >Signup</a>
          </div>
        </div>
      </div>
    </div>
  </nav>`;
};

export { navbar };
