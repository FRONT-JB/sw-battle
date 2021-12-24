import { useState } from 'react';
import { AttackFilter, AttackResult } from '~/components/battle';
import { MonsterList } from '~/constants/monster';

const AttackContainer = () => {
  return (
    <div className='container'>
      <b className='title' style={{ display: 'block' }}>
        Attack Units
      </b>
      <AttackFilter />
      <div className='content'>
        <ul className='attack-result'>
          <AttackResult />
          <AttackResult />
          <AttackResult />
          <AttackResult />
          <AttackResult />
          <AttackResult />
          <AttackResult />
          <AttackResult />
          <AttackResult />
          <AttackResult />
          <AttackResult />
          <AttackResult />
          <AttackResult />
          <AttackResult />
          <AttackResult />
          <AttackResult />
          <AttackResult />
        </ul>
      </div>
    </div>
  );
};

export default AttackContainer;
