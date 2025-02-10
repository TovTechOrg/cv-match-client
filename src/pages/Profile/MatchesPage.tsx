import axios from 'axios';
import { create } from 'domain';
import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'reactstrap';
import { text } from 'stream/consumers';
import { number } from 'yup';

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
  title: string,
  created_at: string,
  content: IMatch[],
}

interface IInput {
  id: string,
  type: string,
  name: string,
  value: string,
}



export const MatchesPage = () => {




  const monthsStrings = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getMatches = new Promise((resolve, reject) => {
    const authUserStr = sessionStorage.getItem('authUser');
    const authUserJson = JSON.parse(authUserStr || '{}');
    axios.post<IMatch>('http://localhost:5000/api/matches', authUserJson, {
      headers: {
        'Content-Type': 'application/json',
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






  const [matches, setMatches] = useState<IMatch>();
  const [reports, setReports] = useState<IReport>();
  const [pageObject, setPageObject] = useState<IPageObject[]>([]);
  //
  //const [textBoxesCount, setTextBoxesCount] = useState(0);
  const [textBoxesValues, setTextBoxesValue] = useState<IInput[]>([]);
  const [commentsBoxesValues, setTextCommentsValue] = useState<IInput[]>([]);

  let initCandidatePos = 0;

  //
  const buildPageObject = () => {

    const initPos = 0;
    objToArr(reports!.job_title).map((item, idx) => {
      let header = { 
        type: 'header', 
        title: `${item} - job ${objToArr(reports!.id)[idx]}`,
        created_at: objToArr(reports!.created_at)[idx] as string,
        content: [] as IMatch[] 
      };
      
      const candidatesNum = objToArr(reports!.cvs)[idx] as number;
      

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
            value: '',
          };
          setTextBoxesValue(prev => [...prev, inputUserScore]);
          const inputComments: IInput = {
            id: `id-${i}`,
            type: 'text',
            name: `input-comments-${i}`,
            value: '',
          };        
          setTextCommentsValue(prev => [...prev, inputComments]);

        header.content.push(candidateRow);
      }

      initCandidatePos += candidatesNum;      
      setPageObject(prev => [...prev, header]);

    })
  };



  // TODO: handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number, type: string) => {
    switch(type) {
      case 'text':
        textBoxesValues[idx].value = e.target.value;
        setTextBoxesValue([...textBoxesValues, textBoxesValues[idx]]);
        break;
      case 'comments':
        commentsBoxesValues[idx].value = e.target.value;
        setTextCommentsValue([...commentsBoxesValues, commentsBoxesValues[idx]]);
        break;
    }

  }









  
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
  
  
  
  return (
    <React.Fragment>
      <div className="page-content">
        <div>{textBoxesValues.length}</div>
        <Container fluid>
          <Row>
            <h1>Matches Page</h1>
          </Row>
          {pageObject.map((item1, idx1) => (
            <Row key={idx1}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th colSpan={6}>{item1.title}</th>
                  </tr>
                  <tr>
                    <th colSpan={6}>{createAtToString(item1.created_at as any)}</th>
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
                      <td><input type="text" name={`input-user-score-${idx1}-${idx2}`} id={item2.idx.toString()} value={textBoxesValues[item2.idx].value} onChange={(e) => handleChange(e,item2.idx,"text")}/></td>
                      <td><input type="text" name={`input-comments-${idx1}-${idx2}`} id={item2.idx.toString()} value={commentsBoxesValues[item2.idx].value} onChange={(e) => handleChange(e,item2.idx,"comments")}/></td>
                      <td>ACTIONS</td>
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