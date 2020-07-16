import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { Row, Col, Form, Button, Image, Container} from "react-bootstrap"
//import CommentsList from './CommentsList'

class Edit extends Component {
   state = {
       email: "",
       name: "",
       dateofbirth: "",
       surname: "",
       id: "",
      
    }

   editstudent = async () =>{
    const update = {...this.state}
    

    const studentsResp = await fetch("http://localhost:3003/students/" + this.state.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(update)
    })
    const student = await studentsResp.json()
    console.log(student)
   }

   /* uploadCover = async () =>{ 
       const formData = new FormData()
       formData.append("avatar", this.state.selectedFile)

        const studentsResp = await fetch("http://localhost:3001/students/" + this.state.id + "/upload", {
            method: "POST",
            body: formData
    })

} */


    render() {
        const { name, email, surname, dateofbirth, id } = this.state
        return (
            <Container className="mt-5" >
            <Row>
                
                <Col className="mt-5" >
                <Form>
                        <Form.Group controlId="id">
                            <Form.Label>id</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => this.setState({ id: e.currentTarget.value })}
                                value={this.state.id}
                                disabled
                                placeholder="id - Unique Amazon ID" />
                        </Form.Group>
                        <Form.Group controlId="name">
                            <Form.Label>name</Form.Label>
                            <Form.Control
                                value={this.state.name}
                                onChange={(e) => this.setState({ name: e.currentTarget.value })}
                                type="text" placeholder="name" />
                        </Form.Group>
                        <Form.Group controlId="surname">
                            <Form.Label>surname</Form.Label>
                            <Form.Control
                                value={this.state.surname}
                                onChange={(e) => this.setState({ surname: e.currentTarget.value })}
                                type="text" placeholder="surname" />
                        </Form.Group>
                        <Form.Group controlId="name">
                            <Form.Label>email</Form.Label>
                            <Form.Control
                                value={this.state.email}
                                onChange={(e) => this.setState({ email: e.currentTarget.value })}
                                type="text" placeholder="email" />
                        </Form.Group>
                        <Form.Group controlId="dateofbirth">
                            <Form.Label>dateofbirth</Form.Label>
                            <Form.Control
                                value={this.state.dateofbirth}
                                onChange={(e) => this.setState({ dateofbirth: e.currentTarget.value })}
                                type="number" placeholder="dateofbirth" />
                        </Form.Group>
                        
                        <Button variant="success" onClick={this.editstudent}>Save Changes</Button>


                        {/* <input type="file" onChange={e => this.setState({ selectedFile: e.currentTarget.files[0]}) } /> */}
                        {/* <Button variant="success" onClick={this.uploadCover}>Upload cover</Button> */}
                    </Form>

                   {/*  <CommentsList id={this.props.match.params.id} /> */}
                </Col>

            </Row>
            </Container>
        )
    }
    
    componentDidMount = async ()=>{
        const id = this.props.match.params.id;
        const studentsResp = await fetch("http://localhost:3003/students/" + id)
        const student = await studentsResp.json()
        console.log("BEFORE COMPONENT DID MOUNT", this.state)

        this.setState({...student})
    }
}

export default withRouter(Edit)