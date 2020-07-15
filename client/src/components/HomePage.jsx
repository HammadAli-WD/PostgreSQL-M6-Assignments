import React, { Component } from 'react'
//import SingleBook from "./SingleBook"
import { Col,Table, Container, Row, ListGroup } from 'react-bootstrap'

class HomePage extends Component {
   state = {
       students: []
   }

    render() {
        return (
            <Container className ="mt-5" >
                <Row>
                <Col >

                    <Table striped bordered hover>
                    <thead>
                        <tr>                        
                        <th>First Name</th>
                        <th>Last Name</th>
                    
                        <th>Email</th>
                        <th>Date of Birth</th>
                        </tr>
                    </thead>
                {this.state.students.map(student => 
                
                    <tbody>
                        <tr>
                        
                        <td>{student.name}</td>
                        <td>{student.surname}</td>
                        <td>{student.email}</td>
                        <td>{student.dateofbirth}</td>
                        </tr>                       
                    </tbody>  
               
                )} 
                 </Table>
                 </Col>
                </Row>
            </Container>
        )
    }

    componentDidMount = async () => {
        const studentsResp = await fetch("http://localhost:3003/students")
        const students = await studentsResp.json()
        console.log(students)
        this.setState({
            students: students
        })
    }
}

export default HomePage