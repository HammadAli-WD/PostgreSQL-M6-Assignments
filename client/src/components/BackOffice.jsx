import React, { Component } from 'react'
import SingleStudInfo from "./SingleStudInfo"
import { Col, Container, Row, Button } from 'react-bootstrap'
import CreateStudInfo from './CreateStudInfo'

class BackOffice extends Component {
   state = {
    students: [],
       openModal: false
   }

    render() {
        return (
            <Container>
                <h1>Welcome to the backoffice <Button onClick={() => this.setState({ openModal: true})}>Create New</Button></h1>
                <CreateStudInfo show={this.state.openModal} 
                            onClose={() => this.setState({ openModal: false})}
                            onNewStudInfo={(StudInfo)=> this.setState({
                                students: this.state.students.concat(StudInfo),
                                openModal: false
                            })}
                            />
                <Row className="mt-5" >
                    
                {this.state.students.map(StudInfo => 
                <Col xs={6} md={4}>
                    <SingleStudInfo item={StudInfo}
                        onDelete={(id) => 
                            this.setState({
                            students: this.state.students.filter(StudInfo => StudInfo.id !== id)
                        }) }
                        
                 
                    /> 
                    </Col>
                )}
                
                </Row> 
            </Container>
        )
    }

    componentDidMount = async () => {
        const studentsResp = await fetch("http://localhost:3003/students")
        const students = await studentsResp.json()
        console.log('std', students)
        this.setState({
            students: students
        })
    }
}

export default BackOffice