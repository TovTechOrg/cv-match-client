import axios from 'axios';
import { ConfirmModal } from 'Components/Common/ConfirmModal';
import { ReportModal } from 'Components/Common/ReportModal';
import React, { useEffect, useState } from 'react';
import { Container, Row, Table } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import './../../assets/css/styles.css';
import {showReportModalSVG, downloadReportSVG, deleteSVG, downloadCVSVG} from 'Components/SVG/index';


// interfaces:
interface IMatch {
      idx: number,
      id: string;
      created_at: string;
      candidate_name: string;	
      MMR: string;
      score: string;
      candidate_report: string;
      report_id: string;
      cv_text: string;
      cv_file_s3_key: string;
      report_file_s3_key: string;
      user_score: string;
      comments: string;
}

interface IReport {
    user_id: {},
    created_at: {},
    cvs: {},
    id: {},
    job_title: {},
    job_desc: {},
}

interface IPageObject {
  type: string,
  id: string,
  title: string,
  created_at: string,
  job_desc: string,
  content: IMatch[],
}

interface IInput {
  id: string,
  type: string,
  name: string,
  value: string,
}



const MatchesPage = () => {



// functions:
  const monthsStrings = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getMatches = new Promise((resolve, reject) => {

    //
    const authUserStr = sessionStorage.getItem('authUser');
    const authUserJson = JSON.parse(authUserStr || '{}');


    axios.post<IMatch>('http://localhost:5000/api/matches', authUserJson, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authUserJson.access_token}`
      }}).then(
        (res) => {
          // setMatches(res as any);
          resolve(res);
        }
      );
  })
    
  const getReports = new Promise((resolve, reject) => {
    const authUserStr = sessionStorage.getItem('authUser');
    const authUserJson = JSON.parse(authUserStr || '{}');
    axios.post<IReport>('http://localhost:5000/api/reports', authUserJson, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authUserJson.access_token}`
      }}).then((res) => {
        // setReports(res as any);
        resolve(res);
      });
  })

  const objToArr = (obj: {}) => {
    const result = []

    for (const [key, value] of Object.entries(obj)) {
      result.push(value)
    }

    return result;
  }

  const createAtToString = (num: number) => {
    const formattedDate = new Date(num) as Date;
    const m = monthsStrings[formattedDate.getMonth() + 1];
    const d = formattedDate.getDate();
    const y = formattedDate.getFullYear();
    const ampm = formattedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit",hour12: true });
    const formattedDateString = `${m} ${d}, ${y} ${ampm}`;
    return formattedDateString;
  }

  // hooks:
  const [matches, setMatches] = useState<IMatch>();
  const [reports, setReports] = useState<IReport>();
  const [pageObject, setPageObject] = useState<IPageObject[]>([]);
  const [textBoxesValues, setTextBoxesValue] = useState<IInput[]>([]);
  const [commentsBoxesValues, setTextCommentsValue] = useState<IInput[]>([]);
  const [showSpinner, setShowSpinner] = useState(false);
  let scoreTimeoutPointer: NodeJS.Timeout;
  let commentTimeoutPointer: NodeJS.Timeout;

  let initCandidatePos = 0;

  //
  const buildPageObject = () => {

    const initPos = 0;
    objToArr(reports!.job_title).map((item, idx) => {
      let header = { 
        type: 'header', 
        id: objToArr(reports!.id)[idx] as string,
        title: `${item} - job ${objToArr(reports!.id)[idx]}`,
        created_at: objToArr(reports!.created_at)[idx] as string,
        job_desc: objToArr(reports!.job_desc)[idx] as string,
        content: [] as IMatch[] 
      };
      
      // TODO: change enum from reading by cvs datacell to counting number of matching reportIDs
      // const candidatesNum = objToArr(reports!.cvs)[idx] as number;
      // find the reportID of the current job
      const reportID = objToArr(reports!.id)[idx];
      // find the right matches for the current job
      const candidatesNum = objToArr(matches!.report_id).filter((reportIDItem, idx) => reportIDItem === reportID).length;

      // iterate over matches
      for (let i = initCandidatePos; i < candidatesNum + initCandidatePos; i++) {
        const candidateRow: IMatch = {
          idx: i,
          id: objToArr(matches!.id)[i] as string,
          created_at: objToArr(matches!.created_at)[i] as string,
          candidate_name: objToArr(matches!.candidate_name)[i] as string,
          MMR: objToArr(matches!.MMR)[i] ? "true" : "false",
          score: objToArr(matches!.score)[i] as string,
          candidate_report: objToArr(matches!.candidate_report)[i] as string,
          report_id: objToArr(matches!.report_id)[i] as string,
          cv_text: objToArr(matches!.cv_text)[i] as string,
          cv_file_s3_key: objToArr(matches!.cv_file_s3_key)[i] as string,
          report_file_s3_key: objToArr(matches!.report_file_s3_key)[i] as string,
          user_score: objToArr(matches!.user_score)[i] as string,
          comments: objToArr(matches!.comments)[i] as string,
        }

        const inputUserScore: IInput = {
          id: `id-${i}`,
          type: 'text',
          name: `input-user-score-${i}`,
          value: candidateRow.user_score,
        };
        setTextBoxesValue(prev => [...prev, inputUserScore]);
        const inputComments: IInput = {
          id: `id-${i}`,
          type: 'text',
          name: `input-comments-${i}`,
          value: candidateRow.comments,
        };        
        setTextCommentsValue(prev => [...prev, inputComments]);

        header.content.push(candidateRow);
      }

      initCandidatePos += candidatesNum; 
      setPageObject(prev => [...prev, header]);

    })
  };



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string, idx: number, type: string) => {

    
    switch(type) {
      case 'text':
          clearTimeout(scoreTimeoutPointer);
          textBoxesValues[idx].value = e.target.value;
          setTextBoxesValue([...textBoxesValues, textBoxesValues[idx]]);
          
          scoreTimeoutPointer = setTimeout(() => {          
            // save comment to db
            axios.put('http://localhost:5000/api/update_score', {
              "id": id,
              "score": e.target.value,
            })
          }, 5000)
          
        break;
          case 'comments':
          clearTimeout(commentTimeoutPointer);
          commentsBoxesValues[idx].value = e.target.value;
          setTextCommentsValue([...commentsBoxesValues, commentsBoxesValues[idx]]);

          
          commentTimeoutPointer = setTimeout(() => {          
            // save comment to db
            axios.put('http://localhost:5000/api/update_comment', {
              "id": id,
              "comment": e.target.value,
            })
          }, 5000)

        break;
    }


  }

  const download_s3_report = async (id: string) => {
    const url = 'http://localhost:5000/api/s3_get_report?id=' + id;
      try {
          const response = await fetch(url, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  // Add any required auth headers here
              }
          });
      
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }

          // Get the blob from response
          const blob = await response.blob();
      
          // Create download link
          const downloadUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = 'report.docx'; // Set desired filename
      
          // Trigger download
          document.body.appendChild(link);
          link.click();
      
          // Cleanup
          document.body.removeChild(link);
          window.URL.revokeObjectURL(downloadUrl);

      } catch (error) {
          console.error('Error downloading report:', error);
      }
  };

  const download_s3 = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/s3_get_cv`, {
        params: { id },
        responseType: 'blob'
      });

      const blob = new Blob([response as any]); // new Blob([response.data]);
      const extension = '.docx'; // response.headers['content-type'] === 'application/pdf' ? '.pdf' : '.docx';
      const fileName = `cv${extension}`;
    
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
    
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(downloadUrl);

    } catch (error) {
      alert("CV file not found in database!");
    }
  };

  const deleteMatchConfirmHandler = async (id: string, idx1: number, idx2: number) => {
    setShowSpinner(true);
    const response = await axios.post('http://localhost:5000/api/delete_match', { id });

    let newContent = pageObject[idx1].content.filter((item, idx) => idx !== idx2);
    pageObject[idx1].content = newContent;
    setPageObject([...pageObject]);
    setShowSpinner(false);
  }

  const deleteJobConfirmHandler = async (id: string, idx1: number) => {
    setShowSpinner(true);
    const response = await axios.delete('http://localhost:5000/api/delete_job', { data: { id }});

    let newContent = pageObject.filter((item, idx) => idx !== idx1);
    setPageObject([...newContent]);

    setShowSpinner(false);
    // navigate('/profile');
  }

  // useEffects:
  useEffect(() => {
    Promise.all([getMatches, getReports])
    .then((values) => {
      const matchesData = values[0] as any;
      const reportsData = values[1] as any;
      
      setMatches(matchesData);
      setReports(reportsData);
    });
  }, []);
  
  // Separate useEffect to handle buildPageObject
  useEffect(() => {
    if (matches && reports) {
      buildPageObject();
    }
  }, [matches, reports]);
  
  function showDeleteMatchSVG(): React.ReactNode {
    throw new Error('Function not implemented.');
  }

  return (
    <React.Fragment>
      
      { showSpinner && <div className='spinner-container'>
        <Spinner animation="grow" variant='primary' />
      </div>}

      <div className="page-content">
        {/* <div>{textBoxesValues.length}</div> */}
        <Container fluid>
          <Row>
            <h1>Matches Page</h1>
          </Row>
          {pageObject.map((item1, idx1) => (
            <Row key={idx1}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th colSpan={6}>
                      <h3>
                        {item1.title}
                      </h3>
                      <div className='actions-container'>
                        {createAtToString(item1.created_at as any)}
                        <ReportModal 
                          showModal={false} 
                          bodyText={item1.job_desc} 
                          initSVG={showReportModalSVG()} 
                          isConfirm={false} title={"None"}
                        />
                      
                      {/* <Button onClick={() => removeJob(idx1)}>delete job</Button> */}

                      <ConfirmModal 
                            showModal={false} 
                            initSVG={ deleteSVG() }
                            title='Delete Job'
                            bodyText={"Do you confirm to delete the current job ?"} 
                            matchId={item1.id} 
                            idx1={idx1}
                            idx2={0}
                            approveAnswerTitle='Yes, delete it'
                            declineAnswerTitle='No, keep it'
                            confirmHandler={deleteJobConfirmHandler}
                            />
                        </div>
                    </th>
                  </tr>
                  <tr>
                    <th>#</th>
                    <th>Candidate Name</th>
                    <th>MMR</th>
                    <th>Score</th>
                    <th>User Score</th>
                    <th>Comments</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {item1.content.map((item2, idx2) => (
                    <tr key={idx1-idx2}>
                      <td>{item2.id}</td>
                      <td>{item2.candidate_name}</td>
                      <td>{item2.MMR}</td>
                      <td>{item2.score}</td> 
                      <td><input type="text" name={`input-user-score-${idx1}-${idx2}`} id={item2.idx.toString()} value={textBoxesValues[item2.idx].value} onChange={(e) => handleChange(e,item2.id,item2.idx,"text")}/></td>
                      <td><input type="text" name={`input-comments-${idx1}-${idx2}`} id={item2.idx.toString()} value={commentsBoxesValues[item2.idx].value} onChange={(e) => handleChange(e,item2.id,item2.idx,"comments")}/></td>
                        <td className='actions-container'>
                          <ReportModal
                            initSVG={ showReportModalSVG() }
                            isConfirm={false}
                            showModal={false} 
                            bodyText={item2.candidate_report}
                            title='View Report'
                         />
                          <Button onClick={() => download_s3_report(item2.id)} variant="primary" title="Download Report" className='ml:2'>{downloadReportSVG()}</Button>
                          <Button onClick={() => download_s3(item2.id)} variant="primary" title="Download CV">{downloadCVSVG()}</Button>
                          <ConfirmModal 
                            showModal={false} 
                            initSVG={ deleteSVG() }
                            title='Delete Match'
                            bodyText={"Do you confirm to delete the current match ?"} 
                            matchId={item2.id} 
                            idx1={idx1} 
                            idx2={idx2}
                            approveAnswerTitle='Yes, delete it'
                            declineAnswerTitle='No, keep it'
                            confirmHandler={deleteMatchConfirmHandler}
                            />
                        </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>
          ))}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default MatchesPage;