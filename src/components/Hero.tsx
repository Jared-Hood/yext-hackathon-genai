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
    <div className="py-4 sm:py-5">
      <div className="flex items-center mb-8">
        <img src={yextLogo} className="h-12 w-12 mr-4" alt="yext logo" />
        <h1 className="font-heading font-light text-5xl">API Assistant</h1>
      </div>
      <div>
        <div className="mb-1">Use the AI assistant to help you make requests to the Yext APIs:</div>
        <ul className="list-inside list-disc mb-1">
          {apis.map(api => (
            <li key={api.name} className="ml-4">
              <a className="underline hover:no-underline" href={api.link}>{api.name}</a>
            </li>
          ))}
        </ul>
        <div>Ask the assistant to use a specific endpoint, apply a filter, or return a certain set of entity fields. Or just describe whatever you are trying to achieve and the AI will help you build the API request to achieve it!</div>
      </div>
    </div>
  );
}

export default Hero;
