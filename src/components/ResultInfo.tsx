import c from "classnames";
import JSONViewer from "./JSONViewer";

export type RequestType = 'GET'|'POST'|'PUT'|'DELETE';

interface ResultInfoType {
  requestURL?: string;
  requestType?: RequestType; 
  requestBody?: any;
}

function ResultInfo(props: ResultInfoType) {
  if (!props.requestURL) {
    return null;
  }

  return (
    <div className="py-4 sm:py-5">
      <h2 className="font-heading text-2xl font-light mb-4">Result Information</h2>
      <div className="mt-4 overflow-auto">
        <div className="font-bold mb-1">Request URL:</div>
        <div>
          {props.requestType && <RequestTypeDisplay requestType={props.requestType} />}
          <a className="underline hover:no-underline ml-3" href={props.requestURL} target="_blank">{props.requestURL}</a>
        </div>
      </div>
      {props.requestBody &&(
        <div className="mt-4">
          <div className="font-bold mb-1">Request Body:</div>
          <JSONViewer data={props.requestBody} />
        </div>
      )}
    </div>
  );
}

export default ResultInfo;


function RequestTypeDisplay({ requestType }: {requestType: RequestType}) {
  return (
    <span className={c(
      "py-1 px-2.5 text-white uppercase text-sm font-light",
      {"bg-green-500": requestType === "GET"},
      {"bg-blue-500": requestType === "POST"},
      {"bg-purple-500": requestType === "PUT"},
      {"bg-red-500": requestType === "DELETE"},
    )}>
      {requestType}
    </span>
  )
}
