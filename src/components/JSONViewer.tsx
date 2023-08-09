import { JSONTree } from 'react-json-tree';

interface JSONViewerType {
  data: unknown;
}

function JSONViewer(props: JSONViewerType) {
  if (!props.data) {
    return null;
  }

  return (
    <JSONTree data={props.data} hideRoot={true} shouldExpandNodeInitially={(_, __, level) => level < 3} />
  );
}

export default JSONViewer;
