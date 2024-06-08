import { Button, Container, Nav, NavDropdown, Navbar as NavbarBs } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { getUser, logout, useFetchAuth } from '../FetchData';


export const Navbar = () => {

  const { authorized } = useFetchAuth()

  
  const handleLogout = () => {

    try {
      logout()
      location.assign('/login')
    } catch(err) {
      console.error('Error while logging out:', err);
    }

  }

  return <NavbarBs sticky='top' bg="dark" data-bs-theme="dark" className=' shadow-lg mb-3 pb-2'>
    <Container>
        <NavbarBs.Brand className='fs-3'>Auth.com</NavbarBs.Brand>
        <Nav className='ml-auto'>
            {!authorized ? (
            <NavDropdown
              id="nav-dropdown-dark-example"
              title='My Account'
              menuVariant="dark"
            >
              <NavDropdown.Item to="/login" as={NavLink} href="#action/3.3">Login</NavDropdown.Item>
              <NavDropdown.Item to="/signup" as={NavLink} href="#action/3.4">Sign Up</NavDropdown.Item>

            </NavDropdown>) : (
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="account"
                menuVariant="dark"
              >
                <NavDropdown.Item onClick={handleLogout} as={Button} href="#action/3.3">Sign out</NavDropdown.Item>

              </NavDropdown>
            )}
        </Nav>
        
        
    </Container>
  </NavbarBs>
}
