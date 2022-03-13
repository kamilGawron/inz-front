import React from "react";
import styled from "styled-components";
import Fade from "react-reveal/Fade";

import homePageOwnerPhoto from "../../assets/images/store-owner.jpg";

const AboutBrand = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OwnerImageWrapper = styled.img`
  max-width: 180px;
`;
const AboutHeader = styled.h3`
  text-align: center;
  font-weight: 400;
  text-transform: uppercase;
  @media all and (min-width: 576px) {
    margin: 30px 0 10px 0;
  }
`;
const AboutContent = styled.div`
  display: flex;
  max-width: 992px;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  @media all and (min-width: 576px) {
    flex-direction: row;
  }
`;
const AboutImageSection = styled.div``;
const AboutDescSection = styled.div`
  display: flex;
  align-items: Center;
  padding: 0 30px;
  & > div {
  }
`;

const About = function () {
  return (
    <AboutBrand>
      <AboutHeader>Salon Fryzjerski Brand Name</AboutHeader>
      <AboutContent>
        <Fade left duration={1000} delay={600} distance="30px">
          <AboutImageSection>
            <OwnerImageWrapper height="50px" width="50px"src={homePageOwnerPhoto} />
          </AboutImageSection>
        </Fade>

        <AboutDescSection>
          <Fade right duration={1000} delay={600} distance="30px">
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                imperdiet enim ac quam tincidunt placerat. Ut euismod
                scelerisque commodo. In vestibulum imperdiet luctus. Mauris quis
                porta odio, eget sodales ex. Cras condimentum condimentum est
                vel finibus.
              </p>
              <p>
                Suspendisse pellentesque velit ex, ut placerat felis malesuada
                sit amet. Cras aliquam nibh at ligula gravida pulvinar. Praesent
                suscipit dui in maximus condimentum. Sed elementum massa vel
                felis accumsan, vitae mollis nunc vestibulum.
              </p>
            </div>
          </Fade>
        </AboutDescSection>
      </AboutContent>
    </AboutBrand>
  );
};
export default About;
