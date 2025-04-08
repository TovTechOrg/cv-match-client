import React from 'react';
import { Container } from 'reactstrap';
import Section from './Section';


const ProjectOverview = () => {
  document.title="Project Overview | PythiaMatch - AI for recruiters";

    return (
        <React.Fragment>
            <div className="page-content">                
                <Container fluid>                    
                <Section />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ProjectOverview;