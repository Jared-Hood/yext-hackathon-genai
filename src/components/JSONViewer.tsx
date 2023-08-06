import { JSONTree } from 'react-json-tree';

interface JSONViewerType {
  data: unknown;
}

function JSONViewer(props: JSONViewerType) {
  if (!props.data) {
    return null;
  }

  return (
    <JSONTree data={props.data}  />
  );
}

export default JSONViewer;
