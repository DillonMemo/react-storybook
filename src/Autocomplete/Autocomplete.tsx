/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Fragment, useState } from "react";

/** 키코드 값 (방향키, 엔터) */
const acceptedKeys = [38, 40, 13, 27];
/** input 결과값 기억 */
let cachedVal = "";

type Items = {
  [key: string]: any;
  value: string;
  label: string;
};

interface AutocompleteProps {
  clearSuggestions: () => void;
  items: Items[];
  onChange: (val: string, shouldFetchData?: boolean) => void;
  ready?: boolean;
  status?: boolean;
  value: string;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  clearSuggestions,
  items = [],
  onChange,
  ready = false,
  status = false,
  value = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const dismissSuggestions = (): void => {
    setCurrentIndex(null);
    clearSuggestions();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
    cachedVal = e.target.value;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    // 위, 아래 방향키 혹은 엔터키가 아니면 종료
    if (!status || !acceptedKeys.includes(e.keyCode)) return;

    // 엔터키가 입력 됬을 경우
    if (e.keyCode === 13 || e.keyCode === 27) {
      dismissSuggestions();
      return;
    }

    let nextIndex: number | null;

    // ↑ 키가 입력 됬을 경우
    if (e.keyCode === 38) {
      e.preventDefault();
      nextIndex = currentIndex ?? items.length;
      nextIndex = nextIndex > 0 ? nextIndex - 1 : null;
    } else {
      nextIndex = currentIndex ?? -1;
      nextIndex = nextIndex < items.length - 1 ? nextIndex + 1 : null;
    }

    setCurrentIndex(nextIndex);
    onChange(
      nextIndex !== null && items[nextIndex]
        ? items[nextIndex].label
        : cachedVal,
      false
    );
  };

  const handleLeave = (): void => {
    setCurrentIndex(null);
  };

  const handleSelect = ({ label }: Items) => (): void => {
    onChange(label, false);
    dismissSuggestions();
  };

  const handleEnter = (index: number) => (): void => {
    setCurrentIndex(index);
  };

  const renderSuggestions = (): JSX.Element => {
    let suggestCollect: JSX.Element[] = [];
    suggestCollect = items.map((suggestion, index: number) => {
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

    if (suggestCollect.length > 0) {
      return <Fragment>{suggestCollect}</Fragment>;
    } else {
      return (
        <Fragment>
          <li css={listItem} role="option"></li>
        </Fragment>
      );
    }
  };

  return (
    <div css={container}>
      <div
        css={autocomplete}
        role="combobox"
        aria-owns="ex-list-box"
        aria-haspopup="listbox"
        aria-expanded={status}
      >
        <input
          css={status ? [input, inputNoBottomRadius] : input}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={!ready}
          placeholder="Search"
          type="text"
          aria-autocomplete="list"
          aria-controls="ex-list-box"
        />
        {status && (
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
  padding: 1.5rem 5%;

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

  /** add */
  background-color: #fff;
  z-index: 2;
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
