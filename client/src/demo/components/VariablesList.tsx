// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Button } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';

function VariablesList() {
  const [textFieldValue, setTextFieldValue] = React.useState('');
  const [listValues, setListValues] = React.useState<string[]>([]);

  const postList = async () => {
    const newValues = listValues;

    if (textFieldValue !== '') {
      listValues.push(textFieldValue);
    }

    await fetch('/setvariables', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ list: newValues }),
    });

    setListValues(newValues);
    setTextFieldValue('');
  };

  React.useEffect(() => {
    postList();
  }, []);

  return (
    <div>
      <Label>Variables:</Label>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <TextField
          value={textFieldValue}
          placeholder={'New variable'}
          onChange={(_e, newValue) => setTextFieldValue(newValue || '')}
          onKeyDown={(e) => {
            if (e.keyCode == 13) {
              postList();
            }
          }}
          style={{
            width: '220px',
          }}
        />
        <Button onClick={() => postList()}>Add</Button>
      </div>
      <ul>
        {listValues.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>
  );
}

export default VariablesList;
