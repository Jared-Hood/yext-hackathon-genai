import { YextAPIResponse } from "../types";
import JSONViewer from "./JSONViewer";

interface APIResponseProps {
  data: YextAPIResponse;
}

function APIResponse(props: APIResponseProps) {
  const isYextAPIError = !!props.data.meta.errors.length;

  if (!props.data) {
    return null;
  }

  return (
    <div className="py-4 sm:py-5">
      <h2 className="font-heading text-2xl font-light mb-4">API Response</h2>
     {isYextAPIError && (
       <div className="text-red-600">
        {props.data.meta.errors.map((error) => (
          <div key={error.code}>
            {`${error.type}: ${error.message}`}
          </div>
        ))}      
      </div>
     )}
      <JSONViewer  data={props.data} />
    </div>
  );
}

export default APIResponse;
