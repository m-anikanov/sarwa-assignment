import React from 'react';

import { GetStatsResponse } from 'api/stats';

import styles from './Stats.module.css';

interface StatsProps {
  data?: GetStatsResponse;
}

const Stats: React.FC<StatsProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  const {totalAccounts, totalBalance, filtered} = data;
  return (
    <section className={styles.stats}>
      <section>
        <section className={styles.name}>Accounts</section>
        <section className={styles.value}>
          {filtered.accounts === totalAccounts ? totalAccounts : (
            <>
              {filtered.accounts} / {totalAccounts}
            </>
          )}
        </section>
      </section>
      <section>
        <section className={styles.name}>Balance</section>
        <section className={styles.value}>
          {filtered.balance === totalBalance ? totalBalance : (
            <>
              {filtered.balance} / {totalBalance}
            </>
          )}
        </section>
      </section>
    </section>
  );
}

export default React.memo(Stats);
