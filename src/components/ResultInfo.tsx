import c from "classnames";
import JSONViewer from "./JSONViewer";

type RequestType = 'GET'|'POST'|'PUT'|'DELETE';

interface ResultInfoType {
  group: string;
  groupLink: string;
  endpoint: string;
  endpointDescription: string;
  requestURL: string;
  requestType: RequestType; 
  requestionBody?: any;
}

function ResultInfo(props: ResultInfoType) {
  return (
    <div className="py-4 sm:py-5">
      <h2 className="font-heading text-2xl font-light mb-4">Result Information</h2>
      <div>
        <span className="font-bold">API:{' '}</span>
        <a href={props.groupLink} target="_blank" className="underline hover:no-underline">{props.group}</a>
      </div>
      <div className="mt-2">
        <span className="font-bold">Endpoint:{' '}</span>
        <span>{props.endpoint}</span>
        <div className="font-light mt-1">- {props.endpointDescription}</div>
      </div>
      <div className="mt-4 overflow-auto">
        <div className="font-bold mb-1">Request URL:</div>
        <div>
          <RequestTypeDisplay requestType={props.requestType} />
          <a className="underline hover:no-underline ml-3" href={props.requestURL} target="_blank">{props.requestURL}</a>
        </div>
      </div>
      {props.requestionBody && props.requestType !== "DELETE" && props.requestType !== "GET" &&(
        <div className="mt-4">
          <div className="font-bold mb-1">Request Body:</div>
          <JSONViewer data={props.requestionBody} />
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
