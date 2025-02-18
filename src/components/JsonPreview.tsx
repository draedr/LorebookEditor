import { useContext, useState } from "react";
import { HooksContext } from "../hooks";

export default function JsonPreview() {
    const { jsonData } = useContext(HooksContext);

    const [fieldsetState, setFieldsetState] = useState<boolean>(false);

    const toggleFieldset = () => {
        if (fieldsetState) {
        setFieldsetState(false);
        } else {
        setFieldsetState(true);
        }
    };

    return (
        <fieldset
        className={`overflow-x-auto max-w-6xl my-4 border-solid border-grey rounded-lg p-4 pt-2 ${jsonData != null && fieldsetState
            ? 'border-2 rounded-lg'
            : 'border-t-2'
          }`}
      >
        <legend>
          <button
            //disabled={!(jsonData != null && fieldsetState)}
            onClick={() => toggleFieldset()}
            className={`mx-2 py-1 px-2 rounded-lg opacity-100 transition-opacity"
          title="Remove entry ${jsonData != null && fieldsetState
                ? 'hover:bg-white group-hover:opacity-100'
                : ''
              }`}
          >
            JSON
          </button>
        </legend>
        {jsonData != null && fieldsetState ? (
          <div>
            <pre className="max-w-6xl">{JSON.stringify(jsonData, null, 2)}</pre>
          </div>
        ) : (
          fieldsetState && <span>No data available</span>
        )}
      </fieldset>
    );
}