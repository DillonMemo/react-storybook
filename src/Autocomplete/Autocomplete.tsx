/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState, useMemo, useRef, Fragment } from "react";

type testType = {
  abbr: string;
  name: string;
};

const acceptedKeys = [38, 40, 13, 27];
const test: testType[] = [
  { abbr: "AL", name: "Alabama" },
  { abbr: "AK", name: "Alaska" },
  { abbr: "AZ", name: "Arizona" },
  { abbr: "AR", name: "Arkansas" },
  { abbr: "CA", name: "California" },
  { abbr: "CO", name: "Colorado" },
  { abbr: "CT", name: "Connecticut" },
  { abbr: "DE", name: "Delaware" },
  { abbr: "FL", name: "Florida" },
  { abbr: "GA", name: "Georgia" },
  { abbr: "HI", name: "Hawaii" },
  { abbr: "ID", name: "Idaho" },
  { abbr: "IL", name: "Illinois" },
  { abbr: "IN", name: "Indiana" },
  { abbr: "IA", name: "Iowa" },
  { abbr: "KS", name: "Kansas" },
  { abbr: "KY", name: "Kentucky" },
  { abbr: "LA", name: "Louisiana" },
  { abbr: "ME", name: "Maine" },
  { abbr: "MD", name: "Maryland" },
  { abbr: "MA", name: "Massachusetts" },
  { abbr: "MI", name: "Michigan" },
  { abbr: "MN", name: "Minnesota" },
  { abbr: "MS", name: "Mississippi" },
  { abbr: "MO", name: "Missouri" },
  { abbr: "MT", name: "Montana" },
  { abbr: "NE", name: "Nebraska" },
  { abbr: "NV", name: "Nevada" },
  { abbr: "NH", name: "New Hampshire" },
  { abbr: "NJ", name: "New Jersey" },
  { abbr: "NM", name: "New Mexico" },
  { abbr: "NY", name: "New York" },
  { abbr: "NC", name: "North Carolina" },
  { abbr: "ND", name: "North Dakota" },
  { abbr: "OH", name: "Ohio" },
  { abbr: "OK", name: "Oklahoma" },
  { abbr: "OR", name: "Oregon" },
  { abbr: "PA", name: "Pennsylvania" },
  { abbr: "RI", name: "Rhode Island" },
  { abbr: "SC", name: "South Carolina" },
  { abbr: "SD", name: "South Dakota" },
  { abbr: "TN", name: "Tennessee" },
  { abbr: "TX", name: "Texas" },
  { abbr: "UT", name: "Utah" },
  { abbr: "VT", name: "Vermont" },
  { abbr: "VA", name: "Virginia" },
  { abbr: "WA", name: "Washington" },
  { abbr: "WV", name: "West Virginia" },
  { abbr: "WI", name: "Wisconsin" },
  { abbr: "WY", name: "Wyoming" },
];

interface AutocompleteProps {}

const Autocomplete: React.FC<AutocompleteProps> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [value, setValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<{
    loading: boolean;
    status: boolean;
    data: testType[];
  }>({ loading: false, status: false, data: [] });

  const dismissSuggestions = (): void => {
    setCurrentIndex(null);
    setSuggestions({ loading: false, status: false, data: [] });
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);

    if (!e.target.value) console.log(!e.target.value);

    let data = test
      .filter(
        (item) =>
          item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
            -1 ||
          item.abbr.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      )
      .splice(0, 5);

    if (!e.target.value) dismissSuggestions();
    else if (data.length > 0)
      setSuggestions({ ...suggestions, status: true, data });
    else setSuggestions({ ...suggestions, status: false, data });
  };

  const handleSelect = ({ name }: testType) => (): void => {
    setValue(name);
    dismissSuggestions();
  };

  const handleEnter = (index: number) => (): void => {
    setCurrentIndex(index);
  };

  const handleLeave = (): void => {
    setCurrentIndex(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const { data, status } = suggestions;
    // 위,아래 방향키 혹은 엔터키가 아니면 종료
    if (!status || !acceptedKeys.includes(e.keyCode)) return;

    // 엔터키가 입력 됬을 경우
    if (e.keyCode === 13 || e.keyCode === 27) {
      if (currentIndex !== null)
        setValue(data[currentIndex] ? data[currentIndex].name : "");
      dismissSuggestions();
      return;
    }

    let nextIndex: number | null;

    // ↑ 키가 입력 됬을 경우
    if (e.keyCode === 38) {
      e.preventDefault();
      nextIndex = currentIndex ?? data.length;
      nextIndex = nextIndex > 0 ? nextIndex - 1 : null;
    } else {
      nextIndex = currentIndex ?? -1;
      nextIndex = nextIndex < data.length - 1 ? nextIndex + 1 : null;
    }

    console.log("handleKeyDown :", nextIndex);
    setCurrentIndex(nextIndex);
  };

  const renderSuggestions = (): JSX.Element => {
    const { data } = suggestions;

    console.log("renderSuggestions :", data);

    const suggestCollect = data
      .filter(
        (item) =>
          item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          item.abbr.toLowerCase().indexOf(value.toLowerCase()) !== -1
      )
      .map((suggestion, index: number) => {
        const { abbr, name } = suggestion;

        return (
          <li
            key={index}
            id={`ex-list-item-${index}`}
            css={index === currentIndex ? [listItem, listItemDarken] : listItem}
            onClick={handleSelect(suggestion)}
            onMouseEnter={handleEnter(index)}
            role="option"
            aria-selected={index === currentIndex}
          >
            <strong>{name}</strong>
            <small css={subText}>{abbr}</small>
          </li>
        );
      });
    return <Fragment>{suggestCollect}</Fragment>;
  };

  return (
    <div css={container}>
      <span>Fuxx Autocomplete!!</span>
      <div
        css={autocomplete}
        ref={ref}
        role="combobox"
        aria-owns="ex-list-box"
        aria-haspopup="listbox"
        aria-expanded={suggestions.status}
      >
        <input
          css={suggestions.status ? [input, inputNoBottomRadius] : input}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={false}
          placeholder="Search"
          type="text"
          aria-autocomplete="list"
          aria-controls="ex-list-box"
          aria-activedescendant={
            currentIndex !== null ? `ex-list-item-${currentIndex}` : undefined
          }
        />
        {suggestions.status && (
          <ul
            id="ex-list-box"
            css={listBox}
            onMouseLeave={handleLeave}
            role="listbox"
          >
            {renderSuggestions()}
          </ul>
        )}
      </div>
    </div>
  );
};

const { sm, md, lg, xl } = {
  sm: "@media (min-width: 576px)",
  md: "@media (min-width: 768px)",
  lg: "@media (min-width: 992px)",
  xl: "@media (min-width: 1200px)",
};

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5% 5rem 5%;

  ${sm} {
    padding-left: 10%;
    padding-right: 10%;
  }
  ${md} {
    padding-left: 12.5%;
    padding-right: 12.5%;
  }
  ${lg} {
    padding-left: 15%;
    padding-right: 15%;
  }
`;

const title = css`
  margin: 0 0 0.75rem;
  font-size: 1.5rem;
  ${sm} {
    font-size: 2rem;
  }
`;

const subtitle = css`
  margin: 0 0 2.5rem;
`;

const autocomplete = css`
  display: inline-block;
`;

const input = css`
  padding: 0.9rem 1.15rem;
  width: 15rem;
  border: 1px solid #bbb;
  border-radius: 8px;
  outline: none;
  line-height: 1.2;
  ${sm} {
    width: 20rem;
  }
`;

const inputNoBottomRadius = css`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

const listBox = css`
  position: absolute;
  margin: 0;
  padding: 0;
  max-height: 60%;
  overflow-y: auto;
  border: 1px solid #bbb;
  border-top: none;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  list-style-type: none;
  text-align: left;
`;

const listItem = css`
  padding: 0.75rem 1.15rem;
  width: 15rem;
  cursor: pointer;
  ${sm} {
    width: 20rem;
  }
`;

const subText = css`
  color: #8c8c8c;
`;

const listItemDarken = css`
  background: #eee;
`;

export default Autocomplete;
