import react,{useState} from 'react';
import {Tab,Tabs,Form,Button,Table} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import {updateMembers} from '../Actions/actions';
import './ChitDetail.css';
import axios from 'axios';
const ChitDetail=(props)=>{
   console.log(props.info);
    const Customers = useSelector(state => state.Customers);
    const [members,setMembers]=useState([]);
    const  dispatch = useDispatch();
    const [selectedCustomer,setSelectedCustomer]=useState('');
    const handleAdd=()=>{
        axios.post("http://localhost:5001/api/addMember",{chit_id:props.info._id,customer_id:selectedCustomer})
			.then((res) => {
                if(res.data.status=="success"){
                 dispatch(updateMembers({chit_members:res.data.ChitMembers,chit_id:props.info._id}));
                }
				
             else {
					alert(res.data.message);
				}
			})
			.catch();
        axios.post("http://localhost:5001/api/addChit",{customer_id:selectedCustomer,chit_id:props.info._id} )
			.then((res) => {
                if(res.data.status=="success"){
                    console.log("hello");
                }
				
             else {
					alert(res.data.message);
				}
			})
			.catch();
    }
   console.log(Customers);
    return(
        <div className="chit_details_card">
             <Tabs fill defaultActiveKey="payments" id="uncontrolled-tab-example">
                <Tab eventKey="payments" title="Enroll Payments">
                    
                </Tab>
                <Tab eventKey="transactions" title="Transactions">
                    
                </Tab>
                <Tab eventKey="dues" title="Due List" >
                   
                </Tab>
                 <Tab eventKey="add" title="Add Members" >
                    <div className="add_members">
                        <div className="add_top_section">
                      <Form.Control 
                        as="select" 
                        className="dropdown"
                        value={selectedCustomer}
                        onChange={e=>
                            setSelectedCustomer(e.target.value)
                        }
                      >
                        <option>Select User</option>
                        {
                            Customers.map((cust)=>(
                                <option value={cust._id}>{cust.CustomerName}</option>
                            ))
                        }
                     </Form.Control>
                     <Button className="btn_add" variant="outline-info" onClick={handleAdd}>Add Customer</Button>
                     </div>
                     <div className="add_bottom_section">
                          <Table responsive="sm" striped borderd hover >
                            <thead>
                                <tr>
                                    <th>Member Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   props.info.ChitMembers.map((cust)=>(
                                        <tr>
                                            <td>{cust}</td>
                                            <td><Button variant="outline-danger" size="sm">Remove From Chit</Button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                     </div>
                   </div>
                </Tab>
                </Tabs>
        </div>
    )
}
export default ChitDetail;