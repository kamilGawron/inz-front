import React from "react";
import ContactForm from "../contactForm/ContactForm";
import MainLayout from "../layouts/MainLayout";

const Contact = function () {
  return (
    <MainLayout>
      <div className="o-contact pb-12 mt-5">
        <div className="flex items-center  flex-col w-full ">
          <div className="o-contact__section border-2 flex">
            <div className="w-full">
              <h3 className="font-semibold mb-2">Adres</h3>
              <p>ul. Adama Mickiewicza 8A</p>
            </div>
          </div>
          <div className="o-contact__section border-2 flex">
            <div className="w-full">
              <h3 className="font-semibold mb-2">Kontakt</h3>
              <p>+48 532 235 222</p>
              <p>kontakt@salon.pl</p>
            </div>
          </div>
          <div className="o-contact__section border-2 flex">
            <div className="w-full">
              <h3 className="font-semibold mb-2">Godziny otwarcia</h3>
              <p>Pn-Pt: 08:00-20:00 </p>
              <p>Sb:08: 00-14:00 </p>
            </div>
          </div>
        </div>
        <h2 className="text-center w-full mt-8 font-bold">
          Formularz kontaktowy
        </h2>
        <ContactForm />
      </div>
    </MainLayout>
  );
};
export default Contact;
