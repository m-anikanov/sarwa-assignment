import React, { useCallback } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

import { AccountStatus } from 'common';

import styles from './StatusFilter.module.css';

interface StatusFilterProps {
  value?: AccountStatus[];
  onChange: (value: AccountStatus[]) => void;
  options: {
    value: AccountStatus;
    text: string;
  }[];
}

const StatusFilter: React.FC<StatusFilterProps> = ({ value, onChange, options }) => {
  const onValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const buttonNode = e.target as HTMLInputElement;
    const buttonValue = buttonNode.value as AccountStatus;
    const nextValues = new Set(value);
    
    if (buttonNode?.checked) {
      nextValues.add(buttonValue);
    } else {
      nextValues.delete(buttonValue)
    }
    
    onChange(Array.from(nextValues));
  }, [onChange, value]);

  return (
    <section className={styles.statusFilter}>
      <section className={styles.name}>Filter by status</section>
      <ButtonGroup>
        {options.map((opt, i) => {
          const checked = value?.includes(opt.value);

          return (
            <ToggleButton
              className={styles.button}
              key={i}
              value={opt.value}
              id={opt.value}
              type="checkbox"
              variant={checked ? 'secondary' : 'outline-secondary'}
              size="sm"
              checked={checked}
              onChange={onValueChange}
            >
              {opt.text}
            </ToggleButton>
          );
        })}
      </ButtonGroup>
    </section>
  );
}

export default React.memo(StatusFilter);

