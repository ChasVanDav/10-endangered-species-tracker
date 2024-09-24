import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function MyNavBar(props) {
  return (
    <>
      <Navbar sticky="top" style={{ backgroundColor: 'bisque' }}>
        <Container>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              tracking the most endangered species: '
            </Navbar.Text>
            <Navbar.Text>
              /ɔːˈθɛntɪk/  /ˈhjuːmənz/'
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavBar;
