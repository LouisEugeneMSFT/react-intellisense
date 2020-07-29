// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CompletionItemKind } from 'monaco-languageclient';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import {
  DirectionalHint,
  TooltipHost,
} from 'office-ui-fabric-react/lib/Tooltip';
import React, { CSSProperties } from 'react';
import { CompletionItem, MarkupContent } from 'vscode-languageserver-types';

type FuseJsMatch = { indices: number[][]; value: string; key: string };

const styles: Record<string, CSSProperties> = {
  completionElement: {
    height: '32px',
    cursor: 'pointer',
    padding: '0 4px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  selectedElement: { backgroundColor: '#ddd' },
  text: { fontSize: '15px' },
  icon: { marginRight: '5px' },
};

const renderIcon = (kind: CompletionItemKind | undefined): JSX.Element => {
  let icon: JSX.Element = <> </>;

  switch (kind) {
    case CompletionItemKind.Function:
      icon = <FontIcon iconName="Variable" style={styles.icon} />;
      break;
    case CompletionItemKind.Variable:
      icon = <FontIcon iconName="VariableGroup" style={styles.icon} />;
      break;
    case CompletionItemKind.Enum:
      icon = <FontIcon iconName="BulletedList" style={styles.icon} />;
      break;
  }

  return icon;
};

const renderLabelWithCharacterHighlights = (
  matches: FuseJsMatch[]
): JSX.Element => {
  const renderMatch = (
    match: FuseJsMatch,
    segmentIndex: number
  ): JSX.Element => {
    let firstIndex = 0;
    const lastIndex = match.value.length;

    const items = match.indices.map((m, spanIndex) => {
      const firstSpan = <span>{match.value.slice(firstIndex, m[0])}</span>;
      const secondSpan = (
        <span style={{ color: 'blue' }}>
          {match.value.slice(m[0], m[1] + 1)}
        </span>
      );

      firstIndex = m[1] + 1;
      return (
        <React.Fragment key={`segment-${segmentIndex}-span-${spanIndex}`}>
          {firstSpan}
          {secondSpan}
        </React.Fragment>
      );
    });

    items.push(
      <span key={`segment-${segmentIndex}-span-final`}>
        {match.value.slice(firstIndex, lastIndex)}
      </span>
    );

    return (
      <React.Fragment key={`segment-${segmentIndex}`}>{items}</React.Fragment>
    );
  };

  return <> {matches.map(renderMatch)} </>;
};

const renderDocumentation = (
  documentation: string | MarkupContent | undefined
) => {
  return <span>{documentation}</span>;
};

const CompletionElement = (props: {
  completionItem: CompletionItem;
  isSelected: boolean;
  onClickCompletionItem: () => void;
}) => {
  const { completionItem, isSelected, onClickCompletionItem } = props;

  const additionalStyles = isSelected ? styles.selectedElement : {};

  return (
    <TooltipHost
      content={renderDocumentation(completionItem.documentation)}
      directionalHint={DirectionalHint.rightCenter}
    >
      <div
        style={{
          ...styles.completionElement,
          ...additionalStyles,
        }}
        onClick={onClickCompletionItem}
      >
        {renderIcon(completionItem.kind)}
        <div style={styles.text}>
          {completionItem.data.matches
            ? renderLabelWithCharacterHighlights(completionItem.data.matches)
            : completionItem.label}
        </div>
      </div>
    </TooltipHost>
  );
};

export default CompletionElement;
