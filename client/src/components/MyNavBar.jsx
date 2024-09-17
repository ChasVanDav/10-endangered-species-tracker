import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import Logo from '../assets/aesthetic-image.avif'


function MyNavBar(props) {

  return (
    <>
    <Navbar bg="light" variant="light" sticky="top">
      <Container>
        {/* <Navbar.Brand href="/">
      
        </Navbar.Brand> */}
        {/* <Nav.Link >Your Link</Nav.Link> */}
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Vanessa Davis</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default MyNavBar;