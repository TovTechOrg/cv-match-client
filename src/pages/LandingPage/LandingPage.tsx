import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Globe, MessageCircle, SquareCheckBigIcon } from "lucide-react";
import Contact from "./Contact";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "./page.css";
import PythiaMatchToturialVideo from "../../assets/videos/video.mp4";
import VideoPlayer from "./VideoPlayer";
import WhatsAppButton from "./WhatsappButton";

function LandingPage() {
  return (
    <>
      <Container fluid className="mt-3 bg-gradient-custom" style={{}}>
        {/* <NavBar /> */}
        <div className="d-flex flex-column align-items-center mt-5 gap-5 py-4">
          <div className="my-5">
            <h2 className="text-center">
              Pythia<span className="text-primary">Match</span>
            </h2>
            <h2>Ai for Headhunters</h2>
          </div>
          <div className=" d-flex justify-content-center">
            <h3 className="text-center " style={{ width: "54%" }}>
              PythiaMatch helps you find the perfect candidate faster Deliver
              fast valuable for your clients!
            </h3>
          </div>
          <div className="">
            {/* <Button  className="px-4 fs-4 button">
              start your free trial today!
            </Button> */}
            <WhatsAppButton />
          </div>
          <Container>
            {/* <iframe
              src="https://www.youtube.com/embed/tgbNymZ7vqY"
              className="w-100 "
              height={700}
            ></iframe> */}
            {/* <video width="700" className="w-100" controls>
              <source src={PythiaMatchToturialVideo} type="video/mp4" />
              
              Your browser does not support the video tag.
            </video> */}
            <VideoPlayer video={PythiaMatchToturialVideo} />
          </Container>
          <div className="d-flex gap-4 my-5 flex-column align-items-center ">
            <h2 className="text-center fs-1 w-50 ">
              Ai
              <span className="text-primary text-warp">
                {" "}
                for smarter Hiring!
              </span>
            </h2>
            <p className="text-white text-center" style={{ width: "57%" }}>
              Find the perfect candidate faster. Maximum value for your clients.
            </p>
          </div>

          <Container className="py-4">
            <Row className="g-4 justify-content-center">
              <Col md={4} sm={12} className="d-flex">
                <Card
                  className="p-4  shadow-lg border-0 flex-fill"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                >
                  <Card.Body>
                    <Card.Title className="d-flex align-items-center justify-content-center gap-2 text-primary">
                      <Globe /> Sourcing
                    </Card.Title>
                    <Card.Text className="mt-3 text-dark">
                      Instantly identify the most relevant candidates based on
                      your specific requirements. Our AI-powered search engine
                      goes beyond keyword matching to find the perfect fit,
                      eliminating the need for manual resume screening.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              

              <Col md={4} sm={12} className="d-flex">
  <Card
    className="p-4 shadow-lg border-0 flex-fill"
    style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
  >
    <Card.Body>
      <Card.Title className="d-flex align-items-center justify-content-center gap-2 text-primary mb-3">
        <SquareCheckBigIcon /> Reports
      </Card.Title>
      <Card.Text className="mt-3 text-dark">
        Get comprehensive candidate profiles tailored to the
        position you're filling. Pythia Match provides:
      </Card.Text>
      <ul className="mt-3 ps-1 fs-4 text-dark">
        <li className="mb-2">Match Score</li>
        <li className="mb-2">Strengths & Weaknesses</li>
        <li className="mb-2">Requirement Matching</li>
        <li className="mb-2">Interview Questions</li>
      </ul>
    </Card.Body>
  </Card>
</Col>

              <Col md={4} sm={12} className="d-flex">
                <Card
                  className="p-4  shadow-lg border-0 flex-fill"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                >
                  <Card.Body>
                    <Card.Title className="d-flex align-items-center justify-content-center gap-2 text-primary">
                      <MessageCircle /> Outreach
                    </Card.Title>
                    <Card.Text className="mt-3 text-dark">
                      Automate your candidate communication. Pythia Match
                      reaches out to potential candidates, gauges their
                      interest, and qualifies them for you. All you have to do
                      is schedule the interview!
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          <Contact />
        </div>
      </Container>
      {/* <Footer /> */}
    </>
  );
}

export default LandingPage;
