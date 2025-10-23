const ContactLink = ({ iconPath, link, detail }) => {
  return (
    <div className="flex gap-2">
      <img src={iconPath} className="h-6 w-6" />
      <a href={link} target="_blank" rel="noopener noreferrer">
        {detail}
      </a>
    </div>
  );
};

export default ContactLink;
