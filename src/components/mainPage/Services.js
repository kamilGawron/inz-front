/* eslint-disable import/no-dynamic-require */
import React from "react";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import { useSelector } from "react-redux";

const ServicesWrapper = styled.div`
  background-color: #fcf9f5;
  border-top: 2px solid rgba(133, 133, 133, 0.3);
  border-bottom: 2px solid rgba(133, 133, 133, 0.3);
  padding: 30px 0;
`;
const ServicesHeader = styled.h3`
  text-align: center;
  margin: 20px 0 10px 0;
  font-weight: 600;
`;

const ServicesContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 992px;
  margin: 0 auto;
`;
const ServiceItemWrapper = styled.div`
  width: 90%;
  margin: 5px auto;
  border-radius: 3px;
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100%;

  @media all and (min-width: 576px) {
    width: 48%;
  }
  @media all and (min-width: 992px) {
    width: 24%;
  }
`;
const ServiceItem = styled.div`
  background-color: #fff;
  box-shadow: 0 0 10px -3px rgba(133, 133, 133, 0.4);
  padding: 15px;
`;

const ServiceHeader = styled.div`
  height: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ServiceImage = styled.img`
  height: 50px;
`;
const ServiceName = styled.h5`
  font-weight: 600;
  font-size: 16px;
`;
const ServiceDescription = styled.p`
  font-size: 12px;
  margin: 0 5px;
`;

const Services = function () {
  const { mainPageServices } = useSelector((state) => state.services);

  const serviceData = {
    sectionTitle: "Oferowane usługi",
    services: mainPageServices,
  };

  return (
    <ServicesWrapper>
      <Fade bottom duration={1000} delay={100}>
        <ServicesHeader>{serviceData.sectionTitle}</ServicesHeader>
      </Fade>

      <ServicesContent>
        {serviceData.services.map((e, i) => {
          return (
            <ServiceItemWrapper key={e.id}>
              <Fade
                left
                duration={1000}
                delay={serviceData.services.length * 200 - i * 200}
              >
                <ServiceItem>
                  <ServiceHeader>
                    <ServiceName>{e.title}</ServiceName>
                    <ServiceImage src={`/build/icons/${e.photo}`} />
                  </ServiceHeader>

                  <ServiceDescription>{e.description}</ServiceDescription>
                </ServiceItem>
              </Fade>
            </ServiceItemWrapper>
          );
        })}
      </ServicesContent>
    </ServicesWrapper>
  );
};
export default Services;
