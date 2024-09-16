import logo from "../assets/images/note-book-logo.png";

function NavBar() {
  return (
    <nav>
      <div>
        <img src={logo} alt="notebook-logo" />
      </div>
      <div>
        <ul>
          <li>username</li>
          <li>log out</li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
