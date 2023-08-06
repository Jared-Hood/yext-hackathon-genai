interface RequestErrorProps {
  error: any;
}

function RequestError(props: RequestErrorProps) {
  return (
    <div className="bg-red-200 px-8 py-4">
      <h2 className="font-heading">An error occured with making the above request. Please try again.</h2>
      {props.error instanceof Error && <div className="font-medium">{props.error.name}: {props.error.message}</div>}
    </div>
  );
}

export default RequestError;
