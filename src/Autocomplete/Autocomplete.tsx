/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState, useRef, Fragment } from "react";

const acceptedKeys = [38, 40, 13, 27];

interface AutocompleteProps {
  /**
   * **disable** 설정 여부를 정합니다.
   */
  isDisabled?: boolean;
  /**
   * **error** mode 설정 여부를 정합니다.
   */
  isError?: boolean;
  /**
   * 사용자가 입력 값을 변경할 때마다 호출 됩니다.
   */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value?: string
  ) => void | any;
  /**
   * 사용자가 `Dropdown`메뉴에서 항목을 선택할 때 호출 됩니다.
   */
  onSelect?: (value: string, item?: any) => void;
  /**
   * `Dropdown` menu에 표시 할 옵션항목
   */
  options: any[];
  /**
   * 입력 필드에 표시 될 값을 가져옵니다.
   */
  value: string;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  onChange = () => {},
  onSelect = () => {},
  isDisabled = false,
  isError = false,
  value = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<{
    // loading: boolean;
    status: boolean;
    data: any[];
  }>({ /*loading: false,*/ status: false, data: [] });

  const dismissSuggestions = (): void => {
    setCurrentIndex(null);
    setSuggestions({ /*loading: false,*/ status: false, data: [] });
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e, e.target.value);

    let data = options
      .filter(
        (option) =>
          option.label.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
            -1 ||
          option.value.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
            -1
      )
      .splice(0, 5);

    if (!e.target.value) dismissSuggestions();
    else if (data.length > 0)
      setSuggestions({ ...suggestions, status: true, data });
    else setSuggestions({ ...suggestions, status: false, data });
  };

  const handleSelect = ({ label }: any) => (): void => {
    onSelect(label);
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
        onSelect(data[currentIndex] ? data[currentIndex].label : "");
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

    setCurrentIndex(nextIndex);
  };

  const renderSuggestions = (): JSX.Element => {
    const { data } = suggestions;

    const suggestCollect = data
      .filter(
        (item) =>
          item.label.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          item.value.toLowerCase().indexOf(value.toLowerCase()) !== -1
      )
      .map((suggestion, index: number) => {
        const { value, label } = suggestion;

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
            <strong>{label}</strong>
            <small css={subText}>{value}</small>
          </li>
        );
      });
    return <Fragment>{suggestCollect}</Fragment>;
  };

  return (
    <div css={container}>
      <div
        css={autocomplete}
        ref={ref}
        role="combobox"
        aria-owns="ex-list-box"
        aria-haspopup="listbox"
        aria-expanded={suggestions.status}
      >
        <input
          css={
            suggestions.status
              ? [input, inputNoBottomRadius, isError ? inputError : null]
              : [input, isError ? inputError : null]
          }
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={isDisabled}
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

const inputError = css`
  border: 1px solid red;
  color: red;
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
