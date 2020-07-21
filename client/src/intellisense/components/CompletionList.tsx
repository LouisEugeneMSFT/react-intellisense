// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import CompletionElement from 'intellisense/components/CompletionElement';
import React from 'react';
import { CompletionItem } from 'vscode-languageserver-types';

const CompletionList = React.forwardRef<
  HTMLDivElement,
  {
    completionItems: CompletionItem[];
    selectedItem: number;
    onClickCompletionItem: (index: number) => void;
  }
>((props, ref) => {
  const { completionItems, selectedItem, onClickCompletionItem } = props;

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: 32,
        left: 0,
        maxHeight: '300px',
        width: '100%',
        backgroundColor: 'white',
        overflowY: 'auto',
        overflowX: 'hidden',
        boxShadow:
          '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        zIndex: 2000,
      }}
    >
      {completionItems.map((completionItem, index) => (
        <CompletionElement
          key={index}
          completionItem={completionItem}
          isSelected={selectedItem === index}
          onClickCompletionItem={() => onClickCompletionItem(index)}
        />
      ))}
    </div>
  );
});

export default CompletionList;
