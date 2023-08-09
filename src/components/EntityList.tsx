
interface EntityListProps {
  entities: any[];
}

function EntityList(props: EntityListProps) {

  if (!props.entities?.length) {
    return null;
  }

  return (
    <div className="py-4 sm:py-5">
      <h2 className="font-heading text-2xl font-light mb-4">All Entities in Account</h2>
      <ul className="flex flex-wrap -m-2">
        {props.entities.map((entity: any) => (
          <li key={entity.meta.id} className="basis-full sm:basis-1/3 md:basis-1/4 p-2 h-full">
            <div className="border border-black rounded-md p-4">
              <h3 className="mb-1 font-medium text-lg">{entity.name}</h3>
              <div>Entity ID: {entity.meta.id}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EntityList;
