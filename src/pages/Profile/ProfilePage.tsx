import axios from "axios";
import { useEffect, useState } from "react";


interface IProfileData {
    username: string,
    email: string,
    jobs: IJob[]
}

interface IJob {
    job_id: string,
    job_title: string
}


const ProfilePage = () => {

    //
    const authUserStr = sessionStorage.getItem('authUser');
    const authUserJson = JSON.parse(authUserStr || '{}');

    const [profileData, setProfileData] = useState<IProfileData>({ "username": "", "email": "", "jobs": [] as IJob[]});

    useEffect(() => {
        
        axios.post<IProfileData>('http://localhost:5000/api/profile', authUserJson, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authUserJson.access_token}`
            }
        }).then((res) => {
            setProfileData(res.data)
            alert(profileData.email);
        }).catch(error => {
            console.error(error)
        })

    }, [])




    return (
        <>
            <div className='page-content'>I'm the Profile upload page</div>

            <form>
                <select>
                    <option value="None">New job</option>
                    {profileData && profileData.jobs.map((job, index) => (
                        <option key={index} value={job.job_id}>
                            {job.job_title}
                        </option>
                    ))}
                </select>
            </form>
        </>
    )
}

export default ProfilePage;