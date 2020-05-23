/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, useRef, useEffect, cloneElement } from "react";

const IMPERATIVE_API = [
  "blur",
  "checkValidity",
  "click",
  "focus",
  "select",
  "setCustomValidity",
  "setSelectionRange",
  "setRangeText",
];

export interface AutocompleteProps {
  /**
   * `dropdown`메뉴에서 일치 하는 항목을 자동으로 강조 표시할지 여부를 알려줍니다.
   */
  autoHighlight?: boolean;
  /**
   * `renderInput`으로 렌더링 된 `<input />`요소의 `props`에 사용 됩니다.
   */
  inputProps?: object;
  /**
   * `dropdown` 메뉴에 표시할 항목 입니다.
   */
  items: any[];
  /**
   * **renderMenu** 구현에서 `dropdown` 메뉴에 적용되는 스타일 입니다.
   *
   * **renderMenu**를 재정의 하고 **menuStyle**을 사용하려면 수동으로 적용 해야 합니다.
   */
  menuStyle?: React.CSSProperties;
  /**
   * `Dropdown`을 표시하거나 숨기는 내부 론리를 재정의 하는데 사용 됩니다.
   *
   * **onMenuVisibilityChange**와 함께 사용하여 `Dropdown`을 세밀하게 제어 할 수 있도록 설계 (필요)
   */
  open: boolean;
  /**
   * Arguments: `props: Object`
   *
   * 입력 요소를 생성하기 위해 호출 됩니다. `props` 인수는 속성값 결과 입니다.
   */
  renderInput?: (props: object) => React.ReactElement;
  /**
   * `dropdown`메뉴에서 각 항목에 대한 렌더 트리를 생성하기 위해 `items` 각 항목에 대해 호출 됩니다.
   */
  renderItem: (
    item: any,
    isHighlighted: boolean,
    styles?: React.CSSProperties
  ) => React.ReactElement;
  /**
   * `dropdown`메뉴의 렌더 트리를 생성하기 위해 호출 됩니다.
   *
   * `items` props에 데이터가 포함되어 있어야 표시 됩니다.
   */
  renderMenu?: (
    items: any[],
    value: string,
    style: React.CSSProperties
  ) => React.ReactElement;
  /**
   * 각 `item`항목에 대해 호출 되며 반환 값은 `dropdown`메뉴에 표시되어야 하는지 여부를 결정하는데 사용 됩니다.
   */
  shouldItemRender?: (item: any, value: string) => void;
  /**
   * `items`가 표시되기 전에 정렬하는데 사용되는 함수 입니다.
   */
  sortItems?: (itemA: any, itemB: any, value: string) => number;
  /**
   * 입력 필드에 표시 할 값.
   */
  value?: any;
  /**
   * `<input />`을 감싸는 상위 요소에 적용되는 props 입니다.
   */
  wrapperProps?: object;
  /**
   * `wrapperProps = {{style: <your styles>}}`의 함축 명령 입니다.
   *
   *  wrapperStyle은 wrapperProps보다 먼저 적용되는 스타일 입니다.
   */
  wrapperStyle?: React.CSSProperties;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  autoHighlight = true,
  inputProps = {},
  items,
  menuStyle = {
    borderRadius: "3px",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
    background: "rgba(255, 255, 255, 0.9)",
    padding: "2px 0",
    fontSize: "90%",
    position: "fixed",
    overflow: "auto",
    maxHeight: "50%",
  },
  open,
  renderInput = (props) => <input {...props} />,
  renderItem,
  renderMenu = (items, value, style) => (
    <div style={{ ...style, ...menuStyle }} children={items} />
  ),
  shouldItemRender,
  sortItems,
  value = "",
  wrapperProps = {},
  wrapperStyle = { display: "inline-block" },
}) => {
  const input = useRef(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | undefined>(
    undefined
  );
  const [menuTop, setMenuTop] = useState(0);
  const [menuLeft, setMenuLeft] = useState(0);
  const [menuWidth, setMenuWidth] = useState(0);
  const [ignoreBlur, setIgnoreBlur] = useState<boolean>(false);

  useEffect(() => {
    const node: any = input.current;
    const rect = node.getBoundingClientRect();
    const computedStyle = (global as any).window.getComputedStyle(node);
    const marginBottom = parseInt(computedStyle.marginBottom, 10) || 0;
    const marginLeft = parseInt(computedStyle.marginLeft, 10) || 0;
    const marginRight = parseInt(computedStyle.marginRight, 10) || 0;

    setMenuTop(rect.bottom + marginBottom);
    setMenuLeft(rect.left + marginLeft);
    setMenuWidth(rect.width + marginRight);
  }, []);

  const getFilteredItems = () => {
    if (shouldItemRender) {
      items = items.filter((item) => shouldItemRender(item, value));
    }

    if (sortItems) {
      items.sort((a, b) => sortItems(a, b, value));
    }

    return items;
  };
  const renderedMenu = () => {
    const items = getFilteredItems().map((item, index) => {
      const element = renderItem(item, highlightedIndex === index, {
        cursor: "default",
      });

      if (!element) return;

      return cloneElement(element, {
        onMouseEnter: null,
        onClick: null,
        // ref: (e: any) => ((input.current as any)[`item-${index}`] = e),
      });
    });

    const style: React.CSSProperties = {
      left: menuLeft,
      top: menuTop,
      minWidth: menuWidth,
    };

    const menu = renderMenu(items, value, style);

    return cloneElement(menu, {
      //   ref: (e: any) => ((input.current as any).menu = e),
      onTouchStart: () => setIgnoreBlur(true),
      onMouseEnter: () => setIgnoreBlur(true),
      onMouseLeave: () => setIgnoreBlur(false),
    });
  };

  (window as any).input = input;
  return (
    <div style={{ ...wrapperStyle }} {...wrapperProps}>
      {renderInput({
        ...inputProps,
        role: "combobox",
        "aria-autocomplete": "list",
        "aria-expanded": open,
        autoComplete: "off",
        ref: input,
      })}
      {open && renderedMenu()}
    </div>
  );
};

export default Autocomplete;
