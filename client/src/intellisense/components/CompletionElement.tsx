// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CompletionItemKind } from 'monaco-languageclient';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import {
  DirectionalHint,
  TooltipHost,
} from 'office-ui-fabric-react/lib/Tooltip';
import React from 'react';
import { CompletionItem, MarkupContent } from 'vscode-languageserver-types';

type FuseJsMatch = { indices: number[][]; value: string; key: string };

const renderIcon = (kind: CompletionItemKind | undefined): JSX.Element => {
  let icon: JSX.Element = <> </>;

  switch (kind) {
    case CompletionItemKind.Function:
      icon = <FontIcon iconName="Variable" style={{ marginRight: '5px' }} />;
      break;
    case CompletionItemKind.Variable:
      icon = (
        <FontIcon iconName="VariableGroup" style={{ marginRight: '5px' }} />
      );
      break;
  }

  return icon;
};

const renderLabelWithCharacterHighlights = (
  matches: FuseJsMatch[]
): JSX.Element => {
  const renderMatch = (match: FuseJsMatch): JSX.Element => {
    let firstIndex = 0;
    const lastIndex = match.value.length;

    const items = match.indices.map((m) => {
      const firstSpan = <span>{match.value.slice(firstIndex, m[0])}</span>;
      const secondSpan = (
        <span style={{ color: 'blue', justifyContent: 'center' }}>
          {match.value.slice(m[0], m[1] + 1)}
        </span>
      );

      firstIndex = m[1] + 1;
      return (
        <>
          {firstSpan}
          {secondSpan}
        </>
      );
    });

    items.push(<span>{match.value.slice(firstIndex, lastIndex)}</span>);

    return <>{items}</>;
  };

  return <> {matches.map((match) => renderMatch(match))} </>;
};

const renderDocumentation = (
  documentation: string | MarkupContent | undefined
) => {
  return <span style={{ maxWidth: '200px' }}>{documentation}</span>;
};

const CompletionElement = (props: {
  completionItem: CompletionItem;
  isSelected: boolean;
  onClickCompletionItem: () => void;
}) => {
  const { completionItem, isSelected, onClickCompletionItem } = props;

  return (
    <TooltipHost
      content={renderDocumentation(completionItem.documentation)}
      directionalHint={DirectionalHint.rightCenter}
    >
      <div
        style={{
          height: '32px',
          cursor: 'pointer',
          padding: '0 4px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: isSelected ? '#ddd' : '',
        }}
        onClick={onClickCompletionItem}
      >
        {renderIcon(completionItem.kind)}
        {completionItem.data.matches
          ? renderLabelWithCharacterHighlights(completionItem.data.matches)
          : completionItem.label}
      </div>
    </TooltipHost>
  );
};

export default CompletionElement;
