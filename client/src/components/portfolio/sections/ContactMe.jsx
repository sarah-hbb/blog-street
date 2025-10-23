import HomeSection from "../../layout/HomeSection";
import ContactLink from "./ContactLink";

const ContactMe = () => {
  return (
    <HomeSection title={"contact me"} sub={"Want to collaborate?"}>
      <ContactLink
        iconPath={"/images/contactIcons/gmail.png"}
        detail={"sarahabibi.89@gmail.com"}
      />
      <ContactLink
        iconPath={"/images/contactIcons/linkedin.png"}
        detail={"www.linkedin.com/in/sarah-habibi"}
        link={"https://www.linkedin.com/in/sarah-habibi"}
      />
    </HomeSection>
  );
};

export default ContactMe;
