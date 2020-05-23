/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState, useCallback, useEffect } from "react";
import Autocomplete from "./Autocomplete";

export default {
  title: "components|Autocomplete",
  component: Autocomplete,
};

type DataType = {
  [key: string]: any;
  value: string;
  label: string;
};

type Suggestions = {
  readonly loading: boolean;
  readonly status: boolean;
  readonly data: DataType[];
};

interface SetVal {
  (val: string, shouldFetchData?: boolean): void;
}

export interface HookArgs {
  debounce?: number;
  callbackName?: string;
}

export interface HookReturn {
  readonly ready: boolean;
  readonly value: string;
  readonly suggestions: Suggestions;
  readonly setVal: SetVal;
  readonly clearSuggestions: () => void;
}

const useAutocomplete = ({
  debounce = 200,
  callbackName,
}: HookArgs = {}): HookReturn => {
  const [ready, setReady] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestions>({
    loading: false,
    status: false,
    data: [],
  });

  const init = useCallback(() => {
    setReady(true);
  }, []);

  const clearSuggestions = useCallback(() => {
    setSuggestions({ loading: false, status: false, data: [] });
  }, []);

  const fetchPredictions = useCallback(
    (val: string) => {
      if (!val) {
        clearSuggestions();
        return;
      }

      setSuggestions((prevState) => ({ ...prevState, loading: true }));
      (() => {
        let collection: DataType[] = [
          { value: "AL", label: "Alabama" },
          { value: "AK", label: "Alaska" },
          { value: "AZ", label: "Arizona" },
          { value: "AR", label: "Arkansas" },
          { value: "CA", label: "California" },
          { value: "CO", label: "Colorado" },
          { value: "CT", label: "Connecticut" },
          { value: "DE", label: "Delaware" },
          { value: "FL", label: "Florida" },
          { value: "GA", label: "Georgia" },
          { value: "HI", label: "Hawaii" },
          { value: "ID", label: "Idaho" },
          { value: "IL", label: "Illinois" },
          { value: "IN", label: "Indiana" },
          { value: "IA", label: "Iowa" },
          { value: "KS", label: "Kansas" },
          { value: "KY", label: "Kentucky" },
          { value: "LA", label: "Louisiana" },
          { value: "ME", label: "Maine" },
          { value: "MD", label: "Maryland" },
          { value: "MA", label: "Massachusetts" },
          { value: "MI", label: "Michigan" },
          { value: "MN", label: "Minnesota" },
          { value: "MS", label: "Mississippi" },
          { value: "MO", label: "Missouri" },
          { value: "MT", label: "Montana" },
          { value: "NE", label: "Nebraska" },
          { value: "NV", label: "Nevada" },
          { value: "NH", label: "New Hampshire" },
          { value: "NJ", label: "New Jersey" },
          { value: "NM", label: "New Mexico" },
          { value: "NY", label: "New York" },
          { value: "NC", label: "North Carolina" },
          { value: "ND", label: "North Dakota" },
          { value: "OH", label: "Ohio" },
          { value: "OK", label: "Oklahoma" },
          { value: "OR", label: "Oregon" },
          { value: "PA", label: "Pennsylvania" },
          { value: "RI", label: "Rhode Island" },
          { value: "SC", label: "South Carolina" },
          { value: "SD", label: "South Dakota" },
          { value: "TN", label: "Tennessee" },
          { value: "TX", label: "Texas" },
          { value: "UT", label: "Utah" },
          { value: "VT", label: "Vermont" },
          { value: "VA", label: "Virginia" },
          { value: "WA", label: "Washington" },
          { value: "WV", label: "West Virginia" },
          { value: "WI", label: "Wisconsin" },
          { value: "WY", label: "Wyoming" },
        ];

        collection = collection.filter(
          (item) =>
            item.label.toLowerCase().indexOf(val.toLowerCase()) !== -1 ||
            item.value.toLowerCase().indexOf(val.toLowerCase()) !== -1
        );

        setSuggestions({
          loading: false,
          status: true,
          data: collection || [],
        });
      })();
    },
    [clearSuggestions]
  );

  const setVal: SetVal = useCallback(
    (val, shouldFetchData = true) => {
      setValue(val);

      if (shouldFetchData) fetchPredictions(val);
    },
    [fetchPredictions]
  );

  useEffect(() => {
    if (callbackName) {
      (window as any)[callbackName] = init;
    } else {
      init();
    }

    return (): void => {
      if (callbackName && (window as any)[callbackName])
        delete (window as any)[callbackName];
    };
  }, [callbackName, init]);

  return { ready, value, suggestions, setVal, clearSuggestions };
};

export const Default = () => {
  const {
    ready,
    value: val,
    suggestions: { status, data },
    setVal,
    clearSuggestions,
  } = useAutocomplete();
  return (
    <div css={wrapper}>
      <Autocomplete
        items={data}
        status={status}
        ready={ready}
        value={val}
        onChange={setVal}
        clearSuggestions={clearSuggestions}
      />
    </div>
  );
};

Default.story = {
  name: "Default",
};

export const Disabled = () => {
  const {
    ready,
    value: val,
    suggestions: { status, data },
    setVal,
    clearSuggestions,
  } = useAutocomplete();
  return (
    <div>
      <Autocomplete
        items={data}
        status={status}
        ready={false}
        value={val}
        onChange={setVal}
        clearSuggestions={clearSuggestions}
      />
    </div>
  );
};

Disabled.story = {
  name: "Disabled",
};

export const Errored = () => {
  return <div css={wrapper}>errord</div>;
};

Errored.story = {
  name: "Errored",
};

const wrapper = css`
  height: 500px;
`;
