// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useConstCallback } from '@uifabric/react-hooks';
import VariablesList from 'demo/components/VariablesList';
import IntellisenseTextField from 'intellisense/components/IntellisenseTextField';
import MonacoEditor from 'monaco/components/MonacoEditor';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { Text } from 'office-ui-fabric-react/lib/Text';
import * as React from 'react';

initializeIcons();

const fieldTypes = [
  { key: 'textField', text: 'TextField' },
  { key: 'monacoEditor', text: 'Monaco Editor' },
];

const scopes = ['variables', 'expressions', 'scopes'];

const TEXTFIELD_ID = 'inmemory://intellisens/1';

const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
const wsPort = window.location.port || 3000;
const url = `${protocol}://${window.location.hostname}:${wsPort}/intellisense-language-server`;

function App() {
  const [fieldType, setFieldType] = React.useState(fieldTypes[0]);
  const [selectedScopes, setSelectedScopes] = React.useState(scopes);
  const [textFieldValue, setTextFieldValue] = React.useState('');

  const [isOpen, setIsOpen] = React.useState(false);

  const openPanel = useConstCallback(() => setIsOpen(true));
  const dismissPanel = useConstCallback(() => setIsOpen(false));

  const onChangeFieldType = (_e, option) => {
    setFieldType(option);
  };

  const onChangeSelectedScopes = (scope, isSelected) => {
    let newScopes = [...selectedScopes];

    if (isSelected) {
      newScopes.push(scope);
    } else {
      newScopes = newScopes.filter((s) => s !== scope);
    }

    setSelectedScopes(newScopes);
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
      }}
    >
      <Text variant="xxLarge" nowrap block style={{ margin: '20px' }}>
        React Intellisense
      </Text>
      <DefaultButton text="Settings" onClick={openPanel} />
      <div
        style={{
          boxShadow:
            '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          padding: '40px',
          backgroundColor: 'white',
          margin: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {fieldType.key === 'textField' ? (
          <IntellisenseTextField
            url={url}
            scopes={selectedScopes}
            id={TEXTFIELD_ID}
            value={textFieldValue}
            onChange={(newValue) => setTextFieldValue(newValue)}
          />
        ) : (
          <MonacoEditor
            url={url}
            value={textFieldValue}
            onChange={(newValue) => setTextFieldValue(newValue)}
          />
        )}
      </div>

      <Panel
        isLightDismiss
        isOpen={isOpen}
        onDismiss={dismissPanel}
        closeButtonAriaLabel="Close"
        headerText=""
      >
        <Dropdown
          label="Field type:"
          selectedKey={fieldType.key}
          onChange={onChangeFieldType}
          placeholder="Select an option"
          options={fieldTypes}
          style={{ width: 300, marginBottom: '20px' }}
        />

        {fieldType.key === 'textField' ? (
          <>
            <Label>Completion kinds:</Label>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {scopes.map((scope) => {
                return (
                  <div style={{ margin: '10px' }} key={scope}>
                    <Checkbox
                      label={scope}
                      checked={selectedScopes.includes(scope)}
                      onChange={(_e, checked) =>
                        onChangeSelectedScopes(scope, checked)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <></>
        )}

        <VariablesList />
      </Panel>
    </div>
  );
}

export default App;
