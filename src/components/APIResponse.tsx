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
      <JSONViewer data={props.data} />
      {props.data.response.entities?.length && <ul className="flex flex-wrap -m-2 mt-4">
        {props.data.response.entities.map((entity: any) => (
          <li key={entity.meta.id} className="basis-full sm:basis-1/3 md:basis-1/4 p-2 h-full">
            <div className="border border-black rounded-md p-4">
              <h3 className="mb-1 font-medium text-lg">{entity.name}</h3>
              <div>Entity ID: {entity.meta.id}</div>
            </div>
          </li>
        ))}
      </ul>}
      {props.data.response?.name && props.data.response.meta.id  && (
        <div className="border border-black rounded-md p-4 w-full sm:w-1/3 md:w-1/4 mt-4">
          <h3 className="mb-1 font-medium text-lg">{props.data.response?.name}</h3>
          <div>Entity ID: {props.data.response.meta.id}</div>
        </div>
      )}
    </div>
  );
}

export default APIResponse;
