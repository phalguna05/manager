import react from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const NavBar=()=>{
    const history=useHistory();
    return(
        <Navbar className="navbar" bg="dark" variant="dark" expand="lg" >
           
            <Navbar.Brand style={{fontFamily:'"Times New Roman", Times, serif',fontWeight:'bold',cursor:'pointer'}}className="brand" onClick={()=>history.push('/Dashboard')}>Chit Manager</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="mr-2" id="basic-navbar-nav">
                <Nav style={{marginTop:'5px'}}className="mr-auto">
                <Nav.Link  onClick={()=>history.push('/AddCustomers')}>Add Customers</Nav.Link>
                <Nav.Link  onClick={()=>history.push('/Templates')}>Templates</Nav.Link>
                <Nav.Link  href="#">Logout<ExitToAppIcon fontSize="small"/></Nav.Link>
                </Nav>
            </Navbar.Collapse>
            
        </Navbar>
    )
}
export default NavBar;