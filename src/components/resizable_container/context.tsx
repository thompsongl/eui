/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { createContext, useContext } from 'react';

export interface EuiResizablePanelController {
  id: string;
  setSize: (panelSize: number) => void;
  getSizePx: () => number;
}

export class EuiResizablePanelRegistry {
  private panels: { [key: string]: EuiResizablePanelController } = {};

  registerPanel(panel: EuiResizablePanelController) {
    this.panels[panel.id] = panel;
  }

  getResizerSiblings(prevPanelId: string, nextPanelId: string) {
    return [this.panels[prevPanelId], this.panels[nextPanelId]];
  }
}

const EuiResizablePanelContext = createContext({
  registry: new EuiResizablePanelRegistry(),
});

interface ContextProps {
  children: any;
  registry: EuiResizablePanelRegistry;
}

export function EuiResizablePanelContextProvider({
  children,
  registry,
}: ContextProps) {
  return (
    <EuiResizablePanelContext.Provider value={{ registry }}>
      {children}
    </EuiResizablePanelContext.Provider>
  );
}

export const useEuiResizablePanelContext = () => {
  const context = useContext(EuiResizablePanelContext);
  if (context === undefined) {
    throw new Error(
      'useEuiResizablePanelContext must be used within a <EuiResizablePanelContextProvider />'
    );
  }
  return context;
};
