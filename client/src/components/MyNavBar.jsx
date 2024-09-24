import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import Logo from '../assets/aesthetic-image.avif'


function MyNavBar(props) {

  return (
    <>
    <Navbar sticky="top">
      <Container>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          tracking the  most endangered species:  '
          </Navbar.Text>
          <Navbar.Text>
          /ɔːˈθɛntɪk/  /ˈhjuːmənz/'
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default MyNavBar;