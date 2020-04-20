import React, { forwardRef, useCallback, useState, useRef, useEffect } from 'react';
import AutoDrowDownList from './AutoList';
import './AutoComplete.css';

interface AutoProps {
  placeholder?: string;
  options?: Array<{ value: string; id: string | number }>;
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
}

interface AutoRef {
  focus(): void;
  blur(): void;
}

const AutoComplete = forwardRef<AutoRef, AutoProps>(
  ({ placeholder = '请输入', options = [], value, onChange, onSearch }, ref) => {
    const [open, setOpen] = useState(false);
    const [iscomposing, setComponsing] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const handleRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const curr = {
        focus: () => {
          handleRef.current!.focus();
        },
        blur: () => {
          handleRef.current!.blur();
        }
      };
      if (ref) {
        if (typeof ref === 'function') {
          ref(curr);
        } else {
          ref.current = curr;
        }
      }
    }, []); // eslint-disable-line

    useEffect(() => {
      const handleOutSide = function (e: MouseEvent) {
        const dom = handleRef.current;
        if (dom) {
          if (!dom.contains(e.target as HTMLElement)) {
            setOpen(false);
          }
        }
      };
      document.addEventListener('click', handleOutSide);
      return () => {
        document.removeEventListener('click', handleOutSide);
      };
    }, []);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      value && setOpen(true);
      setActiveIndex(0);
      onChange(value);
      if (onSearch) {
        onSearch(value);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.stopPropagation();
      if (iscomposing) return;
      const key = e.key.toLowerCase();
      if (key === 'arrowdown') {
        setActiveIndex((idx) => (idx + 1 === options.length ? 0 : idx + 1));
      } else if (key === 'arrowup') {
        setActiveIndex((idx) => (idx === 0 ? options.length - 1 : idx - 1));
      } else if (key === 'enter') {
        handleSelect(options[activeIndex].value);
      }
    };

    const handleSelect = useCallback((v: string) => {
      setOpen(false);
      onChange(v);
      handleRef.current!.focus();
    }, []);

    function handleCompositionStart(e: React.CompositionEvent<HTMLInputElement>) {
      setComponsing(true);
    }

    function handleCompositionEnd(e: React.CompositionEvent<HTMLInputElement>) {
      if (!iscomposing) return;
      setComponsing(false);
    }

    return (
      <div className="auto-container">
        <input
          placeholder={placeholder}
          ref={handleRef}
          value={value}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
        />
        <AutoDrowDownList
          open={open}
          options={options}
          activeIndex={activeIndex}
          handleSelect={handleSelect}
        />
      </div>
    );
  }
);

export default AutoComplete;
