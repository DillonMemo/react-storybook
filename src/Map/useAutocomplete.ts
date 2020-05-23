import { useState, useCallback, useEffect } from "react";
import Axios from "axios";

export interface HookArgs {
  callbackName?: string;
}

export type SearchType = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
  value: string;
  label: string;
};

type Suggestions = {
  readonly loading: boolean;
  readonly status: boolean;
  readonly data: SearchType[];
};

interface SetVal {
  (val: string, shouldFetchData?: boolean): void;
}

export interface HookReturn {
  readonly ready: boolean;
  readonly value: string;
  readonly suggestions: Suggestions;
  readonly setVal: SetVal;
  readonly clearSuggestions: () => void;
}

const useAutocomplete = ({ callbackName }: HookArgs = {}): HookReturn => {
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

      const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${val}`;

      Axios({
        method: "GET",
        url,
        headers: {
          Authorization: "KakaoAK d96ff2a8efb355716d764d1be22bdb6f",
        },
      }).then((res) => {
        let documents: SearchType[] = res.data.documents;

        documents = documents.map((document, index) => ({
          ...document,
          label: document.place_name,
          value: document.address_name,
        }));

        console.log("documents", documents);

        setSuggestions({ loading: false, status: true, data: documents || [] });
      });
    },
    [clearSuggestions]
  );

  const setVal: SetVal = useCallback((val, shouldFetchData = true) => {
    setValue(val);
    if (shouldFetchData) fetchPredictions(val);
  }, []);

  useEffect(() => {
    if (callbackName) {
      if ((window as any)[callbackName]) delete (window as any)[callbackName];
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

export default useAutocomplete;
