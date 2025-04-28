import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Card, CardBody, Spinner } from "react-bootstrap";
import logoLight from "../../assets/images/logo-pythiamatch.png";
import "../../assets/css/profile.css";


interface IProfileData {
    username: string,
    email: string,
    jobs: IJob[]
}

interface IJob {
    job_id: string,
    job_title: string
}

interface IAuthUser {
    access_token: string,
    login: string,
    user: {
        email: string,
        id: string,
        name: string,
    }
}

const ProfilePage = () => {

    //
    const [profileData, setProfileData] = useState<IProfileData | undefined>(undefined);
    const [authUser, setAuthUser] = useState<IAuthUser | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [mainFormData, setMainFormData] = useState(new FormData())

    //
    useEffect(() => {

        //
        const authUserStr = sessionStorage.getItem('authUser');
        if (authUserStr) {
            
            //
            const authUser: IAuthUser = JSON.parse(authUserStr!);
            
            //
            const fetchProfileData = async () => {
                try {
                    const response = await axios.post<IProfileData>('http://localhost:5000/api/profile', {}, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authUser!.access_token}`
                        }
                    });
                    
                    setProfileData(response.data);
                    setAuthUser(authUser)
                    setIsLoading(false);
                }
                catch (error) {
                    console.error(error);
                }
            };
            
            fetchProfileData();
        }

    }, []);



    //
    const formik = useFormik({
        initialValues: {
            jobDescriptionFile: null as File | null,
            cvFiles: null as File | null,
            jobId: '',
            language: ''
        },
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));

            // TODO: convert values JSON to form-data and send to backend
            const formData = mainFormData;
            formData.append('jobId', values.jobId);
            formData.append('language', values.language);

            // send to backend
            axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${authUser!.access_token}`
                }
            });
        },
    });

    if (isLoading) {
        //
        return (
            <div className="page-content">
                <div>Loading...</div>
            </div>
        )
    }

    //
    return (
        <div className="porfile-page page-content">

            <div className="mb-3">
            </div>
                <div>
                    <Container>
                        <Row>
                            <Col lg={12}>
                                    <div className="rounded-2 bg-light-subtle pt-1">
                                        
                                        <div className="d-flex flex-row justify-content-between navbar p-3 m-3">
                                            <div>
                                                <Button>View Matches</Button>
                                            </div>
                                            {authUser && <div title={authUser.user.email}>signed in as: {authUser.user.name}</div>}
                                        </div>


                                        <div className="d-flex flex-row justify-content-center">
                                            <img src={logoLight} alt="CV Matching App" height="140" />
                                        </div>
                                    </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={12}>
                                <div className="rounded-2 bg-light-subtle p-3">
                                    <div className="d-flex flex-row justify-content-center">
                                        <h1>CV Matching App</h1>
                                    </div>

                                    <div>
                                        <Form onSubmit={formik.handleSubmit} className="job-form">

                                            <Form.Group className="mb-3">
                                                <Form.Label>Job</Form.Label>
                                                <Form.Select id="jobId" name="jobId" onChange={formik.handleChange} value={formik.values.jobId}>
                                                    <option value='None'>New job</option>
                                                    {profileData && profileData.jobs.map((job, index) => (
                                                        <option key={index} value={job.job_id}>
                                                            {job.job_title} - {job.job_id}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>

                                            { 
                                                <Form.Group
                                                        className={ `mb-3 ${(formik.values.jobId === 'None' || formik.values.jobId === '') ? '' : 'hide-new-job'} `} >


                                                    <Form.Label>Upload a new Job description</Form.Label>
                                                    <Form.Control id="jobDescriptionFile" name="jobDescriptionFile" type="file" 
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                            if (e.currentTarget.files && e.currentTarget.files.length > 0) {
                                                                //
                                                                const newFormData = mainFormData;
                                                                newFormData.append('jobDescriptionFile', e.currentTarget.files[0])
                                                                setMainFormData(newFormData);
                                                        }
                                                    }} />
                                                </Form.Group>
                                            }

                                            <Form.Group className="mb-3">
                                                <Form.Label>CVs</Form.Label>
                                                <Form.Control id="cvFiles" name="cvFiles" type="file" multiple onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
                                                        //
                                                        const newFormData = new FormData();
                                                        for (let i = 0; i < e.currentTarget.files!.length; i++) {
                                                            newFormData.append('cvFiles', e.currentTarget.files[i])
                                                        }
                                                        setMainFormData(newFormData);
                                                    }
                                                }} />
                                            </Form.Group>                    

                                            <Form.Group className="mb-3 d-flex flex-row justify-content-end p-3">
                                                {/* <Form.Label>Language</Form.Label> */}
                                                <Form.Check id="english" type="radio" label="English" name="language" onChange={formik.handleChange} value="English" checked className="me-3"/>
                                                <Form.Check id="hebrew" type="radio" label="Hebrew" name="language" onChange={formik.handleChange} value="Hebrew" />
                                            </Form.Group>
                                            
                                            <div className="d-flex flex-row justify-content-center">
                                                <Button type="submit">Generate Matches</Button>
                                            </div>
                                        </Form>
                                    </div>

                                </div>
                            </Col>
                        </Row>

                    </Container>
                </div>


        </div>
    )

}

export default ProfilePage;