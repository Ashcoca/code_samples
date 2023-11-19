import styled from "styled-components";
import { mobile } from "../utilities/responsive";
import computer from "../assets/computer.svg";
import ScrollIndicator from "../components/ScrollIndicator";

const Container = styled.div`
  background-color: #ecf7e6;
  width: 100%;
  height: 100vh;
`;

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;

  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${mobile({ justifyContent: "flex-start", order: "2" })}
`;

const Button = styled.button`
  width: 250px;
  height: 60px;
  color: white;
  font-size: 28px;
  font-weight: 500;
  background-color: #5ec57d;
  border-radius: 35px;
  border: none;
  cursor: pointer;

  ${mobile({
    width: "200px",
    fontSize: "22px",
    height: "50px",
    borderRadius: "25px",
    margin: "40px 0",
  })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mobile({ alignItems: "flex-end", order: "1", marginBottom: "50px" })}
`;

const Image = styled.img`
  width: 75%;
`;

const HeaderText = styled.span`
  font-size: calc(30px + 1vw);
  font-weight: 600;
  width: 75%;
  color: #347472;
  padding-left: 10%;
  padding-bottom: 10%;

  ${mobile({ padding: "0", fontSize: "5vw", textAlign: "center" })}
`;

const Text = styled.span`
  font-size: calc(20px + 1vw);
  font-weight: 400;
  width: 75%;
  color: #347472;
  padding-left: 10%;
  padding-bottom: 10%;

  ${mobile({ padding: "0", fontSize: "5vw", textAlign: "center" })}
`;

const Bottom = styled.div`
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5vh;
  width: 100vw;
`;

const Landing = () => {
  return (
    <Container id="home-section">
      <Wrapper>
        <Left>
          <HeaderText>This is Arch Public.</HeaderText>
          <Text>
            We build institutional-grade trading automations to provide everyday
            investors with the same advanced tools by hedge funds and investment
            banks.
          </Text>
          <Button
            onClick={() => {
              document.getElementById("bot-section").scrollIntoView();
            }}
          >
            View Bots
          </Button>
        </Left>
        <Right>
          <Image src={computer} alt="computer-image" />
        </Right>
      </Wrapper>
      <Bottom>
        <ScrollIndicator />
      </Bottom>
    </Container>
  );
};

export default Landing;
