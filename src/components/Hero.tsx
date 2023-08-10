import yextLogo from "../assets/images/logo.svg";

// TODO(jhood): Update this to list all the API endpoints that the AI has access to.
// Below list is subject to change based on AI training success...
const apis = [
  {
    name: "Management",
    link: "https://hitchhikers.yext.com/docs/managementapis/introduction/overview-policies-and-conventions/"
  },
  {
    name: "Content Delivery",
    link: "https://hitchhikers.yext.com/docs/contentdeliveryapis/introduction/overview-policies-and-conventions/",
  },
  {
    name: "Agreements",
    link: "https://hitchhikers.yext.com/docs/managementapis/agreements/",
  },
];

function Hero() {
  return (
    <div className="py-4 sm:py-5 max-w-2/3">
      <div className="flex items-center mb-8">
        <img src={yextLogo} className="h-12 w-12 mr-4" alt="yext logo" />
        <h1 className="font-heading font-light text-5xl">Content Assistant</h1>
      </div>
      <div>
        <div className="mb-1">Use the content assistant to help you manage your Yext Content</div>
        <div>Ask the assistant to help get entities, make updates, create new entities, or delete old ones!</div>
      </div>
    </div>
  );
}

export default Hero;
